import { defineMiddleware } from 'astro:middleware';

// Middleware runs inside the Cloudflare Worker for every request, including
// prerendered static assets served through the Worker.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const { pathname } = new URL(context.request.url);

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
