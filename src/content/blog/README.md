# Blog content collection

One Markdown file = one language's version of one post.
Folder name **is** the locale. Schema lives in `src/content.config.ts`.

```
src/content/blog/
  en/<english-slug>.md          ← write English first
  de/<german-slug>.md           ← add translations later (same translationKey)
  …
```

URL produced: `/{locale}/blog/{slug}/` (e.g. `/en/blog/twitter-character-limit-guide/`).
A locale with no files here produces **no** blog pages — that's intentional (English-first).

## Frontmatter

```yaml
---
title: "Twitter (X) Character Limit: The Complete Guide"   # ≤70 chars, SERP title
description: "How the 280-character limit works, links, threads, and tips."  # ≤180
subtitle: "The deck shown under the title in the article."  # optional, ≤200
publishDate: 2026-06-09
updatedDate: 2026-06-20        # optional — omit until actually revised
locale: en                     # MUST match the folder
slug: twitter-character-limit-guide   # kebab-case; becomes the URL segment
translationKey: twitter-limit-guide   # SAME value across all translations (hreflang)
relatedPlatform: twitter       # optional: twitter|instagram|linkedin|facebook|sms|threads|general
author: PostTruncate Team
draft: false                   # true = hidden from production build
ogImage: /og/twitter-limit.png # optional; falls back to /og.webp
---

Markdown body…
```

> The loader pattern is `*/*.md` (exactly `<locale>/<slug>.md`, one level deep),
> so this root-level README is never matched as a post. Keep posts flat inside
> their locale folder — the URL slug comes from frontmatter, not the path.

---

## Editing via the CMS (Sveltia) — runbook

The blog is editable through a no-code admin UI. You don't need a local checkout.

### Log in
1. Go to **https://posttruncate.com/admin/** (or `/admin/` on a preview deploy).
2. Click **Login with GitHub**. A popup opens the auth Worker
   (`posttruncate-cms-auth…workers.dev`) → GitHub's consent screen.
3. Approve. The popup closes and you land in the editor. You must have push
   access to `Anirudha-Kalita/PostTruncate.com`.

### Create a post
1. **Blog → New Post**.
2. Fill **Title**, **Slug** (lowercase-kebab — becomes the URL `/en/blog/<slug>/`),
   **Publish date**, **Author**, **Body**. `Locale` and `Translation key` are
   auto-filled — leave them.
3. Optional: pick a **Related platform** (adds a link to that tool page) and a
   **Social image**.
4. **Save** → **Publish**. This commits `src/content/blog/en/<slug>.md` to `main`.

### Add an image or a video
- **Image:** in the Body toolbar, use the image button → upload or pick from the
  media library. Files land in `public/og/` and are referenced as `/og/<file>`.
- **Video:** paste a **YouTube or Vimeo URL on its own line** in the body. The
  build turns it into a responsive, lazy-loaded iframe — do **not** paste embed
  code or upload video files.

### Edit a post
Open it under **Blog**, change fields/body, **Save → Publish**. The same file is
updated on `main`.

### Delete a post
Open the entry → **Delete** (trash/⋯ menu). The `.md` file is removed from `main`
and the post drops off `/en/blog/` on the next build.

### Publish delay
Every Save→Publish commits to `main`, which triggers a Cloudflare build. Changes
go live in roughly **1–2 minutes** — refresh after that. If you don't see a
change, confirm the build finished in the Cloudflare dashboard.

> **Drafts:** the `Draft` toggle (frontmatter `draft: true`) hides a post from
> the **production** build while keeping the file in the repo. It's separate from
> the publish step above.

---

## Importing existing `.md` files (local tools)

Two helpers for bringing raw Markdown into the collection. Both run **locally**
and never deploy — they only prepare/validate files; you still commit via git or
the CMS afterwards.

### Single file — uploader at `/admin/upload/`

A client-side page (best in Chrome/Edge — it uses the File System Access API).
Run `npm run dev`, open <http://localhost:4321/admin/upload/> (also served at
`https://posttruncate.com/admin/upload/`, noindex):

1. **Choose folder** → point it at `src/content/blog/en/` (authorized once,
   remembered across reloads).
2. **Drop a `.md`** → it validates the required frontmatter against the schema,
   shows a **live preview**, and offers **Auto-fix** to fill missing fields
   (slug from filename, date→today, `locale: en`, `draft: true`, …).
3. **Save to folder** writes `<slug>.md` straight into the folder (or
   **Download .md** on browsers without the API).

Then run `npx astro sync` and build, and commit the file.

### A whole folder — `scripts/normalize-blog-md.mjs`

For batch-importing many raw files at once:

```bash
node scripts/normalize-blog-md.mjs <inputDir> [outputDir]
```

It rewrites each file's frontmatter to match the schema (same defaults as the
uploader), preserves the body, and writes the results to a **separate** output
folder for review — it never touches `src/content/blog/`. Copy the ones you want
into `src/content/blog/en/`, then `npx astro sync` + build + commit.
