import type { CurrentInfoQueryContract } from "../current-info-contracts";
import { isHighStakesCurrentInfoQueryKind } from "../current-info-contracts";
import type {
  CurrentInfoProviderBlockedReason,
  CurrentInfoProviderRequest,
  CurrentInfoProviderResult,
} from "./current-info-provider-types";
import { PHASE_16D_CURRENT_INFO_PROVIDER_BOUNDARY } from "./current-info-provider-types";

/**
 * Phase 16D provider boundary.
 *
 * This file decides whether a current-info provider may run.
 * In this step, the answer remains blocked by design.
 */

export type CurrentInfoProviderBoundaryInput = {
  readonly query: CurrentInfoQueryContract;
  readonly private_mode_active?: boolean;
  readonly retain_query?: boolean;
  readonly requested_at_iso?: string;
};

export function createCurrentInfoProviderRequest(
  input: CurrentInfoProviderBoundaryInput,
): CurrentInfoProviderRequest {
  return {
    query: input.query,
    requested_at_iso: input.requested_at_iso ?? new Date(0).toISOString(),
    provider_kind: "noop",
    retain_query: input.retain_query ?? false,
    private_mode_active: input.private_mode_active ?? false,
    allow_network_provider: false,
    allow_browser_side_secret: false,
    allow_background_browsing: false,
  };
}

export function getCurrentInfoProviderBlockedReasons(
  request: CurrentInfoProviderRequest,
): CurrentInfoProviderBlockedReason[] {
  const blockedReasons: CurrentInfoProviderBlockedReason[] = [
    "provider_boundary_not_active",
  ];

  if (request.private_mode_active || !request.retain_query) {
    blockedReasons.push("private_mode_blocks_query_retention");
  }

  if (isHighStakesCurrentInfoQueryKind(request.query.query_kind)) {
    blockedReasons.push("high_stakes_topic_requires_extra_review");
  }

  return [...new Set(blockedReasons)];
}

export function createBlockedCurrentInfoProviderResult(
  request: CurrentInfoProviderRequest,
): CurrentInfoProviderResult {
  const blockedReasons = getCurrentInfoProviderBlockedReasons(request);

  return {
    provider_kind: "noop",
    status: "blocked_by_boundary",
    query: request.query,
    sources: [],
    blocked_reasons: blockedReasons,
    provider_notes: [
      "Search provider boundary is contract-only in this step.",
      "No real current-info provider is activated.",
      "No network call, browser secret, background browsing, source persistence, or automatic memory conversion is allowed.",
    ],
    boundary: PHASE_16D_CURRENT_INFO_PROVIDER_BOUNDARY,
  };
}

export function evaluateCurrentInfoProviderBoundary(
  input: CurrentInfoProviderBoundaryInput,
): CurrentInfoProviderResult {
  const request = createCurrentInfoProviderRequest(input);
  return createBlockedCurrentInfoProviderResult(request);
}
