import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import { linkCardStrings, LINK_CARD_STRINGS } from './linkCardStrings';
import type { IslandStrings, LinkCardStrings } from './types';
import { en } from './en';
import { es } from './es';
import { de } from './de';
import { fr } from './fr';
import { pt } from './pt';
import { it } from './it';
import { nl } from './nl';
import { ja } from './ja';
import { zh } from './zh';
import { da } from './da';

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 15: i18n en-fallback resolution
//
// The `linkCardStrings(s)` resolver reads `s.linkCard` and returns, per key,
// the locale's own value when present and the canonical English value
// (LINK_CARD_STRINGS, sourced from en.ts) when absent. These tests import the
// REAL resolver and the REAL locale dictionaries — no production logic is
// re-implemented. For each locale we build an IslandStrings-like input whose
// `linkCard` carries an independently-chosen subset of keys (each either the
// locale's own value or omitted) and assert the per-key resolution rule.
//
// Validates: Requirements 15.4
// ───────────────────────────────────────────────────────────────────────────

// The ten shipped locale dictionaries, keyed by locale code.
const LOCALES = { en, es, de, fr, pt, it, nl, ja, zh, da } as const;
const LOCALE_CODES = Object.keys(LOCALES) as (keyof typeof LOCALES)[];

// The canonical English key set (single source of truth: en.ts via the resolver
// module). Every locale carries these exact key paths (enforced by the type +
// the i18n parity lint), so iterating the English keys covers every locale.
const LINK_CARD_KEYS = Object.keys(LINK_CARD_STRINGS) as (keyof LinkCardStrings)[];

// A locale code plus a per-key presence mask. `true` => the key is present in
// the input (set to that locale's own value); `false` => the key is omitted
// (the resolver must fall back to the canonical English value).
const localeArb = fc.constantFrom(...LOCALE_CODES);
const presenceArb = fc.tuple(...LINK_CARD_KEYS.map(() => fc.boolean()));

test('Property 15: resolver returns the locale value when a key is present and English when absent', () => {
  fc.assert(
    fc.property(localeArb, presenceArb, (code, presence) => {
      const localeCard = LOCALES[code].island.linkCard;

      // Build a partial linkCard: present keys carry the locale's own value,
      // absent keys are omitted entirely.
      const partial: Partial<LinkCardStrings> = {};
      LINK_CARD_KEYS.forEach((key, i) => {
        if (presence[i]) partial[key] = localeCard[key];
      });

      const input = { linkCard: partial } as unknown as IslandStrings;
      const resolved = linkCardStrings(input);

      // Per-key: present => the locale's own value; absent => canonical English.
      LINK_CARD_KEYS.forEach((key, i) => {
        if (presence[i]) {
          assert.equal(
            resolved[key],
            localeCard[key],
            `${code}.${key}: present key should resolve to the locale value`,
          );
        } else {
          assert.equal(
            resolved[key],
            LINK_CARD_STRINGS[key],
            `${code}.${key}: absent key should fall back to the English value`,
          );
        }
      });
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Guard: a wholly-absent `linkCard` resolves to the full canonical English
// block (the resolver's `if (!v) return LINK_CARD_STRINGS` branch), and every
// canonical English value is a non-empty string so no key can resolve to empty.
// ───────────────────────────────────────────────────────────────────────────

test('Requirement 15.4: an absent linkCard resolves to the full canonical English block', () => {
  const withoutLinkCard = {} as unknown as IslandStrings;
  assert.deepEqual(linkCardStrings(withoutLinkCard), LINK_CARD_STRINGS);

  for (const key of LINK_CARD_KEYS) {
    const value = LINK_CARD_STRINGS[key];
    assert.equal(typeof value, 'string', `${key} should be a string`);
    assert.ok(value.trim().length > 0, `${key} should be a non-empty string`);
  }
});
