import { defineMiddleware } from 'astro:middleware';

/**
 * Baseline security headers for Worker-served responses (the on-demand routes:
 * "/", "/api/*"). The prerendered pages are served by the asset layer and get
 * the SAME set from public/_headers — keep the two in sync. Set only when absent
 * so we never clobber a value a route (or the asset layer) already chose.
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

// Middleware runs inside the Cloudflare Worker for every Worker-served request.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const { pathname } = new URL(context.request.url);

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
