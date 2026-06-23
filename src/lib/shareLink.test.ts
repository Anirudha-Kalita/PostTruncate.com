import { test } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import LZString from 'lz-string';

const { compressToEncodedURIComponent } = LZString;

import {
  serializeShare,
  parseShare,
  pruneEmptyFields,
  SCHEMA_VERSION,
  type ShareState,
  type SharePayload,
} from './shareLink';

// ───────────────────────────────────────────────────────────────────────────
// Feature: share-link — codec correctness properties (P1–P6).
//
// Imports the REAL serializeShare/parseShare/pruneEmptyFields — no production
// logic is re-implemented here. Generators cover unicode, emoji, CJK, line
// breaks, and long text so the round-trip property exercises realistic content.
// ───────────────────────────────────────────────────────────────────────────

/** Strings covering ASCII, whitespace, unicode, emoji, CJK, and line breaks. */
const textArb = fc.oneof(
  fc.string(),
  fc.constantFrom(
    '',
    '   ',
    '🚀 Launch day!',
    '日本語のテスト',
    'Ñandú café crème brûlée',
    'line1\nline2\n\npara3',
    'mixed 😀 текст 中文 end',
    'x'.repeat(2000),
  ),
);

/** Raw (possibly-dirty) editor state, before pruning. */
const editorStateRaw: fc.Arbitrary<ShareState> = fc
  .record({
    text: textArb,
    cardTitle: fc.option(textArb, { nil: undefined }),
    cardDescription: fc.option(textArb, { nil: undefined }),
  })
  .map(({ text, cardTitle, cardDescription }) => {
    const s: ShareState = { kind: 'editor', text };
    if (cardTitle !== undefined) s.cardTitle = cardTitle;
    if (cardDescription !== undefined) s.cardDescription = cardDescription;
    return s;
  });

/** Raw (possibly-dirty) ad state, before pruning. */
const adStateRaw: fc.Arbitrary<ShareState> = fc
  .record({
    platform: fc.constantFrom('google', 'facebook', 'instagram', 'tiktok'),
    fields: fc.dictionary(fc.string({ minLength: 1, maxLength: 12 }), textArb),
    view: fc.record(
      {
        device: fc.constantFrom('mobile', 'desktop'),
        mode: fc.constantFrom('feed', 'reels'),
        safeZone: fc.boolean(),
        destinationUrl: textArb,
        cta: textArb,
        finalUrl: textArb,
        paths: fc.array(textArb, { maxLength: 3 }),
      },
      { requiredKeys: [] },
    ),
  })
  .map(({ platform, fields, view }) => ({ kind: 'ad', platform, fields, view }));

const stateRaw = fc.oneof(editorStateRaw, adStateRaw);

/** A canonical (pruned) payload — a fixed point of serialize→parse. */
const payloadArb: fc.Arbitrary<SharePayload> = stateRaw.map((state) => ({
  v: SCHEMA_VERSION,
  state: pruneEmptyFields(state),
}));

/** Craft a token from an arbitrary (possibly malformed) object, codec-style. */
const craft = (obj: unknown): string => compressToEncodedURIComponent(JSON.stringify(obj));

// ── Property 1: Round-trip identity (Req 4.3, 4.4) ──────────────────────────
test('Property 1: parseShare(serializeShare(p)) deep-equals p', () => {
  fc.assert(
    fc.property(payloadArb, (p) => {
      assert.deepEqual(parseShare(serializeShare(p)), p);
    }),
    { numRuns: 300 },
  );
});

// ── Property 2: Never throws (Req 6.1) ──────────────────────────────────────
test('Property 2: parseShare never throws for arbitrary input', () => {
  const junkArb = fc.oneof(
    fc.string(),
    fc.constantFrom(null, undefined, '', '!!!not-base64!!!', '{}', 'N4IgZ', 'undefined'),
    // valid-encoding-but-wrong-shape
    fc.anything().map((x) => craft(x)),
    // truncated valid tokens
    payloadArb.map((p) => serializeShare(p).slice(0, 5)),
  );
  fc.assert(
    fc.property(junkArb, (s) => {
      const out = parseShare(s as string | null | undefined);
      assert.ok(out === null || (typeof out === 'object' && out !== null));
    }),
    { numRuns: 300 },
  );
});

