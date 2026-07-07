/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState, useRef } from 'preact/hooks';
import { Card } from './ui';
import { analyzeSms } from '../../lib/textTools';
import { interp } from '../../i18n/interp';
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
    <div class="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-3.5 py-3">
      <span
        class="inline-flex shrink-0 items-center justify-center rounded-lg"
        style={`width:38px;height:38px;background:${iconBg};color:${iconColor};`}
      >
        {icon}
      </span>
      <div>
        <div class="font-mono text-[20px] font-semibold leading-7 text-ink tabular-nums sm:text-[22px]">
          {value}
        </div>
        <div class="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-mute">{label}</div>
      </div>
    </div>
  );
}

export function SmsCounterCalculator({ s, lang }: Props) {
  const c = s.sms;
  const [text, setText] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput = (value: string) => {
    setText(value);
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

  const sms = useMemo(() => analyzeSms(text), [text]);
  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  const partLabel = interp(c.partsValue, { n: nf.format(sms.parts) });

  // SVG Icons
  const charIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 7V5h16v2M9 19h6M12 5v14"/>
    </svg>
  );

  const remainingIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );

  const segmentIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="4" rx="1"/>
      <rect x="3" y="10" width="18" height="4" rx="1"/>
      <rect x="3" y="17" width="18" height="4" rx="1"/>
    </svg>
  );

  const encodingIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <path d="M8 9h8M8 15h6"/>
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

        {/* ── Result Stat Cards (4 columns row) ──────────────────────────── */}
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatIcon
            value={nf.format(sms.units)}
            label={c.characterCount}
            icon={charIcon}
            iconBg="color-mix(in srgb, #10b981 12%, transparent)"
            iconColor="#059669"
          />
          <StatIcon
            value={nf.format(sms.charactersLeft)}
            label={c.charactersLeft}
            icon={remainingIcon}
            iconBg="color-mix(in srgb, #06b6d4 12%, transparent)"
            iconColor="#06b6d4"
          />
          <StatIcon
            value={partLabel}
            label={c.parts}
            icon={segmentIcon}
            iconBg="color-mix(in srgb, #8b5cf6 12%, transparent)"
            iconColor="#8b5cf6"
          />
          <StatIcon
            value={sms.isGsm ? c.encodingGsm : c.encodingUnicode}
            label={c.encoding}
            icon={encodingIcon}
            iconBg={sms.isGsm ? "color-mix(in srgb, #10b981 12%, transparent)" : "color-mix(in srgb, #f59e0b 12%, transparent)"}
            iconColor={sms.isGsm ? "#059669" : "#d97706"}
          />
        </div>

        {/* ── Footer note info banner (Dynamic warning for Unicode) ──────── */}
        <div 
          class="flex items-start gap-3 rounded-lg border p-3.5 text-[13.5px] leading-relaxed text-body sm:items-center transition-all duration-300"
          style={sms.isGsm 
            ? "border-color: color-mix(in srgb, #10b981 20%, transparent); background-color: color-mix(in srgb, #10b981 6%, var(--color-canvas));" 
            : "border-color: color-mix(in srgb, #f59e0b 20%, transparent); background-color: color-mix(in srgb, #f59e0b 6%, var(--color-canvas));"
          }
        >
          {sms.isGsm ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-[#10b981] sm:mt-0" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-[#d97706] sm:mt-0" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          )}
          <div>{sms.isGsm ? c.gsmNote : c.unicodeNote}</div>
        </div>
      </div>
    </Card>
  );
}

export default SmsCounterCalculator;
