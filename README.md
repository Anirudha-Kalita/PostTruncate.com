# PostTruncate Core Engine 🚀

The core client-side truncation and data sanitisation algorithms powering [PostTruncate.com](https://posttruncate.com/). 

## 💡 Why This Exists
Social media platform algorithms punish content when vital hooks drop beneath the fold. PostTruncate calculates exact screen character ceilings across 4 networks natively in the browser's local cache.

## 🚀 Stack 
- Framework: Astro
- Deployment: Cloudflare Workers Edge Network

## 🔗 Live Implementation
Try the full application featuring 10+ internationalised languages at [PostTruncate.com](https://posttruncate.com/).

## Responsive image pipeline (blog media)

Blog images in `public/og/` are served as right-sized WebP per device. A build-time
Sharp script generates multi-width WebP variants and a manifest the render layer
uses to emit `<img srcset>` across the hero, post cards, and in-body markdown images.

- **Generate** (`scripts/optimize-images.mjs`, runs as `prebuild`/`predev`): scans
  `public/og/`, writes WebP variants (400/800/1200/1600px, never upscaling) to
  `public/og/optimized/`, and a `manifest.json`. Existing WebP are resized;
  PNG/JPG are converted + resized. SVG/GIF are skipped. Variants are cached by
  source mtime, so reruns are fast.
- **Render**: `ResponsiveImage.astro` (hero + cards) and
  `rehypeResponsiveImages.ts` (in-body) look the referenced path up in the
  manifest and emit `srcset`/`sizes`/`width`/`height` with `src` pointing at the
  largest WebP variant — so the original is never requested even when markdown
  still says `.png`. A missing manifest entry falls back to a plain `<img src>`.
- **WebP-only output** (`scripts/prune-dist-originals.mjs`, runs as `postbuild`):
  removes non-WebP originals from the built `og/` folder so the deployed site
  ships WebP only.
- **Cleanup** (`scripts/prune-duplicate-originals.mjs`): one-time removal of
  redundant PNG/JPG in `public/og/` that already have a `.webp` sibling. Dry-run
  by default; pass `--delete` to remove.

Generated artifacts (`public/og/optimized/`) are gitignored and rebuilt in CI.

**Exceptions / caveats:**
- The `og:image` social meta tag (in `Layout.astro`) intentionally keeps pointing
  at the full-size image, not a variant — social scrapers want the original.
- Future PNG/JPG uploads stay in the git repo as the regeneration source; they're
  pruned only from the deployed `dist/` output, never from `public/og/`.
