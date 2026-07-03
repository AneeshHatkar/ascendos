import type {
  CustomTrackerDomain,
  CustomTrackerPrivacyLevel,
} from "./core-tracker-domain-contracts";
import type {
  CustomTrackerCoreFieldKind,
} from "./core-tracker-domain-contracts";
import type {
  CustomTrackerFrequencyRule,
} from "./template-frequency-semantics";
import type {
  CustomTrackerCarnosPermissionSet,
} from "./privacy-carnos-permissions";

export type CustomTrackerAiProposalState =
  | "draft"
  | "needs_review"
  | "approved"
  | "rejected"
  | "expired";

export type CustomTrackerCarnosProposalKind =
  | "tracker_creation"
  | "tracker_improvement"
  | "field_mapping"
  | "message_to_entry";

export type CustomTrackerReviewQueueDecision =
  | "approve"
  | "reject"
  | "request_changes"
  | "expire";

export type CustomTrackerProposalValidationStatus =
  | "valid_for_review"
  | "needs_review"
  | "invalid"
  | "expired";

export type CustomTrackerProposalSourceKind =
  | "carnos_chat"
  | "document_mapping"
  | "web_source_mapping"
  | "manual_review"
  | "memory_candidate";

export type CustomTrackerProposedField = {
  stableKey: string;
  displayName: string;
  fieldKind: CustomTrackerCoreFieldKind;
  required: boolean;
  privacyLevel: CustomTrackerPrivacyLevel;
  reason: string;
};

export type CustomTrackerCreationProposal = {
  proposalId: string;
  proposalKind: "tracker_creation";
  state: CustomTrackerAiProposalState;
  sourceKind: CustomTrackerProposalSourceKind;
  proposedTrackerName: string;
  proposedStableKey: string;
  proposedDomain: CustomTrackerDomain;
  proposedPrivacyLevel: CustomTrackerPrivacyLevel;
  proposedFrequencyRule: CustomTrackerFrequencyRule | null;
  proposedFields: ReadonlyArray<CustomTrackerProposedField>;
  rationale: string;
  createdAtIso: string;
  expiresAtIso: string;
};

export type CustomTrackerImprovementProposal = {
  proposalId: string;
  proposalKind: "tracker_improvement";
  state: CustomTrackerAiProposalState;
  sourceKind: CustomTrackerProposalSourceKind;
  trackerId: string;
  proposedSummary: string;
  proposedFieldAdditions: ReadonlyArray<CustomTrackerProposedField>;
  proposedFieldDeprecations: ReadonlyArray<string>;
  proposedPrivacyLevel: CustomTrackerPrivacyLevel | null;
  rationale: string;
  createdAtIso: string;
  expiresAtIso: string;
};

export type CustomTrackerFieldMappingProposal = {
  proposalId: string;
  proposalKind: "field_mapping";
  state: CustomTrackerAiProposalState;
  sourceKind: CustomTrackerProposalSourceKind;
  trackerId: string;
  sourceReferenceId: string | null;
  mappedFieldValues: Record<string, unknown>;
  confidence: number;
  rationale: string;
  createdAtIso: string;
  expiresAtIso: string;
};

export type CustomTrackerMessageToEntryProposal = {
  proposalId: string;
  proposalKind: "message_to_entry";
  state: CustomTrackerAiProposalState;
  sourceKind: CustomTrackerProposalSourceKind;
  trackerId: string;
  entryDate: string;
  proposedValuesJson: Record<string, unknown>;
  proposedNotes: string;
  phase19DEntryValidationRequired: true;
  rationale: string;
  createdAtIso: string;
  expiresAtIso: string;
};

export type CustomTrackerCarnosProposal =
  | CustomTrackerCreationProposal
  | CustomTrackerImprovementProposal
  | CustomTrackerFieldMappingProposal
  | CustomTrackerMessageToEntryProposal;

