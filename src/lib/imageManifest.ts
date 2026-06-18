// ──────────────────────────────────────────────────────────────────────────
// imageManifest.ts — component-side manifest loader (Cloudflare-worker safe).
//
// The blog pages are prerendered inside the miniflare worker, which has no
// `node:fs`. So instead of reading the manifest from disk, we let Vite bundle
// it into the build via import.meta.glob. The glob matches zero files when the
// optimizer hasn't run yet → `manifest` is null → ResponsiveImage falls back to
// a plain <img src>. When the manifest exists it's inlined into the worker, so
// lookups are a plain object access at render time.
// ──────────────────────────────────────────────────────────────────────────
import {
  resolveVariants,
  type ImageManifest,
  type ImageVariants,
} from './responsiveImage';

// Eagerly import the generated manifest. The pattern matches the single
// generated JSON file; a missing file yields an empty record (no throw).
const modules = import.meta.glob<ImageManifest>(
  '/public/og/optimized/manifest.json',
  { eager: true, import: 'default' },
);

const manifest: ImageManifest | null = (Object.values(modules)[0] as ImageManifest) ?? null;

/**
 * Resolve the variant set for a referenced image path, or null when there's no
 * entry (caller should fall back to a plain <img src>).
 */
export function getVariants(src: string | null | undefined): ImageVariants | null {
  return resolveVariants(manifest, src);
}
