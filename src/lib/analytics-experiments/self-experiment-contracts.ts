import {
  type DataQualityLevel,
  type MetricDataQualityResult,
  type MetricSensitivity,
  getMetricDefinition,
} from "./metric-registry";

export type SelfExperimentDomain =
  | "career"
  | "learning"
  | "research"
  | "health_body"
  | "sleep"
  | "nutrition"
  | "fitness"
  | "creativity"
  | "life_admin"
  | "custom";

export type SelfExperimentLifecycleStage =
  | "draft"
  | "planned"
  | "baseline"
  | "active"
  | "paused"
  | "completed"
  | "reviewed"
  | "archived"
  | "invalid";

export type SelfExperimentCadence = "daily" | "weekly" | "custom";
export type SelfExperimentHypothesisDirection = "increase" | "decrease" | "stabilize" | "explore";
export type SelfExperimentSourceMode = "online_source_of_truth" | "eligible_offline_cache" | "mixed_online_offline" | "unsynced_local" | "deterministic_preview";
export type SelfExperimentEvaluationReadiness = "ready" | "ready_with_warnings" | "not_ready" | "invalid";
export type SelfExperimentLessonStatus = "not_started" | "drafted" | "reviewed" | "approved_for_memory_candidate";

export interface SelfExperimentMeasurementRule {
  readonly metricId: string;
  readonly minimumBaselineDays: number;
  readonly minimumActiveDays: number;
  readonly minimumMeasurements: number;
  readonly allowPartialCurrentPeriod: boolean;
}

export interface SelfExperimentConfounder {
  readonly id: string;
  readonly label: string;
  readonly severity: "low" | "medium" | "high";
  readonly notes: string;
}

export interface SelfExperimentTemplate {
  readonly templateId: string;
  readonly title: string;
  readonly domain: SelfExperimentDomain;
  readonly hypothesisDirection: SelfExperimentHypothesisDirection;
  readonly primaryMetricId: string;
  readonly supportingMetricIds: readonly string[];
  readonly cadence: SelfExperimentCadence;
  readonly measurementRules: readonly SelfExperimentMeasurementRule[];
  readonly sensitivity: MetricSensitivity;
  readonly offlineCaptureAllowed: boolean;
  readonly localCarnosRuntimeRequired: false;
}

export interface SelfExperimentContract {
  readonly experimentId: string;
  readonly userScoped: true;
  readonly title: string;
  readonly domain: SelfExperimentDomain;
  readonly lifecycleStage: SelfExperimentLifecycleStage;
  readonly hypothesis: string;
  readonly hypothesisDirection: SelfExperimentHypothesisDirection;
  readonly primaryMetricId: string;
  readonly supportingMetricIds: readonly string[];
  readonly baselineStartIso: string | null;
  readonly baselineEndIso: string | null;
  readonly activeStartIso: string | null;
  readonly activeEndIso: string | null;
  readonly cadence: SelfExperimentCadence;
  readonly measurementRules: readonly SelfExperimentMeasurementRule[];
  readonly confounders: readonly SelfExperimentConfounder[];
  readonly sourceMode: SelfExperimentSourceMode;
  readonly lessonStatus: SelfExperimentLessonStatus;
  readonly lessonSummary: string | null;
  readonly localCarnosRuntimeRequired: false;
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly localStorageCoreDataEnabled: false;
}

export interface SelfExperimentMeasurementSummary {
  readonly metricId: string;
  readonly baselineDays: number;
  readonly activeDays: number;
  readonly measurements: number;
  readonly quality: MetricDataQualityResult;
  readonly hasConfounders: boolean;
}

export interface SelfExperimentValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly lifecycleStage: SelfExperimentLifecycleStage;
  readonly evaluationReadiness: SelfExperimentEvaluationReadiness;
  readonly qualityLevel: DataQualityLevel;
  readonly comparisonAllowed: boolean;
  readonly lessonCaptureAllowed: boolean;
  readonly memoryCandidateAllowed: boolean;
  readonly carnosExplanationLimit: string;
}

export const PHASE_18E_SELF_EXPERIMENT_BOUNDARY = {
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeExperimentDataEnabled: false,
  localStorageCoreDataEnabled: false,
  localCarnosRuntimeRequired: false,
  deterministicFallbackRequired: true,
} as const;

