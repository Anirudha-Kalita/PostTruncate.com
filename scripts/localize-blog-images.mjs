// ──────────────────────────────────────────────────────────────────────────
// localize-blog-images.mjs — download remote (CDN/http) images referenced by
// blog posts into public/og/ and rewrite the markdown to local /og/ paths.
//
// Why this exists: the in-browser /admin/upload downloader uses fetch(), which
// is blocked by CORS for many CDNs (and the public CORS-proxy fallback is
// rate-limited), so some images save as "failed (URL kept)". Node has no CORS,
// so this server-side pass reliably pulls those images in. Run it before a
// build/commit; the optimize-images step then resizes + WebP-converts them.
//
// It handles the frontmatter `ogImage` (hero) plus every in-body Markdown
// image — including the tricky case where the alt text contains a nested link
// with its own brackets/parens. Idempotent: already-local (/og/…) refs are
// skipped, so re-running is a no-op. NON-FATAL: a failed download leaves the
// original URL in place and never aborts the build.
//
// Usage:
//   node scripts/localize-blog-images.mjs [file.md …] [--dry-run] [--help]
//   (no file args → scans every post under src/content/blog/<locale>/)
// ──────────────────────────────────────────────────────────────────────────
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BLOG_ROOT = resolve(ROOT, 'src/content/blog');
const OG_DIR = resolve(ROOT, 'public/og');

const isRemote = (u) => /^https?:\/\//i.test(u);

// content-type / URL → safe file extension.
const EXT_BY_TYPE = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg', 'image/avif': 'avif' };
function pickExt(contentType, url) {
  const ct = (contentType || '').split(';')[0].trim().toLowerCase();
  if (EXT_BY_TYPE[ct]) return EXT_BY_TYPE[ct];
  const fromUrl = url.split(/[?#]/)[0].split('.').pop()?.toLowerCase() || '';
  return (/^[a-z0-9]{1,4}$/.test(fromUrl) ? fromUrl : 'png').replace('jpeg', 'jpg');
}

const sanitizeBase = (s) =>
  String(s || 'image').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^[-.]+|[-.]+$/g, '') || 'image';

// Robust Markdown image-URL collector: hand-scan tracking bracket depth across
// the alt (honoring backslash escapes) and paren depth across the URL, so a
// nested link inside the alt doesn't make us grab the wrong URL. Plus raw <img>.
export function collectImageUrls(md) {
  const urls = new Set();
  for (let i = 0; i < md.length; i++) {
    if (md[i] !== '!' || md[i + 1] !== '[') continue;
    let j = i + 2, depth = 1;
    for (; j < md.length && depth > 0; j++) {
      const c = md[j];
      if (c === '\\') { j++; continue; }
      if (c === '[') depth++;
      else if (c === ']') depth--;
    }
    if (depth !== 0 || md[j] !== '(') continue;
    let k = j + 1; const start = k; let pdepth = 1;
    for (; k < md.length && pdepth > 0; k++) {
      const c = md[k];
      if (c === '(') pdepth++;
      else if (c === ')') pdepth--;
      if (pdepth === 0) break;
    }
    const url = md.slice(start, k).trim().replace(/^<|>$/g, '').split(/\s+/)[0];
    if (url) urls.add(url);
    i = k;
  }
  const htmlRe = /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = htmlRe.exec(md))) urls.add(m[1]);
  return [...urls];
}

/** Read a frontmatter scalar (slug / ogImage) from the raw .md content. */
function frontmatterField(content, key) {
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const m = fm[1].match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : null;
}

/** Fetch image bytes server-side (no CORS). Returns { buf, ext } or null. */
async function fetchImage(url) {
  try {
    const r = await fetch(url, { redirect: 'follow' });
    if (!r.ok) return null;
    const ct = r.headers.get('content-type') || '';
    const buf = Buffer.from(await r.arrayBuffer());
    if (!buf.length) return null;
    return { buf, ext: pickExt(ct, url) };
  } catch {
    return null;
  }
}

/**
 * Localize one post's remote images. Returns { changed, saved, failed }.
 * @param {string} file  Absolute path to the .md file.
 */
export async function localizePost(file, { dryRun = false } = {}) {
  const content = await readFile(file, 'utf8');
  const slug = sanitizeBase(frontmatterField(content, 'slug') || basename(file, '.md'));
  const heroUrl = (() => {
    const og = frontmatterField(content, 'ogImage');
    return og && isRemote(og) ? og : null;
  })();
  const bodyUrls = collectImageUrls(content).filter(isRemote).filter((u) => u !== heroUrl);
  const ordered = [...(heroUrl ? [heroUrl] : []), ...new Set(bodyUrls)];
  if (!ordered.length) return { changed: false, saved: 0, failed: 0 };

  await mkdir(OG_DIR, { recursive: true });
  let out = content, saved = 0, failed = 0, n = 0;
  for (const url of ordered) {
    const img = await fetchImage(url);
    if (!img) { failed++; console.warn(`  ✗ ${url} (download failed — URL kept)`); continue; }
    const filename = `${url === heroUrl ? `${slug}-hero` : `${slug}-${++n}`}.${img.ext}`;
    if (!dryRun) await writeFile(join(OG_DIR, filename), img.buf);
    out = out.split(url).join(`/og/${filename}`); // replace every occurrence
    saved++;
    console.log(`  ✓ ${url}\n      → public/og/${filename}`);
  }
  if (out !== content && !dryRun) await writeFile(file, out, 'utf8');
  return { changed: out !== content, saved, failed };
}

async function listPosts() {
  const out = [];
  let locales = [];
  try {
    locales = await readdir(BLOG_ROOT, { withFileTypes: true });
  } catch { return out; }
  for (const d of locales) {
    if (!d.isDirectory()) continue;
    const dir = join(BLOG_ROOT, d.name);
    for (const f of await readdir(dir)) if (f.endsWith('.md')) out.push(join(dir, f));
  }
  return out;
}

const HELP = `localize-blog-images — pull remote/CDN images into public/og and rewrite posts

Usage:
  node scripts/localize-blog-images.mjs [file.md …] [--dry-run]

With no file args, scans every post under src/content/blog/<locale>/. Downloads
each remote (http/https) image referenced by a post — the frontmatter ogImage
plus all in-body images — into public/og/, then repoints the markdown at the
local /og/ copy. Already-local refs are skipped. Failed downloads keep their
original URL (non-fatal). Run before optimize-images / build.`;

async function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) { console.log(HELP); return; }
  const dryRun = argv.includes('--dry-run');
  const fileArgs = argv.filter((a) => !a.startsWith('-'));
  const files = fileArgs.length ? fileArgs.map((f) => resolve(ROOT, f)) : await listPosts();

  let posts = 0, saved = 0, failed = 0;
  for (const file of files) {
    const r = await localizePost(file, { dryRun });
    if (r.saved || r.failed) {
      console.log(`${basename(file)}: ${r.saved} saved, ${r.failed} failed`);
      posts++; saved += r.saved; failed += r.failed;
    }
  }
  console.log(
    `localize-blog-images: ${saved} image(s) localized across ${posts} post(s)` +
      (failed ? `, ${failed} failed (left as remote URLs)` : '') +
      (dryRun ? ' [dry-run — nothing written]' : ''),
  );
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main(process.argv.slice(2)).catch((err) => { console.error(err); process.exit(1); });
}
