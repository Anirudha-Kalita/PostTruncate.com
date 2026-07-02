// ──────────────────────────────────────────────────────────────────────────
// AI Improve — pure, DOM-free helpers for the Gemini-backed "rewrite my post"
// feature. Everything here is unit-testable (Layer 1): the tone catalogue, the
// prompt builder, the Gemini response parser, and the fixed-window rate-limit
// evaluator. The Astro endpoint (src/pages/api/improve.ts) wires these to KV +
// the Gemini REST API; this file never touches the network or the DOM.
// ──────────────────────────────────────────────────────────────────────────

/** Tones offered in the UI picker. Order is the display order. */
export const TONES = [
  'professional',
  'casual',
  'marketing',
  'friendly',
  'concise',
] as const;

export type Tone = (typeof TONES)[number];

export function isTone(value: unknown): value is Tone {
  return typeof value === 'string' && (TONES as readonly string[]).includes(value);
}

// ── Request guards (anti-abuse) ──────────────────────────────────────────────
// This endpoint spends the site's shared AI quota, so it must only serve the
// site's own pages — not any third-party website that POSTs here to get free
// rewrites. Both guards below are pure so they're unit-tested in Layer 1.

/** Origins the site is served from (see the `routes` in wrangler.jsonc). */
export const ALLOWED_ORIGINS = [
  'https://posttruncate.com',
  'https://www.posttruncate.com',
] as const;

/**
 * True when a request's `Origin` may use the endpoint. A cross-site browser
 * request (another website's page calling this) ALWAYS carries an Origin, so an
 * allowlist check blocks that abuse. A MISSING Origin is allowed through: it
 * means a non-browser client (curl, a server), which is not the "embed on their
 * site" vector and is already bounded by the per-IP rate limit. localhost /
 * 127.0.0.1 on any port is allowed for local dev — that can't be abused from a
 * public site because a browser always reports the page's real origin.
 */