export const DEFAULT_SELF_EXPERIMENT_TEMPLATES: readonly SelfExperimentTemplate[] = [
  {
    templateId: "sleep_reset_experiment",
    title: "Sleep Reset Experiment",
    domain: "sleep",
    hypothesisDirection: "stabilize",
    primaryMetricId: "sleep_consistency",
    supportingMetricIds: ["daily_checkin_count", "workout_consistency"],
    cadence: "daily",
    measurementRules: [
      {
        metricId: "sleep_consistency",
        minimumBaselineDays: 7,
        minimumActiveDays: 7,
        minimumMeasurements: 7,
        allowPartialCurrentPeriod: false,
      },
    ],
    sensitivity: "sensitive",
    offlineCaptureAllowed: true,
    localCarnosRuntimeRequired: false,
  },
  {
    templateId: "career_sprint_experiment",
    title: "Career Sprint Experiment",
    domain: "career",
    hypothesisDirection: "increase",
    primaryMetricId: "job_application_velocity",
    supportingMetricIds: ["networking_touchpoints", "learning_consistency"],
    cadence: "weekly",
    measurementRules: [
      {
        metricId: "job_application_velocity",
        minimumBaselineDays: 7,
        minimumActiveDays: 7,
        minimumMeasurements: 2,
        allowPartialCurrentPeriod: false,
      },
      {
        metricId: "networking_touchpoints",
        minimumBaselineDays: 7,
        minimumActiveDays: 7,
        minimumMeasurements: 2,
        allowPartialCurrentPeriod: false,
      },
    ],
    sensitivity: "private",
    offlineCaptureAllowed: true,
    localCarnosRuntimeRequired: false,
  },
  {
    templateId: "learning_consistency_experiment",
    title: "Learning Consistency Experiment",
    domain: "learning",
    hypothesisDirection: "increase",
    primaryMetricId: "learning_consistency",
    supportingMetricIds: ["daily_checkin_count", "research_output_count"],
    cadence: "daily",
    measurementRules: [
      {
        metricId: "learning_consistency",
        minimumBaselineDays: 7,
        minimumActiveDays: 7,
        minimumMeasurements: 7,
        allowPartialCurrentPeriod: false,
      },
    ],
    sensitivity: "private",
    offlineCaptureAllowed: true,
    localCarnosRuntimeRequired: false,
  },
  {
    templateId: "fitness_consistency_experiment",
    title: "Fitness Consistency Experiment",
    domain: "fitness",
    hypothesisDirection: "increase",
    primaryMetricId: "workout_consistency",
    supportingMetricIds: ["sleep_consistency", "calorie_logging_consistency"],
    cadence: "daily",
    measurementRules: [
      {
        metricId: "workout_consistency",
        minimumBaselineDays: 7,
        minimumActiveDays: 7,
        minimumMeasurements: 7,
        allowPartialCurrentPeriod: false,
      },
    ],
    sensitivity: "sensitive",
    offlineCaptureAllowed: true,
    localCarnosRuntimeRequired: false,
  },
];

function isIsoDateTime(value: string | null): boolean {
  if (value === null) return false;
  return Number.isFinite(Date.parse(value));
}

function hasOrderedRange(startIso: string | null, endIso: string | null): boolean {
  if (!isIsoDateTime(startIso) || !isIsoDateTime(endIso)) return false;
  return Date.parse(startIso as string) < Date.parse(endIso as string);
}

function registeredMetricIds(experiment: SelfExperimentContract): readonly string[] {
  return [experiment.primaryMetricId, ...experiment.supportingMetricIds];
}

function worstQualityLevel(summaries: readonly SelfExperimentMeasurementSummary[]): DataQualityLevel {
  if (summaries.some((summary) => summary.quality.qualityLevel === "invalid")) return "invalid";
  if (summaries.some((summary) => summary.quality.qualityLevel === "insufficient_data")) return "insufficient_data";
  if (summaries.some((summary) => summary.quality.qualityLevel === "low_confidence")) return "low_confidence";
  if (summaries.some((summary) => summary.quality.qualityLevel === "medium_confidence")) return "medium_confidence";
  return "high_confidence";
}

export function listSelfExperimentTemplates(): readonly SelfExperimentTemplate[] {
  return DEFAULT_SELF_EXPERIMENT_TEMPLATES;
}

export function getSelfExperimentTemplate(templateId: string): SelfExperimentTemplate | undefined {
  return DEFAULT_SELF_EXPERIMENT_TEMPLATES.find((template) => template.templateId === templateId);
}

