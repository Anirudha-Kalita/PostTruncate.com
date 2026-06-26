# Requirements Document

## Introduction

The Ad Previews page on PostTruncate.com includes a Facebook ad preview tool that
currently models only the single-image / single-video Facebook **Feed** ad. Real
advertisers in 2026 run several other Facebook placements, and the tool does not
represent them. This feature expands the Facebook tool with a **format selector**
and adds accurate previews for two additional high-impact formats: **Reels** ads
(full-screen vertical 9:16 with creator chrome and a CTA overlay) and **Carousel**
ads (2–10 swipeable cards, each with its own media, headline, and optional
description). Stories and Collection formats are explicitly out of scope for this
feature and may be addressed in a later spec.

The expansion must match the existing Astro + Preact island architecture: it
reuses the orchestrating `AdSimulator` island, the shared media picker (in-memory
object URLs, never persisted), the safe-zone overlay pattern, the truncation
helpers in `adTruncation.ts`, the per-platform limits in `AD_PLATFORM_CONFIG`,
the share-link adapter, and the multi-locale i18n system (English canonical, other
locales fall back to English). Existing Facebook Reels UI strings (`subscribe`,
`fullscreen`, audio attribution) already present in the locale dictionaries are
wired into the new Reels preview rather than re-authored.

## Glossary

- **Facebook_Tool**: The Facebook ad preview tool mounted by the `AdSimulator`
  island on the Ad Previews page (`platform = 'facebook'`).
- **Ad_Format**: One of the selectable Facebook ad layouts: `feed`, `reels`, or
  `carousel`.
- **Format_Selector**: The control in the Facebook_Tool that lets the user choose
  the active Ad_Format.
- **Feed_Preview**: The existing single-image/single-video Facebook Feed ad
  preview (`FacebookFeedAd`), unchanged in behavior by this feature.
- **Reels_Preview**: The new full-screen vertical 9:16 Facebook Reels ad preview
  component.
- **Carousel_Preview**: The new Facebook Carousel ad preview component rendering
  2–10 swipeable cards.
- **Carousel_Card**: One card within a Carousel_Preview, holding its own media,
  headline, and optional description.
- **Primary_Text**: The advertiser body copy shown above the media/card area;
  folds behind "… See More" at the platform character cutoff.
- **Card_Headline**: The headline text belonging to a single Carousel_Card.
- **Card_Description**: The optional description text belonging to a single
  Carousel_Card.
- **Safe_Zone_Overlay**: The translucent banded overlay (`SafeZoneOverlay`) that
  marks regions where native UI covers the creative in 9:16 placements.
- **Media_Picker**: The in-browser file control that creates an in-memory object
  URL for an image or video; media is never uploaded, stored, or shared.
- **Status_Badge**: The Fits/Truncated badge shown in the preview card heading.
- **Share_Link**: The serialized URL that restores the visible toggles and
  non-empty field values; media is never included.
- **Ad_Config**: The `AD_PLATFORM_CONFIG.facebook` record holding Facebook
  character caps, cutoffs, and safe-zone insets.
- **Truncation_Helpers**: The pure functions in `src/lib/adTruncation.ts`.
- **Locale_Strings**: The i18n copy resolved via `adPreviewStrings(s)`, English
  canonical with en-fallback for other locales.

## Requirements

### Requirement 1: Facebook Ad Format Selection

**User Story:** As an advertiser, I want to choose between Feed, Reels, and
Carousel Facebook ad formats, so that I can preview the placement I am actually
running.

#### Acceptance Criteria

1. THE Facebook_Tool SHALL present a Format_Selector offering exactly three Ad_Format options in the order Feed, Reels, Carousel, with no additional or duplicate options.
2. WHEN the Facebook_Tool first mounts without a restoring Share_Link, THE Facebook_Tool SHALL set the active Ad_Format to Feed.
3. WHEN the user selects an Ad_Format, THE Facebook_Tool SHALL render exactly one preview component — the preview for the selected Ad_Format — within 200 milliseconds.
4. WHILE the active Ad_Format is Feed, THE Facebook_Tool SHALL render the Feed_Preview producing output identical to the pre-Format_Selector Feed_Preview for the same inputs.
5. THE Facebook_Tool SHALL display the localized label for each Ad_Format option resolved through Locale_Strings, falling back to the English canonical value when the active locale omits the label.
6. THE Format_Selector SHALL expose an accessible name and indicate the currently selected Ad_Format to assistive technology.
7. WHEN the user switches away from an Ad_Format and later returns to it, THE Facebook_Tool SHALL retain the shared Primary_Text and restore the previously entered field values for that Ad_Format.
8. IF a restoring Share_Link encodes an Ad_Format value that is missing or not one of Feed, Reels, or Carousel, THEN THE Facebook_Tool SHALL set the active Ad_Format to Feed.

