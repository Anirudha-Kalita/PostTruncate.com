import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  clampDisplayLink,
  deriveDisplayLink,
  clampDisplayPath,
  buildDisplayUrl,
  resolveCta,
} from './adTruncation';
import { charCount } from './textTools';
import { LINK_BEHAVIOR } from '../data/linkBehavior';

// ───────────────────────────────────────────────────────────────────────────
// Generators & helpers
//
// Properties 10–15 exercise the additive ad link-display helpers. The input
// space spans:
//   1. Destination URLs (with/without scheme, with paths/queries/subdomains).
//   2. Display-path segment arrays (empty, whitespace-only, long, unicode).
//   3. Display-link text including emoji / ZWJ / combining / CJK / astral chars,
//      to prove grapheme-safe clamping never splits a cluster.
// All facts (caps, CTA labels) are read from `LINK_BEHAVIOR` so the tests stay
// in lock-step with the single source of truth.
// ───────────────────────────────────────────────────────────────────────────

// Independent grapheme segmentation (NOT the engine's splitGraphemes) so the
// grapheme-prefix assertions are verified against a separate implementation.
const SEGMENTER = new Intl.Segmenter('en', { granularity: 'grapheme' });
function graphemes(text: string): string[] {
  return [...SEGMENTER.segment(text)].map((s) => s.segment);
}

// Valid destination URLs paired with the host `deriveDisplayLink` must yield.
const URL_CASES: ReadonlyArray<{ url: string; host: string }> = [
  { url: 'https://example.com/path?q=1', host: 'example.com' },
  { url: 'http://test.org/a/b/c', host: 'test.org' },
  { url: 'www.foo.io/x', host: 'www.foo.io' },
  { url: 'sub.bar.dev/a/b', host: 'sub.bar.dev' },
  { url: 'https://news.example.co/article?id=12345&ref=share', host: 'news.example.co' },
  { url: 'shop.store.example/category/item', host: 'shop.store.example' },
  { url: 'https://example.com', host: 'example.com' },
];

const urlCaseArb = fc.constantFrom(...URL_CASES);
const urlArb = urlCaseArb.map((c) => c.url);

// A spread of "interesting" unicode characters that stress grapheme clustering.
const unicodeChars = [
  'a', 'Z', '9', ' ', '.', '-', '_', '/',
  '世', '界', '日', '本', '語', // CJK (wide)
  'é', 'ü', 'ñ', 'ß', // Latin-1 / extended
  '😀', '🎉', '🚀', '🔥', // single emoji (astral)
  '👨‍👩‍👧‍👦', // ZWJ family sequence
  '👍🏽', // emoji + skin-tone modifier
  '🇺🇸', '🇯🇵', // regional-indicator flags
  'e\u0301', 'a\u0300', 'n\u0303', // base + combining mark
  '𝕳𝖊𝖑𝖑𝖔', // mathematical alphanumeric (astral)
  '𠀀', '𡃁', // CJK extension B (astral)
];

const unicodeFragment = fc
  .array(fc.constantFrom(...unicodeChars), { minLength: 0, maxLength: 20 })
  .map((parts) => parts.join(''));

// Display-link text: arbitrary strings plus unicode-heavy fragments, including
// values long enough to exceed the 30-char Meta cap.
const displayLinkText: fc.Arbitrary<string> = fc.oneof(
  fc.string({ maxLength: 50 }),
  fc.string({ unit: 'binary', maxLength: 40 }),
  unicodeFragment,
  fc.constantFrom(
    '',
    'shop.example.com',
    'a-very-long-display-link-that-exceeds-the-thirty-character-cap',
    '😀🎉🚀🔥💧🌊🏔🗻🌋🎆🎇🧨✨🎈🎉🎊🥳🎂🍰🧁', // 20+ emoji
    '👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦', // repeated ZWJ clusters
  ),
);

// A single path segment: arbitrary text, unicode, long, empty, whitespace.
const pathSegment: fc.Arbitrary<string> = fc.oneof(
  fc.string({ maxLength: 25 }),
  unicodeFragment,
  fc.constantFrom(
    '',
    '   ',
    'shop',
    'category',
    'a-segment-longer-than-fifteen-characters',
    '😀🎉🚀🔥💧🌊🏔🗻🌋🎆🎇🧨✨🎈🎉', // 15 emoji
    '日本語のセグメントテキスト', // CJK > some caps
    '  spaced  ',
  ),
);

