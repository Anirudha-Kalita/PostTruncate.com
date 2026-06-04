// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { LOCALE_CODES, DEFAULT_LOCALE } from './src/i18n/config.ts';

// https://astro.build/config
// Default static (SSG) output: informational copy + platform guides are
// pre-rendered for SEO, while the editor ships as a single client island.
//
// i18n: every locale is URL-prefixed (/en, /da, …) and the bare "/" redirects
// to a chosen locale. Locales come from the single registry in src/i18n/config
// so routes, the language switcher, and hreflang tags never drift apart.
export default defineConfig({
  site: 'https://posttruncate.com',
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALE_CODES,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  adapter: cloudflare(),
  integrations: [
    preact(),
    // Sitemap is driven by the same locale registry as the i18n routes, so the
    // hreflang map can never drift from the languages we actually ship. We drop
    // the bare "/" (a 302 locale router with no content of its own) and the
    // noindex 404/500 error files.
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALE_CODES.map((code) => [code, code])),
      },
      filter: (page) => {
        const { pathname } = new URL(page);
        return pathname !== '/' && !/\/(404|500)\/?$/.test(pathname);
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
