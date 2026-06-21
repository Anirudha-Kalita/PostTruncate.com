import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  deriveCardDomain,
  deriveFaviconMonogram,
  truncateCardField,
  extractLinkData,
  charCount,
  sliceChars,
} from './textTools';

// ───────────────────────────────────────────────────────────────────────────
// Generators
//
// These property tests verify the pure local-derivation layer of the rich
// link-preview-cards feature. We build URLs from controlled host arbitraries
// (a label list + TLD), then optionally prefix "www." and a scheme and append a
// path, so the known host can be asserted against the derived domain. Grapheme
// arbitraries interleave emoji, ZWJ sequences, and combining marks so the
// truncation property exercises real cluster boundaries.
// ───────────────────────────────────────────────────────────────────────────

// Hostname label characters. Mixed case so the case-folding behavior of
// deriveCardDomain is exercised (URL parsing also lower-cases the host).
const labelChar = fc.constantFrom(
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''),
);

// A single DNS label: 1–15 alphanumeric characters (no leading/trailing hyphen
// edge cases, which keeps every generated host parseable).
const labelArb: fc.Arbitrary<string> = fc
  .array(labelChar, { minLength: 1, maxLength: 15 })
  .map((chars) => chars.join(''));

// TLDs that detectUrls() recognizes, so the same hosts work for the
// extractLinkData-based property (Property 4) which routes through detectUrls.
const tldArb = fc.constantFrom(
  'com', 'net', 'org', 'io', 'co', 'dev', 'app', 'ai',
  'gg', 'me', 'ly', 'xyz', 'info', 'biz', 'news', 'gov', 'edu',
);

// A host like "example.com" or "sub.example.io" (1–3 labels + a TLD).
const hostArb: fc.Arbitrary<string> = fc
  .tuple(fc.array(labelArb, { minLength: 1, maxLength: 3 }), tldArb)
  .map(([labels, tld]) => `${labels.join('.')}.${tld}`);

// Optional URL path appended after the host.
const pathArb: fc.Arbitrary<string> = fc
  .array(fc.constantFrom('a', 'b', '1', '2', 'x', 'path', 'page', '-', '_'), {
    minLength: 0,
    maxLength: 4,
  })
  .map((parts) => (parts.length ? `/${parts.join('/')}` : ''));

// A built URL together with the knowledge needed to assert the suffix
// relationship: the "real host" (host with any explicit www. prefix) it parses to.
interface BuiltUrl {
  url: string;
  realHost: string;
}

// Property 2 generator: includes scheme-less and www.-prefixed URLs.
const builtUrlArb: fc.Arbitrary<BuiltUrl> = fc
  .record({
    host: hostArb,
    hasWww: fc.boolean(),
    scheme: fc.constantFrom('', 'http://', 'https://', 'HTTPS://'),
    path: pathArb,
  })
  .map(({ host, hasWww, scheme, path }) => {
    const realHost = `${hasWww ? 'www.' : ''}${host}`;
    return { url: `${scheme}${realHost}${path}`, realHost };
  });

// The case-folded suffix expected from deriveCardDomain for a given real host:
// the lower-cased host with one single leading "www." removed.
function expectedDomain(realHost: string): string {
  const lower = realHost.toLowerCase();
  return lower.startsWith('www.') ? lower.slice(4) : lower;
}

// Mirror of the implementation's first-alphanumeric-character rule, computed
// independently here so the test asserts behavior rather than copying code.
function firstAlnumUpper(s: string): string {
  for (const ch of s) {
    if (/[\p{L}\p{N}]/u.test(ch)) return ch.toUpperCase();
  }
  return '';
}

// Grapheme clusters that must never be split mid-cluster: emoji, ZWJ family
// sequences, skin-tone modifiers, regional-indicator flags, combining marks,
// astral letters, plus ordinary text and an ellipsis.
const graphemeCluster = fc.constantFrom(
  'a', 'Z', '9', ' ', '.', '!', '\n',
  '😀', '🎉', '🚀',
  '👨‍👩‍👧‍👦', // ZWJ family
  '👍🏽', // emoji + skin tone
  '🇺🇸', '🇯🇵', // regional-indicator flags
  'é', 'e\u0301', // precomposed + combining acute
  'a\u0301\u0302', // base + two combining marks
  'n\u0303',
  '世', '界',
  '𝕳', '𠀀', // astral letter / CJK ext-B
  '…',
);

const graphemeText: fc.Arbitrary<string> = fc
  .array(graphemeCluster, { minLength: 0, maxLength: 20 })
  .map((parts) => parts.join(''));

// Arbitrary domain-like strings for the favicon property: real hosts, hosts
// with leading punctuation (to exercise "first alphanumeric"), and unicode.
const domainArb: fc.Arbitrary<string> = fc.oneof(
  hostArb,
  fc.tuple(fc.constantFrom('.', '-', '_', '!', ' ', '...'), hostArb).map(([p, h]) => p + h),
  fc.string({ unit: 'binary', maxLength: 12 }),
  fc.constantFrom('世界.com', '例え.jp', '9lives.io', '__under.net', '中文'),
);

