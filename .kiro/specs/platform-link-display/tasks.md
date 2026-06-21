# Implementation Plan: Platform Link Display

## Overview

This plan delivers platform-specific link-display behavior to both PostTruncate silos (counter tools
and ad simulators) as a strictly additive, one-platform-at-a-time rollout. Every task is a small,
independently verifiable increment that leaves the site fully working and the existing
`src/lib/*.test.ts` suites passing without modification.

The ordering follows the design's "incremental rollout contract":

1. Pure data config first (`src/data/linkBehavior.ts`) — no behavior change.
2. Config coverage validation + tests.
3. Additive `Text_Engine` functions + property tests.
4. Additive `Ad_Truncation_Engine` functions + property tests (existing `adTruncation.test.ts` stays untouched).
5. i18n keys, resolver, and tests.
6. Pure link-indication selection function + tests.
7. Wire the counter island one display-model group at a time (only when a URL is detected).
8. Wire the ad simulators one platform at a time.
9. Final regression pass (full lib suite unmodified, typecheck, i18n parity, production build).

Verification commands used throughout:

- Lib tests: `npm run test:lib`
- Typecheck: `npm run typecheck`
- i18n parity: `npm run lint` (runs `scripts/check-i18n.mjs`)
- Production build: `npm run build`

> Run all test/build commands with `--run`-style single execution (the npm scripts above are already
> single-shot, not watch mode). Never start a watch/dev server as part of a task.

## Tasks

- [x] 1. Project setup and link-behavior configuration data module
  - [x] 1.1 Add `fast-check` as a devDependency
    - Add `fast-check` to `package.json` `devDependencies` with a pinned version and run `npm install`
    - Confirm `node:test` + `node:assert/strict` remain the runner (no test script changes needed; `test:lib` already globs `src/lib/**/*.test.ts`)
    - No application behavior change; existing suites must still pass after install
    - _Requirements: 13.3_
  - [x] 1.2 Create `src/data/linkBehavior.ts` (types + records)
    - Define `LinkDisplayModel`, `LinkCountMode`, `OrganicLinkBehavior`, `AdLinkBehavior`, `LinkBehaviorRecord` exactly as in design §Components 1
    - Populate `LINK_BEHAVIOR: Record<string, LinkBehaviorRecord>` for every platform in the design table: `twitter` (counted-shortened/fixed-weight 23), `linkedin`, `instagram` (plain-text, bio 5, Meta ad), `facebook` (preview-card, Meta ad), `tiktok` (plain-text, bio 1, ad), `threads` (preview-card, bio 5), `youtube` (plain-text), `pinterest` (clickable-inline), `reddit` (clickable-inline), `bluesky` (preview-card, per-byte, `byteIndexedFacets`), `discord`, `whatsapp`, and `google` (ad, displayPath)
    - Set `twitter.organic.fixedLinkWeight` from `LIMITS.URL_WEIGHT` (re-export/import the constant so the two never diverge); record `lastReviewed` (ISO `YYYY-MM-DD`) and optional `source` on every record
    - Pure data module only — no imports from the engines (one-way dependency)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 13.4, 15.1, 15.2_
  - [x] 1.3 Verify config module compiles cleanly
    - Run `npm run typecheck`; confirm no errors and no change to existing behavior
    - _Requirements: 13.1, 13.2_

- [x] 2. Config coverage validation and config tests
  - [x] 2.1 Add `validateLinkBehaviorCoverage` to `src/data/linkBehavior.ts`
    - Implement `CoverageResult` and `validateLinkBehaviorCoverage(counterPlatforms, adPlatforms)` as a pure function returning `missingOrganic` / `missingAd` lists (design §Components 1)
    - Export an `adLinkBehavior(platform)` and confirm `organicLinkBehavior` lookup contract (returns `undefined` for unconfigured ids) is satisfiable from this module
    - _Requirements: 1.6_
  - [x]* 2.2 Write and run `src/data/linkBehavior.test.ts`
    - **Property 1: Config coverage and shape** — _Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.6_
    - **Property 16: lastReviewed ISO date** — _Validates: Requirements 15.1_
    - Drive coverage from real lists: `PLATFORM_COUNTERS` keys + preview-island counters (`twitter`, `linkedin`, `instagram`, `facebook`, `threads`) and `AD_PLATFORM_CONFIG` keys; assert a missing record reports the offending platform id
    - Add example/table tests for model classification (Requirements 2.1–2.5, 4.3, 7.3) and engine-reads-config (`LINK_BEHAVIOR.twitter.organic.fixedLinkWeight === LIMITS.URL_WEIGHT`, Requirement 1.5)
    - Run `npm run test:lib`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 4.3, 7.3, 15.1_

