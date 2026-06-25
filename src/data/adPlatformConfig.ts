// ──────────────────────────────────────────────────────────────────────────
// Ad platform truncation + safe-zone config — the single source of truth.
//
// Every threshold the Ad Previews simulators and their unit tests rely on
// lives here, so islands stay thin and the boundaries can never drift between
// the rendered preview and the tests that guard them.
//
// Sources: published platform ad specs (character caps, "See More" cutoffs,
// vertical-video safe zones). Pixel values are for the desktop SERP container.
// ──────────────────────────────────────────────────────────────────────────

/** Translucent overlay region expressed as a percentage of the creative. */
export interface SafeZoneInsets {
  /** Blocked band along the top edge, as a % of height. */
  topPct?: number;
  /** Blocked band along the bottom edge, as a % of height. */
  bottomPct?: number;
  /** Blocked band along the right edge, as a % of width. */
  rightPct?: number;
  /** Blocked band along the left edge, as a % of width. */
  leftPct?: number;
}

export interface GooglePlatformConfig {
  /** Per-headline character cap (Google RSA). */
  headlineMax: number;
  /** Per-description character cap. */
  descriptionMax: number;
  /** Desktop SERP ad container width, in CSS px, used for pixel truncation. */
  desktopContainerPx: number;
  font: { headlinePx: number; descPx: number };
}

export interface FacebookPlatformConfig {
  /** Primary text characters shown before the "… See More" cutoff. */
  primaryTruncateChars: number;
  /** Headline length (chars) below which it always shows on mobile. */
  headlineSafeMin: number;
  /** Headline length (chars) above which mobile layout squeezes it. */
  headlineSafeMax: number;
  /** Link description character cap. */
  descriptionMax: number;
  seeMoreLabel: string;
  /** Facebook Reels safe zone — same 9:16 UI as Instagram Reels (top tabs ~14%,
   *  bottom caption/audio/CTA band ~35%, right action stack ~15%). */
  reelsSafeZone: SafeZoneInsets;
}

export interface InstagramPlatformConfig {
  /** Feed caption characters shown before the "… more" cutoff. */
  feedTruncateChars: number;
  /** Reels caption lower comfortable bound (chars). */
  reelsMin: number;
  /** Reels caption hard ceiling (chars). */
  reelsMax: number;
  /** Feed caption "… more" affordance label. */
  seeMoreLabel: string;
  /** Organic Reels safe zone (bottom caption band + right action stack). */
  safeZone: SafeZoneInsets;
  /** Reels AD safe zone — larger: the Sponsored label + CTA push the bottom band
   *  to ~35% and add a ~14% top band, on top of the ~15% right action stack. */
  safeZoneAd: SafeZoneInsets;
}

export interface TikTokPlatformConfig {
  /** Description characters shown before the "... See more" cutoff. */
  primaryTruncateChars: number;
  /** Render-time line clamp (CSS -webkit-line-clamp). */
  maxLines: number;
  seeMoreLabel: string;
  safeZone: SafeZoneInsets;
}

export interface AdPlatformConfig {
  google: GooglePlatformConfig;
  facebook: FacebookPlatformConfig;
  instagram: InstagramPlatformConfig;
  tiktok: TikTokPlatformConfig;
}

export const AD_PLATFORM_CONFIG = {
  google: {
    headlineMax: 30,
    descriptionMax: 90,
    desktopContainerPx: 600,
    font: { headlinePx: 20, descPx: 14 },
  },
  facebook: {
    primaryTruncateChars: 125,
    headlineSafeMin: 27,
    headlineSafeMax: 40,
    descriptionMax: 30,
    seeMoreLabel: '… See More',
    reelsSafeZone: { topPct: 14, bottomPct: 35, rightPct: 15 },
  },
  instagram: {
    feedTruncateChars: 125,
    reelsMin: 40,
    // The Reels tab collapses captions more aggressively than the feed: only the
    // first ~55–60 characters show before "… more" (verified 2026 against the
    // live Reels player). The feed keeps the standard 125-char cutoff above.
    reelsMax: 60,
    seeMoreLabel: '… more',
    safeZone: { bottomPct: 20, rightPct: 15 },
    safeZoneAd: { topPct: 14, bottomPct: 35, rightPct: 15 },
  },
  tiktok: {
    primaryTruncateChars: 100,
    maxLines: 4,
    seeMoreLabel: '... See more',
    // 2026 in-feed AD safe zone: top tabs ~108–130px (~7%), right action rail
    // ~120px (~11%), and a bottom band ~440px for the username/caption/CTA/music
    // (~23%, deeper than organic because the CTA button adds dead space).
    safeZone: { topPct: 7, bottomPct: 23, rightPct: 11 },
  },
} as const satisfies AdPlatformConfig;

/** Platform keys, handy for switch maps and registry ids. */
export type AdPlatform = keyof typeof AD_PLATFORM_CONFIG;
