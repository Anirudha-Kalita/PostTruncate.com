// ──────────────────────────────────────────────────────────────────────────
// inline-critical-css.mjs — postbuild step: remove render-blocking CSS from the
// built site by inlining each page's CSS into its HTML document.
//
// This is the I/O wrapper around the pure `transformHtml` transform in
// src/lib/inlineCss.ts. It runs on the finished build output (after
// `astro build`), so it is adapter-agnostic: it operates only on emitted static
// HTML and the `_astro/*.css` files they reference, never on the SSG render.
//
// Static-root resolution mirrors prune-dist-originals.mjs: the Cloudflare
// adapter emits the static site under dist/client, so we prefer that and fall
// back to dist/. CSS hrefs like "/_astro/index.ABC.css" resolve to
// "<staticRoot>/_astro/index.ABC.css".
//
// This module is loaded with Node's TypeScript stripping so it can import the
// .ts transform directly (the same pattern the `lint` and `test:lib` npm
// scripts use):
//
//   node --experimental-strip-types --import ./scripts/ts-resolve.mjs \
//     scripts/inline-critical-css.mjs [--dry-run] [--help]
//
// Execution is two-phase and ALL-OR-NOTHING (task 4.2): an in-memory ANALYZE
// phase runs `transformHtml` over every page and collects results + errors
// without writing anything; a DECIDE phase fails the build (non-zero exit,
// nothing written) if ANY page errored; only when EVERY page passes does the
// COMMIT phase write the transformed HTML back and prune `_astro/*.css` files
// no static page references any more. This guarantees `dist/` is never left
// partially transformed (Requirements 5.3, 6.1, 6.3). The postbuild wiring
// (task 4.3) hangs this script off the `postbuild` chain.
// ──────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync, existsSync } from 'node:fs';
import { join, resolve, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { transformHtml, HTML_PAYLOAD_BUDGET_BYTES } from '../src/lib/inlineCss.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

// The Cloudflare adapter emits static assets under dist/client; fall back to
// dist/ for other output layouts (same precedence as prune-dist-originals.mjs).
const STATIC_ROOT_CANDIDATES = [
  resolve(PROJECT_ROOT, 'dist/client'),
  resolve(PROJECT_ROOT, 'dist'),
];

// A stylesheet referenced by at least this fraction of pages is treated as the
// shared/base bundle (design tokens, base layer, layout) → critical /
// above-the-fold, so it is inlined first. Route-specific bundles fall below it.
const SHARED_REFERENCE_THRESHOLD = 0.9;

const HELP = `inline-critical-css — inline page CSS so the built site has zero render-blocking CSS

Usage:
  node --experimental-strip-types --import ./scripts/ts-resolve.mjs \\
    scripts/inline-critical-css.mjs            Analyze, then commit (rewrite HTML + prune CSS)
  ... scripts/inline-critical-css.mjs --dry-run  Analyze and report only, write/prune nothing
  ... scripts/inline-critical-css.mjs --help

Resolves the static root (dist/client if present, else dist), enumerates every
*.html page, resolves their render-blocking CSS links from disk, and runs the
pure transform for every page in memory. If ANY page fails (missing asset or
critical CSS over the 160 KiB budget) it prints a per-page report and exits
non-zero WITHOUT writing, leaving dist/ exactly as astro build emitted it. Only
when every page passes does it write the transformed HTML and prune _astro/*.css
files no page references any more.`;

/**
 * The static-site root for this build, or null if none exists yet. Prefers the
 * Cloudflare adapter's dist/client layout and falls back to a plain dist/.
 */
export function resolveStaticRoot(candidates = STATIC_ROOT_CANDIDATES) {
  return (
    candidates.find((dir) => {
      try {
        return existsSync(dir) && statSync(dir).isDirectory();
      } catch {
        return false;
      }
    }) ?? null
  );
}

/**
 * Recursively enumerate every `*.html` file under `root` (all routes, locales,
 * and page types), returning absolute paths in sorted order for deterministic
 * output. Returns `[]` when `root` is null or does not exist.
 */
export function enumerateHtmlFiles(root) {
  if (!root || !existsSync(root)) return [];

  const results = [];
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        results.push(full);
      }
    }
  };

  walk(root);
  return results.sort();
}

