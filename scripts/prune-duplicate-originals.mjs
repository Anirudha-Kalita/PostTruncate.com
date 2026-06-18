// ──────────────────────────────────────────────────────────────────────────
// prune-duplicate-originals.mjs — one-time cleanup of redundant source images.
//
// Several media-library entries in public/og/ ship as BOTH a PNG/JPG and an
// identical WebP (e.g. twitter.png + twitter.webp). Now that the responsive
// pipeline serves WebP everywhere, the non-WebP twin is dead weight. This script
// finds every public/og/*.{png,jpg,jpeg} that has a sibling .webp (same base
// name) and deletes the non-WebP duplicate.
//
// SAFETY: dry-run is the DEFAULT. Without --delete the script only lists what it
// WOULD remove and touches nothing. A PNG/JPG with no .webp sibling (e.g. a
// future upload not yet optimized) is never a target — it's the regeneration
// source. Deleting is a bulk, irreversible operation, so review the dry-run
// list first.
//
// Usage:
//   node scripts/prune-duplicate-originals.mjs            # dry-run (default)
//   node scripts/prune-duplicate-originals.mjs --delete   # actually delete
//   node scripts/prune-duplicate-originals.mjs --help
// ──────────────────────────────────────────────────────────────────────────
import { readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, extname, basename, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

const SOURCE_DIR = resolve(PROJECT_ROOT, 'public/og');
const PRUNE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const WEBP_EXT = '.webp';

const HELP = `prune-duplicate-originals — delete PNG/JPG that have a sibling .webp

Usage:
  node scripts/prune-duplicate-originals.mjs            Dry-run (default): list only
  node scripts/prune-duplicate-originals.mjs --delete   Delete the redundant originals
  node scripts/prune-duplicate-originals.mjs --help     Show this help

Scans: ${SOURCE_DIR}

Targets each *.png/*.jpg/*.jpeg that has a same-named *.webp sibling. A PNG/JPG
with NO .webp sibling is kept (it's the regeneration source). Dry-run touches
nothing — review the list before running with --delete.`;

/** Find redundant originals: png/jpg/jpeg whose base name also exists as .webp. */
export function findRedundantOriginals(dir) {
  let files;
  try {
    files = readdirSync(dir).filter((f) => {
      try {
        return statSync(join(dir, f)).isFile();
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }

  // Set of base names (without ext) that have a .webp file.
  const webpBases = new Set(
    files
      .filter((f) => extname(f).toLowerCase() === WEBP_EXT)
      .map((f) => basename(f, extname(f))),
  );

  return files
    .filter((f) => PRUNE_EXTENSIONS.includes(extname(f).toLowerCase()))
    .filter((f) => webpBases.has(basename(f, extname(f))))
    .sort();
}

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(HELP);
    return;
  }
  const doDelete = argv.includes('--delete') || argv.includes('--force');

  const targets = findRedundantOriginals(SOURCE_DIR);

  if (targets.length === 0) {
    console.log(`No redundant originals found in ${SOURCE_DIR}. Nothing to do.`);
    return;
  }

  console.log(
    `${doDelete ? 'Deleting' : 'DRY-RUN — would delete'} ${targets.length} ` +
      `redundant original(s) in ${SOURCE_DIR}:\n`,
  );
  for (const file of targets) console.log(`  • ${file}`);

  if (!doDelete) {
    console.log(
      `\nDry-run only — nothing was removed. Re-run with --delete to remove ` +
        `the files above (each has a .webp sibling that stays).`,
    );
    return;
  }

  let removed = 0;
  for (const file of targets) {
    try {
      unlinkSync(join(SOURCE_DIR, file));
      removed++;
    } catch (err) {
      console.error(`  ! failed to delete ${file}: ${err.message}`);
    }
  }
  console.log(`\nDone. Removed ${removed}/${targets.length} redundant original(s).`);
}

// Run only when invoked directly (not when imported by tests).
const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv.slice(2));
}
