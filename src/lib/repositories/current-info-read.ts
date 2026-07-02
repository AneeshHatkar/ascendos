import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CurrentInfoJson =
  | string
  | number
  | boolean
  | null
  | { [key: string]: CurrentInfoJson | undefined }
  | CurrentInfoJson[];

export type WebSearchQueryRow = {
  id: string;
  user_id: string;
  query_text: string;
  query_hash: string | null;
  query_kind: string;
  search_surface: string;
  provider_kind: string;
  provider_query_id: string | null;
  status: string;
  private_mode: boolean;
  retention_policy: string;
  retention_expires_at: string | null;
  sensitive_category: string | null;
  blocked_reason: string | null;
  result_count: number;
  executed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type WebSourceRow = {
  id: string;
  user_id: string;
  search_query_id: string | null;
  source_url: string;
  canonical_url: string | null;
  url_hash: string | null;
  domain: string | null;
  title: string | null;
  description: string | null;
  excerpt: string | null;
  summary: string | null;
  source_kind: string;
  reliability_label: string;
  freshness_label: string;
  published_at: string | null;
  retrieved_at: string | null;
  citation_accessed_at: string | null;
  citation_label: string | null;
  citation_url: string | null;
  raw_content_stored: boolean;
  content_hash: string | null;
  private_mode: boolean;
  sensitive_category: string | null;
  retention_policy: string;
  retention_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type WebSourceCandidateRow = {
  id: string;
  user_id: string;
  search_query_id: string | null;
  source_id: string | null;
  candidate_type: string;
  candidate_status: string;
  suggested_destination_table: string | null;
  suggested_action_type: string | null;
  extracted_payload: CurrentInfoJson;
  missing_fields: string[];
  duplicate_hints: CurrentInfoJson;
  reliability_warnings: string[];
  freshness_warnings: string[];
  privacy_warnings: string[];
  review_notes: string | null;
  reviewed_at: string | null;
  approved_at: string | null;
  rejected_at: string | null;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
};

export type WebSourceLinkRow = {
  id: string;
  user_id: string;
  source_id: string;
  candidate_id: string | null;
  linked_table: string;
  linked_record_id: string | null;
  link_kind: string;
  link_status: string;
  citation_label: string | null;
  citation_url: string | null;
  evidence_note: string | null;
  created_at: string;
  updated_at: string;
};

export type WebSourceAuditEventRow = {
  id: string;
  user_id: string;
  search_query_id: string | null;
  source_id: string | null;
  candidate_id: string | null;
  source_link_id: string | null;
  event_type: string;
  actor_type: string;
  event_summary: string;
  event_payload: CurrentInfoJson;
  created_at: string;
};

export type CurrentInfoReadResult<T> = {
  data: T[];
  error: string | null;
};

type QueryResponse = {
  data: unknown[] | null;
  error: unknown;
};

type CurrentInfoQuery = PromiseLike<QueryResponse> & {
  select: (columns: string) => CurrentInfoQuery;
  eq: (column: string, value: string | boolean) => CurrentInfoQuery;
  order: (column: string, options: { ascending: boolean }) => CurrentInfoQuery;
  limit: (count: number) => CurrentInfoQuery;
};

type CurrentInfoReadClient = {
  from: (table: string) => CurrentInfoQuery;
};

type ReadOptions = {
  limit?: number;
};

type QueryReadOptions = ReadOptions & {
  status?: string;
  queryKind?: string;
  privateMode?: boolean;
};

type SourceReadOptions = ReadOptions & {
  sourceKind?: string;
  reliabilityLabel?: string;
  freshnessLabel?: string;
  privateMode?: boolean;
};

type CandidateReadOptions = ReadOptions & {
  candidateStatus?: string;
  candidateType?: string;
};

type LinkReadOptions = ReadOptions & {
  linkedTable?: string;
  linkKind?: string;
  linkStatus?: string;
};

type AuditEventReadOptions = ReadOptions & {
  eventType?: string;
  actorType?: string;
};

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

function limitFor(options?: ReadOptions): number {
  const rawLimit = options?.limit;

  if (rawLimit === undefined || Number.isNaN(rawLimit)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(rawLimit), 1), MAX_LIMIT);
}

function normalizeError(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === "string") {
      return message;
    }
  }

  return "Unknown current-info read error.";
}

