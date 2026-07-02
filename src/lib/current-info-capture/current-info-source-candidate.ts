/**
 * Phase 16G — Source Candidate Capture + Destination Router
 *
 * Source candidate capture contract for future current-info results.
 *
 * Boundary:
 * no provider execution
 * no external retrieval
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 */

export type CurrentInfoSourceCandidateStatus =
  | "candidate_captured"
  | "candidate_missing_url"
  | "candidate_missing_title"
  | "candidate_rejected_for_review";

export type CurrentInfoSourceCandidateKind =
  | "official"
  | "documentation"
  | "paper"
  | "news"
  | "company"
  | "job_posting"
  | "profile"
  | "unknown";

export type CurrentInfoSourceCandidateInput = {
  readonly title?: string;
  readonly url?: string;
  readonly source_kind?: CurrentInfoSourceCandidateKind;
  readonly publisher?: string;
  readonly author?: string;
  readonly published_at_iso?: string;
  readonly retrieved_at_iso?: string;
  readonly citation_label?: string;
};

export type CurrentInfoSourceCandidate = {
  readonly status: CurrentInfoSourceCandidateStatus;
  readonly title: string | null;
  readonly url: string | null;
  readonly normalized_url: string | null;
  readonly source_kind: CurrentInfoSourceCandidateKind;
  readonly publisher: string | null;
  readonly author: string | null;
  readonly published_at_iso: string | null;
  readonly retrieved_at_iso: string | null;
  readonly citation_label: string | null;
  readonly is_persisted: false;
  readonly requires_user_review: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly reasons: readonly string[];
};

function clean(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeUrl(value: string | undefined): string | null {
  const cleaned = clean(value);

  if (!cleaned) {
    return null;
  }

  try {
    const parsed = new URL(cleaned);
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return cleaned;
  }
}

export function captureCurrentInfoSourceCandidate(
  input: CurrentInfoSourceCandidateInput,
): CurrentInfoSourceCandidate {
  const title = clean(input.title);
  const url = clean(input.url);
  const normalizedUrl = normalizeUrl(input.url);
  const reasons: string[] = [];

  if (!url) {
    reasons.push("candidate_missing_url");
  }

  if (!title) {
    reasons.push("candidate_missing_title");
  }

  const status: CurrentInfoSourceCandidateStatus =
    !url
      ? "candidate_missing_url"
      : !title
        ? "candidate_missing_title"
        : "candidate_captured";

  return {
    status,
    title,
    url,
    normalized_url: normalizedUrl,
    source_kind: input.source_kind ?? "unknown",
    publisher: clean(input.publisher),
    author: clean(input.author),
    published_at_iso: clean(input.published_at_iso),
    retrieved_at_iso: clean(input.retrieved_at_iso),
    citation_label: clean(input.citation_label),
    is_persisted: false,
    requires_user_review: true,
    can_autosave: false,
    can_auto_memory_convert: false,
    reasons,
  };
}

export function rejectCurrentInfoSourceCandidateForReview(
  candidate: CurrentInfoSourceCandidate,
  reason: string,
): CurrentInfoSourceCandidate {
  return {
    ...candidate,
    status: "candidate_rejected_for_review",
    requires_user_review: true,
    can_autosave: false,
    can_auto_memory_convert: false,
    reasons: [...candidate.reasons, reason],
  };
}
