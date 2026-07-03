import type { WebSearchQueryRow, WebSourceCandidateRow, WebSourceRow } from "@/lib/repositories";

export type CurrentInfoRetentionPolicy =
  | "standard"
  | "private_mode_ephemeral"
  | "do_not_retain"
  | "manual_save_only";

export type CurrentInfoPrivacyDecision =
  | "allow_preview"
  | "manual_review_required"
  | "block_retention"
  | "block_save_preview"
  | "redact_preview";

export type CurrentInfoSensitivityCategory =
  | "health"
  | "legal"
  | "financial"
  | "career"
  | "identity"
  | "private_life"
  | "unknown"
  | "none";

export type CurrentInfoRetentionRuleInput = {
  nowIso?: string;
  privateModeDefaultRetentionHours?: number;
  manualSaveDefaultRetentionDays?: number;
};

export type CurrentInfoPrivacyRuleResult = {
  recordId: string;
  recordKind: "query" | "source" | "candidate";
  privateMode: boolean;
  retentionPolicy: CurrentInfoRetentionPolicy;
  retentionExpiresAt: string | null;
  sensitiveCategory: CurrentInfoSensitivityCategory;
  decision: CurrentInfoPrivacyDecision;
  blockedReason: string | null;
  warnings: string[];
  redactionPreview: string;
  canRetainQueryText: boolean;
  canRetainRawContent: boolean;
  canCreateCandidate: boolean;
  canPreviewSave: boolean;
  requiresManualSave: boolean;
  auditEventPreview: {
    event_type:
      | "web_source_blocked_by_private_mode"
      | "web_source_blocked_by_reliability"
      | "web_source_candidate_created";
    actor_type: "system";
    event_summary: string;
    event_payload: Record<string, unknown>;
  };
};

export type CurrentInfoPrivacyRetentionSummary = {
  totalRecords: number;
  privateModeCount: number;
  doNotRetainCount: number;
  manualSaveOnlyCount: number;
  sensitiveCount: number;
  blockedCount: number;
  redactedCount: number;
  expiringCount: number;
};

export type CurrentInfoPrivacyRetentionEvaluation = {
  summary: CurrentInfoPrivacyRetentionSummary;
  queryResults: CurrentInfoPrivacyRuleResult[];
  sourceResults: CurrentInfoPrivacyRuleResult[];
  candidateResults: CurrentInfoPrivacyRuleResult[];
};

const HIGH_STAKES_QUERY_KINDS = new Set([
  "health_current_info",
  "legal_current_info",
  "financial_current_info",
]);

const HIGH_STAKES_SENSITIVE_BY_QUERY_KIND: Record<string, CurrentInfoSensitivityCategory> = {
  health_current_info: "health",
  legal_current_info: "legal",
  financial_current_info: "financial",
};

const ALLOWED_RETENTION_POLICIES = new Set([
  "standard",
  "private_mode_ephemeral",
  "do_not_retain",
  "manual_save_only",
]);

const BLOCKED_CANDIDATE_STATUSES = new Set([
  "blocked_by_private_mode",
  "blocked_by_reliability",
  "blocked_by_duplicate",
]);

function isRetentionPolicy(value: string | null | undefined): value is CurrentInfoRetentionPolicy {
  return Boolean(value && ALLOWED_RETENTION_POLICIES.has(value));
}

function normalizeRetentionPolicy(value: string | null | undefined): CurrentInfoRetentionPolicy {
  return isRetentionPolicy(value) ? value : "standard";
}

function normalizeSensitiveCategory(value: string | null | undefined): CurrentInfoSensitivityCategory {
  if (!value) {
    return "none";
  }

  const clean = value.trim().toLowerCase();

  if (
    clean === "health" ||
    clean === "legal" ||
    clean === "financial" ||
    clean === "career" ||
    clean === "identity" ||
    clean === "private_life" ||
    clean === "unknown"
  ) {
    return clean;
  }

  return "unknown";
}

