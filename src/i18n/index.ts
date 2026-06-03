import type { Translations } from './types';
import { en } from './en';
import { es } from './es';
import { de } from './de';
import { fr } from './fr';
import { pt } from './pt';
import { it } from './it';
import { nl } from './nl';
import { ja } from './ja';
import { zh } from './zh';
import { da } from './da';
import { DEFAULT_LOCALE } from './config';

// ──────────────────────────────────────────────────────────────────────────
// Dictionary registry. Maps every locale code to its translation dictionary
// and exposes a single lookup used by pages, layout, nav, footer, and islands.
// ──────────────────────────────────────────────────────────────────────────

const DICTIONARIES: Record<string, Translations> = {
  en,
  es,
  de,
  fr,
  pt,
  it,
  nl,
  ja,
  zh,
  da,
};

/**
 * Resolve a locale code to its dictionary, falling back to the default locale
 * for any unknown code so a bad URL renders English rather than crashing.
 */
export function getTranslations(lang: string): Translations {
  return DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export type { Translations } from './types';
export { interp } from './interp';
