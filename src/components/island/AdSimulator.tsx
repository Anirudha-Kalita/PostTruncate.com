/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';
import { Card, CardHead, Meter, Segmented, type Tone } from './ui';
import { GoogleRsaPreview } from './GoogleRsaPreview';
import { FacebookFeedAd } from './FacebookFeedAd';
import { FacebookReelsAd } from './FacebookReelsAd';
import { FacebookCarouselAd, type CarouselCard } from './FacebookCarouselAd';
import { LinkedInAd } from './LinkedInAd';
import { InstagramAd } from './InstagramAd';
import { TikTokAd } from './TikTokAd';
import { ShareControls } from './ShareControls';
import type { ShareAdapter } from './shareAdapter';
import { pruneEmptyFields, type AdShareView, type AdShareCard } from '../../lib/shareLink';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { shareStrings } from '../../i18n/shareStrings';
import { AD_PLATFORM_CONFIG, type AdPlatform } from '../../data/adPlatformConfig';
import { adLinkBehavior } from '../../data/linkBehavior';
import { addCard, removeCard, resolveCta, stepCard } from '../../lib/adTruncation';
import { charCount } from '../../lib/textTools';

type FbFormat = 'feed' | 'reels' | 'carousel';

const EMPTY_CARD: CarouselCard = { headline: '', description: '', mediaUrl: null, mediaKind: 'image' };

interface Props {
  /** Which platform simulator to mount (from the registry tool id). */
  platform: AdPlatform;
  /** Island strings; ad-preview copy resolved via the en-fallback getter. */
  s: IslandStrings;
  lang: string;
}

type FieldKey = 'headline1' | 'headline2' | 'headline3' | 'primary' | 'description';

interface FieldDef {
  key: FieldKey;
  label: string;
  placeholder: string;
  /** Hard character cap (sets maxLength + meter max). Omit for soft fields. */
  max?: number;
  /** Soft cap used only for the meter when there is no hard maxLength. */
  softMax?: number;
  multiline?: boolean;
}

const EMPTY_VALUES: Record<FieldKey, string> = {
  headline1: '',
  headline2: '',
  headline3: '',
  primary: '',
  description: '',
};

/** Which shared controls each platform exposes. */
interface PlatformControls {
  device: boolean;
  mode: boolean; // Instagram Feed/Reels
  format: boolean; // Facebook Feed/Reels/Carousel
  safeZone: boolean;
  media: boolean;
  /**
   * Whether the preview's CTA button is user-editable via the CTA select.
   * Independent of `showsDisplayLink` (LinkedIn has an editable CTA but no
   * display-link field; TikTok's CTA is a fixed mock the preview component
   * resolves on its own, so it stays uneditable here).
   */
  cta: boolean;
}

const CONTROLS: Record<AdPlatform, PlatformControls> = {
  google: { device: false, mode: false, format: false, safeZone: false, media: false, cta: false },
  facebook: { device: true, mode: false, format: true, safeZone: false, media: true, cta: true },
  linkedin: { device: true, mode: false, format: false, safeZone: false, media: true, cta: true },
  instagram: { device: false, mode: true, format: false, safeZone: true, media: true, cta: true },
  tiktok: { device: false, mode: false, format: false, safeZone: true, media: true, cta: false },
};

