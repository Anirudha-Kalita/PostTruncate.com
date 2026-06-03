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
  eyebrow: string;
  title: string;
  children?: ComponentChildren;
}

/** Standard card header: mono eyebrow + title, optional right-aligned slot. */
export function CardHead({ eyebrow, title, children }: CardHeadProps) {
  return (
    <header class="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-wide text-mute">
          {eyebrow}
        </p>
        <h3 class="mt-1 text-[16px] font-semibold leading-6 tracking-[-0.32px] text-ink">
          {title}
        </h3>
      </div>
      {children && <div class="flex shrink-0 items-center gap-2">{children}</div>}
    </header>
  );
}
