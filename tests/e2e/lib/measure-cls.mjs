// ──────────────────────────────────────────────────────────────────────────
// Hero-CLS measurement harness (Playwright + Chromium).
//
// Loads a homepage in a headless browser under the bug-condition conditions
// described in the design's "Exploratory Bug Condition Checking":
//   • network throttled (Slow-4G profile via CDP),
//   • font cache cold/disabled (CDP setCacheDisabled + fresh context),
//   • Geist woff2 delivery delayed so it is discovered/loaded AFTER first paint
//     (deterministic emulation of "late discovery, no preload").
//
// It records layout-shift entries via the Layout Instability API
// (PerformanceObserver, type 'layout-shift'), attributes each shift to the
// hero nodes (.hero / .hero__title / .hero__lede), and also captures the
// hero title's box before vs after the Geist swap as supporting evidence.
//
// TEST-ONLY. Does not import or modify any production/site code.
// ──────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright';

// Homepage slug per locale (mirrors src/i18n/config.ts). Kept local so the test
// harness has no dependency on TS site modules.
export const HOMEPAGE_SLUGS = {
  en: 'character-counter',
  es: 'contador-de-caracteres',
  de: 'zeichenzaehler',
  fr: 'compteur-de-caracteres',
  pt: 'contador-de-caracteres',
  it: 'contatore-di-caratteri',
  nl: 'tekenteller',
  ja: 'moji-su-kaunta',
  zh: 'zi-fu-ji-shu-qi',
  da: 'tegntaeller',
};

/**
 * Latin-script locale set that triggers the bug condition (Geist latin subset).
 * Reduced to a minimal representative set to keep the (slow, throttled) PBT run
 * fast: `en` (latin) + `de` (latin-ext). `es`/`da` are covered by the same
 * latin/latin-ext subsets, so dropping them does not change what is exercised —
 * only how many cold-load measurements run. The `ja` CJK boundary case is
 * asserted separately in the exploration test.
 */
export const LATIN_LOCALES = ['en', 'de'];

export function homepagePath(locale) {
  const slug = HOMEPAGE_SLUGS[locale];
  if (!slug) throw new Error(`Unknown locale: ${locale}`);
  return `/${locale}/${slug}/`;
}

// Slow-4G profile (Chrome DevTools preset): ~400 Kbps down, 400 ms RTT.
const SLOW_4G = {
  offline: false,
  downloadThroughput: Math.floor((400 * 1024) / 8),
  uploadThroughput: Math.floor((400 * 1024) / 8),
  latency: 400,
};

// How long to hold back the Geist woff2 responses so the fallback paints first
// and the swap lands well after first contentful paint (worst case for CLS).
const FONT_DELAY_MS = 2500;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Measure the hero-attributed layout shift and overall CLS for one homepage.
 *
 * @param {object} args
 * @param {string} args.origin   server origin, e.g. http://127.0.0.1:3000
 * @param {string} args.locale   locale code (en, de, es, da, ja, …)
 * @param {number} [args.settleMs] extra wait after load to capture the swap
 * @returns {Promise<{
 *   locale: string,
 *   url: string,
 *   cls: number,
 *   heroShift: number,
 *   heroAttributed: boolean,
 *   attributedSelectors: string[],
 *   titleBoxBefore: {w:number,h:number}|null,
 *   titleBoxAfter: {w:number,h:number}|null,
 *   titleReflowed: boolean,
 *   entries: Array<{value:number,sources:string[],hadRecentInput:boolean}>,
 * }>}
 */
