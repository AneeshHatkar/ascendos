import {
  CUSTOM_TRACKER_LIFECYCLE_STATUSES,
  type CustomTrackerCoreRecord,
  type CustomTrackerEntryCoreRecord,
  type CustomTrackerFieldCoreRecord,
  type CustomTrackerFieldStatus,
  type CustomTrackerLifecycleStatus,
} from "./core-tracker-domain-contracts";

export const CUSTOM_TRACKER_FIELD_STATUSES_19E: ReadonlyArray<CustomTrackerFieldStatus> = [
  "active",
  "inactive",
  "deprecated",
];

export type CustomTrackerSchemaVersion = {
  major: number;
  minor: number;
  patch: number;
};

export type CustomTrackerSchemaVersionChangeKind =
  | "initial_schema"
  | "field_added"
  | "field_deprecated"
  | "field_reordered"
  | "metadata_changed"
  | "privacy_changed"
  | "archive_state_changed";

export type CustomTrackerSchemaCompatibilityStatus =
  | "compatible"
  | "compatible_with_deprecated_fields"
  | "migration_required"
  | "blocked";

export type CustomTrackerLifecycleAction =
  | "activate"
  | "deactivate"
  | "archive"
  | "restore"
  | "remove_request";

export type CustomTrackerArchiveDecisionStatus =
  | "allowed"
  | "warning"
  | "blocked";

export type CustomTrackerFieldDeprecationPlan = {
  fieldId: string;
  fieldStableKey: string;
  fromStatus: CustomTrackerFieldStatus;
  toStatus: CustomTrackerFieldStatus;
  safeToDeprecate: boolean;
  preservesHistoricalEntries: boolean;
  reason: string;
};

export type CustomTrackerSchemaVersionRecord = {
  trackerId: string;
  schemaVersion: string;
  previousSchemaVersion: string | null;
  changeKind: CustomTrackerSchemaVersionChangeKind;
  changedFieldKeys: ReadonlyArray<string>;
  compatibilityStatus: CustomTrackerSchemaCompatibilityStatus;
  createdAtIso: string;
};

export type CustomTrackerSchemaCompatibilityInput = {
  trackerSchemaVersion: string;
  entrySchemaVersion: string;
  entryFieldKeys: ReadonlyArray<string>;
  activeFieldKeys: ReadonlyArray<string>;
  deprecatedFieldKeys: ReadonlyArray<string>;
};

export type CustomTrackerArchiveDecision = {
  status: CustomTrackerArchiveDecisionStatus;
  action: CustomTrackerLifecycleAction;
  allowed: boolean;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
  preservesHistory: boolean;
  destructiveRemovalAllowed: boolean;
};

export type CustomTrackerLifecycleTransitionResult = {
  allowed: boolean;
  fromStatus: CustomTrackerLifecycleStatus;
  toStatus: CustomTrackerLifecycleStatus;
  action: CustomTrackerLifecycleAction;
  reason: string;
};

export type CustomTrackerFieldLifecycleTransitionResult = {
  allowed: boolean;
  fromStatus: CustomTrackerFieldStatus;
  toStatus: CustomTrackerFieldStatus;
  reason: string;
};

export type CustomTrackerVersioningArchiveSummary = {
  schemaVersioningEnabled: boolean;
  destructiveRemovalAllowed: boolean;
  deprecatedFieldReadCompatibilityEnabled: boolean;
  trackerArchiveBoundaryEnabled: boolean;
  entryArchiveBoundaryEnabled: boolean;
};

export const PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARY = {
  phase: "19E",
  schemaVersioningEnabled: true,
  entrySchemaVersionTrackingEnabled: true,
  deprecatedFieldReadCompatibilityEnabled: true,
  fieldHardRemovalAllowed: false,
  trackerHardRemovalAllowed: false,
  entryHardRemovalAllowed: false,
  archiveInsteadOfDestructiveRemoval: true,
  runtimeWritesEnabled: false,
  schemaMigrationEnabled: false,
} as const;

export const DEFAULT_CUSTOM_TRACKER_SCHEMA_VERSION = "1.0.0";

export const CUSTOM_TRACKER_SCHEMA_CHANGE_KINDS: ReadonlyArray<CustomTrackerSchemaVersionChangeKind> = [
  "initial_schema",
  "field_added",
  "field_deprecated",
  "field_reordered",
  "metadata_changed",
  "privacy_changed",
  "archive_state_changed",
];

export const CUSTOM_TRACKER_SCHEMA_COMPATIBILITY_STATUSES: ReadonlyArray<CustomTrackerSchemaCompatibilityStatus> = [
  "compatible",
  "compatible_with_deprecated_fields",
  "migration_required",
  "blocked",
];

