import {
  type SelfExperimentEvaluationReadiness,
  type SelfExperimentSourceMode,
  getSelfExperimentTemplate,
  listSelfExperimentTemplates,
} from "./self-experiment-contracts";

export type ExperimentRepositoryReadIntent =
  | "template_lookup"
  | "experiment_read"
  | "draft_capture_preview"
  | "measurement_read"
  | "confounder_read"
  | "lesson_summary_read"
  | "memory_candidate_lesson_read"
  | "evaluation_preview_read";

export type ExperimentRepositorySource =
  | "supabase_postgres_source_of_truth"
  | "encrypted_offline_cache"
  | "mixed_source_router"
  | "unsynced_local_queue"
  | "deterministic_empty_state";

export type ExperimentRepositoryCaptureMode =
  | "read_only"
  | "offline_capture_preview"
  | "sync_queue_required"
  | "online_runtime_required";

export type ExperimentRepositoryFreshnessLabel =
  | "fresh"
  | "cached"
  | "stale"
  | "partial"
  | "missing"
  | "unsynced"
  | "deterministic_preview";

export type ExperimentRepositoryCapability =
  | "read_experiment_templates"
  | "read_experiment_records"
  | "read_experiment_measurements"
  | "read_experiment_confounders"
  | "read_lesson_summaries"
  | "read_memory_candidate_lessons"
  | "read_evaluation_previews"
  | "capture_offline_experiment_preview"
  | "route_sync_queue_candidate"
  | "label_source_mode"
  | "validate_user_scope";

export interface ExperimentTemplateRepositoryPlan {
  readonly templateId: string;
  readonly templateRegistered: boolean;
  readonly repositorySource: ExperimentRepositorySource;
  readonly captureMode: ExperimentRepositoryCaptureMode;
  readonly freshnessLabel: ExperimentRepositoryFreshnessLabel;
  readonly sourceMode: SelfExperimentSourceMode;
  readonly evaluationReadiness: SelfExperimentEvaluationReadiness;
  readonly requiresUserScope: true;
  readonly allowsOfflineCapturePreview: boolean;
  readonly requiresSyncQueueBeforeWrite: boolean;
  readonly schemaSourceMapRequiredBeforeRuntimeImplementation: true;
  readonly runtimeReadImplemented: false;
  readonly runtimeWriteImplemented: false;
}

export interface ExperimentRepositoryBoundaryContract {
  readonly repositoryId: string;
  readonly userScoped: true;
  readonly readIntents: readonly ExperimentRepositoryReadIntent[];
  readonly capabilities: readonly ExperimentRepositoryCapability[];
  readonly templatePlans: readonly ExperimentTemplateRepositoryPlan[];
  readonly onlineSourceOfTruth: "supabase_postgres";
  readonly offlineContinuityLayer: "indexeddb_or_equivalent_encrypted_cache";
  readonly sourceMapFixturePath: "docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json";
  readonly localCarnosRuntimeRequired: false;
  readonly runtimeDataReadsEnabled: false;
  readonly runtimeDataWritesEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly localStorageCoreDataEnabled: false;
  readonly fakeExperimentDataEnabled: false;
  readonly memoryWriteEnabled: false;
  readonly actionExecutionEnabled: false;
}

export interface ExperimentRepositoryBoundaryValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly templatePlanCount: number;
  readonly readIntentCount: number;
  readonly offlineCapturePreviewCount: number;
  readonly syncQueueRequiredCount: number;
  readonly requiresSchemaBeforeRuntimeImplementation: boolean;
  readonly carnosExplanationLimit: string;
}

export const PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY = {
  runtimeDataReadsEnabled: false,
  runtimeDataWritesEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeExperimentDataEnabled: false,
  localStorageCoreDataEnabled: false,
  localCarnosRuntimeRequired: false,
  deterministicFallbackRequired: true,
  syncQueueImplementationEnabled: false,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  schemaSourceMapRequiredBeforeRuntimeImplementation: true,
} as const;

