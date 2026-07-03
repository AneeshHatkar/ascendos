/**
 * Phase 17H — Embedding Provider Boundary
 *
 * Official Memory/RAG embedding provider boundary.
 *
 * Boundary:
 * - Pure TypeScript provider contract only.
 * - No Supabase calls.
 * - No repository implementation.
 * - No SQL reads or writes.
 * - No runtime retrieval.
 * - No embedding generation.
 * - No fake vectors.
 * - No provider calls.
 * - No vector search.
 * - No Carnos prompt/context injection.
 * - No background queue execution.
 */

import type {
  MemoryRagEmbeddingProvider,
  MemoryRagEmbeddingSourceKind,
  MemoryRagEmbeddingStatus,
  MemoryRagProviderStatus,
} from "./memory-rag-schema-contracts";
import type { MemorySensitivityLevel } from "./memory-enums";
import { validateMemoryEmbeddingRecord } from "./memory-rag-schema-validators";

export type MemoryEmbeddingBoundaryDecision =
  | "blocked_noop_provider"
  | "blocked_provider_deferred"
  | "blocked_missing_approval"
  | "blocked_sensitive_lock"
  | "blocked_invalid_source"
  | "eligible_for_future_provider";

export type MemoryEmbeddingBoundaryReason =
  | "noop_provider_only"
  | "provider_runtime_deferred"
  | "user_approval_required"
  | "sensitivity_lock_required"
  | "source_reference_required"
  | "fake_vectors_forbidden"
  | "vector_search_deferred"
  | "runtime_retrieval_deferred"
  | "sql_runtime_deferred"
  | "carnos_context_injection_forbidden";

export type MemoryEmbeddingBoundarySurface =
  | "approved_memory"
  | "knowledge_vault"
  | "retrieval_contract"
  | "external_source_preview";

export interface MemoryEmbeddingProviderBoundaryRequest {
  user_id: string;
  source_id: string;
  source_kind: MemoryRagEmbeddingSourceKind;
  surface: MemoryEmbeddingBoundarySurface;
  text_preview: string;
  sensitivity: MemorySensitivityLevel;
  user_approved_for_embedding: boolean;
  provider: Extract<MemoryRagEmbeddingProvider, "noop" | "manual" | "local" | "other">;
  model?: string;
  dimensions?: number;
  memory_item_id?: string;
  knowledge_item_id?: string;
  source_table?: string;
  source_record_id?: string;
  metadata?: Record<string, unknown>;
}

export interface MemoryEmbeddingProviderBoundaryEvaluation {
  request_id: string;
  user_id: string;
  source_kind: MemoryRagEmbeddingSourceKind;
  surface: MemoryEmbeddingBoundarySurface;
  provider: MemoryRagEmbeddingProvider;
  provider_status: MemoryRagProviderStatus;
  embedding_status: MemoryRagEmbeddingStatus;
  decision: MemoryEmbeddingBoundaryDecision;
  blocked_reasons: MemoryEmbeddingBoundaryReason[];
  generated_embedding: false;
  generated_vector_count: 0;
  provider_call_count: 0;
  sql_read_count: 0;
  sql_write_count: 0;
  vector_search_count: 0;
  runtime_retrieval_count: 0;
  carnos_context_injection_count: 0;
  embedding_vector: null;
  embedding_hash: null;
  explanation: string;
}

export interface MemoryEmbeddingRecordPreview {
  kind: "memory_embedding_record";
  user_id: string;
  source_kind: MemoryRagEmbeddingSourceKind;
  memory_item_id?: string;
  knowledge_item_id?: string;
  source_table?: string;
  source_record_id?: string;
  provider: "noop";
  model?: string;
  dimensions?: number;
  embedding_status: Extract<MemoryRagEmbeddingStatus, "deferred" | "failed">;
  embedding_hash?: string;
  failure_reason?: string;
  metadata: Record<string, unknown>;
}

