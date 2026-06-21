/**
 * Platform truncation/limit constants — a dependency-free leaf module.
 *
 * `LIMITS` lives here (rather than in `textTools.ts`) so that both the text
 * engine and `src/data/linkBehavior.ts` can read it without forming a runtime
 * import cycle: `linkBehavior` reads `LIMITS` at module-init time, and the text
 * engine now also reads `linkBehavior` (for the rich-link-card extraction), so a
 * shared leaf keeps the dependency graph acyclic. `textTools.ts` re-exports
 * `LIMITS`, so every existing `import { LIMITS } from './textTools'` keeps
 * working unchanged.
 */

/** Platform truncation/limit constants. */
export const LIMITS = {
  LINKEDIN_DESKTOP: 210,
  LINKEDIN_MOBILE: 140,
  /** LinkedIn's published hard cap for a standard feed post. */
  LINKEDIN_POST: 3000,
  TWEET: 280,
  /** Threads (by Meta) per-post character ceiling; longer copy chains as replies. */
  THREADS: 500,
  /** t.co wraps every URL to a fixed weight regardless of real length. */
  URL_WEIGHT: 23,
  /**
   * Recommended hashtag count for an Instagram post or reel. Going past this
   * doesn't block publishing — it's a best-practice nudge (more reads as spam).
   */
  INSTAGRAM_HASHTAGS_RECOMMENDED: 5,
  /**
   * Instagram's hard hashtag cap (caption + first comment combined). Past this
   * the post fails to publish or the hashtags are stripped.
   */
  INSTAGRAM_HASHTAGS_MAX: 30,
  /** Instagram's published caption character cap. */
  INSTAGRAM_CAPTION: 2200,
  /** Facebook's published hard cap for a feed post. */
  FACEBOOK_POST: 63206,
  /**
   * TikTok caption hard cap when posting natively in the app (emojis and
   * hashtags count). Exceeding this blocks publishing.
   */
  TIKTOK_CAPTION_MAX: 4000,
  /**
   * "Safe" TikTok caption ceiling: the TikTok API and third-party schedulers
   * (Buffer, Hootsuite, Later) still cap captions here, so staying under it
   * guarantees the text survives regardless of how the video is published.
   */
  TIKTOK_CAPTION_SAFE: 2200,
  /** TikTok organic caption "…more" fold (≈1 line). */
  TIKTOK_FOLD: 100,
} as const;
