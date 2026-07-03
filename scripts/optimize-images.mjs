// ──────────────────────────────────────────────────────────────────────────
// optimize-images.mjs — build-time responsive image pipeline for blog media.
//
// Scans public/og/ for raster images (png/jpg/jpeg/webp), generates multi-width
// WebP variants into public/og/optimized/, and writes a manifest mapping each
// referenced path (e.g. /og/foo.webp AND /og/foo.png) to its variant widths +
// intrinsic dimensions. The rendering layer (ResponsiveImage.astro + a rehype
// plugin) reads the manifest to emit <img srcset> so each device downloads a
// right-sized WebP.
//
// Format-agnostic: existing WebP sources are resized only; future PNG/JPG
// uploads are converted to WebP and resized. SVG/GIF are skipped (the render
// layer falls back to the original <img src>). Variants are never upscaled past
// the source's intrinsic width, and up-to-date variants are skipped so repeat
// builds are fast.
//
// Usage:
//   node scripts/optimize-images.mjs [--help]
//
// Generated artifacts (public/og/optimized/ + the manifest) are gitignored and
// rebuilt in CI as a prebuild step.
// ──────────────────────────────────────────────────────────────────────────
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, extname, basename } from 'node:path';
import { existsSync } from 'node:fs';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

// ── Configuration ──────────────────────────────────────────────────────────
export const CONFIG = {
  // Folder scanned for source images (Sveltia's media_folder).
  sourceDir: resolve(PROJECT_ROOT, 'public/og'),
  // Where generated WebP variants are written.
  outputDir: resolve(PROJECT_ROOT, 'public/og/optimized'),
  // Manifest mapping referenced path → { widths, width, height }.
  manifestPath: resolve(PROJECT_ROOT, 'public/og/optimized/manifest.json'),
  // Public URL prefix the manifest keys are built from (Sveltia public_folder).
  publicPrefix: '/og',
  publicOptimizedPrefix: '/og/optimized',
  // Target output widths (px). Never upscaled past a source's intrinsic width.
  widths: [400, 800, 1200, 1600],
  // Source formats we process. SVG/GIF are intentionally excluded.
  rasterExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
  // WebP encoder quality.
  webpQuality: 80,
  // WebP alpha-channel quality (0–100). Lossy WebP stores the alpha channel
  // losslessly by default (alphaQuality 100), which roughly doubles the file
  // size of transparent assets — our translucent-nav logos (`/logo.webp`,
  // `/logo-dark.webp`) keep their transparency for the glass backdrop, so their
  // alpha mask was the bulk of the bytes (Lighthouse "Improve image delivery").
  // 60 compresses that anti-aliasing mask with no visible fringing on the crisp
  // wordmark edges, cutting each logo variant ~33%. A no-op for opaque images.
  webpAlphaQuality: 60,

  // Brand/UI images that live at the public root (not in public/og/) and are
  // referenced by absolute path (/logo.webp, /author-anirudha.webp). They render
  // tiny — the logo at ~197px, the author avatar at ≤140px (24px in bylines) —
  // yet their sources are full-resolution (the logo is 2172px wide), so each
  // page shipped ~90KB of logo. We give them their own small width ladders
  // (enough to stay crisp up to ~3× DPR) and fold the variants into the SAME
  // optimized/ folder + manifest, so ResponsiveImage resolves them like any
  // blog image. Output keys are root-absolute (e.g. /logo.webp).
  brandSourceDir: resolve(PROJECT_ROOT, 'public'),
  brandImages: [
    { file: 'logo.webp', widths: [200, 400, 600] },
    { file: 'logo-dark.webp', widths: [200, 400, 600] },
    { file: 'author-anirudha.webp', widths: [72, 150, 300] },
    // Site-wide Open Graph image. Rendered as a real <img> in blog post cards
    // (ResponsiveImage) and the link-preview card simulation, so it needs a
    // device-sized ladder: 160 for the editor's tiny card thumbnail, 400/800
    // for cards + the live preview, 1200 for the full-bleed/high-DPR case.
    // (The og:image META tag still points at the full /og.webp — scrapers want
    // the single 1200x630 asset, which is the largest variant's source.)
    { file: 'og.webp', widths: [160, 400, 800, 1200] },
  ],
};

// ── Pure helpers (unit-tested) ───────────────────────────────────────────────

/**
 * Decide which output widths to generate for a source, never upscaling.
 *
 * Keeps every target width that fits within the source's intrinsic width, and
 * — when the source is smaller than the largest target — adds the source's own
 * width so the variant set still tops out at native resolution.
 *
 *   planWidths(600,  [400, 800, 1200, 1600]) → [400, 600]
 *   planWidths(1000, [400, 800, 1200, 1600]) → [400, 800, 1000]
 *   planWidths(2000, [400, 800, 1200, 1600]) → [400, 800, 1200, 1600]
 *   planWidths(300,  [400, 800, 1200, 1600]) → [300]
 *
 * @param {number} originalWidth  Intrinsic width of the source image, in px.
 * @param {number[]} targetWidths The configured target widths.
 * @returns {number[]} Ascending, de-duped widths to render (no upscaling).
 */
