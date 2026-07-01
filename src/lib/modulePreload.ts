/**
 * Pure module-preload injection for the post-build critical-request-chain fix
 * (DOM-free I/O). Every interactive page mounts its Preact island through an
 * `<astro-island component-url="..." renderer-url="...">` element deep in
 * `<body>`. The browser only *discovers* those scripts once it parses that far
 * down the document, executes the renderer, and lets its dynamic `import()`
 * discover the component chunk — which in turn statically imports ~10 more
 * small chunks (hooks, jsx-runtime, ui, preview cards, …). Each hop is a
 * network round trip, so Lighthouse's "Network dependency tree" audit reports
 * a long critical path even though every file involved is tiny.
 *
 * `injectModulePreloads` fixes this by hoisting `<link rel="modulepreload">`
 * hints for the renderer, the component chunk, and their full transitive
 * static-import closure into `<head>`, so the browser starts fetching all of
 * them in parallel while it is still parsing `<head>` — collapsing the chain
 * to effectively one round trip instead of three-plus.
 */

import * as cheerio from 'cheerio';

export interface ModulePreloadOptions {
  /**
   * Given a script href as it appears on the page (e.g.
   * "/_astro/Dashboard.abc123.js"), return the hrefs of its direct static ES
   * module imports. Return `[]` for hrefs with no local dependency info
   * (external URLs, unknown assets, or scripts with no static imports).
   */
  resolveImports: (href: string) => string[];
}

/**
 * Extract, in document order, the deduplicated `component-url` and
 * `renderer-url` hrefs from every `<astro-island>` in an HTML document. These
 * are the entry points of the island hydration script graph.
 */
export function extractIslandScriptHrefs(html: string): string[] {
  const $ = cheerio.load(html);
  const hrefs: string[] = [];
  const seen = new Set<string>();

  const add = (href: string | undefined) => {
    if (href && !seen.has(href)) {
      seen.add(href);
      hrefs.push(href);
    }
  };

  $('astro-island').each((_, el) => {
    add($(el).attr('component-url'));
    add($(el).attr('renderer-url'));
  });

  return hrefs;
}

/**
 * Breadth-first walk of the static-import graph starting from `roots`,
 * returning every reachable href (including the roots themselves) exactly
 * once. Guards against cycles via a visited set — Rollup output shouldn't
 * produce import cycles between chunks, but the walk must not hang if it did.
 */
export function resolveTransitiveImports(
  roots: string[],
  resolveImports: (href: string) => string[]
): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  const queue = [...roots];

  while (queue.length > 0) {
    const href = queue.shift()!;
    if (seen.has(href)) continue;
    seen.add(href);
    order.push(href);
    for (const dep of resolveImports(href)) {
      if (!seen.has(dep)) queue.push(dep);
    }
  }

  return order;
}

/** Minimal HTML-attribute escaping for hrefs injected into a `<link>` tag. */
function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/**
 * Inject `<link rel="modulepreload">` hints into `<head>` for every script an
 * `<astro-island>` on this page will eventually fetch: the renderer, the
 * component chunk, and their full transitive static-import closure (resolved
 * via `options.resolveImports`). Idempotent — hrefs already present as a
 * `modulepreload` link are skipped. Returns the original `html` unchanged if
 * the page has no `<astro-island>` or every dependency is already hinted.
 */
export function injectModulePreloads(html: string, options: ModulePreloadOptions): string {
  const roots = extractIslandScriptHrefs(html);
  if (roots.length === 0) return html;

  const allHrefs = resolveTransitiveImports(roots, options.resolveImports);

  const $ = cheerio.load(html);
  const head = $('head').first();
  if (head.length === 0) return html;

  const existing = new Set(
    $('head link[rel="modulepreload"]')
      .toArray()
      .map((el) => $(el).attr('href'))
      .filter((href): href is string => Boolean(href))
  );

  const toAdd = allHrefs.filter((href) => !existing.has(href));
  if (toAdd.length === 0) return html;

  const tags = toAdd
    .map((href) => `<link rel="modulepreload" href="${escapeHtmlAttr(href)}">`)
    .join('');
  head.append(tags);

  return $.html();
}
