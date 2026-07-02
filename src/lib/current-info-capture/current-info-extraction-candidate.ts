export type CurrentInfoExtractionSourceCandidateReference = {
  is_persisted: boolean;
  requires_user_review?: boolean;
  can_autosave?: boolean;
  can_auto_memory_convert?: boolean;
  source_kind?: string;
  url?: string;
  title?: string;
  citation_label?: string;
};

export const CURRENT_INFO_EXTRACTION_CANDIDATE_STATUSES = [
  "extraction_candidate_created",
  "extraction_candidate_missing_source",
  "extraction_candidate_low_confidence",
  "extraction_candidate_rejected_for_review",
] as const;

export type CurrentInfoExtractionCandidateStatus =
  (typeof CURRENT_INFO_EXTRACTION_CANDIDATE_STATUSES)[number];

export const CURRENT_INFO_EXTRACTION_CONFIDENCE_STATUSES = [
  "confidence_unknown",
  "confidence_low",
  "confidence_medium",
  "confidence_high",
] as const;

export type CurrentInfoExtractionConfidenceStatus =
  (typeof CURRENT_INFO_EXTRACTION_CONFIDENCE_STATUSES)[number];

export const CURRENT_INFO_EXTRACTION_CANDIDATE_REASONS = [
  "candidate_only",
  "manual_review_required",
  "source_candidate_required",
  "source_candidate_not_persisted",
  "extracted_title_candidate",
  "extracted_snippet_candidate",
  "extracted_summary_candidate",
  "extracted_claims_candidate",
  "extracted_entities_candidate",
  "extracted_metadata_candidate",
  "confidence_score_missing",
  "confidence_score_low",
  "autosave_disabled",
  "source_persistence_disabled",
  "automatic_memory_conversion_disabled",
  "proposed_action_execution_disabled",
  "rejected_for_review",
] as const;

export type CurrentInfoExtractionCandidateReason =
  (typeof CURRENT_INFO_EXTRACTION_CANDIDATE_REASONS)[number];

export type CurrentInfoExtractionCandidateInput = {
  source_candidate?: CurrentInfoExtractionSourceCandidateReference;
  extracted_title?: string;
  extracted_snippet?: string;
  extracted_summary?: string;
  extracted_claims?: string[];
  extracted_entities?: string[];
  extracted_metadata?: Record<string, string | number | boolean | null>;
  confidence_score?: number;
};

export type CurrentInfoExtractionCandidateOutput = {
  status: CurrentInfoExtractionCandidateStatus;
  confidence_status: CurrentInfoExtractionConfidenceStatus;
  source_candidate?: CurrentInfoExtractionSourceCandidateReference;
  extracted_title?: string;
  extracted_snippet?: string;
  extracted_summary?: string;
  extracted_claims: string[];
  extracted_entities: string[];
  extracted_metadata: Record<string, string | number | boolean | null>;
  confidence_score?: number;
  reasons: CurrentInfoExtractionCandidateReason[];
  is_candidate_only: true;
  is_persisted: false;
  requires_user_review: true;
  can_autosave: false;
  can_persist_sources: false;
  can_auto_memory_convert: false;
  can_execute_action: false;
};

const LOW_CONFIDENCE_THRESHOLD = 0.5;
const HIGH_CONFIDENCE_THRESHOLD = 0.8;

function normalizeText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();

  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function normalizeList(values: string[] | undefined): string[] {
  return [
    ...new Set(
      (values ?? [])
        .map((value) => value.trim())
        .filter((value) => value.length > 0),
    ),
  ];
}

function normalizeConfidenceScore(score: number | undefined): number | undefined {
  if (typeof score !== "number" || Number.isNaN(score)) {
    return undefined;
  }

  if (score < 0) {
    return 0;
  }

  if (score > 1) {
    return 1;
  }

  return score;
}

function getConfidenceStatus(
  score: number | undefined,
): CurrentInfoExtractionConfidenceStatus {
  if (score === undefined) {
    return "confidence_unknown";
  }

  if (score < LOW_CONFIDENCE_THRESHOLD) {
    return "confidence_low";
  }

  if (score >= HIGH_CONFIDENCE_THRESHOLD) {
    return "confidence_high";
  }

  return "confidence_medium";
}

