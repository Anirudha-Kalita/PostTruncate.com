/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import { Workspace } from './Workspace';
import { LinkedInPreview, type LinkedInView } from './LinkedInPreview';
import { TwitterPreview } from './TwitterPreview';
import { ThreadsPreview } from './ThreadsPreview';
import { MetaMonitor } from './MetaMonitor';

const SAMPLE =
  "We shipped a tiny feature last week that quietly doubled our trial-to-paid rate.\n\n" +
  'No new pricing. No growth hack. Just one change to the onboarding flow that removed a single decision from the first screen.\n\n' +
  'Here’s exactly what we changed and the three things we measured before rolling it out to everyone → https://posttruncate.com/blog/onboarding\n\n' +
  '#saas #productled #growth #startups';

/**
 * Root interactive island. Owns the single source of truth (the editor text +
 * the LinkedIn fold view) and feeds every preview. Mounted client:load from the
 * Astro page so the dashboard is interactive immediately, while everything
 * around it stays static HTML for SEO.
 */
export default function Dashboard() {
  const [text, setText] = useState('');
  const [view, setView] = useState<LinkedInView>('desktop');

  return (
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Left column — editor + engine */}
      <div class="flex flex-col gap-5">
        <Workspace text={text} setText={setText} />

        {!text && (
          <button
            type="button"
            onClick={() => setText(SAMPLE)}
            class="self-start rounded-pill border border-hairline bg-canvas px-3.5 py-2 text-[13px] font-medium text-body transition-colors hover:bg-canvas-soft-2 hover:text-ink"
          >
            Load a sample post →
          </button>
        )}
      </div>

      {/* Right column — live platform matrix */}
      <div class="flex flex-col gap-5">
        <LinkedInPreview text={text} view={view} setView={setView} />
        <TwitterPreview text={text} />
        <ThreadsPreview text={text} />
        <MetaMonitor text={text} />
      </div>
    </div>
  );
}
