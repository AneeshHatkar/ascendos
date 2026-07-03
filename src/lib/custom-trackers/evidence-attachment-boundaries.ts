import type {
  CustomTrackerDomain,
  CustomTrackerPrivacyLevel,
} from "./core-tracker-domain-contracts";

export type CustomTrackerEvidenceAttachmentKind =
  | "document"
  | "note"
  | "web_source"
  | "timeline_record"
  | "memory_candidate"
  | "external_reference";

export type CustomTrackerSourceFreshnessStatus =
  | "current"
  | "recent"
  | "stale"
  | "unknown"
  | "not_applicable";

export type CustomTrackerEvidenceReviewStatus =
  | "draft"
  | "needs_review"
  | "approved"
  | "rejected"
  | "expired";

export type CustomTrackerEvidenceTrustLevel =
  | "unsupported"
  | "weak"
  | "moderate"
  | "strong"
  | "restricted";

export type CustomTrackerCarnosEvidenceMappingStatus =
  | "not_allowed"
  | "proposal_required"
  | "ready_for_review"
  | "blocked";

export type CustomTrackerAttachmentPrivacyDecision =
  | "allowed"
  | "review_required"
  | "blocked";

export type CustomTrackerEvidenceSourceReference = {
  sourceId: string;
  kind: CustomTrackerEvidenceAttachmentKind;
  label: string;
  sourceUri?: string;
  capturedAt?: string;
  freshnessStatus: CustomTrackerSourceFreshnessStatus;
  trustLevel: CustomTrackerEvidenceTrustLevel;
  reviewStatus: CustomTrackerEvidenceReviewStatus;
};

export type CustomTrackerSavedDocumentReferenceBoundary = {
  documentId: string;
  title: string;
  knowledgeVaultCompatible: boolean;
  memoryRagCompatible: boolean;
  extractedTextRuntimeEnabled: false;
  documentIngestionRuntimeEnabled: false;
};

export type CustomTrackerWebSourceReferenceBoundary = {
  webSourceId: string;
  title: string;
  sourceUri: string;
  capturedAt: string;
  freshnessStatus: CustomTrackerSourceFreshnessStatus;
  freshnessDisclosureRequired: boolean;
  currentInfoCompatible: boolean;
  networkCallsEnabled: false;
};

export type CustomTrackerEvidenceAttachmentInput = {
  trackerId: string;
  entryId?: string;
  domain: CustomTrackerDomain;
  trackerPrivacyLevel: CustomTrackerPrivacyLevel;
  kind: CustomTrackerEvidenceAttachmentKind;
  sourceId: string;
  label: string;
  sourceUri?: string;
  capturedAt?: string;
  userApprovedAttachment: boolean;
  userApprovedSensitiveExposure: boolean;
};

export type CustomTrackerEvidenceAttachmentResult = {
  accepted: boolean;
  privacyDecision: CustomTrackerAttachmentPrivacyDecision;
  sourceReference: CustomTrackerEvidenceSourceReference;
  requiredReviews: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
  runtimeWritesEnabled: false;
  fakeEvidenceAllowed: false;
};

export type CustomTrackerEvidenceLink = {
  trackerId: string;
  entryId?: string;
  sourceId: string;
  kind: CustomTrackerEvidenceAttachmentKind;
  label: string;
  canAttachToEntry: boolean;
  canAttachToTracker: boolean;
  requiresReviewBeforePersistence: boolean;
  persistenceEnabled: false;
};

export type CustomTrackerCarnosEvidenceMappingInput = {
  trackerId: string;
  trackerPrivacyLevel: CustomTrackerPrivacyLevel;
  sourceKind: CustomTrackerEvidenceAttachmentKind;
  sourceFreshnessStatus: CustomTrackerSourceFreshnessStatus;
  userApprovedCarnosSuggestion: boolean;
  userApprovedMemoryCandidate: boolean;
  hasSourceDisclosure: boolean;
};

