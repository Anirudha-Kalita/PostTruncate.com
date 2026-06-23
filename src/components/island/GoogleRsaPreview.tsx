/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { Card, CardHead, Badge, type Tone } from './ui';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { font, truncateToWidth } from '../../lib/canvasText';
import { googleHeadlineFits, GOOGLE_HEADLINE_SEPARATOR, buildDisplayUrl } from '../../lib/adTruncation';
import { interp, plural } from '../../i18n/interp';

interface Props {
  s: IslandStrings;
  /** Up to three RSA headlines (already char-capped by the inputs). */
  headlines: string[];
  description: string;
  /** Optional final URL; when empty the display URL falls back to posttruncate.com. */
  destinationUrl?: string;
  /** Optional Google RSA display-path segments (clamped to ≤2 segments, ≤15 chars each). */
  paths?: string[];
  /** Optional controls rendered in the card heading, left of the status badge. */
  toolbar?: ComponentChildren;
}

/**
 * Pixel-accurate Google Responsive Search Ads preview. Headlines are measured
 * by true rendered width (canvasText) in Arial 20px; when their combined width
 * breaches the ~600px desktop container, the trailing headline is dropped —
 * exactly the way Google clips the SERP ad slot.
 */
export function GoogleRsaPreview({ s, headlines, description, destinationUrl, paths, toolbar }: Props) {
  const ap = adPreviewStrings(s);
  const cfg = AD_PLATFORM_CONFIG.google;
  const headlineFont = font(cfg.font.headlinePx, 'Arial');

  // Build the green display URL from the final-URL domain plus up to two
  // clamped, non-empty path segments. When no final URL is provided the
  // display URL falls back to the canonical posttruncate.com (unchanged today).
  const displayUrl = buildDisplayUrl(
    destinationUrl?.trim() ? destinationUrl : 'posttruncate.com',
    paths ?? [],
    'google',
  );

  const entered = headlines.map((h) => h.trim()).filter(Boolean);
  const hasInput = entered.length > 0 || description.trim().length > 0;
  const shownHeadlines = entered.length > 0 ? entered : [ap.placeholders.headline];

  const fit = googleHeadlineFits(shownHeadlines, headlineFont, cfg.desktopContainerPx);
  const headlineLine = fit.visible.join(GOOGLE_HEADLINE_SEPARATOR);

  // Description clips to roughly two container widths of body text.
  const descFont = font(cfg.font.descPx, 'Arial');
  const rawDesc = description.trim() || ap.placeholders.description;
  const descClip = truncateToWidth(rawDesc, cfg.desktopContainerPx * 2, descFont);

  const truncated = fit.truncated || descClip.truncated;
  const badgeTone: Tone = !hasInput ? 'neutral' : truncated ? 'warn' : 'safe';
  const badgeLabel = !hasInput ? ap.badgeFits : truncated ? ap.badgeTruncated : ap.badgeFits;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="Google" title={ap.previewLabel}>
        {toolbar}
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="p-4 sm:p-5">
        <p class="mb-2 font-mono text-[11px] uppercase tracking-wide text-mute">{ap.previewLabel}</p>
        {/* SERP ad card — always light, Arial, regardless of theme. The
            explicit font-feature-settings:normal resets the global Geist
            stylistic sets (ss01/ss02) so the ad renders in true Arial. */}
        <div
          class="overflow-hidden rounded-lg border border-hairline bg-white p-4"
          style="font-family:Arial,sans-serif;font-feature-settings:normal;"
        >
          {/* "Sponsored" label — bold black, as Google has shown since Sept 2023
              (replacing the old "Ad" label). */}
          <p style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;line-height:1.3;color:#202124;margin:0 0 6px;">
            {ap.googleAdLabel}
          </p>
          {/* Favicon + advertiser name, with the display URL beneath. */}
          <div class="mb-1 flex items-center gap-2">
            <span
              style="width:26px;height:26px;border-radius:50%;border:1px solid #dadce0;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#4285F4;"
              aria-hidden="true"
            >
              P
            </span>
            <span>
              <span style="display:block;font-family:Arial,Roboto,sans-serif;font-size:14px;font-weight:600;line-height:1.3;color:#202124;">
                PostTruncate
              </span>
              <span style="display:block;font-family:Arial,Roboto,sans-serif;font-size:12px;line-height:1.3;color:#4d5156;">
                {displayUrl}
              </span>
            </span>
          </div>
          {/* Headlines — one line, blue, 20px, separated by vertical bars. */}
          <p
            style={`font-family:Arial,Roboto,sans-serif;font-size:${cfg.font.headlinePx}px;font-weight:400;line-height:1.3;margin:4px 0 0;color:${
              entered.length > 0 ? '#1a0dab' : '#9aa0a6'
            };`}
          >
            {headlineLine}
          </p>
          {/* Description — 14px, gray. */}
          <p
            style={`font-family:Arial,Roboto,sans-serif;font-size:${cfg.font.descPx}px;line-height:1.58;margin:4px 0 0;color:${
              description.trim() ? '#4d5156' : '#9aa0a6'
            };`}
          >
            {descClip.text}
          </p>
        </div>

        {fit.truncated && (
          <p class="mt-3 text-[12px] leading-4 text-warning-deep">
            {interp(plural(ap.googleHeadlinesDropped, fit.dropped.length), {
              n: fit.dropped.length,
              px: cfg.desktopContainerPx,
            })}
          </p>
        )}
      </div>
    </Card>
  );
}
