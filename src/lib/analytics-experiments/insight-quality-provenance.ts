import type {
  DataQualityLevel,
  MetricSourceMode,
} from "./metric-registry";

import type {
  AnalyticsSnapshotFreshness,
  AnalyticsSnapshotProvenance,
} from "./analytics-snapshot-contracts";

import type {
  SelfExperimentEvaluationReadiness,
  SelfExperimentSourceMode,
} from "./self-experiment-contracts";

export type InsightQualityLevel =
  | "high_confidence"
  | "medium_confidence"
  | "low_confidence"
  | "insufficient_data"
  | "invalid";

export type InsightClaimType =
  | "observation"
  | "trend"
  | "comparison"
  | "correlation"
  | "experiment_readiness"
  | "lesson_candidate"
  | "recommendation_candidate";

export type InsightProvenanceSource =
  | "metric_registry"
  | "analytics_snapshot"
  | "self_experiment"
  | "manual_note"
  | "memory_context"
  | "deterministic_fallback";

export type InsightEvidenceFreshness =
  | "fresh"
  | "cached"
  | "stale"
  | "partial"
  | "missing"
  | "unsynced";

export type InsightDisclosureRequirement =
  | "none"
  | "disclose_cached_context"
  | "disclose_stale_context"
  | "disclose_unsynced_context"
  | "disclose_partial_context"
  | "disclose_deterministic_preview"
  | "disclose_insufficient_data"
  | "disclose_confounders"
  | "avoid_causal_claims";

export type InsightActionReadiness =
  | "not_actionable"
  | "preview_only"
  | "candidate_requires_review"
  | "safe_to_suggest_without_write";

export interface InsightEvidenceItem {
  readonly evidenceId: string;
  readonly source: InsightProvenanceSource;
  readonly metricId: string | null;
  readonly snapshotId: string | null;
  readonly experimentId: string | null;
  readonly qualityLevel: DataQualityLevel | SelfExperimentEvaluationReadiness;
  readonly sourceMode: MetricSourceMode | SelfExperimentSourceMode | AnalyticsSnapshotProvenance;
  readonly freshness: InsightEvidenceFreshness | AnalyticsSnapshotFreshness;
  readonly completenessScore: number;
  readonly matchedDataPoints: number;
  readonly hasConfounders: boolean;
  readonly includesUnsyncedRecords: boolean;
  readonly staleAgeDays: number;
}

export interface InsightQualityContract {
  readonly insightId: string;
  readonly userScoped: true;
  readonly title: string;
  readonly claimType: InsightClaimType;
  readonly claimText: string;
  readonly evidence: readonly InsightEvidenceItem[];
  readonly causalityClaimed: boolean;
  readonly suggestedActionText: string | null;
  readonly memoryCandidateText: string | null;
  readonly localCarnosRuntimeRequired: false;
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly localStorageCoreDataEnabled: false;
}

export interface InsightQualityValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly qualityLevel: InsightQualityLevel;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly actionReadiness: InsightActionReadiness;
  readonly memoryCandidateAllowed: boolean;
  readonly carnosExplanationLimit: string;
  readonly provenanceSummary: {
    readonly evidenceCount: number;
    readonly sourceCount: number;
    readonly minimumCompletenessScore: number;
    readonly matchedDataPointTotal: number;
    readonly hasCachedEvidence: boolean;
    readonly hasStaleEvidence: boolean;
    readonly hasUnsyncedEvidence: boolean;
    readonly hasPartialEvidence: boolean;
    readonly hasConfounders: boolean;
  };
}

export const PHASE_18F_INSIGHT_QUALITY_BOUNDARY = {
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeInsightDataEnabled: false,
  localStorageCoreDataEnabled: false,
  localCarnosRuntimeRequired: false,
  deterministicFallbackRequired: true,
  actionExecutionEnabled: false,
  memoryWriteEnabled: false,
} as const;

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return Number(value.toFixed(4));
}

function sourceCount(evidence: readonly InsightEvidenceItem[]): number {
  const sources = new Set<string>();
  for (const item of evidence) {
    sources.add(item.source + ":" + (item.metricId ?? item.snapshotId ?? item.experimentId ?? item.evidenceId));
  }
  return sources.size;
}

function minimumCompleteness(evidence: readonly InsightEvidenceItem[]): number {
  if (evidence.length === 0) return 0;
  let minimum = 1;
  for (const item of evidence) {
    minimum = Math.min(minimum, clampScore(item.completenessScore));
  }
  return clampScore(minimum);
}

