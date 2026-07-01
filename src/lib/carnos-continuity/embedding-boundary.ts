/**
 * Phase 15N — Embedding Boundary / Noop Provider.
 *
 * Embedding Boundary / Noop Provider.
 * embedding boundary.
 * noop provider.
 * disabled by design.
 * no embeddings generated.
 * no provider calls.
 * no vector search.
 * no pgvector.
 * no SQL reads or writes.
 * no Supabase calls.
 * no hidden Carnos prompt injection.
 * standalone /memory route remains absent.
 * Phase 15O — Forget/Delete Derived Records.
 *
 * This file defines local deterministic contracts only.
 */

export type EmbeddingBoundarySurface =
  | "memory_item"
  | "knowledge_item"
  | "retrieval_contract"
  | "context_pack"
  | "carnos_response";

export type EmbeddingBoundaryDecision =
  | "blocked_noop_provider"
  | "blocked_missing_user_approval"
  | "blocked_private_or_sensitive"
  | "blocked_no_runtime_provider"
  | "eligible_future_review";

export type EmbeddingBoundaryBlockedReason =
  | "noop_provider_only"
  | "user_approval_required"
  | "private_mode_or_sensitivity_lock"
  | "provider_not_configured"
  | "vector_search_deferred"
  | "sql_runtime_disabled"
  | "hidden_carnos_injection_forbidden";

export type EmbeddingBoundaryProviderKind = "noop";

export interface EmbeddingBoundaryInput {
  id: string;
  title: string;
  surface: EmbeddingBoundarySurface;
  content_preview: string;
  user_approved_for_future_embedding: boolean;
  sensitivity: "low" | "medium" | "high" | "restricted";
  source_label: string;
  source_phase: string;
}

export interface EmbeddingBoundaryPreviewRef {
  id: string;
  title: string;
  surface: EmbeddingBoundarySurface;
  decision: EmbeddingBoundaryDecision;
  blocked_reasons: EmbeddingBoundaryBlockedReason[];
  source_label: string;
  source_phase: string;
  content_preview: string;
  provider_kind: EmbeddingBoundaryProviderKind;
  would_generate_embedding: false;
  would_call_provider: false;
  would_write_sql: false;
  would_use_vector_search: false;
  hidden_carnos_injection: false;
}

export interface EmbeddingBoundaryProviderResult {
  provider_kind: EmbeddingBoundaryProviderKind;
  provider_label: "NoopEmbeddingProvider";
  status: "disabled_by_design";
  generated_embedding_count: 0;
  provider_call_count: 0;
  sql_write_count: 0;
  vector_search_count: 0;
  notes: string[];
}

export interface EmbeddingBoundarySummary {
  phase: "Phase 15N";
  label: "Embedding Boundary / Noop Provider";
  boundary_name: "Embedding Boundary / Noop Provider";
  total_inputs: number;
  blocked_count: number;
  future_review_count: number;
  provider: EmbeddingBoundaryProviderResult;
  preview_refs: EmbeddingBoundaryPreviewRef[];
  boundary_markers: string[];
  next_phase: "Phase 15O — Forget/Delete Derived Records";
}

export interface EmbeddingBoundaryResult {
  summary: EmbeddingBoundarySummary;
  errors: string[];
  warnings: string[];
}

export const PHASE_15N_EMBEDDING_BOUNDARY = {
  phase: "Phase 15N",
  name: "Embedding Boundary / Noop Provider",
  boundary: "embedding boundary",
  provider: "noop provider",
  status: "disabled by design",
  next_phase: "Phase 15O — Forget/Delete Derived Records",
  rules: [
    "Embedding Boundary / Noop Provider",
    "embedding boundary",
    "noop provider",
    "disabled by design",
    "no embeddings generated",
    "no provider calls",
    "no vector search",
    "no pgvector",
    "no SQL reads or writes",
    "no Supabase calls",
    "no hidden Carnos prompt injection",
    "standalone /memory route remains absent",
  ],
} as const;

export const NOOP_EMBEDDING_PROVIDER_RESULT: EmbeddingBoundaryProviderResult = {
  provider_kind: "noop",
  provider_label: "NoopEmbeddingProvider",
  status: "disabled_by_design",
  generated_embedding_count: 0,
  provider_call_count: 0,
  sql_write_count: 0,
  vector_search_count: 0,
  notes: [
    "NoopEmbeddingProvider never generates embeddings.",
    "NoopEmbeddingProvider never calls external providers.",
    "NoopEmbeddingProvider never writes SQL.",
    "NoopEmbeddingProvider never performs vector search.",
    "Phase 15N only documents the safe future boundary.",
  ],
};

