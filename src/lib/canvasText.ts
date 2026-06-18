/**
 * Precise client-side text measurement via the HTML5 <canvas> 2D context.
 *
 * Shared by the Google Responsive Search Ads simulator and the SERP
 * (SeoPreview) retrofit so both clip copy by *true* rendered pixel width
 * instead of an averaged characters-times-N estimate.
 *
 * Design notes:
 *  • DOM-free until first use. The offscreen canvas is created lazily and only
 *    when `document` exists, so importing this module during SSR / static
 *    render never throws.
 *  • During SSR (no document) `measureTextWidth` returns a deterministic
 *    estimate (grapheme count × an Arial-ish per-character factor derived from
 *    the font size) so the server-rendered HTML is stable and hydration-safe.
 *  • `truncateToWidth` accepts an injectable `measure` function specifically so
 *    the truncation algorithm is unit-testable under `node --test` with no DOM.
 *  • All slicing goes through `sliceChars` (grapheme-safe) so emoji, flags, and
 *    combining marks are never split mid-cluster.
 */

import { charCount, sliceChars } from './textTools';

/** Single-character ellipsis appended to truncated strings. */
export const ELLIPSIS = '…';

/**
 * Fraction of the font size used as the average glyph advance width when no
 * canvas is available (SSR). Arial's mean lowercase advance is ≈ 0.5em.
 */
const SSR_AVG_CHAR_EM = 0.5;

/** Build a CSS `font` shorthand value, e.g. `font(20)` → "20px Arial". */
export function font(pxSize: number, family = 'Arial'): string {
  return `${pxSize}px ${family}`;
}

/** Parse the leading pixel size out of a font spec ("20px Arial" → 20). */
function fontPx(fontSpec: string): number {
  const match = /(\d+(?:\.\d+)?)px/.exec(fontSpec);
  return match ? parseFloat(match[1]) : 16;
}

// Lazily-created, module-level offscreen 2D context. One canvas is reused for
// every measurement to avoid per-call allocation. `undefined` = not yet tried;
// `null` = tried and unavailable (SSR or no 2D context).
let ctx: CanvasRenderingContext2D | null | undefined;

function getContext(): CanvasRenderingContext2D | null {
  if (ctx !== undefined) return ctx;
  if (typeof document === 'undefined') {
    ctx = null;
    return ctx;
  }
  const canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  return ctx;
}

/**
 * Measure the rendered pixel width of `text` for the given CSS `font` spec.
 *
 * Uses a real canvas 2D context in the browser; falls back to a deterministic
 * grapheme-count estimate during SSR so static render never throws and stays
 * stable across server and client.
 */
export function measureTextWidth(text: string, fontSpec: string): number {
  if (!text) return 0;
  const context = getContext();
  if (context) {
    context.font = fontSpec;
    return context.measureText(text).width;
  }
  // SSR fallback: grapheme count × an Arial-ish per-character advance.
  return charCount(text) * fontPx(fontSpec) * SSR_AVG_CHAR_EM;
}

export interface TruncateResult {
  text: string;
  truncated: boolean;
}

/**
 * Return the longest grapheme-safe prefix of `text` whose measured width — plus
 * a trailing ellipsis when truncation is needed — fits within `maxPx`.
 *
 * When the full string already fits, it is returned unchanged with
 * `truncated: false`. Otherwise a binary search finds the largest prefix length
 * (in grapheme clusters) such that `prefix + "…"` measures within `maxPx`; the
 * ellipsis is appended and `truncated: true` is returned.
 *
 * `measure` is injectable so the algorithm can be exercised without a DOM.
 */
export function truncateToWidth(
  text: string,
  maxPx: number,
  fontSpec: string,
  measure: (text: string, fontSpec: string) => number = measureTextWidth,
): TruncateResult {
  if (!text) return { text: '', truncated: false };
  if (measure(text, fontSpec) <= maxPx) return { text, truncated: false };

  const total = charCount(text);
  // Largest n in [0, total-1] with measure(prefix(n) + "…") <= maxPx.
  let lo = 0;
  let hi = total - 1;
  let best = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const candidate = sliceChars(text, 0, mid) + ELLIPSIS;
    if (measure(candidate, fontSpec) <= maxPx) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return { text: sliceChars(text, 0, best) + ELLIPSIS, truncated: true };
}
