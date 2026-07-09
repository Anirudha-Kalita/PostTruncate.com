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
  return (FOLDS as Record<string, { mobile: number; desktop: number }>)[platform]?.mobile ?? PLATFORM_LIMITS[platform];
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
  // foldPct: what percentage of the textarea width is "before the fold" (transparent)
  const foldPct = Math.min(100, (fold / limit) * 100);
  const isOver = chars > limit;
  const pct = Math.min(100, Math.round((chars / limit) * 100));

  return (
    <div class="ew-root">
      {/* Platform selector */}
      <div class="ew-tabs" role="tablist">
        {PLATFORM_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={key === platform}
            onClick={() => setPlatform(key)}
            class={`ew-tab ${key === platform ? 'ew-tab--active' : ''}`}
          >
            {s.platforms[key]}
          </button>
        ))}
      </div>

      {/* Editor with fold overlay */}
      <div class="ew-editor-wrap">
        <textarea
          value={text}
          onInput={(e) => {
            const el = e.currentTarget as HTMLTextAreaElement;
            setText(el.value);
            // Grow to fit content, up to 220px; beyond that, scroll internally
            // so tabs + stats + footer remain always visible.
            el.style.height = 'auto';
            el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
          }}
          placeholder={s.placeholders[platform]}
          rows={4}
          spellcheck
          style={{ backgroundImage: `linear-gradient(to right, transparent ${foldPct}%, rgba(0,0,0,0.04) ${foldPct}%)` }}
          class="ew-textarea"
        />
      </div>

      {/* Progress bar */}
      <div class="ew-progress-track">
        <div
          class={`ew-progress-fill ${isOver ? 'ew-progress-fill--over' : pct >= 90 ? 'ew-progress-fill--warn' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Stats row */}
      <div class="ew-stats-row">
        <div class="ew-counters">
          <div class="ew-counter">
            <span class={`ew-counter-num ${isOver ? 'ew-counter-num--over' : ''}`}>
              {nf.format(chars)}
            </span>
            <span class="ew-counter-label">{s.charCount}</span>
          </div>
          <div class="ew-counter">
            <span class="ew-counter-num">{nf.format(words)}</span>
            <span class="ew-counter-label">{s.wordCount}</span>
          </div>
        </div>

        <div class="ew-limit-display">
          <span class={`ew-limit-num ${isOver ? 'ew-limit-num--over' : ''}`}>
            {nf.format(chars)} / {nf.format(limit)}
          </span>
          {platform === 'twitter' && (
            <span class="ew-hard-limit-note">Hard limit · no fold</span>
          )}
        </div>
      </div>

      {/* Divider + Backlink */}
      <div class="ew-divider" />
      <div class="ew-backlink">
        Powered by{' '}
        <a
          href="https://posttruncate.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="ew-backlink-anchor"
        >
          PostTruncate
        </a>
      </div>

      <style>{`
        .ew-root {
          font-family: -apple-system, 'Geist Variable', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ── Tabs ─────────────────────────────────────────────── */
        .ew-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .ew-tab {
          display: inline-flex;
          align-items: center;
          height: 32px;
          padding: 0 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          border: 1.5px solid #e5e5e5;
          background: #ffffff;
          color: #525252;
          cursor: pointer;
          transition: background 0.1s, color 0.1s, border-color 0.1s;
          white-space: nowrap;
        }
        .ew-tab:hover {
          border-color: #a3a3a3;
          color: #171717;
        }
        .ew-tab--active {
          background: #171717;
          color: #ffffff;
          border-color: #171717;
        }
        .ew-tab--active:hover {
          background: #262626;
          border-color: #262626;
        }

        /* ── Editor ───────────────────────────────────────────── */
        .ew-editor-wrap {
          position: relative;
          border-radius: 10px;
          border: 1.5px solid #e5e5e5;
          overflow: hidden;
          background: #ffffff;
        }
        .ew-textarea {
          display: block;
          width: 100%;
          min-height: 110px;
          max-height: 220px;
          overflow-y: auto;
          resize: none;
          background: transparent;
          border: none;
          outline: none;
          padding: 12px 14px;
          font-size: 15px;
          line-height: 1.6;
          color: #171717;
          font-family: inherit;
          position: relative;
          z-index: 1;
        }
        .ew-textarea::placeholder {
          color: #a3a3a3;
        }

        /* ── Fold zone ────────────────────────────────────────── */

        /* ── Progress bar ─────────────────────────────────────── */
        .ew-progress-track {
          height: 4px;
          width: 100%;
          border-radius: 999px;
          background: #f5f5f5;
          overflow: hidden;
        }
        .ew-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: #171717;
          transition: width 0.2s ease-out;
        }
        .ew-progress-fill--warn { background: #f59e0b; }
        .ew-progress-fill--over { background: #ef4444; }

        /* ── Stats row ────────────────────────────────────────── */
        .ew-stats-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          padding: 2px 0;
        }
        .ew-counters {
          display: flex;
          gap: 20px;
        }
        .ew-counter {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ew-counter-num {
          font-size: 22px;
          font-weight: 600;
          line-height: 1.1;
          color: #171717;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.5px;
        }
        .ew-counter-num--over { color: #ef4444; }
        .ew-counter-label {
          font-size: 11px;
          color: #a3a3a3;
          text-transform: lowercase;
        }
        .ew-limit-display {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .ew-limit-num {
          font-size: 15px;
          font-weight: 500;
          color: #525252;
          font-variant-numeric: tabular-nums;
        }
        .ew-limit-num--over { color: #ef4444; }
        .ew-hard-limit-note {
          font-size: 10px;
          color: #a3a3a3;
          letter-spacing: 0.02em;
        }

        /* ── Footer ───────────────────────────────────────────── */
        .ew-divider {
          height: 1px;
          background: #f0f0f0;
        }
        .ew-backlink {
          text-align: center;
          font-size: 12px;
          color: #a3a3a3;
        }
        .ew-backlink-anchor {
          font-weight: 600;
          color: #525252;
          text-decoration: none;
        }
        .ew-backlink-anchor:hover {
          text-decoration: underline;
          color: #171717;
        }
      `}</style>
    </div>
  );
}
