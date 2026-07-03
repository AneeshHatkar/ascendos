import type { InsightDisclosureRequirement, InsightQualityLevel } from "./insight-quality-provenance";

export type AnalyticsDashboardSectionId =
  | "snapshot"
  | "metric_quality"
  | "trend_comparison_correlation"
  | "experiment_readiness"
  | "carnos_disclosure"
  | "privacy_boundary";

export type AnalyticsDashboardSourceState =
  | "fresh"
  | "cached"
  | "stale"
  | "partial"
  | "missing"
  | "unsynced"
  | "deterministic_preview";

export type AnalyticsDashboardUiState =
  | "ready"
  | "empty"
  | "loading"
  | "error"
  | "privacy_restricted";

export type AnalyticsDashboardChartKind =
  | "line"
  | "bar"
  | "scorecard"
  | "comparison"
  | "correlation"
  | "experiment_status";

export interface AnalyticsDashboardCardViewModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly sectionId: AnalyticsDashboardSectionId;
  readonly chartKind: AnalyticsDashboardChartKind;
  readonly uiState: AnalyticsDashboardUiState;
  readonly sourceState: AnalyticsDashboardSourceState;
  readonly qualityLevel: InsightQualityLevel;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly primaryValueLabel: string;
  readonly secondaryValueLabel: string;
  readonly emptyStateMessage: string;
  readonly privacyMessage: string;
  readonly carnosExplanationLimit: string;
}

export interface AnalyticsDashboardViewModel {
  readonly title: string;
  readonly subtitle: string;
  readonly uiState: AnalyticsDashboardUiState;
  readonly sourceState: AnalyticsDashboardSourceState;
  readonly cards: readonly AnalyticsDashboardCardViewModel[];
  readonly disclosures: readonly InsightDisclosureRequirement[];
  readonly emptyStateMessage: string;
  readonly loadingMessage: string;
  readonly errorMessage: string;
  readonly privacyMessage: string;
  readonly noHardcodedAnalyticsData: true;
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly fakeAnalyticsDataEnabled: false;
  readonly memoryWriteEnabled: false;
  readonly actionExecutionEnabled: false;
  readonly localCarnosRuntimeRequired: false;
}

export interface AnalyticsDashboardBuildInput {
  readonly cards: readonly AnalyticsDashboardCardViewModel[];
  readonly sourceState: AnalyticsDashboardSourceState;
  readonly uiState?: AnalyticsDashboardUiState;
  readonly disclosures?: readonly InsightDisclosureRequirement[];
}

export const PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY = {
  routeImplemented: true,
  viewModelImplemented: true,
  dashboardComponentImplemented: true,
  chartReadyCardsImplemented: true,
  emptyStateImplemented: true,
  loadingStateImplemented: true,
  errorStateImplemented: true,
  privacyStateImplemented: true,
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeAnalyticsDataEnabled: false,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  localCarnosRuntimeRequired: false,
} as const;

export const PHASE_18K_ANALYTICS_DASHBOARD_SECTIONS: readonly AnalyticsDashboardSectionId[] = [
  "snapshot",
  "metric_quality",
  "trend_comparison_correlation",
  "experiment_readiness",
  "carnos_disclosure",
  "privacy_boundary",
] as const;

export const PHASE_18K_ANALYTICS_DASHBOARD_SOURCE_STATES: readonly AnalyticsDashboardSourceState[] = [
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "unsynced",
  "deterministic_preview",
] as const;

export function buildAnalyticsDashboardViewModel(input: AnalyticsDashboardBuildInput): AnalyticsDashboardViewModel {
  const cards = input.cards;
  const isEmpty = cards.length === 0;
  const uiState = input.uiState ?? (isEmpty ? "empty" : "ready");
  const disclosures = input.disclosures ?? collectDashboardDisclosures(cards);

  return {
    title: "Analytics",
    subtitle: "Snapshots, trends, comparisons, correlations, and experiment readiness with source-aware Carnos boundaries.",
    uiState,
    sourceState: input.sourceState,
    cards,
    disclosures,
    emptyStateMessage: "No analytics can be shown until real user-scoped metrics are available through the approved analytics repository path.",
    loadingMessage: "Analytics are being prepared from approved user-scoped sources.",
    errorMessage: "Analytics could not be prepared safely. Carnos should not infer missing data.",
    privacyMessage: "Sensitive metrics remain hidden unless the approved privacy boundary allows them.",
    noHardcodedAnalyticsData: true,
    runtimeDataReadsEnabled: PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY.supabaseCallsEnabled,
    fakeAnalyticsDataEnabled: PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY.fakeAnalyticsDataEnabled,
    memoryWriteEnabled: PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY.memoryWriteEnabled,
    actionExecutionEnabled: PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY.actionExecutionEnabled,
    localCarnosRuntimeRequired: PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY.localCarnosRuntimeRequired,
  };
}

export function buildEmptyAnalyticsDashboardViewModel(): AnalyticsDashboardViewModel {
  return buildAnalyticsDashboardViewModel({
    cards: [],
    sourceState: "missing",
    uiState: "empty",
    disclosures: ["disclose_insufficient_data"],
  });
}

export function collectDashboardDisclosures(cards: readonly AnalyticsDashboardCardViewModel[]): readonly InsightDisclosureRequirement[] {
  const disclosures = new Set<InsightDisclosureRequirement>();

  for (const card of cards) {
    for (const disclosure of card.disclosureRequirements) {
      disclosures.add(disclosure);
    }

    if (card.sourceState === "cached") disclosures.add("disclose_cached_context");
    if (card.sourceState === "stale") disclosures.add("disclose_stale_context");
    if (card.sourceState === "partial") disclosures.add("disclose_partial_context");
    if (card.sourceState === "missing") disclosures.add("disclose_insufficient_data");
    if (card.sourceState === "unsynced") disclosures.add("disclose_unsynced_context");
    if (card.sourceState === "deterministic_preview") disclosures.add("disclose_deterministic_preview");
  }

  if (cards.length === 0) disclosures.add("disclose_insufficient_data");

  return [...disclosures];
}

export function summarizeAnalyticsDashboardUiBoundary() {
  return {
    phase: "18K" as const,
    sections: PHASE_18K_ANALYTICS_DASHBOARD_SECTIONS,
    sourceStates: PHASE_18K_ANALYTICS_DASHBOARD_SOURCE_STATES,
    codedCapabilities: [
      "analytics dashboard route",
      "analytics dashboard UI component",
      "chart-ready view model",
      "metric quality section",
      "snapshot section",
      "trend/comparison/correlation section",
      "experiment readiness section",
      "Carnos disclosure section",
      "privacy boundary section",
      "empty state",
      "loading state",
      "error state",
      "privacy restricted state",
      "no hardcoded analytics data",
      "no runtime SQL reads",
      "no Supabase client calls",
      "no schema writes",
      "no memory writes",
      "no action execution",
    ],
    ...PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY,
  };
}
