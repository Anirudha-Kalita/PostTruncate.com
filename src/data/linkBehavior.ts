/**
 * Link_Behavior_Config — the single source of truth for how each platform
 * displays and counts links, across both PostTruncate silos (organic counters
 * and ad-preview simulators).
 *
 * This is a PURE DATA module. Its only import is `LIMITS` from the limits leaf
 * module, used solely to source the X/Twitter fixed link weight so the two
 * values can never diverge. It does NOT import any engine behavior, and it does
 * NOT import `textTools` (the card extraction in `textTools` reads this config,
 * so the shared `LIMITS` constant lives in `./limits` to keep the graph acyclic).
 */

import { LIMITS } from '../lib/limits';

/** The four ways a platform renders a link in an organic post body. */
export type LinkDisplayModel =
  | 'counted-shortened' // X/Twitter t.co — fixed weight
  | 'plain-text' // Instagram, TikTok, YouTube Shorts — literal non-clickable text
  | 'preview-card' // Facebook, LinkedIn, Threads, Discord, WhatsApp, Bluesky — OG card
  | 'clickable-inline'; // Reddit, Pinterest — clickable inline, no mandatory card

/** How a platform counts the characters of a detected link. */
export type LinkCountMode =
  | 'fixed-weight' // each URL counts as `fixedLinkWeight` (X/Twitter)
  | 'per-char' // each character of the URL counts under standard weighting
  | 'per-byte'; // each UTF-8 byte counts (Bluesky)

/** Organic-post link behavior for one counter platform. */
export interface OrganicLinkBehavior {
  model: LinkDisplayModel;
  countMode: LinkCountMode;
  /** Present only when countMode === 'fixed-weight'. Mirrors LIMITS.URL_WEIGHT for X. */
  fixedLinkWeight?: number;
  /** True when the preview card is built from the FIRST detected URL only. */
  cardFromFirstUrlOnly?: boolean;
  /** True when link offsets must be computed as UTF-8 byte ranges (Bluesky facets). */
  byteIndexedFacets?: boolean;
  /** Max clickable bio links; omitted when the platform sets no documented limit. */
  bioLinkAllowance?: number;
}

/** Ad link-display behavior for one ad-preview platform. */
export interface AdLinkBehavior {
  /** Whether a Display_Link region is shown beneath the headline. */
  showsDisplayLink: boolean;
  /**
   * Character cap for the Display_Link. 0 disables the Display_Link entirely
   * (Requirement 12.2). Omitted when the platform shows no display link.
   */
  displayLinkMaxChars?: number;
  /** Whether the platform supports Display_Path segments (Google RSA). */
  supportsDisplayPath: boolean;
  /** Max number of path segments (Google RSA = 2). */
  maxPathSegments?: number;
  /** Per-segment character cap (Google RSA = 15). */
  pathSegmentMaxChars?: number;
  /** Whether a CTA_Button carries the click. */
  hasCtaButton: boolean;
  /** Supported CTA labels (English source; localized at render where needed). */
  ctaLabels?: string[];
  /** True when in-feed ad captions carry no clickable link (TikTok). */
  captionLinkClickable: boolean;
}

/** How a platform presents the card image. */
export type CardImageStyle =
  | 'large' // full-width banner at Card_Image_Ratio (Facebook, LinkedIn, Bluesky)
  | 'thumbnail' // small square/rounded thumbnail in a horizontal chip (Threads)
  | 'embed'; // image inside an embed body with a leading accent bar (Discord, WhatsApp)

/** Casing applied to the displayed Card_Domain. */
export type CardDomainCasing = 'uppercase' | 'lowercase' | 'as-is';

/** Where the Card_Domain sits relative to the title within the card panel. */
export type CardDomainPlacement =
  | 'above-title' // domain header line above the title (Facebook)
  | 'below-title' // domain footer line under the title (LinkedIn, Threads, Bluesky, WhatsApp)
  | 'site-name'; // domain shown as the embed "site name" (Discord)

/**
 * Per-preview-card-platform visual link-card facts. The single source of truth
 * for how each platform's Rich_Link_Card looks; the renderer reads these values
 * rather than hard-coding them (Requirement 6.2).
 */
