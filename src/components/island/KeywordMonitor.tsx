/** @jsxImportSource preact */
import { keywordDensity, KEYWORD_STUFFING_THRESHOLD } from '../../lib/textTools';
import { Card, CardHead, Badge } from './ui';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
}

/**
 * Keyword Overuse Monitor. Ranks the most-used content words (stop words
 * removed) and shows each one's density as a share of the full word count.
 * Any keyword past the {@link KEYWORD_STUFFING_THRESHOLD} (3%) is flagged in
 * the brand's amber warning tone so writers catch keyword stuffing before it
 * costs them search ranking.
 */
export function KeywordMonitor({ text, lang, s }: Props) {
  const k = s.keywords;
  const nf = new Intl.NumberFormat(lang);
  // Density carries one decimal so 3% vs 3.4% is legible; locale-aware so it
  // renders "3,4" in es/de and "3.4" in en, matching the counters elsewhere.
  const dnf = new Intl.NumberFormat(lang, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const thresholdLabel = nf.format(KEYWORD_STUFFING_THRESHOLD);

  const report = keywordDensity(text);
  const hasRows = report.keywords.length > 0;
  // Scale each row's bar against the top keyword so the list reads as a
  // relative-frequency chart; overused rows recolor rather than overflow.
  const topDensity = hasRows ? report.keywords[0].density : 0;

  return (
    <Card>
      <CardHead eyebrow={k.eyebrow} title={k.title}>
        {!hasRows ? (
          <Badge tone="neutral" dot={false}>{k.badgeIdle}</Badge>
        ) : report.hasOveruse ? (
          <Badge tone="warn">{k.badgeStuffing}</Badge>
        ) : (
          <Badge tone="safe">{k.badgeBalanced}</Badge>
        )}
      </CardHead>

      <div class="p-4 sm:p-5">
        {!hasRows ? (
          <p class="rounded-md border border-hairline bg-canvas px-4 py-6 text-center text-[13px] leading-5 text-mute">
            {k.empty}
          </p>
        ) : (
          <>
            {/* Column header */}
            <div class="flex items-center gap-3 px-1 pb-2 font-mono text-[10px] uppercase tracking-wide text-mute">
              <span class="flex-1">{k.colKeyword}</span>
              <span class="w-12 text-right tabular-nums">{k.colUses}</span>
              <span class="w-16 text-right tabular-nums">{k.colDensity}</span>
            </div>

            <ul class="space-y-1">
              {report.keywords.map((row) => {
                const barPct =
                  topDensity > 0
                    ? Math.max(6, Math.round((row.density / topDensity) * 100))
                    : 0;
                return (
                  <li
                    key={row.word}
                    class={`flex items-center gap-3 rounded-md border px-3 py-2 transition-colors ${
                      row.overused
                        ? 'border-warning/40 bg-warning-soft'
                        : 'border-transparent bg-canvas-soft'
                    }`}
                  >
                    {/* Keyword + density bar */}
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center gap-2">
                        <span
                          class={`truncate text-[13px] font-medium ${
                            row.overused ? 'text-warning-deep' : 'text-ink'
                          }`}
                          title={row.word}
                        >
                          {row.word}
                        </span>
                        {row.overused && (
                          <span class="shrink-0 rounded-pill bg-warning/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-warning-deep">
                            {k.overused}
                          </span>
                        )}
                      </div>
                      <div class="mt-1.5 h-1 w-full overflow-hidden rounded-pill bg-canvas-soft-2">
                        <div
                          class={`h-full rounded-pill ${
                            row.overused ? 'bg-warning' : 'bg-hairline-strong'
                          }`}
                          style={`width:${barPct}%`}
                        />
                      </div>
                    </div>

                    <span class="w-12 text-right font-mono text-[13px] text-body tabular-nums">
                      {nf.format(row.count)}
                    </span>
                    <span
                      class={`w-16 text-right font-mono text-[13px] tabular-nums ${
                        row.overused ? 'font-semibold text-warning-deep' : 'text-ink'
                      }`}
                    >
                      {dnf.format(row.density)}%
                    </span>
                  </li>
                );
              })}
            </ul>

            {report.hasOveruse && (
              <p class="mt-3 text-[12px] leading-4 text-warning-deep">
                {interp(k.stuffingNote, { threshold: thresholdLabel })}
              </p>
            )}

            <p class="mt-3 font-mono text-[11px] text-mute tabular-nums">
              {interp(k.footnote, {
                total: nf.format(report.total),
                threshold: thresholdLabel,
              })}
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
