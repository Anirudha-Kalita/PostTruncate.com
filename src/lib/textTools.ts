/**
 * PostTruncate text engine — pure, DOM-free functions.
 *
 * Everything the previews rely on lives here so the logic is testable in
 * isolation and shared across the Preact islands. User-facing character
 * counts are done on Unicode grapheme clusters, so emoji sequences, flags,
 * combining marks, and astral-plane characters are not miscounted or split.
 */

/** Platform truncation/limit constants. */
export const LIMITS = {
  LINKEDIN_DESKTOP: 210,
  LINKEDIN_MOBILE: 140,
  /** LinkedIn's published hard cap for a standard feed post. */
  LINKEDIN_POST: 3000,
  TWEET: 280,
  /** Threads (by Meta) per-post character ceiling; longer copy chains as replies. */
  THREADS: 500,
  /** t.co wraps every URL to a fixed weight regardless of real length. */
  URL_WEIGHT: 23,
  /** Instagram's hard ceiling for hashtags in a post or reel. */
  INSTAGRAM_HASHTAGS: 5,
  /** Instagram's published caption character cap. */
  INSTAGRAM_CAPTION: 2200,
  /** Facebook's published hard cap for a feed post. */
  FACEBOOK_POST: 63206,
} as const;

export type SmsEncoding = 'GSM 7-bit' | 'Unicode';

export interface SmsAnalysis {
  encoding: SmsEncoding;
  units: number;
  parts: number;
  charactersLeft: number;
  singlePartLimit: number;
  multipartLimit: number;
  isGsm: boolean;
}

export const SMS_LIMITS = {
  GSM: {
    encoding: 'GSM 7-bit' as const,
    singlePart: 160,
    multipart: 153,
  },
  UNICODE: {
    encoding: 'Unicode' as const,
    singlePart: 70,
    multipart: 67,
  },
} as const;

export const GSM_BASIC_CHARS = [
  '@', '£', '$', '¥', 'è', 'é', 'ù', 'ì', 'ò', 'Ç', '\n', 'Ø', 'ø', '\r',
  'Å', 'å', 'Δ', '_', 'Φ', 'Γ', 'Λ', 'Ω', 'Π', 'Ψ', 'Σ', 'Θ', 'Ξ',
  'Æ', 'æ', 'ß', 'É', ' ', '!', '"', '#', '¤', '%', '&', "'", '(', ')',
  '*', '+', ',', '-', '.', '/',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ':', ';', '<', '=', '>', '?', '¡',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'Ä', 'Ö', 'Ñ', 'Ü', '§', '¿',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'ä', 'ö', 'ñ', 'ü', 'à',
] as const;

export const GSM_EXTENSION_CHARS = [
  '\f', '^', '{', '}', '\\', '[', '~', ']', '|', '€',
] as const;

const GSM_BASIC_SET = new Set<string>(GSM_BASIC_CHARS);
const GSM_EXTENSION_SET = new Set<string>(GSM_EXTENSION_CHARS);

function gsmPayloadUnits(text: string): number | null {
  let units = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (GSM_BASIC_SET.has(char)) {
      units++;
      continue;
    }

    if (GSM_EXTENSION_SET.has(char)) {
      units += 2;
      continue;
    }

    return null;
  }

  return units;
}

function smsPartsForUnits(units: number, singlePartLimit: number, multipartLimit: number): number {
  if (units === 0) return 0;
  if (units <= singlePartLimit) return 1;
  return Math.ceil(units / multipartLimit);
}

function smsCharactersLeft(
  units: number,
  parts: number,
  singlePartLimit: number,
  multipartLimit: number,
): number {
  if (units === 0) return singlePartLimit;
  if (parts === 1) return singlePartLimit - units;
  return parts * multipartLimit - units;
}

export function analyzeSms(text: string): SmsAnalysis {
  const gsmUnits = gsmPayloadUnits(text);
  const limits = gsmUnits === null ? SMS_LIMITS.UNICODE : SMS_LIMITS.GSM;
  const units = gsmUnits === null ? text.length : gsmUnits;
  const parts = smsPartsForUnits(units, limits.singlePart, limits.multipart);

  return {
    encoding: limits.encoding,
    units,
    parts,
    charactersLeft: smsCharactersLeft(units, parts, limits.singlePart, limits.multipart),
    singlePartLimit: limits.singlePart,
    multipartLimit: limits.multipart,
    isGsm: gsmUnits !== null,
  };
}

const GRAPHEME_SEGMENTER =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null;

