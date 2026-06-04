/** @jsxImportSource preact */
import { useEffect, useState } from 'preact/hooks';
import { Workspace } from './Workspace';
import { LinkedInPreview, type LinkedInView } from './LinkedInPreview';
import { TwitterPreview } from './TwitterPreview';
import { ThreadsPreview } from './ThreadsPreview';
import { MetaMonitor } from './MetaMonitor';
import { KeywordMonitor } from './KeywordMonitor';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  /** Active locale — used for locale-aware number formatting in the previews. */
  lang: string;
  /** Translated island strings, serialized from the server dictionary. */
  strings: IslandStrings;
}

const DRAFT_STORAGE_KEY = 'post_truncate_active_draft';

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
export default function Dashboard({ lang, strings }: Props) {
  const [text, setText] = useState('');
  const [view, setView] = useState<LinkedInView>('desktop');
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

  useEffect(() => {
    setText(readActiveDraft());
    setIsDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (!isDraftLoaded) return;

    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, text);
    } catch {
      // Storage can be unavailable in private browsing or locked-down contexts.
    }
  }, [isDraftLoaded, text]);

  return (
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Left column — editor + engine */}
      <div class="flex flex-col gap-5">
        <Workspace text={text} setText={setText} lang={lang} s={strings} />

        {!text && (
          <button
            type="button"
            onClick={() => setText(strings.dashboard.sample)}
            class="self-start rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-body transition-colors hover:bg-canvas-soft-2 hover:text-ink"
          >
            {strings.dashboard.loadSample}
          </button>
        )}

        <KeywordMonitor text={text} lang={lang} s={strings} />
      </div>

      {/* Right column — live platform matrix */}
      <div class="flex flex-col gap-5">
        <LinkedInPreview text={text} view={view} setView={setView} lang={lang} s={strings} />
        <TwitterPreview text={text} lang={lang} s={strings} />
        <MetaMonitor text={text} lang={lang} s={strings} />
        <ThreadsPreview text={text} lang={lang} s={strings} />
      </div>
    </div>
  );
}
