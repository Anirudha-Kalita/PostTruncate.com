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
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { charCount, sliceChars } from '../../lib/textTools';

interface Props {
  s: IslandStrings;
  primary: string;
  headline: string;
  description: string;
  device: 'mobile' | 'desktop';
  mediaUrl: string | null;
}

/**
 * Facebook Feed ad preview. Primary text truncates at 125 characters behind an
 * unclickable "… See More"; the headline honors the 27–40 character mobile
 * safe-zone; the link description caps at 30 characters and hides when a long
 * headline squeezes the mobile layout.
 */
export function FacebookFeedAd({ s, primary, headline, description, device, mediaUrl }: Props) {
  const ap = adPreviewStrings(s);
  const fb = AD_PLATFORM_CONFIG.facebook;
  const common = s.common;

  const primaryOver = charCount(primary) > fb.primaryTruncateChars;
  const primaryVisible = primaryOver ? sliceChars(primary, 0, fb.primaryTruncateChars) : primary;

  const isMobile = device === 'mobile';
  const headlineLen = charCount(headline);
  // A headline beyond the mobile safe-zone squeezes the layout and the link
  // description is dropped.
  const headlineSqueezed = isMobile && headlineLen > fb.headlineSafeMax;
  const descClamped =
    charCount(description) > fb.descriptionMax
      ? sliceChars(description, 0, fb.descriptionMax)
      : description;
  const showDescription = descClamped.trim().length > 0 && !headlineSqueezed;

  const hasInput = primary.trim() || headline.trim() || description.trim() || mediaUrl;
  const badgeTone: Tone = !hasInput ? 'neutral' : primaryOver ? 'warn' : 'safe';
  const badgeLabel = !hasInput ? ap.badgeFits : primaryOver ? ap.badgeTruncated : ap.badgeFits;

  const name = common.displayName;
  const frameWidth = isMobile ? 380 : 500;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="Facebook" title={ap.previewLabel}>
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
                  <span>{ap.sponsored}</span>
                  <span aria-hidden="true">·</span>
                  <Globe size={12} />
                </p>
              </div>
            }
            trailing={<MoreDots />}
          >
            {/* Primary text */}
            <p class="mt-2 whitespace-pre-wrap text-[14px] leading-5 text-ink">
              {primaryVisible ? (
                <>
                  {primaryVisible}
                  {primaryOver && <span class="text-mute">{fb.seeMoreLabel}</span>}
                </>
              ) : (
                <span class="text-mute">{ap.placeholders.primary}</span>
              )}
            </p>

            {/* Media */}
            {mediaUrl && (
              <div class="mt-3 overflow-hidden rounded-md border border-hairline">
                <FeedImage src={mediaUrl} maxRatio={1.25} />
              </div>
            )}

            {/* Link card: URL + headline + description */}
            <div class="mt-3 rounded-md border border-hairline bg-canvas-soft px-3 py-2.5">
              <p class="font-mono text-[11px] uppercase tracking-wide text-mute">posttruncate.com</p>
              <p class="mt-0.5 truncate text-[15px] font-semibold leading-5 text-ink">
                {headline.trim() || <span class="text-mute">{ap.placeholders.headline}</span>}
              </p>
              {showDescription && (
                <p class="mt-0.5 truncate text-[13px] leading-5 text-body">{descClamped}</p>
              )}
            </div>

            <ActionBar
              items={[
                { icon: 'thumbsUp', label: common.actions.like },
                { icon: 'comment', label: common.actions.comment },
                { icon: 'share', label: common.actions.share },
              ]}
            />
          </PostCard>
        </div>

        {headlineSqueezed && (
          <p class="w-full text-[12px] leading-4 text-warning-deep">
            Headline over {fb.headlineSafeMax} characters on mobile — the link description is hidden.
          </p>
        )}
      </div>
    </Card>
  );
}
