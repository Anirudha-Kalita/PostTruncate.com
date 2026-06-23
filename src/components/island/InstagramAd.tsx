/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { Card, CardHead, Badge, Avatar, MoreDots, Engagement, CoverMedia, monogram, type Tone } from './ui';
import { SafeZoneOverlay } from './SafeZoneOverlay';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { charCount, sliceChars } from '../../lib/textTools';
import { clampDisplayLink, deriveDisplayLink, instagramReelsFit, resolveCta } from '../../lib/adTruncation';
import { interp } from '../../i18n/interp';

interface Props {
  s: IslandStrings;
  caption: string;
  mode: 'feed' | 'reels';
  safeZone: boolean;
  mediaUrl: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** Optional Meta ad destination URL; the display link is derived from it. */
  destinationUrl?: string;
  /** Optional CTA label; resolves to the platform default when empty. */
  cta?: string;
  /** Optional controls rendered in the card heading, left of the status badge. */
  toolbar?: ComponentChildren;
}

/**
 * Instagram ad preview. Feed mode reuses the 125-character "… more" caption
 * fold; Reels mode enforces the tighter 40–72 character window and overlays the
 * safe zones (bottom profile band + right action stack) so caption/creative
 * collisions are visible.
 */
export function InstagramAd({ s, caption, mode, safeZone, mediaUrl, mediaKind = 'image', destinationUrl, cta, toolbar }: Props) {
  const ap = adPreviewStrings(s);
  const ig = AD_PLATFORM_CONFIG.instagram;
  const common = s.common;
  const name = common.handle;

  const isReels = mode === 'reels';

  // Feed: fold at 125 chars with "… more". Reels: 40–72 window.
  const feedOver = charCount(caption) > ig.feedTruncateChars;
  const feedVisible = feedOver ? sliceChars(caption, 0, ig.feedTruncateChars) : caption;
  const reels = instagramReelsFit(caption);

  // Meta ad CTA + display link (additive). CTA resolves to the requested label
  // or the platform default; the display link is the clamped destination domain
  // (omitted when empty — Instagram has no mock-domain fallback).
  const ctaLabel = resolveCta('instagram', cta);
  const displayLink = clampDisplayLink(
    destinationUrl?.trim() ? deriveDisplayLink(destinationUrl) : '',
    'instagram',
  ).text;

  const truncated = isReels ? reels.truncated : feedOver;
  const hasInput = caption.trim() || mediaUrl;
  const badgeTone: Tone = !hasInput ? 'neutral' : truncated ? 'warn' : 'safe';
  const badgeLabel = !hasInput ? ap.badgeFits : truncated ? ap.badgeTruncated : ap.badgeFits;

  const frameAspect = isReels ? '9 / 16' : '1 / 1';

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="Instagram" title={ap.previewLabel}>
        {toolbar}
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col items-center gap-2 p-4 sm:p-5">
        <div style="width:100%;max-width:360px;">
          {/* Header */}
          <div class="flex items-center gap-2 pb-2">
            <Avatar size="h-8 w-8" initial={monogram(name)} />
            <div class="min-w-0 flex-1">
              <p class="truncate text-[13px] font-semibold leading-4 text-ink">{name}</p>
              <p class="text-[11px] text-mute">{ap.sponsored}</p>
            </div>
            <MoreDots />
          </div>

          {/* Media frame with optional safe-zone overlay + Reels caption overlay */}
          <div
            class="relative overflow-hidden rounded-md border border-hairline bg-canvas-soft-2"
            style={`aspect-ratio:${frameAspect};`}
          >
            {mediaUrl ? (
              <CoverMedia src={mediaUrl} kind={mediaKind} />
            ) : (
              <div class="flex h-full w-full items-center justify-center text-[12px] text-mute">
                {ap.media.add}
              </div>
            )}

            {isReels && safeZone && <SafeZoneOverlay insets={ig.safeZone} label={ap.safeZoneTag} />}

            {/* Reels caption + CTA sit over the video, above the bottom safe
                band, exactly as a Reels ad renders them. */}
            {isReels && (
              <div
                class="absolute left-0 right-0 z-20 px-3"
                style={`bottom:${ig.safeZone.bottomPct ?? 0}%;`}
              >
                <p class="line-clamp-2 text-[13px] font-medium leading-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {reels.text || ap.placeholders.primary}
                </p>
                {ctaLabel && (
                  <span class="mt-2 inline-flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold leading-4 text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    {ap.cta[ctaLabel] ?? ctaLabel}
                    <Chevron size={13} />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Feed placement: CTA bar, action icons, caption below the media ── */}
          {!isReels && (
            <>
              {/* Full-width CTA bar — the defining Instagram feed-ad element,
                  with a trailing chevron and a divider beneath it. */}
              {ctaLabel && (
                <div class="flex items-center justify-between gap-2 border-b border-hairline py-2.5 text-[14px] font-semibold text-ink">
                  <span class="truncate">{ap.cta[ctaLabel] ?? ctaLabel}</span>
                  <span class="shrink-0 text-mute">
                    <Chevron size={16} />
                  </span>
                </div>
              )}

              {/* Engagement icons — like / comment / share + save. */}
              <div class="mt-3 flex items-center justify-between text-mute/55">
                <div class="flex items-center gap-4">
                  <Engagement icon="like" size={20} />
                  <Engagement icon="comment" size={20} />
                  <Engagement icon="share" size={20} />
                </div>
                <Engagement icon="save" size={20} />
              </div>

              {/* Display link (muted), honoring the destination-URL input. */}
              {displayLink && (
                <p class="mt-2 truncate font-mono text-[11px] uppercase tracking-wide text-mute">
                  {displayLink}
                </p>
              )}

              {/* Caption — bold username + text. */}
              <p class="mt-1 whitespace-pre-wrap text-[13px] leading-5 text-ink">
                <span class="font-semibold">{name} </span>
                {feedVisible ? (
                  <>
                    {feedVisible}
                    {feedOver && <span class="text-mute"> {ig.seeMoreLabel}</span>}
                  </>
                ) : (
                  <span class="text-mute">{ap.placeholders.primary}</span>
                )}
              </p>
            </>
          )}
        </div>

        {isReels && reels.tooShort && (
          <p class="w-full text-[12px] leading-4 text-warning-deep">
            {interp(ap.reelsTooShort, { min: ig.reelsMin, max: ig.reelsMax })}
          </p>
        )}
        {safeZone && (isReels) && (
          <p class="w-full text-[12px] leading-4 text-mute">{ap.safeZoneHint}</p>
        )}
      </div>
    </Card>
  );
}

/** Trailing right-chevron used on the Instagram CTA affordance. */
function Chevron({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