export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return true;
  if ((ALLOWED_ORIGINS as readonly string[]).includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    return hostname === 'localhost' || hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

/**
 * True when the request declares a JSON body. Required so a cross-site "simple"
 * POST — one using text/plain or a form content-type, the kinds that skip the
 * CORS preflight and so actually reach the server — can't smuggle a JSON payload
 * in to spend quota. Any parameter after the media type (e.g. "; charset=utf-8")
 * is ignored.
 */
export function isJsonContentType(contentType: string | null | undefined): boolean {
  if (!contentType) return false;
  return contentType.split(';', 1)[0].trim().toLowerCase() === 'application/json';
}

/**
 * Normalize a client-supplied rate-limit token (a random id the browser keeps in
 * localStorage and sends per request). Returns the lower-cased token, or null
 * when it's missing/malformed. The bounded charset + length stop a caller from
 * spraying arbitrary KV keys (unbounded cardinality / storage abuse); a random
 * UUID from crypto.randomUUID() satisfies it.
 */
export function normalizeClientToken(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const t = raw.trim().toLowerCase();
  return /^[a-z0-9-]{16,64}$/.test(t) ? t : null;
}

/** Hard input cap — protects the free Gemini quota and keeps latency sane. */
export const MAX_INPUT_CHARS = 3000;

// ── Rate limiting: two tiers so shared NAT/office IPs aren't over-blocked ────
// The per-client-token cap is the intended per-user allowance; the per-IP cap is
// a higher backstop that clearing browser storage can't get past (so one IP
// still can't run away). A request needs budget in BOTH; the route consumes both.

/** Per-client-token cap: N successful improvements per rolling window, per browser. */
export const RATE_LIMIT_MAX = 3;
/**
 * Per-IP backstop cap. Higher than the per-client cap so several people behind
 * one NAT/office IP aren't collectively capped at the per-user limit, while a
 * single IP is still bounded (this tier is NOT reset by clearing storage).
 */
export const RATE_LIMIT_IP_MAX = 20;
export const RATE_LIMIT_WINDOW_MS = 12 * 60 * 60 * 1000; // 12 hours

/** Gemini model + REST host. Free-tier eligible flash model. */
export const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_HOST = 'https://generativelanguage.googleapis.com/v1beta';

/** Per-tone rewrite instruction injected into the prompt. */
const TONE_INSTRUCTIONS: Record<Tone, string> = {
  professional:
    'Rewrite it in a polished, professional, business-appropriate voice. Clear and credible, no slang.',
  casual:
    'Rewrite it in a relaxed, conversational voice, like talking to a friend. Natural and approachable.',
  marketing:
    'Rewrite it as punchy, persuasive marketing copy. Lead with a strong hook, drive interest, keep momentum.',
  friendly:
    'Rewrite it in a warm, friendly, encouraging voice. Positive and personable without being over the top.',
  concise:
    'Rewrite it to be as concise and tight as possible. Cut filler, keep every essential point, shorten sentences.',
};

/**
 * Build the single-prompt instruction sent to Gemini. The goal is a TONE change
 * only — not a summary. We force the model to keep the original length and
 * structure and to copy every hashtag / @mention / URL / emoji verbatim, so the
 * rewrite drops straight back into the editor without losing content. The lone
 * exception is the "concise" tone, which may tighten wording (but still keeps
 * structure and all links/hashtags).
 */
export function buildPrompt(tone: Tone, text: string): string {
  const lengthRule =
    tone === 'concise'
      ? '- Tighten the wording so it reads more concisely, but keep every paragraph and line break and do not drop any point the post makes.'
      : '- Keep roughly the SAME length and the SAME structure as the original: keep every paragraph and line break. Do NOT summarize, condense, merge paragraphs, or shorten the post.';

  return [
    'You are an expert social-media copy editor. Rewrite the social media post below to change ONLY its tone and voice — this is a rewrite, not a summary.',
    TONE_INSTRUCTIONS[tone],
    '',
    'Strict rules:',
    '- Reply with ONLY the rewritten post. No preamble, no explanation, no surrounding quotes.',
    '- Keep the SAME language as the original post.',
    lengthRule,
    '- Copy every #hashtag, @mention, URL and emoji EXACTLY as written and keep them in their original positions. Never remove, rename, shorten, or relocate them.',
    '- Do not invent facts, links, hashtags, or statistics that are not in the original.',
    '- Only change wording and phrasing to match the requested tone.',
    '',
    'Original post:',
    '"""',
    text,
    '"""',
  ].join('\n');
}

/** Minimal shape of the Gemini generateContent response we rely on. */
interface GeminiResponse {
  candidates?: {
    content?: { parts?: { text?: string }[] };
    finishReason?: string;
  }[];
  promptFeedback?: { blockReason?: string };
}

/**
 * Extract the rewritten text from a Gemini response. Returns null when the
 * model returned nothing usable (safety block, empty candidate, etc.) so the
 * caller can surface a clean error rather than crashing.
 */
export function parseGeminiText(json: unknown): string | null {
  const res = json as GeminiResponse;
  if (res?.promptFeedback?.blockReason) return null;
  const candidate = res?.candidates?.[0];
  // A truncated rewrite — the model hit the output-token ceiling, typically
  // because this "thinking" model spent the budget reasoning before writing —
  // is unusable. Signal failure so the caller falls back to the secondary
  // provider instead of dropping a half-finished post into the editor.
  if (candidate?.finishReason === 'MAX_TOKENS') return null;
  const parts = candidate?.content?.parts;
  if (!Array.isArray(parts)) return null;
  const text = parts
    .map((p) => p?.text ?? '')
    .join('')
    .trim();
  if (!text) return null;
  // Strip a single layer of wrapping quotes the model sometimes adds anyway.
  return text.replace(/^"([\s\S]*)"$/, '$1').trim();
}

/** Build the Gemini generateContent REST URL for the given key. */
export function geminiUrl(apiKey: string): string {
  return `${GEMINI_HOST}/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
}

/** Request body for the Gemini generateContent call. */
export function geminiBody(prompt: string): unknown {
  return {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    // maxOutputTokens is generous so a near-max-length post (the input cap is
    // MAX_INPUT_CHARS) is never truncated mid-rewrite. A short post still
    // produces a short reply — this only raises the ceiling, not the length.
    generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 4096 },
  };
}

// ── Groq fallback (OpenAI-compatible Chat Completions) ───────────────────────
// Used when Gemini fails, is unavailable, or returns an empty/truncated rewrite
// (the typical long-post failure mode). Llama 3.3 70B is a plain instruct model
// with no hidden "thinking" tokens, so the full output budget goes to the post.

/** Free-tier-eligible Groq model. Non-reasoning instruct model. */
export const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_HOST = 'https://api.groq.com/openai/v1';

/** Build the Groq Chat Completions REST URL (key goes in the auth header). */
export function groqUrl(): string {
  return `${GROQ_HOST}/chat/completions`;
}

/** Request body for the Groq Chat Completions call (OpenAI-compatible). */
export function groqBody(prompt: string): unknown {
  return {
    model: GROQ_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 0.9,
    // Generous ceiling so a near-max-length post is never cut off. Llama spends
    // no tokens on hidden reasoning, so this is purely the visible reply budget.
    max_completion_tokens: 4096,
  };
}

/** Minimal shape of the Groq (OpenAI-compatible) chat completion response. */
interface GroqResponse {
  choices?: {
    message?: { content?: string };
    finish_reason?: string;
  }[];
}

/**
 * Extract the rewritten text from a Groq chat completion. Returns null when the
 * reply is empty or was cut off at the token ceiling (`finish_reason: "length"`)
 * so a truncated post is never dropped into the editor.
 */
export function parseGroqText(json: unknown): string | null {
  const res = json as GroqResponse;
  const choice = res?.choices?.[0];
  if (!choice) return null;
  // A length-truncated rewrite is unusable.
  if (choice.finish_reason === 'length') return null;
  const text = (choice.message?.content ?? '').trim();
  if (!text) return null;
  // Strip a single layer of wrapping quotes the model sometimes adds anyway.
  return text.replace(/^"([\s\S]*)"$/, '$1').trim();
}

// ── Rate limiting (fixed 12h window, anchored at first use in the window) ────

export interface RateRecord {
  /** Successful improvements used in the current window. */
  count: number;
  /** Epoch ms when the current window ends and the quota resets. */
  resetAt: number;
}

export interface RateDecision {
  allowed: boolean;
  /** Improvements left AFTER this request (0 when blocked or just-spent last). */
  remaining: number;
  /** Epoch ms the quota resets. */
  resetAt: number;
  /** Seconds until reset (for the "try again in …" message). */
  retryAfterSec: number;
  /** The record to persist (unchanged from input when blocked). */
  next: RateRecord;
}

/**
 * Decide whether a request is allowed and compute the record to persist.
 * Pure: callers pass the current stored record (or null) plus `now`.
 *
 * A window opens on the first allowed request and lasts RATE_LIMIT_WINDOW_MS.
 * Up to RATE_LIMIT_MAX requests are allowed within it; the (MAX+1)-th is
 * blocked until the window's resetAt passes, after which a fresh window opens.
 */
export function evaluateRateLimit(
  current: RateRecord | null,
  now: number,
  max: number = RATE_LIMIT_MAX,
  windowMs: number = RATE_LIMIT_WINDOW_MS,
): RateDecision {
  // No record, or the previous window has elapsed → start a fresh window.
  if (!current || current.resetAt <= now) {
    const next: RateRecord = { count: 1, resetAt: now + windowMs };
    return {
      allowed: true,
      remaining: max - 1,
      resetAt: next.resetAt,
      retryAfterSec: Math.ceil(windowMs / 1000),
      next,
    };
  }

  // Inside an open window with quota remaining → consume one.
  if (current.count < max) {
    const next: RateRecord = { count: current.count + 1, resetAt: current.resetAt };
    return {
      allowed: true,
      remaining: max - next.count,
      resetAt: current.resetAt,
      retryAfterSec: Math.max(0, Math.ceil((current.resetAt - now) / 1000)),
      next,
    };
  }

  // Quota exhausted for this window → block, leave the record untouched.
  return {
    allowed: false,
    remaining: 0,
    resetAt: current.resetAt,
    retryAfterSec: Math.max(0, Math.ceil((current.resetAt - now) / 1000)),
    next: current,
  };
}
