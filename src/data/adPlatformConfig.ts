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
  safeZone: SafeZoneInsets;
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
  },
  instagram: {
    feedTruncateChars: 125,
    reelsMin: 40,
    reelsMax: 72,
    seeMoreLabel: '… more',
    safeZone: { bottomPct: 20, rightPct: 15 },
  },
  tiktok: {
    primaryTruncateChars: 100,
    maxLines: 4,
    seeMoreLabel: '... See more',
    safeZone: { topPct: 10, bottomPct: 20, rightPct: 15 },
  },
} as const satisfies AdPlatformConfig;

/** Platform keys, handy for switch maps and registry ids. */
export type AdPlatform = keyof typeof AD_PLATFORM_CONFIG;
