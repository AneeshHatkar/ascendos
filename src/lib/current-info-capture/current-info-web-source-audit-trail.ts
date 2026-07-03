import type {
  WebSourceAuditEventRow,
  WebSourceCandidateRow,
  WebSourceLinkRow,
  WebSourceRow,
} from "@/lib/repositories";

export type CurrentInfoAuditTrailEventType =
  | "web_search_performed"
  | "web_source_viewed"
  | "web_source_candidate_created"
  | "web_source_candidate_approved"
  | "web_source_candidate_rejected"
  | "web_source_saved"
  | "web_source_linked_to_record"
  | "web_source_marked_stale"
  | "web_source_blocked_by_private_mode"
  | "web_source_blocked_by_reliability";

export type CurrentInfoAuditTrailActorType = "user" | "carnos" | "system";

export type CurrentInfoAuditTrailSeverity =
  | "info"
  | "success"
  | "warning"
  | "blocked"
  | "unknown";

export type CurrentInfoAuditTrailRecord = {
  id: string;
  eventType: string;
  actorType: string;
  severity: CurrentInfoAuditTrailSeverity;
  summary: string;
  sourceId: string | null;
  candidateId: string | null;
  sourceLinkId: string | null;
  searchQueryId: string | null;
  createdAt: string;
  linkedSourceTitle: string | null;
  linkedSourceUrl: string | null;
  linkedCandidateStatus: string | null;
  linkedRecordTable: string | null;
  linkedRecordKind: string | null;
  payloadPreview: string;
  provenanceLabels: string[];
};

export type CurrentInfoAuditTrailSummary = {
  totalEvents: number;
  userEventCount: number;
  carnosEventCount: number;
  systemEventCount: number;
  blockedEventCount: number;
  saveEventCount: number;
  linkEventCount: number;
  staleEventCount: number;
  candidateEventCount: number;
  sourceCoverageCount: number;
  candidateCoverageCount: number;
  sourceLinkCoverageCount: number;
};

export type CurrentInfoAuditTrailResult = {
  summary: CurrentInfoAuditTrailSummary;
  records: CurrentInfoAuditTrailRecord[];
  eventTypeBreakdown: { label: string; count: number }[];
  actorTypeBreakdown: { label: string; count: number }[];
  sourceCoverageWarnings: string[];
};

function severityForEvent(eventType: string): CurrentInfoAuditTrailSeverity {
  if (eventType.includes("blocked")) {
    return "blocked";
  }

  if (eventType.includes("rejected") || eventType.includes("stale")) {
    return "warning";
  }

  if (eventType.includes("approved") || eventType.includes("saved") || eventType.includes("linked")) {
    return "success";
  }

  if (
    eventType === "web_search_performed" ||
    eventType === "web_source_viewed" ||
    eventType === "web_source_candidate_created"
  ) {
    return "info";
  }

  return "unknown";
}

