// ──────────────────────────────────────────────────────────────────────────
// inject-modulepreload.test.mjs — tests for the postbuild modulepreload
// injection runner (scripts/inject-modulepreload.mjs).
//
// Covers the import-graph parsing/resolution helpers directly, plus an
// integration pass against a synthetic `dist`-shaped fixture directory (real
// Rollup-style chunk text + real HTML pages), mirroring
// prune-dist-originals.test.mjs / inline-critical-css.test.mjs.
// ──────────────────────────────────────────────────────────────────────────
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as cheerio from 'cheerio';

import { parseStaticImportSpecifiers, createImportResolver } from './inject-modulepreload.mjs';

// ── parseStaticImportSpecifiers ─────────────────────────────────────────────

test('parseStaticImportSpecifiers extracts named-import chunk specifiers, minified Rollup style', () => {
  const src =
    'import{d as _,A as se}from"./hooks.module.CQoi8duV.js";' +
    'import{u as e}from"./jsxRuntime.module.Cy0HmwMI.js";';
  assert.deepEqual(parseStaticImportSpecifiers(src), [
    './hooks.module.CQoi8duV.js',
    './jsxRuntime.module.Cy0HmwMI.js',
  ]);
});

test('parseStaticImportSpecifiers extracts bare side-effect imports', () => {
  const src = 'import"./polyfill.js";const x=1;';
  assert.deepEqual(parseStaticImportSpecifiers(src), ['./polyfill.js']);
});

test('parseStaticImportSpecifiers ignores dynamic import() calls', () => {
  const src = 'const load=()=>import("./lazy-locale.js");import{a}from"./eager.js";';
  assert.deepEqual(parseStaticImportSpecifiers(src), ['./eager.js']);
});

test('parseStaticImportSpecifiers ignores bare/package specifiers', () => {
  const src = 'import{h}from"preact";import{a}from"./local.js";';
  assert.deepEqual(parseStaticImportSpecifiers(src), ['./local.js']);
});

test('parseStaticImportSpecifiers returns [] for a chunk with no static imports', () => {
  assert.deepEqual(parseStaticImportSpecifiers('const x=1;export{x};'), []);
});

// ── createImportResolver ────────────────────────────────────────────────────

async function fixtureDir(files) {
  const dir = await mkdtemp(join(tmpdir(), 'modulepreload-'));
  await mkdir(join(dir, '_astro'), { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    await writeFile(join(dir, '_astro', name), content);
  }
  return dir;
}

test('createImportResolver resolves a chunk static imports to root-absolute hrefs', async () => {
  const dir = await fixtureDir({
    'Dashboard.abc.js': 'import{a}from"./hooks.xyz.js";import{b}from"./ui.def.js";',
    'hooks.xyz.js': 'export const a=1;',
    'ui.def.js': 'export const b=2;',
  });
  try {
    const resolveImports = createImportResolver(dir);
    assert.deepEqual(resolveImports('/_astro/Dashboard.abc.js'), [
      '/_astro/hooks.xyz.js',
      '/_astro/ui.def.js',
    ]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('createImportResolver returns [] for non-_astro, missing, or non-.js hrefs', async () => {
  const dir = await fixtureDir({ 'a.js': 'export{};' });
  try {
    const resolveImports = createImportResolver(dir);
    assert.deepEqual(resolveImports('/_astro/missing.js'), []);
    assert.deepEqual(resolveImports('https://example.com/x.js'), []);
    assert.deepEqual(resolveImports('/_astro/a.css'), []);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('createImportResolver caches — reads each chunk from disk at most once', async () => {
  const dir = await fixtureDir({
    'Dashboard.abc.js': 'import{a}from"./hooks.xyz.js";',
    'hooks.xyz.js': 'export const a=1;',
  });
  try {
    let reads = 0;
    const resolveImports = createImportResolver(dir, (path) => {
      reads++;
      return readFileSync(path, 'utf8');
    });
    resolveImports('/_astro/Dashboard.abc.js');
    resolveImports('/_astro/Dashboard.abc.js');
    assert.equal(reads, 1);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

// ── Integration: main() over a synthetic dist fixture ──────────────────────

async function buildFixture() {
  const dir = await mkdtemp(join(tmpdir(), 'modulepreload-dist-'));
  await mkdir(join(dir, '_astro'), { recursive: true });
  await mkdir(join(dir, 'en', 'character-counter'), { recursive: true });

  await writeFile(
    join(dir, '_astro', 'Dashboard.abc.js'),
    'import{a}from"./hooks.xyz.js";import{b}from"./ui.def.js";export default function(){}'
  );
  await writeFile(join(dir, '_astro', 'client.ghi.js'), 'import{c}from"./preact.jkl.js";');
  await writeFile(join(dir, '_astro', 'hooks.xyz.js'), 'export const a=1;');
  await writeFile(join(dir, '_astro', 'ui.def.js'), 'export const b=2;');
  await writeFile(join(dir, '_astro', 'preact.jkl.js'), 'export const c=3;');

  const islandPage = `<!doctype html><html><head><meta charset="UTF-8"></head><body>
<astro-island component-url="/_astro/Dashboard.abc.js" renderer-url="/_astro/client.ghi.js"></astro-island>
</body></html>`;
  await writeFile(join(dir, 'en', 'character-counter', 'index.html'), islandPage);

  const staticPage = `<!doctype html><html><head><meta charset="UTF-8"></head><body><p>about</p></body></html>`;
  await writeFile(join(dir, 'en', 'index.html'), staticPage);

  return dir;
}

test('createImportResolver + injectModulePreloads round-trip over a realistic fixture', async () => {
  const dir = await buildFixture();
  try {
    const { injectModulePreloads } = await import('../src/lib/modulePreload.ts');
    const resolveImports = createImportResolver(dir);

    const islandHtml = await readFile(
      join(dir, 'en', 'character-counter', 'index.html'),
      'utf8'
    );
    const rewritten = injectModulePreloads(islandHtml, { resolveImports });
    const $ = cheerio.load(rewritten);
    const hrefs = new Set(
      $('head link[rel="modulepreload"]')
        .toArray()
        .map((el) => $(el).attr('href'))
    );
    assert.deepEqual(
      hrefs,
      new Set([
        '/_astro/Dashboard.abc.js',
        '/_astro/hooks.xyz.js',
        '/_astro/ui.def.js',
        '/_astro/client.ghi.js',
        '/_astro/preact.jkl.js',
      ])
    );

    // A static page with no island is left untouched.
    const staticHtml = await readFile(join(dir, 'en', 'index.html'), 'utf8');
    assert.equal(injectModulePreloads(staticHtml, { resolveImports }), staticHtml);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
