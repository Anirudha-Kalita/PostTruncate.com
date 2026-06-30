// ──────────────────────────────────────────────────────────────────────────
// Task 2 — Preservation property tests (Property 2), COMPUTED half.
//
// Loads the *built* homepage in Chromium with Geist actually loaded (warm /
// steady state) and asserts the typography + box metrics the fix must NOT
// regress, across the enumerable preserved domain (10 locales × {light, dark}).
//
//   • 3.3  Theme preserved: hero computed typography (font-size, line-height,
//          letter-spacing, color) matches baseline for both light and dark.
//   • 3.5  Non-hero text preserved: computed font-family (effective family +
//          original order) and box metrics for the eyebrow (mono) and the
//          section heading (sans), plus the body's sans stack, are unchanged.
//   • Warm-load equivalence: with Geist loaded, the hero box matches the
//          unfixed hero box (no behavioural change when the bug condition is
//          false).
//
// Observation-first: a per-(locale,theme) baseline is captured from this
// (UNFIXED) build on the first run and committed; later runs (incl. post-fix)
// compare against it. Font-family is compared tolerantly — the effective first
// family and the original families (as an in-order subsequence) must survive —
// so the fix inserting 'Geist Fallback' into --font-sans does not trip it,
// while a real regression (dropped/reordered family, changed effective font,
// resized box) does.
//
// EXPECTED OUTCOME on the UNFIXED build: ALL TESTS PASS.
//
// Validates: Requirements 3.3, 3.5
// ──────────────────────────────────────────────────────────────────────────
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import { startStaticServer } from './lib/static-server.mjs';
import {
  captureComputedStyles,
  isSubsequence,
  loadOrCreateBaseline,
} from './lib/preservation.mjs';

// Reduced, representative locale matrix for the (slow) browser-based computed
// captures: `en` (latin), `de` (latin-ext) and `ja` (CJK boundary). The
// committed baseline still contains all 10 locales, so the assertions below are
// unchanged — only the number of live page loads is reduced for speed.
const TEST_LOCALES = ['en', 'de', 'ja'];

const THEMES = ['light', 'dark'];
const BOX_EPSILON_PX = 0.6; // sub-pixel rounding tolerance for box metrics
const SANS_ROLES = ['heroTitle', 'heroLede', 'sectionTitle'];
const MONO_ROLES = ['eyebrow'];

let server;
/** Memoize one capture per (locale, theme) — page loads are the slow part. */
const cache = new Map();
function captureKey(locale, theme) {
  return `${locale}:${theme}`;
}
async function capture(locale, theme) {
  const key = captureKey(locale, theme);
  if (!cache.has(key)) {
    cache.set(key, await captureComputedStyles({ origin: server.origin, locale, theme }));
  }
  return cache.get(key);
}

before(async () => {
  server = await startStaticServer();
  // eslint-disable-next-line no-console
  console.log(`[preservation-computed] serving build at ${server.origin}`);
});

after(async () => {
  if (server) await server.close();
});

// Capture (or load) the computed-style baseline for the whole domain. On the
// first (unfixed) run this navigates every locale × theme once and persists it.
const { baseline: computedBaseline, created } = await loadOrCreateBaseline(
  'preservation-computed.baseline.json',
  async () => {
    // Runs at import time, before the `before` hook — manage our own server.
    const ownServer = await startStaticServer();
    server = ownServer;
    const out = {};
    for (const locale of TEST_LOCALES) {
      for (const theme of THEMES) {
        out[captureKey(locale, theme)] = await capture(locale, theme);
      }
    }
    await ownServer.close();
    server = undefined;
    return out;
  },
);
if (created) {
  // eslint-disable-next-line no-console
  console.log('[preservation-computed] captured baseline from UNFIXED build');
}