export function planWidths(originalWidth, targetWidths) {
  if (!Number.isFinite(originalWidth) || originalWidth <= 0) return [];
  const maxTarget = Math.max(...targetWidths);
  const widths = new Set(targetWidths.filter((w) => w <= originalWidth));
  // Source smaller than the biggest target → cap the set at native width so we
  // still emit a full-resolution variant (and at least one width for tiny art).
  if (originalWidth < maxTarget) widths.add(originalWidth);
  return [...widths].sort((a, b) => a - b);
}

// ── Variant generation ───────────────────────────────────────────────────────

/**
 * Make a base filename safe to embed in a srcset URL: srcset is comma/space
 * delimited, so spaces, parens and other reserved chars must go. Collapses any
 * run of unsafe characters to a single underscore.
 *
 * @param {string} name  Source base name (without extension).
 * @returns {string} A `[A-Za-z0-9._-]`-only base name.
 */
export function sanitizeBaseName(name) {
  return (
    name
      .replace(/[^A-Za-z0-9._-]+/g, '_')
      .replace(/^[._]+|[._]+$/g, '') || 'image'
  );
}

/**
 * Render the WebP variant ladder for a single source image (shared by the
 * folder scan and the brand-image pass). Reads the source's intrinsic size,
 * plans non-upscaling widths, and writes any missing/stale variants — caching
 * up-to-date ones. Returns null when the source is unreadable, has no
 * dimensions, or plans no widths (caller skips it).
 *
 * @param {string} srcPath  Absolute path to the source image.
 * @param {{widths: number[], webpQuality: number, webpAlphaQuality: number, outputDir: string, publicOptimizedPrefix: string, label: string}} opts
 * @returns {Promise<{meta: import('sharp').Metadata, srcBase: string, variants: {width: number, url: string}[], generated: number, skipped: number} | null>}
 */
async function renderVariants(srcPath, { widths, webpQuality, webpAlphaQuality, outputDir, publicOptimizedPrefix, label }) {
  let meta;
  try {
    meta = await sharp(srcPath).metadata();
  } catch (err) {
    console.warn(`optimize-images: skip ${label} (${err.message})`);
    return null;
  }
  if (!meta.width || !meta.height) {
    console.warn(`optimize-images: skip ${label} (no dimensions)`);
    return null;
  }

  const plan = planWidths(meta.width, widths);
  if (plan.length === 0) return null;

  const ext = extname(srcPath).toLowerCase();
  const srcBase = basename(srcPath, ext);
  const safeBase = sanitizeBaseName(srcBase);
  const srcStat = await stat(srcPath);

  const variants = [];
  let generated = 0;
  let skipped = 0;
  for (const w of plan) {
    const outName = `${safeBase}-${w}.webp`;
    const outPath = join(outputDir, outName);

    // Cache: keep an existing variant that's at least as new as its source.
    let upToDate = false;
    if (existsSync(outPath)) {
      const outStat = await stat(outPath);
      upToDate = outStat.mtimeMs >= srcStat.mtimeMs;
    }
    if (upToDate) {
      skipped++;
    } else {
      await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: webpQuality, alphaQuality: webpAlphaQuality })
        .toFile(outPath);
      generated++;
    }

    variants.push({ width: w, url: `${publicOptimizedPrefix}/${outName}` });
  }

  return { meta, srcBase, variants, generated, skipped };
}

/**
 * Scan the source folder for raster images, emit multi-width WebP variants
 * (resize-only for WebP sources, convert+resize for PNG/JPG), and write a
 * manifest mapping each referenced path to its variant set + intrinsic size.
 *
 * Caching: a variant is regenerated only when missing or older than its source,
 * so repeat runs are fast. SVG/GIF never reach here (excluded by extension);
 * unreadable files are skipped with a warning, never failing the build.
 *
 * @param {Partial<typeof CONFIG>} [options]  Overrides (used by tests).
 * @returns {Promise<{manifest: object, generated: number, skipped: number, processed: number}>}
 */
