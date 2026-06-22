/** @jsxImportSource preact */
import { linkedInHook, charCount, LIMITS, IMAGE_RATIOS, extractLinkData } from '../../lib/textTools';
import { LivePreviewCard } from './LivePreviewCard';
import {
  Card,
  CardHead,
  Badge,
  Segmented,
  Meter,
  FoldMarker,
  FeedImage,
  BrandLogo,
  ToolLink,
  Avatar,
  VerifiedTick,
  Globe,
  ActionBar,
  Engagement,
  MoreDots,
  PostCard,
  LinkText,
  previewAuthor,
  monogram,
} from './ui';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

export type LinkedInView = 'desktop' | 'mobile';

interface Props {
  text: string;
  view: LinkedInView;
  setView: (v: LinkedInView) => void;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
  /** Object URL of the attached preview media, or null when none. */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** When false, hide the dimmed below-the-fold remainder (show only "…more"). */
  showFolded?: boolean;
  /** User-edited Card_Title for the link-preview card (optional). */
  cardTitle?: string;
  /** User-edited Card_Description for the link-preview card (optional). */
  cardDescription?: string;
  /** Independent link-card image (defaults to the site OG image), separate from the post media. */
  cardImage?: string | null;
}

/**
 * LinkedIn "Hook Zone" simulator. Highlights the text that survives above the
 * "…see more" fold (210 chars desktop / 140 mobile) and injects a non-clickable
 * bold "…see more" at the exact boundary when the post is truncated.
 */
