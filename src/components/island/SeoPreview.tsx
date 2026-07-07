/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import { Card, CardHead, Meter, Badge, type Tone } from './ui';
import { interp } from '../../i18n/interp';
import { font, measureTextWidth, truncateToWidth } from '../../lib/canvasText';
import type { IslandStrings } from '../../i18n/types';

const TITLE_CHAR_LIMIT = 60;
const DESC_CHAR_LIMIT = 155;
const TITLE_PIXEL_MAX = 600;
/** Google renders the SERP title in ~20px Arial; measure against that. */
const TITLE_FONT = font(20, 'Arial');

interface Props {
  s: IslandStrings;
  lang?: string;
}

export function SeoPreview({ s, lang }: Props) {
  const [pageTitle, setPageTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const sp = s.seoPreview;

  const titleChars = pageTitle.length;
  const descChars = metaDesc.length;
  // True rendered pixel width via the canvas helper (SSR-safe fallback inside),
  // replacing the old AVG_CHAR_PX estimate so the clip matches Google exactly.
  const titlePx = Math.round(measureTextWidth(pageTitle, TITLE_FONT));

  const titleCharOver = titleChars > TITLE_CHAR_LIMIT;
  const titlePixelOver = titlePx > TITLE_PIXEL_MAX;
  const descOver = descChars > DESC_CHAR_LIMIT;

  const anyOver = titleCharOver || descOver;
  const anyInput = titleChars > 0 || descChars > 0;

  const badgeTone: Tone = !anyInput ? 'neutral' : anyOver ? 'warn' : 'safe';
  const badgeLabel = !anyInput ? sp.badgeIdle : anyOver ? sp.badgeWarn : sp.badgeSafe;

  const titleMeterTone: Tone = titleCharOver
    ? 'danger'
    : titleChars > TITLE_CHAR_LIMIT * 0.9
    ? 'warn'
    : titleChars > 0
    ? 'safe'
    : 'neutral';

  const pixelMeterTone: Tone = titlePixelOver
    ? 'danger'
    : titlePx > TITLE_PIXEL_MAX * 0.9
    ? 'warn'
    : titleChars > 0
    ? 'info'
    : 'neutral';

  const descMeterTone: Tone = descOver
    ? 'danger'
    : descChars > DESC_CHAR_LIMIT * 0.9
    ? 'warn'
    : descChars > 0
    ? 'safe'
    : 'neutral';

  const rawTitle = pageTitle || sp.titlePlaceholder;
  const rawDesc = metaDesc || sp.descPlaceholder;
  // Display title clips by true pixel width (Google's real behaviour) rather
  // than a fixed character count; the char counter/limit below is unchanged.
  const displayTitle = truncateToWidth(rawTitle, TITLE_PIXEL_MAX, TITLE_FONT).text;
  const displayDesc =
    rawDesc.length > DESC_CHAR_LIMIT ? rawDesc.slice(0, DESC_CHAR_LIMIT) + '…' : rawDesc;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow={sp.eyebrow} title={sp.title}>
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col gap-5 p-4 sm:p-5">
        {/* Page title field */}
        <div class="flex flex-col gap-2">
          <Meter
            label={sp.titleLabel}
            caption={interp(sp.titleCounter, { n: titleChars, limit: TITLE_CHAR_LIMIT })}
            value={titleChars}
            max={TITLE_CHAR_LIMIT}
            tone={titleMeterTone}
          />
          <input
            type="text"
            value={pageTitle}
            onInput={(e) => setPageTitle((e.currentTarget as HTMLInputElement).value)}
            placeholder={sp.titlePlaceholder}
            class="block w-full rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />
          {/* Pixel-width progress bar */}
          <Meter
            label={interp(sp.pixelNote, { px: titlePx, max: TITLE_PIXEL_MAX })}
            value={titlePx}
            max={TITLE_PIXEL_MAX}
            tone={pixelMeterTone}
          />
          {titleCharOver && (
            <p class="text-[12px] leading-4 text-error-deep">
              {interp(sp.titleOverChar, { limit: TITLE_CHAR_LIMIT })}
            </p>
          )}
          {!titleCharOver && titlePixelOver && (
            <p class="text-[12px] leading-4 text-warning-deep">
              {interp(sp.titleOverPixel, { max: TITLE_PIXEL_MAX })}
            </p>
          )}
        </div>

        {/* Meta description field */}
        <div class="flex flex-col gap-2">
          <Meter
            label={sp.descLabel}
            caption={interp(sp.descCounter, { n: descChars, limit: DESC_CHAR_LIMIT })}
            value={descChars}
            max={DESC_CHAR_LIMIT}
            tone={descMeterTone}
          />
          <textarea
            value={metaDesc}
            onInput={(e) => setMetaDesc((e.currentTarget as HTMLTextAreaElement).value)}
            placeholder={sp.descPlaceholder}
            rows={3}
            class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] leading-6 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />
          {descOver && (
            <p class="text-[12px] leading-4 text-error-deep">
              {interp(sp.descOverChar, { limit: DESC_CHAR_LIMIT })}
            </p>
          )}
        </div>

        {/* Google SERP preview card — always light background regardless of theme */}
        <div>
          <p class="mb-2 font-mono text-[11px] uppercase tracking-wide text-mute">
            {sp.previewLabel}
          </p>
          <div class="overflow-hidden rounded-lg border border-hairline bg-white p-4" style="font-family:Arial,sans-serif;font-feature-settings:normal;">
            {/* Site attribution: favicon + name + URL */}
            <div class="mb-1 flex items-center gap-2">
              <div
                style="width:26px;height:26px;border-radius:50%;border:1px solid #dadce0;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#4285F4;"
              >
                P
              </div>
              <div>
                <p style="font-family:Arial,Roboto,sans-serif;font-size:14px;line-height:1.3;color:#202124;margin:0;">
                  PostTruncate
                </p>
                <p style="font-family:Arial,Roboto,sans-serif;font-size:12px;line-height:1.3;color:#4d5156;margin:0;">
                  posttruncate.com
                </p>
              </div>
            </div>
            {/* Title — truncated at 60 chars with ellipsis */}
            <p
              style={`font-family:Arial,Roboto,sans-serif;font-size:20px;font-weight:400;line-height:1.3;margin:4px 0 0;color:${pageTitle ? '#1a0dab' : '#9aa0a6'};`}
            >
              {displayTitle}
            </p>
            {/* Description — truncated at 155 chars with ellipsis */}
            <p
              style={`font-family:Arial,Roboto,sans-serif;font-size:14px;line-height:1.58;margin:4px 0 0;color:${metaDesc ? '#4d5156' : '#9aa0a6'};`}
            >
              {displayDesc}
            </p>
          </div>
        </div>

        {/* ── Footer note info banner ────────────────────────────────────── */}
        <div class="mt-2 flex items-start gap-3 rounded-lg border border-[color-mix(in_srgb,var(--color-link)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-link)_6%,var(--color-canvas))] p-3.5 text-[13.5px] leading-relaxed text-body sm:items-center">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-link sm:mt-0" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <div>
            {LOCALIZED_NOTE[lang ?? 'en'] ?? LOCALIZED_NOTE.en}
          </div>
        </div>
      </div>
    </Card>
  );
}

