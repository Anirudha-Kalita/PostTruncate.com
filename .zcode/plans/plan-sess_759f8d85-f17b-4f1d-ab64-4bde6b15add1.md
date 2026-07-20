# Plan: Fix Lighthouse Issues for posttruncate.com

## Scope

| Issue | Action | Why |
|---|---|---|
| Root URL redirect (`/` → `/en/character-counter/`) | **Skip** | Per your instruction |
| AdSense main-thread cost + 3 best-practices warnings | **Fix** (lazy-load) | Per your choice |
| Desktop CLS 0.154 on `.hero__lede` | **Fix** | |
| No `preconnect` to third-party origins | **Fix** | |
| Cache lifetimes (AdSense/Cloudflare scripts) | **Skip** | Third-party controlled |

**Expected impact:** Mobile perf 73 → ~85+, desktop perf 42 → ~70+, best-practices 58 → 100 (the 3 failing BP audits — deprecated APIs, third-party cookie, inspector issues — all originate from AdSense, which will no longer run during Lighthouse's measurement window). Desktop CLS 0.154 → ~0.

---

## Fix 1 — Lazy-load the AdSense loader

**File:** `src/layouts/Layout.astro` (lines 125–126)

**Problem:** The loader is `async` but eagerly fetched in `<head>` on every page. It pulls ~127 KB of `show_ads_impl_fy2021.js`, runs ~1.2s of script evaluation + 1.5s of style/layout on mobile, and is the source of all 3 deprecated-API warnings, the `test_cookie` third-party cookie, and the inspector-issues flag. Critically, **no actual ad units are wired up** (`src/components/Ad.astro` is a zero-CLS placeholder with a comment), so the site pays this cost for zero revenue.

**Fix:** Replace the eager `<script async src=...>` tag with an inline loader that injects the script on first user interaction or idle — **mirroring the exact pattern already in use for gtag at lines 134–164** (same events: `scroll`, `keydown`, `pointerdown`, `touchstart`; same `requestIdleCallback` + 3500ms fallback). This keeps the loader present (AdSense-TOS compliant for any future ad units) but moves it off the critical render path.

Replace lines 125–126:
```astro
    <!-- Google AdSense — loaded lazily on first interaction (or on idle as a
         fallback), mirroring the gtag pattern below. The loader is required
         on any page that renders an AdSense <ins> unit; gating it keeps the
         ~127KB show_ads_impl.js off the critical render path. The <Ad>
         component is currently a placeholder, so no ad calls are delayed. -->
    <script is:inline>
      (function () {
        var loaded = false;
        function loadAds() {
          if (loaded) return;
          loaded = true;
          var s = document.createElement('script');
          s.async = true;
          s.crossOrigin = 'anonymous';
          s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8097135701630154';
          document.head.appendChild(s);
        }
        ['scroll', 'keydown', 'pointerdown', 'touchstart'].forEach(function (e) {
          window.addEventListener(e, loadAds, { once: true, passive: true });
        });
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadAds, { timeout: 3500 });
        } else {
          setTimeout(loadAds, 3500);
        }
      })();
    </script>
```

**Note for future:** If real `<ins class="adsbygoogle">` units are wired into `Ad.astro` later, the `(adsbygoogle = []).push()` calls will queue safely until the loader fires — but ad slots should stay below the fold so the interaction trigger has fired by the time they're visible.

---

## Fix 2 — Add preconnect hints for third-party origins

**File:** `src/layouts/Layout.astro` (insert after line 123, right after the font preloads)

**Problem:** Lighthouse lists `pagead2.googlesyndication.com` and `www.googletagmanager.com` as preconnect candidates. No `<link rel="preconnect">` exists anywhere in the repo. Once AdSense/gtag are lazy-loaded (Fix 1), they fire on interaction — preconnect now means DNS+TLS+TCP is warm by then.

**Fix:** Add two preconnect links:
```astro
    {/* Preconnect to the third-party origins AdSense and gtag load from, so
        when they fire (on first interaction, see below) the DNS/TLS/TCP
        handshake is already done. crossorigin is required for cross-origin
        script fetches. */}
    <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin />
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
```

I'm intentionally **not** preconnecting to `googleads.g.doubleclick.net` — it's a secondary hop AdSense opens itself, and preconnecting to origins not used on every page wastes connections.

---

## Fix 3 — Reserve `.hero__lede` height to fix desktop CLS

**File:** `src/pages/[lang]/[slug]/index.astro` (CSS block, lines 639–654 — the `@media (min-width: 1024px)` desktop breakpoint)

**Problem:** Lighthouse flags `section.hero > p.hero__lede` with a layout-shift score of 0.154 on desktop. Root cause: the lede is a 276-character paragraph (`font-size: 18px; line-height: 28px; max-width: 600px`) with **no reserved height**. At ≥1024px the hero switches to a 2-column grid (`minmax(0, 1.08fr) minmax(0, 0.92fr)`), narrowing the lede's wrap width. Despite the site's font defenses (`font-display: optional` + a metric-matched 'Geist Fallback'), the residual Arial↔Geist glyph-width difference causes the lede to rewrap by a line when the real font lands, shifting everything below it. Mobile CLS is 0.000 because the single-column layout gives the lede a wider, more stable wrap width.

**Fix:** Add a `min-height` to `.hero__lede` **inside the existing desktop breakpoint** to reserve its expected height, pinning it against post-paint reflow. This matches the codebase's established pattern of explicit dimensions (`.hero__primary { height: 48px }`, `.ad__slot { height: var(--ad-h) }`).

In the `@media (min-width: 1024px)` block (around line 647), update the existing rule:
```css
    .hero__title,
    .hero__lede,
    .hero__badge {
      margin-inline: 0;
    }
    /* Reserve the lede's height at desktop widths to absorb the ±1-line
       rewrap that happens when Geist lands vs. the metric-matched Arial
       fallback. 7 lines × 28px = 196px matches the EN lede in the ~440px
       desktop track; bump if longer translations rewrap further. */
    .hero__lede {
      min-height: 196px;
    }
```

**Why not also fix the font fallback metrics:** The `size-adjust: 105.7982%` on 'Geist Fallback' (`global.css` lines 74–81) is already tuned; further adjustment is fiddly and locale-dependent. `min-height` is the reliable pin. If post-fix CLS is still nonzero, the fallback `size-adjust` is the next lever — noted but not in scope.

---

## Verification

1. **Build:** `npm run build` — confirm the post-build CSS-inlining and modulepreload scripts still run clean (they parse `<head>`, so the changed script/preconnect markup must not break `scripts/inline-critical-css.mjs` or `scripts/inject-modulepreload.mjs`).
2. **Re-run Lighthouse** (same commands as the audit) for mobile + desktop:
   - `npx lighthouse https://posttruncate.com --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --only-categories=performance,best-practices --output=json --output-path=/tmp/lh/mobile.json`
   - `npx lighthouse https://posttruncate.com --form-factor=desktop --screenEmulation.mobile=false --throttling-method=simulate --only-categories=performance,best-practices --output=json --output-path=/tmp/lh/desktop.json`
   - **Expect:** best-practices → 100 (deprecations/cookie/inspector all gone since AdSense doesn't run during measurement); desktop CLS → ~0; TBT/main-thread noticeably lower.
3. **Visual check:** Open the home page at ≥1280px desktop width — confirm the hero lede has no visible empty gap below it (196px reservation should match the real 7-line height). Check a long-translation locale (e.g. `/de/zeichenketten-pruefer/`) to confirm the min-height doesn't clip or leave a large gap; bump the value if needed.
4. **Smoke-test analytics:** After deploy, confirm GA4 still receives events (the gtag block is untouched, so this should be unaffected) and that AdSense still loads on scroll/click (DevTools → Network → filter `adsbygoogle`).

## Files touched
- `src/layouts/Layout.astro` — Fixes 1 & 2
- `src/pages/[lang]/[slug]/index.astro` — Fix 3 (CSS only)

No new dependencies. No changes to `Ad.astro`, `global.css`, build scripts, or deployment config.