import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  initHashScroll,
  HASH_SCROLL_DEBOUNCE_MS,
  HASH_SCROLL_MAX_WAIT_MS,
  type HashScrollDeps,
  type HashScrollObserver,
  type HashScrollTarget,
} from './hashScroll';

// ───────────────────────────────────────────────────────────────────────────
// Test doubles: a virtual clock (so settle is deterministic without real
// timers), a recording ResizeObserver, and a minimal document. None touch the
// DOM — they exercise the exact guards + wiring of initHashScroll.
// ───────────────────────────────────────────────────────────────────────────

interface VirtualClock {
  setTimeout: (cb: () => void, ms: number) => number;
  clearTimeout: (handle: number) => void;
  advance: (ms: number) => void;
}

function makeClock(): VirtualClock {
  let now = 0;
  let seq = 0;
  const timers = new Map<number, { time: number; cb: () => void }>();

  const setTimeout = (cb: () => void, ms: number): number => {
    const id = ++seq;
    timers.set(id, { time: now + ms, cb });
    return id;
  };
  const clearTimeout = (handle: number): void => {
    timers.delete(handle);
  };
  const advance = (ms: number): void => {
    const target = now + ms;
    // Fire due timers in chronological order; callbacks may schedule/clear more.
    for (;;) {
      let nextId: number | null = null;
      let nextTime = Infinity;
      for (const [id, t] of timers) {
        if (t.time <= target && t.time < nextTime) {
          nextTime = t.time;
          nextId = id;
        }
      }
      if (nextId === null) break;
      const entry = timers.get(nextId)!;
      timers.delete(nextId);
      now = entry.time;
      entry.cb();
    }
    now = target;
  };

  return { setTimeout, clearTimeout, advance };
}

class RecordingResizeObserver implements HashScrollObserver {
  static instances: RecordingResizeObserver[] = [];
  callback: () => void;
  observed: Element[] = [];
  disconnected = false;

  constructor(callback: () => void) {
    this.callback = callback;
    RecordingResizeObserver.instances.push(this);
  }
  observe(target: Element): void {
    this.observed.push(target);
  }
  disconnect(): void {
    this.disconnected = true;
  }
  /** Simulate a size change reported by the browser. */
  trigger(): void {
    this.callback();
  }
}

interface ScrollCall {
  block: 'start';
  behavior: 'instant';
}

interface Harness {
  deps: HashScrollDeps;
  clock: VirtualClock;
  scrollCalls: ScrollCall[];
  observers: RecordingResizeObserver[];
}

function makeHarness(opts: {
  hash: string;
  matchHash?: boolean;
  hasIsland?: boolean;
}): Harness {
  const { hash, matchHash = true, hasIsland = true } = opts;
  const clock = makeClock();
  const scrollCalls: ScrollCall[] = [];

  RecordingResizeObserver.instances = [];

  const documentElement = { tag: 'html' } as unknown as Element;
  const target: HashScrollTarget = {
    scrollIntoView: (options) => {
      scrollCalls.push(options);
    },
  };
  const island = { tag: 'astro-island' };

  const deps: HashScrollDeps = {
    window: {
      location: { hash },
      setTimeout: clock.setTimeout,
      clearTimeout: clock.clearTimeout,
    },
    document: {
      documentElement,
      querySelector: (selector: string) => {
        if (selector === 'astro-island') return hasIsland ? (island as unknown as HashScrollTarget) : null;
        // Any other selector is treated as the hash lookup.
        return matchHash ? target : null;
      },
    },
    ResizeObserver: RecordingResizeObserver,
  };

  return { deps, clock, scrollCalls, observers: RecordingResizeObserver.instances };
}

// ───────────────────────────────────────────────────────────────────────────
// Guard behavior: no observer, no scroll
// Validates: Requirements 2.4, 2.5, 2.6
// ───────────────────────────────────────────────────────────────────────────

test('no hash → no observer, no scroll, no wiring (Req 2.4)', () => {
  const h = makeHarness({ hash: '' });
  const handle = initHashScroll(h.deps);
  h.clock.advance(HASH_SCROLL_MAX_WAIT_MS + 1);

  assert.equal(handle, null);
  assert.equal(h.observers.length, 0);
  assert.equal(h.scrollCalls.length, 0);
});

test('bare "#" hash → no observer, no scroll (Req 2.4)', () => {
  const h = makeHarness({ hash: '#' });
  const handle = initHashScroll(h.deps);
  h.clock.advance(HASH_SCROLL_MAX_WAIT_MS + 1);

  assert.equal(handle, null);
  assert.equal(h.observers.length, 0);
  assert.equal(h.scrollCalls.length, 0);
});