// ── Property 3: Empty/whitespace pruning (Req 2.4, 3.2) ─────────────────────
test('Property 3: prune drops empty/whitespace string fields and survives round-trip', () => {
  fc.assert(
    fc.property(stateRaw, (state) => {
      const pruned = pruneEmptyFields(state);
      if (pruned.kind === 'editor') {
        if ('cardTitle' in pruned) assert.notEqual(pruned.cardTitle!.trim(), '');
        if ('cardDescription' in pruned) assert.notEqual(pruned.cardDescription!.trim(), '');
      } else {
        for (const v of Object.values(pruned.fields)) assert.notEqual(v.trim(), '');
        const view = pruned.view;
        for (const k of ['destinationUrl', 'cta', 'finalUrl'] as const) {
          if (view[k] !== undefined) assert.notEqual(view[k]!.trim(), '');
        }
        if (view.paths) for (const p of view.paths) assert.notEqual(p.trim(), '');
      }
      const payload: SharePayload = { v: SCHEMA_VERSION, state: pruned };
      assert.deepEqual(parseShare(serializeShare(payload)), payload);
    }),
    { numRuns: 200 },
  );
});

// ── Property 4: Version gate (Req 6.4) ──────────────────────────────────────
test('Property 4: a payload with v > SCHEMA_VERSION parses to null', () => {
  fc.assert(
    fc.property(payloadArb, fc.integer({ min: 1, max: 1000 }), (p, bump) => {
      const future = craft({ v: SCHEMA_VERSION + bump, state: p.state });
      assert.equal(parseShare(future), null);
    }),
    { numRuns: 200 },
  );
});

// ── Property 5: Field-type robustness (Req 6.5) ─────────────────────────────
test('Property 5: a single wrong-typed editor field is dropped/coerced, others retained', () => {
  const wrongArb = fc.oneof(
    fc.integer(),
    fc.boolean(),
    fc.constant(null),
    fc.array(fc.integer()),
    fc.record({ a: fc.integer() }),
  );
  fc.assert(
    fc.property(fc.constantFrom('text', 'cardTitle', 'cardDescription'), wrongArb, (field, wrong) => {
      const base: Record<string, unknown> = {
        kind: 'editor',
        text: 'body',
        cardTitle: 'title',
        cardDescription: 'desc',
      };
      base[field] = wrong;
      const out = parseShare(craft({ v: SCHEMA_VERSION, state: base }));
      assert.ok(out !== null && out.state.kind === 'editor');
      const st = out.state;
      if (field === 'text') {
        assert.equal(st.text, ''); // wrong-typed body collapses to empty
        assert.equal(st.cardTitle, 'title');
        assert.equal(st.cardDescription, 'desc');
      } else if (field === 'cardTitle') {
        assert.equal(st.text, 'body');
        assert.equal(st.cardTitle, undefined); // dropped
        assert.equal(st.cardDescription, 'desc');
      } else {
        assert.equal(st.text, 'body');
        assert.equal(st.cardTitle, 'title');
        assert.equal(st.cardDescription, undefined); // dropped
      }
    }),
    { numRuns: 150 },
  );
});

test('Property 5: a wrong-typed ad view/field is dropped, valid view keys retained', () => {
  const out = parseShare(
    craft({
      v: SCHEMA_VERSION,
      state: {
        kind: 'ad',
        platform: 'facebook',
        fields: { primary: 'ok', headline1: 42 }, // headline1 wrong type → dropped
        view: { device: 'mobile', cta: 5, safeZone: 'yes' }, // cta + safeZone wrong type → dropped
      },
    }),
  );
  assert.ok(out !== null && out.state.kind === 'ad');
  const st = out.state;
  assert.deepEqual(st.fields, { primary: 'ok' });
  assert.deepEqual(st.view, { device: 'mobile' });
});

// ── Property 6: URL-safety (Req 4.2) ────────────────────────────────────────
test('Property 6: serialized tokens use only the URL-safe alphabet', () => {
  const urlSafe = /^[A-Za-z0-9+\-$]*$/;
  fc.assert(
    fc.property(payloadArb, (p) => {
      assert.match(serializeShare(p), urlSafe);
    }),
    { numRuns: 300 },
  );
});
