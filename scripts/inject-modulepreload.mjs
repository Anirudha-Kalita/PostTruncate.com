// ──────────────────────────────────────────────────────────────────────────
// inject-modulepreload.mjs — postbuild step: flatten the island hydration
// script chain that Lighthouse's "Network dependency tree" audit flags.
//
// Every interactive page mounts its Preact island via
// `<astro-island component-url="..." renderer-url="...">`, deep in <body>.
// The browser only discovers those scripts once it parses that far, runs the
// renderer, and lets its dynamic import() discover the component chunk —
// which then statically imports ~10 more small chunks (hooks, jsx-runtime,
// ui, preview cards, …). Each hop costs a full round trip.
//
// This script scans the built `_astro/*.js` chunks for their static import
// graph, then rewrites every page to add `<link rel="modulepreload">` hints
// in <head> for the renderer + component chunk + their full transitive
// closure — so the browser fetches all of them in parallel from the start of
// <head> parsing instead of discovering them one hop at a time.
//
// The pure graph-walk/HTML-rewrite logic lives in src/lib/modulePreload.ts;
// this file is only the I/O wrapper (read chunks, read/write HTML), run on
// the finished build output — adapter-agnostic, same pattern as
// scripts/inline-critical-css.mjs.
//
// Usage:
//   node --experimental-strip-types --import ./scripts/ts-resolve.mjs \
//     scripts/inject-modulepreload.mjs [--dry-run] [--help]
// ──────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { injectModulePreloads } from '../src/lib/modulePreload.ts';
import { resolveStaticRoot, enumerateHtmlFiles } from './inline-critical-css.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

const HELP = `inject-modulepreload — hint-preload island hydration script chains

Usage:
  node --experimental-strip-types --import ./scripts/ts-resolve.mjs \\
    scripts/inject-modulepreload.mjs            Rewrite every page's <head>
  ... scripts/inject-modulepreload.mjs --dry-run  Report only, write nothing
  ... scripts/inject-modulepreload.mjs --help

Resolves the static root (dist/client if present, else dist), scans every
_astro/*.js chunk for its static import graph, then for every *.html page
with an <astro-island>, injects <link rel="modulepreload"> hints for the
renderer + component chunk + their full transitive dependency closure.`;

/** Only static `import ... from "./chunk.js"` declarations count — dynamic
 *  `import(...)` calls are intentionally lazy code-splits and must not be
 *  eagerly preloaded. Rollup emits these at the top of each chunk as
 *  `import{...}from"./x.js";` or `import"./x.js";`; both end in `from"..."`
 *  except the bare side-effect form, so both patterns are matched. */
const STATIC_IMPORT_RE = /(?:^|;)\s*import\s*(?:[^;'"()]*?\bfrom\s*)?["']([^"']+)["']/gm;

/** Parse a chunk's static-import specifiers, keeping only relative ones
 *  (Rollup chunk-to-chunk references) and dropping bare/absolute specifiers
 *  (external packages don't apply here — everything is pre-bundled). */
export function parseStaticImportSpecifiers(source) {
  const specifiers = [];
  for (const match of source.matchAll(STATIC_IMPORT_RE)) {
    const specifier = match[1];
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
      specifiers.push(specifier);
    }
  }
  return specifiers;
}

/** Build a caching `resolveImports(href)` bound to `_astro/` under `root`:
 *  given a root-absolute href like "/_astro/Dashboard.abc.js", reads that
 *  chunk once, parses its static imports, and resolves them back to
 *  root-absolute hrefs alongside it (all chunks live flat in `_astro/`).
 *  Non-`_astro/*.js` or missing hrefs resolve to `[]`. */
export function createImportResolver(root, readFile = (path) => readFileSync(path, 'utf8')) {
  const cache = new Map();
  const astroDirHref = '/_astro/';

  return function resolveImports(href) {
    if (cache.has(href)) return cache.get(href);

    let deps = [];
    if (typeof href === 'string' && href.startsWith(astroDirHref) && href.endsWith('.js')) {
      const diskPath = resolve(root, href.replace(/^\//, ''));
      if (existsSync(diskPath)) {
        try {
          const source = readFile(diskPath);
          // All chunks are flat siblings under _astro/, so a relative
          // specifier's basename is enough to resolve it back to an href.
          deps = parseStaticImportSpecifiers(source).map(
            (specifier) => astroDirHref + specifier.split('/').pop()
          );
        } catch {
          deps = [];
        }
      }
    }

    cache.set(href, deps);
    return deps;
  };
}

function main(argv) {
  const dryRun = argv.includes('--dry-run');
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(HELP);
    return;
  }

  const root = resolveStaticRoot();
  if (!root) {
    console.log('inject-modulepreload: no built site found (dist/client or dist) — nothing to do.');
    return;
  }

  const htmlFiles = enumerateHtmlFiles(root);
  if (htmlFiles.length === 0) {
    console.log(`inject-modulepreload: no HTML pages found under ${root} — nothing to do.`);
    return;
  }

  const resolveImports = createImportResolver(root);

  let pagesChanged = 0;
  let linksAdded = 0;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const rewritten = injectModulePreloads(html, { resolveImports });
    if (rewritten === html) continue;

    pagesChanged++;
    // Count for reporting only — cheap re-scan of the diff.
    const before = (html.match(/rel="modulepreload"/g) ?? []).length;
    const after = (rewritten.match(/rel="modulepreload"/g) ?? []).length;
    linksAdded += after - before;

    if (!dryRun) writeFileSync(file, rewritten, 'utf8');
  }

  console.log(
    `inject-modulepreload: ${dryRun ? 'DRY-RUN — ' : ''}${pagesChanged}/${htmlFiles.length} page(s) ` +
      `under ${root} ${dryRun ? 'would get' : 'got'} ${linksAdded} modulepreload link(s).`
  );
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv.slice(2));
}
