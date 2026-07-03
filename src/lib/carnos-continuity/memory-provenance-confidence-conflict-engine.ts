/**
 * Phase 17G — Provenance + Confidence + Conflict Engine
 *
 * Deterministic Memory/RAG trust and conflict engine.
 *
 * Boundary:
 * - Pure TypeScript rules only.
 * - No Supabase calls.
 * - No repository implementation.
 * - No SQL reads or writes.
 * - No runtime retrieval.
 * - No embeddings.
 * - No provider calls.
 * - No vector search.
 * - No Carnos prompt/context injection.
 * - No background scanning.
 * - No automatic conflict resolution without explicit review outcome.
 */

import {
  compareMemoryAuthority,
  getSourceAuthorityRank,
  isBlockedMemoryStatus,
} from "./memory-conflict-rules";
import type {
  MemoryConflictSeverity,
  MemorySensitivityLevel,
  MemorySourceAuthority,
  MemorySourceType,
  MemoryStatus,
  MemoryType,
} from "./memory-enums";
import type {
  MemoryRagEvidenceStrength,
  MemoryRagSourceReliability,
} from "./memory-rag-schema-contracts";

export type MemoryTrustDecision =
  | "trusted"
  | "usable_with_caution"
  | "needs_review"
  | "blocked"
  | "superseded";

export type MemoryConflictEngineDecision =
  | "left_wins"
  | "right_wins"
  | "needs_user_review"
  | "both_blocked"
  | "no_conflict";

export type MemoryConflictSignal =
  | "same_type_overlap"
  | "same_conflict_group"
  | "duplicate_reference"
  | "supersession_reference"
  | "contradictory_text"
  | "stale_vs_fresh"
  | "restricted_or_sensitive"
  | "authority_mismatch"
  | "confidence_gap"
  | "evidence_gap";