export type CustomTrackerReviewQueueItem = {
  queueItemId: string;
  proposalId: string;
  proposalKind: CustomTrackerCarnosProposalKind;
  state: CustomTrackerAiProposalState;
  requiresUserReview: boolean;
  requiresPhase19DEntryValidation: boolean;
  requiresPhase19GPrivacyValidation: boolean;
  memoryWriteAllowed: boolean;
  trackerWriteAllowed: boolean;
  entryWriteAllowed: boolean;
  silentWriteAllowed: boolean;
  createdAtIso: string;
  expiresAtIso: string;
};

export type CustomTrackerProposalValidationIssue = {
  code: string;
  message: string;
  severity: "error" | "warning";
};

export type CustomTrackerProposalValidationResult = {
  status: CustomTrackerProposalValidationStatus;
  proposalId: string;
  proposalKind: CustomTrackerCarnosProposalKind;
  state: CustomTrackerAiProposalState;
  expired: boolean;
  validForReview: boolean;
  requiresUserReview: boolean;
  issues: ReadonlyArray<CustomTrackerProposalValidationIssue>;
};

export type CustomTrackerReviewDecisionResult = {
  proposalId: string;
  decision: CustomTrackerReviewQueueDecision;
  fromState: CustomTrackerAiProposalState;
  toState: CustomTrackerAiProposalState;
  allowed: boolean;
  writeStillRequiresSeparatePersistenceLayer: boolean;
  reason: string;
};

export type CustomTrackerCarnosProposalBoundarySummary = {
  trackerCreationProposalsEnabled: boolean;
  trackerImprovementProposalsEnabled: boolean;
  fieldMappingProposalsEnabled: boolean;
  messageToEntryProposalsEnabled: boolean;
  reviewBeforeWriteRequired: boolean;
  silentTrackerCreationAllowed: boolean;
  silentTrackerEntryLoggingAllowed: boolean;
  silentTrackerEditsAllowed: boolean;
  silentMemoryWritesAllowed: boolean;
};

export const PHASE_19H_CARNOS_PROPOSAL_BOUNDARY = {
  phase: "19H",
  trackerCreationProposalsEnabled: true,
  trackerImprovementProposalsEnabled: true,
  fieldMappingProposalsEnabled: true,
  messageToEntryProposalsEnabled: true,
  reviewBeforeWriteRequired: true,
  phase19DEntryValidationRequired: true,
  phase19GPrivacyValidationRequired: true,
  proposalExpirationEnabled: true,
  silentTrackerCreationAllowed: false,
  silentTrackerEntryLoggingAllowed: false,
  silentTrackerEditsAllowed: false,
  silentMemoryWritesAllowed: false,
  runtimeWritesEnabled: false,
  schemaMigrationEnabled: false,
  databaseReadsEnabled: false,
  databaseWritesEnabled: false,
  carnosRuntimeWritesEnabled: false,
} as const;

export const CUSTOM_TRACKER_AI_PROPOSAL_STATES: ReadonlyArray<CustomTrackerAiProposalState> = [
  "draft",
  "needs_review",
  "approved",
  "rejected",
  "expired",
];

export const CUSTOM_TRACKER_CARNOS_PROPOSAL_KINDS: ReadonlyArray<CustomTrackerCarnosProposalKind> = [
  "tracker_creation",
  "tracker_improvement",
  "field_mapping",
  "message_to_entry",
];

export const CUSTOM_TRACKER_REVIEW_QUEUE_DECISIONS: ReadonlyArray<CustomTrackerReviewQueueDecision> = [
  "approve",
  "reject",
  "request_changes",
  "expire",
];

function isIsoDateTime(value: string): boolean {
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) && value.includes("T");
}

export function isCustomTrackerProposalExpired(proposal: CustomTrackerCarnosProposal, nowIso: string): boolean {
  const now = new Date(nowIso).getTime();
  const expiresAt = new Date(proposal.expiresAtIso).getTime();

  if (!Number.isFinite(now) || !Number.isFinite(expiresAt)) return true;

  return expiresAt <= now || proposal.state === "expired";
}

