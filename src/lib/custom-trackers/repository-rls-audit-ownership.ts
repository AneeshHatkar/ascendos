export type CustomTrackerRepositoryOperation =
  | "create_tracker"
  | "read_tracker"
  | "change_tracker"
  | "archive_tracker"
  | "create_field"
  | "change_field"
  | "deprecate_field"
  | "create_entry"
  | "change_entry"
  | "archive_entry"
  | "place_dashboard_card"
  | "change_dashboard_card"
  | "approve_ai_mapping"
  | "reject_ai_mapping";

export type CustomTrackerOwnershipResource =
  | "custom_tracker"
  | "custom_tracker_field"
  | "custom_tracker_entry"
  | "dashboard_card"
  | "ai_mapping_proposal";

export type CustomTrackerOwnershipDecisionStatus =
  | "allowed"
  | "blocked"
  | "requires_review";

export type CustomTrackerRlsPolicyStatus =
  | "ready"
  | "missing_auth_user"
  | "missing_owner_id"
  | "owner_mismatch"
  | "tracker_owner_mismatch"
  | "field_tracker_mismatch"
  | "entry_tracker_mismatch"
  | "dashboard_owner_mismatch"
  | "cross_user_reference_blocked"
  | "system_resource_blocked"
  | "review_required";

export type CustomTrackerAuditEventKind =
  | "tracker_created"
  | "tracker_changed"
  | "tracker_archived"
  | "field_created"
  | "field_changed"
  | "field_deprecated"
  | "entry_created"
  | "entry_changed"
  | "entry_archived"
  | "dashboard_placement_changed"
  | "ai_mapping_approved"
  | "ai_mapping_rejected"
  | "ownership_check_failed"
  | "rls_policy_blocked";

export type CustomTrackerAuditSeverity =
  | "info"
  | "warning"
  | "error"
  | "security";

export type CustomTrackerPermissionBoundary =
  | "read"
  | "propose"
  | "review"
  | "write_after_approval"
  | "archive_after_approval";

export type CustomTrackerOwnershipSubject = {
  userId: string | null;
  authUserId: string | null;
  role?: "owner" | "reviewer" | "system";
};

export type CustomTrackerOwnershipResourceInput = {
  resourceKind: CustomTrackerOwnershipResource;
  resourceId: string | null;
  ownerId: string | null;
  trackerId?: string | null;
  parentTrackerId?: string | null;
  fieldId?: string | null;
  parentFieldId?: string | null;
  dashboardCardOwnerId?: string | null;
  isSystemResource?: boolean;
};

export type CustomTrackerOwnershipDecision = {
  status: CustomTrackerOwnershipDecisionStatus;
  policyStatus: CustomTrackerRlsPolicyStatus;
  resourceKind: CustomTrackerOwnershipResource;
  resourceId: string | null;
  reasons: string[];
  requiresReviewBeforeWrite: boolean;
  runtimeWriteAllowed: false;
  runtimeDatabaseReadAllowed: false;
  runtimeDatabaseWriteAllowed: false;
  crossUserAccessAllowed: false;
};

export type CustomTrackerRlsPolicyInput = {
  subject: CustomTrackerOwnershipSubject;
  resource: CustomTrackerOwnershipResourceInput;
  operation: CustomTrackerRepositoryOperation;
  approvedByUser?: boolean;
  reviewQueueItemId?: string | null;
};

export type CustomTrackerRlsPolicyDecision = {
  operation: CustomTrackerRepositoryOperation;
  status: CustomTrackerRlsPolicyStatus;
  allowed: boolean;
  reasons: string[];
  permissionBoundary: CustomTrackerPermissionBoundary;
  requiresAuditEvent: boolean;
  requiresReviewBeforeWrite: boolean;
  runtimeWriteAllowed: false;
  runtimeDatabaseReadAllowed: false;
  runtimeDatabaseWriteAllowed: false;
};

export type CustomTrackerAuditEventContract = {
  eventKind: CustomTrackerAuditEventKind;
  resourceKind: CustomTrackerOwnershipResource;
  resourceId: string | null;
  trackerId: string | null;
  actorUserId: string | null;
  ownerId: string | null;
  severity: CustomTrackerAuditSeverity;
  reason: string;
  metadata: Record<string, string | number | boolean | null>;
  persistenceRequiredBeforeRuntimeWrite: boolean;
  runtimeAuditWriteAllowed: false;
};