export interface MemoryTrustInput {
  id: string;
  user_id: string;
  memory_type: MemoryType;
  status: MemoryStatus;
  text: string;
  sensitivity: MemorySensitivityLevel;
  confidence: number;
  priority: number;
  source_type: MemorySourceType;
  evidence_strength: MemoryRagEvidenceStrength;
  source_reliability: MemoryRagSourceReliability;
  conflict_group_key?: string | null;
  duplicate_of_memory_item_id?: string | null;
  superseded_by_memory_item_id?: string | null;
  conflict_state?: string | null;
  stale_state?: string | null;
  review_state?: string | null;
  last_confirmed_at?: string | null;
  review_after?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MemoryTrustScore {
  memory_id: string;
  decision: MemoryTrustDecision;
  trust_score: number;
  source_authority_score: number;
  confidence_score: number;
  evidence_score: number;
  reliability_score: number;
  freshness_score: number;
  sensitivity_penalty: number;
  conflict_penalty: number;
  review_penalty: number;
  reasons: string[];
  warnings: string[];
}

export interface MemoryConflictAssessment {
  conflict_key: string;
  left_memory_id: string;
  right_memory_id: string;
  decision: MemoryConflictEngineDecision;
  conflict_severity: MemoryConflictSeverity;
  signals: MemoryConflictSignal[];
  left_score: MemoryTrustScore;
  right_score: MemoryTrustScore;
  requires_user_review: boolean;
  suggested_primary_memory_id?: string;
  suggested_superseded_memory_id?: string;
  explanation: string;
}

export interface MemoryConflictGroupPreview {
  conflict_key: string;
  resolution_status: "unresolved" | "needs_user_review" | "resolved" | "superseded" | "ignored";
  conflict_summary: string;
  member_memory_ids: string[];
  primary_memory_id?: string;
  superseded_memory_ids: string[];
  requires_user_review: boolean;
  assessments: MemoryConflictAssessment[];
}

export interface MemoryProvenanceConfidenceConflictSummary {
  phase: "17G";
  engine: "provenance_confidence_conflict";
  runtime_side_effects_enabled: false;
  trust_scores: MemoryTrustScore[];
  conflict_groups: MemoryConflictGroupPreview[];
  blocked_memory_ids: string[];
  needs_review_memory_ids: string[];
  superseded_memory_ids: string[];
  warnings: string[];
  boundary: typeof PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_BOUNDARY;
}

export const PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_BOUNDARY = {
  phase: "Phase 17G",
  name: "Provenance + Confidence + Conflict Engine",
  deterministic_only: true,
  no_supabase_calls: true,
  no_repository_implementation: true,
  no_sql_reads_or_writes: true,
  no_runtime_retrieval: true,
  no_embeddings: true,
  no_provider_calls: true,
  no_vector_search: true,
  no_carnos_prompt_injection: true,
  no_background_scanning: true,
  no_silent_conflict_resolution: true,
  next_phase: "Phase 17H — Embedding Provider Boundary",
  boundary_rules: [
    "Trust scores are deterministic and local.",
    "Blocked statuses always produce blocked trust decisions.",
    "Superseded memories are excluded by decision, not deleted.",
    "Equal or ambiguous conflicts require user review.",
    "Source authority, confidence, evidence strength, reliability, freshness, sensitivity, and conflict state must be visible in the explanation.",
    "The engine may suggest a primary memory but must not mutate rows or silently resolve conflicts.",
    "No retrieval, embedding, provider, vector, repository, SQL, Carnos injection, or background scanning behavior is allowed.",
  ],
} as const;

const EVIDENCE_STRENGTH_SCORE: Record<MemoryRagEvidenceStrength, number> = {
  weak: 0.2,
  medium: 0.45,
  strong: 0.7,
  source_backed: 0.88,
  user_confirmed: 1,
};

const SOURCE_RELIABILITY_SCORE: Record<MemoryRagSourceReliability, number> = {
  unknown: 0.35,
  low: 0.2,
  medium: 0.55,
  high: 0.78,
  source_of_truth: 1,
};

const SENSITIVITY_PENALTY: Record<MemorySensitivityLevel, number> = {
  low: 0,
  medium: 0.04,
  high: 0.12,
  restricted: 0.25,
};

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function normalizeText(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function tokenize(value: string): Set<string> {
  return new Set(
    normalizeText(value)
      .split(/[^a-z0-9_+-]+/i)
      .map((item) => item.trim())
      .filter((item) => item.length >= 3),
  );
}

function textOverlap(left: string, right: string): number {
  const leftTokens = tokenize(left);
  const rightTokens = tokenize(right);

  if (leftTokens.size === 0 || rightTokens.size === 0) return 0;

  let shared = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) shared += 1;
  }

  return shared / Math.max(leftTokens.size, rightTokens.size);
}

function sourceAuthorityScore(sourceType: MemorySourceType): number {
  const rank = getSourceAuthorityRank(sourceType as MemorySourceAuthority);
  if (rank === Number.MAX_SAFE_INTEGER) return 0.25;

  return clampScore(1 - rank / 12);
}

function priorityScore(priority: number): number {
  return clampScore(priority / 100);
}

function freshnessScore(memory: MemoryTrustInput): number {
  if (memory.stale_state === "expired") return 0.05;
  if (memory.stale_state === "stale") return 0.2;
  if (memory.stale_state === "possibly_stale") return 0.45;

  const dateText =
    memory.last_confirmed_at ??
    memory.updated_at ??
    memory.created_at ??
    null;

  if (!dateText) return 0.45;

  const timestamp = Date.parse(dateText);
  if (Number.isNaN(timestamp)) return 0.45;

  const ageDays = Math.max(0, (Date.now() - timestamp) / 86_400_000);

  if (ageDays <= 14) return 1;
  if (ageDays <= 60) return 0.8;
  if (ageDays <= 180) return 0.6;
  if (ageDays <= 365) return 0.4;
  return 0.2;
}