function getExtractionStatus(
  sourceCandidate: CurrentInfoExtractionSourceCandidateReference | undefined,
  confidenceStatus: CurrentInfoExtractionConfidenceStatus,
): CurrentInfoExtractionCandidateStatus {
  if (!sourceCandidate) {
    return "extraction_candidate_missing_source";
  }

  if (confidenceStatus === "confidence_low" || confidenceStatus === "confidence_unknown") {
    return "extraction_candidate_low_confidence";
  }

  return "extraction_candidate_created";
}

function createExtractionReasons(
  input: CurrentInfoExtractionCandidateInput,
  confidenceStatus: CurrentInfoExtractionConfidenceStatus,
): CurrentInfoExtractionCandidateReason[] {
  const reasons = new Set<CurrentInfoExtractionCandidateReason>([
    "candidate_only",
    "manual_review_required",
    "autosave_disabled",
    "source_persistence_disabled",
    "automatic_memory_conversion_disabled",
    "proposed_action_execution_disabled",
  ]);

  if (!input.source_candidate) {
    reasons.add("source_candidate_required");
  } else if (!input.source_candidate.is_persisted) {
    reasons.add("source_candidate_not_persisted");
  }

  if (normalizeText(input.extracted_title)) {
    reasons.add("extracted_title_candidate");
  }

  if (normalizeText(input.extracted_snippet)) {
    reasons.add("extracted_snippet_candidate");
  }

  if (normalizeText(input.extracted_summary)) {
    reasons.add("extracted_summary_candidate");
  }

  if (normalizeList(input.extracted_claims).length > 0) {
    reasons.add("extracted_claims_candidate");
  }

  if (normalizeList(input.extracted_entities).length > 0) {
    reasons.add("extracted_entities_candidate");
  }

  if (input.extracted_metadata && Object.keys(input.extracted_metadata).length > 0) {
    reasons.add("extracted_metadata_candidate");
  }

  if (confidenceStatus === "confidence_unknown") {
    reasons.add("confidence_score_missing");
  }

  if (confidenceStatus === "confidence_low") {
    reasons.add("confidence_score_low");
  }

  return [...reasons];
}

export function createCurrentInfoExtractionCandidate(
  input: CurrentInfoExtractionCandidateInput,
): CurrentInfoExtractionCandidateOutput {
  const confidenceScore = normalizeConfidenceScore(input.confidence_score);
  const confidenceStatus = getConfidenceStatus(confidenceScore);

  return {
    status: getExtractionStatus(input.source_candidate, confidenceStatus),
    confidence_status: confidenceStatus,
    source_candidate: input.source_candidate,
    extracted_title: normalizeText(input.extracted_title),
    extracted_snippet: normalizeText(input.extracted_snippet),
    extracted_summary: normalizeText(input.extracted_summary),
    extracted_claims: normalizeList(input.extracted_claims),
    extracted_entities: normalizeList(input.extracted_entities),
    extracted_metadata: input.extracted_metadata ?? {},
    confidence_score: confidenceScore,
    reasons: createExtractionReasons(input, confidenceStatus),
    is_candidate_only: true,
    is_persisted: false,
    requires_user_review: true,
    can_autosave: false,
    can_persist_sources: false,
    can_auto_memory_convert: false,
    can_execute_action: false,
  };
}

export function rejectCurrentInfoExtractionCandidateForReview(
  candidate: CurrentInfoExtractionCandidateOutput,
): CurrentInfoExtractionCandidateOutput {
  const reasons: CurrentInfoExtractionCandidateReason[] = [
    ...new Set<CurrentInfoExtractionCandidateReason>([
      ...candidate.reasons,
      "rejected_for_review",
    ]),
  ];

  return {
    ...candidate,
    status: "extraction_candidate_rejected_for_review",
    reasons,
    is_candidate_only: true,
    is_persisted: false,
    requires_user_review: true,
    can_autosave: false,
    can_persist_sources: false,
    can_auto_memory_convert: false,
    can_execute_action: false,
  };
}

export const PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_BOUNDARY =
  "Phase 16G-B current-info extraction candidates are candidate-only, review-required, non-persisting, non-executing, and cannot become memory automatically.";