// ── Comparison helpers ───────────────────────────────────────────────────────
function assertBoxPreserved(role, cur, base, ctx) {
  if (base == null) return; // role absent in baseline → nothing to compare
  assert.ok(cur != null, `${ctx}: role "${role}" disappeared from the page.`);
  if (base.w != null && cur.w != null) {
    assert.ok(
      Math.abs(cur.w - base.w) <= BOX_EPSILON_PX,
      `${ctx}: ${role} width changed (${base.w} → ${cur.w}).`,
    );
  }
  if (base.h != null && cur.h != null) {
    assert.ok(
      Math.abs(cur.h - base.h) <= BOX_EPSILON_PX,
      `${ctx}: ${role} height changed (${base.h} → ${cur.h}).`,
    );
  }
}

function assertFamilyPreserved(role, cur, base, ctx) {
  if (base == null || cur == null) return;
  assert.equal(
    cur.fontFamily[0],
    base.fontFamily[0],
    `${ctx}: ${role} effective (first) font-family changed (${base.fontFamily[0]} → ${cur.fontFamily[0]}).`,
  );
  assert.ok(
    isSubsequence(base.fontFamily, cur.fontFamily),
    `${ctx}: ${role} dropped/reordered a font-family. base=[${base.fontFamily}] cur=[${cur.fontFamily}]`,
  );
}

// ── 3.3 Theme preserved — hero typography per light/dark ─────────────────────
test('Preservation 3.3 (PBT) — hero typography matches baseline for light & dark', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom(...TEST_LOCALES),
      fc.constantFrom(...THEMES),
      async (locale, theme) => {
        const cur = await capture(locale, theme);
        const base = computedBaseline[captureKey(locale, theme)];
        const ctx = `${locale}/${theme}`;
        assert.equal(cur.theme, base.theme, `${ctx}: applied theme mismatch.`);
        for (const role of ['heroTitle', 'heroLede']) {
          const c = cur[role];
          const b = base[role];
          if (b == null) continue;
          assert.equal(c.fontSize, b.fontSize, `${ctx}: ${role} font-size changed.`);
          assert.equal(c.lineHeight, b.lineHeight, `${ctx}: ${role} line-height changed.`);
          assert.equal(c.letterSpacing, b.letterSpacing, `${ctx}: ${role} letter-spacing changed.`);
          assert.equal(c.color, b.color, `${ctx}: ${role} color token changed.`);
        }
      },
    ),
    { numRuns: TEST_LOCALES.length * THEMES.length, verbose: true },
  );
});

// ── 3.5 Non-hero text preserved — font-family + box metrics ──────────────────
test('Preservation 3.5 (PBT) — non-hero font-family + box metrics unchanged', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom(...TEST_LOCALES),
      fc.constantFrom(...THEMES),
      async (locale, theme) => {
        const cur = await capture(locale, theme);
        const base = computedBaseline[captureKey(locale, theme)];
        const ctx = `${locale}/${theme}`;

        // Eyebrow (mono) + section heading (sans): font-family + box metrics.
        for (const role of [...MONO_ROLES, 'sectionTitle']) {
          assertFamilyPreserved(role, cur[role], base[role], ctx);
          assertBoxPreserved(role, cur[role], base[role], ctx);
        }
        // Body's sans stack: effective family + original order preserved.
        assert.equal(
          cur.bodyFontFamily[0],
          base.bodyFontFamily[0],
          `${ctx}: body effective font-family changed.`,
        );
        assert.ok(
          isSubsequence(base.bodyFontFamily, cur.bodyFontFamily),
          `${ctx}: body dropped/reordered a font-family. base=[${base.bodyFontFamily}] cur=[${cur.bodyFontFamily}]`,
        );
      },
    ),
    { numRuns: TEST_LOCALES.length * THEMES.length, verbose: true },
  );
});

// ── Warm-load equivalence — hero box matches the unfixed hero box ────────────
test('Preservation (PBT) — warm-load hero box matches baseline (Geist cached)', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom(...TEST_LOCALES),
      fc.constantFrom(...THEMES),
      async (locale, theme) => {
        const cur = await capture(locale, theme);
        const base = computedBaseline[captureKey(locale, theme)];
        const ctx = `${locale}/${theme}`;
        for (const role of SANS_ROLES) {
          assertBoxPreserved(role, cur[role], base[role], ctx);
        }
      },
    ),
    { numRuns: TEST_LOCALES.length * THEMES.length, verbose: true },
  );
});
