/** @jsxImportSource preact */
import { linkedInHook, charCount, LIMITS } from '../../lib/textTools';
import { Card, CardHead, Badge, Segmented, Meter, BrandLogo } from './ui';

export type LinkedInView = 'desktop' | 'mobile';

interface Props {
  text: string;
  view: LinkedInView;
  setView: (v: LinkedInView) => void;
}

/**
 * LinkedIn "Hook Zone" simulator. Highlights the text that survives above the
 * "…see more" fold (210 chars desktop / 140 mobile) and injects a non-clickable
 * bold "…see more" at the exact boundary when the post is truncated.
 */
export function LinkedInPreview({ text, view, setView }: Props) {
  const limit = view === 'mobile' ? LIMITS.LINKEDIN_MOBILE : LIMITS.LINKEDIN_DESKTOP;
  const { hook, rest, truncated } = linkedInHook(text, limit);
  const total = charCount(text);

  return (
    <Card>
      <CardHead
        eyebrow="LinkedIn"
        title="Hook zone preview"
        logo={<BrandLogo brand="linkedin" />}
      >
        <Segmented<LinkedInView>
          ariaLabel="LinkedIn fold view"
          value={view}
          onChange={setView}
          options={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'mobile', label: 'Mobile' },
          ]}
        />
      </CardHead>

      <div class="px-4 pt-4 sm:px-5">
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {truncated ? (
            <Badge tone="warn">Truncated feed text</Badge>
          ) : (
            <Badge tone="safe">Safe hook line</Badge>
          )}
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {total} / {limit} before fold
          </span>
        </div>
        <div class="mt-3">
          <Meter
            value={total}
            max={limit}
            tone={truncated ? 'warn' : 'safe'}
          />
        </div>
      </div>

      {/* Feed mockup */}
      <div class="p-4 sm:p-5">
        <article class="rounded-md border border-hairline bg-canvas p-4">
          <header class="flex items-center gap-3">
            <span class="h-10 w-10 shrink-0 rounded-full bg-linear-to-br from-grad-develop-start to-grad-preview-start" />
            <div class="min-w-0">
              <p class="truncate text-[14px] font-semibold text-ink">Your Name</p>
              <p class="truncate text-[12px] text-mute">
                Founder · 1st · Just now
              </p>
            </div>
          </header>

          <div class="mt-3 whitespace-pre-wrap break-words text-[14px] leading-[22px] text-ink">
            {text ? (
              <>
                {/* The portion that survives above the fold, subtly lit. */}
                <span class={truncated ? 'rounded-xs bg-cyan-soft/40' : ''}>
                  {hook}
                </span>
                {truncated && (
                  <span class="font-semibold text-mute" aria-label="see more (not clickable)">
                    …see more
                  </span>
                )}
                {/* Folded remainder, dimmed to show what readers must click for. */}
                {truncated && rest && (
                  <span class="text-mute/45 line-through decoration-hairline-strong/40">
                    {rest}
                  </span>
                )}
              </>
            ) : (
              <span class="text-mute">Your post’s opening lines appear here…</span>
            )}
          </div>
        </article>

        <p class="mt-3 text-[12px] leading-4 text-body">
          {truncated
            ? `Readers see only the first ${limit} characters in-feed. Front-load your hook before the fold.`
            : `Your whole post fits above LinkedIn’s ${view} fold — no "…see more" truncation.`}
        </p>
      </div>
    </Card>
  );
}
