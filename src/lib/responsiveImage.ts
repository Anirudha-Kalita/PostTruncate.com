// ──────────────────────────────────────────────────────────────────────────
// responsiveImage.ts — pure helpers for resolving a referenced image path
// (e.g. /og/foo.png or /og/foo.webp) against the build-time image manifest.
//
// This module is intentionally free of `node:fs`/`node:path`: the blog pages
// are prerendered inside the Cloudflare (miniflare) worker, which has no Node
// builtins. The manifest itself is loaded separately — bundled into the worker
// via Vite in src/lib/imageManifest.ts (component side), and read from disk via
// node:fs in the build-time rehype plugin (Node side). Both paths funnel
// through the pure `resolveVariants` here, which is also what the unit tests
// exercise.
//
// When the manifest is missing (optimizer not run) or has no entry for a path
// (SVG/GIF, unknown image), callers fall back to a plain <img src> — so
// rendering never hard-fails on a missing variant.
// ──────────────────────────────────────────────────────────────────────────

/** One generated WebP variant: its rendered width (px) and public URL. */
export interface ImageVariant {
  width: number;
  url: string;
}

/** A manifest entry: the source's intrinsic size + its ascending variants. */
export interface ImageVariants {
  /** Intrinsic source width (px) — drives the <img> width attribute. */
  width: number;
  /** Intrinsic source height (px) — drives the <img> height attribute. */
  height: number;
  /** WebP variants, ascending by width. The last one is the largest. */
  variants: ImageVariant[];
}

/** Referenced path → variant set. */
export type ImageManifest = Record<string, ImageVariants>;

/**
 * Normalize a referenced src to a manifest key: drop any query/hash and decode
 * percent-encoding, since manifest keys hold raw filenames (spaces, parens).
 */
export function normalizeKey(src: string): string {
  let key = src;
  const cut = key.search(/[?#]/);
  if (cut !== -1) key = key.slice(0, cut);
  try {
    key = decodeURIComponent(key);
  } catch {
    // Malformed escape — fall back to the raw string.
  }
  return key;
}

/**
 * Pure resolver: look up `src` in a given manifest. Returns the variant set or
 * null when there's no entry (caller should fall back to a plain <img src>).
 */
export function resolveVariants(
  manifest: ImageManifest | null | undefined,
  src: string | null | undefined,
): ImageVariants | null {
  if (!manifest || !src) return null;
  return manifest[normalizeKey(src)] ?? null;
}

/** Build a `srcset` attribute value ("url 400w, url 800w, …"). */
export function buildSrcset(variants: ImageVariant[]): string {
  return variants.map((v) => `${v.url} ${v.width}w`).join(', ');
}
