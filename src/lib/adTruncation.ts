/**
 * Pure, DOM-free truncation helpers for the Ad Previews simulators.
 *
 * Every platform's character/pixel boundary is enforced here so the islands
 * stay thin (render-only) and the rules are unit-testable in isolation. All
 * slicing is grapheme-safe via `sliceChars`, so emoji and combining marks are
 * never split mid-cluster. Thresholds come from `AD_PLATFORM_CONFIG`.
 */

import { charCount, sliceChars } from './textTools';
import { measureTextWidth, ELLIPSIS } from './canvasText';
import { AD_PLATFORM_CONFIG } from '../data/adPlatformConfig';
import { adLinkBehavior } from '../data/linkBehavior';

/** Result of a character-based field truncation. */
export interface FieldTruncation {
  text: string;
  truncated: boolean;
}

/**
 * Facebook primary text: show the first 125 characters, then an unclickable
 * "… See More". Copy at or under the cap renders in full.
 */
export function truncateFacebookPrimary(text: string): FieldTruncation {
  const { primaryTruncateChars, seeMoreLabel } = AD_PLATFORM_CONFIG.facebook;
  if (charCount(text) <= primaryTruncateChars) return { text, truncated: false };
  return { text: sliceChars(text, 0, primaryTruncateChars) + seeMoreLabel, truncated: true };
}

/**
 * Facebook Reels caption: show the first `reelsPrimaryTruncateChars` grapheme
 * clusters, then the configured "… See More" affordance. Mirrors
 * `truncateFacebookPrimary` exactly but reads the Reels-specific cutoff. Copy at
 * or under the cutoff renders in full; an empty caption yields
 * `{ text: '', truncated: false }` (no text, no affordance).
 */
export function truncateFacebookReelsPrimary(text: string): FieldTruncation {
  const { reelsPrimaryTruncateChars, seeMoreLabel } = AD_PLATFORM_CONFIG.facebook;
  if (charCount(text) <= reelsPrimaryTruncateChars) return { text, truncated: false };
  return { text: sliceChars(text, 0, reelsPrimaryTruncateChars) + seeMoreLabel, truncated: true };
}

/**
 * LinkedIn intro (introductory) text: show the first N grapheme clusters, then
 * an inline "…more". The cutoff is device-aware — LinkedIn's narrower mobile
 * column folds a touch earlier than desktop. Copy at or under the cutoff renders
 * in full; an empty intro yields `{ text: '', truncated: false }`.
 */
export function truncateLinkedInIntro(
  text: string,
  device: 'mobile' | 'desktop',
): FieldTruncation {
  const { introTruncateChars, introTruncateCharsMobile, seeMoreLabel } =
    AD_PLATFORM_CONFIG.linkedin;
  const cap = device === 'mobile' ? introTruncateCharsMobile : introTruncateChars;
  if (charCount(text) <= cap) return { text, truncated: false };
  return { text: sliceChars(text, 0, cap) + seeMoreLabel, truncated: true };
}

/**
 * Hard-clamp a field to a grapheme-cluster cap with NO "See More" affordance.
 * Shared by the Facebook Carousel card-field helpers below. Text at or under the
 * cap is returned unchanged (`truncated: false`); over the cap it is sliced
 * grapheme-safe to exactly `cap` clusters (`truncated: true`).
 */
function clampField(text: string, cap: number): FieldTruncation {
  return { text: sliceChars(text, 0, cap), truncated: charCount(text) > cap };
}

/**
 * Facebook Carousel card headline: hard-clamp to the configured headline cap,
 * grapheme-safe, with no affordance appended.
 */
export function clampCarouselHeadline(text: string): FieldTruncation {
  return clampField(text, AD_PLATFORM_CONFIG.facebook.carousel.cardHeadlineMax);
}

/**
 * Facebook Carousel card description: hard-clamp to the configured description
 * cap, grapheme-safe, with no affordance appended.
 */
