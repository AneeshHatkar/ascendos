export type CustomTrackerDashboardViewModelStatus =
  | "empty"
  | "loading"
  | "error"
  | "privacy_restricted"
  | "review_required"
  | "ready";

export type CustomTrackerDashboardCardKey =
  | "tracker_schema"
  | "fields"
  | "entries"
  | "dashboard_target"
  | "frequency"
  | "ai_mapping";

export type CustomTrackerDashboardPrimaryAction =
  | "create_tracker"
  | "add_field"
  | "log_entry"
  | "map_ai_extraction"
  | "place_card";

export type CustomTrackerDashboardActionState =
  | "disabled_boundary"
  | "requires_review"
  | "ready_for_future_write";

export type CustomTrackerDashboardCardViewModel = {
  key: CustomTrackerDashboardCardKey;
  title: string;
  description: string;
  statusLabel: string;
  emptyLabel: string;
  privacyLabel: string;
  reviewLabel: string;
  action: CustomTrackerDashboardPrimaryAction;
  actionLabel: string;
  actionState: CustomTrackerDashboardActionState;
  runtimeDataReadEnabled: false;
  runtimeDataWriteEnabled: false;
  fakeRuntimeDataAllowed: false;
};

export type CustomTrackerDashboardTemplateSuggestion = {
  key: string;
  title: string;
  domain: string;
  description: string;
  requiresReviewBeforeWrite: true;
  createsRuntimeTracker: false;
};

export type CustomTrackerDashboardStateMessage = {
  status: CustomTrackerDashboardViewModelStatus;
  title: string;
  description: string;
};

export type CustomTrackerDashboardBoundaryDisclosures = {
  noHardcodedDemoData: true;
  noFakeTrackerEntries: true;
  noFakeDashboardCards: true;
  noFakeAiMappings: true;
  noRuntimeDatabaseReads: true;
  noRuntimeDatabaseWrites: true;
  noSilentAiWrites: true;
  noActionExecution: true;
  reviewBeforeWriteRequired: true;
};

export type CustomTrackerDashboardViewModel = {
  phase: "19M";
  route: "/custom-trackers";
  title: string;
  subtitle: string;
  status: CustomTrackerDashboardViewModelStatus;
  stateMessage: CustomTrackerDashboardStateMessage;
  cards: CustomTrackerDashboardCardViewModel[];
  templateSuggestions: CustomTrackerDashboardTemplateSuggestion[];
  primaryActions: CustomTrackerDashboardPrimaryAction[];
  boundaryDisclosures: CustomTrackerDashboardBoundaryDisclosures;
  loadingStateEnabled: true;
  emptyStateEnabled: true;
  errorStateEnabled: true;
  privacyRestrictedStateEnabled: true;
  reviewRequiredStateEnabled: true;
  dashboardViewModelEnabled: true;
  dashboardUiEnabled: true;
  runtimeDatabaseReadsEnabled: false;
  runtimeDatabaseWritesEnabled: false;
  schemaMigrationEnabled: false;
  modelCallsEnabled: false;
  networkCallsEnabled: false;
};

export type BuildCustomTrackerDashboardViewModelInput = {
  status?: CustomTrackerDashboardViewModelStatus;
  hasTrackers?: boolean;
  hasPendingReview?: boolean;
  privacyRestricted?: boolean;
  errorMessage?: string | null;
};

export type CustomTrackerDashboardViewModelSummary = {
  phase: "19M";
  customTrackerRouteEnabled: true;
  dashboardViewModelEnabled: true;
  dashboardUiEnabled: true;
  emptyStateEnabled: true;
  templateSuggestionEmptyStateEnabled: true;
  loadingStateEnabled: true;
  errorStateEnabled: true;
  privacyRestrictedStateEnabled: true;
  reviewRequiredStateEnabled: true;
  trackerSchemaCardEnabled: true;
  fieldsCardEnabled: true;
  entriesCardEnabled: true;
  dashboardTargetCardEnabled: true;
  frequencyCardEnabled: true;
  aiMappingCardEnabled: true;
  primaryActionsRepresented: true;
  quickLogBoundaryRepresented: true;
  noHardcodedDemoData: true;
  noFakeTrackerEntries: true;
  noFakeDashboardCards: true;
  noFakeAiMappings: true;
  runtimeDatabaseReadsEnabled: false;
  runtimeDatabaseWritesEnabled: false;
  schemaMigrationEnabled: false;
  modelCallsEnabled: false;
  networkCallsEnabled: false;
  noSilentAiWrites: true;
};

