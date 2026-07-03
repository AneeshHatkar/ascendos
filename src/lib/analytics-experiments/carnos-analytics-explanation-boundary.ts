import type {
  InsightDisclosureRequirement,
  InsightQualityLevel,
} from "./insight-quality-provenance";

export type CarnosAnalyticsExplanationSubject =
  | "metric_quality"
  | "snapshot_freshness"
  | "trend"
  | "comparison"
  | "correlation"
  | "self_experiment"
  | "experiment_lesson"
  | "memory_candidate"
  | "privacy_boundary";

export type CarnosAnalyticsExplanationMode =
  | "safe_summary"
  | "uncertainty_summary"
  | "evidence_gap_summary"
  | "cached_context_summary"
  | "unsynced_context_summary"
  | "deterministic_preview_summary"
  | "review_required_summary"
  | "blocked";

export type CarnosAnalyticsExplanationSourceState =
  | "online_source_of_truth"
  | "eligible_offline_cache"
  | "mixed_online_offline"
  | "unsynced_local"
  | "deterministic_preview"
  | "missing"
  | "privacy_restricted";

export type CarnosAnalyticsClaimBoundary =
  | "observation_only"
  | "trend_not_proof"
  | "correlation_not_causation"
  | "experiment_not_causal_proof"
  | "lesson_candidate_not_memory"
  | "recommendation_requires_review"
  | "action_requires_confirmation"
  | "blocked_due_to_missing_data"
  | "blocked_due_to_privacy";

export type CarnosAnalyticsExplanationRisk =
  | "low"
  | "medium"
  | "high"
  | "blocked";

export interface CarnosAnalyticsExplanationInput {
  readonly subject: CarnosAnalyticsExplanationSubject;
  readonly qualityLevel: InsightQualityLevel;
  readonly sourceState: CarnosAnalyticsExplanationSourceState;
  readonly disclosures: readonly InsightDisclosureRequirement[];
  readonly hasEnoughEvidence: boolean;
  readonly hasConfounders: boolean;
  readonly hasPrivacyRestriction: boolean;
  readonly hasUnsyncedContext: boolean;
  readonly requestsAction: boolean;
  readonly requestsMemoryWrite: boolean;
  readonly requestsCausalClaim: boolean;
  readonly requestsProofClaim: boolean;
}

export interface CarnosAnalyticsExplanationPlan {
  readonly subject: CarnosAnalyticsExplanationSubject;
  readonly mode: CarnosAnalyticsExplanationMode;
  readonly sourceState: CarnosAnalyticsExplanationSourceState;
  readonly claimBoundaries: readonly CarnosAnalyticsClaimBoundary[];
  readonly requiredDisclosures: readonly InsightDisclosureRequirement[];
  readonly risk: CarnosAnalyticsExplanationRisk;
  readonly canExplain: boolean;
  readonly canRecommend: boolean;
  readonly canCreateMemoryCandidate: boolean;
  readonly canWriteMemory: false;
  readonly canExecuteAction: false;
  readonly canClaimCausality: false;
  readonly canClaimProof: false;
  readonly requiresHumanReview: boolean;
  readonly safeOpening: string;
  readonly safeEvidenceLine: string;
  readonly safeLimitLine: string;
  readonly safeNextStepLine: string;
  readonly blockedReason: string | null;
}

export interface CarnosAnalyticsExplanationBoundarySummary {
  readonly phase: "18M";
  readonly subjects: readonly CarnosAnalyticsExplanationSubject[];
  readonly modes: readonly CarnosAnalyticsExplanationMode[];
  readonly sourceStates: readonly CarnosAnalyticsExplanationSourceState[];
  readonly claimBoundaries: readonly CarnosAnalyticsClaimBoundary[];
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly modelCallsEnabled: false;
  readonly fakeAnalyticsDataEnabled: false;
  readonly memoryWriteEnabled: false;
  readonly actionExecutionEnabled: false;
  readonly localCarnosRuntimeRequired: false;
  readonly causalityClaimsAllowed: false;
  readonly proofClaimsAllowed: false;
}

