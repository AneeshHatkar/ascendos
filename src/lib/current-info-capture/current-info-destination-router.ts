import type { CurrentInfoQueryClassification } from "../current-info-safety";

/**
 * Phase 16G — Source Candidate Capture + Destination Router
 *
 * Destination router for future current-info review flows.
 *
 * Boundary:
 * no provider execution
 * no external retrieval
 * no SQL reads or writes
 * no automatic save
 * no proposed-action execution
 */

export type CurrentInfoDestinationRoute =
  | "job_search_review"
  | "company_research_review"
  | "professor_lab_review"
  | "research_paper_review"
  | "documentation_review"
  | "current_resource_review"
  | "manual_review";

export type CurrentInfoDestinationRouterReason =
  | "routed_from_job_search"
  | "routed_from_company_research"
  | "routed_from_lab_or_professor_search"
  | "routed_from_paper_or_literature_search"
  | "routed_from_documentation_lookup"
  | "routed_from_current_resource_lookup"
  | "routed_to_manual_review"
  | "high_stakes_requires_manual_review"
  | "unsupported_requires_manual_review"
  | "requested_destination_used"
  | "autosave_disabled"
  | "automatic_memory_conversion_disabled";

export type CurrentInfoDestinationRouterInput = {
  readonly classification: CurrentInfoQueryClassification;
  readonly requested_destination?: CurrentInfoDestinationRoute;
};

export type CurrentInfoDestinationRouterResult = {
  readonly route: CurrentInfoDestinationRoute;
  readonly requested_destination: CurrentInfoDestinationRoute | null;
  readonly route_is_suggestion_only: true;
  readonly requires_user_review: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly can_execute_action: false;
  readonly reasons: readonly CurrentInfoDestinationRouterReason[];
};

export function routeCurrentInfoDestination(
  input: CurrentInfoDestinationRouterInput,
): CurrentInfoDestinationRouterResult {
  const reasons: CurrentInfoDestinationRouterReason[] = [
    "autosave_disabled",
    "automatic_memory_conversion_disabled",
  ];

  if (input.requested_destination) {
    reasons.push("requested_destination_used");

    return {
      route: input.requested_destination,
      requested_destination: input.requested_destination,
      route_is_suggestion_only: true,
      requires_user_review: true,
      can_autosave: false,
      can_auto_memory_convert: false,
      can_execute_action: false,
      reasons: [...new Set(reasons)],
    };
  }

  if (input.classification.is_high_stakes) {
    reasons.push("high_stakes_requires_manual_review");

    return {
      route: "manual_review",
      requested_destination: null,
      route_is_suggestion_only: true,
      requires_user_review: true,
      can_autosave: false,
      can_auto_memory_convert: false,
      can_execute_action: false,
      reasons: [...new Set(reasons)],
    };
  }

  if (!input.classification.is_supported) {
    reasons.push("unsupported_requires_manual_review");

    return {
      route: "manual_review",
      requested_destination: null,
      route_is_suggestion_only: true,
      requires_user_review: true,
      can_autosave: false,
      can_auto_memory_convert: false,
      can_execute_action: false,
      reasons: [...new Set(reasons)],
    };
  }

  switch (input.classification.query_class) {
    case "job_search":
      reasons.push("routed_from_job_search");
      return {
        route: "job_search_review",
        requested_destination: null,
        route_is_suggestion_only: true,
        requires_user_review: true,
        can_autosave: false,
        can_auto_memory_convert: false,
        can_execute_action: false,
        reasons: [...new Set(reasons)],
      };

    case "company_research":
      reasons.push("routed_from_company_research");
      return {
        route: "company_research_review",
        requested_destination: null,
        route_is_suggestion_only: true,
        requires_user_review: true,
        can_autosave: false,
        can_auto_memory_convert: false,
        can_execute_action: false,
        reasons: [...new Set(reasons)],
      };

    case "lab_or_professor_search":
      reasons.push("routed_from_lab_or_professor_search");
      return {
        route: "professor_lab_review",
        requested_destination: null,
        route_is_suggestion_only: true,
        requires_user_review: true,
        can_autosave: false,
        can_auto_memory_convert: false,
        can_execute_action: false,
        reasons: [...new Set(reasons)],
      };

    case "paper_or_literature_search":
      reasons.push("routed_from_paper_or_literature_search");
      return {
        route: "research_paper_review",
        requested_destination: null,
        route_is_suggestion_only: true,
        requires_user_review: true,
        can_autosave: false,
        can_auto_memory_convert: false,
        can_execute_action: false,
        reasons: [...new Set(reasons)],
      };

    case "documentation_lookup":
      reasons.push("routed_from_documentation_lookup");
      return {
        route: "documentation_review",
        requested_destination: null,
        route_is_suggestion_only: true,
        requires_user_review: true,
        can_autosave: false,
        can_auto_memory_convert: false,
        can_execute_action: false,
        reasons: [...new Set(reasons)],
      };

    case "current_resource_lookup":
      reasons.push("routed_from_current_resource_lookup");
      return {
        route: "current_resource_review",
        requested_destination: null,
        route_is_suggestion_only: true,
        requires_user_review: true,
        can_autosave: false,
        can_auto_memory_convert: false,
        can_execute_action: false,
        reasons: [...new Set(reasons)],
      };

    default:
      reasons.push("routed_to_manual_review");
      return {
        route: "manual_review",
        requested_destination: null,
        route_is_suggestion_only: true,
        requires_user_review: true,
        can_autosave: false,
        can_auto_memory_convert: false,
        can_execute_action: false,
        reasons: [...new Set(reasons)],
      };
  }
}