export interface CardLayoutProfile {
  /** Large-image aspect ratio as "w:h" (Open Graph large = "1.91:1"). */
  imageRatio: string;
  /** Image presentation style for this platform. */
  imageStyle: CardImageStyle;
  /** Card_Title truncation length in grapheme clusters. */
  titleMaxChars: number;
  /** Card_Description truncation length; 0 omits the description region (Requirement 7.5). */
  descriptionMaxChars: number;
  /** Casing applied to the displayed Card_Domain (Facebook = uppercase). */
  domainCasing: CardDomainCasing;
  /** Placement of the Card_Domain within the card. */
  domainPlacement: CardDomainPlacement;
  /** True when the raw URL text is dropped from the post body once the card renders. */
  removesRawUrl: boolean;
  /** ISO YYYY-MM-DD date the layout facts were last reviewed (Requirement 6.4). */
  lastReviewed: string;
}

/** One platform's complete link-display record. */
export interface LinkBehaviorRecord {
  /** Stable platform id, shared across both silos. */
  platform: string;
  /** Organic-post behavior. Present for every counter platform. */
  organic?: OrganicLinkBehavior;
  /** Ad behavior. Present for every ad-preview platform. */
  ad?: AdLinkBehavior;
  /**
   * Per-platform Rich_Link_Card visual facts. Present only for the six
   * preview-card platforms (Requirement 6.1, 14.2, 16.3).
   */
  cardLayout?: CardLayoutProfile;
  /** ISO YYYY-MM-DD date the rule was last reviewed (Requirement 15.1). */
  lastReviewed: string;
  /** Optional source note/URL for verifiability (Requirement 15). */
  source?: string;
}

/**
 * Standard Meta (Facebook/Instagram) call-to-action button labels. The click on
 * Meta feed ads is carried by this CTA button, not by a link in the primary text.
 */
const META_CTA_LABELS = [
  'Shop Now',
  'Learn More',
  'Sign Up',
  'Download',
  'Book Now',
  'Contact Us',
  'Subscribe',
  'Get Offer',
  'Apply Now',
  'Send Message',
];

/** TikTok in-feed ad call-to-action button labels. */
const TIKTOK_CTA_LABELS = [
  'Shop Now',
  'Learn More',
  'Download',
  'Sign Up',
  'Order Now',
  'Book Now',
  'Contact Us',
  'Watch Now',
];

/**
 * Authoritative per-platform link-display records. Updating a platform's
 * link behavior is a single edit here (Requirement 15.2).
 */
