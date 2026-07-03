import {
  type MetricCacheEligibility,
  type MetricSensitivity,
  getMetricDefinition,
  listMetricDefinitions,
} from "./metric-registry";

export type AnalyticsRepositoryReadIntent =
  | "metric_definition_lookup"
  | "metric_value_read"
  | "snapshot_read"
  | "insight_read"
  | "dashboard_summary_read"
  | "export_preview_read";

export type AnalyticsRepositorySource =
  | "supabase_postgres_source_of_truth"
  | "encrypted_offline_cache"
  | "mixed_source_router"
  | "deterministic_empty_state";

export type AnalyticsRepositoryCacheState =
  | "live_only"
  | "cache_allowed"
  | "cache_allowed_with_sensitive_rules"
  | "cache_allowed_with_privacy_rules"
  | "not_cacheable";

export type AnalyticsRepositoryFreshnessLabel =
  | "fresh"
  | "cached"
  | "stale"
  | "partial"
  | "missing"
  | "unsynced";

export type AnalyticsRepositoryCapability =
  | "read_metric_definitions"
  | "read_metric_values"
  | "read_snapshots"
  | "read_insight_previews"
  | "read_dashboard_summaries"
  | "read_export_previews"
  | "route_cached_fallback"
  | "label_source_mode"
  | "validate_user_scope";

export interface AnalyticsMetricRepositoryPlan {
  readonly metricId: string;
  readonly sensitivity: MetricSensitivity;
  readonly cacheEligibility: MetricCacheEligibility;
  readonly repositorySource: AnalyticsRepositorySource;
  readonly cacheState: AnalyticsRepositoryCacheState;
  readonly freshnessLabel: AnalyticsRepositoryFreshnessLabel;
  readonly requiresUserScope: true;
  readonly allowsCachedFallback: boolean;
  readonly allowsUnsyncedLocalContext: boolean;
  readonly schemaSourceMapRequiredBeforeRuntimeImplementation: true;
  readonly runtimeReadImplemented: false;
}

export interface AnalyticsRepositoryBoundaryContract {
  readonly repositoryId: string;
  readonly userScoped: true;
  readonly readIntents: readonly AnalyticsRepositoryReadIntent[];
  readonly capabilities: readonly AnalyticsRepositoryCapability[];
  readonly metricPlans: readonly AnalyticsMetricRepositoryPlan[];
  readonly onlineSourceOfTruth: "supabase_postgres";
  readonly offlineContinuityLayer: "indexeddb_or_equivalent_encrypted_cache";
  readonly sourceMapFixturePath: "docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json";
  readonly localCarnosRuntimeRequired: false;
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly localStorageCoreDataEnabled: false;
  readonly fakeAnalyticsDataEnabled: false;
  readonly memoryWriteEnabled: false;
  readonly actionExecutionEnabled: false;
}

export interface AnalyticsRepositoryBoundaryValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly metricPlanCount: number;
  readonly readIntentCount: number;
  readonly cacheFallbackMetricCount: number;
  readonly sensitiveMetricCount: number;
  readonly restrictedMetricCount: number;
  readonly requiresSchemaBeforeRuntimeImplementation: boolean;
  readonly carnosExplanationLimit: string;
}

export const PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY = {
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeAnalyticsDataEnabled: false,
  localStorageCoreDataEnabled: false,
  localCarnosRuntimeRequired: false,
  deterministicFallbackRequired: true,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  schemaSourceMapRequiredBeforeRuntimeImplementation: true,
} as const;

function cacheStateForMetric(cacheEligibility: MetricCacheEligibility): AnalyticsRepositoryCacheState {
  if (cacheEligibility === "offline_cache_allowed") return "cache_allowed";
  if (cacheEligibility === "offline_cache_allowed_with_sensitive_rules") return "cache_allowed_with_sensitive_rules";
  if (cacheEligibility === "offline_cache_allowed_with_privacy_rules") return "cache_allowed_with_privacy_rules";
  return "not_cacheable";
}

function sourceForCacheState(cacheState: AnalyticsRepositoryCacheState): AnalyticsRepositorySource {
  if (cacheState === "not_cacheable" || cacheState === "live_only") return "supabase_postgres_source_of_truth";
  return "mixed_source_router";
}

