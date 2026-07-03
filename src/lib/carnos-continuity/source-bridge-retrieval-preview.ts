/**
 * Phase 17K — Current-Info / Document / Career / Research Source Bridges
 *
 * Deterministic source bridge layer from non-memory source records into
 * Memory/RAG retrieval-planning candidates.
 *
 * Boundary:
 * - Pure TypeScript bridge only.
 * - No Supabase calls.
 * - No repository implementation.
 * - No SQL reads or writes.
 * - No runtime retrieval.
 * - No memory_retrieval_events writes.
 * - No embedding generation.
 * - No semantic retrieval activation.
 * - No provider calls.
 * - No vector search.
 * - No Carnos prompt/context injection.
 * - No background scanning.
 */

import type {
  MemoryConflictSeverity,
  MemoryDomainScope,
  MemorySensitivityLevel,
  MemorySourceType,
  MemoryStatus,
  MemoryStalenessState,
  MemoryType,
} from "./memory-enums";
import type {
  MemoryRetrievalCandidate,
  MemoryRetrievalPlanOptions,
  MemoryRetrievalRankingBudgetDedupeResult,
} from "./memory-retrieval-ranking-budget-dedupe";
import {
  planMemoryRetrievalRankingBudgetDedupe,
  summarizeMemoryRetrievalPlan,
} from "./memory-retrieval-ranking-budget-dedupe";
import type {
  MemoryRagEvidenceStrength,
  MemoryRagProviderStatus,
  MemoryRagRetrievalMode,
  MemoryRagSourceReliability,
} from "./memory-rag-schema-contracts";

export type SourceBridgeKind =
  | "current_info"
  | "document"
  | "career"
  | "research";

export type SourceBridgeRecordStatus =
  | "active"
  | "draft"
  | "reviewed"
  | "needs_review"
  | "archived"
  | "rejected"
  | "deleted"
  | "private";

export type SourceBridgeDecision =
  | "bridged"
  | "excluded_inactive"
  | "excluded_private"
  | "excluded_missing_text"
  | "excluded_low_confidence"
  | "excluded_unsupported_kind"
  | "excluded_runtime_deferred";

export type SourceBridgeContentFormat =
  | "plain_text"
  | "markdown"
  | "pdf_text_preview"
  | "email_text_preview"
  | "web_summary_preview"
  | "structured_note_preview";

export interface SourceBridgeRecord {
  id: string;
  user_id: string;
  bridge_kind: SourceBridgeKind;
  title: string;
  body: string;
  summary?: string | null;
  source_label?: string | null;
  source_uri?: string | null;
  source_title?: string | null;
  tags?: string[];
  status: SourceBridgeRecordStatus;
  content_format?: SourceBridgeContentFormat;
  domain_scope?: MemoryDomainScope | null;
  sensitivity?: MemorySensitivityLevel | null;
  confidence?: number | null;
  priority?: number | null;
  evidence_strength?: MemoryRagEvidenceStrength | null;
  source_reliability?: MemoryRagSourceReliability | null;
  source_type?: MemorySourceType | null;
  memory_type?: MemoryType | null;
  created_at?: string | null;
  updated_at?: string | null;
  last_confirmed_at?: string | null;
}

export interface SourceBridgeOptions extends MemoryRetrievalPlanOptions {
  include_drafts?: boolean;
  include_private?: boolean;
  include_archived?: boolean;
  min_confidence?: number;
  default_sensitivity?: MemorySensitivityLevel;
  default_reliability?: MemoryRagSourceReliability;
}

export interface SourceBridgeReason {
  code:
    | "source_bridge_preview"
    | "source_bridge_active"
    | "source_bridge_inactive"
    | "source_bridge_private"
    | "source_bridge_missing_text"
    | "source_bridge_low_confidence"
    | "source_bridge_unsupported_kind"
    | "source_bridge_converted_to_candidate"
    | "source_bridge_uses_phase_17i"
    | "runtime_retrieval_deferred"
    | "semantic_retrieval_deferred"
    | "visible_bridge_reason";
  message: string;
}

export interface SourceBridgeCandidatePreview {
  bridge_id: string;
  source_record_id: string;
  source_kind: SourceBridgeKind;
  decision: SourceBridgeDecision;
  included: boolean;
  candidate?: MemoryRetrievalCandidate;
  reasons: SourceBridgeReason[];
  warnings: string[];
  preview_only: true;
}