export function parseCustomTrackerSchemaVersion(version: string): CustomTrackerSchemaVersion | null {
  const parts = version.split(".");
  if (parts.length !== 3) return null;

  const major = Number(parts[0]);
  const minor = Number(parts[1]);
  const patch = Number(parts[2]);

  if (![major, minor, patch].every((part) => Number.isInteger(part) && part >= 0)) return null;

  return { major, minor, patch };
}

export function formatCustomTrackerSchemaVersion(version: CustomTrackerSchemaVersion): string {
  return [version.major, version.minor, version.patch].join(".");
}

export function compareCustomTrackerSchemaVersions(leftVersion: string, rightVersion: string): number {
  const left = parseCustomTrackerSchemaVersion(leftVersion);
  const right = parseCustomTrackerSchemaVersion(rightVersion);

  if (left === null || right === null) return Number.NaN;

  if (left.major !== right.major) return left.major - right.major;
  if (left.minor !== right.minor) return left.minor - right.minor;
  return left.patch - right.patch;
}

export function incrementCustomTrackerSchemaVersion(
  currentVersion: string,
  changeKind: CustomTrackerSchemaVersionChangeKind,
): string {
  const parsed = parseCustomTrackerSchemaVersion(currentVersion) ?? parseCustomTrackerSchemaVersion(DEFAULT_CUSTOM_TRACKER_SCHEMA_VERSION);

  if (parsed === null) return DEFAULT_CUSTOM_TRACKER_SCHEMA_VERSION;

  if (changeKind === "field_deprecated" || changeKind === "field_added") {
    return formatCustomTrackerSchemaVersion({ major: parsed.major, minor: parsed.minor + 1, patch: 0 });
  }

  if (changeKind === "initial_schema") {
    return DEFAULT_CUSTOM_TRACKER_SCHEMA_VERSION;
  }

  return formatCustomTrackerSchemaVersion({ major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1 });
}

export function buildCustomTrackerSchemaVersionRecord(input: {
  trackerId: string;
  currentVersion: string;
  changeKind: CustomTrackerSchemaVersionChangeKind;
  changedFieldKeys: ReadonlyArray<string>;
  createdAtIso: string;
}): CustomTrackerSchemaVersionRecord {
  const nextVersion = incrementCustomTrackerSchemaVersion(input.currentVersion, input.changeKind);

  return {
    trackerId: input.trackerId,
    schemaVersion: nextVersion,
    previousSchemaVersion: input.changeKind === "initial_schema" ? null : input.currentVersion,
    changeKind: input.changeKind,
    changedFieldKeys: input.changedFieldKeys,
    compatibilityStatus: input.changeKind === "field_deprecated" ? "compatible_with_deprecated_fields" : "compatible",
    createdAtIso: input.createdAtIso,
  };
}

export function evaluateCustomTrackerEntrySchemaCompatibility(
  input: CustomTrackerSchemaCompatibilityInput,
): CustomTrackerSchemaCompatibilityStatus {
  const trackerVersion = parseCustomTrackerSchemaVersion(input.trackerSchemaVersion);
  const entryVersion = parseCustomTrackerSchemaVersion(input.entrySchemaVersion);

  if (trackerVersion === null || entryVersion === null) return "blocked";

  if (entryVersion.major !== trackerVersion.major) return "migration_required";

  const activeFieldSet = new Set(input.activeFieldKeys);
  const deprecatedFieldSet = new Set(input.deprecatedFieldKeys);
  let hasDeprecatedField = false;

  for (const fieldKey of input.entryFieldKeys) {
    if (activeFieldSet.has(fieldKey)) continue;

    if (deprecatedFieldSet.has(fieldKey)) {
      hasDeprecatedField = true;
      continue;
    }

    return "migration_required";
  }

  return hasDeprecatedField ? "compatible_with_deprecated_fields" : "compatible";
}

export function canReadDeprecatedCustomTrackerField(field: CustomTrackerFieldCoreRecord): boolean {
  return field.status === "deprecated";
}

export function canWriteDeprecatedCustomTrackerField(field: CustomTrackerFieldCoreRecord): boolean {
  return field.status !== "deprecated";
}

export function buildCustomTrackerFieldDeprecationPlan(field: CustomTrackerFieldCoreRecord): CustomTrackerFieldDeprecationPlan {
  const safeToDeprecate = field.status === "active" || field.status === "inactive";

  return {
    fieldId: field.id,
    fieldStableKey: field.stableKey,
    fromStatus: field.status,
    toStatus: "deprecated",
    safeToDeprecate,
    preservesHistoricalEntries: true,
    reason: safeToDeprecate
      ? "field can be deprecated while preserving historical entry reads"
      : "field is already deprecated or cannot transition to deprecated",
  };
}

