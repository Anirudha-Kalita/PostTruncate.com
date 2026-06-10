/** @jsxImportSource preact */
import { useMemo } from 'preact/hooks';
import { analyzeHook, type HookPlatform, type HookReasonCode } from '../../lib/hookAnalysis';
import type { FoldView } from '../../lib/textTools';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';
import {
  Badge,
  Card,
  CardHead,
  BrandLogo,
  HookStatusIcon,
  type Brand,
  type HookStatus,
  type Tone,
} from './ui';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  /** Scoped tool pages: render only this platform's row (all four when unset). */
  only?: HookPlatform;
  /**
   * Per-platform viewport (Desktop/Mobile) mirrored from the preview cards, so
   * each row audits the same fold the user is currently looking at. Platforms
   * absent from the map (e.g. X, which has no viewport fold) use the default.
   */
  views?: Partial<Record<HookPlatform, FoldView>>;
}

/** The platforms whose "…more" fold this panel audits, in render order. */
const PANEL_PLATFORMS: { platform: HookPlatform; brand: Brand; name: string }[] = [
  { platform: 'linkedin', brand: 'linkedin', name: 'LinkedIn' },
  { platform: 'instagram', brand: 'instagram', name: 'Instagram' },
  { platform: 'facebook', brand: 'facebook', name: 'Facebook' },
  { platform: 'x', brand: 'x', name: 'X' },
  { platform: 'threads', brand: 'threads', name: 'Threads' },
];

const VERDICT_TO_STATUS: Record<'pass' | 'warn' | 'fail', HookStatus> = {
  pass: 'pass',
  warn: 'warn',
  fail: 'fail',
};

const VERDICT_TO_TONE: Record<'pass' | 'warn' | 'fail', Tone> = {
  pass: 'safe',
  warn: 'warn',
  fail: 'danger',
};

/**
 * Hook Visibility panel. For each platform it runs the pure `analyzeHook`
 * engine over the live editor text and reports — with an icon, a word, and a
 * tone (never color alone) — whether the opening hook and CTA survive the
 * "…more" fold, plus the one-line reason. Updates on every keystroke via the
 * same debounced `analysisText` the counters consume.
 */
export function HookVisibilityCard({ text, lang, s, only, views }: Props) {
  const h = s.hook;
  const nf = new Intl.NumberFormat(lang);

  const reasonText = useMemo<Record<HookReasonCode, string>>(
    () => ({
      empty: h.reasonEmpty,
      fits: h.reasonFits,
      'hook-cut': h.reasonHookCut,
      'cta-below': h.reasonCtaBelow,
      'hook-only': h.reasonHookOnly,
      'hook-and-cta': h.reasonHookAndCta,
      'x-fits': h.xReasonFits,
      'x-hook-cut': h.xReasonHookCut,
      'x-cta-below': h.xReasonCtaBelow,
      'x-hook-only': h.xReasonHookOnly,
      'x-hook-and-cta': h.xReasonHookAndCta,
    }),
    [h],
  );

  const rows = only ? PANEL_PLATFORMS.filter((p) => p.platform === only) : PANEL_PLATFORMS;

  const analyses = useMemo(
    () =>
      rows.map((row) => ({
        row,
        result: analyzeHook(text, row.platform, { view: views?.[row.platform] }),
      })),
    [text, rows, views],
  );

  const hasText = text.trim() !== '';
  const passCount = analyses.filter(({ result }) => result.verdict === 'pass').length;

  // Overall tone for the header summary chip.
  const anyFail = analyses.some(({ result }) => result.verdict === 'fail');
  const anyWarn = analyses.some(({ result }) => result.verdict === 'warn');
  const summaryTone: Tone = anyFail ? 'danger' : anyWarn ? 'warn' : 'safe';

  return (
    <Card>
      <CardHead eyebrow={h.eyebrow} title={h.title}>
        {hasText && !only && (
          <Badge
            tone={summaryTone}
            class="max-w-[190px] text-center leading-4 sm:max-w-none sm:text-left"
          >
            {interp(h.summary, { pass: nf.format(passCount), total: nf.format(analyses.length) })}
          </Badge>
        )}
      </CardHead>

      <ul class="divide-y divide-hairline">
        {analyses.map(({ row, result }) => {
          const idle = result.reasonCode === 'empty';
          const status = VERDICT_TO_STATUS[result.verdict];
          const tone: Tone = idle ? 'neutral' : VERDICT_TO_TONE[result.verdict];
          const label = idle
            ? h.statusIdle
            : result.verdict === 'pass'
              ? h.statusPass
              : result.verdict === 'warn'
                ? h.statusWarn
                : h.statusFail;

          return (
            <li key={row.platform} class="flex items-start gap-3 px-4 py-3.5 sm:px-5">
              <span class="mt-0.5 flex shrink-0 items-center">
                <BrandLogo brand={row.brand} size={20} />
              </span>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span class="text-[14px] font-semibold text-ink">{row.name}</span>
                  <Badge tone={tone} dot={false}>
                    {!idle && <HookStatusIcon status={status} size={14} />}
                    {label}
                  </Badge>
                </div>
                <p class="mt-1 text-[13px] leading-5 text-body">
                  {reasonText[result.reasonCode]}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