export function LinkedInPreview({ text, view, setView, lang, s, toolLinkHref, image, mediaKind = 'image', showFolded = true, cardTitle, cardDescription, cardImage }: Props) {
  const l = s.linkedin;
  const nf = new Intl.NumberFormat(lang);
  const author = previewAuthor(s.common);
  const limit = view === 'mobile' ? LIMITS.LINKEDIN_MOBILE : LIMITS.LINKEDIN_DESKTOP;
  const { hook, rest, truncated } = linkedInHook(text, limit);
  const total = charCount(text);
  const isOverPostLimit = total > LIMITS.LINKEDIN_POST;
  const viewLabel = view === 'mobile' ? l.viewMobile : l.viewDesktop;

  // Link-card simulation (Requirement 9): the counters/badge/meter above keep
  // measuring the FULL `text`. LinkedIn keeps the pasted URL inline as blue
  // clickable text (it does NOT drop it from the body), so the body renders the
  // full text and the URL is highlighted in place via <LinkText> — never cut.
  const linkData = extractLinkData(text, 'linkedin');
  const showCard = linkData.firstUrl !== undefined;

  return (
    <Card>
      <CardHead
        eyebrow="LinkedIn"
        title={l.title}
        logo={<BrandLogo brand="linkedin" />}
      >
        <Segmented<LinkedInView>
          ariaLabel={l.viewAriaLabel}
          value={view}
          onChange={setView}
          options={[
            { value: 'desktop', label: l.viewDesktop },
            { value: 'mobile', label: l.viewMobile },
          ]}
        />
      </CardHead>

      <div class="px-4 pt-4 sm:px-5">
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {isOverPostLimit ? (
            <Badge tone="danger">{l.badgeOverLimit}</Badge>
          ) : truncated ? (
            <Badge tone="warn">{l.badgeTruncated}</Badge>
          ) : (
            <Badge tone="safe">{l.badgeSafe}</Badge>
          )}
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {isOverPostLimit
              ? interp(l.postLimit, {
                  total: nf.format(total),
                  limit: nf.format(LIMITS.LINKEDIN_POST),
                })
              : interp(l.beforeFold, { total: nf.format(total), limit: nf.format(limit) })}
          </span>
        </div>
        <div class="mt-3">
          <Meter
            value={Math.min(total, isOverPostLimit ? LIMITS.LINKEDIN_POST : limit)}
            max={isOverPostLimit ? LIMITS.LINKEDIN_POST : limit}
            tone={isOverPostLimit ? 'danger' : truncated ? 'warn' : 'safe'}
          />
        </div>
      </div>

      {/* Feed mockup */}
      <div class="p-4 sm:p-5">
        <PostCard
          layout="stacked"
          class={view === 'desktop' ? 'feed-phone--desktop' : ''}
          avatar={
            <Avatar
              size="h-12 w-12"
              gradient="from-grad-develop-start to-grad-preview-start"
              initial={monogram(author.displayName)}
            />
          }
          identity={
            <div class="leading-tight">
              {/* Name • connection degree */}
              <div class="flex items-center gap-1">
                <span class="truncate text-[14px] font-semibold text-ink">{author.displayName}</span>
                {author.verified && <VerifiedTick size={14} class="shrink-0 text-link" />}
                <span class="shrink-0 text-[12px] text-mute">• {l.connectionDegree}</span>
              </div>
              {/* Headline / subtitle */}
              <p class="truncate text-[12px] text-mute">{l.headline}</p>
              {/* Timestamp + public globe */}
              <p class="mt-0.5 flex items-center gap-1 text-[12px] text-mute">
                {author.timestamp}
                <span aria-hidden="true">·</span>
                <Globe size={12} />
              </p>
            </div>
          }
          trailing={<MoreDots size={16} />}
        >
          <div class="mt-3 whitespace-pre-wrap break-words text-[14px] leading-[22px] text-ink">
            {text ? (
              <>
                {/* The portion that survives above the fold, subtly lit. Any URL
                    in it is shown in link-blue, kept in place (not cut). */}
                <span class={truncated ? 'rounded-xs bg-cyan-soft/40' : ''}>
                  <LinkText text={hook} />
                </span>
                {truncated && (
                  <span class="font-semibold text-mute" aria-label={l.seeMore}>
                    {l.seeMore}
                  </span>
                )}
                {/* Explicit fold line: everything below is hidden in-feed. */}
                {truncated && showFolded && (
                  <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />
                )}
                {/* Folded remainder, dimmed to show what readers must click for. */}
                {truncated && showFolded && rest && (
                  <span class="text-mute/45 line-through decoration-hairline-strong/40">
                    {rest}
                  </span>
                )}
              </>
            ) : (
              /* Image-only posts are valid on LinkedIn, so drop the placeholder
                 prompt when an image carries the post. */
              !image && <span class="text-mute">{l.placeholder}</span>
            )}
          </div>

          {/* Full-bleed image — caption sits above, exactly as in-feed. LinkedIn
              shows up to 4:5 (h/w 1.25) in full and crops taller uploads. */}
          {image && (
            <div class="-mx-4 mt-3">
              <FeedImage src={image} kind={mediaKind} maxRatio={IMAGE_RATIOS.linkedin.max} />
            </div>
          )}

          {/* Open Graph link-card simulation — view-only, rendered when a URL is
              present. Counters above are unaffected (Requirement 9.4). */}
          {showCard && (
            <LivePreviewCard
              platform="linkedin"
              text={text}
              cardTitle={cardTitle}
              cardDescription={cardDescription}
              image={cardImage}
              mediaKind="image"
              lang={lang}
              s={s}
            />
          )}

          {/* Social proof — reaction bubbles + count on the left, comments ·
              reposts on the right. LinkedIn shows this between the post content
              and the action bar. */}
          <div class="mt-3 flex items-center justify-between text-[13px] text-mute">
            <div class="flex items-center gap-1.5">
              <span class="flex -space-x-1" aria-hidden="true">
                <span class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-link text-on-primary ring-1 ring-canvas">
                  <Engagement icon="thumbsUp" size={11} />
                </span>
                <span class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-error text-on-primary ring-1 ring-canvas">
                  <Engagement icon="like" size={11} />
                </span>
              </span>
              <span>{nf.format(1200)}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span>{interp(s.meta.commentsCount, { n: nf.format(89) })}</span>
              <span aria-hidden="true">·</span>
              <span>{interp(s.meta.repostsCount, { n: nf.format(17) })}</span>
            </div>
          </div>

          {/* Labeled action bar — Like / Comment / Repost / Send. */}
          <ActionBar
            items={[
              { icon: 'thumbsUp', label: s.common.actions.like },
              { icon: 'comment', label: s.common.actions.comment },
              { icon: 'repost', label: s.common.actions.repost },
              { icon: 'send', label: s.common.actions.send },
            ]}
          />
        </PostCard>

        <p class="mt-3 text-[12px] leading-4 text-body">
          {isOverPostLimit
            ? interp(l.overLimitNote, {
                limit: nf.format(LIMITS.LINKEDIN_POST),
                excess: nf.format(total - LIMITS.LINKEDIN_POST),
              })
            : truncated
            ? interp(l.truncatedNote, { limit: nf.format(limit) })
            : interp(l.safeNote, { view: viewLabel })}
        </p>
      </div>

      {toolLinkHref && <ToolLink href={toolLinkHref}>{s.toolLinks.linkedin}</ToolLink>}
    </Card>
  );
}