export type CustomTrackerCarnosEvidenceMappingDecision = {
  status: CustomTrackerCarnosEvidenceMappingStatus;
  canCreateTrackerProposal: boolean;
  canCreateEntryProposal: boolean;
  canCreateMemoryCandidateProposal: boolean;
  reviewBeforeWriteRequired: true;
  silentMappingAllowed: false;
  directWriteAllowed: false;
  reason: string;
  requiredReviews: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerEvidenceAttachmentReadinessInput = {
  trackerId: string;
  trackerPrivacyLevel: CustomTrackerPrivacyLevel;
  attachments: ReadonlyArray<CustomTrackerEvidenceAttachmentResult>;
};

export type CustomTrackerEvidenceAttachmentReadinessResult = {
  evidenceReady: boolean;
  approvedAttachmentCount: number;
  reviewRequiredCount: number;
  blockedAttachmentCount: number;
  hasFreshnessDisclosures: boolean;
  hasFakeEvidence: false;
  requiredReviews: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  errors: ReadonlyArray<string>;
};

export type CustomTrackerEvidenceAttachmentSummary = {
  documentSourceAttachmentBoundaryEnabled: boolean;
  savedDocumentReferenceBoundaryEnabled: boolean;
  knowledgeVaultCompatibilityEnabled: boolean;
  memoryRagCompatibilityEnabled: boolean;
  currentInfoWebSourceCompatibilityEnabled: boolean;
  webSourceReferenceAttachmentBoundaryEnabled: boolean;
  trackerEntryEvidenceLinksEnabled: boolean;
  carnosFreshnessDisclosureRequired: boolean;
  carnosMappingRequiresReview: boolean;
  runtimeFileIngestionEnabled: boolean;
  runtimeNetworkCallsEnabled: boolean;
  runtimeDatabaseWritesEnabled: boolean;
  fakeEvidenceAllowed: boolean;
};

export const PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARY = {
  phase: "19K",
  documentSourceAttachmentBoundaryEnabled: true,
  savedDocumentReferenceBoundaryEnabled: true,
  knowledgeVaultCompatibilityEnabled: true,
  memoryRagCompatibilityEnabled: true,
  currentInfoWebSourceCompatibilityEnabled: true,
  webSourceReferenceAttachmentBoundaryEnabled: true,
  trackerEntryEvidenceLinksEnabled: true,
  carnosFreshnessDisclosureRequired: true,
  carnosMappingRequiresReview: true,
  runtimeFileIngestionEnabled: false,
  runtimeNetworkCallsEnabled: false,
  runtimeDatabaseReadsEnabled: false,
  runtimeDatabaseWritesEnabled: false,
  schemaMigrationEnabled: false,
  fakeEvidenceAllowed: false,
  silentCarnosMappingAllowed: false,
} as const;

export const CUSTOM_TRACKER_EVIDENCE_ATTACHMENT_KINDS: ReadonlyArray<CustomTrackerEvidenceAttachmentKind> = [
  "document",
  "note",
  "web_source",
  "timeline_record",
  "memory_candidate",
  "external_reference",
];

export const CUSTOM_TRACKER_SOURCE_FRESHNESS_STATUSES: ReadonlyArray<CustomTrackerSourceFreshnessStatus> = [
  "current",
  "recent",
  "stale",
  "unknown",
  "not_applicable",
];

export const CUSTOM_TRACKER_EVIDENCE_REVIEW_STATUSES: ReadonlyArray<CustomTrackerEvidenceReviewStatus> = [
  "draft",
  "needs_review",
  "approved",
  "rejected",
  "expired",
];

export function isSupportedCustomTrackerEvidenceAttachmentKind(
  kind: string,
): kind is CustomTrackerEvidenceAttachmentKind {
  return CUSTOM_TRACKER_EVIDENCE_ATTACHMENT_KINDS.includes(kind as CustomTrackerEvidenceAttachmentKind);
}

export function normalizeCustomTrackerEvidenceLabel(label: string): string {
  const trimmed = label.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0) return "Untitled evidence";
  if (trimmed.length > 120) return trimmed.slice(0, 120);
  return trimmed;
}