async function getCurrentInfoReadClient(): Promise<CurrentInfoReadClient> {
  return (await createSupabaseServerClient()) as unknown as CurrentInfoReadClient;
}

export async function listWebSearchQueries(
  userId: string,
  options: QueryReadOptions = {},
): Promise<CurrentInfoReadResult<WebSearchQueryRow>> {
  const supabase = await getCurrentInfoReadClient();

  let query = supabase
    .from("web_search_queries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limitFor(options));

  if (options.status) {
    query = query.eq("status", options.status);
  }

  if (options.queryKind) {
    query = query.eq("query_kind", options.queryKind);
  }

  if (options.privateMode !== undefined) {
    query = query.eq("private_mode", options.privateMode);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as WebSearchQueryRow[],
    error: normalizeError(error),
  };
}

export async function listWebSources(
  userId: string,
  options: SourceReadOptions = {},
): Promise<CurrentInfoReadResult<WebSourceRow>> {
  const supabase = await getCurrentInfoReadClient();

  let query = supabase
    .from("web_sources")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limitFor(options));

  if (options.sourceKind) {
    query = query.eq("source_kind", options.sourceKind);
  }

  if (options.reliabilityLabel) {
    query = query.eq("reliability_label", options.reliabilityLabel);
  }

  if (options.freshnessLabel) {
    query = query.eq("freshness_label", options.freshnessLabel);
  }

  if (options.privateMode !== undefined) {
    query = query.eq("private_mode", options.privateMode);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as WebSourceRow[],
    error: normalizeError(error),
  };
}

export async function listWebSourceCandidates(
  userId: string,
  options: CandidateReadOptions = {},
): Promise<CurrentInfoReadResult<WebSourceCandidateRow>> {
  const supabase = await getCurrentInfoReadClient();

  let query = supabase
    .from("web_source_candidates")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limitFor(options));

  if (options.candidateStatus) {
    query = query.eq("candidate_status", options.candidateStatus);
  }

  if (options.candidateType) {
    query = query.eq("candidate_type", options.candidateType);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as WebSourceCandidateRow[],
    error: normalizeError(error),
  };
}

export async function listWebSourceLinks(
  userId: string,
  options: LinkReadOptions = {},
): Promise<CurrentInfoReadResult<WebSourceLinkRow>> {
  const supabase = await getCurrentInfoReadClient();

  let query = supabase
    .from("web_source_links")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limitFor(options));

  if (options.linkedTable) {
    query = query.eq("linked_table", options.linkedTable);
  }

  if (options.linkKind) {
    query = query.eq("link_kind", options.linkKind);
  }

  if (options.linkStatus) {
    query = query.eq("link_status", options.linkStatus);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as WebSourceLinkRow[],
    error: normalizeError(error),
  };
}

export async function listWebSourceAuditEvents(
  userId: string,
  options: AuditEventReadOptions = {},
): Promise<CurrentInfoReadResult<WebSourceAuditEventRow>> {
  const supabase = await getCurrentInfoReadClient();

  let query = supabase
    .from("web_source_audit_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limitFor(options));

  if (options.eventType) {
    query = query.eq("event_type", options.eventType);
  }

  if (options.actorType) {
    query = query.eq("actor_type", options.actorType);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as WebSourceAuditEventRow[],
    error: normalizeError(error),
  };
}

export const PHASE_16I_CURRENT_INFO_READ_REPOSITORY_BOUNDARY =
  "Phase 16I current-info read repository is read-only, user-scoped, dashboard-oriented, and cannot write, browse, approve, reject, execute, or convert sources to memory.";
