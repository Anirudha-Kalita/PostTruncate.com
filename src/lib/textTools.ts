/**
 * PostTruncate text engine — pure, DOM-free functions.
 *
 * Everything the previews rely on lives here so the logic is testable in
 * isolation and shared across the Preact islands. All counting is done on
 * Unicode code points (via Array.from / spread) rather than UTF-16 code
 * units, so emoji and astral-plane characters are not miscounted.
 */

/** Platform truncation/limit constants. */
export const LIMITS = {
  LINKEDIN_DESKTOP: 210,
  LINKEDIN_MOBILE: 140,
  TWEET: 280,
  /** Threads (by Meta) per-post character ceiling; longer copy chains as replies. */
  THREADS: 500,
  /** t.co wraps every URL to a fixed weight regardless of real length. */
  URL_WEIGHT: 23,
  /** Instagram's hard ceiling — posting fails above this. */
  INSTAGRAM_HASHTAGS: 30,
} as const;

/** Count Unicode code points (not UTF-16 units). */
export function charCount(text: string): number {
  return Array.from(text).length;
}

/** Words = maximal runs of non-whitespace. */
export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/** Lines = newline-delimited rows (an empty editor is 0 lines). */
export function lineCount(text: string): number {
  if (!text) return 0;
  return text.split(/\r\n|\r|\n/).length;
}

/** Paragraphs = blocks separated by one or more blank lines. */
export function paragraphCount(text: string): number {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  return blocks.length;
}

// ──────────────────────────────────────────────────────────────────────────
// URL detection
// ──────────────────────────────────────────────────────────────────────────

/**
 * Matches http(s):// URLs and bare www./domain-style links the way social
 * composers auto-link them. Kept deliberately permissive but anchored on a
 * TLD so ordinary sentences with periods are not flagged.
 */
const URL_RE =
  /\b(?:https?:\/\/|www\.)[^\s]+|\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.(?:com|net|org|io|co|dev|app|ai|gg|me|ly|xyz|info|biz|news|gov|edu)\b(?:\/[^\s]*)?/gi;

export interface UrlMatch {
  url: string;
  start: number; // index in code units (for slicing the original string)
  end: number;
}

/** Find every URL-like token with its position. */
export function detectUrls(text: string): UrlMatch[] {
  const matches: UrlMatch[] = [];
  for (const m of text.matchAll(URL_RE)) {
    if (m.index === undefined) continue;
    matches.push({ url: m[0], start: m.index, end: m.index + m[0].length });
  }
  return matches;
}

/**
 * Weighted length the way X/Twitter counts it: every URL collapses to a flat
 * URL_WEIGHT (23), all other characters count as 1 code point each.
 */
export function weightedLength(text: string): number {
  const urls = detectUrls(text);
  if (urls.length === 0) return charCount(text);

  let weight = 0;
  let cursor = 0;
  for (const u of urls) {
    weight += charCount(text.slice(cursor, u.start)); // plain text before URL
    weight += LIMITS.URL_WEIGHT; // URL as a fixed cost
    cursor = u.end;
  }
  weight += charCount(text.slice(cursor)); // trailing plain text
  return weight;
}

// ──────────────────────────────────────────────────────────────────────────
// Hashtags
// ──────────────────────────────────────────────────────────────────────────

const HASHTAG_RE = /#[\p{L}\p{N}_]+/gu;

export function detectHashtags(text: string): string[] {
  return text.match(HASHTAG_RE) ?? [];
}

export function countHashtags(text: string): number {
  return detectHashtags(text).length;
}

// ──────────────────────────────────────────────────────────────────────────
// Pseudo-font ("fancy") Unicode — 𝖁𝖔𝖑𝖉 / 𝓢𝓬𝓻𝓲𝓹𝓽 style text
// ──────────────────────────────────────────────────────────────────────────

/**
 * Mathematical Alphanumeric Symbols + enclosed/fullwidth ranges that social
 * "font generators" abuse. These render as styled letters but are read aloud
 * character-by-character (or skipped) by screen readers.
 */
function isFancyCodePoint(cp: number): boolean {
  return (
    (cp >= 0x1d400 && cp <= 0x1d7ff) || // Mathematical Alphanumeric Symbols
    (cp >= 0x1f130 && cp <= 0x1f189) || // Enclosed alphanumeric supplement
    (cp >= 0x24b6 && cp <= 0x24e9) || // Circled Latin letters
    (cp >= 0xff21 && cp <= 0xff5a) // Fullwidth Latin letters
  );
}

export function hasFancyUnicode(text: string): boolean {
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined && isFancyCodePoint(cp)) return true;
  }
  return false;
}

export function countFancyUnicode(text: string): number {
  let n = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined && isFancyCodePoint(cp)) n++;
  }
  return n;
}

// ──────────────────────────────────────────────────────────────────────────
// Hidden / invisible Unicode
// ──────────────────────────────────────────────────────────────────────────

/**
 * Zero-width and invisible formatting characters that survive copy-paste and
 * silently break accessibility / character counts on older mobile clients.
 */
const HIDDEN_CP = new Set<number>([
  0x200b, // zero-width space
  0x200c, // zero-width non-joiner
  0x200d, // zero-width joiner
  0x200e, // left-to-right mark
  0x200f, // right-to-left mark
  0x2028, // line separator
  0x2029, // paragraph separator
  0x202a,
  0x202b,
  0x202c,
  0x202d,
  0x202e, // bidi embedding/override
  0x2060, // word joiner
  0xfeff, // BOM / zero-width no-break space
  0x00ad, // soft hyphen
]);

