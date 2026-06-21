# Requirements Document

## Introduction

PostTruncate.com ships two related tool silos that help creators and advertisers prepare social copy:

1. **Platform character counters / truncation tools** — driven by `src/data/tools.ts`,
   `src/data/platformCounters.ts`, and the pure text engine in `src/lib/textTools.ts`.
   Today the engine treats every link identically: `detectUrls()` finds URL-like tokens and
   `weightedLength()` collapses each one to a flat 23-character (t.co) weight via `LIMITS.URL_WEIGHT`.
2. **Ad-preview simulators** — driven by `src/data/adPreviews.ts`, `src/data/adPlatformConfig.ts`,
   and the pure truncation engine in `src/lib/adTruncation.ts`. The ad config holds per-platform
   truncation thresholds and vertical-video safe zones.

The flat 23-character rule is only correct for X/Twitter. Every other platform displays links
differently: some render links as plain non-clickable text, some generate a rich Open Graph preview
card, some count links by bytes, and ads expose a separate "display link" plus a call-to-action
button that is distinct from the destination URL. This feature makes **both silos accurately
represent platform-specific link-display behavior** in organic posts and in ads, driven by a single
source-of-truth configuration, while preserving every existing behavior, test, and translation that
is already correct.

This document defines **what** the system must do. Implementation choices (data structures, island
markup, file layout) are deferred to the design phase.

## Glossary

- **Text_Engine**: The pure, DOM-free module `src/lib/textTools.ts` that exposes `detectUrls`,
  `weightedLength`, `charCount`, `byteCounts`, and related counting helpers.
- **Ad_Truncation_Engine**: The pure, DOM-free module `src/lib/adTruncation.ts` that enforces ad
  field truncation and fit rules.
- **Platform_Counter**: The configuration-driven counter/truncation tool surface defined by
  `src/data/tools.ts` and `src/data/platformCounters.ts` (Twitter/X, LinkedIn, Instagram, Facebook,
  TikTok, Threads, YouTube, Pinterest, Reddit, Bluesky, Discord, WhatsApp).
- **Ad_Preview_Simulator**: The ad-preview tool surface defined by `src/data/adPreviews.ts` and
  `src/data/adPlatformConfig.ts` (Facebook, Instagram, Google RSA, TikTok ads).
- **Link_Behavior_Config**: A new single source-of-truth configuration module that records, per
  platform and per surface (organic post versus ad), how that platform displays and counts links.
- **Link_Display_Model**: A named classification of how a platform renders a link. The defined
  values are: `counted-shortened`, `plain-text`, `preview-card`, and `clickable-inline`.
- **Counted_Shortened_Model**: A Link_Display_Model where a URL is wrapped by a shortener and counts
  as a fixed character weight regardless of its real length (X/Twitter t.co, 23 characters).
- **Plain_Text_Model**: A Link_Display_Model where a URL in the body is shown as literal,
  non-clickable text (Instagram captions/comments, TikTok captions/descriptions, YouTube Shorts
  descriptions/comments).
- **Preview_Card_Model**: A Link_Display_Model where a URL generates a rich Open Graph preview card
  (title, domain, description, image) and the raw URL text may be removed after the card renders
  (Facebook, LinkedIn, Threads, Discord, WhatsApp).
- **Clickable_Inline_Model**: A Link_Display_Model where a URL remains clickable inline text without
  a mandatory rich card (Reddit markdown links, Pinterest destination URL).
- **Bio_Link_Allowance**: The maximum number of clickable links a platform permits in a profile bio
  (for example Instagram up to 5, TikTok 1, Threads up to 5).
- **Facet**: Bluesky's byte-indexed rich-text annotation that marks a substring (by UTF-8 byte
  offsets `byteStart`/`byteEnd`) as an external link.
- **Display_Link**: In ads, the link text shown beneath the headline that is presented to the viewer,
  which may differ from the actual destination URL.
- **Destination_URL**: In ads, the actual landing page URL the click resolves to.
- **Display_Path**: In Google Responsive Search Ads, the optional path segments (up to two, 15
  characters each) appended to the final-URL domain in the green display URL.
- **CTA_Button**: The call-to-action button paired with an ad (for example "Shop Now",
  "Learn More") that carries the click on platforms where caption links are not clickable.
- **Locale**: One of the ten supported language codes: `en`, `es`, `de`, `fr`, `pt`, `it`, `nl`,
  `ja`, `zh`, `da`.

## Requirements

### Requirement 1: Single source-of-truth link-behavior configuration

