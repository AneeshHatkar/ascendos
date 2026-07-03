import {
  CUSTOM_TRACKER_DOMAINS,
  CUSTOM_TRACKER_PRIVACY_LEVELS,
  type CustomTrackerDomain,
  type CustomTrackerPrivacyLevel,
} from "./core-tracker-domain-contracts";
import {
  CUSTOM_TRACKER_FIELD_KINDS,
  type CustomTrackerFieldOptionsJson,
} from "./field-type-registry";

export type CustomTrackerTemplateCategory =
  | "health_body"
  | "career_job_search"
  | "learning_research"
  | "life_admin"
  | "creativity_grimoire"
  | "finance"
  | "custom";

export type CustomTrackerFrequencyKind =
  | "daily"
  | "weekly"
  | "monthly"
  | "custom_interval"
  | "on_demand";

export type CustomTrackerMissedEntryPolicy =
  | "ignore"
  | "mark_missed"
  | "break_streak"
  | "carry_forward";

export type CustomTrackerReadinessStatus =
  | "ready"
  | "needs_setup"
  | "privacy_review_required"
  | "analytics_not_ready"
  | "dashboard_not_ready";

export type CustomTrackerTemplateField = {
  stableKey: string;
  displayName: string;
  fieldKind: typeof CUSTOM_TRACKER_FIELD_KINDS[number];
  required: boolean;
  orderIndex: number;
  privacyLevel: CustomTrackerPrivacyLevel;
  optionsJson?: CustomTrackerFieldOptionsJson;
};

export type CustomTrackerTemplate = {
  templateKey: string;
  displayName: string;
  description: string;
  category: CustomTrackerTemplateCategory;
  domain: CustomTrackerDomain;
  defaultPrivacyLevel: CustomTrackerPrivacyLevel;
  defaultFrequency: CustomTrackerFrequencyKind;
  defaultTargetCountPerPeriod: number;
  defaultStreakEnabled: boolean;
  defaultMissedEntryPolicy: CustomTrackerMissedEntryPolicy;
  supportsRepeatLastEntry: boolean;
  suggestedDashboardTargets: ReadonlyArray<string>;
  fields: ReadonlyArray<CustomTrackerTemplateField>;
};

export type CustomTrackerFrequencyRule = {
  frequencyKind: CustomTrackerFrequencyKind;
  targetCountPerPeriod: number;
  customIntervalDays: number | null;
  streakEnabled: boolean;
  missedEntryPolicy: CustomTrackerMissedEntryPolicy;
};

export type CustomTrackerVisibilityPreference = {
  favorite: boolean;
  pinned: boolean;
  repeatLastEntryEnabled: boolean;
};

export type CustomTrackerTemplateCreationContract = {
  templateKey: string;
  stableTrackerKey: string;
  displayName: string;
  domain: CustomTrackerDomain;
  privacyLevel: CustomTrackerPrivacyLevel;
  frequencyRule: CustomTrackerFrequencyRule;
  visibilityPreference: CustomTrackerVisibilityPreference;
  fieldCount: number;
  requiresReviewBeforeWrite: boolean;
};

export type CustomTrackerSetupCompletenessInput = {
  hasName: boolean;
  hasDescription: boolean;
  hasAtLeastOneField: boolean;
  hasRequiredFieldValidation: boolean;
  hasFrequencyRule: boolean;
  hasPrivacyLevel: boolean;
  hasDashboardTarget: boolean;
  hasAnalyticsCompatibleField: boolean;
};

export type CustomTrackerReadinessScore = {
  score: number;
  status: CustomTrackerReadinessStatus;
  analyticsReady: boolean;
  privacyReady: boolean;
  dashboardPlacementReady: boolean;
  missingSetupItems: ReadonlyArray<string>;
};

export type CustomTrackerTemplateLibrarySummary = {
  templateCount: number;
  categoryCount: number;
  domainCount: number;
  templatesWithStreaks: number;
  templatesWithRepeatLastEntry: number;
};

export const PHASE_19F_TEMPLATE_FREQUENCY_BOUNDARY = {
  phase: "19F",
  templateLibraryEnabled: true,
  frequencyRulesEnabled: true,
  streakSemanticsEnabled: true,
  trackerQualityScoreEnabled: true,
  runtimeWritesEnabled: false,
  schemaMigrationEnabled: false,
  carnosRuntimeEnabled: false,
  fakeTemplateEntriesAllowed: false,
} as const;