- [x] 3. Text_Engine additive functions and property tests
  - [x] 3.1 Add new exports to `src/lib/textTools.ts`
    - Implement `organicLinkBehavior(platform)`, `platformLength(text, platform)`, `blueskyLinkFacets(text)` returning `LinkFacet[]`, and `utf8ByteLength(text)` per design §Components 2
    - `platformLength`: `fixed-weight` delegates to existing `weightedLength` (X parity); `per-char` uses standard grapheme/weight counting with NO fixed link collapse; `per-byte` returns UTF-8 byte length; unknown platform falls back to standard per-grapheme count (never throws)
    - `blueskyLinkFacets` maps each `detectUrls` match's code-unit `start`/`end` to UTF-8 byte offsets via `TextEncoder`, never re-implementing detection
    - Do NOT alter signatures or results of `detectUrls`, `weightedLength`, `charCount`, `byteCounts`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.2, 5.3, 6.1, 6.2, 6.5, 7.2_
  - [x]* 3.2 Write and run `src/lib/textTools.linkDisplay.test.ts` (fast-check, min 100 runs each)
    - **Property 2: Counted-shortened fixed-weight counting (X/Twitter preserved)** — assert `platformLength(text,'twitter') === weightedLength(text)` (X/Twitter parity) — _Validates: Requirements 3.1, 3.3, 13.1_
    - **Property 3: Per-character counting for non-shortened platforms** — _Validates: Requirements 4.2, 5.3, 7.2_
    - **Property 4: Bluesky byte-length counting** — `platformLength(text,'bluesky') === byteCounts(text).utf8` — _Validates: Requirements 6.1, 6.5_
    - **Property 5: Bluesky facet byte-offset invariant** — `0 <= byteStart <= byteEnd <= utf8ByteLength(text)` — _Validates: Requirements 6.2, 6.3_
    - **Property 6: Bluesky facet round-trip** — UTF-8 slice `[byteStart, byteEnd)` decodes back to the detected `url` — _Validates: Requirements 6.2, 6.4_
    - **Property 7: Preview-card first-URL identification** — first preview URL equals `detectUrls(text)[0]` — _Validates: Requirements 5.2_
    - Use generators with emoji/ZWJ/CJK/astral characters and injected URLs; tag each test `// Feature: platform-link-display, Property N`
    - Run `npm run test:lib`; confirm the existing `textTools`/`byteCounts`/`emojiCount` suites still pass unmodified
    - _Requirements: 3.1, 3.3, 4.2, 5.2, 5.3, 6.1, 6.2, 6.3, 6.4, 6.5, 7.2, 13.1_

- [x] 4. Ad_Truncation_Engine additive functions and property tests
  - [x] 4.1 Add new exports to `src/lib/adTruncation.ts`
    - Implement `clampDisplayLink(text, platform)`, `deriveDisplayLink(destinationUrl)`, `clampDisplayPath(segments, platform)`, `buildDisplayUrl(destinationUrl, segments, platform)`, `resolveCta(platform, requested?)` per design §Components 3
    - Use the existing grapheme-safe `sliceChars`/`splitGraphemes` for all clamping; `displayLinkMaxChars === 0` returns `{ text: '', truncated: true }`; `deriveDisplayLink` returns domain only and returns trimmed input on unparseable URL (no throw)
    - Do NOT alter `truncateFacebookPrimary`, `truncateTikTokPrimary`, `clampGoogleField`, `instagramReelsFit`, `googleHeadlineFits`
    - _Requirements: 9.3, 9.4, 10.1, 10.2, 10.3, 12.1, 12.2, 12.3, 12.4_
  - [x]* 4.2 Write and run `src/lib/adTruncation.linkDisplay.test.ts` (fast-check, min 100 runs each)
    - **Property 10: Display-link derivation from destination domain** — _Validates: Requirements 9.3_
    - **Property 11: CTA resolution membership** — _Validates: Requirements 9.4_
    - **Property 12: Google display-URL composition** — _Validates: Requirements 10.1_
    - **Property 13: Display-path clamping** (≤2 segments, ≤15 chars each, no empty/whitespace) — _Validates: Requirements 10.2, 10.3, 12.4_
    - **Property 14: Display-link cap clamping** — _Validates: Requirements 12.1_
    - **Property 15: Grapheme-safe clamping** (emoji/ZWJ/combining never split) — _Validates: Requirements 12.3_
    - Add example tests: `buildDisplayUrl(url, [])` equals domain alone (Requirement 10.4); cap-0 platform yields empty clamp (Requirement 12.2)
    - Create this as a NEW file; leave `src/lib/adTruncation.test.ts` completely unmodified. Run `npm run test:lib`
    - _Requirements: 9.3, 9.4, 10.1, 10.2, 10.3, 10.4, 12.1, 12.2, 12.3, 12.4_

