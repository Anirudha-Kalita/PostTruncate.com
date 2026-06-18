import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planWidths, CONFIG } from './optimize-images.mjs';

const TARGETS = [400, 800, 1200, 1600];

test('excludes upscaling: a 600px source yields [400, 600], not larger targets', () => {
  assert.deepEqual(planWidths(600, TARGETS), [400, 600]);
});

test('mid-size source adds its native width as the cap', () => {
  assert.deepEqual(planWidths(1000, TARGETS), [400, 800, 1000]);
});

test('source larger than the biggest target uses the full target set only', () => {
  assert.deepEqual(planWidths(2000, TARGETS), [400, 800, 1200, 1600]);
  assert.deepEqual(planWidths(1600, TARGETS), [400, 800, 1200, 1600]);
});

test('source smaller than the smallest target yields a single native width', () => {
  assert.deepEqual(planWidths(300, TARGETS), [300]);
});

test('source exactly on a target does not duplicate that width', () => {
  assert.deepEqual(planWidths(800, TARGETS), [400, 800]);
});

test('invalid widths produce no variants', () => {
  assert.deepEqual(planWidths(0, TARGETS), []);
  assert.deepEqual(planWidths(-100, TARGETS), []);
  assert.deepEqual(planWidths(Number.NaN, TARGETS), []);
});

test('CONFIG exposes the expected target widths', () => {
  assert.deepEqual(CONFIG.widths, TARGETS);
});

// ── Task 2: generateVariants (temp fixture dir) ──────────────────────────────
import { test as test2 } from 'node:test';
import { mkdtemp, mkdir, rm, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { generateVariants, sanitizeBaseName } from './optimize-images.mjs';

// libvips keeps inputs memory-mapped via its operation cache; on Windows that
// blocks removing the temp fixture dir. Disable the cache so handles release.
sharp.cache(false);

/** Remove a temp dir, tolerating brief Windows file locks. */
const cleanup = (dir) => rm(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 50 });

/** Build a throwaway public/og fixture with images at known sizes. */
async function makeFixture() {
  const dir = await mkdtemp(join(tmpdir(), 'optimg-'));
  const sourceDir = join(dir, 'og');
  const outputDir = join(sourceDir, 'optimized');
  await mkdir(sourceDir, { recursive: true });

  const solid = (w, h, fmt) =>
    sharp({
      create: { width: w, height: h, channels: 3, background: { r: 10, g: 120, b: 200 } },
    })[fmt]();

  // 1000px-wide WebP source (resize-only path) → plan [400, 800, 1000].
  await solid(1000, 500, 'webp').toFile(join(sourceDir, 'wide.webp'));
  // 300px-wide PNG source (convert+resize path) → plan [300] (no upscale).
  await solid(300, 150, 'png').toFile(join(sourceDir, 'small.png'));
  // SVG/GIF must be ignored — drop a .gif in to confirm it's skipped.
  await solid(400, 400, 'gif').toFile(join(sourceDir, 'ignore.gif'));

  const opts = {
    sourceDir,
    outputDir,
    manifestPath: join(outputDir, 'manifest.json'),
    widths: [400, 800, 1200, 1600],
    rasterExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
    webpQuality: 80,
    publicPrefix: '/og',
    publicOptimizedPrefix: '/og/optimized',
  };
  return { dir, opts };
}

test2('manifest shape: keys, intrinsic size, ascending variants with urls', async () => {
  const { dir, opts } = await makeFixture();
  try {
    const { manifest, processed } = await generateVariants(opts);

    // Two raster sources processed; the GIF skipped.
    assert.equal(processed, 2);

    const wide = manifest['/og/wide.webp'];
    assert.ok(wide, 'wide.webp entry exists');
    assert.equal(wide.width, 1000);
    assert.equal(wide.height, 500);
    assert.deepEqual(
      wide.variants.map((v) => v.width),
      [400, 800, 1000],
    );
    assert.equal(wide.variants.at(-1).url, '/og/optimized/wide-1000.webp');
    assert.equal(wide.variants[0].url, '/og/optimized/wide-400.webp');

    // No GIF leaked into the manifest.
    assert.equal(manifest['/og/ignore.gif'], undefined);
  } finally {
    await cleanup(dir);
  }
});

test2('no-upscale: a 300px PNG yields a single native-width variant', async () => {
  const { dir, opts } = await makeFixture();
  try {
    const { manifest } = await generateVariants(opts);
    const small = manifest['/og/small.png'];
    assert.ok(small, 'small.png entry exists');
    assert.deepEqual(
      small.variants.map((v) => v.width),
      [300],
    );
    // The .png source also registers a .webp alias to the same entry.
    assert.equal(manifest['/og/small.webp'], small);
  } finally {
    await cleanup(dir);
  }
});

test2('WebP-input resize: generated variants are real WebP at the planned width', async () => {
  const { dir, opts } = await makeFixture();
  try {
    await generateVariants(opts);
    const variant400 = join(opts.outputDir, 'wide-400.webp');
    assert.ok(existsSync(variant400), 'wide-400.webp written');
    const meta = await sharp(variant400).metadata();
    assert.equal(meta.format, 'webp');
    assert.equal(meta.width, 400);
  } finally {
    await cleanup(dir);
  }
});

test2('cache-skip: a rerun regenerates nothing and leaves files untouched', async () => {
  const { dir, opts } = await makeFixture();
  try {
    const first = await generateVariants(opts);
    assert.ok(first.generated > 0, 'first run generates variants');
    assert.equal(first.skipped, 0);

    const variant400 = join(opts.outputDir, 'wide-400.webp');
    const mtimeBefore = (await stat(variant400)).mtimeMs;

    const second = await generateVariants(opts);
    assert.equal(second.generated, 0, 'rerun generates nothing');
    assert.equal(second.skipped, first.generated, 'rerun skips every variant');

    const mtimeAfter = (await stat(variant400)).mtimeMs;
    assert.equal(mtimeAfter, mtimeBefore, 'cached variant file is untouched');
  } finally {
    await cleanup(dir);
  }
});

test2('sanitizeBaseName strips srcset-hostile characters', () => {
  assert.equal(sanitizeBaseName('Mastering_hooks_5 (1)'), 'Mastering_hooks_5_1');
  assert.equal(sanitizeBaseName('PostTruncate-SMS character counter'), 'PostTruncate-SMS_character_counter');
  assert.equal(sanitizeBaseName('  '), 'image');
});

