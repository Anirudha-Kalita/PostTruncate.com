/** @jsxImportSource preact */
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { ShareAdapter } from './shareAdapter';
import type { ShareStrings } from '../../i18n/types';
import { SCHEMA_VERSION, parseShare, serializeShare } from '../../lib/shareLink';
import {
  buildShareUrl,
  isShareUrlTooLong,
  readShareTokenFromHash,
} from '../../lib/shareUrl';

/**
 * The browser bridge for the Share_Link feature — the ONLY layer that touches
 * `window` / the Clipboard_API. It reads the Share_Token from the hash on mount
 * and applies it through the island's {@link ShareAdapter}, and on share it
 * collects → serializes → builds the URL → copies, with a length guard and a
 * clipboard fallback. The pure codec (`shareLink.ts`) and URL helpers
 * (`shareUrl.ts`) do all the real work; this hook only orchestrates them.
 */

export type ToastTone = 'success' | 'error' | 'warn';

export interface ToastState {
  tone: ToastTone;
  message: string;
}

/** Fixed visible duration before a Toast_Message auto-dismisses (Req 11.3). */
export const TOAST_DURATION_MS = 4000;

interface UseShareLinkArgs {
  adapter: ShareAdapter;
  strings: ShareStrings;
}

interface UseShareLinkResult {
  /** Build + copy the current state as a share link. */
  onShare: () => Promise<void>;
  /** Current toast, or null. */
  toast: ToastState | null;
  /** Set when the clipboard is unavailable/failed, for manual copy (Req 11.2). */
  manualUrl: string | null;
  /** Dismiss the toast + manual-copy field immediately. */
  dismiss: () => void;
}

/**
 * Resolve the absolute base URL the share link should target. Prefers the
 * page's `<link rel="canonical">` so a framed/embedded widget points at the
 * canonical hosted page rather than the embedding host (Requirement 13.4),
 * falling back to the current origin + pathname.
 */
function canonicalBaseUrl(): string {
  if (typeof window === 'undefined') return '';
  const href = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (href) {
    try {
      return new URL(href, window.location.href).toString();
    } catch {
      // Malformed canonical → fall back to the live location below.
    }
  }
  return window.location.origin + window.location.pathname;
}

export function useShareLink({ adapter, strings }: UseShareLinkArgs): UseShareLinkResult {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [manualUrl, setManualUrl] = useState<string | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const didRead = useRef(false);

  // ── Read path: once on mount, hydrate from the Share_Fragment ────────────
  useEffect(() => {
    if (didRead.current || typeof window === 'undefined') return;
    didRead.current = true;
    const payload = parseShare(readShareTokenFromHash(window.location.hash));
    // Only apply payloads for this island's family; the adapter further gates
    // by tool/platform identity (Requirement 5.4).
    if (payload && payload.state.kind === adapter.kind) {
      adapter.apply(payload.state);
    }
    // adapter is stable for the island's lifetime; run exactly once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = useCallback((tone: ToastTone, message: string) => {
    setToast({ tone, message });
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  const dismiss = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setToast(null);
    setManualUrl(null);
  }, []);

  // Clear any pending auto-dismiss timer on unmount.
  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  // ── Write path: build + copy the current state ───────────────────────────
  const onShare = useCallback(async () => {
    setManualUrl(null);
    const state = adapter.collect();
    const token = serializeShare({ v: SCHEMA_VERSION, state });
    const url = buildShareUrl(canonicalBaseUrl(), token);

    // Length guard — never hand the user a silently broken link (Req 9.2).
    if (isShareUrlTooLong(url)) {
      showToast('warn', strings.tooLarge);
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard-unavailable');
      await navigator.clipboard.writeText(url);
      showToast('success', strings.success);
    } catch {
      // Missing or rejecting Clipboard_API → offer manual copy (Req 8.4, 11.x).
      // The draft envelope is intentionally never touched on this path.
      setManualUrl(url);
      showToast('error', strings.error);
    }
  }, [adapter, strings, showToast]);

  return { onShare, toast, manualUrl, dismiss };
}