export function buildExperimentTemplateRepositoryPlan(templateId: string): ExperimentTemplateRepositoryPlan {
  const template = getSelfExperimentTemplate(templateId);

  if (!template) {
    return {
      templateId,
      templateRegistered: false,
      repositorySource: "deterministic_empty_state",
      captureMode: "read_only",
      freshnessLabel: "missing",
      sourceMode: "deterministic_preview",
      evaluationReadiness: "not_ready",
      requiresUserScope: true,
      allowsOfflineCapturePreview: false,
      requiresSyncQueueBeforeWrite: true,
      schemaSourceMapRequiredBeforeRuntimeImplementation: true,
      runtimeReadImplemented: false,
      runtimeWriteImplemented: false,
    };
  }

  return {
    templateId,
    templateRegistered: true,
    repositorySource: "mixed_source_router",
    captureMode: "offline_capture_preview",
    freshnessLabel: "missing",
    sourceMode: "eligible_offline_cache",
    evaluationReadiness: "not_ready",
    requiresUserScope: true,
    allowsOfflineCapturePreview: true,
    requiresSyncQueueBeforeWrite: true,
    schemaSourceMapRequiredBeforeRuntimeImplementation: true,
    runtimeReadImplemented: false,
    runtimeWriteImplemented: false,
  };
}

export function buildDefaultExperimentRepositoryBoundary(): ExperimentRepositoryBoundaryContract {
  return {
    repositoryId: "experiment_repository_boundary",
    userScoped: true,
    readIntents: [
      "template_lookup",
      "experiment_read",
      "draft_capture_preview",
      "measurement_read",
      "confounder_read",
      "lesson_summary_read",
      "memory_candidate_lesson_read",
      "evaluation_preview_read",
    ],
    capabilities: [
      "read_experiment_templates",
      "read_experiment_records",
      "read_experiment_measurements",
      "read_experiment_confounders",
      "read_lesson_summaries",
      "read_memory_candidate_lessons",
      "read_evaluation_previews",
      "capture_offline_experiment_preview",
      "route_sync_queue_candidate",
      "label_source_mode",
      "validate_user_scope",
    ],
    templatePlans: listSelfExperimentTemplates().map((template) => buildExperimentTemplateRepositoryPlan(template.templateId)),
    onlineSourceOfTruth: "supabase_postgres",
    offlineContinuityLayer: "indexeddb_or_equivalent_encrypted_cache",
    sourceMapFixturePath: "docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json",
    localCarnosRuntimeRequired: false,
    runtimeDataReadsEnabled: false,
    runtimeDataWritesEnabled: false,
    schemaWritesEnabled: false,
    supabaseCallsEnabled: false,
    localStorageCoreDataEnabled: false,
    fakeExperimentDataEnabled: false,
    memoryWriteEnabled: false,
    actionExecutionEnabled: false,
  };
}

