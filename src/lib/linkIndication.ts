/**
 * Pure link-indication selection (DOM-free).
 *
 * Maps a platform's stored Link_Behavior_Config `model` to a stable indication
 * key the islands render through i18n. The displayed fact is derived solely from
 * `LINK_BEHAVIOR` (via `organicLinkBehavior`), so what is shown always matches the
 * stored configuration (Requirement 15.3).
 *
 * This module performs NO DOM access and NO i18n resolution — it only decides
 * WHICH indication applies. Islands resolve the localized copy separately.
 */

import { organicLinkBehavior } from '../data/linkBehavior';
import { detectHashtags, detectUrls } from './textTools';

/** The indication key chosen for a counter body, or `'none'` when no URL applies. */
export type LinkIndication =
  | 'none'
  | 'plainText'
  | 'previewCard'
  | 'clickableInline'
  | 'countedShortened';

/**
 * Select the link-display indication for a platform counter body.
 *
 * - Returns `'none'` when the body contains no detected URL (Requirement 8.2).
 * - Otherwise returns the key mapped from the platform's organic `model`
 *   (Requirements 4.1, 5.1, 7.1, 8.1, 8.3).
 * - Returns `'none'` for any platform without an organic record so un-wired
 *   platforms degrade safely to today's behavior.
 */
export function selectLinkIndication(platform: string, text: string): LinkIndication {
  if (detectUrls(text).length === 0) return 'none';

  const behavior = organicLinkBehavior(platform);
  if (!behavior) return 'none';

  switch (behavior.model) {
    case 'plain-text':
      return 'plainText';
    case 'preview-card':
      return 'previewCard';
    case 'clickable-inline':
      return 'clickableInline';
    case 'counted-shortened':
      return 'countedShortened';
    default:
      return 'none';
  }
}

/** Boundary-aware `@mention` detector (e.g. `@user`, `foo @user.name`). */
const MENTION_RE = /(^|[^\w@])@[\w.]+/;

/**
 * Whether a TikTok in-feed ad caption carries no clickable link.
 *
 * Returns `true` when the caption contains a URL, an `@` mention, or a `#`
 * hashtag — in any of those cases the caption text is non-clickable and the
 * click is carried by the CTA button (Requirement 11.1).
 */
export function tiktokAdCaptionHasNoClickableLink(caption: string): boolean {
  return (
    detectUrls(caption).length > 0 ||
    MENTION_RE.test(caption) ||
    detectHashtags(caption).length > 0
  );
}
