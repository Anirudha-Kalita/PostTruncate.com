/** @jsxImportSource preact */
import { useEffect, useLayoutEffect, useState } from 'preact/hooks';
import { Workspace } from './Workspace';
import { LinkedInPreview, type LinkedInView } from './LinkedInPreview';
import { TwitterPreview } from './TwitterPreview';
import { ThreadsPreview } from './ThreadsPreview';
import { MetaMonitor } from './MetaMonitor';
import { KeywordMonitor } from './KeywordMonitor';
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
  const [view, setView] = useState<LinkedInView>('desktop');
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
            onClick={() => setText(strings.dashboard.sample)}
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
        {rightOrder.map(key => {
          if (key === 'linkedin') return <div id="platform-card-linkedin" key="lw"><LinkedInPreview key="linkedin" text={analysisText} view={view} setView={setView} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.linkedin}/`} /></div>;
          if (key === 'twitter')  return <div id="platform-card-twitter"  key="tw"><TwitterPreview  key="twitter"  text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.twitter}/`} /></div>;
          if (key === 'meta')     return <div id="platform-card-meta"     key="mw"><MetaMonitor     key="meta"     text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.instagram}/`} facebookToolLinkHref={`/${lang}/${toolSlugs.facebook}/`} priority={effectiveMetaPriority} only={metaOnly} /></div>;
          if (key === 'threads')  return <div id="platform-card-threads"  key="thw"><ThreadsPreview  key="threads"  text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.threads}/`} /></div>;
        })}
        {focus === 'sms' && <SmsCounter text={analysisText} lang={lang} s={strings.sms} />}
        {focus && <ReadabilityCard text={analysisText} lang={lang} s={strings.readability} />}
        {focus && <KeywordMonitor text={analysisText} lang={lang} s={strings} />}
      </div>
    </div>
  );
}