/**
 * A render-blocking CSS `<link rel="stylesheet">` is a `<link>` whose `rel`
 * (case-insensitive, whitespace-collapsed) is exactly `stylesheet` and which
 * carries an `href`. Mirrors the transform's definition in inlineCss.ts so
 * enumeration counts exactly the links the transform will rewrite.
 */
function isRenderBlockingStylesheet(rel, href) {
  if (!href || !rel) return false;
  return rel.trim().replace(/\s+/g, ' ').toLowerCase() === 'stylesheet';
}

/**
 * Extract, in document order, the hrefs of every render-blocking CSS
 * `<link rel="stylesheet">` in an HTML document's `<head>`. Pure (no I/O) so it
 * is directly unit-testable.
 */
export function extractCssHrefs(html) {
  const $ = cheerio.load(html);
  const hrefs = [];
  for (const el of $('head link').toArray()) {
    const rel = $(el).attr('rel');
    const href = $(el).attr('href');
    if (isRenderBlockingStylesheet(rel, href)) {
      hrefs.push(href);
    }
  }
  return hrefs;
}

/**
 * Map a CSS link href to its on-disk path under `root`. Handles the
 * root-absolute hrefs Astro emits (e.g. "/_astro/index.ABC.css") as well as
 * document-relative ones, stripping any `?query`/`#fragment` and decoding
 * percent-escapes. Returns `null` for external URLs (http:, https:, //,
 * data:) which are not local assets.
 */
export function hrefToDiskPath(root, href) {
  if (!root || typeof href !== 'string' || href.length === 0) return null;

  // External / protocol-relative / inline-data hrefs are not on-disk assets.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return null;

  let pathname = href.split('#')[0].split('?')[0];
  if (pathname.length === 0) return null;

  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Leave as-is if it is not valid percent-encoding.
  }

  // Normalize to a relative path under root; leading slash means root-absolute.
  const relative = pathname.replace(/^\/+/, '');
  if (relative.length === 0) return null;

  return resolve(root, relative);
}

/**
 * Build a caching CSS resolver bound to a static `root`. The returned function
 * matches the transform's `resolveCss` contract: given a link href it returns
 * the stylesheet's UTF-8 text, or `null` if the asset is missing or not a local
 * file. Results (including misses) are memoized so a stylesheet shared across
 * hundreds of pages is read from disk only once.
 */
export function createCssResolver(root, readFile = (path) => readFileSync(path, 'utf8')) {
  const cache = new Map();

  return function resolveCss(href) {
    if (cache.has(href)) return cache.get(href);

    const diskPath = hrefToDiskPath(root, href);
    let content = null;
    if (diskPath && existsSync(diskPath)) {
      try {
        content = readFile(diskPath);
      } catch {
        content = null;
      }
    }

    cache.set(href, content);
    return content;
  };
}

/**
 * Scan every enumerated HTML page and tally how many pages reference each CSS
 * href. Returns the per-href reference counts, the per-page href lists (in
 * document order), and the total page count — the inputs shared-detection and
 * the task-4.2 analysis phase both consume. `readHtml` is injectable for tests.
 */
export function collectCssReferences(
  htmlFiles,
  readHtml = (path) => readFileSync(path, 'utf8')
) {
  const counts = new Map();
  const perPage = new Map();

  for (const file of htmlFiles) {
    let hrefs;
    try {
      hrefs = extractCssHrefs(readHtml(file));
    } catch {
      hrefs = [];
    }
    perPage.set(file, hrefs);
    // Count each distinct href at most once per page.
    for (const href of new Set(hrefs)) {
      counts.set(href, (counts.get(href) ?? 0) + 1);
    }
  }

  return { counts, perPage, totalPages: htmlFiles.length };
}

