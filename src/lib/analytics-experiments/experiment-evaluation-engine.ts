import type {
  InsightDisclosureRequirement,
  InsightQualityLevel,
} from "./insight-quality-provenance";

import {
  type AnalyticsEngineSourceMode,
  type AnalyticsMetricPoint,
  compareMetricWindows,
} from "./trend-correlation-comparison-engine";

export type ExperimentEvaluationStatus =
  | "ready"
  | "ready_with_warnings"
  | "not_ready"
  | "invalid";

export type ExperimentValidityState =
  | "valid_result"
  | "inconclusive"
  | "insufficient_baseline"
  | "insufficient_active_window"
  | "too_many_confounders"
  | "missing_measurements"
  | "invalid";

export type ExperimentOutcomeDirection =
  | "improved"
  | "worsened"
  | "unchanged"
  | "inconclusive"
  | "invalid";

export type ExperimentLessonCandidateType =
  | "continue"
  | "adjust"
  | "stop"
  | "repeat_with_better_measurement"
  | "insufficient_data"
  | "invalid";

export type ExperimentEvaluationConfidence =
  | "high"
  | "medium"
  | "low"
  | "insufficient_data"
  | "invalid";

export interface ExperimentMeasurementPoint extends AnalyticsMetricPoint {
  readonly measurementId: string;
  readonly expected: boolean;
}

export interface ExperimentEvaluationInput {
  readonly experimentId: string;
  readonly templateId: string;
  readonly metricId: string;
  readonly userScoped: true;
  readonly baselinePoints: readonly ExperimentMeasurementPoint[];
  readonly activePoints: readonly ExperimentMeasurementPoint[];
  readonly minimumBaselinePoints: number;
  readonly minimumActivePoints: number;
  readonly expectedBaselineMeasurements: number;
  readonly expectedActiveMeasurements: number;
  readonly meaningfulChangeRatio: number;
  readonly confounderWarningThreshold: number;
  readonly confounderInvalidThreshold: number;
  readonly allowCausalClaim: false;
  readonly sourceMode: AnalyticsEngineSourceMode;
}

export interface ExperimentLessonCandidate {
  readonly candidateType: ExperimentLessonCandidateType;
  readonly title: string;
  readonly summary: string;
  readonly memoryCandidateAllowed: boolean;
  readonly requiresReviewBeforeMemoryWrite: true;
  readonly actionExecutionAllowed: false;
}

export interface ExperimentEvaluationResult {
  readonly valid: boolean;
  readonly experimentId: string;
  readonly templateId: string;
  readonly metricId: string;
  readonly status: ExperimentEvaluationStatus;
  readonly validityState: ExperimentValidityState;
  readonly outcomeDirection: ExperimentOutcomeDirection;
  readonly qualityLevel: InsightQualityLevel;
  readonly confidence: ExperimentEvaluationConfidence;
  readonly baselineAverage: number;
  readonly activeAverage: number;
  readonly absoluteChange: number;
  readonly percentChange: number;
  readonly baselineCompleteness: number;
  readonly activeCompleteness: number;
  readonly totalCompleteness: number;
  readonly confounderCount: number;
  readonly confounderRatio: number;
  readonly baselineDataPointCount: number;
  readonly activeDataPointCount: number;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly lessonCandidate: ExperimentLessonCandidate;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly carnosExplanationLimit: string;
}

export interface ExperimentEvaluationEngineSummary {
  readonly phase: "18J";
  readonly codedCapabilities: readonly string[];
  readonly runtimeDataReadsEnabled: false;
  readonly runtimeDataWritesEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly fakeExperimentDataEnabled: false;
  readonly memoryWriteEnabled: false;
  readonly actionExecutionEnabled: false;
  readonly causalClaimsAllowed: false;
  readonly localCarnosRuntimeRequired: false;
}

export const PHASE_18J_EXPERIMENT_EVALUATION_SOURCE_MODES = [
  "online_source_of_truth",
  "eligible_offline_cache",
  "mixed_online_offline",
  "unsynced_local",
  "deterministic_preview",
] as const;

export const PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY = {
  runtimeDataReadsEnabled: false,
  runtimeDataWritesEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeExperimentDataEnabled: false,
  localStorageCoreDataEnabled: false,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  causalClaimsAllowed: false,
  localCarnosRuntimeRequired: false,
  deterministicEvaluationImplemented: true,
} as const;

function roundMetric(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(4));
}

function average(values: readonly number[]): number {
  if (values.length === 0) return 0;
  let total = 0;
  for (const value of values) total += value;
  return roundMetric(total / values.length);
}

function completeness(actual: number, expected: number): number {
  if (expected <= 0) return 0;
  return roundMetric(Math.min(1, Math.max(0, actual / expected)));
}