**User Story:** As a maintainer, I want one authoritative configuration that records how each
platform displays and counts links, so that the counter tools, the ad simulators, and their tests
never drift apart.

#### Acceptance Criteria

1. THE Link_Behavior_Config SHALL define, for each Platform_Counter platform, exactly one
   Link_Display_Model value for organic-post link display.
2. THE Link_Behavior_Config SHALL define, for each Ad_Preview_Simulator platform, the ad link-display
   attributes the platform supports, including whether a Display_Link is shown, whether a Display_Path
   is supported, and whether a CTA_Button carries the click.
3. THE Link_Behavior_Config SHALL record, for each platform that limits clickable profile links, the
   Bio_Link_Allowance as a non-negative integer.
4. WHERE a platform applies the Counted_Shortened_Model, THE Link_Behavior_Config SHALL record the
   fixed link character weight for that platform.
5. THE Text_Engine and THE Ad_Truncation_Engine SHALL read link-display rules from THE
   Link_Behavior_Config rather than from independently duplicated constants.
6. IF a platform referenced by a Platform_Counter or Ad_Preview_Simulator entry has no
   corresponding Link_Behavior_Config record, THEN THE build or test suite SHALL report a failure
   identifying the missing platform.

### Requirement 2: Organic link-display model classification

**User Story:** As a creator, I want each platform's counter to reflect how that platform actually
displays a link, so that I trust the character count and the guidance shown.

#### Acceptance Criteria

1. THE Link_Behavior_Config SHALL classify Twitter/X organic link display as the
   Counted_Shortened_Model.
2. THE Link_Behavior_Config SHALL classify Instagram, TikTok, and YouTube Shorts organic link
   display as the Plain_Text_Model.
3. THE Link_Behavior_Config SHALL classify Facebook, LinkedIn, Threads, Discord, and WhatsApp
   organic link display as the Preview_Card_Model.
4. THE Link_Behavior_Config SHALL classify Reddit and Pinterest organic link display as the
   Clickable_Inline_Model.
5. THE Link_Behavior_Config SHALL classify Bluesky organic link display as the Preview_Card_Model
   with byte-indexed Facet link counting.

### Requirement 3: Twitter/X counted-shortened link weighting (preserved behavior)

**User Story:** As a Twitter/X user, I want every link to count as 23 characters exactly as it does
today, so that my existing workflow and the published 280-character guidance stay correct.

#### Acceptance Criteria

1. WHEN `weightedLength` measures text containing one or more URLs under the Counted_Shortened_Model,
   THE Text_Engine SHALL count each detected URL as exactly `LIMITS.URL_WEIGHT` (23) characters
   regardless of the URL's real length.
2. THE Text_Engine SHALL continue to weight non-URL characters using the existing rules (CJK and
   emoji count as 2, ordinary Latin text, punctuation, and common symbols count as 1).
3. WHEN multiple URLs appear in one text, THE Text_Engine SHALL apply the fixed link weight once per
   detected URL.
4. THE Text_Engine SHALL keep the public signatures of `detectUrls` and `weightedLength` unchanged.

### Requirement 4: Plain-text non-clickable link platforms

**User Story:** As an Instagram, TikTok, or YouTube Shorts creator, I want the counter to tell me
that links in the body are not clickable, so that I move the link to a bio or sticker instead of
wasting caption space.

#### Acceptance Criteria

1. WHEN a Platform_Counter for a Plain_Text_Model platform detects a URL in the body field, THE
   Platform_Counter SHALL indicate that the URL renders as non-clickable plain text.
2. WHILE a Plain_Text_Model platform is selected, THE Text_Engine SHALL count each character of a
   detected URL using the platform's standard per-character counting rather than a fixed shortened
   weight.
3. WHERE a Plain_Text_Model platform supports a Bio_Link_Allowance, THE Platform_Counter SHALL state
   the maximum number of clickable bio links permitted.
4. THE Platform_Counter SHALL present the non-clickable-link indication using text resolved from THE
   Locale translations.

### Requirement 5: Preview-card link platforms

**User Story:** As a Facebook, LinkedIn, Threads, Discord, or WhatsApp creator, I want the counter to
explain that a link generates a preview card and that the raw URL text can be removed, so that I keep
my copy clean.

#### Acceptance Criteria

1. WHEN a Platform_Counter for a Preview_Card_Model platform detects a URL in the body field, THE
   Platform_Counter SHALL indicate that the URL generates a link preview card.
