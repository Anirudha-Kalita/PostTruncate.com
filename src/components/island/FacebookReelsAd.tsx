/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { Badge, Card, CardHead, CoverMedia, monogram, type Tone } from './ui';
import { SafeZoneOverlay } from './SafeZoneOverlay';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { facebookBadgeState, resolveCta, truncateFacebookReelsPrimary } from '../../lib/adTruncation';

interface Props {
  s: IslandStrings;
  lang: string;
  /** Shared caption (Primary_Text). */
  primary: string;
  /** Reels safe-zone toggle (Req 3.1-3.5). */
  safeZone: boolean;
  mediaUrl: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** Optional Meta ad destination URL; kept for prop parity with other formats. */
  destinationUrl?: string;
  /** Optional CTA label; resolves to the platform default when empty. */
  cta?: string;
  /** Optional controls rendered in the card heading, left of the status badge. */
  toolbar?: ComponentChildren;
}

/**
 * Facebook Reels ad preview: a full-screen vertical 9:16 frame with creator
 * chrome, audio attribution, an optional Safe_Zone_Overlay, and a CTA overlay
 * shown only when the platform resolves a CTA label.
 */
export function FacebookReelsAd({ s, primary, safeZone, mediaUrl, mediaKind = 'image', cta, toolbar }: Props) {
  const ap = adPreviewStrings(s);
  const fb = AD_PLATFORM_CONFIG.facebook;
  const common = s.common;
  const meta = s.meta;
  const name = common.handle;

  const caption = truncateFacebookReelsPrimary(primary);
  const ctaLabel = resolveCta('facebook', cta);

  const hasInput = primary.trim().length > 0 || mediaUrl !== null;
  const badge = facebookBadgeState(hasInput, caption.truncated);
  const badgeTone: Tone = badge.toneKind;
  const badgeLabel = badge.label === 'fits' ? ap.badgeFits : ap.badgeTruncated;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="Facebook" title={ap.previewLabel}>
        {toolbar}
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col items-center gap-2 p-4 sm:p-5">
        <div style="width:100%;max-width:300px;">
          <div
            class="relative overflow-hidden rounded-md border border-hairline bg-canvas-soft-2"
            style="aspect-ratio:9 / 16;"
          >
            {mediaUrl ? (
              <CoverMedia src={mediaUrl} kind={mediaKind} />
            ) : (
              <div class="flex h-full w-full items-center justify-center text-[12px] text-mute">
                {ap.media.add}
              </div>
            )}

            {safeZone && <SafeZoneOverlay insets={fb.reelsSafeZone} label={ap.safeZoneTag} />}

            {/* Creator row + Subscribe affordance — reuses existing locale keys. */}
            <div class="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 p-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span class="flex items-center gap-2">
                <span class="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full bg-linear-to-br from-grad-preview-start to-grad-preview-end text-[12px] font-semibold text-on-primary">
                  {monogram(name)}
                </span>
                <span class="truncate text-[13px] font-semibold leading-4">{name}</span>
              </span>
              <span class="shrink-0 rounded-pill border border-white/70 px-2.5 py-1 text-[12px] font-semibold leading-4">
                {meta.subscribe}
              </span>
            </div>

            {/* Sponsored / Ad disclosure + audio attribution + caption + CTA overlay stack. */}
            <div class="absolute inset-x-0 bottom-0 z-20 bg-black/45 p-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <div class="flex items-center gap-2 text-[12px] leading-4 text-white/90">
                <span>{ap.sponsored}</span>
                <span aria-hidden="true">·</span>
                <span class="truncate">{meta.reelAudio}</span>
                <span aria-hidden="true">·</span>
                <span>{ap.adLabel}</span>
              </div>

              {caption.text && (
                <p class="mt-1.5 whitespace-pre-wrap break-words text-[13px] leading-5">
                  {caption.text}
                  {caption.truncated && <span class="text-white/80">{fb.seeMoreLabel}</span>}
                </p>
              )}

              {ctaLabel && (
                <span class="mt-2.5 flex w-full items-center justify-center rounded-md bg-link px-3 py-2.5 text-[14px] font-semibold text-on-primary">
                  {ap.cta[ctaLabel] ?? ctaLabel}
                </span>
              )}

              {safeZone && <p class="mt-2 text-[11px] leading-4 text-white/80">{ap.safeZoneHint}</p>}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
