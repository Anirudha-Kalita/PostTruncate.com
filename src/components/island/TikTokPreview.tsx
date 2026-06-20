/** @jsxImportSource preact */
import { useRef, useState } from 'preact/hooks';
import { charCount, detectUrls, LIMITS, sliceChars, tiktokFoldIndex } from '../../lib/textTools';
import { Card, CardHead, Badge, Segmented, BrandLogo, ToolLink, FoldMarker, previewAuthor } from './ui';
import { interp, plural } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

type FeedView = 'desktop' | 'mobile';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings;
  toolLinkHref?: string;
  view: FeedView;
  setView: (v: FeedView) => void;
  image?: string | null;
  mediaKind?: 'image' | 'video';
  showFolded?: boolean;
}

/**
 * TikTok preview — organic post + reel. No thread splitting: a single caption
 * over a full-screen 9:16 video. Posting natively allows up to 4,000 characters,
 * but the TikTok API and third-party schedulers still cap captions at 2,200, so
 * the preview warns once a caption passes that "safe" ceiling. The feed collapses
 * the caption behind
 * "…more" at the first line break OR ~100 chars, whichever comes first. An
 * optional (default-off) safe-zone overlay shows the native-UI dead zones.
 */
export function TikTokPreview({ text, lang, s, toolLinkHref, view, setView, image, mediaKind = 'image', showFolded = true }: Props) {
  const tk = s.tiktok;
  const nf = new Intl.NumberFormat(lang);
  const author = previewAuthor(s.common);
  const trimmed = text.trim();
  const count = charCount(trimmed);
  const urls = detectUrls(trimmed);
  // Two-tier: 4,000 is the native hard cap; past 2,200 still posts natively but
  // breaks the TikTok API / schedulers, so it warns rather than errors.
  const over = count > LIMITS.TIKTOK_CAPTION_MAX;
  const overSafe = !over && count > LIMITS.TIKTOK_CAPTION_SAFE;

  const foldAt = tiktokFoldIndex(trimmed);
  const shouldFold = charCount(trimmed) > foldAt;
  const visible = shouldFold ? sliceChars(trimmed, 0, foldAt) : trimmed;
  const hidden  = shouldFold ? sliceChars(trimmed, foldAt) : '';

  const [safeZones, setSafeZones] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Card>
      <CardHead eyebrow="TikTok" title={tk.title} logo={<BrandLogo brand="tiktok" />}>
        <div class="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={safeZones}
            onClick={() => setSafeZones((v) => !v)}
            class="inline-flex items-center gap-1.5 text-[12px] font-medium text-body transition-colors hover:text-ink"
          >
            <span class={`relative h-4 w-7 shrink-0 rounded-pill transition-colors ${safeZones ? 'bg-link' : 'bg-hairline-strong'}`}>
              <span class={`absolute top-0.5 h-3 w-3 rounded-full bg-on-primary transition-[left] ${safeZones ? 'left-3.5' : 'left-0.5'}`} />
            </span>
            {tk.safeZones}
          </button>
          <Segmented<FeedView>
            ariaLabel={`${tk.title} ${s.linkedin.viewAriaLabel}`}
            value={view}
            onChange={setView}
            options={[
              { value: 'desktop', label: s.linkedin.viewDesktop },
              { value: 'mobile', label: s.linkedin.viewMobile },
            ]}
          />
        </div>
      </CardHead>

      <div class="px-4 pt-4 sm:px-5">
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {!trimmed ? (
            <Badge tone="neutral" dot={false}>{tk.badgeIdle}</Badge>
          ) : over ? (
            <Badge tone="danger">{tk.badgeOver}</Badge>
          ) : overSafe ? (
            <Badge tone="warn">{tk.badgeOverSafe}</Badge>
          ) : (
            <Badge tone="safe">{tk.badgeSingle}</Badge>
          )}
          <span class="text-[13px] text-body">
            {urls.length > 0 ? interp(plural(tk.links, urls.length), { n: nf.format(urls.length) }) : tk.charLength}
          </span>
          <span class="font-mono text-[12px] text-mute tabular-nums">
            {nf.format(count)} / {nf.format(LIMITS.TIKTOK_CAPTION_MAX)}
          </span>
        </div>
        {overSafe && (
          <p class="mt-1 text-[12px] text-warning-deep">
            {interp(tk.apiCapHint, { safe: nf.format(LIMITS.TIKTOK_CAPTION_SAFE) })}
          </p>
        )}
        {shouldFold && hidden && (
          <p class="mt-1 text-[12px] text-mute">{tk.lineBreakHint}</p>
        )}
      </div>

      <div class="p-4 sm:p-5">
        <div class="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-xl bg-ink aspect-[9/16]">
          {/* Media fill */}
          {image ? (
            mediaKind === 'video' ? (
              <>
                <video ref={videoRef} src={image} muted playsInline preload="metadata"
                  controls={started} onPlay={() => setStarted(true)}
                  class="absolute inset-0 h-full w-full object-cover" />
                {!started && (
                  <button type="button" aria-label="Play video" onClick={() => videoRef.current?.play()}
                    class="absolute inset-0 flex items-center justify-center">
                    <span class="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" class="ml-0.5"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.79-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" /></svg>
                    </span>
                  </button>
                )}
              </>
            ) : (
              <img src={image} alt="" class="absolute inset-0 h-full w-full object-cover" />
            )
          ) : (
            <div class="absolute inset-0 flex items-center justify-center bg-canvas-soft-2 text-center text-[13px] text-mute">{tk.mediaHint}</div>
          )}

          {/* Bottom gradient for legibility */}
          <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Right-hand engagement rail */}
          <div class="absolute bottom-[22%] right-2 flex flex-col items-center gap-4 text-white">
            <RailIcon><path d="M12 21s-7-4.35-9.5-8.5C1 9 3 6 6 6c2 0 3 1.5 6 4 3-2.5 4-4 6-4 3 0 5 3 3.5 6.5C19 16.65 12 21 12 21z" /></RailIcon>
            <RailIcon><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z" /></RailIcon>
            <RailIcon><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" /></RailIcon>
          </div>

          {/* Caption overlay */}
          <div class="absolute inset-x-0 bottom-0 p-3 pr-12 text-white">
            <div class="text-[14px] font-semibold">@{author.handle}</div>
            {trimmed ? (
              <p class="mt-1 whitespace-pre-wrap break-words text-[13px] leading-[18px]">
                {visible}
                {shouldFold && <span class="font-semibold text-white/90">{tk.seeMore}</span>}
                {shouldFold && showFolded && <FoldMarker label={s.hook.foldLabel} ariaLabel={s.hook.foldAria} />}
                {shouldFold && showFolded && hidden && <span class="text-white/40 line-through">{hidden}</span>}
              </p>
            ) : (
              <p class="mt-1 text-[13px] text-white/70">{interp(tk.placeholder, { limit: nf.format(LIMITS.TIKTOK_CAPTION_MAX) })}</p>
            )}
          </div>

          {/* Safe-zone overlay (toggle, default off) */}
          {safeZones && (
            <div class="pointer-events-none absolute inset-0" aria-hidden="true">
              <div class="absolute inset-x-0 top-0 h-[10%] bg-[rgba(255,0,0,0.35)]" />
              <div class="absolute inset-x-0 bottom-0 h-[18%] bg-[rgba(255,0,0,0.35)]" />
              <div class="absolute right-0 bottom-[18%] h-[50%] w-[15%] bg-[rgba(255,0,0,0.35)]" />
            </div>
          )}
        </div>
      </div>

      {toolLinkHref && <ToolLink href={toolLinkHref}>{s.toolLinks.tiktok}</ToolLink>}
    </Card>
  );
}

function RailIcon({ children }: { children: preact.ComponentChildren }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{children}</svg>
  );
}
