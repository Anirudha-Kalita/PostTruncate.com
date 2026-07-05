/** @jsxImportSource preact */
import { useMemo, useState } from 'preact/hooks';
import { Card, CardHead, Meter, Badge, ClearButton, type Tone } from './ui';
import { interp } from '../../i18n/interp';
import { charCount, detectUrls, platformLengthByMode } from '../../lib/textTools';
import { PLATFORM_COUNTERS, type CounterField } from '../../data/platformCounters';
import { organicLinkBehavior } from '../../data/linkBehavior';
import { selectLinkIndication } from '../../lib/linkIndication';
import { linkDisplayStrings } from '../../i18n/linkDisplayStrings';
import { linkCardStrings } from '../../i18n/linkCardStrings';
import { LivePreviewCard, DEFAULT_CARD_IMAGE } from './LivePreviewCard';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Platform id — must be a key of PLATFORM_COUNTERS. */
  platform: string;
  lang?: string;
}

export function PlatformCounter({ s, platform, lang }: Props) {
  const c = s.calculators.platformCounter;
  const config = PLATFORM_COUNTERS[platform];
  const [values, setValues] = useState<Record<string, string>>({});

  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);

  // Link-display guidance: resolve the localized copy and the platform's
  // stored organic link behavior. Both are read additively — they never affect
  // the existing counters, meters, badges, or limits below.
  const ld = linkDisplayStrings(s);
  const lc = linkCardStrings(s);
  const linkBehavior = organicLinkBehavior(platform);
  // Determine the platform's link-counting mode once. Bluesky's 300-unit limit
  // is measured in UTF-8 bytes (countMode === 'per-byte'); every other platform
  // keeps the existing grapheme-based charCount with no behavior change.
  const countMode = linkBehavior?.countMode;

  /**
   * Build the localized link-display indication lines for ONE field, or `null`
   * when the field text contains no URL (Requirement 8.4 — render exactly as
   * today). The indication is derived from the field's own link behavior: a
   * field's `link` override wins, otherwise it inherits the platform model. This
   * keeps the displayed fact matched to what actually happens in THAT box —
   * e.g. a Bio link is clickable while a caption link is plain text.
   */
  const linkIndicationLines = (field: CounterField & { text: string }): string[] | null => {
    if (detectUrls(field.text).length === 0) return null;

    // Profile/bio field: the link is clickable, so show ONLY the platform's
    // bio-link-allowance line — never the "not clickable / preview card" copy.
    if (field.link === 'bio') {
      const allowance = linkBehavior?.bioLinkAllowance;
      return allowance !== undefined
        ? [interp(ld.bioLinkAllowance, { n: allowance })]
        : null;
    }

    // The remaining roles map 1:1 onto a Link_Display_Model; pass the override
    // (or undefined to inherit the platform model) to the pure selector.
    const indication = selectLinkIndication(platform, field.text, field.link);
    if (indication === 'none') return null;

    const lines: string[] = [];
    switch (indication) {
      case 'plainText':
        lines.push(ld.plainText);
        break;
      case 'previewCard':
        // When the platform builds the card from the first URL only, name that
        // first link as the card source (Requirement 5.2); otherwise show the
        // generic preview-card line. A single clear line either way.
        lines.push(linkBehavior?.cardFromFirstUrlOnly ? ld.previewCardFirstUrl : ld.previewCard);
        // When this platform builds the card from the first URL only AND more
        // than one URL is present, add the localized note identifying which URL
        // became the card (Requirement 5.2). Single-URL behavior is unchanged.
        if (linkBehavior?.cardFromFirstUrlOnly && detectUrls(field.text).length > 1) {
          lines.push(lc.firstUrlNote);
        }
        break;
      case 'clickableInline':
        lines.push(ld.clickableInline);
        break;
      case 'countedShortened':
        lines.push(
          interp(ld.countedShortened, { weight: linkBehavior?.fixedLinkWeight ?? 23 }),
        );
        break;
    }

    return lines.length > 0 ? lines : null;
  };

  if (!config) return null;

  // Brand logo shown in the card header. Added per platform as each counter page
  // is themed; the rest keep the logo-less header until then.
  const brandLogo =
    platform === 'youtube' ? (
      <svg width="30" height="21" viewBox="0 0 28 20" aria-hidden="true">
        <rect width="28" height="20" rx="5" fill="#FF0000" />
        <path d="M11 5.5 19 10l-8 4.5z" fill="#fff" />
      </svg>
    ) : platform === 'whatsapp' ? (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#25D366" />
        <path
          fill="#fff"
          d="M17.5 6.4A7.6 7.6 0 0 0 5.6 15.6L4.5 19.5l4-1.05a7.6 7.6 0 0 0 3.6.92h.003a7.6 7.6 0 0 0 5.4-13zM12.1 18.1a6.3 6.3 0 0 1-3.2-.88l-.23-.14-2.37.62.63-2.31-.15-.24a6.3 6.3 0 1 1 5.32 2.95zm3.47-4.72c-.19-.1-1.12-.55-1.3-.61-.17-.06-.3-.1-.42.1-.13.19-.49.61-.6.74-.11.13-.22.14-.41.05-.19-.1-.8-.3-1.53-.94-.57-.5-.95-1.13-1.06-1.32-.11-.19-.01-.29.08-.39.09-.09.19-.22.29-.34.1-.11.13-.19.19-.32.06-.13.03-.24-.02-.34-.05-.1-.42-1.02-.58-1.39-.15-.36-.31-.31-.42-.32h-.36c-.13 0-.34.05-.51.24-.17.19-.67.65-.67 1.58s.68 1.84.78 1.96c.1.13 1.34 2.05 3.25 2.87.45.2.81.31 1.09.4.46.15.87.13 1.2.08.37-.05 1.12-.46 1.28-.9.16-.44.16-.82.11-.9-.05-.08-.17-.13-.36-.23z"
        />
      </svg>
    ) : platform === 'tiktok' ? (
      <span class="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#010101]">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#25F4EE" transform="translate(-0.7 -0.5)" d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.39-2.46V9.69a5.66 5.66 0 0 0-.8-.06A5.69 5.69 0 0 0 4.17 15.31 5.69 5.69 0 0 0 13.94 19.3a5.69 5.69 0 0 0 1.6-3.96V9.01a7.34 7.34 0 0 0 4.29 1.37V7.3a4.28 4.28 0 0 1-3.23-1.48z" />
          <path fill="#FE2C55" transform="translate(0.7 0.5)" d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.39-2.46V9.69a5.66 5.66 0 0 0-.8-.06A5.69 5.69 0 0 0 4.17 15.31 5.69 5.69 0 0 0 13.94 19.3a5.69 5.69 0 0 0 1.6-3.96V9.01a7.34 7.34 0 0 0 4.29 1.37V7.3a4.28 4.28 0 0 1-3.23-1.48z" />
          <path fill="#fff" d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.39-2.46V9.69a5.66 5.66 0 0 0-.8-.06A5.69 5.69 0 0 0 4.17 15.31 5.69 5.69 0 0 0 13.94 19.3a5.69 5.69 0 0 0 1.6-3.96V9.01a7.34 7.34 0 0 0 4.29 1.37V7.3a4.28 4.28 0 0 1-3.23-1.48z" />
        </svg>
      </span>
    ) : platform === 'pinterest' ? (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#E60023" />
        <path
          fill="#fff"
          d="M12.3 5.5c-3.8 0-5.7 2.7-5.7 5 0 1.4.5 2.6 1.7 3 .2.1.4 0 .4-.2l.2-.7c.1-.2 0-.3-.1-.4-.4-.5-.7-1.1-.7-2 0-2.5 1.9-4.8 5-4.8 2.7 0 4.2 1.7 4.2 3.9 0 2.9-1.3 5.4-3.2 5.4-1.1 0-1.8-.9-1.6-2 .3-1.3.9-2.6.9-3.5 0-.8-.4-1.5-1.3-1.5-1.1 0-1.9 1.1-1.9 2.6 0 .9.3 1.6.3 1.6l-1.3 5.4c-.4 1.6-.1 3.6 0 3.8 0 .1.2.2.3.1.1-.1 1.4-1.7 1.8-3.3l.7-2.7c.4.7 1.4 1.3 2.5 1.3 3.3 0 5.6-3 5.6-7.1 0-3.1-2.6-5.9-6.3-5.9z"
        />
      </svg>
    ) : platform === 'reddit' ? (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#FF4500" />
        <path
          fill="#fff"
          d="M20 12.3c0-1-.8-1.8-1.8-1.8-.5 0-.9.2-1.2.5-1.2-.8-2.7-1.3-4.4-1.4l.8-3.5 2.5.6c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1-.5-1.1-1.1-1.1c-.4 0-.8.3-1 .6l-2.8-.6c-.1 0-.2 0-.2.1l-.9 4c-1.7.1-3.2.6-4.4 1.4-.3-.3-.8-.5-1.2-.5-1 0-1.8.8-1.8 1.8 0 .7.4 1.3 1 1.6v.5c0 2.5 2.9 4.5 6.5 4.5s6.5-2 6.5-4.5v-.5c.6-.3 1-.9 1-1.6zM8 13.6c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1zm6.3 3c-.8.8-2.3.8-2.8.8s-2 0-2.8-.8c-.1-.1-.1-.3 0-.4.1-.1.3-.1.4 0 .5.5 1.6.7 2.4.7s1.9-.2 2.4-.7c.1-.1.3-.1.4 0 .1.1.1.3 0 .4zm-.2-1.9c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"
        />
      </svg>
    ) : platform === 'bluesky' ? (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1185FE" />
        <path
          fill="#fff"
          d="M12 10.8C11.1 9.1 8.6 6 6.3 4.4 4.1 2.9 3.3 3.1 2.7 3.4 2 3.7 2 4.7 2 5.4c0 .7.4 5.5.6 6.3.7 2.6 3.5 3.5 6 3.2-3.7.5-7 1.9-2.7 6.7C11 21.4 12 18.9 12 17.6c0 1.3 1 3.8 6.1 1.9 4.3-4.8 1-6.2-2.7-6.7 2.5.3 5.3-.6 6-3.2.2-.8.6-5.6.6-6.3 0-.7 0-1.7-.7-2-.6-.3-1.4-.5-3.6 1-2.3 1.6-4.8 4.7-6.7 6.5z"
        />
      </svg>
    ) : platform === 'discord' ? (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#5865F2" />
        <path
          fill="#fff"
          d="M18.9 7.3a15.9 15.9 0 0 0-3.9-1.2l-.2.4a14.7 14.7 0 0 1 3.4 1.1 12.4 12.4 0 0 0-10.5 0A14.7 14.7 0 0 1 11 6.5l-.2-.4a15.9 15.9 0 0 0-3.9 1.2C4.4 11 3.8 14.5 4.1 18a16 16 0 0 0 4.9 2.5l.6-1a10.4 10.4 0 0 1-1.6-.8l.4-.3a11.4 11.4 0 0 0 9.7 0l.4.3a10.4 10.4 0 0 1-1.6.8l.6 1a16 16 0 0 0 4.9-2.5c.4-4.1-.6-7.6-2.5-10.7zM9.7 15.6c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9zm4.6 0c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9z"
        />
      </svg>
    ) : undefined;

  const counts = config.fields.map((f) => {
    const text = values[f.key] ?? '';
    // Per-byte platforms (Bluesky) measure the body against the limit in UTF-8
    // bytes; all other platforms remain byte-for-byte identical on charCount.
    const count = countMode === 'per-byte' ? platformLengthByMode(text, 'per-byte') : charCount(text);
    return { ...f, text, count, over: count > f.limit };
  });

  const anyInput = counts.some((f) => f.count > 0);
  const anyOver = counts.some((f) => f.over);
  const badgeTone: Tone = !anyInput ? 'neutral' : anyOver ? 'danger' : 'safe';
  const badgeLabel = !anyInput ? c.badgeIdle : anyOver ? c.badgeOver : c.badgeSafe;

  const setField = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const fieldLabel = (key: keyof typeof c.fields) => c.fields[key];

  const meterTone = (count: number, limit: number): Tone =>
    count > limit ? 'danger' : count > limit * 0.9 ? 'warn' : count > 0 ? 'safe' : 'neutral';

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow={config.brand} title={c.title} logo={brandLogo}>
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col gap-5 p-4 sm:p-5">
        {counts.map((f) => (
          <div class="flex flex-col gap-2">
            <Meter
              label={fieldLabel(f.key)}
              caption={interp(c.counter, { n: nf.format(f.count), limit: nf.format(f.limit) })}
              value={f.count}
              max={f.limit}
              tone={meterTone(f.count, f.limit)}
            />
            <textarea
              value={f.text}
              onInput={(e) => setField(f.key, (e.currentTarget as HTMLTextAreaElement).value)}
              placeholder={c.placeholder}
              rows={f.limit <= 120 ? 2 : 4}
              class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-2.5 text-[15px] leading-6 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
            />
            {f.over ? (
              <p class="text-[12px] leading-4 text-error-deep">
                {interp(c.over, { n: nf.format(f.count - f.limit) })}
              </p>
            ) : (
              <p class="text-[12px] leading-4 text-mute">
                {interp(c.remaining, { n: nf.format(f.limit - f.count) })}
              </p>
            )}
            {linkIndicationLines(f)?.map((line) => (
              <p class="text-[12px] leading-4 text-mute">{line}</p>
            ))}
            {/* Open Graph link-card simulation, gated on the FIELD's effective
                link behavior — not the platform model — so a field overridden
                away from preview-card (e.g. the WhatsApp "About" tagline) shows
                no card, while the Status field still does. Standalone counter
                pages own no editor state, so the card uses placeholder metadata
                and the no-image form. LivePreviewCard renders null when this
                field has no URL or the platform is not a preview-card platform,
                so URL-free behavior is unchanged (Requirement 1.1, 16.1). */}
            {(f.link && f.link !== 'bio' ? f.link : linkBehavior?.model) === 'preview-card' && (
              <LivePreviewCard platform={platform} text={f.text} image={DEFAULT_CARD_IMAGE} lang={lang ?? 'en'} s={s} />
            )}
          </div>
        ))}

        <ClearButton label={s.calculators.clear} disabled={!anyInput} onClick={() => setValues({})} />
      </div>
    </Card>
  );
}

export default PlatformCounter;
