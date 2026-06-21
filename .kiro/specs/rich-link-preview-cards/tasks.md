# Implementation Plan: Rich Link Preview Cards

## Overview

This plan implements the link-card simulation incrementally, building the pure foundation first
(config + text-engine extraction) so every rendering surface composes already-tested values. We extend
`src/data/linkBehavior.ts` with `Card_Layout_Profile` facts, add pure derivation/extraction functions
to `src/lib/textTools.ts`, layer in i18n strings and draft persistence, then build the `LivePreviewCard`
renderer and `CardFieldEditor` and wire them into `Dashboard.tsx` and the existing preview islands. All
work is additive and backward-compatible; nothing issues a network request. The language is TypeScript,
matching the existing codebase. Property tests use `fast-check` with `node:test`, mirroring the existing
`src/lib/*.test.ts` suites, and run a minimum of 100 iterations.

## Tasks

- [x] 1. Extend Link_Behavior_Config with Card_Layout_Profile
  - [x] 1.1 Add card-layout types, data, and accessors to `src/data/linkBehavior.ts`
    - Add `CardImageStyle`, `CardDomainCasing`, `CardDomainPlacement`, and `CardLayoutProfile` types
    - Add optional `cardLayout?: CardLayoutProfile` to `LinkBehaviorRecord`
    - Populate `cardLayout` for the six preview-card platforms (facebook, linkedin, threads, discord, whatsapp, bluesky) with the imageRatio/imageStyle/titleMaxChars/descriptionMaxChars/domainCasing/domainPlacement/removesRawUrl/lastReviewed values from the design table
    - Add `cardLayout(platform)` lookup and `validateCardLayoutCoverage(previewCardPlatforms)` returning `CardLayoutCoverageResult`
    - Leave all existing exports (`LINK_BEHAVIOR`, `validateLinkBehaviorCoverage`, etc.) unchanged
    - _Requirements: 6.1, 6.2, 6.4, 14.1, 14.2, 16.3_

  - [x]* 1.2 Write property test for Card_Layout_Profile coverage and shape
    - **Property 6: Card_Layout_Profile coverage and shape**
    - Derive the preview-card id list from `LINK_BEHAVIOR` (model === 'preview-card') and assert `cardLayout` is defined with well-formed enum/integer/boolean fields; `validateCardLayoutCoverage` reports exactly the missing ids (empty for the real list)
    - File: `src/data/linkBehavior.cardLayout.test.ts`
    - **Validates: Requirements 6.1, 6.3, 14.2**

  - [x]* 1.3 Write property test for lastReviewed ISO date
    - **Property 7: lastReviewed is a valid ISO date**
    - For all `cardLayout` profiles, `lastReviewed` matches `^\d{4}-\d{2}-\d{2}$` and is a valid calendar date
    - File: `src/data/linkBehavior.cardLayout.test.ts`
    - **Validates: Requirements 6.4**

  - [x]* 1.4 Write property test for config-fact fidelity
    - **Property 13: Displayed link facts match the config**
    - For all platforms, the link-display facts the UI derives (bio-link allowance, domain casing, fixed link weight, raw-URL removal) equal the values stored in `LINK_BEHAVIOR`/`cardLayout`
    - File: `src/data/linkBehavior.cardLayout.test.ts`
    - **Validates: Requirements 11.3, 14.1, 14.3**

- [x] 2. Add local derivation and field functions to the Text_Engine
  - [x] 2.1 Implement domain, favicon, and first-URL derivation in `src/lib/textTools.ts`
    - Implement `deriveCardDomain(url)`: parse host, strip a single leading `www.`, case-fold; prepend a synthetic scheme for scheme-less URLs; return `null` when no valid host
    - Implement `deriveFaviconMonogram(domain)`: upper-cased first alphanumeric char, `''` for empty/invalid; computed locally with no network
    - Implement `firstUrl(text)` reusing `detectUrls` to return the first `UrlMatch` in document order or `undefined`
    - Keep `detectUrls`, `weightedLength`, `charCount` signatures and results unchanged
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.1, 14.4_

  - [x]* 2.2 Write property test for domain derivation
    - **Property 2: Domain derivation is a case-folded suffix of the real host**
    - For all URLs (including scheme-less and `www.`-prefixed) that parse to a valid host, `deriveCardDomain(url)` returns a lower-cased suffix of the host with one leading `www.` removed, never fabricated text
    - File: `src/lib/linkCardDerivation.test.ts`
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [x]* 2.3 Write property test for favicon monogram derivation
    - **Property 3: Local favicon monogram derivation**
    - For all valid domains, `deriveFaviconMonogram(domain)` is the upper-cased first alphanumeric character, computed locally with no network access
    - File: `src/lib/linkCardDerivation.test.ts`
    - **Validates: Requirements 3.4**

  - [x] 2.4 Implement `truncateCardField` and `mutatePreviewText` in `src/lib/textTools.ts`
    - `truncateCardField(text, max)`: `max === 0` → `''`; `charCount(text) <= max` → unchanged; otherwise first `max` grapheme clusters + single `'…'`, using grapheme-safe `sliceChars`/`charCount`
    - `mutatePreviewText(text, removeUrl)`: returns `text` unchanged when `removeUrl` is false; otherwise removes only the first detected URL substring and collapses surrounding whitespace; never mutates the source string
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 9.1, 9.2, 9.3_

  - [x]* 2.5 Write property test for grapheme-safe truncation
    - **Property 8: Grapheme-safe card-field truncation**
    - For all field text (emoji, ZWJ, combining marks) and all `max >= 0`, verify the zero/within/exceeds cases and that the pre-ellipsis portion is a whole-grapheme prefix (no cluster split)
    - File: `src/lib/linkCardDerivation.test.ts`
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

  - [x]* 2.6 Write property test for preview-text mutation
    - **Property 9: Preview text mutation removes only the first URL and never mutates the source**
    - `mutatePreviewText(text, false) === text`; with a URL present, `mutatePreviewText(text, true)` drops only the first occurrence; the input `text` value is unchanged after the call
    - File: `src/lib/textTools.linkCard.test.ts`
    - **Validates: Requirements 9.1, 9.2, 9.3**