export function AdSimulator({ platform, s, lang }: Props) {
  const ap = adPreviewStrings(s);
  const cfg = AD_PLATFORM_CONFIG;
  const controls = CONTROLS[platform];

  const [values, setValues] = useState<Record<FieldKey, string>>({ ...EMPTY_VALUES });
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [mode, setMode] = useState<'feed' | 'reels'>('feed');
  const [fbFormat, setFbFormat] = useState<FbFormat>('feed');
  const [cards, setCards] = useState<CarouselCard[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [safeZone, setSafeZone] = useState(true);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  // Whether the picked media is an image (default) or a video. Facebook,
  // Instagram (feed + Reels) and TikTok all run video ads; Google RSA is
  // text-only and exposes no media control.
  const [mediaKind, setMediaKind] = useState<'image' | 'video'>('image');

  // Meta ad (Facebook/Instagram) display-link controls. Stored separately from
  // the FieldKey map so the existing field meters stay untouched.
  const linkBehavior = adLinkBehavior(platform);
  const showsDisplayLink = linkBehavior?.showsDisplayLink ?? false;
  const [destinationUrl, setDestinationUrl] = useState('');
  const [cta, setCta] = useState('');
  const ctaOptions = linkBehavior?.ctaLabels ?? [];

  // Google RSA display-URL controls (final URL + up to two display-path
  // segments). Gated on the platform's `supportsDisplayPath` (google only).
  const supportsDisplayPath = linkBehavior?.supportsDisplayPath ?? false;
  const [finalUrl, setFinalUrl] = useState('');
  const [paths, setPaths] = useState<string[]>(['', '']);

  // Track the live object URL in a ref so the unmount cleanup always revokes
  // the latest value without resubscribing the effect on every change.
  const mediaUrlRef = useRef<string | null>(null);
  mediaUrlRef.current = mediaUrl;
  useEffect(
    () => () => {
      if (mediaUrlRef.current) URL.revokeObjectURL(mediaUrlRef.current);
    },
    [],
  );

  const setField = (key: FieldKey, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const onPickMedia = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    setMediaKind(file.type.startsWith('video/') ? 'video' : 'image');
    setMediaUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    // Allow re-selecting the same file later.
    input.value = '';
  };

  const onRemoveMedia = () =>
    setMediaUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

  // ── Facebook Carousel card-set state ──────────────────────────────────────
  const fbCarouselCfg = cfg.facebook.carousel;

  // Seed the minimum cards exactly once, on the first switch to Carousel with
  // an empty set (idempotent — switching away and back preserves the cards).
  const setFormat = (next: FbFormat) => {
    setFbFormat(next);
    if (next === 'carousel') {
      setCards((prev) => {
        if (prev.length > 0) return prev;
        setActiveCard(0);
        return Array.from({ length: fbCarouselCfg.minCards }, () => ({ ...EMPTY_CARD }));
      });
    }
  };

  // Mirror the live cards array so the unmount cleanup revokes the latest
  // object URLs without resubscribing the effect on every change.
  const cardsRef = useRef<CarouselCard[]>([]);
  cardsRef.current = cards;
  useEffect(
    () => () => {
      for (const c of cardsRef.current) {
        if (c.mediaUrl) URL.revokeObjectURL(c.mediaUrl);
      }
    },
    [],
  );

  const setCardField = (index: number, key: 'headline' | 'description', v: string) =>
    setCards((prev) => prev.map((c, i) => (i === index ? { ...c, [key]: v } : c)));

  const onPickCardMedia = (index: number) => (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const kind: 'image' | 'video' = file.type.startsWith('video/') ? 'video' : 'image';
    const url = URL.createObjectURL(file);
    setCards((prev) =>
      prev.map((c, i) => {
        if (i !== index) return c;
        if (c.mediaUrl) URL.revokeObjectURL(c.mediaUrl);
        return { ...c, mediaUrl: url, mediaKind: kind };
      }),
    );
    input.value = '';
  };

  const onRemoveCardMedia = (index: number) =>
    setCards((prev) =>
      prev.map((c, i) => {
        if (i !== index) return c;
        if (c.mediaUrl) URL.revokeObjectURL(c.mediaUrl);
        return { ...c, mediaUrl: null };
      }),
    );

  const [cardNotice, setCardNotice] = useState<'max' | 'min' | null>(null);

  const onAddCard = () => {
    const result = addCard(cards.length, activeCard, fbCarouselCfg.minCards, fbCarouselCfg.maxCards);
    if (result.atLimit) {
      setCardNotice('max');
      return;
    }
    setCardNotice(null);
    setCards((prev) => [...prev, { ...EMPTY_CARD }]);
    setActiveCard(result.activeIndex);
  };

  const onRemoveCard = (index: number) => {
    const result = removeCard(cards.length, index, activeCard, fbCarouselCfg.minCards);
    if (result.atLimit) {
      setCardNotice('min');
      return;
    }
    setCardNotice(null);
    const removed = cards[index];
    if (removed?.mediaUrl) URL.revokeObjectURL(removed.mediaUrl);
    setCards((prev) => prev.filter((_, i) => i !== index));
    setActiveCard(result.activeIndex);
  };

  const onStepCard = (dir: -1 | 1) => setActiveCard((prev) => stepCard(prev, dir, cards.length));

  // ── Share_Link adapter ────────────────────────────────────────────────────
  // collect() snapshots only this platform's exposed toggles + non-empty field
  // values; apply() restores them only for a matching platform (cross-tool
  // isolation, Req 5.4). The in-memory media URL is never read or written, so a
  // shared link can never carry it and stays empty on open (Req 1.7, 5.5).
  const shareAdapter: ShareAdapter = {
    kind: 'ad',
    id: platform,
    collect: () => {
      const view: AdShareView = {};
      if (controls.device) view.device = device;
      if (controls.mode) view.mode = mode;
      if (controls.format) {
        view.adFormat = fbFormat;
        if (fbFormat === 'reels') view.safeZone = safeZone;
        if (fbFormat === 'carousel') {
          view.cards = cards.map((c): AdShareCard => ({ headline: c.headline, description: c.description }));
        }
      } else if (controls.safeZone) {
        view.safeZone = safeZone;
      }
      if (showsDisplayLink) view.destinationUrl = destinationUrl;
      if (controls.cta) view.cta = cta;
      if (supportsDisplayPath) {
        view.finalUrl = finalUrl;
        view.paths = paths;
      }
      return pruneEmptyFields({ kind: 'ad', platform, fields: { ...values }, view });
    },
    hasMedia: () => mediaUrl !== null || cards.some((c) => c.mediaUrl !== null),
    apply: (state) => {
      if (state.kind !== 'ad' || state.platform !== platform) return;
      // Merge over EMPTY_VALUES, dropping any unknown field keys.
      const next: Record<FieldKey, string> = { ...EMPTY_VALUES };
      for (const key of Object.keys(EMPTY_VALUES) as FieldKey[]) {
        const v = state.fields[key];
        if (typeof v === 'string') next[key] = v;
      }
      setValues(next);
      const view = state.view;
      if (view.device) setDevice(view.device);
      if (view.mode) setMode(view.mode);
      if (controls.format) {
        // Malformed/absent adFormat falls back to Feed (Req 1.8, 10.6).
        setFbFormat(view.adFormat ?? 'feed');
        if (view.adFormat === 'carousel' && view.cards) {
          setCards(
            view.cards.map((c): CarouselCard => ({
              headline: c.headline ?? '',
              description: c.description ?? '',
              mediaUrl: null,
              mediaKind: 'image',
            })),
          );
          setActiveCard(0);
        } else {
          setCards([]);
          setActiveCard(0);
        }
      }
      if (typeof view.safeZone === 'boolean') setSafeZone(view.safeZone);
      if (view.destinationUrl !== undefined) setDestinationUrl(view.destinationUrl);
      if (view.cta !== undefined) setCta(view.cta);
      if (view.finalUrl !== undefined) setFinalUrl(view.finalUrl);
      if (view.paths) setPaths([view.paths[0] ?? '', view.paths[1] ?? '']);
    },
  };

  // ── Per-platform left-column field set ────────────────────────────────────
  const fields = buildFields(platform, ap, cfg, fbFormat);

  // Controls hosted in the preview card heading (next to the status badge): the
  // device (Mobile/Desktop) toggle where the platform exposes it, plus Share.
  const previewToolbar = (
    <>
      {controls.device && (
        <Segmented
          ariaLabel={ap.deviceAria}
          value={device}
          onChange={setDevice}
          options={[
            { value: 'mobile', label: ap.mobile },
            { value: 'desktop', label: ap.desktop },
          ]}
        />
      )}
      {controls.mode && (
        <Segmented
          ariaLabel={ap.modeAria}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'feed', label: ap.feed },
            { value: 'reels', label: ap.reels },
          ]}
        />
      )}
      {controls.format && (
        <Segmented
          ariaLabel={ap.formatAria}
          value={fbFormat}
          onChange={setFormat}
          options={[
            { value: 'feed', label: ap.formatFeed },
            { value: 'reels', label: ap.formatReels },
            { value: 'carousel', label: ap.formatCarousel },
          ]}
        />
      )}
      <ShareControls adapter={shareAdapter} strings={shareStrings(s)} size="sm" />
    </>
  );

  // ── Right-column preview ──────────────────────────────────────────────────
  const preview = (() => {
    switch (platform) {
      case 'google':
        return (
          <GoogleRsaPreview
            s={s}
            headlines={[values.headline1, values.headline2, values.headline3]}
            description={values.description}
            destinationUrl={finalUrl}
            paths={paths}
            toolbar={previewToolbar}
          />
        );
      case 'facebook':
        if (fbFormat === 'reels') {
          return (
            <FacebookReelsAd
              s={s}
              lang={lang}
              primary={values.primary}
              safeZone={safeZone}
              mediaUrl={mediaUrl}
              mediaKind={mediaKind}
              destinationUrl={destinationUrl}
              cta={cta || resolveCta('facebook') || undefined}
              toolbar={previewToolbar}
            />
          );
        }
        if (fbFormat === 'carousel') {
          return (
            <FacebookCarouselAd
              s={s}
              primary={values.primary}
              cards={cards}
              activeCard={Math.min(activeCard, Math.max(cards.length - 1, 0))}
              onPrev={() => onStepCard(-1)}
              onNext={() => onStepCard(1)}
              onArrowKey={onStepCard}
              destinationUrl={destinationUrl}
              cta={cta || resolveCta('facebook') || undefined}
              toolbar={previewToolbar}
            />
          );
        }
        return (
          <FacebookFeedAd
            s={s}
            primary={values.primary}
            headline={values.headline1}
            description={values.description}
            device={device}
            mediaUrl={mediaUrl}
            mediaKind={mediaKind}
            destinationUrl={destinationUrl}
            cta={cta || resolveCta('facebook') || undefined}
            toolbar={previewToolbar}
          />
        );
      case 'linkedin':
        return (
          <LinkedInAd
            s={s}
            primary={values.primary}
            headline={values.headline1}
            device={device}
            mediaUrl={mediaUrl}
            mediaKind={mediaKind}
            cta={cta || resolveCta('linkedin') || undefined}
            toolbar={previewToolbar}
          />
        );
      case 'instagram':
        return (
          <InstagramAd
            s={s}
            lang={lang}
            caption={values.primary}
            headline={values.headline1}
            mode={mode}
            safeZone={safeZone}
            mediaUrl={mediaUrl}
            mediaKind={mediaKind}
            destinationUrl={destinationUrl}
            cta={cta || resolveCta('instagram') || undefined}
            toolbar={previewToolbar}
          />
        );
      case 'tiktok':
        return (
          <TikTokAd
            s={s}
            lang={lang}
            description={values.primary}
            safeZone={safeZone}
            mediaUrl={mediaUrl}
            mediaKind={mediaKind}
            toolbar={previewToolbar}
          />
        );
    }
  })();

  const isCarousel = platform === 'facebook' && fbFormat === 'carousel';
  const isReels = platform === 'facebook' && fbFormat === 'reels';

  return (
    <div class="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* ── Left column: inputs ── */}
      <Card class="flex flex-col">
        <CardHead eyebrow={ap.fields.primary} title={ap.editorLabel} />
        <div class="flex flex-col gap-5 p-4 sm:p-5">
          {fields.map((f) => {
            const val = values[f.key];
            const count = charCount(val);
            const cap = f.max ?? f.softMax ?? 0;
            const tone: Tone =
              cap > 0 && count > cap
                ? 'danger'
                : cap > 0 && count > cap * 0.9
                ? 'warn'
                : count > 0
                ? 'safe'
                : 'neutral';
            return (
              <div class="flex flex-col gap-2" key={f.key}>
                <Meter
                  label={f.label}
                  caption={cap > 0 ? interp(ap.counter, { n: count, limit: cap }) : undefined}
                  value={count}
                  max={cap > 0 ? cap : Math.max(count, 1)}
                  tone={tone}
                />
                {f.multiline ? (
                  <textarea
                    value={val}
                    maxLength={f.max}
                    rows={3}
                    onInput={(e) => setField(f.key, (e.currentTarget as HTMLTextAreaElement).value)}
                    placeholder={f.placeholder}
                    class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] leading-6 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                  />
                ) : (
                  <input
                    type="text"
                    value={val}
                    maxLength={f.max}
                    onInput={(e) => setField(f.key, (e.currentTarget as HTMLInputElement).value)}
                    placeholder={f.placeholder}
                    class="block w-full rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                  />
                )}
              </div>
            );
          })}

          {/* Google RSA final URL + display-path controls */}
          {supportsDisplayPath && (
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-[13px] text-body">{ap.finalUrl}</span>
                <input
                  type="text"
                  value={finalUrl}
                  onInput={(e) => setFinalUrl((e.currentTarget as HTMLInputElement).value)}
                  placeholder="posttruncate.com"
                  class="block w-full rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                />
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-[13px] text-body">{interp(ap.pathN, { n: 1 })}</span>
                <input
                  type="text"
                  value={paths[0]}
                  maxLength={15}
                  onInput={(e) =>
                    setPaths((prev) => [(e.currentTarget as HTMLInputElement).value, prev[1] ?? ''])
                  }
                  placeholder="products"
                  class="block w-full rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                />
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-[13px] text-body">{interp(ap.pathN, { n: 2 })}</span>
                <input
                  type="text"
                  value={paths[1]}
                  maxLength={15}
                  onInput={(e) =>
                    setPaths((prev) => [prev[0] ?? '', (e.currentTarget as HTMLInputElement).value])
                  }
                  placeholder="sale"
                  class="block w-full rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                />
              </div>
            </div>
          )}

          {/* Carousel card editor: shared primary above (already rendered by the
              generic fields loop), then per-card headline/description/media rows
              plus add/remove + the card navigator. */}
          {isCarousel && (
            <div class="flex flex-col gap-4 border-t border-hairline pt-4">
              <div class="flex items-center justify-between gap-3">
                <span class="text-[13px] font-medium text-body">
                  {interp(ap.cardN, { n: activeCard + 1 })}
                </span>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onRemoveCard(activeCard)}
                    class="text-[13px] font-medium text-error transition-colors hover:text-error-deep"
                  >
                    {ap.carouselRemoveCard}
                  </button>
                  <button
                    type="button"
                    onClick={onAddCard}
                    class="rounded-pill border border-hairline bg-canvas-soft px-3 py-1.5 text-[13px] font-medium text-body transition-colors hover:text-ink"
                  >
                    {ap.carouselAddCard}
                  </button>
                </div>
              </div>

              {cardNotice === 'max' && (
                <p class="text-[12px] leading-4 text-warning-deep">
                  {interp(ap.carouselMaxReached, { max: fbCarouselCfg.maxCards })}
                </p>
              )}
              {cardNotice === 'min' && (
                <p class="text-[12px] leading-4 text-warning-deep">
                  {interp(ap.carouselMinReached, { min: fbCarouselCfg.minCards })}
                </p>
              )}

              {cards.map((c, i) => (
                <div
                  class={`flex flex-col gap-2 rounded-md border p-3 ${i === activeCard ? 'border-link bg-link-bg-soft/40' : 'border-hairline'}`}
                  key={i}
                >
                  <button
                    type="button"
                    onClick={() => setActiveCard(i)}
                    class="self-start text-[12px] font-medium text-link"
                  >
                    {interp(ap.cardN, { n: i + 1 })}
                  </button>
                  <input
                    type="text"
                    value={c.headline}
                    maxLength={fbCarouselCfg.cardHeadlineMax}
                    onInput={(e) => setCardField(i, 'headline', (e.currentTarget as HTMLInputElement).value)}
                    placeholder={ap.placeholders.cardHeadline}
                    aria-label={ap.cardHeadline}
                    class="block w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-[14px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                  />
                  <input
                    type="text"
                    value={c.description}
                    maxLength={fbCarouselCfg.cardDescriptionMax}
                    onInput={(e) => setCardField(i, 'description', (e.currentTarget as HTMLInputElement).value)}
                    placeholder={ap.placeholders.cardDescription}
                    aria-label={ap.cardDescription}
                    class="block w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-[14px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                  />
                  <div class="flex items-center gap-3">
                    <label class="inline-flex cursor-pointer items-center gap-2 rounded-pill border border-hairline bg-canvas-soft px-3 py-1.5 text-[12px] font-medium text-body transition-colors hover:text-ink">
                      <input type="file" accept="image/*,video/*" onChange={onPickCardMedia(i)} class="hidden" />
                      {c.mediaUrl ? ap.media.replace : ap.media.add}
                    </label>
                    {c.mediaUrl && (
                      <button
                        type="button"
                        onClick={() => onRemoveCardMedia(i)}
                        aria-label={ap.media.remove}
                        class="text-[12px] font-medium text-error transition-colors hover:text-error-deep"
                      >
                        {ap.media.remove}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <p class="text-[12px] leading-4 text-mute">{ap.media.hint}</p>
            </div>
          )}

          {/* Meta ad display-link control (Facebook / Instagram only — the
              destination shown separately from the headline/domain). */}
          {showsDisplayLink && (
            <div class="flex flex-col gap-2">
              <span class="text-[13px] text-body">{ap.displayLink}</span>
              <input
                type="text"
                value={destinationUrl}
                onInput={(e) => setDestinationUrl((e.currentTarget as HTMLInputElement).value)}
                placeholder="example.com"
                class="block w-full rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
              />
            </div>
          )}
          {/* CTA button control — independent of the display link above: Meta
              carousels apply one shared CTA across every card (Ads Manager has
              a single picker for the whole unit, so this isn't gated off for
              Carousel), and LinkedIn has an editable CTA with no display link
              at all. TikTok's CTA is a fixed mock the preview resolves on its
              own, so `controls.cta` stays false there. */}
          {controls.cta && ctaOptions.length > 0 && (
            <div class="flex flex-col gap-2">
              <span class="text-[13px] text-body">{ap.callToAction}</span>
              <select
                value={cta || (resolveCta(platform) ?? '')}
                onChange={(e) => setCta((e.currentTarget as HTMLSelectElement).value)}
                class="block w-full rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] text-ink focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
              >
                {ctaOptions.map((label) => (
                  <option value={label} key={label}>
                    {ap.cta[label] ?? label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {controls.media && !isCarousel && (
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3">
                <label class="inline-flex cursor-pointer items-center gap-2 rounded-pill border border-hairline bg-canvas-soft px-4 py-2 text-[13px] font-medium text-body transition-colors hover:text-ink">
                  <input type="file" accept="image/*,video/*" onChange={onPickMedia} class="hidden" />
                  {mediaUrl ? ap.media.replace : ap.media.add}
                </label>
                {mediaUrl && (
                  <button
                    type="button"
                    onClick={onRemoveMedia}
                    aria-label={ap.media.remove}
                    class="text-[13px] font-medium text-error transition-colors hover:text-error-deep"
                  >
                    {ap.media.remove}
                  </button>
                )}
              </div>
              <p class="text-[12px] leading-4 text-mute">{ap.media.hint}</p>
            </div>
          )}

          {/* Shared toggles (the device + Feed/Reels toggles are hosted in the
              preview card heading; the safe-zone toggle stays with the inputs).
              Facebook only shows this while the active Ad_Format is Reels
              (Req 3.1, 3.6) — that flag isn't in the static CONTROLS map since it
              depends on the live `fbFormat`, so it's computed here. */}
          {(controls.safeZone || isReels) && (
            <div class="flex flex-wrap items-center gap-4 border-t border-hairline pt-4">
              <label class="inline-flex cursor-pointer items-center gap-2 rounded-md px-1 py-0.5 text-[13px] font-medium text-body transition-transform duration-100 active:scale-[0.97]">
                <input
                  type="checkbox"
                  checked={safeZone}
                  onChange={(e) => setSafeZone((e.currentTarget as HTMLInputElement).checked)}
                  class="h-4 w-4 rounded border-hairline accent-link"
                />
                {ap.safeZoneLabel}
              </label>
            </div>
          )}
        </div>
      </Card>

      {/* ── Right column: preview ── */}
      <div class="flex flex-col">{preview}</div>
    </div>
  );
}

/** Build the platform-specific left-column field definitions. */
function buildFields(
  platform: AdPlatform,
  ap: ReturnType<typeof adPreviewStrings>,
  cfg: typeof AD_PLATFORM_CONFIG,
  fbFormat: FbFormat,
): FieldDef[] {
  switch (platform) {
    case 'google':
      return [
        {
          key: 'headline1',
          label: interp(ap.fields.headlineN, { n: 1 }),
          placeholder: ap.placeholders.headline,
          max: cfg.google.headlineMax,
        },
        {
          key: 'headline2',
          label: interp(ap.fields.headlineN, { n: 2 }),
          placeholder: ap.placeholders.headline,
          max: cfg.google.headlineMax,
        },
        {
          key: 'headline3',
          label: interp(ap.fields.headlineN, { n: 3 }),
          placeholder: ap.placeholders.headline,
          max: cfg.google.headlineMax,
        },
        {
          key: 'description',
          label: ap.fields.description,
          placeholder: ap.placeholders.description,
          max: cfg.google.descriptionMax,
          multiline: true,
        },
      ];
    case 'facebook':
      if (fbFormat === 'reels') {
        return [
          {
            key: 'primary',
            label: ap.fields.primary,
            placeholder: ap.placeholders.primary,
            softMax: cfg.facebook.reelsPrimaryTruncateChars,
            multiline: true,
          },
        ];
      }
      if (fbFormat === 'carousel') {
        return [
          {
            key: 'primary',
            label: ap.fields.primary,
            placeholder: ap.placeholders.primary,
            softMax: cfg.facebook.primaryTruncateChars,
            multiline: true,
          },
        ];
      }
      return [
        {
          key: 'primary',
          label: ap.fields.primary,
          placeholder: ap.placeholders.primary,
          softMax: cfg.facebook.primaryTruncateChars,
          multiline: true,
        },
        {
          key: 'headline1',
          label: ap.fields.headline,
          placeholder: ap.placeholders.headline,
          softMax: cfg.facebook.headlineSafeMax,
        },
        {
          key: 'description',
          label: ap.fields.description,
          placeholder: ap.placeholders.description,
          max: cfg.facebook.descriptionMax,
        },
      ];
    case 'linkedin':
      // No description field: LinkedIn keeps the description off the in-feed ad
      // (it only surfaces on the Audience Network), so exposing it here would be
      // an input with no effect on the preview.
      return [
        {
          key: 'primary',
          label: ap.fields.primary,
          placeholder: ap.placeholders.primary,
          softMax: cfg.linkedin.introTruncateChars,
          multiline: true,
        },
        {
          key: 'headline1',
          label: ap.fields.headline,
          placeholder: ap.placeholders.headline,
          softMax: cfg.linkedin.headlineSafeMax,
        },
      ];
    case 'instagram':
      return [
        {
          key: 'primary',
          label: ap.fields.primary,
          placeholder: ap.placeholders.primary,
          softMax: cfg.instagram.feedTruncateChars,
          multiline: true,
        },
        {
          key: 'headline1',
          label: ap.fields.headline,
          placeholder: ap.placeholders.headline,
          softMax: 40,
        },
      ];
    case 'tiktok':
      return [
        {
          key: 'primary',
          label: ap.fields.description,
          placeholder: ap.placeholders.primary,
          softMax: cfg.tiktok.primaryTruncateChars,
          multiline: true,
        },
      ];
  }
}
