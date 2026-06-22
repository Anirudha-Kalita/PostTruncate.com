import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import { selectLinkIndication, tiktokAdCaptionHasNoClickableLink } from './linkIndication';
import { LINK_BEHAVIOR, organicLinkBehavior, type LinkDisplayModel } from '../data/linkBehavior';
import { PLATFORM_COUNTERS } from '../data/platformCounters';
import { detectUrls } from './textTools';

// ───────────────────────────────────────────────────────────────────────────
// Generators
//
// Two dimensions need to be exercised:
//   1. The configured organic platform ids (so the model→key mapping is driven
//      by LINK_BEHAVIOR, never hard-coded — Requirement 15.3).
//   2. Text that may or may not contain a detectable URL (the URL/no-URL branch
//      of selectLinkIndication — Requirements 8.2, 8.3).
// `anyText` mixes unicode-bearing-with-URL strings and URL-free strings so both
// branches are reliably hit across runs.
// ───────────────────────────────────────────────────────────────────────────

// Configured organic platform ids, read straight from the config so the test
// stays in lock-step with whatever the source of truth declares.
const organicPlatforms = Object.keys(LINK_BEHAVIOR).filter((p) => LINK_BEHAVIOR[p].organic);

// Canonical model → indication-key mapping, derived per-platform at assert time
// from organicLinkBehavior(platform).model (kept config-driven).
const MODEL_TO_KEY: Record<string, string> = {
  'plain-text': 'plainText',
  'preview-card': 'previewCard',
  'clickable-inline': 'clickableInline',
  'counted-shortened': 'countedShortened',
};

// Safe characters that can never form a URL, '@' mention, or '#' hashtag:
// letters, digits, and spaces only (no dot, no '@', no '#').
const SAFE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '.split('');

// A spread of "interesting" unicode characters with no URL/@/# tokens.
const UNICODE_SAFE_CHARS = ['世', '界', '😀', '🎉', '👨‍👩‍👧‍👦', 'é', 'ü', 'ñ', '𝕳', ' ', '!', '-'];

// URLs that detectUrls() reliably recognizes.
const urlArb = fc.constantFrom(
  'https://example.com/path',
  'http://test.org/a',
  'www.foo.io',
  'sub.bar.dev/x',
  'https://news.example.co/article?id=12345&ref=share',
  'pinterest.com/pin/longer-slug-here',
);

// URL-free text: letters/digits/spaces plus safe unicode, never a URL.
const urlFreeText: fc.Arbitrary<string> = fc
  .array(fc.constantFrom(...SAFE_CHARS, ...UNICODE_SAFE_CHARS), { minLength: 0, maxLength: 24 })
  .map((parts) => parts.join(''));

// Text that contains at least one detectable URL, interleaved with safe unicode.
const urlBearingText: fc.Arbitrary<string> = fc
  .tuple(urlFreeText, urlArb, urlFreeText)
  .map(([before, url, after]) => `${before} ${url} ${after}`);

const anyText: fc.Arbitrary<string> = fc.oneof(urlFreeText, urlBearingText);

// ───────────────────────────────────────────────────────────────────────────
// Property 8: Link-display indication selection
// Feature: platform-link-display, Property 8
// Validates: Requirements 4.1, 5.1, 7.1, 8.1, 8.2, 8.3, 15.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 8: no detected URL selects "none"; a detected URL selects the model-mapped key', () => {
  fc.assert(
    fc.property(fc.constantFrom(...organicPlatforms), anyText, (platform, text) => {
      const result = selectLinkIndication(platform, text);

      if (detectUrls(text).length === 0) {
        // No URL → no link-specific indication (Requirement 8.2).
        assert.equal(result, 'none');
      } else {
        // URL present → key derived solely from the platform's configured model
        // (Requirements 8.1, 8.3, 15.3).
        const model = organicLinkBehavior(platform)!.model;
        assert.equal(result, MODEL_TO_KEY[model]);
      }
    }),
    { numRuns: 100 },
  );
});

