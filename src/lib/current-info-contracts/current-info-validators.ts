/**
 * Phase 16C — Current-Info Types, Enums, and Validators
 *
 * Pure validation helpers for current-information contracts.
 */

import type {
  CurrentInfoCandidateContract,
  CurrentInfoCitationContract,
  CurrentInfoQueryContract,
  CurrentInfoSafetyGateResult,
  CurrentInfoSourceContract,
  CurrentInfoValidationResult,
} from "./current-info-contracts";
import {
  CURRENT_INFO_APPROVED_HIGH_STAKES_RELIABILITY_LABELS,
  CURRENT_INFO_CANDIDATE_STATUSES,
  CURRENT_INFO_DESTINATION_SUGGESTIONS,
  CURRENT_INFO_FRESHNESS_LABELS,
  CURRENT_INFO_HIGH_STAKES_QUERY_KINDS,
  CURRENT_INFO_QUERY_KINDS,
  CURRENT_INFO_RELIABILITY_LABELS,
  CURRENT_INFO_SOURCE_KINDS,
  type CurrentInfoBlockedReason,
  type CurrentInfoQueryKind,
  type CurrentInfoReliabilityLabel,
} from "./current-info-enums";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isHttpUrl(value: string): boolean {
  return value.startsWith("https://") || value.startsWith("http://");
}

function uniqueReasons(
  reasons: CurrentInfoBlockedReason[],
): CurrentInfoBlockedReason[] {
  return Array.from (new Set(reasons));
}

export function isCurrentInfoQueryKind(
  value: unknown,
): value is CurrentInfoQueryKind {
  return CURRENT_INFO_QUERY_KINDS.includes(value as CurrentInfoQueryKind);
}

export function isCurrentInfoReliabilityLabel(
  value: unknown,
): value is CurrentInfoReliabilityLabel {
  return CURRENT_INFO_RELIABILITY_LABELS.includes(
    value as CurrentInfoReliabilityLabel,
  );
}

export function isHighStakesCurrentInfoQueryKind(
  value: unknown,
): value is (typeof CURRENT_INFO_HIGH_STAKES_QUERY_KINDS)[number] {
  return CURRENT_INFO_HIGH_STAKES_QUERY_KINDS.includes(
    value as (typeof CURRENT_INFO_HIGH_STAKES_QUERY_KINDS)[number],
  );
}

