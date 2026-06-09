// ──────────────────────────────────────────────────────────────────────────
// Blog RSS feed → /{locale}/blog/rss.xml. Prerendered to a static file at
// build time (no backend). getStaticPaths emits a feed only for locales that
// have published posts, so it's English-only today and auto-extends later —
// the same rule the blog index/post routes use.
// ──────────────────────────────────────────────────────────────────────────
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { BLOG_SEGMENT, getBlogStrings } from '../../../lib/blogI18n';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getCollection('blog')).filter(
    (p) => import.meta.env.DEV || !p.data.draft,
  );
  const locales = [...new Set(posts.map((p) => p.data.locale))];
  return locales.map((lang) => ({ params: { lang } }));
};

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as string;
  const s = getBlogStrings(lang);

  const posts = (await getCollection('blog'))
    .filter((p) => p.data.locale === lang && (import.meta.env.DEV || !p.data.draft))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: s.indexTitle,
    description: s.indexDescription,
    // `site` is set in astro.config.mjs, so it's defined here.
    site: site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.publishDate,
      link: `/${lang}/${BLOG_SEGMENT}/${p.data.slug}/`,
    })),
    customData: `<language>${lang}</language>`,
  });
};
