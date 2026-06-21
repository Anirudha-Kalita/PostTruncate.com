# Requirements Document

## Introduction

PostTruncate.com is a browser-only social media post analyzer. Its live preview editor
(`src/components/island/Dashboard.tsx` owning editor state plus an 80ms debounced analysis,
`src/components/island/Workspace.tsx` providing the textarea) feeds per-platform preview islands
(`LinkedInPreview.tsx`, `TwitterPreview.tsx`, `ThreadsPreview.tsx`, `TikTokPreview.tsx`, plus ad
simulators). Today those previews render the post body text and platform-specific fold/truncation
behavior, but they do not simulate what real social platforms do when a URL is present: collapse the
link into a rich, clickable Open Graph-style preview card (title, description, domain, favicon,
image).

This feature adds that simulation. When a URL is typed into the editor, the matching platform preview
SHALL automatically render the link the way that platform renders it: a rich preview card for the six
`preview-card` platforms (Facebook, LinkedIn, Threads, Discord, WhatsApp, Bluesky), and an accurate,
visually-differentiated non-card treatment for `plain-text` platforms (Instagram, TikTok, YouTube
Shorts), the `counted-shortened` platform (X/Twitter), and `clickable-inline` platforms (Reddit,
Pinterest).

Two architectural decisions, confirmed during requirements gathering, shape this work:

1. **Metadata is sourced entirely client-side with no network.** PostTruncate has no backend (the lone
   exception is `src/pages/api/improve.ts`), and fetching Open Graph metadata from arbitrary external
   URLs from the browser is blocked by CORS. Therefore the preview card's title, description, and image
   come from **user-editable mock fields** with smart placeholder prefill, while the domain and a
   favicon are **derived locally from the typed URL**. No request is made to the linked URL or any
   third party.
2. **`src/data/linkBehavior.ts` is the single source of truth.** This feature reuses the existing
   `LINK_BEHAVIOR` classification (`model`, `countMode`, `cardFromFirstUrlOnly`, `byteIndexedFacets`,
   `bioLinkAllowance`) and extends it with per-platform card-layout facts rather than duplicating any
   platform classification.

This document defines **what** the system must do. Implementation choices (component layout, exact
markup, state plumbing) are deferred to the design phase.

## Glossary

- **Editor**: The live preview editing surface owned by `Dashboard.tsx`, with the textarea and
  counters in `Workspace.tsx`, that holds the post body text and the currently selected platform.
- **Text_Engine**: The pure, DOM-free module `src/lib/textTools.ts` exposing `detectUrls`,
  `weightedLength`, `charCount`, and related helpers.
- **Link_Behavior_Config**: The existing single source-of-truth module `src/data/linkBehavior.ts`
  (`LINK_BEHAVIOR`) classifying each platform's `Link_Display_Model`, `countMode`,
  `cardFromFirstUrlOnly`, `byteIndexedFacets`, and `bioLinkAllowance`.
- **Link_Display_Model**: A platform's link-rendering classification from Link_Behavior_Config:
  `counted-shortened`, `plain-text`, `preview-card`, or `clickable-inline`.
- **Preview_Card_Platform**: A platform whose Link_Display_Model is `preview-card`: Facebook,
  LinkedIn, Threads, Discord, WhatsApp, and Bluesky.
- **Plain_Text_Platform**: A platform whose Link_Display_Model is `plain-text`: Instagram, TikTok,
  and YouTube Shorts.
- **Counted_Shortened_Platform**: A platform whose Link_Display_Model is `counted-shortened`:
  X/Twitter.
- **Clickable_Inline_Platform**: A platform whose Link_Display_Model is `clickable-inline`: Reddit
  and Pinterest.
- **Rich_Link_Card**: The simulated Open Graph preview banner rendered in a Preview_Card_Platform
  preview, composed of Card_Metadata fields arranged per that platform's Card_Layout_Profile.
- **Card_Metadata**: The set of values that populate a Rich_Link_Card: Card_Title, Card_Description,
  Card_Image, Card_Domain, and Card_Favicon.
- **Card_Title**: The headline text of a Rich_Link_Card, supplied by the user or a smart placeholder.
- **Card_Description**: The summary text of a Rich_Link_Card, supplied by the user or a smart
  placeholder.
- **Card_Image**: The optional image attached to a Rich_Link_Card, supplied as a user-attached object
  URL using the Editor's existing media-attachment mechanism.