### Requirement 2: Reels Ad Preview Layout and Chrome

**User Story:** As an advertiser, I want a Facebook Reels ad preview, so that I can
see how my vertical creative and copy appear with the native Reels interface.

#### Acceptance Criteria

1. WHILE the active Ad_Format is Reels, THE Reels_Preview SHALL render the creative in a full-screen vertical 9:16 frame.
2. THE Reels_Preview SHALL display the creator name and a Subscribe affordance using the Locale_Strings value for the active locale.
3. THE Reels_Preview SHALL display an audio-attribution label and a "Sponsored" disclosure using the Locale_Strings value for the active locale.
4. WHEN the Truncation_Helpers resolve a non-empty CTA label for the Facebook platform, THE Reels_Preview SHALL display a call-to-action overlay showing that label.
5. IF the Truncation_Helpers resolve a null or empty CTA label for the Facebook platform, THEN THE Reels_Preview SHALL omit the call-to-action overlay.
6. WHEN media is attached through the Media_Picker, THE Reels_Preview SHALL display that media scaled to fill the 9:16 frame with its aspect ratio preserved and overflow cropped, without distortion.
7. WHEN no media is attached, THE Reels_Preview SHALL display an empty-media placeholder using Locale_Strings.
8. THE Reels_Preview SHALL reuse the existing Facebook Reels Locale_Strings (`subscribe`, `fullscreen`, audio attribution) rather than introducing duplicate keys.

### Requirement 3: Reels Safe Zones

**User Story:** As an advertiser, I want to see Reels safe zones, so that I can keep
important text clear of the native interface overlays.

#### Acceptance Criteria

1. THE Facebook_Tool SHALL provide a safe-zone toggle while the active Ad_Format is Reels.
2. WHEN the Facebook_Tool first mounts the Reels Ad_Format without a restoring Share_Link, THE Facebook_Tool SHALL set the safe-zone toggle to enabled.
3. WHILE the active Ad_Format is Reels AND the safe-zone toggle is enabled, THE Reels_Preview SHALL render the Safe_Zone_Overlay using the Facebook Reels safe-zone insets defined in Ad_Config (top 14% of height, bottom 35% of height, right 15% of width).
4. WHILE the safe-zone toggle is disabled, THE Reels_Preview SHALL render the creative without the Safe_Zone_Overlay.
5. WHEN the user changes the safe-zone toggle, THE Reels_Preview SHALL show or hide the Safe_Zone_Overlay accordingly within 100 milliseconds.
6. WHILE the active Ad_Format is not Reels, THE Facebook_Tool SHALL not present the Reels safe-zone toggle.
7. WHERE the Safe_Zone_Overlay is shown, THE Reels_Preview SHALL display a localized safe-zone hint using Locale_Strings.

### Requirement 4: Reels Primary Text Truncation

**User Story:** As an advertiser, I want the Reels caption to truncate as Facebook
truncates it, so that I know how much of my copy viewers will read.

#### Acceptance Criteria

1. THE Ad_Config SHALL define the Reels Primary_Text cutoff for the Facebook platform as a single positive integer value measured in grapheme clusters.
2. WHEN the Primary_Text grapheme-cluster count is less than or equal to the Reels cutoff defined in Ad_Config, THE Reels_Preview SHALL display the Primary_Text in full without a truncation affordance.
3. WHEN the Primary_Text grapheme-cluster count exceeds the Reels cutoff defined in Ad_Config, THE Reels_Preview SHALL display the Primary_Text sliced to exactly the cutoff count of grapheme clusters, immediately followed by the "See More" affordance label configured in Ad_Config.
4. WHEN the Reels Primary_Text is truncated, THE Truncation_Helpers SHALL slice the text only on grapheme-cluster boundaries so that emoji and combining marks are never split.
5. IF the Primary_Text is empty, THEN THE Reels_Preview SHALL display no Primary_Text and no truncation affordance.

### Requirement 5: Carousel Card Set

**User Story:** As an advertiser, I want to build a Facebook carousel of multiple
cards, so that I can preview a multi-card ad as it will appear.