export const PHASE_19M_CUSTOM_TRACKER_DASHBOARD_BOUNDARY = {
  phase: "19M",
  route: "/custom-trackers",
  customTrackerRouteEnabled: true,
  dashboardViewModelEnabled: true,
  dashboardUiEnabled: true,
  emptyStateEnabled: true,
  templateSuggestionEmptyStateEnabled: true,
  loadingStateEnabled: true,
  errorStateEnabled: true,
  privacyRestrictedStateEnabled: true,
  reviewRequiredStateEnabled: true,
  trackerSchemaCardEnabled: true,
  fieldsCardEnabled: true,
  entriesCardEnabled: true,
  dashboardTargetCardEnabled: true,
  frequencyCardEnabled: true,
  aiMappingCardEnabled: true,
  primaryActionsRepresented: true,
  quickLogBoundaryRepresented: true,
  noHardcodedDemoData: true,
  noFakeTrackerEntries: true,
  noFakeDashboardCards: true,
  noFakeAiMappings: true,
  runtimeDatabaseReadsEnabled: false,
  runtimeDatabaseWritesEnabled: false,
  schemaMigrationEnabled: false,
  modelCallsEnabled: false,
  networkCallsEnabled: false,
  noSilentAiWrites: true,
} as const;

export const CUSTOM_TRACKER_DASHBOARD_CARD_KEYS: readonly CustomTrackerDashboardCardKey[] = [
  "tracker_schema",
  "fields",
  "entries",
  "dashboard_target",
  "frequency",
  "ai_mapping",
];

export const CUSTOM_TRACKER_DASHBOARD_PRIMARY_ACTIONS: readonly CustomTrackerDashboardPrimaryAction[] = [
  "create_tracker",
  "add_field",
  "log_entry",
  "map_ai_extraction",
  "place_card",
];

export const CUSTOM_TRACKER_DASHBOARD_TEMPLATE_SUGGESTIONS: readonly CustomTrackerDashboardTemplateSuggestion[] = [
  {
    key: "daily_gym_training",
    title: "Daily Gym Training",
    domain: "body",
    description: "Track training sessions after user review.",
    requiresReviewBeforeWrite: true,
    createsRuntimeTracker: false,
  },
  {
    key: "job_application_pipeline",
    title: "Job Application Pipeline",
    domain: "career",
    description: "Track applications, referrals, and follow-ups after user review.",
    requiresReviewBeforeWrite: true,
    createsRuntimeTracker: false,
  },
  {
    key: "research_reading_log",
    title: "Research Reading Log",
    domain: "research",
    description: "Track papers, notes, and evidence after user review.",
    requiresReviewBeforeWrite: true,
    createsRuntimeTracker: false,
  },
];

