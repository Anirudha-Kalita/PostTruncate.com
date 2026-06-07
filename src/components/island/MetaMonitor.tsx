/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import {
  detectHashtags,
  hasFancyUnicode,
  countFancyUnicode,
  charCount,
  sliceChars,
  LIMITS,
} from '../../lib/textTools';
import { Card, CardHead, Badge, Segmented, Meter, BrandLogo, ToolLink } from './ui';
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
}

const INSTAGRAM_DESKTOP_FOLD = 125;
const INSTAGRAM_MOBILE_FOLD = 125;
const FACEBOOK_DESKTOP_FOLD = 480;
const FACEBOOK_MOBILE_FOLD = 110;

function truncateForFeed(text: string, limit: number) {
  const count = charCount(text);
  return {
    isTruncated: count > limit,
    previewText: count > limit ? sliceChars(text, 0, limit) : text,
  };
}

/**
 * Independent Instagram and Facebook monitors. Instagram owns caption preview
 * and hashtag concentration; Facebook owns feed preview and accessibility.
 */
export function MetaMonitor({ text, lang, s, toolLinkHref, facebookToolLinkHref, priority }: Props) {
  const m = s.meta;
  const nf = new Intl.NumberFormat(lang);
  const [instagramView, setInstagramView] = useState<FeedView>('mobile');
  const [facebookView, setFacebookView] = useState<FeedView>('mobile');
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
  const instagramLimit =
    instagramView === 'mobile' ? INSTAGRAM_MOBILE_FOLD : INSTAGRAM_DESKTOP_FOLD;
  const facebookLimit =
    facebookView === 'mobile' ? FACEBOOK_MOBILE_FOLD : FACEBOOK_DESKTOP_FOLD;
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
          <article
            class={`feed-phone rounded-md border border-hairline bg-canvas p-4 ${
              instagramView === 'desktop' ? 'feed-phone--desktop' : ''
            }`}
          >
            <header class="flex items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-2.5">
                <span class="h-8 w-8 shrink-0 rounded-full bg-linear-to-br from-grad-preview-start to-grad-ship-start" />
                <div class="min-w-0 leading-tight">
                  <span class="text-[13px] font-semibold text-ink">{s.common.profileName}</span>
                  <span class="ml-1 text-[12px] text-mute">{s.common.handle}</span>
                </div>
              </div>
              <span class="flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-mute">
                <BrandLogo brand="instagram" size={16} />
                Instagram
              </span>
            </header>
            <p class="mt-2 min-h-[42px] whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
              {instagramPreview.previewText}
              {instagramPreview.isTruncated && (
                <span class="text-slate-400">{s.linkedin.seeMore}</span>
              )}
            </p>
          </article>
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
          <article
            class={`feed-phone rounded-md border border-hairline bg-canvas p-4 ${
              facebookView === 'desktop' ? 'feed-phone--desktop' : ''
            }`}
          >
            <header class="flex items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-2.5">
                <span class="h-8 w-8 shrink-0 rounded-full bg-linear-to-br from-grad-develop-start to-grad-preview-start" />
                <div class="min-w-0 leading-tight">
                  <span class="text-[13px] font-semibold text-ink">{s.common.profileName}</span>
                  <span class="ml-1 text-[12px] text-mute">{s.common.handle}</span>
                </div>
              </div>
              <span class="flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-mute">
                <BrandLogo brand="facebook" size={16} />
                Facebook
              </span>
            </header>
            <p class="mt-2 min-h-[42px] whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
              {facebookPreview.previewText}
              {facebookPreview.isTruncated && (
                <span class="text-slate-400"> {s.linkedin.seeMore}</span>
              )}
            </p>
          </article>

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
      {priority === 'facebook'
        ? <>{facebookCard}{instagramCard}</>
        : <>{instagramCard}{facebookCard}</>}
    </div>
  );
}
