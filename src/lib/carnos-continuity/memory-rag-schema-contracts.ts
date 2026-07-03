/**
 * Memory/RAG schema contracts.
 *
 * These contracts align TypeScript payloads with the additive Memory/RAG
 * schema foundation.
 *
 * Boundary:
 * - No Supabase calls.
 * - No repository implementation.
 * - No runtime retrieval.
 * - No embeddings generated.
 * - No vector search.
 * - No provider calls.
 * - No Carnos prompt injection.
 */

import type {
  MemoryDomainScope,
  MemorySensitivityLevel,
  MemorySourceType,
  MemoryStatus,
  MemoryType,
} from "./memory-enums";
import type { MemoryId, SourceRecordId, UserId } from "./memory-contracts";

export const MEMORY_RAG_EVIDENCE_STRENGTHS = [
  "weak",
  "medium",
  "strong",
  "source_backed",
  "user_confirmed",
] as const;

export type MemoryRagEvidenceStrength =
  (typeof MEMORY_RAG_EVIDENCE_STRENGTHS)[number];

export const MEMORY_RAG_SOURCE_RELIABILITY_LEVELS = [
  "unknown",
  "low",
  "medium",
  "high",
  "source_of_truth",
] as const;

export type MemoryRagSourceReliability =
  (typeof MEMORY_RAG_SOURCE_RELIABILITY_LEVELS)[number];

export const MEMORY_RAG_EMBEDDING_SOURCE_KINDS = [
  "memory_item",
  "knowledge_item",
  "retrieval_contract",
  "external_source",
] as const;

export type MemoryRagEmbeddingSourceKind =
  (typeof MEMORY_RAG_EMBEDDING_SOURCE_KINDS)[number];

export const MEMORY_RAG_EMBEDDING_STATUSES = [
  "deferred",
  "queued",
  "generated",
  "failed",
  "removed",
] as const;

export type MemoryRagEmbeddingStatus =
  (typeof MEMORY_RAG_EMBEDDING_STATUSES)[number];

export const MEMORY_RAG_EMBEDDING_PROVIDERS = [
  "noop",
  "manual",
  "openai",
  "local",
  "other",
] as const;

export type MemoryRagEmbeddingProvider =
  (typeof MEMORY_RAG_EMBEDDING_PROVIDERS)[number];

export const MEMORY_RAG_PROVIDER_STATUSES = [
  "disabled",
  "noop",
  "runtime_deferred",
  "keyword_only",
  "embedding_ready",
  "embedding_failed",
] as const;

export type MemoryRagProviderStatus =
  (typeof MEMORY_RAG_PROVIDER_STATUSES)[number];

export const MEMORY_RAG_RETRIEVAL_MODES = [
  "disabled",
  "preview_only",
  "approved_memory_only",
  "knowledge_only",
  "keyword_only",
  "semantic_deferred",
] as const;

export type MemoryRagRetrievalMode =
  (typeof MEMORY_RAG_RETRIEVAL_MODES)[number];

export const MEMORY_RAG_CONFLICT_RESOLUTION_STATUSES = [
  "unresolved",
  "needs_user_review",
  "resolved",
  "superseded",
  "ignored",
] as const;

export type MemoryRagConflictResolutionStatus =
  (typeof MEMORY_RAG_CONFLICT_RESOLUTION_STATUSES)[number];

export const MEMORY_RAG_CONFLICT_ROLES = [
  "primary",
  "competing",
  "superseding",
  "superseded",
  "supporting",
] as const;

export type MemoryRagConflictRole =
  (typeof MEMORY_RAG_CONFLICT_ROLES)[number];

export interface MemoryRagSchemaMetadata {
  schema_contract: "memory_rag_schema_alignment";
  schema_version: "17d";
  runtime_retrieval_enabled: false;
  embedding_generation_enabled: false;
  vector_search_enabled: false;
  provider_calls_enabled: false;
  repository_enabled: false;
}

export interface MemoryCandidateSchemaAlignmentContract {
  kind: "memory_candidate_schema_alignment";
  id?: MemoryId;
  user_id: UserId;
  memory_type: MemoryType;
  status: MemoryStatus;
  candidate_text: string;
  candidate_summary?: string;
  source_type?: MemorySourceType;
  source_route?: string;
  source_table?: string;
  source_record_id?: SourceRecordId;
  approved_memory_item_id?: MemoryId;
  reviewed_at?: string;
  rejection_reason?: string;
  evidence_strength: MemoryRagEvidenceStrength;
  source_reliability: MemoryRagSourceReliability;
  conflict_group_key?: string;
  duplicate_of_memory_item_id?: MemoryId;
  sensitivity: MemorySensitivityLevel;
  confidence: number;
  created_at?: string;
}