export function validateSelfExperimentTemplate(template: SelfExperimentTemplate): SelfExperimentValidationResult {
  const experiment = buildSelfExperimentDraftFromTemplate({
    experimentId: "template_validation_preview",
    template,
    hypothesis: "Template validation preview.",
    baselineStartIso: null,
    baselineEndIso: null,
    activeStartIso: null,
    activeEndIso: null,
  });

  return validateSelfExperiment(experiment, []);
}

export function buildSelfExperimentDraftFromTemplate(input: {
  readonly experimentId: string;
  readonly template: SelfExperimentTemplate;
  readonly hypothesis: string;
  readonly baselineStartIso: string | null;
  readonly baselineEndIso: string | null;
  readonly activeStartIso: string | null;
  readonly activeEndIso: string | null;
}): SelfExperimentContract {
  return {
    experimentId: input.experimentId,
    userScoped: true,
    title: input.template.title,
    domain: input.template.domain,
    lifecycleStage: "draft",
    hypothesis: input.hypothesis,
    hypothesisDirection: input.template.hypothesisDirection,
    primaryMetricId: input.template.primaryMetricId,
    supportingMetricIds: input.template.supportingMetricIds,
    baselineStartIso: input.baselineStartIso,
    baselineEndIso: input.baselineEndIso,
    activeStartIso: input.activeStartIso,
    activeEndIso: input.activeEndIso,
    cadence: input.template.cadence,
    measurementRules: input.template.measurementRules,
    confounders: [],
    sourceMode: "deterministic_preview",
    lessonStatus: "not_started",
    lessonSummary: null,
    localCarnosRuntimeRequired: false,
    runtimeDataReadsEnabled: false,
    schemaWritesEnabled: false,
    supabaseCallsEnabled: false,
    localStorageCoreDataEnabled: false,
  };
}

