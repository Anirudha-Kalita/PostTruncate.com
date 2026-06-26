# Implementation Plan: Facebook Ad Formats (Reels + Carousel)

## Overview

This plan implements the Facebook Format_Selector and the two new previews (Reels,
Carousel) additively, exactly as the design specifies. Work flows from the single
source of truth outward: first the config caps and interface fields, then the pure,
DOM-free helpers in `adTruncation.ts` with their fast-check property tests, then the
share-codec extension with its property tests, then i18n keys, then the two new
presentational components, then the `AdSimulator` wiring that consumes all of it.
Pure helpers and their property tests are sequenced before any UI that depends on
them, so each step builds on the last with no orphaned code. The existing
`FacebookFeedAd` path is left byte-for-byte unchanged (Req 1.4).

Conventions: Astro + Preact islands (`/** @jsxImportSource preact */`), Tailwind
utilities, `node:test` + `fast-check` for tests, English-canonical i18n with
en-fallback. Tests are run with the project's single-run command
`npm run test:lib` (Windows/cmd, not watch mode).

## Tasks

- [x] 1. Extend Facebook config caps and interface (single source of truth)
  - [x] 1.1 Add Reels/Carousel caps and interface fields to Ad_Config
    - In `src/data/adPlatformConfig.ts`, add `reelsPrimaryTruncateChars` to the
      Facebook record and a nested `carousel` object with `minCards`, `maxCards`,
      `cardHeadlineMax`, `cardDescriptionMax`.
    - Extend the `FacebookPlatformConfig` interface with the matching fields
      (`reelsPrimaryTruncateChars: number` and a `carousel` sub-shape) so any
      component referencing an absent limit fails at type-check.
    - Keep all existing Facebook fields (`primaryTruncateChars`, `seeMoreLabel`,
      `reelsSafeZone`, etc.) untouched.
    - _Requirements: 4.1, 5.1, 7.1, 13.1, 13.3, 13.5_

