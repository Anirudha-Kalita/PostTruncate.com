/** @jsxImportSource preact */
import { linkedInHook, charCount, LIMITS } from '../../lib/textTools';
import { Card, CardHead, Badge, Segmented, Meter, BrandLogo, ToolLink } from './ui';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

export type LinkedInView = 'desktop' | 'mobile';

interface Props {
  text: string;
  view: LinkedInView;
  setView: (v: LinkedInView) => void;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
}

/**
 * LinkedIn "Hook Zone" simulator. Highlights the text that survives above the
 * "…see more" fold (210 chars desktop / 140 mobile) and injects a non-clickable
 * bold "…see more" at the exact boundary when the post is truncated.
 */
export function LinkedInPreview({ text, view, setView, lang, s, toolLinkHref }: Props) {
  const l = s.linkedin;
  const nf = new Intl.NumberFormat(lang);
  const limit = view === 'mobile' ? LIMITS.LINKEDIN_MOBILE : LIMITS.LINKEDIN_DESKTOP;
  const { hook, rest, truncated } = linkedInHook(text, limit);
  const total = charCount(text);
  const isOverPostLimit = total > LIMITS.LINKEDIN_POST;
  const viewLabel = view === 'mobile' ? l.viewMobile : l.viewDesktop;

  return (
    <Card>
      <CardHead
        eyebrow="LinkedIn"
        title={l.title}
        logo={<BrandLogo brand="linkedin" />}
      >
        <Segmented<LinkedInView>
          ariaLabel={l.viewAriaLabel}
          value={view}
          onChange={setView}
          options={[
            { value: 'desktop', label: l.viewDesktop },
            { value: 'mobile', label: l.viewMobile },
          ]}
        />
      </CardHead>

      <div class="px-4 pt-4 sm:px-5">
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {isOverPostLimit ? (
            <Badge tone="danger">{l.badgeOverLimit}</Badge>
          ) : truncated ? (
            <Badge tone="warn">{l.badgeTruncated}</Badge>
          ) : (
            <Badge tone="safe">{l.badgeSafe}</Badge>
          )}
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {isOverPostLimit
              ? interp(l.postLimit, {
                  total: nf.format(total),
                  limit: nf.format(LIMITS.LINKEDIN_POST),
                })
              : interp(l.beforeFold, { total: nf.format(total), limit: nf.format(limit) })}
          </span>
        </div>
        <div class="mt-3">
          <Meter
            value={Math.min(total, isOverPostLimit ? LIMITS.LINKEDIN_POST : limit)}
            max={isOverPostLimit ? LIMITS.LINKEDIN_POST : limit}
            tone={isOverPostLimit ? 'danger' : truncated ? 'warn' : 'safe'}
          />
        </div>
      </div>

      {/* Feed mockup */}
      <div class="p-4 sm:p-5">
        <article
          class={`feed-phone rounded-md border border-hairline bg-canvas p-4 ${
            view === 'desktop' ? 'feed-phone--desktop' : ''
          }`}
        >
          <header class="flex items-center gap-3">
            <span class="h-10 w-10 shrink-0 rounded-full bg-linear-to-br from-grad-develop-start to-grad-preview-start" />
            <div class="min-w-0">
              <p class="truncate text-[14px] font-semibold text-ink">{s.common.profileName}</p>
              <p class="truncate text-[12px] text-mute">
                {l.profileMeta}
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
                  <span class="font-semibold text-mute" aria-label={l.seeMore}>
                    {l.seeMore}
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
              <span class="text-mute">{l.placeholder}</span>
            )}
          </div>
        </article>

        <p class="mt-3 text-[12px] leading-4 text-body">
          {isOverPostLimit
            ? interp(l.overLimitNote, {
                limit: nf.format(LIMITS.LINKEDIN_POST),
                excess: nf.format(total - LIMITS.LINKEDIN_POST),
              })
            : truncated
            ? interp(l.truncatedNote, { limit: nf.format(limit) })
            : interp(l.safeNote, { view: viewLabel })}
        </p>
      </div>

      {toolLinkHref && <ToolLink href={toolLinkHref}>{s.toolLinks.linkedin}</ToolLink>}
    </Card>
  );
}
