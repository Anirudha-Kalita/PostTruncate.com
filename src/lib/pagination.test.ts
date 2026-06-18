import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getPaginationRange } from './pagination.ts';

test('returns empty for zero or negative page counts', () => {
  assert.deepEqual(getPaginationRange(1, 0), []);
  assert.deepEqual(getPaginationRange(1, -3), []);
});

test('single page → just [1]', () => {
  assert.deepEqual(getPaginationRange(1, 1), [1]);
});

test('few pages → full sequence, no ellipsis', () => {
  assert.deepEqual(getPaginationRange(1, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(getPaginationRange(3, 5), [1, 2, 3, 4, 5]);
  // siblingCount=1 ⇒ everything up to 7 pages fits without gaps.
  assert.deepEqual(getPaginationRange(4, 7), [1, 2, 3, 4, 5, 6, 7]);
});

test('trailing ellipsis when current is near the start', () => {
  assert.deepEqual(getPaginationRange(1, 10), [1, 2, 'ellipsis', 10]);
  assert.deepEqual(getPaginationRange(2, 10), [1, 2, 3, 'ellipsis', 10]);
  assert.deepEqual(getPaginationRange(3, 10), [1, 2, 3, 4, 'ellipsis', 10]);
});

test('leading ellipsis when current is near the end', () => {
  assert.deepEqual(getPaginationRange(10, 10), [1, 'ellipsis', 9, 10]);
  assert.deepEqual(getPaginationRange(9, 10), [1, 'ellipsis', 8, 9, 10]);
  assert.deepEqual(getPaginationRange(8, 10), [1, 'ellipsis', 7, 8, 9, 10]);
});

test('both ellipses when current is in the middle', () => {
  assert.deepEqual(getPaginationRange(5, 10), [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]);
  assert.deepEqual(getPaginationRange(6, 11), [1, 'ellipsis', 5, 6, 7, 'ellipsis', 11]);
});

test('boundaries: a single-page gap is filled, not collapsed to an ellipsis', () => {
  // current=4, lastPage=10: left gap is only page 2 → filled, not an ellipsis.
  assert.deepEqual(getPaginationRange(4, 10), [1, 2, 3, 4, 5, 'ellipsis', 10]);
  // current=7, lastPage=10: right gap is only page 9 → filled, not an ellipsis.
  assert.deepEqual(getPaginationRange(7, 10), [1, 'ellipsis', 6, 7, 8, 9, 10]);
});

test('clamps out-of-range current page into [1, lastPage]', () => {
  assert.deepEqual(getPaginationRange(0, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(getPaginationRange(99, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(getPaginationRange(99, 10), [1, 'ellipsis', 9, 10]);
});

test('respects a custom siblingCount', () => {
  // siblingCount=2 ⇒ up to 9 pages fit without gaps.
  assert.deepEqual(getPaginationRange(4, 7, 2), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(
    getPaginationRange(6, 12, 2),
    [1, 'ellipsis', 4, 5, 6, 7, 8, 'ellipsis', 12],
  );
});
