/** @jsxImportSource preact */
import type { ComponentChildren } from 'preact';

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
}

export function Badge({ tone, children, dot = true }: BadgeProps) {
  return (
    <span
      class={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[12px] font-medium leading-4 ${BADGE_TONE[tone]}`}
    >
      {dot && <span class={`h-1.5 w-1.5 rounded-full ${DOT_TONE[tone]}`} />}
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
      role="tablist"
      aria-label={ariaLabel}
      class="inline-flex items-center gap-0.5 rounded-pill border border-hairline bg-canvas-soft p-0.5"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            class={`rounded-pill px-3 py-1 text-[12px] font-medium transition-colors ${
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
    <header class="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
      <div class="flex items-center gap-2.5">
        {logo && <span class="flex shrink-0 items-center">{logo}</span>}
        <div class="min-w-0">
          <h3 class="text-[20px] font-semibold leading-6 tracking-[-0.5px] text-ink">
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

export type Brand = 'linkedin' | 'x' | 'instagram' | 'facebook';

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
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0F1419" aria-hidden="true">
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
  }
}