export interface NoopMemoryEmbeddingProviderResult {
  provider_name: "NoopMemoryEmbeddingProvider";
  provider: "noop";
  provider_status: "noop";
  embedding_status: "deferred";
  generated_embedding: false;
  generated_vector_count: 0;
  provider_call_count: 0;
  vector_search_count: 0;
  runtime_retrieval_count: 0;
  notes: string[];
}

export interface MemoryEmbeddingProviderBoundarySummary {
  phase: "17H";
  boundary: "embedding_provider_boundary";
  runtime_side_effects_enabled: false;
  total_requests: number;
  blocked_count: number;
  future_eligible_count: number;
  noop_provider: NoopMemoryEmbeddingProviderResult;
  evaluations: MemoryEmbeddingProviderBoundaryEvaluation[];
  record_previews: MemoryEmbeddingRecordPreview[];
  warnings: string[];
  boundary_rules: typeof PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY.rules;
}

export const PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY = {
  phase: "Phase 17H",
  name: "Embedding Provider Boundary",
  deterministic_only: true,
  no_supabase_calls: true,
  no_repository_implementation: true,
  no_sql_reads_or_writes: true,
  no_runtime_retrieval: true,
  no_embedding_generation: true,
  no_fake_vectors: true,
  no_provider_calls: true,
  no_vector_search: true,
  no_carnos_prompt_injection: true,
  no_background_queue_execution: true,
  runtime_side_effects_enabled: false,
  next_phase: "Phase 17I — Retrieval Ranking + Budget + Dedupe Rules",
  rules: [
    "Phase 17H — Embedding Provider Boundary",
    "Embedding Provider Boundary",
    "NoopMemoryEmbeddingProvider",
    "No runtime retrieval",
    "No embedding generation",
    "No fake vectors",
    "No provider calls",
    "No vector search",
    "No Supabase calls",
    "No SQL reads or writes",
    "No Carnos prompt/context injection",
    "No background queue execution",
    "memory_embedding_records previews may describe deferred metadata only",
    "noop provider cannot return generated embeddings",
    "semantic retrieval remains deferred",
  ],
} as const;

const DEFAULT_MODEL_LABEL = "noop-deferred";

function isNonBlankString(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function trimPreview(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= 240) return trimmed;
  return `${trimmed.slice(0, 237)}...`;
}

function hasValidSourceReference(
  request: MemoryEmbeddingProviderBoundaryRequest,
): boolean {
  if (request.source_kind === "memory_item") return isNonBlankString(request.memory_item_id);
  if (request.source_kind === "knowledge_item") return isNonBlankString(request.knowledge_item_id);
  return isNonBlankString(request.source_table) && isNonBlankString(request.source_record_id);
}

function normalizeProviderStatus(
  request: MemoryEmbeddingProviderBoundaryRequest,
): MemoryRagProviderStatus {
  if (request.provider === "noop") return "noop";
  return "runtime_deferred";
}

function normalizeEmbeddingStatus(
  decision: MemoryEmbeddingBoundaryDecision,
): Extract<MemoryRagEmbeddingStatus, "deferred" | "failed"> {
  if (decision === "blocked_invalid_source") return "failed";
  return "deferred";
}

export function getMemoryEmbeddingBoundaryBlockedReasons(
  request: MemoryEmbeddingProviderBoundaryRequest,
): MemoryEmbeddingBoundaryReason[] {
  const reasons: MemoryEmbeddingBoundaryReason[] = [
    "fake_vectors_forbidden",
    "vector_search_deferred",
    "runtime_retrieval_deferred",
    "sql_runtime_deferred",
    "carnos_context_injection_forbidden",
  ];

  if (request.provider === "noop") {
    reasons.push("noop_provider_only");
  } else {
    reasons.push("provider_runtime_deferred");
  }

  if (!request.user_approved_for_embedding) {
    reasons.push("user_approval_required");
  }

  if (request.sensitivity === "high" || request.sensitivity === "restricted") {
    reasons.push("sensitivity_lock_required");
  }

  if (!hasValidSourceReference(request)) {
    reasons.push("source_reference_required");
  }

  return [...new Set(reasons)];
}

