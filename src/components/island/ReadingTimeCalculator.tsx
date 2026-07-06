/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState, useRef } from 'preact/hooks';
import { Card } from './ui';
import { wordCount, estimatedDuration, type DurationCopy } from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Active locale — used only for number formatting. */
  lang?: string;
}

type Mode = 'text' | 'count';

const READING_WPM_OPTIONS = [100, 150, 200, 238, 275, 300, 350, 400, 450, 500];
const SPEAKING_WPM_OPTIONS = [80, 100, 110, 130, 150, 170, 190, 210, 230];
const REFERENCE_WORDS = [100, 250, 500, 1000, 2000, 5000];

const selectCls =
  'block w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-[14px] text-ink focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link';
const numCls =
  'block w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-[14px] text-ink tabular-nums focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link';

function Field({ label, info, children }: { label: string; info?: boolean; children: ComponentChildren }) {
  return (
    <label class="flex flex-col gap-1.5">
      <span class="inline-flex items-center gap-1 text-[13px] text-body">
        {label}
        {info && (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-mute" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )}
      </span>
      {children}
    </label>
  );
}

/** Stat tile with leading icon, large metric value and label. */
function StatIcon({
  value,
  label,
  icon,
  iconBg,
  iconColor,
}: {
  value: string;
  label: string;
  icon: ComponentChildren;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div class="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-4 py-3.5">
      <span
        class="inline-flex shrink-0 items-center justify-center rounded-lg"
        style={`width:40px;height:40px;background:${iconBg};color:${iconColor};`}
      >
        {icon}
      </span>
      <div>
        <div class="font-mono text-[22px] font-semibold leading-7 text-ink tabular-nums sm:text-[24px]">
          {value}
        </div>
        <div class="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-mute">{label}</div>
      </div>
    </div>
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onPaste = async () => {
    setMode('text');
    requestAnimationFrame(async () => {
      const el = textareaRef.current;
      el?.focus();
      try {
        const clip = await navigator.clipboard.readText();
        if (!clip) return;
        const focused = el && document.activeElement === el;
        const start = focused ? (el.selectionStart ?? text.length) : text.length;
        const end = focused ? (el.selectionEnd ?? text.length) : text.length;
        const next = text.slice(0, start) + clip + text.slice(end);
        setText(next);
        const caret = start + clip.length;
        requestAnimationFrame(() => {
          el?.setSelectionRange(caret, caret);
        });
      } catch {
        // Fallback catch if clipboard API is blocked
      }
    });
  };

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

  // Helper to add average / slow / fast labels to wpm speeds
  const getSpeedLabel = (wpm: number, type: 'reading' | 'speaking') => {
    if (type === 'reading') {
      if (wpm === 238) return `${wpm} ${c.wpmShort} (${c.speedAverage})`;
      if (wpm === 150) return `${wpm} ${c.wpmShort} (${c.speedSlow})`;
      if (wpm === 300) return `${wpm} ${c.wpmShort} (${c.speedFast})`;
    } else {
      if (wpm === 130) return `${wpm} ${c.wpmShort} (${c.speedAverage})`;
      if (wpm === 110) return `${wpm} ${c.wpmShort} (${c.speedSlow})`;
      if (wpm === 150) return `${wpm} ${c.wpmShort} (${c.speedFast})`;
    }
    return `${wpm} ${c.wpmShort}`;
  };

  // Underline tab style declarations
  const tabBase =
    'relative flex-1 text-center pb-2.5 pt-2 px-5 text-[14px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-1';
  const tabActive =
    'text-link after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-t-sm after:bg-link';
  const tabInactive = 'text-mute hover:text-body';

  // Eye icon (Reading time)
  const eyeIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  // Microphone icon (Speaking time)
  const micIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path>
    </svg>
  );

  // Document/Words icon
  const docIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );

  return (
    <Card class="flex flex-col">
      {/* ── Header: title + "Enter text" outline pill action button ──────── */}
      <header class="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3.5 sm:px-5 sm:py-4">
        <div>
          <h3 class="text-[20px] font-bold leading-6 tracking-[-0.5px] text-ink">
            {c.eyebrow}
          </h3>
          <p class="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-mute">
            {c.title}
          </p>
        </div>
        <button
          type="button"
          onClick={onPaste}
          class="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-canvas px-4 py-2 text-[13px] font-medium text-ink shadow-e1 transition-[box-shadow,background] hover:bg-canvas-soft-2 hover:shadow-e2 active:scale-[0.97]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
          {c.modeText}
        </button>
      </header>

      <div class="flex flex-col gap-5 p-4 sm:p-5">
        {/* ── Underline-style tab bar (50/50 split) ───────────────────────── */}
        <div
          role="group"
          aria-label={c.modeAria}
          class="relative -mx-4 flex border-b border-hairline px-4 sm:-mx-5 sm:px-5"
        >
          {(
            [
              { value: 'text' as Mode, label: c.modeText },
              { value: 'count' as Mode, label: c.modeCount },
            ]
          ).map((opt) => {
            const active = mode === opt.value;
            return (
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setMode(opt.value)}
                class={`${tabBase} ${active ? tabActive : tabInactive}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* ── Input text or word count field ──────────────────────────────── */}
        {mode === 'text' ? (
          <div class="flex flex-col gap-1">
            <textarea
              ref={textareaRef}
              value={text}
              onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
              placeholder={c.placeholder}
              rows={6}
              class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
            />
            {/* Clear — right-aligned, below textarea */}
            <div class="flex justify-end">
              <button
                type="button"
                onClick={() => { setText(''); setCount(''); }}
                disabled={!text && !count}
                class="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[13px] font-medium text-error transition-[transform,color,background] duration-100 hover:bg-error-soft active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                {s.calculators.clear}
              </button>
            </div>
          </div>
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

        {/* ── Side-by-side Speed Selectors (2 columns) ────────────────────── */}
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={c.readingSpeedLabel} info>
            <select
              class={selectCls}
              value={String(readingWpm)}
              onChange={(e) => setReadingWpm(Number((e.currentTarget as HTMLSelectElement).value))}
            >
              {READING_WPM_OPTIONS.map((w) => (
                <option value={String(w)}>{getSpeedLabel(w, 'reading')}</option>
              ))}
            </select>
          </Field>
          <Field label={c.speakingSpeedLabel} info>
            <select
              class={selectCls}
              value={String(speakingWpm)}
              onChange={(e) => setSpeakingWpm(Number((e.currentTarget as HTMLSelectElement).value))}
            >
              {SPEAKING_WPM_OPTIONS.map((w) => (
                <option value={String(w)}>{getSpeedLabel(w, 'speaking')}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* ── Result Stat Cards (3 columns) ───────────────────────────────── */}
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatIcon
            value={readingTime}
            label={timers.reading}
            icon={eyeIcon}
            iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
            iconColor="#2563eb"
          />
          <StatIcon
            value={speakingTime}
            label={timers.speaking}
            icon={micIcon}
            iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
            iconColor="#2563eb"
          />
          <StatIcon
            value={nf.format(words)}
            label={c.wordsStatLabel}
            icon={docIcon}
            iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
            iconColor="#2563eb"
          />
        </div>

        {/* ── Quick-reference table — durations for common word counts ─────── */}
        <div>
          <p class="mb-2 font-mono text-[11px] uppercase tracking-wide text-mute">
            {c.referenceHeading}
          </p>
          <div class="overflow-hidden rounded-lg border border-hairline">
            <table class="w-full border-collapse text-[14px]">
              <thead>
                <tr class="bg-canvas-soft-2 text-left text-[12px] uppercase tracking-wide text-mute">
                  <th class="px-4 py-2.5 font-medium">{c.refWordsCol}</th>
                  <th class="px-4 py-2.5 font-medium">{`${c.refReadingCol} (${readingWpm} ${c.wpmShort.toUpperCase()})`}</th>
                  <th class="px-4 py-2.5 font-medium">{`${c.refSpeakingCol} (${speakingWpm} ${c.wpmShort.toUpperCase()})`}</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_WORDS.map((w) => (
                  <tr class="border-t border-hairline transition-colors hover:bg-canvas-soft">
                    <td class="px-4 py-2.5 font-medium text-ink tabular-nums">{nf.format(w)}</td>
                    <td class="px-4 py-2.5 font-semibold text-ink tabular-nums">
                      {estimatedDuration(w, readingWpm, durationCopy, nf)}
                    </td>
                    <td class="px-4 py-2.5 font-semibold text-ink tabular-nums">
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
