# Requirements Document

## Introduction

The Share Link feature lets a visitor of a live preview or interactive tool page produce a single shareable URL that, when opened by anyone, reconstructs the exact editable state the original user was viewing. It is **zero-database**: the entire shareable state is encoded inside the URL itself, so no server-side storage, account, or backend write occurs.

The feature applies to the interactive islands rendered on the platform guide tool pages (`[lang]/[tool]/`, `[lang]/tools/[tool]/`), the Ad-preview pages (`[lang]/ad-previews/[tool]/`), the platform limits page (`[lang]/platform-limits`), and the embed pages, across all ten supported languages.

The encoded state covers the user-authored text content only: the post body text and (where applicable) the Rich Link Card title/description for the post-editor tools, and the input field values plus view toggles for the Ad-preview simulators. Attached media is an in-memory object URL that is intentionally never persisted; it MUST NOT be part of a shareable URL.

This feature is additive. It MUST NOT change or break the existing draft persistence behavior (the `sessionStorage` draft envelope under `post_truncate_active_draft`), any current page, or any current island. It reuses the existing draft-envelope serialization concept where the data shapes overlap, and follows the same "never throws / fall back to empty" parsing discipline.

## Glossary

- **Share_Link_Feature**: The overall capability that generates and consumes shareable URLs encoding interactive tool state.
- **Share_Link_Codec**: A pure, DOM-free, storage-free module that serializes a Share_Payload into a URL-embeddable token and parses such a token back into a Share_Payload. Modeled on the existing `draftEnvelope.ts` discipline.
- **Share_Payload**: The structured, versioned state object that a share link carries. Contains a schema version, the source tool/platform identity, and the tool's user-authored text state.
- **Share_Token**: The compact, URL-safe string representation of a Share_Payload (base64url-encoded JSON, optionally compressed), placed in the URL.
- **Share_Fragment**: The URL hash fragment (the portion after `#`) used to carry the Share_Token so it is never transmitted to or logged by the server, consistent with the zero-database constraint.
- **Share_Button**: The user-facing control on an interactive tool page that generates a share link for the current state and copies it to the clipboard.
- **Schema_Version**: An integer embedded in every Share_Payload identifying the payload format, used to detect incompatible or future versions.
- **Editor_Tool**: An interactive post-editor island whose authored state is the post body text plus optional Rich Link Card title/description (e.g. the Dashboard/Workspace-backed platform guide tools).
- **Ad_Preview_Tool**: An Ad-preview simulator island whose authored state is a set of named input field values plus view toggles (e.g. Google RSA, Facebook Feed, Instagram, TikTok ad simulators).
- **Draft_Envelope**: The existing `sessionStorage`-persisted draft object (`text`, optional `cardTitle`, optional `cardDescription`) defined in `src/lib/draftEnvelope.ts`.
- **Attached_Media**: An in-memory object URL for an uploaded image or video, never persisted and dropped on reload.
- **Active_Locale**: The language of the page the user is viewing, one of the ten supported locale codes (`en`, `es`, `de`, `fr`, `pt`, `it`, `nl`, `ja`, `zh`, `da`).
- **Clipboard_API**: The browser `navigator.clipboard` interface used to copy a generated share link.
- **Toast_Message**: A transient, localized on-screen status message confirming success or reporting an error of a share action.

## Requirements

### Requirement 1: Generate a shareable link from current tool state

**User Story:** As a user editing a preview or tool, I want to generate a link that captures what I am currently viewing, so that I can send the exact state to someone else without any account or upload.

#### Acceptance Criteria

1. WHERE an interactive tool page is rendered, THE Share_Link_Feature SHALL display a Share_Button within that tool's island.
2. WHEN the user activates the Share_Button, THE Share_Link_Feature SHALL build a Share_Payload from the tool's current user-authored text state.
3. WHEN a Share_Payload is built, THE Share_Link_Codec SHALL serialize the Share_Payload into a Share_Token.
4. WHEN a Share_Token is produced, THE Share_Link_Feature SHALL construct an absolute URL that targets the current page path and carries the Share_Token in the Share_Fragment.
5. WHEN the share URL is constructed, THE Share_Link_Feature SHALL copy the share URL to the clipboard using the Clipboard_API.
6. WHEN the share URL is copied successfully, THE Share_Link_Feature SHALL display a localized success Toast_Message.
7. THE Share_Payload SHALL exclude Attached_Media from its contents.

### Requirement 2: Encode editor-tool state

**User Story:** As a user of a post-editor tool, I want my post text and card metadata captured in the link, so that the recipient sees the same composed post.

#### Acceptance Criteria

