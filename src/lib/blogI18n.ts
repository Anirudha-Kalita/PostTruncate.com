// ──────────────────────────────────────────────────────────────────────────
// Blog chrome strings + helpers.
//
// Kept separate from the main `Translations` interface on purpose: the blog is
// shipped English-first, so wiring its labels into all 10 locale dictionaries
// now would be churn. This map has English filled in; the other 9 locales fall
// back to English (via getBlogStrings) until a translator fills them, exactly
// like the en-fallback pattern used across src/data/tools.ts.
// ──────────────────────────────────────────────────────────────────────────
import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE } from '../i18n/config';

/** Fixed URL segment for the section: /{lang}/blog/... — same across locales. */
export const BLOG_SEGMENT = 'blog';

export interface BlogStrings {
  /** <title> of the blog index, e.g. "Blog — PostTruncate". */
  indexTitle: string;
  /** Meta description of the blog index. */
  indexDescription: string;
  /** H1 on the index page. */
  indexHeading: string;
  /** Sub-heading lede on the index page. */
  indexLede: string;
  /** Card link text, e.g. "Read article". */
  readMore: string;
  /** Inline label before the publish date, e.g. "Published". */
  publishedLabel: string;
  /** Inline label before the updated date, e.g. "Updated". */
  updatedLabel: string;
  /** Author byline connector, e.g. "By". */
  byLabel: string;
  /** Breadcrumb + back-link text to the index, e.g. "Blog". */
  backToBlog: string;
  /** Footer link label pointing at the section index, e.g. "Blog". */
  footerLink: string;
  /** Heading for the related-posts block on tool pages, e.g. "From the blog". */
  relatedHeading: string;
  /** Heading for the homepage "Latest from the blog" row. */
  latestHeading: string;
  /** Link text to the full blog index, e.g. "View all articles". */
  viewAll: string;
  /** Blog index "All" category pill label. */
  all: string;
  /** Platform-limits promo card title. */
  limitsPromoTitle: string;
  /** Platform-limits promo card subtitle. */
  limitsPromoText: string;
  /** Post-footer heading when same-platform matches exist, e.g. "Related posts". */
  relatedPostsHeading: string;
  /** Post-footer heading when filled with recent posts, e.g. "More articles". */
  morePostsHeading: string;
  /** Reading-time label with a {min} token, e.g. "{min} min read". */
  readingTime: string;
  /** Heading above the comments section, e.g. "Join the discussion". */
  commentsHeading: string;
  /** Note setting expectations that comments are reviewed before appearing. */
  commentsNote: string;
  /** Pagination: previous-page link label, e.g. "Previous". */
  paginationPrev: string;
  /** Pagination: next-page link label, e.g. "Next". */
  paginationNext: string;
  /** Pagination: aria-label for the pagination <nav>, e.g. "Blog pagination". */
  paginationNavLabel: string;
  /** Pagination: status template with {current} and {total} tokens. */
  paginationStatus: string;
  /** Heading above the article share row, e.g. "Share this article". */
  shareHeading: string;
  /** Share-link aria-label template with a {platform} token, e.g. "Share on {platform}". */
  shareOn: string;
  /** Copy-link button label, e.g. "Copy link". */
  shareCopy: string;
  /** Confirmation shown after the link is copied, e.g. "Link copied!". */
  shareCopied: string;
  /** Native (Web Share API) button label, e.g. "Share". */
  shareNative: string;
}

// Only English is authored today. Add keys for 'de', 'es', … when translating.
const BLOG_STRINGS: Record<string, BlogStrings> = {
  en: {
    indexTitle: 'Blog — Social Media Character Limits & Writing Guides',
    indexDescription:
      'Guides on character limits, post formatting, and writing better social media content for X, Instagram, LinkedIn, Facebook, Threads, and SMS.',
    indexHeading: 'Learn',
    indexLede:
      'Practical guides to character limits, formatting, and writing posts that land on every platform.',
    readMore: 'Read article',
    publishedLabel: 'Published',
    updatedLabel: 'Updated',
    byLabel: 'By',
    backToBlog: 'Blog',
    footerLink: 'Blog',
    relatedHeading: 'From the blog',
    latestHeading: 'Latest from the blog',
    viewAll: 'View all articles',
    all: 'All',
    limitsPromoTitle: 'Need platform-specific limits?',
    limitsPromoText:
      'View the latest character limits and requirements for every platform we support.',
    relatedPostsHeading: 'Related posts',
    morePostsHeading: 'More articles',
    readingTime: '{min} min read',
    commentsHeading: 'Join the discussion',
    commentsNote:
      'Comments are reviewed before they appear, so yours won’t show up right away.',
    paginationPrev: 'Previous',
    paginationNext: 'Next',
    paginationNavLabel: 'Blog pagination',
    paginationStatus: 'Page {current} of {total}',
    shareHeading: 'Share this article',
    shareOn: 'Share on {platform}',
    shareCopy: 'Copy link',
    shareCopied: 'Link copied!',
    shareNative: 'Share',
  },
};

/** Resolve blog chrome strings for a locale, falling back to English. */
export function getBlogStrings(lang: string): BlogStrings {
  return BLOG_STRINGS[lang] ?? BLOG_STRINGS[DEFAULT_LOCALE];
}

/**
 * Locale codes that have at least one published post. Drafts count only in
 * `astro dev` — the same rule the blog routes use, so a locale's footer link
 * appears exactly when its /[lang]/blog/ index is actually generated.
 *
 * Memoized: the Footer calls this on every page render, so without caching the
 * collection would be re-read ~once per page. The module is shared across the
 * SSG build, so one query serves the whole build.
 */
let blogLocalesCache: Promise<Set<string>> | null = null;
export function getBlogLocales(): Promise<Set<string>> {
  blogLocalesCache ??= getCollection('blog').then(
    (posts) =>
      new Set(
        posts
          .filter((p) => import.meta.env.DEV || !p.data.draft)
          .map((p) => p.data.locale),
      ),
  );
  return blogLocalesCache;
}

/**
 * All published posts (drafts only in `astro dev`). Memoized: tool pages call
 * this ~once per page to find related posts, so the collection is read once for
 * the whole build. Callers filter by locale / relatedPlatform as needed.
 */
let publishedPostsCache: Promise<CollectionEntry<'blog'>[]> | null = null;
export function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  publishedPostsCache ??= getCollection('blog').then((posts) =>
    posts.filter((p) => import.meta.env.DEV || !p.data.draft),
  );
  return publishedPostsCache;
}

/** Locale-aware long date, e.g. "June 9, 2026" / "9. Juni 2026". */
export function formatBlogDate(date: Date, lang: string): string {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(date);
}

/** ISO date-only (YYYY-MM-DD) for <time datetime> and schema fields. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