test('Property 8: an unknown platform id always returns "none"', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      // Degrades safely to today's behavior for un-configured ids.
      assert.equal(selectLinkIndication('totally-unknown-platform-xyz', text), 'none');
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 8b: Per-field model override
// Feature: platform-link-display (field-aware guidance)
// A counter field whose link behavior differs from its platform's primary
// model passes an explicit `modelOverride`; the indication must follow the
// override, not the platform model — and still gate on URL presence.
// ───────────────────────────────────────────────────────────────────────────

const OVERRIDE_MODELS: LinkDisplayModel[] = [
  'plain-text',
  'preview-card',
  'clickable-inline',
  'counted-shortened',
];

test('Property 8b: an explicit modelOverride selects its mapped key (URL present)', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...organicPlatforms),
      urlBearingText,
      fc.constantFrom(...OVERRIDE_MODELS),
      (platform, text, model) => {
        // The override wins over whatever the platform's own model is.
        assert.equal(selectLinkIndication(platform, text, model), MODEL_TO_KEY[model]);
      },
    ),
    { numRuns: 100 },
  );
});

test('Property 8b: a modelOverride still yields "none" when no URL is present', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...organicPlatforms),
      urlFreeText,
      fc.constantFrom(...OVERRIDE_MODELS),
      (platform, text, model) => {
        assert.equal(selectLinkIndication(platform, text, model), 'none');
      },
    ),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 8c: Configured counter-field overrides resolve correctly
// Drives straight from PLATFORM_COUNTERS so the per-field facts shown on the
// counter pages can never drift from this mapping. The 'bio' role is resolved
// by the island (allowance line only), not by selectLinkIndication, so it is
// asserted separately to have no Link_Display_Model mapping.
// ───────────────────────────────────────────────────────────────────────────

test('Property 8c: each configured field override maps to the expected indication', () => {
  const url = 'https://example.com/path';
  for (const [platform, config] of Object.entries(PLATFORM_COUNTERS)) {
    for (const field of config.fields) {
      if (field.link === undefined) continue; // inherits the platform model
      if (field.link === 'bio') {
        // 'bio' is not a Link_Display_Model — it must not be a switch key.
        assert.ok(!(field.link in MODEL_TO_KEY));
        continue;
      }
      assert.equal(
        selectLinkIndication(platform, url, field.link),
        MODEL_TO_KEY[field.link],
        `${platform}.${field.key} (${field.link})`,
      );
    }
  }
});

// ───────────────────────────────────────────────────────────────────────────
// Property 9: TikTok ad caption non-clickable indication
// Feature: platform-link-display, Property 9
// Validates: Requirements 11.1
// ───────────────────────────────────────────────────────────────────────────

// A '@handle' token preceded by a leading space so the mention boundary holds.
const mentionArb: fc.Arbitrary<string> = fc
  .array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), {
    minLength: 1,
    maxLength: 12,
  })
  .map((parts) => `@${parts.join('')}`);

// A '#tag' token (letters/digits) with a valid hashtag boundary.
const hashtagArb: fc.Arbitrary<string> = fc
  .array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), {
    minLength: 1,
    maxLength: 12,
  })
  .map((parts) => `#${parts.join('')}`);

// Captions that contain a URL, an '@' mention, OR a '#' hashtag injected into
// otherwise-safe text (with surrounding spaces to preserve token boundaries).
const captionWithToken: fc.Arbitrary<string> = fc
  .tuple(urlFreeText, fc.oneof(urlArb, mentionArb, hashtagArb), urlFreeText)
  .map(([before, token, after]) => `${before} ${token} ${after}`);

test('Property 9: a caption with a URL, @mention, or #hashtag carries no clickable link', () => {
  fc.assert(
    fc.property(captionWithToken, (caption) => {
      assert.equal(tiktokAdCaptionHasNoClickableLink(caption), true);
    }),
    { numRuns: 100 },
  );
});

test('Property 9: a plain caption with no URL/@/# has a (non-)clickable result of false', () => {
  fc.assert(
    fc.property(urlFreeText, (caption) => {
      assert.equal(tiktokAdCaptionHasNoClickableLink(caption), false);
    }),
    { numRuns: 100 },
  );
});
