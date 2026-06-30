// ──────────────────────────────────────────────────────────────────────────
// Preservation harness (Task 2 — Property 2).
//
// Helpers for the preservation property tests. Two flavours of observation:
//
//   1. STATIC — parse the *built* homepage HTML (dist/<locale>/<slug>/index.html)
//      for the things the fix must NOT regress: the absence of any external
//      font host, the five Geist `@font-face` subset blocks and their
//      `unicode-range` values, the `--font-mono` / `--font-sans` token values,
//      and any font preload link. No browser required — fast and deterministic.
//
//   2. COMPUTED — load the built homepage in Chromium with Geist actually
//      loaded (warm/steady state) and capture the computed typography and box
//      metrics for the hero and for non-hero roles (eyebrow, section heading,
//      body), per theme (light/dark).
//
// The observation-first methodology: capture a BASELINE from the UNFIXED build
// first (written to tests/e2e/__baseline__/), then assert the current build
// matches it. On the unfixed build the baseline is generated and the assertions
// hold trivially; the committed baseline then guards against regressions when
// the fix lands (Task 3.5).
//
// TEST-ONLY. Does not import or modify any production/site code.
// ──────────────────────────────────────────────────────────────────────────
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { HOMEPAGE_SLUGS, homepagePath } from './measure-cls.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const DIST = join(ROOT, 'dist');
const BASELINE_DIR = fileURLToPath(new URL('../__baseline__/', import.meta.url));

/** All 10 supported locales (mirrors src/i18n/config.ts order). */
export const ALL_LOCALES = Object.keys(HOMEPAGE_SLUGS);

/** External font hosts that must never appear (self-hosting, Requirement 3.1). */
export const EXTERNAL_FONT_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'use.typekit.net',
  'fonts.bunny.net',
];

/** Read the built homepage HTML for a locale from dist/. */
export function readHomepageHtml(locale) {
  const slug = HOMEPAGE_SLUGS[locale];
  if (!slug) throw new Error(`Unknown locale: ${locale}`);
  const file = join(DIST, locale, slug, 'index.html');
  if (!existsSync(file)) {
    throw new Error(
      `Built homepage not found: ${file}\nRun "npm run build" before the preservation test.`,
    );
  }
  return readFileSync(file, 'utf8');
}

/**
 * Extract every `Geist Variable` (non-mono) `@font-face` block from built HTML.
 * Returns the descriptors that define each subset, keyed for order-independent
 * comparison. The five blocks are the latin / latin-ext / cyrillic /
 * cyrillic-ext / vietnamese subsets (Requirement 3.2).
 */
export function extractGeistFontFaces(html) {
  const blocks = html.match(/@font-face\{[^}]*\}/g) ?? [];
  const faces = [];
  for (const block of blocks) {
    const family = (block.match(/font-family:\s*([^;}]+)/) ?? [])[1]?.trim();
    if (!family || !/^Geist Variable$/i.test(family.replace(/["']/g, ''))) continue;
    const unicodeRange = (block.match(/unicode-range:\s*([^;}]+)/) ?? [])[1]?.trim();
    const fontDisplay = (block.match(/font-display:\s*([^;}]+)/) ?? [])[1]?.trim();
    const fontWeight = (block.match(/font-weight:\s*([^;}]+)/) ?? [])[1]?.trim();
    const src = (block.match(/src:\s*([^;}]+)/) ?? [])[1]?.trim();
    faces.push({ family: 'Geist Variable', unicodeRange, fontDisplay, fontWeight, src });
  }
  return faces;
}

/** A stable, order-independent signature of the Geist subset blocks. */
export function geistFontFaceSignature(html) {
  return extractGeistFontFaces(html)
    .map((f) => ({
      unicodeRange: normalizeRange(f.unicodeRange),
      fontDisplay: f.fontDisplay,
      fontWeight: f.fontWeight?.replace(/\s+/g, ' '),
      // Strip the content hash so re-builds don't churn the baseline; keep the
      // logical subset filename + that it is a self-hosted /_astro/ URL.
      srcSubset: subsetFromSrc(f.src),
    }))
    .sort((a, b) => a.srcSubset.localeCompare(b.srcSubset));
}

function normalizeRange(r) {
  return (r ?? '').replace(/\s+/g, '').toUpperCase();
}

/** "url(/_astro/geist-latin-ext-wght-normal.DC-KSUi6.woff2)..." → "geist-latin-ext". */
function subsetFromSrc(src) {
  const m = (src ?? '').match(/geist-([a-z-]+?)-wght-normal/i);
  return m ? `geist-${m[1]}` : (src ?? 'unknown');
}