- [x] 2. Add pure truncation/clamp/reducer/badge helpers in `adTruncation.ts`
  - [x] 2.1 Implement Reels caption and carousel field helpers
    - In `src/lib/adTruncation.ts`, add `truncateFacebookReelsPrimary(text)`
      returning the existing `FieldTruncation` contract, reading the Reels cutoff
      from `AD_PLATFORM_CONFIG.facebook.reelsPrimaryTruncateChars` and the
      `seeMoreLabel`, slicing grapheme-safely via `textTools.sliceChars`; empty
      input yields `{ text:'', truncated:false }`.
    - Add a shared internal `clampField(text, cap)` plus `clampCarouselHeadline`
      and `clampCarouselDescription` wrappers that hard-clamp grapheme-safely to
      the card caps with **no** See More label appended.
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 7.2, 7.3, 7.4, 7.5, 7.8, 13.2, 13.4_

  - [x]* 2.2 Write property test for Reels caption truncation
    - In `src/lib/adTruncation.facebookFormats.test.ts` (fast-check, ≥100 iters,
      `Intl.Segmenter` grapheme oracle, unicode-heavy generators).
    - **Property 1: Reels primary truncation**
    - Tag: `// Feature: facebook-ad-formats, Property 1: Reels primary truncation`
    - **Validates: Requirements 4.2, 4.3, 4.4, 4.5**

  - [x]* 2.3 Write property test for carousel card-field clamp
    - **Property 2: Carousel card-field clamp** (both `clampCarouselHeadline` and
      `clampCarouselDescription`, no affordance, whole-grapheme prefix).
    - Tag: `// Feature: facebook-ad-formats, Property 2: Carousel card-field clamp`
    - **Validates: Requirements 7.2, 7.3, 7.4, 7.5, 7.8**

  - [x]* 2.4 Write property test for carousel shared-primary truncation
    - **Property 3: Carousel shared-primary truncation** (reuses
      `truncateFacebookPrimary`; feed and carousel never diverge).
    - Tag: `// Feature: facebook-ad-formats, Property 3: Carousel shared-primary truncation`
    - **Validates: Requirements 7.6, 7.7**

  - [x] 2.5 Implement card-set reducers and badge-state helper
    - In `src/lib/adTruncation.ts`, add `addCard`, `removeCard`, `stepCard`
      returning the `CardCountResult` contract from the design, enforcing the
      count-bound and active-index rules (append-and-select on add; following/
      preceding active reassignment on remove; clamp at bounds with `atLimit`).
    - Add `facebookBadgeState(anyInput, anyTruncated)` returning
      `{ toneKind, label }`: neutral+`fits` when no input, warn+`truncated` when
      any truncated/clamped, safe+`fits` otherwise; label is always non-empty.
    - All helpers pure and DOM-free.
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 8.1, 8.3, 8.4, 9.1, 9.2, 9.3, 9.4, 9.5, 9.7, 13.2, 13.4_

  - [x]* 2.6 Write property test for card-count reducer bounds
    - **Property 4: Card-count reducer stays within bounds** (sequences of
      `addCard`/`removeCard`; count stays in `[min, max]`; ±1 transitions).
    - Tag: `// Feature: facebook-ad-formats, Property 4: Card-count reducer stays within bounds`
    - **Validates: Requirements 5.3, 5.4, 5.5, 5.6**

  - [x]* 2.7 Write property test for active-index validity and transitions
    - **Property 5: Active card index is always valid and transitions per spec**
      (over `removeCard`/`stepCard` sequences; index stays in `[0, count-1]`;
      following/preceding rules; `stepCard` no-op at bounds).
    - Tag: `// Feature: facebook-ad-formats, Property 5: Active card index is always valid and transitions per spec`
    - **Validates: Requirements 5.7, 5.8, 8.1, 8.3, 8.4**

  - [x]* 2.8 Write property test for per-format badge state
    - **Property 6: Per-format status badge state** (over the flag space; label
      always non-empty so state is never tone-only).
    - Tag: `// Feature: facebook-ad-formats, Property 6: Per-format status badge state`
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.7**

  - [x]* 2.9 Write property test for helper determinism and purity
    - **Property 11: Helper determinism and purity** (every new helper returns an
      equal value on a second identical call, no observable side effects).
    - Tag: `// Feature: facebook-ad-formats, Property 11: Helper determinism and purity`
    - **Validates: Requirements 13.4**

- [ ] 3. Checkpoint - helpers and their property tests
  - Run `npm run test:lib`. Ensure all tests pass, ask the user if questions arise.

- [x] 4. Extend the share-link codec for `adFormat` and `cards`
  - [x] 4.1 Add share schema fields and defensive validation
    - In `src/lib/shareLink.ts`, add the `AdShareCard` interface and extend
      `AdShareView` with `adFormat?: 'feed' | 'reels' | 'carousel'` and
      `cards?: AdShareCard[]`.
    - In `validateView`, accept `adFormat` only when it is exactly one of the three
      literals (drop otherwise → resolves to Feed); accept `cards` only when it is
      an array of plain objects, coercing each to `{ headline?, description? }`
      keeping non-empty strings.
    - In `pruneEmptyFields`, emit one `cards` entry per card in display order,
      dropping empty headline/description within each entry, and drop the whole
      `cards` key when the format is not carousel. No media field is ever emitted.
    - _Requirements: 10.1, 10.2, 10.4, 10.5, 10.6_

  - [-]* 4.2 Write property test for Facebook share-link round-trip
    - In `src/lib/shareLink.facebookFormats.test.ts` (fast-check, ≥100 iters;
      generate arbitrary Facebook states incl. 2–10 carousel cards and
      empty/whitespace fields). Read caps/bounds from `AD_PLATFORM_CONFIG`.
    - **Property 8: Facebook share-link round-trip** (format, non-empty fields,
      card count/order restored; media always absent).
    - Also assert **Property 7's value-preservation model** at the codec level:
      shared primary identical across formats after restore.
    - Tag: `// Feature: facebook-ad-formats, Property 8: Facebook share-link round-trip`
    - **Validates: Requirements 1.7, 10.1, 10.2, 10.3, 10.4, 10.5**

  - [-]* 4.3 Write property test for malformed/absent format fallback
    - **Property 9: Malformed or absent format falls back to Feed** (missing/empty/
      unrecognized `adFormat` resolves to Feed; other valid fields still restored).
    - Tag: `// Feature: facebook-ad-formats, Property 9: Malformed or absent format falls back to Feed`
    - **Validates: Requirements 1.8, 10.6**

  - [ ]* 4.4 Write property test for cross-platform share isolation
    - **Property 10: Cross-platform share isolation** (a non-facebook share leaves
      the Facebook tool at defaults: Feed, empty fields, no cards).
    - Tag: `// Feature: facebook-ad-formats, Property 10: Cross-platform share isolation`
    - **Validates: Requirements 10.7**