test('non-matching hash → no observer, no scroll (Req 2.5)', () => {
  const h = makeHarness({ hash: '#missing', matchHash: false });
  const handle = initHashScroll(h.deps);
  h.clock.advance(HASH_SCROLL_MAX_WAIT_MS + 1);

  assert.equal(handle, null);
  assert.equal(h.observers.length, 0);
  assert.equal(h.scrollCalls.length, 0);
});

test('matching hash but missing astro-island → no observer, no scroll (Req 2.6)', () => {
  const h = makeHarness({ hash: '#workspace', hasIsland: false });
  const handle = initHashScroll(h.deps);
  h.clock.advance(HASH_SCROLL_MAX_WAIT_MS + 1);

  assert.equal(handle, null);
  assert.equal(h.observers.length, 0);
  assert.equal(h.scrollCalls.length, 0);
});

// ───────────────────────────────────────────────────────────────────────────
// Wired behavior: observer attached, single instant scroll on settle
// Validates: Requirements 2.1, 2.2, 2.3
// ───────────────────────────────────────────────────────────────────────────

test('matching hash + island → attaches ResizeObserver on documentElement (Req 2.1)', () => {
  const h = makeHarness({ hash: '#workspace' });
  const handle = initHashScroll(h.deps);

  assert.ok(handle, 'expected a wiring handle');
  assert.equal(h.observers.length, 1);
  const observer = h.observers[0];
  assert.equal(observer.observed.length, 1);
  assert.equal(observer.observed[0], h.deps.document.documentElement);
  // Nothing has settled yet, so no scroll before the debounce elapses.
  assert.equal(h.scrollCalls.length, 0);
});

test('settles after the debounce quiet period and scrolls instant/start (Req 2.2, 2.3)', () => {
  const h = makeHarness({ hash: '#workspace' });
  initHashScroll(h.deps);

  // Just before the debounce elapses → not settled yet.
  h.clock.advance(HASH_SCROLL_DEBOUNCE_MS - 1);
  assert.equal(h.scrollCalls.length, 0);

  // Crossing the debounce boundary fires the single corrective scroll.
  h.clock.advance(1);
  assert.equal(h.scrollCalls.length, 1);
  assert.deepEqual(h.scrollCalls[0], { block: 'start', behavior: 'instant' });
  assert.equal(h.observers[0].disconnected, true);
});

test('size changes reset the debounce, then settle once (Req 2.1)', () => {
  const h = makeHarness({ hash: '#workspace' });
  initHashScroll(h.deps);
  const observer = h.observers[0];

  // A resize keeps resetting the quiet period: no settle while changes continue.
  observer.trigger();
  h.clock.advance(HASH_SCROLL_DEBOUNCE_MS - 1);
  observer.trigger();
  h.clock.advance(HASH_SCROLL_DEBOUNCE_MS - 1);
  assert.equal(h.scrollCalls.length, 0);

  // Quiet for a full debounce → settles exactly once.
  h.clock.advance(HASH_SCROLL_DEBOUNCE_MS);
  assert.equal(h.scrollCalls.length, 1);
  assert.deepEqual(h.scrollCalls[0], { block: 'start', behavior: 'instant' });

  // Further resizes after settle never scroll again (idempotent).
  observer.trigger();
  h.clock.advance(HASH_SCROLL_MAX_WAIT_MS);
  assert.equal(h.scrollCalls.length, 1);
});

test('continuous resizes still settle at the hard cap (Req 2.7)', () => {
  const h = makeHarness({ hash: '#workspace' });
  initHashScroll(h.deps);
  const observer = h.observers[0];

  // Resize just under the debounce repeatedly so the debounce never elapses,
  // up to and past the hard cap.
  let elapsed = 0;
  while (elapsed < HASH_SCROLL_MAX_WAIT_MS + HASH_SCROLL_DEBOUNCE_MS) {
    observer.trigger();
    h.clock.advance(HASH_SCROLL_DEBOUNCE_MS - 1);
    elapsed += HASH_SCROLL_DEBOUNCE_MS - 1;
  }

  // The hard cap guarantees exactly one corrective scroll despite churn.
  assert.equal(h.scrollCalls.length, 1);
  assert.deepEqual(h.scrollCalls[0], { block: 'start', behavior: 'instant' });
  assert.equal(observer.disconnected, true);
});
