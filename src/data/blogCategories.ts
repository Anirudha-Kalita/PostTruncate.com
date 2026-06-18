// ──────────────────────────────────────────────────────────────────────────
// Blog category taxonomy — the single source of truth for the category hub
// pages at /{lang}/blog/{category-slug}/.
//
// Conventions (mirror src/data/tools.ts):
//  • slug/name/description/metaTitle/metaDescription are keyed by locale code.
//  • Falls back to "en" at render time if a locale key is missing.
//  • `id` is the stable machine key stored in post frontmatter (content.config
//    `category` enum) and in the Sveltia CMS dropdown — never change after
//    publish, and keep it identical across all three places.
//  • `description` is the long SEO paragraph rendered on the hub page.
//  • `metaDescription` is the short (<160 char) <meta> tag text.
//
// Extending: to add a category, append an entry here, add its id to the Zod
// enum (it is derived automatically via BLOG_CATEGORY_IDS), and add a matching
// option to public/admin/config.yml.
// ──────────────────────────────────────────────────────────────────────────

import { DEFAULT_LOCALE } from '../i18n/config';

export interface BlogCategory {
  /** Stable machine id stored in post frontmatter. Never change after publish. */
  id: string;
  /** locale → URL slug segment, e.g. { en: "twitter-x" }. */
  slug: Record<string, string>;
  /** locale → display name shown in nav pills, headings, breadcrumbs. */
  name: Record<string, string>;
  /** locale → long SEO description paragraph rendered on the hub page. */
  description: Record<string, string>;
  /** locale → page <title>. */
  metaTitle: Record<string, string>;
  /** locale → meta description (≤160 chars recommended). */
  metaDescription: Record<string, string>;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'twitter-x',
    slug: { en: 'twitter-x' },
    name: { en: 'Twitter / X' },
    metaTitle: { en: 'Twitter / X Formatting Guides & Character Limits — PostTruncate Blog' },
    metaDescription: {
      en: 'Guides for writing on X (Twitter): beat the 280-character limit, format viral threads, and stop your posts getting truncated.',
    },
    description: {
      en: 'Master the art of X (formerly Twitter) with our comprehensive formatting guides. Writing for X requires precision to beat the strict character limits and constant algorithm changes. Whether you are drafting a viral thread, optimizing your hooks to stop the scroll, or trying to understand exactly where the "show more" button cuts off your text, our resources have you covered. Learn how to format your tweets perfectly, maximize your organic reach, and keep your audience engaged from the first line to the last. Discover the best tools to ensure your X content is never awkwardly truncated.',
    },
  },
  {
    id: 'linkedin',
    slug: { en: 'linkedin' },
    name: { en: 'LinkedIn' },
    metaTitle: { en: 'LinkedIn Post Formatting & Character Limits — PostTruncate Blog' },
    metaDescription: {
      en: 'LinkedIn formatting and copywriting guides: beat the "see more" fold, optimize B2B hooks, and master every character limit.',
    },
    description: {
      en: 'Elevate your professional brand with our deep dives into LinkedIn post formatting and copywriting strategy. LinkedIn\'s mobile and desktop feeds ruthlessly truncate text, often hiding your most crucial call-to-action behind a "see more" link. In this hub, we explore exactly how to structure your B2B content, optimize your opening hooks for maximum engagement, and navigate the platform\'s unique character limits. Learn how to write compelling professional updates, articles, and company posts that capture attention instantly, ensuring your insights and links are always front and center for your professional network.',
    },
  },
  {
    id: 'instagram',
    slug: { en: 'instagram' },
    name: { en: 'Instagram' },
    metaTitle: { en: 'Instagram Caption & Bio Formatting Guides — PostTruncate Blog' },
    metaDescription: {
      en: 'Instagram formatting guides: caption character limits, bio optimization, hashtag rules, and writing hooks that beat the "more" fold.',
    },
    description: {
      en: 'Maximize your visual content\'s impact with expertly formatted Instagram captions. While Instagram is a visual-first platform, your text is what drives conversions and deepens engagement. Here, we break down everything you need to know about Instagram\'s character limits, bio optimization, and caption truncation rules. Learn how to craft the perfect hook before the "more" button appears, strategically use line breaks for readability, and format your hashtags without looking spammy. Stop letting your carefully crafted copy get lost in the feed—master the technical side of Instagram formatting to build a highly engaged audience.',
    },
  },
  {
    id: 'facebook',
    slug: { en: 'facebook' },
    name: { en: 'Facebook' },
    metaTitle: { en: 'Facebook Post Formatting & Character Limits — PostTruncate Blog' },
    metaDescription: {
      en: 'Facebook formatting guides: where the feed fold truncates posts, link preview mechanics, and structuring copy that gets reach.',
    },
    description: {
      en: 'Maximize your organic reach and engagement on the world\'s largest social network with our Facebook formatting and content guides. While Facebook allows for massive text limits, its feed mobile layout strictly truncates longer posts, hiding your critical links, headlines, and call-to-actions behind an unforgiving "see more" snippet. In this section, we analyze Facebook\'s precise text cutoff points, post structuring strategies, and link preview mechanics. Learn how to format your text copy perfectly to stop the endless scroll, increase comment-section engagement, and ensure your message never gets buried or cut off mid-sentence.',
    },
  },
  {
    id: 'threads',
    slug: { en: 'threads' },
    name: { en: 'Threads' },
    metaTitle: { en: 'Threads Formatting Guides & Character Limits — PostTruncate Blog' },
    metaDescription: {
      en: 'Threads formatting guides: character limits, cross-posting dynamics, and writing punchy hooks that survive the mobile cutoff.',
    },
    description: {
      en: 'Stay ahead of the curve on Meta\'s text-first platform with our dedicated Threads formatting guides. As the platform rapidly evolves, understanding Threads\' unique character limits, image integration, and cross-posting dynamics is essential for digital creators. In this section, we cover exactly how to structure your posts for maximum visibility, write punchy hooks that drive conversation, and avoid having your text awkwardly cut off on mobile screens. Whether you are migrating an existing audience or starting fresh, learn the absolute best practices for formatting text and building authentic engagement on the Threads app.',
    },
  },
  {
    id: 'sms-marketing',
    slug: { en: 'sms-marketing' },
    name: { en: 'SMS Marketing' },
    metaTitle: { en: 'SMS Marketing Formatting & Encoding Guides — PostTruncate Blog' },
    metaDescription: {
      en: 'SMS marketing guides: GSM-7 vs Unicode encoding, how emojis cut your segment limit from 160 to 70, and keeping send costs low.',
    },
    description: {
      en: 'Protect your budget and improve your delivery rates with our ultimate guides to SMS marketing formatting. Text message marketing is a math game driven by strict telecommunication rules. Here, we decode the complex world of GSM-7 and Unicode encoding. Learn exactly how a single hidden emoji or special character can instantly drop your segment limit from 160 to just 70 characters, secretly doubling or tripling your bulk sending costs. Discover how to safely format your automated alerts, promotional texts, and transactional messages to guarantee compliance while keeping your telecommunication bills as low as possible.',
    },
  },
  {
    id: 'seo-serp',
    slug: { en: 'seo-serp' },
    name: { en: 'SEO & SERP' },
    metaTitle: { en: 'SEO & SERP Formatting Strategies — PostTruncate Blog' },
    metaDescription: {
      en: 'Technical SEO formatting: craft meta titles and descriptions that fit Google\'s pixel-width limits and avoid SERP truncation.',
    },
    description: {
      en: 'Dominate the search engine results pages with our technical SEO formatting strategies. Writing for Google means understanding that truncation is based on invisible pixel widths, not just basic character counts. In this category, we analyze the exact mechanics of crafting perfect meta titles and descriptions that won\'t get cut off in mobile or desktop search results. Learn how to write compelling, click-driven SERP snippets that perfectly capture search intent while strictly adhering to Google\'s layout constraints. Boost your organic click-through rates by ensuring your most critical keywords are always fully visible to searchers.',
    },
  },
  {
    id: 'copywriting-strategy',
    slug: { en: 'copywriting-strategy' },
    name: { en: 'Copywriting & Strategy' },
    metaTitle: { en: 'Copywriting & Content Strategy Guides — PostTruncate Blog' },
    metaDescription: {
      en: 'Advanced copywriting and content strategy: craft irresistible hooks, structure readable paragraphs, and write copy that converts.',
    },
    description: {
      en: 'Master the psychology of digital writing with our advanced copywriting and content strategy guides. Beyond the platform-specific character limits, writing for the internet requires a deep understanding of human attention spans and visual formatting. Explore our masterclasses on crafting irresistible hooks, structuring readable paragraphs, and using psychological triggers to drive conversions. Whether you are a solo developer writing release notes or a seasoned marketer drafting a multi-channel campaign, these resources will help you refine your voice, clarify your message, and write copy that genuinely resonates with your target audience across any platform.',
    },
  },
  {
    id: 'tools-automation',
    slug: { en: 'tools-automation' },
    name: { en: 'Tools & Automation' },
    metaTitle: { en: 'Marketing Tools & Automation Guides — PostTruncate Blog' },
    metaDescription: {
      en: 'Reviews and guides for thread splitters, character counters, schedulers, and the engineering behind building lightweight tools.',
    },
    description: {
      en: 'Supercharge your content workflow and development process with our deep dives into marketing tools and automation strategies. Managing multiple platforms requires smart automation, but formatting errors often slip through when cross-posting. Here, we review and compare the best thread splitters, character counters, social media schedulers, and API tools available for modern creators. Additionally, we share exclusive behind-the-scenes engineering insights from building PostTruncate, detailing how solo developers can build lightweight, high-performance, client-side utilities that solve real-world formatting headaches without breaking the bank or sacrificing user privacy.',
    },
  },
  {
    id: 'tiktok',
    slug: { en: 'tiktok' },
    name: { en: 'TikTok' },
    metaTitle: { en: 'TikTok Text Formatting & Conciseness Guides | PostTruncate' },
    metaDescription: {
      en: 'Master the art of concise TikTok text. Learn formatting best practices, manage character limits, and optimize your video captions for maximum engagement.',
    },
    description: {
      en: 'Master the TikTok algorithm with our ultimate guides to video caption formatting and platform SEO. While TikTok is a video-first platform, your caption is the secret engine driving your discoverability. In this hub, we break down exactly how to leverage TikTok\'s 2,200-character limit without overwhelming your viewers. Learn how to write punchy first-line hooks before the text truncates behind the "more" button, strategically space your hashtags, and seamlessly integrate SEO keywords to rank higher in TikTok\'s search results. Stop guessing how your text will look on screen—learn the exact formatting strategies that turn casual viewers into dedicated followers.',
    },
  },
];

