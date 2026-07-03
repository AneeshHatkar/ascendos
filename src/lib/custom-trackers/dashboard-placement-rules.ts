import type {
  CustomTrackerDomain,
  CustomTrackerPrivacyLevel,
} from "./core-tracker-domain-contracts";
import {
  evaluateCustomTrackerDashboardExposure,
  type CustomTrackerPrivacyExposureSurface,
  type CustomTrackerPrivacyRestrictedState,
} from "./privacy-carnos-permissions";

export type CustomTrackerDashboardTarget =
  | "command"
  | "career"
  | "learning"
  | "research"
  | "health"
  | "body"
  | "finance"
  | "grimoire"
  | "creativity"
  | "life_admin"
  | "custom";

export type CustomTrackerDashboardCardSize =
  | "compact"
  | "standard"
  | "wide";

export type CustomTrackerDashboardCardVisibility =
  | "visible"
  | "redacted"
  | "hidden"
  | "review_required";

export type CustomTrackerDashboardPlacementStatus =
  | "ready"
  | "review_required"
  | "blocked"
  | "not_ready";

export type CustomTrackerDashboardQuickLogMode =
  | "disabled"
  | "private_only"
  | "enabled_after_review";

export type CustomTrackerCrossDomainLinkKind =
  | "native_domain"
  | "command_summary"
  | "related_domain"
  | "custom_dashboard";

export type CustomTrackerDashboardPlacementPolicy = {
  target: CustomTrackerDashboardTarget;
  allowsSensitiveTrackers: boolean;
  allowsRestrictedTrackers: boolean;
  allowsQuickLog: boolean;
  broadSurface: boolean;
  defaultCardSize: CustomTrackerDashboardCardSize;
  maxPriority: number;
};

export type CustomTrackerDashboardPlacementInput = {
  trackerId: string;
  stableTrackerKey: string;
  displayName: string;
  domain: CustomTrackerDomain;
  privacyLevel: CustomTrackerPrivacyLevel;
  target: CustomTrackerDashboardTarget;
  requestedCardSize: CustomTrackerDashboardCardSize;
  requestedPriority: number;
  requestedQuickLog: boolean;
  requestedMiniSummary: boolean;
  userApprovedSensitiveExposure: boolean;
};

