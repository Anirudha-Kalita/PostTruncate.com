/** @jsxImportSource preact */
import {
  Card,
  CardHead,
  Badge,
  PostCard,
  ActionBar,
  Avatar,
  FeedImage,
  MoreDots,
  Globe,
  monogram,
  type Tone,
} from './ui';
import type { ComponentChildren } from 'preact';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { charCount, sliceChars } from '../../lib/textTools';
import { resolveCta } from '../../lib/adTruncation';

interface Props {
  s: IslandStrings;
  /** Introductory ("intro") text — the body copy above the creative. */
  primary: string;
  /** Link-card headline beneath the image. */
  headline: string;
  device: 'mobile' | 'desktop';
  mediaUrl: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** Optional CTA label; resolves to the platform default when empty. */
  cta?: string;
  /** Optional controls rendered in the card heading, left of the status badge. */
  toolbar?: ComponentChildren;
}

/**
 * LinkedIn single-image Sponsored Content ad preview. Intro text folds behind an
 * inline "…more" at ~150 characters on desktop (a little earlier on mobile). The
 * in-feed ad card shows only the headline + CTA button — LinkedIn does NOT render
 * a destination domain on the card (unlike Facebook), and the optional
 * description field only surfaces on the LinkedIn Audience Network, never in the
 * main feed, so neither is drawn here.
 */
export function LinkedInAd({
  s,
  primary,
  headline,
  device,
  mediaUrl,
  mediaKind = 'image',
  cta,
  toolbar,
}: Props) {
  const ap = adPreviewStrings(s);
  const li = AD_PLATFORM_CONFIG.linkedin;
  const common = s.common;

  const isMobile = device === 'mobile';
  const introCap = isMobile ? li.introTruncateCharsMobile : li.introTruncateChars;
  const introOver = charCount(primary) > introCap;
  const introVisible = introOver ? sliceChars(primary, 0, introCap) : primary;

  const ctaLabel = resolveCta('linkedin', cta);

  const hasInput = primary.trim() || headline.trim() || mediaUrl;
  const badgeTone: Tone = !hasInput ? 'neutral' : introOver ? 'warn' : 'safe';
  const badgeLabel = !hasInput ? ap.badgeFits : introOver ? ap.badgeTruncated : ap.badgeFits;

  const name = common.displayName;
  const frameWidth = isMobile ? 380 : 552;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="LinkedIn" title={ap.previewLabel}>
        {toolbar}
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col items-center gap-2 p-4 sm:p-5">
        <div style={`width:100%;max-width:${frameWidth}px;`}>
          <PostCard
            layout="stacked"
            avatar={<Avatar initial={monogram(name)} />}
            identity={
              <div class="min-w-0">
                <p class="truncate text-[14px] font-semibold leading-5 text-ink">{name}</p>
                <p class="flex items-center gap-1 text-[12px] text-mute">
                  <span>{ap.promoted}</span>
                  <span aria-hidden="true">·</span>
                  <Globe size={12} />
                </p>
              </div>
            }
            trailing={<MoreDots />}
          >
            {/* Intro text */}
            <p class="mt-2 whitespace-pre-wrap break-words text-[14px] leading-5 text-ink">
              {introVisible ? (
                <>
                  {introVisible}
                  {introOver && <span class="text-mute">{li.seeMoreLabel}</span>}
                </>
              ) : (
                <span class="text-mute">{ap.placeholders.primary}</span>
              )}
            </p>

            {/* Media */}
            {mediaUrl && (
              <div class="mt-3 overflow-hidden rounded-md border border-hairline">
                <FeedImage src={mediaUrl} kind={mediaKind} maxRatio={1.25} />
              </div>
            )}

            {/* Headline + CTA strip — LinkedIn shows no domain or description here. */}
            <div class="mt-3 flex items-center justify-between gap-3 rounded-md border border-hairline bg-canvas-soft px-3 py-2.5">
              <p class="line-clamp-2 min-w-0 flex-1 break-words text-[14px] font-semibold leading-5 text-ink">
                {headline.trim() || <span class="text-mute">{ap.placeholders.headline}</span>}
              </p>
              {ctaLabel && (
                <span class="shrink-0 self-center rounded-pill border border-link px-3.5 py-1.5 text-[13px] font-semibold leading-4 text-link">
                  {ap.cta[ctaLabel] ?? ctaLabel}
                </span>
              )}
            </div>

            <ActionBar
              items={[
                { icon: 'thumbsUp', label: common.actions.like },
                { icon: 'comment', label: common.actions.comment },
                { icon: 'repost', label: common.actions.repost },
                { icon: 'send', label: common.actions.send },
              ]}
            />
          </PostCard>
        </div>
      </div>
    </Card>
  );
}