#### Acceptance Criteria

1. THE Ad_Config SHALL define the minimum number of Carousel_Card entries as 2 and the maximum number of Carousel_Card entries as 10.
2. WHEN the active Ad_Format is first set to Carousel, THE Carousel_Preview SHALL initialize with a number of Carousel_Card entries equal to the minimum defined in Ad_Config and SHALL set the active Carousel_Card to the first card.
3. WHEN the user adds a Carousel_Card AND the current card count is below the maximum defined in Ad_Config, THE Facebook_Tool SHALL append one Carousel_Card after the last existing card, increment the card count by 1, and set the active Carousel_Card to the newly appended card.
4. IF the user attempts to add a Carousel_Card AND the current card count equals the maximum defined in Ad_Config, THEN THE Facebook_Tool SHALL leave the card count unchanged and SHALL present a visible indication that the maximum card count has been reached.
5. WHEN the user removes a Carousel_Card AND the current card count is above the minimum defined in Ad_Config, THE Facebook_Tool SHALL remove the selected Carousel_Card and decrement the card count by 1.
6. IF the user attempts to remove a Carousel_Card AND the current card count equals the minimum defined in Ad_Config, THEN THE Facebook_Tool SHALL leave the card count unchanged and SHALL present a visible indication that the minimum card count has been reached.
7. WHEN the user removes the currently active Carousel_Card AND the removed card is not the last card in the set, THE Facebook_Tool SHALL set the active Carousel_Card to the card immediately following the removed card's position.
8. WHEN the user removes the currently active Carousel_Card AND the removed card is the last card in the set, THE Facebook_Tool SHALL set the active Carousel_Card to the card immediately preceding the removed card's position.

### Requirement 6: Carousel Card Content

**User Story:** As an advertiser, I want each carousel card to have its own media,
headline, and description, so that the preview reflects per-card creative.

#### Acceptance Criteria

1. THE Carousel_Preview SHALL render each Carousel_Card, for a carousel of 2 to 10 Carousel_Cards, with its own media area, a Card_Headline, and an optional Card_Description.
2. WHEN media is attached to a Carousel_Card through the Media_Picker, THE Carousel_Preview SHALL display that media for that Carousel_Card only and release any in-memory object URL previously displayed for that Carousel_Card.
3. THE Facebook_Tool SHALL hold each Carousel_Card media as an in-memory object URL that is never uploaded, stored, or included in a Share_Link.
4. THE Carousel_Preview SHALL display a single shared Primary_Text above the card area.
5. WHEN a Carousel_Card Card_Description is empty, THE Carousel_Preview SHALL render that Carousel_Card without a description region.
6. WHEN no media is attached to a Carousel_Card, THE Carousel_Preview SHALL display an empty-media placeholder for that Carousel_Card using Locale_Strings.
7. WHEN a Carousel_Card media is removed or the Carousel_Preview unmounts, THE Facebook_Tool SHALL release each affected in-memory object URL so that it is no longer retained in memory.

### Requirement 7: Carousel Field Limits and Truncation

**User Story:** As an advertiser, I want carousel card text to truncate at
Facebook's limits, so that headlines and descriptions preview accurately.

#### Acceptance Criteria

1. THE Ad_Config SHALL define a Card_Headline character cap and a Card_Description character cap, each expressed as a maximum count of grapheme clusters, for the Facebook Carousel format.
2. WHEN a Card_Headline grapheme-cluster length exceeds the Card_Headline cap defined in Ad_Config, THE Carousel_Preview SHALL display the Card_Headline clamped to exactly the cap length with no "See More" affordance appended.
3. WHEN a Card_Headline grapheme-cluster length is less than or equal to the Card_Headline cap defined in Ad_Config, THE Carousel_Preview SHALL display the Card_Headline in full without clamping.
4. WHEN a Card_Description grapheme-cluster length exceeds the Card_Description cap defined in Ad_Config, THE Carousel_Preview SHALL display the Card_Description clamped to exactly the cap length with no "See More" affordance appended.
5. WHEN a Card_Description grapheme-cluster length is less than or equal to the Card_Description cap defined in Ad_Config, THE Carousel_Preview SHALL display the Card_Description in full without clamping.
6. WHEN the shared Carousel Primary_Text grapheme-cluster length exceeds the Facebook feed Primary_Text cutoff defined in Ad_Config, THE Carousel_Preview SHALL display the Primary_Text truncated to the cutoff length followed by the configured "See More" affordance.
7. WHEN the shared Carousel Primary_Text grapheme-cluster length is less than or equal to the Facebook feed Primary_Text cutoff defined in Ad_Config, THE Carousel_Preview SHALL display the Primary_Text in full without a "See More" affordance.
8. WHEN any Carousel text field is clamped or truncated, THE Truncation_Helpers SHALL slice the text on grapheme-cluster boundaries so emoji and combining marks are never split.