export function requiresCustomTrackerFreshnessDisclosure(kind: CustomTrackerEvidenceAttachmentKind): boolean {
  return kind === "web_source" || kind === "external_reference";
}

export function evaluateCustomTrackerSourceFreshness(input: {
  kind: CustomTrackerEvidenceAttachmentKind;
  capturedAt?: string;
  currentDateIso?: string;
}): CustomTrackerSourceFreshnessStatus {
  if (!requiresCustomTrackerFreshnessDisclosure(input.kind)) return "not_applicable";
  if (!input.capturedAt) return "unknown";

  const captured = new Date(input.capturedAt);
  const current = input.currentDateIso ? new Date(input.currentDateIso) : new Date();

  if (Number.isNaN(captured.getTime()) || Number.isNaN(current.getTime())) return "unknown";

  const ageMs = current.getTime() - captured.getTime();
  const ageDays = ageMs / 86400000;

  if (ageDays < 0) return "unknown";
  if (ageDays <= 7) return "current";
  if (ageDays <= 45) return "recent";
  return "stale";
}

export function evaluateCustomTrackerEvidenceTrustLevel(input: {
  kind: CustomTrackerEvidenceAttachmentKind;
  hasSourceUri: boolean;
  reviewStatus: CustomTrackerEvidenceReviewStatus;
  freshnessStatus: CustomTrackerSourceFreshnessStatus;
  privacyLevel: CustomTrackerPrivacyLevel;
}): CustomTrackerEvidenceTrustLevel {
  if (input.privacyLevel === "restricted") return "restricted";
  if (input.reviewStatus === "rejected" || input.reviewStatus === "expired") return "unsupported";
  if (input.kind === "web_source" && !input.hasSourceUri) return "weak";
  if (input.freshnessStatus === "stale" || input.freshnessStatus === "unknown") return "weak";
  if (input.reviewStatus === "approved" && input.hasSourceUri) return "strong";
  if (input.reviewStatus === "approved") return "moderate";
  return "weak";
}

export function buildCustomTrackerEvidenceSourceReference(
  input: CustomTrackerEvidenceAttachmentInput,
): CustomTrackerEvidenceSourceReference {
  const freshnessStatus = evaluateCustomTrackerSourceFreshness({
    kind: input.kind,
    capturedAt: input.capturedAt,
  });
  const reviewStatus: CustomTrackerEvidenceReviewStatus = input.userApprovedAttachment ? "approved" : "needs_review";
  const trustLevel = evaluateCustomTrackerEvidenceTrustLevel({
    kind: input.kind,
    hasSourceUri: typeof input.sourceUri === "string" && input.sourceUri.trim().length > 0,
    reviewStatus,
    freshnessStatus,
    privacyLevel: input.trackerPrivacyLevel,
  });

  return {
    sourceId: input.sourceId,
    kind: input.kind,
    label: normalizeCustomTrackerEvidenceLabel(input.label),
    sourceUri: input.sourceUri,
    capturedAt: input.capturedAt,
    freshnessStatus,
    trustLevel,
    reviewStatus,
  };
}

