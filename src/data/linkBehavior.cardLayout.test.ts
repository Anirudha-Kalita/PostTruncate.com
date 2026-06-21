import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  LINK_BEHAVIOR,
  validateCardLayoutCoverage,
  cardLayout,
  organicLinkBehavior,
  type LinkBehaviorRecord,
  type CardLayoutProfile,
  type CardImageStyle,
  type CardDomainCasing,
  type CardDomainPlacement,
} from './linkBehavior';

// ───────────────────────────────────────────────────────────────────────────
// Shared fixtures
// ───────────────────────────────────────────────────────────────────────────

const ALL_RECORDS: LinkBehaviorRecord[] = Object.values(LINK_BEHAVIOR);

// The canonical preview-card platform id list is DERIVED from the config itself:
// every record whose organic model is 'preview-card'. This avoids duplicating
// the platform list (the config is the single source of truth).
const PREVIEW_CARD_PLATFORMS: string[] = ALL_RECORDS.filter(
  (record) => record.organic?.model === 'preview-card',
).map((record) => record.platform);

// All profiles that actually exist on the config, for shape/date properties.
const ALL_CARD_LAYOUTS: { platform: string; layout: CardLayoutProfile }[] = ALL_RECORDS.filter(
  (record): record is LinkBehaviorRecord & { cardLayout: CardLayoutProfile } =>
    record.cardLayout !== undefined,
).map((record) => ({ platform: record.platform, layout: record.cardLayout }));

const VALID_IMAGE_STYLES: CardImageStyle[] = ['large', 'thumbnail', 'embed'];
const VALID_DOMAIN_CASINGS: CardDomainCasing[] = ['uppercase', 'lowercase', 'as-is'];
const VALID_DOMAIN_PLACEMENTS: CardDomainPlacement[] = ['above-title', 'below-title', 'site-name'];

