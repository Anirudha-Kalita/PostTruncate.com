/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import { extractLinkData, truncateCardField } from '../../lib/textTools';
import { cardLayout } from '../../data/linkBehavior';
import type { CardDomainCasing } from '../../data/linkBehavior';
import { FeedImage, Avatar } from './ui';
import { interp } from '../../i18n/interp';
import { linkCardStrings } from '../../i18n/linkCardStrings';
import type { IslandStrings } from '../../i18n/types';

// ──────────────────────────────────────────────────────────────────────────
// LivePreviewCard — a NON-INTERACTIVE, view-only simulation of a platform's
// Open Graph link card. It is deliberately NOT a link/anchor: it never
// navigates to or opens the detected URL (Requirement 10). Every visual fact
// (image ratio/style, truncation lengths, domain casing/placement) is read
// from the platform's Card_Layout_Profile in linkBehavior.ts — the single
// source of truth — so a platform's look is one config edit, not a code branch.
// All metadata is derived locally with no network request.
// ──────────────────────────────────────────────────────────────────────────

export interface LivePreviewCardProps {
  /** Selected platform id (must be a preview-card platform to render a card). */
  platform: string;
  /** The (already debounced) post body text. */
  text: string;
  /** User-edited card title; falls back to the smart domain placeholder when empty. */
  cardTitle?: string;
  /** User-edited card description; falls back to a localized placeholder when empty. */
  cardDescription?: string;
  /** Attached media object URL (reuses the editor's existing image state), or null. */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  lang: string;
  s: IslandStrings;
}

/** Apply a platform's domain casing rule to the derived (valid-host) domain. */
function caseDomain(domain: string, casing: CardDomainCasing): string {
  switch (casing) {
    case 'uppercase':
      return domain.toUpperCase();
    case 'lowercase':
      return domain.toLowerCase();
    default:
      return domain;
  }
}

/**
 * Parse a "w:h" Open Graph ratio into a height ÷ width number for FeedImage's
 * min/max clamp (e.g. "1.91:1" → ~0.5236). Falls back to the OG large ratio.
 */
function ratioHeightOverWidth(imageRatio: string): number {
  const [w, h] = imageRatio.split(':').map((n) => Number(n));
  if (!w || !h || !Number.isFinite(w) || !Number.isFinite(h)) return 1 / 1.91;
  return h / w;
}

/** Local favicon monogram chip — a gradient disc, no network-fetched icon. */
function Favicon({ initial }: { initial: string }) {
  return <Avatar size="h-5 w-5" initial={initial} />;
}

/** Domain line: optional local favicon + the cased Card_Domain. */
function DomainLine({
  domain,
  faviconMonogram,
  showFavicon,
  class: extra = '',
}: {
  domain: string;
  faviconMonogram: string;
  showFavicon: boolean;
  class?: string;
}) {
  return (
    <div class={`flex min-w-0 items-center gap-1.5 ${extra}`}>
      {showFavicon && faviconMonogram && <Favicon initial={faviconMonogram} />}
      <span class="truncate text-[12px] leading-4 text-mute">{domain}</span>
    </div>
  );
}

/**
 * Card media. Reuses the shared `FeedImage` primitive (which also handles
 * video) and clamps it to the platform's card ratio. The image itself is
 * decorative; the accessible alt text is associated via an sr-only caption so
 * it is announced without suppressing FeedImage's own controls (Req 10.4, 13.2).
 */
function CardMedia({
  image,
  mediaKind,
  ratio,
  alt,
  class: extra = '',
}: {
  image: string;
  mediaKind: 'image' | 'video';
  ratio: number;
  alt: string;
  class?: string;
}) {
  return (
    <figure class={extra}>
      <FeedImage src={image} kind={mediaKind} minRatio={ratio} maxRatio={ratio} fit="cover" />
      <figcaption class="sr-only">{alt}</figcaption>
    </figure>
  );
}

function CardTitle({ children, class: extra = '' }: { children: ComponentChildren; class?: string }) {
  return (
    <p class={`break-words text-[15px] font-semibold leading-snug text-ink ${extra}`}>{children}</p>
  );
}

function CardDescription({ children }: { children: ComponentChildren }) {
  return <p class="mt-1 break-words text-[13px] leading-snug text-body">{children}</p>;
}

/**
 * Non-interactive Open Graph link-card simulation for the six preview-card
 * platforms. Renders `null` when the body has no URL or the platform is not a
 * preview-card platform.
 */
