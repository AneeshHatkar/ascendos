/**
 * Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules.
 *
 * Deterministic read-layer preview for already-approved memory contracts.
 * This helper filters approved/edited memories, excludes blocked/private/forgotten
 * states, scores relevance, ranks safe memory refs, and surfaces staleness warnings.
 *
 * Boundary:
 * - approved memory read layer preview only
 * - ranking/staleness rules only
 * - no approval
 * - no persistence
 * - no Supabase calls
 * - no SQL reads or writes
 * - no embeddings
 * - no provider calls
 * - no hidden Carnos prompt injection
 * - no context pack builder
 * - no standalone /memory route
 */

import type {
  ApprovedMemoryContract,
  ContextPackMemoryReference,
  MemoryId,
} from "./memory-contracts";
import {
  getMemorySensitivityRule,
  getSourceAuthorityRank,
  getStalenessRule,
  isBlockedMemoryStatus,
  isRetrievableMemoryStatus,
} from "./memory-conflict-rules";
import type {
  MemoryDomainScope,
  MemorySourceAuthority,
  MemoryStalenessState,
  MemoryUsageVisibilityLevel,
} from "./memory-enums";

export type ApprovedMemoryReadSurface =
  | "command"
  | "carnos"
  | "privacy"
  | "knowledge"
  | "project"
  | "system"
  | "domain";

export type ApprovedMemoryReadDecision =
  | "included"
  | "excluded_blocked_status"
  | "excluded_private_mode"
  | "excluded_do_not_remember"
  | "excluded_sensitivity"
  | "excluded_domain_mismatch"
  | "excluded_stale_requires_review"
  | "excluded_low_relevance";

export type ApprovedMemoryRankingWeights = {
  priority_weight: number;
  confidence_weight: number;
  authority_weight: number;
  recency_weight: number;
  domain_match_weight: number;
  source_of_truth_boost: number;
  sensitivity_penalty: number;
  staleness_penalty: number;
  conflict_penalty: number;
};

export type ApprovedMemoryReadOptions = {
  surface?: ApprovedMemoryReadSurface;
  active_route?: MemoryDomainScope;
  active_project?: string;
  query_hint?: string;
  max_results?: number;
  include_stale_with_warning?: boolean;
  include_restricted?: boolean;
  private_mode_active?: boolean;
  do_not_remember_rules_active?: boolean;
  weights?: Partial<ApprovedMemoryRankingWeights>;
};

export type ApprovedMemoryReadReason = {
  code:
    | "retrievable_status"
    | "blocked_status"
    | "private_mode"
    | "do_not_remember"
    | "domain_match"
    | "domain_mismatch"
    | "query_match"
    | "source_authority"
    | "source_of_truth_boost"
    | "confidence"
    | "priority"
    | "sensitivity"
    | "staleness"
    | "conflict"
    | "low_relevance";
  message: string;
};

export type ApprovedMemoryRankedReference = ContextPackMemoryReference & {
  read_decision: ApprovedMemoryReadDecision;
  ranking_score: number;
  authority_rank: number;
  ranking_reasons: ApprovedMemoryReadReason[];
  staleness_warning?: string;
  sensitivity_rule: string;
  staleness_rule: string;
  preview_only: true;
};

export type ApprovedMemoryReadLayerInput = {
  memories: ApprovedMemoryContract[];
  options?: ApprovedMemoryReadOptions;
};

export type ApprovedMemoryReadLayerResult = {
  included_refs: ApprovedMemoryRankedReference[];
  excluded_refs: ApprovedMemoryRankedReference[];
  stale_memory_warnings: string[];
  conflict_warnings: string[];
  ranking_notes: string[];
  boundary: typeof PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY;
};

export const DEFAULT_APPROVED_MEMORY_RANKING_WEIGHTS: ApprovedMemoryRankingWeights = {
  priority_weight: 0.32,
  confidence_weight: 0.24,
  authority_weight: 0.18,
  recency_weight: 0.1,
  domain_match_weight: 0.08,
  source_of_truth_boost: 0.08,
  sensitivity_penalty: 0.18,
  staleness_penalty: 0.2,
  conflict_penalty: 0.14,
};

