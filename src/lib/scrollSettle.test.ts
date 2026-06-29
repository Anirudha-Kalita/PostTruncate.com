/**
 * Test harness for `createScrollSettler` (src/lib/scrollSettle.ts).
 *
 * Feature: forced-reflow-fix — Task 2.1: virtual-clock test harness.
 *
 * The settler is a pure, timer-injected state machine: it never reads the DOM
 * or uses real timers. To test it deterministically we drive it with a virtual
 * clock — injectable `setTimer`/`clearTimer` backed by a sorted event queue plus
 * an `advance(ms)` helper that fires due callbacks in time order. A spy
 * `onSettle` counts invocations.
 *
 * The harness helpers are exported so the property/unit tests in tasks 2.2–2.8
 * can reuse them.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  createScrollSettler,
  type ScrollSettler,
  type ScrollSettlerDeps,
  type ScrollSettlerOptions,
} from './scrollSettle';

// ───────────────────────────────────────────────────────────────────────────
// Virtual clock
// ───────────────────────────────────────────────────────────────────────────

/** A single scheduled callback in the virtual clock's queue. */
interface ScheduledEvent {
  /** Opaque handle returned by `setTimer`, used by `clearTimer`. */
  handle: number;
  /** Absolute virtual time (ms) at which the callback should fire. */
  time: number;
  /** Insertion order, used to break ties between events at the same time. */
  seq: number;
  /** The callback to invoke when the event fires. */
  cb: () => void;
  /** Whether the event has been cancelled (via `clearTimer`) or already fired. */
  dead: boolean;
}

/**
 * The virtual clock exposes injectable timer functions for the settler plus an
 * `advance(ms)` helper that deterministically fires due callbacks in time order.
 */
export interface VirtualClock {
  /** Inject as `ScrollSettlerDeps.setTimer`. Schedules `cb` `ms` from `now()`. */
  setTimer: (cb: () => void, ms: number) => number;
  /** Inject as `ScrollSettlerDeps.clearTimer`. Cancels a pending callback. */
  clearTimer: (handle: number) => void;
  /**
   * Advance virtual time by `ms`, firing every callback whose scheduled time
   * falls within the new window, earliest first (ties broken by insertion order).
   * Callbacks scheduled or cancelled during advancement are honoured.
   */
  advance: (ms: number) => void;
  /** Current absolute virtual time in ms. */
  now: () => number;
  /** Count of pending (scheduled, not yet fired or cancelled) callbacks. */
  pendingCount: () => number;
}

/**
 * Create a fresh virtual clock starting at virtual time 0.
 *
 * The clock is deterministic: `advance` processes events strictly in
 * (time, insertion-order) order and tolerates re-entrant scheduling/cancelling
 * (e.g. a settle callback clearing its sibling timer, or `notifyChange`
 * re-arming the debounce timer).
 */
