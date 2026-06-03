// ──────────────────────────────────────────────────────────────────────────
// Locale registry — the single source of truth for which languages exist.
// Imported by astro.config.mjs (to build i18n routes) and by the UI (the
// language switcher, <html lang>, hreflang alternates, og:locale).
// ──────────────────────────────────────────────────────────────────────────

export interface LocaleMeta {
  /** Route + hreflang code (e.g. "en" → /en, hreflang="en"). */
  code: string;
  /** Endonym shown in the language switcher (the language's own name). */
  label: string;
  /** OpenGraph locale (language_TERRITORY). */
  ogLocale: string;
  /** Writing direction. All current locales are LTR. */
  dir: 'ltr' | 'rtl';
}

// Order here is the order rendered in the switcher. English first (default).
export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', ogLocale: 'en_US', dir: 'ltr' },
  { code: 'es', label: 'Español', ogLocale: 'es_ES', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', ogLocale: 'de_DE', dir: 'ltr' },
  { code: 'fr', label: 'Français', ogLocale: 'fr_FR', dir: 'ltr' },
  { code: 'pt', label: 'Português', ogLocale: 'pt_PT', dir: 'ltr' },
  { code: 'it', label: 'Italiano', ogLocale: 'it_IT', dir: 'ltr' },
  { code: 'nl', label: 'Nederlands', ogLocale: 'nl_NL', dir: 'ltr' },
  { code: 'ja', label: '日本語', ogLocale: 'ja_JP', dir: 'ltr' },
  { code: 'zh', label: '中文', ogLocale: 'zh_CN', dir: 'ltr' },
  { code: 'da', label: 'Dansk', ogLocale: 'da_DK', dir: 'ltr' },
];

export const DEFAULT_LOCALE = 'en';

/** Bare locale codes — handy for Astro's i18n config and getStaticPaths. */
export const LOCALE_CODES = LOCALES.map((l) => l.code);

export type LocaleCode = (typeof LOCALES)[number]['code'];

const BY_CODE = new Map(LOCALES.map((l) => [l.code, l]));

/** Look up a locale's metadata, falling back to the default locale. */
export function getLocale(code: string): LocaleMeta {
  return BY_CODE.get(code) ?? BY_CODE.get(DEFAULT_LOCALE)!;
}

/** True when `code` is one of our supported locales. */
export function isLocale(code: string | undefined): code is LocaleCode {
  return !!code && BY_CODE.has(code);
}
