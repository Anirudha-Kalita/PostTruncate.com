# PostTruncate.com — Claude Context

Live site: https://posttruncate.com
Browser-only social media post analyzer (LinkedIn, X/Twitter, Threads, Instagram/Facebook, SMS).
No backend — all analysis logic must remain client-side or static. The ONE
exception is `src/pages/api/improve.ts` (the Gemini-backed "AI Improve" rewrite):
a single SSR route on the Cloudflare Worker that keeps the API key server-side
and rate-limits via KV. Do not add other server routes without good reason.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5.18.2 (SSG + Cloudflare Workers SSR) |
| UI/Islands | Preact 10.29.2 (`client:load` islands) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config in `global.css`) |
| Fonts | Geist Variable + Geist Mono Variable (Fontsource) |
| Deployment | Cloudflare Workers (`@astrojs/cloudflare` v12, pinned) |
| i18n | Custom system — 10 locales (en, es, de, fr, pt, it, nl, ja, zh, da) |
| TypeScript | Strict mode; JSX → Preact (`jsxImportSource: "preact"`) |
| Node | >=22.12.0 required |

## Directory Structure

```
src/
  components/
    island/           # Interactive Preact islands (client-side)
      Dashboard.tsx   # Root island; owns editor state, debounced analysis (80ms)
      Workspace.tsx   # Textarea + live counters + text formatting actions
      ui.tsx          # Shared primitives: Badge, Meter, Card, Stat
      *Preview.tsx    # Per-platform preview cards (LinkedIn, Twitter, Threads, Meta, Sms)
      KeywordMonitor.tsx / MetaMonitor.tsx
    Layout.astro / Nav.astro / Footer.astro / Ad.astro
  pages/
    index.astro       # Redirects to /en/
    [lang]/           # index.astro (mounts Dashboard) + about/contact/privacy/terms
  i18n/
    config.ts         # Locale registry — single source of truth
    types.ts          # Translations + IslandStrings TypeScript interfaces
    en.ts             # Canonical English dictionary; add new strings here first
    *.ts              # Other locales — must satisfy Translations interface
  lib/
    textTools.ts      # Core text engine (~850 lines); pure, DOM-free functions
  layouts/
    Layout.astro      # Master <head>: SEO, hreflang, GA, JSON-LD
  styles/
    global.css        # Tailwind @theme tokens (colors, fonts, spacing, radius, shadows)
public/               # favicon, webmanifest, flag SVGs, og.webp
DESIGN.md             # Design system spec — read before touching styles
```

## Key Conventions

- **Astro** (`.astro`) = static/server; **Preact** (`.tsx` in `island/`) = interactive client-side
- Tailwind v4 CSS-first — tokens in `global.css`. **No arbitrary values.** Dark mode via token-swap.
- All platform logic in `textTools.ts` — keep functions pure and DOM-free
- `en.ts` is canonical for i18n — add strings there first, propagate to other locales
- Editor draft persists to `sessionStorage` (Dashboard.tsx)
- Before changing any visual style, read `DESIGN.md`

## Testing

Layered pipeline — **run the cheapest layer that covers the change; escalate only when needed.** Do NOT default to browser screenshots for feature verification.

| Layer | Command | Use it for | Speed |
|---|---|---|---|
| 0. Static | `npm run test:fast` | Typecheck (`astro check`) + lint. Catches most breakage. | ~seconds |
| 1. Unit (Vitest) | `npm run test:unit` | Pure logic in `textTools.ts` (truncation, SMS GSM-7 segmentation, counts, hook/CTA/fold analysis). No browser. | ~ms |
| 2. Component (Container API) | `npm run test:component` | Astro `.astro` render-to-string assertions (Nav, Footer, cards). No browser. | fast |
| 3. Browser (Vitest Browser Mode) | `npm run test:browser` | Preact **islands** that need a real browser — `Dashboard.tsx`, `Workspace.tsx`, `*Preview.tsx`, platform selector, live counters. Real CSS/ResizeObserver. | fast-ish |
| 4. E2E (Playwright) | `npm run test:e2e` | 1–2 critical user flows only. Run before deploys, not per-feature. | slow |

### Testing conventions

