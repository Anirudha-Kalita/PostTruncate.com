/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';
import { Card, CardHead, Meter, Segmented, type Tone } from './ui';
import { GoogleRsaPreview } from './GoogleRsaPreview';
import { FacebookFeedAd } from './FacebookFeedAd';
import { InstagramAd } from './InstagramAd';
import { TikTokAd } from './TikTokAd';
import { ShareControls } from './ShareControls';
import type { ShareAdapter } from './shareAdapter';
import { pruneEmptyFields, type AdShareView } from '../../lib/shareLink';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { shareStrings } from '../../i18n/shareStrings';
import { AD_PLATFORM_CONFIG, type AdPlatform } from '../../data/adPlatformConfig';
import { adLinkBehavior } from '../../data/linkBehavior';
import { resolveCta } from '../../lib/adTruncation';
import { charCount } from '../../lib/textTools';

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
  safeZone: boolean;
  media: boolean;
}

const CONTROLS: Record<AdPlatform, PlatformControls> = {
  google: { device: false, mode: false, safeZone: false, media: false },
  facebook: { device: true, mode: false, safeZone: false, media: true },
  instagram: { device: false, mode: true, safeZone: true, media: true },
  tiktok: { device: false, mode: false, safeZone: true, media: true },
};

export function AdSimulator({ platform, s, lang }: Props) {
  const ap = adPreviewStrings(s);
  const cfg = AD_PLATFORM_CONFIG;
  const controls = CONTROLS[platform];

  const [values, setValues] = useState<Record<FieldKey, string>>({ ...EMPTY_VALUES });
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [mode, setMode] = useState<'feed' | 'reels'>('feed');
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
      if (controls.safeZone) view.safeZone = safeZone;
      if (showsDisplayLink) {
        view.destinationUrl = destinationUrl;
        view.cta = cta;
      }
      if (supportsDisplayPath) {
        view.finalUrl = finalUrl;
        view.paths = paths;
      }
      return pruneEmptyFields({ kind: 'ad', platform, fields: { ...values }, view });
    },
    hasMedia: () => mediaUrl !== null,
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
      if (typeof view.safeZone === 'boolean') setSafeZone(view.safeZone);
      if (view.destinationUrl !== undefined) setDestinationUrl(view.destinationUrl);
      if (view.cta !== undefined) setCta(view.cta);
      if (view.finalUrl !== undefined) setFinalUrl(view.finalUrl);
      if (view.paths) setPaths([view.paths[0] ?? '', view.paths[1] ?? '']);
    },
  };

  // ── Per-platform left-column field set ────────────────────────────────────
  const fields = buildFields(platform, ap, cfg);

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

  return (
    <div class="grid gap-5 lg:grid-cols-2">
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

          {/* Meta ad display-link + CTA controls (Facebook / Instagram) */}
          {showsDisplayLink && (
            <div class="flex flex-col gap-4">
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
              {ctaOptions.length > 0 && (
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
            </div>
          )}
          {controls.media && (
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
              preview card heading; the safe-zone toggle stays with the inputs). */}
          {controls.safeZone && (
            <div class="flex flex-wrap items-center gap-4 border-t border-hairline pt-4">
              {controls.safeZone && (
                <label class="inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium text-body">
                  <input
                    type="checkbox"
                    checked={safeZone}
                    onChange={(e) => setSafeZone((e.currentTarget as HTMLInputElement).checked)}
                    class="h-4 w-4 rounded border-hairline accent-link"
                  />
                  {ap.safeZoneLabel}
                </label>
              )}
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
