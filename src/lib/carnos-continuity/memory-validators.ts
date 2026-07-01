/**
 * Phase 15C — Memory validation helpers.
 *
 * These helpers validate local contract payload shape only.
 * They do not read, write, retrieve, embed, or call providers.
 */

import {
  MEMORY_AUDIT_EVENT_TYPES,
  MEMORY_CONFLICT_SEVERITIES,
  MEMORY_DOMAIN_SCOPES,
  MEMORY_SENSITIVITY_LEVELS,
  MEMORY_SOURCE_TYPES,
  MEMORY_STALENESS_STATES,
  MEMORY_STATUSES,
  MEMORY_TYPES,
  MEMORY_USAGE_VISIBILITY_LEVELS,
} from "./memory-enums";
import type {
  MemoryCandidateContract,
  MemoryReviewMetadata,
} from "./memory-contracts";
import type {
  MemoryAuditEventType,
  MemoryConflictSeverity,
  MemoryDomainScope,
  MemorySensitivityLevel,
  MemorySourceType,
  MemoryStalenessState,
  MemoryStatus,
  MemoryType,
  MemoryUsageVisibilityLevel,
} from "./memory-enums";

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

function includesValue<T extends readonly string[]>(
  values: T,
  input: unknown,
): input is T[number] {
  return typeof input === "string" && values.includes(input);
}

export function isMemoryType(input: unknown): input is MemoryType {
  return includesValue(MEMORY_TYPES, input);
}

export function isMemoryStatus(input: unknown): input is MemoryStatus {
  return includesValue(MEMORY_STATUSES, input);
}

export function isMemorySensitivityLevel(
  input: unknown,
): input is MemorySensitivityLevel {
  return includesValue(MEMORY_SENSITIVITY_LEVELS, input);
}

export function isMemorySourceType(input: unknown): input is MemorySourceType {
  return includesValue(MEMORY_SOURCE_TYPES, input);
}

export function isMemoryDomainScope(
  input: unknown,
): input is MemoryDomainScope {
  return includesValue(MEMORY_DOMAIN_SCOPES, input);
}

export function isMemoryAuditEventType(
  input: unknown,
): input is MemoryAuditEventType {
  return includesValue(MEMORY_AUDIT_EVENT_TYPES, input);
}

export function isMemoryConflictSeverity(
  input: unknown,
): input is MemoryConflictSeverity {
  return includesValue(MEMORY_CONFLICT_SEVERITIES, input);
}

export function isMemoryStalenessState(
  input: unknown,
): input is MemoryStalenessState {
  return includesValue(MEMORY_STALENESS_STATES, input);
}

export function isMemoryUsageVisibilityLevel(
  input: unknown,
): input is MemoryUsageVisibilityLevel {
  return includesValue(MEMORY_USAGE_VISIBILITY_LEVELS, input);
}

export function validateMemoryReviewMetadata(
  review: MemoryReviewMetadata,
): ValidationResult {
  const errors: string[] = [];

  if (review.confidence < 0 || review.confidence > 1) {
    errors.push("confidence must be between 0 and 1");
  }

  if (review.priority < 0 || review.priority > 100) {
    errors.push("priority must be between 0 and 100");
  }

  if (!isMemorySensitivityLevel(review.sensitivity)) {
    errors.push("sensitivity must be low, medium, high, or restricted");
  }

  if (!isMemoryStalenessState(review.staleness)) {
    errors.push("staleness must be fresh, aging, stale, or needs_reconfirmation");
  }

  if (!isMemoryConflictSeverity(review.conflict_severity)) {
    errors.push("conflict_severity is invalid");
  }

  if (!isMemoryUsageVisibilityLevel(review.visibility)) {
    errors.push("visibility is invalid");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function validateMemoryCandidateContract(
  candidate: MemoryCandidateContract,
): ValidationResult {
  const errors: string[] = [];

  if (candidate.kind !== "memory_candidate") {
    errors.push("kind must be memory_candidate");
  }

  if (!candidate.user_id) {
    errors.push("user_id is required");
  }

  if (!isMemoryType(candidate.memory_type)) {
    errors.push("memory_type is invalid");
  }

  if (
    ![
      "candidate",
      "pending_review",
      "blocked_by_private_mode",
      "blocked_by_do_not_remember",
    ].includes(candidate.status)
  ) {
    errors.push("candidate status is invalid");
  }

  if (!candidate.title.trim()) {
    errors.push("title is required");
  }

  if (!candidate.content.trim()) {
    errors.push("content is required");
  }

  if (!isMemoryDomainScope(candidate.domain_scope)) {
    errors.push("domain_scope is invalid");
  }

  if (!isMemorySourceType(candidate.provenance.source_type)) {
    errors.push("provenance.source_type is invalid");
  }

  const reviewResult = validateMemoryReviewMetadata(candidate.review);
  errors.push(...reviewResult.errors);

  if (
    candidate.private_mode_blocked &&
    candidate.status !== "blocked_by_private_mode"
  ) {
    errors.push("private_mode_blocked candidates must use blocked_by_private_mode");
  }

  if (
    candidate.do_not_remember_blocked &&
    candidate.status !== "blocked_by_do_not_remember"
  ) {
    errors.push(
      "do_not_remember_blocked candidates must use blocked_by_do_not_remember",
    );
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function assertNoSilentApproval(status: MemoryStatus): ValidationResult {
  if (status === "approved" || status === "edited") {
    return {
      ok: false,
      errors: [
        "Phase 15C contracts cannot silently approve memory; approval requires later explicit user review flow.",
      ],
    };
  }

  return {
    ok: true,
    errors: [],
  };
}
