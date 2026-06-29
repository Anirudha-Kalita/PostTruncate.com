/**
 * Landing_Page hash-scroll wiring (DOM-injected, test-friendly).
 *
 * `initHashScroll` reproduces the exact guards and effects of the Landing_Page's
 * hash-scroll correction without hard-coding the global `window`/`document`/
 * `ResizeObserver`, so the wiring can be exercised in a DOM-free test. The
 * runtime page passes the real globals; tests pass shims with a virtual clock.
 *
 * Behavior (must stay identical to the inline `<script>` it replaces):
 * - No hash (or a bare `#`) → no-op, no observer, no scroll (Requirement 2.4).
 * - Hash matches no element → no-op (Requirement 2.5).
 * - No `<astro-island>` on the page → defer to native scroll; no observer
 *   (Requirement 2.6).
 * - Hash + island present → attach a `ResizeObserver` on `documentElement`
 *   whose callback only signals "size changed" (no geometric read), drive a
 *   `createScrollSettler` (debounce 100 ms, hard cap 6000 ms), and on settle
 *   disconnect the observer and `scrollIntoView({ block: 'start', behavior:
 *   'instant' })` exactly once (Requirements 2.1, 2.2, 2.3, 2.7, 2.8).
 */
import { createScrollSettler, type ScrollSettler } from './scrollSettle';

/** Quiet period (ms) with no size change that marks layout as settled. */
export const HASH_SCROLL_DEBOUNCE_MS = 100;
/** Absolute upper bound (ms) after which the corrective scroll runs regardless. */
export const HASH_SCROLL_MAX_WAIT_MS = 6000;

/** The Hash_Target the corrective scroll lands on. */
export interface HashScrollTarget {
  scrollIntoView: (options: { block: 'start'; behavior: 'instant' }) => void;
}

/**
 * The minimal `ResizeObserver` surface the wiring needs. `observe` takes an
 * `Element` so the real `ResizeObserver` is assignable to this interface; the
 * settle logic never reads the element, it only observes it.
 */
export interface HashScrollObserver {
  observe: (target: Element) => void;
  disconnect: () => void;
}

/** The minimal `window` surface the wiring needs. */
export interface HashScrollWindow {
  location: { hash: string };
  setTimeout: (cb: () => void, ms: number) => number;
  clearTimeout: (handle: number) => void;
}

/** The minimal `document` surface the wiring needs. */
export interface HashScrollDocument {
  querySelector: (selector: string) => HashScrollTarget | null;
  documentElement: Element;
}

/** Injected globals; the page supplies the real ones, tests supply shims. */
export interface HashScrollDeps {
  window: HashScrollWindow;
  document: HashScrollDocument;
  ResizeObserver: new (callback: () => void) => HashScrollObserver;
}

/** Handle returned when wiring is attached (null when a guard short-circuits). */
export interface HashScrollHandle {
  observer: HashScrollObserver;
  settler: ScrollSettler;
}

/**
 * Wire the corrective hash-scroll if (and only if) there is a hash that matches
 * an element and an `<astro-island>` is present. Returns the attached
 * observer/settler, or `null` when any guard defers to native behavior.
 */
export function initHashScroll(deps: HashScrollDeps): HashScrollHandle | null {
  const { window, document, ResizeObserver } = deps;

  const hash = window.location.hash;
  // Req 2.4: no hash (or a bare "#") → nothing to correct.
  if (!hash || hash === '#') return null;

  // Req 2.5: hash that matches no element → no-op.
  const el = document.querySelector(hash);
  // Req 2.6: no island on this page → browser's native hash scroll is enough.
  const island = document.querySelector('astro-island');
  if (!el || !island) return null;

  // The callback performs no geometric read — it only signals "size changed".
  const observer = new ResizeObserver(() => settler.notifyChange());

  const settler = createScrollSettler(
    {
      setTimer: (cb, ms) => window.setTimeout(cb, ms),
      clearTimer: (handle) => window.clearTimeout(handle),
      onSettle: () => {
        observer.disconnect();
        // Req 2.2 / 2.3: top of viewport, instant (bypass CSS smooth-scroll).
        el.scrollIntoView({ block: 'start', behavior: 'instant' });
      },
    },
    { debounceMs: HASH_SCROLL_DEBOUNCE_MS, maxWaitMs: HASH_SCROLL_MAX_WAIT_MS },
  );

  observer.observe(document.documentElement);
  settler.start();

  return { observer, settler };
}
