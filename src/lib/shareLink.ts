/**
 * Pure Share_Link codec — DOM-free, storage-free serialize/parse of a versioned
 * Share_Payload to/from a URL-safe Share_Token.
 *
 * Modeled on the discipline already proven in `draftEnvelope.ts`: pure,
 * synchronous, and NEVER throwing. `parseShare` treats every token as untrusted
 * attacker-controllable input — it only `JSON.parse`s inside a try/catch and
 * validates/coerces every field before returning, so a damaged, truncated, or
 * future-version link can never break a page (it degrades to `null`, letting the
 * caller fall through to its normal defaults).
 *
 * The encoding pipeline is `JSON.stringify` → `lz-string`
 * `compressToEncodedURIComponent`, which both compresses (Requirement 9.1) and
 * emits a URL-safe alphabet that needs no extra percent-encoding inside a hash
 * fragment (Requirement 4.2).
 *
 * Attached media is intentionally NOT representable in any payload type, so it
 * can never end up in a shared URL (Requirement 1.7 / 5.5).
 */

// lz-string ships as CommonJS, so a default import (module.exports) is the
// interop form that works under both Vite and raw Node ESM (the test runner).
import LZString from 'lz-string';

const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = LZString;

/** Bumped only on incompatible payload-shape changes (Schema_Version). */
export const SCHEMA_VERSION = 1;

/** Discriminates the two island families. */
export type ShareKind = 'editor' | 'ad';

/** Editor-tool state (post body + optional Rich Link Card metadata). */
export interface EditorShareState {
  kind: 'editor';
  /** Post body text. Field name matches Draft_Envelope. */
  text: string;
  /** Present only when non-empty / non-whitespace. */
  cardTitle?: string;
  /** Present only when non-empty / non-whitespace. */
  cardDescription?: string;
}

/** Ad-preview-tool view toggles; each key present only when meaningful. */
export interface AdShareView {
  device?: 'mobile' | 'desktop';
  mode?: 'feed' | 'reels';
  safeZone?: boolean;
  destinationUrl?: string;
  cta?: string;
  finalUrl?: string;
  paths?: string[];
}

/** Ad-preview-tool state (field values keyed by id + view toggles). */
export interface AdShareState {
  kind: 'ad';
  /** Source simulator platform identifier (e.g. 'google' | 'facebook'). */
  platform: string;
  /** Non-empty field values keyed by field id (headline1, primary, …). */
  fields: Record<string, string>;
  /** View toggles. */
  view: AdShareView;
}

export type ShareState = EditorShareState | AdShareState;

/** The full versioned envelope that is serialized into the token. */
export interface SharePayload {
  /** Schema_Version. */
  v: number;
  state: ShareState;
}

/** A non-null, non-array object. */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** A string that is neither empty nor whitespace-only. */
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Serialize a payload into a URL-safe Share_Token (compressed). The output is
 * drawn from the `lz-string` URL-safe alphabet (`A–Z a–z 0–9 + - $`).
 */
export function serializeShare(payload: SharePayload): string {
  return compressToEncodedURIComponent(JSON.stringify(payload));
}

/**
 * Parse a Share_Token back into a {@link SharePayload}. NEVER throws.
 *
 * Returns `null` for any input that is empty, malformed, truncated,
 * version-incompatible, or whose `state.kind` is unrecognized — so the caller
 * can cleanly fall through to its normal defaults. When the token decodes to a
 * recognizable-but-partially-invalid payload, the offending fields are dropped
 * (or coerced to a safe default) and the remaining valid fields are retained.
 */
export function parseShare(token: string | null | undefined): SharePayload | null {
  if (token == null || token === '') return null;

  let json: string | null;
  try {
    json = decompressFromEncodedURIComponent(token);
  } catch {
    return null;
  }
  if (json == null || json === '') return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return null;
  }

  try {
    return validatePayload(parsed);
  } catch {
    // Defense in depth: validation is total, but never let anything escape.
    return null;
  }
}

