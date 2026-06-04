/** @jsxImportSource preact */
import {
  charCount,
  wordCount,
  lineCount,
  paragraphCount,
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
import { Card, CardHead, Stat, Badge } from './ui';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  text: string;
  setText: (next: string) => void;
  lang: string;
  s: IslandStrings;
}

/**
 * Left-column workspace: the editor textarea, the live meta counters, and the
 * optimization engine actions. All transforms route through the pure helpers
 * in textTools so behaviour matches the previews exactly.
 */
export function Workspace({ text, setText, lang, s }: Props) {
  const hidden = detectHiddenUnicode(text);
  const w = s.workspace;
  const nf = new Intl.NumberFormat(lang);

  const onClean = () => setText(cleanExcessSpace(text));
  const onSanitize = () => setText(sanitizeText(text).text);
  const onClear = () => setText('');

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
      <CardHead eyebrow={w.eyebrow} title={w.title}>
        {hidden.count > 0 ? (
          <Badge tone="warn">
            {interp(plural(w.hiddenBadge, hidden.count), { n: hidden.count })}
          </Badge>
        ) : (
          <Badge tone="neutral" dot={false}>{w.badgeEditor}</Badge>
        )}
      </CardHead>

      <div class="p-4 sm:p-5">
        <label for="post-input" class="sr-only">
          {w.title}
        </label>
        <textarea
          id="post-input"
          value={text}
          onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
          placeholder={w.placeholder}
          rows={12}
          spellcheck
          class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none"
        />

        <div class="mt-3 rounded-md border border-hairline bg-canvas-soft p-2.5">
          <p class="px-1 font-mono text-[11px] uppercase tracking-wide text-mute">
            {w.formatterLabel}
          </p>
          <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {formatterActions.map((item) => (
              <button
                type="button"
                onClick={item.action}
                disabled={!text}
                class="min-h-9 rounded-md border border-hairline bg-canvas px-2.5 py-2 text-center text-[12px] font-medium leading-4 text-ink transition-colors hover:border-hairline-strong hover:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live meta counters */}
        <div class="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Stat label={w.counters.characters} value={nf.format(charCount(text))} />
          <Stat label={w.counters.words} value={nf.format(wordCount(text))} />
          <Stat label={w.counters.lines} value={nf.format(lineCount(text))} />
          <Stat label={w.counters.paragraphs} value={nf.format(paragraphCount(text))} />
        </div>
      </div>

      {/* Optimization engine */}
      <div class="border-t border-hairline px-4 py-4 sm:px-5">
        <p class="font-mono text-[11px] uppercase tracking-wide text-mute">
          {w.engineLabel}
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onClean}
            disabled={!text}
            class="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {w.clean}
          </button>
          <button
            type="button"
            onClick={onSanitize}
            disabled={!text}
            class="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {w.sanitize}
            {hidden.count > 0 && (
              <span class="rounded-pill bg-warning-soft px-1.5 text-[11px] text-warning-deep">
                {nf.format(hidden.count)}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!text}
            class="ml-auto inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[13px] font-medium text-error transition-colors hover:bg-error-soft disabled:cursor-not-allowed disabled:opacity-45"
          >
            {w.clear}
          </button>
        </div>

        {hidden.count > 0 && (
          <p class="mt-3 text-[12px] leading-4 text-warning-deep">
            {warnBefore}
            <span class="font-mono">{hidden.codes.join(', ')}</span>
            {warnAfter}
          </p>
        )}
      </div>
    </Card>
  );
}
