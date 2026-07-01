// ──────────────────────────────────────────────────────────────────────────
// English fallback UI copy for the Ad Previews & Simulators islands.
//
// All ten locale dictionaries now carry a fully-translated `adPreviews`
// sub-object (chrome + CTA preset labels), so the islands read the localized
// copy via `adPreviewStrings(s)` → `s.adPreviews`. This constant remains the
// English default the getter falls back to if a locale ever omits the override,
// and it must satisfy the full `AdPreviewStrings` shape so the type stays honest.
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
    cardHeadline: 'Your card headline',
    cardDescription: 'Add a short description',
  },
  counter: '{n} / {limit}',
  over: '{n} over',
  previewLabel: 'Live preview',
  editorLabel: 'Compose your ad',
  deviceAria: 'Choose preview device',
  mobile: 'Mobile',
  desktop: 'Desktop',
  modeAria: 'Choose placement',
  feed: 'Feed',
  reels: 'Reels',
  formatAria: 'Choose ad format',
  formatFeed: 'Feed',
  formatReels: 'Reels',
  formatCarousel: 'Carousel',
  carouselAddCard: 'Add card',
  carouselRemoveCard: 'Remove card',
  carouselMaxReached: 'Maximum of {max} cards reached',
  carouselMinReached: 'Minimum of {min} cards required',
  carouselPrev: 'Previous card',
  carouselNext: 'Next card',
  carouselPosition: '{current} / {total}',
  cardN: 'Card {n}',
  cardHeadline: 'Card headline',
  cardDescription: 'Card description',
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
  promoted: 'Promoted',
  googleAdLabel: 'Sponsored',
  finalUrl: 'Final URL',
  pathN: 'Path {n}',
  displayLink: 'Display link / Destination URL',
  callToAction: 'Call to action',
  adLabel: 'Ad',
  fbHeadlineSqueezed: 'Headline over {limit} characters on mobile — the link description is hidden.',
  googleHeadlinesDropped: {
    one: '{n} headline dropped — combined width exceeds the {px}px desktop ad slot.',
    other: '{n} headlines dropped — combined width exceeds the {px}px desktop ad slot.',
  },
  cta: {
    'Shop Now': 'Shop Now',
    'Learn More': 'Learn More',
    'Sign Up': 'Sign Up',
    'Download': 'Download',
    'Book Now': 'Book Now',
    'Contact Us': 'Contact Us',
    'Subscribe': 'Subscribe',
    'Get Offer': 'Get Offer',
    'Apply Now': 'Apply Now',
    'Send Message': 'Send Message',
    'Order Now': 'Order Now',
    'Watch Now': 'Watch Now',
    'Apply': 'Apply',
    'Register': 'Register',
    'Join': 'Join',
    'Attend': 'Attend',
    'Request Demo': 'Request Demo',
    'View Quote': 'View Quote',
  },
};

/**
 * Resolve the ad-preview strings for an island: prefer the locale's own
 * `adPreviews` override, fall back to the English defaults. Mirrors how the
 * optional `imageUpload` strings are consumed.
 */
export function adPreviewStrings(s: IslandStrings): AdPreviewStrings {
  return s.adPreviews ?? AD_PREVIEW_STRINGS;
}