export const PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY = {
  deterministicBoundaryImplemented: true,
  safeResponseTemplateImplemented: true,
  trendExplanationLimitsImplemented: true,
  comparisonExplanationLimitsImplemented: true,
  correlationExplanationLimitsImplemented: true,
  experimentExplanationLimitsImplemented: true,
  lessonExplanationLimitsImplemented: true,
  sourceDisclosureRulesImplemented: true,
  reviewBeforeMemoryWriteImplemented: true,
  noCausalityBoundaryImplemented: true,
  noProofBoundaryImplemented: true,
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  modelCallsEnabled: false,
  fakeAnalyticsDataEnabled: false,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  localCarnosRuntimeRequired: false,
  causalityClaimsAllowed: false,
  proofClaimsAllowed: false,
} as const;

export const PHASE_18M_CARNOS_ANALYTICS_SUBJECTS: readonly CarnosAnalyticsExplanationSubject[] = [
  "metric_quality",
  "snapshot_freshness",
  "trend",
  "comparison",
  "correlation",
  "self_experiment",
  "experiment_lesson",
  "memory_candidate",
  "privacy_boundary",
] as const;

export const PHASE_18M_CARNOS_ANALYTICS_MODES: readonly CarnosAnalyticsExplanationMode[] = [
  "safe_summary",
  "uncertainty_summary",
  "evidence_gap_summary",
  "cached_context_summary",
  "unsynced_context_summary",
  "deterministic_preview_summary",
  "review_required_summary",
  "blocked",
] as const;

export const PHASE_18M_CARNOS_ANALYTICS_SOURCE_STATES: readonly CarnosAnalyticsExplanationSourceState[] = [
  "online_source_of_truth",
  "eligible_offline_cache",
  "mixed_online_offline",
  "unsynced_local",
  "deterministic_preview",
  "missing",
  "privacy_restricted",
] as const;

export const PHASE_18M_CARNOS_ANALYTICS_CLAIM_BOUNDARIES: readonly CarnosAnalyticsClaimBoundary[] = [
  "observation_only",
  "trend_not_proof",
  "correlation_not_causation",
  "experiment_not_causal_proof",
  "lesson_candidate_not_memory",
  "recommendation_requires_review",
  "action_requires_confirmation",
  "blocked_due_to_missing_data",
  "blocked_due_to_privacy",
] as const;

export function buildCarnosAnalyticsExplanationPlan(
  input: CarnosAnalyticsExplanationInput,
): CarnosAnalyticsExplanationPlan {
  const requiredDisclosures = collectRequiredCarnosAnalyticsDisclosures(input);
  const claimBoundaries = collectClaimBoundaries(input);
  const blockedReason = getBlockedReason(input);
  const mode = chooseExplanationMode(input, blockedReason);
  const risk = chooseExplanationRisk(input, blockedReason);
  const canExplain = blockedReason === null;
  const requiresHumanReview =
    input.requestsAction ||
    input.requestsMemoryWrite ||
    input.subject === "memory_candidate" ||
    input.subject === "experiment_lesson" ||
    input.hasConfounders ||
    input.qualityLevel === "low_confidence";

  return {
    subject: input.subject,
    mode,
    sourceState: input.sourceState,
    claimBoundaries,
    requiredDisclosures,
    risk,
    canExplain,
    canRecommend: canExplain && !input.requestsCausalClaim && !input.requestsProofClaim,
    canCreateMemoryCandidate: canExplain && input.subject === "experiment_lesson" && requiresHumanReview,
    canWriteMemory: false,
    canExecuteAction: false,
    canClaimCausality: false,
    canClaimProof: false,
    requiresHumanReview,
    safeOpening: buildSafeOpening(input, mode),
    safeEvidenceLine: buildSafeEvidenceLine(input),
    safeLimitLine: buildSafeLimitLine(input, claimBoundaries),
    safeNextStepLine: buildSafeNextStepLine(input, requiresHumanReview),
    blockedReason,
  };
}