### Requirement 8: Carousel Navigation

**User Story:** As an advertiser, I want to move between carousel cards in the
preview, so that I can inspect each card.

#### Acceptance Criteria

1. THE Carousel_Preview SHALL provide a next-card control and a previous-card control, where activating the next-card control advances the displayed Carousel_Card by one position and activating the previous-card control returns the displayed Carousel_Card by one position.
2. WHEN a navigation control is activated, THE Carousel_Preview SHALL update the displayed Carousel_Card within 200 milliseconds.
3. WHILE the first Carousel_Card (position 1) is displayed, THE Carousel_Preview SHALL render the previous-card control in a disabled, non-interactive state that does not change the displayed Carousel_Card when activated.
4. WHILE the last Carousel_Card (position equal to the total Carousel_Card count, with a supported range of 2 to 10 cards) is displayed, THE Carousel_Preview SHALL render the next-card control in a disabled, non-interactive state that does not change the displayed Carousel_Card when activated.
5. THE Carousel_Preview navigation controls SHALL expose accessible names sourced from Locale_Strings for both the next-card control and the previous-card control.
6. THE Carousel_Preview SHALL display a position indicator showing the current Carousel_Card position and the total Carousel_Card count in the form "current / total" (for example, "3 / 5").
7. WHEN the next-card control or previous-card control receives keyboard focus and is activated via the Enter key or the Space key, THE Carousel_Preview SHALL perform the same position change as activation by pointer, except when the control is in the disabled, non-interactive state.

### Requirement 9: Status Badge Per Format

**User Story:** As an advertiser, I want a Fits/Truncated indicator for each format,
so that I can tell at a glance whether my copy is being cut off.

#### Acceptance Criteria

1. WHILE the active Ad_Format is Reels AND at least one Reels field contains input AND no Reels field is truncated, THE Status_Badge SHALL display the localized "Fits" label using the safe tone.
2. WHILE the active Ad_Format is Reels AND the Reels Primary_Text is truncated, THE Status_Badge SHALL display the localized "Truncated" label using the warn tone.
3. WHILE the active Ad_Format is Carousel AND at least one Carousel field across any Carousel_Card contains input AND no Carousel field across any Carousel_Card is clamped or truncated, THE Status_Badge SHALL display the localized "Fits" label using the safe tone.
4. WHILE the active Ad_Format is Carousel AND any Carousel field across any Carousel_Card is clamped or truncated, THE Status_Badge SHALL display the localized "Truncated" label using the warn tone.
5. WHILE every editable field for the active Ad_Format is empty (zero characters entered), THE Status_Badge SHALL display the localized "Fits" label using the neutral tone.
6. WHEN any editable field for the active Ad_Format changes, THE Status_Badge SHALL recompute and reflect the resulting Fits/Truncated/empty state within 200 milliseconds.
7. THE Status_Badge SHALL convey its state through both the localized text label and the tone, never through tone (color) alone.

### Requirement 10: Share Link Integration

**User Story:** As an advertiser, I want to share a link that restores my selected
format and copy, so that a colleague can open the same preview.

#### Acceptance Criteria

1. WHEN the user generates a Share_Link, THE Facebook_Tool SHALL serialize the active Ad_Format identifier and every non-empty, non-whitespace-only field value into the Share_Link, and SHALL exclude any empty or whitespace-only field value.
2. WHEN the active Ad_Format is Carousel, THE Facebook_Tool SHALL serialize, in display order, each Carousel_Card's non-empty Card_Headline and non-empty Card_Description together with the single shared Primary_Text into the Share_Link.
3. WHEN a Share_Link encoding the Facebook platform is opened, THE Facebook_Tool SHALL restore the encoded active Ad_Format and assign each serialized field value to its corresponding field, and SHALL leave fields with no serialized value empty.
4. WHEN a Share_Link encoding the Carousel Ad_Format is opened, THE Facebook_Tool SHALL restore a number of Carousel_Cards equal to the count of serialized cards and populate each card from its serialized values in the serialized order.
5. WHEN a Share_Link is opened, THE Facebook_Tool SHALL leave all media fields empty because media is never serialized into the Share_Link.
6. IF an opened Share_Link encodes a missing, malformed, or unrecognized Ad_Format value, THEN THE Facebook_Tool SHALL fall back to the Feed Ad_Format and restore the remaining valid serialized field values.
7. IF a Share_Link encodes a platform other than Facebook, THEN THE Facebook_Tool SHALL disregard the encoded state and restore its default Ad_Format and default (empty) field values.

