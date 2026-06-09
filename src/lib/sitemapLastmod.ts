import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tools } from '../data/tools';
import { LOCALES, DEFAULT_LOCALE } from '../i18n/config';
import { toLastmodIso } from './contentDates';

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

/** Map every /[lang]/[tool-slug]/ pathname → lastmod ISO from tools.ts. */
export function buildToolLastmodByPath(): Map<string, string> {
  const map = new Map<string, string>();
  for (const tool of tools) {
    const iso = toLastmodIso(tool.lastUpdated);
    for (const locale of LOCALES) {
      const slug = tool.slugs[locale.code] ?? tool.slugs[DEFAULT_LOCALE];
      map.set(`/${locale.code}/${slug}/`, iso);
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
