/** @jsxImportSource preact */
import {
  detectHashtags,
  hasFancyUnicode,
  countFancyUnicode,
  charCount,
  sliceChars,
  FOLDS,
  LIMITS,
} from '../../lib/textTools';
import {
  Card,
  CardHead,
  Badge,
  Segmented,
  Meter,
  FoldMarker,
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
export function MetaMonitor({ text, lang, s, toolLinkHref, facebookToolLinkHref, priority, only, instagramView, setInstagramView, facebookView, setFacebookView }: Props) {
  const m = s.meta;
  const nf = new Intl.NumberFormat(lang);
  const author = previewAuthor(s.common);
  const hashtags = detectHashtags(text);
  const tagCount = hashtags.length;
  const overTagLimit = tagCount > LIMITS.INSTAGRAM_HASHTAGS;
  const tagTone =
    overTagLimit || tagCount >= LIMITS.INSTAGRAM_HASHTAGS - 1
      ? overTagLimit ? 'danger' : 'warn'
      : 'safe';

  const fancy = hasFancyUnicode(text);
  const fancyN = countFancyUnicode(text);

  const activeText = text.trim();
  const activeCount = charCount(activeText);
  const overCaptionLimit = activeCount > LIMITS.INSTAGRAM_CAPTION;
  const instagramLimit = FOLDS.instagram[instagramView];
  const facebookLimit = FOLDS.facebook[facebookView];
  const instagramPreview = truncateForFeed(activeText, instagramLimit);
  const facebookPreview = truncateForFeed(activeText, facebookLimit);

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
              {instagramPreview.isTruncated && (
                <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />
              )}
              {instagramPreview.isTruncated && instagramPreview.hiddenText && (
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
              value={Math.min(tagCount, LIMITS.INSTAGRAM_HASHTAGS)}
              max={LIMITS.INSTAGRAM_HASHTAGS}
              tone={tagTone}
              label={m.hashtagLabel}
              caption={`${nf.format(tagCount)} / ${nf.format(LIMITS.INSTAGRAM_HASHTAGS)}`}
            />
            <p class="mt-2.5 text-[12px] leading-4 text-body">
              {overTagLimit ? (
                <span class="text-error-deep">
                  {interp(m.over, {
                    limit: nf.format(LIMITS.INSTAGRAM_HASHTAGS),
                    excess: nf.format(tagCount - LIMITS.INSTAGRAM_HASHTAGS),
                  })}
                </span>
              ) : tagCount >= LIMITS.INSTAGRAM_HASHTAGS - 1 ? (
                m.approaching
              ) : tagCount > 0 ? (
                m.within
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
            <p class="mt-2 min-h-[42px] whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
              {facebookPreview.previewText}
              {facebookPreview.isTruncated && (
                <span class="text-slate-400"> {s.linkedin.seeMore}</span>
              )}
              {facebookPreview.isTruncated && (
                <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />
              )}
              {facebookPreview.isTruncated && facebookPreview.hiddenText && (
                <span class="text-mute/45 line-through decoration-hairline-strong/40">
                  {facebookPreview.hiddenText}
                </span>
              )}
            </p>

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
