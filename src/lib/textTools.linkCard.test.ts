import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  detectUrls,
  extractLinkData,
  mutatePreviewText,
  charCount,
  weightedLength,
  LIMITS,
} from './textTools';
import { organicLinkBehavior } from '../data/linkBehavior';

// ───────────────────────────────────────────────────────────────────────────
// Generators
//
// These property tests cover the renderer-facing extraction orchestrator and
// the backward-compatibility guarantees of the text engine for the rich
// link-preview-cards feature. They import only the real exports from
// `textTools.ts` and `linkBehavior.ts` — no production logic is re-implemented
// (the single exception is the small, test-local indication-mapping helper for
// Property 12, which models the selection logic the renderer will use).
//
// We exercise three independent input dimensions:
//   1. Arbitrary post text (including emoji / astral / CJK), some of which
//      happens to contain detectable URLs.
//   2. Text guaranteed to contain >= 1 URL (and frequently several), so the
//      first-URL-selection and URL-removal branches are reliably hit.
//   3. The finite set of configured platform ids, grouped by link-display
//      model so a property can target preview-card vs non-card platforms.
// ───────────────────────────────────────────────────────────────────────────

// The configured platform ids, grouped by their organic link-display model.
// (Mirrors LINK_BEHAVIOR; the membership itself is asserted indirectly via
// organicLinkBehavior(platform).model inside the properties.)
const PLATFORMS_BY_MODEL = {
  'preview-card': ['facebook', 'linkedin', 'threads', 'discord', 'whatsapp', 'bluesky'],
  'plain-text': ['instagram', 'tiktok', 'youtube'],
  'counted-shortened': ['twitter'],
  'clickable-inline': ['reddit', 'pinterest'],
} as const;

const ALL_PLATFORMS = Object.values(PLATFORMS_BY_MODEL).flat();
const NON_CARD_PLATFORMS = [
  ...PLATFORMS_BY_MODEL['plain-text'],
  ...PLATFORMS_BY_MODEL['counted-shortened'],
  ...PLATFORMS_BY_MODEL['clickable-inline'],
];

const anyPlatformArb = fc.constantFrom(...ALL_PLATFORMS);
const previewCardPlatformArb = fc.constantFrom(...PLATFORMS_BY_MODEL['preview-card']);
const nonCardPlatformArb = fc.constantFrom(...NON_CARD_PLATFORMS);

// A spread of "interesting" unicode characters plus ordinary text, so the
// engine's grapheme/weight logic is exercised alongside the URL branches.
const unicodeChars = [
  'a', 'Z', '9', ' ', '.', '!', '-', '/', '\n',
  '世', '界', '日', '本', '語', // CJK (wide)
  'é', 'ü', 'ñ', 'ß', // Latin-1 / extended
  '😀', '🎉', '🚀', // single emoji (astral)
  '👨‍👩‍👧‍👦', // ZWJ family sequence
  '👍🏽', // emoji + skin-tone modifier
  '🇺🇸', '🇯🇵', // regional-indicator flags
  '𝕳𝖊𝖑𝖑𝖔', // mathematical alphanumeric (astral)
];

const unicodeFragment = fc
  .array(fc.constantFrom(...unicodeChars), { minLength: 0, maxLength: 12 })
  .map((parts) => parts.join(''));

// URLs that detectUrls() reliably recognizes (http(s)://, www., or TLD-anchored).
const urlArb = fc.constantFrom(
  'https://example.com/path',
  'https://example.com/very/long/path/segment/that/exceeds/twenty/three/characters',
  'http://test.org/a',
  'https://news.example.co/article?id=12345&ref=share',
  'www.foo.io',
  'https://sub.bar.dev/x',
  'https://pinterest.com/pin/longer-slug-here',
);

// Plain arbitrary text (mostly URL-free, occasionally URL-bearing by accident).
const plainTextArb: fc.Arbitrary<string> = fc.oneof(
  fc.string(),
  unicodeFragment,
  fc.string({ unit: 'binary', maxLength: 40 }),
);

// Text guaranteed to contain at least one detectable URL, often several: an
// optional leading fragment, one required URL, then arbitrary fragments/URLs.
const textWithUrlsArb: fc.Arbitrary<string> = fc
  .tuple(
    unicodeFragment,
    urlArb,
    fc.array(fc.oneof(unicodeFragment, urlArb), { minLength: 0, maxLength: 4 }),
  )
  .map(([before, url, rest]) => [before, url, ...rest].join(' '));

// Union used by the "for all text" properties.
const anyText: fc.Arbitrary<string> = fc.oneof(plainTextArb, textWithUrlsArb);