- **Card_Domain**: The host portion derived locally from the detected URL (for example `example.com`
  from `https://example.com/path?q=1`).
- **Card_Favicon**: A small site icon shown beside the Card_Domain, derived locally from the detected
  URL without contacting the linked site.
- **First_URL**: The first URL detected by `detectUrls` in the post body, in document order.
- **Card_Layout_Profile**: A per-Preview_Card_Platform record of that platform's visual link-card
  facts: Card_Image_Ratio, image-presentation style, Card_Title truncation length, Card_Description
  truncation length, Card_Domain placement and casing, and whether the raw URL text is removed once
  the card renders.
- **Card_Image_Ratio**: The aspect ratio a platform uses for a large Rich_Link_Card image, expressed
  as width:height (the Open Graph standard large-image ratio is 1.91:1).
- **Card_Field_Editor**: The user-facing controls that let the user edit Card_Title,
  Card_Description, and attach a Card_Image for the active Rich_Link_Card.
- **Theme**: The active light or dark color mode, applied through the project's Tailwind v4 token-swap.
- **Locale**: One of the ten supported language codes: `en`, `es`, `de`, `fr`, `pt`, `it`, `nl`,
  `ja`, `zh`, `da`.

## Requirements

### Requirement 1: Automatic link-card trigger from editor text

**User Story:** As a creator, I want a link card to appear automatically the moment I type a URL into
the editor, so that the preview behaves like the real platform without extra steps.

#### Acceptance Criteria

1. WHEN the Editor body text contains at least one URL detected by `detectUrls` AND the selected
   platform is a Preview_Card_Platform, THE Editor SHALL render a Rich_Link_Card in that platform's
   preview.
2. WHEN the Editor body text contains no URL detected by `detectUrls`, THE Editor SHALL render no
   Rich_Link_Card and SHALL omit the Card_Field_Editor.
3. WHEN the user edits the Editor body text, THE Editor SHALL update or remove the Rich_Link_Card
   within the existing debounced analysis cycle without performing any network request.
4. THE Editor SHALL determine the link-card behavior for the selected platform by reading the
   Link_Display_Model from THE Link_Behavior_Config rather than from a duplicated platform list.

### Requirement 2: Client-side metadata sourcing without network access

**User Story:** As a privacy-conscious user of a browser-only tool, I want the card metadata to be
generated locally, so that no request is sent to the linked site or any third party.

#### Acceptance Criteria

1. WHEN a Rich_Link_Card is rendered, THE Editor SHALL populate Card_Title and Card_Description from
   user-editable fields rather than from any fetched resource.
2. THE Editor SHALL NOT issue a network request to the detected URL, the linked site, or any
   third-party metadata service when building a Rich_Link_Card. (Error-handling exception to the
   positive-statement rule: this prohibition is required to preserve the no-backend, CORS-safe
   constraint.)
3. WHEN no user-supplied Card_Title is present, THE Editor SHALL prefill Card_Title with a smart
   placeholder derived locally from the Card_Domain.
4. WHEN no user-supplied Card_Description is present, THE Editor SHALL prefill Card_Description with a
   smart placeholder resolved from THE Locale translations.
5. THE Editor SHALL resolve every fixed user-visible label in the Card_Field_Editor and Rich_Link_Card
   from THE Locale translations.

### Requirement 3: Local domain and favicon derivation

**User Story:** As a creator, I want the card to show the correct domain and a site icon for my link,
so that the preview matches what the platform displays beneath the title.

#### Acceptance Criteria

1. WHEN the Editor derives a Card_Domain from a detected URL, THE Editor SHALL extract the host
   component of that URL with any leading `www.` prefix removed.
2. FOR ALL detected URLs that parse to a valid host, the derived Card_Domain SHALL be a case-folded
   suffix of that URL's host component (invariant: the displayed domain is never fabricated text that
   is absent from the URL host).
3. WHEN a detected URL omits a scheme (for example `example.com/path`), THE Editor SHALL still derive
   the Card_Domain from the host portion of that URL.
4. THE Editor SHALL derive the Card_Favicon reference locally from the Card_Domain without contacting
   the linked site.
5. IF a detected URL cannot be parsed into a valid host, THEN THE Editor SHALL render the Rich_Link_Card
   using the raw detected URL text as the Card_Domain and SHALL omit the Card_Favicon.