// Counts calls to network primitives so "computed locally (no network)" is an
// asserted invariant, not just an assumption.
function withNetworkGuard<T>(fn: () => T): { result: T; networkCalls: number } {
  const g = globalThis as Record<string, unknown>;
  let networkCalls = 0;
  const originalFetch = g.fetch;
  const originalXhr = g.XMLHttpRequest;
  g.fetch = (...args: unknown[]) => {
    networkCalls++;
    void args;
    throw new Error('network access is forbidden in local derivation');
  };
  g.XMLHttpRequest = class {
    constructor() {
      networkCalls++;
      throw new Error('network access is forbidden in local derivation');
    }
  };
  try {
    const result = fn();
    return { result, networkCalls };
  } finally {
    g.fetch = originalFetch;
    g.XMLHttpRequest = originalXhr;
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 2: Domain derivation is a
// case-folded suffix of the real host
// Validates: Requirements 3.1, 3.2, 3.3
// ───────────────────────────────────────────────────────────────────────────

test('Property 2: deriveCardDomain is a lower-cased suffix of the host with one leading www. removed', () => {
  fc.assert(
    fc.property(builtUrlArb, ({ url, realHost }) => {
      const domain = deriveCardDomain(url);

      // Every generated URL parses to a valid host, so a domain is always returned.
      assert.ok(domain !== null, `expected a domain for ${JSON.stringify(url)}`);
      const d = domain as string;

      // Result is fully lower-cased (case-folded) — Requirement 3.3.
      assert.equal(d, d.toLowerCase());

      // Result equals the lower-cased host with one single leading "www." removed
      // — Requirements 3.1, 3.2.
      assert.equal(d, expectedDomain(realHost));

      // Result is a suffix of the lower-cased real host: never fabricated text
      // absent from the host.
      assert.ok(
        realHost.toLowerCase().endsWith(d),
        `${JSON.stringify(d)} is not a suffix of host ${JSON.stringify(realHost)}`,
      );

      // At most one leading "www." is stripped: if the host had a www. prefix the
      // derived domain must not still start with it (the original host did).
      assert.ok(realHost.toLowerCase().includes(d));
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 3: Local favicon monogram
// derivation
// Validates: Requirements 3.4
// ───────────────────────────────────────────────────────────────────────────

test('Property 3: deriveFaviconMonogram is the upper-cased first alphanumeric char, computed locally', () => {
  fc.assert(
    fc.property(domainArb, (domain) => {
      const { result, networkCalls } = withNetworkGuard(() => deriveFaviconMonogram(domain));

      // No network access of any kind — the favicon is a locally rendered glyph.
      assert.equal(networkCalls, 0);

      // The monogram is the upper-cased first alphanumeric character (or '' when
      // the domain has none) — Requirement 3.4.
      assert.equal(result, firstAlnumUpper(domain));
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 8: Grapheme-safe card-field
// truncation
// Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5
// ───────────────────────────────────────────────────────────────────────────

test('Property 8: truncateCardField is grapheme-safe across zero/within/exceeds cases', () => {
  fc.assert(
    fc.property(graphemeText, fc.nat({ max: 30 }), (text, max) => {
      const result = truncateCardField(text, max);
      const count = charCount(text);

      if (max === 0) {
        // max === 0 omits the region entirely — Requirement 7.5.
        assert.equal(result, '');
        return;
      }

      if (count <= max) {
        // Within the cap: returned unchanged, no ellipsis appended
        // — Requirements 7.2, 7.3.
        assert.equal(result, text);
        return;
      }

      // Exceeds the cap: first `max` whole grapheme clusters + exactly one "…"
      // — Requirements 7.1, 7.4.
      const prefix = sliceChars(text, 0, max);
      assert.equal(result, `${prefix}…`);

      // The pre-ellipsis portion is a whole-grapheme prefix of length `max`
      // (no cluster was split) — Requirement 7.4.
      assert.equal(charCount(prefix), max);
      assert.equal(prefix, sliceChars(text, 0, max));

      // Exactly one trailing ellipsis was appended by the truncation.
      assert.equal(result.slice(0, -1), prefix);
      assert.equal(result.at(-1), '…');
    }),
    { numRuns: 100 },
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 4: Smart title placeholder derives
// from the domain
// Validates: Requirements 2.3
// ───────────────────────────────────────────────────────────────────────────

// A detectable, valid-host URL (scheme-prefixed so detectUrls captures it whole)
// embedded inside surrounding text.
const textWithCardUrlArb: fc.Arbitrary<{ text: string; realHost: string }> = fc
  .record({
    host: hostArb,
    hasWww: fc.boolean(),
    scheme: fc.constantFrom('https://', 'http://'),
    path: pathArb,
    before: fc.constantFrom('', 'check this ', 'read: ', '看看 '),
    after: fc.constantFrom('', ' thanks', ' 👀', ' more text'),
  })
  .map(({ host, hasWww, scheme, path, before, after }) => {
    const realHost = `${hasWww ? 'www.' : ''}${host}`;
    return { text: `${before}${scheme}${realHost}${path}${after}`, realHost };
  });

test('Property 4: extractLinkData titlePlaceholder is derived solely from deriveCardDomain(url)', () => {
  fc.assert(
    fc.property(textWithCardUrlArb, ({ text, realHost }) => {
      // 'facebook' is a preview-card platform.
      const data = extractLinkData(text, 'facebook');

      // The generator guarantees a detectable URL with a valid host.
      fc.pre(data.firstUrl !== undefined);
      fc.pre(data.hasValidHost);

      const derived = deriveCardDomain(data.firstUrl!.url);
      assert.ok(derived !== null);

      // The placeholder is exactly the domain derived from the first URL — no
      // other source — Requirement 2.3.
      assert.equal(data.titlePlaceholder, derived);

      // And therefore it is a suffix of the real host: it never contains text
      // absent from the URL host.
      assert.ok(
        realHost.toLowerCase().endsWith(data.titlePlaceholder),
        `placeholder ${JSON.stringify(data.titlePlaceholder)} absent from host ${JSON.stringify(realHost)}`,
      );
    }),
    { numRuns: 100 },
  );
});
