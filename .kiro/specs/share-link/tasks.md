# Implementation Plan: Share Link

## Overview

This plan implements the zero-database Share Link feature in TypeScript/Preact, matching the existing island and `src/lib` conventions. Work proceeds from the pure, independently-testable codec outward to the browser bridge, the presentational control, and finally per-island wiring. Each step builds on the previous one and ends with the islands fully integrated. Property-based tests (Vitest + `fast-check`) validate the codec's correctness properties; example, component, and integration tests cover the browser-touching layers. Test sub-tasks are marked optional with `*`.

## Tasks

- [ ] 1. Establish dependencies and localized share strings
  - [ ] 1.1 Add the `lz-string` compression dependency
    - Add `lz-string` to `package.json` with an exact pinned version (no caret/tilde range)
    - Install and add its types (`@types/lz-string` if not bundled) so `compressToEncodedURIComponent` / `decompressFromEncodedURIComponent` are typed
    - _Requirements: 9.1, 4.2_

  - [ ] 1.2 Add the `share` string block to the island string table for all locales
    - Add a required `share` member to `IslandStrings` in `src/i18n/types.ts` with `button`, `success`, `error`, `tooLarge`, `manualLabel` (so a missing key is a TypeScript error)
    - Provide canonical English values in `src/i18n/en.ts`
    - Provide translations in `es.ts`, `de.ts`, `fr.ts`, `pt.ts`, `it.ts`, `nl.ts`, `ja.ts`, `zh.ts`, `da.ts`, with English fallback for any partial value
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 2. Implement the pure codec (`src/lib/shareLink.ts`)
  - [ ] 2.1 Implement the `SharePayload` model and serialize/parse/prune functions
    - Define `SCHEMA_VERSION`, `ShareKind`, `EditorShareState`, `AdShareState`, `ShareState`, `SharePayload` types
    - Implement `serializeShare(payload)` using `JSON.stringify` + `compressToEncodedURIComponent`
    - Implement `parseShare(token)` that never throws: guarded decompress, guarded `JSON.parse`, schema-version gate (`v > SCHEMA_VERSION` → `null`), per-field validation/coercion, and `null` on no usable state
    - Implement `pruneEmptyFields(state)` to drop empty/whitespace-only string fields (editor card fields and ad field/view string values)
    - Use field names consistent with the Draft_Envelope (`text`, `cardTitle`, `cardDescription`)
    - _Requirements: 4.1, 4.2, 4.3, 2.1, 2.2, 2.3, 2.5, 3.1, 3.3, 3.4, 6.1, 6.3, 6.4, 6.5, 1.3, 1.7_

  - [ ]* 2.2 Write property test for codec round-trip identity
    - **Property 1: Round-trip identity** — `parseShare(serializeShare(p))` deep-equals `p` for all valid payloads; generators cover editor and ad states with unicode, emoji, CJK, line breaks, and long text
    - **Validates: Requirements 4.3, 4.4**

  - [ ]* 2.3 Write property test for never-throws parsing
    - **Property 2: Never throws** — for arbitrary input strings (random bytes, truncated tokens, valid-JSON-wrong-shape, near-miss encodings, `null`/`undefined`), `parseShare` returns without throwing
    - **Validates: Requirements 6.1**

  - [ ]* 2.4 Write property test for the version gate
    - **Property 4: Version gate** — for payloads with `v > SCHEMA_VERSION`, parsing their token yields `null`
    - **Validates: Requirements 6.4**

  - [ ]* 2.5 Write property test for field-type robustness
    - **Property 5: Field-type robustness** — a payload with exactly one field coerced to a wrong type drops precisely that field and retains all other valid fields
    - **Validates: Requirements 6.5**

  - [ ]* 2.6 Write property test for token URL-safety
    - **Property 6: URL-safety** — for all valid payloads the token matches `^[A-Za-z0-9+\-$]*$`
    - **Validates: Requirements 4.2**

  - [ ]* 2.7 Write property test for empty/whitespace pruning
    - **Property 3: Empty/whitespace pruning** — `collect()`/`pruneEmptyFields` output contains no empty or whitespace-only string field, and serialize→parse preserves their absence
    - **Validates: Requirements 2.4, 3.2**

