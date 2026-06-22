// ──────────────────────────────────────────────────────────────────────────
// Resolver for the Rich_Link_Card + Card_Field_Editor strings.
//
// Unlike `linkDisplay`, the `linkCard` sub-object is REQUIRED on IslandStrings
// (declared in types.ts), so a missing key in any locale is a TypeScript error
// (Requirement 15.2) and the strict i18n parity lint only passes when all ten
// locales carry the exact key paths. `en.ts` is the canonical source
// (Requirement 15.3) — `LINK_CARD_STRINGS` reads straight from it so there is a
// single English source of truth (no duplicated literals to drift).
//
// Because `linkCard` is required and typed, the runtime value is normally
// present; the resolver still guards partial/absent values by falling back to
// the canonical English block per key (Requirement 15.4).
//
// "{title}" / "{domain}" tokens are filled by interp() at the call site.
// ──────────────────────────────────────────────────────────────────────────

import { en } from './en';
import type { IslandStrings, LinkCardStrings } from './types';

/** Canonical English link-card strings (single source of truth: en.ts). */
export const LINK_CARD_STRINGS: LinkCardStrings = en.island.linkCard;

/**
 * Resolve the link-card strings for an island: prefer the locale's own
 * `linkCard` values and fall back to the canonical English block for any
 * partial or absent value (Requirement 15.4). Mirrors how `linkDisplayStrings`
 * consumes its English-first defaults.
 */
export function linkCardStrings(s: IslandStrings): LinkCardStrings {
  const v = s.linkCard;
  if (!v) return LINK_CARD_STRINGS;
  return {
    editorHeading: v.editorHeading || LINK_CARD_STRINGS.editorHeading,
    titleLabel: v.titleLabel || LINK_CARD_STRINGS.titleLabel,
    descriptionLabel: v.descriptionLabel || LINK_CARD_STRINGS.descriptionLabel,
    titlePlaceholder: v.titlePlaceholder || LINK_CARD_STRINGS.titlePlaceholder,
    descriptionPlaceholder:
      v.descriptionPlaceholder || LINK_CARD_STRINGS.descriptionPlaceholder,
    cardAria: v.cardAria || LINK_CARD_STRINGS.cardAria,
    imageAlt: v.imageAlt || LINK_CARD_STRINGS.imageAlt,
    firstUrlNote: v.firstUrlNote || LINK_CARD_STRINGS.firstUrlNote,
    imageAdd: v.imageAdd || LINK_CARD_STRINGS.imageAdd,
    imageReplace: v.imageReplace || LINK_CARD_STRINGS.imageReplace,
    imageRemove: v.imageRemove || LINK_CARD_STRINGS.imageRemove,
  };
}
