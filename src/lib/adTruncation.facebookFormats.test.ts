import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  truncateFacebookReelsPrimary,
  truncateFacebookPrimary,
  clampCarouselHeadline,
  clampCarouselDescription,
  addCard,
  removeCard,
  stepCard,
  facebookBadgeState,
} from './adTruncation';
import { AD_PLATFORM_CONFIG } from '../data/adPlatformConfig';

// ───────────────────────────────────────────────────────────────────────────
// Generators & helpers
//
// These properties exercise the new pure Facebook-format helpers in
// `adTruncation.ts`: the Reels caption truncator, the carousel card-field
// clamps, the carousel shared-primary truncator, the card-set reducers
// (addCard / removeCard / stepCard), and the per-format status-badge helper.
//
// All caps, cutoffs, and bounds are read from `AD_PLATFORM_CONFIG.facebook` so
// the tests stay in lock-step with the single source of truth. Grapheme counts
// are verified against an INDEPENDENT `Intl.Segmenter` oracle (NOT the engine's
// own `charCount`/`splitGraphemes`) so the whole-grapheme-prefix assertions are
// checked by a separate implementation.
// ───────────────────────────────────────────────────────────────────────────

const FB = AD_PLATFORM_CONFIG.facebook;

// Independent grapheme segmentation oracle.
const SEGMENTER = new Intl.Segmenter('en', { granularity: 'grapheme' });
function graphemes(text: string): string[] {
  return [...SEGMENTER.segment(text)].map((s) => s.segment);
}
function graphemeCount(text: string): number {
  return graphemes(text).length;
}

// A spread of "interesting" unicode characters that stress grapheme clustering.
const unicodeChars = [
  'a', 'Z', '9', ' ', '.', '-', '_', '/',
  '世', '界', '日', '本', '語', // CJK (wide)
  'é', 'ü', 'ñ', 'ß', // Latin-1 / extended
  '😀', '🎉', '🚀', '🔥', // single emoji (astral)
  '👨‍👩‍👧‍👦', // ZWJ family sequence
  '👍🏽', // emoji + skin-tone modifier
  '🇺🇸', '🇯🇵', // regional-indicator flags
  'e\u0301', 'a\u0300', 'n\u0303', // base + combining mark
  '𝕳𝖊𝖑𝖑𝖔', // mathematical alphanumeric (astral)
  '𠀀', '𡃁', // CJK extension B (astral)
];

// Unicode-heavy fragments long enough to exceed every Facebook cap/cutoff
// (the largest is the 125-grapheme feed primary), so both the "within" and
// "over" branches are exercised.
const unicodeFragment = fc
  .array(fc.constantFrom(...unicodeChars), { minLength: 0, maxLength: 160 })
  .map((parts) => parts.join(''));

// Field text: arbitrary strings plus unicode-heavy fragments, including the
// empty string and values long enough to exceed every cap.
const fieldText: fc.Arbitrary<string> = fc.oneof(
  fc.string({ maxLength: 200 }),
  fc.string({ unit: 'binary', maxLength: 160 }),
  unicodeFragment,
  fc.constantFrom(
    '',
    '   ',
    'A short caption that fits.',
    '😀🎉🚀🔥💧🌊🏔🗻🌋🎆🎇🧨✨🎈🎉🎊🥳🎂🍰🧁',
    '👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦',
    '日本語のとても長いキャプションテキストでありここで切り詰められるべきものです日本語のとても長い',
    'a-very-long-single-token-string-that-clearly-runs-well-past-one-hundred-and-twenty-five-grapheme-clusters-to-force-truncation-behaviour',
  ),
);

// Asserts that `out` is exactly the first N graphemes of `src` (no cluster was
// split mid-sequence), using the independent oracle.
function assertWholeGraphemePrefix(src: string, out: string): void {
  const srcGraphemes = graphemes(src);
  const outGraphemes = graphemes(out);
  assert.equal(out, srcGraphemes.slice(0, outGraphemes.length).join(''));
  assert.ok(!out.includes('\uFFFD'), 'replacement char indicates a broken cluster');
}