export function clampCarouselDescription(text: string): FieldTruncation {
  return clampField(text, AD_PLATFORM_CONFIG.facebook.carousel.cardDescriptionMax);
}

// ──────────────────────────────────────────────────────────────────────────
// Facebook Carousel card-set reducers (pure; operate on counts/indices, not
// React state) and the per-format status-badge helper. Centralizing the
// count-bound and active-index rules here keeps the components free of this
// logic (Req 13.2) and the helpers DOM-free and unit-testable (Req 13.4).
// ──────────────────────────────────────────────────────────────────────────

/**
 * Result of a card-set mutation. `count`/`activeIndex` are the post-operation
 * values (unchanged when the operation was a no-op), `changed` is true only when
 * the set actually mutated, and `atLimit` is true when the operation was refused
 * because the count is already at its `min`/`max` bound (drives the localized
 * max/min-reached notices).
 *
 * Invariant on the returned value: `min <= count <= max` and
 * `0 <= activeIndex < count`.
 */
export interface CardCountResult {
  count: number;
  activeIndex: number;
  changed: boolean;
  atLimit: boolean;
}

/**
 * Append a card. When `count < max`: increment the count by one, append after
 * the last card, and select the newly appended last card (`activeIndex = count`,
 * the old count being the new last index). When `count === max`: leave the set
 * unchanged and report `atLimit` so the UI can surface the max-reached notice
 * (Req 5.3, 5.4).
 */
export function addCard(
  count: number,
  activeIndex: number,
  min: number,
  max: number,
): CardCountResult {
  if (count < max) {
    return { count: count + 1, activeIndex: count, changed: true, atLimit: false };
  }
  return { count, activeIndex, changed: false, atLimit: true };
}

/**
 * Remove the card at `removeIndex`. When `count > min`: decrement the count by
 * one and reassign the active index per spec —
 *  - removing the active card that is NOT the last → the active index stays the
 *    same (the following card shifts into that slot),
 *  - removing the active card that IS the last → the active index moves to the
 *    preceding card (`count - 2`),
 *  - removing a card positioned before the active card → the active index shifts
 *    down by one,
 *  - removing a card positioned after the active card → the active index is
 *    unchanged.
 * When `count === min`: leave the set unchanged and report `atLimit` so the UI
 * can surface the min-reached notice (Req 5.5–5.8). The returned `activeIndex`
 * always satisfies `0 <= activeIndex < count`.
 */
export function removeCard(
  count: number,
  removeIndex: number,
  activeIndex: number,
  min: number,
): CardCountResult {
  if (count <= min) {
    return { count, activeIndex, changed: false, atLimit: true };
  }
  const newCount = count - 1;
  let newActive: number;
  if (removeIndex === activeIndex) {
    // Removing the active card: stay in place unless it was the last card.
    newActive = removeIndex === count - 1 ? removeIndex - 1 : activeIndex;
  } else if (removeIndex < activeIndex) {
    // A card before the active one shifts everything down by one.
    newActive = activeIndex - 1;
  } else {
    // A card after the active one leaves the active index untouched.
    newActive = activeIndex;
  }
  return { count: newCount, activeIndex: newActive, changed: true, atLimit: false };
}

/**
 * Move the active card one position inward in direction `dir` (-1 previous, +1
 * next). Clamps at either bound: stepping before the first card or past the last
 * card is a no-op that returns the current `activeIndex` unchanged (Req 8.1,
 * 8.3, 8.4).
 */
export function stepCard(activeIndex: number, dir: -1 | 1, count: number): number {
  const next = activeIndex + dir;
  if (next < 0 || next > count - 1) return activeIndex;
  return next;
}

/** Tone + label key for the per-format Fits/Truncated status badge. */
export type BadgeState = { toneKind: 'neutral' | 'safe' | 'warn'; label: 'fits' | 'truncated' };

