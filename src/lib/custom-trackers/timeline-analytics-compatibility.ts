import type {
  CustomTrackerDomain,
  CustomTrackerPrivacyLevel,
} from "./core-tracker-domain-contracts";
import type {
  CustomTrackerFieldDefinitionInput,
} from "./field-type-registry";
import type {
  CustomTrackerFrequencyKind,
} from "./template-frequency-semantics";

export type CustomTrackerFieldKind =
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "rating"
  | "select"
  | "multi_select"
  | "duration"
  | "json";

export type CustomTrackerTimelineVisibility =
  | "hidden"
  | "private"
  | "domain_only"
  | "command_allowed"
  | "review_required";

export type CustomTrackerTimelineEventDensity =
  | "none"
  | "low"
  | "normal"
  | "high_risk";

export type CustomTrackerTimelineSpamDecisionStatus =
  | "allowed"
  | "review_required"
  | "blocked";

export type CustomTrackerTimelineLabelToken =
  | "tracker_name"
  | "domain"
  | "entry_date"
  | "primary_value"
  | "status";

export type CustomTrackerAnalyticsAggregationType =
  | "none"
  | "count"
  | "sum"
  | "average"
  | "minimum"
  | "maximum"
  | "latest"
  | "completion_rate";

export type CustomTrackerAnalyticsPreviewStatus =
  | "ready"
  | "insufficient_data"
  | "not_chartable"
  | "privacy_restricted"
  | "disabled";

export type CustomTrackerAnalyticsTrendDirection =
  | "not_available"
  | "up"
  | "down"
  | "flat"
  | "mixed";

export type CustomTrackerTimelineMetadata = {
  trackerId: string;
  stableTrackerKey: string;
  displayName: string;
  domain: CustomTrackerDomain;
  visibility: CustomTrackerTimelineVisibility;
  labelTemplate: string;
  allowedLabelTokens: ReadonlyArray<CustomTrackerTimelineLabelToken>;
  eventDensity: CustomTrackerTimelineEventDensity;
  timelineWritesEnabled: false;
};

export type CustomTrackerTimelineSpamPolicyInput = {
  trackerId: string;
  frequencyKind: CustomTrackerFrequencyKind;
  entriesPerDayEstimate: number;
  timelineVisibility: CustomTrackerTimelineVisibility;
  privacyLevel: CustomTrackerPrivacyLevel;
  userApprovedTimelineExposure: boolean;
};

