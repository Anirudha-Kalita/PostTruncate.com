/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import { charCount, detectUrls, LIMITS, sliceChars, splitThread } from '../../lib/textTools';
import {
  Card,
  CardHead,
  Badge,
  Segmented,
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

type FeedView = 'desktop' | 'mobile';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
}

const THREADS_DESKTOP_FOLD = LIMITS.THREADS;
const THREADS_MOBILE_FOLD = 250;

/**
 * Threads (by Meta) preview. A single post caps at 500 characters. The
 * validator keeps that full allowance, while the mock mobile card visually
 * folds one-block posts behind a "... more" affordance.
 */
export function ThreadsPreview({ text, lang, s, toolLinkHref }: Props) {
  const th = s.threads;
  const nf = new Intl.NumberFormat(lang);
  const author = previewAuthor(s.common);
  const [view, setView] = useState<FeedView>('mobile');
  const trimmed = text.trim();
  const count = charCount(trimmed);
  const urls = detectUrls(trimmed);
  const posts = trimmed ? splitThread(trimmed, LIMITS.THREADS, charCount) : [];
  const isChain = posts.length > 1;
  const visualFold =
    view === 'mobile' ? THREADS_MOBILE_FOLD : THREADS_DESKTOP_FOLD;

  return (
    <Card>
      <CardHead
        eyebrow="Threads"
        title={th.title}
        logo={<BrandLogo brand="threads" />}
      >
          <Segmented<FeedView>
          ariaLabel={`${th.title} ${s.linkedin.viewAriaLabel}`}
          value={view}
          onChange={setView}
          options={[
            { value: 'desktop', label: s.linkedin.viewDesktop },
            { value: 'mobile', label: s.linkedin.viewMobile },
          ]}
        />
      </CardHead>

      <div class="px-4 pt-4 sm:px-5">
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {!trimmed ? (
            <Badge tone="neutral" dot={false}>{th.badgeIdle}</Badge>
          ) : isChain ? (
            <Badge tone="info">{interp(th.badgeThread, { n: nf.format(posts.length) })}</Badge>
          ) : (
            <Badge tone="safe">{th.badgeSingle}</Badge>
          )}
          <span class="text-[13px] text-body">
            {urls.length > 0
              ? interp(plural(th.links, urls.length), { n: nf.format(urls.length) })
              : th.charLength}
          </span>
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {nf.format(count)} / {nf.format(LIMITS.THREADS)}
          </span>
        </div>
      </div>

      <div class="space-y-3 p-4 sm:p-5">
        {posts.length === 0 ? (
          <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
            {interp(th.placeholder, { limit: nf.format(LIMITS.THREADS) })}
          </article>
        ) : (
          posts.map((post, i) => (
            <PostCard
              layout="gutter"
              class={view === 'desktop' ? 'feed-phone--desktop' : ''}
              avatar={
                <Avatar
                  size="h-9 w-9"
                  gradient="from-grad-preview-start to-grad-ship-start"
                  initial={monogram(author.handle)}
                />
              }
              identity={
                /* Threads: username + tick + timestamp (no separate display name). */
                <div class="flex items-center gap-1 text-[14px] leading-5">
                  <span class="flex min-w-0 items-center gap-1">
                    <span class="truncate font-semibold text-ink">{author.handle}</span>
                    {author.verified && <VerifiedTick size={14} class="shrink-0 text-link" />}
                  </span>
                  <span class="shrink-0 text-mute" aria-hidden="true">·</span>
                  <span class="shrink-0 text-mute">{author.timestamp}</span>
                </div>
              }
              trailing={<MoreDots size={16} />}
            >
              <ThreadsPostText
                post={post}
                visualFold={visualFold}
                seeMore={s.linkedin.seeMore}
              />

              {/* Lighter-than-X engagement row: like / comment / repost / share. */}
              <div class="mt-3 flex max-w-[230px] items-center justify-between text-mute/45">
                <Engagement icon="like" size={17} />
                <Engagement icon="comment" size={17} />
                <Engagement icon="repost" size={17} />
                <Engagement icon="share" size={17} />
              </div>

              <div class="mt-2 flex items-center justify-between font-mono text-[11px] text-mute/70 tabular-nums">
                <span>{interp(s.common.charsSuffix, { n: nf.format(charCount(post)) })}</span>
                {isChain && (
                  <span>{nf.format(i + 1)}/{nf.format(posts.length)}</span>
                )}
              </div>
            </PostCard>
          ))
        )}
      </div>
      {toolLinkHref && <ToolLink href={toolLinkHref}>{s.toolLinks.threads}</ToolLink>}
    </Card>
  );
}

function ThreadsPostText({
  post,
  visualFold,
  seeMore,
}: {
  post: string;
  visualFold: number;
  seeMore: string;
}) {
  const shouldFold = charCount(post) > visualFold;
  const visible = shouldFold ? sliceChars(post, 0, visualFold) : post;

  return (
    <p class="mt-2 whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
      {visible}
      {shouldFold && <span class="text-mute">{seeMore}</span>}
    </p>
  );
}