export function LivePreviewCard({
  platform,
  text,
  cardTitle,
  cardDescription,
  image,
  mediaKind = 'image',
  s,
}: LivePreviewCardProps) {
  const data = extractLinkData(text, platform);
  const layout = cardLayout(platform);

  // Render nothing unless there is a URL AND this is a configured preview-card
  // platform (Requirement 1.1, 1.2).
  if (!data.firstUrl || !layout) return null;

  const strings = linkCardStrings(s);

  // Title: user value, else the smart domain-derived placeholder (Req 2.3).
  const resolvedTitle = cardTitle && cardTitle.trim() ? cardTitle : data.titlePlaceholder;
  const title = truncateCardField(resolvedTitle, layout.titleMaxChars);

  // Description: omitted entirely when the profile sets descriptionMaxChars to
  // 0 (Req 7.5); otherwise user value or the localized placeholder (Req 2.4).
  const showDescription = layout.descriptionMaxChars > 0;
  const resolvedDescription =
    cardDescription && cardDescription.trim() ? cardDescription : strings.descriptionPlaceholder;
  const description = showDescription
    ? truncateCardField(resolvedDescription, layout.descriptionMaxChars)
    : '';

  // Domain: cased per profile for a valid host; raw URL shown as-is and favicon
  // omitted when the host cannot be parsed (Req 3.5).
  const displayDomain = data.hasValidHost
    ? caseDomain(data.domain, layout.domainCasing)
    : data.domain;
  const showFavicon = data.hasValidHost && data.faviconMonogram !== '';

  // Static accessible name (NOT a link) composed from title + domain (Req 10.5).
  const ariaLabel = interp(strings.cardAria, { title, domain: displayDomain });
  // Image alt from the title, else the localized default (Req 13.2).
  const imageAlt = title || strings.imageAlt;
  const imageRatio = ratioHeightOverWidth(layout.imageRatio);

  const domainLine = (
    <DomainLine
      domain={displayDomain}
      faviconMonogram={data.faviconMonogram}
      showFavicon={showFavicon}
    />
  );

  // ── Thumbnail chip (Threads): compact horizontal row, thumbnail + text. ──
  if (layout.imageStyle === 'thumbnail') {
    return (
      <article
        aria-label={ariaLabel}
        class="mt-2 flex items-stretch gap-3 overflow-hidden rounded-lg border border-hairline bg-canvas p-2"
      >
        {image && (
          <CardMedia
            image={image}
            mediaKind={mediaKind}
            ratio={1}
            alt={imageAlt}
            class="w-20 shrink-0 overflow-hidden rounded-md"
          />
        )}
        <div class="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <CardTitle class="line-clamp-2">{title}</CardTitle>
          {domainLine}
        </div>
      </article>
    );
  }

  // ── Embed (Discord / WhatsApp): differ by domain placement. ──
  if (layout.imageStyle === 'embed') {
    // Discord: leading accent bar, domain shown as the "site name" above the
    // title, then description, then the image.
    if (layout.domainPlacement === 'site-name') {
      return (
        <article
          aria-label={ariaLabel}
          class="mt-2 flex gap-3 overflow-hidden rounded-md border border-hairline bg-canvas-soft p-3"
        >
          <span class="w-1 shrink-0 self-stretch rounded-full bg-link" aria-hidden="true" />
          <div class="min-w-0 flex-1">
            {domainLine}
            <CardTitle class="mt-1">{title}</CardTitle>
            {showDescription && description && <CardDescription>{description}</CardDescription>}
            {image && (
              <CardMedia
                image={image}
                mediaKind={mediaKind}
                ratio={imageRatio}
                alt={imageAlt}
                class="mt-2 overflow-hidden rounded-md"
              />
            )}
          </div>
        </article>
      );
    }

    // WhatsApp: in-bubble preview — image on top, then title, description, domain.
    return (
      <article
        aria-label={ariaLabel}
        class="mt-2 overflow-hidden rounded-lg border border-hairline bg-canvas-soft"
      >
        {image && (
          <CardMedia image={image} mediaKind={mediaKind} ratio={imageRatio} alt={imageAlt} />
        )}
        <div class="p-3">
          <CardTitle>{title}</CardTitle>
          {showDescription && description && <CardDescription>{description}</CardDescription>}
          <div class="mt-1.5">{domainLine}</div>
        </div>
      </article>
    );
  }

  // ── Large banner (Facebook / LinkedIn / Bluesky): full-width image above a
  // panel. Panel order follows the profile's domain placement. ──
  return (
    <article
      aria-label={ariaLabel}
      class="mt-2 overflow-hidden rounded-lg border border-hairline bg-canvas"
    >
      {image && (
        <CardMedia
          image={image}
          mediaKind={mediaKind}
          ratio={imageRatio}
          alt={imageAlt}
          class="overflow-hidden border-b border-hairline"
        />
      )}
      <div class="p-3">
        {/* Facebook: UPPERCASE domain header above the title. */}
        {layout.domainPlacement === 'above-title' && (
          <div class="mb-1">{domainLine}</div>
        )}
        <CardTitle>{title}</CardTitle>
        {showDescription && description && <CardDescription>{description}</CardDescription>}
        {/* LinkedIn / Bluesky: domain footer beneath the title (+ description). */}
        {layout.domainPlacement === 'below-title' && (
          <div class="mt-1.5">{domainLine}</div>
        )}
      </div>
    </article>
  );
}
