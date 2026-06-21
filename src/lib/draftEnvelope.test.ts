import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

import { serializeDraft, parseDraft, type DraftEnvelope } from './draftEnvelope';

// ───────────────────────────────────────────────────────────────────────────
// Feature: rich-link-preview-cards, Property 16: Draft envelope round-trip
//
// For all envelopes { text, cardTitle?, cardDescription? },
// parse(serialize(env)) equals the envelope; for all legacy plain strings,
// parse yields { text: <string> }. Imports the REAL serializeDraft/parseDraft
// from draftEnvelope.ts — no production logic is re-implemented.
//
// By design a legacy string that happens to start with '{' (after trimStart)
// is treated as JSON, so the legacy-string arbitrary is restricted to values
// that do NOT start with '{', matching the implementation contract.
//
// Validates: Requirements 16.4
// ───────────────────────────────────────────────────────────────────────────

// An envelope with the optional card fields independently present or omitted.
// Fields are omitted entirely (not set to undefined) so the expected value
// matches what a serialize → parse round-trip reconstructs: serializeDraft only
// emits a field when it is defined, and parseDraft only restores a field when
// it is a string.
const envelopeArb: fc.Arbitrary<DraftEnvelope> = fc
  .record({
    text: fc.string(),
    cardTitle: fc.option(fc.string(), { nil: undefined }),
    cardDescription: fc.option(fc.string(), { nil: undefined }),
  })
  .map(({ text, cardTitle, cardDescription }) => {
    const env: DraftEnvelope = { text };
    if (cardTitle !== undefined) env.cardTitle = cardTitle;
    if (cardDescription !== undefined) env.cardDescription = cardDescription;
    return env;
  });

// Legacy plain-string drafts: any string that does NOT start with '{' after
// trimStart (the implementation routes those to the JSON-envelope branch).
const legacyStringArb = fc.string().filter((s) => !s.trimStart().startsWith('{'));

test('Property 16: parse(serialize(envelope)) equals the envelope', () => {
  fc.assert(
    fc.property(envelopeArb, (env) => {
      assert.deepEqual(parseDraft(serializeDraft(env)), env);
    }),
    { numRuns: 100 },
  );
});

test('Property 16: a legacy plain string parses to { text: <string> }', () => {
  fc.assert(
    fc.property(legacyStringArb, (raw) => {
      assert.deepEqual(parseDraft(raw), { text: raw });
    }),
    { numRuns: 100 },
  );
});
