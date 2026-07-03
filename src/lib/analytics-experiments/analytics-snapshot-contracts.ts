import {
  type DataQualityLevel,
  type MetricCacheEligibility,
  type MetricDataQualityResult,
  type MetricSensitivity,
  type MetricSourceMode,
  getMetricDefinition,
} from "./metric-registry";

export type AnalyticsSnapshotRange = "daily" | "weekly" | "monthly" | "rolling";
export type AnalyticsSnapshotFreshness = "fresh" | "cached" | "stale" | "partial" | "missing";
export type AnalyticsSnapshotProvenance = "online_source_of_truth" | "eligible_offline_cache" | "mixed_online_offline" | "deterministic_preview";
export type AnalyticsSnapshotExportReadiness = "export_ready" | "export_ready_with_warnings" | "not_export_ready";

export interface AnalyticsSnapshotMetricValue {
  readonly metricId: string;
  readonly value: number | null;
  readonly qualityLevel: DataQualityLevel;
  readonly completenessScore: number;
  readonly sourceMode: MetricSourceMode;
  readonly sensitivity: MetricSensitivity;
  readonly cacheEligibility: MetricCacheEligibility;
  readonly sampleSize: number;
  readonly hasConfounders: boolean;
  readonly includesUnsyncedRecords: boolean;
  readonly staleSnapshotAgeDays: number;
  readonly explanationLimit: string;
}

export interface AnalyticsSnapshotContract {
  readonly snapshotId: string;
  readonly userScoped: true;
  readonly range: AnalyticsSnapshotRange;
  readonly rangeStartIso: string;
  readonly rangeEndIso: string;
  readonly generatedAtIso: string;
  readonly freshness: AnalyticsSnapshotFreshness;
  readonly provenance: AnalyticsSnapshotProvenance;
  readonly metrics: readonly AnalyticsSnapshotMetricValue[];
  readonly notes: readonly string[];
  readonly localCarnosRuntimeRequired: false;
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly localStorageCoreDataEnabled: false;
}

export interface AnalyticsSnapshotValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly metricCount: number;
  readonly completenessAverage: number;
  readonly qualitySummary: Record<DataQualityLevel, number>;
  readonly freshness: AnalyticsSnapshotFreshness;
  readonly exportReadiness: AnalyticsSnapshotExportReadiness;
  readonly carnosExplanationLimit: string;
  readonly comparisonEligible: boolean;
}

export const PHASE_18D_ANALYTICS_SNAPSHOT_BOUNDARY = {
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeSnapshotDataEnabled: false,
  localStorageCoreDataEnabled: false,
  localCarnosRuntimeRequired: false,
  deterministicFallbackRequired: true,
} as const;

function isIsoDateTime(value: string): boolean {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return Number(value.toFixed(4));
}

function buildQualitySummary(metrics: readonly AnalyticsSnapshotMetricValue[]): Record<DataQualityLevel, number> {
  const summary: Record<DataQualityLevel, number> = {
    high_confidence: 0,
    medium_confidence: 0,
    low_confidence: 0,
    insufficient_data: 0,
    invalid: 0,
  };

  for (const metric of metrics) {
    summary[metric.qualityLevel] += 1;
  }

  return summary;
}

export function createSnapshotMetricValue(input: {
  readonly metricId: string;
  readonly value: number | null;
  readonly quality: MetricDataQualityResult;
  readonly sampleSize: number;
  readonly hasConfounders: boolean;
  readonly includesUnsyncedRecords: boolean;
}): AnalyticsSnapshotMetricValue {
  const definition = getMetricDefinition(input.metricId);

  return {
    metricId: input.metricId,
    value: input.value,
    qualityLevel: input.quality.qualityLevel,
    completenessScore: input.quality.completenessScore,
    sourceMode: input.quality.sourceMode,
    sensitivity: definition?.sensitivity ?? "mixed",
    cacheEligibility: definition?.cacheEligibility ?? "offline_cache_allowed_with_privacy_rules",
    sampleSize: input.sampleSize,
    hasConfounders: input.hasConfounders,
    includesUnsyncedRecords: input.includesUnsyncedRecords,
    staleSnapshotAgeDays: input.quality.sourceMode === "cached_offline" ? 1 : 0,
    explanationLimit: input.quality.carnosExplanationLimit,
  };
}

export function summarizeSnapshotCompleteness(metrics: readonly AnalyticsSnapshotMetricValue[]): number {
  if (metrics.length === 0) return 0;
  const total = metrics.reduce((sum, metric) => sum + clampScore(metric.completenessScore), 0);
  return clampScore(total / metrics.length);
}