/**
 * Determine which stylesheets are shared/critical: those referenced by at least
 * `threshold` (default {@link SHARED_REFERENCE_THRESHOLD}) of all pages. These
 * carry the base/global design tokens and layout styles required above the fold
 * and are inlined first by the transform. Returns a `Set` of hrefs.
 */
export function computeSharedHrefs(
  counts,
  totalPages,
  threshold = SHARED_REFERENCE_THRESHOLD
) {
  const shared = new Set();
  if (!totalPages || totalPages <= 0) return shared;
  for (const [href, count] of counts) {
    if (count / totalPages >= threshold) {
      shared.add(href);
    }
  }
  return shared;
}

/**
 * Build an `isShared(href)` predicate over a set of shared hrefs, suitable for
 * passing as `TransformOptions.isShared` into `transformHtml`.
 */
export function createIsShared(sharedHrefs) {
  return (href) => sharedHrefs.has(href);
}

/**
 * Assemble everything the inlining run needs from a static `root`: the page
 * list, a caching `resolveCss`, the shared/critical classification, and a ready
 * `isShared` predicate. Returns the building blocks the task-4.2 analyze/commit
 * phase consumes; this keeps all enumeration + resolution I/O in one place.
 */
export function buildAnalysisInputs(root, options = {}) {
  const { threshold = SHARED_REFERENCE_THRESHOLD } = options;

  const htmlFiles = enumerateHtmlFiles(root);
  const { counts, perPage, totalPages } = collectCssReferences(htmlFiles);
  const sharedHrefs = computeSharedHrefs(counts, totalPages, threshold);

  return {
    root,
    htmlFiles,
    perPage,
    referenceCounts: counts,
    totalPages,
    sharedHrefs,
    resolveCss: createCssResolver(root),
    isShared: createIsShared(sharedHrefs),
  };
}

/**
 * Derive a human-readable route path for diagnostics from an HTML file's path
 * relative to the static `root`. `<root>/en/about/index.html` → `/en/about/`,
 * `<root>/404.html` → `/404.html`. Always uses POSIX separators and a leading
 * slash so the identifier is stable across platforms.
 */
export function toRoutePath(root, file) {
  const rel = relative(root, file).split(sep).join('/');
  const routePath = rel.replace(/index\.html$/i, '');
  return '/' + routePath.replace(/^\/+/, '');
}

/** True when `diskPath` is a `*.css` file directly under `<root>/_astro/`. */
function isAstroCss(root, diskPath) {
  if (!diskPath) return false;
  const astroDir = resolve(root, '_astro') + sep;
  const resolved = resolve(diskPath);
  return resolved.startsWith(astroDir) && resolved.toLowerCase().endsWith('.css');
}

/**
 * ANALYZE phase. Run the pure `transformHtml` over every enumerated page IN
 * MEMORY, writing nothing. Returns `{ results, failures }`:
 *   - `results`  — one entry per page that transformed cleanly, carrying the
 *                  page's file path, route path, transformed HTML, inlined byte
 *                  count, and deferred hrefs (consumed by the commit phase).
 *   - `failures` — one entry per page that errored, each a `TransformError`
 *                  (`missing-asset` / `critical-exceeds-budget`) or a
 *                  `read-error`, annotated with `file` and `page`.
 *
 * `readHtml` and `transform` are injectable so task 4.4 can drive this without
 * touching disk or the real transform.
 */