function countConfounders(points: readonly ExperimentMeasurementPoint[]): number {
  return points.filter((point) => point.hasConfounder).length;
}

function hasAnySourceMode(points: readonly ExperimentMeasurementPoint[], sourceMode: AnalyticsEngineSourceMode): boolean {
  return points.some((point) => point.sourceMode === sourceMode);
}

function hasInvalidMeasurement(points: readonly ExperimentMeasurementPoint[]): boolean {
  return points.some((point) => !point.measurementId.trim() || !Number.isFinite(point.value) || !point.userScoped);
}

function buildExperimentDisclosureRequirements(input: {
  readonly insufficientData: boolean;
  readonly hasConfounder: boolean;
  readonly hasCached: boolean;
  readonly hasUnsynced: boolean;
  readonly hasMixed: boolean;
  readonly hasDeterministic: boolean;
}): readonly InsightDisclosureRequirement[] {
  const requirements = new Set<InsightDisclosureRequirement>();

  if (input.insufficientData) requirements.add("disclose_insufficient_data");
  if (input.hasConfounder) {
    requirements.add("disclose_confounders");
    requirements.add("avoid_causal_claims");
  }
  if (input.hasCached) requirements.add("disclose_cached_context");
  if (input.hasUnsynced) requirements.add("disclose_unsynced_context");
  if (input.hasMixed) requirements.add("disclose_partial_context");
  if (input.hasDeterministic) requirements.add("disclose_deterministic_preview");

  requirements.add("avoid_causal_claims");

  return [...requirements];
}

function qualityFromEvaluation(input: {
  readonly valid: boolean;
  readonly insufficientData: boolean;
  readonly totalCompleteness: number;
  readonly confounderRatio: number;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
}): InsightQualityLevel {
  if (!input.valid) return "invalid";
  if (input.insufficientData) return "insufficient_data";
  if (input.totalCompleteness < 0.65) return "low_confidence";
  if (input.confounderRatio >= 0.35) return "low_confidence";
  if (input.disclosureRequirements.some((item) => item !== "avoid_causal_claims")) return "medium_confidence";
  if (input.totalCompleteness >= 0.9 && input.confounderRatio <= 0.15) return "high_confidence";
  return "medium_confidence";
}

function confidenceFromQuality(qualityLevel: InsightQualityLevel): ExperimentEvaluationConfidence {
  if (qualityLevel === "high_confidence") return "high";
  if (qualityLevel === "medium_confidence") return "medium";
  if (qualityLevel === "low_confidence") return "low";
  if (qualityLevel === "insufficient_data") return "insufficient_data";
  return "invalid";
}

function statusFromSignals(input: {
  readonly valid: boolean;
  readonly insufficientData: boolean;
  readonly warnings: readonly string[];
}): ExperimentEvaluationStatus {
  if (!input.valid) return "invalid";
  if (input.insufficientData) return "not_ready";
  if (input.warnings.length > 0) return "ready_with_warnings";
  return "ready";
}

function outcomeFromPercentChange(input: {
  readonly valid: boolean;
  readonly insufficientData: boolean;
  readonly percentChange: number;
  readonly meaningfulChangeRatio: number;
}): ExperimentOutcomeDirection {
  if (!input.valid) return "invalid";
  if (input.insufficientData) return "inconclusive";
  if (input.percentChange >= input.meaningfulChangeRatio) return "improved";
  if (input.percentChange <= -input.meaningfulChangeRatio) return "worsened";
  return "unchanged";
}

function validityStateFromSignals(input: {
  readonly valid: boolean;
  readonly baselineInsufficient: boolean;
  readonly activeInsufficient: boolean;
  readonly missingMeasurements: boolean;
  readonly confounderRatio: number;
  readonly confounderInvalidThreshold: number;
}): ExperimentValidityState {
  if (!input.valid) return "invalid";
  if (input.baselineInsufficient) return "insufficient_baseline";
  if (input.activeInsufficient) return "insufficient_active_window";
  if (input.missingMeasurements) return "missing_measurements";
  if (input.confounderRatio >= input.confounderInvalidThreshold) return "too_many_confounders";
  return "valid_result";
}

