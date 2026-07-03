export type CustomTrackerDomain =
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

export type CustomTrackerLifecycleStatus =
  | "draft"
  | "active"
  | "inactive"
  | "archived";

export type CustomTrackerOrigin =
  | "user_created"
  | "template_created"
  | "carnos_proposed"
  | "imported";

export type CustomTrackerPrivacyLevel =
  | "standard"
  | "sensitive"
  | "private"
  | "restricted";

export type CustomTrackerFieldStatus =
  | "active"
  | "inactive"
  | "deprecated";

export type CustomTrackerEntryStatus =
  | "draft"
  | "logged"
  | "archived";

export type CustomTrackerCoreFieldKind =
  | "unknown_until_phase19c"
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "rating"
  | "select"
  | "multi_select"
  | "duration"
  | "json";

export type CustomTrackerFrequency =
  | "none"
  | "daily"
  | "weekly"
  | "monthly"
  | "custom";

export type CustomTrackerId = string;
export type CustomTrackerFieldId = string;
export type CustomTrackerEntryId = string;
export type CustomTrackerUserId = string;

export type CustomTrackerCoreRecord = {
  id: CustomTrackerId;
  userId: CustomTrackerUserId;
  stableKey: string;
  displayName: string;
  description: string;
  domain: CustomTrackerDomain;
  frequency: CustomTrackerFrequency;
  privacyLevel: CustomTrackerPrivacyLevel;
  lifecycleStatus: CustomTrackerLifecycleStatus;
  origin: CustomTrackerOrigin;
  isSystemTracker: boolean;
  createdAtIso: string;
  updatedAtIso: string;
  archivedAtIso: string | null;
};

export type CustomTrackerFieldCoreRecord = {
  id: CustomTrackerFieldId;
  userId: CustomTrackerUserId;
  trackerId: CustomTrackerId;
  stableKey: string;
  displayName: string;
  description: string;
  fieldKind: CustomTrackerCoreFieldKind;
  required: boolean;
  orderIndex: number;
  privacyLevel: CustomTrackerPrivacyLevel;
  status: CustomTrackerFieldStatus;
  createdAtIso: string;
  updatedAtIso: string;
};

export type CustomTrackerEntryCoreRecord = {
  id: CustomTrackerEntryId;
  userId: CustomTrackerUserId;
  trackerId: CustomTrackerId;
  entryDateIso: string;
  valuesJson: Record<string, unknown>;
  notes: string;
  status: CustomTrackerEntryStatus;
  createdAtIso: string;
  updatedAtIso: string;
};

export type CustomTrackerCoreBoundary = {
  phase: "19B";
  runtimeWritesEnabled: false;
  schemaMigrationEnabled: false;
  customTrackerCanOverrideCoreModule: false;
  stableKeyRequired: true;
  userOwnershipRequired: true;
  hardRemoveRequiresFutureSchemaDecision: true;
};

export type CustomTrackerNameCollisionInput = {
  candidateDisplayName: string;
  candidateStableKey: string;
  existingDisplayNames: ReadonlyArray<string>;
  existingStableKeys: ReadonlyArray<string>;
};

export type CustomTrackerNameCollisionResult = {
  hasDisplayNameCollision: boolean;
  hasStableKeyCollision: boolean;
  safeToCreate: boolean;
  reason: string;
};

export type CustomTrackerOwnershipInput = {
  actorUserId: string;
  trackerUserId: string;
  fieldUserId?: string;
  entryUserId?: string;
};

export type CustomTrackerCoreSummary = {
  trackerCount: number;
  activeTrackerCount: number;
  archivedTrackerCount: number;
  sensitiveTrackerCount: number;
  systemTrackerCount: number;
  customTrackerCount: number;
};

export const PHASE_19B_CORE_TRACKER_BOUNDARY: CustomTrackerCoreBoundary = {
  phase: "19B",
  runtimeWritesEnabled: false,
  schemaMigrationEnabled: false,
  customTrackerCanOverrideCoreModule: false,
  stableKeyRequired: true,
  userOwnershipRequired: true,
  hardRemoveRequiresFutureSchemaDecision: true,
};