export function analyze(inputs, options = {}) {
  const {
    readHtml = (file) => readFileSync(file, 'utf8'),
    transform = transformHtml,
  } = options;
  const { root, htmlFiles, resolveCss, isShared } = inputs;

  const results = [];
  const failures = [];

  for (const file of htmlFiles) {
    const page = toRoutePath(root, file);

    let html;
    try {
      html = readHtml(file);
    } catch (err) {
      failures.push({
        kind: 'read-error',
        page,
        file,
        detail: `Unable to read ${file}: ${err.message}`,
      });
      continue;
    }

    const result = transform(html, page, {
      budgetBytes: HTML_PAYLOAD_BUDGET_BYTES,
      resolveCss,
      isShared,
    });

    if (result.ok) {
      results.push({
        file,
        page,
        html: result.html,
        inlinedBytes: result.inlinedBytes,
        deferredHrefs: result.deferredHrefs,
      });
    } else {
      failures.push({ ...result.error, file });
    }
  }

  return { results, failures };
}

/**
 * Collect the on-disk `_astro/*.css` paths that the COMMITTED pages still
 * reference — via a render-blocking `<link rel="stylesheet">` OR a deferred
 * `<link rel="preload" as="style">`. Any CSS href on any `<link>` counts, so a
 * stylesheet that is still needed (deferred, not inlined) is never pruned.
 */
function collectReferencedCssPaths(results, root) {
  const referenced = new Set();
  for (const { html } of results) {
    const $ = cheerio.load(html);
    for (const el of $('link').toArray()) {
      const href = $(el).attr('href');
      if (!href) continue;
      const disk = hrefToDiskPath(root, href);
      if (isAstroCss(root, disk)) referenced.add(resolve(disk));
    }
  }
  return referenced;
}

/**
 * Compute the conservative CSS prune plan. A file is a prune candidate ONLY if
 * it was originally referenced by at least one static page (so CSS that only
 * the SSR worker or some non-HTML consumer needs is never a candidate) AND it
 * is under `<root>/_astro/` AND no committed page references it any more. This
 * is the "fully inlined everywhere" set: stylesheets that every page inlined
 * and therefore no longer link.
 */
export function computeCssPrunePlan(results, inputs) {
  const { root, referenceCounts } = inputs;

  const candidates = new Set();
  for (const href of referenceCounts.keys()) {
    const disk = hrefToDiskPath(root, href);
    if (isAstroCss(root, disk)) candidates.add(resolve(disk));
  }

  const referenced = collectReferencedCssPaths(results, root);
  const toPrune = [...candidates].filter((p) => !referenced.has(p)).sort();

  return { toPrune, referenced, candidates };
}

/**
 * COMMIT phase. Only call this once ANALYZE reported zero failures. Writes each
 * transformed HTML file back to its path (utf8), then prunes the
 * `computeCssPrunePlan` set of now-unreferenced `_astro/*.css` files. Returns a
 * summary `{ pagesRewritten, bytesInlined, cssPruned, prunedFiles }`.
 *
 * `writeFile` and `deleteFile` are injectable for tests; the defaults perform
 * real disk I/O.
 */
export function commit(results, inputs, options = {}) {
  const {
    writeFile = (file, html) => writeFileSync(file, html, 'utf8'),
    deleteFile = (file) => unlinkSync(file),
  } = options;

  let pagesRewritten = 0;
  let bytesInlined = 0;
  for (const { file, html, inlinedBytes } of results) {
    writeFile(file, html);
    pagesRewritten++;
    bytesInlined += inlinedBytes;
  }

  const { toPrune } = computeCssPrunePlan(results, inputs);
  const prunedFiles = [];
  for (const file of toPrune) {
    try {
      deleteFile(file);
      prunedFiles.push(file);
    } catch (err) {
      console.error(`  ! failed to prune ${file}: ${err.message}`);
    }
  }

  return {
    pagesRewritten,
    bytesInlined,
    cssPruned: prunedFiles.length,
    prunedFiles,
  };
}

/**
 * Print the consolidated, per-page failure report used by the DECIDE phase.
 * Lists each offending page with its error kind and, for
 * `critical-exceeds-budget`, the measured bytes against the budget.
 */
