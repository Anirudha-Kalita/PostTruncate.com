import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveVariants,
  buildSrcset,
  normalizeKey,
  type ImageManifest,
} from './responsiveImage.ts';

const MANIFEST: ImageManifest = {
  '/og/twitter.png': {
    width: 1536,
    height: 1024,
    variants: [
      { width: 400, url: '/og/optimized/twitter-400.webp' },
      { width: 800, url: '/og/optimized/twitter-800.webp' },
      { width: 1536, url: '/og/optimized/twitter-1536.webp' },
    ],
  },
  '/og/My Hero (1).webp': {
    width: 800,
    height: 400,
    variants: [{ width: 400, url: '/og/optimized/My_Hero_1-400.webp' }],
  },
};

test('hit: resolves a known path to its variant set', () => {
  const entry = resolveVariants(MANIFEST, '/og/twitter.png');
  assert.ok(entry);
  assert.equal(entry.width, 1536);
  assert.equal(entry.variants.length, 3);
  assert.equal(entry.variants.at(-1)?.url, '/og/optimized/twitter-1536.webp');
});

test('miss: unknown path, null manifest, and empty src all return null', () => {
  assert.equal(resolveVariants(MANIFEST, '/og/does-not-exist.png'), null);
  assert.equal(resolveVariants(null, '/og/twitter.png'), null);
  assert.equal(resolveVariants(MANIFEST, ''), null);
  assert.equal(resolveVariants(MANIFEST, undefined), null);
});

test('normalizes query/hash and percent-encoding before lookup', () => {
  // Cache-busting query string is ignored.
  assert.ok(resolveVariants(MANIFEST, '/og/twitter.png?v=2'));
  // Percent-encoded spaces/parens (as a markdown parser emits) still match the
  // raw manifest key.
  assert.ok(resolveVariants(MANIFEST, '/og/My%20Hero%20(1).webp'));
});

test('buildSrcset emits "url widthw" pairs joined by commas', () => {
  assert.equal(
    buildSrcset(MANIFEST['/og/twitter.png'].variants),
    '/og/optimized/twitter-400.webp 400w, /og/optimized/twitter-800.webp 800w, /og/optimized/twitter-1536.webp 1536w',
  );
});

test('getVariants degrades gracefully when no manifest file is present', () => {
  // A null/empty manifest must never throw and must resolve to null.
  assert.equal(resolveVariants(null, '/og/twitter.png'), null);
  assert.equal(resolveVariants({}, '/og/twitter.png'), null);
});

test('normalizeKey strips query/hash and decodes percent-encoding', () => {
  assert.equal(normalizeKey('/og/twitter.png?v=2'), '/og/twitter.png');
  assert.equal(normalizeKey('/og/twitter.png#x'), '/og/twitter.png');
  assert.equal(normalizeKey('/og/My%20Hero%20(1).webp'), '/og/My Hero (1).webp');
});
