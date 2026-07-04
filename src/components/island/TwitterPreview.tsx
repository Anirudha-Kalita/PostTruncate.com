/** @jsxImportSource preact */
import { Fragment } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import {
  splitThread,
  weightedLength,
  detectUrls,
  charCount,
  sliceChars,
  twitterFoldIndex,
  LIMITS,
  IMAGE_RATIOS,
} from '../../lib/textTools';
import {
  Card,
  CardHead,
  Badge,
  Meter,
  Segmented,
  FoldMarker,
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
import type { ComponentChildren } from 'preact';
import type { IslandStrings } from '../../i18n/types';

type Tier = 'free' | 'premium';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
  /** Object URL of the attached preview media, or null when none. */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** When false (the default), the Premium fold marker + hidden remainder are
   *  not rendered — only the "…Show more" affordance. Mirrors the other previews. */
  showFolded?: boolean;
  /** Optional Share_Link action pinned to the top-right of the card header. */
  share?: ComponentChildren;
}

/**
 * X / Twitter preview with two account tiers:
 *
 *  - Free (default): automated thread splitter. URLs count as a flat 23 chars
 *    toward the 280 limit (t.co wrapping); over the limit the engine splits the
 *    draft into clean tweets — never mid-word — each tagged "n/total".
 *  - Premium: a single long-form post up to 25,000 weighted characters. The
 *    timeline still shows only the first ~280 before a "Show more" link, so the
 *    preview folds at exactly that point (twitterFoldIndex) instead of threading.
 */
