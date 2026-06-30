// ──────────────────────────────────────────────────────────────────────────
// inline-critical-css.test.mjs — integration tests for the build wiring of the
// post-build CSS inlining runner (scripts/inline-critical-css.mjs).
//
// These exercise the runner's analyze → commit → prune pipeline against
// synthetic `dist` fixture directories created in a temp folder, rather than
// invoking the (slow) full `astro build`. They cover the three integration
// criteria from the design's Testing Strategy:
//
//   • Full build wiring (Req 6.1, 6.2): analyze every page, assert it succeeds
//     (the "exit code 0" path) and the emitted route/locale set matches the
//     expected set across all locales and page types.
//   • Site-wide invariant (Req 1.3): after commit, every dist/**/*.html has
//     zero render-blocking CSS <link rel="stylesheet">; deferred sheets use the
//     preload + <noscript> pattern; fully-inlined-everywhere CSS is pruned.
//   • No-partial-output (Req 6.3): a forced failure (critical sheet over the
//     64 KiB budget) makes analyze report a per-page failure; because failures
//     exist, commit is NOT invoked and the fixture dir is left unmodified.
//
// Style mirrors prune-dist-originals.test.mjs: node:test + temp dirs.
// ──────────────────────────────────────────────────────────────────────────
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile, readFile, readdir, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, relative } from 'node:path';
import * as cheerio from 'cheerio';

import {
  buildAnalysisInputs,
  analyze,
  commit,
  enumerateHtmlFiles,
} from './inline-critical-css.mjs';
import { HTML_PAYLOAD_BUDGET_BYTES } from '../src/lib/inlineCss.ts';

// ───────────────────────────────────────────────────────────────────────────
// Fixture helpers
// ───────────────────────────────────────────────────────────────────────────

/** Deterministic CSS body of exactly `size` UTF-8 bytes, tagged with `marker`. */
function cssOfSize(marker, size) {
  const header = `/*${marker}*/`;
  if (size <= header.length) return header;
  return header + 'a'.repeat(size - header.length);
}

/**
 * A realistic emitted page <head>: charset/viewport/title meta, a canonical
 * link, the `is:inline` theme-init script, the render-blocking CSS links, and a
 * JSON-LD block — i.e. CSS links interleaved with non-CSS head nodes the
 * transform must preserve.
 */
function pageHtml(canonical, cssHrefs) {
  const links = cssHrefs.map((h) => `<link rel="stylesheet" href="${h}">`).join('\n    ');
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Test page</title>
    <link rel="canonical" href="${canonical}">
    <script is:inline>document.documentElement.dataset.theme = 'dark';</script>
    ${links}
    <script type="application/ld+json">{"@type":"WebPage"}</script>
  </head>
  <body><h1>Hello</h1></body>
</html>`;
}

/** Count true render-blocking stylesheet links (excludes preload + <noscript>). */
function countRenderBlocking(html) {
  const $ = cheerio.load(html);
  return $('link[rel="stylesheet"]').filter((_, el) => $(el).closest('noscript').length === 0)
    .length;
}

/** Snapshot every file under `root` as { relativePath: utf8Content } for diffing. */
async function snapshotDir(root) {
  const out = {};
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else out[relative(root, full)] = await readFile(full, 'utf8');
    }
  }
  await walk(root);
  return out;
}

const GLOBAL_HREF = '/_astro/global.AAAAAAAA.css';

/**
 * Build a multi-locale fixture `dist` dir: locales en/da/de/es × page types
 * index/about/contact. Every page links a shared 2 KiB global stylesheet
 * (referenced by 100% of pages → critical) plus a small route-specific sheet.
 * All sheets fit the budget, so every page fully inlines. Returns the root, the
 * sorted expected route set, and the per-type route-sheet hrefs.
 */
async function buildMultiLocaleFixture() {
  const root = await mkdtemp(join(tmpdir(), 'iccfix-'));
  await mkdir(join(root, '_astro'), { recursive: true });

  await writeFile(join(root, '_astro', 'global.AAAAAAAA.css'), cssOfSize('global', 2048));

  const sheetByType = {
    index: '/_astro/home.BBBBBBBB.css',
    about: '/_astro/about.CCCCCCCC.css',
    contact: '/_astro/contact.DDDDDDDD.css',
  };
  await writeFile(join(root, '_astro', 'home.BBBBBBBB.css'), cssOfSize('home', 1024));
  await writeFile(join(root, '_astro', 'about.CCCCCCCC.css'), cssOfSize('about', 1024));
  await writeFile(join(root, '_astro', 'contact.DDDDDDDD.css'), cssOfSize('contact', 1024));

  const locales = ['en', 'da', 'de', 'es'];
  const types = ['index', 'about', 'contact'];
  const expected = [];

  for (const loc of locales) {
    for (const type of types) {
      const cssHrefs = [GLOBAL_HREF, sheetByType[type]];
      let filePath;
      let route;
      if (type === 'index') {
        filePath = join(root, loc, 'index.html');
        route = `/${loc}/`;
      } else {
        filePath = join(root, loc, type, 'index.html');
        route = `/${loc}/${type}/`;
      }
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, pageHtml(`https://example.com${route}`, cssHrefs));
      expected.push(route);
    }
  }

  return { root, expected: expected.sort(), sheetByType };
}

