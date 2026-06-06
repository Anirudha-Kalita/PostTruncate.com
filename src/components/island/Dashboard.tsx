/** @jsxImportSource preact */
import { useEffect, useState } from 'preact/hooks';
import { Workspace } from './Workspace';
import { LinkedInPreview, type LinkedInView } from './LinkedInPreview';
import { TwitterPreview } from './TwitterPreview';
import { ThreadsPreview } from './ThreadsPreview';
import { MetaMonitor } from './MetaMonitor';
import { KeywordMonitor } from './KeywordMonitor';
import { SmsCounter } from './SmsCounter';
import { SeoPreview } from './SeoPreview';
import { ReadabilityCard } from './ReadabilityCard';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  /** Active locale — used for locale-aware number formatting in the previews. */
  lang: string;
  /** Translated island strings, serialized from the server dictionary. */
  strings: IslandStrings;
  /** Locale-specific tool page slugs for contextual links. */
  toolSlugs: Record<string, string>;
}

const DRAFT_STORAGE_KEY = 'post_truncate_active_draft';
const ANALYSIS_DEBOUNCE_MS = 80;
const STORAGE_DEBOUNCE_MS = 250;

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
export default function Dashboard({ lang, strings, toolSlugs }: Props) {
  const [text, setText] = useState('');
  const [analysisText, setAnalysisText] = useState('');
  const [view, setView] = useState<LinkedInView>('desktop');
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

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
      {/* Left column — editor + engine */}
      <div class="flex flex-col gap-5">
        <Workspace text={text} setText={setText} lang={lang} s={strings} />
        <SmsCounter text={analysisText} lang={lang} s={strings.sms} />
        <ReadabilityCard text={analysisText} lang={lang} s={strings.readability} />

        {!text && (
          <button
            type="button"
            onClick={() => setText(strings.dashboard.sample)}
            class="self-start rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-body transition-[transform,color,background] duration-100 hover:bg-canvas-soft-2 hover:text-ink active:scale-[0.96] active:bg-canvas-soft-2"
          >
            {strings.dashboard.loadSample}
          </button>
        )}

        <KeywordMonitor text={analysisText} lang={lang} s={strings} />
      </div>

      {/* Right column — live platform matrix */}
      <div class="flex flex-col gap-5">
        <LinkedInPreview text={analysisText} view={view} setView={setView} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.linkedin}/`} />
        <TwitterPreview text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.twitter}/`} />
        <MetaMonitor text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.instagram}/`} facebookToolLinkHref={`/${lang}/${toolSlugs.facebook}/`} />
        <ThreadsPreview text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.threads}/`} />
        <SeoPreview s={strings} />
      </div>
    </div>
  );
}
