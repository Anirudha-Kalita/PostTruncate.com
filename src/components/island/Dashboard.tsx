/** @jsxImportSource preact */
import { useEffect, useLayoutEffect, useState } from 'preact/hooks';
import { Workspace } from './Workspace';
import { LinkedInPreview } from './LinkedInPreview';
import { TwitterPreview } from './TwitterPreview';
import { ThreadsPreview } from './ThreadsPreview';
import { MetaMonitor } from './MetaMonitor';
import { HookVisibilityCard } from './HookVisibilityCard';
import { KeywordMonitor } from './KeywordMonitor';
import type { HookPlatform } from '../../lib/hookAnalysis';
import type { FoldView } from '../../lib/textTools';
import { SmsCounter } from './SmsCounter';
import { ReadabilityCard } from './ReadabilityCard';
import type { IslandStrings } from '../../i18n/types';

/** Platforms a standalone tool page can scope the editor to. */
type FocusPlatform = 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'threads' | 'sms';

interface Props {
  /** Active locale — used for locale-aware number formatting in the previews. */
  lang: string;
  /** Translated island strings, serialized from the server dictionary. */
  strings: IslandStrings;
  /** Locale-specific tool page slugs for contextual links. */
  toolSlugs: Record<string, string>;
  /**
   * When set, renders a scoped single-platform tool for a standalone platform
   * page: the editor plus only that platform's preview card (the SMS counter is
   * shown only for focus="sms"). Readability + keyword cards stay in both modes.
   * Omitted on the homepage, which shows the full multi-platform matrix.
   */
  focus?: FocusPlatform;
}

const DRAFT_STORAGE_KEY = 'post_truncate_active_draft';
const ANALYSIS_DEBOUNCE_MS = 80;
const STORAGE_DEBOUNCE_MS = 250;

type CardKey = 'linkedin' | 'twitter' | 'meta' | 'threads';

const PLATFORM_TO_CARD: Record<string, CardKey> = {
  linkedin: 'linkedin',
  twitter: 'twitter',
  instagram: 'meta',
  facebook: 'meta',
  threads: 'threads',
};

const DEFAULT_ORDER: CardKey[] = ['linkedin', 'twitter', 'meta', 'threads'];

/** Platforms whose preview card carries a Desktop/Mobile fold toggle. */
type ViewablePlatform = 'linkedin' | 'instagram' | 'facebook' | 'threads';

/**
 * Per-platform viewport defaults — the single source of truth for which fold
 * each preview shows. Shared with the Hook Visibility panel so toggling a card
 * re-audits that platform's row against the same fold the user is viewing.
 */
const DEFAULT_VIEWS: Record<ViewablePlatform, FoldView> = {
  linkedin: 'desktop',
  instagram: 'mobile',
  facebook: 'mobile',
  threads: 'mobile',
};

/** Focus platform → the Hook Visibility row to scope to (undefined = not audited). */
const FOCUS_TO_HOOK: Partial<Record<FocusPlatform, HookPlatform>> = {
  linkedin: 'linkedin',
  twitter: 'x',
  instagram: 'instagram',
  facebook: 'facebook',
  threads: 'threads',
};


