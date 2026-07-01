/**
 * Phase 15C — Carnos Persistent Memory + Continuity Foundation
 *
 * Type contracts only.
 * These interfaces shape memory candidates, approved memories, Carnos entity
 * state, project/system continuity, knowledge vault separation, context-pack
 * planning, provenance, sensitivity, staleness, and conflict metadata.
 *
 * Boundary:
 * - No database calls.
 * - No runtime retrieval.
 * - No embeddings.
 * - No AI/provider calls.
 */

import type {
  MemoryAuditEventType,
  MemoryConflictSeverity,
  MemoryDomainScope,
  MemoryEntityKind,
  MemorySensitivityLevel,
  MemorySourceType,
  MemoryStalenessState,
  MemoryStatus,
  MemoryType,
  MemoryUsageVisibilityLevel,
} from "./memory-enums";

export type MemoryId = string;
export type UserId = string;
export type SourceRecordId = string;

export interface MemoryProvenance {
  source_type: MemorySourceType;
  source_table?: string;
  source_id?: SourceRecordId;
  source_route?: string;
  source_phase?: string;
  source_commit?: string;
  source_label?: string;
  captured_at?: string;
}

export interface MemoryReviewMetadata {
  confidence: number;
  priority: number;
  sensitivity: MemorySensitivityLevel;
  staleness: MemoryStalenessState;
  review_after?: string;
  last_confirmed_at?: string;
  conflict_severity: MemoryConflictSeverity;
  visibility: MemoryUsageVisibilityLevel;
}

export interface MemoryCandidateContract {
  kind: "memory_candidate";
  id?: MemoryId;
  user_id: UserId;
  memory_type: MemoryType;
  status: Extract<
    MemoryStatus,
    | "candidate"
    | "pending_review"
    | "blocked_by_private_mode"
    | "blocked_by_do_not_remember"
  >;
  title: string;
  content: string;
  domain_scope: MemoryDomainScope;
  provenance: MemoryProvenance;
  review: MemoryReviewMetadata;
  private_mode_blocked: boolean;
  do_not_remember_blocked: boolean;
  duplicate_of_memory_id?: MemoryId;
  conflicts_with_memory_ids: MemoryId[];
  created_at?: string;
}

export interface ApprovedMemoryContract {
  kind: "approved_memory";
  id: MemoryId;
  user_id: UserId;
  memory_type: MemoryType;
  status: Extract<
    MemoryStatus,
    "approved" | "edited" | "stale" | "needs_review"
  >;
  title: string;
  content: string;
  domain_scope: MemoryDomainScope;
  provenance: MemoryProvenance;
  review: MemoryReviewMetadata;
  source_candidate_id?: MemoryId;
  supersedes_memory_ids: MemoryId[];
  conflicts_with_memory_ids: MemoryId[];
  created_at?: string;
  updated_at?: string;
  forgotten_at?: string;
}

export interface DoNotRememberRuleContract {
  kind: "do_not_remember_rule";
  id?: MemoryId;
  user_id: UserId;
  rule_label: string;
  rule_scope: MemoryDomainScope | "all";
  blocked_memory_types: MemoryType[];
  blocked_source_types: MemorySourceType[];
  reason?: string;
  is_active: boolean;
  created_at?: string;
}

export interface CarnosEntityStateContract {
  kind: "carnos_entity_state";
  user_id: UserId;
  carnos_name: "Carnos";
  app_name: "ascendOS";
  role: string;
  mission: string;
  tone: string;
  current_mode: string;
  active_project?: string;
  current_phase?: string;
  latest_milestone?: string;
  next_objective?: string;
  forbidden_behaviors: string[];
  response_preferences: string[];
  memory_policy: string[];
  voice_policy: string[];
  action_policy: string[];
  source_of_truth_policy: string[];
  updated_at?: string;
}

export interface ProjectMemoryStateContract {
  kind: "project_memory_state";
  user_id: UserId;
  project_name: string;
  repo_path?: string;
  remote_url?: string;
  branch?: string;
  latest_commit?: string;
  last_pushed_commit?: string;
  current_phase?: string;
  completed_phases: string[];
  next_phase?: string;
  source_of_truth_files: string[];
  active_boundaries: string[];
  deferred_scope: string[];
  known_errors: string[];
  verification_gates: string[];
  updated_at?: string;
}

export interface SystemStateMemoryContract {
  kind: "system_state_memory";
  user_id: UserId;
  app_name: "ascendOS";
  ai_persona: "Carnos";
  source_hierarchy: string[];
  active_chunk_model: "JSON chunks 0-21";
  outdated_models: string[];
  current_major_chunk?: string;
  current_internal_step?: string;
  updated_at?: string;
}

export interface KnowledgeVaultItemContract {
  kind: "knowledge_vault_item";
  id?: MemoryId;
  user_id: UserId;
  title: string;
  content_summary: string;
  source_label: string;
  source_uri?: string;
  tags: string[];
  domain_scope: MemoryDomainScope;
  provenance: MemoryProvenance;
  sensitivity: MemorySensitivityLevel;
  is_personal_memory: false;
  embedded: false;
  created_at?: string;
}

export interface ContextPackMemoryReference {
  memory_id: MemoryId;
  entity_kind: MemoryEntityKind;
  title: string;
  content_preview: string;
  reason_included: string;
  provenance: MemoryProvenance;
  sensitivity: MemorySensitivityLevel;
  confidence: number;
  priority: number;
  staleness: MemoryStalenessState;
  conflict_severity: MemoryConflictSeverity;
  allowed_for_context: boolean;
}

export interface CurrentContextPackContract {
  kind: "current_context_pack";
  user_id: UserId;
  active_route?: string;
  active_project?: string;
  active_phase?: string;
  included_memory_refs: ContextPackMemoryReference[];
  excluded_memory_refs: ContextPackMemoryReference[];
  privacy_mode_active: boolean;
  do_not_remember_rules_active: boolean;
  context_budget_notes: string[];
  conflict_warnings: string[];
  stale_memory_warnings: string[];
  generated_at?: string;
}

export interface MemoryAuditEventContract {
  kind: "memory_audit_event";
  user_id: UserId;
  event_type: MemoryAuditEventType;
  entity_kind: MemoryEntityKind;
  entity_id?: MemoryId;
  source: MemoryProvenance;
  summary: string;
  created_at?: string;
}

export type Phase15CMemoryContract =
  | MemoryCandidateContract
  | ApprovedMemoryContract
  | DoNotRememberRuleContract
  | CarnosEntityStateContract
  | ProjectMemoryStateContract
  | SystemStateMemoryContract
  | KnowledgeVaultItemContract
  | CurrentContextPackContract
  | MemoryAuditEventContract;