export interface SourceBridgeFamilySummary {
  source_kind: SourceBridgeKind;
  total: number;
  bridged: number;
  excluded: number;
}

export interface SourceBridgeRetrievalPreviewResult {
  phase: "17K";
  bridge: "current_info_document_career_research_source_bridges";
  runtime_side_effects_enabled: false;
  runtime_retrieval_enabled: false;
  semantic_retrieval_active: false;
  provider_calls_enabled: false;
  vector_search_enabled: false;
  sql_runtime_enabled: false;
  memory_retrieval_events_write_count: 0;
  total_records: number;
  bridged_count: number;
  excluded_count: number;
  family_summaries: SourceBridgeFamilySummary[];
  bridged_previews: SourceBridgeCandidatePreview[];
  retrieval_candidates: MemoryRetrievalCandidate[];
  retrieval_plan: MemoryRetrievalRankingBudgetDedupeResult;
  summary: string[];
  warnings: string[];
  boundary: typeof PHASE_17K_SOURCE_BRIDGES_BOUNDARY;
}

export const PHASE_17K_SOURCE_BRIDGES_BOUNDARY = {
  phase: "Phase 17K",
  name: "Current-Info / Document / Career / Research Source Bridges",
  deterministic_only: true,
  bridge_only: true,
  preview_only: true,
  source_bridge_layer: true,
  current_info_source_bridge: true,
  document_source_bridge: true,
  career_source_bridge: true,
  research_source_bridge: true,
  converts_source_records_to_retrieval_candidates: true,
  uses_phase_17i_retrieval_planning: true,
  bridged_source_candidates_remain_preview_only: true,
  visible_bridge_reasons: true,
  no_supabase_calls: true,
  no_repository_implementation: true,
  no_sql_reads_or_writes: true,
  no_runtime_retrieval: true,
  no_memory_retrieval_events_writes: true,
  no_embedding_generation: true,
  no_semantic_retrieval_activation: true,
  no_provider_calls: true,
  no_vector_search: true,
  no_carnos_prompt_injection: true,
  no_background_scanning: true,
  runtime_side_effects_enabled: false,
  memory_retrieval_events_write_count: 0,
  semantic_retrieval_active: false,
  next_phase: "Phase 17L — Carnos Memory Context Pack Builder",
  rules: [
    "Phase 17K — Current-Info / Document / Career / Research Source Bridges",
    "Current-Info / Document / Career / Research Source Bridges",
    "current-info source bridge",
    "document source bridge",
    "career source bridge",
    "research source bridge",
    "source records to retrieval candidates",
    "uses Phase 17I retrieval planning",
    "bridged source candidates remain preview-only",
    "visible bridge reasons",
    "No runtime retrieval",
    "No memory_retrieval_events writes",
    "No embedding generation",
    "No semantic retrieval activation",
    "No provider calls",
    "No vector search",
    "No Supabase calls",
    "No SQL reads or writes",
    "No Carnos prompt/context injection",
    "No background scanning",
  ],
} as const;

function clampScore(value: number | null | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(1, value));
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? "").trim().replace(/\s+/g, " ");
}

function hasUsefulBridgeText(record: SourceBridgeRecord): boolean {
  return normalizeText(record.title).length > 0 && normalizeText(record.body || record.summary).length > 0;
}

function isPrivateBridgeRecord(record: SourceBridgeRecord): boolean {
  return (
    record.status === "private" ||
    record.sensitivity === "restricted" ||
    record.sensitivity === "high"
  );
}

function isInactiveBridgeRecord(record: SourceBridgeRecord, options: SourceBridgeOptions): boolean {
  if (record.status === "active" || record.status === "reviewed") return false;
  if (record.status === "draft" && options.include_drafts) return false;
  if (record.status === "archived" && options.include_archived) return false;
  return true;
}

function mapBridgeDomain(record: SourceBridgeRecord): MemoryDomainScope {
  if (record.domain_scope) return record.domain_scope;
  if (record.bridge_kind === "career") return "career" as MemoryDomainScope;
  if (record.bridge_kind === "research") return "research" as MemoryDomainScope;
  if (record.bridge_kind === "document") return "global" as MemoryDomainScope;
  return "global" as MemoryDomainScope;
}

