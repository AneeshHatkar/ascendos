/**
 * Phase 17J — Knowledge Vault Retrieval Bridge
 *
 * Deterministic bridge from Knowledge Vault records to Memory/RAG retrieval-planning candidates.
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
  MemoryDomainScope,
  MemorySensitivityLevel,
  MemorySourceType,
  MemoryStatus,
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

export type KnowledgeVaultBridgeRecordStatus =
  | "active"
  | "draft"
  | "archived"
  | "rejected"
  | "deleted"
  | "private"
  | "needs_review";

export type KnowledgeVaultBridgeSourceKind =
  | "knowledge_item"
  | "source_of_truth"
  | "document_note"
  | "research_note"
  | "career_note"
  | "learning_note"
  | "project_note"
  | "manual_note";

export type KnowledgeVaultBridgeDecision =
  | "bridged"
  | "excluded_inactive"
  | "excluded_private"
  | "excluded_missing_text"
  | "excluded_low_confidence"
  | "excluded_runtime_deferred";

export interface KnowledgeVaultBridgeItem {
  id: string;
  user_id: string;
  title: string;
  body: string;
  summary?: string | null;
  tags?: string[];
  status: KnowledgeVaultBridgeRecordStatus;
  source_kind: KnowledgeVaultBridgeSourceKind;
  domain_scope: MemoryDomainScope;
  sensitivity: MemorySensitivityLevel;
  confidence?: number | null;
  priority?: number | null;
  evidence_strength?: MemoryRagEvidenceStrength;
  source_reliability?: MemoryRagSourceReliability;
  source_label?: string | null;
  source_uri?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  last_confirmed_at?: string | null;
}

export interface KnowledgeVaultRetrievalBridgeOptions extends MemoryRetrievalPlanOptions {
  include_drafts?: boolean;
  include_private?: boolean;
  include_archived?: boolean;
  min_confidence?: number;
  default_domain_scope?: MemoryDomainScope;
  default_sensitivity?: MemorySensitivityLevel;
  default_memory_type?: MemoryType;
}

export interface KnowledgeVaultBridgeReason {
  code:
    | "knowledge_vault_retrieval_bridge"
    | "knowledge_item_active"
    | "knowledge_item_inactive"
    | "knowledge_item_private"
    | "knowledge_item_missing_text"
    | "knowledge_item_low_confidence"
    | "knowledge_item_bridged_as_candidate"
    | "runtime_retrieval_deferred"
    | "semantic_retrieval_deferred"
    | "visible_bridge_reason";
  message: string;
}

export interface KnowledgeVaultBridgedCandidate {
  bridge_id: string;
  source_item_id: string;
  decision: KnowledgeVaultBridgeDecision;
  included: boolean;
  candidate?: MemoryRetrievalCandidate;
  reasons: KnowledgeVaultBridgeReason[];
  warnings: string[];
  preview_only: true;
}

export interface KnowledgeVaultRetrievalBridgeResult {
  phase: "17J";
  bridge: "knowledge_vault_retrieval_bridge";
  runtime_side_effects_enabled: false;
  runtime_retrieval_enabled: false;
  semantic_retrieval_active: false;
  provider_calls_enabled: false;
  vector_search_enabled: false;
  sql_runtime_enabled: false;
  memory_retrieval_events_write_count: 0;
  total_items: number;
  bridged_count: number;
  excluded_count: number;
  bridged_candidates: KnowledgeVaultBridgedCandidate[];
  retrieval_candidates: MemoryRetrievalCandidate[];
  retrieval_plan: MemoryRetrievalRankingBudgetDedupeResult;
  summary: string[];
  warnings: string[];
  boundary: typeof PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_BOUNDARY;
}

export const PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_BOUNDARY = {
  phase: "Phase 17J",
  name: "Knowledge Vault Retrieval Bridge",
  deterministic_only: true,
  bridge_only: true,
  preview_only: true,
  knowledge_vault_bridge: true,
  converts_knowledge_items_to_retrieval_candidates: true,
  uses_phase_17i_retrieval_planning: true,
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
  next_phase: "Phase 17K — Current-Info / Document / Career / Research Source Bridges",
  rules: [
    "Phase 17J — Knowledge Vault Retrieval Bridge",
    "Knowledge Vault Retrieval Bridge",
    "knowledge vault to retrieval candidate bridge",
    "knowledge item bridge preview",
    "non-personal knowledge retrieval bridge",
    "uses Phase 17I retrieval planning",
    "bridged knowledge candidates remain preview-only",
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

function hasUsefulText(item: KnowledgeVaultBridgeItem): boolean {
  return normalizeText(item.title).length > 0 && normalizeText(item.body || item.summary).length > 0;
}

function isPrivateKnowledgeItem(item: KnowledgeVaultBridgeItem): boolean {
  return item.status === "private" || item.sensitivity === "restricted" || item.sensitivity === "high";
}

function isInactiveKnowledgeItem(item: KnowledgeVaultBridgeItem, options: KnowledgeVaultRetrievalBridgeOptions): boolean {
  if (item.status === "active") return false;
  if (item.status === "draft" && options.include_drafts) return false;
  if (item.status === "archived" && options.include_archived) return false;
  return true;
}

function mapKnowledgeStatusToMemoryStatus(item: KnowledgeVaultBridgeItem): MemoryStatus {
  if (item.status === "active") return "approved" as MemoryStatus;
  if (item.status === "draft" || item.status === "needs_review") return "needs_review" as MemoryStatus;
  if (item.status === "archived") return "archived" as MemoryStatus;
  if (item.status === "rejected") return "rejected" as MemoryStatus;
  if (item.status === "deleted") return "forgotten" as MemoryStatus;
  if (item.status === "private") return "locked" as MemoryStatus;
  return "needs_review" as MemoryStatus;
}

function mapKnowledgeSourceType(item: KnowledgeVaultBridgeItem): MemorySourceType {
  if (item.source_kind === "source_of_truth") return "source_of_truth" as MemorySourceType;
  if (item.source_kind === "manual_note") return "manual_user_entry" as MemorySourceType;
  if (item.source_kind === "project_note") return "project_log" as MemorySourceType;
  return "knowledge_vault" as MemorySourceType;
}

function mapKnowledgeMemoryType(item: KnowledgeVaultBridgeItem, options: KnowledgeVaultRetrievalBridgeOptions): MemoryType {
  if (options.default_memory_type) return options.default_memory_type;
  if (item.source_kind === "source_of_truth") return "source_of_truth_note" as MemoryType;
  if (item.source_kind === "research_note") return "research_note" as MemoryType;
  if (item.source_kind === "career_note") return "career_note" as MemoryType;
  if (item.source_kind === "learning_note") return "learning_note" as MemoryType;
  if (item.source_kind === "project_note") return "project_note" as MemoryType;
  return "knowledge_note" as MemoryType;
}

function buildKnowledgeCandidateText(item: KnowledgeVaultBridgeItem): string {
  const parts = [
    normalizeText(item.summary),
    normalizeText(item.body),
    item.tags && item.tags.length > 0 ? "Tags: " + item.tags.join(", ") : "",
    item.source_uri ? "Source: " + item.source_uri : "",
  ].filter((part) => part.length > 0);
  return parts.join("\n\n");
}

export function bridgeKnowledgeVaultItemToRetrievalCandidate(
  item: KnowledgeVaultBridgeItem,
  options: KnowledgeVaultRetrievalBridgeOptions = {},
): KnowledgeVaultBridgedCandidate {
  const reasons: KnowledgeVaultBridgeReason[] = [
    {
      code: "knowledge_vault_retrieval_bridge",
      message: "Phase 17J evaluates a Knowledge Vault item as a retrieval-planning candidate.",
    },
  ];
  const warnings: string[] = [
    "Knowledge Vault bridge is preview-only and performs no runtime retrieval.",
    "Semantic retrieval remains deferred.",
  ];

  if (!hasUsefulText(item)) {
    return {
      bridge_id: "knowledge-bridge:" + item.id,
      source_item_id: item.id,
      decision: "excluded_missing_text",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "knowledge_item_missing_text",
          message: "Knowledge item does not have enough title/body/summary text for retrieval planning.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  if (isPrivateKnowledgeItem(item) && !options.include_private) {
    return {
      bridge_id: "knowledge-bridge:" + item.id,
      source_item_id: item.id,
      decision: "excluded_private",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "knowledge_item_private",
          message: "Private or high-sensitivity knowledge item is excluded by default.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  if (isInactiveKnowledgeItem(item, options)) {
    return {
      bridge_id: "knowledge-bridge:" + item.id,
      source_item_id: item.id,
      decision: "excluded_inactive",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "knowledge_item_inactive",
          message: "Inactive knowledge item is excluded unless explicit bridge options allow it.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  const confidence = clampScore(item.confidence, 0.74);
  const minConfidence = clampScore(options.min_confidence, 0.1);

  if (confidence < minConfidence) {
    return {
      bridge_id: "knowledge-bridge:" + item.id,
      source_item_id: item.id,
      decision: "excluded_low_confidence",
      included: false,
      reasons: [
        ...reasons,
        {
          code: "knowledge_item_low_confidence",
          message: "Knowledge item confidence is below the bridge minimum.",
        },
      ],
      warnings,
      preview_only: true,
    };
  }

  const candidate: MemoryRetrievalCandidate = {
    id: "knowledge:" + item.id,
    user_id: item.user_id,
    kind: "knowledge_item",
    title: normalizeText(item.title),
    text: buildKnowledgeCandidateText(item),
    memory_type: mapKnowledgeMemoryType(item, options),
    status: mapKnowledgeStatusToMemoryStatus(item),
    domain_scope: item.domain_scope ?? options.default_domain_scope ?? ("global" as MemoryDomainScope),
    sensitivity: item.sensitivity ?? options.default_sensitivity ?? ("low" as MemorySensitivityLevel),
    source_type: mapKnowledgeSourceType(item),
    confidence,
    priority: item.priority ?? 50,
    evidence_strength: item.evidence_strength ?? ("source_backed" as MemoryRagEvidenceStrength),
    source_reliability: item.source_reliability ?? ("medium" as MemoryRagSourceReliability),
    retrieval_enabled: true,
    semantic_retrieval_allowed: false,
    provider_status: "runtime_deferred" as MemoryRagProviderStatus,
    retrieval_mode: "preview_only" as MemoryRagRetrievalMode,
    staleness: "fresh",
    conflict_severity: "none",
    conflict_group_key: null,
    duplicate_of_memory_item_id: null,
    locked_at: null,
    locked_reason: null,
    superseded_by_memory_item_id: null,
    last_confirmed_at: item.last_confirmed_at ?? item.updated_at ?? item.created_at ?? null,
    review_after: null,
    created_at: item.created_at ?? null,
    updated_at: item.updated_at ?? null,
    source_label: item.source_label ?? "Knowledge Vault:" + item.source_kind + ":" + item.id,
  };

  return {
    bridge_id: "knowledge-bridge:" + item.id,
    source_item_id: item.id,
    decision: "bridged",
    included: true,
    candidate,
    reasons: [
      ...reasons,
      {
        code: "knowledge_item_active",
        message: "Knowledge item is eligible for preview bridge planning.",
      },
      {
        code: "knowledge_item_bridged_as_candidate",
        message: "Knowledge item was bridged into a Phase 17I retrieval candidate.",
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
        message: "Bridge output exposes the source item id, bridge decision, warnings, and candidate preview.",
      },
    ],
    warnings,
    preview_only: true,
  };
}

export function bridgeKnowledgeVaultItemsToRetrievalCandidates(
  items: KnowledgeVaultBridgeItem[],
  options: KnowledgeVaultRetrievalBridgeOptions = {},
): KnowledgeVaultBridgedCandidate[] {
  return items.map((item) => bridgeKnowledgeVaultItemToRetrievalCandidate(item, options));
}

export function buildKnowledgeVaultRetrievalBridge(
  items: KnowledgeVaultBridgeItem[],
  options: KnowledgeVaultRetrievalBridgeOptions = {},
): KnowledgeVaultRetrievalBridgeResult {
  const bridgedCandidates = bridgeKnowledgeVaultItemsToRetrievalCandidates(items, options);
  const retrievalCandidates = bridgedCandidates
    .filter((candidate) => candidate.included && candidate.candidate)
    .map((candidate) => candidate.candidate as MemoryRetrievalCandidate);

  const retrievalPlan = planMemoryRetrievalRankingBudgetDedupe(retrievalCandidates, {
    ...options,
    allow_knowledge_items: true,
  });

  const summary = [
    "Phase 17J evaluated " + items.length + " Knowledge Vault items.",
    "Bridged " + retrievalCandidates.length + " Knowledge Vault items into retrieval-planning candidates.",
    ...summarizeMemoryRetrievalPlan(retrievalPlan),
    "No runtime retrieval, memory_retrieval_events writes, embedding generation, semantic retrieval activation, provider calls, vector search, Supabase calls, SQL reads/writes, Carnos prompt/context injection, or background scanning occurred.",
  ];

  return {
    phase: "17J",
    bridge: "knowledge_vault_retrieval_bridge",
    runtime_side_effects_enabled: false,
    runtime_retrieval_enabled: false,
    semantic_retrieval_active: false,
    provider_calls_enabled: false,
    vector_search_enabled: false,
    sql_runtime_enabled: false,
    memory_retrieval_events_write_count: 0,
    total_items: items.length,
    bridged_count: retrievalCandidates.length,
    excluded_count: bridgedCandidates.length - retrievalCandidates.length,
    bridged_candidates: bridgedCandidates,
    retrieval_candidates: retrievalCandidates,
    retrieval_plan: retrievalPlan,
    summary,
    warnings: [
      "Knowledge Vault Retrieval Bridge is preview-only.",
      "Runtime retrieval remains disabled.",
      "Semantic retrieval remains deferred.",
      "No memory_retrieval_events writes occur in Phase 17J.",
    ],
    boundary: PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_BOUNDARY,
  };
}

export function summarizeKnowledgeVaultRetrievalBridge(result: KnowledgeVaultRetrievalBridgeResult): string[] {
  return result.summary;
}

export function getKnowledgeVaultRetrievalBridgeSummary(): typeof PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_BOUNDARY {
  return PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_BOUNDARY;
}

export const PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_AUDIT_MARKERS = [
  "Phase 17J — Knowledge Vault Retrieval Bridge",
  "Knowledge Vault Retrieval Bridge",
  "knowledge vault to retrieval candidate bridge",
  "knowledge item bridge preview",
  "non-personal knowledge retrieval bridge",
  "uses Phase 17I retrieval planning",
  "bridged knowledge candidates remain preview-only",
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