export async function generateVariants(options = {}) {
  const cfg = { ...CONFIG, ...options };
  const {
    sourceDir,
    outputDir,
    manifestPath,
    widths,
    rasterExtensions,
    webpQuality,
    webpAlphaQuality,
    publicPrefix,
    publicOptimizedPrefix,
    // When false, build the manifest in memory but let the caller write it
    // (so the brand pass can be merged into a single manifest file).
    writeManifest = true,
  } = cfg;

  await mkdir(outputDir, { recursive: true });

  let dirents = [];
  try {
    dirents = await readdir(sourceDir, { withFileTypes: true });
  } catch (err) {
    console.warn(`optimize-images: cannot read ${sourceDir}: ${err.message}`);
  }

  /** @type {Record<string, {width: number, height: number, variants: {width: number, url: string}[]}>} */
  const manifest = {};
  let generated = 0;
  let skipped = 0;
  let processed = 0;

  for (const dirent of dirents) {
    if (!dirent.isFile()) continue;
    const ext = extname(dirent.name).toLowerCase();
    if (!rasterExtensions.includes(ext)) continue;

    const srcPath = join(sourceDir, dirent.name);
    const res = await renderVariants(srcPath, {
      widths,
      webpQuality,
      webpAlphaQuality,
      outputDir,
      publicOptimizedPrefix,
      label: dirent.name,
    });
    if (!res) continue;

    const entry = { width: res.meta.width, height: res.meta.height, variants: res.variants };
    // Register the source's own referenced path plus the .webp alias, so a
    // reference works whether markup still says .png/.jpg (future uploads) or
    // .webp (existing posts) — both resolve to the same WebP variant set.
    manifest[`${publicPrefix}/${dirent.name}`] = entry;
    manifest[`${publicPrefix}/${res.srcBase}.webp`] = entry;
    generated += res.generated;
    skipped += res.skipped;
    processed++;
  }

  if (writeManifest) {
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
    console.log(
      `optimize-images: ${processed} source(s) → ${generated} variant(s) generated, ${skipped} cached.\n` +
        `  manifest: ${manifestPath}`,
    );
  }
  return { manifest, generated, skipped, processed };
}

/**
 * Brand-image pass: render small responsive ladders for the configured
 * public-root UI images (logo, dark logo, author avatar) into the SAME
 * optimized/ folder, keyed by their root-absolute reference (e.g. /logo.webp).
 * Returns the partial manifest to be merged with the folder-scan manifest.
 *
 * @param {Partial<typeof CONFIG>} [options]  Overrides (used by tests).
 * @returns {Promise<{manifest: object, generated: number, skipped: number, processed: number}>}
 */
export async function generateBrandVariants(options = {}) {
  const cfg = { ...CONFIG, ...options };
  const { brandSourceDir, brandImages, outputDir, webpQuality, webpAlphaQuality, publicOptimizedPrefix } = cfg;

  await mkdir(outputDir, { recursive: true });

  /** @type {Record<string, {width: number, height: number, variants: {width: number, url: string}[]}>} */
  const manifest = {};
  let generated = 0;
  let skipped = 0;
  let processed = 0;

  for (const img of brandImages ?? []) {
    const srcPath = join(brandSourceDir, img.file);
    if (!existsSync(srcPath)) {
      console.warn(`optimize-images: brand image not found, skipping: ${img.file}`);
      continue;
    }
    const res = await renderVariants(srcPath, {
      widths: img.widths,
      webpQuality,
      webpAlphaQuality,
      outputDir,
      publicOptimizedPrefix,
      label: img.file,
    });
    if (!res) continue;

    const entry = { width: res.meta.width, height: res.meta.height, variants: res.variants };
    // Root-absolute key matches the markup reference (/logo.webp); the .webp
    // alias keeps it robust if a source is ever swapped to PNG/JPG.
    manifest[`/${img.file}`] = entry;
    manifest[`/${res.srcBase}.webp`] = entry;
    generated += res.generated;
    skipped += res.skipped;
    processed++;
  }

  return { manifest, generated, skipped, processed };
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const HELP = `optimize-images — generate responsive WebP variants for blog media

Usage:
  node scripts/optimize-images.mjs [options]

Options:
  --help, -h   Show this help and exit.

Reads:   ${CONFIG.sourceDir}
Writes:  ${CONFIG.outputDir}
         ${CONFIG.manifestPath}

Produces WebP variants at widths ${CONFIG.widths.join(', ')} (never upscaling),
resizing existing WebP sources and converting PNG/JPG, then writes a manifest
the render layer uses to emit responsive <img srcset>. Up-to-date variants are
skipped, so repeat runs are fast.`;

async function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(HELP);
    return;
  }
  // Folder scan (blog media) + brand pass (root logo/avatar) share one manifest
  // and one optimized/ folder. Build both in memory, then write once.
  const og = await generateVariants({ writeManifest: false });
  const brand = await generateBrandVariants();
  const manifest = { ...og.manifest, ...brand.manifest };
  await writeFile(CONFIG.manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(
    `optimize-images: ${og.processed + brand.processed} source(s) → ` +
      `${og.generated + brand.generated} variant(s) generated, ` +
      `${og.skipped + brand.skipped} cached.\n  manifest: ${CONFIG.manifestPath}`,
  );
}

// Run only when invoked directly (not when imported by tests).
const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
