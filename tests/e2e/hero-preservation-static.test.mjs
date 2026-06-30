// ──────────────────────────────────────────────────────────────────────────
// Task 2 — Preservation property tests (Property 2), STATIC half.
//
// Asserts the things the hero-CLS fix must NOT regress, observed directly from
// the *built* homepage HTML (dist/<locale>/<slug>/index.html). No browser:
// these are deterministic assertions over the emitted markup/CSS.
//
//   • 3.1  Self-hosting: no external font host; any font preload is a
//          same-origin /_astro/ URL with type=font/woff2 + crossorigin.
//   • 3.2  Locale + subset coverage: the five Geist `@font-face` subset blocks
//          and their `unicode-range` values are identical across all 10
//          locales and equal to the captured baseline.
//   • 3.4  Tokens: `--font-mono` is byte-identical to baseline; `--font-sans`
//          keeps `Geist Variable` first and the original tail as a subsequence
//          (tolerates the fix inserting `Geist Fallback`).
//
// Observation-first: the baseline is captured from this (UNFIXED) build on the
// first run and committed; later runs compare against it.
//
// EXPECTED OUTCOME on the UNFIXED build: ALL TESTS PASS.
//
// Validates: Requirements 3.1, 3.2, 3.4
// ──────────────────────────────────────────────────────────────────────────
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import {
  ALL_LOCALES,
  EXTERNAL_FONT_HOSTS,
  readHomepageHtml,
  extractGeistFontFaces,
  geistFontFaceSignature,
  extractFontTokens,
  extractFontPreloads,
  normalizeStack,
  isSubsequence,
  loadOrCreateBaseline,
} from './lib/preservation.mjs';

const EXPECTED_GEIST_SUBSETS = 5; // latin, latin-ext, cyrillic, cyrillic-ext, vietnamese
const SELF_HOSTED_PREFIX = '/_astro/';

// Capture (or load) the static baseline from the reference locale (en).
const { baseline, created } = await loadOrCreateBaseline(
  'preservation-static.baseline.json',
  () => {
    const html = readHomepageHtml('en');
    const tokens = extractFontTokens(html);
    return {
      geistFontFaces: geistFontFaceSignature(html),
      fontMono: tokens.fontMono,
      fontSans: tokens.fontSans,
    };
  },
);
if (created) {
  // eslint-disable-next-line no-console
  console.log('[preservation-static] captured baseline from UNFIXED build');
}

// ── 3.1 Self-hosting preserved ──────────────────────────────────────────────
test('Preservation 3.1 (PBT) — no external font host in any locale homepage', async () => {
  await fc.assert(
    fc.property(fc.constantFrom(...ALL_LOCALES), (locale) => {
      const html = readHomepageHtml(locale);
      for (const host of EXTERNAL_FONT_HOSTS) {
        assert.ok(
          !html.includes(host),
          `External font host "${host}" found in ${locale} homepage — self-hosting regressed.`,
        );
      }
    }),
    { numRuns: ALL_LOCALES.length },
  );
});

test('Preservation 3.1 — every font preload is a same-origin /_astro/ woff2 with crossorigin', async () => {
  for (const locale of ALL_LOCALES) {
    const html = readHomepageHtml(locale);
    for (const link of extractFontPreloads(html)) {
      assert.ok(
        link.href && link.href.startsWith(SELF_HOSTED_PREFIX),
        `Font preload href "${link.href}" in ${locale} is not a self-hosted ${SELF_HOSTED_PREFIX} URL.`,
      );
      assert.ok(
        !/^https?:\/\//i.test(link.href),
        `Font preload href "${link.href}" in ${locale} points at an external origin.`,
      );
      assert.equal(link.type, 'font/woff2', `Font preload in ${locale} must declare type=font/woff2.`);
      assert.ok(link.crossorigin, `Font preload in ${locale} must be crossorigin.`);
    }
  }
  // On the UNFIXED build there are no font preloads → vacuously true.
});

// ── 3.2 Locale + subset coverage preserved ──────────────────────────────────
test('Preservation 3.2 — exactly five Geist subset @font-face blocks (reference locale)', () => {
  const faces = extractGeistFontFaces(readHomepageHtml('en'));
  assert.equal(
    faces.length,
    EXPECTED_GEIST_SUBSETS,
    `Expected ${EXPECTED_GEIST_SUBSETS} Geist Variable @font-face blocks, found ${faces.length}.`,
  );
  for (const f of faces) {
    assert.equal(f.fontDisplay, 'swap', 'Geist @font-face font-display must stay "swap".');
    assert.match(f.fontWeight ?? '', /100\s+900/, 'Geist @font-face font-weight must stay "100 900".');
  }
});

test('Preservation 3.2 (PBT) — Geist subset blocks + unicode-ranges identical across all 10 locales', async () => {
  await fc.assert(
    fc.property(fc.constantFrom(...ALL_LOCALES), (locale) => {
      const sig = geistFontFaceSignature(readHomepageHtml(locale));
      assert.equal(
        sig.length,
        EXPECTED_GEIST_SUBSETS,
        `${locale}: expected ${EXPECTED_GEIST_SUBSETS} Geist subsets, found ${sig.length}.`,
      );
      assert.deepEqual(
        sig,
        baseline.geistFontFaces,
        `${locale}: Geist subset blocks / unicode-ranges differ from baseline.`,
      );
    }),
    { numRuns: ALL_LOCALES.length },
  );
});

// ── 3.4 Tokens preserved ─────────────────────────────────────────────────────
test('Preservation 3.4 (PBT) — --font-mono byte-identical across all locales + baseline', async () => {
  await fc.assert(
    fc.property(fc.constantFrom(...ALL_LOCALES), (locale) => {
      const { fontMono } = extractFontTokens(readHomepageHtml(locale));
      assert.deepEqual(
        fontMono,
        baseline.fontMono,
        `${locale}: --font-mono changed from baseline (must stay byte-identical).`,
      );
    }),
    { numRuns: ALL_LOCALES.length },
  );
});

test('Preservation 3.4 — --font-sans keeps Geist Variable first and the original tail intact', () => {
  // The fix is allowed to insert 'Geist Fallback' after 'Geist Variable'; every
  // original family must remain, in order. On the unfixed build this is exact.
  const ORIGINAL_TAIL = ['Inter', 'system-ui', '-apple-system', 'sans-serif'];
  for (const locale of ALL_LOCALES) {
    const { fontSans } = extractFontTokens(readHomepageHtml(locale));
    assert.ok(fontSans && fontSans.length > 0, `${locale}: --font-sans not found.`);
    assert.equal(fontSans[0], 'Geist Variable', `${locale}: --font-sans must start with Geist Variable.`);
    assert.ok(
      isSubsequence(ORIGINAL_TAIL, fontSans),
      `${locale}: --font-sans dropped/reordered an original family. Got: ${fontSans.join(', ')}`,
    );
    // Baseline original families must all survive as a subsequence too.
    assert.ok(
      isSubsequence(normalizeStack(baseline.fontSans.join(', ')), fontSans),
      `${locale}: --font-sans lost a baseline family. Got: ${fontSans.join(', ')}`,
    );
  }
});
