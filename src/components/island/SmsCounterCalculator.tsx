/** @jsxImportSource preact */
import { useMemo, useState } from 'preact/hooks';
import { Card, CardHead, ClearButton, SmsGlyph } from './ui';
import { SmsCounter } from './SmsCounter';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Active locale — used for number formatting in the SMS card. */
  lang?: string;
}

// Self-contained SMS segment counter for the standalone Tools page: an editor
// card (textarea + live count) that drives the existing display-only SmsCounter
// card (GSM-7/Unicode + segment math). Mirrors the main editor's chrome so the
// input reads as a real editor, not a bare field.
export function SmsCounterCalculator({ s, lang }: Props) {
  const [text, setText] = useState('');
  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);

  return (
    <div class="flex flex-col gap-5">
      <Card class="flex flex-col">
        <CardHead eyebrow={s.sms.eyebrow} title={s.workspace.badgeEditor} logo={<SmsGlyph size={22} />}>
          <span class="font-mono text-[13px] text-mute tabular-nums">
            {nf.format([...text].length)}
          </span>
        </CardHead>

        <div class="flex flex-col gap-4 p-4 sm:p-5">
          <textarea
            value={text}
            onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
            placeholder={s.sms.placeholder}
            rows={6}
            spellcheck
            class="block h-[220px] w-full resize-none rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-mute transition-[border-color,background] duration-200 focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />

          <ClearButton label={s.calculators.clear} disabled={!text} onClick={() => setText('')} />
        </div>
      </Card>

      <SmsCounter text={text} lang={lang ?? 'en'} s={s.sms} />
    </div>
  );
}

export default SmsCounterCalculator;
