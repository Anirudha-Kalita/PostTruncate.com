import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clampFeedRatio, IMAGE_RATIOS } from './textTools';

// Ratios are height ÷ width: 1 = square, <1 = landscape, >1 = portrait.

// ── unbounded sides ───────────────────────────────────────────────────────

test('no bounds returns the natural ratio unchanged', () => {
  assert.equal(clampFeedRatio(0.3, {}), 0.3);
  assert.equal(clampFeedRatio(2.5, {}), 2.5);
});

test('only a max caps tall portraits but leaves landscape alone', () => {
  // LinkedIn / X / Threads / Facebook: cap tall at 4:5 (h/w 1.25), no min.
  assert.equal(clampFeedRatio(3, { max: 1.25 }), 1.25); // tall → capped
  assert.equal(clampFeedRatio(1, { max: 1.25 }), 1); // square → unchanged
  assert.equal(clampFeedRatio(0.4, { max: 1.25 }), 0.4); // wide → unchanged
});

// ── two-sided band (Instagram) ─────────────────────────────────────────────

test('Instagram band crops both extremes to its bounds', () => {
  const ig = IMAGE_RATIOS.instagram;
  assert.equal(clampFeedRatio(2, ig), ig.max); // 2:1 tall → 3:4
  assert.equal(clampFeedRatio(0.2, ig), ig.min); // ultrawide → 1.91:1
});

test('a ratio inside the band is preserved', () => {
  const ig = IMAGE_RATIOS.instagram;
  assert.equal(clampFeedRatio(1, ig), 1); // square sits inside [0.524, 1.334]
  assert.equal(clampFeedRatio(0.8, ig), 0.8);
});

// ── boundary + degenerate input ────────────────────────────────────────────

test('values exactly on a bound pass through', () => {
  assert.equal(clampFeedRatio(1.25, { max: 1.25 }), 1.25);
  assert.equal(clampFeedRatio(0.524, { min: 0.524 }), 0.524);
});

test('non-finite or non-positive input falls back to square (1)', () => {
  assert.equal(clampFeedRatio(NaN, {}), 1);
  assert.equal(clampFeedRatio(0, {}), 1);
  assert.equal(clampFeedRatio(-2, {}), 1);
  assert.equal(clampFeedRatio(Infinity, {}), 1);
  // Fallback still respects the band: square clamps up into Instagram's range.
  assert.equal(clampFeedRatio(NaN, { min: 1.5 }), 1.5);
});

test('every platform band is well-formed (min <= max when both set)', () => {
  // A locked band (TikTok: 9:16 only) sets min === max; a ranged band keeps
  // min < max. Either is well-formed — an inverted band (min > max) is not.
  for (const band of Object.values(IMAGE_RATIOS)) {
    if (band.min !== undefined && band.max !== undefined) {
      assert.ok(band.min <= band.max);
    }
  }
});