function isNonNegativeInteger(n: unknown): boolean {
  return typeof n === 'number' && Number.isInteger(n) && n >= 0;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isValidCalendarDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Property 6: Card_Layout_Profile coverage and shape
// Feature: rich-link-preview-cards, Property 6: For all preview-card platform
// ids, cardLayout(platform) is defined and well-formed; validateCardLayoutCoverage
// reports exactly the platforms lacking a profile (empty for the real list).
// Validates: Requirements 6.1, 6.3, 14.2
// ───────────────────────────────────────────────────────────────────────────

test('Property 6: every preview-card platform has a defined, well-formed cardLayout', () => {
  // Sanity: the derived list is the six documented preview-card platforms.
  assert.ok(PREVIEW_CARD_PLATFORMS.length > 0, 'expected at least one preview-card platform');

  fc.assert(
    fc.property(fc.constantFrom(...PREVIEW_CARD_PLATFORMS), (platform) => {
      const layout = cardLayout(platform);
      assert.ok(layout, `${platform} (preview-card) is missing a cardLayout`);

      assert.ok(
        VALID_IMAGE_STYLES.includes(layout.imageStyle),
        `${platform} bad imageStyle: ${layout.imageStyle}`,
      );
      assert.ok(
        VALID_DOMAIN_CASINGS.includes(layout.domainCasing),
        `${platform} bad domainCasing: ${layout.domainCasing}`,
      );
      assert.ok(
        VALID_DOMAIN_PLACEMENTS.includes(layout.domainPlacement),
        `${platform} bad domainPlacement: ${layout.domainPlacement}`,
      );
      assert.ok(
        isNonNegativeInteger(layout.titleMaxChars),
        `${platform} titleMaxChars must be a non-negative integer: ${layout.titleMaxChars}`,
      );
      assert.ok(
        isNonNegativeInteger(layout.descriptionMaxChars),
        `${platform} descriptionMaxChars must be a non-negative integer: ${layout.descriptionMaxChars}`,
      );
      assert.equal(
        typeof layout.removesRawUrl,
        'boolean',
        `${platform} removesRawUrl must be a boolean`,
      );
      assert.equal(typeof layout.imageRatio, 'string', `${platform} imageRatio must be a string`);
    }),
    { numRuns: 100 },
  );
});

test('Property 6: validateCardLayoutCoverage reports no gaps for the real preview-card list', () => {
  const result = validateCardLayoutCoverage(PREVIEW_CARD_PLATFORMS);
  assert.equal(result.ok, true, `unexpected coverage gaps: ${JSON.stringify(result)}`);
  assert.deepEqual(result.missingCardLayout, []);
});

test('Property 6: validateCardLayoutCoverage reports exactly the missing ids', () => {
  fc.assert(
    fc.property(
      // A set of fake platform ids that definitely have no cardLayout.
      fc.uniqueArray(
        fc.string({ minLength: 1, maxLength: 12 }).filter((id) => LINK_BEHAVIOR[id] === undefined),
        { minLength: 1, maxLength: 5 },
      ),
      (missing) => {
        const input = [...PREVIEW_CARD_PLATFORMS, ...missing];
        const result = validateCardLayoutCoverage(input);
        assert.equal(result.ok, false);
        // Reports exactly the injected missing ids — no more, no fewer.
        assert.deepEqual([...result.missingCardLayout].sort(), [...missing].sort());
      },
    ),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 7: lastReviewed is a valid ISO date
// Feature: rich-link-preview-cards, Property 7: For all cardLayout profiles,
// lastReviewed matches ^\d{4}-\d{2}-\d{2}$ and is a valid calendar date.
// Validates: Requirements 6.4
// ───────────────────────────────────────────────────────────────────────────

test('Property 7: every cardLayout lastReviewed is a valid ISO calendar date', () => {
  assert.ok(ALL_CARD_LAYOUTS.length > 0, 'expected at least one cardLayout profile');

  fc.assert(
    fc.property(fc.constantFrom(...ALL_CARD_LAYOUTS), ({ platform, layout }) => {
      assert.ok(
        ISO_DATE.test(layout.lastReviewed),
        `${platform} bad lastReviewed format: ${layout.lastReviewed}`,
      );
      assert.ok(
        isValidCalendarDate(layout.lastReviewed),
        `${platform} invalid calendar date: ${layout.lastReviewed}`,
      );
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 13: Displayed link facts match the config
// Feature: rich-link-preview-cards, Property 13: For all platforms, the
// link-display facts the UI derives (bio-link allowance, domain casing, fixed
// link weight, raw-URL removal) equal the values stored in LINK_BEHAVIOR/cardLayout.
// Validates: Requirements 11.3, 14.1, 14.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 13: accessors return the exact facts stored in LINK_BEHAVIOR/cardLayout', () => {
  const ALL_PLATFORMS = Object.keys(LINK_BEHAVIOR);

  fc.assert(
    fc.property(fc.constantFrom(...ALL_PLATFORMS), (platform) => {
      const record = LINK_BEHAVIOR[platform];

      // The accessors must surface the SAME object the config stores — they
      // never fabricate or transform facts (the config is the single source of truth).
      assert.equal(organicLinkBehavior(platform), record.organic);
      assert.equal(cardLayout(platform), record.cardLayout);

      // Bio-link allowance fact (Requirement 14.1).
      assert.equal(
        organicLinkBehavior(platform)?.bioLinkAllowance,
        record.organic?.bioLinkAllowance,
        `${platform} bioLinkAllowance mismatch`,
      );

      // Fixed link weight fact (Requirement 14.1/14.3).
      assert.equal(
        organicLinkBehavior(platform)?.fixedLinkWeight,
        record.organic?.fixedLinkWeight,
        `${platform} fixedLinkWeight mismatch`,
      );

      // Card-derived facts: domain casing + raw-URL removal (Requirement 11.3, 14.2).
      assert.equal(
        cardLayout(platform)?.domainCasing,
        record.cardLayout?.domainCasing,
        `${platform} domainCasing mismatch`,
      );
      assert.equal(
        cardLayout(platform)?.removesRawUrl,
        record.cardLayout?.removesRawUrl,
        `${platform} removesRawUrl mismatch`,
      );
    }),
    { numRuns: 100 },
  );
});
