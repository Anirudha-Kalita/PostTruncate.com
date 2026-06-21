import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  LINK_BEHAVIOR,
  validateLinkBehaviorCoverage,
  organicLinkBehavior,
  adLinkBehavior,
  type LinkDisplayModel,
  type LinkCountMode,
  type LinkBehaviorRecord,
} from '../data/linkBehavior';
import { PLATFORM_COUNTERS } from '../data/platformCounters';
import { AD_PLATFORM_CONFIG } from '../data/adPlatformConfig';
import { LIMITS } from './textTools';

// The canonical list of organic-counter platforms is the PLATFORM_COUNTERS keys
// plus the preview-island counters that are not part of the generic counter grid.
const PREVIEW_ISLAND_COUNTERS = ['twitter', 'linkedin', 'instagram', 'facebook', 'threads'];
const COUNTER_PLATFORMS = [...Object.keys(PLATFORM_COUNTERS), ...PREVIEW_ISLAND_COUNTERS];
const AD_PLATFORMS = Object.keys(AD_PLATFORM_CONFIG);

const VALID_MODELS: LinkDisplayModel[] = [
  'counted-shortened',
  'plain-text',
  'preview-card',
  'clickable-inline',
];
const VALID_COUNT_MODES: LinkCountMode[] = ['fixed-weight', 'per-char', 'per-byte'];

const ALL_RECORDS: LinkBehaviorRecord[] = Object.values(LINK_BEHAVIOR);

function isNonNegativeInteger(n: number): boolean {
  return Number.isInteger(n) && n >= 0;
}

// ───────────────────────────────────────────────────────────────────────────
// Property 1: Config coverage and shape
// Feature: platform-link-display, Property 1
// Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.6
// ───────────────────────────────────────────────────────────────────────────

test('Property 1: every canonical counter/ad platform is covered', () => {
  const result = validateLinkBehaviorCoverage(COUNTER_PLATFORMS, AD_PLATFORMS);
  assert.equal(result.ok, true, `coverage gaps: ${JSON.stringify(result)}`);
  assert.deepEqual(result.missingOrganic, []);
  assert.deepEqual(result.missingAd, []);
});

test('Property 1: a deliberately missing platform id is reported', () => {
  const organicGap = validateLinkBehaviorCoverage(['nonexistent'], []);
  assert.equal(organicGap.ok, false);
  assert.ok(organicGap.missingOrganic.includes('nonexistent'));

  const adGap = validateLinkBehaviorCoverage([], ['nonexistent']);
  assert.equal(adGap.ok, false);
  assert.ok(adGap.missingAd.includes('nonexistent'));
});

test('Property 1: every record has a well-formed shape', () => {
  // Drive the property over the full set of configured records.
  fc.assert(
    fc.property(fc.constantFrom(...ALL_RECORDS), (record) => {
      if (record.organic) {
        assert.ok(
          VALID_MODELS.includes(record.organic.model),
          `bad model for ${record.platform}: ${record.organic.model}`,
        );
        assert.ok(
          VALID_COUNT_MODES.includes(record.organic.countMode),
          `bad countMode for ${record.platform}: ${record.organic.countMode}`,
        );
        if (record.organic.bioLinkAllowance !== undefined) {
          assert.ok(
            isNonNegativeInteger(record.organic.bioLinkAllowance),
            `bad bioLinkAllowance for ${record.platform}`,
          );
        }
        if (record.organic.countMode === 'fixed-weight') {
          assert.ok(
            typeof record.organic.fixedLinkWeight === 'number' && record.organic.fixedLinkWeight > 0,
            `fixed-weight ${record.platform} must have positive fixedLinkWeight`,
          );
        }
      }
      // A record must have at least an organic or ad behavior.
      assert.ok(record.organic || record.ad, `${record.platform} has neither organic nor ad`);
    }),
    { numRuns: 100 },
  );
});