function splitGraphemes(text: string): string[] {
  if (!text) return [];
  if (!GRAPHEME_SEGMENTER) return Array.from(text);
  return Array.from(GRAPHEME_SEGMENTER.segment(text), ({ segment }) => segment);
}

/** Count user-perceived Unicode characters (grapheme clusters). */
export function charCount(text: string): number {
  return splitGraphemes(text).length;
}

/** Slice by user-perceived characters without breaking emoji/combining marks. */
export function sliceChars(text: string, start: number, end?: number): string {
  return splitGraphemes(text).slice(start, end).join('');
}

/** Words = maximal runs of non-whitespace. */
export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export interface DurationCopy {
  lessThan30Sec: string;
  minute: { one: string; other: string };
  second: { one: string; other: string };
}

/** Convert word count + pacing into a compact creator-facing duration label. */
export function estimatedDuration(
  words: number,
  wordsPerMinute: number,
  copy: DurationCopy,
  nf: Intl.NumberFormat,
): string {
  const totalSeconds = Math.round((words / wordsPerMinute) * 60);
  if (totalSeconds < 30) return copy.lessThan30Sec;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${nf.format(seconds)} ${seconds === 1 ? copy.second.one : copy.second.other}`;
  }

  const minuteText = `${nf.format(minutes)} ${minutes === 1 ? copy.minute.one : copy.minute.other}`;
  if (seconds === 0) return minuteText;

  return `${minuteText} ${nf.format(seconds)} ${
    seconds === 1 ? copy.second.one : copy.second.other
  }`;
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

const EMOJI_RE = /[\p{Extended_Pictographic}\p{Emoji_Presentation}]/u;

function isEmojiCluster(text: string): boolean {
  if (EMOJI_RE.test(text)) return true;

  const cps = Array.from(text, (ch) => ch.codePointAt(0) ?? 0);
  return cps.some(
    (cp) =>
      // Regional indicator pairs render as flag emoji.
      (cp >= 0x1f1e6 && cp <= 0x1f1ff) ||
      // Keycap and combining mark emoji sequences.
      cp === 0x20e3,
  );
}

function isWideCodePoint(cp: number): boolean {
  return (
    (cp >= 0x1100 && cp <= 0x11ff) || // Hangul Jamo
    (cp >= 0x2e80 && cp <= 0x2fff) || // CJK / Kangxi / radicals
    (cp >= 0x3000 && cp <= 0x303f) || // CJK punctuation
    (cp >= 0x3040 && cp <= 0x30ff) || // Hiragana + Katakana
    (cp >= 0x3100 && cp <= 0x312f) || // Bopomofo
    (cp >= 0x3130 && cp <= 0x318f) || // Hangul compatibility Jamo
    (cp >= 0x31a0 && cp <= 0x31bf) || // Bopomofo extended
    (cp >= 0x31f0 && cp <= 0x31ff) || // Katakana phonetic extensions
    (cp >= 0x3400 && cp <= 0x4dbf) || // CJK extension A
    (cp >= 0x4e00 && cp <= 0x9fff) || // CJK unified ideographs
    (cp >= 0xa960 && cp <= 0xa97f) || // Hangul Jamo extended A
    (cp >= 0xac00 && cp <= 0xd7af) || // Hangul syllables
    (cp >= 0xd7b0 && cp <= 0xd7ff) || // Hangul Jamo extended B
    (cp >= 0xf900 && cp <= 0xfaff) || // CJK compatibility ideographs
    (cp >= 0xff01 && cp <= 0xff60) || // Fullwidth ASCII variants
    (cp >= 0xffe0 && cp <= 0xffe6) || // Fullwidth symbols
    (cp >= 0x20000 && cp <= 0x3fffd) // CJK extensions B and later
  );
}

function isSingleWeightCodePoint(cp: number): boolean {
  return (
    cp <= 0x007f || // Basic Latin, ASCII punctuation, digits, whitespace.
    (cp >= 0x00a0 && cp <= 0x024f) || // Latin-1 + Latin Extended blocks.
    (cp >= 0x2000 && cp <= 0x206f) || // General punctuation.
    (cp >= 0x20a0 && cp <= 0x20cf) || // Currency symbols.
    (cp >= 0x2100 && cp <= 0x214f) // Letterlike symbols.
  );
}

function plainTextWeight(text: string): number {
  if (!text) return 0;

  if (GRAPHEME_SEGMENTER) {
    let weight = 0;
    for (const { segment } of GRAPHEME_SEGMENTER.segment(text)) {
      if (isEmojiCluster(segment)) {
        weight += 2;
        continue;
      }

      for (const ch of segment) {
        const cp = ch.codePointAt(0);
        if (cp !== undefined) {
          weight += isWideCodePoint(cp) || !isSingleWeightCodePoint(cp) ? 2 : 1;
        }
      }
    }
    return weight;
  }

  let weight = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;
    weight += isEmojiCluster(ch) || isWideCodePoint(cp) || !isSingleWeightCodePoint(cp) ? 2 : 1;
  }
  return weight;
}

/**
 * Weighted length the way X/Twitter counts it: every URL collapses to a flat
 * URL_WEIGHT (23), text is normalized to NFC, emoji/CJK/other Unicode count
 * as 2, and ordinary Latin text, punctuation, and common symbols count as 1.
 */
export function weightedLength(text: string): number {
  const normalized = text.normalize('NFC');
  const urls = detectUrls(normalized);
  if (urls.length === 0) return plainTextWeight(normalized);

  let weight = 0;
  let cursor = 0;
  for (const u of urls) {
    weight += plainTextWeight(normalized.slice(cursor, u.start));
    weight += LIMITS.URL_WEIGHT; // URL as a fixed cost
    cursor = u.end;
  }
  weight += plainTextWeight(normalized.slice(cursor));
  return weight;
}

// ──────────────────────────────────────────────────────────────────────────
// Hashtags
// ──────────────────────────────────────────────────────────────────────────

const HASHTAG_RE = /#[\p{L}\p{M}\p{N}_]+/gu;

interface HashtagMatch {
  tag: string;
  start: number;
  end: number;
}

function hasValidHashtagBoundary(text: string, start: number): boolean {
  if (start === 0) return true;

  const prevChars = Array.from(text.slice(Math.max(0, start - 2), start));
  const prev = prevChars[prevChars.length - 1];
  if (!prev) return true;

  // Avoid matching foo#bar, ##tag, and URL fragments like example.com/#pricing.
  return !/[\p{L}\p{M}\p{N}_/#]/u.test(prev);
}

function detectHashtagMatches(text: string): HashtagMatch[] {
  const matches: HashtagMatch[] = [];
  for (const m of text.matchAll(HASHTAG_RE)) {
    if (m.index === undefined || !hasValidHashtagBoundary(text, m.index)) continue;
    matches.push({ tag: m[0], start: m.index, end: m.index + m[0].length });
  }
  return matches;
}

export function detectHashtags(text: string): string[] {
  return detectHashtagMatches(text).map((match) => match.tag);
}

export function countHashtags(text: string): number {
  return detectHashtags(text).length;
}

// ──────────────────────────────────────────────────────────────────────────
// Keyword density / overuse
// ──────────────────────────────────────────────────────────────────────────

/**
 * Density (% of all words) above which a single keyword reads as stuffing.
 * 3.0% is the conventional SEO ceiling — past it, search ranking and human
 * readability both start to suffer.
 */
export const KEYWORD_STUFFING_THRESHOLD = 3.0;

/**
 * Common English function words excluded from the ranking — they dominate any
 * frequency count without carrying topical meaning. Density is still measured
 * against the FULL word total (stop words included), so percentages match how
 * SEO tools report them and the 3% threshold stays calibrated.
 */
const STOP_WORDS = new Set<string>([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be',
  'been', 'being', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with', 'as',
  'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she',
  'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'our',
  'their', 'from', 'up', 'out', 'so', 'if', 'then', 'than', 'too', 'very',
  'can', 'will', 'just', 'not', 'no', 'do', 'does', 'did', 'has', 'have',
  'had', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'any',
  'about', 'into', 'over', 'after', 'more', 'most', 'such', 'some', 'only',
]);

/**
 * Word tokens: maximal runs of Unicode letters/digits, allowing internal
 * apostrophes and hyphens (so "don't" and "trial-to-paid" stay whole). Strips
 * surrounding punctuation — commas, periods, exclamation marks — by construction.
 */
const WORD_RE = /[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu;

export interface KeywordStat {
  word: string;
  count: number;
  /** (count / total words) * 100 — full-document density. */
  density: number;
  /** True when density exceeds KEYWORD_STUFFING_THRESHOLD. */
  overused: boolean;
}

export interface KeywordReport {
  /** Total word tokens in the text (denominator for density). */
  total: number;
  /** Top keywords by frequency, stop words removed, highest first. */
  keywords: KeywordStat[];
  /** True if any unique keyword is over the stuffing threshold. */
  hasOveruse: boolean;
}

/**
 * Rank the most-used content words and their density. Lowercases and tokenizes
 * the text, drops stop words and single characters, counts each unique word,
 * and computes its density as a share of the full word total. Returns the top
 * `topN` by frequency (ties broken alphabetically for stable ordering).
 */
export function keywordDensity(text: string, topN = 10): KeywordReport {
  const tokens = text.toLowerCase().match(WORD_RE) ?? [];
  const total = tokens.length;
  if (total === 0) {
    return { total: 0, keywords: [], hasOveruse: false };
  }

  const freq = new Map<string, number>();
  for (const tok of tokens) {
    if (tok.length < 2 || STOP_WORDS.has(tok)) continue;
    freq.set(tok, (freq.get(tok) ?? 0) + 1);
  }

  let hasOveruse = false;
  const ranked: KeywordStat[] = [];
  for (const [word, count] of freq) {
    const density = (count / total) * 100;
    const overused = density > KEYWORD_STUFFING_THRESHOLD;
    if (overused) hasOveruse = true;
    ranked.push({ word, count, density, overused });
  }

  ranked.sort((a, b) =>
    b.count !== a.count ? b.count - a.count : a.word.localeCompare(b.word),
  );

  return { total, keywords: ranked.slice(0, topN), hasOveruse };
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

const CASE_WORD_RE = /[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*/gu;

const TITLE_MINOR_WORDS = new Set<string>([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'into',
  'nor', 'of', 'on', 'or', 'over', 'per', 'the', 'to', 'up', 'via', 'with',
  'yet',
]);

function capitalizeFirstLetter(token: string): string {
  return token.replace(/\p{L}/u, (letter) => letter.toUpperCase());
}

export function formatUppercase(text: string): string {
  return text.toUpperCase();
}

export function formatLowercase(text: string): string {
  return text.toLowerCase();
}

export function formatTitleCase(text: string): string {
  const lower = text.toLowerCase();
  const words = Array.from(lower.matchAll(CASE_WORD_RE));
  if (words.length === 0) return lower;

  const firstIndex = words[0].index ?? 0;
  const lastIndex = words[words.length - 1].index ?? firstIndex;

  return lower.replace(CASE_WORD_RE, (word, ...args) => {
    const offset = args[args.length - 2] as number;
    if (
      offset !== firstIndex &&
      offset !== lastIndex &&
      TITLE_MINOR_WORDS.has(word)
    ) {
      return word;
    }
    return capitalizeFirstLetter(word);
  });
}

export function formatSentenceCase(text: string): string {
  let shouldCapitalize = true;
  let out = '';

  for (const ch of text.toLowerCase()) {
    if (/\p{L}/u.test(ch)) {
      out += shouldCapitalize ? ch.toUpperCase() : ch;
      shouldCapitalize = false;
      continue;
    }

    out += ch;
    if (ch === '.') shouldCapitalize = true;
  }

  return out;
}

export interface StripResult {
  text: string;
  removed: number;
}

export function stripEmojiAndSymbols(text: string): StripResult {
  let removed = 0;
  const next = splitGraphemes(text)
    .filter((segment) => {
      if (!isEmojiCluster(segment)) return true;
      removed++;
      return false;
    })
    .join('')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ +\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  return { text: next, removed };
}

export function extractHashtagsToBottom(text: string): string {
  const matches = detectHashtagMatches(text);
  const hashtags = matches.map((match) => match.tag);
  if (hashtags.length === 0) return text;

  let body = '';
  let cursor = 0;
  for (const match of matches) {
    body += text.slice(cursor, match.start);
    cursor = match.end;
  }
  body += text.slice(cursor);

  body = body
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ +\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const grouped = hashtags.join(' ');
  return body ? `${body}\n\n${grouped}` : grouped;
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

/** Split text at the LinkedIn fold, counting by user-perceived characters. */
export function linkedInHook(text: string, limit: number): HookSplit {
  const chars = splitGraphemes(text);
  if (chars.length <= limit) {
    return { hook: text, rest: '', truncated: false, limit };
  }
  return {
    hook: chars.slice(0, limit).join(''),
    rest: chars.slice(limit).join(''),
    truncated: true,
    limit,
  };
}

// ──────────────────────────────────────────────────────────────────────────
// Per-platform "…more" fold points — single source of truth
// ──────────────────────────────────────────────────────────────────────────

export type FoldView = 'mobile' | 'desktop';

/**
 * The user-perceived character index at which each platform collapses a feed
 * post behind a "…more" affordance, per viewport. LinkedIn and Threads reuse
 * the published caps in LIMITS; Instagram/Facebook are observed feed cutoffs.
 * Both the live previews and the hook-visibility analysis read from here so the
 * numbers live in exactly one place. X/Twitter has no single-post fold — a post
 * over the weighted cap is split into a thread instead — so it is handled
 * separately by twitterFoldIndex / foldCharIndex below.
 */
export const FOLDS = {
  linkedin: { mobile: LIMITS.LINKEDIN_MOBILE, desktop: LIMITS.LINKEDIN_DESKTOP },
  instagram: { mobile: 125, desktop: 125 },
  facebook: { mobile: 110, desktop: 480 },
  threads: { mobile: 250, desktop: LIMITS.THREADS },
} as const;

/**
 * Per-platform feed image crop bands, expressed as height ÷ width. A platform
 * shows an image at its natural ratio only while that ratio sits inside the
 * band; outside it the feed center-crops to the nearest bound. `min` is the
 * widest allowed (landscape cap), `max` the tallest (portrait cap). `undefined`
 * means "no bound on that side". Sourced from each platform's 2025/26 feed specs
 * (see the previews) and shared so the numbers live in one place.
 */
export const IMAGE_RATIOS = {
  // LinkedIn shows up to 4:5 (h/w 1.25) in full; landscape is unbounded.
  linkedin: { min: undefined, max: 1.25 },
  // X favors ~16:9; tall portraits crop near 4:5.
  twitter: { min: undefined, max: 1.25 },
  // Threads matches Instagram's 4:5 tall format; landscape unbounded.
  threads: { min: undefined, max: 1.25 },
  // Instagram's band: 1.91:1 landscape (h/w ≈ 0.524) to 3:4 tall (h/w ≈ 1.334).
  instagram: { min: 0.524, max: 1.334 },
  // Facebook caps tall portraits near 4:5; landscape unbounded.
  facebook: { min: undefined, max: 1.25 },
} as const;

/**
 * Clamp a natural image aspect ratio (height ÷ width) into a platform's allowed
 * feed band. Pure and DOM-free: the `FeedImage` island measures the upload and
 * defers the actual crop decision to this, so the rule is unit-testable. A
 * non-finite or non-positive input falls back to 1 (treated as square).
 */
export function clampFeedRatio(
  ratio: number,
  band: { min?: number; max?: number },
): number {
  let r = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  if (band.min !== undefined) r = Math.max(r, band.min);
  if (band.max !== undefined) r = Math.min(r, band.max);
  return r;
}

/** Platforms the fold/hook analysis understands (X has no char fold of its own). */
export type FoldPlatform = keyof typeof FOLDS | 'x';

/**
 * X/Twitter never shows a "…more" fold; instead a post past the weighted cap is
 * split into a thread. The effective fold is therefore the grapheme index at
 * which the weighted length (URLs counted as URL_WEIGHT) first exceeds the cap.
 * Returns the full grapheme length when the post fits in a single tweet.
 */
export function twitterFoldIndex(text: string): number {
  if (weightedLength(text) <= LIMITS.TWEET) return charCount(text);

  const graphemes = splitGraphemes(text);
  let acc = '';
  for (let i = 0; i < graphemes.length; i++) {
    const next = acc + graphemes[i];
    if (weightedLength(next) > LIMITS.TWEET) return i;
    acc = next;
  }
  return graphemes.length;
}

/**
 * Effective fold index for a platform + viewport, in user-perceived characters,
 * clamped to the text length so a short post (nothing hidden) reports its own
 * end. This is the single fold resolver shared by the previews and the
 * hook-visibility analysis — no caller hardcodes a limit.
 */
export function foldCharIndex(
  text: string,
  platform: FoldPlatform,
  view: FoldView = 'mobile',
): number {
  if (platform === 'x') return twitterFoldIndex(text);
  return Math.min(FOLDS[platform][view], charCount(text));
}

// ──────────────────────────────────────────────────────────────────────────
// X / Twitter thread splitter
// ──────────────────────────────────────────────────────────────────────────

function threadSuffixReserve(
  index: number,
  total: number,
  measure: (s: string) => number,
): number {
  return total > 1 ? measure(`\n\n${index}/${total}`) : 0;
}

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
  limit: number = LIMITS.TWEET,
  measure: (s: string) => number = weightedLength,
): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (measure(trimmed) <= limit) return [trimmed];

  let totalGuess = 2;
  let chunks: string[] = [];
  for (let attempt = 0; attempt < 5; attempt++) {
    chunks = splitThreadWithTotal(trimmed, limit, totalGuess, measure);
    const nextGuess = chunks.length;
    if (String(nextGuess).length === String(totalGuess).length) break;
    totalGuess = nextGuess;
  }

  return chunks;
}

function splitThreadWithTotal(
  trimmed: string,
  limit: number,
  totalGuess: number,
  measure: (s: string) => number,
): string[] {
  const chunks: string[] = [];
  let remaining = trimmed;

  while (remaining.length > 0) {
    const chunkIndex = chunks.length + 1;
    const budget = limit - threadSuffixReserve(chunkIndex, totalGuess, measure);

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

    // A single word longer than the budget: hard-slice by grapheme clusters.
    if (!lastFit.trim()) {
      lastFit = takeWeightedPrefix(remaining, budget, measure);
    }

    // Back off to the best boundary inside the fitted window.
    const cut = bestBoundary(lastFit);
    const piece = remaining.slice(0, cut).trim();
    chunks.push(piece);
    remaining = remaining.slice(cut).replace(/^\s+/, '');
  }

  return chunks.filter(Boolean);
}

function takeWeightedPrefix(
  text: string,
  budget: number,
  measure: (s: string) => number,
): string {
  let out = '';
  for (const ch of splitGraphemes(text)) {
    const next = out + ch;
    if (measure(next) > budget) break;
    out = next;
  }
  return out || splitGraphemes(text)[0] || '';
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

// ──────────────────────────────────────────────────────────────────────────
// Readability — Flesch Reading Ease + Flesch-Kincaid Grade Level
// All counting is client-side with no external libraries.
// ──────────────────────────────────────────────────────────────────────────

export interface ReadabilityResult {
  /** Flesch Reading Ease score, clamped to 0–100. */
  fleschEase: number;
  /** Flesch-Kincaid Grade Level (rounded to one decimal). */
  gradeLevel: number;
  /** False when the text contains no analysable alphabetic words. */
  hasData: boolean;
}

/**
 * Estimate the syllable count for a single English word.
 * Uses a vowel-group heuristic with corrections for common silent-e patterns.
 */
export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;

  let count = 0;
  let prevVowel = false;
  for (const ch of w) {
    const v = 'aeiouy'.includes(ch);
    if (v && !prevVowel) count++;
    prevVowel = v;
  }

  // Silent trailing 'e' (e.g., "time", "have", "place")
  if (w.endsWith('e') && count > 1) count--;

  // Consonant + 'le' at end forms its own syllable (e.g., "ta-ble", "sim-ple")
  if (/[^aeiouy]le$/.test(w)) count++;

  // Silent 'e' before 'd' in past-tense forms like "smiled", "loved", "moved"
  // Excludes -ted/-ded/-yed where the 'e' is pronounced (e.g., "wanted", "needed")
  if (/[^aeiouytd]ed$/.test(w) && count > 1) count--;

  return Math.max(1, count);
}

/**
 * Compute Flesch Reading Ease and Flesch-Kincaid Grade Level for the given text.
 *
 * Formula sources:
 *   Flesch RE  = 206.835 − 1.015 × (words/sentences) − 84.6 × (syllables/words)
 *   FK Grade   = 0.39 × (words/sentences) + 11.8 × (syllables/words) − 15.59
 */
export function analyzeReadability(text: string): ReadabilityResult {
  const wordList = text.match(/[a-zA-Z]+/g) ?? [];
  const words = wordList.length;

  if (words === 0) return { fleschEase: 0, gradeLevel: 0, hasData: false };

  // Count sentence-ending punctuation runs as one sentence boundary each
  const sentenceMatches = text.match(/[.!?]+/g) ?? [];
  const sentences = Math.max(1, sentenceMatches.length);

  let syllables = 0;
  for (const word of wordList) {
    syllables += countSyllables(word);
  }

  const asl = words / sentences;   // average sentence length
  const asw = syllables / words;   // average syllables per word

  const rawEase = 206.835 - 1.015 * asl - 84.6 * asw;
  const fleschEase = Math.round(Math.max(0, Math.min(100, rawEase)));

  const rawGrade = 0.39 * asl + 11.8 * asw - 15.59;
  const gradeLevel = Math.round(Math.max(0, rawGrade) * 10) / 10;

  return { fleschEase, gradeLevel, hasData: true };
}
