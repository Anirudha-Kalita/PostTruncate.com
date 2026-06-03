/** @jsxImportSource preact */
import {
  splitThread,
  weightedLength,
  detectUrls,
  charCount,
  LIMITS,
} from '../../lib/textTools';
import { Card, CardHead, Badge, Meter } from './ui';

interface Props {
  text: string;
}

/**
 * X / Twitter automated thread splitter. URLs count as a flat 23 chars toward
 * the 280 limit (t.co wrapping). When the post is over the limit, the engine
 * splits it into clean tweets — never mid-word — each tagged with an "n/total"
 * counter in the bottom-right corner.
 */
export function TwitterPreview({ text }: Props) {
  const trimmed = text.trim();
  const weighted = weightedLength(trimmed);
  const urls = detectUrls(trimmed);
  const tweets = splitThread(trimmed);
  const isThread = tweets.length > 1;

  return (
    <Card>
      <CardHead eyebrow="X / Twitter" title="Thread splitter">
        {!trimmed ? (
          <Badge tone="neutral" dot={false}>Idle</Badge>
        ) : isThread ? (
          <Badge tone="info">{tweets.length}-tweet thread</Badge>
        ) : (
          <Badge tone="safe">Single tweet</Badge>
        )}
      </CardHead>

      <div class="px-5 pt-4">
        <div class="flex items-center justify-between">
          <span class="text-[13px] text-body">
            {urls.length > 0
              ? `${urls.length} link${urls.length > 1 ? 's' : ''} · counted as ${LIMITS.URL_WEIGHT} each`
              : 'Weighted length'}
          </span>
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {weighted} / {LIMITS.TWEET}
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

      <div class="space-y-3 p-5">
        {tweets.length === 0 ? (
          <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
            Your tweet preview appears here. Go past {LIMITS.TWEET} characters and
            it auto-splits into a thread.
          </article>
        ) : (
          tweets.map((tweet, i) => (
            <article class="relative rounded-md border border-hairline bg-canvas p-4">
              <header class="flex items-center gap-2.5">
                <span class="h-8 w-8 shrink-0 rounded-full bg-linear-to-br from-grad-preview-start to-grad-preview-end" />
                <div class="min-w-0 leading-tight">
                  <span class="text-[13px] font-semibold text-ink">Your Name</span>
                  <span class="ml-1 text-[12px] text-mute">@you</span>
                </div>
              </header>
              <p class="mt-2 whitespace-pre-wrap text-[14px] leading-[21px] text-ink">
                {tweet}
              </p>
              {isThread && (
                <span class="absolute bottom-3 right-4 font-mono text-[11px] text-mute tabular-nums">
                  {i + 1}/{tweets.length}
                </span>
              )}
              <span class="mt-2 block font-mono text-[11px] text-mute/70 tabular-nums">
                {charCount(tweet)} chars
              </span>
            </article>
          ))
        )}
      </div>
    </Card>
  );
}
