import type {
  CurrentInfoDestinationRoute,
  CurrentInfoSourceCandidate,
} from "../current-info-capture";

/**
 * Phase 16H — Current-Info Review Queue Contract
 *
 * Review queue item contract for future current-info review flows.
 *
 * Boundary:
 * no provider execution
 * no external retrieval
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 * no proposed-action execution
 */

export type CurrentInfoReviewQueueStatus =
  | "queued_for_review"
  | "needs_more_evidence"
  | "ready_for_user_review"
  | "review_blocked"
  | "review_completed";

export type CurrentInfoReviewQueueReason =
  | "review_queue_item_created"
  | "destination_route_attached"
  | "source_candidates_attached"
  | "no_source_candidates"
  | "insufficient_captured_sources"
  | "manual_review_required"
  | "autosave_disabled"
  | "source_persistence_disabled"
  | "automatic_memory_conversion_disabled"
  | "proposed_action_execution_disabled";

export type CurrentInfoReviewQueueItemInput = {
  readonly query_text: string;
  readonly destination_route: CurrentInfoDestinationRoute;
  readonly source_candidates: readonly CurrentInfoSourceCandidate[];
  readonly evidence_summary?: string;
  readonly created_at_iso?: string;
};

export type CurrentInfoReviewQueueItem = {
  readonly status: CurrentInfoReviewQueueStatus;
  readonly query_text: string;
  readonly destination_route: CurrentInfoDestinationRoute;
  readonly source_candidates: readonly CurrentInfoSourceCandidate[];
  readonly evidence_summary: string | null;
  readonly created_at_iso: string;
  readonly is_persisted: false;
  readonly requires_user_review: true;
  readonly can_autosave: false;
  readonly can_persist_sources: false;
  readonly can_auto_memory_convert: false;
  readonly can_execute_action: false;
  readonly reasons: readonly CurrentInfoReviewQueueReason[];
};

function clean(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

function countCapturedSources(
  sourceCandidates: readonly CurrentInfoSourceCandidate[],
): number {
  return sourceCandidates.filter(
    (candidate) => candidate.status === "candidate_captured",
  ).length;
}

export function createCurrentInfoReviewQueueItem(
  input: CurrentInfoReviewQueueItemInput,
): CurrentInfoReviewQueueItem {
  const sourceCandidateCount = input.source_candidates.length;
  const capturedSourceCount = countCapturedSources(input.source_candidates);
  const reasons: CurrentInfoReviewQueueReason[] = [
    "review_queue_item_created",
    "destination_route_attached",
    "manual_review_required",
    "autosave_disabled",
    "source_persistence_disabled",
    "automatic_memory_conversion_disabled",
    "proposed_action_execution_disabled",
  ];

  if (sourceCandidateCount === 0) {
    reasons.push("no_source_candidates");
  } else {
    reasons.push("source_candidates_attached");
  }

  if (capturedSourceCount === 0) {
    reasons.push("insufficient_captured_sources");
  }

  const status: CurrentInfoReviewQueueStatus =
    sourceCandidateCount === 0 || capturedSourceCount === 0
      ? "needs_more_evidence"
      : "ready_for_user_review";

  return {
    status,
    query_text: input.query_text.trim(),
    destination_route: input.destination_route,
    source_candidates: input.source_candidates,
    evidence_summary: clean(input.evidence_summary),
    created_at_iso: input.created_at_iso ?? new Date(0).toISOString(),
    is_persisted: false,
    requires_user_review: true,
    can_autosave: false,
    can_persist_sources: false,
    can_auto_memory_convert: false,
    can_execute_action: false,
    reasons: [...new Set(reasons)],
  };
}

export function blockCurrentInfoReviewQueueItem(
  item: CurrentInfoReviewQueueItem,
  reason: CurrentInfoReviewQueueReason,
): CurrentInfoReviewQueueItem {
  return {
    ...item,
    status: "review_blocked",
    requires_user_review: true,
    can_autosave: false,
    can_persist_sources: false,
    can_auto_memory_convert: false,
    can_execute_action: false,
    reasons: [...new Set([...item.reasons, reason])],
  };
}
