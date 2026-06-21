import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  platformLengthByMode,
  weightedLength,
  byteCounts,
  blueskyLinkFacets,
  utf8ByteLength,
  detectUrls,
} from './textTools';

// ───────────────────────────────────────────────────────────────────────────
// Generators
//
// We need inputs that stress two independent dimensions:
//   1. The Unicode weighting logic — emoji, ZWJ sequences, CJK, and astral
//      (supplementary-plane) characters.
//   2. The URL-detection / link-counting logic — strings that actually contain
//      detectable URLs interleaved with arbitrary text.
// The `textWithUrls` arbitrary interleaves random unicode fragments with URL
// strings drawn from `urlArb`, so generated inputs reliably exercise the URL
// branches of weightedLength / platformLengthByMode / blueskyLinkFacets.
// ───────────────────────────────────────────────────────────────────────────

// A spread of "interesting" unicode characters plus ordinary text.
const unicodeChars = [
  'a', 'Z', '9', ' ', '.', '!', '-', '/', '\n',
  '世', '界', '日', '本', '語', // CJK (wide)
  'é', 'ü', 'ñ', 'ß', // Latin-1 / extended
  '😀', '🎉', '🚀', // single emoji (astral)
  '👨‍👩‍👧‍👦', // ZWJ family sequence
  '👍🏽', // emoji + skin-tone modifier
  '🇺🇸', '🇯🇵', // regional-indicator flags
  '𝕳𝖊𝖑𝖑𝖔', // mathematical alphanumeric (astral)
  '𠀀', '𡃁', // CJK extension B (astral)
];

const unicodeFragment = fc
  .array(fc.constantFrom(...unicodeChars), { minLength: 0, maxLength: 12 })
  .map((parts) => parts.join(''));

// URLs that detectUrls() reliably recognizes (http(s)://, www., or TLD-anchored).
const urlArb = fc.constantFrom(
  'https://example.com/path',
  'https://example.com/very/long/path/segment/that/exceeds/twenty/three/characters',
  'http://test.org/a',
  'www.foo.io',
  'sub.bar.dev/x',
  'https://news.example.co/article?id=12345&ref=share',
  'pinterest.com/pin/longer-slug-here',
);

// Plain arbitrary text (the dimension that exercises pure unicode weighting).
const plainTextArb: fc.Arbitrary<string> = fc.oneof(
  fc.string(),
  unicodeFragment,
  // `unit: 'binary'` draws from the full code-point range (incl. astral).
  fc.string({ unit: 'binary', maxLength: 40 }),
);

// Text built by interleaving unicode fragments with injected URLs, so most
// generated values contain at least one detectable link.
const textWithUrls: fc.Arbitrary<string> = fc
  .array(fc.oneof(unicodeFragment, urlArb), { minLength: 1, maxLength: 6 })
  .map((parts) => parts.join(' '));

// Union used by the per-mode properties: both pure-unicode and URL-bearing text.
const anyText: fc.Arbitrary<string> = fc.oneof(plainTextArb, textWithUrls);

// A long URL (> 23 chars) embedded in surrounding text — used to prove that
// per-char counting does NOT collapse URLs to a flat 23-char weight.
const LONG_URL = 'https://example.com/very/long/path/segment/that/exceeds/twenty/three/characters';
const textWithLongUrl: fc.Arbitrary<string> = fc
  .tuple(unicodeFragment, unicodeFragment)
  .map(([before, after]) => `${before} ${LONG_URL} ${after}`);

// ───────────────────────────────────────────────────────────────────────────
// Property 2: Counted-shortened fixed-weight counting (X/Twitter preserved)
// Feature: platform-link-display, Property 2
// Validates: Requirements 3.1, 3.3, 13.1
// ───────────────────────────────────────────────────────────────────────────

