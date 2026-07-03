/**
 * Phase 17I — Retrieval Ranking + Budget + Dedupe Rules
 *
 * Deterministic Memory/RAG retrieval planning rules.
 *
 * Boundary:
 * - Pure TypeScript planning only.
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

import { getSourceAuthorityRank, isBlockedMemoryStatus } from "./memory-conflict-rules";
import type {
  MemoryConflictSeverity,
  MemoryDomainScope,
  MemorySensitivityLevel,
  MemorySourceAuthority,
  MemorySourceType,
  MemoryStatus,
  MemoryStalenessState,
  MemoryType,
} from "./memory-enums";
import { scoreMemoryTrust } from "./memory-provenance-confidence-conflict-engine";
import type { MemoryTrustInput, MemoryTrustScore } from "./memory-provenance-confidence-conflict-engine";
import type {
  MemoryRagEvidenceStrength,
  MemoryRagProviderStatus,
  MemoryRagRetrievalMode,
  MemoryRagSourceReliability,
} from "./memory-rag-schema-contracts";

export type MemoryRetrievalPlanningSurface =
  | "command"
  | "carnos"
  | "knowledge"
  | "career"
  | "learning"
  | "research"
  | "health_body"
  | "life_admin"
  | "grimoire"
  | "project"
  | "system_preview";

export type MemoryRetrievalCandidateKind =
  | "approved_memory"
  | "knowledge_item"
  | "source_bridge_preview"
  | "context_pack_reference";

export type MemoryRetrievalPlanDecision =
  | "included"
  | "excluded_not_approved"
  | "excluded_retrieval_disabled"
  | "excluded_sensitive_default"
  | "excluded_locked"
  | "excluded_conflict"
  | "excluded_stale"
  | "excluded_low_score"
  | "excluded_duplicate"
  | "excluded_budget_count"
  | "excluded_budget_tokens"
  | "excluded_runtime_deferred";

export type MemoryRetrievalPlanReasonCode =
  | "approved_only_retrieval_planning"
  | "budget_bounded_retrieval_planning"
  | "deduped_retrieval_planning"
  | "retrieval_enabled"
  | "semantic_retrieval_deferred"
  | "keyword_domain_scoring"
  | "source_authority_scoring"
  | "trust_scoring_integration"
  | "confidence_evidence_reliability_scoring"
  | "freshness_staleness_handling"
  | "sensitive_memory_exclusion_by_default"
  | "conflict_exclusion_by_default"
  | "visible_inclusion_reason"
  | "visible_exclusion_reason"
  | "dedupe_exact_key"
  | "dedupe_duplicate_reference"
  | "budget_item_limit"
  | "budget_token_limit";

export interface MemoryRetrievalRankingWeights {
  trust_weight: number;
  keyword_domain_weight: number;
  source_authority_weight: number;
  confidence_weight: number;
  evidence_weight: number;
  reliability_weight: number;
  freshness_weight: number;
  priority_weight: number;
  sensitive_penalty: number;
  conflict_penalty: number;
  stale_penalty: number;
  semantic_deferred_penalty: number;
}

export interface MemoryRetrievalBudget {
  max_items: number;
  max_estimated_tokens: number;
  min_score: number;
}

export interface MemoryRetrievalPlanOptions {
  surface?: MemoryRetrievalPlanningSurface;
  active_route?: MemoryDomainScope;
  query?: string;
  include_sensitive?: boolean;
  include_locked?: boolean;
  include_conflicts?: boolean;
  include_stale?: boolean;
  allow_knowledge_items?: boolean;
  budget?: Partial<MemoryRetrievalBudget>;
  weights?: Partial<MemoryRetrievalRankingWeights>;
}

export interface MemoryRetrievalCandidate {
  id: string;
  user_id: string;
  kind: MemoryRetrievalCandidateKind;
  title: string;
  text: string;
  memory_type: MemoryType;
  status: MemoryStatus;
  domain_scope: MemoryDomainScope;
  sensitivity: MemorySensitivityLevel;
  source_type: MemorySourceType;
  confidence: number;
  priority: number;
  evidence_strength: MemoryRagEvidenceStrength;
  source_reliability: MemoryRagSourceReliability;
  retrieval_enabled: boolean;
  semantic_retrieval_allowed: boolean;
  provider_status?: MemoryRagProviderStatus;
  retrieval_mode?: MemoryRagRetrievalMode;
  staleness?: MemoryStalenessState;
  conflict_severity?: MemoryConflictSeverity;
  conflict_group_key?: string | null;
  duplicate_of_memory_item_id?: string | null;
  locked_at?: string | null;
  locked_reason?: string | null;
  superseded_by_memory_item_id?: string | null;
  last_confirmed_at?: string | null;
  review_after?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  source_label?: string;
}

export interface MemoryRetrievalPlanReason {
  code: MemoryRetrievalPlanReasonCode;
  message: string;
  score_delta?: number;
}

export interface MemoryRetrievalRankedCandidate {
  id: string;
  user_id: string;
  kind: MemoryRetrievalCandidateKind;
  title: string;
  content_preview: string;
  domain_scope: MemoryDomainScope;
  decision: MemoryRetrievalPlanDecision;
  included: boolean;
  final_score: number;
  estimated_tokens: number;
  dedupe_key: string;
  duplicate_of_id?: string;
  source_authority_rank: number;
  trust_score: MemoryTrustScore;
  retrieval_mode: MemoryRagRetrievalMode;
  provider_status: MemoryRagProviderStatus;
  reasons: MemoryRetrievalPlanReason[];
  warnings: string[];
  visible_source_label: string;
  preview_only: true;
}

export interface MemoryRetrievalBudgetUsage {
  max_items: number;
  used_items: number;
  max_estimated_tokens: number;
  used_estimated_tokens: number;
  over_item_budget: boolean;
  over_token_budget: boolean;
  notes: string[];
}

export interface MemoryRetrievalDedupeSummary {
  input_count: number;
  unique_count: number;
  duplicate_count: number;
  duplicate_ids: string[];
  dedupe_keys: string[];
}

export interface MemoryRetrievalRankingBudgetDedupeResult {
  phase: "17I";
  planner: "retrieval_ranking_budget_dedupe";
  runtime_side_effects_enabled: false;
  runtime_retrieval_enabled: false;
  semantic_retrieval_active: false;
  provider_calls_enabled: false;
  vector_search_enabled: false;
  sql_runtime_enabled: false;
  total_candidates: number;
  included_count: number;
  excluded_count: number;
  ranked_candidates: MemoryRetrievalRankedCandidate[];
  included_candidates: MemoryRetrievalRankedCandidate[];
  excluded_candidates: MemoryRetrievalRankedCandidate[];
  budget_usage: MemoryRetrievalBudgetUsage;
  dedupe_summary: MemoryRetrievalDedupeSummary;
  warnings: string[];
  boundary: typeof PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_BOUNDARY;
}

export const DEFAULT_MEMORY_RETRIEVAL_RANKING_WEIGHTS: MemoryRetrievalRankingWeights = {
  trust_weight: 0.24,
  keyword_domain_weight: 0.18,
  source_authority_weight: 0.12,
  confidence_weight: 0.08,
  evidence_weight: 0.07,
  reliability_weight: 0.06,
  freshness_weight: 0.05,
  priority_weight: 0.06,
  sensitive_penalty: 0.22,
  conflict_penalty: 0.24,
  stale_penalty: 0.18,
  semantic_deferred_penalty: 0.04,
};

export const DEFAULT_MEMORY_RETRIEVAL_BUDGET: MemoryRetrievalBudget = {
  max_items: 8,
  max_estimated_tokens: 1200,
  min_score: 0.08,
};

export const PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_BOUNDARY = {
  phase: "Phase 17I",
  name: "Retrieval Ranking + Budget + Dedupe Rules",
  deterministic_only: true,
  planning_only: true,
  approved_only_retrieval_planning: true,
  budget_bounded_retrieval_planning: true,
  deduped_retrieval_planning: true,
  no_supabase_calls: true,
  no_repository_implementation: true,
  no_sql_reads_or_writes: true,
  no_runtime_retrieval: true,
  no_memory_retrieval_events_writes: true,
  memory_retrieval_events_write_count: 0,
  no_embedding_generation: true,
  no_semantic_retrieval_activation: true,
  no_provider_calls: true,
  no_vector_search: true,
  no_carnos_prompt_injection: true,
  no_background_scanning: true,
  runtime_side_effects_enabled: false,
  next_phase: "Phase 17J — Knowledge Vault Retrieval Bridge",
  rules: [
    "Phase 17I — Retrieval Ranking + Budget + Dedupe Rules",
    "Retrieval Ranking + Budget + Dedupe Rules",
    "approved-only retrieval planning",
    "budget-bounded retrieval planning",
    "deduped retrieval planning",
    "source authority scoring",
    "trust scoring integration",
    "keyword/domain scoring",
    "confidence/evidence/reliability scoring",
    "freshness/staleness handling",
    "sensitive memory exclusion by default",
    "conflict exclusion by default",
    "visible inclusion/exclusion reasons",
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

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function normalizeText(value: string | undefined | null): string {
  return (value ?? "").toLowerCase().trim().replace(/\s+/g, " ");
}

function tokenize(value: string | undefined): Set<string> {
  return new Set(
    normalizeText(value)
      .split(/[^a-z0-9_+-]+/i)
      .map((item) => item.trim())
      .filter((item) => item.length >= 3),
  );
}

function estimateTokens(value: string): number {
  const normalized = value.trim();
  if (!normalized) return 0;
  const words = normalized.split(/\s+/).filter(Boolean).length;
  const charEstimate = Math.ceil(normalized.length / 4);
  return Math.max(words, charEstimate);
}

function trimPreview(value: string): string {
  const trimmed = value.trim();
  return trimmed.length <= 240 ? trimmed : `${trimmed.slice(0, 237)}...`;
}

function mergeWeights(weights?: Partial<MemoryRetrievalRankingWeights>): MemoryRetrievalRankingWeights {
  return { ...DEFAULT_MEMORY_RETRIEVAL_RANKING_WEIGHTS, ...(weights ?? {}) };
}

function mergeBudget(budget?: Partial<MemoryRetrievalBudget>): MemoryRetrievalBudget {
  return { ...DEFAULT_MEMORY_RETRIEVAL_BUDGET, ...(budget ?? {}) };
}

function keywordDomainScore(candidate: MemoryRetrievalCandidate, options: MemoryRetrievalPlanOptions): number {
  const queryTokens = tokenize(options.query);
  const haystackTokens = tokenize(`${candidate.title} ${candidate.text} ${candidate.memory_type} ${candidate.domain_scope}`);
  let keyword = 0;

  if (queryTokens.size > 0 && haystackTokens.size > 0) {
    let matched = 0;
    for (const token of queryTokens) {
      if (haystackTokens.has(token)) matched += 1;
    }
    keyword = matched / queryTokens.size;
  }

  let domain = 0.65;
  if (options.active_route) {
    domain = candidate.domain_scope === options.active_route ? 1 : candidate.domain_scope === "global" ? 0.82 : 0;
  }

  return clampScore((keyword + domain) / 2);
}

function sourceAuthorityScore(sourceType: MemorySourceType): { rank: number; score: number } {
  const rank = getSourceAuthorityRank(sourceType as MemorySourceAuthority);
  if (rank === Number.MAX_SAFE_INTEGER) return { rank, score: 0.2 };
  return { rank, score: clampScore(1 - rank / 12) };
}

function evidenceScore(evidence: MemoryRagEvidenceStrength): number {
  if (evidence === "user_confirmed") return 1;
  if (evidence === "source_backed") return 0.88;
  if (evidence === "strong") return 0.7;
  if (evidence === "medium") return 0.45;
  return 0.2;
}

function reliabilityScore(reliability: MemoryRagSourceReliability): number {
  if (reliability === "source_of_truth") return 1;
  if (reliability === "high") return 0.78;
  if (reliability === "medium") return 0.55;
  if (reliability === "low") return 0.2;
  return 0.35;
}

function freshnessScore(candidate: MemoryRetrievalCandidate): number {
  if (candidate.staleness === "fresh") return 1;
  if (candidate.staleness === "aging") return 0.72;
  if (candidate.staleness === "stale") return 0.28;
  if (candidate.staleness === "needs_reconfirmation") return 0.12;

  const dateText = candidate.last_confirmed_at ?? candidate.updated_at ?? candidate.created_at;
  if (!dateText) return 0.45;

  const timestamp = Date.parse(dateText);
  if (Number.isNaN(timestamp)) return 0.45;

  const ageDays = Math.max(0, (Date.now() - timestamp) / 86400000);
  if (ageDays <= 14) return 1;
  if (ageDays <= 60) return 0.82;
  if (ageDays <= 180) return 0.62;
  if (ageDays <= 365) return 0.42;
  return 0.22;
}

function isApprovedCandidate(candidate: MemoryRetrievalCandidate): boolean {
  return candidate.kind === "approved_memory" && (candidate.status === "approved" || candidate.status === "edited");
}

function isSensitiveByDefault(candidate: MemoryRetrievalCandidate): boolean {
  return candidate.sensitivity === "high" || candidate.sensitivity === "restricted";
}

function isConflictByDefault(candidate: MemoryRetrievalCandidate): boolean {
  return candidate.conflict_severity === "high" || candidate.conflict_severity === "blocking" || Boolean(candidate.conflict_group_key);
}

function isStaleByDefault(candidate: MemoryRetrievalCandidate): boolean {
  return candidate.status === "stale" || candidate.status === "needs_review" || candidate.staleness === "stale" || candidate.staleness === "needs_reconfirmation";
}

function buildDedupeKey(candidate: MemoryRetrievalCandidate): string {
  return [
    candidate.user_id,
    candidate.kind,
    candidate.memory_type,
    candidate.domain_scope,
    normalizeText(candidate.title).slice(0, 80),
    normalizeText(candidate.text).slice(0, 160),
  ].join("::");
}

function toTrustInput(candidate: MemoryRetrievalCandidate): MemoryTrustInput {
  return {
    id: candidate.id,
    user_id: candidate.user_id,
    memory_type: candidate.memory_type,
    status: candidate.status,
    text: candidate.text,
    sensitivity: candidate.sensitivity,
    confidence: candidate.confidence,
    priority: candidate.priority,
    source_type: candidate.source_type,
    evidence_strength: candidate.evidence_strength,
    source_reliability: candidate.source_reliability,
    conflict_group_key: candidate.conflict_group_key,
    duplicate_of_memory_item_id: candidate.duplicate_of_memory_item_id,
    superseded_by_memory_item_id: candidate.superseded_by_memory_item_id,
    conflict_state: candidate.conflict_severity,
    stale_state: candidate.staleness,
    review_state: candidate.status === "needs_review" ? "needs_review" : null,
    last_confirmed_at: candidate.last_confirmed_at,
    review_after: candidate.review_after,
    created_at: candidate.created_at,
    updated_at: candidate.updated_at,
  };
}

function exclusionDecision(candidate: MemoryRetrievalCandidate, options: MemoryRetrievalPlanOptions): MemoryRetrievalPlanDecision | undefined {
  if (!isApprovedCandidate(candidate) && !(candidate.kind === "knowledge_item" && options.allow_knowledge_items)) return "excluded_not_approved";
  if (isBlockedMemoryStatus(candidate.status)) return "excluded_not_approved";
  if (!candidate.retrieval_enabled) return "excluded_retrieval_disabled";
  if (candidate.locked_at && !options.include_locked) return "excluded_locked";
  if (isSensitiveByDefault(candidate) && !options.include_sensitive) return "excluded_sensitive_default";
  if (isConflictByDefault(candidate) && !options.include_conflicts) return "excluded_conflict";
  if (isStaleByDefault(candidate) && !options.include_stale) return "excluded_stale";
  return undefined;
}

function rankCandidate(candidate: MemoryRetrievalCandidate, options: MemoryRetrievalPlanOptions): MemoryRetrievalRankedCandidate {
  const weights = mergeWeights(options.weights);
  const source = sourceAuthorityScore(candidate.source_type);
  const trust = scoreMemoryTrust(toTrustInput(candidate));
  const keywordDomain = keywordDomainScore(candidate, options);
  const confidence = clampScore(candidate.confidence);
  const evidence = evidenceScore(candidate.evidence_strength);
  const reliability = reliabilityScore(candidate.source_reliability);
  const freshness = freshnessScore(candidate);
  const priority = clampScore(candidate.priority / 100);

  let score =
    trust.trust_score * weights.trust_weight +
    keywordDomain * weights.keyword_domain_weight +
    source.score * weights.source_authority_weight +
    confidence * weights.confidence_weight +
    evidence * weights.evidence_weight +
    reliability * weights.reliability_weight +
    freshness * weights.freshness_weight +
    priority * weights.priority_weight;

  const reasons: MemoryRetrievalPlanReason[] = [
    { code: "approved_only_retrieval_planning", message: "Approved-only retrieval planning is enforced." },
    { code: "budget_bounded_retrieval_planning", message: "Budget-bounded retrieval planning is enforced." },
    { code: "deduped_retrieval_planning", message: "Dedupe rules are enforced." },
    { code: "trust_scoring_integration", message: `Trust score contributes ${trust.trust_score}.` },
    { code: "keyword_domain_scoring", message: `Keyword/domain scoring contributes ${keywordDomain.toFixed(2)}.` },
    { code: "source_authority_scoring", message: `Source authority rank is ${source.rank}.` },
    { code: "confidence_evidence_reliability_scoring", message: "Confidence/evidence/reliability scoring is visible." },
    { code: "freshness_staleness_handling", message: `Freshness/staleness score is ${freshness.toFixed(2)}.` },
  ];

  const warnings: string[] = [...trust.warnings];

  if (isSensitiveByDefault(candidate)) {
    score -= weights.sensitive_penalty;
    reasons.push({ code: "sensitive_memory_exclusion_by_default", message: "Sensitive memory penalty/default exclusion applies." });
  }

  if (isConflictByDefault(candidate)) {
    score -= weights.conflict_penalty;
    reasons.push({ code: "conflict_exclusion_by_default", message: "Conflict penalty/default exclusion applies." });
  }

  if (isStaleByDefault(candidate)) {
    score -= weights.stale_penalty;
    reasons.push({ code: "freshness_staleness_handling", message: "Stale memory penalty/default exclusion applies." });
  }

  if (!candidate.semantic_retrieval_allowed || candidate.provider_status === "runtime_deferred") {
    score -= weights.semantic_deferred_penalty;
    warnings.push("Semantic retrieval remains deferred; deterministic planning only.");
    reasons.push({ code: "semantic_retrieval_deferred", message: "No semantic retrieval activation is allowed in Phase 17I." });
  }

  const forcedDecision = exclusionDecision(candidate, options);
  const finalScore = clampScore(score);
  const budget = mergeBudget(options.budget);
  const decision = forcedDecision ?? (finalScore < budget.min_score ? "excluded_low_score" : "included");

  reasons.push({
    code: decision === "included" ? "visible_inclusion_reason" : "visible_exclusion_reason",
    message: decision === "included" ? "Candidate is included in the retrieval plan preview." : `Candidate is excluded: ${decision}.`,
  });

  return {
    id: candidate.id,
    user_id: candidate.user_id,
    kind: candidate.kind,
    title: candidate.title,
    content_preview: trimPreview(candidate.text),
    domain_scope: candidate.domain_scope,
    decision,
    included: decision === "included",
    final_score: decision === "included" ? Number(finalScore.toFixed(4)) : 0,
    estimated_tokens: estimateTokens(`${candidate.title} ${candidate.text}`),
    dedupe_key: buildDedupeKey(candidate),
    duplicate_of_id: candidate.duplicate_of_memory_item_id ?? undefined,
    source_authority_rank: source.rank,
    trust_score: trust,
    retrieval_mode: candidate.retrieval_mode ?? "preview_only",
    provider_status: candidate.provider_status ?? "runtime_deferred",
    reasons,
    warnings,
    visible_source_label: candidate.source_label ?? `${candidate.source_type}:${candidate.id}`,
    preview_only: true,
  };
}

function applyDedupe(ranked: MemoryRetrievalRankedCandidate[]): { ranked: MemoryRetrievalRankedCandidate[]; summary: MemoryRetrievalDedupeSummary } {
  const seen = new Map<string, MemoryRetrievalRankedCandidate>();
  const duplicateIds: string[] = [];
  const dedupeKeys: string[] = [];

  const out: MemoryRetrievalRankedCandidate[] = ranked.map((candidate): MemoryRetrievalRankedCandidate => {
    const duplicate = candidate.duplicate_of_id || seen.has(candidate.dedupe_key);
    if (duplicate) {
      duplicateIds.push(candidate.id);
      dedupeKeys.push(candidate.dedupe_key);
      return {
        ...candidate,
        decision: "excluded_duplicate" as const,
        included: false,
        final_score: 0,
        reasons: [
          ...candidate.reasons,
          {
            code: candidate.duplicate_of_id ? "dedupe_duplicate_reference" : "dedupe_exact_key",
            message: "Candidate was removed by deterministic dedupe rules.",
          } satisfies MemoryRetrievalPlanReason,
        ],
      };
    }

    seen.set(candidate.dedupe_key, candidate);
    return candidate;
  });

  return {
    ranked: out,
    summary: {
      input_count: ranked.length,
      unique_count: seen.size,
      duplicate_count: duplicateIds.length,
      duplicate_ids: duplicateIds,
      dedupe_keys: [...new Set(dedupeKeys)],
    },
  };
}

function applyBudget(ranked: MemoryRetrievalRankedCandidate[], budget: MemoryRetrievalBudget): { ranked: MemoryRetrievalRankedCandidate[]; usage: MemoryRetrievalBudgetUsage } {
  let usedItems = 0;
  let usedTokens = 0;
  const notes: string[] = [];

  const out: MemoryRetrievalRankedCandidate[] = ranked.map((candidate): MemoryRetrievalRankedCandidate => {
    if (!candidate.included) return candidate;

    if (usedItems >= budget.max_items) {
      notes.push(`Excluded ${candidate.id} because item budget was reached.`);
      return {
        ...candidate,
        decision: "excluded_budget_count" as const,
        included: false,
        final_score: 0,
        reasons: [...candidate.reasons, { code: "budget_item_limit" as const, message: "Retrieval item budget was reached." }],
      };
    }

    if (usedTokens + candidate.estimated_tokens > budget.max_estimated_tokens) {
      notes.push(`Excluded ${candidate.id} because token budget was reached.`);
      return {
        ...candidate,
        decision: "excluded_budget_tokens" as const,
        included: false,
        final_score: 0,
        reasons: [...candidate.reasons, { code: "budget_token_limit" as const, message: "Retrieval token budget was reached." }],
      };
    }

    usedItems += 1;
    usedTokens += candidate.estimated_tokens;
    return candidate;
  });

  return {
    ranked: out,
    usage: {
      max_items: budget.max_items,
      used_items: usedItems,
      max_estimated_tokens: budget.max_estimated_tokens,
      used_estimated_tokens: usedTokens,
      over_item_budget: usedItems > budget.max_items,
      over_token_budget: usedTokens > budget.max_estimated_tokens,
      notes: notes.length > 0 ? notes : ["Retrieval plan fits within deterministic budget."],
    },
  };
}

export function planMemoryRetrievalRankingBudgetDedupe(
  candidates: MemoryRetrievalCandidate[],
  options: MemoryRetrievalPlanOptions = {},
): MemoryRetrievalRankingBudgetDedupeResult {
  const budget = mergeBudget(options.budget);

  const rankedInitial = candidates
    .map((candidate) => rankCandidate(candidate, options))
    .sort((left, right) => {
      if (right.final_score !== left.final_score) return right.final_score - left.final_score;
      if (left.source_authority_rank !== right.source_authority_rank) return left.source_authority_rank - right.source_authority_rank;
      return right.estimated_tokens - left.estimated_tokens;
    });

  const deduped = applyDedupe(rankedInitial);
  const budgeted = applyBudget(deduped.ranked, budget);

  const included = budgeted.ranked.filter((candidate) => candidate.included);
  const excluded = budgeted.ranked.filter((candidate) => !candidate.included);

  return {
    phase: "17I",
    planner: "retrieval_ranking_budget_dedupe",
    runtime_side_effects_enabled: false,
    runtime_retrieval_enabled: false,
    semantic_retrieval_active: false,
    provider_calls_enabled: false,
    vector_search_enabled: false,
    sql_runtime_enabled: false,
    total_candidates: candidates.length,
    included_count: included.length,
    excluded_count: excluded.length,
    ranked_candidates: budgeted.ranked,
    included_candidates: included,
    excluded_candidates: excluded,
    budget_usage: budgeted.usage,
    dedupe_summary: deduped.summary,
    warnings: [
      "Phase 17I creates retrieval plans only; runtime retrieval remains disabled.",
      "No memory_retrieval_events writes occur in this phase.",
      "Semantic retrieval remains deferred.",
      "Every included or excluded candidate keeps visible reasons.",
      ...budgeted.usage.notes,
    ],
    boundary: PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_BOUNDARY,
  };
}

export function summarizeMemoryRetrievalPlan(result: MemoryRetrievalRankingBudgetDedupeResult): string[] {
  return [
    `Phase ${result.phase} retrieval planning evaluated ${result.total_candidates} candidates.`,
    `${result.included_count} candidates were included and ${result.excluded_count} were excluded.`,
    `Budget used ${result.budget_usage.used_items}/${result.budget_usage.max_items} items and ${result.budget_usage.used_estimated_tokens}/${result.budget_usage.max_estimated_tokens} estimated tokens.`,
    `Dedupe removed ${result.dedupe_summary.duplicate_count} duplicates.`,
    "No runtime retrieval, memory_retrieval_events writes, embedding generation, semantic retrieval activation, provider call, vector search, SQL access, Supabase access, Carnos prompt injection, or background scanning was performed.",
  ];
}

export function getMemoryRetrievalRankingBudgetDedupeSummary(): typeof PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_BOUNDARY {
  return PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_BOUNDARY;
}

export const PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_AUDIT_MARKERS = [
  "Phase 17I — Retrieval Ranking + Budget + Dedupe Rules",
  "Retrieval Ranking + Budget + Dedupe Rules",
  "approved-only retrieval planning",
  "budget-bounded retrieval planning",
  "deduped retrieval planning",
  "source authority scoring",
  "trust scoring integration",
  "keyword/domain scoring",
  "confidence/evidence/reliability scoring",
  "freshness/staleness handling",
  "sensitive memory exclusion by default",
  "conflict exclusion by default",
  "visible inclusion/exclusion reasons",
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


export function rankMemoryRetrievalCandidates(candidates: MemoryRetrievalCandidate[], options: MemoryRetrievalPlanOptions = {}): MemoryRetrievalRankedCandidate[] {
  return planMemoryRetrievalRankingBudgetDedupe(candidates, options).ranked_candidates;
}

export function buildMemoryRetrievalPlan(candidates: MemoryRetrievalCandidate[], options: MemoryRetrievalPlanOptions = {}): MemoryRetrievalRankingBudgetDedupeResult {
  return planMemoryRetrievalRankingBudgetDedupe(candidates, options);
}
