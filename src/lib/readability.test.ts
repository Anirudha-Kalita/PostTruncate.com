import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeReadability, countSyllables } from './textTools';

// ── countSyllables: plain English is unchanged ───────────────────────────────

test('countSyllables counts plain English words as before', () => {
  assert.equal(countSyllables('cat'), 1);
  assert.equal(countSyllables('hello'), 2);
  assert.equal(countSyllables('apple'), 2);
  assert.equal(countSyllables('table'), 2);
  assert.equal(countSyllables('simple'), 2);
});

// ── countSyllables: accented Latin letters now count ─────────────────────────

test('countSyllables folds accents so accented vowels are counted', () => {
  // ñ/ç are consonants; the accented vowels stay vowels after diacritic folding.
  assert.equal(countSyllables('niño'), 2);      // ni-ño
  assert.equal(countSyllables('español'), 3);   // es-pa-ñol (was 2 when ñ was dropped)
  assert.equal(countSyllables('garçon'), 2);    // gar-çon
});

// ── analyzeReadability: English behaviour preserved ──────────────────────────

test('analyzeReadability scores plain English text', () => {
  const r = analyzeReadability('The cat sat on the mat.');
  assert.equal(r.hasData, true);
  assert.ok(r.fleschEase >= 80, `expected easy prose, got ${r.fleschEase}`);
  assert.ok(r.gradeLevel <= 3, `expected a low grade, got ${r.gradeLevel}`);
});

// ── analyzeReadability: accented Latin words tokenize correctly ──────────────

test('analyzeReadability keeps accented words whole (no ni+o mis-split)', () => {
  // With the old /[a-zA-Z]+/ tokenizer this split into 8 one/two-letter "words"
  // and mis-scored as trivially easy (fleschEase 100, grade 0). The Latin-script
  // tokenizer keeps 4 real words, so it lands in a sane, non-trivial range.
  const r = analyzeReadability('niño niño niño niño.');
  assert.equal(r.hasData, true);
  assert.ok(r.fleschEase < 60, `expected non-trivial ease, got ${r.fleschEase}`);
  assert.ok(r.gradeLevel > 5, `expected a real grade, got ${r.gradeLevel}`);
});

// ── analyzeReadability: non-Latin scripts report no data ─────────────────────

test('analyzeReadability returns no data for CJK (gated by the card too)', () => {
  const r = analyzeReadability('これはテストです。');
  assert.equal(r.hasData, false);
  assert.equal(r.fleschEase, 0);
  assert.equal(r.gradeLevel, 0);
});
