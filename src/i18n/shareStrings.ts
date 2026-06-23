// ──────────────────────────────────────────────────────────────────────────
// Resolver for the Share_Link feature strings.
//
// Like `linkCard`, the `share` sub-object is REQUIRED on IslandStrings
// (declared in types.ts), so a missing key in any locale is a TypeScript error
// (Requirement 10.2) and the strict i18n parity lint only passes when all ten
// locales carry the exact key paths (Requirement 10.3). `en.ts` is the
// canonical source — `SHARE_STRINGS` reads straight from it so there is a
// single English source of truth (no duplicated literals to drift).
//
// Because `share` is required and typed, the runtime value is normally present;
// the resolver still guards partial/absent values by falling back to the
// canonical English block per key (Requirement 10.4). Mirrors how
// `linkCardStrings` consumes its English-first defaults.
// ──────────────────────────────────────────────────────────────────────────

import { en } from './en';
import type { IslandStrings, ShareStrings } from './types';

/** Canonical English share strings (single source of truth: en.ts). */
export const SHARE_STRINGS: ShareStrings = en.island.share;

/**
 * Resolve the share strings for an island: prefer the locale's own `share`
 * values and fall back to the canonical English block for any partial or
 * absent value (Requirement 10.4).
 */
export function shareStrings(s: IslandStrings): ShareStrings {
  const v = s.share;
  if (!v) return SHARE_STRINGS;
  return {
    button: v.button || SHARE_STRINGS.button,
    success: v.success || SHARE_STRINGS.success,
    error: v.error || SHARE_STRINGS.error,
    tooLarge: v.tooLarge || SHARE_STRINGS.tooLarge,
    manualLabel: v.manualLabel || SHARE_STRINGS.manualLabel,
  };
}