/** Validate/coerce an arbitrary parsed value into a SharePayload, or null. */
function validatePayload(parsed: unknown): SharePayload | null {
  if (!isPlainObject(parsed)) return null;

  const { v, state } = parsed;
  if (typeof v !== 'number' || !Number.isFinite(v)) return null;
  // A link from a newer format we cannot understand → load defaults.
  if (v > SCHEMA_VERSION) return null;
  if (!isPlainObject(state)) return null;

  if (state.kind === 'editor') {
    const out: EditorShareState = {
      kind: 'editor',
      // Wrong-typed body collapses to empty rather than dropping the payload.
      text: typeof state.text === 'string' ? state.text : '',
    };
    if (isNonEmptyString(state.cardTitle)) out.cardTitle = state.cardTitle;
    if (isNonEmptyString(state.cardDescription)) {
      out.cardDescription = state.cardDescription;
    }
    return { v, state: out };
  }

  if (state.kind === 'ad') {
    const out: AdShareState = {
      kind: 'ad',
      platform: typeof state.platform === 'string' ? state.platform : '',
      fields: validateFields(state.fields),
      view: validateView(state.view),
    };
    return { v, state: out };
  }

  // Unrecognized kind → no usable state.
  return null;
}

/** Keep only string-valued field entries (drop non-string values). */
function validateFields(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!isPlainObject(raw)) return out;
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'string') out[key] = value;
  }
  return out;
}

/** Keep only view toggles whose type matches the expected type. */
function validateView(raw: unknown): AdShareView {
  const out: AdShareView = {};
  if (!isPlainObject(raw)) return out;

  if (raw.device === 'mobile' || raw.device === 'desktop') out.device = raw.device;
  if (raw.mode === 'feed' || raw.mode === 'reels') out.mode = raw.mode;
  if (typeof raw.safeZone === 'boolean') out.safeZone = raw.safeZone;
  if (typeof raw.destinationUrl === 'string') out.destinationUrl = raw.destinationUrl;
  if (typeof raw.cta === 'string') out.cta = raw.cta;
  if (typeof raw.finalUrl === 'string') out.finalUrl = raw.finalUrl;
  if (Array.isArray(raw.paths) && raw.paths.every((p) => typeof p === 'string')) {
    out.paths = raw.paths as string[];
  }

  return out;
}

/**
 * Strip empty / whitespace-only string fields from a collected state, so a
 * Share_Token never carries an empty value (Requirements 2.4, 3.2). Non-string
 * toggles (booleans, the device/mode enums) are preserved as-is.
 */
export function pruneEmptyFields(state: ShareState): ShareState {
  if (state.kind === 'editor') {
    const out: EditorShareState = { kind: 'editor', text: state.text };
    if (isNonEmptyString(state.cardTitle)) out.cardTitle = state.cardTitle;
    if (isNonEmptyString(state.cardDescription)) {
      out.cardDescription = state.cardDescription;
    }
    return out;
  }

  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(state.fields)) {
    if (isNonEmptyString(value)) fields[key] = value;
  }

  const v = state.view;
  const view: AdShareView = {};
  if (v.device !== undefined) view.device = v.device;
  if (v.mode !== undefined) view.mode = v.mode;
  if (v.safeZone !== undefined) view.safeZone = v.safeZone;
  if (isNonEmptyString(v.destinationUrl)) view.destinationUrl = v.destinationUrl;
  if (isNonEmptyString(v.cta)) view.cta = v.cta;
  if (isNonEmptyString(v.finalUrl)) view.finalUrl = v.finalUrl;
  if (v.paths) {
    const paths = v.paths.filter((p): p is string => isNonEmptyString(p));
    if (paths.length > 0) view.paths = paths;
  }

  return { kind: 'ad', platform: state.platform, fields, view };
}
