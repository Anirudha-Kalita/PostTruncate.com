/** @jsxImportSource preact */
import { charCount, detectUrls, FOLDS, LIMITS, sliceChars, splitThread, IMAGE_RATIOS } from '../../lib/textTools';
import {
  Card,
  CardHead,
  Badge,
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
import type { IslandStrings } from '../../i18n/types';

type FeedView = 'desktop' | 'mobile';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
  /** Viewport state, lifted to Dashboard so the Hook Visibility panel can mirror it. */
  view: FeedView;
  setView: (v: FeedView) => void;
  /** Object URL of the attached preview media, or null when none. */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** When false, hide the dimmed below-the-fold remainder (show only "…more"). */
  showFolded?: boolean;
}

/**
 * Threads (by Meta) preview. A single post caps at 500 characters. The
 * validator keeps that full allowance, while the mock mobile card visually
 * folds one-block posts behind a "... more" affordance.
 */
export function ThreadsPreview({ text, lang, s, toolLinkHref, view, setView, image, mediaKind = 'image', showFolded = true }: Props) {
  const th = s.threads;
  const nf = new Intl.NumberFormat(lang);
  const author = previewAuthor(s.common);
  const trimmed = text.trim();
  const count = charCount(trimmed);
  const urls = detectUrls(trimmed);
  const posts = trimmed ? splitThread(trimmed, LIMITS.THREADS, charCount) : [];
  const isChain = posts.length > 1;
  // An image-only post is valid; render one empty post to carry it. The image
  // attaches to the first post of a chain.
  const displayPosts = posts.length === 0 && image ? [''] : posts;
  const visualFold = FOLDS.threads[view];

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
        {displayPosts.length === 0 ? (
          <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
            {interp(th.placeholder, { limit: nf.format(LIMITS.THREADS) })}
          </article>
        ) : (
          displayPosts.map((post, i) => (
            <PostCard
              layout="gutter"
              class={view === 'desktop' ? 'feed-phone--desktop' : ''}
              avatar={
                <div class="relative flex w-9 flex-col items-center self-stretch pb-1">
                  <div class="relative z-10 shrink-0 bg-canvas">
                    <Avatar
                      size="h-9 w-9"
                      gradient="from-grad-preview-start to-grad-ship-start"
                      initial={monogram(author.handle)}
                    />
                    <div class="absolute -right-1 -bottom-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-canvas">
                      <div class="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-ink text-canvas">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
                          <path d="M12 4v16M4 12h16" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* The vertical thread line, absolutely positioned to stretch */}
                  <div class="absolute top-[42px] bottom-[26px] w-[1.5px] rounded-full bg-hairline-strong" />
                  
                  {/* The 3 dots cluster, pushed to the bottom */}
                  <div class="relative mt-auto h-[18px] w-[18px] shrink-0 bg-canvas opacity-40">
                    <div class="absolute top-0 right-0 h-1 w-1 rounded-full bg-ink" />
                    <div class="absolute bottom-1 left-0 h-[5px] w-[5px] rounded-full bg-ink" />
                    <div class="absolute bottom-0 right-1.5 h-[3px] w-[3px] rounded-full bg-ink" />
                  </div>
                </div>
              }
              identity={
                <div class="flex items-center gap-1 text-[15px] font-semibold leading-5 text-ink">
                  <span class="truncate">{author.handle}</span>
                  {author.verified && <VerifiedTick size={14} class="shrink-0 text-link" />}
                </div>
              }
              trailing={
                <div class="flex items-center gap-2.5 text-mute">
                  <span class="text-[14px]">{author.timestamp}</span>
                  <MoreDots size={18} />
                </div>
              }
            >
              <ThreadsPostText
                post={post}
                visualFold={visualFold}
                seeMore={s.linkedin.seeMore}
                foldLabel={s.hook.foldLabel}
                foldAria={s.hook.foldAria}
                showFolded={showFolded}
              />

              {/* Single image on the first post — Threads' rounded frame; tall
                  portraits crop to 4:5, landscape/square show in full. */}
              {image && i === 0 && (
                <div class="mt-2 overflow-hidden rounded-xl border border-hairline">
                  <FeedImage src={image} kind={mediaKind} maxRatio={IMAGE_RATIOS.threads.max} />
                </div>
              )}

              {/* Native Threads engagement row: left aligned, tightly packed */}
              <div class="mt-3 flex items-center gap-4 text-ink">
                <Engagement icon="like" size={19} />
                <Engagement icon="comment" size={19} />
                <Engagement icon="repost" size={19} />
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>

              <div class="mt-2.5 flex items-center justify-between text-[14px] text-mute">
                <div class="flex items-center gap-1.5">
                  <span>123 replies</span>
                  <span>·</span>
                  <span>456 likes</span>
                </div>
                <div class="font-mono text-[11px] tabular-nums text-mute/70">
                  <span>{interp(s.common.charsSuffix, { n: nf.format(charCount(post)) })}</span>
                  {isChain && (
                    <span class="ml-2">{nf.format(i + 1)}/{nf.format(posts.length)}</span>
                  )}
                </div>
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
  foldLabel,
  foldAria,
  showFolded,
}: {
  post: string;
  visualFold: number;
  seeMore: string;
  foldLabel: string;
  foldAria: string;
  showFolded: boolean;
}) {
  const shouldFold = charCount(post) > visualFold;
  const visible = shouldFold ? sliceChars(post, 0, visualFold) : post;
  const hidden = shouldFold ? sliceChars(post, visualFold) : '';

  return (
    <p class="mt-2 whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
      {visible}
      {shouldFold && <span class="text-mute">{seeMore}</span>}
      {shouldFold && showFolded && <FoldMarker label={foldLabel} ariaLabel={foldAria} />}
      {shouldFold && showFolded && hidden && (
        <span class="text-mute/45 line-through decoration-hairline-strong/40">{hidden}</span>
      )}
    </p>
  );
}
