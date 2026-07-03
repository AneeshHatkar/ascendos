export type MetricDomain =
  | "life"
  | "goals"
  | "career"
  | "learning"
  | "research"
  | "health_body"
  | "experiments"
  | "analytics"
  | "carnos_memory"
  | "creativity"
  | "life_admin";

export type MetricSensitivity = "normal" | "private" | "sensitive" | "restricted" | "mixed";

export type MetricCacheEligibility =
  | "offline_cache_allowed"
  | "offline_cache_allowed_with_sensitive_rules"
  | "offline_cache_allowed_with_privacy_rules"
  | "live_only"
  | "not_cacheable";

export type MetricSourceMode = "online_live" | "cached_offline" | "mixed_online_cached" | "unsynced_local" | "missing";

export type DataQualityLevel =
  | "high_confidence"
  | "medium_confidence"
  | "low_confidence"
  | "insufficient_data"
  | "invalid";

export type MetricTimeGrain = "daily" | "weekly" | "monthly" | "rolling" | "event_based";

export interface MetricSourceRequirement {
  readonly sourceKey: string;
  readonly required: boolean;
  readonly description: string;
}

export interface MetricMinimumDataRules {
  readonly minimumLoggedDays?: number;
  readonly minimumMatchedPoints?: number;
  readonly minimumBaselineDays?: number;
  readonly minimumMeasurements?: number;
  readonly allowPartialCurrentPeriod: boolean;
}

export interface MetricDefinition {
  readonly id: string;
  readonly label: string;
  readonly domain: MetricDomain;
  readonly description: string;
  readonly timeGrain: MetricTimeGrain;
  readonly sensitivity: MetricSensitivity;
  readonly cacheEligibility: MetricCacheEligibility;
  readonly sourceRequirements: readonly MetricSourceRequirement[];
  readonly minimumDataRules: MetricMinimumDataRules;
  readonly supportsOfflineComputation: boolean;
  readonly supportsCarnosExplanation: boolean;
  readonly supportsExperimentEvaluation: boolean;
  readonly phase18aBRequirement: string;
  readonly localCarnosRuntimeCompatibility: string;
}

export interface MetricDataQualityInput {
  readonly metricId: string;
  readonly loggedDays: number;
  readonly matchedDataPoints: number;
  readonly baselineDays: number;
  readonly measurements: number;
  readonly hasConfounders: boolean;
  readonly currentPeriodComplete: boolean;
  readonly sourceMode: MetricSourceMode;
  readonly unsyncedRecordCount: number;
  readonly staleSnapshotAgeDays: number;
}

export interface MetricDataQualityResult {
  readonly metricId: string;
  readonly qualityLevel: DataQualityLevel;
  readonly completenessScore: number;
  readonly reasons: readonly string[];
  readonly sourceMode: MetricSourceMode;
  readonly canShowTrend: boolean;
  readonly canShowCorrelation: boolean;
  readonly canShowExperimentResult: boolean;
  readonly carnosExplanationLimit: string;
}

export const PHASE_18C_METRIC_REGISTRY_BOUNDARY = {
  runtimeSideEffectsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeMetricDataEnabled: false,
  localStorageCoreDataEnabled: false,
  localCarnosRuntimeRequired: false,
  deterministicFallbackRequired: true,
} as const;

