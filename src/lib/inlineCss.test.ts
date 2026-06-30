import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import * as cheerio from 'cheerio';

import {
  transformHtml,
  HTML_PAYLOAD_BUDGET_BYTES,
  type TransformOptions,
  type TransformResult,
} from './inlineCss';

// ───────────────────────────────────────────────────────────────────────────
// Shared helpers
// ───────────────────────────────────────────────────────────────────────────

const byteLen = (s: string): number => Buffer.byteLength(s, 'utf8');

/** Deterministic, uniquely-identifiable ASCII CSS body of exactly `size` bytes. */
function makeCssContent(id: string, size: number): string {
  const header = `/*${id}*/`;
  if (size <= header.length) return header;
  return header + 'a'.repeat(size - header.length);
}

/**
 * The exact `is:inline` theme-initialization script from `src/layouts/Layout.astro`.
 * Property 7 / the example tests assert it survives the transform byte-for-byte.
 */
const THEME_INIT_SCRIPT = `<script is:inline>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var dark =
            stored === 'dark' ||
            (!stored &&
              window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (dark) {
            document.documentElement.dataset.theme = 'dark';
            var m = document.querySelector('meta[name="theme-color"]');
            if (m) m.setAttribute('content', '#0a0a0a');
          }
        } catch (e) {}
      })();
    </script>`;

/** Exact inner JS body of the theme-init script (between the script tags). */
const THEME_INIT_INNER = THEME_INIT_SCRIPT.slice(
  THEME_INIT_SCRIPT.indexOf('>') + 1,
  THEME_INIT_SCRIPT.lastIndexOf('</script>')
);

interface CssAsset {
  id: string;
  href: string;
  content: string;
  shared: boolean;
  bytes: number;
}

interface GeneratedDoc {
  html: string;
  page: string;
  /** CSS assets that the resolver knows about (success path: all of them). */
  assets: CssAsset[];
  /** CSS assets in <head> document order (after interleaving). */
  cssDocOrder: CssAsset[];
  budgetBytes: number;
}

/** Build resolver + isShared callbacks for a set of resolvable assets. */
function makeOptions(budgetBytes: number, resolvable: CssAsset[]): TransformOptions {
  const map = new Map(resolvable.map((a) => [a.href, a.content]));
  const sharedSet = new Set(resolvable.filter((a) => a.shared).map((a) => a.href));
  return {
    budgetBytes,
    resolveCss: (href) => (map.has(href) ? (map.get(href) as string) : null),
    isShared: (href) => sharedSet.has(href),
  };
}

/** Replicates the transform's critical-first ordering (shared first, stable). */
function criticalFirstOrder(assets: CssAsset[]): CssAsset[] {
  return assets
    .map((a, i) => ({ a, i }))
    .sort((x, y) => (x.a.shared !== y.a.shared ? (x.a.shared ? -1 : 1) : x.i - y.i))
    .map((e) => e.a);
}

const cssLinkHtml = (href: string): string => `<link rel="stylesheet" href="${href}">`;

/** Non-CSS head node HTML (each carries a unique marker token via `i`). */
function nonCssNodeHtml(kind: string, i: number): string {
  switch (kind) {
    case 'meta':
      return `<meta name="m${i}" content="value-${i}">`;
    case 'canonical':
      return `<link rel="canonical" href="https://posttruncate.com/p${i}">`;
    case 'hreflang':
      return `<link rel="alternate" hreflang="en-${i}" href="https://posttruncate.com/h${i}">`;
    case 'jsonld':
      return `<script type="application/ld+json">{"@id":"id-${i}"}</script>`;
    case 'icon':
      return `<link rel="icon" type="image/png" href="/icon${i}.png">`;
    case 'og':
      return `<meta property="og:title" content="og-${i}">`;
    case 'twitter':
      return `<meta name="twitter:card" content="card-${i}">`;
    case 'preloadfont':
      // Trap: a non-render-blocking preload that MUST be preserved untouched.
      return `<link rel="preload" as="font" href="/font${i}.woff2" crossorigin>`;
    case 'theme':
      return THEME_INIT_SCRIPT;
    default:
      return `<meta name="x${i}">`;
  }
}

const NON_CSS_KINDS = [
  'meta',
  'canonical',
  'hreflang',
  'jsonld',
  'icon',
  'og',
  'twitter',
  'preloadfont',
  'theme',
] as const;

const pageArb = fc.constantFrom('/en/', '/en/about/', '/da/contact/', '/de/privacy/', '/es/terms/');

