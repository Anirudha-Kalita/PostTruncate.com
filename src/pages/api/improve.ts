// ──────────────────────────────────────────────────────────────────────────
// POST /api/improve — server-side AI rewrite endpoint (Cloudflare Worker).
//
// This is the ONE server route on the site. It exists so the AI provider keys
// are never shipped to the browser and so the per-visitor rate limit can't be
// bypassed by clearing storage. Gemini is the primary provider (GEMINI_API_KEY);
// Groq's Llama 3.3 70B (GROQ_API_KEY) is an optional fallback that kicks in when
// Gemini errors or returns an empty/truncated rewrite — the common long-post
// failure mode. Keys are Worker secrets (.dev.vars locally); the limit counter
// lives in the AI_RATELIMIT KV namespace. All pure logic is in
// src/lib/aiImprove.ts and unit-tested there.
//
// Provider strategy: Gemini is primary. On ANY Gemini failure (network error,
// non-200, safety block, empty, or a token-truncated reply) the request falls
// back to Groq's Llama 3.3 70B when env.GROQ_API_KEY is set. The fallback is a
// no-op when that key is absent, so Gemini-only deployments keep working.
// ──────────────────────────────────────────────────────────────────────────
import type { APIRoute } from 'astro';
import {
  buildPrompt,
  evaluateRateLimit,
  geminiBody,
  geminiUrl,
  groqBody,
  groqUrl,
  isAllowedOrigin,
  isJsonContentType,
  isTone,
  normalizeClientToken,
  parseGeminiText,
  parseGroqText,
  MAX_INPUT_CHARS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_IP_MAX,
  type RateDecision,
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
  | 'upstream'
  // Anti-abuse guards — never hit by the site's own client (it always sends the
  // right Origin + JSON content-type), so the client maps them to its generic
  // error via the default branch of messageForError.
  | 'forbidden_origin'
  | 'unsupported_media_type';

/** Minimal slice of the Cloudflare KV API this route uses (avoids a hard
 *  dependency on @cloudflare/workers-types ambient globals). */
interface KvLike {
  get(key: string, type: 'json'): Promise<unknown>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

/** Typed view over the Worker bindings we rely on. */
interface Bindings {
  GEMINI_API_KEY?: string;
  /** Optional Groq key — enables the Llama 3.3 70B fallback when present. */
  GROQ_API_KEY?: string;
  AI_RATELIMIT?: KvLike;
}

/**
 * Read the Worker bindings (secrets + KV) for this request. On
 * @astrojs/cloudflare v12 / Astro 5 these are exposed via
 * `context.locals.runtime.env` (populated by the platformProxy in dev and the
 * Worker runtime in production). The older `cloudflare:workers` virtual-module
 * import only exists on adapter v13 / Astro 6 and throws here at module load.
 */
function getBindings(context: Parameters<APIRoute>[0]): Bindings {
  const runtime = (context.locals as { runtime?: { env?: Bindings } }).runtime;
  return runtime?.env ?? {};
}

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
  const bindings = getBindings(context);
  // At least one provider must be configured. Gemini is primary; Groq is the
  // fallback. If neither key is present the feature is genuinely unavailable.
  if (!bindings.GEMINI_API_KEY && !bindings.GROQ_API_KEY) {
    return fail('not_configured', 503);
  }

  // ── Anti-abuse guards ─────────────────────────────────────────────────────
  // Only the site's own pages may spend the shared AI quota. A cross-site
  // browser request always carries an Origin, so an allowlist blocks it; and a
  // JSON content-type is required so a cross-site "simple" POST (which skips the
  // CORS preflight and actually reaches the server) can't smuggle a payload in.
  if (!isAllowedOrigin(context.request.headers.get('origin'))) {
    return fail('forbidden_origin', 403);
  }
  if (!isJsonContentType(context.request.headers.get('content-type'))) {
    return fail('unsupported_media_type', 415);
  }

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

  // ── Rate limit (KV, two tiers, 12h rolling window) ────────────────────────
  // Two tiers so people sharing one NAT/office IP aren't collectively capped at
  // the per-user allowance:
  //  • per client-token — a random id the browser keeps in localStorage and
  //    sends via X-Client-Token. The intended per-user cap (RATE_LIMIT_MAX). It
  //    is resettable by clearing storage, which is why it is NOT the only tier.
  //  • per IP (CF-Connecting-IP) — a higher backstop (RATE_LIMIT_IP_MAX) that
  //    clearing storage can't get past, so a single IP still can't run away.
  // A request needs budget in BOTH; both are consumed on success. If KV isn't
  // bound (bare local dev) we degrade to no limiting rather than erroring.
  const kv = bindings.AI_RATELIMIT;
  const now = Date.now();

  if (kv) {
    const ip = context.request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const clientId = normalizeClientToken(context.request.headers.get('X-Client-Token'));
    const ipKey = `rl:ip:${ip}`;
    const clientKey = clientId ? `rl:ct:${clientId}` : null;

    const [ipRec, clientRec] = await Promise.all([
      kv.get(ipKey, 'json').catch(() => null),
      clientKey ? kv.get(clientKey, 'json').catch(() => null) : Promise.resolve(null),
    ]);

    const ipDecision = evaluateRateLimit(ipRec as RateRecord | null, now, RATE_LIMIT_IP_MAX);
    // No valid client token → fall back to the IP backstop only.
    const clientDecision = clientKey
      ? evaluateRateLimit(clientRec as RateRecord | null, now)
      : null;

    // Blocked when EITHER tier is exhausted; report the blocking tier's reset/max.
    const blocking = !ipDecision.allowed
      ? { decision: ipDecision, max: RATE_LIMIT_IP_MAX }
      : clientDecision && !clientDecision.allowed
        ? { decision: clientDecision, max: RATE_LIMIT_MAX }
        : null;
    if (blocking) {
      return fail('rate_limited', 429, {
        retryAfterSec: blocking.decision.retryAfterSec,
        remaining: 0,
        max: blocking.max,
      });
    }

    // Consume both tiers (each TTL expires exactly at its own window end).
    await Promise.all([
      persistLimit(kv, ipKey, ipDecision, now),
      clientKey && clientDecision
        ? persistLimit(kv, clientKey, clientDecision, now)
        : Promise.resolve(),
    ]);

    // Surface the per-user remaining (what the UI shows); fall back to the IP
    // remaining when the request carried no client token.
    const remaining = clientDecision ? clientDecision.remaining : ipDecision.remaining;
    return await improveText(bindings, tone, text, remaining);
  }

  // No KV bound — proceed without a limit (local/dev fallback).
  return await improveText(bindings, tone, text, RATE_LIMIT_MAX - 1);
};

/** Persist a consumed rate-limit slot with a TTL that expires at the window end. */
function persistLimit(
  kv: KvLike,
  key: string,
  decision: RateDecision,
  now: number,
): Promise<void> {
  const ttl = Math.max(60, Math.ceil((decision.next.resetAt - now) / 1000));
  return kv.put(key, JSON.stringify(decision.next), { expirationTtl: ttl }).catch(() => {});
}

/**
 * Run the rewrite with Gemini as primary and Groq (Llama 3.3 70B) as fallback.
 * Gemini handles the common case; when it errors, is blocked, or returns an
 * empty/truncated rewrite (the typical long-post failure mode), we transparently
 * retry with Groq. If no Groq key is configured the fallback is simply skipped.
 * Returns 502 only when every available provider fails.
 */
async function improveText(
  bindings: Bindings,
  tone: Parameters<typeof buildPrompt>[0],
  text: string,
  remaining: number,
): Promise<Response> {
  const prompt = buildPrompt(tone, text);

  // Primary: Gemini.
  let improved = bindings.GEMINI_API_KEY
    ? await callGemini(bindings.GEMINI_API_KEY, prompt)
    : null;

  // Fallback: Groq Llama 3.3 70B (only if a key is bound).
  if (!improved && bindings.GROQ_API_KEY) {
    improved = await callGroq(bindings.GROQ_API_KEY, prompt);
  }

  if (!improved) return fail('upstream', 502);
  return json({ improved, remaining }, 200);
}

/** Call Gemini generateContent. Returns the rewrite, or null on any failure. */
async function callGemini(apiKey: string, prompt: string): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(geminiUrl(apiKey), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(geminiBody(prompt)),
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return null;
  }
  return parseGeminiText(data);
}

/** Call Groq Chat Completions. Returns the rewrite, or null on any failure. */
async function callGroq(apiKey: string, prompt: string): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(groqUrl(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(groqBody(prompt)),
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return null;
  }
  return parseGroqText(data);
}

// Reject non-POST verbs cleanly so the route advertises its contract.
export const ALL: APIRoute = () => fail('bad_request', 405);