function isHiddenCodePoint(cp: number): boolean {
  if (HIDDEN_CP.has(cp)) return true;
  // C0/C1 control chars except tab/newline/carriage-return.
  if (cp <= 0x1f && cp !== 0x09 && cp !== 0x0a && cp !== 0x0d) return true;
  if (cp >= 0x7f && cp <= 0x9f) return true;
  return false;
}

export interface HiddenScan {
  count: number;
  /** Unique U+XXXX labels found, for surfacing to the user. */
  codes: string[];
}

export function detectHiddenUnicode(text: string): HiddenScan {
  let count = 0;
  const codes = new Set<string>();
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined && isHiddenCodePoint(cp)) {
      count++;
      codes.add('U+' + cp.toString(16).toUpperCase().padStart(4, '0'));
    }
  }
  return { count, codes: Array.from(codes) };
}

// ──────────────────────────────────────────────────────────────────────────
// Optimization actions
// ──────────────────────────────────────────────────────────────────────────

/**
 * Collapse 3+ consecutive line breaks into a single blank line (double
 * spacing), squeeze runs of spaces/tabs, and trim trailing whitespace.
 */
export function cleanExcessSpace(text: string): string {
  return text
    .replace(/\r\n|\r/g, '\n') // normalize newlines
    .replace(/[ \t]+/g, ' ') // collapse horizontal runs
    .replace(/ +\n/g, '\n') // trailing spaces per line
    .replace(/\n{3,}/g, '\n\n') // 3+ breaks → one blank line
    .trim();
}

export interface SanitizeResult {
  text: string;
  removed: number;
}

/** Strip every hidden/invisible Unicode character from the text. */
export function sanitizeText(text: string): SanitizeResult {
  let removed = 0;
  const out: string[] = [];
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined && isHiddenCodePoint(cp)) {
      removed++;
      continue;
    }
    out.push(ch);
  }
  return { text: out.join(''), removed };
}

// ──────────────────────────────────────────────────────────────────────────
// LinkedIn hook zone
// ──────────────────────────────────────────────────────────────────────────

export interface HookSplit {
  /** Text shown before the "…see more" fold. */
  hook: string;
  /** Text hidden behind the fold ('' when under the limit). */
  rest: string;
  truncated: boolean;
  limit: number;
}

/** Split text at the LinkedIn fold, counting by code points. */
export function linkedInHook(text: string, limit: number): HookSplit {
  const cps = Array.from(text);
  if (cps.length <= limit) {
    return { hook: text, rest: '', truncated: false, limit };
  }
  return {
    hook: cps.slice(0, limit).join(''),
    rest: cps.slice(limit).join(''),
    truncated: true,
    limit,
  };
}

// ──────────────────────────────────────────────────────────────────────────
// X / Twitter thread splitter
// ──────────────────────────────────────────────────────────────────────────

const SUFFIX_RESERVE = 8; // room for "\n\n99/99"

/**
 * Split text into a sequential thread where every post stays within `limit`.
 * Never cuts a word in half; prefers to break at the nearest sentence end, then
 * comma, then any whitespace. Each card carries an "n/total" counter (appended
 * by the caller / preview at render time, but the budget for it is reserved
 * here).
 *
 * `measure` decides how a candidate window is sized: X/Twitter flattens every
 * URL to 23 chars (the default `weightedLength`), whereas Threads counts links
 * in full, so its caller passes plain `charCount`.
 */
export function splitThread(
  text: string,
  limit = LIMITS.TWEET,
  measure: (s: string) => number = weightedLength,
): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (measure(trimmed) <= limit) return [trimmed];

  const budget = limit - SUFFIX_RESERVE;
  const chunks: string[] = [];
  let remaining = trimmed;

  while (remaining.length > 0) {
    if (measure(remaining) <= budget) {
      chunks.push(remaining.trim());
      break;
    }

    // Grow a candidate window word-by-word until the next word would overflow
    // the budget. This guarantees we never split inside a word.
    const tokens = remaining.split(/(\s+)/); // keep the whitespace tokens
    let candidate = '';
    let lastFit = '';
    for (const tok of tokens) {
      const next = candidate + tok;
      if (measure(next) > budget) break;
      candidate = next;
      lastFit = candidate;
    }

    // A single word longer than the budget: hard-slice by code points.
    if (!lastFit.trim()) {
      const cps = Array.from(remaining);
      lastFit = cps.slice(0, budget).join('');
    }

    // Back off to the best boundary inside the fitted window.
    const cut = bestBoundary(lastFit);
    const piece = remaining.slice(0, cut).trim();
    chunks.push(piece);
    remaining = remaining.slice(cut).replace(/^\s+/, '');
  }

  return chunks.filter(Boolean);
}

/**
 * Given a window of text that fits the budget, return the cut index that ends
 * on the cleanest boundary: a sentence terminator if one sits past the halfway
 * point, otherwise the last comma, otherwise the last whitespace, otherwise
 * the full window (it already ended on a word boundary).
 */
function bestBoundary(window: string): number {
  const half = Math.floor(window.length / 2);

  // Sentence end (. ! ? optionally followed by a closing quote/bracket).
  const sentence = /[.!?]['")\]]?\s/g;
  let lastSentence = -1;
  for (const m of window.matchAll(sentence)) {
    if (m.index !== undefined) lastSentence = m.index + m[0].length;
  }
  if (lastSentence > half) return lastSentence;

  // Comma / semicolon / colon boundary.
  const clause = /[,;:]\s/g;
  let lastClause = -1;
  for (const m of window.matchAll(clause)) {
    if (m.index !== undefined) lastClause = m.index + m[0].length;
  }
  if (lastClause > half) return lastClause;

  // Any whitespace.
  const lastSpace = window.search(/\s\S*$/);
  if (lastSpace > 0) return lastSpace + 1;

  return window.length;
}