function reviewPenalty(memory: MemoryTrustInput): number {
  let penalty = 0;

  if (memory.review_state === "needs_review") penalty += 0.22;
  if (memory.review_state === "blocked") penalty += 0.5;
  if (memory.status === "needs_review") penalty += 0.25;
  if (memory.status === "stale") penalty += 0.22;

  if (memory.review_after) {
    const reviewAfter = Date.parse(memory.review_after);
    if (!Number.isNaN(reviewAfter) && reviewAfter <= Date.now()) {
      penalty += 0.18;
    }
  }

  return clampScore(penalty);
}

function conflictPenalty(memory: MemoryTrustInput): number {
  if (memory.conflict_state === "conflict_detected") return 0.3;
  if (memory.conflict_state === "possible_conflict") return 0.16;
  if (memory.conflict_group_key) return 0.1;
  return 0;
}

function hasContradictoryText(left: string, right: string): boolean {
  const leftText = normalizeText(left);
  const rightText = normalizeText(right);

  const contradictionPairs: readonly [string, string][] = [
    [" yes ", " no "],
    [" true ", " false "],
    [" enabled ", " disabled "],
    [" active ", " inactive "],
    [" approved ", " rejected "],
    [" include ", " exclude "],
    [" allow ", " block "],
    [" high ", " low "],
    [" before ", " after "],
    [" old ", " new "],
    [" outdated ", " current "],
  ];

  const paddedLeft = ` ${leftText} `;
  const paddedRight = ` ${rightText} `;

  return contradictionPairs.some(
    ([a, b]) =>
      (paddedLeft.includes(a) && paddedRight.includes(b)) ||
      (paddedLeft.includes(b) && paddedRight.includes(a)),
  );
}

export function scoreMemoryTrust(memory: MemoryTrustInput): MemoryTrustScore {
  const reasons: string[] = [];
  const warnings: string[] = [];

  const sourceScore = sourceAuthorityScore(memory.source_type);
  const confidence = clampScore(memory.confidence);
  const evidence = EVIDENCE_STRENGTH_SCORE[memory.evidence_strength];
  const reliability = SOURCE_RELIABILITY_SCORE[memory.source_reliability];
  const freshness = freshnessScore(memory);
  const sensitivity = SENSITIVITY_PENALTY[memory.sensitivity];
  const conflict = conflictPenalty(memory);
  const review = reviewPenalty(memory);

  if (isBlockedMemoryStatus(memory.status)) {
    return {
      memory_id: memory.id,
      decision: "blocked",
      trust_score: 0,
      source_authority_score: sourceScore,
      confidence_score: confidence,
      evidence_score: evidence,
      reliability_score: reliability,
      freshness_score: freshness,
      sensitivity_penalty: sensitivity,
      conflict_penalty: conflict,
      review_penalty: review,
      reasons: [`Memory status ${memory.status} is blocked.`],
      warnings: ["Blocked memory must not be retrieved or injected into context."],
    };
  }

  if (memory.superseded_by_memory_item_id) {
    return {
      memory_id: memory.id,
      decision: "superseded",
      trust_score: 0,
      source_authority_score: sourceScore,
      confidence_score: confidence,
      evidence_score: evidence,
      reliability_score: reliability,
      freshness_score: freshness,
      sensitivity_penalty: sensitivity,
      conflict_penalty: conflict,
      review_penalty: review,
      reasons: [`Memory is superseded by ${memory.superseded_by_memory_item_id}.`],
      warnings: ["Superseded memory should be excluded by default."],
    };
  }

  let score = 0;
  score += sourceScore * 0.22;
  score += confidence * 0.22;
  score += evidence * 0.18;
  score += reliability * 0.16;
  score += freshness * 0.1;
  score += priorityScore(memory.priority) * 0.08;
  score -= sensitivity;
  score -= conflict;
  score -= review;

  reasons.push(`Source authority score is ${sourceScore.toFixed(2)}.`);
  reasons.push(`Confidence score is ${confidence.toFixed(2)}.`);
  reasons.push(`Evidence strength score is ${evidence.toFixed(2)}.`);
  reasons.push(`Source reliability score is ${reliability.toFixed(2)}.`);
  reasons.push(`Freshness score is ${freshness.toFixed(2)}.`);

  if (sensitivity > 0) {
    reasons.push(`Sensitivity penalty is ${sensitivity.toFixed(2)}.`);
  }

  if (conflict > 0) {
    reasons.push(`Conflict penalty is ${conflict.toFixed(2)}.`);
    warnings.push("Memory has conflict metadata and may need review before high-confidence use.");
  }

  if (review > 0) {
    reasons.push(`Review penalty is ${review.toFixed(2)}.`);
    warnings.push("Memory is stale, needs review, or has passed review_after.");
  }

  const trustScore = Number(clampScore(score).toFixed(4));

  let decision: MemoryTrustDecision = "trusted";
  if (trustScore < 0.35 || memory.status === "needs_review" || memory.status === "stale") {
    decision = "needs_review";
  } else if (trustScore < 0.68 || memory.sensitivity === "restricted" || conflict > 0 || review > 0) {
    decision = "usable_with_caution";
  }

  return {
    memory_id: memory.id,
    decision,
    trust_score: trustScore,
    source_authority_score: Number(sourceScore.toFixed(4)),
    confidence_score: Number(confidence.toFixed(4)),
    evidence_score: Number(evidence.toFixed(4)),
    reliability_score: Number(reliability.toFixed(4)),
    freshness_score: Number(freshness.toFixed(4)),
    sensitivity_penalty: Number(sensitivity.toFixed(4)),
    conflict_penalty: Number(conflict.toFixed(4)),
    review_penalty: Number(review.toFixed(4)),
    reasons,
    warnings,
  };
}

