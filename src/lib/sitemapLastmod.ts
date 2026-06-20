import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tools } from '../data/tools.ts';
import { calculators } from '../data/calculators.ts';
import { blogCategories, getCategorySlug } from '../data/blogCategories.ts';
import { LOCALES, DEFAULT_LOCALE } from '../i18n/config.ts';
import { toLastmodIso } from './contentDates.ts';

/** Fallback when git history is unavailable (e.g. shallow CI clone). */
const CONTENT_FALLBACK_ISO = '2026-06-01T00:00:00.000Z';

const gitCache = new Map<string, string | undefined>();

/** Last commit ISO timestamp for a repo-relative path. */
export function gitLastMod(relPath: string): string | undefined {
  if (gitCache.has(relPath)) return gitCache.get(relPath);
  let iso: string | undefined;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', relPath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    iso = out || undefined;
  } catch {
    iso = undefined;
  }
  gitCache.set(relPath, iso);
  return iso;
}

/** Map every /[lang]/[tool-slug]/ and /[lang]/tools/[slug]/ pathname → lastmod ISO. */
export function buildToolLastmodByPath(): Map<string, string> {
  const map = new Map<string, string>();
  // Platform guides live at /[lang]/<slug>/
  for (const tool of tools) {
    const iso = toLastmodIso(tool.lastUpdated);
    for (const locale of LOCALES) {
      const slug = tool.slugs[locale.code] ?? tool.slugs[DEFAULT_LOCALE];
      map.set(`/${locale.code}/${slug}/`, iso);
    }
  }
  // Tools suite (SMS, Google SERP, calculators, …) lives at /[lang]/tools/<slug>/
  for (const calc of calculators) {
    const iso = toLastmodIso(calc.lastUpdated);
    for (const locale of LOCALES) {
      const slug = calc.slugs[locale.code] ?? calc.slugs[DEFAULT_LOCALE];
      map.set(`/${locale.code}/tools/${slug}/`, iso);
    }
  }
  return map;
}

/**
 * Map every published blog post pathname (/{locale}/blog/{slug}/) → lastmod ISO
 * from its frontmatter (updatedDate, falling back to publishDate).
 *
 * astro.config.mjs runs before the content layer exists, so we can't use
 * getCollection here — instead we read the Markdown files directly and parse
 * the small set of frontmatter fields we need. Drafts are skipped.
 */
const BLOG_CONTENT_DIR = 'src/content/blog';

function parseBlogFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm: Record<string, string> = {};
  if (!match) return fm;
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

export function buildBlogLastmodByPath(): Map<string, string> {
  const map = new Map<string, string>();
  if (!existsSync(BLOG_CONTENT_DIR)) return map;

  for (const entry of readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue; // each subfolder is a locale
    const dir = join(BLOG_CONTENT_DIR, entry.name);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const fm = parseBlogFrontmatter(readFileSync(join(dir, file), 'utf8'));
      if (fm.draft === 'true') continue;
      const locale = fm.locale || entry.name;
      const date = fm.updatedDate || fm.publishDate;
      if (!fm.slug || !date) continue;
      map.set(`/${locale}/blog/${fm.slug}/`, toLastmodIso(date));
    }
  }
  return map;
}

/** Posts per paginated listing page — must match the blog routes' pageSize. */
const BLOG_PAGE_SIZE = 12;

/** Sitemap metadata for one paginated blog listing URL. */
export interface BlogListingSitemapEntry {
  /** lastmod ISO timestamp. */
  lastmod: string;
  /** Sitemap priority for this page. */
  priority: number;
}

/**
 * Map every paginated blog listing URL → its sitemap lastmod + priority.
 *
 * Covers both the locale index (/{locale}/blog/, /{locale}/blog/2/, …) and the
 * per-category hubs (/{locale}/blog/{category-slug}/, …/2/, …). Page 1 lives at
 * the bare base; pages 2+ append "N/", mirroring the routes' rest-param
 * paginate() output. The page count per listing is derived the same way the
 * route does — ceil(postCount / pageSize) — so the sitemap can never list a
 * paginated URL the build didn't emit (or omit one it did).
 *
 * lastmod is the newest post date in that listing (per locale, or per
 * locale+category), matching the freshness of the content shown. Priority
 * favours page 1 (the canonical listing entry) over deeper pages.
 *
 * astro.config.mjs runs before the content layer exists, so we read the
 * Markdown frontmatter directly here rather than via getCollection. Drafts are
 * skipped — the same rule the routes apply in production.
 */
