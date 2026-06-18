/** @jsxImportSource preact */
import type { SafeZoneInsets } from '../../data/adPlatformConfig';

interface Props {
  /** Blocked regions as percentages of the creative. */
  insets: SafeZoneInsets;
  /** Caption rendered on each band, e.g. "Safe zone". */
  label: string;
}

const BAND = 'absolute bg-error/20 border-error/50';

/**
 * Translucent red bands marking the regions a platform's interface covers
 * (profile/caption blocks, action stacks, status bars). Rendered as an
 * absolutely-positioned, non-interactive overlay inside a `relative` media
 * frame so creators see exactly where not to bake hardcoded text.
 */
export function SafeZoneOverlay({ insets, label }: Props) {
  const tag = (
    <span class="absolute left-1 top-1 rounded bg-error/70 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
      {label}
    </span>
  );

  return (
    <div class="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      {insets.topPct != null && (
        <div class={`${BAND} border-b`} style={`top:0;left:0;right:0;height:${insets.topPct}%;`}>
          {tag}
        </div>
      )}
      {insets.bottomPct != null && (
        <div
          class={`${BAND} border-t`}
          style={`bottom:0;left:0;right:0;height:${insets.bottomPct}%;`}
        >
          {tag}
        </div>
      )}
      {insets.rightPct != null && (
        <div class={`${BAND} border-l`} style={`top:0;bottom:0;right:0;width:${insets.rightPct}%;`} />
      )}
      {insets.leftPct != null && (
        <div class={`${BAND} border-r`} style={`top:0;bottom:0;left:0;width:${insets.leftPct}%;`} />
      )}
    </div>
  );
}