export const PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY = {
  phase: "Phase 15G",
  name: "Approved Memory Read Layer + Ranking/Staleness Rules",
  preview_only: true,
  read_layer_only: true,
  no_approval: true,
  no_persistence: true,
  no_supabase_calls: true,
  no_sql_reads_or_writes: true,
  no_embeddings: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_context_pack_builder: true,
  no_standalone_memory_route: true,
  next_phase: "Phase 15H — Carnos Entity State",
  boundary_rules: [
    "Only approved or edited memory contracts can be included.",
    "Forgotten, rejected, archived, private-mode-blocked, and do-not-remember-blocked memories are excluded.",
    "Private mode blocks the read layer preview.",
    "Do-not-remember active state blocks matching memory use preview.",
    "Restricted memory requires explicit include_restricted=true.",
    "Stale or needs-review memories are excluded unless include_stale_with_warning=true.",
    "Ranking is deterministic and local.",
    "No database calls, no embeddings, no provider calls, no hidden Carnos prompt injection.",
  ],
} as const;

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function normalize(value: string | undefined): string {
  return (value ?? "").toLowerCase().trim();
}

function includesQuery(memory: ApprovedMemoryContract, queryHint?: string): boolean {
  const query = normalize(queryHint);
  if (!query) return false;

  const haystack = `${memory.title} ${memory.content} ${memory.memory_type} ${memory.domain_scope}`.toLowerCase();
  return haystack.includes(query);
}

function domainMatches(memory: ApprovedMemoryContract, activeRoute?: MemoryDomainScope): boolean {
  if (!activeRoute) return true;
  return memory.domain_scope === "global" || memory.domain_scope === activeRoute;
}

function isSourceOfTruthMemory(memory: ApprovedMemoryContract): boolean {
  return memory.provenance.source_type === "source_of_truth" || memory.memory_type === "source_of_truth_note";
}

function sourceAuthorityScore(memory: ApprovedMemoryContract): {
  authorityRank: number;
  score: number;
} {
  const sourceType = memory.provenance.source_type as MemorySourceAuthority;
  const authorityRank = getSourceAuthorityRank(sourceType);
  const safeRank = authorityRank === Number.MAX_SAFE_INTEGER ? 12 : authorityRank;
  return {
    authorityRank,
    score: clampScore(1 - safeRank / 12),
  };
}

function recencyScore(memory: ApprovedMemoryContract): number {
  const dateText =
    memory.review.last_confirmed_at ??
    memory.updated_at ??
    memory.created_at ??
    memory.provenance.captured_at;

  if (!dateText) return 0.35;

  const timestamp = Date.parse(dateText);
  if (Number.isNaN(timestamp)) return 0.35;

  const ageDays = Math.max(0, (Date.now() - timestamp) / 86_400_000);
  if (ageDays <= 14) return 1;
  if (ageDays <= 60) return 0.8;
  if (ageDays <= 180) return 0.6;
  if (ageDays <= 365) return 0.4;
  return 0.2;
}

function stalenessPenalty(staleness: MemoryStalenessState): number {
  if (staleness === "fresh") return 0;
  if (staleness === "aging") return 0.25;
  if (staleness === "stale") return 0.7;
  return 1;
}

function sensitivityPenalty(visibility: MemoryUsageVisibilityLevel): number {
  if (visibility === "visible_full") return 0;
  if (visibility === "visible_source") return 0.08;
  if (visibility === "visible_summary") return 0.18;
  return 1;
}

function shouldExcludeForStaleness(
  memory: ApprovedMemoryContract,
  includeStaleWithWarning: boolean,
): boolean {
  if (memory.status === "needs_review") return !includeStaleWithWarning;
  if (memory.status === "stale") return !includeStaleWithWarning;
  if (memory.review.staleness === "stale") return !includeStaleWithWarning;
  if (memory.review.staleness === "needs_reconfirmation") return !includeStaleWithWarning;
  return false;
}

function buildStalenessWarning(memory: ApprovedMemoryContract): string | undefined {
  if (
    memory.status === "stale" ||
    memory.status === "needs_review" ||
    memory.review.staleness === "stale" ||
    memory.review.staleness === "needs_reconfirmation"
  ) {
    return `${memory.title} should be reviewed before high-confidence use.`;
  }

  if (memory.review.review_after) {
    const reviewAfter = Date.parse(memory.review.review_after);
    if (!Number.isNaN(reviewAfter) && reviewAfter <= Date.now()) {
      return `${memory.title} passed its review_after date.`;
    }
  }

  return undefined;
}

function createExcludedReference(
  memory: ApprovedMemoryContract,
  decision: ApprovedMemoryReadDecision,
  message: string,
): ApprovedMemoryRankedReference {
  const authority = sourceAuthorityScore(memory);

  return {
    memory_id: memory.id,
    entity_kind: "user_memory",
    title: memory.title,
    content_preview: memory.content.slice(0, 220),
    reason_included: message,
    provenance: memory.provenance,
    sensitivity: memory.review.sensitivity,
    confidence: memory.review.confidence,
    priority: memory.review.priority,
    staleness: memory.review.staleness,
    conflict_severity: memory.review.conflict_severity,
    allowed_for_context: false,
    read_decision: decision,
    ranking_score: 0,
    authority_rank: authority.authorityRank,
    ranking_reasons: [{ code: "blocked_status", message }],
    staleness_warning: buildStalenessWarning(memory),
    sensitivity_rule: getMemorySensitivityRule(memory.memory_type, memory.review.sensitivity),
    staleness_rule: getStalenessRule(memory.memory_type),
    preview_only: true,
  };
}

