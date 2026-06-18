import { test } from 'node:test';
import assert from 'node:assert/strict';
import { font, truncateToWidth, ELLIPSIS } from './canvasText';
import { charCount } from './textTools';

// Deterministic, DOM-free measurer: 10px per grapheme cluster. Because it
// counts graphemes (not code units), it also proves the algorithm never splits
// multi-byte clusters.
const tenPxPerChar = (text: string): number => charCount(text) * 10;
const measure = (text: string, _fontSpec: string): number => tenPxPerChar(text);

test('font() builds a CSS font shorthand', () => {
  assert.equal(font(20), '20px Arial');
  assert.equal(font(14, 'Roboto'), '14px Roboto');
});

test('exact-fit string is not truncated', () => {
  // "abc" = 30px, maxPx = 30 → fits exactly.
  const r = truncateToWidth('abc', 30, font(10), measure);
  assert.equal(r.truncated, false);
  assert.equal(r.text, 'abc');
});

test('over-width string truncates and appends the ellipsis', () => {
  // "abcdef" = 60px, maxPx = 35. prefix+"…" must be <= 35 → (n+1)*10 <= 35 → n = 2.
  const r = truncateToWidth('abcdef', 35, font(10), measure);
  assert.equal(r.truncated, true);
  assert.equal(r.text, 'ab' + ELLIPSIS);
  assert.ok(measure(r.text, '') <= 35);
});

test('empty input returns empty and not truncated', () => {
  const r = truncateToWidth('', 100, font(10), measure);
  assert.equal(r.truncated, false);
  assert.equal(r.text, '');
});

test('multi-byte graphemes are never split mid-cluster', () => {
  const family = '👨‍👩‍👧'; // one grapheme cluster, several code points
  const text = family + family + family; // 3 clusters = 30px
  // maxPx = 25 → only (n+1)*10 <= 25 → n = 1 cluster fits before the ellipsis.
  const r = truncateToWidth(text, 25, font(10), measure);
  assert.equal(r.truncated, true);
  assert.equal(r.text, family + ELLIPSIS);
  // The kept content must be a whole number of clusters (no broken sequence).
  assert.equal(charCount(r.text), 2); // one family + the ellipsis
});

test('when only the ellipsis fits, the prefix collapses to empty', () => {
  // maxPx = 10 → just the ellipsis (10px) fits, zero content characters.
  const r = truncateToWidth('abcdef', 10, font(10), measure);
  assert.equal(r.truncated, true);
  assert.equal(r.text, ELLIPSIS);
});
