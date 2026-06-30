/**
 * Pure CSS-inlining transform for the post-build render-blocking-CSS fix (DOM-free I/O).
 *
 * `transformHtml` rewrites a single emitted HTML document so that its CSS is
 * delivered inside the document (as `<style>`) instead of through render-blocking
 * `<link rel="stylesheet">` elements. Critical/above-the-fold CSS is inlined first,
 * up to a fixed UTF-8 byte budget; any remainder is re-attached through a
 * non-render-blocking load pattern. The function performs NO I/O — the caller
 * supplies CSS contents via the `resolveCss` callback — so it is fully testable.
 *
 * The full algorithm is implemented across tasks 2.1–2.4: the exported budget
 * constant and shared types (2.1), `<head>` CSS-link collection plus CSS
 * resolution (2.2), critical-first ordering + byte-budget partitioning (2.3),
 * and the HTML rewrite — single inline `<style>` plus non-render-blocking
 * deferral of any remainder (2.4). `transformHtml` is now fully functional.
 */

import * as cheerio from 'cheerio';

/**
 * Per-page inline-CSS budget, measured as UTF-8 byte length (1 KiB = 1024 bytes).
 *
 * This MUST stay above the largest single page's total CSS so that every page
 * inlines ALL of its CSS and nothing is async-deferred. Astro emits per-page CSS
 * bundles that are NOT split by fold position, so the route-specific bundle
 * (hero, platform cards, workspace, …) is above the fold just like the shared
 * base bundle. Deferring any of it via the non-render-blocking preload pattern
 * paints the page before those styles load → a flash of unstyled content (FOUC):
 * giant unstyled SVG logos, unstyled text. The heaviest page (the homepage) is
 * ~102 KiB of CSS; 160 KiB leaves headroom for growth. Inlined CSS is brotli-
 * compressed on the wire (~6–8×), so the larger HTML costs little and saves a
 * round-trip. If a future page exceeds this, the build logs a non-zero
 * "deferred CSS links" count — bump this budget rather than shipping FOUC.
 */
export const HTML_PAYLOAD_BUDGET_BYTES = 160 * 1024;

export interface CssLink {
  /** href as written in the <link> (e.g. "/_astro/index.BCnqUpcK.css"). */
  href: string;
  /** true when this stylesheet is linked from (nearly) every page — treated
   *  as critical/above-the-fold and inlined first. */
  shared: boolean;
}

export interface TransformOptions {
  budgetBytes: number;
  /** Resolve a link href to its CSS text; returns null if the asset is missing. */
  resolveCss: (href: string) => string | null;
  /**
   * Report whether the stylesheet at `href` is shared/critical (linked from
   * ~every page → above-the-fold). Shared stylesheets are ordered first and
   * inlined ahead of route-specific bundles. Supplied per-href as a callback to
   * keep `transformHtml` pure and mirror the `resolveCss` resolver pattern; the
   * post-build runner (task 4.1) derives it by counting how many pages
   * reference each stylesheet.
   */
  isShared: (href: string) => boolean;
}

export type TransformResult =
  | {
      ok: true;
      html: string;
      /** UTF-8 byte length of all inlined <style> content (payload-increase proxy). */
      inlinedBytes: number;
      /** hrefs re-attached via the non-render-blocking pattern (empty on the common path). */
      deferredHrefs: string[];
    }
  | {
      ok: false;
      error: TransformError;
    };

export interface TransformError {
  kind: 'missing-asset' | 'critical-exceeds-budget';
  /** Page identifier (route path) for diagnostics. */
  page: string;
  detail: string;
  /** For 'critical-exceeds-budget': the smallest unavoidable inlined byte count. */
  measuredBytes?: number;
}

/**
 * A render-blocking CSS `<link rel="stylesheet">` collected from `<head>`,
 * paired with its resolved CSS text. This is the intermediate shape produced by
 * task 2.2's collection/resolution step and consumed by the ordering/partition
 * (task 2.3) and HTML-rewrite (task 2.4) steps.
 */
interface ResolvedCssLink {
  /** href as written in the `<link>`. */
  href: string;
  /** Resolved CSS text for `href` (never null — missing assets short-circuit). */
  content: string;
}

/**
 * A resolved CSS link after critical-first ordering and budget partitioning
 * (task 2.3): augments {@link ResolvedCssLink} with its critical flag and
 * precomputed UTF-8 byte length. Carried forward to the HTML-rewrite step
 * (task 2.4) so it can build the inline `<style>` and the deferred load markup
 * without re-measuring.
 */
