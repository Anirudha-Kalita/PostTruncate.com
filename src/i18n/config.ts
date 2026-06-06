// ──────────────────────────────────────────────────────────────────────────
// Locale registry — the single source of truth for which languages exist.
// Imported by astro.config.mjs (to build i18n routes) and by the UI (the
// language switcher, <html lang>, hreflang alternates, og:locale).
// ──────────────────────────────────────────────────────────────────────────

export interface LocaleMeta {
  /** Route + hreflang code (e.g. "en" → /en, hreflang="en"). */
  code: string;
  /** Country flag icon shown beside the language name in the switcher. */
  flagSrc: string;
  /** Endonym shown in the language switcher (the language's own name). */
  label: string;
  /** OpenGraph locale (language_TERRITORY). */
  ogLocale: string;
  /** Writing direction. All current locales are LTR. */
  dir: 'ltr' | 'rtl';
  /** Keyword-rich homepage slug (e.g. "character-counter" → /en/character-counter/). */
  slug: string;
  /** Localized tool name used in WebApplication JSON-LD (e.g. "Zeichenzähler"). */
  toolName: string;
}

// Order here is the order rendered in the switcher. English first (default).
export const LOCALES: LocaleMeta[] = [
  { code: 'en', flagSrc: '/flags/us.svg', label: 'English',    ogLocale: 'en_US', dir: 'ltr', slug: 'character-counter',       toolName: 'Character Counter'         },
  { code: 'es', flagSrc: '/flags/es.svg', label: 'Español',    ogLocale: 'es_ES', dir: 'ltr', slug: 'contador-de-caracteres',  toolName: 'Contador de Caracteres'    },
  { code: 'de', flagSrc: '/flags/de.svg', label: 'Deutsch',    ogLocale: 'de_DE', dir: 'ltr', slug: 'zeichenzaehler',          toolName: 'Zeichenzähler'             },
  { code: 'fr', flagSrc: '/flags/fr.svg', label: 'Français',   ogLocale: 'fr_FR', dir: 'ltr', slug: 'compteur-de-caracteres',  toolName: 'Compteur de Caractères'    },
  { code: 'pt', flagSrc: '/flags/pt.svg', label: 'Português',  ogLocale: 'pt_PT', dir: 'ltr', slug: 'contador-de-caracteres',  toolName: 'Contador de Caracteres'    },
  { code: 'it', flagSrc: '/flags/it.svg', label: 'Italiano',   ogLocale: 'it_IT', dir: 'ltr', slug: 'contatore-di-caratteri',  toolName: 'Contatore di Caratteri'    },
  { code: 'nl', flagSrc: '/flags/nl.svg', label: 'Nederlands', ogLocale: 'nl_NL', dir: 'ltr', slug: 'tekenteller',             toolName: 'Tekenteller'               },
  { code: 'ja', flagSrc: '/flags/jp.svg', label: '日本語',      ogLocale: 'ja_JP', dir: 'ltr', slug: 'moji-su-kaunta',          toolName: '文字数カウンター'              },
  { code: 'zh', flagSrc: '/flags/cn.svg', label: '中文',        ogLocale: 'zh_CN', dir: 'ltr', slug: 'zi-fu-ji-shu-qi',         toolName: '字符计数器'                 },
  { code: 'da', flagSrc: '/flags/dk.svg', label: 'Dansk',      ogLocale: 'da_DK', dir: 'ltr', slug: 'tegntaeller',             toolName: 'Tegntæller'                },
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