1. WHERE the source island is an Editor_Tool, THE Share_Link_Codec SHALL include the post body text in the Share_Payload.
2. WHERE the source island is an Editor_Tool AND the user has supplied a Rich Link Card title whose value is not empty and not whitespace-only, THE Share_Link_Codec SHALL include the card title in the Share_Payload.
3. WHERE the source island is an Editor_Tool AND the user has supplied a Rich Link Card description whose value is not empty and not whitespace-only, THE Share_Link_Codec SHALL include the card description in the Share_Payload.
4. WHEN a Rich Link Card title or description field is empty or contains only whitespace, THE Share_Link_Feature SHALL omit that field from the Share_Payload rather than encoding an empty value.
5. THE Share_Payload text fields for an Editor_Tool SHALL use field names consistent with the Draft_Envelope (`text`, `cardTitle`, `cardDescription`).

### Requirement 3: Encode ad-preview-tool state

**User Story:** As a user of an Ad-preview simulator, I want my ad copy fields and view options captured in the link, so that the recipient sees the same simulated ad.

#### Acceptance Criteria

1. WHERE the source island is an Ad_Preview_Tool, THE Share_Link_Codec SHALL include each input field value that is not empty and not whitespace-only, keyed by its field identifier, in the Share_Payload.
2. WHEN an Ad_Preview_Tool input field is empty or contains only whitespace, THE Share_Link_Feature SHALL omit that field from the Share_Payload.
3. WHERE the source island is an Ad_Preview_Tool, THE Share_Link_Codec SHALL include the active view toggles supported by that simulator (device, mode, safe-zone, destination URL, call-to-action, final URL, display paths) in the Share_Payload.
4. THE Share_Payload for an Ad_Preview_Tool SHALL record the platform identifier of the source simulator.

### Requirement 4: Versioned, URL-safe encoding

**User Story:** As a maintainer, I want the encoded payload versioned and URL-safe, so that links remain decodable and the format can evolve without breaking older links.

#### Acceptance Criteria

1. THE Share_Link_Codec SHALL embed a Schema_Version integer in every Share_Payload.
2. THE Share_Link_Codec SHALL encode the Share_Token using a URL-safe alphabet (base64url) that requires no additional percent-encoding inside the Share_Fragment.
3. WHEN the Share_Link_Codec serializes a Share_Payload, THE Share_Link_Codec SHALL produce a Share_Token that the Share_Link_Codec can parse back into an equivalent Share_Payload.
4. FOR ALL valid Share_Payload values, serializing the Share_Payload to a Share_Token and then parsing that Share_Token SHALL produce a Share_Payload equal to the original (round-trip property).

### Requirement 5: Reconstruct state when opening a share link

**User Story:** As a recipient, I want opening a share link to restore the sender's state, so that I see exactly what was shared.

#### Acceptance Criteria

1. WHEN an interactive tool page loads AND the Share_Fragment contains a Share_Token, THE Share_Link_Feature SHALL parse the Share_Token into a Share_Payload using the Share_Link_Codec.
2. WHEN a Share_Payload is parsed for an Editor_Tool, THE Share_Link_Feature SHALL initialize the editor body text, card title, and card description from the Share_Payload.
3. WHEN a Share_Payload is parsed for an Ad_Preview_Tool, THE Share_Link_Feature SHALL initialize the simulator field values and view toggles from the Share_Payload.
4. IF the Share_Payload targets a tool identity that differs from the current page's tool, THEN THE Share_Link_Feature SHALL apply only the state fields valid for the current tool and ignore the rest.
5. WHEN state is reconstructed from a Share_Token, THE Share_Link_Feature SHALL leave Attached_Media empty.

### Requirement 6: Graceful degradation for invalid links

**User Story:** As a recipient who opens a damaged or outdated link, I want the page to still work, so that a bad link never breaks the tool.

#### Acceptance Criteria

1. THE Share_Link_Codec SHALL parse any input string without throwing an exception.
2. IF the Share_Fragment is absent or empty, THEN THE Share_Link_Feature SHALL load the tool in its normal default state.
3. IF the Share_Token is malformed or truncated, THEN THE Share_Link_Codec SHALL return a default-state Share_Payload and THE Share_Link_Feature SHALL load the tool in its default state.
4. IF the parsed Schema_Version is greater than the version supported by the running code, THEN THE Share_Link_Feature SHALL load the tool in its default state.
5. IF a parsed Share_Payload contains a field whose type does not match the expected type, THEN THE Share_Link_Codec SHALL omit that field and retain the remaining valid fields.

### Requirement 7: Preserve language across share and open

