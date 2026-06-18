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
