/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { Badge, Card, CardHead, CoverMedia, type Tone } from './ui';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import {
  clampCarouselDescription,
  clampCarouselHeadline,
  clampDisplayLink,
  deriveDisplayLink,
  facebookBadgeState,
  resolveCta,
  truncateFacebookPrimary,
} from '../../lib/adTruncation';
import { interp } from '../../i18n/interp';

export interface CarouselCard {
  headline: string;
  description: string;
  mediaUrl: string | null;
  mediaKind: 'image' | 'video';
}

interface Props {
  s: IslandStrings;
  /** Shared Primary_Text rendered once above the card strip. */
  primary: string;
  cards: CarouselCard[];
  activeCard: number;
  onPrev: () => void;
  onNext: () => void;
  onArrowKey: (dir: -1 | 1) => void;
  /** Optional Meta ad destination URL; shared by every card (real Facebook
   *  carousels apply one CTA button across the whole unit). */
  destinationUrl?: string;
  /** Optional CTA label; resolves to the platform default when empty. */
  cta?: string;
  /** Optional controls rendered in the card heading, left of the status badge. */
  toolbar?: ComponentChildren;
}

/**
 * Facebook Carousel ad preview: a single shared primary text above a
 * navigable strip of 2-10 cards, each with its own media, headline, and
 * optional description.
 */
export function FacebookCarouselAd({
  s,
  primary,
  cards,
  activeCard,
  onPrev,
  onNext,
  onArrowKey,
  destinationUrl,
  cta,
  toolbar,
}: Props) {
  const ap = adPreviewStrings(s);
  const primaryResult = truncateFacebookPrimary(primary);

  const card = cards[activeCard];
  const headlineResult = clampCarouselHeadline(card?.headline ?? '');
  const descriptionResult = clampCarouselDescription(card?.description ?? '');
  const showDescription = descriptionResult.text.trim().length > 0;

  // One shared display link + CTA across every card — real Facebook carousels
  // apply a single CTA button to the whole unit, not per card.
  const displayLink = clampDisplayLink(
    destinationUrl?.trim() ? deriveDisplayLink(destinationUrl) : 'posttruncate.com',
    'facebook',
  ).text;
  const ctaLabel = resolveCta('facebook', cta);

  const anyInput =
    primary.trim().length > 0 ||
    cards.some((c) => c.headline.trim() || c.description.trim() || c.mediaUrl);
  const anyTruncated =
    primaryResult.truncated ||
    cards.some((c) => clampCarouselHeadline(c.headline).truncated || clampCarouselDescription(c.description).truncated);
  const badge = facebookBadgeState(anyInput, anyTruncated);
  const badgeTone: Tone = badge.toneKind;
  const badgeLabel = badge.label === 'fits' ? ap.badgeFits : ap.badgeTruncated;

  const isFirst = activeCard === 0;
  const isLast = activeCard === cards.length - 1;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') onArrowKey(-1);
    else if (e.key === 'ArrowRight') onArrowKey(1);
  };

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow="Facebook" title={ap.previewLabel}>
        {toolbar}
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col items-center gap-2 p-4 sm:p-5">
        <div style="width:100%;max-width:420px;" onKeyDown={onKeyDown}>
          {/* Shared primary text — truncateFacebookPrimary already appends the
              "See More" affordance to `text` when truncated. */}
          <p class="whitespace-pre-wrap break-words text-[14px] leading-5 text-ink">
            {primaryResult.text || <span class="text-mute">{ap.placeholders.primary}</span>}
          </p>

          {/* Active card */}
          <div class="mt-3 overflow-hidden rounded-md border border-hairline">
            <div class="relative aspect-square bg-canvas-soft-2">
              {card?.mediaUrl ? (
                <CoverMedia src={card.mediaUrl} kind={card.mediaKind} />
              ) : (
                <div class="flex h-full w-full items-center justify-center text-[12px] text-mute">
                  {ap.media.add}
                </div>
              )}
            </div>
            <div class="flex items-center justify-between gap-3 bg-canvas-soft px-3 py-2.5">
              <div class="min-w-0 flex-1">
                <p class="font-mono text-[10px] uppercase tracking-wide text-mute">{displayLink}</p>
                <p class="mt-0.5 truncate text-[14px] font-semibold leading-5 text-ink">
                  {headlineResult.text.trim() || <span class="text-mute">{ap.placeholders.cardHeadline}</span>}
                </p>
                {showDescription && (
                  <p class="mt-0.5 truncate text-[13px] leading-5 text-body">{descriptionResult.text}</p>
                )}
              </div>
              {ctaLabel && (
                <span class="shrink-0 self-center rounded-md border border-hairline bg-canvas px-3 py-1.5 text-[13px] font-semibold leading-4 text-body">
                  {ap.cta[ctaLabel] ?? ctaLabel}
                </span>
              )}
            </div>
          </div>

          {/* Navigation: prev / position indicator / next */}
          <div class="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label={ap.carouselPrev}
              disabled={isFirst}
              onClick={onPrev}
              class="rounded-pill border border-hairline bg-canvas-soft px-3 py-1.5 text-[13px] font-medium text-body transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            <span class="font-mono text-[12px] text-mute tabular-nums">
              {interp(ap.carouselPosition, { current: activeCard + 1, total: cards.length })}
            </span>
            <button
              type="button"
              aria-label={ap.carouselNext}
              disabled={isLast}
              onClick={onNext}
              class="rounded-pill border border-hairline bg-canvas-soft px-3 py-1.5 text-[13px] font-medium text-body transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
