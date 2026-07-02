import type { CurrentInfoSourceCandidate } from "./current-info-source-candidate";

/**
 * Phase 16H-B — Current-Info Duplicate Detection Contract
 *
 * Corrective alignment patch for Phase 16H:
 * Destination Router + Duplicate Detection.
 *
 * Boundary:
 * no provider execution
 * no external retrieval
 * no SQL reads or writes
 * no source persistence
 * no automatic merge
 * no automatic memory conversion
 * no proposed-action execution
 */

export type CurrentInfoDuplicateDetectionStatus =
  | "no_duplicate_detected"
  | "possible_duplicate_detected"
  | "likely_duplicate_detected"
  | "duplicate_detection_needs_review";

export type CurrentInfoDuplicateSignal =
  | "normalized_url_match"
  | "title_match"
  | "publisher_match"
  | "citation_label_match"
  | "missing_comparison_candidate"
  | "manual_review_required";

export type CurrentInfoDuplicateDetectionInput = {
  readonly candidate: CurrentInfoSourceCandidate;
  readonly existing_candidates: readonly CurrentInfoSourceCandidate[];
};

export type CurrentInfoDuplicateDetectionResult = {
  readonly status: CurrentInfoDuplicateDetectionStatus;
  readonly strongest_signal: CurrentInfoDuplicateSignal;
  readonly duplicate_candidate_count: number;
  readonly matching_candidate_urls: readonly string[];
  readonly requires_user_review: true;
  readonly can_merge_automatically: false;
  readonly can_persist_sources: false;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly reasons: readonly CurrentInfoDuplicateSignal[];
};

function normalizeText(value: string | null): string {
  return (value ?? "").trim().toLowerCase();
}

function collectSignals(
  candidate: CurrentInfoSourceCandidate,
  existing: CurrentInfoSourceCandidate,
): CurrentInfoDuplicateSignal[] {
  const signals: CurrentInfoDuplicateSignal[] = [];

  if (
    candidate.normalized_url &&
    existing.normalized_url &&
    candidate.normalized_url === existing.normalized_url
  ) {
    signals.push("normalized_url_match");
  }

  if (
    normalizeText(candidate.title).length > 0 &&
    normalizeText(candidate.title) === normalizeText(existing.title)
  ) {
    signals.push("title_match");
  }

  if (
    normalizeText(candidate.publisher).length > 0 &&
    normalizeText(candidate.publisher) === normalizeText(existing.publisher)
  ) {
    signals.push("publisher_match");
  }

  if (
    normalizeText(candidate.citation_label).length > 0 &&
    normalizeText(candidate.citation_label) === normalizeText(existing.citation_label)
  ) {
    signals.push("citation_label_match");
  }

  return signals;
}

function uniqueSignals(
  signals: readonly CurrentInfoDuplicateSignal[],
): readonly CurrentInfoDuplicateSignal[] {
  return [...new Set(signals)];
}

export function detectCurrentInfoSourceCandidateDuplicates(
  input: CurrentInfoDuplicateDetectionInput,
): CurrentInfoDuplicateDetectionResult {
  const reasons: CurrentInfoDuplicateSignal[] = ["manual_review_required"];
  const matchingCandidateUrls: string[] = [];

  if (input.existing_candidates.length === 0) {
    reasons.push("missing_comparison_candidate");

    return {
      status: "duplicate_detection_needs_review",
      strongest_signal: "missing_comparison_candidate",
      duplicate_candidate_count: 0,
      matching_candidate_urls: [],
      requires_user_review: true,
      can_merge_automatically: false,
      can_persist_sources: false,
      can_autosave: false,
      can_auto_memory_convert: false,
      reasons: uniqueSignals(reasons),
    };
  }

  for (const existing of input.existing_candidates) {
    const signals = collectSignals(input.candidate, existing);

    if (signals.length > 0) {
      reasons.push(...signals);

      if (existing.normalized_url) {
        matchingCandidateUrls.push(existing.normalized_url);
      }
    }
  }

  const uniqueReasons = uniqueSignals(reasons);
  const duplicateCandidateCount = matchingCandidateUrls.length;

  const hasUrlMatch = uniqueReasons.includes("normalized_url_match");
  const hasTitleAndPublisherMatch =
    uniqueReasons.includes("title_match") &&
    uniqueReasons.includes("publisher_match");

  const status: CurrentInfoDuplicateDetectionStatus =
    hasUrlMatch || hasTitleAndPublisherMatch
      ? "likely_duplicate_detected"
      : duplicateCandidateCount > 0 || uniqueReasons.includes("title_match")
        ? "possible_duplicate_detected"
        : "no_duplicate_detected";

  const strongestSignal: CurrentInfoDuplicateSignal = hasUrlMatch
    ? "normalized_url_match"
    : hasTitleAndPublisherMatch
      ? "title_match"
      : uniqueReasons.includes("title_match")
        ? "title_match"
        : "manual_review_required";

  return {
    status,
    strongest_signal: strongestSignal,
    duplicate_candidate_count: duplicateCandidateCount,
    matching_candidate_urls: [...new Set(matchingCandidateUrls)],
    requires_user_review: true,
    can_merge_automatically: false,
    can_persist_sources: false,
    can_autosave: false,
    can_auto_memory_convert: false,
    reasons: uniqueReasons,
  };
}
