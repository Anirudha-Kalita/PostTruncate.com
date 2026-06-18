import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findDistOriginals, resolveDistOgDir } from './prune-dist-originals.mjs';

async function fixture(names) {
  const dir = await mkdtemp(join(tmpdir(), 'distprune-'));
  await mkdir(dir, { recursive: true });
  for (const n of names) await writeFile(join(dir, n), 'x');
  return dir;
}

test('finds non-WebP originals, leaving WebP alone', async () => {
  const dir = await fixture([
    'twitter.png',
    'photo.jpg',
    'art.jpeg',
    'twitter.webp', // kept
    'existing-original.webp', // kept
  ]);
  try {
    assert.deepEqual(findDistOriginals(dir), ['art.jpeg', 'photo.jpg', 'twitter.png']);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('a WebP-only folder yields no targets', async () => {
  const dir = await fixture(['a.webp', 'b.webp']);
  try {
    assert.deepEqual(findDistOriginals(dir), []);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('missing folder is a safe no-op', () => {
  const missing = join(tmpdir(), 'no-such-dist-og-xyz');
  assert.deepEqual(findDistOriginals(missing), []);
  assert.equal(resolveDistOgDir([missing]), null);
});
