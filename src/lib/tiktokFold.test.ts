import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tiktokFoldIndex, LIMITS } from './textTools';

// TikTok collapses an organic caption behind "…more" at the first line break OR
// ~100 characters, whichever comes first. tiktokFoldIndex returns the grapheme
// index where the visible caption is cut.

test('short single-line caption is never folded (returns its own length)', () => {
  const text = 'Just a quick hook.';
  assert.equal(tiktokFoldIndex(text), text.length);
});

test('empty text folds at 0', () => {
  assert.equal(tiktokFoldIndex(''), 0);
});

test('a line break before 100 chars wins over the char cap', () => {
  const text = 'First line hook\nthen a second line that would otherwise be visible';
  assert.equal(tiktokFoldIndex(text), 'First line hook'.length);
});

test('a line break as the very first character folds at 0', () => {
  assert.equal(tiktokFoldIndex('\nhidden body'), 0);
});

test('no line break past 100 chars folds at the 100-char cap', () => {
  const text = 'x'.repeat(250);
  assert.equal(tiktokFoldIndex(text), LIMITS.TIKTOK_FOLD); // 100
});

test('a line break after the 100-char cap does not extend the fold', () => {
  const text = 'y'.repeat(150) + '\nmore';
  assert.equal(tiktokFoldIndex(text), LIMITS.TIKTOK_FOLD); // 100, the earlier cut
});

test('CRLF and CR line breaks are detected like LF', () => {
  assert.equal(tiktokFoldIndex('hook\r\nbody'), 'hook'.length);
  assert.equal(tiktokFoldIndex('hook\rbody'), 'hook'.length);
});

test('line-break index counts graphemes, not code units (emoji before the break)', () => {
  // Two flag emoji (each 2 UTF-16 code units / 1 grapheme) then a line break.
  const text = '🇺🇸🇬🇧\nrest';
  assert.equal(tiktokFoldIndex(text), 2);
});
