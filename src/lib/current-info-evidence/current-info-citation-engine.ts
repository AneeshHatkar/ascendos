/**
 * Phase 16F — Citation, Reliability, and Freshness Engine
 *
 * Citation helper for future current-info results.
 *
 * Boundary:
 * no network calls
 * no provider calls
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 */

export type CurrentInfoCitationCoverageStatus =
  | "citation_ready"
  | "missing_sources"
  | "missing_citation_labels"
  | "insufficient_citation_coverage";

export type CurrentInfoCitationEvidenceInput = {
  readonly source_count: number;
  readonly citation_label_count: number;
  readonly claim_count: number;
  readonly cited_claim_count: number;
};

export type CurrentInfoCitationCoverageResult = {
  readonly status: CurrentInfoCitationCoverageStatus;
  readonly source_count: number;
  readonly citation_label_count: number;
  readonly claim_count: number;
  readonly cited_claim_count: number;
  readonly coverage_ratio: number;
  readonly requires_citations: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly reasons: readonly string[];
};

export function createCurrentInfoCitationLabel(index: number): string {
  const safeIndex = Math.max(1, Math.floor(index));
  return `source_${safeIndex}`;
}

export function evaluateCurrentInfoCitationCoverage(
  input: CurrentInfoCitationEvidenceInput,
): CurrentInfoCitationCoverageResult {
  const sourceCount = Math.max(0, input.source_count);
  const citationLabelCount = Math.max(0, input.citation_label_count);
  const claimCount = Math.max(0, input.claim_count);
  const citedClaimCount = Math.max(0, input.cited_claim_count);
  const coverageRatio = claimCount === 0 ? 0 : citedClaimCount / claimCount;
  const reasons: string[] = [];

  if (sourceCount === 0) {
    reasons.push("missing_sources");
  }

  if (citationLabelCount === 0) {
    reasons.push("missing_citation_labels");
  }

  if (claimCount > 0 && coverageRatio < 1) {
    reasons.push("insufficient_citation_coverage");
  }

  const status: CurrentInfoCitationCoverageStatus =
    sourceCount === 0
      ? "missing_sources"
      : citationLabelCount === 0
        ? "missing_citation_labels"
        : claimCount > 0 && coverageRatio < 1
          ? "insufficient_citation_coverage"
          : "citation_ready";

  return {
    status,
    source_count: sourceCount,
    citation_label_count: citationLabelCount,
    claim_count: claimCount,
    cited_claim_count: citedClaimCount,
    coverage_ratio: coverageRatio,
    requires_citations: true,
    can_autosave: false,
    can_auto_memory_convert: false,
    reasons,
  };
}
