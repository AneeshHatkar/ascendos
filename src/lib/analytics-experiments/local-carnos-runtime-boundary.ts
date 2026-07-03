export type LocalCarnosRuntimeMode =
  | "disabled"
  | "unavailable"
  | "deterministic_fallback"
  | "local_runtime_ready"
  | "future_sidecar_ready";

export type LocalCarnosRuntimeAdapterKind =
  | "none"
  | "deterministic_adapter"
  | "localhost_compatible_future"
  | "mlx_compatible_future"
  | "llama_cpp_compatible_future"
  | "tauri_sidecar_future";

export type LocalCarnosRuntimeReadiness =
  | "not_required"
  | "not_configured"
  | "available_for_future_use"
  | "blocked_by_policy"
  | "disabled_for_ci";

export type LocalCarnosOfflineDisclosure =
  | "offline_runtime_not_required"
  | "offline_runtime_unavailable"
  | "deterministic_fallback_used"
  | "cached_context_must_be_disclosed"
  | "unsynced_context_must_be_disclosed"
  | "local_context_is_not_online_source_of_truth"
  | "current_info_unavailable_offline"
  | "memory_write_disabled"
  | "action_execution_disabled";

import type {
  CarnosAnalyticsExplanationPlan,
  CarnosAnalyticsExplanationSourceState,
  CarnosAnalyticsExplanationSubject,
} from "./carnos-analytics-explanation-boundary";

export interface LocalCarnosRuntimeCapabilityFlags {
  readonly canUseLocalRuntime: boolean;
  readonly canUseDeterministicFallback: boolean;
  readonly canUseCachedContext: boolean;
  readonly canUseUnsyncedContext: boolean;
  readonly canCallNetwork: false;
  readonly canCallModelDuringCheck: false;
  readonly canStreamModelOutput: false;
  readonly canCreateEmbeddings: false;
  readonly canSearchVectors: false;
  readonly canReadRuntimeData: false;
  readonly canWriteRuntimeData: false;
  readonly canWriteMemory: false;
  readonly canExecuteAction: false;
}

export interface LocalCarnosAnalyticsAdapterRequest {
  readonly requestId: string;
  readonly userId: string;
  readonly subject: CarnosAnalyticsExplanationSubject;
  readonly sourceState: CarnosAnalyticsExplanationSourceState;
  readonly explanationPlan: CarnosAnalyticsExplanationPlan;
  readonly runtimeMode: LocalCarnosRuntimeMode;
  readonly adapterKind: LocalCarnosRuntimeAdapterKind;
  readonly allowLocalRuntime: boolean;
  readonly allowDeterministicFallback: boolean;
  readonly allowCachedContext: boolean;
  readonly allowUnsyncedContext: boolean;
  readonly allowCurrentInfoOffline: false;
  readonly allowMemoryWrite: false;
  readonly allowActionExecution: false;
}

export interface LocalCarnosAnalyticsAdapterResponse {
  readonly requestId: string;
  readonly runtimeMode: LocalCarnosRuntimeMode;
  readonly adapterKind: LocalCarnosRuntimeAdapterKind;
  readonly readiness: LocalCarnosRuntimeReadiness;
  readonly usedLocalRuntime: boolean;
  readonly usedDeterministicFallback: boolean;
  readonly disclosures: readonly LocalCarnosOfflineDisclosure[];
  readonly explanationText: string;
  readonly safetyNotes: readonly string[];
  readonly canWriteMemory: false;
  readonly canExecuteAction: false;
  readonly canClaimCurrentInfo: false;
  readonly canClaimOnlineSourceOfTruth: false;
}

export interface LocalCarnosRuntimeBoundarySummary {
  readonly phase: "18M-B";
  readonly runtimeModes: readonly LocalCarnosRuntimeMode[];
  readonly adapterKinds: readonly LocalCarnosRuntimeAdapterKind[];
  readonly readinessStates: readonly LocalCarnosRuntimeReadiness[];
  readonly disclosures: readonly LocalCarnosOfflineDisclosure[];
  readonly optionCLocalRuntimeBoundaryImplemented: true;
  readonly runtimeRequiredDuringChecks: false;
  readonly networkCallsEnabled: false;
  readonly modelCallsEnabled: false;
  readonly streamingEnabled: false;
  readonly embeddingCallsEnabled: false;
  readonly vectorSearchEnabled: false;
  readonly memoryWriteEnabled: false;
  readonly actionExecutionEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
}

