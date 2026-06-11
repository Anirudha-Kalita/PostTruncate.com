// ──────────────────────────────────────────────────────────────────────────
// Content collections (Astro 6 Content Layer API).
//
// `blog` — the Learn/Guides article collection. Structurally ready for all 10
// site locales, but content is added English-first: a locale only produces
// pages when it actually has Markdown files, so the 9 unwritten languages
// generate nothing (no thin/empty pages) until their translations land.
//
// File layout (folder = locale, single source of truth for the post language):
//
//   src/content/blog/
//     en/twitter-character-limit-guide.md
//     de/twitter-zeichenlimit-leitfaden.md   ← same post, localized slug + body
//
// The glob() loader derives an entry `id` from the path (e.g. "en/twitter-…").
// The `locale` frontmatter field restates that language so it can be validated
// against the folder at build time (catch a misfiled post early).
// ──────────────────────────────────────────────────────────────────────────
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LOCALE_CODES } from './i18n/config';

// Platforms a post can be cross-linked to. Values mirror the ids in
// src/data/tools.ts so a post can deep-link to the matching tool page/editor
// without a lookup table; "general" covers non-platform posts.
export const RELATED_PLATFORMS = [
  'twitter',
  'instagram',
  'linkedin',
  'facebook',
  'sms',
  'threads',
  'general',
] as const;

// Sveltia serializes a CLEARED optional field as an empty string (e.g. you add
// an `updatedDate`, save, then later remove it) rather than omitting the key.
// Coerce '' / null to undefined BEFORE validation so an optional field that was
// filled then cleared in the CMS never crashes the build — z.coerce.date() and
// z.enum() both reject "" otherwise. Wrap every optional field with this.
const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

const blog = defineCollection({
  // Content Layer requires an explicit loader. Markdown only (no MDX
  // integration installed). Pattern is exactly `<locale>/<slug>.md` (one level
  // deep), so the collection-root README.md is never parsed as a post.
  //
  // generateId keeps the locale folder in the id ("en/twitter-guide"). The
  // default slugifies to the basename only, which (a) drops the folder our
  // guard checks and (b) collides when two locales share a filename. Folder-
  // qualified ids are unique per file and let routes validate locale vs folder.
  loader: glob({
    pattern: '*/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),

  schema: z.object({
    // ── Core SEO surface ────────────────────────────────────────────────
    /** Page <title> + OG/Twitter title. Keep ≤ ~60 chars for SERP display. */
    title: z.string().max(70),
    /** Meta description + OG/Twitter description. ≤160 chars recommended. */
    description: z.string().max(180),
    /**
     * Optional deck/standfirst shown under the <h1> in the article (above the
     * author + date). Purely visual — distinct from `description`, which is the
     * SEO meta text — so the on-page subtitle and the SERP snippet can differ.
     */
    subtitle: z.preprocess(blankToUndefined, z.string().max(200).optional()),

    // ── Dates (drive Article schema + sitemap lastmod) ──────────────────
    /** First publication date. Write `publishDate: 2026-06-09` in frontmatter. */
    publishDate: z.coerce.date(),
    /** Last substantive revision. Omit until the post is actually updated. */
    updatedDate: z.preprocess(blankToUndefined, z.coerce.date().optional()),

    // ── Locale + routing ────────────────────────────────────────────────
    /**
     * Post language. Must be one of the 10 registry codes (single source of
     * truth in src/i18n/config). Validated against the containing folder.
     */
    locale: z.enum(LOCALE_CODES as [string, ...string[]]),
    /**
     * Per-locale URL segment, e.g. "twitter-character-limit-guide". Kebab-case,
     * no slashes. Final URL is `/{locale}/blog/{slug}/`.
     */
    slug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'slug must be lowercase kebab-case (a-z, 0-9, single hyphens)',
      ),
    /**
     * Stable key shared by every translation of the same logical post. Used to
     * emit hreflang alternates across locales. Reuse the SAME value in each
     * language's file (e.g. translationKey: "twitter-limit-guide" in both
     * en/ and de/) so the cross-locale linking contract is explicit.
     *
     * Optional INPUT, required-and-non-empty in EFFECT: the object-level
     * transform below back-fills it from `slug` when omitted or blank (e.g.
     * Sveltia's hidden field can serialize an empty string). Because every
     * slug is unique and non-empty, the derived key is a stable, unique
     * fallback; an explicit value (a shared translation key) always wins.
     */
    translationKey: z.string().optional(),

    // ── Taxonomy ────────────────────────────────────────────────────────
    /** Optional platform association → cross-links to the matching tool page. */
    relatedPlatform: z.preprocess(blankToUndefined, z.enum(RELATED_PLATFORMS).optional()),

    // ── Authorship & state ──────────────────────────────────────────────
    /** Display name for the Article author (Person schema). */
    author: z.string(),
    /** Hidden from production builds while true (still visible in `astro dev`). */
    draft: z.boolean().default(false),

    // ── Social image ────────────────────────────────────────────────────
    /**
     * Optional OG/Twitter image. A path under /public ("/og/my-post.png") or an
     * absolute URL. Resolved to an absolute URL at render; falls back to the
     * site-wide /og.png when omitted.
     */
    ogImage: z.preprocess(blankToUndefined, z.string().optional()),
  })
  // Back-fill translationKey from slug when omitted or blank, so an empty
  // value (e.g. from a CMS hidden field) can never crash the build. Explicit,
  // non-empty keys pass through untouched, so translations keep sharing one.
  .transform((data) => ({
    ...data,
    translationKey:
      data.translationKey && data.translationKey.trim().length > 0
        ? data.translationKey
        : data.slug,
  })),
});

export const collections = { blog };