function mapBridgeMemoryStatus(record: SourceBridgeRecord): MemoryStatus {
  if (record.status === "active" || record.status === "reviewed") return "approved" as MemoryStatus;
  if (record.status === "draft" || record.status === "needs_review") return "needs_review" as MemoryStatus;
  if (record.status === "archived") return "archived" as MemoryStatus;
  if (record.status === "rejected") return "rejected" as MemoryStatus;
  if (record.status === "deleted") return "forgotten" as MemoryStatus;
  if (record.status === "private") return "locked" as MemoryStatus;
  return "needs_review" as MemoryStatus;
}

function mapBridgeSourceType(record: SourceBridgeRecord): MemorySourceType {
  if (record.source_type) return record.source_type;
  if (record.bridge_kind === "current_info") return "current_information" as MemorySourceType;
  if (record.bridge_kind === "document") return "document" as MemorySourceType;
  if (record.bridge_kind === "career") return "career_source" as MemorySourceType;
  if (record.bridge_kind === "research") return "research_source" as MemorySourceType;
  return "source_of_truth" as MemorySourceType;
}

function mapBridgeMemoryType(record: SourceBridgeRecord): MemoryType {
  if (record.memory_type) return record.memory_type;
  if (record.bridge_kind === "current_info") return "current_information_note" as MemoryType;
  if (record.bridge_kind === "document") return "document_note" as MemoryType;
  if (record.bridge_kind === "career") return "career_note" as MemoryType;
  if (record.bridge_kind === "research") return "research_note" as MemoryType;
  return "knowledge_note" as MemoryType;
}

function mapBridgeEvidenceStrength(record: SourceBridgeRecord): MemoryRagEvidenceStrength {
  if (record.evidence_strength) return record.evidence_strength;
  if (record.bridge_kind === "current_info") return "source_backed" as MemoryRagEvidenceStrength;
  if (record.bridge_kind === "document") return "source_backed" as MemoryRagEvidenceStrength;
  if (record.bridge_kind === "research") return "strong" as MemoryRagEvidenceStrength;
  return "medium" as MemoryRagEvidenceStrength;
}

function mapBridgeSourceReliability(record: SourceBridgeRecord, options: SourceBridgeOptions): MemoryRagSourceReliability {
  if (record.source_reliability) return record.source_reliability;
  if (options.default_reliability) return options.default_reliability;
  if (record.bridge_kind === "document") return "high" as MemoryRagSourceReliability;
  if (record.bridge_kind === "research") return "high" as MemoryRagSourceReliability;
  if (record.bridge_kind === "current_info") return "medium" as MemoryRagSourceReliability;
  return "medium" as MemoryRagSourceReliability;
}

function buildBridgeCandidateText(record: SourceBridgeRecord): string {
  const parts = [
    normalizeText(record.summary),
    normalizeText(record.body),
    record.tags && record.tags.length > 0 ? "Tags: " + record.tags.join(", ") : "",
    record.source_title ? "Source title: " + record.source_title : "",
    record.source_uri ? "Source reference: " + record.source_uri : "",
    record.content_format ? "Format: " + record.content_format : "",
  ].filter((part) => part.length > 0);
  return parts.join("\n\n");
}

function sourceBridgeWarnings(): string[] {
  return [
    "Phase 17K source bridges are preview-only.",
    "Runtime retrieval remains disabled.",
    "Semantic retrieval remains deferred.",
    "No memory_retrieval_events writes occur in Phase 17K.",
  ];
}

