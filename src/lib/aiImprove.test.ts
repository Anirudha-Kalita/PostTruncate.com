import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPrompt,
  evaluateRateLimit,
  geminiUrl,
  groqBody,
  groqUrl,
  GROQ_MODEL,
  isAllowedOrigin,
  isJsonContentType,
  isTone,
  normalizeClientToken,
  parseGeminiText,
  parseGroqText,
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

// ── request guards (anti-abuse) ──────────────────────────────────────────────

test('isAllowedOrigin permits the site origins and localhost, rejects others', () => {
  assert.equal(isAllowedOrigin('https://posttruncate.com'), true);
  assert.equal(isAllowedOrigin('https://www.posttruncate.com'), true);
  assert.equal(isAllowedOrigin('http://localhost:4321'), true);
  assert.equal(isAllowedOrigin('http://127.0.0.1:8787'), true);
  // Cross-site abuse and look-alikes are blocked.
  assert.equal(isAllowedOrigin('https://evil.com'), false);
  assert.equal(isAllowedOrigin('https://posttruncate.com.evil.com'), false);
  assert.equal(isAllowedOrigin('https://notposttruncate.com'), false);
  assert.equal(isAllowedOrigin('not-a-url'), false);
});

test('isAllowedOrigin allows a missing Origin (non-browser client, rate-limited)', () => {
  assert.equal(isAllowedOrigin(null), true);
  assert.equal(isAllowedOrigin(undefined), true);
  assert.equal(isAllowedOrigin(''), true);
});

test('isJsonContentType requires application/json and ignores parameters', () => {
  assert.equal(isJsonContentType('application/json'), true);
  assert.equal(isJsonContentType('application/json; charset=utf-8'), true);
  assert.equal(isJsonContentType('  Application/JSON '), true);
  // The "simple" content-types that skip the CORS preflight are rejected.
  assert.equal(isJsonContentType('text/plain'), false);
  assert.equal(isJsonContentType('application/x-www-form-urlencoded'), false);
  assert.equal(isJsonContentType('multipart/form-data'), false);
  assert.equal(isJsonContentType(null), false);
  assert.equal(isJsonContentType(''), false);
});

// ── client-token normalization (rate-limit tier) ─────────────────────────────

test('normalizeClientToken accepts UUID-shaped tokens, lower-cased', () => {
  assert.equal(
    normalizeClientToken('550E8400-E29B-41D4-A716-446655440000'),
    '550e8400-e29b-41d4-a716-446655440000',
  );
  assert.equal(normalizeClientToken('  a1b2c3d4e5f60718  '), 'a1b2c3d4e5f60718'); // trimmed, 16 chars
});

test('normalizeClientToken rejects malformed / abusive tokens', () => {
  assert.equal(normalizeClientToken(''), null);
  assert.equal(normalizeClientToken('short'), null);            // < 16 chars
  assert.equal(normalizeClientToken('x'.repeat(65)), null);     // > 64 chars (KV key abuse)
  assert.equal(normalizeClientToken('bad token with spaces!!'), null);
  assert.equal(normalizeClientToken('inject/../key0000'), null); // key-path chars
  assert.equal(normalizeClientToken(null), null);
  assert.equal(normalizeClientToken(undefined), null);
  assert.equal(normalizeClientToken(12345678901234567), null);  // non-string
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

test('non-concise prompts forbid summarizing and preserve length/links/hashtags', () => {
  for (const tone of ['professional', 'casual', 'marketing', 'friendly'] as const) {
    const p = buildPrompt(tone, 'x');
    assert.match(p, /Do NOT summarize/, `${tone} should forbid summarizing`);
    assert.match(p, /SAME length/, `${tone} should preserve length`);
    assert.match(p, /#hashtag.*@mention.*URL.*emoji EXACTLY/, `${tone} should preserve links/hashtags`);
    assert.match(p, /not a summary/);
  }
});

test('concise prompt tightens wording but still preserves links/hashtags', () => {
  const p = buildPrompt('concise', 'x');
  assert.match(p, /more concisely/);
  assert.match(p, /#hashtag.*@mention.*URL.*emoji EXACTLY/);
  // Even concise must not be told to drop points or strip structure.
  assert.match(p, /do not drop any point/);
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

test('parseGeminiText returns null when the reply was truncated at the token ceiling', () => {
  // A thinking model can hit MAX_TOKENS with only a partial post — unusable, so
  // the endpoint can fall back to Groq rather than inserting half a rewrite.
  const json = {
    candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: 'Half a rewr' }] } }],
  };
  assert.equal(parseGeminiText(json), null);
});

// ── Groq fallback parsing ────────────────────────────────────────────────────

test('parseGroqText pulls and trims the message content', () => {
  const json = { choices: [{ message: { content: '  Hello world  ' }, finish_reason: 'stop' }] };
  assert.equal(parseGroqText(json), 'Hello world');
});

test('parseGroqText strips a single layer of wrapping quotes', () => {
  const json = { choices: [{ message: { content: '"quoted"' }, finish_reason: 'stop' }] };
  assert.equal(parseGroqText(json), 'quoted');
});

test('parseGroqText returns null on empty, missing, or length-truncated replies', () => {
  assert.equal(parseGroqText({ choices: [] }), null);
  assert.equal(parseGroqText({}), null);
  assert.equal(parseGroqText({ choices: [{ message: { content: '   ' }, finish_reason: 'stop' }] }), null);
  // finish_reason 'length' means the model hit the ceiling → unusable.
  assert.equal(
    parseGroqText({ choices: [{ message: { content: 'partial' }, finish_reason: 'length' }] }),
    null,
  );
});

// ── URL builder ──────────────────────────────────────────────────────────────

test('geminiUrl encodes the key as a query param', () => {
  assert.match(geminiUrl('abc 123'), /\?key=abc%20123$/);
});

test('groqUrl points at the OpenAI-compatible chat completions endpoint', () => {
  assert.match(groqUrl(), /\/openai\/v1\/chat\/completions$/);
});

test('groqBody targets the Llama 3.3 70B model and carries the prompt', () => {
  const body = groqBody('rewrite this') as {
    model: string;
    messages: { role: string; content: string }[];
    max_completion_tokens: number;
  };
  assert.equal(body.model, GROQ_MODEL);
  assert.equal(body.messages[0].content, 'rewrite this');
  assert.ok(body.max_completion_tokens >= 2048, 'output ceiling should be generous for long posts');
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