/**
 * All category ids, derived from the registry. Imported by content.config.ts to
 * build the Zod enum so the schema and the registry can never drift apart.
 */
export const BLOG_CATEGORY_IDS = blogCategories.map((c) => c.id) as [string, ...string[]];

const BY_ID = new Map(blogCategories.map((c) => [c.id, c]));

/** Resolve a locale-keyed field to its value, falling back to the default locale. */
function pick(field: Record<string, string>, lang: string): string {
  return field[lang] ?? field[DEFAULT_LOCALE] ?? '';
}

/** Look up a category by its stable id. Returns undefined when unknown. */
export function getCategoryById(id: string): BlogCategory | undefined {
  return BY_ID.get(id);
}

/**
 * Look up a category by its URL slug for the given locale (falls back to the
 * default-locale slug). Returns undefined when no category matches.
 */
export function getCategoryBySlug(slug: string, lang: string): BlogCategory | undefined {
  return blogCategories.find((c) => pick(c.slug, lang) === slug);
}

/** Localized URL slug segment for a category (default-locale fallback). */
export function getCategorySlug(category: BlogCategory, lang: string): string {
  return pick(category.slug, lang);
}

/** Localized display name for a category (default-locale fallback). */
export function getCategoryName(category: BlogCategory, lang: string): string {
  return pick(category.name, lang);
}

/** Localized SEO description paragraph for a category (default-locale fallback). */
export function getCategoryDescription(category: BlogCategory, lang: string): string {
  return pick(category.description, lang);
}

/** Localized page <title> for a category (default-locale fallback). */
export function getCategoryMetaTitle(category: BlogCategory, lang: string): string {
  return pick(category.metaTitle, lang);
}

/** Localized meta description for a category (default-locale fallback). */
export function getCategoryMetaDescription(category: BlogCategory, lang: string): string {
  return pick(category.metaDescription, lang);
}