export const CUSTOM_TRACKER_TEMPLATE_CATEGORIES: ReadonlyArray<CustomTrackerTemplateCategory> = [
  "health_body",
  "career_job_search",
  "learning_research",
  "life_admin",
  "creativity_grimoire",
  "finance",
  "custom",
];

export const CUSTOM_TRACKER_FREQUENCY_KINDS: ReadonlyArray<CustomTrackerFrequencyKind> = [
  "daily",
  "weekly",
  "monthly",
  "custom_interval",
  "on_demand",
];

export const CUSTOM_TRACKER_MISSED_ENTRY_POLICIES: ReadonlyArray<CustomTrackerMissedEntryPolicy> = [
  "ignore",
  "mark_missed",
  "break_streak",
  "carry_forward",
];

export const CUSTOM_TRACKER_TEMPLATE_LIBRARY: ReadonlyArray<CustomTrackerTemplate> = [
  {
    templateKey: "daily_gym_training",
    displayName: "Daily Gym Training",
    description: "Track workout completion, focus, duration, and notes.",
    category: "health_body",
    domain: "body",
    defaultPrivacyLevel: "sensitive",
    defaultFrequency: "daily",
    defaultTargetCountPerPeriod: 1,
    defaultStreakEnabled: true,
    defaultMissedEntryPolicy: "break_streak",
    supportsRepeatLastEntry: true,
    suggestedDashboardTargets: ["command", "body", "timeline"],
    fields: [
      { stableKey: "completed", displayName: "Completed", fieldKind: "boolean", required: true, orderIndex: 0, privacyLevel: "sensitive" },
      { stableKey: "duration_minutes", displayName: "Duration Minutes", fieldKind: "duration", required: false, orderIndex: 1, privacyLevel: "sensitive" },
      { stableKey: "focus", displayName: "Focus", fieldKind: "rating", required: false, orderIndex: 2, privacyLevel: "sensitive" },
    ],
  },
  {
    templateKey: "job_application_pipeline",
    displayName: "Job Application Pipeline",
    description: "Track applications, referrals, interview stages, and follow-ups.",
    category: "career_job_search",
    domain: "career",
    defaultPrivacyLevel: "private",
    defaultFrequency: "daily",
    defaultTargetCountPerPeriod: 3,
    defaultStreakEnabled: true,
    defaultMissedEntryPolicy: "mark_missed",
    supportsRepeatLastEntry: false,
    suggestedDashboardTargets: ["command", "career", "timeline"],
    fields: [
      { stableKey: "company", displayName: "Company", fieldKind: "text", required: true, orderIndex: 0, privacyLevel: "private" },
      { stableKey: "role", displayName: "Role", fieldKind: "text", required: true, orderIndex: 1, privacyLevel: "private" },
      { stableKey: "stage", displayName: "Stage", fieldKind: "select", required: true, orderIndex: 2, privacyLevel: "private", optionsJson: { allowCustomOption: false, options: [
        { key: "applied", label: "Applied", archived: false },
        { key: "referral", label: "Referral", archived: false },
        { key: "interview", label: "Interview", archived: false },
        { key: "offer", label: "Offer", archived: false },
        { key: "rejected", label: "Rejected", archived: false },
      ] } },
    ],
  },
  {
    templateKey: "research_reading_log",
    displayName: "Research Reading Log",
    description: "Track papers, notes, insights, and follow-up actions.",
    category: "learning_research",
    domain: "research",
    defaultPrivacyLevel: "standard",
    defaultFrequency: "weekly",
    defaultTargetCountPerPeriod: 5,
    defaultStreakEnabled: false,
    defaultMissedEntryPolicy: "carry_forward",
    supportsRepeatLastEntry: false,
    suggestedDashboardTargets: ["research", "learning", "timeline"],
    fields: [
      { stableKey: "title", displayName: "Title", fieldKind: "text", required: true, orderIndex: 0, privacyLevel: "standard" },
      { stableKey: "insight", displayName: "Insight", fieldKind: "text", required: false, orderIndex: 1, privacyLevel: "standard" },
      { stableKey: "follow_up", displayName: "Follow Up", fieldKind: "boolean", required: false, orderIndex: 2, privacyLevel: "standard" },
    ],
  },
  {
    templateKey: "life_admin_renewal_tracker",
    displayName: "Life Admin Renewal Tracker",
    description: "Track renewals, deadlines, reminders, and completion.",
    category: "life_admin",
    domain: "life_admin",
    defaultPrivacyLevel: "private",
    defaultFrequency: "on_demand",
    defaultTargetCountPerPeriod: 1,
    defaultStreakEnabled: false,
    defaultMissedEntryPolicy: "ignore",
    supportsRepeatLastEntry: false,
    suggestedDashboardTargets: ["command", "timeline"],
    fields: [
      { stableKey: "item", displayName: "Item", fieldKind: "text", required: true, orderIndex: 0, privacyLevel: "private" },
      { stableKey: "due_date", displayName: "Due Date", fieldKind: "date", required: true, orderIndex: 1, privacyLevel: "private" },
      { stableKey: "completed", displayName: "Completed", fieldKind: "boolean", required: false, orderIndex: 2, privacyLevel: "private" },
    ],
  },
];