export const PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY = {
  optionCLocalRuntimeBoundaryImplemented: true,
  offlineAiAdapterContractImplemented: true,
  deterministicFallbackImplemented: true,
  localhostCompatibleFuturePathDocumented: true,
  mlxCompatibleFuturePathDocumented: true,
  llamaCppCompatibleFuturePathDocumented: true,
  tauriSidecarFuturePathDocumented: true,
  browserFallbackLimited: true,
  runtimeRequiredDuringChecks: false,
  runtimeInstallRequired: false,
  runtimeHealthCallEnabled: false,
  networkCallsEnabled: false,
  modelCallsEnabled: false,
  streamingEnabled: false,
  embeddingCallsEnabled: false,
  vectorSearchEnabled: false,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  runtimeDataReadsEnabled: false,
  runtimeDataWritesEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeAnalyticsDataEnabled: false,
  fakeExperimentConclusionsEnabled: false,
} as const;

export const PHASE_18M_B_LOCAL_CARNOS_RUNTIME_MODES: readonly LocalCarnosRuntimeMode[] = [
  "disabled",
  "unavailable",
  "deterministic_fallback",
  "local_runtime_ready",
  "future_sidecar_ready",
] as const;

export const PHASE_18M_B_LOCAL_CARNOS_ADAPTER_KINDS: readonly LocalCarnosRuntimeAdapterKind[] = [
  "none",
  "deterministic_adapter",
  "localhost_compatible_future",
  "mlx_compatible_future",
  "llama_cpp_compatible_future",
  "tauri_sidecar_future",
] as const;

export const PHASE_18M_B_LOCAL_CARNOS_READINESS_STATES: readonly LocalCarnosRuntimeReadiness[] = [
  "not_required",
  "not_configured",
  "available_for_future_use",
  "blocked_by_policy",
  "disabled_for_ci",
] as const;

export const PHASE_18M_B_LOCAL_CARNOS_DISCLOSURES: readonly LocalCarnosOfflineDisclosure[] = [
  "offline_runtime_not_required",
  "offline_runtime_unavailable",
  "deterministic_fallback_used",
  "cached_context_must_be_disclosed",
  "unsynced_context_must_be_disclosed",
  "local_context_is_not_online_source_of_truth",
  "current_info_unavailable_offline",
  "memory_write_disabled",
  "action_execution_disabled",
] as const;

export function buildLocalCarnosRuntimeCapabilityFlags(runtimeMode: LocalCarnosRuntimeMode): LocalCarnosRuntimeCapabilityFlags {
  const localRuntimeAllowed = runtimeMode === "local_runtime_ready" || runtimeMode === "future_sidecar_ready";
  return {
    canUseLocalRuntime: localRuntimeAllowed,
    canUseDeterministicFallback: runtimeMode === "deterministic_fallback" || runtimeMode === "unavailable" || runtimeMode === "disabled",
    canUseCachedContext: true,
    canUseUnsyncedContext: true,
    canCallNetwork: false,
    canCallModelDuringCheck: false,
    canStreamModelOutput: false,
    canCreateEmbeddings: false,
    canSearchVectors: false,
    canReadRuntimeData: false,
    canWriteRuntimeData: false,
    canWriteMemory: false,
    canExecuteAction: false,
  };
}

export function buildLocalCarnosAnalyticsAdapterResponse(request: LocalCarnosAnalyticsAdapterRequest): LocalCarnosAnalyticsAdapterResponse {
  const capabilities = buildLocalCarnosRuntimeCapabilityFlags(request.runtimeMode);
  const runtimeAllowed = capabilities.canUseLocalRuntime && request.allowLocalRuntime;
  const usedDeterministicFallback = !runtimeAllowed && request.allowDeterministicFallback && capabilities.canUseDeterministicFallback;
  const readiness = chooseLocalCarnosReadiness(request, runtimeAllowed);
  const disclosures = collectLocalCarnosOfflineDisclosures(request, usedDeterministicFallback);
  return {
    requestId: request.requestId,
    runtimeMode: runtimeAllowed ? request.runtimeMode : "deterministic_fallback",
    adapterKind: runtimeAllowed ? request.adapterKind : "deterministic_adapter",
    readiness,
    usedLocalRuntime: runtimeAllowed,
    usedDeterministicFallback,
    disclosures,
    explanationText: buildDeterministicOfflineExplanation(request, usedDeterministicFallback),
    safetyNotes: buildLocalCarnosSafetyNotes(request, usedDeterministicFallback),
    canWriteMemory: false,
    canExecuteAction: false,
    canClaimCurrentInfo: false,
    canClaimOnlineSourceOfTruth: false,
  };
}