export const CUSTOM_TRACKER_DOMAINS: ReadonlyArray<CustomTrackerDomain> = [
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

export const CUSTOM_TRACKER_LIFECYCLE_STATUSES: ReadonlyArray<CustomTrackerLifecycleStatus> = [
  "draft",
  "active",
  "inactive",
  "archived",
];

export const CUSTOM_TRACKER_PRIVACY_LEVELS: ReadonlyArray<CustomTrackerPrivacyLevel> = [
  "standard",
  "sensitive",
  "private",
  "restricted",
];

export const RESERVED_SYSTEM_TRACKER_KEYS: ReadonlyArray<string> = [
  "command",
  "timeline",
  "calendar",
  "goals",
  "proof",
  "career",
  "learning",
  "research",
  "health",
  "body",
  "finance",
  "life-admin",
  "grimoire",
  "analytics",
  "privacy",
  "documents",
  "memory",
  "carnos",
];

export function normalizeTrackerStableKey(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function buildTrackerStableKey(displayName: string, domain: CustomTrackerDomain): string {
  const normalizedName = normalizeTrackerStableKey(displayName);
  const normalizedDomain = normalizeTrackerStableKey(domain);
  return normalizedName.length > 0 ? normalizedName : normalizedDomain + "-tracker";
}

export function isReservedSystemTrackerKey(stableKey: string): boolean {
  return RESERVED_SYSTEM_TRACKER_KEYS.includes(normalizeTrackerStableKey(stableKey));
}

export function canCustomTrackerOverrideCoreModule(): false {
  return false;
}

export function validateCustomTrackerCoreRecord(record: CustomTrackerCoreRecord): ReadonlyArray<string> {
  const errors: string[] = [];

  if (record.id.trim().length === 0) errors.push("tracker id is required");
  if (record.userId.trim().length === 0) errors.push("tracker user id is required");
  if (record.displayName.trim().length === 0) errors.push("tracker display name is required");
  if (record.stableKey.trim().length === 0) errors.push("stable tracker key is required");
  if (record.stableKey !== normalizeTrackerStableKey(record.stableKey)) errors.push("stable tracker key must be normalized");
  if (!CUSTOM_TRACKER_DOMAINS.includes(record.domain)) errors.push("tracker domain is not allowed");
  if (!CUSTOM_TRACKER_LIFECYCLE_STATUSES.includes(record.lifecycleStatus)) errors.push("tracker status is not allowed");
  if (!CUSTOM_TRACKER_PRIVACY_LEVELS.includes(record.privacyLevel)) errors.push("tracker privacy level is not allowed");
  if (record.isSystemTracker) errors.push("custom tracker record cannot be marked as a system tracker");
  if (isReservedSystemTrackerKey(record.stableKey)) errors.push("custom tracker key collides with a reserved system tracker key");

  return errors;
}

export function validateCustomTrackerFieldCoreRecord(record: CustomTrackerFieldCoreRecord): ReadonlyArray<string> {
  const errors: string[] = [];

  if (record.id.trim().length === 0) errors.push("field id is required");
  if (record.userId.trim().length === 0) errors.push("field user id is required");
  if (record.trackerId.trim().length === 0) errors.push("field tracker id is required");
  if (record.displayName.trim().length === 0) errors.push("field display name is required");
  if (record.stableKey.trim().length === 0) errors.push("field stable key is required");
  if (record.orderIndex < 0) errors.push("field order index cannot be negative");
  if (!CUSTOM_TRACKER_PRIVACY_LEVELS.includes(record.privacyLevel)) errors.push("field privacy level is not allowed");

  return errors;
}

export function validateCustomTrackerEntryCoreRecord(record: CustomTrackerEntryCoreRecord): ReadonlyArray<string> {
  const errors: string[] = [];

  if (record.id.trim().length === 0) errors.push("entry id is required");
  if (record.userId.trim().length === 0) errors.push("entry user id is required");
  if (record.trackerId.trim().length === 0) errors.push("entry tracker id is required");
  if (record.entryDateIso.trim().length === 0) errors.push("entry date is required");
  if (record.valuesJson === null || Array.isArray(record.valuesJson)) errors.push("entry values must be an object");

  return errors;
}

export function detectCustomTrackerNameCollision(input: CustomTrackerNameCollisionInput): CustomTrackerNameCollisionResult {
  const normalizedDisplayName = input.candidateDisplayName.trim().toLowerCase();
  const normalizedStableKey = normalizeTrackerStableKey(input.candidateStableKey);
  const existingDisplayNames = new Set(input.existingDisplayNames.map((name) => name.trim().toLowerCase()));
  const existingStableKeys = new Set(input.existingStableKeys.map((key) => normalizeTrackerStableKey(key)));

  const hasDisplayNameCollision = existingDisplayNames.has(normalizedDisplayName);
  const hasStableKeyCollision = existingStableKeys.has(normalizedStableKey) || isReservedSystemTrackerKey(normalizedStableKey);
  const safeToCreate = !hasDisplayNameCollision && !hasStableKeyCollision;

  return {
    hasDisplayNameCollision,
    hasStableKeyCollision,
    safeToCreate,
    reason: safeToCreate
      ? "tracker name and stable key are available"
      : "tracker display name or stable key collides with an existing or reserved tracker",
  };
}

export function assertCustomTrackerOwnership(input: CustomTrackerOwnershipInput): boolean {
  if (input.actorUserId.trim().length === 0) return false;
  if (input.actorUserId !== input.trackerUserId) return false;
  if (input.fieldUserId !== undefined && input.actorUserId !== input.fieldUserId) return false;
  if (input.entryUserId !== undefined && input.actorUserId !== input.entryUserId) return false;
  return true;
}

export function summarizeCustomTrackerCore(records: ReadonlyArray<CustomTrackerCoreRecord>): CustomTrackerCoreSummary {
  return {
    trackerCount: records.length,
    activeTrackerCount: records.filter((record) => record.lifecycleStatus === "active").length,
    archivedTrackerCount: records.filter((record) => record.lifecycleStatus === "archived").length,
    sensitiveTrackerCount: records.filter((record) => record.privacyLevel !== "standard").length,
    systemTrackerCount: records.filter((record) => record.isSystemTracker).length,
    customTrackerCount: records.filter((record) => !record.isSystemTracker).length,
  };
}