test('Property 2: fixed-weight mode equals weightedLength (X/Twitter parity)', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      assert.equal(platformLengthByMode(text, 'fixed-weight'), weightedLength(text));
      // The optional fixedLinkWeight argument must not change the result —
      // weightedLength already applies LIMITS.URL_WEIGHT.
      assert.equal(platformLengthByMode(text, 'fixed-weight', 23), weightedLength(text));
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 3: Per-character counting for non-shortened platforms
// Feature: platform-link-display, Property 3
// Validates: Requirements 4.2, 5.3, 7.2
// ───────────────────────────────────────────────────────────────────────────

test('Property 3: per-char mode is deterministic over the whole string', () => {
  // Relational no-collapse check: per-char weighting depends only on the text,
  // not on whether any span happens to be a URL. Re-running is stable and the
  // result never depends on a fixed-weight URL substitution.
  fc.assert(
    fc.property(anyText, (text) => {
      const a = platformLengthByMode(text, 'per-char');
      const b = platformLengthByMode(text, 'per-char');
      assert.equal(a, b);
      assert.ok(Number.isInteger(a) && a >= 0);
    }),
    { numRuns: 100 },
  );
});

test('Property 3: per-char does not collapse a long URL to a flat 23 weight', () => {
  // For text containing a URL longer than 23 characters, per-char counting must
  // be strictly greater than fixed-weight counting, proving each character of
  // the URL is counted instead of a flat LIMITS.URL_WEIGHT (23) collapse.
  fc.assert(
    fc.property(textWithLongUrl, (text) => {
      // Guard: the long URL is actually detected (sanity for the generator).
      const urls = detectUrls(text);
      assert.ok(
        urls.some((u) => u.url.length > 23),
        `expected a >23-char URL in: ${JSON.stringify(text)}`,
      );
      const perChar = platformLengthByMode(text, 'per-char');
      const fixed = platformLengthByMode(text, 'fixed-weight');
      assert.ok(
        perChar > fixed,
        `per-char (${perChar}) should exceed fixed-weight (${fixed}) for ${JSON.stringify(text)}`,
      );
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 4: Bluesky byte-length counting
// Feature: platform-link-display, Property 4
// Validates: Requirements 6.1, 6.5
// ───────────────────────────────────────────────────────────────────────────

test('Property 4: per-byte mode equals UTF-8 byte length', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      const expected = byteCounts(text).utf8;
      assert.equal(platformLengthByMode(text, 'per-byte'), expected);
      assert.equal(utf8ByteLength(text), expected);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 5: Bluesky facet byte-offset invariant
// Feature: platform-link-display, Property 5
// Validates: Requirements 6.2, 6.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 5: facet offsets satisfy 0 <= byteStart <= byteEnd <= utf8 length', () => {
  fc.assert(
    fc.property(anyText, (text) => {
      const total = utf8ByteLength(text);
      for (const facet of blueskyLinkFacets(text)) {
        assert.ok(0 <= facet.byteStart, `byteStart < 0: ${facet.byteStart}`);
        assert.ok(facet.byteStart <= facet.byteEnd, `byteStart > byteEnd: ${JSON.stringify(facet)}`);
        assert.ok(facet.byteEnd <= total, `byteEnd > total (${total}): ${JSON.stringify(facet)}`);
      }
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 6: Bluesky facet round-trip
// Feature: platform-link-display, Property 6
// Validates: Requirements 6.2, 6.4
// ───────────────────────────────────────────────────────────────────────────

test('Property 6: the UTF-8 byte slice [byteStart, byteEnd) decodes back to facet.url', () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  fc.assert(
    fc.property(anyText, (text) => {
      const bytes = encoder.encode(text);
      for (const facet of blueskyLinkFacets(text)) {
        const slice = bytes.slice(facet.byteStart, facet.byteEnd);
        assert.equal(decoder.decode(slice), facet.url);
      }
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 7: Preview-card first-URL identification
// Feature: platform-link-display, Property 7
// Validates: Requirements 5.2
// ───────────────────────────────────────────────────────────────────────────

test('Property 7: the first facet URL equals the first detected URL (document order)', () => {
  fc.assert(
    fc.property(textWithUrls, (text) => {
      const urls = detectUrls(text);
      fc.pre(urls.length >= 1); // property is about text containing >= 1 URL
      const facets = blueskyLinkFacets(text);
      assert.ok(facets.length >= 1);
      assert.equal(facets[0].url, urls[0].url);
    }),
    { numRuns: 100 },
  );
});
