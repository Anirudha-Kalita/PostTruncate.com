/** @jsxImportSource preact */
import { useEffect, useLayoutEffect, useState } from 'preact/hooks';
import { Workspace } from './Workspace';
import { LinkedInPreview } from './LinkedInPreview';
import { TwitterPreview } from './TwitterPreview';
import { ThreadsPreview } from './ThreadsPreview';
import { TikTokPreview } from './TikTokPreview';
import { MetaMonitor } from './MetaMonitor';
import { CardFieldEditor } from './CardFieldEditor';
import { DEFAULT_CARD_IMAGE } from './LivePreviewCard';
import { HookVisibilityCard } from './HookVisibilityCard';
import { KeywordMonitor } from './KeywordMonitor';
import type { HookPlatform } from '../../lib/hookAnalysis';
import type { FoldView } from '../../lib/textTools';
import { extractLinkData } from '../../lib/textTools';
import { DRAFT_STORAGE_KEY, parseDraft, serializeDraft, type DraftEnvelope } from '../../lib/draftEnvelope';
import { SmsCounter } from './SmsCounter';
import { ReadabilityCard } from './ReadabilityCard';
import { HookStrip } from './HookStrip';
import { BrandLogo, type Brand } from './ui';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';

/** Platforms a standalone tool page can scope the editor to. */
type FocusPlatform = 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'threads' | 'tiktok' | 'sms';

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

const ANALYSIS_DEBOUNCE_MS = 80;
const STORAGE_DEBOUNCE_MS = 250;

type CardKey = 'linkedin' | 'twitter' | 'meta' | 'threads' | 'tiktok';

const PLATFORM_TO_CARD: Record<string, CardKey> = {
  linkedin: 'linkedin',
  twitter: 'twitter',
  instagram: 'meta',
  facebook: 'meta',
  threads: 'threads',
  tiktok: 'tiktok',
};

const DEFAULT_ORDER: CardKey[] = ['linkedin', 'twitter', 'meta', 'threads', 'tiktok'];

/** Platforms whose preview card carries a Desktop/Mobile fold toggle. */
type ViewablePlatform = 'linkedin' | 'instagram' | 'facebook' | 'threads' | 'tiktok';

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
  tiktok: 'mobile',
};

/** Focus platform → the Hook Visibility row to scope to (undefined = not audited). */
const FOCUS_TO_HOOK: Partial<Record<FocusPlatform, HookPlatform>> = {
  linkedin: 'linkedin',
  twitter: 'x',
  instagram: 'instagram',
  facebook: 'facebook',
  threads: 'threads',
  tiktok: 'tiktok',
};

/**
 * Homepage single-preview switcher tabs, in display order. Brand names are
 * proper nouns (never localized); `brand` keys into the shared BrandLogo
 * glyphs, with SMS drawing its own bubble below.
 */
const PREVIEW_TABS: { id: FocusPlatform; name: string; brand: Brand }[] = [
  { id: 'linkedin', name: 'LinkedIn', brand: 'linkedin' },
  { id: 'twitter', name: 'X', brand: 'x' },
  { id: 'instagram', name: 'Instagram', brand: 'instagram' },
  { id: 'facebook', name: 'Facebook', brand: 'facebook' },
  { id: 'threads', name: 'Threads', brand: 'threads' },
  { id: 'tiktok', name: 'TikTok', brand: 'tiktok' },
];


function readActiveDraft(): DraftEnvelope {
  if (typeof window === 'undefined') return { text: '' };

  try {
    return parseDraft(window.sessionStorage.getItem(DRAFT_STORAGE_KEY));
  } catch {
    return { text: '' };
  }
}

/**
 * Platforms whose preview renders an Open Graph link-preview card (and whose
 * editor therefore shows the Card_Field_Editor). Instagram/TikTok/X are not
 * card platforms, so they never surface the editor.
 */