export function isKnownCustomTrackerTemplateKey(templateKey: string): boolean {
  return CUSTOM_TRACKER_TEMPLATE_LIBRARY.some((template) => template.templateKey === templateKey);
}

export function getCustomTrackerTemplate(templateKey: string): CustomTrackerTemplate | null {
  return CUSTOM_TRACKER_TEMPLATE_LIBRARY.find((template) => template.templateKey === templateKey) ?? null;
}

export function validateCustomTrackerFrequencyRule(rule: CustomTrackerFrequencyRule): ReadonlyArray<string> {
  const errors: string[] = [];

  if (!CUSTOM_TRACKER_FREQUENCY_KINDS.includes(rule.frequencyKind)) errors.push("frequency kind is not allowed");
  if (!CUSTOM_TRACKER_MISSED_ENTRY_POLICIES.includes(rule.missedEntryPolicy)) errors.push("missed-entry policy is not allowed");
  if (rule.targetCountPerPeriod < 0) errors.push("target count per period cannot be negative");
  if (!Number.isInteger(rule.targetCountPerPeriod)) errors.push("target count per period must be an integer");

  if (rule.frequencyKind === "on_demand" && rule.streakEnabled) {
    errors.push("on-demand trackers cannot enable streaks");
  }

  if (rule.frequencyKind === "custom_interval") {
    if (rule.customIntervalDays === null) errors.push("custom interval days is required for custom interval frequency");
    if (rule.customIntervalDays !== null && (!Number.isInteger(rule.customIntervalDays) || rule.customIntervalDays < 1)) {
      errors.push("custom interval days must be a positive integer");
    }
  }

  if (rule.frequencyKind !== "custom_interval" && rule.customIntervalDays !== null) {
    errors.push("custom interval days can only be set for custom interval frequency");
  }

  return errors;
}

export function buildCustomTrackerFrequencyRuleFromTemplate(template: CustomTrackerTemplate): CustomTrackerFrequencyRule {
  return {
    frequencyKind: template.defaultFrequency,
    targetCountPerPeriod: template.defaultTargetCountPerPeriod,
    customIntervalDays: null,
    streakEnabled: template.defaultStreakEnabled,
    missedEntryPolicy: template.defaultMissedEntryPolicy,
  };
}

export function buildCustomTrackerFromTemplateContract(input: {
  templateKey: string;
  stableTrackerKey: string;
  displayName?: string;
  privacyLevel?: CustomTrackerPrivacyLevel;
  favorite?: boolean;
  pinned?: boolean;
  repeatLastEntryEnabled?: boolean;
}): CustomTrackerTemplateCreationContract | null {
  const template = getCustomTrackerTemplate(input.templateKey);
  if (template === null) return null;

  return {
    templateKey: template.templateKey,
    stableTrackerKey: input.stableTrackerKey,
    displayName: input.displayName ?? template.displayName,
    domain: template.domain,
    privacyLevel: input.privacyLevel ?? template.defaultPrivacyLevel,
    frequencyRule: buildCustomTrackerFrequencyRuleFromTemplate(template),
    visibilityPreference: {
      favorite: input.favorite ?? false,
      pinned: input.pinned ?? false,
      repeatLastEntryEnabled: input.repeatLastEntryEnabled ?? template.supportsRepeatLastEntry,
    },
    fieldCount: template.fields.length,
    requiresReviewBeforeWrite: true,
  };
}

