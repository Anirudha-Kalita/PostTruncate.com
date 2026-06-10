/**
 * Hook-visibility analysis — pure, DOM-free, 100% client-side.
 *
 * Answers the question the raw character counters cannot: when a platform folds
 * a post behind "…more", does the opening hook and the call-to-action actually
 * survive *above* the fold? Reuses the centralized fold logic in textTools
 * (`foldCharIndex`, `FOLDS`) and the existing URL detector (`detectUrls`) — no
 * limit value is duplicated here.
 */

import {
  charCount,
  detectUrls,
  foldCharIndex,
  sliceChars,
  type FoldPlatform,
  type FoldView,
} from './textTools';

export type HookPlatform = FoldPlatform;

/**
 * Default call-to-action phrases, matched case-insensitively on word
 * boundaries. Override via `HookAnalysisOptions.ctaPhrases` for niche copy.
 */
export const DEFAULT_CTA_PHRASES: readonly string[] = [
  'link in bio',
  'link below',
  'sign up',
  'learn more',
  'shop now',
  'dm me',
  'comment below',
  'swipe up',
  'click here',
  'read more',
  'buy now',
  'get started',
  'subscribe',
  'follow me',
  'tap the link',
  'check the link',
];

/** A single detected call-to-action (a URL or a known CTA phrase). */
export interface DetectedCta {
  kind: 'url' | 'phrase';
  /** The matched text exactly as it appears in the source. */
  text: string;
  /** User-perceived character index where the CTA starts in the source text. */
  index: number;
  /** True when the CTA begins before the fold (i.e. it is visible). */
  aboveFold: boolean;
}

export type HookVerdict = 'pass' | 'warn' | 'fail';

/**
 * Stable, language-neutral identifier for *why* a verdict was reached. The UI
 * maps this to a localized sentence; the English `reason` string is kept for
 * tests and non-UI consumers.
 */
export type HookReasonCode =
  | 'empty'
  | 'fits'
  | 'hook-cut'
  | 'cta-below'
  | 'hook-only'
  | 'hook-and-cta'
  | 'x-fits'
  | 'x-hook-cut'
  | 'x-cta-below'
  | 'x-hook-only'
  | 'x-hook-and-cta';

export interface HookAnalysis {
  platform: HookPlatform;
  view: FoldView;
  /** Effective grapheme index where the platform truncates ("…more" point). */
  foldIndex: number;
  /** True when the post is longer than the fold (something is hidden). */
  truncated: boolean;
  /** Text up to the first sentence terminator or line break, whichever is first. */
  hook: string;
  /** True when the entire hook fits above the fold. */
  hookSurvives: boolean;
  /** True when the fold falls inside the hook (the opening is cut off). */
  hookTruncatedMidword: boolean;
  /** Every detected CTA, in document order, each tagged above/below the fold. */
  ctas: DetectedCta[];
  /** Subset of `ctas` that survive above the fold. */
  ctaAboveFold: DetectedCta[];
  /** Subset of `ctas` hidden below the fold. */
  ctaBelowFold: DetectedCta[];
  verdict: HookVerdict;
  /** Language-neutral reason identifier (for localized UI copy). */
  reasonCode: HookReasonCode;
  /** Short, human-readable (English) explanation of the verdict. */
  reason: string;
}

export interface HookAnalysisOptions {
  /** Viewport whose fold to test. Defaults to 'mobile' (the stricter cutoff). */
  view?: FoldView;
  /** Override the CTA phrase list. Defaults to DEFAULT_CTA_PHRASES. */
  ctaPhrases?: readonly string[];
}

const PLATFORM_LABEL: Record<HookPlatform, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  threads: 'Threads',
  x: 'X',
};

/** A sentence terminator only counts when followed by whitespace or end-of-text,
 *  so periods inside URLs/abbreviations (e.g. "example.com") are not mistaken
 *  for the end of the hook. */
const SENTENCE_END_RE = /[.!?]+(?=\s|$)/;
const LINE_BREAK_RE = /\r\n|\r|\n/;

/**
 * The hook = text up to the first sentence-ending punctuation OR the first line
 * break, whichever comes first. The sentence terminator is kept; the line break
 * is not.
 */
export function extractHook(text: string): string {
  const sentence = SENTENCE_END_RE.exec(text);
  const line = LINE_BREAK_RE.exec(text);

  const sentenceTrigger = sentence ? sentence.index : -1;
  const lineTrigger = line ? line.index : -1;

  if (sentenceTrigger === -1 && lineTrigger === -1) return text;
  if (lineTrigger === -1) return text.slice(0, sentenceTrigger + sentence![0].length);
  if (sentenceTrigger === -1) return text.slice(0, lineTrigger);

  // Both present — the earlier trigger wins.
  return sentenceTrigger <= lineTrigger
    ? text.slice(0, sentenceTrigger + sentence![0].length)
    : text.slice(0, lineTrigger);
}

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Code-unit index → user-perceived character index, for consistent reporting. */
function graphemeIndexAt(text: string, codeUnit: number): number {
  return charCount(text.slice(0, codeUnit));
}