export type CustomTrackerDashboardPlacementDecision = {
  status: CustomTrackerDashboardPlacementStatus;
  target: CustomTrackerDashboardTarget;
  visibility: CustomTrackerDashboardCardVisibility;
  restrictedState: CustomTrackerPrivacyRestrictedState;
  cardSize: CustomTrackerDashboardCardSize;
  priority: number;
  quickLogMode: CustomTrackerDashboardQuickLogMode;
  miniSummaryAllowed: boolean;
  placementAllowed: boolean;
  reason: string;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerDashboardCardContract = {
  trackerId: string;
  stableTrackerKey: string;
  target: CustomTrackerDashboardTarget;
  cardSize: CustomTrackerDashboardCardSize;
  visibility: CustomTrackerDashboardCardVisibility;
  priority: number;
  miniSummaryAllowed: boolean;
  quickLogMode: CustomTrackerDashboardQuickLogMode;
  fakeDashboardCardAllowed: false;
  runtimeDataReadEnabled: false;
};

export type CustomTrackerCrossDomainLink = {
  trackerId: string;
  sourceDomain: CustomTrackerDomain;
  target: CustomTrackerDashboardTarget;
  linkKind: CustomTrackerCrossDomainLinkKind;
  allowed: boolean;
  requiresReview: boolean;
  reason: string;
};

export type CustomTrackerDashboardPlacementReadiness = {
  dashboardPlacementReady: boolean;
  commandDashboardReady: boolean;
  domainDashboardReady: boolean;
  sensitiveExposureBlocked: boolean;
  crossDomainAllowed: boolean;
  requiredReviews: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerDashboardPlacementSummary = {
  dashboardPlacementRulesEnabled: boolean;
  commandDashboardSupportEnabled: boolean;
  domainDashboardSupportEnabled: boolean;
  miniSummaryBoundaryEnabled: boolean;
  quickLogBoundaryEnabled: boolean;
  sensitiveDashboardExposureProtectionEnabled: boolean;
  fakeDashboardCardsAllowed: boolean;
  runtimeDashboardReadsEnabled: boolean;
};

export const PHASE_19I_DASHBOARD_PLACEMENT_BOUNDARY = {
  phase: "19I",
  dashboardPlacementRulesEnabled: true,
  dashboardTargetSelectionEnabled: true,
  phase19GPrivacyRulesRequired: true,
  commandDashboardSupportEnabled: true,
  domainDashboardSupportEnabled: true,
  miniSummaryBoundaryEnabled: true,
  quickLogBoundaryEnabled: true,
  crossDomainLinkageEnabled: true,
  noFakeDashboardCards: true,
  noSensitiveTrackerLeakageOntoBroadDashboards: true,
  runtimeWritesEnabled: false,
  runtimeDashboardReadsEnabled: false,
  schemaMigrationEnabled: false,
  uiRouteChanged: false,
} as const;

export const CUSTOM_TRACKER_DASHBOARD_TARGETS: ReadonlyArray<CustomTrackerDashboardTarget> = [
  "command",
  "career",
  "learning",
  "research",
  "health",
  "body",
  "finance",
  "grimoire",
  "creativity",
  "life_admin",
  "custom",
];

export const CUSTOM_TRACKER_DASHBOARD_CARD_SIZES: ReadonlyArray<CustomTrackerDashboardCardSize> = [
  "compact",
  "standard",
  "wide",
];

export const CUSTOM_TRACKER_DASHBOARD_QUICK_LOG_MODES: ReadonlyArray<CustomTrackerDashboardQuickLogMode> = [
  "disabled",
  "private_only",
  "enabled_after_review",
];

export const CUSTOM_TRACKER_DASHBOARD_PLACEMENT_POLICIES: Record<CustomTrackerDashboardTarget, CustomTrackerDashboardPlacementPolicy> = {
  command: {
    target: "command",
    allowsSensitiveTrackers: false,
    allowsRestrictedTrackers: false,
    allowsQuickLog: false,
    broadSurface: true,
    defaultCardSize: "compact",
    maxPriority: 10,
  },
  career: {
    target: "career",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  learning: {
    target: "learning",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  research: {
    target: "research",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  health: {
    target: "health",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  body: {
    target: "body",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  finance: {
    target: "finance",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: false,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  grimoire: {
    target: "grimoire",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  creativity: {
    target: "creativity",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  life_admin: {
    target: "life_admin",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: false,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
  custom: {
    target: "custom",
    allowsSensitiveTrackers: true,
    allowsRestrictedTrackers: false,
    allowsQuickLog: true,
    broadSurface: false,
    defaultCardSize: "standard",
    maxPriority: 20,
  },
};

export function isKnownCustomTrackerDashboardTarget(target: string): target is CustomTrackerDashboardTarget {
  return CUSTOM_TRACKER_DASHBOARD_TARGETS.includes(target as CustomTrackerDashboardTarget);
}

export function getCustomTrackerDashboardPlacementPolicy(
  target: CustomTrackerDashboardTarget,
): CustomTrackerDashboardPlacementPolicy {
  return CUSTOM_TRACKER_DASHBOARD_PLACEMENT_POLICIES[target];
}

export function mapCustomTrackerDashboardTargetToExposureSurface(
  target: CustomTrackerDashboardTarget,
): CustomTrackerPrivacyExposureSurface {
  return target === "command" ? "command_dashboard" : "domain_dashboard";
}

export function isBroadCustomTrackerDashboardTarget(target: CustomTrackerDashboardTarget): boolean {
  return getCustomTrackerDashboardPlacementPolicy(target).broadSurface;
}

export function isNativeCustomTrackerDomainPlacement(
  domain: CustomTrackerDomain,
  target: CustomTrackerDashboardTarget,
): boolean {
  return domain === target || target === "custom";
}

export function evaluateCustomTrackerDashboardPlacement(
  input: CustomTrackerDashboardPlacementInput,
): CustomTrackerDashboardPlacementDecision {
  const warnings: string[] = [];
  const errors: string[] = [];
  const policy = getCustomTrackerDashboardPlacementPolicy(input.target);
  const exposureSurface = mapCustomTrackerDashboardTargetToExposureSurface(input.target);
  const exposureDecision = evaluateCustomTrackerDashboardExposure({
    trackerId: input.trackerId,
    stableTrackerKey: input.stableTrackerKey,
    displayName: input.displayName,
    privacyLevel: input.privacyLevel,
    exposureSurface,
    userApprovedExposure: input.userApprovedSensitiveExposure,
  });

  if (!CUSTOM_TRACKER_DASHBOARD_CARD_SIZES.includes(input.requestedCardSize)) {
    errors.push("dashboard card size is not allowed");
  }

  if (!Number.isInteger(input.requestedPriority) || input.requestedPriority < 0) {
    errors.push("dashboard card priority must be a non-negative integer");
  }

  if (input.requestedPriority > policy.maxPriority) {
    warnings.push("dashboard card priority was clamped to target max priority");
  }

  if (input.privacyLevel === "restricted") {
    errors.push("restricted tracker dashboard placement is blocked");
  }

  if (policy.broadSurface && input.privacyLevel !== "standard" && !input.userApprovedSensitiveExposure) {
    warnings.push("sensitive tracker broad dashboard placement requires review");
  }

  if (!isNativeCustomTrackerDomainPlacement(input.domain, input.target) && input.target !== "command") {
    warnings.push("cross-domain placement requires clear relationship label");
  }

  const clampedPriority = Math.min(input.requestedPriority, policy.maxPriority);
  const privacyBlocked = exposureDecision.status === "blocked";
  const reviewRequired = exposureDecision.status === "review_required";
  const quickLogMode = determineCustomTrackerQuickLogMode(input, policy, exposureDecision.restrictedState);
  const miniSummaryAllowed = input.requestedMiniSummary && exposureDecision.restrictedState !== "hidden";

  const placementAllowed = errors.length === 0 && !privacyBlocked && !reviewRequired;
  const status: CustomTrackerDashboardPlacementStatus =
    errors.length > 0 || privacyBlocked ? "blocked" :
    reviewRequired ? "review_required" :
    placementAllowed ? "ready" :
    "not_ready";

  const visibility: CustomTrackerDashboardCardVisibility =
    exposureDecision.restrictedState === "hidden" ? "hidden" :
    exposureDecision.restrictedState === "review_required" ? "review_required" :
    exposureDecision.restrictedState === "redacted" ? "redacted" :
    "visible";

  return {
    status,
    target: input.target,
    visibility,
    restrictedState: exposureDecision.restrictedState,
    cardSize: CUSTOM_TRACKER_DASHBOARD_CARD_SIZES.includes(input.requestedCardSize) ? input.requestedCardSize : policy.defaultCardSize,
    priority: clampedPriority,
    quickLogMode,
    miniSummaryAllowed,
    placementAllowed,
    reason: exposureDecision.reason,
    warnings,
    errors,
  };
}

export function determineCustomTrackerQuickLogMode(
  input: CustomTrackerDashboardPlacementInput,
  policy: CustomTrackerDashboardPlacementPolicy,
  restrictedState: CustomTrackerPrivacyRestrictedState,
): CustomTrackerDashboardQuickLogMode {
  if (!input.requestedQuickLog) return "disabled";
  if (!policy.allowsQuickLog) return "disabled";
  if (restrictedState === "hidden" || restrictedState === "review_required") return "disabled";
  if (input.privacyLevel === "standard") return "enabled_after_review";
  return "private_only";
}

export function buildCustomTrackerDashboardCardContract(
  input: CustomTrackerDashboardPlacementInput,
): CustomTrackerDashboardCardContract {
  const decision = evaluateCustomTrackerDashboardPlacement(input);

  return {
    trackerId: input.trackerId,
    stableTrackerKey: input.stableTrackerKey,
    target: input.target,
    cardSize: decision.cardSize,
    visibility: decision.visibility,
    priority: decision.priority,
    miniSummaryAllowed: decision.miniSummaryAllowed,
    quickLogMode: decision.quickLogMode,
    fakeDashboardCardAllowed: false,
    runtimeDataReadEnabled: false,
  };
}

export function buildCustomTrackerCrossDomainLink(
  input: {
    trackerId: string;
    sourceDomain: CustomTrackerDomain;
    target: CustomTrackerDashboardTarget;
    privacyLevel: CustomTrackerPrivacyLevel;
    userApprovedSensitiveExposure: boolean;
  },
): CustomTrackerCrossDomainLink {
  const nativePlacement = isNativeCustomTrackerDomainPlacement(input.sourceDomain, input.target);
  const commandPlacement = input.target === "command";
  const broadSensitive = commandPlacement && input.privacyLevel !== "standard";

  if (broadSensitive && !input.userApprovedSensitiveExposure) {
    return {
      trackerId: input.trackerId,
      sourceDomain: input.sourceDomain,
      target: input.target,
      linkKind: "command_summary",
      allowed: false,
      requiresReview: true,
      reason: "sensitive tracker cannot link to Command dashboard without review",
    };
  }

  if (nativePlacement) {
    return {
      trackerId: input.trackerId,
      sourceDomain: input.sourceDomain,
      target: input.target,
      linkKind: "native_domain",
      allowed: true,
      requiresReview: false,
      reason: "native domain placement is allowed",
    };
  }

  if (commandPlacement) {
    return {
      trackerId: input.trackerId,
      sourceDomain: input.sourceDomain,
      target: input.target,
      linkKind: "command_summary",
      allowed: true,
      requiresReview: input.privacyLevel !== "standard",
      reason: "Command dashboard placement is summary-only and privacy gated",
    };
  }

  return {
    trackerId: input.trackerId,
    sourceDomain: input.sourceDomain,
    target: input.target,
    linkKind: input.target === "custom" ? "custom_dashboard" : "related_domain",
    allowed: true,
    requiresReview: true,
    reason: "cross-domain placement requires relationship review",
  };
}

export function validateCustomTrackerDashboardPlacementReadiness(
  placements: ReadonlyArray<CustomTrackerDashboardPlacementDecision>,
): CustomTrackerDashboardPlacementReadiness {
  const requiredReviews: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  let commandDashboardReady = false;
  let domainDashboardReady = false;
  let sensitiveExposureBlocked = false;
  let crossDomainAllowed = false;

  for (const placement of placements) {
    if (placement.target === "command" && placement.placementAllowed) commandDashboardReady = true;
    if (placement.target !== "command" && placement.placementAllowed) domainDashboardReady = true;
    if (placement.status === "review_required") requiredReviews.push("dashboard placement review required for " + placement.target);
    if (placement.status === "blocked") errors.push("dashboard placement blocked for " + placement.target);
    if (placement.visibility === "redacted" || placement.visibility === "review_required") sensitiveExposureBlocked = true;
    if (placement.target !== "command" && placement.placementAllowed) crossDomainAllowed = true;

    for (const warning of placement.warnings) warnings.push(warning);
    for (const error of placement.errors) errors.push(error);
  }

  return {
    dashboardPlacementReady: errors.length === 0 && requiredReviews.length === 0 && placements.length > 0,
    commandDashboardReady,
    domainDashboardReady,
    sensitiveExposureBlocked,
    crossDomainAllowed,
    requiredReviews,
    warnings,
    errors,
  };
}

export function summarizeCustomTrackerDashboardPlacementBoundary(): CustomTrackerDashboardPlacementSummary {
  return {
    dashboardPlacementRulesEnabled: true,
    commandDashboardSupportEnabled: true,
    domainDashboardSupportEnabled: true,
    miniSummaryBoundaryEnabled: true,
    quickLogBoundaryEnabled: true,
    sensitiveDashboardExposureProtectionEnabled: true,
    fakeDashboardCardsAllowed: false,
    runtimeDashboardReadsEnabled: false,
  };
}