export function validateCustomTrackerTemplate(template: CustomTrackerTemplate): ReadonlyArray<string> {
  const errors: string[] = [];

  if (template.templateKey.trim().length === 0) errors.push("template key is required");
  if (template.displayName.trim().length === 0) errors.push("template display name is required");
  if (!CUSTOM_TRACKER_TEMPLATE_CATEGORIES.includes(template.category)) errors.push("template category is not allowed");
  if (!CUSTOM_TRACKER_DOMAINS.includes(template.domain)) errors.push("template domain is not allowed");
  if (!CUSTOM_TRACKER_PRIVACY_LEVELS.includes(template.defaultPrivacyLevel)) errors.push("template privacy level is not allowed");
  errors.push(...validateCustomTrackerFrequencyRule(buildCustomTrackerFrequencyRuleFromTemplate(template)));

  if (template.fields.length === 0) errors.push("template must include at least one field");

  const stableKeys = new Set<string>();
  for (const field of template.fields) {
    if (field.stableKey.trim().length === 0) errors.push("template field stable key is required");
    if (stableKeys.has(field.stableKey)) errors.push("template field stable keys must be unique");
    if (!CUSTOM_TRACKER_FIELD_KINDS.includes(field.fieldKind)) errors.push("template field kind is not allowed");
    stableKeys.add(field.stableKey);
  }

  return errors;
}

export function scoreCustomTrackerSetupCompleteness(input: CustomTrackerSetupCompletenessInput): CustomTrackerReadinessScore {
  const missingSetupItems: string[] = [];
  let score = 0;

  if (input.hasName) score += 15; else missingSetupItems.push("name");
  if (input.hasDescription) score += 10; else missingSetupItems.push("description");
  if (input.hasAtLeastOneField) score += 20; else missingSetupItems.push("fields");
  if (input.hasRequiredFieldValidation) score += 15; else missingSetupItems.push("required field validation");
  if (input.hasFrequencyRule) score += 10; else missingSetupItems.push("frequency rule");
  if (input.hasPrivacyLevel) score += 10; else missingSetupItems.push("privacy level");
  if (input.hasDashboardTarget) score += 10; else missingSetupItems.push("dashboard target");
  if (input.hasAnalyticsCompatibleField) score += 10; else missingSetupItems.push("analytics-compatible field");

  const analyticsReady = input.hasAnalyticsCompatibleField && input.hasAtLeastOneField;
  const privacyReady = input.hasPrivacyLevel;
  const dashboardPlacementReady = input.hasDashboardTarget && privacyReady;

  let status: CustomTrackerReadinessStatus = "ready";
  if (!privacyReady) status = "privacy_review_required";
  else if (!analyticsReady) status = "analytics_not_ready";
  else if (!dashboardPlacementReady) status = "dashboard_not_ready";
  else if (score < 80) status = "needs_setup";

  return {
    score,
    status,
    analyticsReady,
    privacyReady,
    dashboardPlacementReady,
    missingSetupItems,
  };
}

export function summarizeCustomTrackerTemplateLibrary(): CustomTrackerTemplateLibrarySummary {
  return {
    templateCount: CUSTOM_TRACKER_TEMPLATE_LIBRARY.length,
    categoryCount: new Set(CUSTOM_TRACKER_TEMPLATE_LIBRARY.map((template) => template.category)).size,
    domainCount: new Set(CUSTOM_TRACKER_TEMPLATE_LIBRARY.map((template) => template.domain)).size,
    templatesWithStreaks: CUSTOM_TRACKER_TEMPLATE_LIBRARY.filter((template) => template.defaultStreakEnabled).length,
    templatesWithRepeatLastEntry: CUSTOM_TRACKER_TEMPLATE_LIBRARY.filter((template) => template.supportsRepeatLastEntry).length,
  };
}
