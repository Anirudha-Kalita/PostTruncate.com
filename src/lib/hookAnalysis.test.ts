import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeHook, extractHook } from './hookAnalysis';
import { FOLDS, charCount } from './textTools';

const IG = FOLDS.instagram.mobile; // 125 — a simple, deterministic char fold

// ── hook extraction ─────────────────────────────────────────────────────────

test('extractHook stops at first sentence terminator and keeps it', () => {
  assert.equal(extractHook('Hello world. More text here.'), 'Hello world.');
});

test('extractHook stops at first line break and drops it', () => {
  assert.equal(extractHook('First line\nSecond line.'), 'First line');
});

test('extractHook ignores periods inside URLs', () => {
  assert.equal(
    extractHook('Visit https://example.com now. Then leave.'),
    'Visit https://example.com now.',
  );
});

test('extractHook returns whole text when no terminator', () => {
  assert.equal(extractHook('no terminator here'), 'no terminator here');
});

// ── hook exactly at the fold ────────────────────────────────────────────────

test('hook ending exactly at the fold survives (inclusive)', () => {
  // 124 chars + '.' => hook is exactly 125 chars, the Instagram fold.
  const hook = 'A'.repeat(IG - 1) + '.';
  const text = hook + ' ' + 'B'.repeat(60); // total well past the fold
  const r = analyzeHook(text, 'instagram');

  assert.equal(charCount(hook), IG);
  assert.equal(r.foldIndex, IG);
  assert.equal(r.truncated, true);
  assert.equal(r.hookSurvives, true);
  assert.equal(r.hookTruncatedMidword, false);
});

// ── hook past the fold ──────────────────────────────────────────────────────

test('hook longer than the fold is cut mid-hook and fails', () => {
  const hook = 'A'.repeat(IG + 25) + '.'; // 151-char opening sentence
  const r = analyzeHook(hook, 'instagram');

  assert.equal(r.truncated, true);
  assert.equal(r.hookSurvives, false);
  assert.equal(r.hookTruncatedMidword, true);
  assert.equal(r.verdict, 'fail');
  assert.match(r.reason, /cut off/i);
});

// ── CTA above the fold ──────────────────────────────────────────────────────

test('CTA phrase above the fold is detected and passes', () => {
  const text = 'Big launch, sign up today! ' + 'A'.repeat(200);
  const r = analyzeHook(text, 'instagram');

  assert.equal(r.hookSurvives, true);
  assert.equal(r.ctaAboveFold.length, 1);
  assert.equal(r.ctaBelowFold.length, 0);
  assert.equal(r.ctaAboveFold[0].kind, 'phrase');
  assert.equal(r.ctaAboveFold[0].text.toLowerCase(), 'sign up');
  assert.equal(r.verdict, 'pass');
});

// ── CTA below the fold ──────────────────────────────────────────────────────

test('CTA below the fold while hook survives warns', () => {
  const text = 'Read this now. ' + 'A'.repeat(IG + 25) + ' link in bio';
  const r = analyzeHook(text, 'instagram');

  assert.equal(r.hookSurvives, true);
  assert.equal(r.hookTruncatedMidword, false);
  assert.equal(r.ctaAboveFold.length, 0);
  assert.equal(r.ctaBelowFold.length, 1);
  assert.equal(r.ctaBelowFold[0].text.toLowerCase(), 'link in bio');
  assert.equal(r.verdict, 'warn');
  assert.match(r.reason, /below the fold/i);
});

// ── no CTA ──────────────────────────────────────────────────────────────────

test('no CTA leaves both buckets empty and still passes when hook survives', () => {
  const text = 'Hello world. ' + 'A'.repeat(200);
  const r = analyzeHook(text, 'instagram');

  assert.equal(r.ctas.length, 0);
  assert.equal(r.ctaAboveFold.length, 0);
  assert.equal(r.ctaBelowFold.length, 0);
  assert.equal(r.truncated, true);
  assert.equal(r.hookSurvives, true);
  assert.equal(r.verdict, 'pass');
  assert.match(r.reason, /no CTA detected/i);
});

// ── multiple URLs split across the fold ─────────────────────────────────────

test('multiple URLs are split correctly above and below the fold', () => {
  const text =
    'Visit https://example.com now. ' +
    'A'.repeat(110) +
    ' https://second.com/page';
  const r = analyzeHook(text, 'instagram');

  assert.equal(r.ctas.length, 2);
  assert.equal(r.ctaAboveFold.length, 1);
  assert.equal(r.ctaBelowFold.length, 1);
  assert.equal(r.ctaAboveFold[0].text, 'https://example.com');
  assert.equal(r.ctaBelowFold[0].text, 'https://second.com/page');
  assert.equal(r.ctaAboveFold[0].kind, 'url');
  // At least one CTA visible => pass.
  assert.equal(r.verdict, 'pass');
});

// ── emoji / multibyte text near the fold boundary ───────────────────────────

test('fold and CTA positions are grapheme-correct across emoji', () => {
  // 40 emoji + ". " => hook ends at grapheme 41; CTA starts at grapheme 42.
  const head = '🚀'.repeat(40) + '. sign up now ';
  const text = head + '🚀'.repeat(200) + ' link in bio';
  const r = analyzeHook(text, 'instagram');

  // Each 🚀 is one grapheme but two UTF-16 code units — the analysis must count
  // graphemes, not code units, or these indices would be doubled.
  assert.equal(r.foldIndex, IG); // long post, clamped to the 125 fold
  assert.equal(r.hookSurvives, true);

  const signUp = r.ctas.find((c) => c.text.toLowerCase() === 'sign up');
  const linkInBio = r.ctas.find((c) => c.text.toLowerCase() === 'link in bio');
  assert.ok(signUp, 'sign up detected');
  assert.ok(linkInBio, 'link in bio detected');
  assert.equal(signUp.index, 42); // grapheme index, not 82 (code units)
  assert.equal(signUp.aboveFold, true);
  assert.equal(linkInBio.aboveFold, false);
  assert.equal(r.verdict, 'pass'); // a CTA survives above the fold
});

// ── X / Twitter weighted fold (reuses weightedLength) ───────────────────────

test('X fold uses weighted length so a trailing URL pushes past the cap', () => {
  const text = 'Big news today. ' + 'A'.repeat(255) + ' https://example.com';
  const r = analyzeHook(text, 'x');

  assert.equal(r.truncated, true);
  assert.ok(r.foldIndex > 0 && r.foldIndex < charCount(text));
  assert.equal(r.hook, 'Big news today.');
  assert.equal(r.hookSurvives, true);
  assert.equal(r.ctas.length, 1);
  assert.equal(r.ctas[0].kind, 'url');
});

// ── short post: nothing hidden ──────────────────────────────────────────────

test('a short post is not truncated and always passes', () => {
  const r = analyzeHook('Short and sweet. Sign up!', 'linkedin');
  assert.equal(r.truncated, false);
  assert.equal(r.hookSurvives, true);
  assert.equal(r.hookTruncatedMidword, false);
  assert.equal(r.verdict, 'pass');
});