test('Property 1: each canonical counter platform resolves to a valid organic record', () => {
  for (const platform of COUNTER_PLATFORMS) {
    const organic = organicLinkBehavior(platform);
    assert.ok(organic, `${platform} missing organic record`);
    assert.ok(VALID_MODELS.includes(organic.model));
    assert.ok(VALID_COUNT_MODES.includes(organic.countMode));
  }
});

test('Property 1: each ad platform resolves to a valid ad record', () => {
  for (const platform of AD_PLATFORMS) {
    const ad = adLinkBehavior(platform);
    assert.ok(ad, `${platform} missing ad record`);
  }
});

// ───────────────────────────────────────────────────────────────────────────
// Property 16: lastReviewed ISO date
// Feature: platform-link-display, Property 16
// Validates: Requirements 15.1
// ───────────────────────────────────────────────────────────────────────────

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

test('Property 16: every record lastReviewed is a valid ISO calendar date', () => {
  fc.assert(
    fc.property(fc.constantFrom(...ALL_RECORDS), (record) => {
      assert.ok(ISO_DATE.test(record.lastReviewed), `bad format: ${record.lastReviewed}`);
      assert.ok(isValidCalendarDate(record.lastReviewed), `invalid date: ${record.lastReviewed}`);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Example / table tests: model classification and engine-reads-config
// Validates: Requirements 2.1–2.5, 4.3, 7.3, 1.5
// ───────────────────────────────────────────────────────────────────────────

interface ExpectedOrganic {
  model: LinkDisplayModel;
  countMode: LinkCountMode;
  bioLinkAllowance?: number;
  byteIndexedFacets?: boolean;
}

const EXPECTED_ORGANIC: Record<string, ExpectedOrganic> = {
  // 2.1 counted-shortened (X/Twitter)
  twitter: { model: 'counted-shortened', countMode: 'fixed-weight' },
  // 2.2 plain-text (Instagram bio 5, TikTok bio 1, YouTube)
  instagram: { model: 'plain-text', countMode: 'per-char', bioLinkAllowance: 5 },
  tiktok: { model: 'plain-text', countMode: 'per-char', bioLinkAllowance: 1 },
  youtube: { model: 'plain-text', countMode: 'per-char' },
  // 2.3 preview-card (Facebook, LinkedIn, Threads bio 5, Discord, WhatsApp)
  facebook: { model: 'preview-card', countMode: 'per-char' },
  linkedin: { model: 'preview-card', countMode: 'per-char' },
  threads: { model: 'preview-card', countMode: 'per-char', bioLinkAllowance: 5 },
  discord: { model: 'preview-card', countMode: 'per-char' },
  whatsapp: { model: 'preview-card', countMode: 'per-char' },
  // 2.4 clickable-inline (Reddit, Pinterest) — Requirement 7.3
  reddit: { model: 'clickable-inline', countMode: 'per-char' },
  pinterest: { model: 'clickable-inline', countMode: 'per-char' },
  // 2.5 Bluesky byte-indexed preview card
  bluesky: { model: 'preview-card', countMode: 'per-byte', byteIndexedFacets: true },
};

test('table: each platform model/countMode/bioLinkAllowance/byteIndexedFacets match the design', () => {
  for (const [platform, expected] of Object.entries(EXPECTED_ORGANIC)) {
    const organic = organicLinkBehavior(platform);
    assert.ok(organic, `${platform} missing organic record`);
    assert.equal(organic.model, expected.model, `${platform} model`);
    assert.equal(organic.countMode, expected.countMode, `${platform} countMode`);
    assert.equal(
      organic.bioLinkAllowance,
      expected.bioLinkAllowance,
      `${platform} bioLinkAllowance`,
    );
    assert.equal(
      organic.byteIndexedFacets ?? undefined,
      expected.byteIndexedFacets,
      `${platform} byteIndexedFacets`,
    );
  }
});

test('engine-reads-config: twitter fixedLinkWeight === LIMITS.URL_WEIGHT (Requirement 1.5)', () => {
  assert.equal(LINK_BEHAVIOR.twitter.organic?.fixedLinkWeight, LIMITS.URL_WEIGHT);
});