export function buildCustomTrackerReviewQueueItem(
  proposal: CustomTrackerCarnosProposal,
): CustomTrackerReviewQueueItem {
  return {
    queueItemId: "review_" + proposal.proposalId,
    proposalId: proposal.proposalId,
    proposalKind: proposal.proposalKind,
    state: proposal.state,
    requiresUserReview: true,
    requiresPhase19DEntryValidation: proposal.proposalKind === "message_to_entry" || proposal.proposalKind === "field_mapping",
    requiresPhase19GPrivacyValidation: true,
    memoryWriteAllowed: false,
    trackerWriteAllowed: false,
    entryWriteAllowed: false,
    silentWriteAllowed: false,
    createdAtIso: proposal.createdAtIso,
    expiresAtIso: proposal.expiresAtIso,
  };
}

function addIssue(
  issues: CustomTrackerProposalValidationIssue[],
  code: string,
  message: string,
  severity: "error" | "warning",
): void {
  issues.push({ code, message, severity });
}

export function validateCustomTrackerProposal(
  proposal: CustomTrackerCarnosProposal,
  nowIso: string,
): CustomTrackerProposalValidationResult {
  const issues: CustomTrackerProposalValidationIssue[] = [];

  if (proposal.proposalId.trim().length === 0) {
    addIssue(issues, "missing_proposal_id", "proposal id is required", "error");
  }

  if (!CUSTOM_TRACKER_AI_PROPOSAL_STATES.includes(proposal.state)) {
    addIssue(issues, "invalid_state", "AI proposal state is not allowed", "error");
  }

  if (!CUSTOM_TRACKER_CARNOS_PROPOSAL_KINDS.includes(proposal.proposalKind)) {
    addIssue(issues, "invalid_kind", "Carnos proposal kind is not allowed", "error");
  }

  if (!isIsoDateTime(proposal.createdAtIso)) {
    addIssue(issues, "invalid_created_at", "proposal createdAtIso must be an ISO datetime", "error");
  }

  if (!isIsoDateTime(proposal.expiresAtIso)) {
    addIssue(issues, "invalid_expires_at", "proposal expiresAtIso must be an ISO datetime", "error");
  }

  if (proposal.rationale.trim().length === 0) {
    addIssue(issues, "missing_rationale", "proposal rationale is required for review", "error");
  }

  if (proposal.state === "approved") {
    addIssue(issues, "approved_still_needs_persistence_boundary", "approved proposal still requires a separate persistence layer", "warning");
  }

  if (proposal.proposalKind === "tracker_creation") {
    validateCustomTrackerCreationProposal(proposal, issues);
  }

  if (proposal.proposalKind === "tracker_improvement") {
    validateCustomTrackerImprovementProposal(proposal, issues);
  }

  if (proposal.proposalKind === "field_mapping") {
    validateCustomTrackerFieldMappingProposal(proposal, issues);
  }

  if (proposal.proposalKind === "message_to_entry") {
    validateCustomTrackerMessageToEntryProposal(proposal, issues);
  }

  const expired = isCustomTrackerProposalExpired(proposal, nowIso);

  if (expired) {
    addIssue(issues, "proposal_expired", "proposal is expired and cannot be approved", "error");
  }

  const hasErrors = issues.some((issue) => issue.severity === "error");

  return {
    status: expired ? "expired" : hasErrors ? "invalid" : proposal.state === "draft" ? "needs_review" : "valid_for_review",
    proposalId: proposal.proposalId,
    proposalKind: proposal.proposalKind,
    state: proposal.state,
    expired,
    validForReview: !expired && !hasErrors,
    requiresUserReview: true,
    issues,
  };
}

