/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState, useRef } from 'preact/hooks';
import { Card } from './ui';
import { interp } from '../../i18n/interp';
import {
  wordCount,
  estimateDocumentPages,
  type PageFont,
  type PageFormat,
  type PageSpacing,
  type PageUnit,
} from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Active locale — used only for number grouping/decimals. */
  lang?: string;
}

type Mode = 'text' | 'count';
type MarginStrings = { top: string; right: string; bottom: string; left: string };

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18];
const REFERENCE_WORDS = [100, 250, 500, 750, 1000, 2000, 5000];
const CM_PER_INCH = 2.54;

// Font names are proper nouns — kept verbatim, not translated.
const FONTS: { value: PageFont; label: string }[] = [
  { value: 'arial', label: 'Arial' },
  { value: 'times', label: 'Times New Roman' },
  { value: 'calibri', label: 'Calibri' },
  { value: 'verdana', label: 'Verdana' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'courier', label: 'Courier New' },
];

// CSS stacks + @page keywords + print line-heights for the Print view.
const FONT_STACK: Record<PageFont, string> = {
  arial: 'Arial, Helvetica, sans-serif',
  times: '"Times New Roman", Times, serif',
  calibri: 'Calibri, "Segoe UI", sans-serif',
  verdana: 'Verdana, Geneva, sans-serif',
  georgia: 'Georgia, serif',
  courier: '"Courier New", Courier, monospace',
};
const FORMAT_PAGE: Record<PageFormat, string> = { a4: 'A4', letter: 'Letter', legal: 'legal' };
const SPACING_PRINT: Record<PageSpacing, number> = { single: 1.2, oneAndHalf: 1.8, double: 2.4 };

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

/** Stat tile with a leading icon, large numeric value and an uppercase label. */
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
        <div class="font-mono text-[28px] font-semibold leading-8 text-ink tabular-nums">
          {value}
        </div>
        <div class="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-mute">{label}</div>
      </div>
    </div>
  );
}

