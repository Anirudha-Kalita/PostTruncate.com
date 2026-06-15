/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Card, CardHead, Stat, Badge, ClearButton, type Tone } from './ui';
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

  const hasInput = words > 0;
  const badgeTone: Tone = hasInput ? 'safe' : 'neutral';
  const badgeLabel = hasInput ? c.badgeResult : c.badgeIdle;

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
          class="grid grid-cols-2 gap-1 rounded-lg border border-hairline bg-canvas-soft-2 p-1"
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
                  active ? 'bg-canvas text-ink shadow-e2' : 'text-mute hover:text-ink'
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

        <ClearButton
          label={s.calculators.clear}
          disabled={!text && !count}
          onClick={() => {
            setText('');
            setCount('');
          }}
        />

        {/* Document settings — font, size, spacing, page size */}
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

        {/* Margins + units */}
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-3">
            <span class="text-[13px] text-body">{c.marginsLabel}</span>
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

        {/* Result */}
        <div class="flex flex-col gap-2">
          <div class="grid grid-cols-2 gap-3">
            <Stat label={c.pagesLabel} value={formatPages(pages)} />
            <Stat label={c.wordsStatLabel} value={nf0.format(words)} />
          </div>
          <p class="font-mono text-[12px] text-mute">
            {interp(c.perPageNote, { n: nf0.format(wordsPerPage) })}
          </p>
        </div>

        {/* Print the typed document with the chosen layout (text mode only) */}
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

        {/* Quick-reference table — pages for common word counts at the current setting */}
        <div>
          <p class="mb-2 font-mono text-[11px] uppercase tracking-wide text-mute">
            {c.referenceHeading}
          </p>
          <div class="overflow-hidden rounded-lg border border-hairline">
            <table class="w-full border-collapse text-[14px]">
              <thead>
                <tr class="bg-canvas-soft-2 text-left text-[12px] uppercase tracking-wide text-mute">
                  <th class="px-4 py-2 font-medium">{c.refWordsCol}</th>
                  <th class="px-4 py-2 font-medium">{c.refPagesCol}</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_WORDS.map((w) => (
                  <tr class="border-t border-hairline">
                    <td class="px-4 py-2 text-body tabular-nums">{nf0.format(w)}</td>
                    <td class="px-4 py-2 font-medium text-ink tabular-nums">
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
