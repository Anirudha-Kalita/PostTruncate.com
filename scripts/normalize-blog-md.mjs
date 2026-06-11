// ──────────────────────────────────────────────────────────────────────────
// normalize-blog-md.mjs — prepare raw .md files for the `blog` collection.
//
// Reads every *.md in an INPUT folder, rewrites each file's frontmatter to
// satisfy src/content.config.ts (filling required fields with sensible
// defaults), preserves the body, and writes the result to a SEPARATE OUTPUT
// folder for review. It never touches src/content/blog or the input files.
//
// Usage (run locally, no deploy):
//   node scripts/normalize-blog-md.mjs <inputDir> [outputDir]
//
//   inputDir   folder of raw .md files (required)
//   outputDir  where normalized files are written (default: ./blog-normalized)
//
// After reviewing the output, copy the files you want into
// src/content/blog/en/ and run `npx astro sync` + `npm run build`.
//
// Defaults applied:
//   • slug         ← kebab-cased filename (leading date prefix stripped)
//   • title        ← frontmatter title → first body "# H1" → title-cased slug
//   • description  ← frontmatter description/excerpt/summary → first paragraph
//   • publishDate  ← frontmatter date → file mtime → today (YYYY-MM-DD)
//   • locale       ← "en"   (this collection folder is en/)
//   • author       ← frontmatter author → "PostTruncate Team"
//   • draft        ← true   (forced, so you review before publishing)
//   • translationKey ← slug
// Optional fields (subtitle, updatedDate, relatedPlatform, ogImage) are carried
// over only when present and valid; unknown frontmatter keys are dropped.
// ──────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, basename, extname, resolve } from 'node:path';
import YAML from 'yaml';

// Mirror the schema's constraints so output is guaranteed build-valid.
const TITLE_MAX = 70;
const DESC_MAX = 180;
const SUBTITLE_MAX = 200;
const RELATED_PLATFORMS = ['twitter', 'instagram', 'linkedin', 'facebook', 'sms', 'threads', 'general'];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LOCALE = 'en';
const DEFAULT_AUTHOR = 'PostTruncate Team';

// ── args ───────────────────────────────────────────────────────────────────
const [, , inDirArg, outDirArg] = process.argv;
if (!inDirArg || inDirArg === '--help' || inDirArg === '-h') {
  console.log('Usage: node scripts/normalize-blog-md.mjs <inputDir> [outputDir]');
  process.exit(inDirArg ? 0 : 1);
}
const inDir = resolve(inDirArg);
const outDir = resolve(outDirArg ?? './blog-normalized');

// ── helpers ──────────────────────────────────────────────────────────────--
/** Split a raw file into { fm: object, body: string }. Tolerates no/blank frontmatter. */
function splitFrontmatter(raw) {
  const text = raw.replace(/^﻿/, ''); // strip BOM
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: text.trim() };
  let fm = {};
  try {
    fm = YAML.parse(m[1]) ?? {};
  } catch (err) {
    console.warn(`  ! frontmatter YAML failed to parse, treating as empty: ${err.message}`);
  }
  return { fm: typeof fm === 'object' && fm ? fm : {}, body: m[2].trim() };
}