export function TwitterPreview({ text, lang, s, toolLinkHref, image, mediaKind = 'image', showFolded = true, share }: Props) {
  const tw = s.twitter;
  const nf = new Intl.NumberFormat(lang);
  // Compact, locale-correct thousands for the tier toggle labels — e.g. en "25K",
  // de "25.000", fr "25 k", ja/zh "2.5万", da "25 t". Keeps the number properly
  // localized instead of a hardcoded "25k" in every language.
  const compactNf = new Intl.NumberFormat(lang, { notation: 'compact', compactDisplay: 'short' });
  const author = previewAuthor(s.common);
  const initial = monogram(author.displayName);
  const trimmed = text.trim();

  const [tier, setTier] = useState<Tier>('free');
  const isPremium = tier === 'premium';
  const cap = isPremium ? LIMITS.TWEET_PREMIUM : LIMITS.TWEET;

  // Memoized on the post text: splitThread is the expensive (superlinear) call,
  // so it must not re-run on unrelated re-renders (e.g. a tier/fold toggle
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
  const overCap = weighted > cap;
  // An image alone (no text) is still a valid post, so render one empty tweet
  // to carry it. The image always attaches to the first tweet of a thread.
  const displayTweets = tweets.length === 0 && image ? [''] : tweets;

  // Premium timeline fold: the grapheme index where the weighted length first
  // passes 280 (the "Show more" cut). Reuses the shared twitterFoldIndex so the
  // fold point matches the free-tier per-tweet boundary exactly.
  const premiumFoldAt = twitterFoldIndex(trimmed);
  const premiumFolded = premiumFoldAt < charCount(trimmed);
  const premiumVisible = premiumFolded ? sliceChars(trimmed, 0, premiumFoldAt) : trimmed;
  const premiumHidden = premiumFolded ? sliceChars(trimmed, premiumFoldAt) : '';

  // X's blue checkmark denotes a paid Premium/Premium+ subscription (since 2023 it
  // no longer means identity verification). Long-form posts are a Premium-only
  // feature, so the badge appears in Premium mode; a free/Basic account shows none.
  const showVerified = isPremium;

  // Static post chrome shared by both tiers — identical markup, so the free-tier
  // output is unchanged and the premium card reuses it rather than duplicating.
  const identity = (
    /* Name line: name · Premium check · @handle · timestamp */
    <div class="flex items-center gap-1 text-[14px] leading-5">
      <span class="flex min-w-0 items-center gap-1">
        <span class="truncate font-semibold text-ink">{author.displayName}</span>
        {showVerified && <VerifiedTick size={15} class="shrink-0 text-link" />}
      </span>
      <span class="shrink-0 text-mute">@{author.handle}</span>
      <span class="shrink-0 text-mute" aria-hidden="true">·</span>
      <span class="shrink-0 text-mute">{author.timestamp}</span>
    </div>
  );

  const engagement = (
    /* Engagement row — reply / repost / like / views with inline counts, then
       bookmark + share pushed to the right, exactly as on X. Counts are mock
       display values; X has no text labels. */
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
  );

  return (
    <Card>
      <CardHead
        eyebrow="X"
        title={tw.title}
        logo={<BrandLogo brand="x" />}
        share={share}
      >
        <div class="flex items-center gap-2">
          <Segmented<Tier>
            ariaLabel={`${tw.title} ${s.linkedin.viewAriaLabel}`}
            value={tier}
            onChange={setTier}
            options={[
              { value: 'free', label: interp(tw.modeFree, { limit: compactNf.format(LIMITS.TWEET) }) },
              { value: 'premium', label: interp(tw.modePremium, { limit: compactNf.format(LIMITS.TWEET_PREMIUM) }) },
            ]}
          />
          {!trimmed ? (
            <Badge tone="neutral" dot={false}>{tw.badgeIdle}</Badge>
          ) : isPremium ? (
            <Badge tone={overCap ? 'danger' : 'info'}>{tw.badgePremium}</Badge>
          ) : isThread ? (
            <Badge tone="info">{interp(tw.badgeThread, { n: nf.format(tweets.length) })}</Badge>
          ) : (
            <Badge tone="safe">{tw.badgeSingle}</Badge>
          )}
        </div>
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
            {nf.format(weighted)} / {nf.format(cap)}
          </span>
        </div>
        <div class="mt-3">
          <Meter
            value={Math.min(weighted, cap)}
            max={cap}
            tone={overCap ? (isPremium ? 'danger' : 'info') : weighted > cap * 0.9 ? 'warn' : 'safe'}
          />
        </div>
        {isPremium && premiumFolded && (
          <p class="mt-2 text-[12px] text-mute">
            {interp(tw.premiumHint, { limit: nf.format(LIMITS.TWEET_PREMIUM) })}
          </p>
        )}
      </div>

      <div class="space-y-3 p-4 sm:p-5">
        {isPremium ? (
          // ── Premium: one long-form post, folded at the 280-char "Show more". ──
          !trimmed && !image ? (
            <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
              {interp(tw.placeholder, { limit: nf.format(LIMITS.TWEET) })}
            </article>
          ) : (
            <PostCard
              layout="gutter"
              avatar={<Avatar size="h-10 w-10" initial={initial} />}
              identity={identity}
              trailing={<MoreDots size={16} />}
            >
              <p class="mt-1 whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
                {premiumVisible}
                {premiumFolded && <span class="font-semibold text-link"> …{tw.showMore}</span>}
                {premiumFolded && showFolded && <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />}
                {premiumFolded && showFolded && premiumHidden && (
                  <span class="text-mute line-through">{premiumHidden}</span>
                )}
              </p>

              {image && (
                <div class="mt-3 overflow-hidden rounded-2xl border border-hairline">
                  <FeedImage src={image} kind={mediaKind} maxRatio={IMAGE_RATIOS.twitter.max} />
                </div>
              )}

              {engagement}

              {/* Tool annotation: weighted length of the full long-form post. */}
              <div class="mt-2 font-mono text-[11px] text-mute/70 tabular-nums">
                {interp(s.common.charsSuffix, { n: nf.format(weighted) })}
              </div>
            </PostCard>
          )
        ) : displayTweets.length === 0 ? (
          <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
            {interp(tw.placeholder, { limit: nf.format(LIMITS.TWEET) })}
          </article>
        ) : (
          displayTweets.map((tweet, i) => (
            <Fragment key={i}>
            <PostCard
              layout="gutter"
              avatar={<Avatar size="h-10 w-10" initial={initial} />}
              identity={identity}
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

              {engagement}

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