export interface ApprovedMemorySchemaAlignmentContract {
  kind: "approved_memory_schema_alignment";
  id: MemoryId;
  user_id: UserId;
  candidate_id?: MemoryId;
  memory_text: string;
  memory_summary?: string;
  memory_type: MemoryType;
  status: Extract<
    MemoryStatus,
    "approved" | "edited" | "archived" | "forgotten" | "stale" | "needs_review"
  >;
  source_type?: MemorySourceType;
  source_route?: string;
  source_table?: string;
  source_record_id?: SourceRecordId;
  sensitivity: MemorySensitivityLevel;
  confidence: number;
  evidence_strength: MemoryRagEvidenceStrength;
  source_reliability: MemoryRagSourceReliability;
  retrieval_enabled: boolean;
  semantic_retrieval_allowed: boolean;
  locked_at?: string;
  locked_reason?: string;
  forgotten_at?: string;
  forgotten_reason?: string;
  superseded_by_memory_item_id?: MemoryId;
  conflict_group_key?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MemoryEmbeddingRecordContract {
  kind: "memory_embedding_record";
  id?: MemoryId;
  user_id: UserId;
  source_kind: MemoryRagEmbeddingSourceKind;
  memory_item_id?: MemoryId;
  knowledge_item_id?: MemoryId;
  source_table?: string;
  source_record_id?: SourceRecordId;
  provider: MemoryRagEmbeddingProvider;
  model?: string;
  dimensions?: number;
  embedding_status: MemoryRagEmbeddingStatus;
  embedding_hash?: string;
  generated_at?: string;
  failed_at?: string;
  failure_reason?: string;
  metadata: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface MemoryRetrievalEventContract {
  kind: "memory_retrieval_event";
  id?: MemoryId;
  user_id: UserId;
  retrieval_log_id?: MemoryId;
  retrieval_surface: string;
  retrieval_reason: string;
  retrieval_mode: MemoryRagRetrievalMode;
  provider_status: MemoryRagProviderStatus;
  used_by_carnos: boolean;
  retrieved_memory_ids: MemoryId[];
  retrieved_knowledge_ids: MemoryId[];
  blocked_memory_ids: MemoryId[];
  excluded_reason_summary?: string;
  sensitivity_summary?: string;
  context_budget?: number;
  result_count: number;
  retrieval_explanation: string;
  metadata: Record<string, unknown>;
  created_at?: string;
}

export interface MemoryConflictGroupContract {
  kind: "memory_conflict_group";
  id?: MemoryId;
  user_id: UserId;
  conflict_key: string;
  conflict_summary: string;
  resolution_status: MemoryRagConflictResolutionStatus;
  resolved_memory_item_id?: MemoryId;
  resolved_at?: string;
  metadata: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface MemoryConflictMemberContract {
  kind: "memory_conflict_member";
  id?: MemoryId;
  user_id: UserId;
  conflict_group_id: MemoryId;
  memory_item_id?: MemoryId;
  memory_candidate_id?: MemoryId;
  conflict_role: MemoryRagConflictRole;
  conflict_reason: string;
  source_authority_score: number;
  confidence_score: number;
  created_at?: string;
}

export type MemoryRagSchemaContract =
  | MemoryCandidateSchemaAlignmentContract
  | ApprovedMemorySchemaAlignmentContract
  | MemoryEmbeddingRecordContract
  | MemoryRetrievalEventContract
  | MemoryConflictGroupContract
  | MemoryConflictMemberContract;

export const MEMORY_RAG_SCHEMA_BOUNDARY: MemoryRagSchemaMetadata = {
  schema_contract: "memory_rag_schema_alignment",
  schema_version: "17d",
  runtime_retrieval_enabled: false,
  embedding_generation_enabled: false,
  vector_search_enabled: false,
  provider_calls_enabled: false,
  repository_enabled: false,
};

export const MEMORY_RAG_SCHEMA_RULES = [
  "memory_candidates remains the memory inbox table.",
  "memory_items remains the approved-memory table.",
  "knowledge_items remains the knowledge vault table.",
  "memory_embedding_records stores embedding metadata and status only.",
  "deferred embedding records do not mean embeddings exist.",
  "memory_retrieval_events records explainable retrieval events only after later repository work.",
  "memory_conflict_groups and memory_conflict_members model conflict review without silent resolution.",
  "No repository, Supabase call, runtime retrieval, provider call, vector search, or Carnos prompt injection is allowed in these contracts.",
] as const;
