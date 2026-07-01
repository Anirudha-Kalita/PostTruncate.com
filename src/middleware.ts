import { defineMiddleware } from 'astro:middleware';

/** Worker bindings this middleware reads. */
interface AdminEnv {
  /** HTTP Basic Auth credential for /admin/*, as "username:password". */
  ADMIN_AUTH?: string;
}

/** True for the admin surface (the bare /admin and everything beneath it). */
function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin/');
}

/** 401 challenge — prompts the browser's native Basic Auth login. */
function adminChallenge(): Response {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="PostTruncate Admin", charset="UTF-8"',
      'content-type': 'text/plain; charset=utf-8',
      // Never let a browser or edge cache the gate response itself.
      'cache-control': 'no-store',
    },
  });
}

/**
 * Length-safe, early-exit-free string compare. Not a hard constant-time
 * guarantee in JS, but avoids leaking the credential's length/prefix through
 * the trivial `===` short-circuit.
 */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Validate an `Authorization: Basic …` header against the expected "user:pass". */
function basicAuthOk(header: string | null, expected: string): boolean {
  if (!header || !header.startsWith('Basic ')) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice('Basic '.length).trim());
  } catch {
    return false;
  }
  return safeEqual(decoded, expected);
}

// Middleware runs inside the Cloudflare Worker for every request, including
// prerendered static assets served through the Worker (the admin surface is
// forced worker-first via run_worker_first in wrangler.jsonc so this gate runs
// before any admin asset is served).
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  // ── Gate the admin tooling behind HTTP Basic Auth (production only) ────────
  // The localhost dev server is not internet-exposed, so the gate is skipped
  // there to keep the File System Access authoring workflow frictionless. In a
  // production build the gate is mandatory and fails CLOSED: a missing/unset
  // ADMIN_AUTH secret denies access rather than exposing /admin unauthenticated.
  if (import.meta.env.PROD && isAdminPath(pathname)) {
    const env = (context.locals as { runtime?: { env?: AdminEnv } }).runtime?.env;
    const expected = env?.ADMIN_AUTH;
    if (!expected || !basicAuthOk(context.request.headers.get('authorization'), expected)) {
      return adminChallenge();
    }
    // Authenticated: serve the admin asset but keep it uncacheable so a shared
    // or edge cache can never replay it to an unauthenticated client.
    const authed = await next();
    const headers = new Headers(authed.headers);
    headers.set('cache-control', 'no-store');
    return new Response(authed.body, {
      status: authed.status,
      statusText: authed.statusText,
      headers,
    });
  }

  const response = await next();

  // For the bare-widget embed pages (/en/embed/, /de/embed/, etc.) we must
  // allow any third-party site to frame the page. By default Cloudflare and
  // many frameworks block cross-origin iframes.
  if (/^\/[a-z]{2}\/embed\/?$/.test(pathname)) {
    const headers = new Headers(response.headers);

    // Remove the header that blocks all cross-origin framing.
    headers.delete('X-Frame-Options');

    // Add CSP frame-ancestors to explicitly permit embedding from any origin.
    // We only append this directive; we don't override any other CSP rules
    // the response may already carry.
    const existing = headers.get('Content-Security-Policy') ?? '';
    if (existing.includes('frame-ancestors')) {
      headers.set(
        'Content-Security-Policy',
        existing.replace(/frame-ancestors\s+[^;]*/g, 'frame-ancestors *'),
      );
    } else {
      headers.set(
        'Content-Security-Policy',
        existing ? `${existing}; frame-ancestors *` : 'frame-ancestors *',
      );
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
});