interface PartitionedCssLink extends ResolvedCssLink {
  /** true when this stylesheet is shared/critical (inlined first). */
  shared: boolean;
  /** `Buffer.byteLength(content, 'utf8')` — its contribution to the payload. */
  bytes: number;
}

/**
 * A render-blocking CSS `<link rel="stylesheet">` is a `<link>` in `<head>`
 * whose `rel` (case-insensitive, whitespace-collapsed) is exactly `stylesheet`
 * and which carries an `href`. `rel="preload"` / `rel="alternate stylesheet"`
 * and href-less links are intentionally excluded — they are not render-blocking
 * CSS and must be left untouched.
 */
function isRenderBlockingStylesheet(rel: string | undefined, href: string | undefined): boolean {
  if (!href) return false;
  if (!rel) return false;
  return rel.trim().replace(/\s+/g, ' ').toLowerCase() === 'stylesheet';
}

/**
 * Step 1–2 of the transform algorithm (task 2.2).
 *
 * Parse `html`, collect — in document order — every render-blocking CSS
 * `<link rel="stylesheet">` in `<head>` (leaving all other nodes untouched), and
 * resolve each link's CSS via `resolveCss`. Returns either the loaded cheerio
 * document plus the ordered, resolved links, or a `missing-asset` error if any
 * link's CSS resolves to `null`.
 */
function collectAndResolveCssLinks(
  html: string,
  page: string,
  resolveCss: TransformOptions['resolveCss']
):
  | { ok: true; $: cheerio.CheerioAPI; links: ResolvedCssLink[] }
  | { ok: false; error: TransformError } {
  const $ = cheerio.load(html);

  const resolved: ResolvedCssLink[] = [];
  const headLinks = $('head link').toArray();

  for (const el of headLinks) {
    const rel = $(el).attr('rel');
    const href = $(el).attr('href');
    if (!isRenderBlockingStylesheet(rel, href)) continue;

    // href is guaranteed defined by isRenderBlockingStylesheet.
    const content = resolveCss(href as string);
    if (content === null) {
      return {
        ok: false,
        error: {
          kind: 'missing-asset',
          page,
          detail: `Unable to resolve CSS for <link rel="stylesheet" href="${href}">`,
        },
      };
    }

    resolved.push({ href: href as string, content });
  }

  return { ok: true, $, links: resolved };
}

/**
 * Step 3–5 of the transform algorithm (task 2.3): critical-first ordering and
 * budget-based partitioning.
 *
 * Stable-orders the resolved stylesheets so that `shared` (critical /
 * above-the-fold) bundles precede route-specific ones — preserving each group's
 * original document order — then greedily fills the inline set while the running
 * UTF-8 byte total stays `<= budgetBytes`, sending any overflow to the deferred
 * set. If the first (most critical) stylesheet alone exceeds `budgetBytes`, the
 * above-the-fold CSS cannot be inlined within budget, so a
 * `critical-exceeds-budget` error is returned instead (Requirements 2.5, 5.3).
 */
function orderAndPartitionCssLinks(
  links: ResolvedCssLink[],
  page: string,
  budgetBytes: number,
  isShared: TransformOptions['isShared']
):
  | { ok: true; inline: PartitionedCssLink[]; deferred: PartitionedCssLink[] }
  | { ok: false; error: TransformError } {
  // Annotate each link with its critical flag and UTF-8 byte length.
  const annotated: PartitionedCssLink[] = links.map((link) => ({
    href: link.href,
    content: link.content,
    shared: isShared(link.href),
    bytes: Buffer.byteLength(link.content, 'utf8'),
  }));

  // Critical-first ordering: shared stylesheets before route-specific ones.
  // Array.prototype.sort is stable in modern V8, so within each group the
  // original document order is preserved.
  const ordered = annotated
    .map((link, index) => ({ link, index }))
    .sort((a, b) => {
      if (a.link.shared !== b.link.shared) {
        return a.link.shared ? -1 : 1;
      }
      return a.index - b.index;
    })
    .map((entry) => entry.link);

  // Budget guard: the most-critical stylesheet alone must fit the budget.
  if (ordered.length > 0 && ordered[0].bytes > budgetBytes) {
    return {
      ok: false,
      error: {
        kind: 'critical-exceeds-budget',
        page,
        detail:
          `Critical stylesheet "${ordered[0].href}" is ${ordered[0].bytes} bytes, ` +
          `which exceeds the ${budgetBytes}-byte budget`,
        measuredBytes: ordered[0].bytes,
      },
    };
  }

  // Greedily accumulate into the inline set while the running total stays within
  // budget; everything that doesn't fit is deferred.
  const inline: PartitionedCssLink[] = [];
  const deferred: PartitionedCssLink[] = [];
  let runningBytes = 0;

  for (const link of ordered) {
    if (runningBytes + link.bytes <= budgetBytes) {
      inline.push(link);
      runningBytes += link.bytes;
    } else {
      deferred.push(link);
    }
  }

  return { ok: true, inline, deferred };
}

