import { test } from 'node:test';
import assert from 'node:assert/strict';
import { transformImages } from './rehypeResponsiveImages.ts';
import type { ImageManifest } from './responsiveImage.ts';

const MANIFEST: ImageManifest = {
  '/og/twitter.png': {
    width: 1536,
    height: 1024,
    variants: [
      { width: 400, url: '/og/optimized/twitter-400.webp' },
      { width: 800, url: '/og/optimized/twitter-800.webp' },
      { width: 1536, url: '/og/optimized/twitter-1536.webp' },
    ],
  },
};

/** Minimal hast img element. */
const img = (properties: Record<string, unknown>) => ({
  type: 'element',
  tagName: 'img',
  properties,
  children: [],
});

/** Wrap nodes in a hast root with a paragraph, mirroring markdown output. */
const root = (...imgs: unknown[]) => ({
  type: 'root',
  children: [{ type: 'element', tagName: 'p', properties: {}, children: imgs }],
});

test('rewrites a media-library image into a responsive WebP <img>', () => {
  const tree = root(img({ src: '/og/twitter.png', alt: 'A tweet' }));
  transformImages(tree, MANIFEST);

  const node = tree.children[0].children[0] as any;
  assert.equal(node.properties.src, '/og/optimized/twitter-1536.webp');
  assert.equal(
    node.properties.srcSet,
    '/og/optimized/twitter-400.webp 400w, /og/optimized/twitter-800.webp 800w, /og/optimized/twitter-1536.webp 1536w',
  );
  assert.equal(node.properties.sizes, '(max-width: 896px) 100vw, 896px');
  assert.equal(node.properties.width, 1536);
  assert.equal(node.properties.height, 1024);
  // Existing attributes are preserved.
  assert.equal(node.properties.alt, 'A tweet');
});

test('leaves non-/og/ images untouched', () => {
  const tree = root(img({ src: 'https://cdn.example.com/x.png', alt: '' }));
  transformImages(tree, MANIFEST);

  const node = tree.children[0].children[0] as any;
  assert.equal(node.properties.src, 'https://cdn.example.com/x.png');
  assert.equal(node.properties.srcSet, undefined);
});

test('leaves /og/ images without a manifest entry untouched (SVG/GIF/unknown)', () => {
  const tree = root(img({ src: '/og/diagram.svg', alt: '' }));
  transformImages(tree, MANIFEST);

  const node = tree.children[0].children[0] as any;
  assert.equal(node.properties.src, '/og/diagram.svg');
  assert.equal(node.properties.srcSet, undefined);
});

test('a custom sizes value is applied', () => {
  const tree = root(img({ src: '/og/twitter.png', alt: '' }));
  transformImages(tree, MANIFEST, '100vw');
  assert.equal((tree.children[0].children[0] as any).properties.sizes, '100vw');
});

test('a null manifest is a safe no-op', () => {
  const tree = root(img({ src: '/og/twitter.png', alt: '' }));
  transformImages(tree, null);
  assert.equal((tree.children[0].children[0] as any).properties.src, '/og/twitter.png');
});

test('handles deeply nested images (e.g. inside links/figures)', () => {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: { href: '#' },
            children: [img({ src: '/og/twitter.png', alt: '' })],
          },
        ],
      },
    ],
  };
  transformImages(tree, MANIFEST);
  const node = (tree.children[0].children[0].children[0] as any);
  assert.equal(node.properties.src, '/og/optimized/twitter-1536.webp');
});