export const LINK_BEHAVIOR: Record<string, LinkBehaviorRecord> = {
  twitter: {
    platform: 'twitter',
    organic: {
      model: 'counted-shortened',
      countMode: 'fixed-weight',
      // Sourced from the engine constant so the 23-char rule never diverges.
      fixedLinkWeight: LIMITS.URL_WEIGHT,
    },
    lastReviewed: '2026-06-18',
    source: 'X/Twitter t.co wraps every URL to a fixed 23-character weight regardless of real length.',
  },

  linkedin: {
    platform: 'linkedin',
    organic: {
      model: 'preview-card',
      countMode: 'per-char',
      cardFromFirstUrlOnly: true,
    },
    cardLayout: {
      imageRatio: '1.91:1',
      imageStyle: 'large',
      titleMaxChars: 120,
      descriptionMaxChars: 0,
      domainCasing: 'lowercase',
      domainPlacement: 'below-title',
      // LinkedIn keeps the pasted URL in the body as blue clickable text by
      // default; removing it is a manual, optional step (2026-06-22 review).
      removesRawUrl: false,
      lastReviewed: '2026-06-22',
    },
    lastReviewed: '2026-06-22',
    source: 'LinkedIn builds an Open Graph preview card from the first detected URL and keeps the raw URL inline as blue clickable text by default; link text counts per character.',
  },

  instagram: {
    platform: 'instagram',
    organic: {
      model: 'plain-text',
      countMode: 'per-char',
      bioLinkAllowance: 5,
    },
    ad: {
      showsDisplayLink: true,
      displayLinkMaxChars: 30,
      supportsDisplayPath: false,
      hasCtaButton: true,
      ctaLabels: META_CTA_LABELS,
      // Meta feed ad primary text/caption links are not clickable; the CTA carries the click.
      captionLinkClickable: false,
    },
    lastReviewed: '2026-06-18',
    source:
      'Instagram caption/comment URLs render as non-clickable plain text; up to 5 clickable links allowed in the bio. Meta ads expose a display link + CTA button.',
  },

  facebook: {
    platform: 'facebook',
    organic: {
      model: 'preview-card',
      countMode: 'per-char',
      cardFromFirstUrlOnly: true,
    },
    cardLayout: {
      imageRatio: '1.91:1',
      imageStyle: 'large',
      titleMaxChars: 80,
      descriptionMaxChars: 200,
      domainCasing: 'uppercase',
      domainPlacement: 'above-title',
      // Facebook keeps the pasted URL in the body as blue clickable text by
      // default; deleting it (preview stays) is a manual step (2026-06-22 review).
      removesRawUrl: false,
      lastReviewed: '2026-06-22',
    },
    ad: {
      showsDisplayLink: true,
      displayLinkMaxChars: 30,
      supportsDisplayPath: false,
      hasCtaButton: true,
      ctaLabels: META_CTA_LABELS,
      captionLinkClickable: false,
    },
    lastReviewed: '2026-06-22',
    source:
      'Facebook builds an Open Graph preview card from the first detected URL and keeps the raw URL inline as blue clickable text by default. Meta ads expose a display link distinct from the destination plus a CTA button.',
  },

  tiktok: {
    platform: 'tiktok',
    organic: {
      model: 'plain-text',
      countMode: 'per-char',
      bioLinkAllowance: 1,
    },
    ad: {
      showsDisplayLink: false,
      supportsDisplayPath: false,
      hasCtaButton: true,
      ctaLabels: TIKTOK_CTA_LABELS,
      // TikTok in-feed ad captions carry no clickable link; the CTA button carries the click.
      captionLinkClickable: false,
    },
    lastReviewed: '2026-06-18',
    source:
      'TikTok caption/description URLs render as non-clickable plain text; 1 clickable bio link (eligibility-gated). In-feed ads route the click through the CTA button.',
  },

  threads: {
    platform: 'threads',
    organic: {
      model: 'preview-card',
      countMode: 'per-char',
      cardFromFirstUrlOnly: true,
      bioLinkAllowance: 5,
    },
    cardLayout: {
      imageRatio: '1.91:1',
      // Threads renders a large landscape banner (~1.91:1, OG source 1200x628)
      // with the title + domain below — NOT a small square thumbnail chip
      // (verified against Threads' live link-card rendering, 2026 review).
      imageStyle: 'large',
      titleMaxChars: 70,
      descriptionMaxChars: 0,
      domainCasing: 'lowercase',
      domainPlacement: 'below-title',
      // Threads keeps the pasted URL inline as blue clickable text; recent iOS
      // builds even require it to stay for the card to render (2026-06-22 review).
      removesRawUrl: false,
      lastReviewed: '2026-06-22',
    },
    lastReviewed: '2026-06-22',
    source: 'Threads (by Meta) builds a preview card from the first detected URL and keeps the raw URL inline as blue clickable text (iOS now requires it to stay); counts links in full; up to 5 bio links.',
  },

  youtube: {
    platform: 'youtube',
    organic: {
      model: 'plain-text',
      countMode: 'per-char',
    },
    lastReviewed: '2026-06-18',
    source: 'YouTube Shorts descriptions/comments render URLs as plain text; counted per character.',
  },

  pinterest: {
    platform: 'pinterest',
    organic: {
      model: 'clickable-inline',
      countMode: 'per-char',
    },
    lastReviewed: '2026-06-18',
    source: 'Pinterest destination URL stays clickable inline with no mandatory rich card; counted per character.',
  },

  reddit: {
    platform: 'reddit',
    organic: {
      model: 'clickable-inline',
      countMode: 'per-char',
    },
    lastReviewed: '2026-06-18',
    source: 'Reddit markdown links remain clickable inline with no mandatory preview card; counted per character.',
  },

  bluesky: {
    platform: 'bluesky',
    organic: {
      model: 'preview-card',
      countMode: 'per-byte',
      cardFromFirstUrlOnly: true,
      byteIndexedFacets: true,
    },
    cardLayout: {
      imageRatio: '1.91:1',
      imageStyle: 'large',
      titleMaxChars: 100,
      descriptionMaxChars: 200,
      domainCasing: 'lowercase',
      domainPlacement: 'below-title',
      removesRawUrl: true,
      lastReviewed: '2026-06-18',
    },
    lastReviewed: '2026-06-18',
    source:
      'Bluesky counts the 300-unit limit by UTF-8 bytes and marks external links with byte-indexed facets (byteStart/byteEnd); the preview card is built from the first URL.',
  },

  discord: {
    platform: 'discord',
    organic: {
      model: 'preview-card',
      countMode: 'per-char',
    },
    cardLayout: {
      imageRatio: '1.91:1',
      imageStyle: 'embed',
      titleMaxChars: 100,
      descriptionMaxChars: 350,
      domainCasing: 'lowercase',
      domainPlacement: 'site-name',
      removesRawUrl: false,
      lastReviewed: '2026-06-18',
    },
    lastReviewed: '2026-06-18',
    source: 'Discord renders an embed preview card for URLs; message text counts per character.',
  },

  whatsapp: {
    platform: 'whatsapp',
    organic: {
      model: 'preview-card',
      countMode: 'per-char',
    },
    cardLayout: {
      imageRatio: '1.91:1',
      imageStyle: 'embed',
      titleMaxChars: 70,
      descriptionMaxChars: 140,
      domainCasing: 'lowercase',
      domainPlacement: 'below-title',
      removesRawUrl: false,
      lastReviewed: '2026-06-18',
    },
    lastReviewed: '2026-06-18',
    source: 'WhatsApp renders a link preview card for the first URL; text counts per character.',
  },

  google: {
    platform: 'google',
    ad: {
      showsDisplayLink: false,
      supportsDisplayPath: true,
      maxPathSegments: 2,
      pathSegmentMaxChars: 15,
      hasCtaButton: false,
      captionLinkClickable: false,
    },
    lastReviewed: '2026-06-18',
    source:
      'Google Responsive Search Ads build the green display URL from the final-URL domain plus up to two optional display-path segments (15 characters each).',
  },
};