export type CustomTrackerRepositoryBoundaryInput = {
  operation: CustomTrackerRepositoryOperation;
  subject: CustomTrackerOwnershipSubject;
  resource: CustomTrackerOwnershipResourceInput;
  approvedByUser?: boolean;
  reviewQueueItemId?: string | null;
};

export type CustomTrackerRepositoryBoundaryDecision = {
  operation: CustomTrackerRepositoryOperation;
  ownershipDecision: CustomTrackerOwnershipDecision;
  rlsDecision: CustomTrackerRlsPolicyDecision;
  auditEvent: CustomTrackerAuditEventContract;
  canProceedToFutureRepositoryWrite: boolean;
  runtimeRepositoryEnabled: false;
  runtimeWritesEnabled: false;
  runtimeDatabaseReadsEnabled: false;
  runtimeDatabaseWritesEnabled: false;
  schemaMigrationEnabled: false;
  supabaseRuntimeEnabled: false;
};

export type CustomTrackerRepositoryRlsAuditSummary = {
  phase: "19L";
  repositoryBoundaryEnabled: true;
  rlsBoundaryEnabled: true;
  auditTrailContractEnabled: true;
  trackerOwnershipValidationEnabled: true;
  fieldOwnershipValidationThroughTrackerEnabled: true;
  entryOwnershipValidationThroughTrackerEnabled: true;
  dashboardCardOwnershipValidationEnabled: true;
  trackerIdFieldIdCrossUserProtectionEnabled: true;
  runtimeRepositoryEnabled: false;
  runtimeWritesEnabled: false;
  runtimeDatabaseReadsEnabled: false;
  runtimeDatabaseWritesEnabled: false;
  schemaMigrationEnabled: false;
  supabaseRuntimeEnabled: false;
  noBypassingRlsUserOwnership: true;
  noUnreviewedTrackerWrites: true;
};

export const PHASE_19L_REPOSITORY_RLS_AUDIT_BOUNDARY = {
  phase: "19L",
  repositoryBoundaryEnabled: true,
  rlsBoundaryEnabled: true,
  auditTrailContractEnabled: true,
  trackerOwnershipValidationEnabled: true,
  fieldOwnershipValidationThroughTrackerEnabled: true,
  entryOwnershipValidationThroughTrackerEnabled: true,
  dashboardCardOwnershipValidationEnabled: true,
  trackerIdFieldIdCrossUserProtectionEnabled: true,
  runtimeRepositoryEnabled: false,
  runtimeWritesEnabled: false,
  runtimeDatabaseReadsEnabled: false,
  runtimeDatabaseWritesEnabled: false,
  schemaMigrationEnabled: false,
  supabaseRuntimeEnabled: false,
  noBypassingRlsUserOwnership: true,
  noUnreviewedTrackerWrites: true,
} as const;

export const CUSTOM_TRACKER_REPOSITORY_OPERATIONS: readonly CustomTrackerRepositoryOperation[] = [
  "create_tracker",
  "read_tracker",
  "change_tracker",
  "archive_tracker",
  "create_field",
  "change_field",
  "deprecate_field",
  "create_entry",
  "change_entry",
  "archive_entry",
  "place_dashboard_card",
  "change_dashboard_card",
  "approve_ai_mapping",
  "reject_ai_mapping",
];

export const CUSTOM_TRACKER_OWNERSHIP_RESOURCES: readonly CustomTrackerOwnershipResource[] = [
  "custom_tracker",
  "custom_tracker_field",
  "custom_tracker_entry",
  "dashboard_card",
  "ai_mapping_proposal",
];

export const CUSTOM_TRACKER_AUDIT_EVENT_KINDS: readonly CustomTrackerAuditEventKind[] = [
  "tracker_created",
  "tracker_changed",
  "tracker_archived",
  "field_created",
  "field_changed",
  "field_deprecated",
  "entry_created",
  "entry_changed",
  "entry_archived",
  "dashboard_placement_changed",
  "ai_mapping_approved",
  "ai_mapping_rejected",
  "ownership_check_failed",
  "rls_policy_blocked",
];

export const CUSTOM_TRACKER_WRITE_OPERATIONS: readonly CustomTrackerRepositoryOperation[] = [
  "create_tracker",
  "change_tracker",
  "archive_tracker",
  "create_field",
  "change_field",
  "deprecate_field",
  "create_entry",
  "change_entry",
  "archive_entry",
  "place_dashboard_card",
  "change_dashboard_card",
  "approve_ai_mapping",
  "reject_ai_mapping",
];

function isCustomTrackerWriteOperation(operation: CustomTrackerRepositoryOperation): boolean {
  return CUSTOM_TRACKER_WRITE_OPERATIONS.includes(operation);
}