/** Extract the first `--font-sans` and `--font-mono` token declarations. */
export function extractFontTokens(html) {
  const fontSans = (html.match(/--font-sans:\s*([^;]+);/) ?? [])[1]?.trim();
  const fontMono = (html.match(/--font-mono:\s*([^;]+);/) ?? [])[1]?.trim();
  return {
    fontSans: fontSans && normalizeStack(fontSans),
    fontMono: fontMono && normalizeStack(fontMono),
  };
}

/** Normalize a font stack into an ordered list of bare family names. */
export function normalizeStack(stack) {
  return stack
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

/** Extract every font preload `<link>` from built HTML. */
export function extractFontPreloads(html) {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  return links
    .filter((l) => /rel=["']?preload["']?/i.test(l) && /as=["']?font["']?/i.test(l))
    .map((l) => ({
      href: (l.match(/href=["']([^"']+)["']/i) ?? [])[1],
      type: (l.match(/type=["']([^"']+)["']/i) ?? [])[1],
      crossorigin: /crossorigin/i.test(l),
    }));
}

/** True when `families` contains `sub` as an in-order subsequence. */
export function isSubsequence(sub, families) {
  let i = 0;
  for (const f of families) {
    if (i < sub.length && f.toLowerCase() === sub[i].toLowerCase()) i++;
  }
  return i === sub.length;
}

// ── Baseline persistence ────────────────────────────────────────────────────

export function baselinePath(name) {
  return join(BASELINE_DIR, name);
}

/**
 * Load a baseline JSON file, or generate + persist it from `produce()` when it
 * does not yet exist. The first run on the UNFIXED build captures the baseline;
 * later runs (and the post-fix run) compare against the committed file.
 */
export async function loadOrCreateBaseline(name, produce) {
  const file = baselinePath(name);
  if (existsSync(file)) {
    return { baseline: JSON.parse(readFileSync(file, 'utf8')), created: false };
  }
  const baseline = await produce();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(baseline, null, 2) + '\n', 'utf8');
  return { baseline, created: true };
}

// ── Computed-style capture (Playwright) ──────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fixed viewport so the hero's clamp(34px, 4.8vw, 52px) resolves
// deterministically across baseline + current runs.
const VIEWPORT = { width: 1280, height: 800 };

/**
 * Roles captured per page. Each maps a label to a CSS selector present on every
 * locale's homepage. Eyebrow + section heading + body cover the non-hero text
 * surface (Requirement 3.5); the homepage has no <code> blocks, so the mono
 * role is represented by the `--font-mono`-consuming `.section-eyebrow`.
 */
const ROLES = {
  heroTitle: '.hero__title',
  heroLede: '.hero__lede',
  eyebrow: '.section-eyebrow',
  sectionTitle: '.section-title, .hookband__title',
};

/**
 * Capture computed typography + box metrics for one homepage under one theme,
 * with Geist actually loaded (warm/steady state).
 *
 * @returns {Promise<Record<string, {
 *   fontFamily: string[], fontSize: string, lineHeight: string,
 *   letterSpacing: string, color: string, w: number|null, h: number|null,
 * }>> & { bodyFontFamily: string[] }}
 */
export async function captureComputedStyles({ origin, locale, theme }) {
  const url = origin + homepagePath(locale);
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: VIEWPORT });
    // Apply the theme through the real code path: the inline <head> script reads
    // localStorage('theme') and sets data-theme=dark before first paint.
    await context.addInitScript((th) => {
      try {
        localStorage.setItem('theme', th);
      } catch (e) {
        /* ignore */
      }
    }, theme === 'dark' ? 'dark' : 'light');

    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    await sleep(400);

    const styles = await page.evaluate((roles) => {
      const round = (n) => Math.round(n * 100) / 100;
      const families = (ff) =>
        ff
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      const readOne = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          fontFamily: families(cs.fontFamily),
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
          w: round(rect.width),
          h: round(rect.height),
        };
      };
      const out = {};
      for (const [label, sel] of Object.entries(roles)) out[label] = readOne(sel);
      out.bodyFontFamily = families(getComputedStyle(document.body).fontFamily);
      out.theme = document.documentElement.dataset.theme || 'light';
      return out;
    }, ROLES);

    await context.close();
    return { locale, theme, ...styles };
  } finally {
    await browser.close();
  }
}

export { ROLES };
