/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';
import { Card, CardHead, Meter, Segmented, type Tone } from './ui';
import { GoogleRsaPreview } from './GoogleRsaPreview';
import { FacebookFeedAd } from './FacebookFeedAd';
import { InstagramAd } from './InstagramAd';
import { TikTokAd } from './TikTokAd';
import { interp } from '../../i18n/interp';
import type { IslandStrings } from '../../i18n/types';
import { adPreviewStrings } from '../../i18n/adPreviewStrings';
import { AD_PLATFORM_CONFIG, type AdPlatform } from '../../data/adPlatformConfig';
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

  // ── Per-platform left-column field set ────────────────────────────────────
  const fields = buildFields(platform, ap, cfg);

  // ── Right-column preview ──────────────────────────────────────────────────
  const preview = (() => {
    switch (platform) {
      case 'google':
        return (
          <GoogleRsaPreview
            s={s}
            headlines={[values.headline1, values.headline2, values.headline3]}
            description={values.description}
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
          />
        );
      case 'instagram':
        return (
          <InstagramAd
            s={s}
            caption={values.primary}
            mode={mode}
            safeZone={safeZone}
            mediaUrl={mediaUrl}
          />
        );
      case 'tiktok':
        return (
          <TikTokAd
            s={s}
            description={values.primary}
            safeZone={safeZone}
            mediaUrl={mediaUrl}
          />
        );
    }
  })();

  return (
    <div class="grid gap-5 lg:grid-cols-2">
      {/* ── Left column: inputs ── */}
      <Card class="flex flex-col">
        <CardHead eyebrow={ap.fields.primary} title={ap.previewLabel} />
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

          {/* Media control */}
          {controls.media && (
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3">
                <label class="inline-flex cursor-pointer items-center gap-2 rounded-pill border border-hairline bg-canvas-soft px-4 py-2 text-[13px] font-medium text-body transition-colors hover:text-ink">
                  <input type="file" accept="image/*" onChange={onPickMedia} class="hidden" />
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

          {/* Shared toggles */}
          {(controls.device || controls.mode || controls.safeZone) && (
            <div class="flex flex-wrap items-center gap-4 border-t border-hairline pt-4">
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
