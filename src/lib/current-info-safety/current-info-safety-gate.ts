import type { CurrentInfoQueryContract } from "../current-info-contracts";
import { evaluateCurrentInfoProviderBoundary } from "../current-info-provider";
import type {
  CurrentInfoQueryClassification,
  CurrentInfoQueryClassificationReason,
} from "./current-info-query-classifier";
import { classifyCurrentInfoQuery } from "./current-info-query-classifier";

/**
 * Phase 16E — Current-Info Safety Gate
 *
 * This gate runs before any current-info provider can be considered.
 *
 * Boundary:
 * no network calls
 * no provider execution
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 */

export type CurrentInfoSafetyGateDecision =
  | "allowed_for_noop_provider"
  | "blocked_by_private_mode"
  | "requires_high_stakes_review"
  | "blocked_as_unsupported"
  | "blocked_by_provider_boundary";

export type CurrentInfoSafetyGateReason =
  | CurrentInfoQueryClassificationReason
  | "private_mode_blocks_query_retention"
  | "high_stakes_requires_manual_review"
  | "unsupported_query_kind"
  | "provider_boundary_blocks_runtime_search"
  | "no_autosave_allowed"
  | "no_auto_memory_conversion_allowed"
  | "manual_review_required";

export type CurrentInfoSafetyGateInput = {
  readonly query: CurrentInfoQueryContract;
  readonly private_mode_active?: boolean;
  readonly retain_query?: boolean;
  readonly requested_at_iso?: string;
};

export type CurrentInfoSafetyGateResult = {
  readonly decision: CurrentInfoSafetyGateDecision;
  readonly classification: CurrentInfoQueryClassification;
  readonly can_call_real_provider: false;
  readonly can_call_noop_provider: boolean;
  readonly can_retain_query: boolean;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly requires_user_review: true;
  readonly requires_citations: true;
  readonly requires_reliability_notes: true;
  readonly requires_freshness_notes: true;
  readonly reasons: readonly CurrentInfoSafetyGateReason[];
};

export function evaluateCurrentInfoSafetyGate(
  input: CurrentInfoSafetyGateInput,
): CurrentInfoSafetyGateResult {
  const classification = classifyCurrentInfoQuery(input.query);
  const retainQuery = input.retain_query === true;
  const reasons: CurrentInfoSafetyGateReason[] = [
    ...classification.reasons,
    "manual_review_required",
    "no_autosave_allowed",
    "no_auto_memory_conversion_allowed",
  ];

  const privateModeBlocksRetention =
    input.private_mode_active === true && retainQuery !== true;

  if (privateModeBlocksRetention) {
    reasons.push("private_mode_blocks_query_retention");

    return {
      decision: "blocked_by_private_mode",
      classification,
      can_call_real_provider: false,
      can_call_noop_provider: false,
      can_retain_query: false,
      can_autosave: false,
      can_auto_memory_convert: false,
      requires_user_review: true,
      requires_citations: true,
      requires_reliability_notes: true,
      requires_freshness_notes: true,
      reasons: [...new Set(reasons)],
    };
  }

  if (!classification.is_supported) {
    reasons.push("unsupported_query_kind");

    return {
      decision: "blocked_as_unsupported",
      classification,
      can_call_real_provider: false,
      can_call_noop_provider: false,
      can_retain_query: retainQuery,
      can_autosave: false,
      can_auto_memory_convert: false,
      requires_user_review: true,
      requires_citations: true,
      requires_reliability_notes: true,
      requires_freshness_notes: true,
      reasons: [...new Set(reasons)],
    };
  }

  if (classification.is_high_stakes) {
    reasons.push("high_stakes_requires_manual_review");

    return {
      decision: "requires_high_stakes_review",
      classification,
      can_call_real_provider: false,
      can_call_noop_provider: false,
      can_retain_query: retainQuery,
      can_autosave: false,
      can_auto_memory_convert: false,
      requires_user_review: true,
      requires_citations: true,
      requires_reliability_notes: true,
      requires_freshness_notes: true,
      reasons: [...new Set(reasons)],
    };
  }

  const providerBoundary = evaluateCurrentInfoProviderBoundary({
    query: input.query,
    private_mode_active: input.private_mode_active,
    retain_query: input.retain_query,
    requested_at_iso: input.requested_at_iso,
  });

  if (providerBoundary.status === "blocked_by_boundary") {
    reasons.push("provider_boundary_blocks_runtime_search");

    return {
      decision: "allowed_for_noop_provider",
      classification,
      can_call_real_provider: false,
      can_call_noop_provider: true,
      can_retain_query: retainQuery,
      can_autosave: false,
      can_auto_memory_convert: false,
      requires_user_review: true,
      requires_citations: true,
      requires_reliability_notes: true,
      requires_freshness_notes: true,
      reasons: [...new Set(reasons)],
    };
  }

  reasons.push("provider_boundary_blocks_runtime_search");

  return {
    decision: "blocked_by_provider_boundary",
    classification,
    can_call_real_provider: false,
    can_call_noop_provider: false,
    can_retain_query: retainQuery,
    can_autosave: false,
    can_auto_memory_convert: false,
    requires_user_review: true,
    requires_citations: true,
    requires_reliability_notes: true,
    requires_freshness_notes: true,
    reasons: [...new Set(reasons)],
  };
}
