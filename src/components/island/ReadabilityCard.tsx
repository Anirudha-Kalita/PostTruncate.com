/** @jsxImportSource preact */
import { useMemo } from 'preact/hooks';
import { analyzeReadability } from '../../lib/textTools';
import type { IslandStrings } from '../../i18n/types';
import { Badge, Card, CardHead, Stat } from './ui';
import type { Tone } from './ui';

interface Props {
  text: string;
  lang: string;
  s: IslandStrings['readability'];
}

const NOT_APPLICABLE_LANGS = new Set(['ja', 'zh']);

function getDescriptor(
  score: number,
  d: IslandStrings['readability']['descriptors'],
): string {
  if (score >= 90) return d.veryEasy;
  if (score >= 80) return d.easy;
  if (score >= 70) return d.fairlyEasy;
  if (score >= 60) return d.standard;
  if (score >= 50) return d.fairlyDifficult;
  if (score >= 30) return d.difficult;
  return d.veryDifficult;
}

function descriptorTone(score: number): Tone {
  if (score >= 70) return 'safe';
  if (score >= 60) return 'neutral';
  if (score >= 50) return 'warn';
  return 'danger';
}

export function ReadabilityCard({ text, lang, s }: Props) {
  const result = useMemo(() => analyzeReadability(text), [text]);
  const isNotApplicable = NOT_APPLICABLE_LANGS.has(lang);

  const tone = !isNotApplicable && result.hasData
    ? descriptorTone(result.fleschEase)
    : 'neutral';

  const descriptor = !isNotApplicable && result.hasData
    ? getDescriptor(result.fleschEase, s.descriptors)
    : null;

  return (
    <Card>
      <CardHead eyebrow={s.eyebrow} title={s.title}>
        <button
          type="button"
          title={s.tooltip}
          aria-label={s.tooltip}
          class="flex h-6 w-6 items-center justify-center rounded-full text-mute transition-colors hover:text-body focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
        >
          <InfoIcon />
        </button>
        {descriptor !== null && (
          <Badge tone={tone}>{descriptor}</Badge>
        )}
      </CardHead>

      <div class="p-4 sm:p-5">
        {isNotApplicable ? (
          <p class="text-[13px] leading-5 text-body">{s.notApplicable}</p>
        ) : (
          <div class="grid grid-cols-2 gap-2.5">
            <Stat
              label={s.scoreLabel}
              value={result.hasData ? result.fleschEase : '—'}
            />
            <Stat
              label={s.gradeLabel}
              value={result.hasData ? result.gradeLevel.toFixed(1) : '—'}
            />
          </div>
        )}
      </div>
    </Card>
  );
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
