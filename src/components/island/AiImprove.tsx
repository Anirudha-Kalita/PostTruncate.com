/** @jsxImportSource preact */
import { useRef, useState } from 'preact/hooks';
import { TONES, type Tone } from '../../lib/aiImprove';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  text: string;
  setText: (next: string) => void;
  s: IslandStrings['aiImprove'];
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
 * "AI Improve" control: a button that opens a tone picker, sends the editor
 * text to the /api/improve Worker route, shows progress, and swaps in the
 * AI-rewritten text — with one-step Undo. Quota state comes from the server
 * (the `remaining` field on each response); the limit itself is enforced
 * server-side, so this UI only reflects it.
 */
export function AiImprove({ text, setText, s }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [remaining, setRemaining] = useState<number | null>(null);
  const [maxUses, setMaxUses] = useState(3);
  // Snapshot of the text before the last successful rewrite, for Undo.
  const prevText = useRef<string | null>(null);

  const busy = status === 'loading';
  const canImprove = text.trim().length > 0 && !busy;

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
    <div class="mt-3">
      <div class="relative inline-block">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={!canImprove}
          aria-haspopup="menu"
          aria-expanded={open}
          class="inline-flex items-center gap-1.5 rounded-pill border border-link bg-link-bg-soft px-3.5 py-2 text-[13px] font-medium text-link-deep transition-[transform,color,background] duration-100 hover:bg-link-bg-soft active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100"
        >
          <SparkleIcon />
          {s.button}
        </button>

        {open && (
          <div
            role="menu"
            class="absolute left-0 top-full z-20 mt-2 w-60 rounded-md border border-hairline bg-canvas p-2 shadow-e3"
          >
            <p class="px-2 pb-1 pt-1 text-[13px] font-semibold leading-5 text-ink">{s.pickTone}</p>
            <p class="px-2 pb-2 text-[12px] leading-4 text-mute">{s.pickToneSub}</p>
            <div class="flex flex-col gap-1">
              {TONES.map((tone) => (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => improve(tone)}
                  class="rounded-md px-2.5 py-2 text-left text-[13px] font-medium text-ink transition-colors hover:bg-canvas-soft-2"
                >
                  {s.tones[tone]}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              class="mt-1 w-full rounded-md px-2.5 py-2 text-center text-[12px] font-medium text-mute transition-colors hover:bg-canvas-soft-2"
            >
              {s.cancel}
            </button>
          </div>
        )}
      </div>

      {/* Progress bar while the rewrite is in flight. */}
      {busy && (
        <div class="mt-3" role="status" aria-live="polite">
          <p class="mb-1.5 text-[12px] leading-4 text-mute">{s.improving}</p>
          <div class="h-1.5 w-full overflow-hidden rounded-pill bg-canvas-soft-2">
            <div class="h-full w-2/3 animate-pulse rounded-pill bg-link" />
          </div>
        </div>
      )}

      {/* Undo affordance after a successful rewrite. */}
      {status === 'done' && prevText.current !== null && (
        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={undo}
            class="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3 py-1.5 text-[12px] font-medium text-ink transition-[transform,color,background] duration-100 hover:bg-canvas-soft-2 active:scale-[0.96]"
          >
            <UndoIcon />
            {s.undo}
          </button>
          {remaining !== null && (
            <span class="text-[12px] leading-4 text-mute">
              {interp(plural(s.remaining, remaining), { n: remaining, max: maxUses })}
            </span>
          )}
        </div>
      )}

      {/* Error / informational message line. */}
      {status === 'error' && message && (
        <p class="mt-3 text-[12px] leading-4 text-error" role="status" aria-live="polite">
          {message}
        </p>
      )}
      {status === 'idle' && message && (
        <p class="mt-3 text-[12px] leading-4 text-mute" role="status" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
