/**
 * Phase 16C — Current-Info Types, Enums, and Validators
 *
 * Pure contract constants for the Web Search / Current Information foundation.
 *
 * Boundary:
 * - no provider calls
 * - no network calls
 * - no Supabase calls
 * - no persistence
 * - no automatic saves from internet results
 * - no automatic memory conversion
 * - no embeddings
 */

export const CURRENT_INFO_QUERY_KINDS = [
  "job_search",
  "company_research",
  "lab_search",
  "professor_search",
  "paper_search",
  "documentation_lookup",
  "health_current_info",
  "legal_current_info",
  "financial_current_info",
] as const;

export type CurrentInfoQueryKind = (typeof CURRENT_INFO_QUERY_KINDS)[number];

export const CURRENT_INFO_SOURCE_KINDS = [
  "job_posting",
  "company_page",
  "lab_page",
  "professor_page",
  "paper",
  "documentation",
  "unknown",
] as const;

export type CurrentInfoSourceKind = (typeof CURRENT_INFO_SOURCE_KINDS)[number];

export const CURRENT_INFO_RELIABILITY_LABELS = [
  "official",
  "primary_source",
  "academic",
  "reputable_secondary",
  "community",
  "unknown",
] as const;

export type CurrentInfoReliabilityLabel =
  (typeof CURRENT_INFO_RELIABILITY_LABELS)[number];

export const CURRENT_INFO_FRESHNESS_LABELS = [
  "live_or_recent",
  "possibly_stale",
  "unknown",
] as const;

export type CurrentInfoFreshnessLabel =
  (typeof CURRENT_INFO_FRESHNESS_LABELS)[number];

export const CURRENT_INFO_CANDIDATE_STATUSES = [
  "candidate",
  "ready_for_review",
  "blocked",
  "dismissed",
] as const;

export type CurrentInfoCandidateStatus =
  (typeof CURRENT_INFO_CANDIDATE_STATUSES)[number];

export const CURRENT_INFO_DESTINATION_SUGGESTIONS = [
  "save_web_source_to_knowledge_candidate",
  "create_job_application_from_web_source_candidate",
  "create_research_literature_item_from_web_source_candidate",
  "create_target_lab_from_web_source_candidate",
  "create_target_professor_from_web_source_candidate",
] as const;

export type CurrentInfoDestinationSuggestion =
  (typeof CURRENT_INFO_DESTINATION_SUGGESTIONS)[number];

export const CURRENT_INFO_AUDIT_EVENT_TYPES = [
  "web_search_performed",
  "web_source_candidate_created",
  "web_source_saved",
  "web_source_linked_to_record",
  "web_source_blocked_by_private_mode",
  "web_source_blocked_by_reliability",
] as const;

export type CurrentInfoAuditEventType =
  (typeof CURRENT_INFO_AUDIT_EVENT_TYPES)[number];

export const CURRENT_INFO_BLOCKED_REASONS = [
  "empty_query",
  "private_mode_blocks_query_retention",
  "sensitive_query_requires_extra_review",
  "weak_source_for_high_stakes_topic",
  "missing_citation",
  "stale_source",
  "unsupported_destination",
  "duplicate_hint_requires_review",
  "provider_boundary_not_active",
  "raw_full_page_storage_deferred",
] as const;

export type CurrentInfoBlockedReason =
  (typeof CURRENT_INFO_BLOCKED_REASONS)[number];

export const CURRENT_INFO_HIGH_STAKES_QUERY_KINDS = [
  "health_current_info",
  "legal_current_info",
  "financial_current_info",
] as const;

export type CurrentInfoHighStakesQueryKind =
  (typeof CURRENT_INFO_HIGH_STAKES_QUERY_KINDS)[number];

export const CURRENT_INFO_APPROVED_HIGH_STAKES_RELIABILITY_LABELS = [
  "official",
  "primary_source",
  "academic",
] as const;

export type CurrentInfoApprovedHighStakesReliabilityLabel =
  (typeof CURRENT_INFO_APPROVED_HIGH_STAKES_RELIABILITY_LABELS)[number];

export const PHASE_16C_CURRENT_INFO_ENUM_BOUNDARY = {
  phase: "Phase 16C",
  title: "Current-Info Types, Enums, and Validators",
  allows: [
    "current-info type contracts",
    "current-info enum constants",
    "current-info validation helpers",
    "citation shape validation",
    "reliability and freshness labels",
    "destination suggestion contracts",
  ],
  forbids: [
    "provider calls",
    "network calls",
    "Supabase calls",
    "SQL migrations",
    "automatic saves from internet results",
    "automatic memory conversion",
    "embeddings",
    "hidden Carnos current-info retrieval",
  ],
} as const;