- [ ] 3. Checkpoint - codec correctness
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement URL string helpers (`src/lib/shareUrl.ts`)
  - [ ] 4.1 Implement hash/URL helpers and the length guard
    - Implement `SHARE_HASH_KEY`, `readShareTokenFromHash(hash)` (returns token from `#s=...` or `null`)
    - Implement `buildShareUrl(baseUrl, token)` that preserves origin + locale path and replaces any existing fragment
    - Implement `MAX_SHARE_URL_LENGTH = 8000` and `isShareUrlTooLong(url)` as a pure threshold predicate
    - Keep all helpers string-pure (no `window` access)
    - _Requirements: 1.4, 7.1, 9.2, 9.3, 13.4_

  - [ ]* 4.2 Write unit tests for the URL helpers
    - Test `readShareTokenFromHash` for `#s=...`, `#`, empty, and unrelated fragments
    - Test `buildShareUrl` preserves origin + locale path and replaces any existing fragment
    - _Requirements: 1.4, 7.1, 13.4_

  - [ ]* 4.3 Write property test for the length threshold
    - **Property 7: Length threshold purity** — `isShareUrlTooLong` is a pure threshold predicate; verify boundary correctness at 7999 / 8000 / 8001
    - **Validates: Requirements 9.2, 9.3**

- [ ] 5. Implement the browser bridge hook (`src/components/island/useShareLink.ts`)
  - [ ] 5.1 Implement the `useShareLink` Preact hook
    - Read path: on mount (guarded to run once) read `window.location.hash`, `parseShare` the token, and call `adapter.apply` when the payload is non-null
    - Write path (`onShare`): `collect()` → `serializeShare` → resolve canonical base URL (current origin+pathname, or canonical hosted origin when framed) → `buildShareUrl`; if too long show warning toast and stop; else `navigator.clipboard.writeText` → success toast; on missing/rejecting clipboard set `manualUrl` and show error toast without touching the draft
    - Toast lifecycle: auto-dismiss after a fixed duration via a cleared-on-unmount timer; expose `toast`, `manualUrl`, `dismiss`
    - _Requirements: 1.2, 1.5, 1.6, 5.1, 5.4, 8.2, 8.4, 9.2, 9.3, 11.1, 11.2, 11.3, 13.4_

  - [ ]* 5.2 Write unit tests for the hook
    - Test read-on-mount hydration via a stubbed `window.location.hash`, the too-long warning path, the success path, and the clipboard-failure fallback (manual URL set, draft untouched)
    - _Requirements: 5.1, 8.2, 8.4, 9.2, 11.1, 11.2_

- [ ] 6. Implement the share control component (`src/components/island/ShareControls.tsx`)
  - [ ] 6.1 Implement `<ShareControls>`
    - Render a native `<button type="button">` Share_Button with an accessible name from `strings.share.button`, keyboard-operable, styled with existing Tailwind pill-button classes
    - Render the toast and optional manual-copy read-only `<input>` inside an `aria-live="polite"` region
    - Delegate all logic to `useShareLink({ adapter, strings })`
    - _Requirements: 1.1, 8.4, 10.1, 11.2, 12.1, 12.2, 12.3_

  - [ ]* 6.2 Write component tests for `<ShareControls>`
    - Verify accessible name, keyboard activation, toast rendered in an `aria-live` region with auto-dismiss, and the clipboard-failure path surfacing the manual-copy field
    - _Requirements: 1.1, 11.2, 11.3, 12.1, 12.2, 12.3_

