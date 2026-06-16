import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sentenceCount } from './textTools';

test('empty or whitespace is 0 sentences', () => {
  assert.equal(sentenceCount(''), 0);
  assert.equal(sentenceCount('   \n  '), 0);
});

test('text with no terminator is one sentence', () => {
  assert.equal(sentenceCount('hello world'), 1);
});

test('counts ., !, and ? as sentence ends', () => {
  assert.equal(sentenceCount('Hi. Bye.'), 2);
  assert.equal(sentenceCount('Stop! Now? Go.'), 3);
});

test('a trailing sentence without a terminator still counts', () => {
  assert.equal(sentenceCount('First. Second'), 2);
});

test('runs of terminators (?! or ...) count once', () => {
  assert.equal(sentenceCount('Really?! Yes...'), 2);
});

test('decimals do not inflate the count', () => {
  assert.equal(sentenceCount('Pi is 3.14 exactly.'), 1);
});

test('CJK sentence terminators are counted', () => {
  assert.equal(sentenceCount('你好。再见！'), 2);
});

test('multiple spaces / newlines between sentences are fine', () => {
  assert.equal(sentenceCount('One.\n\nTwo.   Three.'), 3);
});