/**
 * Resolve the status-badge state for a Facebook format from two pure flags:
 *  - no field has input → neutral tone + "fits",
 *  - any field is clamped or truncated → warn tone + "truncated",
 *  - otherwise (input present, nothing truncated) → safe tone + "fits".
 * The label is always a non-empty key so badge state is conveyed by text and
 * tone, never tone alone (Req 9.1–9.5, 9.7).
 */
export function facebookBadgeState(anyInput: boolean, anyTruncated: boolean): BadgeState {
  if (!anyInput) return { toneKind: 'neutral', label: 'fits' };
  if (anyTruncated) return { toneKind: 'warn', label: 'truncated' };
  return { toneKind: 'safe', label: 'fits' };
}

/**
 * TikTok description: show the first 100 characters, then an unclickable
 * "... See more". (The "max 4 lines" rule is a render-time CSS clamp.)
 */
export function truncateTikTokPrimary(text: string): FieldTruncation {
  const { primaryTruncateChars, seeMoreLabel } = AD_PLATFORM_CONFIG.tiktok;
  if (charCount(text) <= primaryTruncateChars) return { text, truncated: false };
  return { text: sliceChars(text, 0, primaryTruncateChars) + seeMoreLabel, truncated: true };
}

/**
 * Hard-clamp a Google RSA field to its character cap (30 for headlines, 90 for
 * descriptions). Drives the live counters and the `maxLength` mirror.
 */
export function clampGoogleField(text: string, max: number): string {
  return charCount(text) <= max ? text : sliceChars(text, 0, max);
}

export interface ReelsFit extends FieldTruncation {
  /** True when the caption is below the comfortable 40-char floor. */
  tooShort: boolean;
}

/**
 * Instagram Reels caption: enforce the 40–72 character window. Over 72 is
 * truncated with an ellipsis; a non-empty caption under 40 is flagged
 * `tooShort` so the UI can warn without blocking.
 */
export function instagramReelsFit(text: string): ReelsFit {
  const { reelsMin, reelsMax } = AD_PLATFORM_CONFIG.instagram;
  const count = charCount(text);
  if (count <= reelsMax) {
    return { text, truncated: false, tooShort: count > 0 && count < reelsMin };
  }
  return { text: sliceChars(text, 0, reelsMax) + ELLIPSIS, truncated: true, tooShort: false };
}

export interface GoogleHeadlineFit {
  /** Headlines that fit within the container, in order. */
  visible: string[];
  /** Trailing headlines dropped because the combined width overflowed. */
  dropped: string[];
  /** True when at least one headline was dropped. */
  truncated: boolean;
}

/** Separator Google renders between RSA headlines in the SERP. */
export const GOOGLE_HEADLINE_SEPARATOR = ' | ';

/**
 * Decide which RSA headlines fit on one desktop line. Headlines are joined with
 * " | " and measured cumulatively; once the combined width breaches `maxPx`
 * (~600px desktop container), that headline and every trailing one are dropped.
 *
 * `measure` is injectable so the logic is testable without a DOM.
 */
export function googleHeadlineFits(
  headlines: string[],
  fontSpec: string,
  maxPx: number,
  measure: (text: string, fontSpec: string) => number = measureTextWidth,
): GoogleHeadlineFit {
  const visible: string[] = [];
  const dropped: string[] = [];
  for (let i = 0; i < headlines.length; i++) {
    const candidate = [...visible, headlines[i]].join(GOOGLE_HEADLINE_SEPARATOR);
    if (measure(candidate, fontSpec) <= maxPx) {
      visible.push(headlines[i]);
    } else {
      dropped.push(...headlines.slice(i));
      break;
    }
  }
  return { visible, dropped, truncated: dropped.length > 0 };
}

// ──────────────────────────────────────────────────────────────────────────
// Ad link-display helpers (additive — platform-link-display).
// These are NEW exports only; truncateFacebookPrimary / truncateTikTokPrimary /
// clampGoogleField / instagramReelsFit / googleHeadlineFits keep their
// signatures and results unchanged. All slicing is grapheme-safe via
// `sliceChars`, and link-display facts are read from `Link_Behavior_Config`.
// ──────────────────────────────────────────────────────────────────────────

