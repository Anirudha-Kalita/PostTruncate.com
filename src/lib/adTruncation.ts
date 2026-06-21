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