export function WordsPerPageCalculator({ s, lang }: Props) {
  const c = s.calculators.wordsPerPage;

  const [mode, setMode] = useState<Mode>('text');
  const [text, setText] = useState('');
  const [count, setCount] = useState('');
  const [font, setFont] = useState<PageFont>('arial');
  const [fontSize, setFontSize] = useState(12);
  const [spacing, setSpacing] = useState<PageSpacing>('single');
  const [format, setFormat] = useState<PageFormat>('a4');
  const [unit, setUnit] = useState<PageUnit>('inch');
  const [margins, setMargins] = useState<MarginStrings>({
    top: '1',
    right: '1',
    bottom: '1',
    left: '1',
  });

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
        // Silently catch clipboard block/rejection
      }
    });
  };

  const nf0 = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 0 }), [lang]);
  const nf1 = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }), [lang]);

  const words =
    mode === 'text' ? wordCount(text) : Math.max(0, Math.floor(Number(count) || 0));

  const numMargins = {
    top: parseFloat(margins.top) || 0,
    right: parseFloat(margins.right) || 0,
    bottom: parseFloat(margins.bottom) || 0,
    left: parseFloat(margins.left) || 0,
  };
  const opts = { font, fontSize, spacing, format, unit, margins: numMargins };

  const { wordsPerPage, pages } = estimateDocumentPages(words, opts);

  const formatPages = (p: number) => (p <= 0 ? '0' : nf1.format(Math.round(p * 10) / 10));

  const setMargin = (side: keyof MarginStrings, value: string) =>
    setMargins((prev) => ({ ...prev, [side]: value }));

  // Switching units converts the existing margin values so the layout (and page
  // estimate) stays the same rather than silently changing.
  const onUnitChange = (next: PageUnit) => {
    if (next === unit) return;
    const factor = next === 'cm' ? CM_PER_INCH : 1 / CM_PER_INCH;
    setMargins((prev) => {
      const conv = (v: string) => {
        const n = parseFloat(v);
        return Number.isFinite(n) ? String(Math.round(n * factor * 100) / 100) : v;
      };
      return { top: conv(prev.top), right: conv(prev.right), bottom: conv(prev.bottom), left: conv(prev.left) };
    });
    setUnit(next);
  };

  // Print the typed text with the chosen page layout. Prints the MAIN document
  // (no iframe / popup / document.write) so it works under the site's Trusted
  // Types CSP and Chrome's print preview: a print-only container holds the text,
  // and an @media print rule hides everything else on the page.
  const printDoc = () => {
    if (!text.trim()) return;
    const u = unit === 'cm' ? 'cm' : 'in';

    // Print-only container, appended as a direct child of <body> so the
    // sibling-hiding rule below isolates it.
    let area = document.getElementById('wpp-print-area');
    if (!area) {
      area = document.createElement('div');
      area.id = 'wpp-print-area';
      document.body.appendChild(area);
    }
    area.textContent = text; // text node — Trusted-Types-safe; pre-wrap keeps breaks
    area.style.cssText =
      `font-family:${FONT_STACK[font]};font-size:${fontSize}pt;` +
      `line-height:${SPACING_PRINT[spacing]};white-space:pre-wrap;word-wrap:break-word;color:#000;`;

    // Page geometry + isolation rules, refreshed on every print.
    let pstyle = document.getElementById('wpp-print-style');
    if (!pstyle) {
      pstyle = document.createElement('style');
      pstyle.id = 'wpp-print-style';
      document.head.appendChild(pstyle);
    }
    pstyle.textContent =
      `@media screen{#wpp-print-area{display:none;}}` +
      `@media print{` +
      `@page{size:${FORMAT_PAGE[format]};margin:${numMargins.top}${u} ${numMargins.right}${u} ${numMargins.bottom}${u} ${numMargins.left}${u};}` +
      `body>*:not(#wpp-print-area){display:none !important;}` +
      `#wpp-print-area{display:block !important;}` +
      `}`;

    requestAnimationFrame(() => window.print());
  };

  // ── Tab styles: underline indicator ────────────────────────────────────────
  const tabBase =
    'relative flex-1 text-center pb-2.5 pt-2 px-5 text-[14px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-1';
  const tabActive =
    'text-link after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-t-sm after:bg-link';
  const tabInactive = 'text-mute hover:text-body';

  // Page document icon (for PAGES stat)
  const pageIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 10h8M8 14h6" />
      <path d="M15 2v4h5" />
    </svg>
  );

  // Text/A icon (for WORDS stat)
  const wordIcon = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 7V5h16v2M9 19h6M12 5v14" />
    </svg>
  );

  return (
    <Card class="flex flex-col">
      {/* ── Header: title block + "Enter text" outline pill button ──────── */}
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
        {/* ── Underline-style tab bar ──────────────────────────────────────── */}
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

        {/* ── Input — paste text or type a raw word count ──────────────────── */}
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
            {/* Clear button — right-aligned, below the textarea */}
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

        {/* ── Document settings — font, size, spacing, page size ─────────── */}
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field label={c.fontLabel}>
            <select class={selectCls} value={font} onChange={(e) => setFont((e.currentTarget as HTMLSelectElement).value as PageFont)}>
              {FONTS.map((f) => (
                <option value={f.value}>{f.label}</option>
              ))}
            </select>
          </Field>
          <Field label={c.fontSizeLabel}>
            <select class={selectCls} value={String(fontSize)} onChange={(e) => setFontSize(Number((e.currentTarget as HTMLSelectElement).value))}>
              {FONT_SIZES.map((f) => (
                <option value={String(f)}>{`${f} pt`}</option>
              ))}
            </select>
          </Field>
          <Field label={c.spacingLabel}>
            <select class={selectCls} value={spacing} onChange={(e) => setSpacing((e.currentTarget as HTMLSelectElement).value as PageSpacing)}>
              <option value="single">{c.spacingSingle}</option>
              <option value="oneAndHalf">{c.spacingOneAndHalf}</option>
              <option value="double">{c.spacingDouble}</option>
            </select>
          </Field>
          <Field label={c.pageFormatLabel}>
            <select class={selectCls} value={format} onChange={(e) => setFormat((e.currentTarget as HTMLSelectElement).value as PageFormat)}>
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
              <option value="legal">Legal</option>
            </select>
          </Field>
        </div>

        {/* ── Margins + units ──────────────────────────────────────────────── */}
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-3">
            <span class="text-[13px] font-medium text-ink">{c.marginsLabel}</span>
            <label class="flex items-center gap-2">
              <span class="text-[12px] text-mute">{c.unitsLabel}</span>
              <select
                class="rounded-md border border-hairline bg-canvas-soft px-2 py-1 text-[13px] text-ink focus:border-link focus:bg-canvas focus:outline-none"
                value={unit}
                onChange={(e) => onUnitChange((e.currentTarget as HTMLSelectElement).value as PageUnit)}
              >
                <option value="inch">{c.unitInch}</option>
                <option value="cm">{c.unitCm}</option>
              </select>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <Field
                label={
                  side === 'top'
                    ? c.marginTop
                    : side === 'right'
                    ? c.marginRight
                    : side === 'bottom'
                    ? c.marginBottom
                    : c.marginLeft
                }
              >
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  value={margins[side]}
                  onInput={(e) => setMargin(side, (e.currentTarget as HTMLInputElement).value)}
                  class={numCls}
                />
              </Field>
            ))}
          </div>
        </div>

        {/* ── Result stat cards with icons ─────────────────────────────────── */}
        <div class="flex flex-col gap-2">
          <div class="grid grid-cols-2 gap-3">
            <StatIcon
              value={formatPages(pages)}
              label={c.pagesLabel}
              icon={pageIcon}
              iconBg="color-mix(in srgb, #2563eb 12%, transparent)"
              iconColor="#2563eb"
            />
            <StatIcon
              value={nf0.format(words)}
              label={c.wordsStatLabel}
              icon={wordIcon}
              iconBg="color-mix(in srgb, #059669 12%, transparent)"
              iconColor="#059669"
            />
          </div>
          <p class="font-mono text-[12px] text-mute">
            {interp(c.perPageNote, { n: nf0.format(wordsPerPage) })}
          </p>
        </div>

        {/* ── Print the typed document with the chosen layout (text only) ── */}
        {mode === 'text' && (
          <div>
            <button
              type="button"
              onClick={printDoc}
              disabled={!text.trim()}
              class="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-canvas-soft-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
              </svg>
              {c.printButton}
            </button>
          </div>
        )}

        {/* ── Quick-reference table — pages for common word counts ─────────── */}
        <div>
          <p class="mb-2 font-mono text-[11px] uppercase tracking-wide text-mute">
            {c.referenceHeading}
          </p>
          <div class="overflow-hidden rounded-lg border border-hairline">
            <table class="w-full border-collapse text-[14px]">
              <thead>
                <tr class="bg-canvas-soft-2 text-left text-[12px] uppercase tracking-wide text-mute">
                  <th class="px-4 py-2.5 font-medium">{c.refWordsCol}</th>
                  <th class="px-4 py-2.5 font-medium">{c.refPagesCol}</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_WORDS.map((w) => (
                  <tr class="border-t border-hairline transition-colors hover:bg-canvas-soft">
                    <td class="px-4 py-2.5 font-medium text-ink tabular-nums">{nf0.format(w)}</td>
                    <td class="px-4 py-2.5 font-semibold text-ink tabular-nums">
                      {formatPages(estimateDocumentPages(w, opts).pages)}
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

export default WordsPerPageCalculator;