function readActiveDraft() {
  if (typeof window === 'undefined') return '';

  try {
    return window.sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

/**
 * Root interactive island. Owns the single source of truth (the editor text +
 * the LinkedIn fold view) and feeds every preview. Mounted client:load from the
 * Astro page so the dashboard is interactive immediately, while everything
 * around it stays static HTML for SEO. All copy arrives as `strings` props so
 * the island carries no hardcoded English.
 */
export default function Dashboard({ lang, strings, toolSlugs, focus }: Props) {
  const [text, setText] = useState('');
  const [analysisText, setAnalysisText] = useState('');
  const [views, setViews] = useState<Record<ViewablePlatform, FoldView>>(DEFAULT_VIEWS);
  const setPlatformView = (p: ViewablePlatform, v: FoldView) =>
    setViews((prev) => ({ ...prev, [p]: v }));
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);
  const [cardOrder, setCardOrder] = useState<CardKey[]>(DEFAULT_ORDER);
  const [metaPriority, setMetaPriority] = useState<'facebook' | undefined>(undefined);

  useLayoutEffect(() => {
    // Scoped pages pin their card via the `focus` prop, so the ?platform=
    // deep-link reorder only applies to the full homepage matrix.
    if (focus) return;
    const platform = new URLSearchParams(window.location.search).get('platform');
    if (platform && PLATFORM_TO_CARD[platform]) {
      const key = PLATFORM_TO_CARD[platform];
      setCardOrder([key, ...DEFAULT_ORDER.filter(k => k !== key)]);
      if (platform === 'facebook') setMetaPriority('facebook');
    }
  }, [focus]);

  // ── Scoped-view derivations (a no-op when `focus` is undefined) ──────────
  const focusCard = focus && focus !== 'sms' ? PLATFORM_TO_CARD[focus] : undefined;
  const rightOrder = focus ? (focusCard ? [focusCard] : []) : cardOrder;
  const effectiveMetaPriority = focus === 'facebook' ? 'facebook' : metaPriority;
  // On the Instagram/Facebook pages the shared meta card shows only that network.
  const metaOnly = focus === 'instagram' || focus === 'facebook' ? focus : undefined;
  // Hook Visibility: all four platforms on the homepage; the scoped row on a
  // platform tool page (omitted on the Facebook/SMS pages it doesn't audit).
  const hookOnly = focus ? FOCUS_TO_HOOK[focus] : undefined;
  const showHookPanel = !focus || hookOnly !== undefined;

  useEffect(() => {
    const draft = readActiveDraft();
    setText(draft);
    setAnalysisText(draft);
    setIsDraftLoaded(true);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setAnalysisText(text);
    }, ANALYSIS_DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [text]);

  useEffect(() => {
    if (!isDraftLoaded) return;

    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(DRAFT_STORAGE_KEY, text);
      } catch {
        // Storage can be unavailable in private browsing or locked-down contexts.
      }
    }, STORAGE_DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [isDraftLoaded, text]);

  return (
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Left column — editor + engine. On scoped pages the platform/SMS card,
          readability, and keyword cards all move to the right column, leaving
          the editor uncluttered on the left. */}
      <div class="flex flex-col gap-5">
        <Workspace text={text} setText={setText} lang={lang} s={strings} />
        {!focus && <SmsCounter text={analysisText} lang={lang} s={strings.sms} />}
        {!focus && <ReadabilityCard text={analysisText} lang={lang} s={strings.readability} />}

        {!text && (
          <button
            type="button"
            onClick={() => setText(focus ? strings.dashboard.samples[focus] : strings.dashboard.sample)}
            class="self-start rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-body transition-[transform,color,background] duration-100 hover:bg-canvas-soft-2 hover:text-ink active:scale-[0.96] active:bg-canvas-soft-2"
          >
            {strings.dashboard.loadSample}
          </button>
        )}

        {!focus && <KeywordMonitor text={analysisText} lang={lang} s={strings} />}
      </div>

      {/* Right column — live platform matrix (a single card in scoped mode),
          followed on scoped pages by the readability + keyword cards. */}
      <div class="flex flex-col gap-5">
        {showHookPanel && (
          <HookVisibilityCard text={analysisText} lang={lang} s={strings} only={hookOnly} views={views} />
        )}
        {rightOrder.map(key => {
          if (key === 'linkedin') return <div id="platform-card-linkedin" key="lw"><LinkedInPreview key="linkedin" text={analysisText} view={views.linkedin} setView={(v) => setPlatformView('linkedin', v)} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.linkedin}/`} /></div>;
          if (key === 'twitter')  return <div id="platform-card-twitter"  key="tw"><TwitterPreview  key="twitter"  text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.twitter}/`} /></div>;
          if (key === 'meta')     return <div id="platform-card-meta"     key="mw"><MetaMonitor     key="meta"     text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.instagram}/`} facebookToolLinkHref={`/${lang}/${toolSlugs.facebook}/`} priority={effectiveMetaPriority} only={metaOnly} instagramView={views.instagram} setInstagramView={(v) => setPlatformView('instagram', v)} facebookView={views.facebook} setFacebookView={(v) => setPlatformView('facebook', v)} /></div>;
          if (key === 'threads')  return <div id="platform-card-threads"  key="thw"><ThreadsPreview  key="threads"  text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.threads}/`} view={views.threads} setView={(v) => setPlatformView('threads', v)} /></div>;
        })}
        {focus === 'sms' && <SmsCounter text={analysisText} lang={lang} s={strings.sms} />}
        {focus && <ReadabilityCard text={analysisText} lang={lang} s={strings.readability} />}
        {focus && <KeywordMonitor text={analysisText} lang={lang} s={strings} />}
      </div>
    </div>
  );
}
