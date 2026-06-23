/**
 * Pure URL string helpers for the Share_Link feature — no `window`, no DOM, so
 * they are unit-testable in isolation.
 *
 * The Share_Token lives in `location.hash` (the Share_Fragment), never the query
 * string, so it is never transmitted to or logged by the server — the
 * cornerstone of the zero-database guarantee.
 */

/** Fragment key the token is stored under: `location.hash === "#s=<token>"`. */
export const SHARE_HASH_KEY = 's';

/** The shareable URL length budget (Requirement 9.2). */
export const MAX_SHARE_URL_LENGTH = 8000;

/**
 * Extract the Share_Token from a raw hash string (e.g. `"#s=abc"`), or `null`
 * when the hash is absent, empty, carries no `s` key, or has an empty value.
 *
 * The token uses the `lz-string` URL-safe alphabet (`A–Z a–z 0–9 + - $`), which
 * contains neither `&` nor `=`, so splitting on those delimiters is safe.
 */
export function readShareTokenFromHash(hash: string | null | undefined): string | null {
  if (!hash) return null;
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!raw) return null;

  for (const part of raw.split('&')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq) === SHARE_HASH_KEY) {
      const value = part.slice(eq + 1);
      return value === '' ? null : value;
    }
  }
  return null;
}

/**
 * Build an absolute share URL: keep the base URL's origin, path, and query, drop
 * any existing fragment, and append the Share_Token in the Share_Fragment.
 *
 * @param baseUrl Absolute URL of the target page (origin + locale path).
 * @param token   Share_Token to embed in the fragment.
 */
export function buildShareUrl(baseUrl: string, token: string): string {
  const hashIndex = baseUrl.indexOf('#');
  const base = hashIndex === -1 ? baseUrl : baseUrl.slice(0, hashIndex);
  return `${base}#${SHARE_HASH_KEY}=${token}`;
}

/** True when the URL exceeds the shareable length budget (Requirement 9.2). */
export function isShareUrlTooLong(url: string): boolean {
  return url.length > MAX_SHARE_URL_LENGTH;
}