export async function measureHeroCls({ origin, locale, settleMs = 1500, fontDelayMs = FONT_DELAY_MS }) {
  const url = origin + homepagePath(locale);
  const browser = await chromium.launch({ headless: true });
  try {
    // Fresh context each run = no shared font/http cache between locales.
    const context = await browser.newContext({ bypassCSP: false });
    const page = await context.newPage();

    // Install the Layout Instability observer BEFORE any document loads, so we
    // catch every shift from the very first paint.
    await page.addInitScript(() => {
      // @ts-nocheck
      window.__cls = 0;
      window.__shiftEntries = [];
      // Classify a shift source node by the hero TEXT element it belongs to.
      // Only .hero__title / .hero__lede count as "Geist-attributed hero shift" —
      // these are the nodes whose font swaps from the fallback to Geist. The
      // generic .hero section also wraps the preview-card image and the editor
      // island, whose shifts are NOT font-driven, so we deliberately do not
      // treat a bare .hero match as a hero-text shift.
      const heroRole = (node) => {
        let el = node;
        if (el && el.nodeType === 3) el = el.parentElement; // text → element
        while (el && el.nodeType === 1) {
          const cls = el.classList;
          if (cls) {
            if (cls.contains('hero__title')) return 'hero__title';
            if (cls.contains('hero__lede')) return 'hero__lede';
          }
          el = el.parentElement;
        }
        return null;
      };
      const detail = (node) => {
        let el = node;
        if (el && el.nodeType === 3) el = el.parentElement;
        if (!el || el.nodeType !== 1) return 'unknown';
        const cls = el.className && typeof el.className === 'string'
          ? '.' + el.className.trim().split(/\s+/).join('.')
          : '';
        return el.nodeName.toLowerCase() + cls;
      };
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // CLS sums only shifts not tied to recent user input.
          if (!entry.hadRecentInput) window.__cls += entry.value;
          const roles = (entry.sources || []).map((s) => heroRole(s.node)).filter(Boolean);
          window.__shiftEntries.push({
            value: entry.value,
            roles,
            details: (entry.sources || []).map((s) => detail(s.node)),
            hadRecentInput: !!entry.hadRecentInput,
          });
        }
      });
      po.observe({ type: 'layout-shift', buffered: true });
    });

    // ── Cold cache + Slow-4G throttling via CDP ──
    const client = await context.newCDPSession(page);
    await client.send('Network.enable');
    await client.send('Network.setCacheDisabled', { cacheDisabled: true });
    await client.send('Network.emulateNetworkConditions', SLOW_4G);

    // ── Delay Geist woff2 delivery so it loads AFTER first paint ──
    // Deterministic emulation of "late font discovery, no preload".
    await page.route(/.*\.woff2(\?.*)?$/i, async (route) => {
      if (fontDelayMs > 0) await sleep(fontDelayMs);
      await route.continue();
    });

    // Navigate and let the DOM render in the fallback font first.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });

    // Capture the hero title box BEFORE the Geist swap (fallback metrics).
    const titleBoxBefore = await page
      .locator('.hero__title')
      .first()
      .boundingBox()
      .then((b) => (b ? { w: round(b.width), h: round(b.height) } : null))
      .catch(() => null);

    // Wait for the delayed fonts to arrive + the swap to complete.
    await page.waitForLoadState('networkidle', { timeout: 60_000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    await sleep(settleMs);

    // Capture the hero title box AFTER the Geist swap.
    const titleBoxAfter = await page
      .locator('.hero__title')
      .first()
      .boundingBox()
      .then((b) => (b ? { w: round(b.width), h: round(b.height) } : null))
      .catch(() => null);

    const result = await page.evaluate(() => ({
      cls: window.__cls,
      entries: window.__shiftEntries,
    }));

    const heroEntries = result.entries.filter(
      (e) => !e.hadRecentInput && e.roles.length > 0,
    );
    const heroShift = heroEntries.reduce((sum, e) => sum + e.value, 0);
    const attributedSelectors = [
      ...new Set(result.entries.flatMap((e) => e.roles)),
    ];

    const titleReflowed =
      !!titleBoxBefore &&
      !!titleBoxAfter &&
      (titleBoxBefore.w !== titleBoxAfter.w || titleBoxBefore.h !== titleBoxAfter.h);

    await context.close();

    return {
      locale,
      url,
      cls: round(result.cls),
      heroShift: round(heroShift),
      heroAttributed: heroEntries.length > 0,
      attributedSelectors,
      titleBoxBefore,
      titleBoxAfter,
      titleReflowed,
      entries: result.entries,
    };
  } finally {
    await browser.close();
  }
}

function round(n) {
  return Math.round(n * 1000) / 1000;
}