const pathSegments: fc.Arbitrary<string[]> = fc.array(pathSegment, { minLength: 0, maxLength: 5 });

// ───────────────────────────────────────────────────────────────────────────
// Property 10: Display-link derivation from destination domain
// Feature: platform-link-display, Property 10
// Validates: Requirements 9.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 10: deriveDisplayLink returns host only (no scheme, no path)', () => {
  fc.assert(
    fc.property(urlCaseArb, ({ url, host }) => {
      const derived = deriveDisplayLink(url);
      assert.equal(derived, host, `deriveDisplayLink(${JSON.stringify(url)})`);
      assert.ok(!derived.includes('://'), `host still has scheme: ${derived}`);
      assert.ok(!derived.includes('/'), `host still has a path slash: ${derived}`);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 11: CTA resolution membership
// Feature: platform-link-display, Property 11
// Validates: Requirements 9.4
// ───────────────────────────────────────────────────────────────────────────

test('Property 11: resolveCta returns a supported label (requested when valid, else first)', () => {
  const fbLabels = LINK_BEHAVIOR.facebook.ad!.ctaLabels!;
  // Mix of in-set labels and arbitrary (likely-unsupported) strings.
  const requestedArb = fc.oneof(fc.constantFrom(...fbLabels), fc.string(), fc.constant(undefined));
  fc.assert(
    fc.property(requestedArb, (requested) => {
      const result = resolveCta('facebook', requested);
      assert.notEqual(result, null);
      assert.ok(fbLabels.includes(result as string), `not a member: ${result}`);
      if (requested !== undefined && fbLabels.includes(requested)) {
        assert.equal(result, requested);
      } else {
        assert.equal(result, fbLabels[0]);
      }
    }),
    { numRuns: 100 },
  );
});

test('Property 11: resolveCta returns null for a platform with no CTA (google)', () => {
  fc.assert(
    fc.property(fc.oneof(fc.string(), fc.constant(undefined)), (requested) => {
      assert.equal(resolveCta('google', requested), null);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 12: Google display-URL composition
// Feature: platform-link-display, Property 12
// Validates: Requirements 10.1
// ───────────────────────────────────────────────────────────────────────────

test('Property 12: buildDisplayUrl is domain + clamped non-empty segments in order', () => {
  fc.assert(
    fc.property(urlArb, pathSegments, (url, segments) => {
      const domain = deriveDisplayLink(url);
      const clamped = clampDisplayPath(segments, 'google');
      const built = buildDisplayUrl(url, segments, 'google');

      assert.ok(built.startsWith(domain), `built (${built}) must begin with domain (${domain})`);
      if (clamped.length === 0) {
        assert.equal(built, domain);
      } else {
        assert.equal(built, `${domain}/${clamped.join('/')}`);
      }
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 13: Display-path clamping
// Feature: platform-link-display, Property 13
// Validates: Requirements 10.2, 10.3, 12.4
// ───────────────────────────────────────────────────────────────────────────

test('Property 13: clampDisplayPath yields ≤2 segments, ≤15 chars each, none blank', () => {
  const maxSegments = LINK_BEHAVIOR.google.ad!.maxPathSegments!;
  const segmentMax = LINK_BEHAVIOR.google.ad!.pathSegmentMaxChars!;
  fc.assert(
    fc.property(pathSegments, (segments) => {
      const clamped = clampDisplayPath(segments, 'google');
      assert.ok(clamped.length <= maxSegments, `too many segments: ${clamped.length}`);
      for (const seg of clamped) {
        assert.ok(charCount(seg) <= segmentMax, `segment over cap: ${JSON.stringify(seg)}`);
        assert.ok(seg.trim().length > 0, `blank/whitespace-only segment: ${JSON.stringify(seg)}`);
      }
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 14: Display-link cap clamping
// Feature: platform-link-display, Property 14
// Validates: Requirements 12.1
// ───────────────────────────────────────────────────────────────────────────

test('Property 14: clampDisplayLink output never exceeds the platform cap', () => {
  const cap = LINK_BEHAVIOR.facebook.ad!.displayLinkMaxChars!; // 30
  fc.assert(
    fc.property(displayLinkText, (text) => {
      const { text: clamped } = clampDisplayLink(text, 'facebook');
      assert.ok(charCount(clamped) <= cap, `over cap (${cap}): ${charCount(clamped)}`);
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Property 15: Grapheme-safe clamping
// Feature: platform-link-display, Property 15
// Validates: Requirements 12.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 15: clampDisplayLink output is a whole-grapheme prefix of the input', () => {
  fc.assert(
    fc.property(displayLinkText, (text) => {
      const { text: clamped } = clampDisplayLink(text, 'facebook');
      const inputGraphemes = graphemes(text);
      const outputGraphemes = graphemes(clamped);
      // The output must be exactly the first N graphemes of the input — no
      // cluster was cut mid-sequence (which would surface as a different
      // grapheme split or a U+FFFD replacement char).
      assert.equal(clamped, inputGraphemes.slice(0, outputGraphemes.length).join(''));
      assert.ok(!clamped.includes('\uFFFD'), 'replacement char indicates a broken cluster');
    }),
    { numRuns: 100 },
  );
});

test('Property 15: each clamped path segment is a whole-grapheme prefix of its source', () => {
  // Single-segment arrays keep the source↔output mapping unambiguous: a
  // surviving segment is the grapheme-prefix of its (untrimmed) input segment.
  const survivingSegment = fc.oneof(
    unicodeFragment.filter((s) => s.trim().length > 0),
    fc.constantFrom(
      '😀🎉🚀🔥💧🌊🏔🗻🌋🎆🎇🧨✨🎈🎉🎊🥳', // 17 emoji (> 15 cap)
      '👨‍👩‍👧‍👦👍🏽🇺🇸日本語のセグメント',
      'café-noir-ünïcödé-segment-long',
    ),
  );
  fc.assert(
    fc.property(survivingSegment, (seg) => {
      const clamped = clampDisplayPath([seg], 'google');
      assert.equal(clamped.length, 1);
      const out = clamped[0];
      const srcGraphemes = graphemes(seg);
      const outGraphemes = graphemes(out);
      assert.equal(out, srcGraphemes.slice(0, outGraphemes.length).join(''));
      assert.ok(!out.includes('\uFFFD'), 'replacement char indicates a broken cluster');
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Example tests
// ───────────────────────────────────────────────────────────────────────────

// Requirement 10.4: with no path segments the display URL is the domain alone.
test('Example: buildDisplayUrl(url, [], "google") equals the domain alone', () => {
  for (const { url, host } of URL_CASES) {
    assert.equal(buildDisplayUrl(url, [], 'google'), host);
  }
  // Whitespace-only / empty segments are dropped, so the result is still bare domain.
  assert.equal(buildDisplayUrl('https://example.com/x', ['', '   '], 'google'), 'example.com');
});

// Requirement 12.2: a cap of 0 disables the display link entirely. No platform
// in the config declares cap 0 today, so we assert the documented behaviors that
// DO exist:
//   - undefined cap (tiktok: showsDisplayLink false, displayLinkMaxChars omitted)
//     → no clamping, text returned unchanged, truncated:false.
//   - a positive cap (facebook: 30) → clamps and flags truncation past the cap.
// The cap-0 → { text: '', truncated: true } branch is covered by the engine's
// implementation and the 9.2 island-wiring unit assertion (config not modified).
test('Example: undefined display-link cap (tiktok) returns the text unchanged', () => {
  assert.equal(LINK_BEHAVIOR.tiktok.ad!.displayLinkMaxChars, undefined);
  const sample = 'some-display-link-text-of-any-length-🎉🎉🎉';
  assert.deepEqual(clampDisplayLink(sample, 'tiktok'), { text: sample, truncated: false });
  // Unknown platform also has no cap → unchanged.
  assert.deepEqual(clampDisplayLink(sample, 'no-such-platform'), { text: sample, truncated: false });
});

test('Example: positive cap (facebook 30) clamps and flags truncation', () => {
  const within = 'short.example.com'; // ≤ 30
  assert.deepEqual(clampDisplayLink(within, 'facebook'), { text: within, truncated: false });

  const over = 'a-display-link-that-is-clearly-longer-than-thirty-characters';
  const { text, truncated } = clampDisplayLink(over, 'facebook');
  assert.equal(truncated, true);
  assert.equal(charCount(text), 30);
});