/** Default Google RSA display-path segment count when the config omits a cap. */
const DEFAULT_MAX_PATH_SEGMENTS = 2;
/** Default Google RSA per-segment character cap when the config omits a cap. */
const DEFAULT_PATH_SEGMENT_MAX_CHARS = 15;

/**
 * Clamp an ad Display_Link to the platform's character cap, grapheme-safe.
 *
 * Behavior is driven entirely by the platform's `Link_Behavior_Config` ad
 * record:
 *  - No ad record, or `displayLinkMaxChars` undefined → no cap is applied and
 *    the text is returned unchanged (`truncated: false`).
 *  - `displayLinkMaxChars === 0` → the display link is disabled, returning
 *    `{ text: '', truncated: true }` (Requirement 12.2).
 *  - Otherwise the text is clamped to the cap with grapheme-safe slicing so
 *    emoji and combining marks are never split (Requirements 12.1, 12.3).
 */
export function clampDisplayLink(text: string, platform: string): FieldTruncation {
  const cap = adLinkBehavior(platform)?.displayLinkMaxChars;
  if (cap === undefined) return { text, truncated: false };
  if (cap === 0) return { text: '', truncated: true };
  if (charCount(text) <= cap) return { text, truncated: false };
  return { text: sliceChars(text, 0, cap), truncated: true };
}

/**
 * Derive the shown link text from a Destination_URL: the host/domain only, with
 * no scheme, path, or query (Requirement 9.3). A missing scheme is treated as
 * `https://` for parsing. On an unparseable URL the trimmed input is returned
 * unchanged rather than throwing, so the preview still renders.
 */
export function deriveDisplayLink(destinationUrl: string): string {
  const trimmed = destinationUrl.trim();
  try {
    const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withScheme).hostname;
  } catch {
    return trimmed;
  }
}

/**
 * Clamp Google RSA Display_Path segments: drop empty/whitespace-only segments,
 * keep at most `maxPathSegments` (default 2), and clamp each remaining segment
 * grapheme-safe to `pathSegmentMaxChars` (default 15). Returns the cleaned
 * array (Requirements 10.2, 10.3, 12.4).
 */
export function clampDisplayPath(segments: string[], platform: string): string[] {
  const ad = adLinkBehavior(platform);
  const maxSegments = ad?.maxPathSegments ?? DEFAULT_MAX_PATH_SEGMENTS;
  const segmentMax = ad?.pathSegmentMaxChars ?? DEFAULT_PATH_SEGMENT_MAX_CHARS;
  return segments
    .filter((segment) => segment.trim().length > 0)
    .slice(0, maxSegments)
    .map((segment) => (charCount(segment) <= segmentMax ? segment : sliceChars(segment, 0, segmentMax)));
}

/**
 * Build the green display URL: the destination domain followed by the clamped,
 * non-empty path segments joined with `/`. With no segments the domain alone is
 * returned (Requirements 10.1, 10.4).
 */
export function buildDisplayUrl(destinationUrl: string, segments: string[], platform: string): string {
  const domain = deriveDisplayLink(destinationUrl);
  const clamped = clampDisplayPath(segments, platform);
  return clamped.length ? `${domain}/${clamped.join('/')}` : domain;
}

/**
 * Resolve the CTA label for a platform. Returns `null` when the platform
 * declares no CTA button (or has no supported labels). When a `requested` label
 * is supplied and is a member of the platform's `ctaLabels`, it is returned;
 * otherwise the platform's first supported label is used (Requirement 9.4).
 */
export function resolveCta(platform: string, requested?: string): string | null {
  const ad = adLinkBehavior(platform);
  if (!ad?.hasCtaButton || !ad.ctaLabels || ad.ctaLabels.length === 0) return null;
  if (requested !== undefined && ad.ctaLabels.includes(requested)) return requested;
  return ad.ctaLabels[0];
}
