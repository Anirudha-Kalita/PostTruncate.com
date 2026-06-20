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

export interface CounterField {
  key: CounterFieldKey;
  limit: number;
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
      { key: 'title', limit: 100 },
      { key: 'description', limit: 5000 },
    ],
  },
  tiktok: {
    brand: 'TikTok',
    fields: [
      { key: 'caption', limit: 4000 },
      { key: 'bio', limit: 80 },
    ],
  },
  pinterest: {
    brand: 'Pinterest',
    fields: [
      { key: 'title', limit: 100 },
      { key: 'description', limit: 500 },
    ],
  },
  reddit: {
    brand: 'Reddit',
    fields: [
      { key: 'title', limit: 300 },
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
      { key: 'status', limit: 700 },
      { key: 'about', limit: 139 },
    ],
  },
};