export function scoreApprovedMemoryForRead(
  memory: ApprovedMemoryContract,
  options: ApprovedMemoryReadOptions = {},
): ApprovedMemoryRankedReference {
  const weights = {
    ...DEFAULT_APPROVED_MEMORY_RANKING_WEIGHTS,
    ...options.weights,
  };

  const rankingReasons: ApprovedMemoryReadReason[] = [];
  const authority = sourceAuthorityScore(memory);
  const domainMatch = domainMatches(memory, options.active_route);
  const queryMatch = includesQuery(memory, options.query_hint);
  const stalenessWarning = buildStalenessWarning(memory);

  let score = 0;

  score += clampScore(memory.review.priority / 100) * weights.priority_weight;
  rankingReasons.push({
    code: "priority",
    message: `Priority contributes ${memory.review.priority}/100.`,
  });

  score += clampScore(memory.review.confidence) * weights.confidence_weight;
  rankingReasons.push({
    code: "confidence",
    message: `Confidence contributes ${memory.review.confidence}.`,
  });

  score += authority.score * weights.authority_weight;
  rankingReasons.push({
    code: "source_authority",
    message: `Source authority rank is ${authority.authorityRank}.`,
  });

  score += recencyScore(memory) * weights.recency_weight;

  if (domainMatch) {
    score += weights.domain_match_weight;
    rankingReasons.push({
      code: "domain_match",
      message: "Memory domain matches the active route or is global.",
    });
  } else {
    score -= weights.domain_match_weight;
    rankingReasons.push({
      code: "domain_mismatch",
      message: "Memory domain does not match the active route.",
    });
  }

  if (queryMatch) {
    score += weights.domain_match_weight;
    rankingReasons.push({
      code: "query_match",
      message: "Memory text matches the query hint.",
    });
  }

  if (isSourceOfTruthMemory(memory)) {
    score += weights.source_of_truth_boost;
    rankingReasons.push({
      code: "source_of_truth_boost",
      message: "Source-of-truth memory receives a ranking boost.",
    });
  }

  const sensitivityDeduction =
    memory.review.sensitivity === "restricted" || memory.review.visibility === "hidden_blocked"
      ? weights.sensitivity_penalty
      : sensitivityPenalty(memory.review.visibility) * weights.sensitivity_penalty;

  if (sensitivityDeduction > 0) {
    score -= sensitivityDeduction;
    rankingReasons.push({
      code: "sensitivity",
      message: "Sensitivity/visibility reduces score.",
    });
  }

  const stalePenalty = stalenessPenalty(memory.review.staleness) * weights.staleness_penalty;
  if (stalePenalty > 0) {
    score -= stalePenalty;
    rankingReasons.push({
      code: "staleness",
      message: "Staleness reduces score and may require review.",
    });
  }

  if (memory.review.conflict_severity !== "none") {
    score -= weights.conflict_penalty;
    rankingReasons.push({
      code: "conflict",
      message: `Conflict severity is ${memory.review.conflict_severity}.`,
    });
  }

  return {
    memory_id: memory.id,
    entity_kind: "user_memory",
    title: memory.title,
    content_preview: memory.content.slice(0, 220),
    reason_included: domainMatch
      ? "Approved memory is eligible for read-layer preview."
      : "Approved memory is retained as low-relevance preview.",
    provenance: memory.provenance,
    sensitivity: memory.review.sensitivity,
    confidence: memory.review.confidence,
    priority: memory.review.priority,
    staleness: memory.review.staleness,
    conflict_severity: memory.review.conflict_severity,
    allowed_for_context: true,
    read_decision: "included",
    ranking_score: Number(clampScore(score).toFixed(4)),
    authority_rank: authority.authorityRank,
    ranking_reasons: rankingReasons,
    staleness_warning: stalenessWarning,
    sensitivity_rule: getMemorySensitivityRule(memory.memory_type, memory.review.sensitivity),
    staleness_rule: getStalenessRule(memory.memory_type),
    preview_only: true,
  };
}

