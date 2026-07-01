/**
 * Phase 15C — Memory conflict, authority, sensitivity, and staleness rules.
 *
 * Rule definitions only.
 * No retrieval, no persistence, no embeddings, no Carnos prompt injection.
 */

import {
  BLOCKED_MEMORY_STATUSES,
  CARNOS_ENTITY_MEMORY_TYPES,
  MEMORY_SOURCE_AUTHORITY_ORDER,
  PROJECT_CONTINUITY_MEMORY_TYPES,
  RETRIEVABLE_MEMORY_STATUSES,
  SENSITIVE_MEMORY_TYPES,
} from "./memory-enums";
import type {
  MemorySensitivityLevel,
  MemorySourceAuthority,
  MemoryStatus,
  MemoryType,
} from "./memory-enums";

export interface MemoryConflictInput {
  memory_type: MemoryType;
  status: MemoryStatus;
  sensitivity: MemorySensitivityLevel;
  source_type: MemorySourceAuthority;
  confidence: number;
  priority: number;
  last_confirmed_at?: string;
  created_at?: string;
}

export interface MemoryConflictDecision {
  winner: "left" | "right" | "needs_review" | "blocked";
  reason: string;
  requires_user_review: boolean;
}

export function getSourceAuthorityRank(sourceType: MemorySourceAuthority): number {
  const rank = MEMORY_SOURCE_AUTHORITY_ORDER.indexOf(sourceType);
  return rank === -1 ? Number.MAX_SAFE_INTEGER : rank;
}

export function isRetrievableMemoryStatus(status: MemoryStatus): boolean {
  return RETRIEVABLE_MEMORY_STATUSES.includes(status);
}

export function isBlockedMemoryStatus(status: MemoryStatus): boolean {
  return BLOCKED_MEMORY_STATUSES.includes(status);
}

export function isSensitiveMemoryType(memoryType: MemoryType): boolean {
  return SENSITIVE_MEMORY_TYPES.includes(memoryType);
}

export function isProjectContinuityMemoryType(memoryType: MemoryType): boolean {
  return PROJECT_CONTINUITY_MEMORY_TYPES.includes(memoryType);
}

export function isCarnosEntityMemoryType(memoryType: MemoryType): boolean {
  return CARNOS_ENTITY_MEMORY_TYPES.includes(memoryType);
}

export function compareMemoryAuthority(
  left: MemoryConflictInput,
  right: MemoryConflictInput,
): MemoryConflictDecision {
  if (isBlockedMemoryStatus(left.status) && isBlockedMemoryStatus(right.status)) {
    return {
      winner: "blocked",
      reason: "Both memories are blocked and must not be retrieved.",
      requires_user_review: false,
    };
  }

  if (isBlockedMemoryStatus(left.status)) {
    return {
      winner: "right",
      reason: "Left memory is blocked by status.",
      requires_user_review: false,
    };
  }

  if (isBlockedMemoryStatus(right.status)) {
    return {
      winner: "left",
      reason: "Right memory is blocked by status.",
      requires_user_review: false,
    };
  }

  const leftRank = getSourceAuthorityRank(left.source_type);
  const rightRank = getSourceAuthorityRank(right.source_type);

  if (leftRank < rightRank) {
    return {
      winner: "left",
      reason: "Left memory has higher source-of-truth authority.",
      requires_user_review: false,
    };
  }

  if (rightRank < leftRank) {
    return {
      winner: "right",
      reason: "Right memory has higher source-of-truth authority.",
      requires_user_review: false,
    };
  }

  if (left.confidence > right.confidence) {
    return {
      winner: "left",
      reason: "Source authority is equal; left memory has higher confidence.",
      requires_user_review: false,
    };
  }

  if (right.confidence > left.confidence) {
    return {
      winner: "right",
      reason: "Source authority is equal; right memory has higher confidence.",
      requires_user_review: false,
    };
  }

  if (left.priority > right.priority) {
    return {
      winner: "left",
      reason: "Source authority and confidence are equal; left has higher priority.",
      requires_user_review: true,
    };
  }

  if (right.priority > left.priority) {
    return {
      winner: "right",
      reason: "Source authority and confidence are equal; right has higher priority.",
      requires_user_review: true,
    };
  }

  return {
    winner: "needs_review",
    reason:
      "Memory conflict cannot be safely resolved by authority, confidence, or priority.",
    requires_user_review: true,
  };
}

export function getMemorySensitivityRule(
  memoryType: MemoryType,
  sensitivity: MemorySensitivityLevel,
): string {
  if (sensitivity === "restricted") {
    return "Restricted memory may not be casually injected into Carnos context and requires explicit relevance plus user-controlled visibility.";
  }

  if (sensitivity === "high") {
    return "High-sensitivity memory requires clear relevance, source visibility, and privacy-safe handling.";
  }

  if (isSensitiveMemoryType(memoryType)) {
    return "This memory type is sensitive by default and should be reviewed before use.";
  }

  return "Standard memory handling applies.";
}

export function getStalenessRule(memoryType: MemoryType): string {
  if (
    memoryType === "goal" ||
    memoryType === "routine" ||
    memoryType === "career_context" ||
    memoryType === "health_context" ||
    memoryType === "project_fact"
  ) {
    return "This memory type can become stale and should support review_after and last_confirmed_at.";
  }

  if (
    memoryType === "source_of_truth_note" ||
    memoryType === "project_decision" ||
    memoryType === "carnos_entity_state"
  ) {
    return "This memory type remains strong until superseded by a higher-authority source.";
  }

  return "Use standard staleness review rules.";
}

export const PHASE_15C_CONFLICT_RULE_SUMMARY = [
  "Higher source-of-truth beats lower source when conflicts exist.",
  "Approved or edited memories beat candidate memories.",
  "Forgotten, rejected, archived, private-mode-blocked, and do-not-remember-blocked memories are never retrievable.",
  "Restricted memories require explicit relevance and user-visible usage transparency.",
  "Stale memories must be surfaced with caution or sent to review.",
  "Equal-authority conflicts require user review instead of silent resolution.",
  "Knowledge vault records are not personal memory unless explicitly converted through review.",
] as const;
