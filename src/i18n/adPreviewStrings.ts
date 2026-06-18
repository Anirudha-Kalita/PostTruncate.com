// ──────────────────────────────────────────────────────────────────────────
// English-first UI copy for the Ad Previews & Simulators islands.
//
// These strings are deliberately NOT placed in the per-locale dictionaries
// (en.ts, es.ts, …): the i18n parity lint (scripts/check-i18n.mjs) requires
// every locale to carry the EXACT same key paths, so an English-only block in
// en.ts would break parity. Instead the islands read this constant through
// `adPreviewStrings(s)`, which returns the locale's `adPreviews` override when
// present and falls back to this English default otherwise. That keeps the lint
// green while the silo ships English-only, and lets any locale opt in later by
// adding an `adPreviews` sub-object to its IslandStrings.
// ──────────────────────────────────────────────────────────────────────────

import type { AdPreviewStrings, IslandStrings } from './types';

export const AD_PREVIEW_STRINGS: AdPreviewStrings = {
  fields: {
    headline: 'Headline',
    primary: 'Primary text',
    description: 'Description',
    headlineN: 'Headline {n}',
  },
  placeholders: {
    headline: 'Your headline',
    primary: 'Write your primary text…',
    description: 'Add a short description',
  },
  counter: '{n} / {limit}',
  over: '{n} over',
  previewLabel: 'Live preview',
  deviceAria: 'Choose preview device',
  mobile: 'Mobile',
  desktop: 'Desktop',
  modeAria: 'Choose placement',
  feed: 'Feed',
  reels: 'Reels',
  safeZoneLabel: 'Safe zones',
  safeZoneHint: 'Shaded bands show where the interface covers your creative. Keep important text out of them.',
  safeZoneTag: 'Safe zone',
  reelsTooShort: 'Aim for {min}–{max} characters so the caption reads cleanly over the video.',
  media: {
    add: 'Add media',
    replace: 'Replace media',
    remove: 'Remove media',
    hint: 'Previewed in your browser only — never uploaded or stored.',
  },
  badgeFits: 'Fits',
  badgeTruncated: 'Truncated',
  sponsored: 'Sponsored',
};

/**
 * Resolve the ad-preview strings for an island: prefer the locale's own
 * `adPreviews` override, fall back to the English defaults. Mirrors how the
 * optional `imageUpload` strings are consumed.
 */
export function adPreviewStrings(s: IslandStrings): AdPreviewStrings {
  return s.adPreviews ?? AD_PREVIEW_STRINGS;
}
