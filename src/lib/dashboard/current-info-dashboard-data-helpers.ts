import {
  listWebSearchQueries,
  listWebSourceAuditEvents,
  listWebSourceCandidates,
  listWebSourceLinks,
  listWebSources,
  type WebSearchQueryRow,
  type WebSourceCandidateRow,
  type WebSourceRow,
} from "@/lib/repositories";

export type CurrentInfoBreakdownItem = {
  label: string;
  count: number;
};

export type CurrentInfoDashboardSummary = {
  recent_query_count: number;
  executed_query_count: number;
  blocked_query_count: number;
  recent_source_count: number;
  private_source_count: number;
  pending_review_candidate_count: number;
  approved_candidate_count: number;
  rejected_candidate_count: number;
  blocked_candidate_count: number;
  source_link_count: number;
  audit_event_count: number;
  source_kind_breakdown: CurrentInfoBreakdownItem[];
  reliability_breakdown: CurrentInfoBreakdownItem[];
  freshness_breakdown: CurrentInfoBreakdownItem[];
  has_errors: boolean;
  errors: string[];
};

export type CurrentInfoDashboardDataResult = {
  summary: CurrentInfoDashboardSummary;
  generated_at: string;
};

function countBy<T>(items: T[], getLabel: (item: T) => string | null | undefined): CurrentInfoBreakdownItem[] {
  const counts = new Map<string, number>();

  for (const item of items) {
    const label = getLabel(item) ?? "unknown";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function isBlockedQuery(query: WebSearchQueryRow): boolean {
  return query.status === "blocked_by_private_mode" || query.status === "blocked_by_policy";
}

function isBlockedCandidate(candidate: WebSourceCandidateRow): boolean {
  return [
    "blocked_by_private_mode",
    "blocked_by_reliability",
    "blocked_by_duplicate",
  ].includes(candidate.candidate_status);
}

export async function getCurrentInfoDashboardDataSummary(
  userId: string,
): Promise<CurrentInfoDashboardDataResult> {
  const [queries, sources, candidates, links, auditEvents] = await Promise.all([
    listWebSearchQueries(userId, { limit: 100 }),
    listWebSources(userId, { limit: 100 }),
    listWebSourceCandidates(userId, { limit: 100 }),
    listWebSourceLinks(userId, { limit: 100 }),
    listWebSourceAuditEvents(userId, { limit: 100 }),
  ]);

  const queryRows = queries.data;
  const sourceRows = sources.data;
  const candidateRows = candidates.data;
  const linkRows = links.data;
  const auditRows = auditEvents.data;

  const errors = [
    queries.error,
    sources.error,
    candidates.error,
    links.error,
    auditEvents.error,
  ].filter((error): error is string => Boolean(error));

  return {
    generated_at: new Date().toISOString(),
    summary: {
      recent_query_count: queryRows.length,
      executed_query_count: queryRows.filter((query) => query.status === "executed").length,
      blocked_query_count: queryRows.filter(isBlockedQuery).length,
      recent_source_count: sourceRows.length,
      private_source_count: sourceRows.filter((source: WebSourceRow) => source.private_mode).length,
      pending_review_candidate_count: candidateRows.filter(
        (candidate) => candidate.candidate_status === "pending_review",
      ).length,
      approved_candidate_count: candidateRows.filter(
        (candidate) => candidate.candidate_status === "approved",
      ).length,
      rejected_candidate_count: candidateRows.filter(
        (candidate) => candidate.candidate_status === "rejected",
      ).length,
      blocked_candidate_count: candidateRows.filter(isBlockedCandidate).length,
      source_link_count: linkRows.length,
      audit_event_count: auditRows.length,
      source_kind_breakdown: countBy(sourceRows, (source) => source.source_kind),
      reliability_breakdown: countBy(sourceRows, (source) => source.reliability_label),
      freshness_breakdown: countBy(sourceRows, (source) => source.freshness_label),
      has_errors: errors.length > 0,
      errors,
    },
  };
}

export const EMPTY_CURRENT_INFO_DASHBOARD_SUMMARY: CurrentInfoDashboardSummary = {
  recent_query_count: 0,
  executed_query_count: 0,
  blocked_query_count: 0,
  recent_source_count: 0,
  private_source_count: 0,
  pending_review_candidate_count: 0,
  approved_candidate_count: 0,
  rejected_candidate_count: 0,
  blocked_candidate_count: 0,
  source_link_count: 0,
  audit_event_count: 0,
  source_kind_breakdown: [],
  reliability_breakdown: [],
  freshness_breakdown: [],
  has_errors: false,
  errors: [],
};

export const PHASE_16I_CURRENT_INFO_DASHBOARD_HELPER_BOUNDARY =
  "Phase 16I current-info dashboard helpers summarize read-only web source data and cannot render UI, browse, write, approve, reject, or convert candidates to memory.";