export function decideMemoryEmbeddingBoundary(
  request: MemoryEmbeddingProviderBoundaryRequest,
): MemoryEmbeddingBoundaryDecision {
  if (!hasValidSourceReference(request)) return "blocked_invalid_source";

  if (request.sensitivity === "high" || request.sensitivity === "restricted") {
    return "blocked_sensitive_lock";
  }

  if (!request.user_approved_for_embedding) {
    return "blocked_missing_approval";
  }

  if (request.provider !== "noop") {
    return "blocked_provider_deferred";
  }

  return "blocked_noop_provider";
}

export function evaluateMemoryEmbeddingProviderBoundary(
  request: MemoryEmbeddingProviderBoundaryRequest,
): MemoryEmbeddingProviderBoundaryEvaluation {
  const decision = decideMemoryEmbeddingBoundary(request);
  const blockedReasons = getMemoryEmbeddingBoundaryBlockedReasons(request);

  return {
    request_id: request.source_id,
    user_id: request.user_id,
    source_kind: request.source_kind,
    surface: request.surface,
    provider: request.provider,
    provider_status: normalizeProviderStatus(request),
    embedding_status: normalizeEmbeddingStatus(decision),
    decision,
    blocked_reasons: blockedReasons,
    generated_embedding: false,
    generated_vector_count: 0,
    provider_call_count: 0,
    sql_read_count: 0,
    sql_write_count: 0,
    vector_search_count: 0,
    runtime_retrieval_count: 0,
    carnos_context_injection_count: 0,
    embedding_vector: null,
    embedding_hash: null,
    explanation:
      "Embedding boundary evaluated locally only. No embedding was generated, no provider was called, no vector search ran, and semantic retrieval remains deferred.",
  };
}

export function createDeferredMemoryEmbeddingRecordPreview(
  request: MemoryEmbeddingProviderBoundaryRequest,
): MemoryEmbeddingRecordPreview {
  const decision = decideMemoryEmbeddingBoundary(request);
  const status = normalizeEmbeddingStatus(decision);

  const preview: MemoryEmbeddingRecordPreview = {
    kind: "memory_embedding_record",
    user_id: request.user_id,
    source_kind: request.source_kind,
    memory_item_id: request.memory_item_id,
    knowledge_item_id: request.knowledge_item_id,
    source_table: request.source_table,
    source_record_id: request.source_record_id,
    provider: "noop",
    model: request.model ?? DEFAULT_MODEL_LABEL,
    dimensions: request.dimensions,
    embedding_status: status,
    failure_reason:
      status === "failed"
        ? "Embedding record preview is missing a valid source reference."
        : undefined,
    metadata: {
      ...(request.metadata ?? {}),
      phase: "17H",
      boundary: "embedding_provider_boundary",
      surface: request.surface,
      text_preview: trimPreview(request.text_preview),
      generated_embedding: false,
      provider_call_count: 0,
      vector_search_count: 0,
      runtime_retrieval_count: 0,
      semantic_retrieval_active: false,
    },
  };

  const validation = validateMemoryEmbeddingRecord(preview);

  if (!validation.ok) {
    return {
      ...preview,
      embedding_status: "failed",
      failure_reason: validation.errors.join(" "),
    };
  }

  return preview;
}

export function runNoopMemoryEmbeddingProvider(
  _request?: MemoryEmbeddingProviderBoundaryRequest,
): NoopMemoryEmbeddingProviderResult {
  return {
    provider_name: "NoopMemoryEmbeddingProvider",
    provider: "noop",
    provider_status: "noop",
    embedding_status: "deferred",
    generated_embedding: false,
    generated_vector_count: 0,
    provider_call_count: 0,
    vector_search_count: 0,
    runtime_retrieval_count: 0,
    notes: [
      "NoopMemoryEmbeddingProvider never generates embeddings.",
      "NoopMemoryEmbeddingProvider never returns vectors.",
      "NoopMemoryEmbeddingProvider never calls external providers.",
      "NoopMemoryEmbeddingProvider never reads or writes SQL.",
      "NoopMemoryEmbeddingProvider never activates semantic retrieval.",
    ],
  };
}

