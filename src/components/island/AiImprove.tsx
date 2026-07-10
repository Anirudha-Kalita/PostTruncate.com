/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';
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

/** localStorage flag: set once the first-run AI hint has been seen/dismissed. */
const HINT_SEEN_KEY = 'pt-ai-hint-seen';

/**
 * A stable per-browser id sent as X-Client-Token so the server can apply the
 * per-user rate-limit tier (fair under shared NAT) alongside its per-IP backstop.
 * Persisted in localStorage; regenerated if missing/malformed. Returns '' when
 * storage is unavailable (private mode) — the server then falls back to per-IP.
 */
function aiClientToken(): string {
  try {
    const KEY = 'pt-ai-client';
    let t = localStorage.getItem(KEY);
    if (!t || !/^[a-z0-9-]{16,64}$/.test(t)) {
      t = (crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`)
        .toLowerCase()
        .slice(0, 64);
      localStorage.setItem(KEY, t);
    }
    return t;
  } catch {
    return '';
  }
}

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
      return interp(s.limitReached, { time: formatDuration(extra.retryAfterSec ?? 0), max: extra.max ?? 3 });
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
  const [retryAfterSec, setRetryAfterSec] = useState<number | null>(null);
  const [maxUses, setMaxUses] = useState(3);
  // Snapshot of the text before the last successful rewrite, for Undo.
  const prevText = useRef<string | null>(null);
  // The editor text the current status UI (Undo / toast) belongs to. Once the
  // editor moves away from this — cleared or edited — that UI is stale.
  const shownForText = useRef<string | null>(null);

  // Fetch initial limit status on mount
  useEffect(() => {
    let active = true;
    fetch('/api/improve/', { headers: { 'x-client-token': aiClientToken() } })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (typeof data.max === 'number') setMaxUses(data.max);
        if (typeof data.remaining === 'number') setRemaining(data.remaining);
        if (typeof data.retryAfterSec === 'number') setRetryAfterSec(data.retryAfterSec);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // First-run coach-mark: shown once (per browser) the first time the user has a
  // post in the editor, so they learn what the AI button does. Starts hidden to
  // avoid an SSR/hydration flash; an effect reveals it only if never dismissed.
  const [hintEligible, setHintEligible] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(HINT_SEEN_KEY)) setHintEligible(true);
    } catch {
      // Storage blocked (private mode) — simply never show the hint.
    }
  }, []);
  const dismissHint = () => {
    setHintEligible(false);
    try {
      localStorage.setItem(HINT_SEEN_KEY, '1');
    } catch {
      // Ignore — worst case the hint shows again next visit.
    }
  };

  const busy = status === 'loading';
  const hasText = text.trim().length > 0;
  // Only surface the hint once there's text to act on, and never over the open
  // menu / a spinner / a result toast.
  const showHint = hintEligible && hasText && !open && status === 'idle';
  // Auto-hide the Undo button / toast as soon as the editor text diverges from
  // the result it relates to (e.g. the user clears or retypes the editor).
  const statusForCurrentText = shownForText.current !== null && text === shownForText.current;

  async function improve(tone: Tone) {
    setOpen(false);
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/improve/', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-client-token': aiClientToken() },
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
        if (typeof data.retryAfterSec === 'number') setRetryAfterSec(data.retryAfterSec);
        shownForText.current = text;
        return;
      }

      prevText.current = text;
      setText(data.improved);
      shownForText.current = data.improved;
      if (typeof data.remaining === 'number') setRemaining(data.remaining);
      if (typeof data.retryAfterSec === 'number') setRetryAfterSec(data.retryAfterSec);
      setStatus('done');
      setMessage('');
      onImproved?.();
    } catch {
      setStatus('error');
      setMessage(s.errorGeneric);
      shownForText.current = text;
    }
  }

  function undo() {
    if (prevText.current === null) return;
    const restored = prevText.current;
    setText(restored);
    prevText.current = null;
    setStatus('idle');
    setMessage(s.reverted);
    shownForText.current = restored;
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

      {/* First-run coach-mark — a small callout above the FAB explaining what it
          does, shown once until the user opens the dial or dismisses it. */}
      {showHint && (
        <div class="absolute bottom-16 right-3 z-30 w-[min(17rem,72vw)]">
          <div class="relative rounded-lg border border-link/30 bg-canvas px-3 py-2.5 shadow-e3">
            <div class="flex items-start gap-2">
              <span class="mt-0.5 shrink-0 text-link">
                <SparkleIcon size={14} />
              </span>
              <p class="text-[12px] leading-4 text-body">{s.hint}</p>
              <button
                type="button"
                onClick={dismissHint}
                aria-label={s.hintDismiss}
                class="-mr-1 -mt-1 ml-auto shrink-0 rounded p-1 text-mute transition-colors hover:bg-canvas-soft-2 hover:text-ink"
              >
                <CloseIcon size={13} />
              </button>
            </div>
            {/* Pointer aimed at the FAB below-right. */}
            <span
              class="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-link/30 bg-canvas"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* FAB cluster and notifications — pinned to the editor's bottom-right corner. */}
      <div class="absolute bottom-3 right-3 z-20 flex items-center gap-3">
        {/* Error / informational toast */}
        {status === 'error' && message && statusForCurrentText && (
          <p class="max-w-[15rem] truncate rounded-pill bg-error-soft px-3 py-1.5 text-[12px] font-medium text-error shadow-e1">
            {message}
          </p>
        )}
        {status === 'idle' && message && statusForCurrentText && (
          <p class="max-w-[15rem] truncate rounded-pill bg-canvas px-3 py-1.5 text-[12px] text-mute shadow-e1">
            {message}
          </p>
        )}

        {/* Undo button */}
        {status === 'done' && prevText.current !== null && statusForCurrentText && (
          <button
            type="button"
            onClick={undo}
            class="inline-flex shrink-0 items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-3 py-1.5 text-[12px] font-medium text-ink shadow-e1 transition-[transform,background] duration-100 hover:bg-canvas-soft-2 active:scale-95"
          >
            <UndoIcon />
            {s.undo}
          </button>
        )}

        {/* Persistent remaining indicator */}
        {remaining !== null && remaining > 0 && hasText && !open && (
          <span class="whitespace-nowrap rounded-pill border border-hairline bg-canvas/90 px-3 py-1.5 text-[12px] font-medium text-mute shadow-e1">
            {interp(plural(s.remaining, remaining), { n: remaining, max: maxUses })}
          </span>
        )}

        {/* The FAB or the Limit Pill */}
        {remaining === 0 && retryAfterSec ? (
          <div class="whitespace-nowrap rounded-pill border border-hairline bg-canvas px-4 py-2.5 text-[13px] font-medium text-ink shadow-e3">
            {interp(s.limitReached, { time: formatDuration(retryAfterSec), max: maxUses })}
          </div>
        ) : (
          <div class="relative flex h-12 w-12 shrink-0 items-center justify-center">
            {/* Tone speed-dial */}
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
                      <span class="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink/85 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-canvas shadow-e1">
                        {s.tones[tone]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Spinning ring */}
            {busy && <RingSpinner />}

            {/* The FAB itself */}
            <button
              type="button"
              onClick={() => {
                if (hintEligible) dismissHint();
                setOpen((o) => !o);
              }}
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
        )}
      </div>

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

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
