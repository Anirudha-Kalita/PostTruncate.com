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

/** Hard input cap — protects the free Gemini quota and keeps latency sane. */
export const MAX_INPUT_CHARS = 3000;

/** Rate limit: N successful improvements per rolling window, per visitor IP. */
export const RATE_LIMIT_MAX = 3;
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
 * Build the single-prompt instruction sent to Gemini. We pin the original
 * language, preserve hashtags / @mentions / URLs, and demand the rewritten post
 * only (no preamble, quotes, or commentary) so the response can be dropped
 * straight back into the editor.
 */
export function buildPrompt(tone: Tone, text: string): string {
  return [
    'You are an expert social-media copy editor. Rewrite the social media post below.',
    TONE_INSTRUCTIONS[tone],
    '',
    'Strict rules:',
    '- Reply with ONLY the rewritten post. No preamble, no explanation, no surrounding quotes.',
    '- Keep the SAME language as the original post.',
    '- Preserve all #hashtags, @mentions, URLs and emoji intent.',
    '- Do not invent facts, links, or statistics that are not in the original.',
    '- Keep it roughly the same length unless the tone is "concise".',
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
  const parts = res?.candidates?.[0]?.content?.parts;
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
    generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 1024 },
  };
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
