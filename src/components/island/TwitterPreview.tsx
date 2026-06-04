/** @jsxImportSource preact */
import {
  splitThread,
  weightedLength,
  detectUrls,
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
 * X / Twitter automated thread splitter. URLs count as a flat 23 chars toward
 * the 280 limit (t.co wrapping). When the post is over the limit, the engine
 * splits it into clean tweets — never mid-word — each tagged with an "n/total"
 * counter in the bottom-right corner.
 */
export function TwitterPreview({ text, lang, s }: Props) {
  const tw = s.twitter;
  const nf = new Intl.NumberFormat(lang);
  const trimmed = text.trim();
  const weighted = weightedLength(trimmed);
  const urls = detectUrls(trimmed);
  const tweets = splitThread(trimmed);
  const isThread = tweets.length > 1;

  return (
    <Card>
      <CardHead
        eyebrow="X"
        title={tw.title}
        logo={<BrandLogo brand="x" />}
      >
        {!trimmed ? (
          <Badge tone="neutral" dot={false}>{tw.badgeIdle}</Badge>
        ) : isThread ? (
          <Badge tone="info">{interp(tw.badgeThread, { n: nf.format(tweets.length) })}</Badge>
        ) : (
          <Badge tone="safe">{tw.badgeSingle}</Badge>
        )}
      </CardHead>

      <div class="px-4 pt-4 sm:px-5">
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span class="text-[13px] text-body">
            {urls.length > 0
              ? interp(plural(tw.links, urls.length), {
                  n: nf.format(urls.length),
                  weight: nf.format(LIMITS.URL_WEIGHT),
                })
              : tw.weightedLength}
          </span>
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {nf.format(weighted)} / {nf.format(LIMITS.TWEET)}
          </span>
        </div>
        <div class="mt-3">
          <Meter
            value={Math.min(weighted, LIMITS.TWEET)}
            max={LIMITS.TWEET}
            tone={weighted > LIMITS.TWEET ? 'info' : weighted > LIMITS.TWEET * 0.9 ? 'warn' : 'safe'}
          />
        </div>
      </div>

      <div class="space-y-3 p-4 sm:p-5">
        {tweets.length === 0 ? (
          <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
            {interp(tw.placeholder, { limit: nf.format(LIMITS.TWEET) })}
          </article>
        ) : (
          tweets.map((tweet, i) => (
            <article class="relative rounded-md border border-hairline bg-canvas p-4">
              <header class="flex items-center gap-2.5">
                <span class="h-8 w-8 shrink-0 rounded-full bg-linear-to-br from-grad-preview-start to-grad-preview-end" />
                <div class="min-w-0 leading-tight">
                  <span class="text-[13px] font-semibold text-ink">{s.common.profileName}</span>
                  <span class="ml-1 text-[12px] text-mute">{s.common.handle}</span>
                </div>
              </header>
              <p class="mt-2 whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
                {tweet}
              </p>
              {isThread && (
                <span class="absolute bottom-3 right-4 font-mono text-[11px] text-mute tabular-nums">
                  {nf.format(i + 1)}/{nf.format(tweets.length)}
                </span>
              )}
              <span class="mt-2 block font-mono text-[11px] text-mute/70 tabular-nums">
                {interp(s.common.charsSuffix, { n: nf.format(weightedLength(tweet)) })}
              </span>
            </article>
          ))
        )}
      </div>
    </Card>
  );
}