function buildDisclosureRequirements(input: {
  readonly evidence: readonly InsightEvidenceItem[];
  readonly hasInsufficientEvidence: boolean;
  readonly causalityClaimed: boolean;
  readonly claimType: InsightClaimType;
}): readonly InsightDisclosureRequirement[] {
  const requirements = new Set<InsightDisclosureRequirement>();

  if (input.hasInsufficientEvidence) requirements.add("disclose_insufficient_data");
  if (input.causalityClaimed || input.claimType === "correlation") requirements.add("avoid_causal_claims");

  for (const item of input.evidence) {
    if (item.freshness === "cached" || item.sourceMode === "cached_offline" || item.sourceMode === "eligible_offline_cache") {
      requirements.add("disclose_cached_context");
    }
    if (item.freshness === "stale" || item.staleAgeDays > 0) {
      requirements.add("disclose_stale_context");
    }
    if (item.freshness === "unsynced" || item.includesUnsyncedRecords || item.sourceMode === "unsynced_local") {
      requirements.add("disclose_unsynced_context");
    }
    if (item.freshness === "partial") {
      requirements.add("disclose_partial_context");
    }
    if (item.source === "deterministic_fallback" || item.sourceMode === "deterministic_preview") {
      requirements.add("disclose_deterministic_preview");
    }
    if (item.hasConfounders) {
      requirements.add("disclose_confounders");
      requirements.add("avoid_causal_claims");
    }
  }

  if (requirements.size === 0) requirements.add("none");
  return [...requirements];
}

function summarizeProvenance(evidence: readonly InsightEvidenceItem[]) {
  let matchedDataPointTotal = 0;
  let hasCachedEvidence = false;
  let hasStaleEvidence = false;
  let hasUnsyncedEvidence = false;
  let hasPartialEvidence = false;
  let hasConfounders = false;

  for (const item of evidence) {
    matchedDataPointTotal += Math.max(0, item.matchedDataPoints);
    hasCachedEvidence = hasCachedEvidence || item.freshness === "cached" || item.sourceMode === "cached_offline" || item.sourceMode === "eligible_offline_cache";
    hasStaleEvidence = hasStaleEvidence || item.freshness === "stale" || item.staleAgeDays > 0;
    hasUnsyncedEvidence = hasUnsyncedEvidence || item.freshness === "unsynced" || item.includesUnsyncedRecords || item.sourceMode === "unsynced_local";
    hasPartialEvidence = hasPartialEvidence || item.freshness === "partial";
    hasConfounders = hasConfounders || item.hasConfounders;
  }

  return {
    evidenceCount: evidence.length,
    sourceCount: sourceCount(evidence),
    minimumCompletenessScore: minimumCompleteness(evidence),
    matchedDataPointTotal,
    hasCachedEvidence,
    hasStaleEvidence,
    hasUnsyncedEvidence,
    hasPartialEvidence,
    hasConfounders,
  };
}

