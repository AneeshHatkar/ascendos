/**
 * Phase 16F — Citation, Reliability, and Freshness Engine
 *
 * Freshness helper for future current-info sources.
 *
 * Boundary:
 * no network calls
 * no provider calls
 * no SQL reads or writes
 * no source persistence
 * no automatic memory conversion
 */

export type CurrentInfoFreshnessTier =
  | "current"
  | "recent"
  | "stale"
  | "unknown"
  | "not_time_sensitive";

export type CurrentInfoFreshnessInput = {
  readonly retrieved_at_iso?: string;
  readonly published_at_iso?: string;
  readonly time_sensitive: boolean;
};

export type CurrentInfoFreshnessResult = {
  readonly tier: CurrentInfoFreshnessTier;
  readonly age_days: number | null;
  readonly requires_freshness_notes: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
  readonly reasons: readonly string[];
};

function parseTime(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function evaluateCurrentInfoFreshness(
  input: CurrentInfoFreshnessInput,
): CurrentInfoFreshnessResult {
  const reasons: string[] = [];

  if (!input.time_sensitive) {
    reasons.push("not_time_sensitive");

    return {
      tier: "not_time_sensitive",
      age_days: null,
      requires_freshness_notes: true,
      can_autosave: false,
      can_auto_memory_convert: false,
      reasons,
    };
  }

  const retrievedAt = parseTime(input.retrieved_at_iso) ?? Date.now();
  const publishedAt = parseTime(input.published_at_iso);

  if (publishedAt === null) {
    reasons.push("missing_publication_date");

    return {
      tier: "unknown",
      age_days: null,
      requires_freshness_notes: true,
      can_autosave: false,
      can_auto_memory_convert: false,
      reasons,
    };
  }

  const ageDays = Math.max(0, Math.floor((retrievedAt - publishedAt) / 86_400_000));

  const tier: CurrentInfoFreshnessTier =
    ageDays <= 7 ? "current" : ageDays <= 90 ? "recent" : "stale";

  reasons.push(`age_days_${ageDays}`);

  return {
    tier,
    age_days: ageDays,
    requires_freshness_notes: true,
    can_autosave: false,
    can_auto_memory_convert: false,
    reasons,
  };
}