### Requirement 4: User-editable card fields and image attachment

**User Story:** As a creator, I want to edit the card title and description and attach an image, so
that I can simulate exactly how my shared link will look.

#### Acceptance Criteria

1. WHILE a Rich_Link_Card is rendered, THE Card_Field_Editor SHALL provide an editable Card_Title
   control and an editable Card_Description control.
2. WHEN the user edits the Card_Title or Card_Description, THE Editor SHALL update the rendered
   Rich_Link_Card to reflect the edited value within the existing debounced analysis cycle.
3. THE Card_Field_Editor SHALL let the user attach a Card_Image using the Editor's existing
   media-attachment object-URL mechanism.
4. WHEN the user attaches a Card_Image, THE Rich_Link_Card SHALL display that image in the active
   platform's image-presentation style.
5. WHEN the user attaches no Card_Image, THE Rich_Link_Card SHALL render the active platform's
   no-image card form as defined by that platform's Card_Layout_Profile.

### Requirement 5: First-URL card selection

**User Story:** As a creator who pastes several links, I want only the first link to become the card,
so that the preview matches platforms that build the card from the first detected URL.

#### Acceptance Criteria

1. WHERE the selected Preview_Card_Platform has `cardFromFirstUrlOnly` set in THE Link_Behavior_Config,
   THE Editor SHALL build the Rich_Link_Card from the First_URL only.
2. WHERE the selected Preview_Card_Platform has `cardFromFirstUrlOnly` set AND more than one URL is
   detected, THE Editor SHALL indicate, using text resolved from THE Locale translations, which
   detected URL became the Rich_Link_Card.
3. WHERE the selected Preview_Card_Platform does not set `cardFromFirstUrlOnly`, THE Editor SHALL build
   the Rich_Link_Card from the First_URL as the default.

### Requirement 6: Per-platform card-layout fidelity configuration

**User Story:** As a maintainer, I want each platform's card visual facts recorded in one place tied to
the existing link-behavior config, so that fidelity rules never drift and can be reviewed and updated in
a single edit.

#### Acceptance Criteria

1. THE Link_Behavior_Config SHALL provide, for each Preview_Card_Platform, a Card_Layout_Profile
   recording the Card_Image_Ratio, the image-presentation style, the Card_Title truncation length, the
   Card_Description truncation length, the Card_Domain placement and casing, and whether the raw URL
   text is removed once the card renders.
2. THE Editor SHALL render each Rich_Link_Card using the Card_Layout_Profile values for the selected
   platform rather than values hard-coded in the preview component.
3. IF a Preview_Card_Platform has no Card_Layout_Profile in THE Link_Behavior_Config, THEN THE build or
   test suite SHALL report a failure identifying the missing platform.
4. THE Link_Behavior_Config SHALL record, for each Card_Layout_Profile, the date the layout facts were
   last reviewed in ISO `YYYY-MM-DD` format.

### Requirement 7: Card title and description truncation

**User Story:** As a creator, I want the card title and description to truncate exactly as the platform
truncates them, so that the preview reflects the real clipped text.

#### Acceptance Criteria

1. WHEN a Card_Title exceeds the selected platform's Card_Title truncation length from its
   Card_Layout_Profile, THE Rich_Link_Card SHALL display the Card_Title clipped to that length followed
   by a single ellipsis indicator.
2. WHEN a Card_Description exceeds the selected platform's Card_Description truncation length from its
   Card_Layout_Profile, THE Rich_Link_Card SHALL display the Card_Description clipped to that length
   followed by a single ellipsis indicator.
3. WHEN a Card_Title or Card_Description is within the platform's truncation length, THE Rich_Link_Card
   SHALL display that text in full with no ellipsis indicator.
4. THE Rich_Link_Card SHALL perform Card_Title and Card_Description truncation using grapheme-safe
   slicing so that emoji and combining marks are not split.
5. WHERE a platform's Card_Layout_Profile sets the Card_Description truncation length to zero, THE
   Rich_Link_Card SHALL omit the Card_Description region for that platform.

### Requirement 8: Preview-card platform visual differentiation

**User Story:** As a creator, I want each preview-card platform to look like that specific platform's
real link card, so that the simulation is credible per platform rather than one generic card.

#### Acceptance Criteria