function normalizeCustomTrackerOwnerId(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function validateCustomTrackerOwnership(
  subject: CustomTrackerOwnershipSubject,
  resource: CustomTrackerOwnershipResourceInput,
): CustomTrackerOwnershipDecision {
  const reasons: string[] = [];
  const authUserId = normalizeCustomTrackerOwnerId(subject.authUserId);
  const subjectUserId = normalizeCustomTrackerOwnerId(subject.userId);
  const ownerId = normalizeCustomTrackerOwnerId(resource.ownerId);
  const resourceId = normalizeCustomTrackerOwnerId(resource.resourceId);

  if (!authUserId) reasons.push("missing authenticated user");
  if (!subjectUserId) reasons.push("missing subject user id");
  if (!resourceId) reasons.push("missing resource id");
  if (!ownerId) reasons.push("missing owner id");

  if (resource.isSystemResource === true && subject.role !== "system") {
    reasons.push("system resource is blocked for non-system subject");
  }

  if (authUserId && subjectUserId && authUserId !== subjectUserId) {
    reasons.push("authenticated user and subject user do not match");
  }

  if (subjectUserId && ownerId && subjectUserId !== ownerId) {
    reasons.push("owner mismatch blocks cross-user access");
  }

  const parentTrackerId = normalizeCustomTrackerOwnerId(resource.parentTrackerId);
  const trackerId = normalizeCustomTrackerOwnerId(resource.trackerId);

  if (
    (resource.resourceKind === "custom_tracker_field" ||
      resource.resourceKind === "custom_tracker_entry" ||
      resource.resourceKind === "dashboard_card") &&
    !trackerId
  ) {
    reasons.push("tracker id is required for child resource ownership");
  }

  if (parentTrackerId && trackerId && parentTrackerId !== trackerId) {
    reasons.push("tracker id and parent tracker id mismatch");
  }

  const parentFieldId = normalizeCustomTrackerOwnerId(resource.parentFieldId);
  const fieldId = normalizeCustomTrackerOwnerId(resource.fieldId);

  if (parentFieldId && fieldId && parentFieldId !== fieldId) {
    reasons.push("field id and parent field id mismatch");
  }

  const dashboardCardOwnerId = normalizeCustomTrackerOwnerId(resource.dashboardCardOwnerId);

  if (
    resource.resourceKind === "dashboard_card" &&
    dashboardCardOwnerId &&
    subjectUserId &&
    dashboardCardOwnerId !== subjectUserId
  ) {
    reasons.push("dashboard card owner mismatch");
  }

  let policyStatus: CustomTrackerRlsPolicyStatus = "ready";

  if (!authUserId) {
    policyStatus = "missing_auth_user";
  } else if (!ownerId) {
    policyStatus = "missing_owner_id";
  } else if (subjectUserId && ownerId && subjectUserId !== ownerId) {
    policyStatus = "owner_mismatch";
  } else if (parentTrackerId && trackerId && parentTrackerId !== trackerId) {
    policyStatus = "tracker_owner_mismatch";
  } else if (parentFieldId && fieldId && parentFieldId !== fieldId) {
    policyStatus = "field_tracker_mismatch";
  } else if (
    resource.resourceKind === "dashboard_card" &&
    dashboardCardOwnerId &&
    subjectUserId &&
    dashboardCardOwnerId !== subjectUserId
  ) {
    policyStatus = "dashboard_owner_mismatch";
  } else if (resource.isSystemResource === true && subject.role !== "system") {
    policyStatus = "system_resource_blocked";
  }

  return {
    status: reasons.length === 0 ? "allowed" : "blocked",
    policyStatus,
    resourceKind: resource.resourceKind,
    resourceId,
    reasons,
    requiresReviewBeforeWrite: false,
    runtimeWriteAllowed: false,
    runtimeDatabaseReadAllowed: false,
    runtimeDatabaseWriteAllowed: false,
    crossUserAccessAllowed: false,
  };
}

export function assertCustomTrackerRlsBoundary(input: CustomTrackerRlsPolicyInput): CustomTrackerRlsPolicyDecision {
  const ownershipDecision = validateCustomTrackerOwnership(input.subject, input.resource);
  const operationIsWrite = isCustomTrackerWriteOperation(input.operation);
  const approvedByUser = input.approvedByUser === true;
  const reviewQueueItemId = normalizeCustomTrackerOwnerId(input.reviewQueueItemId);
  const reasons = [...ownershipDecision.reasons];

  if (operationIsWrite && !approvedByUser) {
    reasons.push("write operation requires explicit user approval");
  }

  if (operationIsWrite && !reviewQueueItemId) {
    reasons.push("write operation requires review queue reference");
  }

  const allowed = ownershipDecision.status === "allowed" && (!operationIsWrite || (approvedByUser && Boolean(reviewQueueItemId)));

  let status: CustomTrackerRlsPolicyStatus = ownershipDecision.policyStatus;

  if (status === "ready" && operationIsWrite && (!approvedByUser || !reviewQueueItemId)) {
    status = "review_required";
  }

  return {
    operation: input.operation,
    status,
    allowed,
    reasons,
    permissionBoundary: operationIsWrite ? "write_after_approval" : "read",
    requiresAuditEvent: operationIsWrite || ownershipDecision.status !== "allowed",
    requiresReviewBeforeWrite: operationIsWrite,
    runtimeWriteAllowed: false,
    runtimeDatabaseReadAllowed: false,
    runtimeDatabaseWriteAllowed: false,
  };
}

export function mapCustomTrackerOperationToAuditEvent(
  operation: CustomTrackerRepositoryOperation,
  allowed: boolean,
): CustomTrackerAuditEventKind {
  if (!allowed) return "rls_policy_blocked";

  switch (operation) {
    case "create_tracker":
      return "tracker_created";
    case "change_tracker":
      return "tracker_changed";
    case "archive_tracker":
      return "tracker_archived";
    case "create_field":
      return "field_created";
    case "change_field":
      return "field_changed";
    case "deprecate_field":
      return "field_deprecated";
    case "create_entry":
      return "entry_created";
    case "change_entry":
      return "entry_changed";
    case "archive_entry":
      return "entry_archived";
    case "place_dashboard_card":
    case "change_dashboard_card":
      return "dashboard_placement_changed";
    case "approve_ai_mapping":
      return "ai_mapping_approved";
    case "reject_ai_mapping":
      return "ai_mapping_rejected";
    case "read_tracker":
      return "tracker_changed";
  }
}

export function buildCustomTrackerAuditEventContract(
  input: CustomTrackerRepositoryBoundaryInput,
  rlsDecision: CustomTrackerRlsPolicyDecision,
): CustomTrackerAuditEventContract {
  const resource = input.resource;
  const subjectUserId = normalizeCustomTrackerOwnerId(input.subject.userId);
  const ownerId = normalizeCustomTrackerOwnerId(resource.ownerId);
  const resourceId = normalizeCustomTrackerOwnerId(resource.resourceId);
  const trackerId = normalizeCustomTrackerOwnerId(resource.trackerId);

  const severity: CustomTrackerAuditSeverity = rlsDecision.allowed
    ? "info"
    : rlsDecision.status === "review_required"
      ? "warning"
      : "security";

  return {
    eventKind: mapCustomTrackerOperationToAuditEvent(input.operation, rlsDecision.allowed),
    resourceKind: resource.resourceKind,
    resourceId,
    trackerId,
    actorUserId: subjectUserId,
    ownerId,
    severity,
    reason: rlsDecision.reasons.length > 0 ? rlsDecision.reasons.join("; ") : "repository boundary check passed",
    metadata: {
      operation: input.operation,
      policyStatus: rlsDecision.status,
      allowed: rlsDecision.allowed,
      reviewQueueItemId: normalizeCustomTrackerOwnerId(input.reviewQueueItemId),
      requiresReviewBeforeWrite: rlsDecision.requiresReviewBeforeWrite,
    },
    persistenceRequiredBeforeRuntimeWrite: true,
    runtimeAuditWriteAllowed: false,
  };
}

export function evaluateCustomTrackerRepositoryBoundary(
  input: CustomTrackerRepositoryBoundaryInput,
): CustomTrackerRepositoryBoundaryDecision {
  const ownershipDecision = validateCustomTrackerOwnership(input.subject, input.resource);
  const rlsDecision = assertCustomTrackerRlsBoundary({
    subject: input.subject,
    resource: input.resource,
    operation: input.operation,
    approvedByUser: input.approvedByUser,
    reviewQueueItemId: input.reviewQueueItemId,
  });
  const auditEvent = buildCustomTrackerAuditEventContract(input, rlsDecision);

  return {
    operation: input.operation,
    ownershipDecision,
    rlsDecision,
    auditEvent,
    canProceedToFutureRepositoryWrite: rlsDecision.allowed && isCustomTrackerWriteOperation(input.operation),
    runtimeRepositoryEnabled: false,
    runtimeWritesEnabled: false,
    runtimeDatabaseReadsEnabled: false,
    runtimeDatabaseWritesEnabled: false,
    schemaMigrationEnabled: false,
    supabaseRuntimeEnabled: false,
  };
}

export function validateCustomTrackerFieldOwnershipThroughTracker(input: {
  subject: CustomTrackerOwnershipSubject;
  trackerOwnerId: string | null;
  trackerId: string | null;
  fieldTrackerId: string | null;
  fieldId: string | null;
}): CustomTrackerOwnershipDecision {
  return validateCustomTrackerOwnership(input.subject, {
    resourceKind: "custom_tracker_field",
    resourceId: input.fieldId,
    ownerId: input.trackerOwnerId,
    trackerId: input.fieldTrackerId,
    parentTrackerId: input.trackerId,
  });
}

export function validateCustomTrackerEntryOwnershipThroughTracker(input: {
  subject: CustomTrackerOwnershipSubject;
  trackerOwnerId: string | null;
  trackerId: string | null;
  entryTrackerId: string | null;
  entryId: string | null;
}): CustomTrackerOwnershipDecision {
  return validateCustomTrackerOwnership(input.subject, {
    resourceKind: "custom_tracker_entry",
    resourceId: input.entryId,
    ownerId: input.trackerOwnerId,
    trackerId: input.entryTrackerId,
    parentTrackerId: input.trackerId,
  });
}

export function validateCustomTrackerDashboardCardOwnership(input: {
  subject: CustomTrackerOwnershipSubject;
  trackerOwnerId: string | null;
  trackerId: string | null;
  dashboardCardId: string | null;
  dashboardCardOwnerId: string | null;
}): CustomTrackerOwnershipDecision {
  return validateCustomTrackerOwnership(input.subject, {
    resourceKind: "dashboard_card",
    resourceId: input.dashboardCardId,
    ownerId: input.trackerOwnerId,
    trackerId: input.trackerId,
    parentTrackerId: input.trackerId,
    dashboardCardOwnerId: input.dashboardCardOwnerId,
  });
}

export function blockCustomTrackerCrossUserReference(input: {
  subjectUserId: string | null;
  ownerId: string | null;
  trackerId: string | null;
  fieldId?: string | null;
}): CustomTrackerOwnershipDecision {
  const subject: CustomTrackerOwnershipSubject = {
    userId: input.subjectUserId,
    authUserId: input.subjectUserId,
    role: "owner",
  };

  return validateCustomTrackerOwnership(subject, {
    resourceKind: input.fieldId ? "custom_tracker_field" : "custom_tracker",
    resourceId: input.fieldId ?? input.trackerId,
    ownerId: input.ownerId,
    trackerId: input.trackerId,
    parentTrackerId: input.trackerId,
    fieldId: input.fieldId,
    parentFieldId: input.fieldId,
  });
}

export function assertNoBypassingCustomTrackerRlsOwnership(
  boundary: CustomTrackerRepositoryRlsAuditSummary = summarizeCustomTrackerRepositoryRlsAuditBoundary(),
): true {
  if (boundary.noBypassingRlsUserOwnership !== true) {
    throw new Error("custom tracker RLS ownership boundary cannot be bypassed");
  }

  if (boundary.runtimeDatabaseReadsEnabled !== false || boundary.runtimeDatabaseWritesEnabled !== false) {
    throw new Error("custom tracker repository runtime database access is disabled in Phase 19L");
  }

  if (boundary.runtimeWritesEnabled !== false) {
    throw new Error("custom tracker runtime writes are disabled in Phase 19L");
  }

  return true;
}

export function summarizeCustomTrackerRepositoryRlsAuditBoundary(): CustomTrackerRepositoryRlsAuditSummary {
  return {
    phase: "19L",
    repositoryBoundaryEnabled: true,
    rlsBoundaryEnabled: true,
    auditTrailContractEnabled: true,
    trackerOwnershipValidationEnabled: true,
    fieldOwnershipValidationThroughTrackerEnabled: true,
    entryOwnershipValidationThroughTrackerEnabled: true,
    dashboardCardOwnershipValidationEnabled: true,
    trackerIdFieldIdCrossUserProtectionEnabled: true,
    runtimeRepositoryEnabled: false,
    runtimeWritesEnabled: false,
    runtimeDatabaseReadsEnabled: false,
    runtimeDatabaseWritesEnabled: false,
    schemaMigrationEnabled: false,
    supabaseRuntimeEnabled: false,
    noBypassingRlsUserOwnership: true,
    noUnreviewedTrackerWrites: true,
  };
}