- [x] 3. Implement the extraction orchestrator
  - [x] 3.1 Implement `ExtractedLinkData` and `extractLinkData(text, platform)` in `src/lib/textTools.ts`
    - Compose `firstUrl`, `deriveCardDomain`, `deriveFaviconMonogram`, and `mutatePreviewText`
    - Read platform model + `cardLayout.removesRawUrl` from `LINK_BEHAVIOR` (single source of truth)
    - Populate `domain`, `faviconMonogram`, `hasValidHost`, `titlePlaceholder` (domain-derived), `previewText`, `removesRawUrl`; empty/undefined values when no URL
    - On unparseable host: `hasValidHost: false`, raw URL as domain, empty favicon
    - _Requirements: 1.1, 1.2, 2.3, 3.5, 5.1, 5.3, 9.1, 9.2, 11.1, 12.1, 12.2_

  - [x]* 3.2 Write property test for card-render trigger
    - **Property 1: Card-render trigger**
    - For all text and all platforms, the card-render decision is true exactly when `detectUrls(text)` is non-empty AND `organicLinkBehavior(platform).model === 'preview-card'`
    - File: `src/lib/textTools.linkCard.test.ts`
    - **Validates: Requirements 1.1, 1.2, 16.1**

  - [x]* 3.3 Write property test for smart title placeholder
    - **Property 4: Smart title placeholder derives from the domain**
    - For all URLs with a valid host, `extractLinkData(text, platform).titlePlaceholder` is derived solely from `deriveCardDomain(url)` and never contains text absent from the host
    - File: `src/lib/linkCardDerivation.test.ts`
    - **Validates: Requirements 2.3**

  - [x]* 3.4 Write property test for first-URL selection
    - **Property 5: First-URL selection**
    - For all text with at least one URL and all preview-card platforms, `extractLinkData(...).firstUrl === detectUrls(text)[0]`, regardless of `cardFromFirstUrlOnly`
    - File: `src/lib/textTools.linkCard.test.ts`
    - **Validates: Requirements 5.1, 5.3**

  - [x]* 3.5 Write property test for counter independence
    - **Property 10: Counters always measure the full body text**
    - For all text, `charCount(text)` and `weightedLength(text)` are computed from the full body and are independent of any preview URL omission
    - File: `src/lib/textTools.linkCard.test.ts`
    - **Validates: Requirements 9.4, 12.1**

  - [x]* 3.6 Write property test for non-card URL retention
    - **Property 11: Non-card platforms retain the inline URL and render no card**
    - For all text with a URL and all `plain-text`/`counted-shortened`/`clickable-inline` platforms, the card decision is false and `extractLinkData(...).previewText === text`
    - File: `src/lib/textTools.linkCard.test.ts`
    - **Validates: Requirements 11.1, 12.1, 12.2**

  - [x]* 3.7 Write property test for indication selection
    - **Property 12: Link-display indication is selected by model**
    - For all platforms and text: no URL → "none"; otherwise the indication key maps exactly from the platform model (plain-text→plainText, preview-card→previewCard, clickable-inline→clickableInline, counted-shortened→countedShortened)
    - File: `src/lib/textTools.linkCard.test.ts`
    - **Validates: Requirements 11.2, 12.3**

  - [x]* 3.8 Write property test for engine backward compatibility
    - **Property 14: Engine backward compatibility**
    - For all text, `detectUrls`, `weightedLength`, and `charCount` produce the same results as before this feature (new exports are additive)
    - File: `src/lib/textTools.linkCard.test.ts`
    - **Validates: Requirements 14.4, 16.1, 16.2**

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Add i18n link-card strings
  - [x] 5.1 Declare `LinkCardStrings`, add canonical `en` block, and add the resolver
    - Add the required `LinkCardStrings` interface and `linkCard: LinkCardStrings` to `IslandStrings` in `src/i18n/types.ts` (editorHeading, titleLabel, descriptionLabel, titlePlaceholder, descriptionPlaceholder, cardAria, imageAlt, firstUrlNote)
    - Add the canonical `linkCard` block to `src/i18n/en.ts`
    - Add a `linkCardStrings(s)` resolver returning `s.linkCard` with English fallback for partial/absent values; reuse the existing `linkDisplayStrings` resolver for non-card indications (do not duplicate)
    - _Requirements: 2.4, 2.5, 5.2, 10.4, 13.2, 15.1, 15.2, 15.4_

  - [x] 5.2 Add `linkCard` translations to the remaining nine locales
    - Add the `linkCard` block to `es`, `de`, `fr`, `pt`, `it`, `nl`, `ja`, `zh`, `da` with translated values, keeping key paths identical to `en`
    - _Requirements: 15.1, 15.3_

  - [x]* 5.3 Write property test for i18n en-fallback resolution
    - **Property 15: i18n en-fallback resolution**
    - For all locales and all `linkCard`/`linkDisplay` keys, the resolver returns the locale's own value when present and the canonical English value when absent
    - File: `src/i18n/linkCardStrings.test.ts`
    - **Validates: Requirements 15.4**

  - [x]* 5.4 Verify i18n key parity across locales
    - Run `scripts/check-i18n.mjs` and a type-check to confirm the new `linkCard` keys exist in all ten locales and that omitting a key is a type error
    - _Requirements: 15.2, 15.3_