function countBy<T>(rows: T[], key: (row: T) => string | null | undefined) {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const value = key(row) ?? "unknown";
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function previewPayload(value: unknown): string {
  if (value === null || value === undefined) {
    return "{}";
  }

  try {
    const text = JSON.stringify(value);

    if (!text) {
      return "{}";
    }

    return text.length > 180 ? `${text.slice(0, 177)}...` : text;
  } catch {
    return "[unserializable payload]";
  }
}

function sourceTitle(source: WebSourceRow | null) {
  return source?.title ?? source?.domain ?? source?.citation_label ?? null;
}

function sourceUrl(source: WebSourceRow | null) {
  return source?.citation_url ?? source?.source_url ?? null;
}

function labelsForRecord(params: {
  event: WebSourceAuditEventRow;
  source: WebSourceRow | null;
  candidate: WebSourceCandidateRow | null;
  link: WebSourceLinkRow | null;
}) {
  const labels: string[] = [];

  labels.push(params.event.event_type);
  labels.push(params.event.actor_type);

  if (params.source?.reliability_label) {
    labels.push(`reliability:${params.source.reliability_label}`);
  }

  if (params.source?.freshness_label) {
    labels.push(`freshness:${params.source.freshness_label}`);
  }

  if (params.candidate?.candidate_status) {
    labels.push(`candidate:${params.candidate.candidate_status}`);
  }

  if (params.link?.link_status) {
    labels.push(`link:${params.link.link_status}`);
  }

  return [...new Set(labels)];
}

export function buildCurrentInfoWebSourceAuditTrail(input: {
  auditEvents: WebSourceAuditEventRow[];
  sources?: WebSourceRow[];
  candidates?: WebSourceCandidateRow[];
  links?: WebSourceLinkRow[];
}): CurrentInfoAuditTrailResult {
  const sourcesById = new Map((input.sources ?? []).map((source) => [source.id, source]));
  const candidatesById = new Map((input.candidates ?? []).map((candidate) => [candidate.id, candidate]));
  const linksById = new Map((input.links ?? []).map((link) => [link.id, link]));

  const records = input.auditEvents.map((event) => {
    const source = event.source_id ? sourcesById.get(event.source_id) ?? null : null;
    const candidate = event.candidate_id ? candidatesById.get(event.candidate_id) ?? null : null;
    const link = event.source_link_id ? linksById.get(event.source_link_id) ?? null : null;

    return {
      id: event.id,
      eventType: event.event_type,
      actorType: event.actor_type,
      severity: severityForEvent(event.event_type),
      summary: event.event_summary,
      sourceId: event.source_id,
      candidateId: event.candidate_id,
      sourceLinkId: event.source_link_id,
      searchQueryId: event.search_query_id,
      createdAt: event.created_at,
      linkedSourceTitle: sourceTitle(source),
      linkedSourceUrl: sourceUrl(source),
      linkedCandidateStatus: candidate?.candidate_status ?? null,
      linkedRecordTable: link?.linked_table ?? null,
      linkedRecordKind: link?.link_kind ?? null,
      payloadPreview: previewPayload(event.event_payload),
      provenanceLabels: labelsForRecord({ event, source, candidate, link }),
    } satisfies CurrentInfoAuditTrailRecord;
  });

  const sourceCoverageWarnings: string[] = [];

  for (const event of input.auditEvents) {
    if (event.source_id && !sourcesById.has(event.source_id)) {
      sourceCoverageWarnings.push(`Missing source row for audit event ${event.id}.`);
    }

    if (event.candidate_id && !candidatesById.has(event.candidate_id)) {
      sourceCoverageWarnings.push(`Missing candidate row for audit event ${event.id}.`);
    }

    if (event.source_link_id && !linksById.has(event.source_link_id)) {
      sourceCoverageWarnings.push(`Missing source link row for audit event ${event.id}.`);
    }
  }

  return {
    summary: {
      totalEvents: records.length,
      userEventCount: records.filter((record) => record.actorType === "user").length,
      carnosEventCount: records.filter((record) => record.actorType === "carnos").length,
      systemEventCount: records.filter((record) => record.actorType === "system").length,
      blockedEventCount: records.filter((record) => record.severity === "blocked").length,
      saveEventCount: records.filter((record) => record.eventType === "web_source_saved").length,
      linkEventCount: records.filter((record) => record.eventType === "web_source_linked_to_record").length,
      staleEventCount: records.filter((record) => record.eventType === "web_source_marked_stale").length,
      candidateEventCount: records.filter((record) => record.candidateId !== null).length,
      sourceCoverageCount: records.filter((record) => record.sourceId !== null).length,
      candidateCoverageCount: records.filter((record) => record.candidateId !== null).length,
      sourceLinkCoverageCount: records.filter((record) => record.sourceLinkId !== null).length,
    },
    records,
    eventTypeBreakdown: countBy(records, (record) => record.eventType),
    actorTypeBreakdown: countBy(records, (record) => record.actorType),
    sourceCoverageWarnings: [...new Set(sourceCoverageWarnings)],
  };
}

export const PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_BOUNDARY =
  "Phase 16Q builds read-only web source audit trail summaries from existing rows. It does not insert audit events, write audit logs, update source links, approve, reject, save, browse, fetch, call providers, or create embeddings.";