- [x] 5. Internationalization keys, resolver, and tests
  - [x] 5.1 Add `linkDisplay` keys to `src/i18n/types.ts` and all 10 locales
    - Add a `linkDisplay` sub-object to `IslandStrings` in `src/i18n/types.ts` declaring every new key (plainText, previewCard, clickableInline, countedShortened, bio-link allowance, ad display-link/path/CTA, TikTok no-clickable-link) so a missing key is a TypeScript error
    - Add the canonical English block in `src/i18n/en.ts` and translated values in `es, de, fr, pt, it, nl, ja, zh, da`
    - _Requirements: 14.1, 14.2, 14.5_
  - [x] 5.2 Add `linkDisplayStrings` resolver
    - Create `src/i18n/linkDisplayStrings.ts` mirroring `adPreviewStrings`: return the locale value, fall back to canonical English, and when even English is absent return the key identifier (never empty content)
    - _Requirements: 14.1, 14.3, 14.4_
  - [x]* 5.3 Write and run `src/i18n/linkDisplayStrings.test.ts`
    - **Property 17: i18n en-fallback resolution** (fast-check, min 100 runs) — _Validates: Requirements 14.3_
    - Add example test: both locale and en value absent returns the key identifier (Requirement 14.4)
    - Place the test under `src/lib/` or ensure it matches the `src/lib/**/*.test.ts` glob, or run it explicitly with `node --test`; prefer co-locating logic so `npm run test:lib` picks it up
    - _Requirements: 14.3, 14.4_
  - [x] 5.4 Verify i18n parity and types
    - Run `npm run lint` (check-i18n.mjs parity across 10 locales) and `npm run typecheck`
    - _Requirements: 14.2, 14.5_

- [x] 6. Pure link-indication selection function
  - [x] 6.1 Create `src/lib/linkIndication.ts`
    - Implement a pure `selectLinkIndication(platform, text)` that returns `"none"` when no URL is detected and otherwise the key mapped from the platform's `model` (`plain-text → plainText`, `preview-card → previewCard`, `clickable-inline → clickableInline`, `counted-shortened → countedShortened`)
    - Add a pure TikTok ad-caption selector that returns the "no clickable link" indication when the caption contains a URL, `@` mention, or `#` hashtag
    - Derive all facts solely from `LINK_BEHAVIOR` so displayed facts always match stored config
    - _Requirements: 4.1, 5.1, 7.1, 8.1, 8.2, 8.3, 11.1, 15.3_
  - [x]* 6.2 Write and run `src/lib/linkIndication.test.ts` (fast-check, min 100 runs each)
    - **Property 8: Link-display indication selection** — _Validates: Requirements 4.1, 5.1, 7.1, 8.1, 8.2, 8.3, 15.3_
    - **Property 9: TikTok ad caption non-clickable indication** — _Validates: Requirements 11.1_
    - Run `npm run test:lib`
    - _Requirements: 4.1, 5.1, 7.1, 8.1, 8.2, 8.3, 11.1, 15.3_

- [x] 7. Checkpoint - engines, config, and i18n complete
  - Ensure all tests pass (`npm run test:lib`), `npm run typecheck` and `npm run lint` are green, and ask the user if questions arise before wiring any island.