function detectConflictSignals(
  left: MemoryTrustInput,
  right: MemoryTrustInput,
): MemoryConflictSignal[] {
  const signals = new Set<MemoryConflictSignal>();

  if (left.memory_type === right.memory_type && textOverlap(left.text, right.text) >= 0.28) {
    signals.add("same_type_overlap");
  }

  if (
    left.conflict_group_key &&
    right.conflict_group_key &&
    left.conflict_group_key === right.conflict_group_key
  ) {
    signals.add("same_conflict_group");
  }

  if (left.duplicate_of_memory_item_id === right.id || right.duplicate_of_memory_item_id === left.id) {
    signals.add("duplicate_reference");
  }

  if (
    left.superseded_by_memory_item_id === right.id ||
    right.superseded_by_memory_item_id === left.id
  ) {
    signals.add("supersession_reference");
  }

  if (hasContradictoryText(left.text, right.text)) {
    signals.add("contradictory_text");
  }

  if (
    (left.stale_state === "stale" || left.status === "stale") &&
    right.stale_state !== "stale" &&
    right.status !== "stale"
  ) {
    signals.add("stale_vs_fresh");
  }

  if (
    (right.stale_state === "stale" || right.status === "stale") &&
    left.stale_state !== "stale" &&
    left.status !== "stale"
  ) {
    signals.add("stale_vs_fresh");
  }

  if (
    left.sensitivity === "restricted" ||
    right.sensitivity === "restricted" ||
    left.sensitivity === "high" ||
    right.sensitivity === "high"
  ) {
    signals.add("restricted_or_sensitive");
  }

  if (Math.abs(sourceAuthorityScore(left.source_type) - sourceAuthorityScore(right.source_type)) >= 0.24) {
    signals.add("authority_mismatch");
  }

  if (Math.abs(left.confidence - right.confidence) >= 0.2) {
    signals.add("confidence_gap");
  }

  if (
    Math.abs(
      EVIDENCE_STRENGTH_SCORE[left.evidence_strength] -
        EVIDENCE_STRENGTH_SCORE[right.evidence_strength],
    ) >= 0.25
  ) {
    signals.add("evidence_gap");
  }

  return [...signals];
}

