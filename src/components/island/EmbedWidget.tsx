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

const PLATFORM_ICONS: Record<PlatformKey, any> = {
  twitter: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  linkedin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  threads: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.5 11.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5 1-2.5 2.5-2.5 2.5 1 2.5 2.5z"></path><path d="M14.5 11.5v.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5v-1.5c0-4.5-3.5-8-8-8s-8 3.5-8 8 3.5 8 8 8"></path>
    </svg>
  ),
  instagram: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  ),
  facebook: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  tiktok: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.61.94-5.18 3.02-6.72 1.95-1.42 4.52-1.78 6.77-.96V10.1c-1.39-.77-3.13-.76-4.52.05-1.11.66-1.9 1.8-2.07 3.08-.23 1.82 1.09 3.52 2.87 3.9 1.48.33 3.08-.07 4.1-1.13.88-.93 1.35-2.22 1.36-3.51.02-4.17 0-8.34.01-12.51l-.01-.06z"/>
    </svg>
  ),
  sms: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
    </svg>
  ),
};

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
      <div class="ew-tabs-scroll-area">
        <div class="ew-tabs" role="tablist">
          {PLATFORM_ORDER.map((key) => {
            const Icon = PLATFORM_ICONS[key];
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={key === platform}
                onClick={() => setPlatform(key)}
                class={`ew-tab ${key === platform ? 'ew-tab--active' : ''}`}
              >
                <div class="ew-tab-icon">
                  <Icon />
                </div>
                {key === 'twitter' ? 'X / Twitter' : s.platforms[key]}
              </button>
            );
          })}
        </div>
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
        
        {/* Progress bar line right at the bottom edge of textarea */}
        <div class="ew-progress-track">
          <div
            class={`ew-progress-fill ${isOver ? 'ew-progress-fill--over' : pct >= 90 ? 'ew-progress-fill--warn' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div class="ew-stats-row">
        <div class="ew-counters">
          {/* Characters */}
          <div class="ew-counter-box">
            <div class="ew-counter-icon ew-counter-icon--blue">
              <span class="ew-font-icon ew-font-icon-lg">A</span><span class="ew-font-icon ew-font-icon-sm">a</span>
            </div>
            <div class="ew-counter-content">
              <span class={`ew-counter-num ${isOver ? 'ew-counter-num--over' : ''}`}>
                {nf.format(chars)}
              </span>
              <span class="ew-counter-label">{s.charCount}</span>
            </div>
          </div>
          
          <div class="ew-counter-divider"></div>

          {/* Words */}
          <div class="ew-counter-box">
            <div class="ew-counter-icon ew-counter-icon--green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="14" y1="18" y2="18"></line>
              </svg>
            </div>
            <div class="ew-counter-content">
              <span class="ew-counter-num">{nf.format(words)}</span>
              <span class="ew-counter-label">{s.wordCount}</span>
            </div>
          </div>
        </div>

        <div class="ew-limit-display">
          <span class={`ew-limit-num ${isOver ? 'ew-limit-num--over' : ''}`}>
            {nf.format(chars)} <span class="ew-limit-slash">/</span> {nf.format(limit)}
          </span>
          {platform === 'twitter' && (
            <span class="ew-hard-limit-note">Hard limit &bull; no fold</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div class="ew-footer">
        <div class="ew-footer-line" />
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
        <div class="ew-footer-line" />
      </div>

      <style>{`
        .ew-root {
          font-family: -apple-system, 'Geist Variable', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        /* ── Tabs ─────────────────────────────────────────────── */
        .ew-tabs-scroll-area {
          margin-bottom: 2px;
        }
        .ew-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: 4px;
        }
        .ew-tab {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          height: 32px;
          padding: 0 12px 0 10px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          border: 1px solid #e5e5e5;
          background: #ffffff;
          color: #6b7280;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .ew-tab:hover {
          border-color: #d1d5db;
          color: #374151;
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
        .ew-tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
        }

        /* ── Editor ───────────────────────────────────────────── */
        .ew-editor-wrap {
          position: relative;
          border-radius: 12px;
          border: 1px solid #e5e5e5;
          overflow: hidden;
          background: #ffffff;
          margin-bottom: 8px;
        }
        .ew-textarea {
          display: block;
          width: 100%;
          min-height: 120px;
          max-height: 220px;
          overflow-y: auto;
          resize: none;
          background: transparent;
          border: none;
          outline: none;
          padding: 16px;
          font-size: 16px;
          line-height: 1.6;
          color: #111827;
          font-family: inherit;
          position: relative;
          z-index: 1;
        }
        .ew-textarea::placeholder {
          color: #9ca3af;
        }

        /* ── Progress bar ─────────────────────────────────────── */
        .ew-progress-track {
          height: 5px;
          width: 100%;
          background: #f3f4f6;
          overflow: hidden;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 2;
        }
        .ew-progress-fill {
          height: 100%;
          background: #111827;
          transition: width 0.3s ease-out;
        }
        .ew-progress-fill--warn { background: #f59e0b; }
        .ew-progress-fill--over { background: #ef4444; }

        /* ── Stats row ────────────────────────────────────────── */
        .ew-stats-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
          margin-bottom: 8px;
        }
        .ew-counters {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .ew-counter-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ew-counter-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ew-counter-icon--blue {
          background: #eef5ff;
          color: #0066e0;
        }
        .ew-counter-icon--green {
          background: #edfcf2;
          color: #16a34a;
        }
        .ew-font-icon {
          font-weight: 500;
          line-height: 1;
        }
        .ew-font-icon-lg { font-size: 20px; }
        .ew-font-icon-sm { font-size: 15px; margin-left: 0.5px; }
        
        .ew-counter-content {
          display: flex;
          flex-direction: column;
          gap: 0px;
        }
        .ew-counter-num {
          font-size: 26px;
          font-weight: 600;
          line-height: 1.1;
          color: #111827;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.5px;
        }
        .ew-counter-num--over { color: #ef4444; }
        .ew-counter-label {
          font-size: 13px;
          color: #9ca3af;
        }
        
        .ew-counter-divider {
          width: 1px;
          height: 36px;
          background: #e5e5e5;
        }

        .ew-limit-display {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .ew-limit-num {
          font-size: 22px;
          font-weight: 500;
          color: #6b7280;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.5px;
        }
        .ew-limit-slash {
          color: #d1d5db;
          font-weight: 400;
        }
        .ew-limit-num--over { color: #ef4444; }
        .ew-hard-limit-note {
          font-size: 11px;
          color: #9ca3af;
          letter-spacing: 0.01em;
        }

        /* ── Footer ───────────────────────────────────────────── */
        .ew-footer {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 4px;
        }
        .ew-footer-line {
          flex: 1;
          height: 1px;
          background: #f0f0f0;
        }
        .ew-backlink {
          text-align: center;
          font-size: 13px;
          color: #9ca3af;
        }
        .ew-backlink-anchor {
          font-weight: 500;
          color: #0066e0;
          text-decoration: none;
        }
        .ew-backlink-anchor:hover {
          text-decoration: underline;
          color: #0761d1;
        }
      `}</style>
    </div>
  );
}