export function readApprovedMemoriesForPreview(
  input: ApprovedMemoryReadLayerInput,
): ApprovedMemoryReadLayerResult {
  const options = input.options ?? {};
  const maxResults = Math.max(1, options.max_results ?? 8);
  const includeStaleWithWarning = options.include_stale_with_warning ?? false;
  const includeRestricted = options.include_restricted ?? false;
  const included: ApprovedMemoryRankedReference[] = [];
  const excluded: ApprovedMemoryRankedReference[] = [];
  const staleWarnings: string[] = [];
  const conflictWarnings: string[] = [];

  for (const memory of input.memories) {
    if (options.private_mode_active) {
      excluded.push(
        createExcludedReference(
          memory,
          "excluded_private_mode",
          "Private mode blocks approved memory read-layer preview.",
        ),
      );
      continue;
    }

    if (options.do_not_remember_rules_active) {
      excluded.push(
        createExcludedReference(
          memory,
          "excluded_do_not_remember",
          "Active do-not-remember state blocks memory read-layer preview.",
        ),
      );
      continue;
    }

    if (isBlockedMemoryStatus(memory.status) || !isRetrievableMemoryStatus(memory.status)) {
      excluded.push(
        createExcludedReference(
          memory,
          "excluded_blocked_status",
          `Memory status ${memory.status} is not retrievable.`,
        ),
      );
      continue;
    }

    if (!domainMatches(memory, options.active_route) && options.active_route) {
      excluded.push(
        createExcludedReference(
          memory,
          "excluded_domain_mismatch",
          `Memory domain ${memory.domain_scope} does not match ${options.active_route}.`,
        ),
      );
      continue;
    }

    if (memory.review.sensitivity === "restricted" && !includeRestricted) {
      excluded.push(
        createExcludedReference(
          memory,
          "excluded_sensitivity",
          "Restricted memory requires explicit include_restricted=true.",
        ),
      );
      continue;
    }

    if (shouldExcludeForStaleness(memory, includeStaleWithWarning)) {
      excluded.push(
        createExcludedReference(
          memory,
          "excluded_stale_requires_review",
          "Stale memory requires review before read-layer inclusion.",
        ),
      );
      const warning = buildStalenessWarning(memory);
      if (warning) staleWarnings.push(warning);
      continue;
    }

    const ref = scoreApprovedMemoryForRead(memory, options);

    if (ref.ranking_score <= 0.05) {
      excluded.push({
        ...ref,
        read_decision: "excluded_low_relevance",
        allowed_for_context: false,
        ranking_reasons: [
          ...ref.ranking_reasons,
          {
            code: "low_relevance",
            message: "Ranking score is too low for inclusion.",
          },
        ],
      });
      continue;
    }

    if (ref.staleness_warning) staleWarnings.push(ref.staleness_warning);
    if (ref.conflict_severity !== "none") {
      conflictWarnings.push(`${ref.title} has conflict severity ${ref.conflict_severity}.`);
    }

    included.push(ref);
  }

  included.sort((left, right) => {
    if (right.ranking_score !== left.ranking_score) {
      return right.ranking_score - left.ranking_score;
    }

    if (left.authority_rank !== right.authority_rank) {
      return left.authority_rank - right.authority_rank;
    }

    return right.priority - left.priority;
  });

  return {
    included_refs: included.slice(0, maxResults),
    excluded_refs: [...included.slice(maxResults), ...excluded],
    stale_memory_warnings: [...new Set(staleWarnings)],
    conflict_warnings: [...new Set(conflictWarnings)],
    ranking_notes: [
      "Approved memory read layer preview completed.",
      "Ranking used priority, confidence, source authority, recency, domain match, sensitivity, staleness, and conflict severity.",
      "No context pack was built and no memory was injected into Carnos.",
      "No persistence, no Supabase calls, no embeddings, and no provider calls occurred.",
    ],
    boundary: PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY,
  };
}

export function createApprovedMemoryReadLayerPreview(
  memories: ApprovedMemoryContract[],
  options: ApprovedMemoryReadOptions = {},
): ApprovedMemoryReadLayerResult {
  return readApprovedMemoriesForPreview({ memories, options });
}

export function getApprovedMemoryStalenessSummary(
  memories: ApprovedMemoryContract[],
): {
  fresh: number;
  aging: number;
  stale: number;
  needs_reconfirmation: number;
  warnings: string[];
} {
  const summary = {
    fresh: 0,
    aging: 0,
    stale: 0,
    needs_reconfirmation: 0,
    warnings: [] as string[],
  };

  for (const memory of memories) {
    summary[memory.review.staleness] += 1;
    const warning = buildStalenessWarning(memory);
    if (warning) summary.warnings.push(warning);
  }

  return {
    ...summary,
    warnings: [...new Set(summary.warnings)],
  };
}

export function getApprovedMemoryReadLayerBoundarySummary(): readonly string[] {
  return PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY.boundary_rules;
}