function buildLessonCandidate(input: {
  readonly status: ExperimentEvaluationStatus;
  readonly validityState: ExperimentValidityState;
  readonly outcomeDirection: ExperimentOutcomeDirection;
  readonly metricId: string;
  readonly percentChange: number;
  readonly qualityLevel: InsightQualityLevel;
}): ExperimentLessonCandidate {
  if (input.status === "invalid" || input.validityState === "invalid") {
    return {
      candidateType: "invalid",
      title: "Invalid experiment result",
      summary: "This experiment result should not be used because the evaluation contract is invalid.",
      memoryCandidateAllowed: false,
      requiresReviewBeforeMemoryWrite: true,
      actionExecutionAllowed: false,
    };
  }

  if (input.status === "not_ready" || input.qualityLevel === "insufficient_data") {
    return {
      candidateType: "insufficient_data",
      title: "Not enough experiment data",
      summary: "This experiment needs more baseline or active-window measurements before Carnos can summarize a lesson.",
      memoryCandidateAllowed: false,
      requiresReviewBeforeMemoryWrite: true,
      actionExecutionAllowed: false,
    };
  }

  if (input.validityState !== "valid_result") {
    return {
      candidateType: "repeat_with_better_measurement",
      title: "Repeat with better measurement",
      summary: "This experiment has measurement or confounder limits, so the safest lesson is to repeat it with cleaner tracking.",
      memoryCandidateAllowed: true,
      requiresReviewBeforeMemoryWrite: true,
      actionExecutionAllowed: false,
    };
  }

  if (input.outcomeDirection === "improved") {
    return {
      candidateType: "continue",
      title: "Continue the experiment behavior",
      summary: "The active window improved " + input.metricId + " by " + roundMetric(input.percentChange * 100) + "% compared with baseline. Treat this as a candidate lesson, not proof.",
      memoryCandidateAllowed: true,
      requiresReviewBeforeMemoryWrite: true,
      actionExecutionAllowed: false,
    };
  }

  if (input.outcomeDirection === "worsened") {
    return {
      candidateType: "adjust",
      title: "Adjust the experiment behavior",
      summary: "The active window worsened " + input.metricId + " by " + roundMetric(Math.abs(input.percentChange) * 100) + "% compared with baseline. Treat this as a candidate lesson, not proof.",
      memoryCandidateAllowed: true,
      requiresReviewBeforeMemoryWrite: true,
      actionExecutionAllowed: false,
    };
  }

  return {
    candidateType: "repeat_with_better_measurement",
    title: "No clear experiment effect",
    summary: "The active window did not change meaningfully compared with baseline. The safest next step is to repeat or refine the experiment.",
    memoryCandidateAllowed: true,
    requiresReviewBeforeMemoryWrite: true,
    actionExecutionAllowed: false,
  };
}

function carnosLimit(input: {
  readonly valid: boolean;
  readonly status: ExperimentEvaluationStatus;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
}): string {
  if (!input.valid) return "Carnos must not present this experiment evaluation as valid.";
  if (input.status === "not_ready") return "Carnos must say this experiment does not have enough data yet.";
  if (input.disclosureRequirements.some((item) => item !== "avoid_causal_claims")) {
    return "Carnos must disclose cached, unsynced, partial, deterministic, or confounder limits before explaining this experiment.";
  }
  return "Carnos may explain this as a deterministic experiment evaluation, but must not claim proof or causality.";
}