export const DEFAULT_PHASE_17H_EMBEDDING_REQUESTS: readonly MemoryEmbeddingProviderBoundaryRequest[] = [
  {
    user_id: "phase-17h-user",
    source_id: "approved-memory-preview",
    source_kind: "memory_item",
    surface: "approved_memory",
    text_preview:
      "Approved memory can become an embedding candidate only after explicit provider activation in a later phase.",
    sensitivity: "medium",
    user_approved_for_embedding: true,
    provider: "noop",
    memory_item_id: "memory-preview-1",
    metadata: {
      source: "phase_17h_fixture",
    },
  },
  {
    user_id: "phase-17h-user",
    source_id: "knowledge-vault-preview",
    source_kind: "knowledge_item",
    surface: "knowledge_vault",
    text_preview:
      "Knowledge vault records may be eligible for deferred embedding metadata, but no semantic vector exists yet.",
    sensitivity: "low",
    user_approved_for_embedding: true,
    provider: "noop",
    knowledge_item_id: "knowledge-preview-1",
    metadata: {
      source: "phase_17h_fixture",
    },
  },
  {
    user_id: "phase-17h-user",
    source_id: "restricted-memory-preview",
    source_kind: "memory_item",
    surface: "approved_memory",
    text_preview:
      "Restricted memories remain blocked from embedding until sensitivity locks and explicit review allow future handling.",
    sensitivity: "restricted",
    user_approved_for_embedding: true,
    provider: "noop",
    memory_item_id: "memory-preview-2",
    metadata: {
      source: "phase_17h_fixture",
    },
  },
];

export function summarizeMemoryEmbeddingProviderBoundary(
  requests: readonly MemoryEmbeddingProviderBoundaryRequest[] =
    DEFAULT_PHASE_17H_EMBEDDING_REQUESTS,
): MemoryEmbeddingProviderBoundarySummary {
  const evaluations = requests.map(evaluateMemoryEmbeddingProviderBoundary);
  const recordPreviews = requests.map(createDeferredMemoryEmbeddingRecordPreview);

  const futureEligibleCount = evaluations.filter(
    (evaluation) => evaluation.decision === "eligible_for_future_provider",
  ).length;

  const warnings = evaluations.flatMap((evaluation) =>
    evaluation.blocked_reasons.map(
      (reason) => `${evaluation.request_id}: ${reason}`,
    ),
  );

  return {
    phase: "17H",
    boundary: "embedding_provider_boundary",
    runtime_side_effects_enabled: false,
    total_requests: requests.length,
    blocked_count: evaluations.length - futureEligibleCount,
    future_eligible_count: futureEligibleCount,
    noop_provider: runNoopMemoryEmbeddingProvider(),
    evaluations,
    record_previews: recordPreviews,
    warnings,
    boundary_rules: PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY.rules,
  };
}

export function getMemoryEmbeddingProviderBoundarySummary(): readonly string[] {
  return [
    "Phase 17H — Embedding Provider Boundary",
    "Embedding Provider Boundary",
    "NoopMemoryEmbeddingProvider",
    "No runtime retrieval",
    "No embedding generation",
    "No fake vectors",
    "No provider calls",
    "No vector search",
    "No Supabase calls",
    "No SQL reads or writes",
    "No Carnos prompt/context injection",
    "No background queue execution",
    "memory_embedding_records previews may describe deferred metadata only",
    "noop provider cannot return generated embeddings",
    "semantic retrieval remains deferred",
  ];
}
