import { c as createComponent } from './astro-component_CKMXp43h.mjs';
import 'piccolore';
import './entrypoint_Dr6-kruh.mjs';
import 'clsx';

const LOCALES = [{
  code: "en",
  flagSrc: "/flags/us.svg",
  label: "English",
  ogLocale: "en_US",
  dir: "ltr"
}, {
  code: "es",
  flagSrc: "/flags/es.svg",
  label: "Español",
  ogLocale: "es_ES",
  dir: "ltr"
}, {
  code: "de",
  flagSrc: "/flags/de.svg",
  label: "Deutsch",
  ogLocale: "de_DE",
  dir: "ltr"
}, {
  code: "fr",
  flagSrc: "/flags/fr.svg",
  label: "Français",
  ogLocale: "fr_FR",
  dir: "ltr"
}, {
  code: "pt",
  flagSrc: "/flags/pt.svg",
  label: "Português",
  ogLocale: "pt_PT",
  dir: "ltr"
}, {
  code: "it",
  flagSrc: "/flags/it.svg",
  label: "Italiano",
  ogLocale: "it_IT",
  dir: "ltr"
}, {
  code: "nl",
  flagSrc: "/flags/nl.svg",
  label: "Nederlands",
  ogLocale: "nl_NL",
  dir: "ltr"
}, {
  code: "ja",
  flagSrc: "/flags/jp.svg",
  label: "日本語",
  ogLocale: "ja_JP",
  dir: "ltr"
}, {
  code: "zh",
  flagSrc: "/flags/cn.svg",
  label: "中文",
  ogLocale: "zh_CN",
  dir: "ltr"
}, {
  code: "da",
  flagSrc: "/flags/dk.svg",
  label: "Dansk",
  ogLocale: "da_DK",
  dir: "ltr"
}];
const DEFAULT_LOCALE = "en";
const LOCALE_CODES = LOCALES.map((l) => l.code);
const BY_CODE = new Map(LOCALES.map((l) => [l.code, l]));
function isLocale(code) {
  return !!code && BY_CODE.has(code);
}

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const LANGUAGE_COOKIE = "preferred_locale";
  const REDIRECT_VARY = "Accept-Language, Cookie, x-vercel-ip-country, cf-ipcountry, x-country-code, x-nf-country, fastly-client-country-code";
  const COUNTRY_LOCALE = {
    AD: "es",
    AR: "es",
    BO: "es",
    CL: "es",
    CO: "es",
    CR: "es",
    CU: "es",
    DO: "es",
    EC: "es",
    ES: "es",
    GT: "es",
    HN: "es",
    MX: "es",
    NI: "es",
    PA: "es",
    PE: "es",
    PR: "es",
    PY: "es",
    SV: "es",
    UY: "es",
    VE: "es",
    AT: "de",
    CH: "de",
    DE: "de",
    LI: "de",
    BE: "fr",
    FR: "fr",
    LU: "fr",
    MC: "fr",
    AO: "pt",
    BR: "pt",
    MZ: "pt",
    PT: "pt",
    IT: "it",
    SM: "it",
    VA: "it",
    NL: "nl",
    SR: "nl",
    JP: "ja",
    CN: "zh",
    HK: "zh",
    MO: "zh",
    TW: "zh",
    DK: "da",
    AU: "en",
    CA: "en",
    GB: "en",
    IE: "en",
    IN: "en",
    NZ: "en",
    SG: "en",
    US: "en",
    ZA: "en"
  };
  const supportedLocales = new Set(LOCALE_CODES);
  const requestUrl = new URL(Astro2.request.url);
  const normalizeLocale = (value) => {
    const base = value?.trim().toLowerCase().replace("_", "-").split("-")[0];
    return isLocale(base) ? base : void 0;
  };
  const redirectTarget = (locale) => {
    const target = new URL(`/${locale}/`, requestUrl);
    for (const [key, value] of requestUrl.searchParams) {
      if (key.toLowerCase() !== "lang") target.searchParams.append(key, value);
    }
    return `${target.pathname}${target.search}`;
  };
  const redirectTo = (locale) => {
    const response = Astro2.redirect(redirectTarget(locale), 302);
    response.headers.set("Vary", REDIRECT_VARY);
    return response;
  };
  const getBrowserLocale = () => {
    const browserLocales = [
      Astro2.preferredLocale,
      ...Astro2.preferredLocaleList ?? []
    ];
    for (const locale of browserLocales) {
      const normalized = normalizeLocale(locale);
      if (normalized && supportedLocales.has(normalized)) return normalized;
    }
  };
  const getGeoCountry = () => {
    const request = Astro2.request;
    const headers = Astro2.request.headers;
    return (request.cf?.country ?? headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry") ?? headers.get("x-country-code") ?? headers.get("x-nf-country") ?? headers.get("fastly-client-country-code") ?? "").trim().toUpperCase();
  };
  const getGeoLocale = () => {
    const country = getGeoCountry();
    return COUNTRY_LOCALE[country];
  };
  const queryLocale = normalizeLocale(requestUrl.searchParams.get("lang"));
  if (queryLocale) {
    Astro2.cookies.set(LANGUAGE_COOKIE, queryLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax"
    });
    return redirectTo(queryLocale);
  }
  const savedLocale = normalizeLocale(Astro2.cookies.get(LANGUAGE_COOKIE)?.value);
  const detectedLocale = savedLocale ?? getBrowserLocale() ?? getGeoLocale() ?? DEFAULT_LOCALE;
  return redirectTo(detectedLocale);
}, "D:/AICodingProjects/PostTruncate.com/src/pages/index.astro", void 0);

const $$file = "D:/AICodingProjects/PostTruncate.com/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