/**
 * Build the non-render-blocking replacement markup for a deferred stylesheet
 * (algorithm step 7): a `preload`-as-style link that promotes itself to a real
 * stylesheet on load, plus a `<noscript>` fallback so styling still applies when
 * JS is unavailable. Returned as a raw HTML string for cheerio to re-parse in
 * place of the original render-blocking `<link>`.
 */
function deferredLinkMarkup(href: string): string {
  return (
    `<link rel="preload" as="style" href="${href}" ` +
    `onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="${href}"></noscript>`
  );
}

/**
 * Rewrite a single HTML document to inline its CSS within the payload budget,
 * deferring any remainder through a non-render-blocking load pattern.
 *
 * Steps 1–2 (collect render-blocking CSS links, resolve their contents, fail on
 * a missing asset) live in {@link collectAndResolveCssLinks}; steps 3–5
 * (critical-first ordering, byte-budget partitioning, and the
 * `critical-exceeds-budget` guard) live in {@link orderAndPartitionCssLinks}.
 *
 * Steps 6–8 (this function): replace the inlined links with a single `<style>`
 * element — the inline set's contents concatenated in critical-first order — at
 * the position of the first removed link; rewrite each deferred link in place
 * with the non-render-blocking preload + `<noscript>` markup; and return the
 * resulting HTML alongside the inlined byte total and the deferred hrefs. All
 * non-CSS `<head>` nodes (meta, canonical, hreflang, JSON-LD, icons, OG/Twitter,
 * the `is:inline` theme-init script) are left untouched (Req 6.4, 6.5).
 */
export function transformHtml(
  html: string,
  page: string,
  options: TransformOptions
): TransformResult {
  const collected = collectAndResolveCssLinks(html, page, options.resolveCss);
  if (!collected.ok) {
    return collected;
  }

  const partition = orderAndPartitionCssLinks(
    collected.links,
    page,
    options.budgetBytes,
    options.isShared
  );
  if (!partition.ok) {
    return partition;
  }

  const $ = collected.$;
  const inlineHrefs = new Set(partition.inline.map((link) => link.href));
  const deferredHrefSet = new Set(partition.deferred.map((link) => link.href));

  // Concatenate the inline set in its critical-first order (step 6). Joining
  // with no separator keeps the byte total identical to the partition's running
  // total, so `inlinedBytes` stays within the budget the partition enforced.
  const inlinedContent = partition.inline.map((link) => link.content).join('');
  const inlinedBytes = Buffer.byteLength(inlinedContent, 'utf8');

  // Walk the render-blocking CSS links in document order. The first inlined link
  // is replaced by the single `<style>`; later inlined links are removed; each
  // deferred link is rewritten in place with the non-render-blocking markup.
  let styleInserted = false;
  for (const el of $('head link').toArray()) {
    const rel = $(el).attr('rel');
    const href = $(el).attr('href');
    if (!isRenderBlockingStylesheet(rel, href)) continue;

    if (inlineHrefs.has(href as string)) {
      if (!styleInserted) {
        // Set the CSS via `.text()` so cheerio emits it as raw text inside
        // `<style>` (style/script are raw-text elements) without HTML-escaping.
        const styleEl = $('<style></style>');
        styleEl.text(inlinedContent);
        $(el).replaceWith(styleEl);
        styleInserted = true;
      } else {
        $(el).remove();
      }
    } else if (deferredHrefSet.has(href as string)) {
      $(el).replaceWith(deferredLinkMarkup(href as string));
    }
  }

  return {
    ok: true,
    html: $.html(),
    inlinedBytes,
    deferredHrefs: partition.deferred.map((link) => link.href),
  };
}
