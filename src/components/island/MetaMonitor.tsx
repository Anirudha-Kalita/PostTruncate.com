/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import {
  detectHashtags,
  hasFancyUnicode,
  countFancyUnicode,
  charCount,
  LIMITS,
} from '../../lib/textTools';
import { Card, CardHead, Badge, Segmented, Meter, BrandLogo } from './ui';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

type FeedView = 'desktop' | 'mobile';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
}

const INSTAGRAM_DESKTOP_FOLD = 125;
const INSTAGRAM_MOBILE_FOLD = 125;
const FACEBOOK_DESKTOP_FOLD = 480;
const FACEBOOK_MOBILE_FOLD = 110;

function truncateForFeed(text: string, limit: number) {
  const chars = Array.from(text);
  return {
    isTruncated: chars.length > limit,
    previewText:
      chars.length > limit ? chars.slice(0, limit).join('') : text,
  };
}

/**
 * Independent Instagram and Facebook monitors. Instagram owns caption preview
 * and hashtag concentration; Facebook owns feed preview and accessibility.
 */
export function MetaMonitor({ text, lang, s }: Props) {
  const m = s.meta;
  const nf = new Intl.NumberFormat(lang);
  const [instagramView, setInstagramView] = useState<FeedView>('mobile');
  const [facebookView, setFacebookView] = useState<FeedView>('mobile');
  const hashtags = detectHashtags(text);
  const tagCount = hashtags.length;
  const overTagLimit = tagCount > LIMITS.INSTAGRAM_HASHTAGS;
  const tagTone = overTagLimit ? 'danger' : tagCount > 20 ? 'warn' : 'safe';

  const fancy = hasFancyUnicode(text);
  const fancyN = countFancyUnicode(text);

  const activeText = text.trim();
  const activeCount = charCount(activeText);
  const instagramLimit =
    instagramView === 'mobile' ? INSTAGRAM_MOBILE_FOLD : INSTAGRAM_DESKTOP_FOLD;
  const facebookLimit =
    facebookView === 'mobile' ? FACEBOOK_MOBILE_FOLD : FACEBOOK_DESKTOP_FOLD;
  const instagramPreview = truncateForFeed(activeText, instagramLimit);
  const facebookPreview = truncateForFeed(activeText, facebookLimit);

  return (
    <>
      <Card>
        <CardHead
          eyebrow="Instagram"
          title={m.title}
          logo={<BrandLogo brand="instagram" />}
        >
          <Segmented<FeedView>
            ariaLabel="Instagram feed view"
            value={instagramView}
            onChange={setInstagramView}
            options={[
              { value: 'desktop', label: 'Desktop' },
              { value: 'mobile', label: 'Mobile' },
            ]}
          />
        </CardHead>

        <div class="px-4 pt-4 sm:px-5">
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            {instagramPreview.isTruncated ? (
              <Badge tone="warn">Truncated</Badge>
            ) : (
              <Badge tone="safe">Fits feed</Badge>
            )}
            <span class="font-mono text-[12px] text-mute tabular-nums">
              {nf.format(activeCount)} / {nf.format(instagramLimit)}
            </span>
          </div>
        </div>

        <div class="space-y-4 p-4 sm:p-5">
          <article class="rounded-md border border-hairline bg-canvas p-4">
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
              {instagramPreview.isTruncated && <span class="text-slate-400">... more</span>}
            </p>
          </article>

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
              ) : tagCount > 20 ? (
                m.approaching
              ) : tagCount > 0 ? (
                m.within
              ) : (
                m.none
              )}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHead
          eyebrow="Facebook"
          title={m.a11yLabel}
          logo={<BrandLogo brand="facebook" />}
        >
          <Segmented<FeedView>
            ariaLabel="Facebook feed view"
            value={facebookView}
            onChange={setFacebookView}
            options={[
              { value: 'desktop', label: 'Desktop' },
              { value: 'mobile', label: 'Mobile' },
            ]}
          />
        </CardHead>

        <div class="px-4 pt-4 sm:px-5">
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            {facebookPreview.isTruncated ? (
              <Badge tone="warn">Truncated</Badge>
            ) : (
              <Badge tone="safe">Fits feed</Badge>
            )}
            <span class="font-mono text-[12px] text-mute tabular-nums">
              {nf.format(activeCount)} / {nf.format(facebookLimit)}
            </span>
          </div>
        </div>

        <div class="space-y-4 p-4 sm:p-5">
          <article class="rounded-md border border-hairline bg-canvas p-4">
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
              {facebookPreview.isTruncated && <span class="text-slate-400"> See more</span>}
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
      </Card>
    </>
  );
}
