/**
 * Pure settle-detection state machine (DOM-free, timer-injected).
 *
 * `createScrollSettler` decides WHEN layout has settled so the Landing_Page can
 * run a single corrective hash-scroll, without polling geometric properties.
 * It owns no DOM access and no real timers: the page wiring injects real timer
 * functions (`setTimer`/`clearTimer`) and the settle action (`onSettle`), while
 * a `ResizeObserver` callback drives `notifyChange()`. Because the settler never
 * reads layout, the settle path produces no Forced_Reflow (Requirements 1.1, 1.4).
 *
 * Semantics:
 * - `start()` arms a debounce timer (`debounceMs`) and a hard-cap timer (`maxWaitMs`).
 * - `notifyChange()` clears and re-arms ONLY the debounce timer (resets the quiet
 *   period); it never touches the hard-cap timer.
 * - Settling — the debounce elapsing OR the hard cap elapsing — runs `onSettle`
 *   exactly once, then clears all timers (Requirements 2.1, 2.7, 2.8).
 * - `cancel()` clears all timers and prevents any future `onSettle`.
 * - All post-settle / post-cancel events are no-ops via the `settled` flag
 *   (idempotent, never throws).
 */

/** Injected effects the settler relies on (no DOM, no real timers of its own). */
export interface ScrollSettlerDeps {
  /** Schedule a callback after `ms`; returns an opaque handle. */
  setTimer: (cb: () => void, ms: number) => number;
  /** Cancel a previously scheduled callback. */
  clearTimer: (handle: number) => void;
  /** The action to run exactly once when layout is judged settled. */
  onSettle: () => void;
}

/** Tuning options for the settle decision. */
export interface ScrollSettlerOptions {
  /** Quiet period with no size change that marks layout as settled. */
  debounceMs: number;
  /** Absolute upper bound from start() after which onSettle runs regardless. */
  maxWaitMs: number;
}

/** The settler control surface exposed to the page wiring. */
export interface ScrollSettler {
  /** Begin waiting. Arms the debounce timer and the hard-cap timer. */
  start: () => void;
  /** Signal that the observed size changed; resets the debounce timer. */
  notifyChange: () => void;
  /** Cancel all timers without firing onSettle (cleanup). */
  cancel: () => void;
}

/** Internal settler state (not exported). */
interface SettlerState {
  started: boolean;
  /** Ensures onSettle runs at most once and gates all later events. */
  settled: boolean;
  debounceHandle: number | null;
  capHandle: number | null;
}

export function createScrollSettler(
  deps: ScrollSettlerDeps,
  options: ScrollSettlerOptions,
): ScrollSettler {
  const { setTimer, clearTimer, onSettle } = deps;
  const { debounceMs, maxWaitMs } = options;

  const state: SettlerState = {
    started: false,
    settled: false,
    debounceHandle: null,
    capHandle: null,
  };

  function clearDebounce(): void {
    if (state.debounceHandle !== null) {
      clearTimer(state.debounceHandle);
      state.debounceHandle = null;
    }
  }

  function clearCap(): void {
    if (state.capHandle !== null) {
      clearTimer(state.capHandle);
      state.capHandle = null;
    }
  }

  function clearAllTimers(): void {
    clearDebounce();
    clearCap();
  }

  function settle(): void {
    // Idempotent: only the first settle fires onSettle; later timer callbacks
    // or notifyChange calls are no-ops.
    if (state.settled) return;
    state.settled = true;
    clearAllTimers();
    onSettle();
  }

  function armDebounce(): void {
    clearDebounce();
    state.debounceHandle = setTimer(settle, debounceMs);
  }

  return {
    start(): void {
      // Guard against double-start; once settled or cancelled, do nothing.
      if (state.started || state.settled) return;
      state.started = true;
      // Arm debounce so an already-settled page (no resizes) still fires after
      // debounceMs (Requirement 2.8), and arm the hard cap (Requirement 2.7).
      armDebounce();
      state.capHandle = setTimer(settle, maxWaitMs);
    },

    notifyChange(): void {
      // Ignore signals before start or after settle (idempotent, no throw).
      if (!state.started || state.settled) return;
      // Reset only the quiet period; never touch the hard-cap timer.
      armDebounce();
    },

    cancel(): void {
      // Prevent any future onSettle and release all timers.
      state.settled = true;
      clearAllTimers();
    },
  };
}
