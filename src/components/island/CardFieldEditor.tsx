/** @jsxImportSource preact */
import { linkCardStrings } from '../../i18n/linkCardStrings';
import type { IslandStrings } from '../../i18n/types';

// ──────────────────────────────────────────────────────────────────────────
// CardFieldEditor — the editor-column controls for a Rich_Link_Card's mock
// metadata. It edits the Card_Title, the Card_Description, AND the card's
// "demo image". That demo image is COMPLETELY SEPARATE from the post "Add
// media" attachment in Workspace/Dashboard — editing one never affects the
// other. The card image defaults to the site OG image (/og.png); the user can
// upload an image-only file to override it (videos are not accepted here) or
// reset back to the default.
//
// All fields are controlled, keyboard-operable, labelled controls whose labels
// resolve from the locale via linkCardStrings (Requirement 13.3, 15.1). The
// upload control mirrors the Workspace media-attach pattern (sr-only file
// input wrapped in a <label>, input.value reset after change). All styling
// uses the project's Tailwind v4 design tokens (no arbitrary values).
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
   * The resolved card image URL — either the user's uploaded object URL or the
   * default OG image (/og.png). Independent from the post "Add media" image.
   */
  cardImage: string | null;
  /** True when `cardImage` is the default OG image (no custom upload set). */
  isDefaultImage: boolean;
  /** Hand a picked image File (or null to clear) up to the card-image state. */
  onSelectCardImage: (file: File | null) => void;
  /** Reset the card image back to the default OG image. */
  onResetCardImage: () => void;
  /** Active locale. */
  lang: string;
  /** Translated island strings. */
  s: IslandStrings;
}

/**
 * Editable Card_Title input + Card_Description textarea + a working demo-image
 * upload control for the active Rich_Link_Card. The image control is fully
 * independent from the post media attachment.
 */
export function CardFieldEditor({
  cardTitle,
  cardDescription,
  onCardTitleChange,
  onCardDescriptionChange,
  cardImage,
  isDefaultImage,
  onSelectCardImage,
  onResetCardImage,
  s,
}: CardFieldEditorProps) {
  const strings = linkCardStrings(s);
  const uploadLabel = isDefaultImage ? strings.imageAdd : strings.imageReplace;

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

        {/* Demo image — a WORKING, image-only upload control independent from the
            post "Add media" attachment. Defaults to the site OG image; users can
            replace it or reset back to the default. */}
        <div class="flex items-center gap-2.5">
          {cardImage && (
            <img
              src={cardImage}
              alt={strings.imageAlt}
              class="h-10 w-10 shrink-0 rounded-md border border-hairline object-cover"
            />
          )}
          <label class="inline-flex cursor-pointer items-center gap-1.5 rounded-pill border border-link bg-link px-3.5 py-2 text-[13px] font-semibold text-on-primary transition-[transform,background] duration-100 hover:bg-link-deep active:scale-[0.96]">
            <MediaIcon />
            {uploadLabel}
            <input
              type="file"
              accept="image/*"
              class="sr-only"
              onChange={(e) => {
                const input = e.currentTarget as HTMLInputElement;
                onSelectCardImage(input.files?.[0] ?? null);
                input.value = '';
              }}
            />
          </label>
          {!isDefaultImage && (
            <button
              type="button"
              onClick={onResetCardImage}
              aria-label={strings.imageRemove}
              class="inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[13px] font-medium text-error transition-[transform,color,background] duration-100 hover:bg-error-soft active:scale-[0.96]"
            >
              {strings.imageRemove}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/** Image glyph for the demo-image upload button. */
function MediaIcon() {
  return (
    <svg
      width="15"
      height="15"
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