- [ ] 5. Checkpoint - share codec and its property tests
  - Run `npm run test:lib`. Ensure all tests pass, ask the user if questions arise.

- [x] 6. Add new i18n keys (English canonical, en-fallback)
  - [x] 6.1 Declare new keys in the IslandStrings / AdPreviewStrings types
    - In `src/i18n/types.ts`, extend `AdPreviewStrings` (and `IslandStrings` as
      needed) with the new keys: `formatAria`, `formatFeed`, `formatReels`,
      `formatCarousel`, `carouselAddCard`, `carouselRemoveCard`,
      `carouselMaxReached`, `carouselMinReached`, `carouselPrev`, `carouselNext`,
      `carouselPosition`, `cardN`, `cardHeadline`, `cardDescription`,
      `placeholders.cardHeadline`, `placeholders.cardDescription` so a missing or
      misspelled key in any locale is a compile-time error.
    - Do NOT add new keys for reused Reels strings (`common.subscribe`,
      `common.fullscreen`, `common.reelAudio`, `ap.sponsored`, `ap.adLabel`,
      `ap.safeZoneTag`, `ap.safeZoneHint`).
    - _Requirements: 11.3, 11.4, 11.5, 2.8_

  - [x] 6.2 Add English canonical values
    - In `src/i18n/adPreviewStrings.ts`, add non-empty English canonical values for
      every new key per the design's i18n table (e.g. `carouselPosition`
      = "{current} / {total}", `carouselMaxReached` = "Maximum of {max} cards
      reached"). Confirm `adPreviewStrings(s)` returns these for locales that omit
      `adPreviews` (en-fallback).
    - _Requirements: 1.5, 11.1, 11.2, 11.3_

  - [ ]* 6.3 Write i18n fallback and no-duplicate-key tests
    - In `src/i18n/` test style: assert a locale missing a new key resolves to the
      English canonical value (never empty/raw key), and a parity check confirms
      Reels reuses existing keys with no duplicates.
    - _Requirements: 11.2, 11.5, 2.8_

- [ ] 7. Implement `FacebookReelsAd` component
  - [ ] 7.1 Build the Reels 9:16 frame, chrome, and media
    - Create `src/components/island/FacebookReelsAd.tsx`
      (`/** @jsxImportSource preact */`) with the `FacebookReelsAdProps` interface.
    - Render a `relative overflow-hidden` frame at `aspect-ratio:9 / 16`, media via
      `CoverMedia` (`object-cover`, cropped, no distortion), and the localized
      empty-media placeholder (`ap.media.add`) when no media.
    - Render creator row (`common.handle` + `common.subscribe`), audio attribution
      (`common.reelAudio`), `ap.sponsored`, and the `ap.adLabel` corner disclosure,
      reusing existing keys (no duplicates).
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 2.7, 2.8_

  - [ ] 7.2 Add caption truncation, CTA overlay, safe-zone, scrim, and badge
    - Truncate the caption via `truncateFacebookReelsPrimary` (See More only when
      truncated; empty → no text/affordance).
    - Render a CTA overlay only when `resolveCta('facebook', cta)` is non-null;
      omit it otherwise.
    - Render `SafeZoneOverlay insets={fb.reelsSafeZone} label={ap.safeZoneTag}` only
      when `safeZone`, plus the localized `ap.safeZoneHint` line beneath.
    - Add a contrast scrim (gradient / `bg-black/45` + `drop-shadow`) behind overlay
      text, and a `Badge` driven by `facebookBadgeState`.
    - _Requirements: 2.4, 2.5, 3.3, 3.4, 3.7, 4.2, 4.3, 4.5, 9.1, 9.2, 12.5, 12.6_

  - [ ]* 7.3 Write render/example tests for Reels chrome
    - Assert 9:16 frame, creator/Subscribe, audio/Sponsored, CTA shown vs omitted
      per `resolveCta`, empty-media placeholder, safe-zone overlay on/off + hint.
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.3, 3.4, 3.7_

