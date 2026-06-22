/** @jsxImportSource preact */
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
  mutatePreviewText,
} from '../../lib/textTools';
import { LivePreviewCard } from './LivePreviewCard';
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

  // Facebook link-card simulation (Requirement 9): Facebook is the only Meta
  // preview-card platform (Instagram stays plain-text, no card). The badge and
  // counter above keep measuring the full `activeText`; only the rendered
  // Facebook body swaps to the URL-omitted copy when the raw URL is dropped.
  const fbLinkData = extractLinkData(activeText, 'facebook');
  const fbShowCard = fbLinkData.firstUrl !== undefined;
  const facebookDisplay = fbShowCard
    ? truncateForFeed(mutatePreviewText(activeText, fbLinkData.removesRawUrl), facebookLimit)
    : facebookPreview;

  const instagramCard = (
    <Card key="instagram">
        <CardHead
          eyebrow="Instagram"
          title={m.title}
          logo={<BrandLogo brand="instagram" />}
        >
          <Segmented<FeedView>
            ariaLabel={`${m.title} Instagram`}
            value={instagramView}
            onChange={setInstagramView}
            options={[
              { value: 'desktop', label: s.linkedin.viewDesktop },
              { value: 'mobile', label: s.linkedin.viewMobile },
            ]}
          />
        </CardHead>

        <div class="px-4 pt-4 sm:px-5">
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            {overCaptionLimit ? (
              <Badge tone="danger">{m.badgeCaptionOver}</Badge>
            ) : instagramPreview.isTruncated ? (
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
                : `${nf.format(activeCount)} / ${nf.format(instagramLimit)}`}
            </span>
          </div>
        </div>

        <div class="space-y-4 p-4 sm:p-5">
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
            {/* Faint Instagram action row — like / comment / share. */}
            <div class="mt-3 flex max-w-[110px] items-center justify-between text-mute/45">
              <Engagement icon="like" size={20} />
              <Engagement icon="comment" size={20} />
              <Engagement icon="share" size={20} />
            </div>
            <p class="mt-2 min-h-[42px] whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
              {instagramPreview.previewText}
              {instagramPreview.isTruncated && (
                <span class="text-slate-400">{s.linkedin.seeMore}</span>
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
          </PostCard>
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
                {facebookDisplay.previewText}
                {facebookDisplay.isTruncated && (
                  <span class="text-slate-400"> {s.linkedin.seeMore}</span>
                )}
                {facebookDisplay.isTruncated && showFolded && (
                  <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />
                )}
                {facebookDisplay.isTruncated && showFolded && facebookDisplay.hiddenText && (
                  <span class="text-mute/45 line-through decoration-hairline-strong/40">
                    {facebookDisplay.hiddenText}
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
