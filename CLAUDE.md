# PostTruncate.com — Claude Context

Live site: https://posttruncate.com
Browser-only social media post analyzer (LinkedIn, X/Twitter, Threads, Instagram/Facebook, SMS).
No backend — all logic must remain client-side or static.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6.4.3 (SSG + Cloudflare Workers SSR) |
| UI/Islands | Preact 10.29.2 (`client:load` islands) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config in `global.css`) |
| Fonts | Geist Variable + Geist Mono Variable (Fontsource) |
| Deployment | Cloudflare Workers (`@astrojs/cloudflare` adapter) |
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
public/               # favicon, webmanifest, flag SVGs, og.png
DESIGN.md             # Design system spec — read before touching styles
```

## Key Conventions

- **Astro** (`.astro`) = static/server; **Preact** (`.tsx` in `island/`) = interactive client-side
- Tailwind v4 CSS-first — tokens in `global.css`. **No arbitrary values.** Dark mode via token-swap.
- All platform logic in `textTools.ts` — keep functions pure and DOM-free
- `en.ts` is canonical for i18n — add strings there first, propagate to other locales
- Editor draft persists to `sessionStorage` (Dashboard.tsx)
- Before changing any visual style, read `DESIGN.md`

## Constraints

- **NEVER run `git commit`, `git push`, or any git write/push command**
- No backend; no environment variables (GA ID hardcoded in `layouts/Layout.astro`)
- Node >=22.12.0 — do not downgrade dependencies