1. WHEN the selected platform is Facebook, THE Rich_Link_Card SHALL render the Card_Image at the
   large 1.91:1 Card_Image_Ratio above a panel showing the Card_Domain in uppercase, the Card_Title,
   and the Card_Description, consistent with Facebook's Card_Layout_Profile.
2. WHEN the selected platform is LinkedIn, THE Rich_Link_Card SHALL render the Card_Image at the large
   1.91:1 Card_Image_Ratio above a panel showing the Card_Title and the Card_Domain, consistent with
   LinkedIn's Card_Layout_Profile.
3. WHEN the selected platform is Threads, THE Rich_Link_Card SHALL render a compact link chip showing a
   thumbnail Card_Image, the Card_Title, and the Card_Domain, consistent with Threads's
   Card_Layout_Profile.
4. WHEN the selected platform is Discord, THE Rich_Link_Card SHALL render an embed form with a leading
   accent bar, the Card_Domain as the site name, the Card_Title, the Card_Description, and the
   Card_Image, consistent with Discord's Card_Layout_Profile.
5. WHEN the selected platform is WhatsApp, THE Rich_Link_Card SHALL render an in-bubble preview showing
   the Card_Image, the Card_Title, the Card_Description, and the Card_Domain, consistent with
   WhatsApp's Card_Layout_Profile.
6. WHEN the selected platform is Bluesky, THE Rich_Link_Card SHALL render the Card_Image at the large
   1.91:1 Card_Image_Ratio above a panel showing the Card_Title, the Card_Description, and the
   Card_Domain, consistent with Bluesky's Card_Layout_Profile.

### Requirement 9: Raw URL text handling once the card renders

**User Story:** As a creator, I want the raw URL to be dropped from the visible post text in the
preview when the platform drops it, so that my simulated post copy looks clean exactly like the real
post.

#### Acceptance Criteria

1. WHERE the selected Preview_Card_Platform's Card_Layout_Profile marks the raw URL as removed once the
   card renders, THE preview SHALL display the post body with the First_URL text omitted while the
   Rich_Link_Card is shown.
2. WHERE the selected Preview_Card_Platform's Card_Layout_Profile marks the raw URL as retained, THE
   preview SHALL display the post body with the URL text kept inline alongside the Rich_Link_Card.
3. THE Editor SHALL leave the underlying post body text in the textarea unchanged regardless of whether
   the preview omits the raw URL text.
4. THE Editor SHALL leave the character-count and limit indicators computed from the full body text,
   including the URL characters, unchanged by the preview's URL omission.

### Requirement 10: Non-clickable view-only card behavior

**User Story:** As a creator, I want the preview card to be a visual preview only that does not
navigate anywhere, so that the card just shows how the link will look without acting as a working link.

#### Acceptance Criteria

1. WHEN a Rich_Link_Card is rendered, THE Rich_Link_Card SHALL render as a non-interactive visual
   element rather than as a link or anchor.
2. WHEN the user activates a Rich_Link_Card, THE Editor SHALL neither navigate to nor open the detected
   URL or any other URL.
3. THE Rich_Link_Card SHALL present itself to assistive technology as a static preview rather than as a
   link.
4. WHEN a Rich_Link_Card includes a Card_Image, THE Rich_Link_Card SHALL provide alternative text for
   that image derived from the Card_Title.
5. THE Rich_Link_Card SHALL provide an accessible name derived from the Card_Title and the Card_Domain
   without exposing a clickable link role.

### Requirement 11: Plain-text platform link treatment

**User Story:** As an Instagram, TikTok, or YouTube Shorts creator, I want the preview to show that my
link is non-clickable plain text rather than a card, so that I know to move the link to my bio.

#### Acceptance Criteria

1. WHEN the selected platform is a Plain_Text_Platform AND the body text contains a detected URL, THE
   preview SHALL render the URL as literal non-clickable text and SHALL render no Rich_Link_Card.
2. WHEN the selected platform is a Plain_Text_Platform AND the body text contains a detected URL, THE
   preview SHALL display a non-clickable-link indication using text resolved from THE Locale
   translations.
3. WHERE a Plain_Text_Platform records a `bioLinkAllowance` in THE Link_Behavior_Config, THE preview
   SHALL state the maximum number of clickable bio links permitted for that platform.

### Requirement 12: Counted-shortened and clickable-inline platform link treatment

**User Story:** As an X/Twitter, Reddit, or Pinterest creator, I want the preview to reflect my
platform's link handling without forcing a rich card, so that the simulation stays accurate for
non-card platforms.

