// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { LOCALES, LOCALE_CODES, DEFAULT_LOCALE, getLocale } from './src/i18n/config.ts';
import { tools } from './src/data/tools.ts';
import { calculators } from './src/data/calculators.ts';
import {
  buildToolLastmodByPath,
  buildBlogLastmodByPath,
  resolveSitemapLastmod,
} from './src/lib/sitemapLastmod.ts';
import { remarkVideoEmbed } from './src/lib/remarkVideoEmbed.ts';

// ── Build a reverse look-up: given a URL pathname, resolve the tool + locale
//    so the serialize hook can emit the correct hreflang alternates even when
//    each locale uses a different URL slug.
//
//    slugToTool: Map<slug, ToolDefinition>  (every locale slug → its tool)
//    toolHreflang: Map<toolId, { hreflang, href }[]>  (toolId → all alternates)
const SITE = 'https://posttruncate.com';
/** @type {Map<string, import('./src/data/tools.ts').ToolDefinition>} */
const slugToTool = new Map();
/** @type {Map<string, { hreflang: string, href: string }[]>} */
const toolHreflang = new Map();

// Platform guides live at /[lang]/<slug>/; the Tools suite (calculators, SMS,
// Google SERP, …) lives under /[lang]/tools/<slug>/. Register both so the
// serialize hook injects correct per-locale hreflang for every tool page.
const toolGroups = [
  { list: tools, prefix: '' },
  { list: calculators, prefix: 'tools/' },
];
for (const { list, prefix } of toolGroups) {
  for (const tool of list) {
    const alternates = LOCALE_CODES.map((code) => {
      const slug = tool.slugs[code] ?? tool.slugs[DEFAULT_LOCALE];
      slugToTool.set(`/${code}/${prefix}${slug}/`, tool);
      return { hreflang: code, href: `${SITE}/${code}/${prefix}${slug}/` };
    });
    // x-default points to the English variant per Google best practice.
    alternates.push({
      hreflang: 'x-default',
      href: `${SITE}/${DEFAULT_LOCALE}/${prefix}${tool.slugs[DEFAULT_LOCALE]}/`,
    });
    toolHreflang.set(tool.id, alternates);
  }
}

// Locale-homepage slug look-up: /en/character-counter/ etc.
const homepageSlugs = new Set(LOCALES.map((l) => `/${l.code}/${l.slug}/`));

// Per-URL lastmod: tool pages from tools.ts; static routes from git history.
const toolLastmodByPath = buildToolLastmodByPath();
// Blog post lastmod from each post's frontmatter (updatedDate ?? publishDate).
const blogLastmodByPath = buildBlogLastmodByPath();

// https://astro.build/config
// Default static (SSG) output: informational copy + platform guides are
// pre-rendered for SEO, while the editor ships as a single client island.
//
// i18n: every locale is URL-prefixed (/en, /da, …) and the bare "/" redirects
// to a chosen locale. Locales come from the single registry in src/i18n/config
// so routes, the language switcher, and hreflang tags never drift apart.
export default defineConfig({
  site: SITE,
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALE_CODES,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  // Blog (.md) authors embed video by pasting a YouTube/Vimeo URL on its own
  // line; this remark plugin rewrites it to a responsive, lazy-loaded iframe.
  markdown: {
    remarkPlugins: [remarkVideoEmbed],
  },
  adapter: cloudflare(),
  integrations: [
    preact(),
    // Sitemap is driven by the same locale registry as the i18n routes, so the
    // hreflang map can never drift from the languages we actually ship.
    //
    // Filtering:
    //  • Drop the bare "/" (a 302 locale router with no content of its own).
    //  • Drop noindex 404/500 error pages.
    //  • Drop /[lang]/embed/ pages (noindex iframes, not real landing pages).
    //  • Drop slug-nested duplicates (/en/character-counter/about/ etc.) that
    //    duplicate the canonical /en/about/ versions.
    //
    // Serialization:
    //  • Tool pages have different slugs per locale, so @astrojs/sitemap's
    //    built-in i18n matching can't link them. The serialize hook injects
    //    the correct hreflang alternates from the tools registry.
    //  • Locale homepages also have different keyword slugs, so they get
    //    hreflang injected the same way.
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALE_CODES.map((code) => [code, code])),
      },
      filter: (page) => {
        const { pathname } = new URL(page);
        // Drop bare root, 404/500, embed iframes, and slug-nested duplicates
        if (pathname === '/') return false;
        if (/\/(404|500)\/?$/.test(pathname)) return false;
        if (/\/[a-z]{2}\/embed\/?$/.test(pathname)) return false;
        // Drop the RSS feed endpoint — it's a feed, not an indexable page.
        if (/\/blog\/rss\.xml$/.test(pathname)) return false;
        // Drop the CMS admin area (entry + tools like /admin/upload) — noindex.
        if (/^\/admin(?:\/|$)/.test(pathname)) return false;
        // Drop slug-nested /en/character-counter/about|contact|privacy|terms/
        if (/\/[a-z]{2}\/[^/]+\/(about|contact|privacy|terms)\/?$/.test(pathname)) return false;
        return true;
      },
      serialize: (item) => {
        const { pathname } = new URL(item.url);

        // ── Tool pages: inject hreflang from the tools registry ──
        const tool = slugToTool.get(pathname);
        if (tool) {
          const alternates = toolHreflang.get(tool.id);
          if (alternates) {
            item.links = alternates.map((a) => ({
              lang: a.hreflang,
              url: a.href,
            }));
          }
          item.lastmod = resolveSitemapLastmod(pathname, toolLastmodByPath, homepageSlugs);
          item.priority = 1.0;
          return item;
        }

        // ── Locale homepages: inject hreflang across keyword slugs ──
        if (homepageSlugs.has(pathname)) {
          item.links = [
            ...LOCALES.map((l) => ({
              lang: l.code,
              url: `${SITE}/${l.code}/${l.slug}/`,
            })),
            {
              lang: 'x-default',
              url: `${SITE}/${DEFAULT_LOCALE}/${getLocale(DEFAULT_LOCALE).slug}/`,
            },
          ];
          item.lastmod = resolveSitemapLastmod(pathname, toolLastmodByPath, homepageSlugs);
          item.priority = 1.0;
          return item;
        }

        // ── Blog posts: lastmod from the post's frontmatter date ──
        const blogLastmod = blogLastmodByPath.get(pathname);
        if (blogLastmod) {
          item.lastmod = blogLastmod;
          item.priority = 0.7;
          return item;
        }

        // Everything else (faq, platform-limits, about, contact, privacy,
        // terms, embed-widget) keeps the auto-generated hreflang from the
        // i18n config.
        item.lastmod = resolveSitemapLastmod(pathname, toolLastmodByPath, homepageSlugs);
        if (/\/(faq|platform-limits)\/?$/.test(pathname)) {
          item.priority = 0.7;
        } else if (/\/(about|contact|privacy|terms)\/?$/.test(pathname)) {
          item.priority = 0.5;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