export function buildCustomTrackerDashboardCards(): CustomTrackerDashboardCardViewModel[] {
  return [
    {
      key: "tracker_schema",
      title: "Tracker Schema",
      description: "Define the tracker name, domain, privacy, status, and schema version boundary.",
      statusLabel: "Schema contract only",
      emptyLabel: "No tracker schema has been created yet.",
      privacyLabel: "Schema visibility follows tracker privacy.",
      reviewLabel: "New tracker schemas require review before future persistence.",
      action: "create_tracker",
      actionLabel: "Create tracker",
      actionState: "disabled_boundary",
      runtimeDataReadEnabled: false,
      runtimeDataWriteEnabled: false,
      fakeRuntimeDataAllowed: false,
    },
    {
      key: "fields",
      title: "Fields",
      description: "Represent typed fields, required rules, options, units, privacy, and deprecation boundaries.",
      statusLabel: "Field contract only",
      emptyLabel: "No fields exist for this tracker yet.",
      privacyLabel: "Field-level privacy is preserved.",
      reviewLabel: "Field changes require validation and review before future persistence.",
      action: "add_field",
      actionLabel: "Add field",
      actionState: "disabled_boundary",
      runtimeDataReadEnabled: false,
      runtimeDataWriteEnabled: false,
      fakeRuntimeDataAllowed: false,
    },
    {
      key: "entries",
      title: "Entries",
      description: "Represent entry validation, values_json safety, duplicate checks, and evidence links.",
      statusLabel: "Entry logging boundary",
      emptyLabel: "No real entries are loaded in Phase 19M.",
      privacyLabel: "Entry visibility follows tracker and field privacy.",
      reviewLabel: "Entry writes require validation and review before future persistence.",
      action: "log_entry",
      actionLabel: "Log entry",
      actionState: "disabled_boundary",
      runtimeDataReadEnabled: false,
      runtimeDataWriteEnabled: false,
      fakeRuntimeDataAllowed: false,
    },
    {
      key: "dashboard_target",
      title: "Dashboard Target",
      description: "Represent Command and domain dashboard placement rules without creating dashboard cards.",
      statusLabel: "Placement boundary",
      emptyLabel: "No dashboard card is placed yet.",
      privacyLabel: "Sensitive trackers cannot leak onto broad dashboards.",
      reviewLabel: "Dashboard placement requires privacy review.",
      action: "place_card",
      actionLabel: "Place card",
      actionState: "disabled_boundary",
      runtimeDataReadEnabled: false,
      runtimeDataWriteEnabled: false,
      fakeRuntimeDataAllowed: false,
    },
    {
      key: "frequency",
      title: "Frequency",
      description: "Represent daily, weekly, monthly, custom, and on-demand semantics.",
      statusLabel: "Frequency semantics ready",
      emptyLabel: "No frequency rule is active yet.",
      privacyLabel: "Frequency metadata contains no private values.",
      reviewLabel: "Frequency changes require review before future persistence.",
      action: "create_tracker",
      actionLabel: "Set frequency",
      actionState: "disabled_boundary",
      runtimeDataReadEnabled: false,
      runtimeDataWriteEnabled: false,
      fakeRuntimeDataAllowed: false,
    },
    {
      key: "ai_mapping",
      title: "AI Mapping",
      description: "Represent Carnos proposals, source disclosure, freshness disclosure, and review-before-write.",
      statusLabel: "Review queue boundary",
      emptyLabel: "No AI mappings are active.",
      privacyLabel: "Carnos access follows per-tracker permissions.",
      reviewLabel: "AI mappings cannot write silently.",
      action: "map_ai_extraction",
      actionLabel: "Map AI extraction",
      actionState: "requires_review",
      runtimeDataReadEnabled: false,
      runtimeDataWriteEnabled: false,
      fakeRuntimeDataAllowed: false,
    },
  ];
}

export function resolveCustomTrackerDashboardStatus(
  input: BuildCustomTrackerDashboardViewModelInput = {},
): CustomTrackerDashboardViewModelStatus {
  if (input.status) return input.status;
  if (input.errorMessage) return "error";
  if (input.privacyRestricted === true) return "privacy_restricted";
  if (input.hasPendingReview === true) return "review_required";
  if (input.hasTrackers === true) return "ready";
  return "empty";
}

