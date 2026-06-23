/** @jsxImportSource preact */
import { useRef } from 'preact/hooks';
import type { ShareAdapter } from './shareAdapter';
import type { ShareStrings } from '../../i18n/types';
import { useShareLink } from './useShareLink';

interface Props {
  adapter: ShareAdapter;
  strings: ShareStrings;
  /** Optional extra classes for the wrapper (e.g. alignment in a header row). */
  class?: string;
  /**
   * Button size. `'md'` (default) is the prominent editor button; `'sm'` is a
   * compact pill matching the segmented toggle height, for card-heading use.
   */
  size?: 'md' | 'sm';
}

/** Size → button sizing classes. */
const SIZE_CLASS: Record<'md' | 'sm', string> = {
  md: 'min-h-11 gap-2 px-4 py-2 text-[13px] shadow-e1 hover:shadow-e2 sm:min-h-9',
  sm: 'gap-1.5 px-3 py-1.5 text-[12px]',
};

/** Tone → toast pill colors, using existing design tokens. */
const TONE_CLASS: Record<'success' | 'error' | 'warn', string> = {
  success: 'bg-link-bg-soft text-link-deep',
  error: 'bg-error-soft text-error',
  warn: 'bg-warning-soft text-warning-deep',
};

/**
 * Presentational Share control: a prominent, keyboard-operable Share_Button
 * plus a floating `aria-live` panel carrying the toast and the manual-copy
 * fallback field. The panel is absolutely positioned so feedback never shifts
 * the surrounding layout. All logic is delegated to {@link useShareLink}.
 */
export function ShareControls({ adapter, strings, class: cls = '', size = 'md' }: Props) {
  const { onShare, toast, manualUrl } = useShareLink({ adapter, strings });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div class={`relative inline-flex ${cls}`}>
      <button
        type="button"
        onClick={onShare}
        aria-label={strings.button}
        class={`inline-flex items-center justify-center rounded-pill bg-link font-semibold text-on-primary transition-[transform,background,box-shadow] duration-100 hover:bg-link-deep active:scale-[0.96] ${SIZE_CLASS[size]}`}
      >
        <ShareIcon />
        {strings.button}
      </button>

      {/* Floating ARIA live region: toast + manual-copy field, anchored to the
          button so it overlays content instead of pushing the row down. */}
      <div
        aria-live="polite"
        class="absolute right-0 top-full z-30 mt-2 flex w-[min(20rem,82vw)] flex-col gap-2 empty:hidden"
      >
        {toast && (
          <div
            class={`rounded-lg px-3 py-2.5 text-[13px] font-medium leading-5 shadow-e3 ${TONE_CLASS[toast.tone]}`}
          >
            {toast.message}
          </div>
        )}

        {manualUrl && (
          <div class="flex flex-col gap-1 rounded-lg border border-hairline bg-canvas p-3 shadow-e3">
            <span class="text-[12px] font-medium text-mute">{strings.manualLabel}</span>
            <input
              ref={inputRef}
              type="text"
              readOnly
              aria-label={strings.manualLabel}
              value={manualUrl}
              onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
              class="w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 font-mono text-[12px] text-ink focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}