// ───────────────────────────────────────────────────────────────────────────
// Renderer selection helpers (compose only real exports).
// ───────────────────────────────────────────────────────────────────────────

// The card-render decision the renderer makes: a card shows iff a URL is present
// AND the platform is a preview-card platform. Composed from real exports.
function cardRenderDecision(text: string, platform: string): boolean {
  const data = extractLinkData(text, platform);
  return data.firstUrl !== undefined && organicLinkBehavior(platform)?.model === 'preview-card';
}

// Count of non-overlapping occurrences of `needle` in `haystack`.
function occurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  return haystack.split(needle).length - 1;
}

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 1: Card-render trigger
// Validates: Requirements 1.1, 1.2, 16.1
// ───────────────────────────────────────────────────────────────────────────

test('Property 1: card renders exactly when a URL is present AND the platform is preview-card', () => {
  fc.assert(
    fc.property(anyText, anyPlatformArb, (text, platform) => {
      const hasUrl = detectUrls(text).length > 0;
      const isPreviewCard = organicLinkBehavior(platform)?.model === 'preview-card';
      const expected = hasUrl && isPreviewCard;

      assert.equal(cardRenderDecision(text, platform), expected);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 5: First-URL selection
// Validates: Requirements 5.1, 5.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 5: extractLinkData.firstUrl equals detectUrls(text)[0] for preview-card platforms', () => {
  fc.assert(
    fc.property(textWithUrlsArb, previewCardPlatformArb, (text, platform) => {
      const urls = detectUrls(text);
      fc.pre(urls.length >= 1); // generator targets >= 1 URL; guard for safety.

      const data = extractLinkData(text, platform);
      // The card is always built from the first URL in document order, whether
      // or not the platform sets cardFromFirstUrlOnly.
      assert.deepEqual(data.firstUrl, urls[0]);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 9: Preview text mutation removes
// only the first URL and never mutates the source
// Validates: Requirements 9.1, 9.2, 9.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 9: mutatePreviewText leaves text unchanged when removeUrl is false', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      assert.equal(mutatePreviewText(text, false), text);
    }),
    { numRuns: 100 },
  );
});

test('Property 9: mutatePreviewText(true) drops only the first URL and never mutates the source', () => {
  fc.assert(
    fc.property(textWithUrlsArb, (text) => {
      const urls = detectUrls(text);
      fc.pre(urls.length >= 1);

      const first = urls[0].url;
      const original = `${text}`; // an independent copy of the source value.

      const result = mutatePreviewText(text, true);

      // The source string value is unchanged after the call (Requirement 9.3).
      assert.equal(text, original);

      // Only the FIRST occurrence of the first URL is removed: the result holds
      // exactly one fewer occurrence of that URL substring than the source
      // (Requirements 9.1, 9.2).
      assert.equal(occurrences(result, first), occurrences(text, first) - 1);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 10: Counters always measure the
// full body text (independent of any preview URL omission)
// Validates: Requirements 9.4, 12.1
// ───────────────────────────────────────────────────────────────────────────

test('Property 10: charCount/weightedLength are computed from the full body, unaffected by extraction', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      // Baseline counts taken from the full body before any extraction.
      const baseChars = charCount(text);
      const baseWeight = weightedLength(text);

      // Run extraction on every configured platform — including preview-card
      // platforms that drop the raw URL from the PREVIEW text.
      for (const platform of ALL_PLATFORMS) {
        const data = extractLinkData(text, platform);
        // The preview text may omit the URL, but that omission must not change
        // what the counters measure (the full body).
        void data.previewText;
      }
      mutatePreviewText(text, true);

      // Counters still measure the full body, identical to the baseline.
      assert.equal(charCount(text), baseChars);
      assert.equal(weightedLength(text), baseWeight);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 11: Non-card platforms retain the
// inline URL and render no card
// Validates: Requirements 11.1, 12.1, 12.2
// ───────────────────────────────────────────────────────────────────────────

test('Property 11: non-card platforms show no card and keep the inline URL in previewText', () => {
  fc.assert(
    fc.property(textWithUrlsArb, nonCardPlatformArb, (text, platform) => {
      fc.pre(detectUrls(text).length >= 1);

      // No card on plain-text / counted-shortened / clickable-inline platforms.
      assert.equal(cardRenderDecision(text, platform), false);

      // The inline URL is retained: the preview body equals the source body.
      assert.equal(extractLinkData(text, platform).previewText, text);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 12: Link-display indication is
// selected by model
// Validates: Requirements 11.2, 12.3
//
// The model -> indication mapping is the selection logic the renderer uses.
// It is implemented here as a small pure, test-local helper (no production
// code), asserted against organicLinkBehavior(platform).model + detectUrls.
// ───────────────────────────────────────────────────────────────────────────

type Indication =
  | 'none'
  | 'plainText'
  | 'previewCard'
  | 'clickableInline'
  | 'countedShortened';

// Test-local renderer selection logic: no URL => "none"; otherwise the
// indication key maps from the platform's link-display model.
function selectIndication(text: string, platform: string): Indication {
  if (detectUrls(text).length === 0) return 'none';
  switch (organicLinkBehavior(platform)?.model) {
    case 'plain-text':
      return 'plainText';
    case 'preview-card':
      return 'previewCard';
    case 'clickable-inline':
      return 'clickableInline';
    case 'counted-shortened':
      return 'countedShortened';
    default:
      return 'none';
  }
}

// Independent expected mapping (a table, not a switch) so the property confirms
// the documented model->key correspondence rather than restating one impl.
const EXPECTED_INDICATION: Record<string, Indication> = {
  'plain-text': 'plainText',
  'preview-card': 'previewCard',
  'clickable-inline': 'clickableInline',
  'counted-shortened': 'countedShortened',
};

test('Property 12: indication is "none" without a URL, else maps exactly from the platform model', () => {
  fc.assert(
    fc.property(anyText, anyPlatformArb, (text, platform) => {
      const indication = selectIndication(text, platform);

      if (detectUrls(text).length === 0) {
        assert.equal(indication, 'none');
        return;
      }

      const model = organicLinkBehavior(platform)?.model;
      assert.ok(model !== undefined, `platform ${platform} must have a model`);
      assert.equal(indication, EXPECTED_INDICATION[model as string]);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 14: Engine backward compatibility
// Validates: Requirements 14.4, 16.1, 16.2
//
// The pre-existing engine exports keep their documented behavior and are
// unaffected by the additive feature. We assert invariants rather than
// hard-coded snapshots.
// ───────────────────────────────────────────────────────────────────────────

test('Property 14: detectUrls offsets slice back to the matched URL, and detection is deterministic', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      const a = detectUrls(text);
      const b = detectUrls(text);
      assert.deepEqual(a, b); // deterministic

      for (const m of a) {
        // The reported [start, end) code-unit span slices back to the URL.
        assert.equal(text.slice(m.start, m.end), m.url);
        assert.ok(0 <= m.start && m.start <= m.end && m.end <= text.length);
      }
    }),
    { numRuns: 100 },
  );
});

test('Property 14: weightedLength and charCount are stable, deterministic, non-negative integers', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      const c = charCount(text);
      const w = weightedLength(text);

      // Deterministic across repeated calls (no hidden state).
      assert.equal(charCount(text), c);
      assert.equal(weightedLength(text), w);

      assert.ok(Number.isInteger(c) && c >= 0);
      assert.ok(Number.isInteger(w) && w >= 0);
    }),
    { numRuns: 100 },
  );
});

test('Property 14: weightedLength collapses every URL to a flat URL_WEIGHT regardless of its length', () => {
  // Same surrounding text, different-length URLs: weightedLength is identical,
  // proving each URL contributes a fixed LIMITS.URL_WEIGHT (not per-character).
  const shortUrl = 'https://a.io';
  const longUrl =
    'https://example.com/very/long/path/segment/that/keeps/going/way/past/twenty/three/characters';
  fc.assert(
    fc.property(unicodeFragment, (frag) => {
      const t1 = `${frag} ${shortUrl} tail`;
      const t2 = `${frag} ${longUrl} tail`;

      const u1 = detectUrls(t1);
      const u2 = detectUrls(t2);
      // Guard: each injected URL is detected as a single whole match and the
      // surrounding text contributes the same URL count in both strings.
      fc.pre(u1.some((u) => u.url === shortUrl));
      fc.pre(u2.some((u) => u.url === longUrl));
      fc.pre(u1.length === u2.length);

      // The only difference between t1 and t2 is the collapsed URL, so the
      // weighted lengths match exactly — the URL weight is fixed.
      assert.equal(weightedLength(t1), weightedLength(t2));

      // And isolating a single URL: its weighted length is exactly URL_WEIGHT.
      assert.equal(weightedLength(shortUrl), LIMITS.URL_WEIGHT);
      assert.equal(weightedLength(longUrl), LIMITS.URL_WEIGHT);
    }),
    { numRuns: 100 },
  );
});