function conflictSeverityFromSignals(signals: MemoryConflictSignal[]): MemoryConflictSeverity {
  if (signals.includes("contradictory_text") && signals.includes("same_conflict_group")) {
    return "blocking";
  }

  if (signals.includes("contradictory_text") || signals.includes("supersession_reference")) {
    return "high";
  }

  if (signals.includes("same_conflict_group") || signals.includes("duplicate_reference")) {
    return "medium";
  }

  if (signals.length > 0) return "low";
  return "none";
}

export function assessMemoryConflict(
  left: MemoryTrustInput,
  right: MemoryTrustInput,
): MemoryConflictAssessment {
  const signals = detectConflictSignals(left, right);
  const severity = conflictSeverityFromSignals(signals);
  const leftScore = scoreMemoryTrust(left);
  const rightScore = scoreMemoryTrust(right);

  if (severity === "none") {
    return {
      conflict_key: buildConflictKey(left, right),
      left_memory_id: left.id,
      right_memory_id: right.id,
      decision: "no_conflict",
      conflict_severity: "none",
      signals,
      left_score: leftScore,
      right_score: rightScore,
      requires_user_review: false,
      explanation: "No meaningful conflict signal was detected.",
    };
  }

  const authorityDecision = compareMemoryAuthority(
    {
      memory_type: left.memory_type,
      status: left.status,
      sensitivity: left.sensitivity,
      source_type: left.source_type as MemorySourceAuthority,
      confidence: left.confidence,
      priority: left.priority,
      last_confirmed_at: left.last_confirmed_at ?? undefined,
      created_at: left.created_at ?? undefined,
    },
    {
      memory_type: right.memory_type,
      status: right.status,
      sensitivity: right.sensitivity,
      source_type: right.source_type as MemorySourceAuthority,
      confidence: right.confidence,
      priority: right.priority,
      last_confirmed_at: right.last_confirmed_at ?? undefined,
      created_at: right.created_at ?? undefined,
    },
  );

  if (authorityDecision.winner === "blocked") {
    return {
      conflict_key: buildConflictKey(left, right),
      left_memory_id: left.id,
      right_memory_id: right.id,
      decision: "both_blocked",
      conflict_severity: severity,
      signals,
      left_score: leftScore,
      right_score: rightScore,
      requires_user_review: false,
      explanation: authorityDecision.reason,
    };
  }

  const scoreGap = Math.abs(leftScore.trust_score - rightScore.trust_score);
  const ambiguous = authorityDecision.requires_user_review || scoreGap < 0.08 || severity === "blocking";

  if (ambiguous) {
    return {
      conflict_key: buildConflictKey(left, right),
      left_memory_id: left.id,
      right_memory_id: right.id,
      decision: "needs_user_review",
      conflict_severity: severity,
      signals,
      left_score: leftScore,
      right_score: rightScore,
      requires_user_review: true,
      explanation:
        "Conflict requires user review because the result is ambiguous, blocking, or equal-authority.",
    };
  }

  const leftWins =
    authorityDecision.winner === "left" ||
    (authorityDecision.winner === "needs_review" && leftScore.trust_score > rightScore.trust_score);

  const winner = leftWins ? left : right;
  const loser = leftWins ? right : left;

  return {
    conflict_key: buildConflictKey(left, right),
    left_memory_id: left.id,
    right_memory_id: right.id,
    decision: leftWins ? "left_wins" : "right_wins",
    conflict_severity: severity,
    signals,
    left_score: leftScore,
    right_score: rightScore,
    requires_user_review: false,
    suggested_primary_memory_id: winner.id,
    suggested_superseded_memory_id: loser.id,
    explanation: authorityDecision.reason,
  };
}

