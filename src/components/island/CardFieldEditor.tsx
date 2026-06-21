/** @jsxImportSource preact */
import { linkCardStrings } from '../../i18n/linkCardStrings';
import type { IslandStrings } from '../../i18n/types';

// ──────────────────────────────────────────────────────────────────────────
// CardFieldEditor — the editor-column controls for a Rich_Link_Card's mock
// metadata. It edits ONLY the Card_Title and Card_Description (Requirement 4.1):
// the card image is supplied by the editor's EXISTING media-attachment object
// URL (the `image`/`onSelectImage` control already in Workspace/Dashboard), so
// there is deliberately NO new upload control here (Requirement 4.3). When no
// image is attached the component reflects the no-image form (Requirement 4.5);
// the actual no-image card layout is rendered by LivePreviewCard.
//
// Both fields are controlled inputs with keyboard-operable, labelled controls
// whose labels resolve from the locale via linkCardStrings (Requirement 13.3,
// 15.1). All styling uses the project's Tailwind v4 design tokens (no arbitrary
// values), mirroring the editor textarea/media-attach conventions in Workspace.
// ──────────────────────────────────────────────────────────────────────────

const TITLE_INPUT_ID = 'card-title-input';
const DESCRIPTION_INPUT_ID = 'card-description-input';

export interface CardFieldEditorProps {
  /** Current Card_Title value (controlled). Empty shows the localized placeholder. */
  cardTitle: string;
  /** Current Card_Description value (controlled). Empty shows the localized placeholder. */
  cardDescription: string;
  /** Push an edited Card_Title up to the owning editor state. */
  onCardTitleChange: (next: string) => void;
  /** Push an edited Card_Description up to the owning editor state. */
  onCardDescriptionChange: (next: string) => void;
  /**
   * The editor's existing media-attachment object URL (reused as the card
   * image), or null when none is attached. This component never uploads — it
   * only reflects the attachment state. When null, the no-image form is shown.
   */
  image?: string | null;
  /** Whether the attached media is an image (default) or a video. */
  mediaKind?: 'image' | 'video';
  /** Active locale. */
  lang: string;
  /** Translated island strings. */
  s: IslandStrings;
}

/**
 * Editable Card_Title input + Card_Description textarea for the active
 * Rich_Link_Card. Controlled and keyboard-operable; the attached media (if any)
 * is reflected read-only because it is owned by the editor's media-attach
 * control, not edited here.
 */
export function CardFieldEditor({
  cardTitle,
  cardDescription,
  onCardTitleChange,
  onCardDescriptionChange,
  image,
  mediaKind = 'image',
  s,
}: CardFieldEditorProps) {
  const strings = linkCardStrings(s);

  return (
    <section class="rounded-md border border-hairline bg-canvas-soft p-3.5 sm:p-4">
      <h4 class="font-mono text-[11px] uppercase tracking-wide text-mute">
        {strings.editorHeading}
      </h4>

      <div class="mt-3 flex flex-col gap-3">
        {/* Card title — single-line text input. */}
        <div class="flex flex-col gap-1.5">
          <label
            for={TITLE_INPUT_ID}
            class="text-[13px] font-medium leading-4 text-body"
          >
            {strings.titleLabel}
          </label>
          <input
            id={TITLE_INPUT_ID}
            type="text"
            value={cardTitle}
            onInput={(e) => onCardTitleChange((e.currentTarget as HTMLInputElement).value)}
            placeholder={strings.titlePlaceholder}
            class="block w-full rounded-md border border-hairline bg-canvas px-3 py-2 text-[14px] leading-5 text-ink placeholder:text-mute transition-[border-color,box-shadow] duration-150 focus:border-link focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />
        </div>

        {/* Card description — multi-line textarea. */}
        <div class="flex flex-col gap-1.5">
          <label
            for={DESCRIPTION_INPUT_ID}
            class="text-[13px] font-medium leading-4 text-body"
          >
            {strings.descriptionLabel}
          </label>
          <textarea
            id={DESCRIPTION_INPUT_ID}
            value={cardDescription}
            onInput={(e) => onCardDescriptionChange((e.currentTarget as HTMLTextAreaElement).value)}
            placeholder={strings.descriptionPlaceholder}
            rows={3}
            class="block w-full resize-none rounded-md border border-hairline bg-canvas px-3 py-2 text-[14px] leading-5 text-ink placeholder:text-mute transition-[border-color,box-shadow] duration-150 focus:border-link focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          />
        </div>

        {/* Attached media is reused as the card image — reflected read-only here
            (no upload control). The no-image form is shown when none is set. */}
        <div class="flex items-center gap-2.5">
          {image ? (
            mediaKind === 'video' ? (
              <video
                src={image}
                muted
                playsInline
                preload="metadata"
                class="h-10 w-10 shrink-0 rounded-md border border-hairline object-cover"
              />
            ) : (
              <img
                src={image}
                alt={strings.imageAlt}
                class="h-10 w-10 shrink-0 rounded-md border border-hairline object-cover"
              />
            )
          ) : (
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-dashed border-hairline-strong text-mute"
              aria-hidden="true"
            >
              <ImagePlaceholderIcon />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

/** Faint image glyph for the no-image placeholder tile. */
function ImagePlaceholderIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}
