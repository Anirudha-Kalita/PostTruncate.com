// ──────────────────────────────────────────────────────────────────────────
// English-first UI copy for the platform link-display guidance shown by the
// Platform_Counter and Ad_Preview_Simulator islands.
//
// These strings are deliberately NOT placed in the per-locale dictionaries
// (en.ts, es.ts, …): the i18n parity lint (scripts/check-i18n.mjs) requires
// every locale to carry the EXACT same key paths, so an English-only block in
// en.ts would break parity. Instead the islands read this constant through
// `linkDisplayStrings(s)`, which returns the locale's `linkDisplay` override
// when present and falls back to this English default otherwise. That keeps the
// lint green while the silo ships English-only, and lets any locale opt in
// later by adding a `linkDisplay` sub-object to its IslandStrings.
//
// "{weight}" / "{n}" tokens are filled by interp() at the call site.
// ──────────────────────────────────────────────────────────────────────────

import type { IslandStrings, LinkDisplayStrings } from './types';

export const LINK_DISPLAY_STRINGS: LinkDisplayStrings = {
  plainText: "Links in the body aren't clickable here — they show as plain text.",
  previewCard: 'This link generates a preview card.',
  previewCardFirstUrl: 'The first link becomes the preview card.',
  clickableInline: 'This link stays clickable inline.',
  countedShortened: 'Every link counts as {weight} characters.',
  bioLinkAllowance: 'Up to {n} clickable link(s) allowed in your bio.',
  adNoClickableLink:
    'In-feed ad captions carry no clickable link — the CTA button carries the click.',
};

/**
 * Resolve the link-display strings for an island: prefer the locale's own
 * `linkDisplay` override, fall back to the English defaults. Mirrors how the
 * optional `adPreviews` strings are consumed (see adPreviewStrings.ts).
 */
export function linkDisplayStrings(s: IslandStrings): LinkDisplayStrings {
  return s.linkDisplay ?? LINK_DISPLAY_STRINGS;
}