function reportFailures(failures, budgetBytes) {
  console.error(
    `inline-critical-css: ${failures.length} page(s) failed analysis — ` +
      `leaving dist/ untouched and failing the build.`
  );
  for (const failure of failures) {
    let line = `  ✗ ${failure.page} [${failure.kind}]`;
    if (failure.kind === 'critical-exceeds-budget' && typeof failure.measuredBytes === 'number') {
      line += `: ${failure.measuredBytes} bytes > ${budgetBytes}-byte budget`;
    } else if (failure.detail) {
      line += `: ${failure.detail}`;
    }
    console.error(line);
  }
}

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(HELP);
    return;
  }
  const dryRun = argv.includes('--dry-run');

  const root = resolveStaticRoot();
  if (!root) {
    console.log('inline-critical-css: no built site found (dist/client or dist) — nothing to do.');
    return;
  }

  const inputs = buildAnalysisInputs(root);
  const { referenceCounts, totalPages, sharedHrefs, resolveCss } = inputs;

  if (totalPages === 0) {
    console.log(`inline-critical-css: no HTML pages found under ${root} — nothing to do.`);
    return;
  }

  const allHrefs = [...referenceCounts.keys()].sort();
  const routeSpecific = allHrefs.filter((href) => !sharedHrefs.has(href));

  console.log(
    `inline-critical-css: ${dryRun ? 'DRY-RUN — ' : ''}analyzing ${totalPages} page(s) under ${root}.`
  );
  console.log(`  budget: ${HTML_PAYLOAD_BUDGET_BYTES} bytes/page (64 KiB)`);
  console.log(`  CSS stylesheets referenced: ${allHrefs.length}`);
  console.log(`  shared/critical (>=${Math.round(SHARED_REFERENCE_THRESHOLD * 100)}% of pages):`);
  for (const href of [...sharedHrefs].sort()) {
    const missing = resolveCss(href) === null ? ' [MISSING]' : '';
    console.log(`    ${href}  (${referenceCounts.get(href)}/${totalPages})${missing}`);
  }
  console.log(`  route-specific: ${routeSpecific.length}`);
  for (const href of routeSpecific) {
    const missing = resolveCss(href) === null ? ' [MISSING]' : '';
    console.log(`    ${href}  (${referenceCounts.get(href)}/${totalPages})${missing}`);
  }

  // ── ANALYZE: run the transform for every page in memory, write nothing. ──
  const { results, failures } = analyze(inputs);

  // ── DECIDE: any failure → report and exit non-zero, leaving dist/ untouched. ──
  if (failures.length > 0) {
    reportFailures(failures, HTML_PAYLOAD_BUDGET_BYTES);
    process.exit(1);
  }

  const totalInlinedBytes = results.reduce((sum, r) => sum + r.inlinedBytes, 0);
  const totalDeferred = results.reduce((sum, r) => sum + r.deferredHrefs.length, 0);

  if (dryRun) {
    const plan = computeCssPrunePlan(results, inputs);
    console.log(
      `inline-critical-css: DRY-RUN — all ${results.length} page(s) within budget; nothing written.`
    );
    console.log(`  would rewrite: ${results.length} page(s)`);
    console.log(`  would inline:  ${totalInlinedBytes} bytes total`);
    console.log(`  deferred CSS links: ${totalDeferred}`);
    console.log(`  would prune:   ${plan.toPrune.length} _astro/*.css file(s)`);
    for (const file of plan.toPrune) {
      console.log(`    - ${relative(root, file).split(sep).join('/')}`);
    }
    return;
  }

  // ── COMMIT: every page passed → write transformed HTML, prune dead CSS. ──
  const summary = commit(results, inputs);
  console.log(
    `inline-critical-css: committed — rewrote ${summary.pagesRewritten} page(s), ` +
      `inlined ${summary.bytesInlined} bytes, pruned ${summary.cssPruned} _astro/*.css file(s).`
  );
  for (const file of summary.prunedFiles) {
    console.log(`    - pruned ${relative(root, file).split(sep).join('/')}`);
  }
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv.slice(2));
}
