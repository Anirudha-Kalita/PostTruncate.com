import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byteCounts } from './textTools';

test('ASCII: 1 byte per char in UTF-8, 2 in UTF-16, 4 in UTF-32', () => {
  const r = byteCounts('hello');
  assert.equal(r.utf8, 5);
  assert.equal(r.utf16, 10);
  assert.equal(r.utf32, 20);
  assert.equal(r.codePoints, 5);
  assert.equal(r.graphemes, 5);
});

test('empty string is all zeros', () => {
  const r = byteCounts('');
  assert.deepEqual(r, { utf8: 0, utf16: 0, utf32: 0, codePoints: 0, graphemes: 0 });
});

test('2-byte UTF-8 character (é) — one code point', () => {
  const r = byteCounts('é'); // U+00E9, single code unit
  assert.equal(r.utf8, 2);
  assert.equal(r.utf16, 2);
  assert.equal(r.utf32, 4);
  assert.equal(r.codePoints, 1);
});

test('3-byte UTF-8 CJK character (中) — one code point', () => {
  const r = byteCounts('中'); // U+4E2D
  assert.equal(r.utf8, 3);
  assert.equal(r.utf16, 2);
  assert.equal(r.utf32, 4);
  assert.equal(r.codePoints, 1);
});

test('astral emoji (😀) — 4 UTF-8 bytes, surrogate pair in UTF-16', () => {
  const r = byteCounts('😀'); // U+1F600
  assert.equal(r.utf8, 4);
  assert.equal(r.utf16, 4); // 2 UTF-16 code units × 2 bytes
  assert.equal(r.utf32, 4); // 1 code point × 4
  assert.equal(r.codePoints, 1);
  assert.equal(r.graphemes, 1);
});

test('emoji ZWJ sequence is one grapheme but several code points', () => {
  const family = '👨‍👩‍👧'; // man + ZWJ + woman + ZWJ + girl
  const r = byteCounts(family);
  assert.equal(r.graphemes, 1);
  assert.ok(r.codePoints > 1);
  assert.ok(r.utf8 > r.utf16 || r.utf8 > 0); // sanity: non-zero
});