export function validateCustomTrackerEvidenceAttachment(
  input: CustomTrackerEvidenceAttachmentInput,
): CustomTrackerEvidenceAttachmentResult {
  const requiredReviews: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!isSupportedCustomTrackerEvidenceAttachmentKind(input.kind)) {
    errors.push("unsupported evidence attachment kind");
  }

  if (input.sourceId.trim().length === 0) {
    errors.push("evidence source id is required");
  }

  if (requiresCustomTrackerFreshnessDisclosure(input.kind) && !input.capturedAt) {
    requiredReviews.push("source freshness disclosure is required");
  }

  if (input.kind === "web_source" && (!input.sourceUri || input.sourceUri.trim().length === 0)) {
    errors.push("web source reference attachment requires source uri");
  }

  if (input.trackerPrivacyLevel !== "standard" && !input.userApprovedSensitiveExposure) {
    requiredReviews.push("sensitive evidence exposure review required");
  }

  if (!input.userApprovedAttachment) {
    requiredReviews.push("evidence attachment requires review before persistence");
  }

  const sourceReference = buildCustomTrackerEvidenceSourceReference(input);
  if (sourceReference.freshnessStatus === "stale") {
    warnings.push("web source freshness disclosure is stale");
  }

  if (input.trackerPrivacyLevel === "restricted") {
    errors.push("restricted tracker evidence attachment is blocked");
  }

  const privacyDecision: CustomTrackerAttachmentPrivacyDecision =
    errors.length > 0 ? "blocked" :
    requiredReviews.length > 0 ? "review_required" :
    "allowed";

  return {
    accepted: privacyDecision === "allowed",
    privacyDecision,
    sourceReference,
    requiredReviews,
    warnings,
    errors,
    runtimeWritesEnabled: false,
    fakeEvidenceAllowed: false,
  };
}

export function buildCustomTrackerSavedDocumentReferenceBoundary(input: {
  documentId: string;
  title: string;
  knowledgeVaultCompatible: boolean;
  memoryRagCompatible: boolean;
}): CustomTrackerSavedDocumentReferenceBoundary {
  return {
    documentId: input.documentId,
    title: normalizeCustomTrackerEvidenceLabel(input.title),
    knowledgeVaultCompatible: input.knowledgeVaultCompatible,
    memoryRagCompatible: input.memoryRagCompatible,
    extractedTextRuntimeEnabled: false,
    documentIngestionRuntimeEnabled: false,
  };
}

export function buildCustomTrackerWebSourceReferenceBoundary(input: {
  webSourceId: string;
  title: string;
  sourceUri: string;
  capturedAt: string;
}): CustomTrackerWebSourceReferenceBoundary {
  const freshnessStatus = evaluateCustomTrackerSourceFreshness({
    kind: "web_source",
    capturedAt: input.capturedAt,
  });

  return {
    webSourceId: input.webSourceId,
    title: normalizeCustomTrackerEvidenceLabel(input.title),
    sourceUri: input.sourceUri,
    capturedAt: input.capturedAt,
    freshnessStatus,
    freshnessDisclosureRequired: true,
    currentInfoCompatible: true,
    networkCallsEnabled: false,
  };
}

export function buildCustomTrackerEvidenceLink(input: {
  trackerId: string;
  entryId?: string;
  sourceId: string;
  kind: CustomTrackerEvidenceAttachmentKind;
  label: string;
  userApprovedAttachment: boolean;
}): CustomTrackerEvidenceLink {
  return {
    trackerId: input.trackerId,
    entryId: input.entryId,
    sourceId: input.sourceId,
    kind: input.kind,
    label: normalizeCustomTrackerEvidenceLabel(input.label),
    canAttachToEntry: typeof input.entryId === "string" && input.entryId.trim().length > 0,
    canAttachToTracker: true,
    requiresReviewBeforePersistence: !input.userApprovedAttachment,
    persistenceEnabled: false,
  };
}

