import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findRedundantOriginals } from './prune-duplicate-originals.mjs';

async function fixture(names) {
  const dir = await mkdtemp(join(tmpdir(), 'prune-'));
  await mkdir(dir, { recursive: true });
  for (const n of names) await writeFile(join(dir, n), 'x');
  return dir;
}

test('flags png/jpg that have a sibling .webp', async () => {
  const dir = await fixture([
    'twitter.png',
    'twitter.webp', // sibling → twitter.png is redundant
    'Cross_platform_1.png',
    'Cross_platform_1.webp', // sibling → redundant
    'photo.jpg',
    'photo.webp', // sibling → redundant
  ]);
  try {
    assert.deepEqual(findRedundantOriginals(dir), [
      'Cross_platform_1.png',
      'photo.jpg',
      'twitter.png',
    ]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('keeps png/jpg with no .webp sibling (regeneration source)', async () => {
  const dir = await fixture([
    'Twitter_Article_2.png', // no webp sibling → keep
    'hero.png', // no webp sibling → keep
    'standalone.webp', // a webp with no raster twin → not a target
  ]);
  try {
    assert.deepEqual(findRedundantOriginals(dir), []);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('never flags .webp files themselves', async () => {
  const dir = await fixture(['a.webp', 'b.webp']);
  try {
    assert.deepEqual(findRedundantOriginals(dir), []);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('missing directory yields no targets', () => {
  assert.deepEqual(findRedundantOriginals(join(tmpdir(), 'does-not-exist-xyz')), []);
});