export function buildBlogListingLastmodByPath(): Map<string, BlogListingSitemapEntry> {
  const map = new Map<string, BlogListingSitemapEntry>();
  if (!existsSync(BLOG_CONTENT_DIR)) return map;

  // Per-locale and per-(locale, category) tallies: post count + newest date.
  const localeStats = new Map<string, { count: number; newest: string }>();
  const categoryStats = new Map<string, { count: number; newest: string }>();

  const tally = (
    stats: Map<string, { count: number; newest: string }>,
    key: string,
    date: string,
  ) => {
    const existing = stats.get(key);
    if (!existing) {
      stats.set(key, { count: 1, newest: date });
    } else {
      existing.count += 1;
      if (date > existing.newest) existing.newest = date;
    }
  };

  for (const entry of readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue; // each subfolder is a locale
    const dir = join(BLOG_CONTENT_DIR, entry.name);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const fm = parseBlogFrontmatter(readFileSync(join(dir, file), 'utf8'));
      if (fm.draft === 'true') continue;
      const locale = fm.locale || entry.name;
      const date = fm.updatedDate || fm.publishDate;
      if (!date) continue;
      tally(localeStats, locale, date);
      if (fm.category) tally(categoryStats, `${locale}::${fm.category}`, date);
    }
  }

  /** Emit page 1..lastPage entries for one listing base path. */
  const addPages = (
    base: string,
    count: number,
    newest: string,
    page1Priority: number,
    deepPriority: number,
  ) => {
    const lastPage = Math.max(1, Math.ceil(count / BLOG_PAGE_SIZE));
    const lastmod = toLastmodIso(newest);
    for (let p = 1; p <= lastPage; p++) {
      const path = p === 1 ? base : `${base}${p}/`;
      map.set(path, { lastmod, priority: p === 1 ? page1Priority : deepPriority });
    }
  };

  // Locale index listings: /{locale}/blog/ + /{locale}/blog/N/.
  for (const [locale, { count, newest }] of localeStats) {
    addPages(`/${locale}/blog/`, count, newest, 0.7, 0.4);
  }

  // Category hub listings: /{locale}/blog/{slug}/ + /{locale}/blog/{slug}/N/.
  for (const [key, { count, newest }] of categoryStats) {
    const [locale, catId] = key.split('::');
    const cat = blogCategories.find((c) => c.id === catId);
    if (!cat) continue;
    const slug = getCategorySlug(cat, locale);
    addPages(`/${locale}/blog/${slug}/`, count, newest, 0.6, 0.4);
  }

  return map;
}

const STATIC_ROUTE_FILES: { pattern: RegExp; file: string }[] = [
  { pattern: /^\/[a-z]{2}\/about\/$/, file: 'src/pages/[lang]/about.astro' },
  { pattern: /^\/[a-z]{2}\/contact\/$/, file: 'src/pages/[lang]/contact.astro' },
  { pattern: /^\/[a-z]{2}\/privacy\/$/, file: 'src/pages/[lang]/privacy.astro' },
  { pattern: /^\/[a-z]{2}\/terms\/$/, file: 'src/pages/[lang]/terms.astro' },
  { pattern: /^\/[a-z]{2}\/embed-widget\/$/, file: 'src/pages/[lang]/embed-widget/index.astro' },
];

/**
 * Resolve sitemap lastmod for a pathname. Tool pages use tools.ts; locale
 * homepages and static routes prefer git; everything else falls back safely.
 */
export function resolveSitemapLastmod(
  pathname: string,
  toolLastmodByPath: Map<string, string>,
  homepageSlugs: Set<string>,
): string {
  const fromTool = toolLastmodByPath.get(pathname);
  if (fromTool) return fromTool;

  if (homepageSlugs.has(pathname)) {
    return gitLastMod('src/pages/[lang]/[slug]/index.astro') ?? CONTENT_FALLBACK_ISO;
  }

  for (const { pattern, file } of STATIC_ROUTE_FILES) {
    if (pattern.test(pathname)) {
      return gitLastMod(file) ?? CONTENT_FALLBACK_ISO;
    }
  }

  return gitLastMod('src/data/tools.ts') ?? CONTENT_FALLBACK_ISO;
}
