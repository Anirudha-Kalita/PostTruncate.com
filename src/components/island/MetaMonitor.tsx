/** @jsxImportSource preact */
import {
  detectHashtags,
  hasFancyUnicode,
  countFancyUnicode,
  charCount,
  LIMITS,
} from '../../lib/textTools';
import { Card, CardHead, Badge, Meter, BrandLogo } from './ui';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
}

/**
 * Instagram & Facebook formatting monitor. Tracks hashtag concentration against
 * Instagram's hard 30-tag ceiling and flags pseudo-Unicode "fancy fonts"
 * (𝖁𝖔𝖑𝖉 / 𝓢𝓬𝓻𝓲𝓹𝓽) that render as styled glyphs but are unreadable to
 * screen readers.
 */
export function MetaMonitor({ text, lang, s }: Props) {
  const m = s.meta;
  const nf = new Intl.NumberFormat(lang);
  const hashtags = detectHashtags(text);
  const tagCount = hashtags.length;
  const overTagLimit = tagCount > LIMITS.INSTAGRAM_HASHTAGS;

  const fancy = hasFancyUnicode(text);
  const fancyN = countFancyUnicode(text);

  const tagTone = overTagLimit ? 'danger' : tagCount > 20 ? 'warn' : 'safe';

  return (
    <Card>
      <CardHead
        eyebrow="Instagram · Facebook"
        title={m.title}
        logo={
          <span class="flex items-center gap-1.5">
            <BrandLogo brand="instagram" />
            <BrandLogo brand="facebook" />
          </span>
        }
      >
        {overTagLimit || fancy ? (
          <Badge tone={overTagLimit ? 'danger' : 'warn'}>{m.badgeNeedsFix}</Badge>
        ) : (
          <Badge tone="safe">{m.badgeClean}</Badge>
        )}
      </CardHead>

      <div class="space-y-4 p-4 sm:p-5">
        {/* Hashtag concentration */}
        <div class="rounded-md border border-hairline bg-canvas p-4">
          <Meter
            value={Math.min(tagCount, LIMITS.INSTAGRAM_HASHTAGS)}
            max={LIMITS.INSTAGRAM_HASHTAGS}
            tone={tagTone}
            label={m.hashtagLabel}
            caption={`${nf.format(tagCount)} / ${nf.format(LIMITS.INSTAGRAM_HASHTAGS)}`}
          />
          <p class="mt-2.5 text-[12px] leading-4 text-body">
            {overTagLimit ? (
              <span class="text-error-deep">
                {interp(m.over, {
                  limit: nf.format(LIMITS.INSTAGRAM_HASHTAGS),
                  excess: nf.format(tagCount - LIMITS.INSTAGRAM_HASHTAGS),
                })}
              </span>
            ) : tagCount > 20 ? (
              m.approaching
            ) : tagCount > 0 ? (
              m.within
            ) : (
              m.none
            )}
          </p>
        </div>

        {/* Fancy-Unicode / pseudo-font alert */}
        <div
          class={`rounded-md border p-4 ${
            fancy
              ? 'border-warning/40 bg-warning-soft'
              : 'border-hairline bg-canvas'
          }`}
        >
          <div class="flex items-center justify-between">
            <span class="text-[13px] font-medium text-ink">
              {m.a11yLabel}
            </span>
            {fancy ? (
              <Badge tone="warn">{interp(m.flagged, { n: nf.format(fancyN) })}</Badge>
            ) : (
              <Badge tone="safe">{m.flaggedNone}</Badge>
            )}
          </div>
          <p class="mt-2 text-[12px] leading-4 text-body">
            {fancy ? (
              <span class="text-warning-deep">
                {interp(plural(m.fancyDetected, fancyN), { n: nf.format(fancyN) })}
              </span>
            ) : (
              m.fancyClean
            )}
          </p>
        </div>

        <p class="font-mono text-[11px] text-mute tabular-nums">
          {interp(m.footnote, { n: nf.format(charCount(text)) })}
        </p>
      </div>
    </Card>
  );
}