export function canTransitionCustomTrackerFieldStatus(
  fromStatus: CustomTrackerFieldStatus,
  toStatus: CustomTrackerFieldStatus,
): CustomTrackerFieldLifecycleTransitionResult {
  if (!CUSTOM_TRACKER_FIELD_STATUSES_19E.includes(fromStatus) || !CUSTOM_TRACKER_FIELD_STATUSES_19E.includes(toStatus)) {
    return {
      allowed: false,
      fromStatus,
      toStatus,
      reason: "field status is not registered",
    };
  }

  if (fromStatus === toStatus) {
    return {
      allowed: true,
      fromStatus,
      toStatus,
      reason: "field status is unchanged",
    };
  }

  const allowed =
(fromStatus === "active" && (toStatus === "inactive" || toStatus === "deprecated")) ||
    (fromStatus === "inactive" && (toStatus === "active" || toStatus === "deprecated"));

  return {
    allowed,
    fromStatus,
    toStatus,
    reason: allowed
      ? "field lifecycle transition is allowed"
      : "field lifecycle transition is blocked to prevent unsafe field removal",
  };
}

export function canTransitionCustomTrackerLifecycleStatus(
  fromStatus: CustomTrackerLifecycleStatus,
  toStatus: CustomTrackerLifecycleStatus,
): CustomTrackerLifecycleTransitionResult {
  if (!CUSTOM_TRACKER_LIFECYCLE_STATUSES.includes(fromStatus) || !CUSTOM_TRACKER_LIFECYCLE_STATUSES.includes(toStatus)) {
    return {
      allowed: false,
      fromStatus,
      toStatus,
      action: "remove_request",
      reason: "tracker status is not registered",
    };
  }

  if (fromStatus === toStatus) {
    return {
      allowed: true,
      fromStatus,
      toStatus,
      action: "deactivate",
      reason: "tracker status is unchanged",
    };
  }

  const action: CustomTrackerLifecycleAction =
    toStatus === "active" ? "activate" :
    toStatus === "inactive" ? "deactivate" :
    toStatus === "archived" ? "archive" :
    "restore";

  const allowed =
    (fromStatus === "draft" && (toStatus === "active" || toStatus === "archived")) ||
    (fromStatus === "active" && (toStatus === "inactive" || toStatus === "archived")) ||
    (fromStatus === "inactive" && (toStatus === "active" || toStatus === "archived")) ||
    (fromStatus === "archived" && toStatus === "inactive");

  return {
    allowed,
    fromStatus,
    toStatus,
    action,
    reason: allowed
      ? "tracker lifecycle transition is allowed"
      : "tracker lifecycle transition is blocked to preserve history",
  };
}

export function buildCustomTrackerArchiveDecision(input: {
  tracker: CustomTrackerCoreRecord;
  activeEntryCount: number;
  activeFieldCount: number;
}): CustomTrackerArchiveDecision {
  const warnings: string[] = [];

  if (input.activeEntryCount > 0) warnings.push("archiving preserves existing entries and hides active use");
  if (input.activeFieldCount > 0) warnings.push("archiving preserves field definitions for historical reads");

  const transition = canTransitionCustomTrackerLifecycleStatus(input.tracker.lifecycleStatus, "archived");

  return {
    status: transition.allowed ? (warnings.length > 0 ? "warning" : "allowed") : "blocked",
    action: "archive",
    allowed: transition.allowed,
    warnings,
    errors: transition.allowed ? [] : [transition.reason],
    preservesHistory: true,
    destructiveRemovalAllowed: false,
  };
}

export function buildCustomTrackerEntryArchiveDecision(entry: CustomTrackerEntryCoreRecord): CustomTrackerArchiveDecision {
  const allowed = entry.status !== "archived";

  return {
    status: allowed ? "allowed" : "warning",
    action: "archive",
    allowed,
    warnings: allowed ? [] : ["entry is already archived"],
    errors: [],
    preservesHistory: true,
    destructiveRemovalAllowed: false,
  };
}

export function buildCustomTrackerRemovalDecision(input: {
  tracker: CustomTrackerCoreRecord;
  activeEntryCount: number;
  activeFieldCount: number;
}): CustomTrackerArchiveDecision {
  const warnings = [
    "destructive removal is disabled for custom trackers",
    "use archive instead so historical entries and audit context remain readable",
  ];

  if (input.activeEntryCount > 0) warnings.push("tracker has active entries");
  if (input.activeFieldCount > 0) warnings.push("tracker has active fields");

  return {
    status: "blocked",
    action: "remove_request",
    allowed: false,
    warnings,
    errors: ["destructive tracker removal is blocked"],
    preservesHistory: true,
    destructiveRemovalAllowed: false,
  };
}

export function summarizeCustomTrackerVersioningArchiveBoundary(): CustomTrackerVersioningArchiveSummary {
  return {
    schemaVersioningEnabled: PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARY.schemaVersioningEnabled,
    destructiveRemovalAllowed: false,
    deprecatedFieldReadCompatibilityEnabled: PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARY.deprecatedFieldReadCompatibilityEnabled,
    trackerArchiveBoundaryEnabled: true,
    entryArchiveBoundaryEnabled: true,
  };
}
