import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  truncateFacebookPrimary,
  truncateTikTokPrimary,
  clampGoogleField,
  instagramReelsFit,
  googleHeadlineFits,
  GOOGLE_HEADLINE_SEPARATOR,
} from './adTruncation';
import { charCount } from './textTools';
import { font } from './canvasText';

const repeat = (n: number, ch = 'a') => ch.repeat(n);

// ── Facebook primary (125-char cutoff) ──────────────────────────────────────
test('facebook: 124 chars renders in full', () => {
  const r = truncateFacebookPrimary(repeat(124));
  assert.equal(r.truncated, false);
  assert.equal(r.text, repeat(124));
});

test('facebook: exactly 125 chars renders in full', () => {
  const r = truncateFacebookPrimary(repeat(125));
  assert.equal(r.truncated, false);
  assert.equal(r.text, repeat(125));
});

test('facebook: 126 chars truncates with "… See More"', () => {
  const r = truncateFacebookPrimary(repeat(126));
  assert.equal(r.truncated, true);
  assert.equal(r.text, repeat(125) + '… See More');
});

// ── TikTok primary (100-char cutoff) ────────────────────────────────────────
test('tiktok: 99 chars renders in full', () => {
  assert.equal(truncateTikTokPrimary(repeat(99)).truncated, false);
});

test('tiktok: exactly 100 chars renders in full', () => {
  const r = truncateTikTokPrimary(repeat(100));
  assert.equal(r.truncated, false);
  assert.equal(r.text, repeat(100));
});

test('tiktok: 101 chars truncates with "... See more"', () => {
  const r = truncateTikTokPrimary(repeat(101));
  assert.equal(r.truncated, true);
  assert.equal(r.text, repeat(100) + '... See more');
});

// ── Google field clamp (30 headline / 90 description) ───────────────────────
test('google: headline clamps at 30 chars', () => {
  assert.equal(clampGoogleField(repeat(30), 30), repeat(30));
  assert.equal(clampGoogleField(repeat(31), 30), repeat(30));
});

test('google: description clamps at 90 chars', () => {
  assert.equal(charCount(clampGoogleField(repeat(120), 90)), 90);
});

// ── Google combined-width headline dropping ─────────────────────────────────
test('google: drops Headline 3 when combined width exceeds the container', () => {
  // Injected measurer: 10px per character (separator included).
  const measure = (t: string) => t.length * 10;
  const headlines = ['AAAAA', 'BBBBB', 'CCCCC']; // 5 chars each
  // "AAAAA | BBBBB" = 13 chars = 130px (fits); + " | CCCCC" = 210px (overflow).
  const r = googleHeadlineFits(headlines, font(20), 150, measure);
  assert.deepEqual(r.visible, ['AAAAA', 'BBBBB']);
  assert.deepEqual(r.dropped, ['CCCCC']);
  assert.equal(r.truncated, true);
  assert.equal(r.visible.join(GOOGLE_HEADLINE_SEPARATOR), 'AAAAA | BBBBB');
});

test('google: keeps all headlines when they fit', () => {
  const measure = (t: string) => t.length * 10;
  const r = googleHeadlineFits(['A', 'B', 'C'], font(20), 1000, measure);
  assert.equal(r.truncated, false);
  assert.deepEqual(r.dropped, []);
});

// ── Instagram Reels (40–72 window) ──────────────────────────────────────────
test('instagram reels: 40 chars is within the window', () => {
  const r = instagramReelsFit(repeat(40));
  assert.equal(r.truncated, false);
  assert.equal(r.tooShort, false);
});

test('instagram reels: under 40 chars is flagged tooShort', () => {
  const r = instagramReelsFit(repeat(39));
  assert.equal(r.truncated, false);
  assert.equal(r.tooShort, true);
});

test('instagram reels: exactly 72 chars is not truncated', () => {
  const r = instagramReelsFit(repeat(72));
  assert.equal(r.truncated, false);
});

test('instagram reels: 73 chars truncates with an ellipsis', () => {
  const r = instagramReelsFit(repeat(73));
  assert.equal(r.truncated, true);
  assert.equal(r.text, repeat(72) + '…');
});
