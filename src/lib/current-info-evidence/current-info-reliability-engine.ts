/**
 * Phase 16F — Citation, Reliability, and Freshness Engine
 *
 * Reliability helper for future current-info sources.
 *
 * Boundary:
 * no network calls
 * no provider calls
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 */

export type CurrentInfoReliabilityTier =
  | "official_or_primary"
  | "reputable_secondary"
  | "mixed_or_uncertain"
  | "low_reliability"
  | "unknown_reliability";

export type CurrentInfoReliabilityInput = {
  readonly source_kind: string;
  readonly has_author_or_org?: boolean;
  readonly has_publication_date?: boolean;
  readonly has_citation_label?: boolean;
  readonly is_official_source?: boolean;
  readonly is_user_generated?: boolean;
  readonly is_sponsored_or_ad?: boolean;
};

export type CurrentInfoReliabilityResult = {
  readonly tier: CurrentInfoReliabilityTier;
  readonly score: number;
  readonly requires_reliability_notes: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly reasons: readonly string[];
};

export function evaluateCurrentInfoReliability(
  input: CurrentInfoReliabilityInput,
): CurrentInfoReliabilityResult {
  const sourceKind = input.source_kind.toLowerCase();
  const reasons: string[] = [];
  let score = 40;

  if (input.is_official_source || sourceKind.includes("official") || sourceKind.includes("primary")) {
    score += 40;
    reasons.push("official_or_primary_source");
  }

  if (sourceKind.includes("paper") || sourceKind.includes("documentation") || sourceKind.includes("government")) {
    score += 25;
    reasons.push("strong_source_kind");
  }

  if (input.has_author_or_org) {
    score += 10;
    reasons.push("has_author_or_organization");
  }

  if (input.has_publication_date) {
    score += 10;
    reasons.push("has_publication_date");
  }

  if (input.has_citation_label) {
    score += 10;
    reasons.push("has_citation_label");
  }

  if (input.is_user_generated || sourceKind.includes("forum") || sourceKind.includes("social")) {
    score -= 25;
    reasons.push("user_generated_or_social_source");
  }

  if (input.is_sponsored_or_ad) {
    score -= 35;
    reasons.push("sponsored_or_ad_source");
  }

  const boundedScore = Math.max(0, Math.min(100, score));

  const tier: CurrentInfoReliabilityTier =
    boundedScore >= 85
      ? "official_or_primary"
      : boundedScore >= 65
        ? "reputable_secondary"
        : boundedScore >= 45
          ? "mixed_or_uncertain"
          : boundedScore > 0
            ? "low_reliability"
            : "unknown_reliability";

  return {
    tier,
    score: boundedScore,
    requires_reliability_notes: true,
    can_autosave: false,
    can_auto_memory_convert: false,
    reasons,
  };
}