export function collectRequiredCarnosAnalyticsDisclosures(
  input: CarnosAnalyticsExplanationInput,
): readonly InsightDisclosureRequirement[] {
  const disclosures = new Set<InsightDisclosureRequirement>(input.disclosures);

  if (!input.hasEnoughEvidence || input.sourceState === "missing") {
    disclosures.add("disclose_insufficient_data");
  }

  if (input.sourceState === "eligible_offline_cache") {
    disclosures.add("disclose_cached_context");
  }

  if (input.sourceState === "mixed_online_offline") {
    disclosures.add("disclose_partial_context");
  }

  if (input.sourceState === "unsynced_local" || input.hasUnsyncedContext) {
    disclosures.add("disclose_unsynced_context");
  }

  if (input.sourceState === "deterministic_preview") {
    disclosures.add("disclose_deterministic_preview");
  }

  if (input.hasConfounders) {
    disclosures.add("disclose_confounders");
  }

  if (input.requestsCausalClaim || input.subject === "correlation" || input.subject === "self_experiment") {
    disclosures.add("avoid_causal_claims");
  }

  return [...disclosures];
}

export function collectClaimBoundaries(
  input: CarnosAnalyticsExplanationInput,
): readonly CarnosAnalyticsClaimBoundary[] {
  const boundaries = new Set<CarnosAnalyticsClaimBoundary>();

  boundaries.add("observation_only");

  if (input.subject === "trend") boundaries.add("trend_not_proof");
  if (input.subject === "correlation") boundaries.add("correlation_not_causation");
  if (input.subject === "self_experiment") boundaries.add("experiment_not_causal_proof");
  if (input.subject === "experiment_lesson" || input.subject === "memory_candidate") {
    boundaries.add("lesson_candidate_not_memory");
  }

  if (input.requestsAction) boundaries.add("action_requires_confirmation");
  if (input.requestsMemoryWrite) boundaries.add("recommendation_requires_review");
  if (!input.hasEnoughEvidence || input.sourceState === "missing") boundaries.add("blocked_due_to_missing_data");
  if (input.hasPrivacyRestriction || input.sourceState === "privacy_restricted") boundaries.add("blocked_due_to_privacy");

  return [...boundaries];
}

export function summarizeCarnosAnalyticsExplanationBoundary(): CarnosAnalyticsExplanationBoundarySummary {
  return {
    phase: "18M",
    subjects: PHASE_18M_CARNOS_ANALYTICS_SUBJECTS,
    modes: PHASE_18M_CARNOS_ANALYTICS_MODES,
    sourceStates: PHASE_18M_CARNOS_ANALYTICS_SOURCE_STATES,
    claimBoundaries: PHASE_18M_CARNOS_ANALYTICS_CLAIM_BOUNDARIES,
    runtimeDataReadsEnabled: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.supabaseCallsEnabled,
    modelCallsEnabled: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.modelCallsEnabled,
    fakeAnalyticsDataEnabled: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.fakeAnalyticsDataEnabled,
    memoryWriteEnabled: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.memoryWriteEnabled,
    actionExecutionEnabled: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.actionExecutionEnabled,
    localCarnosRuntimeRequired: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.localCarnosRuntimeRequired,
    causalityClaimsAllowed: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.causalityClaimsAllowed,
    proofClaimsAllowed: PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.proofClaimsAllowed,
  };
}

function getBlockedReason(input: CarnosAnalyticsExplanationInput): string | null {
  if (input.hasPrivacyRestriction || input.sourceState === "privacy_restricted") {
    return "Carnos cannot explain privacy-restricted analytics context.";
  }

  if (!input.hasEnoughEvidence || input.sourceState === "missing") {
    return "Carnos cannot explain analytics that do not have enough evidence.";
  }

  if (input.requestsCausalClaim) {
    return "Carnos cannot claim analytics establish cause.";
  }

  if (input.requestsProofClaim) {
    return "Carnos cannot claim analytics prove a conclusion.";
  }

  return null;
}