export function buildAnalyticsMetricRepositoryPlan(metricId: string): AnalyticsMetricRepositoryPlan {
  const definition = getMetricDefinition(metricId);

  if (!definition) {
    return {
      metricId,
      sensitivity: "mixed",
      cacheEligibility: "offline_cache_allowed_with_privacy_rules",
      repositorySource: "deterministic_empty_state",
      cacheState: "not_cacheable",
      freshnessLabel: "missing",
      requiresUserScope: true,
      allowsCachedFallback: false,
      allowsUnsyncedLocalContext: false,
      schemaSourceMapRequiredBeforeRuntimeImplementation: true,
      runtimeReadImplemented: false,
    };
  }

  const cacheState = cacheStateForMetric(definition.cacheEligibility);

  return {
    metricId,
    sensitivity: definition.sensitivity,
    cacheEligibility: definition.cacheEligibility,
    repositorySource: sourceForCacheState(cacheState),
    cacheState,
    freshnessLabel: "missing",
    requiresUserScope: true,
    allowsCachedFallback: cacheState !== "not_cacheable",
    allowsUnsyncedLocalContext: cacheState !== "not_cacheable",
    schemaSourceMapRequiredBeforeRuntimeImplementation: true,
    runtimeReadImplemented: false,
  };
}

export function buildDefaultAnalyticsRepositoryBoundary(): AnalyticsRepositoryBoundaryContract {
  return {
    repositoryId: "analytics_repository_boundary",
    userScoped: true,
    readIntents: [
      "metric_definition_lookup",
      "metric_value_read",
      "snapshot_read",
      "insight_read",
      "dashboard_summary_read",
      "export_preview_read",
    ],
    capabilities: [
      "read_metric_definitions",
      "read_metric_values",
      "read_snapshots",
      "read_insight_previews",
      "read_dashboard_summaries",
      "read_export_previews",
      "route_cached_fallback",
      "label_source_mode",
      "validate_user_scope",
    ],
    metricPlans: listMetricDefinitions().map((definition) => buildAnalyticsMetricRepositoryPlan(definition.id)),
    onlineSourceOfTruth: "supabase_postgres",
    offlineContinuityLayer: "indexeddb_or_equivalent_encrypted_cache",
    sourceMapFixturePath: "docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json",
    localCarnosRuntimeRequired: false,
    runtimeDataReadsEnabled: false,
    schemaWritesEnabled: false,
    supabaseCallsEnabled: false,
    localStorageCoreDataEnabled: false,
    fakeAnalyticsDataEnabled: false,
    memoryWriteEnabled: false,
    actionExecutionEnabled: false,
  };
}

