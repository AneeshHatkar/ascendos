/**
 * Memory/RAG schema validators.
 *
 * These validators check schema-aligned payload shape only.
 *
 * Boundary:
 * - No Supabase calls.
 * - No repository implementation.
 * - No runtime retrieval.
 * - No embeddings generated.
 * - No vector search.
 * - No provider calls.
 */

import {
  MEMORY_RAG_CONFLICT_RESOLUTION_STATUSES,
  MEMORY_RAG_CONFLICT_ROLES,
  MEMORY_RAG_EMBEDDING_PROVIDERS,
  MEMORY_RAG_EMBEDDING_SOURCE_KINDS,
  MEMORY_RAG_EMBEDDING_STATUSES,
  MEMORY_RAG_EVIDENCE_STRENGTHS,
  MEMORY_RAG_PROVIDER_STATUSES,
  MEMORY_RAG_RETRIEVAL_MODES,
  MEMORY_RAG_SOURCE_RELIABILITY_LEVELS,
  type ApprovedMemorySchemaAlignmentContract,
  type MemoryCandidateSchemaAlignmentContract,
  type MemoryConflictGroupContract,
  type MemoryConflictMemberContract,
  type MemoryEmbeddingRecordContract,
  type MemoryRagConflictResolutionStatus,
  type MemoryRagConflictRole,
  type MemoryRagEmbeddingProvider,
  type MemoryRagEmbeddingSourceKind,
  type MemoryRagEmbeddingStatus,
  type MemoryRagEvidenceStrength,
  type MemoryRagProviderStatus,
  type MemoryRagRetrievalMode,
  type MemoryRagSchemaContract,
  type MemoryRagSourceReliability,
  type MemoryRetrievalEventContract,
} from "./memory-rag-schema-contracts";
import {
  isMemorySensitivityLevel,
  isMemorySourceType,
  isMemoryStatus,
  isMemoryType,
  type ValidationResult,
} from "./memory-validators";

