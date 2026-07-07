/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState, useRef } from 'preact/hooks';
import { Card } from './ui';
import { interp } from '../../i18n/interp';
import { charCount, emojiCount, detectHiddenUnicode, sanitizeText } from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Active locale — used only for number formatting. */
  lang?: string;
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

export function EmojiDetector({ s, lang }: Props) {
  const c = s.calculators.emojiDetector;
  const [text, setText] = useState('');
  const [removed, setRemoved] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput = (value: string) => {
    setText(value);
    setRemoved(0);
  };

  const onPaste = async () => {
    const el = textareaRef.current;
    el?.focus();
    try {
      const clip = await navigator.clipboard.readText();
      if (!clip) return;
      const focused = el && document.activeElement === el;
      const start = focused ? (el.selectionStart ?? text.length) : text.length;
      const end = focused ? (el.selectionEnd ?? text.length) : text.length;
      const next = text.slice(0, start) + clip + text.slice(end);
      onInput(next);
      const caret = start + clip.length;
      requestAnimationFrame(() => {
        el?.setSelectionRange(caret, caret);
      });
    } catch {
      // Fallback focus
    }
  };

  const removeHidden = () => {
    const result = sanitizeText(text);
    setText(result.text);
    setRemoved(result.removed);
  };

  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);

  const emojis = emojiCount(text);
  const chars = charCount(text);
  const hidden = detectHiddenUnicode(text);

  const hasInput = text.length > 0;

  // SVG Icons
  const smileIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
    </svg>
  );

  const charIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 7V5h16v2M9 19h6M12 5v14"/>
    </svg>
  );

  const hiddenIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>
    </svg>
  );

  return (
    <Card class="flex flex-col">
      {/* ── Header: title block + "Paste text" outlined action button ───── */}
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
          {s.calculators.wordsPerPage.modeText}
        </button>
      </header>

      <div class="flex flex-col gap-5 p-4 sm:p-5">
        {/* ── Editor text input area ─────────────────────────────────────── */}
        <div class="flex flex-col gap-1">
          <textarea
            ref={textareaRef}
            value={text}
            onInput={(e) => onInput((e.currentTarget as HTMLTextAreaElement).value)}
            placeholder={c.placeholder}
            rows={6}
            class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />
          {/* Clear button below textarea */}
          <div class="flex justify-end">
            <button
              type="button"
              onClick={() => onInput('')}
              disabled={!text}
              class="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[13px] font-medium text-error transition-[transform,color,background] duration-100 hover:bg-error-soft active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              {s.calculators.clear}
            </button>
          </div>
        </div>

        {/* ── Result Stat Cards (3 columns row) ──────────────────────────── */}
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatIcon
            value={nf.format(emojis)}
            label={c.emojiLabel}
            icon={smileIcon}
            iconBg="color-mix(in srgb, #facc15 15%, transparent)"
            iconColor="#eab308"
          />
          <StatIcon
            value={nf.format(chars)}
            label={c.charactersLabel}
            icon={charIcon}
            iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
            iconColor="#2563eb"
          />
          <StatIcon
            value={nf.format(hidden.count)}
            label={c.hiddenLabel}
            icon={hiddenIcon}
            iconBg={hidden.count > 0 ? 'color-mix(in srgb, #ef4444 12%, transparent)' : 'color-mix(in srgb, var(--color-mute) 12%, transparent)'}
            iconColor={hidden.count > 0 ? '#ef4444' : 'var(--color-mute)'}
          />
        </div>

        {/* ── Hidden-character warnings and remove actions ───────────────── */}
        {hidden.count > 0 ? (
          <div class="flex flex-col gap-3.5 rounded-lg border border-[color-mix(in srgb,#f59e0b_25%,transparent)] bg-[color-mix(in srgb,#f59e0b_8%,var(--color-canvas))] p-4">
            <div class="flex items-start gap-2.5">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" class="mt-0.5 shrink-0 text-warning-deep" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"></path>
              </svg>
              <p class="text-[13px] leading-relaxed text-warning-deep">
                {interp(s.workspace.hiddenWarning, { codes: hidden.codes.join(', ') })}
              </p>
            </div>
            <button
              type="button"
              onClick={removeHidden}
              class="inline-flex w-fit items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-[13px] font-semibold text-on-primary transition-[transform,opacity] duration-100 hover:opacity-90 active:scale-[0.97] shadow-e1"
            >
              {c.removeButton}
            </button>
          </div>
        ) : removed > 0 ? (
          <div class="flex items-center gap-2.5 rounded-lg border border-[color-mix(in srgb,#06b6d4_25%,transparent)] bg-[color-mix(in srgb,#06b6d4_8%,var(--color-canvas))] px-4 py-3 text-[13.5px] text-cyan-deep">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" class="shrink-0" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div>{interp(c.removedNote, { n: nf.format(removed) })}</div>
          </div>
        ) : (
          hasInput && (
            <div class="flex items-start gap-2.5 rounded-lg border border-[color-mix(in srgb,var(--color-success)_20%,transparent)] bg-[color-mix(in srgb,var(--color-success)_8%,var(--color-canvas))] px-4 py-3 text-[13.5px] text-success">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" class="mt-0.5 shrink-0" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <div>{c.cleanNote}</div>
            </div>
          )
        )}

        {/* ── Footer note info banner ────────────────────────────────────── */}
        <div class="flex items-start gap-3 rounded-lg border border-[color-mix(in_srgb,var(--color-link)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-link)_6%,var(--color-canvas))] p-3.5 text-[13.5px] leading-relaxed text-body sm:items-center">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-link sm:mt-0" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <div>{c.note}</div>
        </div>
      </div>
    </Card>
  );
}

export default EmojiDetector;
