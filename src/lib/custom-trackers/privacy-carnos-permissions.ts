import {
  CUSTOM_TRACKER_PRIVACY_LEVELS,
  type CustomTrackerPrivacyLevel,
} from "./core-tracker-domain-contracts";

export type CustomTrackerPrivacyExposureSurface =
  | "command_dashboard"
  | "domain_dashboard"
  | "timeline"
  | "analytics"
  | "carnos_context"
  | "memory_candidate"
  | "private_panel";

export type CustomTrackerPrivacyDecisionStatus =
  | "allowed"
  | "review_required"
  | "blocked";

export type CustomTrackerPrivacyRestrictedState =
  | "visible"
  | "redacted"
  | "hidden"
  | "review_required";

export type CustomTrackerCarnosPermissionKind =
  | "read"
  | "summary"
  | "suggestion"
  | "memory_candidate"
  | "analytics";

export type CustomTrackerPrivacyPolicyInput = {
  trackerId: string;
  stableTrackerKey: string;
  displayName: string;
  privacyLevel: CustomTrackerPrivacyLevel;
  exposureSurface: CustomTrackerPrivacyExposureSurface;
  userApprovedExposure: boolean;
};

export type CustomTrackerFieldPrivacyPolicyInput = {
  fieldStableKey: string;
  displayName: string;
  privacyLevel: CustomTrackerPrivacyLevel;
  required: boolean;
};

export type CustomTrackerDashboardExposureDecision = {
  status: CustomTrackerPrivacyDecisionStatus;
  restrictedState: CustomTrackerPrivacyRestrictedState;
  exposureSurface: CustomTrackerPrivacyExposureSurface;
  allowed: boolean;
  reason: string;
  redacted: boolean;
};

export type CustomTrackerCarnosPermissionSet = {
  read: boolean;
  summary: boolean;
  suggestion: boolean;
  memoryCandidate: boolean;
  analytics: boolean;
};

export type CustomTrackerCarnosPermissionInput = {
  trackerPrivacyLevel: CustomTrackerPrivacyLevel;
  fieldPrivacyLevels: ReadonlyArray<CustomTrackerPrivacyLevel>;
  permissionKind: CustomTrackerCarnosPermissionKind;
  userApproved: boolean;
  reviewRequiredForSensitive: boolean;
};

export type CustomTrackerCarnosPermissionDecision = {
  permissionKind: CustomTrackerCarnosPermissionKind;
  status: CustomTrackerPrivacyDecisionStatus;
  allowed: boolean;
  reviewRequired: boolean;
  reason: string;
  memoryWriteAllowed: boolean;
  silentReadAllowed: boolean;
  silentWriteAllowed: boolean;
};

export type CustomTrackerPrivacyReadinessInput = {
  trackerPrivacyLevel: CustomTrackerPrivacyLevel;
  fieldPrivacyLevels: ReadonlyArray<CustomTrackerPrivacyLevel>;
  dashboardTargets: ReadonlyArray<CustomTrackerPrivacyExposureSurface>;
  carnosPermissions: CustomTrackerCarnosPermissionSet;
  broadDashboardRequested: boolean;
  userApprovedSensitiveExposure: boolean;
};

