import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wordsToPages } from './textTools';

// Baseline convention: a 12pt single-spaced page holds ~500 words, so 1,000
// words ≈ 2 pages single-spaced and ≈ 4 pages double-spaced.

test('12pt single-spaced defaults: 1000 words ≈ 2 pages', () => {
  const r = wordsToPages(1000);
  assert.equal(r.wordsPerPage, 500);
  assert.equal(r.pages, 2);
});

test('12pt double-spaced: 1000 words ≈ 4 pages', () => {
  const r = wordsToPages(1000, { fontSize: 12, spacing: 'double' });
  assert.equal(r.wordsPerPage, 250);
  assert.equal(r.pages, 4);
});

test('one-and-a-half spacing sits between single and double', () => {
  const single = wordsToPages(1000, { spacing: 'single' }).pages;
  const oneHalf = wordsToPages(1000, { spacing: 'oneAndHalf' }).pages;
  const double = wordsToPages(1000, { spacing: 'double' }).pages;
  assert.ok(single < oneHalf && oneHalf < double);
});

test('larger font size yields fewer words per page (more pages)', () => {
  const small = wordsToPages(1000, { fontSize: 10 }).pages;
  const large = wordsToPages(1000, { fontSize: 14 }).pages;
  assert.ok(large > small);
});

test('every font size + spacing combination is a positive integer wordsPerPage', () => {
  for (const fontSize of [10, 11, 12, 14] as const) {
    for (const spacing of ['single', 'oneAndHalf', 'double'] as const) {
      const r = wordsToPages(1000, { fontSize, spacing });
      assert.ok(Number.isInteger(r.wordsPerPage) && r.wordsPerPage > 0);
    }
  }
});

test('zero / negative / non-finite word counts produce 0 pages, not NaN', () => {
  assert.equal(wordsToPages(0).pages, 0);
  assert.equal(wordsToPages(-50).pages, 0);
  assert.equal(wordsToPages(NaN).pages, 0);
  assert.equal(wordsToPages(Infinity).pages, 0);
});