export function bridgeSourceRecordToRetrievalCandidate(
  record: SourceBridgeRecord,
  options: SourceBridgeOptions = {},
): SourceBridgeCandidatePreview {
  const reasons: SourceBridgeReason[] = [
    {
      code: "source_bridge_preview",
      message: "Phase 17K evaluates a source record as a retrieval-planning candidate preview.",
    },
  ];
  const warnings = sourceBridgeWarnings();

  if (!["current_info", "document", "career", "research"].includes(record.bridge_kind)) {
    return {
      bridge_id: "source-bridge:" + record.bridge_kind + ":" + record.id,
      source_record_id: record.id,
      source_kind: record.bridge_kind,
      decision: "excluded_unsupported_kind",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "source_bridge_unsupported_kind",
          message: "Source bridge kind is not supported by Phase 17K.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  if (!hasUsefulBridgeText(record)) {
    return {
      bridge_id: "source-bridge:" + record.bridge_kind + ":" + record.id,
      source_record_id: record.id,
      source_kind: record.bridge_kind,
      decision: "excluded_missing_text",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "source_bridge_missing_text",
          message: "Source record does not have enough title/body/summary text for retrieval planning.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  if (isPrivateBridgeRecord(record) && !options.include_private) {
    return {
      bridge_id: "source-bridge:" + record.bridge_kind + ":" + record.id,
      source_record_id: record.id,
      source_kind: record.bridge_kind,
      decision: "excluded_private",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "source_bridge_private",
          message: "Private or high-sensitivity source record is excluded by default.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  if (isInactiveBridgeRecord(record, options)) {
    return {
      bridge_id: "source-bridge:" + record.bridge_kind + ":" + record.id,
      source_record_id: record.id,
      source_kind: record.bridge_kind,
      decision: "excluded_inactive",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "source_bridge_inactive",
          message: "Inactive source record is excluded unless explicit bridge options allow it.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  const confidence = clampScore(record.confidence, 0.7);
  const minConfidence = clampScore(options.min_confidence, 0.1);

  if (confidence < minConfidence) {
    return {
      bridge_id: "source-bridge:" + record.bridge_kind + ":" + record.id,
      source_record_id: record.id,
      source_kind: record.bridge_kind,
      decision: "excluded_low_confidence",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "source_bridge_low_confidence",
          message: "Source record confidence is below the bridge minimum.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  const sensitivity = record.sensitivity ?? options.default_sensitivity ?? ("low" as MemorySensitivityLevel);

  const candidate: MemoryRetrievalCandidate = {
    id: "source:" + record.bridge_kind + ":" + record.id,
    user_id: record.user_id,
    kind: "source_bridge_preview",
    title: normalizeText(record.title),
    text: buildBridgeCandidateText(record),
    memory_type: mapBridgeMemoryType(record),
    status: mapBridgeMemoryStatus(record),
    domain_scope: mapBridgeDomain(record),
    sensitivity,
    source_type: mapBridgeSourceType(record),
    confidence,
    priority: record.priority ?? 45,
    evidence_strength: mapBridgeEvidenceStrength(record),
    source_reliability: mapBridgeSourceReliability(record, options),
    retrieval_enabled: true,
    semantic_retrieval_allowed: false,
    provider_status: "runtime_deferred" as MemoryRagProviderStatus,
    retrieval_mode: "preview_only" as MemoryRagRetrievalMode,
    staleness: "fresh" as MemoryStalenessState,
    conflict_severity: "none" as MemoryConflictSeverity,
    conflict_group_key: null,
    duplicate_of_memory_item_id: null,
    locked_at: null,
    locked_reason: null,
    superseded_by_memory_item_id: null,
    last_confirmed_at: record.last_confirmed_at ?? record.updated_at ?? record.created_at ?? null,
    review_after: null,
    created_at: record.created_at ?? null,
    updated_at: record.updated_at ?? null,
    source_label: record.source_label ?? "Source Bridge:" + record.bridge_kind + ":" + record.id,
  };

  return {
    bridge_id: "source-bridge:" + record.bridge_kind + ":" + record.id,
    source_record_id: record.id,
    source_kind: record.bridge_kind,
    decision: "bridged",
    included: true,
    candidate,
    reasons: [
      ...reasons,
      {
        code: "source_bridge_active",
        message: "Source record is eligible for preview bridge planning.",
      },
      {
        code: "source_bridge_converted_to_candidate",
        message: "Source record was converted into a Phase 17I retrieval candidate.",
      },
      {
        code: "source_bridge_uses_phase_17i",
        message: "Phase 17K reuses Phase 17I ranking, budget, and dedupe rules.",
      },
      {
        code: "runtime_retrieval_deferred",
        message: "Runtime retrieval remains disabled.",
      },
      {
        code: "semantic_retrieval_deferred",
        message: "Semantic retrieval remains deferred.",
      },
      {
        code: "visible_bridge_reason",
        message: "Bridge output exposes source id, bridge kind, decision, warnings, and preview candidate.",
      },
    ],
    warnings,
    preview_only: true,
  };
}

export function bridgeSourceRecordsToRetrievalCandidates(
  records: SourceBridgeRecord[],
  options: SourceBridgeOptions = {},
): SourceBridgeCandidatePreview[] {
  return records.map((record) => bridgeSourceRecordToRetrievalCandidate(record, options));
}

export function buildSourceBridgeRetrievalPreview(
  records: SourceBridgeRecord[],
  options: SourceBridgeOptions = {},
): SourceBridgeRetrievalPreviewResult {
  const bridgedPreviews = bridgeSourceRecordsToRetrievalCandidates(records, options);
  const retrievalCandidates = bridgedPreviews
    .filter((preview) => preview.included && preview.candidate)
    .map((preview) => preview.candidate as MemoryRetrievalCandidate);

  const retrievalPlan = planMemoryRetrievalRankingBudgetDedupe(retrievalCandidates, {
    ...options,
    allow_knowledge_items: true,
  });

  const familySummaries: SourceBridgeFamilySummary[] = ["current_info", "document", "career", "research"].map(
    (sourceKind) => {
      const relevant = bridgedPreviews.filter((preview) => preview.source_kind === sourceKind);
      const bridged = relevant.filter((preview) => preview.included).length;
      return {
        source_kind: sourceKind as SourceBridgeKind,
        total: relevant.length,
        bridged,
        excluded: relevant.length - bridged,
      };
    },
  );

  const summary = [
    "Phase 17K evaluated " + records.length + " source bridge records.",
    "Bridged " + retrievalCandidates.length + " source records into retrieval-planning candidates.",
    ...summarizeMemoryRetrievalPlan(retrievalPlan),
    "No runtime retrieval, memory_retrieval_events writes, embedding generation, semantic retrieval activation, provider calls, vector search, Supabase calls, SQL reads/writes, Carnos prompt/context injection, or background scanning occurred.",
  ];

  return {
    phase: "17K",
    bridge: "current_info_document_career_research_source_bridges",
    runtime_side_effects_enabled: false,
    runtime_retrieval_enabled: false,
    semantic_retrieval_active: false,
    provider_calls_enabled: false,
    vector_search_enabled: false,
    sql_runtime_enabled: false,
    memory_retrieval_events_write_count: 0,
    total_records: records.length,
    bridged_count: retrievalCandidates.length,
    excluded_count: bridgedPreviews.length - retrievalCandidates.length,
    family_summaries: familySummaries,
    bridged_previews: bridgedPreviews,
    retrieval_candidates: retrievalCandidates,
    retrieval_plan: retrievalPlan,
    summary,
    warnings: sourceBridgeWarnings(),
    boundary: PHASE_17K_SOURCE_BRIDGES_BOUNDARY,
  };
}

export function buildCurrentInfoSourceBridgePreview(
  records: SourceBridgeRecord[],
  options: SourceBridgeOptions = {},
): SourceBridgeRetrievalPreviewResult {
  return buildSourceBridgeRetrievalPreview(
    records.filter((record) => record.bridge_kind === "current_info"),
    options,
  );
}

export function buildDocumentSourceBridgePreview(
  records: SourceBridgeRecord[],
  options: SourceBridgeOptions = {},
): SourceBridgeRetrievalPreviewResult {
  return buildSourceBridgeRetrievalPreview(
    records.filter((record) => record.bridge_kind === "document"),
    options,
  );
}

export function buildCareerSourceBridgePreview(
  records: SourceBridgeRecord[],
  options: SourceBridgeOptions = {},
): SourceBridgeRetrievalPreviewResult {
  return buildSourceBridgeRetrievalPreview(
    records.filter((record) => record.bridge_kind === "career"),
    options,
  );
}

export function buildResearchSourceBridgePreview(
  records: SourceBridgeRecord[],
  options: SourceBridgeOptions = {},
): SourceBridgeRetrievalPreviewResult {
  return buildSourceBridgeRetrievalPreview(
    records.filter((record) => record.bridge_kind === "research"),
    options,
  );
}

export function summarizeSourceBridgeRetrievalPreview(result: SourceBridgeRetrievalPreviewResult): string[] {
  return result.summary;
}

export function getSourceBridgeRetrievalPreviewSummary(): typeof PHASE_17K_SOURCE_BRIDGES_BOUNDARY {
  return PHASE_17K_SOURCE_BRIDGES_BOUNDARY;
}

export const PHASE_17K_SOURCE_BRIDGES_AUDIT_MARKERS = [
  "Phase 17K — Current-Info / Document / Career / Research Source Bridges",
  "Current-Info / Document / Career / Research Source Bridges",
  "current-info source bridge",
  "document source bridge",
  "career source bridge",
  "research source bridge",
  "source records to retrieval candidates",
  "uses Phase 17I retrieval planning",
  "bridged source candidates remain preview-only",
  "visible bridge reasons",
  "No runtime retrieval",
  "No memory_retrieval_events writes",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
] as const;