/**
 * Extract the serialized non-CSS preserved head nodes from a cheerio doc.
 * Excludes render-blocking stylesheet links plus the transform's own artifacts
 * (the inlined `<style>`, deferred preload-as-style links, and `<noscript>`).
 * The generators never emit those artifact shapes, so on the input side this
 * yields exactly the original non-CSS nodes and on the output side the preserved
 * set — enabling a like-for-like, serialization-consistent comparison.
 */
function preservedHeadNodes($: cheerio.CheerioAPI): string[] {
  return $('head')
    .children()
    .toArray()
    .filter((el) => {
      const tag = (el as { tagName?: string }).tagName;
      if (tag === 'style' || tag === 'noscript') return false;
      if (tag === 'link') {
        const rel = ($(el).attr('rel') ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
        const as = ($(el).attr('as') ?? '').toLowerCase();
        if (rel === 'stylesheet') return false; // render-blocking CSS link
        if (rel === 'preload' && as === 'style') return false; // deferred CSS artifact
      }
      return true;
    })
    .map((el) => $.html(el));
}

/**
 * Collect the hrefs of `<link rel="stylesheet">` elements inside `<head>`
 * `<noscript>` blocks. cheerio (htmlparser2) treats `<noscript>` content as raw
 * text — mirroring a scripting-enabled browser — so its children are not in the
 * DOM tree. We re-parse each noscript's inner HTML as a fragment to inspect it.
 */
function noscriptStylesheetHrefs($: cheerio.CheerioAPI): string[] {
  const hrefs: string[] = [];
  for (const el of $('head noscript').toArray()) {
    const inner = $(el).html() ?? '';
    const $$ = cheerio.load(inner, null, false);
    $$('link[rel="stylesheet"]').each((_i, l) => {
      const h = $$(l).attr('href');
      if (h) hrefs.push(h);
    });
  }
  return hrefs;
}

/** Count render-blocking CSS `<link rel="stylesheet">` elements in <head>. */
function countRenderBlockingCss($: cheerio.CheerioAPI): number {
  return $('head link')
    .toArray()
    .filter((el) => {
      const rel = ($(el).attr('rel') ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
      return rel === 'stylesheet' && !!$(el).attr('href');
    }).length;
}

// ───────────────────────────────────────────────────────────────────────────
// Document generator
//
// Produces an arbitrary <head>: a designated optional shared/critical CSS link,
// 0..N route-specific CSS links (with controlled byte sizes), and randomized
// non-CSS head nodes (meta, canonical, hreflang, JSON-LD, icons, OG/Twitter, a
// preload-font trap, and the is:inline theme-init script) — all interleaved in a
// random document order.
// ───────────────────────────────────────────────────────────────────────────
interface DocConfig {
  budgetBytes: number;
  maxAssetBytes: number;
  minRouteAssets?: number;
  maxRouteAssets?: number;
  minAssetBytes?: number;
  sharedMode?: 'always' | 'never' | 'random';
}

function docArb(cfg: DocConfig): fc.Arbitrary<GeneratedDoc> {
  const minAssetBytes = cfg.minAssetBytes ?? 20;
  const minRoute = cfg.minRouteAssets ?? 0;
  const maxRoute = cfg.maxRouteAssets ?? 5;

  const sharedFlagArb =
    cfg.sharedMode === 'always'
      ? fc.constant(true)
      : cfg.sharedMode === 'never'
        ? fc.constant(false)
        : fc.boolean();

  return fc
    .record({
      page: pageArb,
      hasShared: sharedFlagArb,
      sharedSize: fc.integer({ min: minAssetBytes, max: cfg.budgetBytes }),
      routeSizes: fc.array(fc.integer({ min: minAssetBytes, max: cfg.maxAssetBytes }), {
        minLength: minRoute,
        maxLength: maxRoute,
      }),
      nonCssKinds: fc.array(fc.constantFrom(...NON_CSS_KINDS), { minLength: 0, maxLength: 6 }),
    })
    .chain((rec) => {
      const assets: CssAsset[] = [];
      if (rec.hasShared) {
        const id = 's0';
        const content = makeCssContent(id, rec.sharedSize);
        assets.push({
          id,
          href: `/_astro/${id}.shared.css`,
          content,
          shared: true,
          bytes: byteLen(content),
        });
      }
      rec.routeSizes.forEach((size, i) => {
        const id = `r${i}`;
        const content = makeCssContent(id, size);
        assets.push({
          id,
          href: `/_astro/${id}.route.css`,
          content,
          shared: false,
          bytes: byteLen(content),
        });
      });

      // Build the full set of head node tokens (CSS links + non-CSS nodes),
      // then generate a random permutation to interleave them.
      const cssNodes = assets.map((a) => ({ kind: 'css' as const, asset: a }));
      const nonCssNodes = rec.nonCssKinds.map((kind, i) => ({
        kind: 'noncss' as const,
        html: nonCssNodeHtml(kind, i),
      }));
      const combined = [...cssNodes, ...nonCssNodes];

      return fc
        .shuffledSubarray(combined, { minLength: combined.length, maxLength: combined.length })
        .map((ordered) => {
          const headInner = ordered
            .map((n) => (n.kind === 'css' ? cssLinkHtml(n.asset.href) : n.html))
            .join('\n    ');
          const cssDocOrder = ordered
            .filter((n): n is { kind: 'css'; asset: CssAsset } => n.kind === 'css')
            .map((n) => n.asset);

          const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    ${headInner}
  </head>
  <body><main>content</main></body>
</html>`;

          return {
            html,
            page: rec.page,
            assets,
            cssDocOrder,
            budgetBytes: cfg.budgetBytes,
          } satisfies GeneratedDoc;
        });
    });
}

function expectOk(result: TransformResult): Extract<TransformResult, { ok: true }> {
  assert.equal(result.ok, true, `expected ok result, got: ${JSON.stringify(result)}`);
  return result as Extract<TransformResult, { ok: true }>;
}

// ───────────────────────────────────────────────────────────────────────────
// Property-based tests
// ───────────────────────────────────────────────────────────────────────────

// Feature: render-blocking-css-fix, Property 1: For any input HTML document containing zero or more render-blocking CSS <link rel="stylesheet"> elements, a successful transform output SHALL contain zero render-blocking CSS <link rel="stylesheet"> elements in <head> (deferred stylesheets, if any, appear only via the non-render-blocking preload pattern).
// Validates: Requirements 1.1, 1.2, 2.1
test('Property 1: no render-blocking CSS in successful output', () => {
  fc.assert(
    fc.property(docArb({ budgetBytes: 512, maxAssetBytes: 512 }), (doc) => {
      const result = transformHtml(doc.html, doc.page, makeOptions(doc.budgetBytes, doc.assets));
      const ok = expectOk(result);
      const $ = cheerio.load(ok.html);
      assert.equal(countRenderBlockingCss($), 0);
    }),
    { numRuns: 100 }
  );
});

// Feature: render-blocking-css-fix, Property 2: For any input document whose <head> references a shared/critical (above-the-fold) stylesheet, a successful transform output SHALL contain that stylesheet's contents inside an inline <style> element and SHALL NOT deliver it through any (blocking or non-blocking) external link.
// Validates: Requirements 1.2, 4.3
test('Property 2: critical above-the-fold CSS is inlined', () => {
  fc.assert(
    fc.property(
      docArb({ budgetBytes: 4096, maxAssetBytes: 1500, sharedMode: 'always' }),
      (doc) => {
        const result = transformHtml(doc.html, doc.page, makeOptions(doc.budgetBytes, doc.assets));
        const ok = expectOk(result);
        const shared = doc.assets.find((a) => a.shared);
        assert.ok(shared, 'generator must produce a shared asset');

        // Inlined, not deferred.
        assert.ok(!ok.deferredHrefs.includes(shared.href));

        const $ = cheerio.load(ok.html);
        const styleText = $('head style').text();
        assert.ok(
          styleText.includes(shared.content),
          'shared stylesheet content must be inside <style>'
        );

        // Not delivered via any external link (blocking or preload).
        const linkHrefs = $('head link')
          .toArray()
          .map((el) => $(el).attr('href'));
        assert.ok(!linkHrefs.includes(shared.href));
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: render-blocking-css-fix, Property 3: For any set of linked stylesheets, the union of the CSS inlined into <style> and the CSS referenced by the deferred non-render-blocking links SHALL equal the original full set of CSS the page linked, with no rule omitted and none duplicated.
// Validates: Requirements 3.1, 5.2
test('Property 3: CSS completeness — no rule dropped or duplicated', () => {
  fc.assert(
    fc.property(docArb({ budgetBytes: 512, maxAssetBytes: 512 }), (doc) => {
      const result = transformHtml(doc.html, doc.page, makeOptions(doc.budgetBytes, doc.assets));
      const ok = expectOk(result);

      const allHrefs = doc.cssDocOrder.map((a) => a.href);
      const deferred = ok.deferredHrefs;
      const inlined = allHrefs.filter((h) => !deferred.includes(h));

      // Partition is a complete, disjoint cover of the original set.
      assert.equal(new Set([...inlined, ...deferred]).size, new Set(allHrefs).size);
      assert.equal(inlined.length + deferred.length, allHrefs.length);
      for (const h of deferred) assert.ok(allHrefs.includes(h));

      // Inlined <style> content equals the inlined assets concatenated in
      // critical-first order (no rule dropped/duplicated within the inline set).
      const inlinedSet = new Set(inlined);
      const expectedStyle = criticalFirstOrder(doc.cssDocOrder)
        .filter((a) => inlinedSet.has(a.href))
        .map((a) => a.content)
        .join('');
      const $ = cheerio.load(ok.html);
      const styleText = $('head style').text();
      assert.equal(styleText, expectedStyle);

      // Every deferred sheet is still referenced (its CSS not dropped).
      const preloadHrefs = $('head link[rel="preload"][as="style"]')
        .toArray()
        .map((el) => $(el).attr('href'));
      for (const h of deferred) assert.ok(preloadHrefs.includes(h));
    }),
    { numRuns: 100 }
  );
});

// Feature: render-blocking-css-fix, Property 4: For any set of linked stylesheets that the transform processes successfully, the total UTF-8 byte length of inlined <style> content SHALL be less than or equal to the HTML_PAYLOAD_BUDGET_BYTES budget.
// Validates: Requirements 5.1, 5.2
test('Property 4: inlined payload stays within the budget', () => {
  fc.assert(
    fc.property(
      docArb({ budgetBytes: HTML_PAYLOAD_BUDGET_BYTES, maxAssetBytes: 9000, maxRouteAssets: 5 }),
      (doc) => {
        const result = transformHtml(doc.html, doc.page, makeOptions(doc.budgetBytes, doc.assets));
        const ok = expectOk(result);
        assert.ok(ok.inlinedBytes <= HTML_PAYLOAD_BUDGET_BYTES);

        // inlinedBytes is the true UTF-8 byte length of the emitted <style>.
        const $ = cheerio.load(ok.html);
        assert.equal(ok.inlinedBytes, byteLen($('head style').text()));
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: render-blocking-css-fix, Property 5: For any page whose total CSS exceeds the budget (and whose critical stylesheet fits), every stylesheet not inlined SHALL be re-attached using the non-render-blocking load pattern (<link rel="preload" as="style" onload=…> plus a <noscript> fallback) and SHALL NOT appear as a render-blocking <link rel="stylesheet">.
// Validates: Requirements 5.2
test('Property 5: deferred CSS uses the non-render-blocking pattern', () => {
  fc.assert(
    fc.property(
      // budget 512 with >=2 assets each sized 300..512 guarantees overflow → deferral.
      docArb({
        budgetBytes: 512,
        maxAssetBytes: 512,
        minAssetBytes: 300,
        minRouteAssets: 2,
        maxRouteAssets: 6,
      }),
      (doc) => {
        const result = transformHtml(doc.html, doc.page, makeOptions(doc.budgetBytes, doc.assets));
        const ok = expectOk(result);
        assert.ok(ok.deferredHrefs.length >= 1, 'this generator must force at least one deferral');

        const $ = cheerio.load(ok.html);
        // No deferred sheet appears as a render-blocking stylesheet link.
        assert.equal(countRenderBlockingCss($), 0);

        const noscriptHrefs = noscriptStylesheetHrefs($);
        for (const href of ok.deferredHrefs) {
          const preload = $(`head link[rel="preload"][as="style"][href="${href}"]`);
          assert.equal(preload.length, 1, `missing preload for ${href}`);
          assert.equal(preload.attr('onload'), "this.onload=null;this.rel='stylesheet'");
          assert.ok(noscriptHrefs.includes(href), `missing <noscript> fallback for ${href}`);
        }
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: render-blocking-css-fix, Property 6: For any input where the required critical (first/above-the-fold) stylesheet is missing from the resolver or alone exceeds the 64 KiB budget, the transform SHALL return an error result identifying the offending page (and, for the over-budget case, the measured byte count) rather than emitting a page that drops or render-blocks its above-the-fold CSS.
// Validates: Requirements 2.5, 5.3
test('Property 6: over-budget or missing critical CSS fails with an error', () => {
  const overBudgetArb = fc
    .record({
      page: pageArb,
      budgetBytes: fc.integer({ min: 256, max: 2048 }),
      excess: fc.integer({ min: 1, max: 4096 }),
    })
    .map(({ page, budgetBytes, excess }) => {
      const size = budgetBytes + excess; // critical sheet alone exceeds budget
      const content = makeCssContent('crit', size);
      const href = '/_astro/crit.shared.css';
      const asset: CssAsset = { id: 'crit', href, content, shared: true, bytes: byteLen(content) };
      const html = `<!doctype html><html><head><meta charset="UTF-8" />${cssLinkHtml(
        href
      )}</head><body></body></html>`;
      return { kind: 'over-budget' as const, html, page, budgetBytes, asset };
    });

  const missingArb = fc
    .record({ page: pageArb, budgetBytes: fc.integer({ min: 256, max: 65536 }) })
    .map(({ page, budgetBytes }) => {
      const href = '/_astro/missing.shared.css';
      const html = `<!doctype html><html><head><meta charset="UTF-8" />${cssLinkHtml(
        href
      )}</head><body></body></html>`;
      return { kind: 'missing' as const, html, page, budgetBytes };
    });

  fc.assert(
    fc.property(fc.oneof(overBudgetArb, missingArb), (scenario) => {
      if (scenario.kind === 'over-budget') {
        const opts = makeOptions(scenario.budgetBytes, [scenario.asset]);
        const result = transformHtml(scenario.html, scenario.page, opts);
        assert.equal(result.ok, false);
        if (!result.ok) {
          assert.equal(result.error.kind, 'critical-exceeds-budget');
          assert.equal(result.error.page, scenario.page);
          assert.equal(result.error.measuredBytes, scenario.asset.bytes);
          assert.ok((result.error.measuredBytes as number) > scenario.budgetBytes);
        }
      } else {
        // Resolver knows about no assets → the critical link resolves to null.
        const opts = makeOptions(scenario.budgetBytes, []);
        const result = transformHtml(scenario.html, scenario.page, opts);
        assert.equal(result.ok, false);
        if (!result.ok) {
          assert.equal(result.error.kind, 'missing-asset');
          assert.equal(result.error.page, scenario.page);
        }
      }
    }),
    { numRuns: 100 }
  );
});

// Feature: render-blocking-css-fix, Property 7: For any input <head> containing non-CSS resources (meta tags, canonical and hreflang links, JSON-LD blocks, icons, OG/Twitter tags, and the is:inline theme-initialization script), a successful transform output SHALL contain each of those nodes unchanged — same content, same order — modifying only CSS <link> elements.
// Validates: Requirements 6.4, 6.5
test('Property 7: non-CSS head resources are preserved identically', () => {
  fc.assert(
    fc.property(docArb({ budgetBytes: 512, maxAssetBytes: 512 }), (doc) => {
      const result = transformHtml(doc.html, doc.page, makeOptions(doc.budgetBytes, doc.assets));
      const ok = expectOk(result);

      const before = preservedHeadNodes(cheerio.load(doc.html));
      const after = preservedHeadNodes(cheerio.load(ok.html));
      assert.deepEqual(after, before);
    }),
    { numRuns: 100 }
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Example / unit tests (task 2.12)
// ───────────────────────────────────────────────────────────────────────────

test('example: under-budget page inlines all CSS into one <style>, no links, no deferred', () => {
  const a: CssAsset = {
    id: 's0',
    href: '/_astro/base.css',
    content: makeCssContent('base', 200),
    shared: true,
    bytes: 200,
  };
  const b: CssAsset = {
    id: 'r0',
    href: '/_astro/page.css',
    content: makeCssContent('page', 150),
    shared: false,
    bytes: 150,
  };
  const html = `<!doctype html><html><head><meta charset="UTF-8" />${cssLinkHtml(
    a.href
  )}${cssLinkHtml(b.href)}</head><body></body></html>`;

  const result = transformHtml(html, '/en/', makeOptions(HTML_PAYLOAD_BUDGET_BYTES, [a, b]));
  const ok = expectOk(result);

  const $ = cheerio.load(ok.html);
  assert.equal($('head style').length, 1);
  assert.equal(countRenderBlockingCss($), 0);
  assert.equal($('head link[rel="preload"]').length, 0);
  assert.deepEqual(ok.deferredHrefs, []);
  // Critical-first order: shared base before route page.
  assert.equal($('head style').text(), a.content + b.content);
  assert.equal(ok.inlinedBytes, a.bytes + b.bytes);
});

test('example: over-budget page inlines critical, defers remainder, preserves the union', () => {
  const budget = 1000;
  const critical: CssAsset = {
    id: 's0',
    href: '/_astro/base.css',
    content: makeCssContent('base', 600),
    shared: true,
    bytes: 600,
  };
  const extra: CssAsset = {
    id: 'r0',
    href: '/_astro/page.css',
    content: makeCssContent('page', 600), // 600 + 600 > 1000 → deferred
    shared: false,
    bytes: 600,
  };
  const html = `<!doctype html><html><head><meta charset="UTF-8" />${cssLinkHtml(
    critical.href
  )}${cssLinkHtml(extra.href)}</head><body></body></html>`;

  const result = transformHtml(html, '/en/about/', makeOptions(budget, [critical, extra]));
  const ok = expectOk(result);

  const $ = cheerio.load(ok.html);
  assert.equal($('head style').text(), critical.content);
  assert.deepEqual(ok.deferredHrefs, [extra.href]);
  assert.equal(countRenderBlockingCss($), 0);

  const preload = $(`head link[rel="preload"][as="style"][href="${extra.href}"]`);
  assert.equal(preload.length, 1);
  assert.equal(preload.attr('onload'), "this.onload=null;this.rel='stylesheet'");
  assert.ok(noscriptStylesheetHrefs($).includes(extra.href));

  // Union preserved: critical inlined + deferred referenced = original set.
  assert.ok(ok.inlinedBytes <= budget);
});

test('example: missing CSS asset returns a missing-asset error', () => {
  const html = `<!doctype html><html><head><meta charset="UTF-8" /><link rel="stylesheet" href="/_astro/gone.css"></head><body></body></html>`;
  const result = transformHtml(html, '/da/contact/', {
    budgetBytes: HTML_PAYLOAD_BUDGET_BYTES,
    resolveCss: () => null,
    isShared: () => true,
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.error.kind, 'missing-asset');
    assert.equal(result.error.page, '/da/contact/');
  }
});

test('example: single critical sheet > 64 KiB returns critical-exceeds-budget with measuredBytes', () => {
  const size = HTML_PAYLOAD_BUDGET_BYTES + 1024;
  const asset: CssAsset = {
    id: 's0',
    href: '/_astro/huge.css',
    content: makeCssContent('huge', size),
    shared: true,
    bytes: size,
  };
  const html = `<!doctype html><html><head><meta charset="UTF-8" />${cssLinkHtml(
    asset.href
  )}</head><body></body></html>`;

  const result = transformHtml(html, '/de/privacy/', makeOptions(HTML_PAYLOAD_BUDGET_BYTES, [asset]));
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.error.kind, 'critical-exceeds-budget');
    assert.equal(result.error.page, '/de/privacy/');
    assert.equal(result.error.measuredBytes, size);
  }
});

test('example: the is:inline theme-init script is preserved byte-for-byte', () => {
  const css: CssAsset = {
    id: 's0',
    href: '/_astro/base.css',
    content: makeCssContent('base', 300),
    shared: true,
    bytes: 300,
  };
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    ${cssLinkHtml(css.href)}
    ${THEME_INIT_SCRIPT}
    <link rel="canonical" href="https://posttruncate.com/">
  </head>
  <body></body>
</html>`;

  const result = transformHtml(html, '/en/', makeOptions(HTML_PAYLOAD_BUDGET_BYTES, [css]));
  const ok = expectOk(result);

  // The script's inner JS body is preserved byte-for-byte (the FOUC-critical
  // content). cheerio round-trips the valueless `is:inline` directive as
  // `is:inline=""` on both input and output, so we assert the directive
  // survives and the body is unchanged rather than the literal source bytes.
  assert.ok(
    ok.html.includes(THEME_INIT_INNER),
    'theme-init script body must survive the transform unchanged'
  );
  const $ = cheerio.load(ok.html);
  const themeScript = $('head script').filter((_i, el) => $(el).attr('is:inline') !== undefined);
  assert.equal(themeScript.length, 1, 'is:inline theme script must be preserved');
  assert.equal(themeScript.text(), THEME_INIT_INNER);
  // And the CSS was still inlined alongside it.
  assert.equal($('head style').text(), css.content);
  assert.equal(countRenderBlockingCss($), 0);
});
