/** @jsxImportSource preact */
import {
  detectHashtags,
  hasFancyUnicode,
  countFancyUnicode,
  charCount,
  LIMITS,
} from '../../lib/textTools';
import { Card, CardHead, Badge, Meter, BrandLogo } from './ui';

interface Props {
  text: string;
}

/**
 * Instagram & Facebook formatting monitor. Tracks hashtag concentration against
 * Instagram's hard 30-tag ceiling and flags pseudo-Unicode "fancy fonts"
 * (𝖁𝖔𝖑𝖉 / 𝓢𝓬𝓻𝓲𝓹𝓽) that render as styled glyphs but are unreadable to
 * screen readers.
 */
export function MetaMonitor({ text }: Props) {
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
        title="Formatting monitor"
        logo={
          <span class="flex items-center gap-1.5">
            <BrandLogo brand="instagram" />
            <BrandLogo brand="facebook" />
          </span>
        }
      >
        {overTagLimit || fancy ? (
          <Badge tone={overTagLimit ? 'danger' : 'warn'}>Needs a fix</Badge>
        ) : (
          <Badge tone="safe">Looks clean</Badge>
        )}
      </CardHead>

      <div class="space-y-4 p-4 sm:p-5">
        {/* Hashtag concentration */}
        <div class="rounded-md border border-hairline bg-canvas p-4">
          <Meter
            value={Math.min(tagCount, LIMITS.INSTAGRAM_HASHTAGS)}
            max={LIMITS.INSTAGRAM_HASHTAGS}
            tone={tagTone}
            label="Hashtag concentration"
            caption={`${tagCount} / ${LIMITS.INSTAGRAM_HASHTAGS}`}
          />
          <p class="mt-2.5 text-[12px] leading-4 text-body">
            {overTagLimit ? (
              <span class="text-error-deep">
                Over Instagram’s hard limit of {LIMITS.INSTAGRAM_HASHTAGS}{' '}
                hashtags — the caption will fail to post. Remove{' '}
                {tagCount - LIMITS.INSTAGRAM_HASHTAGS}.
              </span>
            ) : tagCount > 20 ? (
              'Approaching the 30-tag ceiling. Trim to your highest-intent tags.'
            ) : tagCount > 0 ? (
              'Comfortably within Instagram’s 30-hashtag limit.'
            ) : (
              'No hashtags detected yet.'
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
              Accessibility · fancy fonts
            </span>
            {fancy ? (
              <Badge tone="warn">{fancyN} flagged</Badge>
            ) : (
              <Badge tone="safe">None</Badge>
            )}
          </div>
          <p class="mt-2 text-[12px] leading-4 text-body">
            {fancy ? (
              <span class="text-warning-deep">
                Detected {fancyN} pseudo-Unicode “font” character{fancyN > 1 ? 's' : ''}{' '}
                (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). These look styled but screen readers
                skip or spell them out — they hurt reach and accessibility.
              </span>
            ) : (
              'No pseudo-font characters detected. Your text reads cleanly on assistive tech.'
            )}
          </p>
        </div>

        <p class="font-mono text-[11px] text-mute tabular-nums">
          {charCount(text)} characters · Facebook fold ≈ 480 · Instagram caption
          cap 2,200
        </p>
      </div>
    </Card>
  );
}
