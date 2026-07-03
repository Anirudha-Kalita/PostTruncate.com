import { test } from 'node:test';
import assert from 'node:assert/strict';
import { utf16Length, charCount } from './textTools';

// utf16Length is the UTF-16 code-unit count that TikTok's publishing caption cap
// ("runes") is measured in. It is always >= the grapheme (charCount) count, and
// diverges from it exactly where a grapheme spans multiple UTF-16 code units.

test('plain ASCII matches its length and the grapheme count', () => {
  const text = 'Just a quick hook.';
  assert.equal(utf16Length(text), text.length);
  assert.equal(utf16Length(text), charCount(text));
});

test('empty string is 0', () => {
  assert.equal(utf16Length(''), 0);
});

test('BMP accented text counts one unit per code unit', () => {
  // Pre-composed NFC "é" is a single UTF-16 code unit.
  assert.equal(utf16Length('café'), 4);
});

test('a single astral emoji is 2 code units but 1 grapheme', () => {
  const emoji = '😀'; // U+1F600 → surrogate pair
  assert.equal(utf16Length(emoji), 2);
  assert.equal(charCount(emoji), 1);
  assert.ok(utf16Length(emoji) > charCount(emoji));
});

test('a ZWJ family sequence is many code units but 1 grapheme', () => {
  const family = '👨‍👩‍👧‍👦'; // 4 people + 3 ZWJ = 11 UTF-16 code units
  assert.equal(utf16Length(family), 11);
  assert.equal(charCount(family), 1);
});

test('a flag emoji (regional indicator pair) is 4 code units, 1 grapheme', () => {
  const flag = '🇺🇸';
  assert.equal(utf16Length(flag), 4);
  assert.equal(charCount(flag), 1);
});

test('never under-reports relative to the grapheme count', () => {
  const samples = ['hello', 'niño', '3.14', '👍🏽 nice', 'a🇬🇧b', '👩‍💻 dev'];
  for (const s of samples) {
    assert.ok(utf16Length(s) >= charCount(s), `utf16 >= graphemes for ${JSON.stringify(s)}`);
  }
});
