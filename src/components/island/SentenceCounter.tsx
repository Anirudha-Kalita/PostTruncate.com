/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState, useRef } from 'preact/hooks';
import { Card } from './ui';
import type { IslandStrings } from '../../i18n/types';
import { wordCount, charCount, sentenceCount, paragraphCount } from '../../lib/textTools';

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

export function SentenceCounter({ s, lang }: Props) {
  const c = s.calculators.sentenceCounter;
  const counters = s.workspace.counters;
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

  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);

  const sentences = sentenceCount(text);
  const paragraphs = paragraphCount(text);
  const words = wordCount(text);
  const chars = charCount(text);

  // SVG Icons
  const sentenceIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h12"></path>
    </svg>
  );

  const paragraphIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 6h16M7 12h13M7 18h9"></path>
    </svg>
  );

  const wordIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );

  const charIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 7V5h16v2M9 19h6M12 5v14"/>
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
            value={nf.format(sentences)}
            label={c.sentencesLabel}
            icon={sentenceIcon}
            iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
            iconColor="#2563eb"
          />
          <StatIcon
            value={nf.format(paragraphs)}
            label={counters.paragraphs}
            icon={paragraphIcon}
            iconBg="color-mix(in srgb, #06b6d4 12%, transparent)"
            iconColor="#06b6d4"
          />
          <StatIcon
            value={nf.format(words)}
            label={counters.words}
            icon={wordIcon}
            iconBg="color-mix(in srgb, #8b5cf6 12%, transparent)"
            iconColor="#8b5cf6"
          />
          <StatIcon
            value={nf.format(chars)}
            label={counters.characters}
            icon={charIcon}
            iconBg="color-mix(in srgb, #ec4899 12%, transparent)"
            iconColor="#ec4899"
          />
        </div>

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

export default SentenceCounter;