export function collectLocalCarnosOfflineDisclosures(request: LocalCarnosAnalyticsAdapterRequest, usedDeterministicFallback: boolean): readonly LocalCarnosOfflineDisclosure[] {
  const disclosures = new Set<LocalCarnosOfflineDisclosure>();
  if (!request.allowLocalRuntime || request.runtimeMode === "disabled") disclosures.add("offline_runtime_not_required");
  if (request.runtimeMode === "unavailable") disclosures.add("offline_runtime_unavailable");
  if (usedDeterministicFallback || request.runtimeMode === "deterministic_fallback") disclosures.add("deterministic_fallback_used");
  if (request.allowCachedContext) disclosures.add("cached_context_must_be_disclosed");
  if (request.allowUnsyncedContext || request.sourceState === "unsynced_local") disclosures.add("unsynced_context_must_be_disclosed");
  disclosures.add("local_context_is_not_online_source_of_truth");
  disclosures.add("current_info_unavailable_offline");
  disclosures.add("memory_write_disabled");
  disclosures.add("action_execution_disabled");
  return [...disclosures];
}

export function summarizeLocalCarnosRuntimeBoundary(): LocalCarnosRuntimeBoundarySummary {
  return {
    phase: "18M-B",
    runtimeModes: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_MODES,
    adapterKinds: PHASE_18M_B_LOCAL_CARNOS_ADAPTER_KINDS,
    readinessStates: PHASE_18M_B_LOCAL_CARNOS_READINESS_STATES,
    disclosures: PHASE_18M_B_LOCAL_CARNOS_DISCLOSURES,
    optionCLocalRuntimeBoundaryImplemented: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.optionCLocalRuntimeBoundaryImplemented,
    runtimeRequiredDuringChecks: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.runtimeRequiredDuringChecks,
    networkCallsEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.networkCallsEnabled,
    modelCallsEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.modelCallsEnabled,
    streamingEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.streamingEnabled,
    embeddingCallsEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.embeddingCallsEnabled,
    vectorSearchEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.vectorSearchEnabled,
    memoryWriteEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.memoryWriteEnabled,
    actionExecutionEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.actionExecutionEnabled,
    schemaWritesEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.supabaseCallsEnabled,
  };
}

function chooseLocalCarnosReadiness(request: LocalCarnosAnalyticsAdapterRequest, runtimeAllowed: boolean): LocalCarnosRuntimeReadiness {
  if (!request.allowLocalRuntime || request.runtimeMode === "disabled") return "not_required";
  if (request.allowActionExecution || request.allowMemoryWrite) return "blocked_by_policy";
  if (runtimeAllowed) return "available_for_future_use";
  if (request.runtimeMode === "unavailable") return "not_configured";
  return "disabled_for_ci";
}

function buildDeterministicOfflineExplanation(request: LocalCarnosAnalyticsAdapterRequest, usedDeterministicFallback: boolean): string {
  const sourceLine = request.sourceState === "unsynced_local" ? "This context includes unsynced local information." : "This context is bounded by the supplied analytics explanation plan.";
  const fallbackLine = usedDeterministicFallback ? "A deterministic fallback is being used because local runtime execution is optional and not required for checks." : "The local runtime path is prepared as a future optional boundary.";
  return fallbackLine + " " + sourceLine + " Carnos must not claim current online information, memory writes, action execution, or online source-of-truth status from this adapter.";
}

function buildLocalCarnosSafetyNotes(request: LocalCarnosAnalyticsAdapterRequest, usedDeterministicFallback: boolean): readonly string[] {
  const notes = [
    "Local runtime is optional and must not be required during CI, build, or checks.",
    "Offline analytics explanations must disclose cached, unsynced, deterministic, and current-info limits.",
    "The adapter cannot write memory or execute actions.",
    "The adapter cannot claim local context is the online source of truth.",
  ];
  if (usedDeterministicFallback) notes.push("Deterministic fallback output is not a model-generated answer.");
  if (request.explanationPlan.requiresHumanReview) notes.push("The upstream explanation plan requires human review before recommendation or memory use.");
  return notes;
}
