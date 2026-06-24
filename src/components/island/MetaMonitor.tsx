/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import {
  detectHashtags,
  hasFancyUnicode,
  countFancyUnicode,
  charCount,
  sliceChars,
  FOLDS,
  LIMITS,
  IMAGE_RATIOS,
  extractLinkData,
} from '../../lib/textTools';
import { LivePreviewCard } from './LivePreviewCard';
import { SafeZoneOverlay } from './SafeZoneOverlay';
import { AD_PLATFORM_CONFIG } from '../../data/adPlatformConfig';
import { instagramReelsFit } from '../../lib/adTruncation';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import {
  Card,
  CardHead,
  Badge,
  Segmented,
  Meter,
  FoldMarker,
  FeedImage,
  BrandLogo,
  ToolLink,
  Avatar,
  VerifiedTick,
  Globe,
  ActionBar,
  Engagement,
  MoreDots,
  PostCard,
  LinkText,
  CoverMedia,
  previewAuthor,
  monogram,
} from './ui';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

type FeedView = 'desktop' | 'mobile';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
  facebookToolLinkHref?: string;
  /** When 'facebook', render the Facebook card above the Instagram card. */
  priority?: 'facebook';
  /** Scoped platform pages: render only this network's card (both when unset). */
  only?: 'instagram' | 'facebook';
  /** Viewport state, lifted to Dashboard so the Hook Visibility panel mirrors it. */
  instagramView: FeedView;
  setInstagramView: (v: FeedView) => void;
  facebookView: FeedView;
  setFacebookView: (v: FeedView) => void;
  /** Object URL of the attached preview media, or null when none. */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** When false, hide the dimmed below-the-fold remainder (show only "…more"). */
  showFolded?: boolean;
  /** User-edited Card_Title for the Facebook link-preview card (optional). */
  cardTitle?: string;
  /** User-edited Card_Description for the Facebook link-preview card (optional). */
  cardDescription?: string;
  /** Independent Facebook link-card image (defaults to the site OG image), separate from the post media. */
  cardImage?: string | null;
}

function truncateForFeed(text: string, limit: number) {
  const count = charCount(text);
  const truncated = count > limit;
  return {
    isTruncated: truncated,
    previewText: truncated ? sliceChars(text, 0, limit) : text,
    hiddenText: truncated ? sliceChars(text, limit) : '',
  };
}

/**
 * Independent Instagram and Facebook monitors. Instagram owns caption preview
 * and hashtag concentration; Facebook owns feed preview and accessibility.
 */
