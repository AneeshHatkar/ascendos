import type { InsightDisclosureRequirement, InsightQualityLevel } from "./insight-quality-provenance";

export type SelfExperimentLabSectionId =
  | "template_library"
  | "experiment_draft"
  | "baseline_window"
  | "active_window"
  | "measurement_plan"
  | "confounder_review"
  | "readiness_review"
  | "lesson_candidates"
  | "memory_review_boundary"
  | "privacy_boundary";

export type SelfExperimentLabUiState =
  | "ready"
  | "empty"
  | "loading"
  | "error"
  | "privacy_restricted"
  | "review_required";

export type SelfExperimentLabSourceState =
  | "fresh"
  | "cached"
  | "stale"
  | "partial"
  | "missing"
  | "unsynced"
  | "deterministic_preview";

export type SelfExperimentLabReadinessState =
  | "ready"
  | "ready_with_warnings"
  | "not_ready"
  | "invalid"
  | "review_required";

export type SelfExperimentLabActionBoundary =
  | "preview_only"
  | "review_required_before_write"
  | "write_disabled"
  | "execution_disabled";

export interface SelfExperimentLabPanelViewModel {
  readonly id: string;
  readonly sectionId: SelfExperimentLabSectionId;
  readonly title: string;
  readonly description: string;
  readonly uiState: SelfExperimentLabUiState;
  readonly sourceState: SelfExperimentLabSourceState;
  readonly readinessState: SelfExperimentLabReadinessState;
  readonly qualityLevel: InsightQualityLevel;
  readonly actionBoundary: SelfExperimentLabActionBoundary;
  readonly primaryLabel: string;
  readonly secondaryLabel: string;
  readonly emptyStateMessage: string;
  readonly privacyMessage: string;
  readonly reviewMessage: string;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly carnosExplanationLimit: string;
}

export interface SelfExperimentLabViewModel {
  readonly title: string;
  readonly subtitle: string;
  readonly uiState: SelfExperimentLabUiState;
  readonly sourceState: SelfExperimentLabSourceState;
  readonly panels: readonly SelfExperimentLabPanelViewModel[];
  readonly disclosures: readonly InsightDisclosureRequirement[];
  readonly emptyStateMessage: string;
  readonly loadingMessage: string;
  readonly errorMessage: string;
  readonly privacyMessage: string;
  readonly reviewMessage: string;
  readonly noHardcodedExperimentData: true;
  readonly experimentWritesEnabled: false;
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly fakeExperimentDataEnabled: false;
  readonly memoryWriteEnabled: false;
  readonly actionExecutionEnabled: false;
  readonly localCarnosRuntimeRequired: false;
}

export interface SelfExperimentLabBuildInput {
  readonly panels: readonly SelfExperimentLabPanelViewModel[];
  readonly sourceState: SelfExperimentLabSourceState;
  readonly uiState?: SelfExperimentLabUiState;
  readonly disclosures?: readonly InsightDisclosureRequirement[];
}

export const PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY = {
  viewModelImplemented: true,
  labComponentImplemented: true,
  analyticsRouteIntegrationImplemented: true,
  templateLibrarySectionImplemented: true,
  experimentDraftSectionImplemented: true,
  baselineWindowSectionImplemented: true,
  activeWindowSectionImplemented: true,
  measurementPlanSectionImplemented: true,
  confounderReviewSectionImplemented: true,
  readinessReviewSectionImplemented: true,
  lessonCandidateSectionImplemented: true,
  memoryReviewBoundarySectionImplemented: true,
  privacyBoundarySectionImplemented: true,
  emptyStateImplemented: true,
  loadingStateImplemented: true,
  errorStateImplemented: true,
  privacyStateImplemented: true,
  reviewRequiredStateImplemented: true,
  noHardcodedExperimentData: true,
  experimentWritesEnabled: false,
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeExperimentDataEnabled: false,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  localCarnosRuntimeRequired: false,
} as const;

export const PHASE_18L_SELF_EXPERIMENT_LAB_SECTIONS: readonly SelfExperimentLabSectionId[] = [
  "template_library",
  "experiment_draft",
  "baseline_window",
  "active_window",
  "measurement_plan",
  "confounder_review",
  "readiness_review",
  "lesson_candidates",
  "memory_review_boundary",
  "privacy_boundary",
] as const;

export const PHASE_18L_SELF_EXPERIMENT_LAB_SOURCE_STATES: readonly SelfExperimentLabSourceState[] = [
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "unsynced",
  "deterministic_preview",
] as const;