// ───────────────────────────────────────────────────────────────────────────
// Feature: facebook-ad-formats, Property 1: Reels primary truncation
// Validates: Requirements 4.2, 4.3, 4.4, 4.5
// ───────────────────────────────────────────────────────────────────────────

test('Property 1: truncateFacebookReelsPrimary truncates at the Reels cutoff, grapheme-safe', () => {
  const cutoff = FB.reelsPrimaryTruncateChars;
  const label = FB.seeMoreLabel;
  fc.assert(
    fc.property(fieldText, (text) => {
      const { text: out, truncated } = truncateFacebookReelsPrimary(text);
      const count = graphemeCount(text);

      if (count <= cutoff) {
        // Within cutoff → full text, no affordance (Req 4.2).
        assert.equal(out, text);
        assert.equal(truncated, false);
      } else {
        // Over cutoff → exactly the first `cutoff` graphemes + See More (Req 4.3).
        assert.equal(truncated, true);
        assert.ok(out.endsWith(label), `output must end with the See More label: ${JSON.stringify(out)}`);
        const sliced = out.slice(0, out.length - label.length);
        assert.equal(graphemeCount(sliced), cutoff, 'sliced prefix must be exactly the cutoff grapheme count');
        // The sliced prefix is a whole-grapheme prefix of the input (Req 4.4).
        assertWholeGraphemePrefix(text, sliced);
      }
    }),
    { numRuns: 150 },
  );
});