export function validateCustomTrackerCreationProposal(
  proposal: CustomTrackerCreationProposal,
  issues: CustomTrackerProposalValidationIssue[],
): void {
  if (proposal.proposedTrackerName.trim().length === 0) {
    addIssue(issues, "missing_tracker_name", "tracker creation proposal requires a tracker name", "error");
  }

  if (proposal.proposedStableKey.trim().length === 0) {
    addIssue(issues, "missing_stable_key", "tracker creation proposal requires a stable key", "error");
  }

  if (proposal.proposedFields.length === 0) {
    addIssue(issues, "missing_fields", "tracker creation proposal requires at least one proposed field", "error");
  }

  for (const field of proposal.proposedFields) {
    if (field.stableKey.trim().length === 0) {
      addIssue(issues, "missing_field_key", "proposed field stable key is required", "error");
    }

    if (field.reason.trim().length === 0) {
      addIssue(issues, "missing_field_reason", "proposed field requires a reason", "warning");
    }
  }
}

export function validateCustomTrackerImprovementProposal(
  proposal: CustomTrackerImprovementProposal,
  issues: CustomTrackerProposalValidationIssue[],
): void {
  if (proposal.trackerId.trim().length === 0) {
    addIssue(issues, "missing_tracker_id", "tracker improvement proposal requires tracker id", "error");
  }

  if (proposal.proposedSummary.trim().length === 0) {
    addIssue(issues, "missing_improvement_summary", "tracker improvement proposal requires summary", "error");
  }

  if (proposal.proposedFieldAdditions.length === 0 && proposal.proposedFieldDeprecations.length === 0 && proposal.proposedPrivacyLevel === null) {
    addIssue(issues, "empty_improvement", "tracker improvement proposal must include a concrete change", "error");
  }
}

export function validateCustomTrackerFieldMappingProposal(
  proposal: CustomTrackerFieldMappingProposal,
  issues: CustomTrackerProposalValidationIssue[],
): void {
  if (proposal.trackerId.trim().length === 0) {
    addIssue(issues, "missing_tracker_id", "field mapping proposal requires tracker id", "error");
  }

  if (proposal.confidence < 0 || proposal.confidence > 1) {
    addIssue(issues, "invalid_confidence", "field mapping confidence must be between 0 and 1", "error");
  }

  if (Object.keys(proposal.mappedFieldValues).length === 0) {
    addIssue(issues, "empty_field_mapping", "field mapping proposal requires mapped values", "error");
  }

  addIssue(issues, "phase19d_entry_validation_required", "field mapping proposal must pass Phase 19D entry validation before write", "warning");
}

export function validateCustomTrackerMessageToEntryProposal(
  proposal: CustomTrackerMessageToEntryProposal,
  issues: CustomTrackerProposalValidationIssue[],
): void {
  if (proposal.trackerId.trim().length === 0) {
    addIssue(issues, "missing_tracker_id", "message-to-entry proposal requires tracker id", "error");
  }

  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(proposal.entryDate)) {
    addIssue(issues, "invalid_entry_date", "message-to-entry proposal entry date must use YYYY-MM-DD", "error");
  }

  if (Object.keys(proposal.proposedValuesJson).length === 0) {
    addIssue(issues, "empty_values_json", "message-to-entry proposal requires proposed values_json", "error");
  }

  if (proposal.phase19DEntryValidationRequired !== true) {
    addIssue(issues, "phase19d_entry_validation_not_required", "message-to-entry proposal must require Phase 19D validation", "error");
  }

  addIssue(issues, "phase19d_entry_validation_required", "message-to-entry proposal must pass Phase 19D entry validation before write", "warning");
}

