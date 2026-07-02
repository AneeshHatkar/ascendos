import type { CurrentInfoReviewQueueItem } from "./current-info-review-queue-item";

/**
 * Phase 16H — Current-Info Review Queue Contract
 *
 * Review decision contract for future current-info review flows.
 *
 * Boundary:
 * no provider execution
 * no external retrieval
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 * no proposed-action execution
 */

export type CurrentInfoReviewDecisionKind =
  | "approve_for_save"
  | "reject_current_info"
  | "request_more_sources"
  | "mark_high_stakes"
  | "defer_review";

export type CurrentInfoReviewDecisionReason =
  | "review_decision_created"
  | "approve_requires_later_save_flow"
  | "reject_keeps_sources_unsaved"
  | "request_more_sources_keeps_item_open"
  | "high_stakes_requires_manual_handling"
  | "defer_keeps_item_in_review"
  | "decision_does_not_execute_action"
  | "decision_does_not_persist_sources"
  | "decision_does_not_convert_memory";

export type CurrentInfoReviewDecisionInput = {
  readonly queue_item: CurrentInfoReviewQueueItem;
  readonly decision: CurrentInfoReviewDecisionKind;
  readonly reviewer_note?: string;
  readonly decided_at_iso?: string;
};

export type CurrentInfoReviewDecision = {
  readonly decision: CurrentInfoReviewDecisionKind;
  readonly queue_item_status_before_decision: CurrentInfoReviewQueueItem["status"];
  readonly reviewer_note: string | null;
  readonly decided_at_iso: string;
  readonly can_execute_action: false;
  readonly can_persist_sources: false;
  readonly can_auto_memory_convert: false;
  readonly requires_followup_flow: boolean;
  readonly reasons: readonly CurrentInfoReviewDecisionReason[];
};

function clean(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

export function createCurrentInfoReviewDecision(
  input: CurrentInfoReviewDecisionInput,
): CurrentInfoReviewDecision {
  const reasons: CurrentInfoReviewDecisionReason[] = [
    "review_decision_created",
    "decision_does_not_execute_action",
    "decision_does_not_persist_sources",
    "decision_does_not_convert_memory",
  ];

  let requiresFollowupFlow = true;

  switch (input.decision) {
    case "approve_for_save":
      reasons.push("approve_requires_later_save_flow");
      requiresFollowupFlow = true;
      break;

    case "reject_current_info":
      reasons.push("reject_keeps_sources_unsaved");
      requiresFollowupFlow = false;
      break;

    case "request_more_sources":
      reasons.push("request_more_sources_keeps_item_open");
      requiresFollowupFlow = true;
      break;

    case "mark_high_stakes":
      reasons.push("high_stakes_requires_manual_handling");
      requiresFollowupFlow = true;
      break;

    case "defer_review":
      reasons.push("defer_keeps_item_in_review");
      requiresFollowupFlow = true;
      break;
  }

  return {
    decision: input.decision,
    queue_item_status_before_decision: input.queue_item.status,
    reviewer_note: clean(input.reviewer_note),
    decided_at_iso: input.decided_at_iso ?? new Date(0).toISOString(),
    can_execute_action: false,
    can_persist_sources: false,
    can_auto_memory_convert: false,
    requires_followup_flow: requiresFollowupFlow,
    reasons: [...new Set(reasons)],
  };
}
