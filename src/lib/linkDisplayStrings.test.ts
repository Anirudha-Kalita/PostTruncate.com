import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import { LINK_DISPLAY_STRINGS, linkDisplayStrings } from '../i18n/linkDisplayStrings';
import type { IslandStrings, LinkDisplayStrings } from '../i18n/types';

// ───────────────────────────────────────────────────────────────────────────
// linkDisplayStrings resolver — en-fallback resolution.
//
// The resolver reads only `s.linkDisplay`: it returns the locale's own
// `linkDisplay` override when present and falls back to the canonical English
// block (LINK_DISPLAY_STRINGS) when absent. These tests therefore stub a
// minimal IslandStrings via `as unknown as IslandStrings` rather than building
// a full dictionary.
// ───────────────────────────────────────────────────────────────────────────

// The canonical English key set — the override generator below produces a value
// for every one of these so it is a structurally complete LinkDisplayStrings.
const LINK_DISPLAY_KEYS = Object.keys(LINK_DISPLAY_STRINGS) as (keyof LinkDisplayStrings)[];

// Non-empty strings only: a valid locale override never carries empty content,
// and using distinct random values lets us assert the resolver returns EXACTLY
// the provided override (not the English default that shares the same keys).
const nonEmptyString = fc
  .string({ minLength: 1, maxLength: 40 })
  .map((s) => `x${s}`); // guarantee non-empty even if fc trims to whitespace

// A full LinkDisplayStrings override with randomized non-empty values.
const overrideArb: fc.Arbitrary<LinkDisplayStrings> = fc
  .tuple(...LINK_DISPLAY_KEYS.map(() => nonEmptyString))
  .map((values) => {
    const obj = {} as Record<keyof LinkDisplayStrings, string>;
    LINK_DISPLAY_KEYS.forEach((key, i) => {
      obj[key] = values[i];
    });
    return obj as LinkDisplayStrings;
  });

// ───────────────────────────────────────────────────────────────────────────
// Property 17: i18n en-fallback resolution
// Feature: platform-link-display, Property 17
// Validates: Requirements 14.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 17: resolver returns the override when present, English default when absent', () => {
  fc.assert(
    fc.property(overrideArb, (override) => {
      // With an override present, the resolver returns exactly that object.
      const withOverride = { linkDisplay: override } as unknown as IslandStrings;
      assert.deepEqual(linkDisplayStrings(withOverride), override);

      // With no `linkDisplay` field, the resolver falls back to canonical English.
      const withoutOverride = {} as unknown as IslandStrings;
      assert.deepEqual(linkDisplayStrings(withoutOverride), LINK_DISPLAY_STRINGS);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Example test (Requirement 14.4 note):
//
// The resolver's third-tier behaviour — "when even the English value is absent,
// return the key identifier rather than empty content" — cannot occur with this
// constant-backed pattern: LINK_DISPLAY_STRINGS always supplies an English value
// for every key, so the "both locale and en absent" branch is unreachable here.
// We assert that guarantee directly: every key of the canonical English block is
// a non-empty string, so no key can ever resolve to empty content.
// ───────────────────────────────────────────────────────────────────────────

test('Requirement 14.4: every canonical English link-display value is a non-empty string', () => {
  for (const key of LINK_DISPLAY_KEYS) {
    const value = LINK_DISPLAY_STRINGS[key];
    assert.equal(typeof value, 'string', `${key} should be a string`);
    assert.ok(value.length > 0, `${key} should be non-empty`);
    assert.ok(value.trim().length > 0, `${key} should not be whitespace-only`);
  }
});
