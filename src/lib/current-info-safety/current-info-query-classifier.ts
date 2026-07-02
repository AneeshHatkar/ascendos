import type {
  CurrentInfoQueryContract,
  CurrentInfoQueryKind,
} from "../current-info-contracts";

/**
 * Phase 16E — Query Classifier + Current-Info Safety Gate
 *
 * This classifier runs before provider evaluation.
 *
 * Boundary:
 * no network calls
 * no provider calls
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 */

export type CurrentInfoQueryClass =
  | "job_search"
  | "company_research"
  | "lab_or_professor_search"
  | "paper_or_literature_search"
  | "documentation_lookup"
  | "current_resource_lookup"
  | "high_stakes_current_info"
  | "unsupported_current_info";

export type CurrentInfoQueryRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "restricted";

export type CurrentInfoQueryClassificationReason =
  | "query_kind_maps_to_job_search"
  | "query_kind_maps_to_company_research"
  | "query_kind_maps_to_lab_or_professor_search"
  | "query_kind_maps_to_paper_or_literature_search"
  | "query_kind_maps_to_documentation_lookup"
  | "query_kind_maps_to_current_resource_lookup"
  | "query_kind_is_high_stakes"
  | "query_kind_is_not_supported"
  | "query_text_is_empty"
  | "query_requires_citations"
  | "query_requires_reliability_notes"
  | "query_requires_freshness_notes"
  | "query_requires_review_before_save";

export type CurrentInfoQueryClassification = {
  readonly query_kind: CurrentInfoQueryKind;
  readonly query_class: CurrentInfoQueryClass;
  readonly risk_level: CurrentInfoQueryRiskLevel;
  readonly is_supported: boolean;
  readonly is_high_stakes: boolean;
  readonly requires_citations: true;
  readonly requires_reliability_notes: true;
  readonly requires_freshness_notes: true;
  readonly requires_review_before_save: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly reasons: readonly CurrentInfoQueryClassificationReason[];
};

function normalizeQueryKind(queryKind: CurrentInfoQueryKind): string {
  return String(queryKind).toLowerCase();
}

function isHighStakesKind(queryKind: CurrentInfoQueryKind): boolean {
  const value = normalizeQueryKind(queryKind);

  return [
    "medical",
    "health",
    "legal",
    "financial",
    "finance",
    "investment",
    "tax",
    "immigration",
    "visa",
    "emergency",
    "safety",
    "crisis",
  ].some((marker) => value.includes(marker));
}

function classifyByKind(queryKind: CurrentInfoQueryKind): {
  readonly query_class: CurrentInfoQueryClass;
  readonly reason: CurrentInfoQueryClassificationReason;
  readonly risk_level: CurrentInfoQueryRiskLevel;
  readonly supported: boolean;
} {
  const value = normalizeQueryKind(queryKind);

  if (value.includes("job") || value.includes("hiring") || value.includes("career")) {
    return {
      query_class: "job_search",
      reason: "query_kind_maps_to_job_search",
      risk_level: "medium",
      supported: true,
    };
  }

  if (value.includes("company") || value.includes("employer") || value.includes("startup")) {
    return {
      query_class: "company_research",
      reason: "query_kind_maps_to_company_research",
      risk_level: "medium",
      supported: true,
    };
  }

  if (
    value.includes("lab") ||
    value.includes("professor") ||
    value.includes("university") ||
    value.includes("phd") ||
    value.includes("faculty")
  ) {
    return {
      query_class: "lab_or_professor_search",
      reason: "query_kind_maps_to_lab_or_professor_search",
      risk_level: "medium",
      supported: true,
    };
  }

  if (
    value.includes("paper") ||
    value.includes("literature") ||
    value.includes("citation") ||
    value.includes("research")
  ) {
    return {
      query_class: "paper_or_literature_search",
      reason: "query_kind_maps_to_paper_or_literature_search",
      risk_level: "medium",
      supported: true,
    };
  }

  if (
    value.includes("doc") ||
    value.includes("api") ||
    value.includes("library") ||
    value.includes("framework") ||
    value.includes("package")
  ) {
    return {
      query_class: "documentation_lookup",
      reason: "query_kind_maps_to_documentation_lookup",
      risk_level: "low",
      supported: true,
    };
  }

  if (
    value.includes("news") ||
    value.includes("current") ||
    value.includes("latest") ||
    value.includes("resource") ||
    value.includes("web")
  ) {
    return {
      query_class: "current_resource_lookup",
      reason: "query_kind_maps_to_current_resource_lookup",
      risk_level: "medium",
      supported: true,
    };
  }

  return {
    query_class: "unsupported_current_info",
    reason: "query_kind_is_not_supported",
    risk_level: "high",
    supported: false,
  };
}

export function classifyCurrentInfoQuery(
  query: CurrentInfoQueryContract,
): CurrentInfoQueryClassification {
  const queryText = query.query_text.trim();
  const reasons: CurrentInfoQueryClassificationReason[] = [
    "query_requires_citations",
    "query_requires_reliability_notes",
    "query_requires_freshness_notes",
    "query_requires_review_before_save",
  ];

  if (queryText.length === 0) {
    reasons.push("query_text_is_empty");
  }

  if (isHighStakesKind(query.query_kind)) {
    reasons.push("query_kind_is_high_stakes");

    return {
      query_kind: query.query_kind,
      query_class: "high_stakes_current_info",
      risk_level: "restricted",
      is_supported: queryText.length > 0,
      is_high_stakes: true,
      requires_citations: true,
      requires_reliability_notes: true,
      requires_freshness_notes: true,
      requires_review_before_save: true,
      can_autosave: false,
      can_auto_memory_convert: false,
      reasons: [...new Set(reasons)],
    };
  }

  const mapped = classifyByKind(query.query_kind);
  reasons.push(mapped.reason);

  return {
    query_kind: query.query_kind,
    query_class: mapped.query_class,
    risk_level: queryText.length === 0 ? "high" : mapped.risk_level,
    is_supported: mapped.supported && queryText.length > 0,
    is_high_stakes: false,
    requires_citations: true,
    requires_reliability_notes: true,
    requires_freshness_notes: true,
    requires_review_before_save: true,
    can_autosave: false,
    can_auto_memory_convert: false,
    reasons: [...new Set(reasons)],
  };
}
