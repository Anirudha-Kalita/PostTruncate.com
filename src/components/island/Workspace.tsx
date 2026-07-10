/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';
import {
  charCount,
  wordCount,
  lineCount,
  paragraphCount,
  estimatedDuration,
  cleanExcessSpace,
  sanitizeText,
  detectHiddenUnicode,
  extractHashtagsToBottom,
  formatLowercase,
  formatSentenceCase,
  formatTitleCase,
  formatUppercase,
  stripEmojiAndSymbols,
} from '../../lib/textTools';
import { Card, Stat, Badge } from './ui';
import { AiImprove } from './AiImprove';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

const READING_WORDS_PER_MINUTE = 275;
const SPEAKING_WORDS_PER_MINUTE = 150;

/**
 * Hard character cap on the editor — a safety rail, not a platform limit. Set
 * comfortably above the most permissive platform (Facebook, 63,206) so no real
 * single-platform draft is ever blocked and every over-limit state stays
 * reachable, while bounding a pathological megabyte paste that would otherwise
 * make the superlinear thread-splitting analysis (X/Threads) janky.
 */
const EDITOR_MAX_CHARS = 80_000;

interface Props {
  text: string;
  setText: (next: string) => void;
  lang: string;
  s: IslandStrings;
  focus?: string;
  /** Object URL of the attached preview media, or null when none is attached. */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** Hand a picked File (or null to clear) up to the Dashboard image state. */
  onSelectImage?: (file: File | null) => void;
  /**
   * "Try an example" chips — one per platform on the homepage, or a single
   * chip for the page's platform on scoped tool pages. Each loads that
   * platform's sample into the editor. The row shows only while the editor is
   * empty.
   */
  examples?: { label: string; onClick: () => void }[];
  /** Leading label for the {@link examples} row, e.g. "Try an example:". */
  examplesLabel?: string;
}

/**
 * Left-column workspace: the editor textarea, the live meta counters, and the
 * optimization engine actions. All transforms route through the pure helpers
 * in textTools so behaviour matches the previews exactly.
 */