- **`textTools.ts` is the priority test target** — it's pure and DOM-free, so it belongs entirely in Layer 1 (Vitest unit). Every change to truncation, segmentation, or analysis logic must have/keep a unit test.
- Preact islands need a **real browser** (Tailwind v4 tokens, CSS custom properties, `ResizeObserver`) — test them in Layer 3, not JSDOM, which renders these incorrectly.
- Vitest config uses Astro's `getViteConfig()` helper so it picks up project settings. Browser Mode uses `vitest-browser-astro` + `@vitest/browser-playwright`, headless Chromium, shared context (requires Vitest 4.x).
- Playwright E2E must include a console-listener fixture that **fails on Astro/Preact hydration-mismatch warnings** (islands hydrate `client:load`).
- Keep tests co-located or under a `tests/` dir mirroring `src/`; name browser tests `*.browser.test.ts`.

### Which layer after which change

- Edited `textTools.ts` or i18n strings → `test:fast` + `test:unit`.
- Edited a Preact island / preview / selector / live UI → also `test:browser`.
- Structural/route change or pre-deploy → `test:e2e`.

## Constraints

- **NEVER run `git commit`, `git push`, or any git write/push command**
- No backend except `api/improve.ts`; GA ID hardcoded in `layouts/Layout.astro`. The only server secret/env is `GEMINI_API_KEY` (Worker secret + `.dev.vars` locally) plus the `AI_RATELIMIT` KV binding in `wrangler.jsonc`.
- Node >=22.12.0 — do not downgrade dependencies
- `@astrojs/cloudflare` is pinned to an exact **v12** (Astro 5). Worker bindings (secrets + KV) are read via `context.locals.runtime.env` — see `getBindings` in `api/improve.ts`. Do NOT bump the adapter to v13 / Astro 6 casually: v13 removes `locals.runtime` and requires `import { env } from 'cloudflare:workers'` instead, which would break `improve.ts` (and any middleware) until migrated.

### After any file edits

- After modifying source files, run `npx astro sync` to regenerate `.astro` types — especially for component, config, or content changes.
- **For content collection / config / i18n changes that produce stale-cache errors, `astro sync` alone is NOT sufficient** — it does not regenerate a corrupted `.astro` cache. The correct recovery is `npm run clean && npx astro sync` (delete the cache FIRST, then sync). `npm run fresh` does this and boots the dev server in one command.
- After modifying source files, run `npm run test:fast` (typecheck + lint) before considering the change done. Escalate to `test:unit` / `test:browser` per the Testing table above based on what was touched. Do not jump straight to browser screenshots.

## Dev Server & Screenshots

When taking screenshots to verify UI changes, follow this exact procedure. Do not improvise around it.

### Preferred: screenshot the production build (most stable)
Use this whenever you only need to verify appearance (no HMR needed):

1. `lsof -ti:4321 | xargs kill -9 2>/dev/null || true`
2. `npm run build` — fix any build errors before proceeding.
3. `npm run preview > /tmp/preview.log 2>&1 &`
4. `npx wait-on http://localhost:4321 -t 30000`
5. Take the screenshot.

The preview build does no Vite dep optimization, no HMR, and no mid-compile reloads, so it avoids black screens and the `optimizeDeps` re-bundling that kills in-flight requests.

### Fallback: dev server (only if you genuinely need HMR)
1. `lsof -ti:4321 | xargs kill -9 2>/dev/null || true` — always clear the port first; never assume a previous server is still up or already gone.
2. `npm run dev > /tmp/dev.log 2>&1 &` — always detached with logs, never foreground.
3. `npx wait-on http://localhost:4321 -t 30000` — wait for readiness; never use a fixed `sleep`.
4. Warm-up hit so Vite finishes optimizing deps before the real screenshot:
   `curl -s http://localhost:4321/the-island-page > /dev/null && sleep 1`
   (Replace with whichever page has the Preact island being tested.)
5. Take the screenshot.

### If you get a black screen or a failed/killed request
- `cat /tmp/dev.log` (or `/tmp/preview.log`) and look for Vite/Astro compile errors or an `optimizeDeps` re-bundle line before retrying.
- If the log shows dependency re-optimization fired (e.g. `preact/devtools` → reload), it settled after that reload — just retry the screenshot once. Do not restart the server.

### Rules
- One server at a time. Kill the port before every start.
- Never start the dev server in the foreground (it blocks the session).
- Never `sleep` and hope; always `wait-on` the actual URL.
- Don't assume a backgrounded server is still running across tool calls — verify via the log file.

### Config to prevent mid-session re-optimization
Ensure these are set in `astro.config.mjs` so deps are bundled at startup, not discovered lazily:

```js
vite: {
  optimizeDeps: {
    include: ['preact', 'preact/hooks', 'preact/devtools', 'preact/compat', 'preact/jsx-runtime'],
  },
},
```