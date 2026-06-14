/** @jsxImportSource preact */
import { useRef, useState } from 'preact/hooks';
import { TONES, type Tone } from '../../lib/aiImprove';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  text: string;
  setText: (next: string) => void;
  s: IslandStrings['aiImprove'];
  /** Called after a rewrite is applied, so the parent can refocus the editor. */
  onImproved?: () => void;
}

type Status = 'idle' | 'loading' | 'done' | 'error';

/** Map a server error code → a localized message. */
function messageForError(
  code: string,
  s: IslandStrings['aiImprove'],
  extra: { max?: number; retryAfterSec?: number },
): string {
  switch (code) {
    case 'empty':
      return s.errorEmpty;
    case 'too_long':
      return interp(s.errorTooLong, { max: extra.max ?? 0 });
    case 'rate_limited':
      return interp(s.limitReached, { time: formatDuration(extra.retryAfterSec ?? 0) });
    case 'not_configured':
      return s.errorUnavailable;
    default:
      return s.errorGeneric;
  }
}

/** Seconds → compact "Hh Mm" (or "Mm" when under an hour). */
function formatDuration(totalSec: number): string {
  const m = Math.ceil(totalSec / 60);
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

/**
 * "AI Improve" floating action button, pinned to the editor's bottom-left
 * corner. Tapping it fans out a speed-dial of round tone buttons; choosing one
 * sends the editor text to /api/improve, wraps the FAB in a spinning ring until
 * the rewrite returns, then swaps the text in (with one-step Undo). The parent
 * positions this absolutely inside the relatively-positioned editor wrapper.
 */
export function AiImprove({ text, setText, s, onImproved }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [remaining, setRemaining] = useState<number | null>(null);
  const [maxUses, setMaxUses] = useState(3);
  // Snapshot of the text before the last successful rewrite, for Undo.
  const prevText = useRef<string | null>(null);

  const busy = status === 'loading';
  const hasText = text.trim().length > 0;

  async function improve(tone: Tone) {
    setOpen(false);
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, tone }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        improved?: string;
        remaining?: number;
        error?: string;
        max?: number;
        retryAfterSec?: number;
      };

      if (!res.ok || !data.improved) {
        if (typeof data.max === 'number' && data.error === 'rate_limited') setMaxUses(data.max);
        setStatus('error');
        setMessage(
          messageForError(data.error ?? 'generic', s, {
            max: data.max,
            retryAfterSec: data.retryAfterSec,
          }),
        );
        if (typeof data.remaining === 'number') setRemaining(data.remaining);
        return;
      }

      prevText.current = text;
      setText(data.improved);
      if (typeof data.remaining === 'number') setRemaining(data.remaining);
      setStatus('done');
      setMessage('');
      onImproved?.();
    } catch {
      setStatus('error');
      setMessage(s.errorGeneric);
    }
  }

  function undo() {
    if (prevText.current === null) return;
    setText(prevText.current);
    prevText.current = null;
    setStatus('idle');
    setMessage(s.reverted);
  }

  return (
    <>
      {/* Click-away layer to dismiss the open speed-dial. */}
      {open && (
        <div
          class="fixed inset-0 z-10"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* FAB cluster — pinned to the editor's bottom-right corner. */}
      <div class="absolute bottom-3 right-3 z-20">
        {/* Tone speed-dial: round buttons fanning out along a quarter-circle arc
            from the FAB (up → left), the way a bottom-right corner FAB reads best.
            Positions are computed on the arc; each button carries a label pill.
            The FAB centre sits at (24,24) within this 48px cluster. */}
        {open && (
          <div role="menu" aria-label={s.pickTone} class="absolute inset-0">
            {TONES.map((tone, i) => {
              const angle = ((90 - (i * 90) / (TONES.length - 1)) * Math.PI) / 180;
              const radius = 168;
              const cx = 24 - radius * Math.cos(angle);
              const cy = 24 - radius * Math.sin(angle);
              return (
                <button
                  key={tone}
                  type="button"
                  role="menuitem"
                  aria-label={s.tones[tone]}
                  onClick={() => improve(tone)}
                  style={{ left: `${cx}px`, top: `${cy}px` }}
                  class="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-link text-on-primary shadow-e2 transition-[transform,background] duration-100 hover:bg-link-deep active:scale-90"
                >
                  <ToneIcon tone={tone} />
                  {/* Label pill below the icon — own colours so it stays legible
                      when the circle inverts on hover. */}
                  <span class="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink/85 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-canvas shadow-e1">
                    {s.tones[tone]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Spinning ring around the FAB while the rewrite is in flight. */}
        {busy && <RingSpinner />}

        {/* The FAB itself. */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={busy || (!open && !hasText)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-busy={busy}
          aria-label={open ? s.cancel : s.button}
          title={s.button}
          class="relative flex h-12 w-12 items-center justify-center rounded-full bg-link text-on-primary shadow-e3 transition-[transform,background] duration-150 hover:bg-link-deep active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {open ? (
            <CloseIcon />
          ) : (
            <span class="flex flex-col items-center justify-center leading-none">
              <SparkleIcon size={15} />
              <span class="mt-0.5 text-[10px] font-bold tracking-wide">AI</span>
            </span>
          )}
        </button>
      </div>

      {/* Undo + remaining quota, to the right of the FAB after a rewrite. */}
      {status === 'done' && prevText.current !== null && (
        <div class="absolute bottom-3 right-16 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={undo}
            class="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3 py-1.5 text-[12px] font-medium text-ink shadow-e1 transition-[transform,background] duration-100 hover:bg-canvas-soft-2 active:scale-95"
          >
            <UndoIcon />
            {s.undo}
          </button>
          {remaining !== null && (
            <span class="rounded-pill bg-canvas/90 px-2 py-1 text-[11px] text-mute shadow-e1">
              {interp(plural(s.remaining, remaining), { n: remaining, max: maxUses })}
            </span>
          )}
        </div>
      )}

      {/* Error / informational toast, to the right of the FAB. */}
      {status === 'error' && message && (
        <p class="absolute bottom-3 right-16 z-20 max-w-[68%] rounded-pill bg-error-soft px-3 py-1.5 text-[12px] font-medium text-error shadow-e1">
          {message}
        </p>
      )}
      {status === 'idle' && message && (
        <p class="absolute bottom-3 right-16 z-20 max-w-[68%] rounded-pill bg-canvas px-3 py-1.5 text-[12px] text-mute shadow-e1">
          {message}
        </p>
      )}

      {/* Screen-reader status while loading. */}
      <p class="sr-only" role="status" aria-live="polite">
        {busy ? s.improving : ''}
      </p>
    </>
  );
}

/** Rotating arc that circles the FAB until the result returns. */
function RingSpinner() {
  return (
    <svg
      class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-link"
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="31"
        cy="31"
        r="28"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="110 66"
      />
    </svg>
  );
}

function ToneIcon({ tone }: { tone: Tone }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round' as const,
    'stroke-linejoin': 'round' as const,
    'aria-hidden': true,
  };
  switch (tone) {
    case 'professional':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case 'casual':
      return (
        <svg {...common}>
          <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
      );
    case 'marketing':
      return (
        <svg {...common}>
          <path d="m3 11 18-5v12L3 14v-3z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      );
    case 'friendly':
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 1 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0 0-7.7z" />
        </svg>
      );
    case 'concise':
      return (
        <svg {...common}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
  }
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SparkleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l1.9 4.7 4.7 1.9-4.7 1.9L12 15.7l-1.9-4.7L5.4 9l4.7-1.9L12 2.5zM18.5 14l.95 2.35L21.8 17.3l-2.35.95L18.5 20.6l-.95-2.35L15.2 17.3l2.35-.95L18.5 14z" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h11a5 5 0 0 1 0 10H9" />
    </svg>
  );
}
