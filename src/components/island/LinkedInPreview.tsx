/** @jsxImportSource preact */
import { linkedInHook, charCount, LIMITS } from '../../lib/textTools';
import {
  Card,
  CardHead,
  Badge,
  Segmented,
  Meter,
  BrandLogo,
  ToolLink,
  Avatar,
  VerifiedTick,
  Globe,
  ActionBar,
  MoreDots,
  PostCard,
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
}

/**
 * LinkedIn "Hook Zone" simulator. Highlights the text that survives above the
 * "…see more" fold (210 chars desktop / 140 mobile) and injects a non-clickable
 * bold "…see more" at the exact boundary when the post is truncated.
 */
export function LinkedInPreview({ text, view, setView, lang, s, toolLinkHref }: Props) {
  const l = s.linkedin;
  const nf = new Intl.NumberFormat(lang);
  const author = previewAuthor(s.common);
  const limit = view === 'mobile' ? LIMITS.LINKEDIN_MOBILE : LIMITS.LINKEDIN_DESKTOP;
  const { hook, rest, truncated } = linkedInHook(text, limit);
  const total = charCount(text);
  const isOverPostLimit = total > LIMITS.LINKEDIN_POST;
  const viewLabel = view === 'mobile' ? l.viewMobile : l.viewDesktop;

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
                {/* The portion that survives above the fold, subtly lit. */}
                <span class={truncated ? 'rounded-xs bg-cyan-soft/40' : ''}>
                  {hook}
                </span>
                {truncated && (
                  <span class="font-semibold text-mute" aria-label={l.seeMore}>
                    {l.seeMore}
                  </span>
                )}
                {/* Folded remainder, dimmed to show what readers must click for. */}
                {truncated && rest && (
                  <span class="text-mute/45 line-through decoration-hairline-strong/40">
                    {rest}
                  </span>
                )}
              </>
            ) : (
              <span class="text-mute">{l.placeholder}</span>
            )}
          </div>

          {/* Labeled reaction bar — Like / Comment / Share. */}
          <ActionBar
            items={[
              { icon: 'thumbsUp', label: s.common.actions.like },
              { icon: 'comment', label: s.common.actions.comment },
              { icon: 'share', label: s.common.actions.share },
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