- [x] 6. Add Card_Metadata draft persistence
  - [x] 6.1 Implement the draft envelope serialize/parse helper
    - Implement `DraftEnvelope { text, cardTitle?, cardDescription? }` serialize/parse against the existing `post_truncate_active_draft` `sessionStorage` key
    - Read a legacy plain string as `{ text: <string> }`; ignore malformed JSON (fall back to empty)
    - Do not persist the attached image (in-memory object URL only)
    - _Requirements: 16.4_

  - [x]* 6.2 Write property test for draft envelope round-trip
    - **Property 16: Draft envelope round-trip**
    - For all envelopes, parse(serialize(env)) equals the envelope; for all legacy plain strings, parse yields `{ text: <string> }`
    - File: `src/lib/draftEnvelope.test.ts`
    - **Validates: Requirements 16.4**

- [x] 7. Build the LivePreviewCard renderer
  - [x] 7.1 Implement `LivePreviewCard` island
    - Create `src/components/island/LivePreviewCard.tsx` with the `LivePreviewCardProps` interface
    - Call `extractLinkData(text, platform)`; render `null` when no URL or platform is not preview-card
    - Look up `cardLayout(platform)` and render the matching mockup via an internal switch on `imageStyle`/`domainPlacement`; run title/description through `truncateCardField`; omit description when `descriptionMaxChars === 0`; case/place the domain per profile
    - Render the card as a **non-interactive, view-only element** — an `<article>`/`<div>` container, NOT wrapped in an `<a href target="_blank" rel="noopener noreferrer">` anchor — so it never navigates to or opens `firstUrl.url` (or any URL) and exposes no link role to assistive technology
    - Do not emit `target`/`rel` attributes (no anchor, no new browsing context); expose a static accessible name via `aria-label` composed from the Card_Title + Card_Domain
    - Render the local favicon monogram; when `hasValidHost` is false, show the raw URL as domain and omit the favicon
    - Style strictly with existing Tailwind v4 design tokens; reuse `FeedImage`, `Avatar`/`monogram`, and `Card` primitives; image alt from title or localized default
    - _Requirements: 3.5, 4.4, 4.5, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 10.1, 10.2, 10.3, 10.5, 13.1, 13.2, 13.4_

  - [ ]* 7.2 Write render tests for per-platform layout, non-interactivity, and a11y
    - Per-platform card assertions (Facebook uppercase domain above 1.91:1 image, LinkedIn title+domain, Threads thumbnail chip, Discord accent-bar embed, WhatsApp bubble, Bluesky large card)
    - Assert the card root is non-interactive: no link role, no `href` equal to `firstUrl.url` (or any detected URL), no `target`/`rel` attributes, and activating it triggers no navigation (no new browsing context opened)
    - Assert the static `aria-label` contains the Card_Title and Card_Domain, and image alt is the title or localized default
    - Dark-mode design tokens used (no arbitrary values)
    - File: `src/components/island/LivePreviewCard.test.tsx`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 10.1, 10.2, 10.3, 10.5, 13.1, 13.2, 13.4_

  - [ ]* 7.3 Write property/render test for non-interactive, non-link card
    - **Property 17: Card renders as a non-interactive, non-link element**
    - For all post text with a URL and all preview-card platforms, the rendered card has no anchor/`href` referencing the detected URL (or any URL), exposes no link role, yet still exposes the static accessible name (title + domain) and image alt
    - File: `src/components/island/LivePreviewCard.test.tsx`
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.5**

