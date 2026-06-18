// ──────────────────────────────────────────────────────────────────────────
// Pure pagination helpers — no Astro, no DOM, no I/O — so they're trivially
// unit-testable (see pagination.test.ts) and reusable across the blog index
// and the category hubs.
//
// The blog uses Astro's build-time `paginate()`, which hands each page its
// `currentPage` (1-based) and `lastPage` (total page count). From just those
// two numbers, `getPaginationRange` computes the compact list of page numbers
// to render, collapsing long stretches into ellipses so the control never
// grows unbounded on a blog with many pages.
// ──────────────────────────────────────────────────────────────────────────

/** A single slot in the rendered pagination control. */
export type PaginationItem = number | 'ellipsis';

/** Inclusive integer range [start, end]; empty when end < start. */
function range(start: number, end: number): number[] {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Build the page-number window for a numbered pagination control.
 *
 * Always shows the first and last page, plus `siblingCount` pages on each side
 * of the current page. Gaps between those anchors are collapsed to a single
 * `'ellipsis'` marker — but only when the gap hides MORE than one page; a gap
 * of exactly one page is filled with that page number instead (an ellipsis
 * standing in for a single page wastes space and drops a link). When the total
 * page count is small enough that windowing wouldn't save any slots, the full
 * 1..lastPage sequence is returned.
 *
 * @param currentPage  1-based index of the active page (clamped into range).
 * @param lastPage     Total number of pages (>= 0). Returns [] when < 1.
 * @param siblingCount Pages to show on each side of the current page (default 1).
 *
 * Examples (siblingCount = 1):
 *   (1, 1)   → [1]
 *   (3, 5)   → [1, 2, 3, 4, 5]
 *   (1, 10)  → [1, 2, 'ellipsis', 10]
 *   (4, 10)  → [1, 2, 3, 4, 5, 'ellipsis', 10]   (single left gap filled)
 *   (5, 10)  → [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 *   (10, 10) → [1, 'ellipsis', 9, 10]
 */
export function getPaginationRange(
  currentPage: number,
  lastPage: number,
  siblingCount = 1,
): PaginationItem[] {
  if (lastPage < 1) return [];

  // Clamp the current page into [1, lastPage] so out-of-range inputs (bad URL,
  // off-by-one) degrade gracefully instead of producing a broken window.
  const current = Math.min(Math.max(currentPage, 1), lastPage);

  // When the page count is small, windowing can't save slots versus just
  // listing every page: first + last + current + 2*siblings + 2 ellipses.
  if (lastPage <= 2 * siblingCount + 5) {
    return range(1, lastPage);
  }

  // The anchors we always want visible: first page, last page, and the
  // sibling window around the current page.
  const anchors = new Set<number>([1, lastPage]);
  for (let p = current - siblingCount; p <= current + siblingCount; p++) {
    if (p >= 1 && p <= lastPage) anchors.add(p);
  }

  const sorted = [...anchors].sort((a, b) => a - b);

  // Walk the sorted anchors, inserting an ellipsis (gap > 1 page) or the single
  // missing page (gap === 1 page) between non-adjacent neighbours.
  const result: PaginationItem[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0) {
      const gap = sorted[i] - sorted[i - 1];
      if (gap === 2) {
        result.push(sorted[i - 1] + 1);
      } else if (gap > 2) {
        result.push('ellipsis');
      }
    }
    result.push(sorted[i]);
  }
  return result;
}
