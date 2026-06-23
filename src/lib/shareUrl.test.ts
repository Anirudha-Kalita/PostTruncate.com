import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import {
  readShareTokenFromHash,
  buildShareUrl,
  isShareUrlTooLong,
  MAX_SHARE_URL_LENGTH,
  SHARE_HASH_KEY,
} from './shareUrl';

// ───────────────────────────────────────────────────────────────────────────
// Feature: share-link — URL helpers (example tests + Property 7).
// ───────────────────────────────────────────────────────────────────────────

test('readShareTokenFromHash returns the token from #s=…', () => {
  assert.equal(readShareTokenFromHash('#s=N4IgAbc'), 'N4IgAbc');
  assert.equal(readShareTokenFromHash('s=N4IgAbc'), 'N4IgAbc'); // tolerate missing leading #
  assert.equal(readShareTokenFromHash('#x=1&s=tok'), 'tok'); // among other params
});

test('readShareTokenFromHash returns null for absent/empty/unrelated fragments', () => {
  assert.equal(readShareTokenFromHash(''), null);
  assert.equal(readShareTokenFromHash(null), null);
  assert.equal(readShareTokenFromHash(undefined), null);
  assert.equal(readShareTokenFromHash('#'), null);
  assert.equal(readShareTokenFromHash('#s='), null); // empty value
  assert.equal(readShareTokenFromHash('#section-heading'), null);
  assert.equal(readShareTokenFromHash('#other=value'), null);
});

test('buildShareUrl preserves origin + locale path and replaces any existing fragment', () => {
  assert.equal(
    buildShareUrl('https://posttruncate.com/en/twitter-character-counter/', 'TOK'),
    'https://posttruncate.com/en/twitter-character-counter/#s=TOK',
  );
  // Existing fragment is dropped, not appended to.
  assert.equal(
    buildShareUrl('https://posttruncate.com/ja/ad-previews/facebook-ads/#s=OLD', 'NEW'),
    'https://posttruncate.com/ja/ad-previews/facebook-ads/#s=NEW',
  );
  // Query string is preserved.
  assert.equal(
    buildShareUrl('https://posttruncate.com/de/?platform=facebook', 'TOK'),
    'https://posttruncate.com/de/?platform=facebook#s=TOK',
  );
});

test('buildShareUrl → readShareTokenFromHash round-trips the token', () => {
  fc.assert(
    fc.property(
      fc.stringMatching(/^[A-Za-z0-9+\-$]+$/),
      (token) => {
        const url = buildShareUrl('https://posttruncate.com/en/', token);
        const hash = url.slice(url.indexOf('#'));
        assert.equal(readShareTokenFromHash(hash), token);
      },
    ),
    { numRuns: 200 },
  );
});

// ── Property 7: Length threshold purity (Req 9.2, 9.3) ──────────────────────
test('Property 7: isShareUrlTooLong is a pure threshold at MAX_SHARE_URL_LENGTH', () => {
  assert.equal(MAX_SHARE_URL_LENGTH, 8000);
  assert.equal(isShareUrlTooLong('x'.repeat(7999)), false);
  assert.equal(isShareUrlTooLong('x'.repeat(8000)), false);
  assert.equal(isShareUrlTooLong('x'.repeat(8001)), true);

  fc.assert(
    fc.property(fc.nat({ max: 20000 }), (n) => {
      assert.equal(isShareUrlTooLong('x'.repeat(n)), n > MAX_SHARE_URL_LENGTH);
    }),
    { numRuns: 200 },
  );
});

test('SHARE_HASH_KEY is the documented "s" key', () => {
  assert.equal(SHARE_HASH_KEY, 's');
});