- [ ] 8. Implement `FacebookCarouselAd` component
  - [ ] 8.1 Build the carousel card area and shared primary
    - Create `src/components/island/FacebookCarouselAd.tsx`
      (`/** @jsxImportSource preact */`) with the `FacebookCarouselAdProps`
      interface.
    - Render the shared primary once above the strip via `truncateFacebookPrimary`.
    - Render the active card: media (or `ap.media.add` placeholder); headline via
      `clampCarouselHeadline`; description region only when non-empty, via
      `clampCarouselDescription`. Add a `Badge` driven by `facebookBadgeState`.
    - _Requirements: 6.1, 6.4, 6.5, 6.6, 7.2, 7.4, 7.6, 7.7, 9.3, 9.4_

  - [ ] 8.2 Add navigation, position indicator, and accessible keyboard support
    - Render prev button (`disabled` at `activeCard === 0`) and next button
      (`disabled` at `activeCard === cards.length - 1`), each with `aria-label`s
      from `ap.carouselPrev` / `ap.carouselNext`.
    - Render the position indicator via `interp(ap.carouselPosition, …)` as
      "current / total".
    - Wire the frame container `keydown` for `ArrowLeft`/`ArrowRight` → `onArrowKey`,
      and ensure Enter/Space activate the nav buttons (disabled buttons are inert).
    - _Requirements: 8.1, 8.3, 8.4, 8.5, 8.6, 8.7, 12.1, 12.2_

  - [ ]* 8.3 Write render/example tests for carousel
    - Per-card media/headline/optional-description rendering, shared primary above
      the strip, empty-description omission, nav disabled states, position
      indicator, accessible nav names, Enter/Space/Arrow activation.
    - _Requirements: 6.1, 6.4, 6.5, 6.6, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 12.1, 12.2_

- [ ] 9. Checkpoint - new components render correctly
  - Run `npm run test:lib`. Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Wire the formats into `AdSimulator`
  - [ ] 10.1 Add format state, controls flag, and the Format_Selector
    - In `src/components/island/AdSimulator.tsx`, add `fbFormat` state (default
      `'feed'`), `cards: CarouselCard[]`, and `activeCard` state.
    - Add the `format` capability flag to `CONTROLS` and set Facebook's controls to
      `{ device:true, mode:false, format:true, safeZone:false, media:true }`.
    - Render the Format_Selector `Segmented` (Feed/Reels/Carousel in order, with
      `ap.formatAria` accessible name and selected state) in `previewToolbar` when
      `controls.format`.
    - On the first switch to Carousel with empty `cards`, seed `minCards` empty
      cards and set `activeCard = 0` (idempotent so switching away/back preserves).
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6, 1.7, 5.2_

  - [ ] 10.2 Render format-aware previews and conditional safe-zone toggle
    - Make the Facebook arm of the right-column switch a sub-switch on `fbFormat`:
      Reels → `FacebookReelsAd`, Carousel → `FacebookCarouselAd`, else
      `FacebookFeedAd` (unchanged path, byte-for-byte identical output).
    - Show the safe-zone toggle only while `fbFormat === 'reels'`; default it
      enabled on first Reels mount (reusing the existing `safeZone` state).
    - _Requirements: 1.3, 1.4, 3.1, 3.2, 3.5, 3.6_

  - [ ] 10.3 Build format-aware left-column inputs and card operations
    - Feed: primary, headline, description (unchanged). Reels: primary caption +
      existing display-link/CTA controls + safe-zone toggle. Carousel: shared
      primary + dynamic per-card rows (headline, description, per-card media) +
      add/remove buttons + card navigator.
    - Wire add/remove/nav through the pure `addCard`/`removeCard`/`stepCard` helpers
      and surface `carouselMaxReached`/`carouselMinReached` notices on `atLimit`.
    - Preserve per-format values across switches (no reset on switch).
    - _Requirements: 1.7, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 6.1, 8.1_

  - [ ] 10.4 Manage object-URL lifecycle for all card and single media
    - Add a `cardsRef` mirror of the live `cards` array. Revoke a card's previous
      `mediaUrl` on per-card replace and on card removal; on unmount revoke every
      card's `mediaUrl` plus the feed/reels single `mediaUrl`.
    - Ensure no `mediaUrl` is read by `collect()` so media can never enter a link.
    - _Requirements: 6.2, 6.3, 6.7, 10.5_

  - [ ] 10.5 Extend the share adapter collect/apply for `adFormat` and `cards`
    - In the Facebook `ShareAdapter` (`shareAdapter.ts` / `AdSimulator`), serialize
      `adFormat` and (when carousel) `cards` via `collect`; in `apply`, restore the
      active format and card array, falling back to Feed on malformed/absent
      `adFormat`, leaving unserialized fields empty, and gating on
      `state.platform === 'facebook'`.
    - _Requirements: 1.8, 10.1, 10.2, 10.3, 10.4, 10.6, 10.7_

  - [ ]* 10.6 Write object-URL lifecycle tests
    - Mock `URL.createObjectURL`/`revokeObjectURL`; assert prior URL revoked on
      per-card replace, on card remove, and on unmount.
    - _Requirements: 6.2, 6.7_