export function evaluateCustomTrackerCarnosEvidenceMapping(
  input: CustomTrackerCarnosEvidenceMappingInput,
): CustomTrackerCarnosEvidenceMappingDecision {
  const requiredReviews: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!input.userApprovedCarnosSuggestion) {
    requiredReviews.push("Carnos evidence mapping requires user approval");
  }

  if (input.sourceKind === "web_source" && !input.hasSourceDisclosure) {
    requiredReviews.push("Carnos web/current-info mapping requires source and freshness disclosure");
  }

  if (input.sourceFreshnessStatus === "stale" || input.sourceFreshnessStatus === "unknown") {
    warnings.push("Carnos mapping uses stale or unknown source freshness");
  }

  if (input.trackerPrivacyLevel !== "standard") {
    requiredReviews.push("Carnos mapping for non-standard tracker requires privacy review");
  }

  if (input.sourceKind === "memory_candidate" && !input.userApprovedMemoryCandidate) {
    requiredReviews.push("memory candidate mapping requires explicit review");
  }

  if (input.trackerPrivacyLevel === "restricted") {
    errors.push("restricted tracker blocks Carnos evidence mapping");
  }

  const status: CustomTrackerCarnosEvidenceMappingStatus =
    errors.length > 0 ? "blocked" :
    requiredReviews.length > 0 ? "proposal_required" :
    "ready_for_review";

  return {
    status,
    canCreateTrackerProposal: status === "ready_for_review",
    canCreateEntryProposal: status === "ready_for_review",
    canCreateMemoryCandidateProposal: status === "ready_for_review" && input.userApprovedMemoryCandidate,
    reviewBeforeWriteRequired: true,
    silentMappingAllowed: false,
    directWriteAllowed: false,
    reason: status === "ready_for_review"
      ? "Carnos can create a reviewed proposal with source and freshness disclosure"
      : "Carnos evidence mapping is blocked or requires proposal review",
    requiredReviews,
    warnings,
    errors,
  };
}

export function validateCustomTrackerEvidenceAttachmentReadiness(
  input: CustomTrackerEvidenceAttachmentReadinessInput,
): CustomTrackerEvidenceAttachmentReadinessResult {
  const requiredReviews: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  let approvedAttachmentCount = 0;
  let reviewRequiredCount = 0;
  let blockedAttachmentCount = 0;
  let hasFreshnessDisclosures = true;

  for (const attachment of input.attachments) {
    if (attachment.privacyDecision === "allowed") approvedAttachmentCount += 1;
    if (attachment.privacyDecision === "review_required") reviewRequiredCount += 1;
    if (attachment.privacyDecision === "blocked") blockedAttachmentCount += 1;

    if (
      requiresCustomTrackerFreshnessDisclosure(attachment.sourceReference.kind) &&
      attachment.sourceReference.freshnessStatus === "unknown"
    ) {
      hasFreshnessDisclosures = false;
    }

    for (const review of attachment.requiredReviews) requiredReviews.push(review);
    for (const warning of attachment.warnings) warnings.push(warning);
    for (const error of attachment.errors) errors.push(error);
  }

  if (input.trackerPrivacyLevel === "restricted") {
    errors.push("restricted tracker evidence readiness is blocked");
  }

  return {
    evidenceReady: errors.length === 0 && requiredReviews.length === 0 && blockedAttachmentCount === 0,
    approvedAttachmentCount,
    reviewRequiredCount,
    blockedAttachmentCount,
    hasFreshnessDisclosures,
    hasFakeEvidence: false,
    requiredReviews,
    warnings,
    errors,
  };
}

export function assertNoRuntimeCustomTrackerEvidenceWrites(): boolean {
  return PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARY.runtimeDatabaseWritesEnabled === false &&
    PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARY.runtimeFileIngestionEnabled === false &&
    PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARY.runtimeNetworkCallsEnabled === false &&
    PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARY.fakeEvidenceAllowed === false;
}

export function summarizeCustomTrackerEvidenceAttachmentBoundary(): CustomTrackerEvidenceAttachmentSummary {
  return {
    documentSourceAttachmentBoundaryEnabled: true,
    savedDocumentReferenceBoundaryEnabled: true,
    knowledgeVaultCompatibilityEnabled: true,
    memoryRagCompatibilityEnabled: true,
    currentInfoWebSourceCompatibilityEnabled: true,
    webSourceReferenceAttachmentBoundaryEnabled: true,
    trackerEntryEvidenceLinksEnabled: true,
    carnosFreshnessDisclosureRequired: true,
    carnosMappingRequiresReview: true,
    runtimeFileIngestionEnabled: false,
    runtimeNetworkCallsEnabled: false,
    runtimeDatabaseWritesEnabled: false,
    fakeEvidenceAllowed: false,
  };
}
