// ──────────────────────────────────────────────────────────────────────────
// FAQ registry — the single source of truth for FAQ structure.
//
// The Q&A *text* lives in the i18n dictionaries (t.faq.items — en.ts is
// canonical, every locale translates the same items in the same order). This
// module layers the locale-independent metadata on top: a stable id per
// question, its category on the /faq page, and whether it appears in the
// curated homepage subset.
//
// Both the homepage FAQ section and /[lang]/faq/ resolve their items through
// getFaqItems()/getFeaturedFaqs(), so the two surfaces can never drift.
//
// Invariant: FAQ_INDEX is positionally parallel to t.faq.items in every
// locale file. getFaqItems() throws at build time if the lengths diverge.
// ──────────────────────────────────────────────────────────────────────────

import type { FaqEntry, Translations } from '../i18n/types';

/** Category ids — labels come from t.faqPage.categories. */
export type FaqCategoryId = 'about' | 'counting' | 'cleanup' | 'insights' | 'privacy' | 'sms';

/** Render order of category groups on /faq. */
export const FAQ_CATEGORY_ORDER: FaqCategoryId[] = [
  'about',
  'counting',
  'cleanup',
  'insights',
  'privacy',
  'sms',
];

export interface FaqMeta {
  /** Stable id — used as the accordion anchor on /faq. Never change after publish. */
  id: string;
  category: FaqCategoryId;
  /** Included in the curated ~8-question homepage subset. */
  featuredOnHome?: boolean;
}

/** Positionally parallel to t.faq.items (same order in every locale file). */
export const FAQ_INDEX: FaqMeta[] = [
  { id: 'what-is-truncation', category: 'about', featuredOnHome: true },
  { id: 'why-platforms-truncate', category: 'about', featuredOnHome: true },
  { id: 'supported-platforms', category: 'about', featuredOnHome: true },
  { id: 'limit-accuracy', category: 'about', featuredOnHome: true },
  { id: 'spaces-and-punctuation', category: 'counting' },
  { id: 'emoji-counting', category: 'counting', featuredOnHome: true },
  { id: 'characters-vs-words', category: 'counting' },
  { id: 'links-23-characters', category: 'counting' },
  { id: 'fancy-fonts', category: 'cleanup' },
  { id: 'sanitize-text', category: 'cleanup' },
  { id: 'keyword-density', category: 'insights' },
  { id: 'reading-speaking-timers', category: 'insights' },
  { id: 'social-sanitizer', category: 'cleanup' },
  { id: 'text-stays-local', category: 'privacy', featuredOnHome: true },
  { id: 'session-autosave', category: 'privacy' },
  { id: 'is-it-free', category: 'about', featuredOnHome: true },
  { id: 'sms-segmentation', category: 'sms', featuredOnHome: true },
  { id: 'sms-special-characters', category: 'sms' },
];

export interface FaqItem extends FaqEntry, FaqMeta {}

/** Zip a locale's translated Q&As with the shared metadata registry. */
export function getFaqItems(t: Translations): FaqItem[] {
  if (t.faq.items.length !== FAQ_INDEX.length) {
    throw new Error(
      `FAQ_INDEX (${FAQ_INDEX.length}) and t.faq.items (${t.faq.items.length}) are out of sync — ` +
        'every locale must translate the same questions in the same order as en.ts.',
    );
  }
  return t.faq.items.map((entry, i) => ({ ...entry, ...FAQ_INDEX[i] }));
}

/** The curated homepage subset, in canonical order. */
export function getFeaturedFaqs(t: Translations): FaqItem[] {
  return getFaqItems(t).filter((item) => item.featuredOnHome);
}

/** Items grouped for the /faq page, in FAQ_CATEGORY_ORDER. */
export function getFaqsByCategory(t: Translations): { category: FaqCategoryId; items: FaqItem[] }[] {
  const all = getFaqItems(t);
  return FAQ_CATEGORY_ORDER.map((category) => ({
    category,
    items: all.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);
}