/**
 * Detect every CTA — URLs plus known phrases — and tag each with whether it
 * starts above the fold. `foldCodeUnit` is the code-unit length of the
 * above-fold slice, so comparisons stay correct across multibyte/emoji text.
 */
function detectCtas(
  text: string,
  foldCodeUnit: number,
  phrases: readonly string[],
): DetectedCta[] {
  const found: DetectedCta[] = [];

  for (const u of detectUrls(text)) {
    found.push({
      kind: 'url',
      text: u.url,
      index: graphemeIndexAt(text, u.start),
      aboveFold: u.start < foldCodeUnit,
    });
  }

  for (const phrase of phrases) {
    const re = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'gi');
    for (const m of text.matchAll(re)) {
      if (m.index === undefined) continue;
      found.push({
        kind: 'phrase',
        text: m[0],
        index: graphemeIndexAt(text, m.index),
        aboveFold: m.index < foldCodeUnit,
      });
    }
  }

  // Document order keeps the output stable and intuitive.
  return found.sort((a, b) => a.index - b.index);
}

/**
 * Analyze whether the hook and CTA of `text` survive the "…more" fold on the
 * given platform. Pure and synchronous — safe to call on every keystroke.
 */
export function analyzeHook(
  text: string,
  platform: HookPlatform,
  opts: HookAnalysisOptions = {},
): HookAnalysis {
  const view = opts.view ?? 'mobile';
  const phrases = opts.ctaPhrases ?? DEFAULT_CTA_PHRASES;
  const label = PLATFORM_LABEL[platform];

  const total = charCount(text);
  const foldIndex = foldCharIndex(text, platform, view);
  const truncated = foldIndex < total;

  const hook = extractHook(text);
  const hookLength = charCount(hook);
  const hookSurvives = hookLength <= foldIndex;
  const hookTruncatedMidword = truncated && !hookSurvives;

  const foldCodeUnit = sliceChars(text, 0, foldIndex).length;
  const ctas = detectCtas(text, foldCodeUnit, phrases);
  const ctaAboveFold = ctas.filter((c) => c.aboveFold);
  const ctaBelowFold = ctas.filter((c) => !c.aboveFold);

  const { verdict, reasonCode, reason } = decide({
    platform,
    label,
    truncated,
    hookTruncatedMidword,
    hasCta: ctas.length > 0,
    hasCtaAbove: ctaAboveFold.length > 0,
    hasCtaBelow: ctaBelowFold.length > 0,
    empty: total === 0,
  });

  return {
    platform,
    view,
    foldIndex,
    truncated,
    hook,
    hookSurvives,
    hookTruncatedMidword,
    ctas,
    ctaAboveFold,
    ctaBelowFold,
    verdict,
    reasonCode,
    reason,
  };
}

function decide(input: {
  platform: HookPlatform;
  label: string;
  truncated: boolean;
  hookTruncatedMidword: boolean;
  hasCta: boolean;
  hasCtaAbove: boolean;
  hasCtaBelow: boolean;
  empty: boolean;
}): { verdict: HookVerdict; reasonCode: HookReasonCode; reason: string } {
  const { platform, label } = input;
  const isX = platform === 'x';

  if (input.empty) {
    return { verdict: 'pass', reasonCode: 'empty', reason: 'Empty post — nothing to analyze.' };
  }

  if (!input.truncated) {
    return {
      verdict: 'pass',
      reasonCode: isX ? 'x-fits' : 'fits',
      reason: isX 
        ? `Your full post fits in a single tweet on ${label} — nothing is hidden.`
        : `Your full post clears the fold on ${label} — nothing is hidden.`,
    };
  }

  // Post is truncated from here on.
  if (input.hookTruncatedMidword) {
    return {
      verdict: 'fail',
      reasonCode: isX ? 'x-hook-cut' : 'hook-cut',
      reason: isX
        ? `Your opening hook spills into the second tweet on ${label}.`
        : `Your opening hook is cut off by the "…more" fold on ${label}.`,
    };
  }

  if (input.hasCta && !input.hasCtaAbove) {
    return {
      verdict: isX ? 'pass' : 'warn',
      reasonCode: isX ? 'x-cta-below' : 'cta-below',
      reason: isX
        ? `Your CTA appears in a threaded tweet on ${label}.`
        : `Your CTA appears below the fold on ${label}.`,
    };
  }

  if (!input.hasCta) {
    return {
      verdict: 'pass',
      reasonCode: isX ? 'x-hook-only' : 'hook-only',
      reason: isX
        ? `Your hook fits in the first tweet on ${label}; no CTA detected.`
        : `Your hook clears the fold on ${label}; no CTA detected.`,
    };
  }

  return {
    verdict: 'pass',
    reasonCode: isX ? 'x-hook-and-cta' : 'hook-and-cta',
    reason: isX
      ? `Your hook and CTA both fit in the first tweet on ${label}.`
      : `Your hook and CTA both clear the fold on ${label}.`,
  };
}