- [ ] 11. Checkpoint - full Facebook tool wired
  - Run `npm run test:lib`. Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Accessibility and responsive verification (automated)
  - [ ]* 12.1 Write keyboard, role, and selected-state tests
    - Assert Format_Selector options and carousel nav controls are reachable via
      Tab/Shift+Tab, activatable via Enter/Space, carousel slides move via
      Left/Right Arrow; each control exposes a non-empty accessible name + role,
      and the selected format exposes its selected state.
    - _Requirements: 12.1, 12.2_

  - [ ]* 12.2 Write focus-visible and contrast/scrim checks
    - Assert the visible focus indicator uses the existing `focus-visible:outline-*`
      tokens (≥3:1), and that the Reels/Carousel body text over media is backed by
      the contrast scrim (≥4.5:1) and no horizontal scroll at 320–767px / ≥1024px.
    - Note: full WCAG conformance requires manual assistive-technology testing
      beyond these automated checks.
    - _Requirements: 12.3, 12.4, 12.5, 12.6_

- [ ] 13. Final checkpoint - build and full test run
  - Run `npm run typecheck` then `npm run test:lib` (single-run, Windows/cmd, not
    watch mode). Ensure the build is clean and all tests pass; ask the user if
    questions arise.

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster
  MVP; core implementation tasks are never optional.
- Each task references specific requirement clauses (and property numbers for PBT)
  for full traceability.
- Pure helpers (`adTruncation.ts`) and the share codec (`shareLink.ts`) plus their
  fast-check property tests are sequenced before the UI that consumes them.
- Property tests use `fast-check` (≥100 iterations) with an independent
  `Intl.Segmenter` grapheme oracle and read all caps/bounds from
  `AD_PLATFORM_CONFIG.facebook` so tests stay in lock-step with the source of truth.
- The `FacebookFeedAd` path is left byte-for-byte unchanged (Req 1.4).
- Tests run via `npm run test:lib` (single execution), never watch mode.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.5", "6.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.6", "2.7", "2.8", "2.9", "4.1", "6.2"] },
    { "id": 3, "tasks": ["4.2", "4.3", "4.4", "6.3", "7.1", "8.1"] },
    { "id": 4, "tasks": ["7.2", "8.2"] },
    { "id": 5, "tasks": ["7.3", "8.3", "10.1"] },
    { "id": 6, "tasks": ["10.2", "10.3"] },
    { "id": 7, "tasks": ["10.4", "10.5"] },
    { "id": 8, "tasks": ["10.6", "12.1", "12.2"] }
  ]
}
```
