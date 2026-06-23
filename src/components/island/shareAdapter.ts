import type { ShareKind, ShareState } from '../../lib/shareLink';

/**
 * The contract each interactive island implements to gain Share_Link support.
 *
 * `collect()` snapshots the island's current user-authored state into a pruned
 * {@link ShareState}; `apply()` initializes the island's state from a parsed
 * {@link ShareState}, taking only the fields valid for the current tool
 * (cross-tool isolation — Requirement 5.4). `kind` discriminates the two island
 * families; `id` is the tool/platform identity (informational).
 */
export interface ShareAdapter {
  /** Discriminator used to gate cross-family application. */
  readonly kind: ShareKind;
  /** Tool / platform id. */
  readonly id: string;
  /** Build a pruned ShareState snapshot of the current island state. */
  collect: () => ShareState;
  /** Apply a parsed ShareState into the island's state (only valid fields). */
  apply: (state: ShareState) => void;
}
