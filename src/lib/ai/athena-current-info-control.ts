export type AthenaCurrentInfoStatus =
  | "disabled"
  | "noop"
  | "provider_unconfigured"
  | "review_only";

export type AthenaCurrentInfoFreshnessStatus =
  | "not_live"
  | "unknown"
  | "source_missing"
  | "review_required";

export type AthenaCurrentInfoReview = {
  readonly ok: true;
  readonly query: string;
  readonly requiresCurrentInfo: boolean;
  readonly status: AthenaCurrentInfoStatus;
  readonly providerEnabled: boolean;
  readonly providerKind: string;
  readonly liveSearchPerformed: false;
  readonly sourceCount: 0;
  readonly sources: readonly [];
  readonly evidence: readonly [];
  readonly freshnessStatus: AthenaCurrentInfoFreshnessStatus;
  readonly freshnessExplanation: string;
  readonly answer: string;
  readonly warnings: readonly string[];
  readonly saveRequiresConfirmation: true;
  readonly writesPerformed: false;
  readonly hiddenBrowsingPerformed: false;
  readonly browserSecretsExposed: false;
};

const CURRENT_INFO_KEYWORDS = [
  "latest",
  "today",
  "yesterday",
  "tomorrow",
  "current",
  "recent",
  "news",
  "deadline",
  "price",
  "schedule",
  "conference",
  "job posting",
  "hiring",
  "open role",
  "2026",
  "now",
  "this week",
  "this month",
];

function normalizeQuery(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function envEnabled(value: string | undefined) {
  return value === "true" || value === "1";
}

export function classifyAthenaCurrentInfoNeed(query: string) {
  const lowered = query.toLowerCase();

  return CURRENT_INFO_KEYWORDS.some((keyword) => lowered.includes(keyword));
}

export function getAthenaCurrentInfoProviderStatus() {
  const providerEnabled = envEnabled(process.env.CURRENT_INFO_PROVIDER_ENABLED);
  const providerKind = process.env.CURRENT_INFO_PROVIDER_KIND?.trim() || "noop";

  if (!providerEnabled) {
    return {
      status: "disabled" as const,
      providerEnabled,
      providerKind,
      reason:
        "Current-info provider is disabled. Athena cannot perform live browsing or freshness checks.",
    };
  }

  if (providerKind !== "noop") {
    return {
      status: "provider_unconfigured" as const,
      providerEnabled,
      providerKind,
      reason:
        "A current-info provider kind was configured, but no live provider runtime is wired in Phase 21H.",
    };
  }

  return {
    status: "noop" as const,
    providerEnabled,
    providerKind,
    reason:
      "Current-info provider is set to noop. Athena can classify the request and show review requirements, but cannot browse live sources.",
  };
}

export function buildAthenaCurrentInfoReview(input: {
  query: unknown;
}): AthenaCurrentInfoReview | { ok: false; error: string } {
  const query = normalizeQuery(input.query);

  if (!query) {
    return {
      ok: false,
      error: "Current-info query is required.",
    };
  }

  if (query.length > 2000) {
    return {
      ok: false,
      error: "Current-info query is too long for the review boundary.",
    };
  }

  const provider = getAthenaCurrentInfoProviderStatus();
  const requiresCurrentInfo = classifyAthenaCurrentInfoNeed(query);

  const warnings = [
    provider.reason,
    "No live web request was performed.",
    "No source, quote, or freshness claim should be treated as verified.",
    "Saving any current-info finding must go through an explicit review/confirmation flow.",
  ];

  if (!requiresCurrentInfo) {
    warnings.push(
      "This query does not strongly require live current-info, but Athena will still disclose provider limits.",
    );
  }

  return {
    ok: true,
    query,
    requiresCurrentInfo,
    status: provider.status,
    providerEnabled: provider.providerEnabled,
    providerKind: provider.providerKind,
    liveSearchPerformed: false,
    sourceCount: 0,
    sources: [],
    evidence: [],
    freshnessStatus: provider.status === "disabled" ? "not_live" : "review_required",
    freshnessExplanation:
      "Freshness is not verified because no live current-info provider returned source-backed evidence.",
    answer:
      "Live current-info is not available in this runtime. Athena can discuss the query using existing chat/context only, but it must not claim current freshness, cite fake sources, or save findings without confirmation.",
    warnings,
    saveRequiresConfirmation: true,
    writesPerformed: false,
    hiddenBrowsingPerformed: false,
    browserSecretsExposed: false,
  };
}