test('Property 1: empty Reels caption yields { text: "", truncated: false } (Req 4.5)', () => {
  assert.deepEqual(truncateFacebookReelsPrimary(''), { text: '', truncated: false });
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: facebook-ad-formats, Property 2: Carousel card-field clamp
// Validates: Requirements 7.2, 7.3, 7.4, 7.5, 7.8
// ───────────────────────────────────────────────────────────────────────────

test('Property 2: carousel card-field clamps hard-clamp grapheme-safe with no affordance', () => {
  const label = FB.seeMoreLabel;
  const fields: ReadonlyArray<{ clamp: (t: string) => { text: string; truncated: boolean }; cap: number }> = [
    { clamp: clampCarouselHeadline, cap: FB.carousel.cardHeadlineMax },
    { clamp: clampCarouselDescription, cap: FB.carousel.cardDescriptionMax },
  ];
  for (const { clamp, cap } of fields) {
    fc.assert(
      fc.property(fieldText, (text) => {
        const { text: out, truncated } = clamp(text);
        const count = graphemeCount(text);

        // Output never exceeds the cap (Req 7.2, 7.4).
        assert.ok(graphemeCount(out) <= cap, `output over cap (${cap}): ${graphemeCount(out)}`);
        // Never appends a See More affordance (Req 7.2, 7.4).
        assert.ok(!out.endsWith(label), `clamp must not append the See More label: ${JSON.stringify(out)}`);

        if (count <= cap) {
          // Within cap → unchanged, not truncated (Req 7.3, 7.5).
          assert.equal(out, text);
          assert.equal(truncated, false);
        } else {
          // Over cap → exactly `cap` graphemes, flagged truncated (Req 7.2, 7.4).
          assert.equal(truncated, true);
          assert.equal(graphemeCount(out), cap);
        }
        // Always a whole-grapheme prefix of the input (Req 7.8).
        assertWholeGraphemePrefix(text, out);
      }),
      { numRuns: 150 },
    );
  }
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: facebook-ad-formats, Property 3: Carousel shared-primary truncation
// Validates: Requirements 7.6, 7.7
// ───────────────────────────────────────────────────────────────────────────

test('Property 3: carousel shared primary truncates identically to feed primary', () => {
  const cutoff = FB.primaryTruncateChars;
  const label = FB.seeMoreLabel;
  fc.assert(
    fc.property(fieldText, (text) => {
      // The carousel shared primary reuses truncateFacebookPrimary verbatim, so
      // feed and carousel can never diverge.
      const result = truncateFacebookPrimary(text);
      const count = graphemeCount(text);

      if (count <= cutoff) {
        // Within feed cutoff → full text, no affordance (Req 7.7).
        assert.deepEqual(result, { text, truncated: false });
      } else {
        // Over feed cutoff → first `cutoff` graphemes + See More (Req 7.6).
        assert.equal(result.truncated, true);
        assert.ok(result.text.endsWith(label));
        const sliced = result.text.slice(0, result.text.length - label.length);
        assert.equal(graphemeCount(sliced), cutoff);
        assertWholeGraphemePrefix(text, sliced);
      }
    }),
    { numRuns: 150 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: facebook-ad-formats, Property 4: Card-count reducer stays within bounds
// Validates: Requirements 5.3, 5.4, 5.5, 5.6
// ───────────────────────────────────────────────────────────────────────────

const MIN = FB.carousel.minCards;
const MAX = FB.carousel.maxCards;

// An operation over the card set: add, or remove a card at an in-range index.
type CardOp = { kind: 'add' } | { kind: 'remove' };
const cardOpArb: fc.Arbitrary<CardOp> = fc.oneof(
  fc.constant<CardOp>({ kind: 'add' }),
  fc.constant<CardOp>({ kind: 'remove' }),
);
const opSequence = fc.array(cardOpArb, { minLength: 0, maxLength: 40 });

// A valid starting state: count in [min, max] and active index in [0, count-1].
const startState = fc
  .integer({ min: MIN, max: MAX })
  .chain((count) => fc.record({ count: fc.constant(count), active: fc.integer({ min: 0, max: count - 1 }) }));

test('Property 4: addCard/removeCard keep count in [min, max] with ±1 transitions', () => {
  fc.assert(
    fc.property(startState, opSequence, ({ count: startCount, active: startActive }, ops) => {
      let count = startCount;
      let active = startActive;
      for (const op of ops) {
        if (op.kind === 'add') {
          const before = count;
          const res = addCard(count, active, MIN, MAX);
          if (before < MAX) {
            assert.equal(res.count, before + 1, 'addCard below max must increment by 1');
            assert.equal(res.activeIndex, before, 'addCard must select the new last card');
            assert.equal(res.changed, true);
            assert.equal(res.atLimit, false);
          } else {
            assert.equal(res.count, before, 'addCard at max must leave count unchanged');
            assert.equal(res.changed, false);
            assert.equal(res.atLimit, true);
          }
          count = res.count;
          active = res.activeIndex;
        } else {
          const before = count;
          const removeIndex = active; // remove the active card
          const res = removeCard(count, removeIndex, active, MIN);
          if (before > MIN) {
            assert.equal(res.count, before - 1, 'removeCard above min must decrement by 1');
            assert.equal(res.changed, true);
            assert.equal(res.atLimit, false);
          } else {
            assert.equal(res.count, before, 'removeCard at min must leave count unchanged');
            assert.equal(res.changed, false);
            assert.equal(res.atLimit, true);
          }
          count = res.count;
          active = res.activeIndex;
        }
        // Invariant: count always within [min, max].
        assert.ok(count >= MIN && count <= MAX, `count out of bounds: ${count}`);
      }
    }),
    { numRuns: 200 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: facebook-ad-formats, Property 5: Active card index is always valid and transitions per spec
// Validates: Requirements 5.7, 5.8, 8.1, 8.3, 8.4
// ───────────────────────────────────────────────────────────────────────────

// An operation: remove the active card, or step the active index by ±1.
type NavOp = { kind: 'remove' } | { kind: 'step'; dir: -1 | 1 };
const navOpArb: fc.Arbitrary<NavOp> = fc.oneof(
  fc.constant<NavOp>({ kind: 'remove' }),
  fc.constant<NavOp>({ kind: 'step', dir: -1 }),
  fc.constant<NavOp>({ kind: 'step', dir: 1 }),
);
const navSequence = fc.array(navOpArb, { minLength: 0, maxLength: 40 });

test('Property 5: active index stays in [0, count-1] and transitions per spec', () => {
  fc.assert(
    fc.property(startState, navSequence, ({ count: startCount, active: startActive }, ops) => {
      let count = startCount;
      let active = startActive;
      for (const op of ops) {
        if (op.kind === 'remove') {
          const before = count;
          const beforeActive = active;
          const res = removeCard(count, beforeActive, beforeActive, MIN);
          if (before > MIN) {
            if (beforeActive === before - 1) {
              // Removing the active LAST card → move to the preceding card (Req 5.8).
              assert.equal(res.activeIndex, beforeActive - 1);
            } else {
              // Removing the active non-last card → index stays, the following
              // card shifts into it (Req 5.7).
              assert.equal(res.activeIndex, beforeActive);
            }
          }
          count = res.count;
          active = res.activeIndex;
        } else {
          const before = active;
          const next = stepCard(active, op.dir, count);
          const wouldBe = before + op.dir;
          if (wouldBe < 0 || wouldBe > count - 1) {
            // At a bound → no-op (Req 8.3, 8.4).
            assert.equal(next, before, 'stepCard at bound must be a no-op');
          } else {
            // One position inward (Req 8.1).
            assert.equal(next, wouldBe);
          }
          active = next;
        }
        // Invariant: active index always within [0, count-1].
        assert.ok(active >= 0 && active < count, `active out of bounds: ${active} (count ${count})`);
      }
    }),
    { numRuns: 200 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: facebook-ad-formats, Property 6: Per-format status badge state
// Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.7
// ───────────────────────────────────────────────────────────────────────────

test('Property 6: facebookBadgeState maps the flag space to tone + non-empty label', () => {
  fc.assert(
    fc.property(fc.boolean(), fc.boolean(), (anyInput, anyTruncated) => {
      const { toneKind, label } = facebookBadgeState(anyInput, anyTruncated);

      if (!anyInput) {
        // No field has input → neutral + "fits" (Req 9.5).
        assert.equal(toneKind, 'neutral');
        assert.equal(label, 'fits');
      } else if (anyTruncated) {
        // Any field clamped/truncated → warn + "truncated" (Req 9.2, 9.4).
        assert.equal(toneKind, 'warn');
        assert.equal(label, 'truncated');
      } else {
        // Input present, nothing truncated → safe + "fits" (Req 9.1, 9.3).
        assert.equal(toneKind, 'safe');
        assert.equal(label, 'fits');
      }
      // Label is always non-empty so state is never conveyed by tone alone (Req 9.7).
      assert.ok(label.length > 0, 'badge label must be non-empty');
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: facebook-ad-formats, Property 11: Helper determinism and purity
// Validates: Requirements 13.4
// ───────────────────────────────────────────────────────────────────────────

test('Property 11: every new helper is deterministic and side-effect free', () => {
  fc.assert(
    fc.property(
      fieldText,
      fc.integer({ min: MIN, max: MAX }),
      fc.integer({ min: 0, max: MAX - 1 }),
      fc.constantFrom<-1 | 1>(-1, 1),
      fc.boolean(),
      fc.boolean(),
      (text, count, rawActive, dir, anyInput, anyTruncated) => {
        const active = Math.min(rawActive, count - 1);

        // Text helpers: identical output on a second identical call.
        assert.deepEqual(truncateFacebookReelsPrimary(text), truncateFacebookReelsPrimary(text));
        assert.deepEqual(clampCarouselHeadline(text), clampCarouselHeadline(text));
        assert.deepEqual(clampCarouselDescription(text), clampCarouselDescription(text));
        assert.deepEqual(truncateFacebookPrimary(text), truncateFacebookPrimary(text));

        // Reducers: identical output on a second identical call.
        assert.deepEqual(addCard(count, active, MIN, MAX), addCard(count, active, MIN, MAX));
        assert.deepEqual(removeCard(count, active, active, MIN), removeCard(count, active, active, MIN));
        assert.equal(stepCard(active, dir, count), stepCard(active, dir, count));

        // Badge helper: identical output on a second identical call.
        assert.deepEqual(
          facebookBadgeState(anyInput, anyTruncated),
          facebookBadgeState(anyInput, anyTruncated),
        );
      },
    ),
    { numRuns: 150 },
  );
});
