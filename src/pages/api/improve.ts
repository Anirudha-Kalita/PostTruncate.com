// ──────────────────────────────────────────────────────────────────────────
// POST /api/improve — server-side AI rewrite endpoint (Cloudflare Worker).
//
// This is the ONE server route on the site. It exists so the Gemini API key is
// never shipped to the browser and so the per-visitor rate limit can't be
// bypassed by clearing storage. The key lives in env.GEMINI_API_KEY (a Worker
// secret / .dev.vars locally); the limit counter lives in the AI_RATELIMIT KV
// namespace. All pure logic is in src/lib/aiImprove.ts and unit-tested there.
// ──────────────────────────────────────────────────────────────────────────
import type { APIRoute } from 'astro';
// `env` is a live binding to the Worker's environment (secrets + KV). In
// @astrojs/cloudflare v13 / Astro 6 this replaced the removed
// `Astro.locals.runtime.env` API. Virtual module — only resolves at runtime.
// @ts-expect-error - provided by the Cloudflare Workers runtime
import { env } from 'cloudflare:workers';
import {
  buildPrompt,
  evaluateRateLimit,
  geminiBody,
  geminiUrl,
  isTone,
  parseGeminiText,
  MAX_INPUT_CHARS,
  RATE_LIMIT_MAX,
  type RateRecord,
} from '../../lib/aiImprove';

export const prerender = false;

/** Error codes the client maps to localized messages. */
type ErrorCode =
  | 'bad_request'
  | 'empty'
  | 'too_long'
  | 'rate_limited'
  | 'not_configured'
  | 'upstream';

/** Minimal slice of the Cloudflare KV API this route uses (avoids a hard
 *  dependency on @cloudflare/workers-types ambient globals). */
interface KvLike {
  get(key: string, type: 'json'): Promise<unknown>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

/** Typed view over the Worker bindings we rely on. */
const bindings = env as { GEMINI_API_KEY?: string; AI_RATELIMIT?: KvLike };

function json(body: unknown, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });
}

function fail(code: ErrorCode, status: number, extra?: Record<string, unknown>): Response {
  return json({ error: code, ...extra }, status);
}

export const POST: APIRoute = async (context) => {
  const apiKey = bindings.GEMINI_API_KEY;
  if (!apiKey) return fail('not_configured', 503);

  // ── Parse + validate input ────────────────────────────────────────────────
  // Read the raw body then JSON.parse it (rather than request.json()) so an
  // empty/odd body yields a clean 400 instead of an unhandled stream error.
  let payload: { text?: unknown; tone?: unknown };
  try {
    const raw = await context.request.text();
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    return fail('bad_request', 400);
  }

  const text = typeof payload.text === 'string' ? payload.text : '';
  const tone = payload.tone;
  if (!isTone(tone)) return fail('bad_request', 400);
  if (!text.trim()) return fail('empty', 400);
  if (text.length > MAX_INPUT_CHARS) return fail('too_long', 413, { max: MAX_INPUT_CHARS });

  // ── Rate limit by visitor IP (KV, fixed 12h window) ───────────────────────
  // Cloudflare sets CF-Connecting-IP on every edge request. If KV isn't bound
  // (e.g. a bare local dev run), we degrade to no limiting rather than erroring.
  const kv = bindings.AI_RATELIMIT;
  const ip = context.request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const now = Date.now();

  if (kv) {
    const stored = await kv.get(`rl:${ip}`, 'json').catch(() => null);
    const decision = evaluateRateLimit(stored as RateRecord | null, now);
    if (!decision.allowed) {
      return fail('rate_limited', 429, {
        retryAfterSec: decision.retryAfterSec,
        remaining: 0,
        max: RATE_LIMIT_MAX,
      });
    }
    // Persist the consumed slot with a TTL that expires exactly at window end.
    const ttl = Math.max(60, Math.ceil((decision.next.resetAt - now) / 1000));
    await kv
      .put(`rl:${ip}`, JSON.stringify(decision.next), { expirationTtl: ttl })
      .catch(() => {});
    return await callGemini(apiKey, tone, text, decision.remaining);
  }

  // No KV bound — proceed without a limit (local/dev fallback).
  return await callGemini(apiKey, tone, text, RATE_LIMIT_MAX - 1);
};

async function callGemini(
  apiKey: string,
  tone: Parameters<typeof buildPrompt>[0],
  text: string,
  remaining: number,
): Promise<Response> {
  const prompt = buildPrompt(tone, text);
  let res: Response;
  try {
    res = await fetch(geminiUrl(apiKey), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(geminiBody(prompt)),
    });
  } catch {
    return fail('upstream', 502);
  }

  if (!res.ok) return fail('upstream', 502);

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return fail('upstream', 502);
  }

  const improved = parseGeminiText(data);
  if (!improved) return fail('upstream', 502);

  return json({ improved, remaining }, 200);
}

// Reject non-POST verbs cleanly so the route advertises its contract.
export const ALL: APIRoute = () => fail('bad_request', 405);