export function validateAnalyticsSnapshot(snapshot: AnalyticsSnapshotContract): AnalyticsSnapshotValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!snapshot.snapshotId.trim()) errors.push("Snapshot id is required.");
  if (!snapshot.userScoped) errors.push("Snapshot must be user scoped.");
  if (!isIsoDateTime(snapshot.rangeStartIso)) errors.push("Snapshot range start must be ISO-like datetime.");
  if (!isIsoDateTime(snapshot.rangeEndIso)) errors.push("Snapshot range end must be ISO-like datetime.");
  if (!isIsoDateTime(snapshot.generatedAtIso)) errors.push("Snapshot generated timestamp must be ISO-like datetime.");

  const start = Date.parse(snapshot.rangeStartIso);
  const end = Date.parse(snapshot.rangeEndIso);
  if (Number.isFinite(start) && Number.isFinite(end) && start >= end) {
    errors.push("Snapshot range start must be before range end.");
  }

  if (snapshot.metrics.length === 0) errors.push("Snapshot must include at least one metric.");

  for (const metric of snapshot.metrics) {
    const definition = getMetricDefinition(metric.metricId);
    if (!definition) errors.push("Snapshot metric is not registered: " + metric.metricId);
    if (metric.completenessScore < 0 || metric.completenessScore > 1) {
      errors.push("Metric completeness score must stay between 0 and 1: " + metric.metricId);
    }
    if (metric.qualityLevel === "high_confidence" && metric.hasConfounders) {
      errors.push("High confidence metric cannot include confounders: " + metric.metricId);
    }
    if (metric.qualityLevel === "high_confidence" && metric.includesUnsyncedRecords) {
      errors.push("High confidence metric cannot include unsynced records: " + metric.metricId);
    }
    if (metric.qualityLevel === "high_confidence" && metric.staleSnapshotAgeDays > 0) {
      errors.push("High confidence metric cannot depend on stale cached snapshot: " + metric.metricId);
    }
    if (metric.sourceMode === "cached_offline" && !metric.explanationLimit.includes("cached")) {
      warnings.push("Cached metric should disclose cached context: " + metric.metricId);
    }
    if (metric.includesUnsyncedRecords && !metric.explanationLimit.includes("unsynced")) {
      warnings.push("Unsynced metric should disclose unsynced records: " + metric.metricId);
    }
    if (metric.staleSnapshotAgeDays > 0 && !metric.explanationLimit.includes("stale")) {
      warnings.push("Stale metric should disclose stale snapshot: " + metric.metricId);
    }
    if (metric.cacheEligibility === "not_cacheable" && snapshot.provenance !== "online_source_of_truth") {
      errors.push("Not cacheable metric cannot be served from offline provenance: " + metric.metricId);
    }
  }

  if (snapshot.freshness === "fresh" && snapshot.provenance === "eligible_offline_cache") {
    warnings.push("Offline cache snapshot cannot claim fresh live provenance.");
  }

  if (snapshot.provenance === "deterministic_preview") {
    warnings.push("Deterministic preview snapshot cannot be treated as final analytics.");
  }

  if (snapshot.runtimeDataReadsEnabled) errors.push("Snapshot contract must not enable runtime data reads.");
  if (snapshot.schemaWritesEnabled) errors.push("Snapshot contract must not enable schema writes.");
  if (snapshot.supabaseCallsEnabled) errors.push("Snapshot contract must not enable Supabase calls.");
  if (snapshot.localStorageCoreDataEnabled) errors.push("Snapshot contract must not allow localStorage core data.");
  if (snapshot.localCarnosRuntimeRequired) errors.push("Snapshot contract must not require local Carnos runtime.");

  const qualitySummary = buildQualitySummary(snapshot.metrics);
  const completenessAverage = summarizeSnapshotCompleteness(snapshot.metrics);

  const exportReadiness: AnalyticsSnapshotExportReadiness =
    errors.length > 0
      ? "not_export_ready"
      : warnings.length > 0
        ? "export_ready_with_warnings"
        : "export_ready";

  const comparisonEligible =
    errors.length === 0 &&
    snapshot.metrics.length > 0 &&
    completenessAverage >= 0.75 &&
    qualitySummary.insufficient_data === 0 &&
    qualitySummary.invalid === 0;

  const carnosExplanationLimit =
    snapshot.freshness === "cached" || snapshot.freshness === "stale"
      ? "Carnos must disclose cached or stale snapshot context."
      : snapshot.provenance === "deterministic_preview"
        ? "Carnos must disclose deterministic preview context."
        : warnings.length > 0
          ? "Carnos must disclose validation warnings before explaining this snapshot."
          : "Carnos may explain this snapshot within metric quality limits.";

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    metricCount: snapshot.metrics.length,
    completenessAverage,
    qualitySummary,
    freshness: snapshot.freshness,
    exportReadiness,
    carnosExplanationLimit,
    comparisonEligible,
  };
}

export function buildEmptyAnalyticsSnapshot(input: {
  readonly snapshotId: string;
  readonly range: AnalyticsSnapshotRange;
  readonly rangeStartIso: string;
  readonly rangeEndIso: string;
  readonly generatedAtIso: string;
  readonly freshness?: AnalyticsSnapshotFreshness;
  readonly provenance?: AnalyticsSnapshotProvenance;
  readonly notes?: readonly string[];
}): AnalyticsSnapshotContract {
  return {
    snapshotId: input.snapshotId,
    userScoped: true,
    range: input.range,
    rangeStartIso: input.rangeStartIso,
    rangeEndIso: input.rangeEndIso,
    generatedAtIso: input.generatedAtIso,
    freshness: input.freshness ?? "missing",
    provenance: input.provenance ?? "deterministic_preview",
    metrics: [],
    notes: input.notes ?? [],
    localCarnosRuntimeRequired: false,
    runtimeDataReadsEnabled: false,
    schemaWritesEnabled: false,
    supabaseCallsEnabled: false,
    localStorageCoreDataEnabled: false,
  };
}

export function summarizeAnalyticsSnapshotContract() {
  return {
    phase: "18D",
    snapshotRanges: ["daily", "weekly", "monthly", "rolling"] as const,
    freshnessStates: ["fresh", "cached", "stale", "partial", "missing"] as const,
    provenanceModes: ["online_source_of_truth", "eligible_offline_cache", "mixed_online_offline", "deterministic_preview"] as const,
    exportReadinessStates: ["export_ready", "export_ready_with_warnings", "not_export_ready"] as const,
    runtimeDataReadsEnabled: PHASE_18D_ANALYTICS_SNAPSHOT_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18D_ANALYTICS_SNAPSHOT_BOUNDARY.schemaWritesEnabled,
    localCarnosRuntimeRequired: PHASE_18D_ANALYTICS_SNAPSHOT_BOUNDARY.localCarnosRuntimeRequired,
  } as const;
}
