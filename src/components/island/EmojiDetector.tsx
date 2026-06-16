/** @jsxImportSource preact */
import { useMemo, useState } from 'preact/hooks';
import { Card, CardHead, Stat, Badge, ClearButton, type Tone } from './ui';
import { interp } from '../../i18n/interp';
import { charCount, emojiCount, detectHiddenUnicode, sanitizeText } from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';

interface Props {
  s: IslandStrings;
  /** Active locale — used only for number formatting. */
  lang?: string;
}

export function EmojiDetector({ s, lang }: Props) {
  const c = s.calculators.emojiDetector;
  const [text, setText] = useState('');
  const [removed, setRemoved] = useState(0);

  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);

  const emojis = emojiCount(text);
  const chars = charCount(text);
  const hidden = detectHiddenUnicode(text);

  const hasInput = text.length > 0;
  const badgeTone: Tone = !hasInput ? 'neutral' : hidden.count > 0 ? 'warn' : 'safe';
  const badgeLabel = !hasInput ? c.badgeIdle : hidden.count > 0 ? c.badgeWarn : c.badgeClean;

  const onInput = (value: string) => {
    setText(value);
    setRemoved(0);
  };

  const removeHidden = () => {
    const result = sanitizeText(text);
    setText(result.text);
    setRemoved(result.removed);
  };

  return (
    <Card class="flex flex-col">
      <CardHead eyebrow={c.eyebrow} title={c.title}>
        <Badge tone={badgeTone}>{badgeLabel}</Badge>
      </CardHead>

      <div class="flex flex-col gap-5 p-4 sm:p-5">
        <textarea
          value={text}
          onInput={(e) => onInput((e.currentTarget as HTMLTextAreaElement).value)}
          placeholder={c.placeholder}
          rows={6}
          class="block w-full resize-y rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-[17px] leading-7 text-ink placeholder:text-mute focus:border-link focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
        />

        <ClearButton label={s.calculators.clear} disabled={!text} onClick={() => onInput('')} />

        {/* Metrics */}
        <div class="grid grid-cols-3 gap-3">
          <Stat label={c.emojiLabel} value={nf.format(emojis)} />
          <Stat label={c.charactersLabel} value={nf.format(chars)} />
          <Stat label={c.hiddenLabel} value={nf.format(hidden.count)} />
        </div>

        {/* Hidden-character warning + remove action */}
        {hidden.count > 0 ? (
          <div class="flex flex-col gap-3 rounded-md bg-warning-soft p-4">
            <p class="text-[13px] leading-5 text-warning-deep">
              {interp(s.workspace.hiddenWarning, { codes: hidden.codes.join(', ') })}
            </p>
            <button
              type="button"
              onClick={removeHidden}
              class="inline-flex w-fit items-center gap-1.5 rounded-md bg-ink px-3.5 py-2 text-[13px] font-medium text-on-primary transition-[transform,opacity] duration-100 hover:opacity-90 active:scale-[0.97]"
            >
              {c.removeButton}
            </button>
          </div>
        ) : removed > 0 ? (
          <p class="rounded-md bg-cyan-soft px-4 py-3 text-[13px] text-cyan-deep">
            {interp(c.removedNote, { n: nf.format(removed) })}
          </p>
        ) : (
          hasInput && <p class="text-[13px] leading-5 text-mute">{c.cleanNote}</p>
        )}

        <p class="text-[13px] leading-5 text-mute">{c.note}</p>
      </div>
    </Card>
  );
}

export default EmojiDetector;