export function createVirtualClock(): VirtualClock {
  let currentTime = 0;
  let nextHandle = 1;
  let nextSeq = 0;
  const queue: ScheduledEvent[] = [];

  function setTimer(cb: () => void, ms: number): number {
    if (!(ms >= 0)) {
      throw new Error(`setTimer requires ms >= 0, received ${ms}`);
    }
    const handle = nextHandle++;
    queue.push({ handle, time: currentTime + ms, seq: nextSeq++, cb, dead: false });
    return handle;
  }

  function clearTimer(handle: number): void {
    const event = queue.find((e) => e.handle === handle && !e.dead);
    if (event) event.dead = true;
  }

  /** Find the earliest live event with time <= limit, or null if none. */
  function nextDue(limit: number): ScheduledEvent | null {
    let best: ScheduledEvent | null = null;
    for (const event of queue) {
      if (event.dead || event.time > limit) continue;
      if (best === null || event.time < best.time || (event.time === best.time && event.seq < best.seq)) {
        best = event;
      }
    }
    return best;
  }

  function advance(ms: number): void {
    if (!(ms >= 0)) {
      throw new Error(`advance requires ms >= 0, received ${ms}`);
    }
    const target = currentTime + ms;
    // Re-scan after every firing so re-entrant scheduling/cancelling is honoured.
    for (let event = nextDue(target); event !== null; event = nextDue(target)) {
      event.dead = true;
      currentTime = event.time;
      event.cb();
    }
    currentTime = target;
    // Drop fired/cancelled events so pendingCount stays accurate and the queue
    // does not grow without bound across long timing sequences.
    for (let i = queue.length - 1; i >= 0; i--) {
      if (queue[i].dead) queue.splice(i, 1);
    }
  }

  return {
    setTimer,
    clearTimer,
    advance,
    now: () => currentTime,
    pendingCount: () => queue.filter((e) => !e.dead).length,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// onSettle spy
// ───────────────────────────────────────────────────────────────────────────

/** A spy `onSettle` plus inspection of how/when it was invoked. */
export interface OnSettleSpy {
  /** Inject as `ScrollSettlerDeps.onSettle`. */
  onSettle: () => void;
  /** Number of times `onSettle` has been called. */
  count: () => number;
  /** Virtual time of the first invocation, or null if never called. */
  firstCallTime: () => number | null;
}

/**
 * Create a spy `onSettle` that counts invocations. Pass the clock's `now` so the
 * spy can record the virtual time of the first settle (used by timing-exactness
 * tests in tasks 2.2–2.5).
 */
export function createOnSettleSpy(now: () => number = () => 0): OnSettleSpy {
  let calls = 0;
  let firstTime: number | null = null;
  return {
    onSettle(): void {
      calls++;
      if (firstTime === null) firstTime = now();
    },
    count: () => calls,
    firstCallTime: () => firstTime,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// Combined harness factory
// ───────────────────────────────────────────────────────────────────────────

/** Everything a settler test needs: the settler under test plus its drivers. */
export interface SettlerHarness {
  settler: ScrollSettler;
  clock: VirtualClock;
  spy: OnSettleSpy;
  options: ScrollSettlerOptions;
}

/** Default tuning used by the Landing_Page wiring; reused as test defaults. */
export const DEFAULT_OPTIONS: ScrollSettlerOptions = { debounceMs: 100, maxWaitMs: 6000 };

/**
 * Wire a fresh `createScrollSettler` to a fresh virtual clock and onSettle spy.
 * The settler is created but NOT started — call `harness.settler.start()`.
 */
export function createSettlerHarness(
  options: ScrollSettlerOptions = DEFAULT_OPTIONS,
): SettlerHarness {
  const clock = createVirtualClock();
  const spy = createOnSettleSpy(clock.now);
  const deps: ScrollSettlerDeps = {
    setTimer: clock.setTimer,
    clearTimer: clock.clearTimer,
    onSettle: spy.onSettle,
  };
  const settler = createScrollSettler(deps, options);
  return { settler, clock, spy, options };
}

// ───────────────────────────────────────────────────────────────────────────
// Harness self-tests (verify the virtual clock + spy behave correctly so the
// property/unit tests in 2.2–2.8 can rely on them). These are NOT the design's
// correctness properties — those are added in subsequent tasks.
// ───────────────────────────────────────────────────────────────────────────

test('harness: virtual clock fires callbacks in time order', () => {
  const clock = createVirtualClock();
  const fired: number[] = [];
  clock.setTimer(() => fired.push(30), 30);
  clock.setTimer(() => fired.push(10), 10);
  clock.setTimer(() => fired.push(20), 20);
  clock.advance(100);
  assert.deepEqual(fired, [10, 20, 30]);
  assert.equal(clock.now(), 100);
});

test('harness: callbacks at the same time fire in insertion order', () => {
  const clock = createVirtualClock();
  const fired: string[] = [];
  clock.setTimer(() => fired.push('a'), 50);
  clock.setTimer(() => fired.push('b'), 50);
  clock.setTimer(() => fired.push('c'), 50);
  clock.advance(50);
  assert.deepEqual(fired, ['a', 'b', 'c']);
});

test('harness: advance only fires callbacks within the window', () => {
  const clock = createVirtualClock();
  const fired: number[] = [];
  clock.setTimer(() => fired.push(40), 40);
  clock.setTimer(() => fired.push(150), 150);
  clock.advance(100);
  assert.deepEqual(fired, [40]);
  assert.equal(clock.pendingCount(), 1);
  clock.advance(100);
  assert.deepEqual(fired, [40, 150]);
  assert.equal(clock.pendingCount(), 0);
});

test('harness: clearTimer cancels a pending callback', () => {
  const clock = createVirtualClock();
  let fired = false;
  const handle = clock.setTimer(() => {
    fired = true;
  }, 50);
  clock.clearTimer(handle);
  clock.advance(100);
  assert.equal(fired, false);
  assert.equal(clock.pendingCount(), 0);
});

test('harness: re-entrant scheduling during a callback is honoured', () => {
  const clock = createVirtualClock();
  const fired: number[] = [];
  clock.setTimer(() => {
    fired.push(clock.now());
    // Schedule a follow-up while the clock is mid-advance.
    clock.setTimer(() => fired.push(clock.now()), 10);
  }, 20);
  clock.advance(100);
  assert.deepEqual(fired, [20, 30]);
});

test('harness: onSettle spy counts invocations and records first call time', () => {
  const clock = createVirtualClock();
  const spy = createOnSettleSpy(clock.now);
  assert.equal(spy.count(), 0);
  assert.equal(spy.firstCallTime(), null);
  clock.setTimer(spy.onSettle, 75);
  clock.advance(200);
  assert.equal(spy.count(), 1);
  assert.equal(spy.firstCallTime(), 75);
});

test('harness: createSettlerHarness drives the real settler to a single settle', () => {
  const { settler, clock, spy } = createSettlerHarness({ debounceMs: 100, maxWaitMs: 6000 });
  settler.start();
  // No changes: debounce should fire onSettle exactly once at +debounceMs.
  clock.advance(100);
  assert.equal(spy.count(), 1);
  assert.equal(spy.firstCallTime(), 100);
  // Cap timer must have been cleared on settle — nothing else pending.
  assert.equal(clock.pendingCount(), 0);
});

// ───────────────────────────────────────────────────────────────────────────
// Shared drivers for the property/unit tests (tasks 2.2–2.8)
// ───────────────────────────────────────────────────────────────────────────

import fc from 'fast-check';

/**
 * Start the settler, then deliver `notifyChange()` at each absolute virtual
 * time in `changeTimes` (which MUST be ascending). The clock is advanced to
 * each change time before the signal is delivered, so settle timers that come
 * due in between fire naturally (post-settle signals are harmless no-ops).
 */
function driveChangesAfterStart(harness: SettlerHarness, changeTimes: number[]): void {
  const { settler, clock } = harness;
  settler.start();
  for (const t of changeTimes) {
    const delta = t - clock.now();
    if (delta > 0) clock.advance(delta);
    settler.notifyChange();
  }
}

/** Advance far enough past any pending timer to guarantee a settle has fired. */
function flush(harness: SettlerHarness): void {
  harness.clock.advance(harness.options.maxWaitMs + harness.options.debounceMs + 1);
}

/** Turn an array of inter-change gaps into ascending absolute change times. */
function cumulativeTimes(gaps: number[]): number[] {
  const times: number[] = [];
  let acc = 0;
  for (const g of gaps) {
    acc += g;
    times.push(acc);
  }
  return times;
}

// ───────────────────────────────────────────────────────────────────────────
// Property 1: Settle fires exactly once
// ───────────────────────────────────────────────────────────────────────────

// Feature: forced-reflow-fix, Property 1: For any sequence of notifyChange()
// calls and timer advancement after start(), onSettle is invoked exactly once.
// **Validates: Requirements 1.1, 2.1**
test('Property 1: settle fires exactly once for any change sequence', () => {
  fc.assert(
    fc.property(
      // Arbitrary change timestamps anywhere around (and beyond) the hard cap.
      fc.array(fc.integer({ min: 0, max: 8000 }), { maxLength: 40 }),
      (rawTimes) => {
        const changeTimes = [...rawTimes].sort((a, b) => a - b);
        const harness = createSettlerHarness();
        driveChangesAfterStart(harness, changeTimes);
        flush(harness);
        // Exactly one settle: never zero, never more than once.
        assert.equal(harness.spy.count(), 1);
        // All timers released after settle.
        assert.equal(harness.clock.pendingCount(), 0);
      },
    ),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 2: Settle waits for the quiet period
// ───────────────────────────────────────────────────────────────────────────

// Feature: forced-reflow-fix, Property 2: For any sequence of notifyChange()
// calls whose final call is at virtual time t (with t + debounceMs <= maxWaitMs)
// and consecutive gaps shorter than debounceMs, onSettle fires at t + debounceMs
// and not before. **Validates: Requirements 1.3, 2.1**
test('Property 2: settle fires exactly one quiet period after the final change', () => {
  const { debounceMs } = DEFAULT_OPTIONS;
  fc.assert(
    fc.property(
      // Gaps strictly shorter than debounceMs so the debounce never completes
      // between changes; bounded count keeps the final change within the cap.
      fc.array(fc.integer({ min: 1, max: debounceMs - 1 }), { minLength: 1, maxLength: 50 }),
      (gaps) => {
        const changeTimes = cumulativeTimes(gaps);
        const t = changeTimes[changeTimes.length - 1];
        // Precondition guaranteed by the generator bounds (50 * 99 + 100 < 6000).
        fc.pre(t + debounceMs <= DEFAULT_OPTIONS.maxWaitMs);

        const harness = createSettlerHarness();
        driveChangesAfterStart(harness, changeTimes);
        // now() === t after the final change.
        assert.equal(harness.clock.now(), t);

        // Just before the quiet period elapses: still not settled.
        harness.clock.advance(debounceMs - 1);
        assert.equal(harness.spy.count(), 0);

        // The instant the quiet period completes: settle fires, at t+debounceMs.
        harness.clock.advance(1);
        assert.equal(harness.spy.count(), 1);
        assert.equal(harness.spy.firstCallTime(), t + debounceMs);
      },
    ),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 3: Hard cap bounds the wait
// ───────────────────────────────────────────────────────────────────────────

// Feature: forced-reflow-fix, Property 3: For any sequence of notifyChange()
// calls continuing at intervals shorter than debounceMs past maxWaitMs, onSettle
// fires no later than start + maxWaitMs. **Validates: Requirements 2.7**
test('Property 3: the hard cap bounds the wait even under continuous change', () => {
  const { debounceMs, maxWaitMs } = DEFAULT_OPTIONS;
  fc.assert(
    fc.property(
      // Gaps in [50, 99] (< debounceMs) with enough changes that the sequence
      // continues well past maxWaitMs (min total 130 * 50 = 6500 > 6000).
      fc.array(fc.integer({ min: 50, max: debounceMs - 1 }), { minLength: 130, maxLength: 200 }),
      (gaps) => {
        const changeTimes = cumulativeTimes(gaps);
        // Sanity: the change stream genuinely extends past the hard cap.
        fc.pre(changeTimes[changeTimes.length - 1] > maxWaitMs);

        const harness = createSettlerHarness();
        driveChangesAfterStart(harness, changeTimes);
        flush(harness);

        assert.equal(harness.spy.count(), 1);
        const fired = harness.spy.firstCallTime();
        assert.notEqual(fired, null);
        // Fires no later than the hard cap; here, exactly at it (debounce never
        // completes because every gap is shorter than debounceMs).
        assert.ok((fired as number) <= maxWaitMs);
        assert.equal(fired, maxWaitMs);
      },
    ),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 4: Already-settled input still fires
// ───────────────────────────────────────────────────────────────────────────

// Feature: forced-reflow-fix, Property 4: For any run where start() is called
// and no notifyChange() ever occurs, onSettle still fires at start + debounceMs.
// **Validates: Requirements 2.8**
test('Property 4: with no changes, settle fires at start + debounceMs', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 3000 }),
      fc.integer({ min: 0, max: 3000 }),
      (debounceMs, capExtra) => {
        const options: ScrollSettlerOptions = { debounceMs, maxWaitMs: debounceMs + capExtra };
        const harness = createSettlerHarness(options);
        harness.settler.start();
        // No notifyChange at all (already-hydrated / bfcache case).
        flush(harness);
        assert.equal(harness.spy.count(), 1);
        assert.equal(harness.spy.firstCallTime(), debounceMs);
      },
    ),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 5: No geometric reads in the settle path
// ───────────────────────────────────────────────────────────────────────────

/** DOM/geometric globals the settle path must never touch. */
const DOM_GLOBALS = [
  'document',
  'window',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'getComputedStyle',
] as const;

/**
 * Run `fn` with tripwire getters installed on the DOM/geometric globals, and
 * return how many times any of them was accessed. Any read by the code under
 * test increments the counter; the settler must produce zero.
 */
function withDomTripwire(fn: () => void): number {
  let reads = 0;
  const saved = new Map<string, PropertyDescriptor | undefined>();
  for (const name of DOM_GLOBALS) {
    saved.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, {
      configurable: true,
      get() {
        reads++;
        return undefined;
      },
    });
  }
  try {
    fn();
  } finally {
    for (const name of DOM_GLOBALS) {
      const descriptor = saved.get(name);
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete (globalThis as Record<string, unknown>)[name];
    }
  }
  return reads;
}

// Feature: forced-reflow-fix, Property 5: For any execution, the settler reaches
// onSettle using only timer callbacks and notifyChange signals, performing zero
// reads of DOM/geometric globals (only the injected onSettle is layout-affecting).
// **Validates: Requirements 1.1, 1.4**
test('Property 5: the settle path performs no geometric/DOM reads', () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer({ min: 0, max: 8000 }), { maxLength: 40 }),
      (rawTimes) => {
        const changeTimes = [...rawTimes].sort((a, b) => a - b);
        const harness = createSettlerHarness();
        const reads = withDomTripwire(() => {
          driveChangesAfterStart(harness, changeTimes);
          flush(harness);
        });
        // The settler settled using only injected timers + notifyChange…
        assert.equal(harness.spy.count(), 1);
        // …and touched no DOM/geometric global along the way.
        assert.equal(reads, 0);
      },
    ),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 6: Idempotent after settle and after cancel
// ───────────────────────────────────────────────────────────────────────────

/** A post-terminal event: either a notifyChange or a clock advance. */
interface LateEvent {
  notify: boolean;
  ms: number;
}

const lateEventArb = fc.array(
  fc.record({ notify: fc.boolean(), ms: fc.integer({ min: 0, max: 10000 }) }),
  { maxLength: 30 },
);

/** Replay arbitrary late events against an already-terminal settler. */
function replayLateEvents(harness: SettlerHarness, events: LateEvent[]): void {
  for (const ev of events) {
    if (ev.notify) harness.settler.notifyChange();
    else harness.clock.advance(ev.ms);
  }
}

// Feature: forced-reflow-fix, Property 6: Any notifyChange()/timer event after
// settle, or any event after cancel(), does not re-invoke onSettle and does not
// throw. **Validates: Requirements 1.1**
test('Property 6: idempotent after settle and after cancel', () => {
  fc.assert(
    fc.property(lateEventArb, (lateEvents) => {
      // Branch A — events delivered AFTER a normal settle are no-ops.
      const settled = createSettlerHarness();
      settled.settler.start();
      flush(settled); // onSettle has fired exactly once
      assert.equal(settled.spy.count(), 1);
      replayLateEvents(settled, lateEvents); // must not throw
      assert.equal(settled.spy.count(), 1);

      // Branch B — cancel() before the quiet period elapses prevents onSettle,
      // and later events stay no-ops.
      const cancelled = createSettlerHarness();
      cancelled.settler.start();
      cancelled.clock.advance(DEFAULT_OPTIONS.debounceMs - 1); // before debounce
      cancelled.settler.cancel();
      assert.equal(cancelled.spy.count(), 0);
      replayLateEvents(cancelled, lateEvents); // must not throw
      assert.equal(cancelled.spy.count(), 0);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Task 2.8: Example / unit tests for specific scenarios
// **Validates: Requirements 2.1, 2.7, 2.8**
// ───────────────────────────────────────────────────────────────────────────

test('example: single notifyChange then idle settles once at +debounceMs', () => {
  const { debounceMs } = DEFAULT_OPTIONS;
  const harness = createSettlerHarness();
  harness.settler.start();
  // One change at t = 50 (within the initial debounce window).
  harness.clock.advance(50);
  harness.settler.notifyChange();
  // Idle thereafter: settle one quiet period after the change.
  harness.clock.advance(debounceMs - 1);
  assert.equal(harness.spy.count(), 0);
  harness.clock.advance(1);
  assert.equal(harness.spy.count(), 1);
  assert.equal(harness.spy.firstCallTime(), 50 + debounceMs);
  assert.equal(harness.clock.pendingCount(), 0);
});

test('example: rapid changes every debounceMs-1 past maxWaitMs settle at maxWaitMs', () => {
  const { debounceMs, maxWaitMs } = DEFAULT_OPTIONS;
  const harness = createSettlerHarness();
  harness.settler.start();
  // Fire a change every debounceMs-1 ms until we are past the hard cap.
  let t = 0;
  while (t < maxWaitMs + debounceMs) {
    harness.clock.advance(debounceMs - 1);
    t += debounceMs - 1;
    harness.settler.notifyChange();
  }
  // The hard cap settled it at exactly maxWaitMs; the debounce never completed.
  assert.equal(harness.spy.count(), 1);
  assert.equal(harness.spy.firstCallTime(), maxWaitMs);
});

test('example: start() with no changes settles at +debounceMs', () => {
  const { debounceMs } = DEFAULT_OPTIONS;
  const harness = createSettlerHarness();
  harness.settler.start();
  harness.clock.advance(debounceMs - 1);
  assert.equal(harness.spy.count(), 0);
  harness.clock.advance(1);
  assert.equal(harness.spy.count(), 1);
  assert.equal(harness.spy.firstCallTime(), debounceMs);
});

test('example: cancel() before debounce elapses means onSettle never runs', () => {
  const { debounceMs, maxWaitMs } = DEFAULT_OPTIONS;
  const harness = createSettlerHarness();
  harness.settler.start();
  harness.clock.advance(debounceMs - 1);
  harness.settler.cancel();
  // Advance well past both timers: still no settle.
  harness.clock.advance(maxWaitMs + debounceMs);
  assert.equal(harness.spy.count(), 0);
  assert.equal(harness.clock.pendingCount(), 0);
});

test('example: events after settle are ignored', () => {
  const harness = createSettlerHarness();
  harness.settler.start();
  flush(harness);
  assert.equal(harness.spy.count(), 1);
  // Late signals and timer advancement after settle are harmless no-ops.
  harness.settler.notifyChange();
  harness.clock.advance(10000);
  harness.settler.notifyChange();
  assert.equal(harness.spy.count(), 1);
});
