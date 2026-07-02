/** @jsxImportSource preact */
import { Fragment } from 'preact';
import { useMemo } from 'preact/hooks';
import {
  splitThread,
  weightedLength,
  detectUrls,
  LIMITS,
  IMAGE_RATIOS,
} from '../../lib/textTools';
import {
  Card,
  CardHead,
  Badge,
  Meter,
  FeedImage,
  BrandLogo,
  ToolLink,
  Avatar,
  VerifiedTick,
  Engagement,
  MoreDots,
  PostCard,
  previewAuthor,
  monogram,
} from './ui';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
  /** Object URL of the attached preview media, or null when none. */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
}

/**
 * X / Twitter automated thread splitter. URLs count as a flat 23 chars toward
 * the 280 limit (t.co wrapping). When the post is over the limit, the engine
 * splits it into clean tweets — never mid-word — each tagged with an "n/total"
 * counter in the bottom-right corner.
 */
export function TwitterPreview({ text, lang, s, toolLinkHref, image, mediaKind = 'image' }: Props) {
  const tw = s.twitter;
  const nf = new Intl.NumberFormat(lang);
  const author = previewAuthor(s.common);
  const initial = monogram(author.displayName);
  const trimmed = text.trim();
  // Memoized on the post text: splitThread is the expensive (superlinear) call,
  // so it must not re-run on unrelated re-renders (e.g. a fold/view toggle
  // elsewhere in the dashboard). It only recomputes when `trimmed` changes.
  const { weighted, urls, tweets } = useMemo(
    () => ({
      weighted: weightedLength(trimmed),
      urls: detectUrls(trimmed),
      tweets: splitThread(trimmed),
    }),
    [trimmed],
  );
  const isThread = tweets.length > 1;
  // An image alone (no text) is still a valid post, so render one empty tweet
  // to carry it. The image always attaches to the first tweet of a thread.
  const displayTweets = tweets.length === 0 && image ? [''] : tweets;

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
        {displayTweets.length === 0 ? (
          <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
            {interp(tw.placeholder, { limit: nf.format(LIMITS.TWEET) })}
          </article>
        ) : (
          displayTweets.map((tweet, i) => (
            <Fragment key={i}>
            <PostCard
              layout="gutter"
              avatar={<Avatar size="h-10 w-10" initial={initial} />}
              identity={
                /* Name line: name · tick · @handle · timestamp */
                <div class="flex items-center gap-1 text-[14px] leading-5">
                  <span class="flex min-w-0 items-center gap-1">
                    <span class="truncate font-semibold text-ink">{author.displayName}</span>
                    {author.verified && <VerifiedTick size={15} class="shrink-0 text-link" />}
                  </span>
                  <span class="shrink-0 text-mute">@{author.handle}</span>
                  <span class="shrink-0 text-mute" aria-hidden="true">·</span>
                  <span class="shrink-0 text-mute">{author.timestamp}</span>
                </div>
              }
              trailing={<MoreDots size={16} />}
            >
              <p class="mt-1 whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
                {tweet}
              </p>

              {/* Single image rides the first tweet, in X's rounded 16:9-leaning
                  frame. Wide/square show fully; tall portraits crop. */}
              {image && i === 0 && (
                <div class="mt-3 overflow-hidden rounded-2xl border border-hairline">
                  <FeedImage src={image} kind={mediaKind} maxRatio={IMAGE_RATIOS.twitter.max} />
                </div>
              )}

              {/* Engagement row — reply / repost / like / views with inline
                  counts, then bookmark + share pushed to the right, exactly as
                  on X. Counts are mock display values; X has no text labels. */}
              <div class="mt-3 flex items-center justify-between text-[13px] text-mute/70">
                <div class="flex flex-1 items-center justify-between pr-6">
                  <span class="flex items-center gap-1.5">
                    <Engagement icon="reply" size={18} />
                    {nf.format(12)}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <Engagement icon="repost" size={18} />
                    {nf.format(8)}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <Engagement icon="like" size={18} />
                    {nf.format(124)}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <Engagement icon="views" size={18} />
                    {nf.format(3400)}
                  </span>
                </div>
                <div class="flex items-center gap-4">
                  <Engagement icon="save" size={18} />
                  <Engagement icon="share" size={18} />
                </div>
              </div>

              {/* Tool annotations: per-tweet char weight + thread position. */}
              <div class="mt-2 flex items-center justify-between font-mono text-[11px] text-mute/70 tabular-nums">
                <span>{interp(s.common.charsSuffix, { n: nf.format(weightedLength(tweet)) })}</span>
                {isThread && (
                  <span>{nf.format(i + 1)}/{nf.format(tweets.length)}</span>
                )}
              </div>
            </PostCard>
            </Fragment>
          ))
        )}
      </div>
      {toolLinkHref && <ToolLink href={toolLinkHref}>{s.toolLinks.twitter}</ToolLink>}
    </Card>
  );
}