function chooseExplanationMode(
  input: CarnosAnalyticsExplanationInput,
  blockedReason: string | null,
): CarnosAnalyticsExplanationMode {
  if (blockedReason) return "blocked";
  if (input.requestsMemoryWrite || input.requestsAction) return "review_required_summary";
  if (input.sourceState === "deterministic_preview") return "deterministic_preview_summary";
  if (input.sourceState === "unsynced_local" || input.hasUnsyncedContext) return "unsynced_context_summary";
  if (input.sourceState === "eligible_offline_cache") return "cached_context_summary";
  if (input.sourceState === "mixed_online_offline") return "uncertainty_summary";
  if (input.qualityLevel === "insufficient_data") return "evidence_gap_summary";
  if (input.qualityLevel === "low_confidence" || input.hasConfounders) return "uncertainty_summary";
  return "safe_summary";
}

function chooseExplanationRisk(
  input: CarnosAnalyticsExplanationInput,
  blockedReason: string | null,
): CarnosAnalyticsExplanationRisk {
  if (blockedReason) return "blocked";
  if (input.hasPrivacyRestriction || input.requestsCausalClaim || input.requestsProofClaim) return "high";
  if (input.requestsAction || input.requestsMemoryWrite || input.hasConfounders) return "medium";
  if (input.qualityLevel === "low_confidence" || input.qualityLevel === "insufficient_data") return "medium";
  return "low";
}

function buildSafeOpening(
  input: CarnosAnalyticsExplanationInput,
  mode: CarnosAnalyticsExplanationMode,
): string {
  if (mode === "blocked") {
    return "I cannot safely explain this analytics result as stated.";
  }

  if (input.subject === "correlation") {
    return "I can describe the observed relationship, but I cannot treat correlation as causation.";
  }

  if (input.subject === "self_experiment" || input.subject === "experiment_lesson") {
    return "I can summarize the experiment signal as a candidate lesson, not as proof.";
  }

  return "I can summarize what the available analytics show with the current evidence limits.";
}

function buildSafeEvidenceLine(input: CarnosAnalyticsExplanationInput): string {
  if (input.sourceState === "eligible_offline_cache") {
    return "This uses eligible cached context, so Carnos must say it may not reflect the latest online source.";
  }

  if (input.sourceState === "mixed_online_offline") {
    return "This mixes online and offline context, so Carnos must describe the result as partial.";
  }

  if (input.sourceState === "unsynced_local") {
    return "This includes unsynced local context, so Carnos must not claim it has been saved or synced.";
  }

  if (input.sourceState === "deterministic_preview") {
    return "This is a deterministic preview, so Carnos must not present it as a model-derived conclusion.";
  }

  return "This explanation is limited to the supplied user-scoped analytics context.";
}

function buildSafeLimitLine(
  input: CarnosAnalyticsExplanationInput,
  claimBoundaries: readonly CarnosAnalyticsClaimBoundary[],
): string {
  if (input.hasConfounders) {
    return "Confounders are present, so Carnos must avoid causal wording and keep the result tentative.";
  }

  if (claimBoundaries.includes("blocked_due_to_missing_data")) {
    return "Missing or insufficient data prevents a safe explanation.";
  }

  if (claimBoundaries.includes("correlation_not_causation")) {
    return "The explanation must say the relationship is not proof of causality.";
  }

  if (claimBoundaries.includes("experiment_not_causal_proof")) {
    return "The explanation must say the experiment result stays observational and limited.";
  }

  return "The explanation must stay observational and avoid certainty beyond the evidence.";
}

function buildSafeNextStepLine(
  input: CarnosAnalyticsExplanationInput,
  requiresHumanReview: boolean,
): string {
  if (input.requestsAction) {
    return "Any action must remain a proposal until the user explicitly confirms it in a future approved path.";
  }

  if (input.requestsMemoryWrite || input.subject === "memory_candidate") {
    return "Any memory candidate must remain review-only and cannot be written by this boundary.";
  }

  if (requiresHumanReview) {
    return "A human review step is required before turning this into a recommendation or memory candidate.";
  }

  return "Carnos may offer a cautious next-step suggestion without writing data or executing actions.";
}
