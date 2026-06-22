// ──────────────────────────────────────────────────────────────────────────
// Field/limit config for the platform character-counter tools (YouTube,
// TikTok, Pinterest, Reddit, Bluesky, Discord, WhatsApp). One config-driven
// island (PlatformCounter.tsx) renders all of them; each platform is also a
// calculators.ts entry keyed by the same id.
//
// `brand` is the untranslated platform name shown in the card header. Each
// field's `key` maps to a localized label in island.calculators.platformCounter
// .fields; `limit` is the platform's character cap for that field.
// ──────────────────────────────────────────────────────────────────────────

export type CounterFieldKey =
  | 'title'
  | 'description'
  | 'caption'
  | 'bio'
  | 'post'
  | 'message'
  | 'status'
  | 'about';

/**
 * How links behave in ONE specific counter field. The platform-level
 * Link_Behavior_Config `model` describes the platform's primary/body field; a
 * field whose link behavior differs (a profile bio, a title, a non-autolinking
 * description) carries an explicit override here so its guidance line matches
 * what actually happens when a URL is typed into THAT box.
 *
 *  - 'plain-text'       URL shows as literal, non-clickable text (titles,
 *                       Pinterest title/description, WhatsApp About).
 *  - 'clickable-inline' URL stays a clickable inline link (YouTube description).
 *  - 'preview-card'     URL generates an Open Graph preview card.
 *  - 'bio'              Profile field: show ONLY the bio-link-allowance line
 *                       (the bio link is clickable; the count is platform-set).
 *
 * Omit `link` to inherit the platform's organic `model` unchanged.
 */
export type FieldLinkBehavior =
  | 'plain-text'
  | 'clickable-inline'
  | 'preview-card'
  | 'bio';

export interface CounterField {
  key: CounterFieldKey;
  limit: number;
  /** Per-field link-behavior override; omit to inherit the platform model. */
  link?: FieldLinkBehavior;
}

export interface PlatformCounterConfig {
  /** Untranslated platform/brand name for the card header. */
  brand: string;
  fields: CounterField[];
}

export const PLATFORM_COUNTERS: Record<string, PlatformCounterConfig> = {
  youtube: {
    brand: 'YouTube',
    fields: [
      // Titles never autolink → plain text (inherits the platform model).
      { key: 'title', limit: 100 },
      // Standard YouTube video descriptions DO render URLs as clickable links
      // (only Shorts descriptions/comments are non-clickable plain text).
      { key: 'description', limit: 5000, link: 'clickable-inline' },
    ],
  },
  tiktok: {
    brand: 'TikTok',
    fields: [
      // Caption URLs render as non-clickable plain text (inherits the model).
      { key: 'caption', limit: 4000 },
      // The bio link IS clickable (1 allowed) — show only the allowance line.
      { key: 'bio', limit: 80, link: 'bio' },
    ],
  },
  pinterest: {
    brand: 'Pinterest',
    fields: [
      // URLs typed into a pin title/description are display-only and NOT
      // clickable; only the pin's separate destination ("Visit site") clicks.
      { key: 'title', limit: 100, link: 'plain-text' },
      { key: 'description', limit: 500, link: 'plain-text' },
    ],
  },
  reddit: {
    brand: 'Reddit',
    fields: [
      // URLs in a Reddit post title are NOT clickable — they show as plain text.
      { key: 'title', limit: 300, link: 'plain-text' },
      // Post body autolinks/markdown links stay clickable inline (inherits).
      { key: 'post', limit: 40000 },
    ],
  },
  bluesky: {
    brand: 'Bluesky',
    fields: [{ key: 'post', limit: 300 }],
  },
  discord: {
    brand: 'Discord',
    fields: [{ key: 'message', limit: 2000 }],
  },
  whatsapp: {
    brand: 'WhatsApp',
    fields: [
      // A link in a text status renders a preview card (inherits the model).
      { key: 'status', limit: 700 },
      // The "About" tagline is plain text — links there aren't clickable and
      // generate no preview card.
      { key: 'about', limit: 139, link: 'plain-text' },
    ],
  },
};
