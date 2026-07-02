import { defineMiddleware } from 'astro:middleware';

/** Worker bindings this middleware reads. */
interface RuntimeEnv {
  /** HTTP Basic Auth credential for /admin/*, as "username:password". */
  ADMIN_AUTH?: string;
  /**
   * Cloudflare static-asset binding. Present ONLY at runtime on the Worker —
   * never during the static build's prerender pass (there is no asset server
   * then). We use that fact as the build-vs-runtime discriminator for the admin
   * gate below, and to serve the prerendered admin file after auth.
   */
  ASSETS?: { fetch(request: Request): Promise<Response> };
}

/**
 * Baseline security headers for Worker-served responses (the on-demand routes:
 * "/", "/api/*", plus the gated /admin/* responses). The prerendered pages are
 * served by the asset layer and get the SAME set from public/_headers — keep the
 * two in sync. Set only when absent so we never clobber a value a route (or the
 * asset layer) already chose.
 */
function setBaselineSecurityHeaders(headers: Headers): void {
  const defaults: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Conservative CSP: restricts only object/base (unused by the site), never
    // script/style (which would need nonces for the inline theme/GA/JSON-LD).
    // frame-ancestors is added per-request for the embeddable /embed/ pages.
    'Content-Security-Policy': "object-src 'none'; base-uri 'self'",
  };
  for (const [name, value] of Object.entries(defaults)) {
    if (!headers.has(name)) headers.set(name, value);
  }
}

// ── Admin Basic-Auth gate helpers ───────────────────────────────────────────

/** True for the admin surface (the bare /admin and everything beneath it). */
function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin/');
}

/**
 * Length-safe, early-exit-free string compare. Not a hard constant-time
 * guarantee in JS, but avoids leaking the credential's length/prefix through the
 * trivial `===` short-circuit.
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

/** 401 challenge — prompts the browser's native Basic Auth login. */
function adminChallenge(): Response {
  const headers = new Headers({
    'WWW-Authenticate': 'Basic realm="PostTruncate Admin", charset="UTF-8"',
    'content-type': 'text/plain; charset=utf-8',
    // Never let a browser or edge cache the gate response itself.
    'cache-control': 'no-store',
  });
  setBaselineSecurityHeaders(headers);
  return new Response('Authentication required.', { status: 401, headers });
}

// Middleware runs inside the Cloudflare Worker for every Worker-served request.
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);
  const env = (context.locals as { runtime?: { env?: RuntimeEnv } }).runtime?.env;

  // ── Gate the admin tooling (/admin/*) behind HTTP Basic Auth ───────────────
  // /admin is forced worker-first (wrangler.jsonc) so this runs before the asset
  // layer serves it. Two guards keep it a RUNTIME-only concern:
  //   • import.meta.env.PROD → never on the localhost dev server (astro dev).
  //   • env.ASSETS present   → never during the static build (the ASSETS binding
  //     doesn't exist then) and gives us the asset store for config.yml below.
  // The admin PAGES are SSR (prerender = false) on purpose: a prerendered page
  // is served by the asset layer WITHOUT running the Worker, so the gate would
  // be bypassed. SSR pages have no static file, so every request runs the Worker
  // (and this gate). Fails CLOSED: an unset ADMIN_AUTH denies.
  if (import.meta.env.PROD && env?.ASSETS && isAdminPath(pathname)) {
    const expected = env.ADMIN_AUTH;
    if (!expected || !basicAuthOk(context.request.headers.get('authorization'), expected)) {
      return adminChallenge();
    }
    // Authenticated. The admin PAGES render via next() (they're SSR). A static
    // admin FILE (e.g. /admin/config.yml, which has a file extension and no SSR
    // route) is served straight from the asset store instead. Keep it
    // uncacheable so no shared/edge cache can replay an admin response to an
    // unauthenticated client.
    const served = /\.[a-z0-9]+$/i.test(pathname)
      ? await env.ASSETS.fetch(context.request)
      : await next();
    const headers = new Headers(served.headers);
    setBaselineSecurityHeaders(headers);
    headers.set('cache-control', 'no-store');
    return new Response(served.body, {
      status: served.status,
      statusText: served.statusText,
      headers,
    });
  }

  const response = await next();

  const headers = new Headers(response.headers);
  setBaselineSecurityHeaders(headers);

  // For the bare-widget embed pages (/en/embed/, /de/embed/, etc.) we must
  // allow any third-party site to frame the page. By default Cloudflare and
  // many frameworks block cross-origin iframes.
  if (/^\/[a-z]{2}\/embed\/?$/.test(pathname)) {
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
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
