/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';
import type { IslandStrings } from '../../i18n/types';

// ──────────────────────────────────────────────────────────────────────────
// Shared island primitives. Styled with the project's Tailwind v4 theme
// utilities (generated from the @theme tokens in global.css). Kept tiny and
// presentational so every preview card composes from the same vocabulary.
// ──────────────────────────────────────────────────────────────────────────

export type Tone = 'safe' | 'warn' | 'danger' | 'info' | 'neutral';

const BADGE_TONE: Record<Tone, string> = {
  safe: 'bg-cyan-soft text-cyan-deep',
  warn: 'bg-warning-soft text-warning-deep',
  danger: 'bg-error-soft text-error-deep',
  info: 'bg-link-bg-soft text-link-deep',
  neutral: 'bg-canvas-soft-2 text-body',
};

const DOT_TONE: Record<Tone, string> = {
  safe: 'bg-cyan-deep',
  warn: 'bg-warning',
  danger: 'bg-error',
  info: 'bg-link',
  neutral: 'bg-hairline-strong',
};

const FILL_TONE: Record<Tone, string> = {
  safe: 'bg-cyan-deep',
  warn: 'bg-warning',
  danger: 'bg-error',
  info: 'bg-link',
  neutral: 'bg-hairline-strong',
};

interface BadgeProps {
  tone: Tone;
  children: ComponentChildren;
  /** Show the leading status dot. */
  dot?: boolean;
  /** Extra utility classes (e.g. width caps / wrapping for long-text chips). */
  class?: string;
}

export function Badge({ tone, children, dot = true, class: extra = '' }: BadgeProps) {
  return (
    <span
      class={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[12px] font-medium leading-4 ${BADGE_TONE[tone]} ${extra}`}
    >
      {dot && <span class={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_TONE[tone]}`} />}
      {children}
    </span>
  );
}

interface MeterProps {
  value: number;
  max: number;
  tone: Tone;
  /** Optional label rendered above the track. */
  label?: string;
  /** Right-aligned value caption (e.g. "12 / 30"). */
  caption?: string;
}

export function Meter({ value, max, tone, label, caption }: MeterProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {(label || caption) && (
        <div class="mb-1.5 flex items-baseline justify-between">
          {label && <span class="text-[13px] text-body">{label}</span>}
          {caption && (
            <span class="font-mono text-[12px] text-mute tabular-nums">
              {caption}
            </span>
          )}
        </div>
      )}
      <div class="h-1.5 w-full overflow-hidden rounded-pill bg-canvas-soft-2">
        <div
          class={`h-full rounded-pill transition-[width] duration-300 ease-out ${FILL_TONE[tone]}`}
          style={`width:${pct}%`}
        />
      </div>
    </div>
  );
}

interface StatProps {
  label: string;
  value: number | string;
}

/** Compact metric tile for the editor counters row. */
export function Stat({ label, value }: StatProps) {
  return (
    <div class="rounded-md border border-hairline bg-canvas px-3 py-2.5">
      <div class="font-mono text-[22px] font-medium leading-7 text-ink tabular-nums">
        {value}
      </div>
      <div class="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-mute">
        {label}
      </div>
    </div>
  );
}

interface SegmentedProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