- [x] 8. Build the Card_Field_Editor and wire Dashboard state
  - [x] 8.1 Implement `CardFieldEditor`
    - Create the editable Card_Title input and Card_Description textarea, keyboard-operable, with labels resolved via `linkCardStrings`
    - Reuse the editor's existing media-attachment object URL for the image (no new upload control); render the no-image form when absent
    - _Requirements: 4.1, 4.3, 4.5, 13.3, 15.1_

  - [x] 8.2 Integrate card state into `Dashboard.tsx`
    - Add `cardTitle`/`cardDescription` state mirroring the existing `image` pattern; render `CardFieldEditor` only while a card is shown
    - Thread `cardTitle`/`cardDescription` into the preview islands and the field editor; edits flow into the card within the existing 80ms analysis debounce
    - Persist `cardTitle`/`cardDescription` via the draft envelope (task 6.1) using the existing 250ms storage debounce; keep the image in-memory only
    - _Requirements: 1.3, 4.2, 16.4_

  - [ ]* 8.3 Write render tests for the Card_Field_Editor
    - Title input + description textarea render while a card is shown, are keyboard-operable with localized labels, edits flow into the card, and the attached image renders in the platform image style (no-image form when absent)
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 13.3_

- [x] 9. Wire cards and indications into the preview surfaces
  - [x] 9.1 Embed `LivePreviewCard` in the existing preview islands
    - Add optional `cardTitle`/`cardDescription` props to `LinkedInPreview`, `MetaMonitor` (facebook branch), and `ThreadsPreview` and render `<LivePreviewCard>` when `extractLinkData` reports a URL
    - Render the body text via `mutatePreviewText(text, removesRawUrl)`; keep counters measuring the full `text`
    - When no URL is present, render exactly as today (no card, no field editor)
    - _Requirements: 1.1, 9.1, 9.2, 9.4, 16.1, 16.2_

  - [x] 9.2 Render cards and non-card indications on counter/non-card surfaces
    - Render `<LivePreviewCard>` on the Discord/WhatsApp/Bluesky `PlatformCounter` pages (read-only placeholder metadata)
    - Render the plain-text indication + `bioLinkAllowance` line for Instagram/TikTok/YouTube, the existing fixed-weight treatment for X/Twitter, and the clickable-inline indication for Reddit/Pinterest, all using `linkDisplayStrings`; show the `firstUrlNote` indication on `cardFromFirstUrlOnly` platforms with multiple URLs
    - _Requirements: 5.2, 11.1, 11.2, 11.3, 12.1, 12.2, 12.3_

  - [ ]* 9.3 Write render and no-network integration tests for the surfaces
    - Render assertions for the embedded cards, non-card indications, and bio-allowance line
    - First-URL indication shown with multiple URLs on a `cardFromFirstUrlOnly` platform
    - Spy on `fetch`/`XMLHttpRequest`/`Image` and assert zero calls during extraction and a full card render
    - _Requirements: 1.3, 2.2, 5.2, 11.1, 11.2, 11.3, 12.2, 12.3_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP.
- Each task references specific granular requirements for traceability.
- Property tests validate the universal correctness properties from the design (one property per sub-task, annotated with its property number and the requirements it validates).
- The pure foundation (config + text engine) is built and tested before any rendering, so the islands compose already-verified values.
- Checkpoints ensure incremental validation at natural breaks.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "5.1", "6.1"] },
    { "id": 1, "tasks": ["1.2", "2.4", "5.2", "5.3", "6.2"] },
    { "id": 2, "tasks": ["1.3", "2.2", "2.6", "3.1", "5.4"] },
    { "id": 3, "tasks": ["1.4", "2.3", "3.2", "7.1", "8.1"] },
    { "id": 4, "tasks": ["2.5", "3.4", "7.2", "7.3", "8.2", "8.3", "9.1", "9.2"] },
    { "id": 5, "tasks": ["3.3", "3.5", "9.3"] },
    { "id": 6, "tasks": ["3.6"] },
    { "id": 7, "tasks": ["3.7"] },
    { "id": 8, "tasks": ["3.8"] }
  ]
}
```