export function validateSelfExperiment(
  experiment: SelfExperimentContract,
  measurementSummaries: readonly SelfExperimentMeasurementSummary[],
): SelfExperimentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!experiment.experimentId.trim()) errors.push("Experiment id is required.");
  if (!experiment.userScoped) errors.push("Experiment must be user scoped.");
  if (!experiment.title.trim()) errors.push("Experiment title is required.");
  if (!experiment.hypothesis.trim()) errors.push("Experiment hypothesis is required.");
  if (!getMetricDefinition(experiment.primaryMetricId)) errors.push("Primary metric is not registered: " + experiment.primaryMetricId);

  const allMetricIds = registeredMetricIds(experiment);
  for (const metricId of allMetricIds) {
    if (!getMetricDefinition(metricId)) errors.push("Experiment metric is not registered: " + metricId);
  }

  if (experiment.lifecycleStage === "baseline" || experiment.lifecycleStage === "active" || experiment.lifecycleStage === "completed" || experiment.lifecycleStage === "reviewed") {
    if (!hasOrderedRange(experiment.baselineStartIso, experiment.baselineEndIso)) errors.push("Baseline range is required before experiment evaluation.");
  }

  if (experiment.lifecycleStage === "active" || experiment.lifecycleStage === "completed" || experiment.lifecycleStage === "reviewed") {
    if (!hasOrderedRange(experiment.activeStartIso, experiment.activeEndIso)) errors.push("Active range is required before experiment evaluation.");
  }

  if (experiment.lifecycleStage === "reviewed" && !experiment.lessonSummary?.trim()) {
    errors.push("Reviewed experiment requires a lesson summary.");
  }

  if (experiment.lifecycleStage === "archived" && experiment.lessonStatus === "approved_for_memory_candidate" && !experiment.lessonSummary?.trim()) {
    errors.push("Memory candidate lesson requires a lesson summary.");
  }

  if (experiment.confounders.some((confounder) => confounder.severity === "high")) {
    warnings.push("High severity confounders prevent confident experiment claims.");
  }

  if (experiment.sourceMode === "unsynced_local") {
    warnings.push("Experiment includes unsynced local context.");
  }

  if (experiment.sourceMode === "eligible_offline_cache") {
    warnings.push("Experiment context is based on eligible offline cache.");
  }

  if (experiment.sourceMode === "deterministic_preview") {
    warnings.push("Experiment is deterministic preview only.");
  }

  for (const rule of experiment.measurementRules) {
    const summary = measurementSummaries.find((item) => item.metricId === rule.metricId);
    if (!summary) {
      warnings.push("Measurement summary is missing for metric: " + rule.metricId);
      continue;
    }

    if (summary.baselineDays < rule.minimumBaselineDays) {
      errors.push("Not enough baseline days for metric: " + rule.metricId);
    }

    if (summary.activeDays < rule.minimumActiveDays) {
      errors.push("Not enough active days for metric: " + rule.metricId);
    }

    if (summary.measurements < rule.minimumMeasurements) {
      errors.push("Not enough measurements for metric: " + rule.metricId);
    }

    if (summary.hasConfounders) {
      warnings.push("Measurement quality includes confounders for metric: " + rule.metricId);
    }

    if (summary.quality.qualityLevel === "invalid") {
      errors.push("Invalid measurement quality for metric: " + rule.metricId);
    }

    if (summary.quality.qualityLevel === "insufficient_data") {
      errors.push("Insufficient measurement data for metric: " + rule.metricId);
    }
  }

  if (experiment.runtimeDataReadsEnabled) errors.push("Experiment contract must not enable runtime data reads.");
  if (experiment.schemaWritesEnabled) errors.push("Experiment contract must not enable schema writes.");
  if (experiment.supabaseCallsEnabled) errors.push("Experiment contract must not enable Supabase calls.");
  if (experiment.localStorageCoreDataEnabled) errors.push("Experiment contract must not allow localStorage core data.");
  if (experiment.localCarnosRuntimeRequired) errors.push("Experiment contract must not require local Carnos runtime.");

  const qualityLevel = measurementSummaries.length === 0 ? "insufficient_data" : worstQualityLevel(measurementSummaries);
  const hasHighSeverityConfounder = experiment.confounders.some((confounder) => confounder.severity === "high");
  const hasAnyConfounder = experiment.confounders.length > 0 || measurementSummaries.some((summary) => summary.hasConfounders);

  const comparisonAllowed =
    errors.length === 0 &&
    measurementSummaries.length > 0 &&
    qualityLevel !== "invalid" &&
    qualityLevel !== "insufficient_data" &&
    !hasHighSeverityConfounder;

  const evaluationReadiness: SelfExperimentEvaluationReadiness =
    errors.length > 0
      ? "invalid"
      : !comparisonAllowed
        ? "not_ready"
        : warnings.length > 0 || hasAnyConfounder
          ? "ready_with_warnings"
          : "ready";

  const lessonCaptureAllowed =
    experiment.lifecycleStage === "completed" ||
    experiment.lifecycleStage === "reviewed" ||
    experiment.lifecycleStage === "archived";

  const memoryCandidateAllowed =
    lessonCaptureAllowed &&
    experiment.lessonStatus === "approved_for_memory_candidate" &&
    Boolean(experiment.lessonSummary?.trim()) &&
    evaluationReadiness !== "invalid";

  const carnosExplanationLimit =
    experiment.sourceMode === "unsynced_local"
      ? "Carnos must disclose unsynced experiment context."
      : experiment.sourceMode === "eligible_offline_cache"
        ? "Carnos must disclose cached experiment context."
        : experiment.sourceMode === "deterministic_preview"
          ? "Carnos must disclose deterministic preview context."
          : hasAnyConfounder
            ? "Carnos must disclose confounders and avoid causal claims."
            : evaluationReadiness === "ready"
              ? "Carnos may explain experiment readiness without claiming proof."
              : "Carnos must explain why experiment evidence is not ready.";

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    lifecycleStage: experiment.lifecycleStage,
    evaluationReadiness,
    qualityLevel,
    comparisonAllowed,
    lessonCaptureAllowed,
    memoryCandidateAllowed,
    carnosExplanationLimit,
  };
}

export function summarizeSelfExperimentContract() {
  return {
    phase: "18E",
    lifecycleStages: ["draft", "planned", "baseline", "active", "paused", "completed", "reviewed", "archived", "invalid"] as const,
    evaluationReadinessStates: ["ready", "ready_with_warnings", "not_ready", "invalid"] as const,
    sourceModes: ["online_source_of_truth", "eligible_offline_cache", "mixed_online_offline", "unsynced_local", "deterministic_preview"] as const,
    templateCount: DEFAULT_SELF_EXPERIMENT_TEMPLATES.length,
    runtimeDataReadsEnabled: PHASE_18E_SELF_EXPERIMENT_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18E_SELF_EXPERIMENT_BOUNDARY.schemaWritesEnabled,
    localCarnosRuntimeRequired: PHASE_18E_SELF_EXPERIMENT_BOUNDARY.localCarnosRuntimeRequired,
  } as const;
}