#### Acceptance Criteria

1. WHEN the selected platform is the Counted_Shortened_Platform AND the body text contains a detected
   URL, THE preview SHALL continue to render the existing X/Twitter treatment counting each URL at the
   fixed `LIMITS.URL_WEIGHT` weight and SHALL render no Rich_Link_Card.
2. WHEN the selected platform is a Clickable_Inline_Platform AND the body text contains a detected URL,
   THE preview SHALL render the URL as a clickable inline link and SHALL render no Rich_Link_Card.
3. WHEN the selected platform is a Clickable_Inline_Platform AND the body text contains a detected URL,
   THE preview SHALL display a clickable-inline indication using text resolved from THE Locale
   translations.

### Requirement 13: Theme and accessibility compliance

**User Story:** As a user in dark mode or using assistive technology, I want the link cards to render
correctly in my theme and be accessible, so that the tool is usable for everyone.

#### Acceptance Criteria

1. WHILE the active Theme is dark, THE Rich_Link_Card SHALL render using the project's dark-mode design
   tokens so that Card_Title, Card_Description, and Card_Domain text meet a contrast ratio of at least
   4.5:1 against the card background.
2. WHEN a Rich_Link_Card includes a Card_Image, THE Rich_Link_Card SHALL provide alternative text for
   that image resolved from the Card_Title or a Locale-translated default.
3. THE Card_Field_Editor controls SHALL be operable by keyboard and SHALL expose accessible labels
   resolved from THE Locale translations.
4. THE Rich_Link_Card SHALL apply visual styling using the project's Tailwind v4 design tokens rather
   than arbitrary values.

### Requirement 14: Reuse of and consistency with Link_Behavior_Config

**User Story:** As a maintainer, I want this feature to extend the existing link-behavior config rather
than duplicate it, so that the counters, the existing previews, and the new cards never disagree.

#### Acceptance Criteria

1. THE Editor SHALL read each platform's Link_Display_Model, `cardFromFirstUrlOnly`, `byteIndexedFacets`,
   and `bioLinkAllowance` from THE Link_Behavior_Config without redefining those values elsewhere.
2. THE feature SHALL add Card_Layout_Profile data to THE Link_Behavior_Config module as the single
   source of truth for card visual facts.
3. WHEN a Rich_Link_Card displays a link-display fact also recorded in THE Link_Behavior_Config, THE
   displayed fact SHALL match the value stored in THE Link_Behavior_Config.
4. THE Text_Engine SHALL keep the public signatures and existing results of `detectUrls`,
   `weightedLength`, and `charCount` unchanged for all inputs the current test suite exercises.

### Requirement 15: Internationalization compliance

**User Story:** As an international user, I want all card labels, placeholders, and link-display
indications localized, so that the preview reads natively in my language.

#### Acceptance Criteria

1. THE feature SHALL resolve every user-visible string introduced by the Rich_Link_Card, the
   Card_Field_Editor, and the non-card link-display indications from the i18n translation records.
2. THE i18n type definitions in `src/i18n/types.ts` SHALL declare every new translation key so that a
   missing key in any Locale produces a type error.
3. THE feature SHALL define new link-card strings for all ten Locales, with `src/i18n/en.ts` as the
   canonical source.
4. WHERE a Locale translation key is absent at render time, THE Editor SHALL fall back to the `en`
   value, consistent with the existing fallback behavior.

### Requirement 16: Backward compatibility with existing previews and tests

**User Story:** As a maintainer, I want the existing previews, counters, and their tests to keep
passing, so that this feature adds link-card simulation without regressions.

#### Acceptance Criteria

1. WHEN the body text contains no detected URL, THE existing platform previews SHALL render exactly as
   they do today with no Rich_Link_Card and no Card_Field_Editor.
2. THE feature SHALL preserve the existing fold, truncation, thread-splitting, and counter behavior of
   `LinkedInPreview`, `TwitterPreview`, `ThreadsPreview`, and `TikTokPreview` for text that contains no
   URL.
3. WHEN the existing unit and browser test suites run after this feature, THE suites SHALL pass without
   modification to assertions that cover unchanged behavior.
4. THE feature SHALL keep the Editor's draft `sessionStorage` persistence behavior intact, persisting
   any new Card_Metadata the user enters alongside the existing draft.
