/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState, useRef } from 'preact/hooks';
import { Card } from './ui';
import { byteCounts } from '../../lib/textTools';
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

export function ByteCounterCalculator({ s, lang }: Props) {
  const c = s.calculators.byteCounter;
  const [text, setText] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      setText(next);
      const caret = start + clip.length;
      requestAnimationFrame(() => {
        el?.setSelectionRange(caret, caret);
      });
    } catch {
      // Fallback focus
    }
  };

  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  const counts = byteCounts(text);

  // SVG Icons
  const codeIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );

  const charIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 7V5h16v2M9 19h6M12 5v14"/>
    </svg>
  );

  const hashIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="4" y1="9" x2="20" y2="9"></line>
      <line x1="4" y1="15" x2="20" y2="15"></line>
      <line x1="10" y1="3" x2="8" y2="21"></line>
      <line x1="16" y1="3" x2="14" y2="21"></line>
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
            onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
            placeholder={c.placeholder}
            rows={6}
            class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />
          {/* Clear button below textarea */}
          <div class="flex justify-end">
            <button
              type="button"
              onClick={() => setText('')}
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

        {/* ── Result Stat Cards (3 columns row + 2 columns row) ────────────── */}
        <div class="flex flex-col gap-3">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatIcon
              value={nf.format(counts.utf8)}
              label={c.utf8Label}
              icon={codeIcon}
              iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
              iconColor="#2563eb"
            />
            <StatIcon
              value={nf.format(counts.utf16)}
              label={c.utf16Label}
              icon={codeIcon}
              iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
              iconColor="#2563eb"
            />
            <StatIcon
              value={nf.format(counts.utf32)}
              label={c.utf32Label}
              icon={codeIcon}
              iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
              iconColor="#2563eb"
            />
          </div>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StatIcon
              value={nf.format(counts.graphemes)}
              label={c.charactersLabel}
              icon={charIcon}
              iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
              iconColor="#2563eb"
            />
            <StatIcon
              value={nf.format(counts.codePoints)}
              label={c.codePointsLabel}
              icon={hashIcon}
              iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
              iconColor="#2563eb"
            />
          </div>
        </div>

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

export default ByteCounterCalculator;