/** lowercase kebab-case; strips a leading ISO/Jekyll date prefix; safe fallback. */
function slugify(input) {
  let s = String(input ?? '')
    .replace(/\.md$/i, '')
    .replace(/^\d{4}-\d{2}-\d{2}[-_]?/, '') // 2024-01-02-title → title
    .toLowerCase()
    .replace(/['’`]/g, '') // drop apostrophes
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  return s || 'post';
}

/** First "# H1" text in the body, if any. */
function firstH1(body) {
  const m = body.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : null;
}

/** Remove a single leading "# H1" line (the template renders title separately). */
function stripLeadingH1(body) {
  return body.replace(/^\s*#\s+.+?\s*(\r?\n)+/, '');
}

/** Plain-text first paragraph for a description fallback. */
function firstParagraph(body) {
  const lines = body.split(/\r?\n/);
  let inFence = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('```')) { inFence = !inFence; continue; }
    if (inFence || !t) continue;
    if (/^(#{1,6}\s|[-*+]\s|\d+\.\s|>|!\[|\|)/.test(t)) continue; // headings/lists/quotes/images/tables
    return t
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')      // images
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')   // links → text
      .replace(/[*_`#>]/g, '')                    // emphasis/code marks
      .trim();
  }
  return '';
}

function titleCase(slug) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/** Truncate to max chars on a word boundary, appending … when cut. */
function clamp(str, max) {
  const s = String(str).trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

/** Normalize any date-ish value to YYYY-MM-DD, or null if unparseable. */
function toISODate(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

const todayISO = () => new Date().toISOString().slice(0, 10);

// ── main ─────────────────────────────────────────────────────────────────--
let files;
try {
  files = readdirSync(inDir).filter((f) => extname(f).toLowerCase() === '.md');
} catch (err) {
  console.error(`Cannot read input dir "${inDir}": ${err.message}`);
  process.exit(1);
}
if (files.length === 0) {
  console.error(`No .md files found in ${inDir}`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

console.log(`\nNormalizing ${files.length} file(s)\n  in:  ${inDir}\n  out: ${outDir}\n`);

const usedSlugs = new Set();
let warnings = 0;

for (const file of files) {
  const srcPath = join(inDir, file);
  console.log(`• ${file}`);
  const raw = readFileSync(srcPath, 'utf8');
  const { fm, body: rawBody } = splitFrontmatter(raw);
  const notes = [];

  // slug (kebab; ensure uniqueness within this batch)
  let slug = slugify(fm.slug ?? basename(file, extname(file)));
  if (!SLUG_RE.test(slug)) { slug = slugify(slug); notes.push('slug re-sanitized'); }
  if (usedSlugs.has(slug)) {
    let i = 2;
    while (usedSlugs.has(`${slug}-${i}`)) i++;
    slug = `${slug}-${i}`;
    notes.push(`duplicate slug → ${slug}`);
  }
  usedSlugs.add(slug);

  // title
  const h1 = firstH1(rawBody);
  let title = (fm.title && String(fm.title).trim()) || h1 || titleCase(slug);
  if (title.length > TITLE_MAX) { title = clamp(title, TITLE_MAX); notes.push('title truncated to 70'); }

  // body: drop a leading H1 so it doesn't duplicate the rendered title
  let body = rawBody;
  if (h1) { body = stripLeadingH1(rawBody).trim(); notes.push('leading "# H1" removed (title rendered separately)'); }

  // description
  let description =
    (fm.description && String(fm.description).trim()) ||
    (fm.excerpt && String(fm.excerpt).trim()) ||
    (fm.summary && String(fm.summary).trim()) ||
    firstParagraph(body) ||
    title;
  if (!fm.description) notes.push('description derived (review it)');
  description = clamp(description, DESC_MAX);

  // dates
  const publishDate =
    toISODate(fm.publishDate) ||
    toISODate(fm.date) ||
    toISODate(fm.pubDate) ||
    toISODate(statSync(srcPath).mtime) ||
    todayISO();
  const updatedDate = toISODate(fm.updatedDate ?? fm.updated ?? fm.modified);

  // optional carry-overs
  const subtitle = fm.subtitle ? clamp(String(fm.subtitle), SUBTITLE_MAX) : undefined;
  const relatedPlatform = RELATED_PLATFORMS.includes(fm.relatedPlatform) ? fm.relatedPlatform : undefined;
  if (fm.relatedPlatform && !relatedPlatform) notes.push(`relatedPlatform "${fm.relatedPlatform}" not in enum → dropped`);
  const ogImage = (fm.ogImage || fm.image) ? String(fm.ogImage || fm.image).trim() : undefined;
  const author = (fm.author && String(fm.author).trim()) || DEFAULT_AUTHOR;

  // Build frontmatter in schema/field order, omitting undefined optionals.
  const out = {};
  out.title = title;
  if (subtitle) out.subtitle = subtitle;
  out.description = description;
  out.publishDate = publishDate;
  if (updatedDate) out.updatedDate = updatedDate;
  out.locale = LOCALE;
  out.slug = slug;
  out.translationKey = slug;
  if (relatedPlatform) out.relatedPlatform = relatedPlatform;
  out.author = author;
  out.draft = true; // forced — review before publishing
  if (ogImage) out.ogImage = ogImage;

  // Serialize. Keep dates as unquoted plain scalars to match existing posts
  // and the Sveltia datetime widget (YAML 1.2 reads them back as strings).
  let yamlStr = YAML.stringify(out, { lineWidth: 0 });
  yamlStr = yamlStr.replace(/^(publishDate|updatedDate): "(\d{4}-\d{2}-\d{2})"$/gm, '$1: $2');

  const content = `---\n${yamlStr}---\n\n${body}\n`;
  const outPath = join(outDir, `${slug}.md`);
  writeFileSync(outPath, content, 'utf8');

  if (notes.length) { warnings += notes.length; notes.forEach((n) => console.log(`    ↳ ${n}`)); }
  console.log(`    → ${slug}.md`);
}

console.log(`\nDone. ${files.length} file(s) written to ${outDir}` + (warnings ? `, ${warnings} note(s) above — review before committing.` : '.'));
console.log('Next: review, copy chosen files into src/content/blog/en/, then `npx astro sync` && `npm run build`.\n');