export type CustomTrackerTimelineSpamDecision = {
  status: CustomTrackerTimelineSpamDecisionStatus;
  eventDensity: CustomTrackerTimelineEventDensity;
  timelineAllowed: boolean;
  reason: string;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerAnalyticsFieldMetadata = {
  fieldKey: string;
  fieldKind: CustomTrackerFieldKind;
  aggregationType: CustomTrackerAnalyticsAggregationType;
  trendable: boolean;
  chartable: boolean;
  unit?: string;
  requiresMinimumEntries: number;
};

export type CustomTrackerAnalyticsCompatibilityInput = {
  trackerId: string;
  stableTrackerKey: string;
  privacyLevel: CustomTrackerPrivacyLevel;
  frequencyKind: CustomTrackerFrequencyKind;
  fields: ReadonlyArray<CustomTrackerFieldDefinitionInput>;
  existingEntryCount: number;
  userApprovedAnalyticsExposure: boolean;
};

export type CustomTrackerAnalyticsPreviewBoundary = {
  status: CustomTrackerAnalyticsPreviewStatus;
  trendDirection: CustomTrackerAnalyticsTrendDirection;
  chartableFieldCount: number;
  trendableFieldCount: number;
  minimumRequiredEntries: number;
  existingEntryCount: number;
  fakeAnalyticsAllowed: false;
  fakeStreaksAllowed: false;
  runtimeAnalyticsReadsEnabled: false;
  reason: string;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerTimelineReadinessResult = {
  timelineReady: boolean;
  visibility: CustomTrackerTimelineVisibility;
  labelTemplateReady: boolean;
  spamPreventionReady: boolean;
  requiredReviews: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerAnalyticsReadinessResult = {
  analyticsReady: boolean;
  previewStatus: CustomTrackerAnalyticsPreviewStatus;
  aggregationTypes: ReadonlyArray<CustomTrackerAnalyticsAggregationType>;
  chartableFields: ReadonlyArray<string>;
  trendableFields: ReadonlyArray<string>;
  insufficientData: boolean;
  requiredReviews: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerTimelineAnalyticsSummary = {
  timelineCompatibilityEnabled: boolean;
  timelineVisibilityEnabled: boolean;
  timelineLabelTemplateBoundaryEnabled: boolean;
  timelineSpamPreventionEnabled: boolean;
  analyticsCompatibilityEnabled: boolean;
  aggregationMetadataEnabled: boolean;
  trendableChartableFieldMetadataEnabled: boolean;
  analyticsPreviewBoundaryEnabled: boolean;
  insufficientDataStateEnabled: boolean;
  fakeAnalyticsAllowed: boolean;
  fakeStreaksAllowed: boolean;
  timelineWritesEnabled: boolean;
  runtimeAnalyticsReadsEnabled: boolean;
};

export const PHASE_19J_TIMELINE_ANALYTICS_BOUNDARY = {
  phase: "19J",
  timelineCompatibilityEnabled: true,
  timelineVisibilityEnabled: true,
  timelineLabelTemplateBoundaryEnabled: true,
  timelineSpamPreventionEnabled: true,
  analyticsCompatibilityEnabled: true,
  aggregationMetadataEnabled: true,
  trendableChartableFieldMetadataEnabled: true,
  analyticsPreviewBoundaryEnabled: true,
  insufficientDataStateEnabled: true,
  fakeAnalyticsAllowed: false,
  fakeStreaksAllowed: false,
  timelineWritesEnabled: false,
  runtimeAnalyticsReadsEnabled: false,
  runtimeWritesEnabled: false,
  schemaMigrationEnabled: false,
  uiRouteChanged: false,
} as const;

export const CUSTOM_TRACKER_TIMELINE_VISIBILITIES: ReadonlyArray<CustomTrackerTimelineVisibility> = [
  "hidden",
  "private",
  "domain_only",
  "command_allowed",
  "review_required",
];

export const CUSTOM_TRACKER_TIMELINE_LABEL_TOKENS: ReadonlyArray<CustomTrackerTimelineLabelToken> = [
  "tracker_name",
  "domain",
  "entry_date",
  "primary_value",
  "status",
];

export const CUSTOM_TRACKER_ANALYTICS_AGGREGATION_TYPES: ReadonlyArray<CustomTrackerAnalyticsAggregationType> = [
  "none",
  "count",
  "sum",
  "average",
  "minimum",
  "maximum",
  "latest",
  "completion_rate",
];

export const CUSTOM_TRACKER_ANALYTICS_MINIMUM_ENTRIES = 3;

export function normalizeCustomTrackerTimelineLabelTemplate(template: string): string {
  const trimmed = template.trim();
  if (trimmed.length === 0) return "{tracker_name} entry";
  if (trimmed.length > 120) return trimmed.slice(0, 120);
  return trimmed;
}

export function extractCustomTrackerTimelineLabelTokens(template: string): ReadonlyArray<CustomTrackerTimelineLabelToken> {
  const tokens: CustomTrackerTimelineLabelToken[] = [];
  for (const token of CUSTOM_TRACKER_TIMELINE_LABEL_TOKENS) {
    if (template.includes("{" + token + "}")) tokens.push(token);
  }
  return tokens;
}

export function validateCustomTrackerTimelineLabelTemplate(template: string): {
  valid: boolean;
  normalizedTemplate: string;
  tokens: ReadonlyArray<CustomTrackerTimelineLabelToken>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const normalizedTemplate = normalizeCustomTrackerTimelineLabelTemplate(template);
  const tokens = extractCustomTrackerTimelineLabelTokens(normalizedTemplate);

  if (tokens.length === 0) {
    warnings.push("timeline label template has no supported tokens");
  }

  if (normalizedTemplate.includes("{") && normalizedTemplate.includes("}") && tokens.length === 0) {
    errors.push("timeline label template contains unsupported token syntax");
  }

  return {
    valid: errors.length === 0,
    normalizedTemplate,
    tokens,
    warnings,
    errors,
  };
}

export function buildCustomTrackerTimelineMetadata(input: {
  trackerId: string;
  stableTrackerKey: string;
  displayName: string;
  domain: CustomTrackerDomain;
  privacyLevel: CustomTrackerPrivacyLevel;
  requestedVisibility: CustomTrackerTimelineVisibility;
  labelTemplate: string;
  frequencyKind: CustomTrackerFrequencyKind;
}): CustomTrackerTimelineMetadata {
  const label = validateCustomTrackerTimelineLabelTemplate(input.labelTemplate);
  const visibility = resolveCustomTrackerTimelineVisibility(input.requestedVisibility, input.privacyLevel);
  const eventDensity = estimateCustomTrackerTimelineEventDensity(input.frequencyKind, visibility);

  return {
    trackerId: input.trackerId,
    stableTrackerKey: input.stableTrackerKey,
    displayName: input.displayName,
    domain: input.domain,
    visibility,
    labelTemplate: label.normalizedTemplate,
    allowedLabelTokens: label.tokens,
    eventDensity,
    timelineWritesEnabled: false,
  };
}

export function resolveCustomTrackerTimelineVisibility(
  requestedVisibility: CustomTrackerTimelineVisibility,
  privacyLevel: CustomTrackerPrivacyLevel,
): CustomTrackerTimelineVisibility {
  if (requestedVisibility === "hidden") return "hidden";
  if (privacyLevel === "restricted") return "hidden";
  if (privacyLevel === "private") return requestedVisibility === "command_allowed" ? "review_required" : "private";
  if (privacyLevel === "sensitive" && requestedVisibility === "command_allowed") return "review_required";
  return requestedVisibility;
}

export function estimateCustomTrackerTimelineEventDensity(
  frequencyKind: CustomTrackerFrequencyKind,
  visibility: CustomTrackerTimelineVisibility,
): CustomTrackerTimelineEventDensity {
  if (visibility === "hidden") return "none";
  if (frequencyKind === "on_demand") return "low";
  if (frequencyKind === "daily") return "normal";
  if (frequencyKind === "custom_interval") return "normal";
  return "low";
}

export function evaluateCustomTrackerTimelineSpamPolicy(
  input: CustomTrackerTimelineSpamPolicyInput,
): CustomTrackerTimelineSpamDecision {
  const warnings: string[] = [];
  const errors: string[] = [];
  const density = estimateCustomTrackerTimelineEventDensity(input.frequencyKind, input.timelineVisibility);

  if (input.timelineVisibility === "hidden") {
    return {
      status: "blocked",
      eventDensity: "none",
      timelineAllowed: false,
      reason: "timeline visibility is hidden",
      warnings,
      errors,
    };
  }

  if (input.entriesPerDayEstimate > 12) {
    errors.push("timeline spam prevention blocked high-volume tracker");
  }

  if (input.entriesPerDayEstimate > 4) {
    warnings.push("timeline spam prevention recommends summary-only timeline placement");
  }

  if (input.privacyLevel !== "standard" && input.timelineVisibility === "command_allowed" && !input.userApprovedTimelineExposure) {
    warnings.push("timeline visibility requires review for non-standard tracker");
  }

  const status: CustomTrackerTimelineSpamDecisionStatus =
    errors.length > 0 ? "blocked" :
    warnings.some((warning) => warning.includes("requires review")) ? "review_required" :
    "allowed";

  return {
    status,
    eventDensity: input.entriesPerDayEstimate > 4 ? "high_risk" : density,
    timelineAllowed: status === "allowed",
    reason: status === "allowed" ? "timeline placement passes spam and privacy boundary" : "timeline placement requires review or is blocked",
    warnings,
    errors,
  };
}

export function getDefaultCustomTrackerAggregationType(
  fieldKind: CustomTrackerFieldKind,
): CustomTrackerAnalyticsAggregationType {
  if (fieldKind === "number" || fieldKind === "rating" || fieldKind === "duration") return "average";
  if (fieldKind === "boolean") return "completion_rate";
  if (fieldKind === "date") return "latest";
  if (fieldKind === "select" || fieldKind === "multi_select") return "count";
  return "none";
}

function getCustomTrackerAnalyticsFieldKind(field: CustomTrackerFieldDefinitionInput): CustomTrackerFieldKind {
  const fieldRecord = field as CustomTrackerFieldDefinitionInput & {
    kind?: CustomTrackerFieldKind;
    fieldKind?: CustomTrackerFieldKind;
  };

  return fieldRecord.kind ?? fieldRecord.fieldKind ?? "text";
}

function getCustomTrackerAnalyticsFieldUnit(field: CustomTrackerFieldDefinitionInput): string | undefined {
  const fieldRecord = field as CustomTrackerFieldDefinitionInput & {
    unit?: string;
    unitKind?: string;
  };

  if (typeof fieldRecord.unit === "string" && fieldRecord.unit.trim().length > 0) return fieldRecord.unit;
  if (typeof fieldRecord.unitKind === "string" && fieldRecord.unitKind.trim().length > 0) return fieldRecord.unitKind;
  return undefined;
}

export function buildCustomTrackerAnalyticsFieldMetadata(
  field: CustomTrackerFieldDefinitionInput,
): CustomTrackerAnalyticsFieldMetadata {
  const fieldKind = getCustomTrackerAnalyticsFieldKind(field);
  const aggregationType = getDefaultCustomTrackerAggregationType(fieldKind);
  const trendable = fieldKind === "number" || fieldKind === "rating" || fieldKind === "duration" || fieldKind === "boolean";
  const chartable = trendable || fieldKind === "select" || fieldKind === "multi_select" || fieldKind === "date";

  return {
    fieldKey: field.stableKey,
    fieldKind,
    aggregationType,
    trendable,
    chartable,
    unit: getCustomTrackerAnalyticsFieldUnit(field),
    requiresMinimumEntries: CUSTOM_TRACKER_ANALYTICS_MINIMUM_ENTRIES,
  };
}

export function evaluateCustomTrackerAnalyticsCompatibility(
  input: CustomTrackerAnalyticsCompatibilityInput,
): CustomTrackerAnalyticsReadinessResult {
  const requiredReviews: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];
  const metadata = input.fields.map((field) => buildCustomTrackerAnalyticsFieldMetadata(field));
  const chartableFields = metadata.filter((field) => field.chartable).map((field) => field.fieldKey);
  const trendableFields = metadata.filter((field) => field.trendable).map((field) => field.fieldKey);
  const aggregationTypes = [...new Set(metadata.map((field) => field.aggregationType))];

  if (input.privacyLevel === "restricted") {
    errors.push("restricted tracker analytics preview is blocked");
  }

  if (input.privacyLevel !== "standard" && !input.userApprovedAnalyticsExposure) {
    requiredReviews.push("analytics exposure review required for non-standard tracker");
  }

  if (chartableFields.length === 0) {
    warnings.push("tracker has no chartable fields");
  }

  const insufficientData = input.existingEntryCount < CUSTOM_TRACKER_ANALYTICS_MINIMUM_ENTRIES;
  if (insufficientData) {
    warnings.push("insufficient data for analytics preview");
  }

  return {
    analyticsReady: errors.length === 0 && requiredReviews.length === 0 && !insufficientData && chartableFields.length > 0,
    previewStatus: getCustomTrackerAnalyticsPreviewStatus({
      privacyLevel: input.privacyLevel,
      userApprovedAnalyticsExposure: input.userApprovedAnalyticsExposure,
      existingEntryCount: input.existingEntryCount,
      chartableFieldCount: chartableFields.length,
    }),
    aggregationTypes,
    chartableFields,
    trendableFields,
    insufficientData,
    requiredReviews,
    warnings,
    errors,
  };
}

export function getCustomTrackerAnalyticsPreviewStatus(input: {
  privacyLevel: CustomTrackerPrivacyLevel;
  userApprovedAnalyticsExposure: boolean;
  existingEntryCount: number;
  chartableFieldCount: number;
}): CustomTrackerAnalyticsPreviewStatus {
  if (input.privacyLevel === "restricted") return "privacy_restricted";
  if (input.privacyLevel !== "standard" && !input.userApprovedAnalyticsExposure) return "privacy_restricted";
  if (input.chartableFieldCount === 0) return "not_chartable";
  if (input.existingEntryCount < CUSTOM_TRACKER_ANALYTICS_MINIMUM_ENTRIES) return "insufficient_data";
  return "ready";
}

export function buildCustomTrackerAnalyticsPreviewBoundary(
  input: CustomTrackerAnalyticsCompatibilityInput,
): CustomTrackerAnalyticsPreviewBoundary {
  const readiness = evaluateCustomTrackerAnalyticsCompatibility(input);

  return {
    status: readiness.previewStatus,
    trendDirection: "not_available",
    chartableFieldCount: readiness.chartableFields.length,
    trendableFieldCount: readiness.trendableFields.length,
    minimumRequiredEntries: CUSTOM_TRACKER_ANALYTICS_MINIMUM_ENTRIES,
    existingEntryCount: input.existingEntryCount,
    fakeAnalyticsAllowed: false,
    fakeStreaksAllowed: false,
    runtimeAnalyticsReadsEnabled: false,
    reason: readiness.previewStatus === "ready"
      ? "analytics preview metadata is ready without calculating fake values"
      : "analytics preview is blocked, restricted, or waiting for sufficient data",
    warnings: readiness.warnings,
    errors: readiness.errors,
  };
}

export function validateCustomTrackerTimelineReadiness(input: {
  metadata: CustomTrackerTimelineMetadata;
  spamDecision: CustomTrackerTimelineSpamDecision;
  labelTemplateValid: boolean;
}): CustomTrackerTimelineReadinessResult {
  const requiredReviews: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  if (input.metadata.visibility === "review_required") {
    requiredReviews.push("timeline visibility review required");
  }

  if (!input.labelTemplateValid) {
    errors.push("timeline label template is invalid");
  }

  if (input.spamDecision.status === "review_required") {
    requiredReviews.push("timeline spam prevention review required");
  }

  if (input.spamDecision.status === "blocked") {
    errors.push("timeline spam prevention blocked placement");
  }

  for (const warning of input.spamDecision.warnings) warnings.push(warning);
  for (const error of input.spamDecision.errors) errors.push(error);

  return {
    timelineReady: errors.length === 0 && requiredReviews.length === 0 && input.metadata.visibility !== "hidden",
    visibility: input.metadata.visibility,
    labelTemplateReady: input.labelTemplateValid,
    spamPreventionReady: input.spamDecision.status === "allowed",
    requiredReviews,
    warnings,
    errors,
  };
}

export function summarizeCustomTrackerTimelineAnalyticsBoundary(): CustomTrackerTimelineAnalyticsSummary {
  return {
    timelineCompatibilityEnabled: true,
    timelineVisibilityEnabled: true,
    timelineLabelTemplateBoundaryEnabled: true,
    timelineSpamPreventionEnabled: true,
    analyticsCompatibilityEnabled: true,
    aggregationMetadataEnabled: true,
    trendableChartableFieldMetadataEnabled: true,
    analyticsPreviewBoundaryEnabled: true,
    insufficientDataStateEnabled: true,
    fakeAnalyticsAllowed: false,
    fakeStreaksAllowed: false,
    timelineWritesEnabled: false,
    runtimeAnalyticsReadsEnabled: false,
  };
}
