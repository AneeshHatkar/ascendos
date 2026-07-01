/**
 * Phase 15C — Carnos Persistent Memory + Continuity Foundation
 *
 * Memory enums only.
 * This file defines controlled vocabularies for user-controlled memory,
 * Carnos entity state, project/system continuity, knowledge vault records,
 * privacy rules, sensitivity levels, status transitions, audit events,
 * source authority, and conflict handling.
 *
 * Boundary:
 * - No Supabase calls.
 * - No SQL writes.
 * - No retrieval.
 * - No embeddings.
 * - No provider calls.
 * - No Carnos prompt injection.
 */

export const MEMORY_TYPES = [
  "preference",
  "goal",
  "project_fact",
  "project_decision",
  "routine",
  "system_state",
  "carnos_entity_state",
  "source_of_truth_note",
  "conversation_continuity",
  "user_profile_fact",
  "sensitive_note",
  "knowledge_item",
  "voice_transcript_candidate",
  "research_note",
  "career_context",
  "health_context",
  "grimoire_context",
  "privacy_rule",
  "do_not_remember_rule",
] as const;

export type MemoryType = (typeof MEMORY_TYPES)[number];

export const MEMORY_STATUSES = [
  "candidate",
  "pending_review",
  "approved",
  "edited",
  "rejected",
  "archived",
  "forgotten",
  "stale",
  "needs_review",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
] as const;

export type MemoryStatus = (typeof MEMORY_STATUSES)[number];

export const MEMORY_SENSITIVITY_LEVELS = [
  "low",
  "medium",
  "high",
  "restricted",
] as const;

export type MemorySensitivityLevel =
  (typeof MEMORY_SENSITIVITY_LEVELS)[number];

export const MEMORY_SOURCE_TYPES = [
  "manual_remember",
  "manual_do_not_remember",
  "chat_message",
  "voice_transcript_draft",
  "source_of_truth",
  "repo_log",
  "phase_report",
  "audit_report",
  "project_state",
  "system_state",
  "domain_record",
  "knowledge_document",
] as const;

export type MemorySourceType = (typeof MEMORY_SOURCE_TYPES)[number];

export const MEMORY_DOMAIN_SCOPES = [
  "global",
  "command",
  "carnos",
  "calendar",
  "timeline",
  "goals",
  "career",
  "learning",
  "research",
  "body",
  "nutrition",
  "supplements",
  "sleep_energy",
  "emotion",
  "hair_skincare",
  "life_admin",
  "finance",
  "documents",
  "housing",
  "grimoire",
  "analytics",
  "privacy",
  "settings",
  "knowledge",
  "custom_trackers",
] as const;

export type MemoryDomainScope = (typeof MEMORY_DOMAIN_SCOPES)[number];

export const MEMORY_AUDIT_EVENT_TYPES = [
  "candidate_created",
  "candidate_blocked_private_mode",
  "candidate_blocked_do_not_remember",
  "candidate_approved",
  "candidate_edited",
  "candidate_rejected",
  "candidate_archived",
  "memory_created",
  "memory_updated",
  "memory_marked_sensitive",
  "memory_forgotten",
  "memory_retrieved",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "embedding_created",
  "embedding_removed",
  "retrieval_blocked",
  "private_mode_enabled",
  "private_mode_disabled",
  "do_not_remember_rule_created",
  "do_not_remember_rule_removed",
  "conflict_detected",
  "stale_memory_detected",
] as const;

export type MemoryAuditEventType = (typeof MEMORY_AUDIT_EVENT_TYPES)[number];

export const MEMORY_CONFLICT_SEVERITIES = [
  "none",
  "low",
  "medium",
  "high",
  "blocking",
] as const;

export type MemoryConflictSeverity =
  (typeof MEMORY_CONFLICT_SEVERITIES)[number];

export const MEMORY_STALENESS_STATES = [
  "fresh",
  "aging",
  "stale",
  "needs_reconfirmation",
] as const;

export type MemoryStalenessState = (typeof MEMORY_STALENESS_STATES)[number];

export const MEMORY_USAGE_VISIBILITY_LEVELS = [
  "hidden_blocked",
  "visible_summary",
  "visible_source",
  "visible_full",
] as const;

export type MemoryUsageVisibilityLevel =
  (typeof MEMORY_USAGE_VISIBILITY_LEVELS)[number];

export const MEMORY_ENTITY_KINDS = [
  "user_memory",
  "project_memory",
  "system_state_memory",
  "carnos_entity_state",
  "knowledge_vault_item",
  "privacy_rule",
  "do_not_remember_rule",
] as const;

export type MemoryEntityKind = (typeof MEMORY_ENTITY_KINDS)[number];

export const MEMORY_SOURCE_AUTHORITY_ORDER = [
  "source_of_truth",
  "repo_log",
  "phase_report",
  "audit_report",
  "project_state",
  "system_state",
  "manual_remember",
  "domain_record",
  "knowledge_document",
  "chat_message",
  "voice_transcript_draft",
  "manual_do_not_remember",
] as const;

export type MemorySourceAuthority =
  (typeof MEMORY_SOURCE_AUTHORITY_ORDER)[number];

export const APPROVABLE_MEMORY_STATUSES: readonly MemoryStatus[] = [
  "candidate",
  "pending_review",
  "edited",
  "needs_review",
];

export const RETRIEVABLE_MEMORY_STATUSES: readonly MemoryStatus[] = [
  "approved",
  "edited",
];

export const BLOCKED_MEMORY_STATUSES: readonly MemoryStatus[] = [
  "rejected",
  "archived",
  "forgotten",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
];

export const SENSITIVE_MEMORY_TYPES: readonly MemoryType[] = [
  "sensitive_note",
  "health_context",
  "voice_transcript_candidate",
  "privacy_rule",
  "do_not_remember_rule",
];

export const PROJECT_CONTINUITY_MEMORY_TYPES: readonly MemoryType[] = [
  "project_fact",
  "project_decision",
  "system_state",
  "source_of_truth_note",
  "conversation_continuity",
];

export const CARNOS_ENTITY_MEMORY_TYPES: readonly MemoryType[] = [
  "carnos_entity_state",
  "source_of_truth_note",
  "system_state",
  "project_decision",
];

export const KNOWLEDGE_VAULT_MEMORY_TYPES: readonly MemoryType[] = [
  "knowledge_item",
  "research_note",
  "source_of_truth_note",
];