export function validateCurrentInfoCitation(
  citation: CurrentInfoCitationContract,
): CurrentInfoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isNonEmptyString(citation.title)) {
    errors.push("citation.title is required");
  }

  if (!isNonEmptyString(citation.url)) {
    errors.push("citation.url is required");
  } else if (!isHttpUrl(citation.url)) {
    errors.push("citation.url must start with http:// or https://");
  }

  if (!citation.retrieved_at) {
    warnings.push("citation.retrieved_at is recommended for freshness tracking");
  }

  if (!citation.publisher) {
    warnings.push("citation.publisher is recommended for reliability review");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateCurrentInfoQuery(
  query: CurrentInfoQueryContract,
): CurrentInfoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isNonEmptyString(query.query_text)) {
    errors.push("query_text is required");
  }

  if (!CURRENT_INFO_QUERY_KINDS.includes(query.query_kind)) {
    errors.push(`unsupported query_kind: ${query.query_kind}`);
  }

  if (query.private_mode && query.retain_query) {
    warnings.push("private mode should block query retention by default");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateCurrentInfoSource(
  source: CurrentInfoSourceContract,
): CurrentInfoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!CURRENT_INFO_SOURCE_KINDS.includes(source.source_kind)) {
    errors.push(`unsupported source_kind: ${source.source_kind}`);
  }

  if (!CURRENT_INFO_RELIABILITY_LABELS.includes(source.reliability_label)) {
    errors.push(`unsupported reliability_label: ${source.reliability_label}`);
  }

  if (!CURRENT_INFO_FRESHNESS_LABELS.includes(source.freshness_label)) {
    errors.push(`unsupported freshness_label: ${source.freshness_label}`);
  }

  const citationResult = validateCurrentInfoCitation(source.citation);
  errors.push(...citationResult.errors);
  warnings.push(...citationResult.warnings);

  if (source.reliability_label === "unknown") {
    warnings.push("unknown reliability requires user review before saving");
  }

  if (source.freshness_label === "possibly_stale") {
    warnings.push("possibly_stale source requires freshness review");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateCurrentInfoCandidate(
  candidate: CurrentInfoCandidateContract,
): CurrentInfoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!CURRENT_INFO_CANDIDATE_STATUSES.includes(candidate.status)) {
    errors.push(`unsupported candidate status: ${candidate.status}`);
  }

  if (
    candidate.suggested_destination &&
    !CURRENT_INFO_DESTINATION_SUGGESTIONS.includes(candidate.suggested_destination)
  ) {
    errors.push(
      `unsupported suggested destination: ${candidate.suggested_destination}`,
    );
  }

  const sourceResult = validateCurrentInfoSource(candidate.source);
  errors.push(...sourceResult.errors);
  warnings.push(...sourceResult.warnings);

  if (candidate.requires_user_review !== true) {
    errors.push("internet candidates must require user review");
  }

  if (candidate.can_autosave !== false) {
    errors.push("internet candidates must not autosave");
  }

  if (candidate.can_auto_memory_convert !== false) {
    errors.push("internet candidates must not automatically become memory");
  }

  if (candidate.status === "blocked" && candidate.blocked_reasons.length === 0) {
    warnings.push("blocked candidates should include blocked_reasons");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function evaluateCurrentInfoSafetyGate(
  query: CurrentInfoQueryContract,
  source?: CurrentInfoSourceContract,
): CurrentInfoSafetyGateResult {
  const blockedReasons: CurrentInfoBlockedReason[] = [];
  const warnings: string[] = [];

  if (!isNonEmptyString(query.query_text)) {
    blockedReasons.push("empty_query");
  }

  if (query.private_mode && query.retain_query) {
    blockedReasons.push("private_mode_blocks_query_retention");
  }

  const isHighStakes = isHighStakesCurrentInfoQueryKind(query.query_kind);
  const reliability = source?.reliability_label ?? "unknown";

  const requiresPrimaryOrOfficialSource = isHighStakes;

  if (
    isHighStakes &&
    !CURRENT_INFO_APPROVED_HIGH_STAKES_RELIABILITY_LABELS.includes(
      reliability as (typeof CURRENT_INFO_APPROVED_HIGH_STAKES_RELIABILITY_LABELS)[number],
    )
  ) {
    blockedReasons.push("weak_source_for_high_stakes_topic");
  }

  if (source && source.freshness_label === "possibly_stale") {
    warnings.push("source may be stale");
  }

  if (source && !isNonEmptyString(source.citation.url)) {
    blockedReasons.push("missing_citation");
  }

  return {
    allowed: blockedReasons.length === 0,
    blocked_reasons: uniqueReasons(blockedReasons),
    warnings,
    requires_primary_or_official_source: requiresPrimaryOrOfficialSource,
    requires_user_review: true,
  };
}

export function createCurrentInfoValidationSummary(
  query: CurrentInfoQueryContract,
  candidate?: CurrentInfoCandidateContract,
): CurrentInfoValidationResult {
  const queryResult = validateCurrentInfoQuery(query);
  const candidateResult = candidate
    ? validateCurrentInfoCandidate(candidate)
    : { valid: true, errors: [], warnings: [] };

  return {
    valid: queryResult.valid && candidateResult.valid,
    errors: [...queryResult.errors, ...candidateResult.errors],
    warnings: [...queryResult.warnings, ...candidateResult.warnings],
  };
}

export const PHASE_16C_CURRENT_INFO_VALIDATOR_BOUNDARY = {
  phase: "Phase 16C",
  title: "Current-Info Types, Enums, and Validators",
  validates: [
    "query kind",
    "citation",
    "source kind",
    "reliability label",
    "freshness label",
    "candidate review boundary",
    "high-stakes current-info gate",
  ],
  forbids: [
    "provider calls",
    "network calls",
    "Supabase calls",
    "SQL writes",
    "automatic saves",
    "automatic memory conversion",
    "embeddings",
  ],
} as const;