/**
 * Result of checking that every counter/ad platform has a matching
 * Link_Behavior_Config record (Requirement 1.6).
 */
export interface CoverageResult {
  /** True iff both missing lists are empty. */
  ok: boolean;
  /** Counter platform ids lacking an `organic` record. */
  missingOrganic: string[];
  /** Ad platform ids lacking an `ad` record. */
  missingAd: string[];
}

/**
 * Verify every Platform_Counter and Ad_Preview_Simulator platform has a matching
 * Link_Behavior_Config record. Pure: takes the platform id lists as arguments so
 * it is unit-testable and can be called from a build/test guard (Requirement 1.6).
 *
 * A counter platform must have an `organic` record; an ad platform must have an
 * `ad` record. The offending ids are reported so a failing test can name them.
 */
export function validateLinkBehaviorCoverage(
  counterPlatforms: string[],
  adPlatforms: string[],
): CoverageResult {
  const missingOrganic = counterPlatforms.filter((platform) => !LINK_BEHAVIOR[platform]?.organic);
  const missingAd = adPlatforms.filter((platform) => !LINK_BEHAVIOR[platform]?.ad);
  return {
    ok: missingOrganic.length === 0 && missingAd.length === 0,
    missingOrganic,
    missingAd,
  };
}

/**
 * Look up a platform's organic link behavior. Returns `undefined` for
 * unconfigured platform ids so callers can degrade to default behavior
 * without throwing.
 */
export function organicLinkBehavior(platform: string): OrganicLinkBehavior | undefined {
  return LINK_BEHAVIOR[platform]?.organic;
}

/**
 * Look up a platform's ad link behavior. Returns `undefined` for unconfigured
 * platform ids.
 */
export function adLinkBehavior(platform: string): AdLinkBehavior | undefined {
  return LINK_BEHAVIOR[platform]?.ad;
}

/**
 * Result of checking that every preview-card platform has a matching
 * Card_Layout_Profile (Requirement 6.3).
 */
export interface CardLayoutCoverageResult {
  /** True iff `missingCardLayout` is empty. */
  ok: boolean;
  /** Preview-card platform ids missing a `cardLayout` record. */
  missingCardLayout: string[];
}

/**
 * Verify every preview-card platform has a Card_Layout_Profile (Requirement 6.3).
 * Pure: the canonical preview-card id list is passed in so it is unit-testable
 * and callable from a build/test guard. The offending ids are reported so a
 * failing test can name them.
 */
export function validateCardLayoutCoverage(previewCardPlatforms: string[]): CardLayoutCoverageResult {
  const missingCardLayout = previewCardPlatforms.filter((platform) => !LINK_BEHAVIOR[platform]?.cardLayout);
  return {
    ok: missingCardLayout.length === 0,
    missingCardLayout,
  };
}

/**
 * Look up a platform's Card_Layout_Profile. Returns `undefined` when the
 * platform is not a configured preview-card platform.
 */
export function cardLayout(platform: string): CardLayoutProfile | undefined {
  return LINK_BEHAVIOR[platform]?.cardLayout;
}