### Requirement 11: Localization

**User Story:** As a non-English user, I want the new format copy in my language,
so that the tool is usable in my locale.

#### Acceptance Criteria

1. WHEN the Facebook_Tool renders any new format-related UI copy, THE Facebook_Tool SHALL resolve the displayed text through the Locale_Strings resolver for the active locale rather than from hardcoded inline literals.
2. IF a locale dictionary omits a new format string key, or provides it as an empty or whitespace-only value, THEN THE Facebook_Tool SHALL render the English canonical value for that key and SHALL NOT render an empty string, the raw key name, or a placeholder token.
3. THE Facebook_Tool SHALL define every new format string key in the English canonical dictionary so that the English canonical value is non-empty for all new keys.
4. THE Facebook_Tool SHALL extend the IslandStrings type so that every new format string key is a declared member, such that a missing or misspelled key in any locale dictionary is a compile-time TypeScript error rather than a runtime fallback.
5. WHEN the Reels_Preview requires a string that matches an existing Facebook Reels Locale_Strings key, THE Reels_Preview SHALL read the existing key and SHALL NOT introduce a new duplicate key for the same displayed text.

### Requirement 12: Accessibility and Responsive Behavior

**User Story:** As a user relying on assistive technology or a small screen, I want
the new formats to be accessible and responsive, so that I can use the tool on any
device.

#### Acceptance Criteria

1. WHEN a user navigates with the keyboard, THE Facebook_Tool SHALL make every Format_Selector option and every Carousel navigation control reachable via Tab and Shift+Tab in a sequential focus order, activatable via Enter or Space, and SHALL allow Carousel slide navigation via the Left and Right Arrow keys.
2. THE Format_Selector options and Carousel navigation controls SHALL each expose a non-empty accessible name and a control role to assistive technology, and the currently selected Format_Selector option SHALL expose its selected state.
3. WHILE any Format_Selector option or Carousel navigation control has keyboard focus, THE Facebook_Tool SHALL render a visible focus indicator whose contrast ratio against adjacent colors is at least 3:1.
4. WHILE the active Ad_Format is Reels or Carousel, THE Facebook_Tool SHALL render its preview with no clipping of controls or text and no horizontal scrolling of the preview container at viewport widths from 320px to 767px (mobile) and at viewport widths of 1024px and above (desktop).
5. THE Reels_Preview and Carousel_Preview SHALL maintain a text-contrast ratio of at least 4.5:1 for body text rendered over media or solid backgrounds.
6. WHERE body text is rendered over user-supplied media, THE Facebook_Tool SHALL apply a scrim or overlay sufficient to maintain a text-contrast ratio of at least 4.5:1 against the media beneath the text.

### Requirement 13: Configuration and Helper Reuse

**User Story:** As a maintainer, I want new limits and logic centralized, so that
the preview and its tests cannot drift.

#### Acceptance Criteria

1. THE Facebook_Tool SHALL resolve every Reels and Carousel character cap, "See More" cutoff, card-count bound, and safe-zone inset value used by any preview component from Ad_Config, such that no preview component contains a numeric literal for these values.
2. WHEN a Reels or Carousel preview component truncates text, THE Facebook_Tool SHALL perform that truncation by calling a function exported from Truncation_Helpers, such that no preview component contains inline string-slicing logic.
3. WHERE a required Reels or Carousel limit is not yet defined in Ad_Config, THE Facebook_Tool SHALL add that limit to Ad_Config rather than hard-code the value in a preview component.
4. THE Truncation_Helpers added or extended for Reels and Carousel SHALL be pure, returning identical output for identical input, producing no observable side effects, and referencing no DOM, window, or document API, so they remain unit-testable without a rendering environment.
5. IF a preview component references a Reels or Carousel limit that is absent from Ad_Config, THEN THE Facebook_Tool SHALL fail at build/type-check time rather than render with a hard-coded fallback value.
