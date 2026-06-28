/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { Card, CardHead, Badge, CoverMedia, TikTokActionRail, type Tone } from './ui';
import { SafeZoneOverlay } from './SafeZoneOverlay';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { charCount, sliceChars } from '../../lib/textTools';
import { tiktokAdCaptionHasNoClickableLink } from '../../lib/linkIndication';
import { resolveCta } from '../../lib/adTruncation';
import { linkDisplayStrings } from '../../i18n/linkDisplayStrings';

interface Props {
  s: IslandStrings;
  lang: string;
  description: string;
  safeZone: boolean;
  mediaUrl: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** Optional controls rendered in the card heading, left of the status badge. */
  toolbar?: ComponentChildren;
}

/**
 * TikTok ad preview on a true 9:16 vertical canvas. The description truncates
 * at 100 characters behind an unclickable "... See more" and is clamped to four
 * lines. The safe-zone overlay marks the three blind spots (2026 in-feed ad
 * spec) — top tabs (~7%), bottom username/caption/CTA/music band (~23%), and the
 * right profile + engagement icon stack (~11%).
 */
export function TikTokAd({ s, lang, description, safeZone, mediaUrl, mediaKind = 'image', toolbar }: Props) {
  const ap = adPreviewStrings(s);
  const ld = linkDisplayStrings(s);
  const tk = AD_PLATFORM_CONFIG.tiktok;
  const common = s.common;
  const name = common.handle;

  const over = charCount(description) > tk.primaryTruncateChars;
  const visible = over ? sliceChars(description, 0, tk.primaryTruncateChars) : description;

  // Additive link-display (Requirement 11). The CTA button carries the click
  // (non-functional mock); the helper line appears only when the caption holds
  // a URL/@/# that TikTok renders as non-clickable text.
  const ctaLabel = resolveCta('tiktok');
  const showNoClickable = tiktokAdCaptionHasNoClickableLink(description);

  const hasInput = description.trim() || mediaUrl;
  const badgeTone: Tone = !hasInput ? 'neutral' : over ? 'warn' : 'safe';
  const badgeLabel = !hasInput ? ap.badgeFits : over ? ap.badgeTruncated : ap.badgeFits;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="TikTok" title={ap.previewLabel}>
        {toolbar}
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col items-center gap-2 p-4 sm:p-5">
        <div
          class="relative overflow-hidden rounded-lg border border-hairline bg-black"
          style="width:100%;max-width:300px;aspect-ratio:9 / 16;"
        >
          {mediaUrl ? (
            <CoverMedia src={mediaUrl} kind={mediaKind} />
          ) : (
            <div class="flex h-full w-full items-center justify-center text-[12px] text-white/70">
              {ap.media.add}
            </div>
          )}

          {safeZone && <SafeZoneOverlay insets={tk.safeZone} label={ap.safeZoneTag} />}

          {/* Right-hand action rail — avatar + follow, like / comment / bookmark
              / share with counts, then the sound disc, exactly as a real TikTok
              in-feed ad. The sound disc sits near the caption/CTA level. */}
          <TikTokActionRail handle={name} lang={lang} class="absolute bottom-[13%] right-1.5 z-20" />

          {/* Username + description + CTA sit low over the video, in the bottom
              UI band where TikTok renders them; right padding clears the rail. */}
          <div class="absolute inset-x-0 bottom-0 z-20 p-3 pr-12">
            <p class="text-[13px] font-semibold leading-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              @{name}
            </p>
            {/* Sponsored/ad disclosure — every TikTok in-feed ad carries it. */}
            <p class="mt-0.5 text-[11px] leading-4 text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {ap.sponsored}
            </p>
            <p
              class="mt-1 whitespace-pre-wrap break-words text-[12px] leading-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              style="display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;"
            >
              {visible ? (
                <>
                  {visible}
                  {over && <span class="text-white/80">{tk.seeMoreLabel}</span>}
                </>
              ) : (
                <span class="text-white/70">{ap.placeholders.primary}</span>
              )}
            </p>

            {/* CTA pill carries the click on TikTok in-feed ads (mock). Solid
                light background keeps it legible over the video. */}
            {ctaLabel && (
              <span class="mt-2 inline-flex rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold leading-4 text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {ap.cta[ctaLabel] ?? ctaLabel}
              </span>
            )}
          </div>
        </div>

        {showNoClickable && (
          <p class="w-full text-[12px] leading-4 text-mute">{ld.adNoClickableLink}</p>
        )}
        {safeZone && <p class="w-full text-[12px] leading-4 text-mute">{ap.safeZoneHint}</p>}
      </div>
    </Card>
  );
}