2. WHERE a Preview_Card_Model platform builds the card from the first detected URL only, THE
   Platform_Counter SHALL identify which detected URL becomes the preview card.
3. WHILE a Preview_Card_Model platform is selected, THE Text_Engine SHALL count each character of a
   detected URL using the platform's standard per-character counting.
4. THE Platform_Counter SHALL present the preview-card indication using text resolved from THE
   Locale translations.

### Requirement 6: Bluesky byte-indexed facet link counting

**User Story:** As a Bluesky user, I want link characters counted toward the 300 limit by bytes and
their facet byte offsets computed correctly, so that my post matches what the Bluesky client publishes.

#### Acceptance Criteria

1. WHEN the Bluesky Platform_Counter measures post text, THE Text_Engine SHALL count the post length
   against the 300-unit limit using UTF-8 byte counting.
2. WHEN the Bluesky Platform_Counter detects a URL, THE Text_Engine SHALL compute that link's Facet
   `byteStart` and `byteEnd` as UTF-8 byte offsets into the post text.
3. FOR ALL post text inputs, THE Text_Engine SHALL produce Facet byte offsets where
   `0 <= byteStart <= byteEnd <= total UTF-8 byte length` (invariant).
4. FOR ALL detected Bluesky links, the UTF-8 substring delimited by the computed `byteStart` and
   `byteEnd` SHALL equal the originally detected link text (round-trip property).
5. THE Text_Engine SHALL count each character of a Bluesky link toward the post limit rather than
   applying a fixed shortened weight.

### Requirement 7: Clickable inline and bio-link guidance

**User Story:** As a Reddit or Pinterest user, I want the counter to confirm that links remain
clickable inline, so that I know no preview-card or plain-text caveat applies.

#### Acceptance Criteria

1. WHEN a Platform_Counter for a Clickable_Inline_Model platform detects a URL in the body field,
   THE Platform_Counter SHALL indicate that the URL remains a clickable inline link.
2. WHILE a Clickable_Inline_Model platform is selected, THE Text_Engine SHALL count each character of
   a detected URL using the platform's standard per-character counting.
3. WHERE a platform restricts clickable profile links, THE Platform_Counter SHALL state the
   Bio_Link_Allowance for that platform.

### Requirement 8: Counter tools surface link-display information

**User Story:** As a creator, I want each counter page to show the correct link-display facts, so
that the on-page guidance matches the live counter behavior.

#### Acceptance Criteria

1. THE Platform_Counter SHALL display the Link_Display_Model guidance for the selected platform
   sourced from THE Link_Behavior_Config.
2. WHEN body text contains no detected URL, THE Platform_Counter SHALL omit link-specific indications.
3. WHEN body text contains at least one detected URL, THE Platform_Counter SHALL always display the
   link-display indication that matches the selected platform's Link_Display_Model.
4. THE Platform_Counter SHALL keep the existing character-count, limit, and over-limit indicators
   unchanged for text that contains no URL.

### Requirement 9: Meta ad display link and call-to-action model

**User Story:** As a Facebook or Instagram advertiser, I want the simulator to show the display link,
the call-to-action button, and the primary-text truncation, so that I can see how my link appears
separately from my destination URL.

#### Acceptance Criteria

1. THE Ad_Preview_Simulator for Facebook and Instagram ads SHALL render a Display_Link region that is
   distinct from the Destination_URL.
2. WHEN an advertiser provides a Display_Link, THE Ad_Preview_Simulator SHALL show the provided
   Display_Link beneath the headline.
3. WHEN an advertiser provides no Display_Link, THE Ad_Preview_Simulator SHALL derive the shown link
   text from the Destination_URL domain.
4. THE Ad_Preview_Simulator SHALL render a CTA_Button selected from the platform's supported
   call-to-action labels.
5. WHEN primary text exceeds the Facebook primary-text truncation threshold, THE Ad_Truncation_Engine
   SHALL truncate it at that threshold and append the configured "See More" label, preserving the
   existing `truncateFacebookPrimary` behavior.

### Requirement 10: Google RSA display URL and path fields

**User Story:** As a Google Ads advertiser, I want the RSA simulator to show the display URL built
from the final-URL domain plus optional path fields, so that I see the green display URL as users do.

#### Acceptance Criteria

1. THE Ad_Preview_Simulator for Google RSA SHALL build the display URL from the Destination_URL
   domain followed by any provided Display_Path segments.
2. THE Ad_Preview_Simulator SHALL accept up to two Display_Path segments.
3. WHEN a Display_Path segment exceeds 15 characters, THE Ad_Truncation_Engine SHALL clamp that
   segment to 15 characters.