export const PHASE_18L_SELF_EXPERIMENT_LAB_READINESS_STATES: readonly SelfExperimentLabReadinessState[] = [
  "ready",
  "ready_with_warnings",
  "not_ready",
  "invalid",
  "review_required",
] as const;

export function collectSelfExperimentLabDisclosures(
  panels: readonly SelfExperimentLabPanelViewModel[],
): readonly InsightDisclosureRequirement[] {
  const disclosures = new Set<InsightDisclosureRequirement>();

  for (const panel of panels) {
    for (const disclosure of panel.disclosureRequirements) {
      disclosures.add(disclosure);
    }

    if (panel.sourceState === "cached") disclosures.add("disclose_cached_context");
    if (panel.sourceState === "stale") disclosures.add("disclose_stale_context");
    if (panel.sourceState === "partial") disclosures.add("disclose_partial_context");
    if (panel.sourceState === "missing") disclosures.add("disclose_insufficient_data");
    if (panel.sourceState === "unsynced") disclosures.add("disclose_unsynced_context");
    if (panel.sourceState === "deterministic_preview") disclosures.add("disclose_deterministic_preview");
    if (panel.readinessState === "review_required") disclosures.add("disclose_partial_context");
    if (panel.sectionId === "confounder_review") disclosures.add("disclose_confounders");
  }

  if (panels.length === 0) disclosures.add("disclose_insufficient_data");

  return [...disclosures];
}

export function buildSelfExperimentLabViewModel(input: SelfExperimentLabBuildInput): SelfExperimentLabViewModel {
  const panels = input.panels;
  const isEmpty = panels.length === 0;
  const uiState = input.uiState ?? (isEmpty ? "empty" : "ready");
  const disclosures = input.disclosures ?? collectSelfExperimentLabDisclosures(panels);

  return {
    title: "Self-Experiment Lab",
    subtitle: "Plan, review, and evaluate personal experiments with baseline windows, active windows, confounders, and review-before-memory-write boundaries.",
    uiState,
    sourceState: input.sourceState,
    panels,
    disclosures,
    emptyStateMessage: "No self-experiment can be shown until a real user-scoped template or experiment draft is available through the approved repository boundary.",
    loadingMessage: "Self-experiment context is being prepared from approved user-scoped sources.",
    errorMessage: "Self-experiment context could not be prepared safely. Carnos should not invent experiment state.",
    privacyMessage: "Sensitive experiment details remain hidden unless the approved privacy boundary allows them.",
    reviewMessage: "Experiment lessons and memory candidates require explicit review before any future write path can use them.",
    noHardcodedExperimentData: true,
    experimentWritesEnabled: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.experimentWritesEnabled,
    runtimeDataReadsEnabled: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.supabaseCallsEnabled,
    fakeExperimentDataEnabled: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.fakeExperimentDataEnabled,
    memoryWriteEnabled: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.memoryWriteEnabled,
    actionExecutionEnabled: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.actionExecutionEnabled,
    localCarnosRuntimeRequired: PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY.localCarnosRuntimeRequired,
  };
}

export function buildEmptySelfExperimentLabViewModel(): SelfExperimentLabViewModel {
  return buildSelfExperimentLabViewModel({
    panels: [],
    sourceState: "missing",
    uiState: "empty",
    disclosures: ["disclose_insufficient_data"],
  });
}

export function summarizeSelfExperimentLabUiBoundary() {
  return {
    phase: "18L" as const,
    sections: PHASE_18L_SELF_EXPERIMENT_LAB_SECTIONS,
    sourceStates: PHASE_18L_SELF_EXPERIMENT_LAB_SOURCE_STATES,
    readinessStates: PHASE_18L_SELF_EXPERIMENT_LAB_READINESS_STATES,
    codedCapabilities: [
      "self-experiment lab view model",
      "self-experiment lab UI component",
      "analytics route integration",
      "experiment template library section",
      "experiment draft review section",
      "baseline window section",
      "active window section",
      "measurement plan section",
      "confounder review section",
      "readiness review section",
      "lesson candidate section",
      "memory review boundary section",
      "privacy boundary section",
      "empty state",
      "loading state",
      "error state",
      "privacy restricted state",
      "review required state",
      "review-before-memory-write boundary",
      "no hardcoded experiment data",
      "no experiment writes",
      "no memory writes",
      "no action execution",
      "no Supabase client calls",
      "no schema writes",
    ],
    ...PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY,
  };
}