- [ ] 7. Checkpoint - bridge and control
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Wire the editor islands
  - [ ] 8.1 Define the `ShareAdapter` contract
    - Add the `ShareAdapter` interface (`kind`, `id`, `collect()`, `apply(state)`) in `src/components/island/shareAdapter.ts`
    - _Requirements: 1.2, 5.4_

  - [ ] 8.2 Implement the editor adapter and mount precedence in `Dashboard.tsx`
    - Implement `collect()` via `pruneEmptyFields({ kind:'editor', text, cardTitle, cardDescription })`
    - Implement `apply(state)` to set `text`/`analysisText` and present `cardTitle`/`cardDescription`, leaving media empty
    - In the existing mount effect, check for a share token first and initialize from it in preference to the `sessionStorage` draft; otherwise leave the draft-load path unchanged; let existing debounce auto-save continue
    - Render `<ShareControls>` wired to the editor adapter
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 5.2, 5.5, 8.1, 8.2, 8.3, 13.1_

  - [ ] 8.3 Host the Share button in `Workspace.tsx`
    - Place the `<ShareControls>` button in the editor header/action row
    - _Requirements: 1.1, 13.1_

  - [ ]* 8.4 Write tests for editor adapter precedence
    - Verify token state wins over the stored draft on mount, that media stays empty, and that no-token mounts behave identically to current behavior
    - _Requirements: 5.2, 5.5, 8.1, 8.2_

- [ ] 9. Wire the ad-preview island
  - [ ] 9.1 Implement the ad adapter in `AdSimulator.tsx`
    - Implement `collect()` building `{ kind:'ad', platform, fields, view }` with only non-empty field values and only the toggles the platform exposes (`device`, `mode`, `safeZone`, `destinationUrl`, `cta`, `finalUrl`, `paths`), pruned via `pruneEmptyFields`
    - Implement `apply(state)` that applies only when `state.platform === platform`, merging `values` over `EMPTY_VALUES` (dropping unknown keys) and setting each present `view` toggle; media stays null
    - Render `<ShareControls>` in the inputs `Card` header/toolbar
    - _Requirements: 1.2, 3.1, 3.2, 3.3, 3.4, 5.3, 5.4, 5.5, 13.2_

  - [ ]* 9.2 Write property test for cross-tool isolation
    - **Property 8: Cross-tool isolation** — for an ad payload whose `platform` differs from the mounting simulator, `apply` produces no state change
    - **Validates: Requirements 5.4**

  - [ ]* 9.3 Write unit tests for ad apply behavior
    - Verify matched-platform hydration of `values` and `view` toggles and that unknown field keys are dropped
    - _Requirements: 3.1, 3.3, 5.3_

- [ ] 10. Wire remaining pages
  - [ ] 10.1 Mount the Share control on the platform-limits page
    - Reuse the editor adapter alongside the editor controls on `[lang]/platform-limits`; for any framed/embed page ensure the share URL targets the canonical hosted page
    - _Requirements: 13.3, 13.4_

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP.
- Each task references specific requirements clauses for traceability.
- Property tests (Properties 1–8 from the design) validate the codec's universal correctness properties; example, component, and integration tests cover the browser-touching layers.
- The codec (`shareLink.ts`) and URL helpers (`shareUrl.ts`) are pure and testable in isolation; only `useShareLink` and `<ShareControls>` touch the DOM.
- Existing `draftEnvelope` and island behavior must remain unchanged when no token is present.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "4.1"] },
    { "id": 2, "tasks": ["2.2", "4.2", "5.1", "8.1"] },
    { "id": 3, "tasks": ["2.3", "4.3", "5.2", "6.1"] },
    { "id": 4, "tasks": ["2.4", "6.2", "8.2", "9.1"] },
    { "id": 5, "tasks": ["2.5", "8.3", "8.4", "9.2"] },
    { "id": 6, "tasks": ["2.6", "9.3", "10.1"] },
    { "id": 7, "tasks": ["2.7"] }
  ]
}
```