export function evaluateCustomTrackerProposalPrivacyGate(input: {
  proposal: CustomTrackerCarnosProposal;
  carnosPermissions: CustomTrackerCarnosPermissionSet;
}): CustomTrackerProposalValidationIssue[] {
  const issues: CustomTrackerProposalValidationIssue[] = [];

  if (!input.carnosPermissions.suggestion) {
    addIssue(issues, "phase19g_suggestion_permission_required", "proposal requires Phase 19G Carnos suggestion permission", "error");
  }

  if (input.proposal.proposalKind === "message_to_entry" && !input.carnosPermissions.read) {
    addIssue(issues, "phase19g_read_permission_required", "entry proposal requires Phase 19G Carnos read permission", "error");
  }

  if (input.carnosPermissions.memoryCandidate) {
    addIssue(issues, "memory_candidate_review_required", "memory candidate proposals require review before memory write", "warning");
  }

  return issues;
}

export function applyCustomTrackerReviewDecision(input: {
  proposal: CustomTrackerCarnosProposal;
  decision: CustomTrackerReviewQueueDecision;
  nowIso: string;
}): CustomTrackerReviewDecisionResult {
  const expired = isCustomTrackerProposalExpired(input.proposal, input.nowIso);

  if (expired || input.decision === "expire") {
    return {
      proposalId: input.proposal.proposalId,
      decision: input.decision,
      fromState: input.proposal.state,
      toState: "expired",
      allowed: true,
      writeStillRequiresSeparatePersistenceLayer: true,
      reason: "proposal is expired or explicitly expired",
    };
  }

  if (input.decision === "approve" && input.proposal.state !== "needs_review") {
    return {
      proposalId: input.proposal.proposalId,
      decision: input.decision,
      fromState: input.proposal.state,
      toState: input.proposal.state,
      allowed: false,
      writeStillRequiresSeparatePersistenceLayer: true,
      reason: "only proposals in needs_review can be approved",
    };
  }

  if (input.decision === "approve") {
    return {
      proposalId: input.proposal.proposalId,
      decision: input.decision,
      fromState: input.proposal.state,
      toState: "approved",
      allowed: true,
      writeStillRequiresSeparatePersistenceLayer: true,
      reason: "approved proposal still requires separate user-approved persistence",
    };
  }

  if (input.decision === "reject") {
    return {
      proposalId: input.proposal.proposalId,
      decision: input.decision,
      fromState: input.proposal.state,
      toState: "rejected",
      allowed: true,
      writeStillRequiresSeparatePersistenceLayer: true,
      reason: "proposal is rejected and no tracker, entry, or memory write is allowed",
    };
  }

  return {
    proposalId: input.proposal.proposalId,
    decision: input.decision,
    fromState: input.proposal.state,
    toState: "needs_review",
    allowed: true,
    writeStillRequiresSeparatePersistenceLayer: true,
    reason: "proposal requires changes and remains in review",
  };
}

export function assertNoSilentCustomTrackerProposalWrites(
  queueItem: CustomTrackerReviewQueueItem,
): boolean {
  return queueItem.memoryWriteAllowed === false &&
    queueItem.trackerWriteAllowed === false &&
    queueItem.entryWriteAllowed === false &&
    queueItem.silentWriteAllowed === false;
}

export function summarizeCustomTrackerCarnosProposalBoundary(): CustomTrackerCarnosProposalBoundarySummary {
  return {
    trackerCreationProposalsEnabled: PHASE_19H_CARNOS_PROPOSAL_BOUNDARY.trackerCreationProposalsEnabled,
    trackerImprovementProposalsEnabled: PHASE_19H_CARNOS_PROPOSAL_BOUNDARY.trackerImprovementProposalsEnabled,
    fieldMappingProposalsEnabled: PHASE_19H_CARNOS_PROPOSAL_BOUNDARY.fieldMappingProposalsEnabled,
    messageToEntryProposalsEnabled: PHASE_19H_CARNOS_PROPOSAL_BOUNDARY.messageToEntryProposalsEnabled,
    reviewBeforeWriteRequired: true,
    silentTrackerCreationAllowed: false,
    silentTrackerEntryLoggingAllowed: false,
    silentTrackerEditsAllowed: false,
    silentMemoryWritesAllowed: false,
  };
}