**User Story:** As a user, I want a shared link to open in the same language I was using, so that the recipient sees consistent content and UI.

#### Acceptance Criteria

1. WHEN the Share_Link_Feature constructs a share URL, THE Share_Link_Feature SHALL build the URL path using the Active_Locale segment of the current page.
2. WHEN a recipient opens a share URL, THE Share_Link_Feature SHALL render the page in the locale identified by the URL path segment.
3. THE Share_Link_Feature SHALL support generating and opening share links for each of the ten supported locales (`en`, `es`, `de`, `fr`, `pt`, `it`, `nl`, `ja`, `zh`, `da`).

### Requirement 8: Coexist with existing draft persistence

**User Story:** As an existing user, I want my saved draft behavior unchanged, so that the new feature does not disrupt the current experience.

#### Acceptance Criteria

1. THE Share_Link_Feature SHALL leave the Draft_Envelope `sessionStorage` key (`post_truncate_active_draft`) read and write behavior unchanged when no Share_Token is present.
2. WHEN a tool page loads with a Share_Token present, THE Share_Link_Feature SHALL initialize editor state from the Share_Token in preference to the stored Draft_Envelope.
3. WHILE a tool is in use, THE Share_Link_Feature SHALL allow the existing draft auto-save behavior to continue persisting subsequent edits to the Draft_Envelope.
4. IF the Clipboard_API is unavailable, THEN THE Share_Link_Feature SHALL present the generated share URL for manual copying without modifying the Draft_Envelope.

### Requirement 9: URL length handling

**User Story:** As a user sharing long content, I want the feature to behave predictably when content is large, so that I am not left with a silently broken link.

#### Acceptance Criteria

1. WHEN the Share_Link_Codec serializes a Share_Payload, THE Share_Link_Codec SHALL apply compression before base64url encoding to reduce Share_Token length.
2. IF the constructed share URL length exceeds 8000 characters, THEN THE Share_Link_Feature SHALL display a localized warning Toast_Message indicating the content is too large to share by link.
3. WHILE the share URL length is within 8000 characters, THE Share_Link_Feature SHALL generate and copy the link normally.

### Requirement 10: Localized share UI strings

**User Story:** As a non-English user, I want all share controls and messages in my language, so that the feature is usable in every supported locale.

#### Acceptance Criteria

1. THE Share_Link_Feature SHALL provide localized strings for the Share_Button label, the success Toast_Message, the error Toast_Message, the too-large warning Toast_Message, and the manual-copy fallback label.
2. THE Share_Link_Feature SHALL define the share UI strings as a typed entry in the island string table so that a missing key in any locale is a TypeScript error.
3. THE Share_Link_Feature SHALL include translations for all ten supported locales (`en`, `es`, `de`, `fr`, `pt`, `it`, `nl`, `ja`, `zh`, `da`).
4. WHERE a locale has not yet provided a share string, THE Share_Link_Feature SHALL fall back to the canonical English value.

### Requirement 11: Clipboard error handling

**User Story:** As a user, I want clear feedback when copying fails, so that I know the link was not placed on my clipboard.

#### Acceptance Criteria

1. IF the Clipboard_API write fails, THEN THE Share_Link_Feature SHALL display a localized error Toast_Message.
2. IF the Clipboard_API write fails, THEN THE Share_Link_Feature SHALL present the generated share URL so the user can copy it manually.
3. WHEN a Toast_Message is displayed, THE Share_Link_Feature SHALL dismiss the Toast_Message automatically after a fixed visible duration.

### Requirement 12: Accessibility of the share control

**User Story:** As a user relying on assistive technology, I want the share control and feedback to be accessible, so that I can use the feature without sight or a mouse.

#### Acceptance Criteria

1. THE Share_Button SHALL expose an accessible name describing its action.
2. THE Share_Button SHALL be operable by keyboard.
3. WHEN a Toast_Message is displayed, THE Share_Link_Feature SHALL announce the message through an ARIA live region.

### Requirement 13: Availability across page and tool types

**User Story:** As a user, I want sharing to work on every interactive page, so that the feature is consistent wherever I create content.

#### Acceptance Criteria

1. THE Share_Link_Feature SHALL be available on the platform guide tool pages (`[lang]/[tool]/` and `[lang]/tools/[tool]/`).
2. THE Share_Link_Feature SHALL be available on the Ad-preview pages (`[lang]/ad-previews/[tool]/`).
3. THE Share_Link_Feature SHALL be available on the platform limits page (`[lang]/platform-limits`).
4. WHERE a page renders an embeddable widget intended for third-party framing, THE Share_Link_Feature SHALL construct share URLs that target the canonical hosted page rather than the embedding host.