export const DEFAULT_EMBEDDING_BOUNDARY_INPUTS: EmbeddingBoundaryInput[] = [
  {
    id: "phase-15n-memory-ref",
    title: "Approved memory future embedding candidate",
    surface: "memory_item",
    content_preview:
      "Approved memories may become future embedding candidates only after explicit review and boundary unlock.",
    user_approved_for_future_embedding: false,
    sensitivity: "medium",
    source_label: "Approved memory read layer preview",
    source_phase: "Phase 15G",
  },
  {
    id: "phase-15n-knowledge-ref",
    title: "Knowledge vault future embedding candidate",
    surface: "knowledge_item",
    content_preview:
      "Knowledge vault records remain non-personal source metadata until a future ingestion/retrieval phase is explicitly unlocked.",
    user_approved_for_future_embedding: false,
    sensitivity: "low",
    source_label: "Knowledge Vault Foundation preview",
    source_phase: "Phase 15L",
  },
  {
    id: "phase-15n-retrieval-ref",
    title: "Retrieval contract boundary candidate",
    surface: "retrieval_contract",
    content_preview:
      "Retrieval contract refs remain preview-only and cannot trigger embeddings, vector search, provider calls, or hidden Carnos context.",
    user_approved_for_future_embedding: false,
    sensitivity: "low",
    source_label: "Retrieval Contract preview",
    source_phase: "Phase 15M",
  },
];

function trimPreview(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= 220) return trimmed;
  return `${trimmed.slice(0, 217)}...`;
}

export function getEmbeddingBoundaryBlockedReasons(
  input: EmbeddingBoundaryInput
): EmbeddingBoundaryBlockedReason[] {
  const reasons: EmbeddingBoundaryBlockedReason[] = [
    "noop_provider_only",
    "provider_not_configured",
    "vector_search_deferred",
    "sql_runtime_disabled",
    "hidden_carnos_injection_forbidden",
  ];

  if (!input.user_approved_for_future_embedding) {
    reasons.push("user_approval_required");
  }

  if (input.sensitivity === "high" || input.sensitivity === "restricted") {
    reasons.push("private_mode_or_sensitivity_lock");
  }

  return [...new Set(reasons)];
}

export function getEmbeddingBoundaryDecision(
  input: EmbeddingBoundaryInput
): EmbeddingBoundaryDecision {
  if (input.sensitivity === "high" || input.sensitivity === "restricted") {
    return "blocked_private_or_sensitive";
  }

  if (!input.user_approved_for_future_embedding) {
    return "blocked_missing_user_approval";
  }

  return "blocked_noop_provider";
}

export function createEmbeddingBoundaryPreviewRef(
  input: EmbeddingBoundaryInput
): EmbeddingBoundaryPreviewRef {
  return {
    id: input.id,
    title: input.title,
    surface: input.surface,
    decision: getEmbeddingBoundaryDecision(input),
    blocked_reasons: getEmbeddingBoundaryBlockedReasons(input),
    source_label: input.source_label,
    source_phase: input.source_phase,
    content_preview: trimPreview(input.content_preview),
    provider_kind: "noop",
    would_generate_embedding: false,
    would_call_provider: false,
    would_write_sql: false,
    would_use_vector_search: false,
    hidden_carnos_injection: false,
  };
}

export function createNoopEmbeddingProviderResult(): EmbeddingBoundaryProviderResult {
  return { ...NOOP_EMBEDDING_PROVIDER_RESULT };
}

export function createEmbeddingBoundaryPreview(
  inputs: EmbeddingBoundaryInput[] = DEFAULT_EMBEDDING_BOUNDARY_INPUTS
): EmbeddingBoundaryResult {
  const errors = inputs
    .filter((input) => input.id.trim().length === 0 || input.title.trim().length === 0)
    .map((input) => `Invalid embedding boundary input: ${input.id || "missing-id"}`);

  const previewRefs = inputs
    .filter((input) => input.id.trim().length > 0 && input.title.trim().length > 0)
    .map(createEmbeddingBoundaryPreviewRef);

  const futureReviewCount = previewRefs.filter(
    (ref) => ref.decision === "eligible_future_review"
  ).length;

  const summary: EmbeddingBoundarySummary = {
    phase: "Phase 15N",
    label: "Embedding Boundary / Noop Provider",
    boundary_name: "Embedding Boundary / Noop Provider",
    total_inputs: inputs.length,
    blocked_count: previewRefs.length - futureReviewCount,
    future_review_count: futureReviewCount,
    provider: createNoopEmbeddingProviderResult(),
    preview_refs: previewRefs,
    boundary_markers: [...PHASE_15N_EMBEDDING_BOUNDARY.rules],
    next_phase: "Phase 15O — Forget/Delete Derived Records",
  };

  const warnings = [
    "Embedding Boundary / Noop Provider is disabled by design.",
    "Phase 15N does not create embeddings, call providers, write SQL, or run vector search.",
    "Phase 15O handles Forget/Delete Derived Records.",
  ];

  return { summary, errors, warnings };
}

export function summarizeEmbeddingBoundary(
  result: EmbeddingBoundaryResult
): EmbeddingBoundarySummary {
  return result.summary;
}

export function createDefaultEmbeddingBoundarySummary(): EmbeddingBoundarySummary {
  return createEmbeddingBoundaryPreview().summary;
}
