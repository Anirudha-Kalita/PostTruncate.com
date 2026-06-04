/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import { charCount, detectUrls, LIMITS } from '../../lib/textTools';
import { Card, CardHead, Badge, Segmented, Meter, BrandLogo } from './ui';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

type FeedView = 'desktop' | 'mobile';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
}

const THREADS_DESKTOP_FOLD = LIMITS.THREADS;
const THREADS_MOBILE_FOLD = 250;

/**
 * Threads (by Meta) preview. A single post caps at 500 characters. The
 * validator keeps that full allowance, while the mock mobile card visually
 * folds one-block posts behind a "... more" affordance.
 */
export function ThreadsPreview({ text, lang, s }: Props) {
  const th = s.threads;
  const nf = new Intl.NumberFormat(lang);
  const [view, setView] = useState<FeedView>('mobile');
  const trimmed = text.trim();
  const count = charCount(trimmed);
  const urls = detectUrls(trimmed);
  const posts = trimmed ? [trimmed] : [];
  const isOverLimit = count > LIMITS.THREADS;
  const visualFold =
    view === 'mobile' ? THREADS_MOBILE_FOLD : THREADS_DESKTOP_FOLD;

  return (
    <Card>
      <CardHead
        eyebrow="Threads"
        title={th.title}
        logo={<BrandLogo brand="threads" />}
      >
        <Segmented<FeedView>
          ariaLabel="Threads feed view"
          value={view}
          onChange={setView}
          options={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'mobile', label: 'Mobile' },
          ]}
        />
      </CardHead>

      <div class="px-4 pt-4 sm:px-5">
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {!trimmed ? (
            <Badge tone="neutral" dot={false}>{th.badgeIdle}</Badge>
          ) : (
            <Badge tone={isOverLimit ? 'danger' : 'safe'}>{th.badgeSingle}</Badge>
          )}
          <span class="text-[13px] text-body">
            {urls.length > 0
              ? interp(plural(th.links, urls.length), { n: nf.format(urls.length) })
              : th.charLength}
          </span>
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {nf.format(count)} / {nf.format(LIMITS.THREADS)}
          </span>
        </div>
        <div class="mt-3">
          <Meter
            value={Math.min(count, LIMITS.THREADS)}
            max={LIMITS.THREADS}
            tone={isOverLimit ? 'danger' : count > LIMITS.THREADS * 0.9 ? 'warn' : 'safe'}
          />
        </div>
      </div>

      <div class="space-y-3 p-4 sm:p-5">
        {posts.length === 0 ? (
          <article class="rounded-md border border-hairline bg-canvas p-4 text-[14px] text-mute">
            {interp(th.placeholder, { limit: nf.format(LIMITS.THREADS) })}
          </article>
        ) : (
          posts.map((post) => (
            <article class="relative rounded-md border border-hairline bg-canvas p-4">
              <header class="flex items-center gap-2.5">
                <span class="h-8 w-8 shrink-0 rounded-full bg-linear-to-br from-grad-preview-start to-grad-ship-start" />
                <div class="min-w-0 leading-tight">
                  <span class="text-[13px] font-semibold text-ink">{s.common.profileName}</span>
                  <span class="ml-1 text-[12px] text-mute">{s.common.handle}</span>
                </div>
              </header>
              <ThreadsPostText post={post} visualFold={visualFold} />
              <span class="mt-2 block font-mono text-[11px] text-mute/70 tabular-nums">
                {interp(s.common.charsSuffix, { n: nf.format(charCount(post)) })}
              </span>
            </article>
          ))
        )}
      </div>
    </Card>
  );
}

function ThreadsPostText({
  post,
  visualFold,
}: {
  post: string;
  visualFold: number;
}) {
  const shouldFold = !/[\r\n]/.test(post) && charCount(post) > visualFold;
  const visible = shouldFold
    ? Array.from(post).slice(0, visualFold).join('')
    : post;

  return (
    <p class="mt-2 whitespace-pre-wrap break-words text-[14px] leading-[21px] text-ink">
      {visible}
      {shouldFold && <span class="text-mute">... more</span>}
    </p>
  );
}