export function Workspace({ text, setText, lang, s, focus, image, mediaKind = 'image', onSelectImage, examples, examplesLabel }: Props) {
  const hidden = detectHiddenUnicode(text);
  const w = s.workspace;
  const img = s.imageUpload ?? {
    add: 'Add media',
    replace: 'Replace media',
    remove: 'Remove media',
    hint: 'Preview only — never uploaded or stored. Clears on reload.',
  };
  const nf = new Intl.NumberFormat(lang);
  const words = wordCount(text);
  const chars = charCount(text);
  const readingTime = estimatedDuration(words, READING_WORDS_PER_MINUTE, w.timers, nf);
  const speakingTime = estimatedDuration(words, SPEAKING_WORDS_PER_MINUTE, w.timers, nf);

  // Screen-reader count announcements: update the live region only after
  // typing pauses so it doesn't chatter on every keystroke.
  const [announced, setAnnounced] = useState('');
  useEffect(() => {
    const id = window.setTimeout(() => {
      setAnnounced(
        `${nf.format(chars)} ${w.counters.characters} · ${nf.format(words)} ${w.counters.words}`,
      );
    }, 800);
    return () => window.clearTimeout(id);
  }, [chars, words]);

  const onClean = () => setText(cleanExcessSpace(text));
  const onSanitize = () => setText(sanitizeText(text).text);
  const onClear = () => setText('');

  const hasFiredGtagRef = useRef(false);

  // Paste from the system clipboard into the editor. Inserts at the caret when
  // the textarea is focused, otherwise appends; capped at EDITOR_MAX_CHARS. If
  // the Clipboard API is blocked (permissions / insecure context), fall back to
  // focusing the editor so the user can paste manually with Ctrl/Cmd+V.
  const onPaste = async () => {
    const el = textareaRef.current;
    try {
      const clip = await navigator.clipboard.readText();
      if (!clip) {
        el?.focus();
        return;
      }
      const focused = el && document.activeElement === el;
      const start = focused ? (el.selectionStart ?? text.length) : text.length;
      const end = focused ? (el.selectionEnd ?? text.length) : text.length;
      const next = (text.slice(0, start) + clip + text.slice(end)).slice(0, EDITOR_MAX_CHARS);
      setText(next);
      const caret = Math.min(start + clip.length, EDITOR_MAX_CHARS);
      requestAnimationFrame(() => {
        el?.focus({ preventScroll: true });
        el?.setSelectionRange(caret, caret);
      });
    } catch {
      el?.focus();
    }
  };

  // After an AI rewrite lands, pull the user's eye back to the editor: scroll it
  // into view (so mobile jumps up from the button below), focus it, and flash a
  // highlighted border for 5s. The highlight is React/Preact state — not a manual
  // class — so the controlled textarea's re-render on new text doesn't wipe it.
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [highlight, setHighlight] = useState(false);
  const highlightTimer = useRef<number | undefined>(undefined);
  const onImproved = () => {
    const el = textareaRef.current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
    setHighlight(true);
    if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
    highlightTimer.current = window.setTimeout(() => setHighlight(false), 5000);
  };
  useEffect(
    () => () => {
      if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
    },
    [],
  );

  const formatterActions = [
    { label: w.uppercase, action: () => setText(formatUppercase(text)) },
    { label: w.lowercase, action: () => setText(formatLowercase(text)) },
    { label: w.titleCase, action: () => setText(formatTitleCase(text)) },
    { label: w.sentenceCase, action: () => setText(formatSentenceCase(text)) },
    { label: w.emojiStripper, action: () => setText(stripEmojiAndSymbols(text).text) },
    { label: w.hashtagExtractor, action: () => setText(extractHashtagsToBottom(text)) },
  ];

  // Keep the code list in a mono span by splitting the sentence on its token.
  const [warnBefore, warnAfter] = w.hiddenWarning.split('{codes}');

  return (
    <Card class="flex flex-col">
      {/* Header row: editor title left, live character/word counts right. */}
      <header class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-hairline px-4 py-3.5 sm:px-5">
        <h3 class="text-[16px] font-semibold leading-6 tracking-[-0.3px] text-ink">
          {w.title}
        </h3>
        <div class="flex items-center gap-2.5">
          {hidden.count > 0 && (
            <Badge tone="warn">
              {interp(plural(w.hiddenBadge, hidden.count), { n: hidden.count })}
            </Badge>
          )}
          <p class="font-mono text-[12px] leading-4 text-mute tabular-nums">
            {w.counters.characters}: {nf.format(chars)} · {w.counters.words}: {nf.format(words)}
          </p>
        </div>
      </header>

      <div class="flex flex-col p-4 sm:p-5">
        <label for="post-input" class="sr-only">
          {w.title}
        </label>
        {/* Quick actions sitting right above the editor: paste from clipboard on
            the left, clear on the right — both within reach of the visible text. */}
        <div class="mb-2 flex items-center gap-2">
          <button
            type="button"
            onClick={onPaste}
            class="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3 py-1.5 text-[12px] font-medium text-ink transition-[transform,color,background] duration-100 hover:bg-canvas-soft-2 active:scale-[0.96] active:bg-canvas-soft-2"
          >
            <PasteIcon />
            {w.paste}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!text}
            class="ml-auto inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[12px] font-medium text-error transition-[transform,color,background] duration-100 hover:bg-error-soft active:scale-[0.96] active:bg-error-soft disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100"
          >
            <ClearIcon />
            {w.clear}
          </button>
        </div>
        {/* Relative wrapper anchors the AI Improve floating action button to the
            editor's bottom-left corner. */}
        <div class="relative">
          <textarea
            ref={textareaRef}
            id="post-input"
            value={text}
            maxLength={EDITOR_MAX_CHARS}
            onInput={(e) => {
              const val = (e.currentTarget as HTMLTextAreaElement).value;
              setText(val);
              if (focus === 'linkedin' && !hasFiredGtagRef.current && val.trim().length >= 5) {
                hasFiredGtagRef.current = true;
                if (typeof window !== 'undefined' && typeof (window as any).gtagSendEvent === 'function') {
                  (window as any).gtagSendEvent();
                }
              }
            }}
            placeholder={focus && w.placeholders && w.placeholders[focus as keyof typeof w.placeholders] ? w.placeholders[focus as keyof typeof w.placeholders] : w.placeholder}
            rows={12}
            spellcheck
            class={`block w-full h-[360px] resize-none rounded-md border bg-canvas-soft px-4 pt-3 pb-16 text-[15px] leading-7 text-ink placeholder:text-mute transition-[border-color,box-shadow] duration-300 focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link ${highlight ? 'border-link ring-4 ring-link/30' : 'border-hairline'}`}
          />
          {/* AI Improve — Gemini-backed rewrite, as a floating action button. */}
          <AiImprove text={text} setText={setText} s={s.aiImprove} onImproved={onImproved} />
        </div>

        {/* "Try an example" — one chip per platform, each loading that platform's
            sample into the editor. Shown only while the editor is empty; sits
            right under the editor, above the media attach. */}
        {examples && examples.length > 0 && !text && (
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-1.5 text-[13px] font-medium text-mute">
              <LightbulbIcon />
              {examplesLabel}
            </span>
            {examples.map((ex) => (
              <button
                type="button"
                onClick={ex.onClick}
                class="min-h-9 inline-flex items-center rounded-pill border border-hairline bg-canvas px-3 py-1.5 text-[13px] font-medium text-ink transition-[transform,color,background,border-color] duration-100 hover:border-hairline-strong hover:bg-canvas-soft-2 active:scale-[0.96] active:bg-canvas-soft-2"
              >
                {ex.label}
              </button>
            ))}
          </div>
        )}

        {/* Media attach — prominent, right under the editor. In-memory preview
            only; the picked File is handed up to Dashboard state. */}
        {onSelectImage && (
          <div class="mt-3">
            {image ? (
              <div class="flex items-center gap-3 rounded-md border border-link/30 bg-link-bg-soft p-2.5">
                {mediaKind === 'video' ? (
                  <video
                    src={image}
                    muted
                    playsInline
                    preload="metadata"
                    class="h-14 w-14 shrink-0 rounded-md border border-hairline object-cover"
                  />
                ) : (
                  <img
                    src={image}
                    alt=""
                    class="h-14 w-14 shrink-0 rounded-md border border-hairline object-cover"
                  />
                )}
                <div class="flex min-w-0 flex-1 items-center gap-2">
                  <label class="inline-flex cursor-pointer items-center gap-1.5 rounded-pill border border-link bg-link px-3.5 py-2 text-[13px] font-semibold text-on-primary transition-[transform,background] duration-100 hover:bg-link-deep active:scale-[0.96]">
                    <MediaIcon />
                    {img.replace}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      class="sr-only"
                      onChange={(e) => {
                        const input = e.currentTarget as HTMLInputElement;
                        onSelectImage(input.files?.[0] ?? null);
                        input.value = '';
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => onSelectImage(null)}
                    aria-label={img.remove}
                    class="ml-auto inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[13px] font-medium text-error transition-[transform,color,background] duration-100 hover:bg-error-soft active:scale-[0.96]"
                  >
                    {img.remove}
                  </button>
                </div>
              </div>
            ) : (
              <label class="group flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-link/45 bg-link-bg-soft px-4 py-3 text-[14px] font-semibold text-link-deep transition-[transform,background,border-color] duration-100 hover:border-link hover:bg-canvas-soft-2 active:scale-[0.99]">
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-link text-on-primary">
                  <MediaIcon />
                </span>
                {img.add}
                <input
                  type="file"
                  accept="image/*,video/*"
                  class="sr-only"
                  onChange={(e) => {
                    const input = e.currentTarget as HTMLInputElement;
                    onSelectImage(input.files?.[0] ?? null);
                    input.value = '';
                  }}
                />
              </label>
            )}
            <p class="mt-1.5 text-[12px] leading-4 text-mute">{img.hint}</p>
          </div>
        )}

        {/* Live meta counters */}
        <div class="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Stat label={w.counters.characters} value={nf.format(chars)} />
          <Stat label={w.counters.words} value={nf.format(words)} />
          <Stat label={w.counters.lines} value={nf.format(lineCount(text))} />
          <Stat label={w.counters.paragraphs} value={nf.format(paragraphCount(text))} />
        </div>

        {/* Action row — cleanup tools. Clear lives in the toolbar above the
            editor; the "Try an example" chips sit under the editor. */}
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onClean}
            disabled={!text}
            class="min-h-11 sm:min-h-9 inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-ink transition-[transform,color,background] duration-100 hover:bg-canvas-soft-2 active:scale-[0.96] active:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100"
          >
            {w.clean}
          </button>
          <button
            type="button"
            onClick={onSanitize}
            disabled={!text}
            class="min-h-11 sm:min-h-9 inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-ink transition-[transform,color,background] duration-100 hover:bg-canvas-soft-2 active:scale-[0.96] active:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100"
          >
            {w.sanitize}
            {hidden.count > 0 && (
              <span class="rounded-pill bg-warning-soft px-1.5 text-[11px] text-warning-deep">
                {nf.format(hidden.count)}
              </span>
            )}
          </button>
        </div>

        {hidden.count > 0 && (
          <p class="mt-3 text-[12px] leading-4 text-warning-deep">
            {warnBefore}
            <span class="font-mono">{hidden.codes.join(', ')}</span>
            {warnAfter}
          </p>
        )}

        {/* Status line + SR count announcements */}
        <p class="mt-3 flex items-center gap-2 text-[12px] leading-4 text-mute">
          <span class="h-2 w-2 shrink-0 rounded-full bg-cyan-deep" aria-hidden="true" />
          {w.statusLine}
        </p>
        <p class="sr-only" role="status" aria-live="polite">
          {announced}
        </p>

        {/* Collapsed toolkit: format actions + full counters + pacing timers.
            Same controls and computations as before, regrouped behind one
            disclosure so the default editor column stays calm. */}
        <details class="group mt-4 overflow-hidden rounded-md border border-hairline-strong/70 bg-canvas shadow-e1">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-2 bg-canvas-soft px-3.5 py-3 text-[13px] font-semibold text-ink transition-colors duration-150 hover:bg-canvas-soft-2 [&::-webkit-details-marker]:hidden">
            <span class="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="shrink-0 text-link"
              >
                <path d="M4 6h16M4 12h10M4 18h7" />
                <circle cx="18" cy="6" r="1.6" fill="currentColor" stroke="none" />
                <circle cx="13" cy="12" r="1.6" fill="currentColor" stroke="none" />
                <circle cx="9" cy="18" r="1.6" fill="currentColor" stroke="none" />
              </svg>
              {w.formatterLabel}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              class="shrink-0 text-mute transition-transform duration-200 group-open:rotate-180 group-open:text-ink"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div class="border-t border-hairline bg-canvas-soft p-2.5">
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {formatterActions.map((item) => (
                <button
                  type="button"
                  onClick={item.action}
                  disabled={!text}
                  class="min-h-11 sm:min-h-9 rounded-md border border-hairline bg-canvas px-2.5 py-2 text-center text-[12px] font-medium leading-4 text-ink transition-[transform,color,background,border-color] duration-100 hover:border-hairline-strong hover:bg-canvas-soft-2 active:scale-[0.955] active:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div class="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <TimerStat icon="book" label={w.timers.reading} value={readingTime} />
              <TimerStat icon="microphone" label={w.timers.speaking} value={speakingTime} />
            </div>
          </div>
        </details>
      </div>
    </Card>
  );
}

interface TimerStatProps {
  icon: 'book' | 'microphone';
  label: string;
  value: string;
}

function TimerStat({ icon, label, value }: TimerStatProps) {
  return (
    <div class="flex min-h-16 items-center gap-3 rounded-md border border-hairline bg-canvas px-3 py-2.5">
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-canvas-soft-2 text-link-deep">
        {icon === 'book' ? <BookIcon /> : <MicrophoneIcon />}
      </span>
      <div class="min-w-0">
        <div class="font-mono text-[11px] uppercase tracking-wide text-mute">
          {label}
        </div>
        <div class="mt-0.5 font-mono text-[18px] font-medium leading-6 text-ink tabular-nums">
          {value}
        </div>
      </div>
    </div>
  );
}

function LightbulbIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="text-warning">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

function PasteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  );
}

function MediaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    </svg>
  );
}

function MicrophoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v3" />
    </svg>
  );
}
