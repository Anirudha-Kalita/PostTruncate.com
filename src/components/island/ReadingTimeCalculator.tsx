/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Card, CardHead, Stat, Badge, type Tone } from './ui';
import { wordCount, estimatedDuration, type DurationCopy } from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Active locale — used only for number formatting. */
  lang?: string;
}

type Mode = 'text' | 'count';

// Words-per-minute options. Reading averages ~238 wpm (silent); speaking
// averages ~130 wpm (presentation pace) — these are the defaults below.
const READING_WPM_OPTIONS = [100, 150, 200, 238, 275, 300, 350, 400, 450, 500];
const SPEAKING_WPM_OPTIONS = [80, 100, 110, 130, 150, 170, 190, 210, 230];
const REFERENCE_WORDS = [100, 250, 500, 1000, 2000, 5000];

const selectCls =
  'block w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-[14px] text-ink focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link';
const numCls =
  'block w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-[14px] text-ink tabular-nums focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link';

function Field({ label, children }: { label: string; children: ComponentChildren }) {
  return (
    <label class="flex flex-col gap-1.5">
      <span class="text-[13px] text-body">{label}</span>
      {children}
    </label>
  );
}

export function ReadingTimeCalculator({ s, lang }: Props) {
  const c = s.calculators.readingTime;
  const timers = s.workspace.timers;

  const [mode, setMode] = useState<Mode>('text');
  const [text, setText] = useState('');
  const [count, setCount] = useState('');
  const [readingWpm, setReadingWpm] = useState(238);
  const [speakingWpm, setSpeakingWpm] = useState(130);

  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  const durationCopy: DurationCopy = {
    lessThan30Sec: timers.lessThan30Sec,
    minute: timers.minute,
    second: timers.second,
  };

  const words =
    mode === 'text' ? wordCount(text) : Math.max(0, Math.floor(Number(count) || 0));

  const readingTime = words > 0 ? estimatedDuration(words, readingWpm, durationCopy, nf) : '—';
  const speakingTime = words > 0 ? estimatedDuration(words, speakingWpm, durationCopy, nf) : '—';

  const hasInput = words > 0;
  const badgeTone: Tone = hasInput ? 'safe' : 'neutral';
  const badgeLabel = hasInput ? c.badgeResult : c.badgeIdle;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow={c.eyebrow} title={c.title}>
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col gap-5 p-4 sm:p-5">
        {/* Input mode toggle — full-width segmented switch */}
        <div
          role="group"
          aria-label={c.modeAria}
          class="grid grid-cols-2 gap-1 rounded-lg border border-hairline bg-canvas-soft p-1"
        >
          {(
            [
              { value: 'text', label: c.modeText },
              { value: 'count', label: c.modeCount },
            ] as { value: Mode; label: string }[]
          ).map((opt) => {
            const active = mode === opt.value;
            return (
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setMode(opt.value)}
                class={`rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                  active ? 'bg-canvas text-ink shadow-e1' : 'text-body hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Input — paste text or type a raw word count */}
        {mode === 'text' ? (
          <textarea
            value={text}
            onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
            placeholder={c.placeholder}
            rows={6}
            class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[17px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />
        ) : (
          <Field label={c.wordsLabel}>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={count}
              onInput={(e) => setCount((e.currentTarget as HTMLInputElement).value)}
              placeholder={c.wordsPlaceholder}
              class={numCls}
            />
          </Field>
        )}

        {/* Speed selectors */}
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label={c.readingSpeedLabel}>
            <select
              class={selectCls}
              value={String(readingWpm)}
              onChange={(e) => setReadingWpm(Number((e.currentTarget as HTMLSelectElement).value))}
            >
              {READING_WPM_OPTIONS.map((w) => (
                <option value={String(w)}>{`${w} ${c.wpmShort}`}</option>
              ))}
            </select>
          </Field>
          <Field label={c.speakingSpeedLabel}>
            <select
              class={selectCls}
              value={String(speakingWpm)}
              onChange={(e) => setSpeakingWpm(Number((e.currentTarget as HTMLSelectElement).value))}
            >
              {SPEAKING_WPM_OPTIONS.map((w) => (
                <option value={String(w)}>{`${w} ${c.wpmShort}`}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Result */}
        <div class="grid grid-cols-3 gap-3">
          <Stat label={timers.reading} value={readingTime} />
          <Stat label={timers.speaking} value={speakingTime} />
          <Stat label={c.wordsStatLabel} value={nf.format(words)} />
        </div>

        {/* Quick-reference table — durations for common word counts */}
        <div>
          <p class="mb-2 font-mono text-[11px] uppercase tracking-wide text-mute">
            {c.referenceHeading}
          </p>
          <div class="overflow-hidden rounded-lg border border-hairline">
            <table class="w-full border-collapse text-[14px]">
              <thead>
                <tr class="bg-canvas-soft-2 text-left text-[12px] uppercase tracking-wide text-mute">
                  <th class="px-4 py-2 font-medium">{c.refWordsCol}</th>
                  <th class="px-4 py-2 font-medium">{c.refReadingCol}</th>
                  <th class="px-4 py-2 font-medium">{c.refSpeakingCol}</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_WORDS.map((w) => (
                  <tr class="border-t border-hairline">
                    <td class="px-4 py-2 text-body tabular-nums">{nf.format(w)}</td>
                    <td class="px-4 py-2 font-medium text-ink tabular-nums">
                      {estimatedDuration(w, readingWpm, durationCopy, nf)}
                    </td>
                    <td class="px-4 py-2 font-medium text-ink tabular-nums">
                      {estimatedDuration(w, speakingWpm, durationCopy, nf)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ReadingTimeCalculator;
