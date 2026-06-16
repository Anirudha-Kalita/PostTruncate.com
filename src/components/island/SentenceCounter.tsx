/** @jsxImportSource preact */
import { useMemo, useState } from 'preact/hooks';
import { Card, CardHead, Stat, Badge, ClearButton, type Tone } from './ui';
import { wordCount, charCount, sentenceCount, paragraphCount } from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Active locale — used only for number formatting. */
  lang?: string;
}

export function SentenceCounter({ s, lang }: Props) {
  const c = s.calculators.sentenceCounter;
  const counters = s.workspace.counters;
  const [text, setText] = useState('');

  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);

  const sentences = sentenceCount(text);
  const paragraphs = paragraphCount(text);
  const words = wordCount(text);
  const chars = charCount(text);

  const hasInput = text.trim().length > 0;
  const badgeTone: Tone = hasInput ? 'safe' : 'neutral';
  const badgeLabel = hasInput ? c.badgeResult : c.badgeIdle;

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow={c.eyebrow} title={c.title}>
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col gap-5 p-4 sm:p-5">
        <textarea
          value={text}
          onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
          placeholder={c.placeholder}
          rows={6}
          class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[17px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
        />

        <ClearButton label={s.calculators.clear} disabled={!text} onClick={() => setText('')} />

        {/* Metrics */}
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={c.sentencesLabel} value={nf.format(sentences)} />
          <Stat label={counters.paragraphs} value={nf.format(paragraphs)} />
          <Stat label={counters.words} value={nf.format(words)} />
          <Stat label={counters.characters} value={nf.format(chars)} />
        </div>

        <p class="text-[13px] leading-5 text-mute">{c.note}</p>
      </div>
    </Card>
  );
}

export default SentenceCounter;