export function evaluateSelfExperiment(input: ExperimentEvaluationInput): ExperimentEvaluationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!input.experimentId.trim()) errors.push("Experiment id is required.");
  if (!input.templateId.trim()) errors.push("Experiment template id is required.");
  if (!input.metricId.trim()) errors.push("Experiment metric id is required.");
  if (!input.userScoped) errors.push("Experiment evaluation must be user scoped.");
  if (input.allowCausalClaim) errors.push("Experiment evaluation must not allow causal claims.");
  if (input.minimumBaselinePoints < 2) errors.push("Experiment minimum baseline points must be at least 2.");
  if (input.minimumActivePoints < 2) errors.push("Experiment minimum active points must be at least 2.");
  if (input.expectedBaselineMeasurements < input.minimumBaselinePoints) errors.push("Expected baseline measurements must cover minimum baseline points.");
  if (input.expectedActiveMeasurements < input.minimumActivePoints) errors.push("Expected active measurements must cover minimum active points.");

  const baselineInsufficient = input.baselinePoints.length < input.minimumBaselinePoints;
  const activeInsufficient = input.activePoints.length < input.minimumActivePoints;
  const missingMeasurements =
    input.baselinePoints.length < input.expectedBaselineMeasurements ||
    input.activePoints.length < input.expectedActiveMeasurements;

  if (baselineInsufficient) warnings.push("Experiment baseline window has insufficient data.");
  if (activeInsufficient) warnings.push("Experiment active window has insufficient data.");
  if (missingMeasurements) warnings.push("Experiment has missing expected measurements.");

  const allPoints = [...input.baselinePoints, ...input.activePoints];
  if (hasInvalidMeasurement(allPoints)) errors.push("Experiment evaluation contains invalid or non-user-scoped measurement.");

  const comparison = compareMetricWindows({
    metricId: input.metricId,
    userScoped: true,
    baselinePoints: input.baselinePoints,
    comparisonPoints: input.activePoints,
    minimumDataPointsPerWindow: Math.max(input.minimumBaselinePoints, input.minimumActivePoints),
    meaningfulChangeRatio: input.meaningfulChangeRatio,
    allowCausalClaim: false,
  });

  const baselineAverage = average(input.baselinePoints.map((point) => point.value));
  const activeAverage = average(input.activePoints.map((point) => point.value));
  const absoluteChange = roundMetric(activeAverage - baselineAverage);
  const percentChange = baselineAverage === 0 ? 0 : roundMetric(absoluteChange / Math.abs(baselineAverage));

  const baselineCompleteness = completeness(input.baselinePoints.length, input.expectedBaselineMeasurements);
  const activeCompleteness = completeness(input.activePoints.length, input.expectedActiveMeasurements);
  const totalCompleteness = roundMetric((baselineCompleteness + activeCompleteness) / 2);

  const confounderCount = countConfounders(allPoints);
  const confounderRatio = allPoints.length === 0 ? 0 : roundMetric(confounderCount / allPoints.length);

  if (confounderRatio >= input.confounderWarningThreshold) warnings.push("Experiment has confounder warnings.");
  if (confounderRatio >= input.confounderInvalidThreshold) warnings.push("Experiment has too many confounders for a clean result.");

  const valid = errors.length === 0;
  const insufficientData = baselineInsufficient || activeInsufficient;
  const disclosureRequirements = buildExperimentDisclosureRequirements({
    insufficientData,
    hasConfounder: confounderCount > 0,
    hasCached: hasAnySourceMode(allPoints, "eligible_offline_cache"),
    hasUnsynced: hasAnySourceMode(allPoints, "unsynced_local"),
    hasMixed: hasAnySourceMode(allPoints, "mixed_online_offline"),
    hasDeterministic: hasAnySourceMode(allPoints, "deterministic_preview"),
  });

  const validityState = validityStateFromSignals({
    valid,
    baselineInsufficient,
    activeInsufficient,
    missingMeasurements,
    confounderRatio,
    confounderInvalidThreshold: input.confounderInvalidThreshold,
  });

  const qualityLevel = qualityFromEvaluation({
    valid,
    insufficientData,
    totalCompleteness,
    confounderRatio,
    disclosureRequirements,
  });

  const status = statusFromSignals({
    valid,
    insufficientData,
    warnings,
  });

  const outcomeDirection = outcomeFromPercentChange({
    valid,
    insufficientData,
    percentChange,
    meaningfulChangeRatio: input.meaningfulChangeRatio,
  });

  const lessonCandidate = buildLessonCandidate({
    status,
    validityState,
    outcomeDirection,
    metricId: input.metricId,
    percentChange,
    qualityLevel,
  });

  const mergedWarnings = [...warnings];
  for (const warning of comparison.warnings) {
    if (!mergedWarnings.includes(warning)) mergedWarnings.push(warning);
  }

  return {
    valid,
    experimentId: input.experimentId,
    templateId: input.templateId,
    metricId: input.metricId,
    status,
    validityState,
    outcomeDirection,
    qualityLevel,
    confidence: confidenceFromQuality(qualityLevel),
    baselineAverage,
    activeAverage,
    absoluteChange,
    percentChange,
    baselineCompleteness,
    activeCompleteness,
    totalCompleteness,
    confounderCount,
    confounderRatio,
    baselineDataPointCount: input.baselinePoints.length,
    activeDataPointCount: input.activePoints.length,
    disclosureRequirements,
    lessonCandidate,
    errors,
    warnings: mergedWarnings,
    carnosExplanationLimit: carnosLimit({
      valid,
      status,
      disclosureRequirements,
    }),
  };
}

export function summarizeExperimentEvaluationEngine(): ExperimentEvaluationEngineSummary {
  return {
    phase: "18J",
    codedCapabilities: [
      "baseline vs active comparison",
      "measurement completeness scoring",
      "baseline completeness gate",
      "active-window completeness gate",
      "confounder penalty",
      "experiment validity states",
      "evaluation readiness states",
      "lesson candidate generation",
      "memory candidate boundary",
      "Carnos explanation limits",
      "no fake experiment data",
      "no memory writes",
      "no action execution",
    ],
    runtimeDataReadsEnabled: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.runtimeDataReadsEnabled,
    runtimeDataWritesEnabled: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.runtimeDataWritesEnabled,
    schemaWritesEnabled: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.supabaseCallsEnabled,
    fakeExperimentDataEnabled: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.fakeExperimentDataEnabled,
    memoryWriteEnabled: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.memoryWriteEnabled,
    actionExecutionEnabled: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.actionExecutionEnabled,
    causalClaimsAllowed: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.causalClaimsAllowed,
    localCarnosRuntimeRequired: PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY.localCarnosRuntimeRequired,
  };
}