// ───────────────────────────────────────────────────────────────────────────
// Full build wiring (Requirements 6.1, 6.2)
// ───────────────────────────────────────────────────────────────────────────

test('full build wiring: analyze succeeds for every page and the route/locale set matches expected', async () => {
  const { root, expected } = await buildMultiLocaleFixture();
  try {
    const inputs = buildAnalysisInputs(root);
    const { results, failures } = analyze(inputs);

    // Zero failures is the "exit code 0" / commit-eligible path.
    assert.equal(failures.length, 0, 'no page should fail analysis');

    const routes = results.map((r) => r.page).sort();
    assert.deepEqual(routes, expected, 'emitted route/locale set must match expected');

    // The shared global bundle is classified critical (referenced by all pages).
    assert.equal(inputs.totalPages, expected.length);
    assert.ok(inputs.sharedHrefs.has(GLOBAL_HREF), 'global bundle should be shared/critical');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

// ───────────────────────────────────────────────────────────────────────────
// Site-wide invariant (Requirement 1.3) + prune of fully-inlined CSS
// ───────────────────────────────────────────────────────────────────────────

test('site-wide invariant: zero render-blocking CSS in every committed page across all locales/types, head preserved, fully-inlined CSS pruned', async () => {
  const { root } = await buildMultiLocaleFixture();
  try {
    const inputs = buildAnalysisInputs(root);
    const { results, failures } = analyze(inputs);
    assert.equal(failures.length, 0);

    const summary = commit(results, inputs);

    const files = enumerateHtmlFiles(root);
    assert.equal(files.length, 12, 'all 4 locales × 3 page types committed');

    for (const file of files) {
      const html = await readFile(file, 'utf8');
      // Property 1 invariant at the build level: zero render-blocking CSS.
      assert.equal(countRenderBlocking(html), 0, `render-blocking CSS remained in ${file}`);
      // CSS is delivered inline instead.
      assert.match(html, /<style>/, `inline <style> missing in ${file}`);
      // Non-CSS head resources preserved (theme script, canonical, JSON-LD).
      assert.match(html, /is:inline/, `theme-init script lost in ${file}`);
      assert.match(html, /rel="canonical"/, `canonical link lost in ${file}`);
      assert.match(html, /application\/ld\+json/, `JSON-LD lost in ${file}`);
    }

    // Every sheet was inlined on every page it appeared, so all are pruned.
    assert.equal(summary.cssPruned, 4, 'all four fully-inlined sheets pruned');
    await assert.rejects(
      stat(join(root, '_astro', 'global.AAAAAAAA.css')),
      'fully-inlined global bundle should be pruned from disk'
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

// ───────────────────────────────────────────────────────────────────────────
// Deferred (over-budget) sheets use the non-render-blocking pattern and survive
// pruning, while the inlined shared sheet is pruned (Requirement 5.2).
// ───────────────────────────────────────────────────────────────────────────

test('over-budget route sheet is deferred via preload+noscript and not pruned; inlined shared sheet is pruned', async () => {
  const root = await mkdtemp(join(tmpdir(), 'iccfix-'));
  try {
    await mkdir(join(root, '_astro'), { recursive: true });
    const bigHref = '/_astro/big.EEEEEEEE.css';
    await writeFile(join(root, '_astro', 'global.AAAAAAAA.css'), cssOfSize('global', 2048));
    await writeFile(join(root, '_astro', 'big.EEEEEEEE.css'), cssOfSize('big', 170 * 1024));

    // 4 pages all link the shared global; only en/index also links the big
    // sheet (so big is route-specific, not shared) and is forced to defer it.
    const locales = ['en', 'da', 'de', 'es'];
    for (const loc of locales) {
      const hrefs = loc === 'en' ? [GLOBAL_HREF, bigHref] : [GLOBAL_HREF];
      const file = join(root, loc, 'index.html');
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, pageHtml(`https://example.com/${loc}/`, hrefs));
    }

    const inputs = buildAnalysisInputs(root);
    const { results, failures } = analyze(inputs);
    assert.equal(failures.length, 0, 'critical (global) fits, so no failure');

    const enResult = results.find((r) => r.page === '/en/');
    assert.deepEqual(enResult.deferredHrefs, [bigHref], 'big sheet must be deferred');

    commit(results, inputs);

    const enHtml = await readFile(join(root, 'en', 'index.html'), 'utf8');
    assert.equal(countRenderBlocking(enHtml), 0, 'no render-blocking CSS after deferral');

    const $ = cheerio.load(enHtml);
    const preload = $(`link[rel="preload"][as="style"][href="${bigHref}"]`);
    assert.equal(preload.length, 1, 'deferred sheet must use rel=preload as=style');
    assert.match(preload.attr('onload') ?? '', /this\.rel='stylesheet'/);
    // The <noscript> fallback's contents are raw text to cheerio (browser-
    // accurate when scripting is enabled — which is exactly why it is NOT
    // render-blocking), so assert it against the serialized HTML directly.
    assert.match(
      enHtml,
      new RegExp(`<noscript><link rel="stylesheet" href="${bigHref}"></noscript>`),
      'deferred sheet must have a <noscript> fallback'
    );

    // The still-referenced (deferred) big sheet survives; the inlined-everywhere
    // global sheet is pruned.
    await stat(join(root, '_astro', 'big.EEEEEEEE.css')); // resolves → still present
    await assert.rejects(
      stat(join(root, '_astro', 'global.AAAAAAAA.css')),
      'inlined global bundle should be pruned'
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

// ───────────────────────────────────────────────────────────────────────────
// No-partial-output (Requirement 6.3): a forced over-budget critical sheet makes
// analyze report a failure; commit must NOT run and the dir stays untouched.
// ───────────────────────────────────────────────────────────────────────────

test('oversized critical sheet fails analysis; commit is not invoked and the fixture dir is left unmodified', async () => {
  const root = await mkdtemp(join(tmpdir(), 'iccfix-'));
  try {
    await mkdir(join(root, '_astro'), { recursive: true });
    const hugeHref = '/_astro/huge.FFFFFFFF.css';
    const hugeBytes = 170 * 1024; // 174080 > 163840 (160 KiB) budget
    await writeFile(join(root, '_astro', 'huge.FFFFFFFF.css'), cssOfSize('huge', hugeBytes));

    const page = join(root, 'en', 'index.html');
    await mkdir(dirname(page), { recursive: true });
    await writeFile(page, pageHtml('https://example.com/en/', [hugeHref]));

    const before = await snapshotDir(root);

    const inputs = buildAnalysisInputs(root);
    const { results, failures } = analyze(inputs);

    assert.ok(failures.length > 0, 'analysis must report at least one failure');
    const failure = failures.find((f) => f.kind === 'critical-exceeds-budget');
    assert.ok(failure, 'failure kind must be critical-exceeds-budget');
    assert.ok(
      failure.measuredBytes > HTML_PAYLOAD_BUDGET_BYTES,
      'reported measuredBytes must exceed the budget'
    );
    assert.equal(failure.page, '/en/', 'failure must identify the offending page');
    assert.equal(results.length, 0, 'no page is commit-eligible when a failure exists');

    // All-or-nothing contract: a failure exists, so commit MUST NOT be called.
    // Verify the dir is byte-for-byte unchanged and still render-blocking.
    const after = await snapshotDir(root);
    assert.deepEqual(after, before, 'dist/ must be left exactly as emitted');

    const html = await readFile(page, 'utf8');
    assert.equal(countRenderBlocking(html), 1, 'original render-blocking link untouched');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