function addHours(date: Date, hours: number) {
  const copy = new Date(date.getTime());
  copy.setHours(copy.getHours() + hours);
  return copy.toISOString();
}

function addDays(date: Date, days: number) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + days);
  return copy.toISOString();
}

function redactText(value: string | null | undefined) {
  const clean = value?.trim();

  if (!clean) {
    return "[redacted-empty]";
  }

  if (clean.length <= 24) {
    return "[redacted-sensitive-preview]";
  }

  return `${clean.slice(0, 18)}…[redacted]`;
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function querySensitivity(query: WebSearchQueryRow): CurrentInfoSensitivityCategory {
  return normalizeSensitiveCategory(
    query.sensitive_category ?? HIGH_STAKES_SENSITIVE_BY_QUERY_KIND[query.query_kind],
  );
}

function defaultRetentionExpiry(
  policy: CurrentInfoRetentionPolicy,
  now: Date,
  input: CurrentInfoRetentionRuleInput,
  existing: string | null,
) {
  if (existing) {
    return existing;
  }

  if (policy === "private_mode_ephemeral") {
    return addHours(now, input.privateModeDefaultRetentionHours ?? 24);
  }

  if (policy === "manual_save_only") {
    return addDays(now, input.manualSaveDefaultRetentionDays ?? 30);
  }

  return null;
}

function decisionForQuery(
  query: WebSearchQueryRow,
  policy: CurrentInfoRetentionPolicy,
  sensitivity: CurrentInfoSensitivityCategory,
): CurrentInfoPrivacyDecision {
  if (query.private_mode || policy === "private_mode_ephemeral" || policy === "do_not_retain") {
    return "block_retention";
  }

  if (HIGH_STAKES_QUERY_KINDS.has(query.query_kind) || sensitivity !== "none") {
    return "manual_review_required";
  }

  if (policy === "manual_save_only") {
    return "manual_review_required";
  }

  return "allow_preview";
}

function decisionForSource(
  source: WebSourceRow,
  policy: CurrentInfoRetentionPolicy,
  sensitivity: CurrentInfoSensitivityCategory,
): CurrentInfoPrivacyDecision {
  if (source.private_mode || policy === "private_mode_ephemeral" || policy === "do_not_retain") {
    return "redact_preview";
  }

  if (source.raw_content_stored && sensitivity !== "none") {
    return "manual_review_required";
  }

  if (source.reliability_label === "blocked") {
    return "block_save_preview";
  }

  if (policy === "manual_save_only") {
    return "manual_review_required";
  }

  return "allow_preview";
}

function decisionForCandidate(candidate: WebSourceCandidateRow): CurrentInfoPrivacyDecision {
  if (candidate.candidate_status === "blocked_by_private_mode") {
    return "block_retention";
  }

  if (candidate.candidate_status === "blocked_by_reliability") {
    return "block_save_preview";
  }

  if (candidate.privacy_warnings.length > 0) {
    return "manual_review_required";
  }

  if (candidate.candidate_status === "blocked_by_duplicate") {
    return "manual_review_required";
  }

  return "allow_preview";
}

function eventTypeForDecision(
  decision: CurrentInfoPrivacyDecision,
  candidateBlocked?: boolean,
): CurrentInfoPrivacyRuleResult["auditEventPreview"]["event_type"] {
  if (decision === "block_retention" || decision === "redact_preview") {
    return "web_source_blocked_by_private_mode";
  }

  if (decision === "block_save_preview" || candidateBlocked) {
    return "web_source_blocked_by_reliability";
  }

  return "web_source_candidate_created";
}

export function evaluateCurrentInfoQueryPrivacy(
  query: WebSearchQueryRow,
  input: CurrentInfoRetentionRuleInput = {},
): CurrentInfoPrivacyRuleResult {
  const now = new Date(input.nowIso ?? Date.now());
  const policy = normalizeRetentionPolicy(query.retention_policy);
  const sensitivity = querySensitivity(query);
  const decision = decisionForQuery(query, policy, sensitivity);
  const warnings: string[] = [];

  if (query.private_mode && policy === "standard") {
    warnings.push("Private mode query should use private_mode_ephemeral or do_not_retain.");
  }

  if (HIGH_STAKES_QUERY_KINDS.has(query.query_kind)) {
    warnings.push("High-stakes current-info query requires official, primary, or academic sources before save.");
  }

  if (policy === "do_not_retain") {
    warnings.push("Query text should not be retained after processing.");
  }

  if (query.blocked_reason) {
    warnings.push(`Blocked reason captured: ${query.blocked_reason}`);
  }

  return {
    recordId: query.id,
    recordKind: "query",
    privateMode: query.private_mode,
    retentionPolicy: policy,
    retentionExpiresAt: defaultRetentionExpiry(policy, now, input, query.retention_expires_at),
    sensitiveCategory: sensitivity,
    decision,
    blockedReason: query.blocked_reason,
    warnings: unique(warnings),
    redactionPreview: decision === "block_retention" ? redactText(query.query_text) : query.query_text,
    canRetainQueryText: decision !== "block_retention" && policy !== "do_not_retain",
    canRetainRawContent: false,
    canCreateCandidate: decision === "allow_preview" || decision === "manual_review_required",
    canPreviewSave: decision === "allow_preview" || decision === "manual_review_required",
    requiresManualSave: decision === "manual_review_required" || policy === "manual_save_only",
    auditEventPreview: {
      event_type: eventTypeForDecision(decision),
      actor_type: "system",
      event_summary: `Privacy retention preview for current-info query ${query.id}.`,
      event_payload: {
        query_kind: query.query_kind,
        retention_policy: policy,
        sensitive_category: sensitivity,
        decision,
        preview_only: true,
      },
    },
  };
}

export function evaluateCurrentInfoSourcePrivacy(
  source: WebSourceRow,
  input: CurrentInfoRetentionRuleInput = {},
): CurrentInfoPrivacyRuleResult {
  const now = new Date(input.nowIso ?? Date.now());
  const policy = normalizeRetentionPolicy(source.retention_policy);
  const sensitivity = normalizeSensitiveCategory(source.sensitive_category);
  const decision = decisionForSource(source, policy, sensitivity);
  const warnings: string[] = [];

  if (source.private_mode && policy === "standard") {
    warnings.push("Private mode source should use private_mode_ephemeral or do_not_retain.");
  }

  if (source.raw_content_stored && policy !== "standard") {
    warnings.push("Raw content storage should be avoided for non-standard retention policies.");
  }

  if (source.raw_content_stored && sensitivity !== "none") {
    warnings.push("Sensitive source raw content requires manual review and redaction.");
  }

  if (source.reliability_label === "blocked") {
    warnings.push("Blocked reliability source cannot be saved without later policy override.");
  }

  return {
    recordId: source.id,
    recordKind: "source",
    privateMode: source.private_mode,
    retentionPolicy: policy,
    retentionExpiresAt: defaultRetentionExpiry(policy, now, input, source.retention_expires_at),
    sensitiveCategory: sensitivity,
    decision,
    blockedReason: null,
    warnings: unique(warnings),
    redactionPreview: decision === "redact_preview" ? redactText(source.summary ?? source.excerpt ?? source.source_url) : (source.summary ?? source.excerpt ?? source.source_url),
    canRetainQueryText: false,
    canRetainRawContent: source.raw_content_stored && decision !== "redact_preview" && sensitivity === "none",
    canCreateCandidate: decision === "allow_preview" || decision === "manual_review_required",
    canPreviewSave: decision === "allow_preview" || decision === "manual_review_required",
    requiresManualSave: decision === "manual_review_required" || policy === "manual_save_only",
    auditEventPreview: {
      event_type: eventTypeForDecision(decision),
      actor_type: "system",
      event_summary: `Privacy retention preview for current-info source ${source.id}.`,
      event_payload: {
        source_kind: source.source_kind,
        retention_policy: policy,
        sensitive_category: sensitivity,
        raw_content_stored: source.raw_content_stored,
        decision,
        preview_only: true,
      },
    },
  };
}

export function evaluateCurrentInfoCandidatePrivacy(
  candidate: WebSourceCandidateRow,
): CurrentInfoPrivacyRuleResult {
  const decision = decisionForCandidate(candidate);
  const warnings = unique([
    ...candidate.privacy_warnings,
    ...candidate.reliability_warnings,
    ...candidate.freshness_warnings,
  ]);
  const blocked = BLOCKED_CANDIDATE_STATUSES.has(candidate.candidate_status);

  return {
    recordId: candidate.id,
    recordKind: "candidate",
    privateMode: candidate.candidate_status === "blocked_by_private_mode",
    retentionPolicy: "manual_save_only",
    retentionExpiresAt: null,
    sensitiveCategory: candidate.privacy_warnings.length > 0 ? "unknown" : "none",
    decision,
    blockedReason: blocked ? candidate.candidate_status : null,
    warnings,
    redactionPreview: decision === "block_retention" ? "[candidate redacted by private mode]" : "Candidate metadata preview only.",
    canRetainQueryText: false,
    canRetainRawContent: false,
    canCreateCandidate: false,
    canPreviewSave: decision === "allow_preview" || decision === "manual_review_required",
    requiresManualSave: true,
    auditEventPreview: {
      event_type: eventTypeForDecision(decision, blocked),
      actor_type: "system",
      event_summary: `Privacy retention preview for current-info candidate ${candidate.id}.`,
      event_payload: {
        candidate_type: candidate.candidate_type,
        candidate_status: candidate.candidate_status,
        decision,
        preview_only: true,
      },
    },
  };
}

export function evaluateCurrentInfoPrivacyRetentionRules(
  input: {
    queries?: WebSearchQueryRow[];
    sources?: WebSourceRow[];
    candidates?: WebSourceCandidateRow[];
    rules?: CurrentInfoRetentionRuleInput;
  },
): CurrentInfoPrivacyRetentionEvaluation {
  const queryResults = (input.queries ?? []).map((query) =>
    evaluateCurrentInfoQueryPrivacy(query, input.rules),
  );
  const sourceResults = (input.sources ?? []).map((source) =>
    evaluateCurrentInfoSourcePrivacy(source, input.rules),
  );
  const candidateResults = (input.candidates ?? []).map((candidate) =>
    evaluateCurrentInfoCandidatePrivacy(candidate),
  );
  const all = [...queryResults, ...sourceResults, ...candidateResults];

  return {
    summary: {
      totalRecords: all.length,
      privateModeCount: all.filter((item) => item.privateMode).length,
      doNotRetainCount: all.filter((item) => item.retentionPolicy === "do_not_retain").length,
      manualSaveOnlyCount: all.filter((item) => item.retentionPolicy === "manual_save_only").length,
      sensitiveCount: all.filter((item) => item.sensitiveCategory !== "none").length,
      blockedCount: all.filter((item) => item.decision === "block_retention" || item.decision === "block_save_preview").length,
      redactedCount: all.filter((item) => item.decision === "redact_preview").length,
      expiringCount: all.filter((item) => item.retentionExpiresAt !== null).length,
    },
    queryResults,
    sourceResults,
    candidateResults,
  };
}

export const PHASE_16P_PRIVACY_RETENTION_RULE_BOUNDARY =
  "Phase 16P evaluates privacy, sensitive-search, raw-content, and retention rules as previews only. It does not delete, redact, update, persist, browse, fetch, approve, reject, save, or create audit records.";