export type CustomTrackerPrivacyReadinessResult = {
  privacyReady: boolean;
  restrictedState: CustomTrackerPrivacyRestrictedState;
  sensitiveExposureBlocked: boolean;
  requiredReviews: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerCarnosPermissionSummary = {
  readable: boolean;
  summarizable: boolean;
  suggestionAllowed: boolean;
  memoryCandidateAllowed: boolean;
  analyticsAllowed: boolean;
  anySilentWriteAllowed: boolean;
  anyUnreviewedMemoryWriteAllowed: boolean;
};

export const PHASE_19G_PRIVACY_CARNOS_BOUNDARY = {
  phase: "19G",
  trackerPrivacyPolicyEnabled: true,
  fieldPrivacyPolicyEnabled: true,
  carnosAccessPolicyEnabled: true,
  sensitiveDashboardExposureProtectionEnabled: true,
  privacyRestrictedStateEnabled: true,
  noSensitiveTrackerLeakageOntoBroadDashboards: true,
  noUnreviewedCarnosMemoryWrites: true,
  noSilentCarnosTrackerReads: true,
  noSilentCarnosTrackerWrites: true,
  runtimeWritesEnabled: false,
  schemaMigrationEnabled: false,
  carnosRuntimeEnabled: false,
} as const;

export const CUSTOM_TRACKER_PRIVACY_EXPOSURE_SURFACES: ReadonlyArray<CustomTrackerPrivacyExposureSurface> = [
  "command_dashboard",
  "domain_dashboard",
  "timeline",
  "analytics",
  "carnos_context",
  "memory_candidate",
  "private_panel",
];

export const CUSTOM_TRACKER_CARNOS_PERMISSION_KINDS: ReadonlyArray<CustomTrackerCarnosPermissionKind> = [
  "read",
  "summary",
  "suggestion",
  "memory_candidate",
  "analytics",
];

export const CUSTOM_TRACKER_PRIVACY_RANK: Record<CustomTrackerPrivacyLevel, number> = {
  standard: 1,
  sensitive: 2,
  private: 3,
  restricted: 4,
};

export function isAllowedCustomTrackerPrivacyLevel(value: string): value is CustomTrackerPrivacyLevel {
  return (CUSTOM_TRACKER_PRIVACY_LEVELS as ReadonlyArray<string>).includes(value);
}

export function isSensitiveCustomTrackerPrivacyLevel(privacyLevel: CustomTrackerPrivacyLevel): boolean {
  return privacyLevel === "sensitive" || privacyLevel === "private" || privacyLevel === "restricted";
}

export function isRestrictedCustomTrackerPrivacyLevel(privacyLevel: CustomTrackerPrivacyLevel): boolean {
  return privacyLevel === "restricted";
}

export function getHighestCustomTrackerPrivacyLevel(
  privacyLevels: ReadonlyArray<CustomTrackerPrivacyLevel>,
): CustomTrackerPrivacyLevel {
  let highest: CustomTrackerPrivacyLevel = "standard";

  for (const privacyLevel of privacyLevels) {
    if (CUSTOM_TRACKER_PRIVACY_RANK[privacyLevel] > CUSTOM_TRACKER_PRIVACY_RANK[highest]) {
      highest = privacyLevel;
    }
  }

  return highest;
}

export function evaluateCustomTrackerDashboardExposure(
  input: CustomTrackerPrivacyPolicyInput,
): CustomTrackerDashboardExposureDecision {
  const broadSurface = input.exposureSurface === "command_dashboard" || input.exposureSurface === "timeline";

  if (input.privacyLevel === "restricted") {
    return {
      status: "blocked",
      restrictedState: "hidden",
      exposureSurface: input.exposureSurface,
      allowed: false,
      reason: "restricted tracker cannot appear on broad dashboards",
      redacted: true,
    };
  }

  if (broadSurface && isSensitiveCustomTrackerPrivacyLevel(input.privacyLevel) && !input.userApprovedExposure) {
    return {
      status: "review_required",
      restrictedState: "review_required",
      exposureSurface: input.exposureSurface,
      allowed: false,
      reason: "sensitive tracker exposure requires explicit review before broad dashboard placement",
      redacted: true,
    };
  }

  if (broadSurface && isSensitiveCustomTrackerPrivacyLevel(input.privacyLevel) && input.userApprovedExposure) {
    return {
      status: "allowed",
      restrictedState: "redacted",
      exposureSurface: input.exposureSurface,
      allowed: true,
      reason: "sensitive tracker exposure is approved and must stay redacted on broad dashboards",
      redacted: true,
    };
  }

  return {
    status: "allowed",
    restrictedState: "visible",
    exposureSurface: input.exposureSurface,
    allowed: true,
    reason: "privacy exposure is allowed",
    redacted: false,
  };
}

export function evaluateCustomTrackerFieldPrivacy(
  field: CustomTrackerFieldPrivacyPolicyInput,
): CustomTrackerDashboardExposureDecision {
  if (field.privacyLevel === "restricted") {
    return {
      status: "blocked",
      restrictedState: "hidden",
      exposureSurface: "private_panel",
      allowed: false,
      reason: "restricted field can only be handled inside private review surfaces",
      redacted: true,
    };
  }

  if (isSensitiveCustomTrackerPrivacyLevel(field.privacyLevel)) {
    return {
      status: "review_required",
      restrictedState: "redacted",
      exposureSurface: "private_panel",
      allowed: true,
      reason: "sensitive field requires redaction outside private surfaces",
      redacted: true,
    };
  }

  return {
    status: "allowed",
    restrictedState: "visible",
    exposureSurface: "private_panel",
    allowed: true,
    reason: "field privacy exposure is allowed",
    redacted: false,
  };
}

export function evaluateCustomTrackerCarnosPermission(
  input: CustomTrackerCarnosPermissionInput,
): CustomTrackerCarnosPermissionDecision {
  const highestPrivacyLevel = getHighestCustomTrackerPrivacyLevel([
    input.trackerPrivacyLevel,
    ...input.fieldPrivacyLevels,
  ]);

  if (highestPrivacyLevel === "restricted") {
    return {
      permissionKind: input.permissionKind,
      status: "blocked",
      allowed: false,
      reviewRequired: true,
      reason: "restricted tracker data is blocked from Carnos access until private review rules exist",
      memoryWriteAllowed: false,
      silentReadAllowed: false,
      silentWriteAllowed: false,
    };
  }

  if (input.permissionKind === "memory_candidate" && !input.userApproved) {
    return {
      permissionKind: input.permissionKind,
      status: "review_required",
      allowed: false,
      reviewRequired: true,
      reason: "Carnos memory-candidate permission requires explicit user approval",
      memoryWriteAllowed: false,
      silentReadAllowed: false,
      silentWriteAllowed: false,
    };
  }

  if (isSensitiveCustomTrackerPrivacyLevel(highestPrivacyLevel) && input.reviewRequiredForSensitive && !input.userApproved) {
    return {
      permissionKind: input.permissionKind,
      status: "review_required",
      allowed: false,
      reviewRequired: true,
      reason: "sensitive tracker data requires review before Carnos access",
      memoryWriteAllowed: false,
      silentReadAllowed: false,
      silentWriteAllowed: false,
    };
  }

  return {
    permissionKind: input.permissionKind,
    status: "allowed",
    allowed: true,
    reviewRequired: false,
    reason: "Carnos permission is allowed by explicit privacy policy",
    memoryWriteAllowed: false,
    silentReadAllowed: false,
    silentWriteAllowed: false,
  };
}

export function buildCustomTrackerCarnosPermissionSet(input: {
  trackerPrivacyLevel: CustomTrackerPrivacyLevel;
  fieldPrivacyLevels: ReadonlyArray<CustomTrackerPrivacyLevel>;
  userApproved: boolean;
}): CustomTrackerCarnosPermissionSet {
  const read = evaluateCustomTrackerCarnosPermission({
    trackerPrivacyLevel: input.trackerPrivacyLevel,
    fieldPrivacyLevels: input.fieldPrivacyLevels,
    permissionKind: "read",
    userApproved: input.userApproved,
    reviewRequiredForSensitive: true,
  });

  const summary = evaluateCustomTrackerCarnosPermission({
    trackerPrivacyLevel: input.trackerPrivacyLevel,
    fieldPrivacyLevels: input.fieldPrivacyLevels,
    permissionKind: "summary",
    userApproved: input.userApproved,
    reviewRequiredForSensitive: true,
  });

  const suggestion = evaluateCustomTrackerCarnosPermission({
    trackerPrivacyLevel: input.trackerPrivacyLevel,
    fieldPrivacyLevels: input.fieldPrivacyLevels,
    permissionKind: "suggestion",
    userApproved: input.userApproved,
    reviewRequiredForSensitive: true,
  });

  const memoryCandidate = evaluateCustomTrackerCarnosPermission({
    trackerPrivacyLevel: input.trackerPrivacyLevel,
    fieldPrivacyLevels: input.fieldPrivacyLevels,
    permissionKind: "memory_candidate",
    userApproved: input.userApproved,
    reviewRequiredForSensitive: true,
  });

  const analytics = evaluateCustomTrackerCarnosPermission({
    trackerPrivacyLevel: input.trackerPrivacyLevel,
    fieldPrivacyLevels: input.fieldPrivacyLevels,
    permissionKind: "analytics",
    userApproved: input.userApproved,
    reviewRequiredForSensitive: true,
  });

  return {
    read: read.allowed,
    summary: summary.allowed,
    suggestion: suggestion.allowed,
    memoryCandidate: memoryCandidate.allowed,
    analytics: analytics.allowed,
  };
}

export function summarizeCustomTrackerCarnosPermissions(
  permissions: CustomTrackerCarnosPermissionSet,
): CustomTrackerCarnosPermissionSummary {
  return {
    readable: permissions.read,
    summarizable: permissions.summary,
    suggestionAllowed: permissions.suggestion,
    memoryCandidateAllowed: permissions.memoryCandidate,
    analyticsAllowed: permissions.analytics,
    anySilentWriteAllowed: false,
    anyUnreviewedMemoryWriteAllowed: false,
  };
}

export function validateCustomTrackerPrivacyReadiness(
  input: CustomTrackerPrivacyReadinessInput,
): CustomTrackerPrivacyReadinessResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const requiredReviews: string[] = [];

  const highestPrivacyLevel = getHighestCustomTrackerPrivacyLevel([
    input.trackerPrivacyLevel,
    ...input.fieldPrivacyLevels,
  ]);

  if (highestPrivacyLevel === "restricted") {
    errors.push("restricted tracker requires private review before dashboard or Carnos exposure");
  }

  if (input.broadDashboardRequested && isSensitiveCustomTrackerPrivacyLevel(highestPrivacyLevel) && !input.userApprovedSensitiveExposure) {
    requiredReviews.push("sensitive tracker broad dashboard exposure review");
    warnings.push("no sensitive tracker leakage onto broad dashboards");
  }

  if (input.carnosPermissions.memoryCandidate) {
    requiredReviews.push("Carnos memory-candidate review before memory write");
  }

  if (input.carnosPermissions.read && isSensitiveCustomTrackerPrivacyLevel(highestPrivacyLevel) && !input.userApprovedSensitiveExposure) {
    requiredReviews.push("Carnos read review for sensitive tracker");
  }

  const sensitiveExposureBlocked =
    highestPrivacyLevel === "restricted" ||
    (input.broadDashboardRequested && isSensitiveCustomTrackerPrivacyLevel(highestPrivacyLevel) && !input.userApprovedSensitiveExposure);

  const restrictedState: CustomTrackerPrivacyRestrictedState =
    highestPrivacyLevel === "restricted" ? "hidden" :
    requiredReviews.length > 0 ? "review_required" :
    isSensitiveCustomTrackerPrivacyLevel(highestPrivacyLevel) ? "redacted" :
    "visible";

  return {
    privacyReady: errors.length === 0 && requiredReviews.length === 0,
    restrictedState,
    sensitiveExposureBlocked,
    requiredReviews,
    warnings,
    errors,
  };
}

export function assertNoSilentCustomTrackerCarnosAccess(
  decisions: ReadonlyArray<CustomTrackerCarnosPermissionDecision>,
): boolean {
  return decisions.every((decision) => !decision.silentReadAllowed && !decision.silentWriteAllowed && !decision.memoryWriteAllowed);
}
