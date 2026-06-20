/** @jsxImportSource preact */
import { useMemo } from 'preact/hooks';
import { analyzeHook, type HookPlatform, type HookReasonCode } from '../../lib/hookAnalysis';
import {
  charCount,
  weightedLength,
  FOLDS,
  LIMITS,
  type FoldView,
} from '../../lib/textTools';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';
import {
  Badge,
  BrandLogo,
  HookStatusIcon,
  type Brand,
  type HookStatus,
  type Tone,
} from './ui';

/**
 * Horizontal hook-visibility strip — one compact card per platform, leading
 * with the verdict from the shared `analyzeHook` engine ("Hook survives" /
 * "Hook at risk" / "Hook cut off", icon + word + tone, never color alone),
 * the localized one-line reason, and the raw character count demoted to a
 * secondary line. SMS has no fold, so its card keeps live segmentation from
 * `analyzeSms` instead. All limits and folds come from textTools/hookAnalysis
 * — nothing is recomputed or duplicated here.
 */

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  /** Per-platform viewport mirrored from the preview cards (same as the hook panel). */
  views?: Partial<Record<HookPlatform, FoldView>>;
  /** Destination for the "view all platform limits" link. */
  limitsHref: string;
}

const STRIP: { platform: HookPlatform; brand: Brand; name: string; limit: number }[] = [
  { platform: 'linkedin', brand: 'linkedin', name: 'LinkedIn', limit: LIMITS.LINKEDIN_POST },
  { platform: 'x', brand: 'x', name: 'X (Twitter)', limit: LIMITS.TWEET },
  { platform: 'instagram', brand: 'instagram', name: 'Instagram', limit: LIMITS.INSTAGRAM_CAPTION },
  { platform: 'facebook', brand: 'facebook', name: 'Facebook', limit: LIMITS.FACEBOOK_POST },
  { platform: 'threads', brand: 'threads', name: 'Threads', limit: LIMITS.THREADS },
  { platform: 'tiktok', brand: 'tiktok', name: 'TikTok', limit: LIMITS.TIKTOK_CAPTION_MAX },
];

/**
 * The fold budget the proximity check measures against: the platform's raw
 * fold for the active viewport, or X's weighted 280 cap (X has no fold — it
 * splits into a thread instead).
 */
function foldBudget(platform: HookPlatform, view: FoldView): number {
  if (platform === 'x') return LIMITS.TWEET;
  return FOLDS[platform][view];
}

/** How close to the fold still counts as "at risk" (within ~10% under it). */
const RISK_RATIO = 0.9;

export function HookStrip({ text, lang, s, views, limitsHref }: Props) {
  const h = s.hookStrip;
  const nf = new Intl.NumberFormat(lang);
  const total = charCount(text);

  const reasonText = useMemo<Record<HookReasonCode, string>>(
    () => ({
      empty: s.hook.reasonEmpty,
      fits: s.hook.reasonFits,
      'hook-cut': s.hook.reasonHookCut,
      'cta-below': s.hook.reasonCtaBelow,
      'hook-only': s.hook.reasonHookOnly,
      'hook-and-cta': s.hook.reasonHookAndCta,
      'x-fits': s.hook.xReasonFits,
      'x-hook-cut': s.hook.xReasonHookCut,
      'x-cta-below': s.hook.xReasonCtaBelow,
      'x-hook-only': s.hook.xReasonHookOnly,
      'x-hook-and-cta': s.hook.xReasonHookAndCta,
    }),
    [s.hook],
  );

  const cards = useMemo(
    () =>
      STRIP.map((p) => {
        const view = views?.[p.platform] ?? 'mobile';
        const a = analyzeHook(text, p.platform, { view });

        // Verdict → badge. A clean pass that sits within ~10% under the fold
        // is downgraded to "at risk" — one more sentence will cut the hook.
        const budget = foldBudget(p.platform, view);
        const measure = p.platform === 'x' ? weightedLength(text) : total;
        const nearFold =
          a.verdict === 'pass' &&
          a.reasonCode !== 'empty' &&
          measure <= budget &&
          measure >= budget * RISK_RATIO;

        let tone: Tone;
        let icon: HookStatus;
        let label: string;
        if (a.verdict === 'fail') {
          tone = 'danger';
          icon = 'fail';
          label = h.cut;
        } else if (a.verdict === 'warn' || nearFold) {
          tone = 'warn';
          icon = 'warn';
          label = h.risk;
        } else {
          tone = 'safe';
          icon = 'pass';
          label = h.survives;
        }

        return { ...p, tone, icon, label, reason: reasonText[a.reasonCode] };
      }),
    [text, total, views, reasonText, h],
  );

  return (
    <section class="mt-4 rounded-xl bg-canvas p-4 shadow-e2 sm:p-5">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h3 class="text-[15px] font-semibold leading-5 tracking-[-0.3px] text-ink">
          {h.heading}
        </h3>
        <a
          href={limitsHref}
          class="text-[13px] font-medium text-link transition-opacity hover:opacity-75"
        >
          {h.viewAll} →
        </a>
      </div>

      {/* Equal cards: a 2×3 grid on phones, one horizontal row from sm up. */}
      <div class="mt-3 grid grid-cols-2 gap-3 sm:flex sm:overflow-x-auto sm:pb-1">
        {cards.map((c) => (
          <div
            key={c.platform}
            class="flex min-w-0 flex-col items-center gap-2.5 rounded-lg border border-hairline bg-canvas-soft p-3.5 text-center sm:min-w-40 sm:flex-1"
          >
            <div class="flex items-center gap-2">
              <BrandLogo brand={c.brand} size={20} />
              <div class="text-left">
                <div class="text-[13px] font-semibold leading-4 text-ink">{c.name}</div>
                <div class="mt-0.5 text-[11px] leading-3.5 text-mute tabular-nums">
                  {interp(h.limitLabel, { n: nf.format(c.limit) })}
                </div>
              </div>
            </div>
            <Badge tone={c.tone} dot={false}>
              <HookStatusIcon status={c.icon} size={13} />
              {c.label}
            </Badge>
            <p class="mt-auto text-[12px] leading-[18px] text-body">{c.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