- [x] 8. Wire counter island (`src/components/island/PlatformCounter.tsx`), one display-model group at a time
  - [x] 8.1 Surface plain-text indications (Instagram, TikTok, YouTube Shorts)
    - Look up `organicLinkBehavior(platform)`; run `detectUrls` on the body; ONLY when a URL is detected render the localized `plainText` indication via `linkDisplayStrings`, plus the bio-link allowance line where set; use `platformLength` for per-char counting
    - When no URL is present, render exactly as today (no link indication, unchanged counters)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 8.1, 8.2, 8.3, 8.4_
  - [x] 8.2 Surface preview-card indications (Facebook, LinkedIn, Threads, Discord, WhatsApp)
    - Only-when-URL render the localized `previewCard` indication; when `cardFromFirstUrlOnly`, identify the first detected URL as the card source; per-char counting via `platformLength`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 8.1, 8.2, 8.3, 8.4_
  - [x] 8.3 Surface clickable-inline indications (Reddit, Pinterest)
    - Only-when-URL render the localized `clickableInline` indication, plus bio-link allowance where set
    - _Requirements: 7.1, 7.2, 7.3, 8.1, 8.2, 8.3, 8.4_
  - [x] 8.4 Wire Bluesky byte counting and facets
    - Measure the Bluesky body against the 300-unit limit using `platformLength(text,'bluesky')` (UTF-8 bytes); only-when-URL render the preview-card indication; surface/compute facets via `blueskyLinkFacets`
    - _Requirements: 6.1, 6.5, 8.1, 8.3_
  - [x] 8.5 Verify counter island increments
    - Run `npm run typecheck` and `npm run build`; confirm un-wired platforms and URL-free bodies render exactly as before
    - _Requirements: 8.4, 13.1_

- [x] 9. Wire ad simulators (`src/components/island/AdSimulator.tsx` + per-platform islands), one platform at a time
  - [x] 9.1 Facebook display link + CTA (`FacebookFeedAd.tsx`)
    - In `AdSimulator`, read the platform `ad` record and conditionally add `displayLink`/CTA controls; render a Display_Link region distinct from the destination using the provided link or `deriveDisplayLink(domain)`; render a CTA_Button from `resolveCta`/`ctaLabels`; keep `truncateFacebookPrimary` behavior unchanged
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 12.1, 12.2_
  - [x] 9.2 Instagram display link + CTA (`InstagramAd.tsx`)
    - Same Meta display-link/CTA treatment via `AdSimulator`; clamp the display link with `clampDisplayLink`; disable the region when `displayLinkMaxChars === 0`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 12.1, 12.2_
  - [x] 9.3 Google RSA display URL and path (`GoogleRsaPreview.tsx`)
    - Build the green display URL with `buildDisplayUrl` (domain + up to two clamped, non-empty path segments); show domain alone when no segment provided; keep RSA headline/description caps and `googleHeadlineFits` unchanged
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 12.4_
  - [x] 9.4 TikTok non-clickable caption + CTA (`TikTokAd.tsx`)
    - When the caption contains a URL/`@`/`#`, show the "no clickable link" indication and render the CTA button as the click carrier; keep `truncateTikTokPrimary` unchanged
    - _Requirements: 11.1, 11.2, 11.3_
  - [x] 9.5 Verify ad simulator increments
    - Run `npm run typecheck` and `npm run build`
    - _Requirements: 13.1, 13.4_

- [x] 10. Final regression checkpoint
  - [x] 10.1 Run the full lib test suite unmodified
    - `npm run test:lib`; confirm existing assertions for `detectUrls`, `weightedLength`, `charCount`, `byteCounts`, `truncateFacebookPrimary`, `truncateTikTokPrimary`, `clampGoogleField`, `instagramReelsFit`, `googleHeadlineFits` pass without edits
    - _Requirements: 13.1, 13.2, 13.3_
  - [x] 10.2 Typecheck the whole project
    - `npm run typecheck`
    - _Requirements: 14.2_
  - [x] 10.3 Verify i18n parity
    - `npm run lint` (check-i18n.mjs across all 10 locales)
    - _Requirements: 14.5_
  - [x] 10.4 Production build
    - `npm run build`; confirm a clean production build
    - _Requirements: 13.4_

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP; core implementation sub-tasks are never optional.
- Every task references the specific requirements it satisfies for traceability.
- The rollout is additive and incremental: each task leaves the site fully working and all existing `src/lib/*.test.ts` suites passing without modification.
- Property tests use `fast-check` with a minimum of 100 runs per property and are tagged `// Feature: platform-link-display, Property N`.
- `src/lib/adTruncation.test.ts` and the other existing lib suites must remain unmodified (Requirement 13.3).

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "2.1", "3.1", "4.1", "5.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2", "5.2", "6.1"] },
    { "id": 3, "tasks": ["5.3", "6.2", "8.1", "9.1"] },
    { "id": 4, "tasks": ["5.4", "8.2", "9.2"] },
    { "id": 5, "tasks": ["8.3", "9.3"] },
    { "id": 6, "tasks": ["8.4", "9.4"] },
    { "id": 7, "tasks": ["8.5", "9.5"] },
    { "id": 8, "tasks": ["10.1", "10.2", "10.3", "10.4"] }
  ]
}
```
