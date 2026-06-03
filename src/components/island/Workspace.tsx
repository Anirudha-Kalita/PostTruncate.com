/** @jsxImportSource preact */
import {
  charCount,
  wordCount,
  lineCount,
  paragraphCount,
  cleanExcessSpace,
  sanitizeText,
  detectHiddenUnicode,
} from '../../lib/textTools';
import { Card, CardHead, Stat, Badge } from './ui';

interface Props {
  text: string;
  setText: (next: string) => void;
}

/**
 * Left-column workspace: the editor textarea, the live meta counters, and the
 * optimization engine actions. All transforms route through the pure helpers
 * in textTools so behaviour matches the previews exactly.
 */
export function Workspace({ text, setText }: Props) {
  const hidden = detectHiddenUnicode(text);

  const onClean = () => setText(cleanExcessSpace(text));
  const onSanitize = () => setText(sanitizeText(text).text);
  const onClear = () => setText('');

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="Workspace" title="Write your post">
        {hidden.count > 0 ? (
          <Badge tone="warn">{hidden.count} hidden char{hidden.count > 1 ? 's' : ''}</Badge>
        ) : (
          <Badge tone="neutral" dot={false}>Editor</Badge>
        )}
      </CardHead>

      <div class="p-4 sm:p-5">
        <label for="post-input" class="sr-only">
          Your post text
        </label>
        <textarea
          id="post-input"
          value={text}
          onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
          placeholder="Start typing your post. Paste a draft, drop in a few links and hashtags, and watch each platform’s preview update on the right…"
          rows={12}
          spellcheck
          class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none"
        />

        {/* Live meta counters */}
        <div class="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Stat label="Characters" value={charCount(text)} />
          <Stat label="Words" value={wordCount(text)} />
          <Stat label="Lines" value={lineCount(text)} />
          <Stat label="Paragraphs" value={paragraphCount(text)} />
        </div>
      </div>

      {/* Optimization engine */}
      <div class="border-t border-hairline px-4 py-4 sm:px-5">
        <p class="font-mono text-[11px] uppercase tracking-wide text-mute">
          Optimization engine
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onClean}
            disabled={!text}
            class="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Clean excess space
          </button>
          <button
            type="button"
            onClick={onSanitize}
            disabled={hidden.count === 0}
            class="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Sanitize text
            {hidden.count > 0 && (
              <span class="rounded-pill bg-warning-soft px-1.5 text-[11px] text-warning-deep">
                {hidden.count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!text}
            class="ml-auto inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[13px] font-medium text-error transition-colors hover:bg-error-soft disabled:cursor-not-allowed disabled:opacity-45"
          >
            Clear editor
          </button>
        </div>

        {hidden.count > 0 && (
          <p class="mt-3 text-[12px] leading-4 text-warning-deep">
            Found invisible characters that break counts and screen readers:{' '}
            <span class="font-mono">{hidden.codes.join(', ')}</span>. Sanitize to
            strip them.
          </p>
        )}
      </div>
    </Card>
  );
}
