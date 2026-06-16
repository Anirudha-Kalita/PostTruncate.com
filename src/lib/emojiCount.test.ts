import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emojiCount } from './textTools';

test('plain text has no emoji', () => {
  assert.equal(emojiCount('hello world'), 0);
  assert.equal(emojiCount(''), 0);
});

test('counts simple emoji', () => {
  assert.equal(emojiCount('👍'), 1);
  assert.equal(emojiCount('👍😀🎉'), 3);
});

test('counts emoji mixed into text', () => {
  assert.equal(emojiCount('great job 👍 team 🎉!'), 2);
});

test('a ZWJ family sequence counts as one emoji', () => {
  assert.equal(emojiCount('👨‍👩‍👧'), 1);
});

test('a flag (regional indicator pair) counts as one emoji', () => {
  assert.equal(emojiCount('🇺🇸'), 1);
});

test('keycap sequence counts as one emoji', () => {
  assert.equal(emojiCount('1️⃣'), 1);
});
