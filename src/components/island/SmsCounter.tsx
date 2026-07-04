/** @jsxImportSource preact */
import { useMemo } from 'preact/hooks';
import { analyzeSms } from '../../lib/textTools';
import { interp } from '../../i18n/interp';
import type { ComponentChildren } from 'preact';
import type { IslandStrings } from '../../i18n/types';
import { Badge, Card, CardHead, Stat } from './ui';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings['sms'];
  /** Optional Share_Link action pinned to the top-right of the card header. */
  share?: ComponentChildren;
}

export function SmsCounter({ text, lang, s, share }: Props) {
  const sms = useMemo(() => analyzeSms(text), [text]);
  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  const badgeTone = sms.isGsm ? 'safe' : 'warn';
  const partLabel = interp(s.partsValue, { n: nf.format(sms.parts) });

  return (
    <Card>
      <CardHead eyebrow={s.eyebrow} title={s.title} share={share}>
        <Badge tone={badgeTone}>{sms.isGsm ? s.encodingGsm : s.encodingUnicode}</Badge>
      </CardHead>

      <div class="p-4 sm:p-5">
        <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Stat label={s.characterCount} value={nf.format(sms.units)} />
          <Stat label={s.charactersLeft} value={nf.format(sms.charactersLeft)} />
          <Stat label={s.parts} value={partLabel} />
          <Stat label={s.encoding} value={sms.isGsm ? s.encodingGsm : s.encodingUnicode} />
        </div>

        <div class="mt-3 rounded-md border border-hairline bg-canvas-soft px-3 py-2.5">
          <p class="text-[12px] leading-5 text-body">
            {sms.isGsm ? s.gsmNote : s.unicodeNote}
          </p>
        </div>
      </div>
    </Card>
  );
}