/** Two-or-more option segmented control (e.g. Desktop / Mobile). */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      class="inline-flex items-center gap-0.5 rounded-pill border border-hairline bg-canvas-soft p-0.5"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            class={`rounded-pill px-3 py-1 text-[12px] font-medium transition-[transform,color,background] duration-100 active:scale-[0.93] ${
              active
                ? 'bg-ink text-on-primary'
                : 'text-body hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

interface CardProps {
  children: ComponentChildren;
  class?: string;
}

/** Canvas card with the brand's inset-hairline + soft-stack elevation. */
export function Card({ children, class: extra = '' }: CardProps) {
  return (
    <section class={`rounded-lg bg-canvas shadow-e2 ${extra}`}>{children}</section>
  );
}

interface CardHeadProps {
  /** Official brand name — rendered as the large, prominent card heading. */
  eyebrow: string;
  /** Secondary function label (e.g. "Thread splitter"). */
  title: string;
  /** Brand logo element rendered to the left of the name. */
  logo?: ComponentChildren;
  children?: ComponentChildren;
}

/**
 * Standard card header: brand logo + large brand name, with a smaller mono
 * function label beneath it and an optional right-aligned slot.
 */
export function CardHead({ eyebrow, title, logo, children }: CardHeadProps) {
  return (
    <header class="flex items-center justify-between gap-x-3 border-b border-hairline px-4 py-3.5 sm:px-5 sm:py-4">
      <div class="flex min-w-0 items-center gap-2.5">
        {logo && <span class="flex shrink-0 items-center">{logo}</span>}
        <div class="min-w-0">
          <h3 class="text-[18px] font-semibold leading-6 tracking-[-0.5px] text-ink sm:text-[20px]">
            {eyebrow}
          </h3>
          <p class="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-mute">
            {title}
          </p>
        </div>
      </div>
      {children && <div class="flex shrink-0 items-center gap-2">{children}</div>}
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Brand logos. Official single-path glyphs in each platform's brand color,
// kept inline so they ship with the island and inherit no external assets.
// ──────────────────────────────────────────────────────────────────────────

interface ToolLinkProps {
  href: string;
  children: ComponentChildren;
}

/** Subtle contextual link rendered at the bottom of a platform card. */
export function ToolLink({ href, children }: ToolLinkProps) {
  return (
    <a
      href={href}
      class="block border-t border-hairline px-4 py-2.5 text-[13px] text-mute transition-colors hover:text-link sm:px-5"
    >
      {children}
    </a>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Shared "preview author" model. A single identity shape every platform card
// renders into its own chrome. Sourced from i18n defaults today (see
// `previewAuthor`); the cards never construct it themselves, so the source can
// later swap to live editor state without touching any card.
// ──────────────────────────────────────────────────────────────────────────

export interface PreviewAuthor {
  /** Display name (e.g. "Your Name"). Instagram shows the handle instead. */
  displayName: string;
  /** Bare username with no leading "@" — cards prepend it where appropriate. */
  handle: string;
  /** Whether to show the verified tick. */
  verified: boolean;
  /** Neutral relative timestamp, e.g. "11h". */
  timestamp: string;
}

/** Build the default mock author from the shared i18n `common` strings. */
export function previewAuthor(common: IslandStrings['common']): PreviewAuthor {
  return {
    displayName: common.displayName,
    handle: common.handle,
    timestamp: common.timestamp,
    verified: true,
  };
}

interface AvatarProps {
  /** Sizing utility pair, e.g. "h-10 w-10". */
  size?: string;
  /** Gradient utility classes for the disc fill. */
  gradient?: string;
  /** Monogram initial; omit for a plain gradient disc. */
  initial?: string;
}

/**
 * Neutral placeholder avatar — a gradient disc with an optional monogram.
 * No photo and no real person/brand, by design.
 */
export function Avatar({
  size = 'h-10 w-10',
  gradient = 'from-grad-preview-start to-grad-preview-end',
  initial,
}: AvatarProps) {
  return (
    <span
      class={`flex ${size} shrink-0 select-none items-center justify-center rounded-full bg-linear-to-br ${gradient} text-[13px] font-semibold text-on-primary`}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

/** First grapheme of a name, uppercased — used for the avatar monogram. */
export function monogram(name: string): string {
  return [...name.trim()][0]?.toUpperCase() ?? '';
}

interface VerifiedTickProps {
  size?: number;
  /** Color via a `text-*` utility (defaults to the link blue). */
  class?: string;
}

/**
 * Generic "verified" tick — a filled disc with a punched-out check. Deliberately
 * a plain circle, not any platform's exact scalloped seal: recognizable, not a clone.
 */
export function VerifiedTick({ size = 15, class: cls = 'text-link' }: VerifiedTickProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" class={cls} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M16.4 9.2 10.7 14.9 7.6 11.8"
        fill="none"
        stroke="var(--color-canvas)"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export type EngagementIcon = 'reply' | 'repost' | 'like' | 'views' | 'comment' | 'share' | 'thumbsUp';

const ENGAGEMENT_PATHS: Record<EngagementIcon, ComponentChildren> = {
  reply: <path d="M4 5h16v10H9l-5 4z" />,
  repost: <path d="M5 8l3-3 3 3M8 5v8h8M19 16l-3 3-3-3M16 19v-8H8" />,
  like: <path d="M12 19.2 4.6 12c-1.5-1.5-1.5-3.9 0-5.4 1.5-1.5 3.9-1.5 5.4 0l2 2 2-2c1.5-1.5 3.9-1.5 5.4 0 1.5 1.5 1.5 3.9 0 5.4Z" />,
  views: <path d="M4 19V11M9 19V5M14 19v-6M19 19V8" />,
  comment: <path d="M4 5h16v10H9l-5 4z" />,
  share: <path d="M12 15V4M8 8l4-4 4 4M5 13v6h14v-6" />,
  thumbsUp: <path d="M7 10v9H4v-9zM7 10l4-7c1.2 0 2 .9 2 2v3h5c1 0 1.7.9 1.5 1.9l-1.3 6c-.2.9-1 1.1-1.7 1.1H7" />,
};

interface EngagementProps {
  icon: EngagementIcon;
  size?: number;
}

/** Faint, stroked social-action glyph for a card's engagement row. */
export function Engagement({ icon, size = 18 }: EngagementProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {ENGAGEMENT_PATHS[icon]}
    </svg>
  );
}

/** Horizontal "more options" (⋯) glyph for a post header's top-right corner. */
export function MoreDots({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}

/** Small "public audience" globe for Facebook/LinkedIn post meta lines. */
export function Globe({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.5 2.6 15.5 0 18M12 3c-2.6 2.5-2.6 15.5 0 18" />
    </svg>
  );
}

interface PostCardProps {
  /** "gutter" = avatar in a left column beside the body (X, Threads). "stacked"
   *  = avatar beside the name only, body spanning full width below (FB, LinkedIn, IG). */
  layout?: 'gutter' | 'stacked';
  avatar: ComponentChildren;
  /** Author identity block — name line(s) + meta. */
  identity: ComponentChildren;
  /** Top-right slot (⋯ menu or a brand chip). */
  trailing?: ComponentChildren;
  /** Body, engagement row, and tool annotations. */
  children: ComponentChildren;
  class?: string;
}

/**
 * Shared feed-post scaffold. Centralizes the article shell and the two
 * avatar/content arrangements every platform card draws into, so the platform
 * components only supply their distinct chrome (identity, body, actions).
 */
export function PostCard({ layout = 'stacked', avatar, identity, trailing, children, class: extra = '' }: PostCardProps) {
  const shell = `feed-phone rounded-md border border-hairline bg-canvas p-4 ${extra}`;

  if (layout === 'gutter') {
    return (
      <article class={shell}>
        <div class="flex gap-3">
          {avatar}
          <div class="min-w-0 flex-1">
            <div class="flex items-start gap-1">
              <div class="min-w-0 flex-1">{identity}</div>
              {trailing && <div class="shrink-0 text-mute/60">{trailing}</div>}
            </div>
            {children}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article class={shell}>
      <header class="flex items-start gap-3">
        {avatar}
        <div class="min-w-0 flex-1">{identity}</div>
        {trailing && <div class="shrink-0 text-mute/60">{trailing}</div>}
      </header>
      {children}
    </article>
  );
}

interface ActionBarProps {
  items: { icon: EngagementIcon; label: string }[];
}

/** Labeled engagement bar (icon + word) with a top divider — Facebook/LinkedIn. */
export function ActionBar({ items }: ActionBarProps) {
  return (
    <div class="mt-3 flex items-center justify-around border-t border-hairline pt-2.5 text-mute">
      {items.map((it) => (
        <span class="flex items-center gap-1.5 text-[12px] font-medium">
          <Engagement icon={it.icon} size={18} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Hook-visibility primitives: the fold divider drawn inside preview cards and
// the pass/warn/fail status glyph. The status icons are drawn here from scratch
// (a check, a bang, a cross) so they read as states, never as platform logos.
// ──────────────────────────────────────────────────────────────────────────

interface FoldMarkerProps {
  /** Tiny label sitting on the line, e.g. "fold". */
  label: string;
  /** Accessible description announced to screen readers. */
  ariaLabel: string;
}

/**
 * A faint, labeled dashed rule marking exactly where a platform truncates a
 * post behind "…more". Rendered as a block so it spans the post body at the
 * fold boundary; the text above it survives, the text below is hidden in-feed.
 */
export function FoldMarker({ label, ariaLabel }: FoldMarkerProps) {
  return (
    <span
      role="separator"
      aria-label={ariaLabel}
      class="my-1.5 flex w-full select-none items-center gap-2"
    >
      <span class="h-0 flex-1 border-t border-dashed border-warning/60" aria-hidden="true" />
      <span class="font-mono text-[10px] font-medium uppercase tracking-wide text-warning-deep">
        {label}
      </span>
      <span class="h-0 flex-1 border-t border-dashed border-warning/60" aria-hidden="true" />
    </span>
  );
}

export type HookStatus = 'pass' | 'warn' | 'fail';

const HOOK_STATUS_PATH: Record<HookStatus, ComponentChildren> = {
  // Check mark.
  pass: <path d="M5 12.5 10 17.5 19 7" />,
  // Exclamation (stem + dot).
  warn: <path d="M12 6.5v7M12 17.2v.1" />,
  // Cross.
  fail: <path d="M7 7l10 10M17 7 7 17" />,
};

const HOOK_STATUS_COLOR: Record<HookStatus, string> = {
  pass: 'text-cyan-deep',
  warn: 'text-warning-deep',
  fail: 'text-error-deep',
};

/**
 * Pass/warn/fail status glyph for the Hook Visibility panel. Decorative — the
 * adjacent text label carries the meaning, so this is aria-hidden and never the
 * sole signal (icon + word + tone, not color alone).
 */
export function HookStatusIcon({ status, size = 18 }: { status: HookStatus; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={HOOK_STATUS_COLOR[status]}
      aria-hidden="true"
    >
      {HOOK_STATUS_PATH[status]}
    </svg>
  );
}

/** Green SMS bubble glyph — our own mark for the SMS channel, no platform asset. */
export function SmsGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#34C759" aria-hidden="true">
      <path d="M12 3.5c-5 0-9 3.2-9 7.2 0 2.2 1.2 4.1 3.1 5.4L5 20.5l3.8-1.6c1 .3 2.1.4 3.2.4 5 0 9-3.2 9-7.1s-4-7.2-9-7.2z" />
    </svg>
  );
}

export type Brand = 'linkedin' | 'x' | 'instagram' | 'facebook' | 'threads';

interface BrandLogoProps {
  brand: Brand;
  /** Square edge length in px. */
  size?: number;
}

export function BrandLogo({ brand, size = 22 }: BrandLogoProps) {
  switch (brand) {
    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case 'x':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" class="text-ink" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" stroke="#E4405F" stroke-width="2" />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="#E4405F" stroke-width="2" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="#E4405F" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z" />
        </svg>
      );
    case 'threads':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" class="text-ink" aria-hidden="true">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.291 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.36-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.32.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.235-11.587c-.336 0-.679.01-1.024.029-1.838.103-2.978.95-2.913 2.122.063 1.235 1.435 1.81 2.756 1.737 1.211-.066 2.79-.534 3.058-3.71-.59-.124-1.215-.181-1.876-.181Z" />
        </svg>
      );
  }
}