export function MetaMonitor({ text, lang, s, toolLinkHref, facebookToolLinkHref, priority, only, instagramView, setInstagramView, facebookView, setFacebookView, image, mediaKind = 'image', showFolded = true, cardTitle, cardDescription, cardImage }: Props) {
  const m = s.meta;
  const nf = new Intl.NumberFormat(lang);
  // Abbreviated like-count for the Reels rail (e.g. "34.5K"), localized.
  const nfCompact = new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 });
  // Split the localized "Liked by {handle} and others" around the handle so the
  // username can be bolded without hard-coding the English sentence structure.
  const likedByParts = interp(m.likedBy, { handle: '@@H@@' }).split('@@H@@');
  const author = previewAuthor(s.common);
  const hashtags = detectHashtags(text);
  const tagCount = hashtags.length;
  // Two-tier: 30 is the hard cap (post won't publish); past the recommended ~5
  // it still posts but reads as spam, so it warns rather than errors.
  const overHardLimit = tagCount > LIMITS.INSTAGRAM_HASHTAGS_MAX;
  const aboveRecommended =
    !overHardLimit && tagCount > LIMITS.INSTAGRAM_HASHTAGS_RECOMMENDED;
  const tagTone = overHardLimit ? 'danger' : aboveRecommended ? 'warn' : 'safe';

  const fancy = hasFancyUnicode(text);
  const fancyN = countFancyUnicode(text);

  const activeText = text.trim();
  const activeCount = charCount(activeText);
  const overCaptionLimit = activeCount > LIMITS.INSTAGRAM_CAPTION;
  const instagramLimit = FOLDS.instagram[instagramView];
  const facebookLimit = FOLDS.facebook[facebookView];
  const instagramPreview = truncateForFeed(activeText, instagramLimit);
  const facebookPreview = truncateForFeed(activeText, facebookLimit);

  // Instagram placement: Feed post (default) or Reel. Local to this card — the
  // Reels overlay reuses the Ad Previews' Instagram config (caption fold,
  // 40–72 comfortable window, safe-zone insets) so the organic and ad previews
  // stay in lockstep. A Reel caption shares the 2,200 cap but the player only
  // overlays the first ~72 characters before "… more", over a 9:16 video.
  const ap = adPreviewStrings(s);
  const ig = AD_PLATFORM_CONFIG.instagram;
  const [igPlacement, setIgPlacement] = useState<'feed' | 'reels'>('feed');
  // Safe-zone overlay is opt-in (default off), mirroring the TikTok preview.
  const [igSafeZones, setIgSafeZones] = useState(false);
  const isReels = igPlacement === 'reels';
  const reels = instagramReelsFit(activeText);

  // Facebook link-card simulation (Requirement 9): Facebook is the only Meta
  // preview-card platform (Instagram stays plain-text, no card). The badge and
  // counter above keep measuring the full `activeText`. Facebook keeps the
  // pasted URL inline as blue clickable text (it does NOT drop it), so the body
  // renders the full caption and the URL is highlighted in place via <LinkText>.
  const fbLinkData = extractLinkData(activeText, 'facebook');
  const fbShowCard = fbLinkData.firstUrl !== undefined;

  const instagramCard = (
    <Card key="instagram">
        <CardHead
          eyebrow="Instagram"
          title={m.title}
          logo={<BrandLogo brand="instagram" />}
        >
          <Segmented<'feed' | 'reels'>
            ariaLabel={ap.modeAria}
            value={igPlacement}
            onChange={setIgPlacement}
            options={[
              { value: 'feed', label: ap.feed },
              { value: 'reels', label: ap.reels },
            ]}
          />
          {/* Reels: opt-in safe-zone overlay, same switch affordance as TikTok. */}
          {isReels && (
            <button
              type="button"
              role="switch"
              aria-checked={igSafeZones}
              onClick={() => setIgSafeZones((v) => !v)}
              class="inline-flex items-center gap-1.5 text-[12px] font-medium text-body transition-colors hover:text-ink"
            >
              <span class={`relative h-4 w-7 shrink-0 rounded-pill transition-colors ${igSafeZones ? 'bg-link' : 'bg-hairline-strong'}`}>
                <span class={`absolute top-0.5 h-3 w-3 rounded-full bg-on-primary transition-[left] ${igSafeZones ? 'left-3.5' : 'left-0.5'}`} />
              </span>
              {ap.safeZoneLabel}
            </button>
          )}
          {/* Desktop/mobile only changes the feed fold; a Reel is always the
              vertical mobile player, so the view toggle is hidden there. */}
          {!isReels && (
            <Segmented<FeedView>
              ariaLabel={`${m.title} Instagram`}
              value={instagramView}
              onChange={setInstagramView}
              options={[
                { value: 'desktop', label: s.linkedin.viewDesktop },
                { value: 'mobile', label: s.linkedin.viewMobile },
              ]}
            />
          )}
        </CardHead>

        <div class="px-4 pt-4 sm:px-5">
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            {overCaptionLimit ? (
              <Badge tone="danger">{m.badgeCaptionOver}</Badge>
            ) : (isReels ? reels.truncated : instagramPreview.isTruncated) ? (
              <Badge tone="warn">{s.linkedin.badgeTruncated}</Badge>
            ) : (
              <Badge tone="safe">{m.badgeClean}</Badge>
            )}
            <span class="font-mono text-[12px] text-mute tabular-nums">
              {overCaptionLimit
                ? interp(m.captionLimit, {
                    total: nf.format(activeCount),
                    limit: nf.format(LIMITS.INSTAGRAM_CAPTION),
                  })
                : `${nf.format(activeCount)} / ${nf.format(isReels ? ig.reelsMax : instagramLimit)}`}
            </span>
          </div>
        </div>

        <div class="space-y-4 p-4 sm:p-5">
          {/* ── Reels placement: 9:16 player with the caption overlaid above the
              bottom profile band and the right action rail, mirroring how the
              Reels viewer covers the creative. ── */}
          {isReels && (
            <div class="flex flex-col items-center gap-3">
              <div style="width:100%;max-width:300px;">
                {/* Full-screen 9:16 Reels player — wordmark, identity, action rail
                    and audio all overlay the video, exactly as the Reels viewer
                    renders them. No header above the frame. */}
                <div
                  class="relative overflow-hidden rounded-md border border-hairline bg-canvas-soft-2"
                  style="aspect-ratio:9 / 16;"
                >
                  {image ? (
                    <CoverMedia src={image} kind={mediaKind} showProgress />
                  ) : (
                    <div class="flex h-full w-full items-center justify-center text-[12px] text-mute">
                      {ap.media.add}
                    </div>
                  )}

                  {igSafeZones && <SafeZoneOverlay insets={ig.safeZone} label={ap.safeZoneTag} />}

                  {/* Top bar — "Reels" wordmark + camera, overlaid on the video. */}
                  <div class="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-3 pt-2.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <span class="text-[15px] font-semibold italic">Reels</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M3 9a2 2 0 0 1 2-2h1.5l1.2-1.8a1 1 0 0 1 .83-.45h6.94a1 1 0 0 1 .83.45L18.5 7H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <circle cx="12.5" cy="13" r="3.2" />
                    </svg>
                  </div>

                  {/* Right action rail — like + count, comment + count, reshare,
                      share, the ••• more menu (Save lives inside it), and the
                      audio cover. */}
                  <div
                    class="absolute right-2 z-20 flex flex-col items-center gap-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    style={`bottom:${(ig.safeZone.bottomPct ?? 0) - 8}%;`}
                  >
                    <div class="flex flex-col items-center gap-1">
                      <Engagement icon="like" size={24} />
                      <span class="text-[11px] font-semibold tabular-nums">{nfCompact.format(34500)}</span>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                      <Engagement icon="commentRound" size={24} />
                      <span class="text-[11px] font-semibold tabular-nums">{nf.format(367)}</span>
                    </div>
                    <Engagement icon="reshare" size={24} />
                    <Engagement icon="send" size={24} />
                    {/* ••• more (horizontal). */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="5" cy="12" r="1.7" />
                      <circle cx="12" cy="12" r="1.7" />
                      <circle cx="19" cy="12" r="1.7" />
                    </svg>
                    {/* Audio cover — rounded square with a music note. */}
                    <span class="flex h-7 w-7 items-center justify-center rounded-md bg-ink ring-1 ring-white/50">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                      </svg>
                    </span>
                  </div>

                  {/* Bottom overlay — identity (avatar + username + Follow),
                      caption, then the audio attribution row. Sits low in the
                      bottom band, exactly where the Reels chrome renders it. */}
                  <div
                    class="absolute left-0 right-14 z-20 px-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    style="bottom:3%;"
                  >
                    <div class="flex items-center gap-2">
                      <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-grad-preview-start to-grad-ship-start text-[11px] font-semibold text-on-primary ring-2 ring-white">
                        {monogram(author.handle)}
                      </span>
                      <span class="truncate text-[13px] font-semibold leading-4">{author.handle}</span>
                      <span class="shrink-0 rounded-md border border-white/80 px-2 py-0.5 text-[11px] font-semibold leading-4">
                        {m.follow}
                      </span>
                    </div>
                    <p class="mt-2 line-clamp-2 whitespace-pre-wrap break-words text-[13px] leading-4">
                      {reels.text || <span class="text-white/80">{ap.placeholders.primary}</span>}
                    </p>
                  </div>

                </div>
              </div>

              {/* Too-short hint: a Reel caption under the comfortable floor reads
                  thin over the video. */}
              {reels.tooShort && (
                <p class="w-full text-[12px] leading-4 text-warning-deep">
                  {interp(ap.reelsTooShort, { min: ig.reelsMin, max: ig.reelsMax })}
                </p>
              )}
              {igSafeZones && (
                <p class="w-full text-[12px] leading-4 text-mute">{ap.safeZoneHint}</p>
              )}
            </div>
          )}

          {!isReels && (
          <PostCard
            layout="stacked"
            class={instagramView === 'desktop' ? 'feed-phone--desktop' : ''}
            avatar={
              <Avatar
                size="h-8 w-8"
                gradient="from-grad-preview-start to-grad-ship-start"
                initial={monogram(author.handle)}
              />
            }
            identity={
              /* Instagram: username + tick only — no separate display name. */
              <div class="flex items-center gap-1 leading-tight">
                <span class="truncate text-[13px] font-semibold text-ink">{author.handle}</span>
                {author.verified && <VerifiedTick size={13} class="shrink-0 text-link" />}
              </div>
            }
            trailing={<MoreDots size={16} />}
          >
            {/* Image-first: the photo is the hero, full-bleed below the header.
                Instagram crops to its 1.91:1 → 3:4 band. */}
            {image && (
              <div class="-mx-4 mt-3">
                <FeedImage src={image} kind={mediaKind} minRatio={IMAGE_RATIOS.instagram.min} maxRatio={IMAGE_RATIOS.instagram.max} />
              </div>
            )}
            {/* Instagram action row with inline counts — like / comment / reshare
                / send (paper plane); save (bookmark) pushed to the right. */}
            <div class="mt-3 flex items-center justify-between text-ink">
              <div class="flex items-center gap-4 text-[14px] font-semibold">
                <span class="flex items-center gap-1.5">
                  <Engagement icon="like" size={24} />
                  {nfCompact.format(19900)}
                </span>
                <span class="flex items-center gap-1.5">
                  <Engagement icon="commentRound" size={24} />
                  {nf.format(211)}
                </span>
                <span class="flex items-center gap-1.5">
                  <Engagement icon="reshare" size={24} />
                  {nf.format(231)}
                </span>
                <span class="flex items-center gap-1.5">
                  <Engagement icon="send" size={24} />
                  {nf.format(1276)}
                </span>
              </div>
              <Engagement icon="save" size={24} />
            </div>
            {/* Likes line — overlapping avatar thumbnails + "Liked by {handle}
                and others", with the username bolded. */}
            <div class="mt-2 flex items-center gap-2 text-[13px] text-ink">
              <span class="flex shrink-0 -space-x-2" aria-hidden="true">
                <span class="h-5 w-5 rounded-full bg-gradient-to-br from-grad-preview-start to-grad-ship-start ring-2 ring-canvas" />
                <span class="h-5 w-5 rounded-full bg-gradient-to-br from-grad-develop-start to-grad-preview-start ring-2 ring-canvas" />
                <span class="h-5 w-5 rounded-full bg-gradient-to-br from-grad-ship-start to-grad-develop-start ring-2 ring-canvas" />
              </span>
              <span class="truncate">
                {likedByParts[0]}
                <span class="font-semibold">{author.handle}</span>
                {likedByParts[1]}
              </span>
            </div>
            {/* Caption — bold username prefix, then the caption text + "more". */}
            <p class="mt-1 min-h-[42px] whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
              {instagramPreview.previewText && (
                <span class="font-semibold">{author.handle} </span>
              )}
              {instagramPreview.previewText}
              {instagramPreview.isTruncated && (
                <span class="text-slate-400">{ig.seeMoreLabel}</span>
              )}
              {instagramPreview.isTruncated && showFolded && (
                <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />
              )}
              {instagramPreview.isTruncated && showFolded && instagramPreview.hiddenText && (
                <span class="text-mute/45 line-through decoration-hairline-strong/40">
                  {instagramPreview.hiddenText}
                </span>
              )}
            </p>
            {/* Timestamp — e.g. "1 day ago". */}
            <p class="mt-1 text-[12px] text-mute">{author.timestamp}</p>
          </PostCard>
          )}
          {overCaptionLimit && (
            <p class="text-[12px] leading-4 text-error-deep">
              {interp(m.captionOver, {
                limit: nf.format(LIMITS.INSTAGRAM_CAPTION),
                excess: nf.format(activeCount - LIMITS.INSTAGRAM_CAPTION),
              })}
            </p>
          )}

          <div class="rounded-md border border-hairline bg-canvas p-4">
            <Meter
              value={Math.min(tagCount, LIMITS.INSTAGRAM_HASHTAGS_MAX)}
              max={LIMITS.INSTAGRAM_HASHTAGS_MAX}
              tone={tagTone}
              label={m.hashtagLabel}
              caption={`${nf.format(tagCount)} / ${nf.format(LIMITS.INSTAGRAM_HASHTAGS_MAX)}`}
            />
            <p class="mt-2.5 text-[12px] leading-4 text-body">
              {overHardLimit ? (
                <span class="text-error-deep">
                  {interp(m.over, {
                    limit: nf.format(LIMITS.INSTAGRAM_HASHTAGS_MAX),
                    excess: nf.format(tagCount - LIMITS.INSTAGRAM_HASHTAGS_MAX),
                  })}
                </span>
              ) : aboveRecommended ? (
                <span class="text-warning-deep">
                  {interp(m.approaching, {
                    n: nf.format(tagCount),
                    recommended: nf.format(LIMITS.INSTAGRAM_HASHTAGS_RECOMMENDED),
                    max: nf.format(LIMITS.INSTAGRAM_HASHTAGS_MAX),
                  })}
                </span>
              ) : tagCount > 0 ? (
                interp(m.within, {
                  recommended: nf.format(LIMITS.INSTAGRAM_HASHTAGS_RECOMMENDED),
                })
              ) : (
                m.none
              )}
            </p>
          </div>
        </div>
        {toolLinkHref && <ToolLink href={toolLinkHref}>{s.toolLinks.instagram}</ToolLink>}
      </Card>
  );

  const facebookCard = (
    <Card key="facebook">
        <CardHead
          eyebrow="Facebook"
          title={m.a11yLabel}
          logo={<BrandLogo brand="facebook" />}
        >
          <Segmented<FeedView>
            ariaLabel={`${m.title} Facebook`}
            value={facebookView}
            onChange={setFacebookView}
            options={[
              { value: 'desktop', label: s.linkedin.viewDesktop },
              { value: 'mobile', label: s.linkedin.viewMobile },
            ]}
          />
        </CardHead>

        <div class="px-4 pt-4 sm:px-5">
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            {facebookPreview.isTruncated ? (
              <Badge tone="warn">{s.linkedin.badgeTruncated}</Badge>
            ) : (
              <Badge tone="safe">{m.badgeClean}</Badge>
            )}
            <span class="font-mono text-[12px] text-mute tabular-nums">
              {nf.format(activeCount)} / {nf.format(facebookLimit)}
            </span>
          </div>
        </div>

        <div class="space-y-4 p-4 sm:p-5">
          <PostCard
            layout="stacked"
            class={facebookView === 'desktop' ? 'feed-phone--desktop' : ''}
            avatar={
              <Avatar
                size="h-10 w-10"
                gradient="from-grad-develop-start to-grad-preview-start"
                initial={monogram(author.displayName)}
              />
            }
            identity={
              <div class="leading-tight">
                {/* Name + tick — Facebook shows no @handle. */}
                <div class="flex items-center gap-1">
                  <span class="truncate text-[14px] font-semibold text-ink">{author.displayName}</span>
                  {author.verified && <VerifiedTick size={14} class="shrink-0 text-link" />}
                </div>
                {/* timestamp · 🌐 Public */}
                <p class="mt-0.5 flex items-center gap-1 text-[12px] text-mute">
                  {author.timestamp}
                  <span aria-hidden="true">·</span>
                  <Globe size={12} />
                  {m.audiencePublic}
                </p>
              </div>
            }
            trailing={<MoreDots size={16} />}
          >
            {/* Caption sits above the photo. Skip it for image-only posts. */}
            {(activeText !== '' || !image) && (
              <p class="mt-2 min-h-[42px] whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
                <LinkText text={facebookPreview.previewText} />
                {facebookPreview.isTruncated && (
                  <span class="text-slate-400"> {s.linkedin.seeMore}</span>
                )}
                {facebookPreview.isTruncated && showFolded && (
                  <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />
                )}
                {facebookPreview.isTruncated && showFolded && facebookPreview.hiddenText && (
                  <span class="text-mute/45 line-through decoration-hairline-strong/40">
                    {facebookPreview.hiddenText}
                  </span>
                )}
              </p>
            )}

            {/* Full-bleed image below the caption; tall portraits crop to 4:5. */}
            {image && (
              <div class="-mx-4 mt-3">
                <FeedImage src={image} kind={mediaKind} maxRatio={IMAGE_RATIOS.facebook.max} />
              </div>
            )}

            {/* Open Graph link-card simulation — view-only, rendered when a URL
                is present. The counter/badge above are unaffected (Req 9.4). */}
            {fbShowCard && (
              <LivePreviewCard
                platform="facebook"
                text={activeText}
                cardTitle={cardTitle}
                cardDescription={cardDescription}
                image={cardImage}
                mediaKind="image"
                lang={lang}
                s={s}
              />
            )}

            {/* Engagement summary — reaction bubbles + count on the left,
                comments · shares on the right. Facebook shows this row between
                the post content and the Like/Comment/Share bar. */}
            <div class="mt-3 flex items-center justify-between text-[13px] text-mute">
              <div class="flex items-center gap-1.5">
                <span class="flex -space-x-1" aria-hidden="true">
                  <span class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-link text-on-primary ring-1 ring-canvas">
                    <Engagement icon="thumbsUp" size={11} />
                  </span>
                  <span class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-error text-on-primary ring-1 ring-canvas">
                    <Engagement icon="like" size={11} />
                  </span>
                </span>
                <span>{nf.format(1200)}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span>{interp(m.commentsCount, { n: nf.format(234) })}</span>
                <span aria-hidden="true">·</span>
                <span>{interp(m.sharesCount, { n: nf.format(56) })}</span>
              </div>
            </div>

            {/* Labeled action bar — Like / Comment / Share. */}
            <ActionBar
              items={[
                { icon: 'thumbsUp', label: s.common.actions.like },
                { icon: 'comment', label: s.common.actions.comment },
                { icon: 'share', label: s.common.actions.share },
              ]}
            />
          </PostCard>

          <div
            class={`rounded-md border p-4 ${
              fancy
                ? 'border-warning/40 bg-warning-soft'
                : 'border-hairline bg-canvas'
            }`}
          >
            <div class="flex items-center justify-between">
              <span class="text-[13px] font-medium text-ink">
                {m.a11yLabel}
              </span>
              {fancy ? (
                <Badge tone="warn">{interp(m.flagged, { n: nf.format(fancyN) })}</Badge>
              ) : (
                <Badge tone="safe">{m.flaggedNone}</Badge>
              )}
            </div>
            <p class="mt-2 text-[12px] leading-4 text-body">
              {fancy ? (
                <span class="text-warning-deep">
                  {interp(plural(m.fancyDetected, fancyN), { n: nf.format(fancyN) })}
                </span>
              ) : (
                m.fancyClean
              )}
            </p>
          </div>
        </div>
        {facebookToolLinkHref && <ToolLink href={facebookToolLinkHref}>{s.toolLinks.facebook}</ToolLink>}
      </Card>
  );

  return (
    <div class="flex flex-col gap-5">
      {only === 'instagram'
        ? instagramCard
        : only === 'facebook'
          ? facebookCard
          : priority === 'facebook'
            ? <>{facebookCard}{instagramCard}</>
            : <>{instagramCard}{facebookCard}</>}
    </div>
  );
}
