/**
 * Pure draft-envelope serialize/parse (DOM-free, storage-agnostic).
 *
 * The editor persists the active draft to `sessionStorage` under
 * `post_truncate_active_draft`. Historically that value was the bare post text
 * (a plain string). This feature widens the persisted shape to a small JSON
 * envelope that also carries the user-edited Card_Title / Card_Description, so a
 * reload restores the card metadata alongside the body (Requirement 16.4).
 *
 * Backward compatibility is non-negotiable: a value written by the previous
 * (plain-string) version MUST still load. `parseDraft` therefore reads a legacy
 * bare string as `{ text: <string> }`, and ignores malformed JSON by falling
 * back to an empty draft rather than throwing.
 *
 * The attached image is intentionally NOT part of the envelope — it is an
 * in-memory object URL that is dropped on reload (unchanged behavior).
 *
 * This module performs NO DOM / storage access. The caller owns reading from
 * and writing to `sessionStorage`; that keeps the (de)serialization independently
 * testable.
 */

/** The existing `sessionStorage` key the active draft is persisted under. */
export const DRAFT_STORAGE_KEY = 'post_truncate_active_draft';

/**
 * The persisted draft shape. `text` is the post body; the card fields are
 * present only when the user has edited them. The attached image is never
 * persisted, so it has no field here.
 */
export interface DraftEnvelope {
  /** The post body text. */
  text: string;
  /** User-edited Card_Title, when present. */
  cardTitle?: string;
  /** User-edited Card_Description, when present. */
  cardDescription?: string;
}

/** A non-null, non-array object. */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Serialize a draft envelope to the string stored in `sessionStorage`.
 *
 * Always emits a JSON object so the round-trip is stable. Optional card fields
 * are included only when defined (an absent field stays absent, so a
 * card-less draft serializes to `{"text":"…"}`). The image is never included.
 */
export function serializeDraft(envelope: DraftEnvelope): string {
  const out: DraftEnvelope = { text: envelope.text };
  if (envelope.cardTitle !== undefined) out.cardTitle = envelope.cardTitle;
  if (envelope.cardDescription !== undefined) out.cardDescription = envelope.cardDescription;
  return JSON.stringify(out);
}

/**
 * Parse a stored draft value back into a {@link DraftEnvelope}.
 *
 * Resolution order:
 * 1. Empty / nullish → `{ text: '' }`.
 * 2. A JSON-object envelope (the current format) → its `text` plus any present
 *    string card fields; an object without a string `text` or malformed JSON
 *    falls back to `{ text: '' }`.
 * 3. Anything else → a legacy bare-string draft, read as `{ text: <string> }`.
 *
 * Never throws.
 */
export function parseDraft(raw: string | null | undefined): DraftEnvelope {
  if (raw == null || raw === '') return { text: '' };

  // The current format is a JSON object; a legacy draft is the bare post text.
  // Only attempt JSON parsing when the value is shaped like our envelope, so an
  // ordinary post that happens to be valid JSON (e.g. just a number) is still
  // treated as plain body text.
  if (raw.trimStart().startsWith('{')) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (isPlainObject(parsed) && typeof parsed.text === 'string') {
        const envelope: DraftEnvelope = { text: parsed.text };
        if (typeof parsed.cardTitle === 'string') envelope.cardTitle = parsed.cardTitle;
        if (typeof parsed.cardDescription === 'string') {
          envelope.cardDescription = parsed.cardDescription;
        }
        return envelope;
      }
      // Parsed but not a valid envelope shape → ignore, fall back to empty.
      return { text: '' };
    } catch {
      // Malformed JSON → ignore, fall back to empty.
      return { text: '' };
    }
  }

  // Legacy plain-string draft.
  return { text: raw };
}
