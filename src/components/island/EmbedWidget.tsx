/** @jsxImportSource preact */
import { useState, useMemo } from 'preact/hooks';
import { charCount, wordCount, FOLDS, LIMITS } from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';

type PlatformKey = 'twitter' | 'linkedin' | 'threads' | 'instagram' | 'facebook' | 'tiktok' | 'sms';

const PLATFORM_LIMITS: Record<PlatformKey, number> = {
  twitter: LIMITS.TWEET,
  linkedin: LIMITS.LINKEDIN_POST,
  threads: LIMITS.THREADS,
  instagram: LIMITS.INSTAGRAM_CAPTION,
  facebook: LIMITS.FACEBOOK_POST,
  tiktok: LIMITS.TIKTOK_CAPTION_SAFE,
  sms: 160,
};

function getFoldLimit(platform: PlatformKey): number {
  if (platform === 'twitter') return LIMITS.TWEET;
  if (platform === 'sms') return 160;
  return FOLDS[platform]?.mobile ?? PLATFORM_LIMITS[platform];
}

const PLATFORM_ORDER: PlatformKey[] = [
  'twitter',
  'linkedin',
  'threads',
  'instagram',
  'facebook',
  'tiktok',
  'sms',
];

interface Props {
  lang: string;
  s: IslandStrings['embed'];
}

export function EmbedWidget({ lang, s }: Props) {
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState<PlatformKey>('twitter');
  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);

  const chars = charCount(text);
  const words = wordCount(text);
  const limit = PLATFORM_LIMITS[platform];
  const fold = getFoldLimit(platform);
  const foldPct = Math.min(100, (fold / limit) * 100);
  const isOver = chars > limit;
  const pct = Math.min(100, Math.round((chars / limit) * 100));

  return (
    <div class="flex flex-col gap-3">
      {/* Platform selector */}
      <div class="flex flex-wrap gap-1.5" role="tablist">
        {PLATFORM_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={key === platform}
            onClick={() => setPlatform(key)}
            class={`rounded-pill px-3 py-1 text-[12px] font-medium leading-5 transition-[background,color] duration-100 ${
              key === platform
                ? 'bg-ink text-on-primary'
                : 'border border-hairline bg-canvas text-body hover:text-ink'
            }`}
          >
            {s.platforms[key]}
          </button>
        ))}
      </div>

      {/* Editor */}
      <textarea
        value={text}
        onInput={(e) => {
          const el = e.currentTarget as HTMLTextAreaElement;
          setText(el.value);
          // Grow to fit content up to max-height; beyond that, scroll internally.
          // This keeps the tab bar, stats row, and footer always in view.
          el.style.height = 'auto';
          el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
        }}
        placeholder={s.placeholders[platform]}
        rows={3}
        spellcheck
        style={{
          backgroundImage: `linear-gradient(to right, transparent ${foldPct}%, var(--color-canvas-soft-2) ${foldPct}%)`,
          maxHeight: '220px',
          overflowY: 'auto',
        }}
        class="block w-full resize-none rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
      />

      {/* Progress bar */}
      <div class="h-1.5 w-full overflow-hidden rounded-pill bg-canvas-soft-2">
        <div
          class={`h-full rounded-pill transition-[width] duration-200 ease-out ${
            isOver ? 'bg-error' : pct >= 90 ? 'bg-warning' : 'bg-cyan-deep'
          }`}
          style={`width:${pct}%`}
        />
      </div>

      {/* Stats row */}
      <div class="flex items-center justify-between gap-4">
        <div class="grid grid-cols-1 gap-2">
          <div class="rounded-md border border-hairline bg-canvas px-3 py-2">
            <div class="font-mono text-[20px] font-medium leading-7 tabular-nums text-ink">
              {nf.format(words)}
            </div>
            <div class="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-mute">
              {s.wordCount}
            </div>
          </div>
        </div>

        <div class="shrink-0 text-right">
          <p
            class={`font-mono text-[18px] font-medium tabular-nums ${
              isOver ? 'text-error' : 'text-ink'
            }`}
          >
            {nf.format(chars)} / {nf.format(limit)}
          </p>
          {platform === 'twitter' && (
            <p class="font-mono text-[11px] text-mute mt-0.5">Hard limit · no fold</p>
          )}
        </div>
      </div>

      {/* Backlink */}
      <div class="text-center text-[12px] text-mute pt-1">
        Powered by{' '}
        <a
          href="https://posttruncate.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="font-medium text-ink hover:underline"
        >
          PostTruncate
        </a>
      </div>
    </div>
  );
}