export function buildConflictKey(left: MemoryTrustInput, right: MemoryTrustInput): string {
  if (
    left.conflict_group_key &&
    right.conflict_group_key &&
    left.conflict_group_key === right.conflict_group_key
  ) {
    return left.conflict_group_key;
  }

  const ids = [left.id, right.id].sort().join("__");
  return `${left.memory_type}__${ids}`;
}

export function createMemoryConflictGroupPreview(
  memories: MemoryTrustInput[],
): MemoryConflictGroupPreview[] {
  const assessments: MemoryConflictAssessment[] = [];

  for (let leftIndex = 0; leftIndex < memories.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < memories.length; rightIndex += 1) {
      const assessment = assessMemoryConflict(memories[leftIndex], memories[rightIndex]);
      if (assessment.decision !== "no_conflict") {
        assessments.push(assessment);
      }
    }
  }

  const byKey = new Map<string, MemoryConflictAssessment[]>();

  for (const assessment of assessments) {
    const existing = byKey.get(assessment.conflict_key) ?? [];
    existing.push(assessment);
    byKey.set(assessment.conflict_key, existing);
  }

  return [...byKey.entries()].map(([conflictKey, groupAssessments]) => {
    const memberIds = new Set<string>();
    const supersededIds = new Set<string>();
    let primaryMemoryId: string | undefined;
    let requiresUserReview = false;

    for (const assessment of groupAssessments) {
      memberIds.add(assessment.left_memory_id);
      memberIds.add(assessment.right_memory_id);

      if (assessment.requires_user_review) {
        requiresUserReview = true;
      }

      if (assessment.suggested_primary_memory_id) {
        primaryMemoryId = assessment.suggested_primary_memory_id;
      }

      if (assessment.suggested_superseded_memory_id) {
        supersededIds.add(assessment.suggested_superseded_memory_id);
      }
    }

    return {
      conflict_key: conflictKey,
      resolution_status: requiresUserReview ? "needs_user_review" : "unresolved",
      conflict_summary: `${groupAssessments.length} conflict assessment(s) require visibility before use.`,
      member_memory_ids: [...memberIds],
      primary_memory_id: requiresUserReview ? undefined : primaryMemoryId,
      superseded_memory_ids: requiresUserReview ? [] : [...supersededIds],
      requires_user_review: requiresUserReview,
      assessments: groupAssessments,
    };
  });
}

export function summarizeMemoryProvenanceConfidenceConflicts(
  memories: MemoryTrustInput[],
): MemoryProvenanceConfidenceConflictSummary {
  const trustScores = memories.map(scoreMemoryTrust);
  const conflictGroups = createMemoryConflictGroupPreview(memories);

  const blockedMemoryIds = trustScores
    .filter((score) => score.decision === "blocked")
    .map((score) => score.memory_id);

  const needsReviewMemoryIds = trustScores
    .filter((score) => score.decision === "needs_review")
    .map((score) => score.memory_id);

  const supersededMemoryIds = new Set<string>(
    trustScores
      .filter((score) => score.decision === "superseded")
      .map((score) => score.memory_id),
  );

  for (const group of conflictGroups) {
    for (const id of group.superseded_memory_ids) {
      supersededMemoryIds.add(id);
    }
  }

  const warnings = [
    ...trustScores.flatMap((score) => score.warnings),
    ...conflictGroups
      .filter((group) => group.requires_user_review)
      .map((group) => `${group.conflict_key} requires user review.`),
  ];

  return {
    phase: "17G",
    engine: "provenance_confidence_conflict",
    runtime_side_effects_enabled: false,
    trust_scores: trustScores,
    conflict_groups: conflictGroups,
    blocked_memory_ids: blockedMemoryIds,
    needs_review_memory_ids: needsReviewMemoryIds,
    superseded_memory_ids: [...supersededMemoryIds],
    warnings: [...new Set(warnings)],
    boundary: PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_BOUNDARY,
  };
}

export function getMemoryProvenanceConfidenceConflictBoundarySummary(): readonly string[] {
  return PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_BOUNDARY.boundary_rules;
}