const LOCALIZED_NOTE: Record<string, string> = {
  en: 'Google typically displays titles up to ~600px wide (≈60 characters). Longer titles may be truncated.',
  es: 'Google suele mostrar títulos de hasta ~600px de ancho (≈60 caracteres). Los títulos más largos pueden truncarse.',
  de: 'Google zeigt Titel normalerweise bis zu einer Breite von ca. 600 Pixeln an (ca. 60 Zeichen). Längere Titel werden möglicherweise abgeschnitten.',
  fr: 'Google affiche généralement des titres d\'une largeur maximale de ~600px (≈60 caractères). Les titres plus longs peuvent être tronqués.',
  pt: 'O Google geralmente exibe títulos com até ~600px de largura (≈60 caracteres). Títulos mais longos podem ser truncados.',
  it: 'Google in genere visualizza titoli fino a circa 600px di larghezza (≈60 caratteri). Titoli più lunghi potrebbero essere troncati.',
  nl: 'Google geeft titels doorgaans weer tot ~600px breed (≈60 tekens). Langere titels kunnen worden afgekapt.',
  ja: 'Googleは通常、最大約600px幅（約60文字）までタイトルを表示します。これより長いタイトルは省略される場合があります。',
  zh: 'Google 通常会显示最宽约 600 像素（约 60 个字符）的标题。较长的标题可能会被截断。',
  da: 'Google viser typisk titler på op til ~600px brede (≈60 tegn). Længere titler kan blive afkortet.',
};