export function buildCustomTrackerDashboardStateMessage(
  status: CustomTrackerDashboardViewModelStatus,
  errorMessage: string | null = null,
): CustomTrackerDashboardStateMessage {
  if (status === "loading") {
    return {
      status,
      title: "Loading custom trackers",
      description: "The dashboard shell is ready while runtime tracker reads remain disabled in Phase 19M.",
    };
  }

  if (status === "error") {
    return {
      status,
      title: "Custom trackers could not be prepared",
      description: errorMessage ?? "The dashboard is showing a safe error state without reading runtime data.",
    };
  }

  if (status === "privacy_restricted") {
    return {
      status,
      title: "Privacy restricted",
      description: "This tracker cannot be shown until privacy and dashboard exposure checks pass.",
    };
  }

  if (status === "review_required") {
    return {
      status,
      title: "Review required",
      description: "A tracker, entry, dashboard placement, or AI mapping proposal needs user review before future persistence.",
    };
  }

  if (status === "ready") {
    return {
      status,
      title: "Custom tracker dashboard ready",
      description: "The UI shell is ready. Runtime persistence remains disabled until later approved repository work.",
    };
  }

  return {
    status: "empty",
    title: "No custom trackers yet",
    description: "Start from a reviewed template or create a schema. No fake tracker data is shown.",
  };
}

export function buildCustomTrackersDashboardViewModel(
  input: BuildCustomTrackerDashboardViewModelInput = {},
): CustomTrackerDashboardViewModel {
  const status = resolveCustomTrackerDashboardStatus(input);

  return {
    phase: "19M",
    route: "/custom-trackers",
    title: "Custom Trackers",
    subtitle: "Create safe personal trackers with typed fields, reviewed entries, privacy gates, and dashboard placement boundaries.",
    status,
    stateMessage: buildCustomTrackerDashboardStateMessage(status, input.errorMessage ?? null),
    cards: buildCustomTrackerDashboardCards(),
    templateSuggestions: [...CUSTOM_TRACKER_DASHBOARD_TEMPLATE_SUGGESTIONS],
    primaryActions: [...CUSTOM_TRACKER_DASHBOARD_PRIMARY_ACTIONS],
    boundaryDisclosures: {
      noHardcodedDemoData: true,
      noFakeTrackerEntries: true,
      noFakeDashboardCards: true,
      noFakeAiMappings: true,
      noRuntimeDatabaseReads: true,
      noRuntimeDatabaseWrites: true,
      noSilentAiWrites: true,
      noActionExecution: true,
      reviewBeforeWriteRequired: true,
    },
    loadingStateEnabled: true,
    emptyStateEnabled: true,
    errorStateEnabled: true,
    privacyRestrictedStateEnabled: true,
    reviewRequiredStateEnabled: true,
    dashboardViewModelEnabled: true,
    dashboardUiEnabled: true,
    runtimeDatabaseReadsEnabled: false,
    runtimeDatabaseWritesEnabled: false,
    schemaMigrationEnabled: false,
    modelCallsEnabled: false,
    networkCallsEnabled: false,
  };
}

export function summarizeCustomTrackerDashboardViewModelBoundary(): CustomTrackerDashboardViewModelSummary {
  return {
    phase: "19M",
    customTrackerRouteEnabled: true,
    dashboardViewModelEnabled: true,
    dashboardUiEnabled: true,
    emptyStateEnabled: true,
    templateSuggestionEmptyStateEnabled: true,
    loadingStateEnabled: true,
    errorStateEnabled: true,
    privacyRestrictedStateEnabled: true,
    reviewRequiredStateEnabled: true,
    trackerSchemaCardEnabled: true,
    fieldsCardEnabled: true,
    entriesCardEnabled: true,
    dashboardTargetCardEnabled: true,
    frequencyCardEnabled: true,
    aiMappingCardEnabled: true,
    primaryActionsRepresented: true,
    quickLogBoundaryRepresented: true,
    noHardcodedDemoData: true,
    noFakeTrackerEntries: true,
    noFakeDashboardCards: true,
    noFakeAiMappings: true,
    runtimeDatabaseReadsEnabled: false,
    runtimeDatabaseWritesEnabled: false,
    schemaMigrationEnabled: false,
    modelCallsEnabled: false,
    networkCallsEnabled: false,
    noSilentAiWrites: true,
  };
}