export function validateExperimentRepositoryBoundary(
  boundary: ExperimentRepositoryBoundaryContract,
): ExperimentRepositoryBoundaryValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!boundary.repositoryId.trim()) errors.push("Experiment repository boundary id is required.");
  if (!boundary.userScoped) errors.push("Experiment repository boundary must be user scoped.");
  if (boundary.readIntents.length === 0) errors.push("Experiment repository boundary must define read intents.");
  if (boundary.capabilities.length === 0) errors.push("Experiment repository boundary must define capabilities.");
  if (boundary.templatePlans.length === 0) errors.push("Experiment repository boundary must define template plans.");

  if (boundary.onlineSourceOfTruth !== "supabase_postgres") {
    errors.push("Experiment repository online source of truth must remain Supabase/Postgres.");
  }

  if (boundary.offlineContinuityLayer !== "indexeddb_or_equivalent_encrypted_cache") {
    errors.push("Experiment repository offline continuity layer must remain encrypted IndexedDB or equivalent.");
  }

  if (!boundary.sourceMapFixturePath.includes("phase18b_schema_source_map")) {
    errors.push("Experiment repository boundary must point to the Phase 18B schema source map fixture.");
  }

  for (const plan of boundary.templatePlans) {
    if (!plan.templateRegistered) errors.push("Experiment repository template plan is not registered: " + plan.templateId);
    if (!plan.requiresUserScope) errors.push("Experiment repository template plan must require user scope: " + plan.templateId);
    if (plan.runtimeReadImplemented) errors.push("Experiment repository runtime reads must not be implemented in this boundary chunk: " + plan.templateId);
    if (plan.runtimeWriteImplemented) errors.push("Experiment repository runtime writes must not be implemented in this boundary chunk: " + plan.templateId);
    if (!plan.schemaSourceMapRequiredBeforeRuntimeImplementation) {
      errors.push("Experiment repository runtime implementation must require schema source map first: " + plan.templateId);
    }
    if (plan.allowsOfflineCapturePreview && !plan.requiresSyncQueueBeforeWrite) {
      errors.push("Offline experiment capture preview must require sync queue before write: " + plan.templateId);
    }
    if (plan.captureMode === "offline_capture_preview" && plan.repositorySource !== "mixed_source_router") {
      errors.push("Offline experiment capture preview must use mixed source router: " + plan.templateId);
    }
    if (plan.freshnessLabel === "fresh" && plan.repositorySource !== "supabase_postgres_source_of_truth") {
      warnings.push("Only source-of-truth reads may claim fresh experiment data: " + plan.templateId);
    }
    if (plan.sourceMode === "unsynced_local") {
      warnings.push("Unsynced local experiment context must be disclosed to Carnos: " + plan.templateId);
    }
    if (plan.sourceMode === "deterministic_preview") {
      warnings.push("Deterministic experiment preview must be disclosed to Carnos: " + plan.templateId);
    }
  }

  if (boundary.runtimeDataReadsEnabled) errors.push("Experiment repository boundary must not enable runtime data reads.");
  if (boundary.runtimeDataWritesEnabled) errors.push("Experiment repository boundary must not enable runtime data writes.");
  if (boundary.schemaWritesEnabled) errors.push("Experiment repository boundary must not enable schema writes.");
  if (boundary.supabaseCallsEnabled) errors.push("Experiment repository boundary must not enable Supabase calls.");
  if (boundary.localStorageCoreDataEnabled) errors.push("Experiment repository boundary must not allow localStorage core data.");
  if (boundary.fakeExperimentDataEnabled) errors.push("Experiment repository boundary must not allow fake experiment data.");
  if (boundary.localCarnosRuntimeRequired) errors.push("Experiment repository boundary must not require local Carnos runtime.");
  if (boundary.memoryWriteEnabled) errors.push("Experiment repository boundary must not enable memory writes.");
  if (boundary.actionExecutionEnabled) errors.push("Experiment repository boundary must not enable action execution.");

  let offlineCapturePreviewCount = 0;
  let syncQueueRequiredCount = 0;

  for (const plan of boundary.templatePlans) {
    if (plan.allowsOfflineCapturePreview) offlineCapturePreviewCount += 1;
    if (plan.requiresSyncQueueBeforeWrite) syncQueueRequiredCount += 1;
  }

  const carnosExplanationLimit =
    errors.length > 0
      ? "Carnos must not use invalid experiment repository context."
      : warnings.length > 0
        ? "Carnos must disclose experiment repository source, cache, unsynced, or deterministic preview limits."
        : "Carnos may use experiment repository boundary context only as a preview contract, not as live experiment data.";

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    templatePlanCount: boundary.templatePlans.length,
    readIntentCount: boundary.readIntents.length,
    offlineCapturePreviewCount,
    syncQueueRequiredCount,
    requiresSchemaBeforeRuntimeImplementation: true,
    carnosExplanationLimit,
  };
}

export function summarizeExperimentRepositoryBoundaryContract() {
  return {
    phase: "18H",
    readIntents: [
      "template_lookup",
      "experiment_read",
      "draft_capture_preview",
      "measurement_read",
      "confounder_read",
      "lesson_summary_read",
      "memory_candidate_lesson_read",
      "evaluation_preview_read",
    ] as const,
    repositorySources: [
      "supabase_postgres_source_of_truth",
      "encrypted_offline_cache",
      "mixed_source_router",
      "unsynced_local_queue",
      "deterministic_empty_state",
    ] as const,
    captureModes: ["read_only", "offline_capture_preview", "sync_queue_required", "online_runtime_required"] as const,
    freshnessLabels: ["fresh", "cached", "stale", "partial", "missing", "unsynced", "deterministic_preview"] as const,
    runtimeDataReadsEnabled: PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY.runtimeDataReadsEnabled,
    runtimeDataWritesEnabled: PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY.runtimeDataWritesEnabled,
    schemaWritesEnabled: PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY.supabaseCallsEnabled,
    localCarnosRuntimeRequired: PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY.localCarnosRuntimeRequired,
    schemaSourceMapRequiredBeforeRuntimeImplementation:
      PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY.schemaSourceMapRequiredBeforeRuntimeImplementation,
  } as const;
}
