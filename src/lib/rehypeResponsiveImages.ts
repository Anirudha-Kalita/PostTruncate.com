// ──────────────────────────────────────────────────────────────────────────
// rehype plugin: rewrite in-body markdown images that point at the media
// library (/og/…) into responsive WebP <img>s. For each matching image it sets
// srcset (the variant set), sizes (the article measure), width/height (intrinsic
// dims, for CLS) and repoints src at the largest WebP variant — so the original
// PNG/JPG is never requested even when the markdown still says .png.
//
// Images without a manifest entry (SVG/GIF, unknown paths) and images outside
// /og/ are left untouched, falling back to their original <img src>.
//
// This runs at markdown COMPILE time in Node (the Vite/unified transform), not
// in the Cloudflare worker, so reading the manifest from disk with node:fs is
// safe here — the compiled, static HTML is what ships to the worker.
// ──────────────────────────────────────────────────────────────────────────
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { resolveVariants, buildSrcset, type ImageManifest } from './responsiveImage';

/** Responsive `sizes` for in-body images — matches the article measure. */
const IN_BODY_SIZES = '(max-width: 896px) 100vw, 896px';

const MANIFEST_PATH = resolve(process.cwd(), 'public/og/optimized/manifest.json');

let manifestCache: ImageManifest | null | undefined;

/** Read + cache the manifest from disk, returning null when absent/invalid. */
function loadManifest(): ImageManifest | null {
  if (manifestCache !== undefined) return manifestCache;
  try {
    manifestCache = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as ImageManifest;
  } catch {
    manifestCache = null;
  }
  return manifestCache;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Rewrite a single hast <img> node in place when it has a manifest entry. */
function rewriteImg(node: any, manifest: ImageManifest | null, sizes: string): void {
  const props = node.properties;
  if (!props) return;
  const src = props.src;
  // Only touch media-library images; leave everything else alone.
  if (typeof src !== 'string' || !src.startsWith('/og/')) return;

  const data = resolveVariants(manifest, src);
  if (!data) return; // no variants (SVG/GIF, unknown) → keep original <img>
  const largest = data.variants[data.variants.length - 1];
  if (!largest) return;

  props.src = largest.url;
  props.srcSet = buildSrcset(data.variants);
  props.sizes = sizes;
  props.width = data.width;
  props.height = data.height;
}

/**
 * Pure hast transform: walk the tree and rewrite every media-library <img>.
 * Exposed for unit testing without touching the filesystem.
 */
export function transformImages(
  tree: any,
  manifest: ImageManifest | null,
  sizes: string = IN_BODY_SIZES,
): any {
  const visit = (node: any): void => {
    const children = node?.children;
    if (!Array.isArray(children)) return;
    for (const child of children) {
      if (child?.type === 'element' && child.tagName === 'img') {
        rewriteImg(child, manifest, sizes);
      }
      visit(child);
    }
  };
  visit(tree);
  return tree;
}

/** rehype plugin — repoints in-body /og/ images at their WebP variant set. */
export function rehypeResponsiveImages() {
  const manifest = loadManifest();
  return (tree: any) => transformImages(tree, manifest);
}