export const DEFAULT_METRIC_DEFINITIONS: readonly MetricDefinition[] = [
  {
    id: "daily_checkin_count",
    label: "Daily Check-in Count",
    domain: "life",
    description: "Counts completed daily check-ins or equivalent daily life logs.",
    timeGrain: "daily",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "daily_log", required: true, description: "Daily log, journal, or proof source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: false,
    phase18aBRequirement: "Must work from online source of truth or eligible offline cache with cached/stale labels.",
    localCarnosRuntimeCompatibility: "Can be included in cached context pack for future local Carnos runtime.",
  },
  {
    id: "goal_progress_signal",
    label: "Goal Progress Signal",
    domain: "goals",
    description: "Summarizes goal progress from goals, tasks, proof, and completion signals.",
    timeGrain: "weekly",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "goal", required: true, description: "Goal source candidate from schema map." },
      { sourceKey: "proof", required: false, description: "Proof/log source candidate when available." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: false,
    phase18aBRequirement: "Must preserve close/reopen and login-to-login continuity.",
    localCarnosRuntimeCompatibility: "Can support offline mentor/accountability responses.",
  },
  {
    id: "job_application_velocity",
    label: "Job Application Velocity",
    domain: "career",
    description: "Tracks job application pace over a selected period.",
    timeGrain: "weekly",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "job_application", required: true, description: "Job application source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Offline-created career records must sync without duplicates.",
    localCarnosRuntimeCompatibility: "Can support offline career sprint guidance.",
  },
  {
    id: "networking_touchpoints",
    label: "Networking Touchpoints",
    domain: "career",
    description: "Counts referral, networking, and outreach activity.",
    timeGrain: "weekly",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "networking", required: true, description: "Networking/referral source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Offline capture must be queued before remote persistence.",
    localCarnosRuntimeCompatibility: "Can support offline outreach planning.",
  },
  {
    id: "learning_consistency",
    label: "Learning Consistency",
    domain: "learning",
    description: "Tracks study sessions, learning streaks, or learning proof activity.",
    timeGrain: "weekly",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "learning_session", required: true, description: "Learning/study source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Cached learning context must be marked cached when offline.",
    localCarnosRuntimeCompatibility: "Can support offline study mentor behavior.",
  },
  {
    id: "research_output_count",
    label: "Research Output Count",
    domain: "research",
    description: "Tracks research notes, paper work, reading outputs, or research proof.",
    timeGrain: "weekly",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "research_output", required: true, description: "Research note/output source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Offline research captures must enter sync queue.",
    localCarnosRuntimeCompatibility: "Can support offline research companion behavior.",
  },
  {
    id: "sleep_consistency",
    label: "Sleep Consistency",
    domain: "health_body",
    description: "Tracks sleep logging consistency and supports sleep reset experiments.",
    timeGrain: "weekly",
    sensitivity: "sensitive",
    cacheEligibility: "offline_cache_allowed_with_sensitive_rules",
    sourceRequirements: [
      { sourceKey: "sleep_log", required: true, description: "Sleep source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, minimumBaselineDays: 3, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Sensitive health/body cache requires stricter offline rules.",
    localCarnosRuntimeCompatibility: "Can support offline sleep guidance only with sensitivity labels.",
  },
  {
    id: "workout_consistency",
    label: "Workout Consistency",
    domain: "health_body",
    description: "Tracks gym or workout consistency and supports body-progress experiments.",
    timeGrain: "weekly",
    sensitivity: "sensitive",
    cacheEligibility: "offline_cache_allowed_with_sensitive_rules",
    sourceRequirements: [
      { sourceKey: "workout_log", required: true, description: "Workout/body source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, minimumBaselineDays: 3, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Sensitive health/body cache requires stricter offline rules.",
    localCarnosRuntimeCompatibility: "Can support offline training accountability with cached-context honesty.",
  },
  {
    id: "calorie_logging_consistency",
    label: "Calorie Logging Consistency",
    domain: "health_body",
    description: "Tracks nutrition/calorie logging consistency for body experiments.",
    timeGrain: "weekly",
    sensitivity: "sensitive",
    cacheEligibility: "offline_cache_allowed_with_sensitive_rules",
    sourceRequirements: [
      { sourceKey: "nutrition_log", required: true, description: "Food/calorie source candidate from schema map." },
    ],
    minimumDataRules: { minimumLoggedDays: 4, minimumBaselineDays: 3, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Sensitive nutrition/body cache requires stricter offline rules.",
    localCarnosRuntimeCompatibility: "Can support offline nutrition accountability with sensitivity labels.",
  },
  {
    id: "experiment_measurement_completeness",
    label: "Experiment Measurement Completeness",
    domain: "experiments",
    description: "Scores whether an experiment has enough measurements for evaluation.",
    timeGrain: "event_based",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "experiment_measurement", required: true, description: "Experiment measurement source candidate from schema map." },
    ],
    minimumDataRules: { minimumMeasurements: 7, minimumBaselineDays: 3, allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: true,
    phase18aBRequirement: "Offline experiment measurements must stay unsynced-labeled until merged.",
    localCarnosRuntimeCompatibility: "Can support offline experiment coaching.",
  },
  {
    id: "analytics_snapshot_freshness",
    label: "Analytics Snapshot Freshness",
    domain: "analytics",
    description: "Tracks whether cached analytics snapshots are fresh, stale, or missing.",
    timeGrain: "rolling",
    sensitivity: "private",
    cacheEligibility: "offline_cache_allowed",
    sourceRequirements: [
      { sourceKey: "analytics_snapshot", required: true, description: "Analytics snapshot source candidate from schema map." },
    ],
    minimumDataRules: { allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: false,
    phase18aBRequirement: "Cached analytics must display stale/cached labels.",
    localCarnosRuntimeCompatibility: "Can support offline summary explanation.",
  },
  {
    id: "carnos_memory_context_availability",
    label: "Carnos Memory Context Availability",
    domain: "carnos_memory",
    description: "Tracks whether approved memory/context is available for Carnos explanations.",
    timeGrain: "rolling",
    sensitivity: "mixed",
    cacheEligibility: "offline_cache_allowed_with_privacy_rules",
    sourceRequirements: [
      { sourceKey: "approved_memory", required: true, description: "Approved memory source candidate from memory/RAG foundation." },
      { sourceKey: "context_pack", required: false, description: "Carnos context pack source candidate when available." },
    ],
    minimumDataRules: { allowPartialCurrentPeriod: true },
    supportsOfflineComputation: true,
    supportsCarnosExplanation: true,
    supportsExperimentEvaluation: false,
    phase18aBRequirement: "Approved memories may be cached only with privacy/sensitive rules.",
    localCarnosRuntimeCompatibility: "Required for future local Carnos runtime context.",
  },
] as const;

function clampCompletenessScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  if (score < 0) return 0;
  if (score > 1) return 1;
  return Number(score.toFixed(4));
}

export function listMetricDefinitions(): readonly MetricDefinition[] {
  return DEFAULT_METRIC_DEFINITIONS;
}

export function getMetricDefinition(metricId: string): MetricDefinition | null {
  return DEFAULT_METRIC_DEFINITIONS.find((definition) => definition.id === metricId) ?? null;
}

export function getMetricDefinitionsByDomain(domain: MetricDomain): readonly MetricDefinition[] {
  return DEFAULT_METRIC_DEFINITIONS.filter((definition) => definition.domain === domain);
}

export function evaluateMetricDataQuality(input: MetricDataQualityInput): MetricDataQualityResult {
  const definition = getMetricDefinition(input.metricId);
  const reasons: string[] = [];

  if (!definition) {
    return {
      metricId: input.metricId,
      qualityLevel: "invalid",
      completenessScore: 0,
      reasons: ["Unknown metric id."],
      sourceMode: input.sourceMode,
      canShowTrend: false,
      canShowCorrelation: false,
      canShowExperimentResult: false,
      carnosExplanationLimit: "Carnos cannot explain an unknown metric.",
    };
  }

  const rules = definition.minimumDataRules;
  const requiredLoggedDays = rules.minimumLoggedDays ?? 0;
  const requiredMatchedPoints = rules.minimumMatchedPoints ?? 0;
  const requiredBaselineDays = rules.minimumBaselineDays ?? 0;
  const requiredMeasurements = rules.minimumMeasurements ?? 0;

  if (input.sourceMode === "missing") reasons.push("Metric source is missing.");
  if (input.unsyncedRecordCount > 0) reasons.push("Metric includes unsynced local records.");
  if (input.staleSnapshotAgeDays > 0) reasons.push("Metric uses a stale cached snapshot.");
  if (input.hasConfounders) reasons.push("Confounders are present.");
  if (!input.currentPeriodComplete && !rules.allowPartialCurrentPeriod) reasons.push("Current period is incomplete.");
  if (input.loggedDays < requiredLoggedDays) reasons.push("Not enough logged days.");
  if (input.matchedDataPoints < requiredMatchedPoints) reasons.push("Not enough matched data points.");
  if (input.baselineDays < requiredBaselineDays) reasons.push("Not enough baseline days.");
  if (input.measurements < requiredMeasurements) reasons.push("Not enough measurements.");

  const ratios = [
    requiredLoggedDays > 0 ? input.loggedDays / requiredLoggedDays : 1,
    requiredMatchedPoints > 0 ? input.matchedDataPoints / requiredMatchedPoints : 1,
    requiredBaselineDays > 0 ? input.baselineDays / requiredBaselineDays : 1,
    requiredMeasurements > 0 ? input.measurements / requiredMeasurements : 1,
  ];

  let completenessScore = clampCompletenessScore(Math.min(...ratios));

  if (input.sourceMode === "missing") completenessScore = 0;
  if (input.hasConfounders) completenessScore = Math.min(completenessScore, 0.74);
  if (input.unsyncedRecordCount > 0) completenessScore = Math.min(completenessScore, 0.74);
  if (input.staleSnapshotAgeDays > 0) completenessScore = Math.min(completenessScore, 0.64);

  let qualityLevel: DataQualityLevel = "high_confidence";
  if (completenessScore <= 0 || input.sourceMode === "missing") qualityLevel = "insufficient_data";
  else if (completenessScore < 0.5) qualityLevel = "insufficient_data";
  else if (completenessScore < 0.75) qualityLevel = "low_confidence";
  else if (completenessScore < 0.95 || input.hasConfounders || input.unsyncedRecordCount > 0 || input.staleSnapshotAgeDays > 0) qualityLevel = "medium_confidence";

  const canShowTrend = qualityLevel !== "insufficient_data" && input.loggedDays >= Math.max(4, requiredLoggedDays);
  const canShowCorrelation = qualityLevel !== "insufficient_data" && input.matchedDataPoints >= Math.max(7, requiredMatchedPoints);
  const canShowExperimentResult =
    definition.supportsExperimentEvaluation &&
    qualityLevel !== "insufficient_data" &&
    input.baselineDays >= requiredBaselineDays &&
    input.measurements >= requiredMeasurements &&
    !input.hasConfounders;

  const carnosExplanationLimit =
    input.sourceMode === "cached_offline"
      ? "Carnos must explain that this metric is based on cached offline data."
      : input.unsyncedRecordCount > 0
        ? "Carnos must explain that unsynced local records are included."
        : input.staleSnapshotAgeDays > 0
          ? "Carnos must explain that the snapshot is stale."
          : "Carnos may explain this metric within its quality level.";

  return {
    metricId: input.metricId,
    qualityLevel,
    completenessScore,
    reasons,
    sourceMode: input.sourceMode,
    canShowTrend,
    canShowCorrelation,
    canShowExperimentResult,
    carnosExplanationLimit,
  };
}

export function summarizeMetricRegistry() {
  const definitions = listMetricDefinitions();
  const domains = [...new Set(definitions.map((definition) => definition.domain))].sort();
  const offlineCacheableMetricCount = definitions.filter((definition) => definition.cacheEligibility !== "live_only" && definition.cacheEligibility !== "not_cacheable").length;
  const sensitiveMetricCount = definitions.filter((definition) => definition.sensitivity === "sensitive" || definition.sensitivity === "restricted" || definition.sensitivity === "mixed").length;

  return {
    phase: "18C",
    metricCount: definitions.length,
    domains,
    offlineCacheableMetricCount,
    sensitiveMetricCount,
    runtimeSideEffectsEnabled: PHASE_18C_METRIC_REGISTRY_BOUNDARY.runtimeSideEffectsEnabled,
    schemaWritesEnabled: PHASE_18C_METRIC_REGISTRY_BOUNDARY.schemaWritesEnabled,
    localCarnosRuntimeRequired: PHASE_18C_METRIC_REGISTRY_BOUNDARY.localCarnosRuntimeRequired,
  } as const;
}