export function validateAnalyticsRepositoryBoundary(
  boundary: AnalyticsRepositoryBoundaryContract,
): AnalyticsRepositoryBoundaryValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!boundary.repositoryId.trim()) errors.push("Analytics repository boundary id is required.");
  if (!boundary.userScoped) errors.push("Analytics repository boundary must be user scoped.");
  if (boundary.readIntents.length === 0) errors.push("Analytics repository boundary must define read intents.");
  if (boundary.capabilities.length === 0) errors.push("Analytics repository boundary must define capabilities.");
  if (boundary.metricPlans.length === 0) errors.push("Analytics repository boundary must define metric plans.");

  if (boundary.onlineSourceOfTruth !== "supabase_postgres") {
    errors.push("Analytics repository online source of truth must remain Supabase/Postgres.");
  }

  if (boundary.offlineContinuityLayer !== "indexeddb_or_equivalent_encrypted_cache") {
    errors.push("Analytics repository offline continuity layer must remain encrypted IndexedDB or equivalent.");
  }

  if (!boundary.sourceMapFixturePath.includes("phase18b_schema_source_map")) {
    errors.push("Analytics repository boundary must point to the Phase 18B schema source map fixture.");
  }

  for (const plan of boundary.metricPlans) {
    const definition = getMetricDefinition(plan.metricId);
    if (!definition) errors.push("Analytics repository metric plan is not registered: " + plan.metricId);
    if (!plan.requiresUserScope) errors.push("Analytics repository metric plan must require user scope: " + plan.metricId);
    if (plan.runtimeReadImplemented) errors.push("Analytics repository runtime reads must not be implemented in this boundary chunk: " + plan.metricId);
    if (!plan.schemaSourceMapRequiredBeforeRuntimeImplementation) {
      errors.push("Analytics repository runtime implementation must require schema source map first: " + plan.metricId);
    }
    if (plan.cacheState === "not_cacheable" && plan.allowsCachedFallback) {
      errors.push("Not-cacheable analytics metric cannot allow cached fallback: " + plan.metricId);
    }
    if (plan.cacheState === "not_cacheable" && plan.allowsUnsyncedLocalContext) {
      errors.push("Not-cacheable analytics metric cannot allow unsynced local context: " + plan.metricId);
    }
    if ((plan.sensitivity === "sensitive" || plan.sensitivity === "restricted") && plan.cacheState === "cache_allowed") {
      errors.push("Sensitive/restricted analytics metric cannot use unrestricted cache state: " + plan.metricId);
    }
    if (plan.freshnessLabel === "fresh" && plan.repositorySource !== "supabase_postgres_source_of_truth") {
      warnings.push("Only source-of-truth reads may claim fresh analytics data: " + plan.metricId);
    }
    if (plan.repositorySource === "deterministic_empty_state") {
      warnings.push("Deterministic empty-state repository plan must be disclosed to Carnos: " + plan.metricId);
    }
  }

  if (boundary.runtimeDataReadsEnabled) errors.push("Analytics repository boundary must not enable runtime data reads.");
  if (boundary.schemaWritesEnabled) errors.push("Analytics repository boundary must not enable schema writes.");
  if (boundary.supabaseCallsEnabled) errors.push("Analytics repository boundary must not enable Supabase calls.");
  if (boundary.localStorageCoreDataEnabled) errors.push("Analytics repository boundary must not allow localStorage core data.");
  if (boundary.fakeAnalyticsDataEnabled) errors.push("Analytics repository boundary must not allow fake analytics data.");
  if (boundary.localCarnosRuntimeRequired) errors.push("Analytics repository boundary must not require local Carnos runtime.");
  if (boundary.memoryWriteEnabled) errors.push("Analytics repository boundary must not enable memory writes.");
  if (boundary.actionExecutionEnabled) errors.push("Analytics repository boundary must not enable action execution.");

  let cacheFallbackMetricCount = 0;
  let sensitiveMetricCount = 0;
  let restrictedMetricCount = 0;

  for (const plan of boundary.metricPlans) {
    if (plan.allowsCachedFallback) cacheFallbackMetricCount += 1;
    if (plan.sensitivity === "sensitive") sensitiveMetricCount += 1;
    if (plan.sensitivity === "restricted") restrictedMetricCount += 1;
  }

  const carnosExplanationLimit =
    errors.length > 0
      ? "Carnos must not use invalid analytics repository context."
      : warnings.length > 0
        ? "Carnos must disclose repository source, cache, stale, unsynced, or deterministic fallback limits."
        : "Carnos may use repository boundary context only as a preview contract, not as live analytics data.";

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    metricPlanCount: boundary.metricPlans.length,
    readIntentCount: boundary.readIntents.length,
    cacheFallbackMetricCount,
    sensitiveMetricCount,
    restrictedMetricCount,
    requiresSchemaBeforeRuntimeImplementation: true,
    carnosExplanationLimit,
  };
}

export function summarizeAnalyticsRepositoryBoundaryContract() {
  return {
    phase: "18G",
    readIntents: [
      "metric_definition_lookup",
      "metric_value_read",
      "snapshot_read",
      "insight_read",
      "dashboard_summary_read",
      "export_preview_read",
    ] as const,
    repositorySources: [
      "supabase_postgres_source_of_truth",
      "encrypted_offline_cache",
      "mixed_source_router",
      "deterministic_empty_state",
    ] as const,
    cacheStates: [
      "live_only",
      "cache_allowed",
      "cache_allowed_with_sensitive_rules",
      "cache_allowed_with_privacy_rules",
      "not_cacheable",
    ] as const,
    freshnessLabels: ["fresh", "cached", "stale", "partial", "missing", "unsynced"] as const,
    runtimeDataReadsEnabled: PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY.supabaseCallsEnabled,
    localCarnosRuntimeRequired: PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY.localCarnosRuntimeRequired,
    schemaSourceMapRequiredBeforeRuntimeImplementation:
      PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY.schemaSourceMapRequiredBeforeRuntimeImplementation,
  } as const;
}