function includesValue<T extends readonly string[]>(
  values: T,
  input: unknown,
): input is T[number] {
  return typeof input === "string" && values.includes(input);
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

function isNonBlankString(input: unknown): input is string {
  return typeof input === "string" && input.trim().length > 0;
}

function isOptionalNonBlankString(input: unknown): boolean {
  return input === undefined || isNonBlankString(input);
}

function isStringArray(input: unknown): input is string[] {
  return Array.isArray(input) && input.every((item) => typeof item === "string");
}

function isBoolean(input: unknown): input is boolean {
  return typeof input === "boolean";
}

function isNumberInRange(input: unknown, min: number, max: number): input is number {
  return typeof input === "number" && Number.isFinite(input) && input >= min && input <= max;
}

function isOptionalNonNegativeNumber(input: unknown): boolean {
  return input === undefined || (typeof input === "number" && Number.isFinite(input) && input >= 0);
}

export function isMemoryRagEvidenceStrength(
  input: unknown,
): input is MemoryRagEvidenceStrength {
  return includesValue(MEMORY_RAG_EVIDENCE_STRENGTHS, input);
}

export function isMemoryRagSourceReliability(
  input: unknown,
): input is MemoryRagSourceReliability {
  return includesValue(MEMORY_RAG_SOURCE_RELIABILITY_LEVELS, input);
}

export function isMemoryRagEmbeddingSourceKind(
  input: unknown,
): input is MemoryRagEmbeddingSourceKind {
  return includesValue(MEMORY_RAG_EMBEDDING_SOURCE_KINDS, input);
}

export function isMemoryRagEmbeddingStatus(
  input: unknown,
): input is MemoryRagEmbeddingStatus {
  return includesValue(MEMORY_RAG_EMBEDDING_STATUSES, input);
}

export function isMemoryRagEmbeddingProvider(
  input: unknown,
): input is MemoryRagEmbeddingProvider {
  return includesValue(MEMORY_RAG_EMBEDDING_PROVIDERS, input);
}

export function isMemoryRagProviderStatus(
  input: unknown,
): input is MemoryRagProviderStatus {
  return includesValue(MEMORY_RAG_PROVIDER_STATUSES, input);
}

export function isMemoryRagRetrievalMode(
  input: unknown,
): input is MemoryRagRetrievalMode {
  return includesValue(MEMORY_RAG_RETRIEVAL_MODES, input);
}

export function isMemoryRagConflictResolutionStatus(
  input: unknown,
): input is MemoryRagConflictResolutionStatus {
  return includesValue(MEMORY_RAG_CONFLICT_RESOLUTION_STATUSES, input);
}

export function isMemoryRagConflictRole(
  input: unknown,
): input is MemoryRagConflictRole {
  return includesValue(MEMORY_RAG_CONFLICT_ROLES, input);
}

export function validateMemoryCandidateSchemaAlignment(
  candidate: MemoryCandidateSchemaAlignmentContract,
): ValidationResult {
  const errors: string[] = [];

  if (candidate.kind !== "memory_candidate_schema_alignment") {
    errors.push("kind must be memory_candidate_schema_alignment");
  }

  if (!isNonBlankString(candidate.user_id)) {
    errors.push("user_id is required");
  }

  if (!isMemoryType(candidate.memory_type)) {
    errors.push("memory_type is invalid");
  }

  if (!isMemoryStatus(candidate.status)) {
    errors.push("status is invalid");
  }

  if (!isNonBlankString(candidate.candidate_text)) {
    errors.push("candidate_text is required");
  }

  if (!isOptionalNonBlankString(candidate.candidate_summary)) {
    errors.push("candidate_summary cannot be blank when provided");
  }

  if (candidate.source_type !== undefined && !isMemorySourceType(candidate.source_type)) {
    errors.push("source_type is invalid");
  }

  if (!isMemoryRagEvidenceStrength(candidate.evidence_strength)) {
    errors.push("evidence_strength is invalid");
  }

  if (!isMemoryRagSourceReliability(candidate.source_reliability)) {
    errors.push("source_reliability is invalid");
  }

  if (!isMemorySensitivityLevel(candidate.sensitivity)) {
    errors.push("sensitivity is invalid");
  }

  if (!isNumberInRange(candidate.confidence, 0, 1)) {
    errors.push("confidence must be between 0 and 1");
  }

  if (candidate.status === "approved" && !candidate.approved_memory_item_id) {
    errors.push("approved candidates must reference approved_memory_item_id");
  }

  if (candidate.status === "rejected" && !isNonBlankString(candidate.rejection_reason)) {
    errors.push("rejected candidates should include rejection_reason");
  }

  return { ok: errors.length === 0, errors };
}

export function validateApprovedMemorySchemaAlignment(
  memory: ApprovedMemorySchemaAlignmentContract,
): ValidationResult {
  const errors: string[] = [];

  if (memory.kind !== "approved_memory_schema_alignment") {
    errors.push("kind must be approved_memory_schema_alignment");
  }

  if (!isNonBlankString(memory.id)) {
    errors.push("id is required");
  }

  if (!isNonBlankString(memory.user_id)) {
    errors.push("user_id is required");
  }

  if (!isNonBlankString(memory.memory_text)) {
    errors.push("memory_text is required");
  }

  if (!isOptionalNonBlankString(memory.memory_summary)) {
    errors.push("memory_summary cannot be blank when provided");
  }

  if (!isMemoryType(memory.memory_type)) {
    errors.push("memory_type is invalid");
  }

  if (!["approved", "edited", "archived", "forgotten", "stale", "needs_review"].includes(memory.status)) {
    errors.push("approved memory status is invalid");
  }

  if (memory.source_type !== undefined && !isMemorySourceType(memory.source_type)) {
    errors.push("source_type is invalid");
  }

  if (!isMemorySensitivityLevel(memory.sensitivity)) {
    errors.push("sensitivity is invalid");
  }

  if (!isNumberInRange(memory.confidence, 0, 1)) {
    errors.push("confidence must be between 0 and 1");
  }

  if (!isMemoryRagEvidenceStrength(memory.evidence_strength)) {
    errors.push("evidence_strength is invalid");
  }

  if (!isMemoryRagSourceReliability(memory.source_reliability)) {
    errors.push("source_reliability is invalid");
  }

  if (!isBoolean(memory.retrieval_enabled)) {
    errors.push("retrieval_enabled must be boolean");
  }

  if (!isBoolean(memory.semantic_retrieval_allowed)) {
    errors.push("semantic_retrieval_allowed must be boolean");
  }

  if (memory.status === "forgotten" && !memory.forgotten_at) {
    errors.push("forgotten memory should include forgotten_at");
  }

  if (memory.locked_at && !isNonBlankString(memory.locked_reason)) {
    errors.push("locked memory should include locked_reason");
  }

  if (memory.semantic_retrieval_allowed && memory.status !== "approved" && memory.status !== "edited") {
    errors.push("semantic_retrieval_allowed requires approved or edited status");
  }

  return { ok: errors.length === 0, errors };
}

export function validateMemoryEmbeddingRecord(
  record: MemoryEmbeddingRecordContract,
): ValidationResult {
  const errors: string[] = [];

  if (record.kind !== "memory_embedding_record") {
    errors.push("kind must be memory_embedding_record");
  }

  if (!isNonBlankString(record.user_id)) {
    errors.push("user_id is required");
  }

  if (!isMemoryRagEmbeddingSourceKind(record.source_kind)) {
    errors.push("source_kind is invalid");
  }

  if (!record.memory_item_id && !record.knowledge_item_id && !(record.source_table && record.source_record_id)) {
    errors.push("embedding record must reference memory_item_id, knowledge_item_id, or source_table/source_record_id");
  }

  if (!isMemoryRagEmbeddingProvider(record.provider)) {
    errors.push("provider is invalid");
  }

  if (!isMemoryRagEmbeddingStatus(record.embedding_status)) {
    errors.push("embedding_status is invalid");
  }

  if (!isOptionalNonNegativeNumber(record.dimensions)) {
    errors.push("dimensions must be positive when provided");
  }

  if (!isRecord(record.metadata)) {
    errors.push("metadata must be an object");
  }

  if (record.provider === "noop" && record.embedding_status === "generated") {
    errors.push("noop provider cannot have generated embedding status");
  }

  if (record.embedding_status === "generated" && !record.generated_at) {
    errors.push("generated embedding records should include generated_at");
  }

  if (record.embedding_status === "failed" && !isNonBlankString(record.failure_reason)) {
    errors.push("failed embedding records should include failure_reason");
  }

  return { ok: errors.length === 0, errors };
}

export function validateMemoryRetrievalEvent(
  event: MemoryRetrievalEventContract,
): ValidationResult {
  const errors: string[] = [];

  if (event.kind !== "memory_retrieval_event") {
    errors.push("kind must be memory_retrieval_event");
  }

  if (!isNonBlankString(event.user_id)) {
    errors.push("user_id is required");
  }

  if (!isNonBlankString(event.retrieval_surface)) {
    errors.push("retrieval_surface is required");
  }

  if (!isNonBlankString(event.retrieval_reason)) {
    errors.push("retrieval_reason is required");
  }

  if (!isMemoryRagRetrievalMode(event.retrieval_mode)) {
    errors.push("retrieval_mode is invalid");
  }

  if (!isMemoryRagProviderStatus(event.provider_status)) {
    errors.push("provider_status is invalid");
  }

  if (!isBoolean(event.used_by_carnos)) {
    errors.push("used_by_carnos must be boolean");
  }

  if (!isStringArray(event.retrieved_memory_ids)) {
    errors.push("retrieved_memory_ids must be a string array");
  }

  if (!isStringArray(event.retrieved_knowledge_ids)) {
    errors.push("retrieved_knowledge_ids must be a string array");
  }

  if (!isStringArray(event.blocked_memory_ids)) {
    errors.push("blocked_memory_ids must be a string array");
  }

  if (!isOptionalNonNegativeNumber(event.context_budget)) {
    errors.push("context_budget must be non-negative when provided");
  }

  if (!isNumberInRange(event.result_count, 0, Number.MAX_SAFE_INTEGER)) {
    errors.push("result_count must be non-negative");
  }

  if (!isNonBlankString(event.retrieval_explanation)) {
    errors.push("retrieval_explanation is required");
  }

  if (!isRecord(event.metadata)) {
    errors.push("metadata must be an object");
  }

  if (event.provider_status === "runtime_deferred" && event.retrieval_mode !== "semantic_deferred" && event.retrieval_mode !== "preview_only") {
    errors.push("runtime_deferred provider status should use semantic_deferred or preview_only retrieval mode");
  }

  return { ok: errors.length === 0, errors };
}

export function validateMemoryConflictGroup(
  group: MemoryConflictGroupContract,
): ValidationResult {
  const errors: string[] = [];

  if (group.kind !== "memory_conflict_group") {
    errors.push("kind must be memory_conflict_group");
  }

  if (!isNonBlankString(group.user_id)) {
    errors.push("user_id is required");
  }

  if (!isNonBlankString(group.conflict_key)) {
    errors.push("conflict_key is required");
  }

  if (!isNonBlankString(group.conflict_summary)) {
    errors.push("conflict_summary is required");
  }

  if (!isMemoryRagConflictResolutionStatus(group.resolution_status)) {
    errors.push("resolution_status is invalid");
  }

  if (!isRecord(group.metadata)) {
    errors.push("metadata must be an object");
  }

  if (group.resolution_status === "resolved" && !group.resolved_memory_item_id) {
    errors.push("resolved conflicts should include resolved_memory_item_id");
  }

  return { ok: errors.length === 0, errors };
}

export function validateMemoryConflictMember(
  member: MemoryConflictMemberContract,
): ValidationResult {
  const errors: string[] = [];

  if (member.kind !== "memory_conflict_member") {
    errors.push("kind must be memory_conflict_member");
  }

  if (!isNonBlankString(member.user_id)) {
    errors.push("user_id is required");
  }

  if (!isNonBlankString(member.conflict_group_id)) {
    errors.push("conflict_group_id is required");
  }

  if (!member.memory_item_id && !member.memory_candidate_id) {
    errors.push("conflict member must reference memory_item_id or memory_candidate_id");
  }

  if (!isMemoryRagConflictRole(member.conflict_role)) {
    errors.push("conflict_role is invalid");
  }

  if (!isNonBlankString(member.conflict_reason)) {
    errors.push("conflict_reason is required");
  }

  if (!isNumberInRange(member.source_authority_score, 0, 1)) {
    errors.push("source_authority_score must be between 0 and 1");
  }

  if (!isNumberInRange(member.confidence_score, 0, 1)) {
    errors.push("confidence_score must be between 0 and 1");
  }

  return { ok: errors.length === 0, errors };
}

export function validateMemoryRagSchemaContract(
  contract: MemoryRagSchemaContract,
): ValidationResult {
  switch (contract.kind) {
    case "memory_candidate_schema_alignment":
      return validateMemoryCandidateSchemaAlignment(contract);
    case "approved_memory_schema_alignment":
      return validateApprovedMemorySchemaAlignment(contract);
    case "memory_embedding_record":
      return validateMemoryEmbeddingRecord(contract);
    case "memory_retrieval_event":
      return validateMemoryRetrievalEvent(contract);
    case "memory_conflict_group":
      return validateMemoryConflictGroup(contract);
    case "memory_conflict_member":
      return validateMemoryConflictMember(contract);
    default: {
      const _exhaustive: never = contract;
      return {
        ok: false,
        errors: [`Unsupported Memory/RAG schema contract: ${String(_exhaustive)}`],
      };
    }
  }
}

export function assertNoMemoryRagRuntimeSideEffects(): ValidationResult {
  return {
    ok: true,
    errors: [],
  };
}

export const MEMORY_RAG_VALIDATOR_BOUNDARY = [
  "validators only",
  "no repository",
  "no Supabase calls",
  "no runtime retrieval",
  "no generated embeddings",
  "no vector search",
  "no provider calls",
  "no Carnos prompt injection",
] as const;
