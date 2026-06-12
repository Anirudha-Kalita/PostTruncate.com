import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPrompt,
  evaluateRateLimit,
  geminiUrl,
  isTone,
  parseGeminiText,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  TONES,
  type RateRecord,
} from './aiImprove';

// ── tone guard ───────────────────────────────────────────────────────────────

test('isTone accepts every catalogued tone and rejects others', () => {
  for (const t of TONES) assert.equal(isTone(t), true);
  assert.equal(isTone('formal'), false);
  assert.equal(isTone(''), false);
  assert.equal(isTone(null), false);
  assert.equal(isTone(42), false);
});

// ── prompt builder ───────────────────────────────────────────────────────────

test('buildPrompt embeds the original text and a tone instruction', () => {
  const p = buildPrompt('marketing', 'Buy my thing today');
  assert.match(p, /Buy my thing today/);
  assert.match(p, /persuasive marketing copy/);
  // Pins language + only-the-post contract so the result is drop-in.
  assert.match(p, /SAME language/);
  assert.match(p, /ONLY the rewritten post/);
});

test('buildPrompt differs per tone', () => {
  assert.notEqual(buildPrompt('professional', 'x'), buildPrompt('casual', 'x'));
});

// ── response parsing ─────────────────────────────────────────────────────────

test('parseGeminiText pulls and trims the candidate text', () => {
  const json = {
    candidates: [{ content: { parts: [{ text: '  Hello world  ' }] } }],
  };
  assert.equal(parseGeminiText(json), 'Hello world');
});

test('parseGeminiText concatenates multiple parts', () => {
  const json = {
    candidates: [{ content: { parts: [{ text: 'foo ' }, { text: 'bar' }] } }],
  };
  assert.equal(parseGeminiText(json), 'foo bar');
});

test('parseGeminiText strips a single layer of wrapping quotes', () => {
  const json = { candidates: [{ content: { parts: [{ text: '"quoted"' }] } }] };
  assert.equal(parseGeminiText(json), 'quoted');
});

test('parseGeminiText returns null on safety block or empty output', () => {
  assert.equal(parseGeminiText({ promptFeedback: { blockReason: 'SAFETY' } }), null);
  assert.equal(parseGeminiText({ candidates: [] }), null);
  assert.equal(parseGeminiText({ candidates: [{ content: { parts: [{ text: '   ' }] } }] }), null);
  assert.equal(parseGeminiText({}), null);
});

// ── URL builder ──────────────────────────────────────────────────────────────

test('geminiUrl encodes the key as a query param', () => {
  assert.match(geminiUrl('abc 123'), /\?key=abc%20123$/);
});

// ── rate limiting ────────────────────────────────────────────────────────────

test('first request opens a fresh window with full window remaining', () => {
  const now = 1_000_000;
  const d = evaluateRateLimit(null, now);
  assert.equal(d.allowed, true);
  assert.equal(d.remaining, RATE_LIMIT_MAX - 1);
  assert.equal(d.next.count, 1);
  assert.equal(d.next.resetAt, now + RATE_LIMIT_WINDOW_MS);
});

test('consumes the quota across the window then blocks the (max+1)th', () => {
  const now = 5_000;
  let rec: RateRecord | null = null;
  let last;
  for (let i = 0; i < RATE_LIMIT_MAX; i++) {
    last = evaluateRateLimit(rec, now + i);
    assert.equal(last.allowed, true, `request ${i + 1} should be allowed`);
    rec = last.next;
  }
  assert.equal(last!.remaining, 0);
  // One more inside the same window → blocked, record untouched.
  const blocked = evaluateRateLimit(rec, now + RATE_LIMIT_MAX);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.next.count, RATE_LIMIT_MAX);
  assert.ok(blocked.retryAfterSec > 0);
});

test('a fresh window opens once the previous window has elapsed', () => {
  const start = 10_000;
  const exhausted: RateRecord = { count: RATE_LIMIT_MAX, resetAt: start + RATE_LIMIT_WINDOW_MS };
  // Just before reset → still blocked.
  const before = evaluateRateLimit(exhausted, exhausted.resetAt - 1);
  assert.equal(before.allowed, false);
  // At/after reset → new window, count restarts at 1.
  const after = evaluateRateLimit(exhausted, exhausted.resetAt);
  assert.equal(after.allowed, true);
  assert.equal(after.next.count, 1);
});
