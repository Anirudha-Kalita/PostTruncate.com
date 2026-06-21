/** @jsxImportSource preact */
import { useMemo, useState } from 'preact/hooks';
import { Card, CardHead, Meter, Badge, ClearButton, type Tone } from './ui';
import { interp } from '../../i18n/interp';
import { charCount, platformLengthByMode } from '../../lib/textTools';
import { PLATFORM_COUNTERS } from '../../data/platformCounters';
import { organicLinkBehavior } from '../../data/linkBehavior';
import { selectLinkIndication } from '../../lib/linkIndication';
import { linkDisplayStrings } from '../../i18n/linkDisplayStrings';
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
  const linkBehavior = organicLinkBehavior(platform);
  // Determine the platform's link-counting mode once. Bluesky's 300-unit limit
  // is measured in UTF-8 bytes (countMode === 'per-byte'); every other platform
  // keeps the existing grapheme-based charCount with no behavior change.
  const countMode = linkBehavior?.countMode;

  /**
   * Build the localized link-display indication lines for a field, or `null`
   * when the field text contains no URL (Requirement 8.4 — render exactly as
   * today). The indication key is derived solely from the platform's config via
   * `selectLinkIndication`, so the displayed fact always matches stored config.
   */
  const linkIndicationLines = (text: string): string[] | null => {
    const indication = selectLinkIndication(platform, text);
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

    const allowance = linkBehavior?.bioLinkAllowance;
    if (allowance !== undefined) {
      lines.push(interp(ld.bioLinkAllowance, { n: allowance }));
    }

    return lines.length > 0 ? lines : null;
  };

  if (!config) return null;

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
      <CardHead eyebrow={config.brand} title={c.title}>
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
            {linkIndicationLines(f.text)?.map((line) => (
              <p class="text-[12px] leading-4 text-mute">{line}</p>
            ))}
          </div>
        ))}

        <ClearButton label={s.calculators.clear} disabled={!anyInput} onClick={() => setValues({})} />
      </div>
    </Card>
  );
}

export default PlatformCounter;