/**
 * Robust page-CLS measurement: synthetic-throttle CLS is noisy run-to-run (the
 * exact composition of layout-shift entries depends on when the delayed woff2,
 * the hero mesh, and the nav settle relative to paint), so a single run can
 * swing widely (observed range for a fixed build: de ~0.017–0.171). Lighthouse
 * addresses the same noise by reporting a median over repeated runs; we do the
 * same here so the gate reflects a representative load rather than one unlucky
 * sample.
 *
 * Runs measureHeroCls `runs` times for one locale and returns the MEDIAN-run
 * result (median by page CLS), plus the full sorted CLS list for reporting.
 *
 * @param {object} args - forwarded to measureHeroCls ({ origin, locale, ... })
 * @param {number} [args.runs=5] - number of repeated cold loads (odd ⇒ true median)
 * @returns {Promise<object>} the median run's measureHeroCls result, augmented
 *   with `{ clsSamples:number[], clsMedian:number, heroShiftMedian:number }`.
 */
export async function measureHeroClsMedian({ runs = 5, ...args }) {
  const samples = [];
  for (let i = 0; i < runs; i++) {
    // eslint-disable-next-line no-await-in-loop
    samples.push(await measureHeroCls(args));
  }
  const byCls = [...samples].sort((a, b) => a.cls - b.cls);
  const median = byCls[Math.floor(byCls.length / 2)];
  const heroShifts = [...samples].map((s) => s.heroShift).sort((a, b) => a - b);
  return {
    ...median,
    clsSamples: byCls.map((s) => s.cls),
    clsMedian: median.cls,
    heroShiftMedian: heroShifts[Math.floor(heroShifts.length / 2)],
  };
}

/**
 * Measure the hero text boxes (.hero__title / .hero__lede) under one of two
 * font conditions, deterministically:
 *   • blockFont=true  → the Geist woff2 is aborted, so the hero text renders in
 *     the fallback font permanently (fallback metrics).
 *   • blockFont=false → the Geist woff2 loads and we await document.fonts.ready,
 *     so the hero text renders in Geist (Geist metrics).
 *
 * Comparing the two reveals the metric mismatch (root cause #2): on unfixed
 * code the fallback box differs from the Geist box for latin-script locales, so
 * the swap reflows the hero. For CJK locales Geist has no glyphs, so both
 * conditions render in the same system font and the boxes match.
 *
 * @returns {Promise<{ locale:string, blockFont:boolean, title:{w:number,h:number}|null, lede:{w:number,h:number}|null }>}
 */
export async function measureHeroBox({ origin, locale, blockFont }) {
  const url = origin + homepagePath(locale);
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    await client.send('Network.enable');
    await client.send('Network.setCacheDisabled', { cacheDisabled: true });

    if (blockFont) {
      await page.route(/.*\.woff2(\?.*)?$/i, (route) => route.abort());
    }

    await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
    if (!blockFont) {
      await page.evaluate(() => document.fonts.ready).catch(() => {});
    }
    await sleep(800);

    const box = async (sel) =>
      page
        .locator(sel)
        .first()
        .boundingBox()
        .then((b) => (b ? { w: round(b.width), h: round(b.height) } : null))
        .catch(() => null);

    const title = await box('.hero__title');
    const lede = await box('.hero__lede');
    await context.close();
    return { locale, blockFont, title, lede };
  } finally {
    await browser.close();
  }
}

/**
 * Compare the hero text boxes with the fallback font vs Geist for one locale.
 * @returns {Promise<{ locale:string, fallback:object, geist:object, titleReflow:number, ledeReflow:number, reflowed:boolean }>}
 */
export async function measureHeroReflow({ origin, locale, epsilonPx = 0.5 }) {
  const fallback = await measureHeroBox({ origin, locale, blockFont: true });
  const geist = await measureHeroBox({ origin, locale, blockFont: false });
  const dh = (a, b) => (a && b ? Math.abs(a.h - b.h) : 0);
  const dw = (a, b) => (a && b ? Math.abs(a.w - b.w) : 0);
  const titleReflow = round(Math.max(dh(fallback.title, geist.title), dw(fallback.title, geist.title)));
  const ledeReflow = round(Math.max(dh(fallback.lede, geist.lede), dw(fallback.lede, geist.lede)));
  return {
    locale,
    fallback,
    geist,
    titleReflow,
    ledeReflow,
    reflowed: titleReflow > epsilonPx || ledeReflow > epsilonPx,
  };
}
