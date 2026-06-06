/** @jsxImportSource preact */
import { useState, useMemo } from 'preact/hooks';
import { charCount, wordCount } from '../../lib/textTools';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

type PlatformKey = 'twitter' | 'linkedin' | 'threads' | 'instagram' | 'sms';

const PLATFORM_LIMITS: Record<PlatformKey, number> = {
  twitter: 280,
  linkedin: 3000,
  threads: 500,
  instagram: 2200,
  sms: 160,
};

const PLATFORM_ORDER: PlatformKey[] = [
  'twitter',
  'linkedin',
  'threads',
  'instagram',
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
  const remaining = limit - chars;
  const isOver = remaining < 0;
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
        onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
        placeholder={s.placeholder}
        rows={7}
        spellcheck
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
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-md border border-hairline bg-canvas px-3 py-2">
            <div
              class={`font-mono text-[20px] font-medium leading-7 tabular-nums ${
                isOver ? 'text-error' : 'text-ink'
              }`}
            >
              {nf.format(chars)}
            </div>
            <div class="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-mute">
              {s.charCount}
            </div>
          </div>
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
            class={`font-mono text-[14px] font-medium tabular-nums ${
              isOver ? 'text-error' : 'text-body'
            }`}
          >
            {isOver
              ? interp(s.overLimit, { n: nf.format(Math.abs(remaining)) })
              : interp(s.remaining, { n: nf.format(remaining) })}
          </p>
          <p class="font-mono text-[11px] text-mute">{nf.format(limit)}</p>
        </div>
      </div>
    </div>
  );
}
