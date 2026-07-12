/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
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
  lang: string;
  caption: string;
  /** Reels CTA-card headline (the hook above the "Learn more" button). */
  headline?: string;
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
export function InstagramAd({ s, lang, caption, headline, mode, safeZone, mediaUrl, mediaKind = 'image', destinationUrl, cta, toolbar }: Props) {
  const ap = adPreviewStrings(s);
  const ig = AD_PLATFORM_CONFIG.instagram;
  const common = s.common;
  const name = common.handle;
  const nf = new Intl.NumberFormat(lang);

  const isReels = mode === 'reels';

  // CTA-card visibility: shown for images always; for a video Reel it appears
  // only while paused (the reference state) and collapses during playback.
  const [reelPlaying, setReelPlaying] = useState(false);
  const showCtaCard = mediaKind !== 'video' || !reelPlaying;

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

      <div class="flex flex-col items-center gap-2 p-4 sm:p-5 font-meta">
        <div style="width:100%;max-width:360px;">
          {/* Feed header — Reels is full-screen, so its identity lives in the
              overlay instead. */}
          {!isReels && (
            <div class="flex items-center gap-2 pb-2">
              <Avatar size="h-8 w-8" initial={monogram(name)} />
              <div class="min-w-0 flex-1">
                <p class="truncate text-[13px] font-semibold leading-4 text-ink">{name}</p>
                <p class="text-[11px] text-mute">{ap.sponsored}</p>
              </div>
              <MoreDots />
            </div>
          )}

          {/* Media frame with optional safe-zone overlay + Reels ad chrome. */}
          <div
            class={`relative overflow-hidden ${isReels ? 'rounded-xl' : 'rounded-md border border-hairline'} bg-canvas-soft-2`}
            style={`aspect-ratio:${frameAspect};`}
          >
            {mediaUrl ? (
              <CoverMedia src={mediaUrl} kind={mediaKind} onPlayingChange={isReels ? setReelPlaying : undefined} />
            ) : (
              <div class="flex h-full w-full items-center justify-center text-[12px] text-mute">
                {ap.media.add}
              </div>
            )}

            {isReels && safeZone && <SafeZoneOverlay insets={ig.safeZoneAd} label={ap.safeZoneTag} />}

            {/* Right action rail — like + count, comment, reshare, send. The
                only "•••" lives in the advertiser row below, not here. */}
            {isReels && (
              <div
                class="absolute right-2 z-20 flex flex-col items-center gap-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                style="bottom:11%;"
              >
                <div class="flex flex-col items-center gap-1">
                  <Engagement icon="like" size={26} liked />
                  <span class="text-[11px] font-semibold tabular-nums">{nf.format(1045)}</span>
                </div>
                <Engagement icon="commentRound" size={26} />
                <Engagement icon="reshare" size={26} />
                <Engagement icon="send" size={26} />
              </div>
            )}

            {/* Sponsored overlay stack — CTA card (paused/image only), then the
                advertiser row and the caption + "Ad" disclosure. */}
            {isReels && (
              <div class="absolute inset-x-0 bottom-0 z-20 p-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {showCtaCard && (
                  <div class="mr-12 overflow-hidden rounded-xl">
                    <div class="flex items-center gap-2 bg-black/45 px-2.5 py-2">
                      <span class="h-9 w-9 shrink-0 overflow-hidden rounded bg-canvas-soft-2">
                        {mediaUrl ? (
                          mediaKind === 'video' ? (
                            <video src={mediaUrl} muted preload="metadata" class="h-full w-full object-cover" />
                          ) : (
                            <img src={mediaUrl} alt="" class="h-full w-full object-cover" />
                          )
                        ) : null}
                      </span>
                      <p class="line-clamp-2 text-[12px] font-medium leading-4 text-white">
                        {headline?.trim() || ap.placeholders.headline}
                      </p>
                    </div>
                    {ctaLabel && (
                      <span class="flex w-full items-center justify-between bg-link px-3 py-2.5 text-[14px] font-semibold text-on-primary">
                        <span class="truncate">{ap.cta[ctaLabel] ?? ctaLabel}</span>
                        <Chevron size={18} />
                      </span>
                    )}
                  </div>
                )}

                {/* Advertiser identity row. */}
                <div class="mt-2.5 flex items-center gap-2">
                  <Avatar size="h-6 w-6" initial={monogram(name)} />
                  <span class="flex-1 truncate text-[13px] font-semibold leading-4">{name}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="5" cy="12" r="1.6" />
                    <circle cx="12" cy="12" r="1.6" />
                    <circle cx="19" cy="12" r="1.6" />
                  </svg>
                </div>

                {/* Caption + "Ad" disclosure. */}
                <div class="mt-1.5 flex items-start gap-2">
                  <p class="line-clamp-1 flex-1 text-[12px] leading-4">
                    {reels.text || <span class="text-white/80">{ap.placeholders.primary}</span>}
                  </p>
                  <span class="shrink-0 text-[12px] text-white/90">{ap.adLabel}</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Feed placement: CTA bar, action icons, caption below the media ── */}
          {!isReels && (
            <>
              {/* Full-width CTA bar — the defining Instagram feed-ad element:
                  the headline above the CTA label, with a trailing chevron and a
                  divider beneath it. */}
              {(headline?.trim() || ctaLabel) && (
                <div class="flex items-center justify-between gap-2 border-b border-hairline py-2.5">
                  <div class="min-w-0 flex-1">
                    {headline?.trim() && (
                      <p class="truncate text-[14px] font-semibold leading-5 text-ink">{headline}</p>
                    )}
                    {ctaLabel && (
                      <span class="text-[12px] font-medium text-link">{ap.cta[ctaLabel] ?? ctaLabel}</span>
                    )}
                  </div>
                  <span class="shrink-0 text-mute">
                    <Chevron size={16} />
                  </span>
                </div>
              )}

              {/* Engagement icons — like / comment / share + save. */}
              <div class="mt-3 flex items-center justify-between text-mute/55">
                <div class="flex items-center gap-4">
                  <Engagement icon="like" size={20} liked />
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
              <p class="mt-1 whitespace-pre-wrap break-words text-[13px] leading-5 text-ink">
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
