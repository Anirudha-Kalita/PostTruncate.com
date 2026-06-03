// ──────────────────────────────────────────────────────────────────────────
// Tiny token-interpolation helper. Translatable strings hold {named} tokens
// (e.g. "{n} hidden chars", "{value} / {limit}"); this fills them in.
//
// Deliberately dependency-free so it's safe to import into the Preact islands
// (no Astro/server-only code reaches the client bundle).
// ──────────────────────────────────────────────────────────────────────────

export type InterpParams = Record<string, string | number>;

/**
 * Replace every {key} in `template` with params[key]. Unknown tokens are left
 * untouched so a missing param is visible in the UI rather than silently empty.
 *
 *   t('{n} / {limit}', { n: 12, limit: 280 }) → "12 / 280"
 */
export function interp(template: string, params: InterpParams = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in params ? String(params[key]) : match
  );
}

/**
 * Pick the singular/plural form for a count. Binary one/other selection, which
 * matches our dictionary shape and reads correctly across the supported
 * locales (the CJK locales fill both fields identically).
 */
export interface Plural {
  one: string;
  other: string;
}

export function plural(forms: Plural, n: number): string {
  return n === 1 ? forms.one : forms.other;
}
