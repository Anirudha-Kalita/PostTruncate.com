/** @jsxImportSource preact */
import { Card, CardHead, Badge, type Tone } from './ui';
import { SafeZoneOverlay } from './SafeZoneOverlay';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { charCount, sliceChars } from '../../lib/textTools';

interface Props {
  s: IslandStrings;
  description: string;
  safeZone: boolean;
  mediaUrl: string | null;
}

/**
 * TikTok ad preview on a true 9:16 vertical canvas. The description truncates
 * at 100 characters behind an unclickable "... See more" and is clamped to four
 * lines. The safe-zone overlay marks the three blind spots — top tabs/status
 * bar (~10%), bottom username/caption/CTA/music ticker (~20%), and the right
 * profile + engagement icon stack (~15%).
 */
export function TikTokAd({ s, description, safeZone, mediaUrl }: Props) {
  const ap = adPreviewStrings(s);
  const tk = AD_PLATFORM_CONFIG.tiktok;
  const common = s.common;
  const name = common.handle;

  const over = charCount(description) > tk.primaryTruncateChars;
  const visible = over ? sliceChars(description, 0, tk.primaryTruncateChars) : description;

  const hasInput = description.trim() || mediaUrl;
  const badgeTone: Tone = !hasInput ? 'neutral' : over ? 'warn' : 'safe';
  const badgeLabel = !hasInput ? ap.badgeFits : over ? ap.badgeTruncated : ap.badgeFits;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="TikTok" title={ap.previewLabel}>
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col items-center gap-2 p-4 sm:p-5">
        <div
          class="relative overflow-hidden rounded-lg border border-hairline bg-black"
          style="width:100%;max-width:300px;aspect-ratio:9 / 16;"
        >
          {mediaUrl ? (
            <img src={mediaUrl} alt="" class="h-full w-full object-cover" />
          ) : (
            <div class="flex h-full w-full items-center justify-center text-[12px] text-white/70">
              {ap.media.add}
            </div>
          )}

          {safeZone && <SafeZoneOverlay insets={tk.safeZone} label={ap.safeZoneTag} />}

          {/* Username + description sit over the video, above the bottom safe band. */}
          <div
            class="absolute left-0 right-0 z-20 px-3"
            style={`bottom:${(tk.safeZone.bottomPct ?? 0) + 2}%;`}
          >
            <p class="text-[13px] font-semibold leading-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              @{name}
            </p>
            <p
              class="mt-1 whitespace-pre-wrap text-[12px] leading-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
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
          </div>
        </div>

        {safeZone && <p class="w-full text-[12px] leading-4 text-mute">{ap.safeZoneHint}</p>}
      </div>
    </Card>
  );
}
