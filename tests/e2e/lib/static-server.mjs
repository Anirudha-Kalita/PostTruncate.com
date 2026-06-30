// ──────────────────────────────────────────────────────────────────────────
// Minimal static file server for the built site (dist/).
//
// Used by the hero-CLS exploration harness to serve the *real* build output
// over HTTP so Playwright can load it like a browser would, and so the font
// woff2 requests can be intercepted/throttled. Resolves "/a/b/" → "/a/b/index.html"
// the same way a static host (Vercel/Cloudflare Pages) does.
//
// This is TEST-ONLY infrastructure. It does not touch any production code.
// ──────────────────────────────────────────────────────────────────────────
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

// Repo root is two levels up from tests/e2e/lib/.
const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

/**
 * Resolve a URL pathname to a file inside the served root.
 * Mirrors static-host behaviour: "/x/" → "/x/index.html", "/x" → "/x/index.html".
 */
function resolveFile(rootDir, pathname) {
  // Strip query/hash and decode.
  let p = decodeURIComponent(pathname.split('?')[0].split('#')[0]);
  // Prevent path traversal.
  p = normalize(p).replace(/^(\.\.[/\\])+/, '');
  let candidate = join(rootDir, p);

  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;

  // Directory (with or without trailing slash) → index.html
  const indexCandidate = join(candidate, 'index.html');
  if (existsSync(indexCandidate)) return indexCandidate;

  // Trailing-slashless route → "/route/index.html"
  const htmlCandidate = `${candidate}.html`;
  if (existsSync(htmlCandidate)) return htmlCandidate;

  return null;
}

/**
 * Start a static server for a built site directory.
 * @param {object} [opts]
 * @param {string} [opts.dir] directory to serve (default: <repo>/dist)
 * @param {number} [opts.port] port (default: 0 = ephemeral)
 * @returns {Promise<{ origin: string, port: number, close: () => Promise<void> }>}
 */
export function startStaticServer({ dir = join(ROOT, 'dist'), port = 0 } = {}) {
  if (!existsSync(dir)) {
    return Promise.reject(
      new Error(
        `Static server root not found: ${dir}\nRun "npm run build" before the CLS exploration test.`,
      ),
    );
  }

  const server = http.createServer((req, res) => {
    const file = resolveFile(dir, req.url ?? '/');
    if (!file) {
      res.statusCode = 404;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end(`404 Not Found: ${req.url}`);
      return;
    }
    res.statusCode = 200;
    res.setHeader('content-type', CONTENT_TYPES[extname(file)] ?? 'application/octet-stream');
    // Never let the browser cache between runs — keeps the font "cold".
    res.setHeader('cache-control', 'no-store, max-age=0');
    createReadStream(file)
      .on('error', () => {
        res.statusCode = 500;
        res.end('500 Internal Server Error');
      })
      .pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => {
      const addr = server.address();
      const actualPort = typeof addr === 'object' && addr ? addr.port : port;
      resolve({
        origin: `http://127.0.0.1:${actualPort}`,
        port: actualPort,
        close: () =>
          new Promise((res) => server.close(() => res(undefined))),
      });
    });
  });
}