4. WHERE no Display_Path segment is provided, THE Ad_Preview_Simulator SHALL show the
   Destination_URL domain alone as the display URL.
5. THE Ad_Preview_Simulator SHALL preserve the existing RSA headline and description character caps
   and the existing `googleHeadlineFits` desktop-line fitting behavior.

### Requirement 11: TikTok ad non-clickable caption and CTA-driven link

**User Story:** As a TikTok advertiser, I want the simulator to show that in-feed ad captions carry
no clickable link and that the link is driven by the CTA, so that I place my offer correctly.

#### Acceptance Criteria

1. WHEN the TikTok Ad_Preview_Simulator detects a URL, an `@` mention, or a `#` hashtag in the ad
   caption, THE Ad_Preview_Simulator SHALL indicate that the caption carries no clickable link.
2. THE TikTok Ad_Preview_Simulator SHALL render a CTA_Button as the element that carries the click.
3. WHEN ad caption text exceeds the TikTok description truncation threshold, THE Ad_Truncation_Engine
   SHALL truncate it at that threshold and append the configured "See more" label, preserving the
   existing `truncateTikTokPrimary` behavior.

### Requirement 12: Ad display-link character handling

**User Story:** As an advertiser, I want display-link and path fields validated against their real
caps, so that my preview never shows a link that the platform would reject or trim.

#### Acceptance Criteria

1. WHERE a platform defines a Display_Link character cap, THE Link_Behavior_Config SHALL record that
   cap and THE Ad_Truncation_Engine SHALL clamp the Display_Link to it.
2. WHERE a platform defines a Display_Link character cap of zero, THE Ad_Preview_Simulator SHALL
   disable the Display_Link entirely for that platform.
3. THE Ad_Truncation_Engine SHALL perform all Display_Link and Display_Path clamping using
   grapheme-safe slicing so that emoji and combining marks are not split.
4. IF a provided Display_Path segment is empty, THEN THE Ad_Preview_Simulator SHALL omit that
   segment from the display URL.

### Requirement 13: Backward compatibility with existing behavior and tests

**User Story:** As a maintainer, I want the existing counters, ad simulators, and their tests to keep
passing, so that this feature adds link-display accuracy without regressions.

#### Acceptance Criteria

1. THE Text_Engine SHALL preserve the existing results of `detectUrls`, `weightedLength`,
   `charCount`, and `byteCounts` for all inputs that the current test suite exercises.
2. THE Ad_Truncation_Engine SHALL preserve the existing results of `truncateFacebookPrimary`,
   `truncateTikTokPrimary`, `clampGoogleField`, `instagramReelsFit`, and `googleHeadlineFits`.
3. WHEN the existing test suites in `src/lib` run after this feature, THE test suites SHALL pass
   without modification to assertions that cover unchanged behavior.
4. THE Link_Behavior_Config SHALL preserve the existing `AD_PLATFORM_CONFIG` thresholds and the
   existing `PLATFORM_COUNTERS` field limits.

### Requirement 14: Internationalization compliance

**User Story:** As an international user, I want all new link-display guidance localized, so that the
counter and ad pages read natively in my language.

#### Acceptance Criteria

1. THE Platform_Counter and Ad_Preview_Simulator SHALL resolve every user-visible link-display string
   from the i18n translation records.
2. THE i18n type definitions in `src/i18n/types.ts` SHALL declare every new translation key so that a
   missing key in any Locale produces a type error.
3. WHERE a Locale translation key is absent at render time, THE system SHALL fall back to the `en`
   value, consistent with the existing fallback behavior.
4. IF a Locale translation key is absent and the `en` fallback value is also absent, THEN THE system
   SHALL render the translation key identifier or a default placeholder message rather than empty
   content.
5. THE feature SHALL define new link-display strings for all ten Locales.

### Requirement 15: Accuracy and verifiability

**User Story:** As a maintainer, I want each platform's link-display rule to be sourced and
verifiable, so that the displayed facts stay accurate as platforms change.

#### Acceptance Criteria

1. THE Link_Behavior_Config SHALL record, for each platform link-display rule, the date the rule was
   last reviewed in ISO `YYYY-MM-DD` format.
2. THE Link_Behavior_Config SHALL store each platform's link-display facts in one record so that
   updating a platform's behavior requires a single edit.
3. WHEN a Platform_Counter or Ad_Preview_Simulator displays a link-display fact, THE displayed fact
   SHALL match the value stored in THE Link_Behavior_Config.