export function validateInsightQuality(insight: InsightQualityContract): InsightQualityValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!insight.insightId.trim()) errors.push("Insight id is required.");
  if (!insight.userScoped) errors.push("Insight must be user scoped.");
  if (!insight.title.trim()) errors.push("Insight title is required.");
  if (!insight.claimText.trim()) errors.push("Insight claim text is required.");
  if (insight.evidence.length === 0) errors.push("Insight requires at least one evidence item.");

  for (const item of insight.evidence) {
    if (!item.evidenceId.trim()) errors.push("Evidence id is required.");
    if (item.completenessScore < 0 || item.completenessScore > 1) errors.push("Evidence completeness score must stay between 0 and 1.");
    if (item.matchedDataPoints < 0) errors.push("Matched data points cannot be negative.");
    if (item.staleAgeDays < 0) errors.push("Stale age days cannot be negative.");
    if (item.qualityLevel === "invalid") errors.push("Invalid evidence quality blocks insight.");
    if (item.qualityLevel === "insufficient_data" || item.qualityLevel === "not_ready") warnings.push("Evidence is not ready for confident insight.");
    if (item.freshness === "missing") warnings.push("Missing evidence freshness blocks confident insight.");
    if (item.hasConfounders) warnings.push("Insight evidence includes confounders.");
    if (item.includesUnsyncedRecords) warnings.push("Insight evidence includes unsynced records.");
  }

  const provenanceSummary = summarizeProvenance(insight.evidence);

  if (insight.claimType === "correlation" && provenanceSummary.matchedDataPointTotal < 7) {
    errors.push("Correlation insight requires at least 7 matched data points.");
  }

  if (insight.claimType === "trend" && provenanceSummary.matchedDataPointTotal < 4) {
    errors.push("Trend insight requires at least 4 logged data points.");
  }

  if (insight.claimType === "experiment_readiness" && provenanceSummary.evidenceCount < 1) {
    errors.push("Experiment readiness insight requires experiment evidence.");
  }

  if (insight.causalityClaimed) {
    errors.push("Insight contract cannot claim causality.");
  }

  if (insight.runtimeDataReadsEnabled) errors.push("Insight contract must not enable runtime data reads.");
  if (insight.schemaWritesEnabled) errors.push("Insight contract must not enable schema writes.");
  if (insight.supabaseCallsEnabled) errors.push("Insight contract must not enable Supabase calls.");
  if (insight.localStorageCoreDataEnabled) errors.push("Insight contract must not allow localStorage core data.");
  if (insight.localCarnosRuntimeRequired) errors.push("Insight contract must not require local Carnos runtime.");

  const hasInsufficientEvidence =
    insight.evidence.length === 0 ||
    provenanceSummary.minimumCompletenessScore < 0.5 ||
    insight.evidence.some((item) => item.qualityLevel === "insufficient_data" || item.qualityLevel === "not_ready" || item.freshness === "missing");

  const disclosureRequirements = buildDisclosureRequirements({
    evidence: insight.evidence,
    hasInsufficientEvidence,
    causalityClaimed: insight.causalityClaimed,
    claimType: insight.claimType,
  });

  const hasDisclosureBurden = disclosureRequirements.some((requirement) => requirement !== "none");

  const qualityLevel: InsightQualityLevel =
    errors.length > 0
      ? "invalid"
      : hasInsufficientEvidence
        ? "insufficient_data"
        : provenanceSummary.minimumCompletenessScore < 0.75
          ? "low_confidence"
          : provenanceSummary.hasConfounders || provenanceSummary.hasCachedEvidence || provenanceSummary.hasStaleEvidence || provenanceSummary.hasUnsyncedEvidence || provenanceSummary.hasPartialEvidence
            ? "medium_confidence"
            : "high_confidence";

  const actionReadiness: InsightActionReadiness =
    qualityLevel === "invalid" || qualityLevel === "insufficient_data"
      ? "not_actionable"
      : insight.suggestedActionText === null
        ? "preview_only"
        : qualityLevel === "high_confidence" && !hasDisclosureBurden
          ? "safe_to_suggest_without_write"
          : "candidate_requires_review";

  const memoryCandidateAllowed =
    Boolean(insight.memoryCandidateText?.trim()) &&
    qualityLevel !== "invalid" &&
    qualityLevel !== "insufficient_data" &&
    insight.claimType === "lesson_candidate";

  const carnosExplanationLimit =
    qualityLevel === "invalid"
      ? "Carnos must not present this as a valid insight."
      : qualityLevel === "insufficient_data"
        ? "Carnos must say there is not enough data for this insight."
        : disclosureRequirements.includes("avoid_causal_claims")
          ? "Carnos must avoid causal claims and explain correlation-not-causation limits."
          : hasDisclosureBurden
            ? "Carnos must disclose provenance limits before explaining this insight."
            : "Carnos may explain this insight as high confidence without claiming certainty.";

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    qualityLevel,
    disclosureRequirements,
    actionReadiness,
    memoryCandidateAllowed,
    carnosExplanationLimit,
    provenanceSummary,
  };
}

export function summarizeInsightQualityContract() {
  return {
    phase: "18F",
    qualityLevels: ["high_confidence", "medium_confidence", "low_confidence", "insufficient_data", "invalid"] as const,
    claimTypes: ["observation", "trend", "comparison", "correlation", "experiment_readiness", "lesson_candidate", "recommendation_candidate"] as const,
    provenanceSources: ["metric_registry", "analytics_snapshot", "self_experiment", "manual_note", "memory_context", "deterministic_fallback"] as const,
    disclosureRequirements: ["none", "disclose_cached_context", "disclose_stale_context", "disclose_unsynced_context", "disclose_partial_context", "disclose_deterministic_preview", "disclose_insufficient_data", "disclose_confounders", "avoid_causal_claims"] as const,
    actionReadinessStates: ["not_actionable", "preview_only", "candidate_requires_review", "safe_to_suggest_without_write"] as const,
    runtimeDataReadsEnabled: PHASE_18F_INSIGHT_QUALITY_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18F_INSIGHT_QUALITY_BOUNDARY.schemaWritesEnabled,
    localCarnosRuntimeRequired: PHASE_18F_INSIGHT_QUALITY_BOUNDARY.localCarnosRuntimeRequired,
  } as const;
}