const PREVIEW_CARD_PLATFORMS = new Set<string>(['linkedin', 'facebook', 'threads']);

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
  // User-edited Rich_Link_Card metadata. Mirrors the `image` state pattern and
  // is persisted alongside the draft text (the image stays in-memory only).
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  // In-memory only: an uploaded image is held as an object URL and never
  // persisted. It is intentionally absent from sessionStorage, so a reload
  // drops it and the user re-uploads. The URL is revoked on replace/unmount.
  const [image, setImage] = useState<{ url: string; name: string; kind: 'image' | 'video' } | null>(null);
  const onSelectImage = (file: File | null) => {
    setImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      if (!file) return null;
      const kind = file.type.startsWith('video/') ? 'video' : 'image';
      return { url: URL.createObjectURL(file), name: file.name, kind };
    });
  };
  const [views, setViews] = useState<Record<ViewablePlatform, FoldView>>(DEFAULT_VIEWS);
  const setPlatformView = (p: ViewablePlatform, v: FoldView) =>
    setViews((prev) => ({ ...prev, [p]: v }));
  const imageUrl = image?.url ?? null;
  const mediaKind = image?.kind ?? 'image';
  // Rich_Link_Card "demo image" — COMPLETELY SEPARATE from the post media
  // (`image`/`onSelectImage`) above. `null` means "use the default OG image";
  // a non-null value holds an uploaded image-only object URL (in-memory only,
  // never persisted). The two image states never share or affect each other.
  const [cardImage, setCardImage] = useState<{ url: string; name: string } | null>(null);
  const onSelectCardImage = (file: File | null) => {
    setCardImage((prev) => {
      // Only revoke object URLs created here — never the default /og.png path.
      if (prev) URL.revokeObjectURL(prev.url);
      if (!file) return null;
      return { url: URL.createObjectURL(file), name: file.name };
    });
  };
  const cardImageUrl = cardImage?.url ?? DEFAULT_CARD_IMAGE;
  const cardImageIsDefault = cardImage === null;
  // When off (default), previews drop the dimmed below-the-fold remainder and
  // show only the "…more" affordance — matching how the real feed looks. The
  // user can switch it on to inspect exactly what gets hidden.
  const [showFolded, setShowFolded] = useState(false);
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);
  const [cardOrder, setCardOrder] = useState<CardKey[]>(DEFAULT_ORDER);
  const [metaPriority, setMetaPriority] = useState<'facebook' | undefined>(undefined);
  // Homepage preview switcher: which single platform renders, or compare-all.
  // Pure display selection — every platform result is computed by the same
  // existing components; this only chooses which one is mounted.
  const [previewTab, setPreviewTab] = useState<FocusPlatform>('linkedin');
  const [compare, setCompare] = useState(false);

  /** Roving-tabindex arrow-key navigation for the platform tablist. */
  const onTabKey = (e: KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % PREVIEW_TABS.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + PREVIEW_TABS.length) % PREVIEW_TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = PREVIEW_TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setPreviewTab(PREVIEW_TABS[next].id);
    setCompare(false);
    document.getElementById(`platform-tab-${PREVIEW_TABS[next].id}`)?.focus();
  };

  useLayoutEffect(() => {
    // Scoped pages pin their card via the `focus` prop, so the ?platform=
    // deep-link reorder only applies to the full homepage matrix.
    if (focus) return;
    const platform = new URLSearchParams(window.location.search).get('platform');
    if (platform && PLATFORM_TO_CARD[platform]) {
      const key = PLATFORM_TO_CARD[platform];
      setCardOrder([key, ...DEFAULT_ORDER.filter(k => k !== key)]);
      setPreviewTab(platform as FocusPlatform);
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

  // Card_Field_Editor visibility: the editor shows only while a Rich_Link_Card
  // is actually rendered — i.e. the active preview platform is a preview-card
  // platform AND the body contains a URL. On scoped pages the active platform
  // is `focus`; on the homepage it is the selected `previewTab`, or (in
  // compare-all) any preview-card platform, which is URL-driven and therefore
  // the same decision for all three (linkedin/facebook/threads).
  const activeCardPlatform = focus
    ? (PREVIEW_CARD_PLATFORMS.has(focus) ? focus : null)
    : compare
      ? 'linkedin'
      : (PREVIEW_CARD_PLATFORMS.has(previewTab) ? previewTab : null);
  const showCardEditor =
    activeCardPlatform !== null &&
    extractLinkData(analysisText, activeCardPlatform).firstUrl !== undefined;
  const cardEditor = showCardEditor ? (
    <CardFieldEditor
      cardTitle={cardTitle}
      cardDescription={cardDescription}
      onCardTitleChange={setCardTitle}
      onCardDescriptionChange={setCardDescription}
      cardImage={cardImageUrl}
      isDefaultImage={cardImageIsDefault}
      onSelectCardImage={onSelectCardImage}
      onResetCardImage={() => onSelectCardImage(null)}
      lang={lang}
      s={strings}
    />
  ) : null;

  useEffect(() => {
    const draft = readActiveDraft();
    setText(draft.text);
    setAnalysisText(draft.text);
    setCardTitle(draft.cardTitle ?? '');
    setCardDescription(draft.cardDescription ?? '');
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
        window.sessionStorage.setItem(
          DRAFT_STORAGE_KEY,
          serializeDraft({ text, cardTitle, cardDescription }),
        );
      } catch {
        // Storage can be unavailable in private browsing or locked-down contexts.
      }
    }, STORAGE_DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [isDraftLoaded, text, cardTitle, cardDescription]);

  // Free the object URL when the image is swapped out or the island unmounts.
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url);
    };
  }, [image]);

  // Free the card-image object URL on swap/unmount. Never revokes the default
  // /og.png path (cardImage is null in that case, so this is a no-op then).
  useEffect(() => {
    return () => {
      if (cardImage) URL.revokeObjectURL(cardImage.url);
    };
  }, [cardImage]);

  // ── Scoped tool pages — original layout, byte-for-byte behavior ──────────
  if (focus) {
    return (
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div class="flex flex-col gap-5">
          <Workspace text={text} setText={setText} lang={lang} s={strings} focus={focus} image={image?.url ?? null} mediaKind={mediaKind} onSelectImage={onSelectImage} />

          {!text && (
            <button
              type="button"
              onClick={() => setText(strings.dashboard.samples[focus])}
              class="self-start rounded-pill border border-transparent bg-link px-3.5 py-2 text-[13px] font-medium text-on-primary transition-[transform,background] duration-100 hover:bg-link-deep active:scale-[0.96]"
            >
              {strings.dashboard.loadSample}
            </button>
          )}

          {cardEditor}
        </div>

        <div class="flex flex-col gap-5">
          {/* X and SMS have no "…more" fold remainder, so the toggle is moot there. */}
          {focus !== 'twitter' && focus !== 'sms' && (
            <div class="flex justify-end">
              <FoldToggle checked={showFolded} onChange={() => setShowFolded((v) => !v)} label={strings.previewPanel.showHidden} />
            </div>
          )}
          {showHookPanel && (
            <HookVisibilityCard text={analysisText} lang={lang} s={strings} only={hookOnly} views={views} />
          )}
          {rightOrder.map(key => {
            if (key === 'linkedin') return <div id="platform-card-linkedin" key="lw"><LinkedInPreview key="linkedin" text={analysisText} view={views.linkedin} setView={(v) => setPlatformView('linkedin', v)} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.linkedin}/`} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>;
            if (key === 'twitter') return <div id="platform-card-twitter" key="tw"><TwitterPreview key="twitter" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.twitter}/`} image={imageUrl} mediaKind={mediaKind} /></div>;
            if (key === 'meta') return <div id="platform-card-meta" key="mw"><MetaMonitor key="meta" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.instagram}/`} facebookToolLinkHref={`/${lang}/${toolSlugs.facebook}/`} priority={effectiveMetaPriority} only={metaOnly} instagramView={views.instagram} setInstagramView={(v) => setPlatformView('instagram', v)} facebookView={views.facebook} setFacebookView={(v) => setPlatformView('facebook', v)} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>;
            if (key === 'threads') return <div id="platform-card-threads" key="thw"><ThreadsPreview key="threads" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.threads}/`} view={views.threads} setView={(v) => setPlatformView('threads', v)} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>;
            if (key === 'tiktok') return <div id="platform-card-tiktok" key="ttw"><TikTokPreview key="tiktok" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs['tiktok-guide']}/`} view={views.tiktok} setView={(v) => setPlatformView('tiktok', v)} image={imageUrl} mediaKind={mediaKind} showFolded={showFolded} /></div>;
          })}
          {focus === 'sms' && <SmsCounter text={analysisText} lang={lang} s={strings.sms} />}
          <details class="group rounded-xl bg-canvas shadow-e2">
            <summary class="flex cursor-pointer list-none items-center gap-3 px-4 py-4 transition-colors hover:bg-canvas-soft sm:px-6 [&::-webkit-details-marker]:hidden">
              <InsightsIcon />
              <span class="text-[15px] font-semibold leading-5 text-ink">{strings.insights.title}</span>
              <span class="hidden min-w-0 truncate text-[13px] text-mute sm:inline">{strings.insights.subScoped}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="ml-auto shrink-0 text-mute transition-transform duration-200 group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div class="flex flex-col gap-5 border-t border-hairline p-4 sm:p-6">
              <ReadabilityCard text={analysisText} lang={lang} s={strings.readability} />
              <KeywordMonitor text={analysisText} lang={lang} s={strings} />
            </div>
          </details>
        </div>
      </div>
    );
  }

  // ── Homepage — one constrained container: editor left, single-platform
  //    live preview right (tab-switched), with compare-all as the escape
  //    hatch and the analysis cards collapsed beneath. ─────────────────────
  return (
    <div>
      <div class="rounded-xl bg-canvas p-4 shadow-e3 sm:p-6">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Left — "Write your post" */}
          <div class="flex min-w-0 flex-col gap-4">
            <Workspace text={text} setText={setText} lang={lang} s={strings} image={image?.url ?? null} mediaKind={mediaKind} onSelectImage={onSelectImage} />

            {!text && (
              <button
                type="button"
                onClick={() => setText(strings.dashboard.sample)}
                class="self-start rounded-pill border border-transparent bg-link px-3.5 py-2 text-[13px] font-medium text-on-primary transition-[transform,background] duration-100 hover:bg-link-deep active:scale-[0.96]"
              >
                {strings.dashboard.loadSample}
              </button>
            )}

            {cardEditor}
          </div>

          {/* Right — "Live platform preview" */}
          <div class="flex min-w-0 flex-col">
            <h3 class="text-[16px] font-semibold leading-6 tracking-[-0.3px] text-ink">
              {strings.previewPanel.title}
            </h3>

            {/* Platform selector: tablist left, compare-all right */}
            <div class="mt-2.5 flex items-end gap-1 border-b border-hairline sm:gap-2">
              <div
                role="tablist"
                aria-label={strings.previewPanel.title}
                class="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto sm:gap-1"
              >
                {PREVIEW_TABS.map((p, i) => {
                  const active = !compare && previewTab === p.id;
                  return (
                    <button
                      type="button"
                      role="tab"
                      id={`platform-tab-${p.id}`}
                      aria-selected={active}
                      aria-controls="platform-preview-panel"
                      tabIndex={active || (compare && i === 0) ? 0 : -1}
                      aria-label={interp(strings.previewPanel.tabAria, { platform: p.name })}
                      onClick={() => { setPreviewTab(p.id); setCompare(false); }}
                      onKeyDown={(e) => onTabKey(e, i)}
                      class={`relative flex h-10 w-10 shrink-0 items-center justify-center transition-[background,opacity] duration-100 sm:h-11 sm:w-11 ${active ? 'opacity-100' : 'opacity-40 hover:bg-canvas-soft hover:opacity-80'
                        }`}
                    >
                      {p.brand && <BrandLogo brand={p.brand} size={20} />}
                      {active && (
                        <span class="absolute inset-x-2 bottom-0 h-0.5 rounded-pill bg-link" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                aria-pressed={compare}
                onClick={() => setCompare((c) => !c)}
                class={`mb-2 inline-flex h-10 w-10 shrink-0 items-center justify-center gap-1.5 rounded-pill border p-0 text-[12px] font-medium transition-[transform,color,background,border-color] duration-100 active:scale-[0.96] sm:h-auto sm:w-auto sm:px-3 sm:py-1.5 ${compare
                    ? 'border-link bg-link-bg-soft text-link-deep'
                    : 'border-hairline bg-canvas text-body hover:bg-canvas-soft-2 hover:text-ink'
                  }`}
              >
                <GridIcon class="h-[18px] w-[18px] sm:h-[13px] sm:w-[13px]" />
                <span class="hidden sm:inline">{strings.previewPanel.compareAll}</span>
              </button>
            </div>

            {/* Panel-level preference: show or hide the below-the-fold remainder. */}
            <div class="mt-3 flex justify-end">
              <FoldToggle checked={showFolded} onChange={() => setShowFolded((v) => !v)} label={strings.previewPanel.showHidden} />
            </div>

            {/* Active preview panel — mounts the existing platform components */}
            <div
              id="platform-preview-panel"
              role="tabpanel"
              aria-labelledby={compare ? undefined : `platform-tab-${previewTab}`}
              tabIndex={-1}
              class="mt-4 flex flex-col gap-5"
            >
              {compare ? (
                <>
                  {cardOrder.map(key => {
                    if (key === 'linkedin') return <div id="platform-card-linkedin" key="lw"><LinkedInPreview key="linkedin" text={analysisText} view={views.linkedin} setView={(v) => setPlatformView('linkedin', v)} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.linkedin}/`} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>;
                    if (key === 'twitter') return <div id="platform-card-twitter" key="tw"><TwitterPreview key="twitter" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.twitter}/`} image={imageUrl} mediaKind={mediaKind} /></div>;
                    if (key === 'meta') return <div id="platform-card-meta" key="mw"><MetaMonitor key="meta" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.instagram}/`} facebookToolLinkHref={`/${lang}/${toolSlugs.facebook}/`} priority={effectiveMetaPriority} instagramView={views.instagram} setInstagramView={(v) => setPlatformView('instagram', v)} facebookView={views.facebook} setFacebookView={(v) => setPlatformView('facebook', v)} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>;
                    if (key === 'threads') return <div id="platform-card-threads" key="thw"><ThreadsPreview key="threads" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.threads}/`} view={views.threads} setView={(v) => setPlatformView('threads', v)} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>;
                    if (key === 'tiktok') return <div id="platform-card-tiktok" key="ttw"><TikTokPreview key="tiktok" text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs['tiktok-guide']}/`} view={views.tiktok} setView={(v) => setPlatformView('tiktok', v)} image={imageUrl} mediaKind={mediaKind} showFolded={showFolded} /></div>;
                  })}
                </>
              ) : (
                <>
                  {previewTab === 'linkedin' && <div id="platform-card-linkedin"><LinkedInPreview text={analysisText} view={views.linkedin} setView={(v) => setPlatformView('linkedin', v)} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.linkedin}/`} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>}
                  {previewTab === 'twitter' && <div id="platform-card-twitter"><TwitterPreview text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.twitter}/`} image={imageUrl} mediaKind={mediaKind} /></div>}
                  {previewTab === 'instagram' && <div id="platform-card-meta"><MetaMonitor text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.instagram}/`} facebookToolLinkHref={`/${lang}/${toolSlugs.facebook}/`} only="instagram" instagramView={views.instagram} setInstagramView={(v) => setPlatformView('instagram', v)} facebookView={views.facebook} setFacebookView={(v) => setPlatformView('facebook', v)} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>}
                  {previewTab === 'facebook' && <div id="platform-card-meta"><MetaMonitor text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.instagram}/`} facebookToolLinkHref={`/${lang}/${toolSlugs.facebook}/`} only="facebook" priority="facebook" instagramView={views.instagram} setInstagramView={(v) => setPlatformView('instagram', v)} facebookView={views.facebook} setFacebookView={(v) => setPlatformView('facebook', v)} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>}
                  {previewTab === 'threads' && <div id="platform-card-threads"><ThreadsPreview text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs.threads}/`} view={views.threads} setView={(v) => setPlatformView('threads', v)} image={imageUrl} mediaKind={mediaKind} cardImage={cardImageUrl} showFolded={showFolded} cardTitle={cardTitle} cardDescription={cardDescription} /></div>}
                  {previewTab === 'tiktok' && <div id="platform-card-tiktok"><TikTokPreview text={analysisText} lang={lang} s={strings} toolLinkHref={`/${lang}/${toolSlugs['tiktok-guide']}/`} view={views.tiktok} setView={(v) => setPlatformView('tiktok', v)} image={imageUrl} mediaKind={mediaKind} showFolded={showFolded} /></div>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hook visibility strip — per-platform verdicts, always visible */}
      <HookStrip text={analysisText} lang={lang} s={strings} views={views} limitsHref={`/${lang}/platform-limits/`} />

      {/* Advanced insights — collapsed analysis drawer below the container */}
      <details class="group mt-4 rounded-xl bg-canvas shadow-e2">
        <summary class="flex cursor-pointer list-none items-center gap-3 px-4 py-4 transition-colors hover:bg-canvas-soft sm:px-6 [&::-webkit-details-marker]:hidden">
          <InsightsIcon />
          <span class="text-[15px] font-semibold leading-5 text-ink">{strings.insights.title}</span>
          <span class="hidden min-w-0 truncate text-[13px] text-mute sm:inline">{strings.insights.sub}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="ml-auto shrink-0 text-mute transition-transform duration-200 group-open:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div class="grid grid-cols-1 gap-5 border-t border-hairline p-4 sm:p-6 lg:grid-cols-2">
          <ReadabilityCard text={analysisText} lang={lang} s={strings.readability} />
          <KeywordMonitor text={analysisText} lang={lang} s={strings} />
        </div>
      </details>
    </div>
  );
}

/**
 * Compact switch controlling whether previews render the dimmed below-the-fold
 * remainder. A single panel-level preference shared by every foldable card.
 */
function FoldToggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      class="inline-flex items-center gap-2 text-[12px] font-medium text-body transition-colors hover:text-ink"
    >
      <span class={`relative h-4 w-7 shrink-0 rounded-pill transition-colors duration-150 ${checked ? 'bg-link' : 'bg-hairline-strong'}`}>
        <span class={`absolute top-0.5 h-3 w-3 rounded-full bg-on-primary transition-[left] duration-150 ${checked ? 'left-3.5' : 'left-0.5'}`} />
      </span>
      {label}
    </button>
  );
}


/** Small 2×2 grid glyph for the compare-all toggle. */
function GridIcon({ class: cls = 'w-[13px] h-[13px]' }: { class?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" class={cls}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

/** Bar-chart glyph for the Advanced insights summary row. */
function InsightsIcon() {
  return (
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-link-bg-soft text-link-deep">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="M4 19V11M9 19V5M14 19v-6M19 19V8" />
      </svg>
    </span>
  );
}
