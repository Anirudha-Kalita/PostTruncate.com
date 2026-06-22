// ──────────────────────────────────────────────────────────────────────────
// prune-dist-originals.mjs — postbuild step: keep the DEPLOYED site WebP-only.
//
// The responsive pipeline serves WebP variants everywhere, but the original
// PNG/JPG sources in public/og/ are still copied into the build output as-is.
// This step removes those non-WebP originals from the built og/ folder so the
// deployed site never ships a redundant raster image, while leaving the git
// repo's source files untouched (they stay as the regeneration source).
//
// Scope (intentionally narrow and safe):
//   • Only the built og/ media folder is touched (dist/client/og or dist/og).
//   • Only *.png/*.jpg/*.jpeg inside it are removed; the generated optimized/
//     WebP variants and the manifest stay.
//   • The site-wide default at dist/client/og.webp (one level UP, not inside
//     og/) is NOT touched — it's the OG/social fallback image (and being WebP,
//     it is never a prune target anyway).
//
// Usage:
//   node scripts/prune-dist-originals.mjs          # prune (postbuild default)
//   node scripts/prune-dist-originals.mjs --dry-run
//   node scripts/prune-dist-originals.mjs --help
// ──────────────────────────────────────────────────────────────────────────
import { readdirSync, statSync, unlinkSync, existsSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

// Cloudflare's adapter emits static assets under dist/client; fall back to
// dist/ for other output layouts.
const DIST_OG_CANDIDATES = [
  resolve(PROJECT_ROOT, 'dist/client/og'),
  resolve(PROJECT_ROOT, 'dist/og'),
];
const PRUNE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

const HELP = `prune-dist-originals — strip non-WebP originals from the built og/ folder

Usage:
  node scripts/prune-dist-originals.mjs            Prune (postbuild default)
  node scripts/prune-dist-originals.mjs --dry-run  List only, delete nothing
  node scripts/prune-dist-originals.mjs --help

Removes *.png/*.jpg/*.jpeg from the deployed og/ media folder so the site is
WebP-only. The generated optimized/ WebP, the manifest, and the site-wide
og.webp fallback are kept. Source files in public/og/ are never touched.`;

/** The built og/ folder for this build, or null if none exists yet. */
export function resolveDistOgDir(candidates = DIST_OG_CANDIDATES) {
  return candidates.find((dir) => existsSync(dir)) ?? null;
}

/** Non-WebP originals at the top level of the built og/ folder. */
export function findDistOriginals(dir) {
  if (!dir || !existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => {
      try {
        return statSync(join(dir, f)).isFile();
      } catch {
        return false;
      }
    })
    .filter((f) => PRUNE_EXTENSIONS.includes(extname(f).toLowerCase()))
    .sort();
}

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(HELP);
    return;
  }
  const dryRun = argv.includes('--dry-run');

  const dir = resolveDistOgDir();
  if (!dir) {
    console.log('prune-dist-originals: no built og/ folder found — nothing to do.');
    return;
  }

  const targets = findDistOriginals(dir);
  if (targets.length === 0) {
    console.log(`prune-dist-originals: ${dir} is already WebP-only.`);
    return;
  }

  let removed = 0;
  for (const file of targets) {
    if (dryRun) continue;
    try {
      unlinkSync(join(dir, file));
      removed++;
    } catch (err) {
      console.error(`  ! failed to remove ${file}: ${err.message}`);
    }
  }

  console.log(
    dryRun
      ? `prune-dist-originals: DRY-RUN — would remove ${targets.length} non-WebP original(s) from ${dir}.`
      : `prune-dist-originals: removed ${removed}/${targets.length} non-WebP original(s) from ${dir} (WebP-only).`,
  );
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv.slice(2));
}
