import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as cheerio from 'cheerio';

import {
  extractIslandScriptHrefs,
  resolveTransitiveImports,
  injectModulePreloads,
} from './modulePreload';

const ISLAND_PAGE = `<!doctype html><html><head><meta charset="UTF-8"></head><body>
<astro-island uid="a" component-url="/_astro/Dashboard.abc.js" component-export="default" renderer-url="/_astro/client.xyz.js"></astro-island>
</body></html>`;

const NO_ISLAND_PAGE = `<!doctype html><html><head><meta charset="UTF-8"></head><body><p>static</p></body></html>`;

// ── extractIslandScriptHrefs ────────────────────────────────────────────────

test('extractIslandScriptHrefs collects component-url and renderer-url in document order, deduped', () => {
  const html = `<!doctype html><html><head></head><body>
    <astro-island component-url="/_astro/A.js" renderer-url="/_astro/client.js"></astro-island>
    <astro-island component-url="/_astro/B.js" renderer-url="/_astro/client.js"></astro-island>
  </body></html>`;
  assert.deepEqual(extractIslandScriptHrefs(html), [
    '/_astro/A.js',
    '/_astro/client.js',
    '/_astro/B.js',
  ]);
});

test('extractIslandScriptHrefs returns [] when there is no astro-island', () => {
  assert.deepEqual(extractIslandScriptHrefs(NO_ISLAND_PAGE), []);
});

// ── resolveTransitiveImports ────────────────────────────────────────────────

test('resolveTransitiveImports walks the static-import graph breadth-first', () => {
  const graph: Record<string, string[]> = {
    '/_astro/Dashboard.js': ['/_astro/hooks.js', '/_astro/ui.js'],
    '/_astro/hooks.js': ['/_astro/preact.js'],
    '/_astro/ui.js': ['/_astro/preact.js'],
    '/_astro/preact.js': [],
  };
  const result = resolveTransitiveImports(
    ['/_astro/Dashboard.js'],
    (href) => graph[href] ?? []
  );
  assert.deepEqual(result, [
    '/_astro/Dashboard.js',
    '/_astro/hooks.js',
    '/_astro/ui.js',
    '/_astro/preact.js',
  ]);
});

test('resolveTransitiveImports does not hang on cycles', () => {
  const graph: Record<string, string[]> = {
    '/_astro/A.js': ['/_astro/B.js'],
    '/_astro/B.js': ['/_astro/A.js'],
  };
  const result = resolveTransitiveImports(['/_astro/A.js'], (href) => graph[href] ?? []);
  assert.deepEqual(result, ['/_astro/A.js', '/_astro/B.js']);
});

// ── injectModulePreloads ────────────────────────────────────────────────────

test('injectModulePreloads adds a modulepreload link per transitive dependency', () => {
  const graph: Record<string, string[]> = {
    '/_astro/Dashboard.abc.js': ['/_astro/hooks.js', '/_astro/ui.js'],
    '/_astro/client.xyz.js': ['/_astro/preact.js'],
    '/_astro/hooks.js': [],
    '/_astro/ui.js': [],
    '/_astro/preact.js': [],
  };
  const out = injectModulePreloads(ISLAND_PAGE, { resolveImports: (href) => graph[href] ?? [] });
  const $ = cheerio.load(out);
  const hrefs = $('head link[rel="modulepreload"]')
    .toArray()
    .map((el) => $(el).attr('href'));

  assert.deepEqual(
    new Set(hrefs),
    new Set([
      '/_astro/Dashboard.abc.js',
      '/_astro/hooks.js',
      '/_astro/ui.js',
      '/_astro/client.xyz.js',
      '/_astro/preact.js',
    ])
  );
});

test('injectModulePreloads returns the input unchanged when there is no astro-island', () => {
  const out = injectModulePreloads(NO_ISLAND_PAGE, { resolveImports: () => [] });
  assert.equal(out, NO_ISLAND_PAGE);
});

test('injectModulePreloads is idempotent — a second pass adds no duplicate links', () => {
  const graph: Record<string, string[]> = {
    '/_astro/Dashboard.abc.js': ['/_astro/hooks.js'],
    '/_astro/client.xyz.js': [],
    '/_astro/hooks.js': [],
  };
  const resolveImports = (href: string) => graph[href] ?? [];
  const once = injectModulePreloads(ISLAND_PAGE, { resolveImports });
  const twice = injectModulePreloads(once, { resolveImports });

  const $ = cheerio.load(twice);
  const hrefs = $('head link[rel="modulepreload"]')
    .toArray()
    .map((el) => $(el).attr('href'));
  assert.equal(hrefs.length, new Set(hrefs).size);
  assert.equal(twice, once);
});

test('injectModulePreloads skips hrefs already hinted, keeping only the missing ones', () => {
  const preHinted = `<!doctype html><html><head><link rel="modulepreload" href="/_astro/hooks.js"></head><body>
<astro-island component-url="/_astro/Dashboard.abc.js" renderer-url="/_astro/client.xyz.js"></astro-island>
</body></html>`;
  const graph: Record<string, string[]> = {
    '/_astro/Dashboard.abc.js': ['/_astro/hooks.js'],
    '/_astro/client.xyz.js': [],
  };
  const out = injectModulePreloads(preHinted, { resolveImports: (href) => graph[href] ?? [] });
  const $ = cheerio.load(out);
  const hrefs = $('head link[rel="modulepreload"]')
    .toArray()
    .map((el) => $(el).attr('href'));
  assert.deepEqual(new Set(hrefs), new Set(['/_astro/hooks.js', '/_astro/Dashboard.abc.js', '/_astro/client.xyz.js']));
});
