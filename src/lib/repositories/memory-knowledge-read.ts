import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  CarnosContextSnapshotRow,
  KnowledgeItemRow,
  KnowledgeLinkRow,
  KnowledgeTagRow,
  MemoryRetrievalEventRow,
  MemoryReviewQueueRow,
  MemoryUsageLogRow,
  ProjectMemoryStateRow,
  RetrievalLogRow,
  SystemMemoryStateRow,
} from "@/types/database";

import type { RepositoryListResult } from "./core-read";

/**
 * Phase 20Z-E — Memory / Knowledge / Carnos read repository alignment.
 *
 * Boundary:
 * - Read-only repository coverage for SQL tables created in Phase 15 / 17 migrations.
 * - No writes.
 * - No embeddings.
 * - No vector search.
 * - No provider calls.
 * - No Carnos prompt injection.
 * - No background retrieval.
 * - No memory approval or deletion.
 */

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

type MemoryKnowledgeTableName =
  | "carnos_context_snapshots"
  | "carnos_entity_state"
  | "memory_candidates"
  | "memory_events"
  | "memory_items"
  | "project_memory_state"
  | "system_memory_state"
  | "knowledge_items"
  | "knowledge_tags"
  | "knowledge_links"
  | "retrieval_logs"
  | "memory_usage_logs"
  | "memory_review_queue"
  | "memory_retrieval_events";

type RepositoryErrorLike = {
  message?: string;
};

type MemoryKnowledgeQueryResult = {
  data: unknown[] | null;
  error: RepositoryErrorLike | null;
};

type MemoryKnowledgeQueryBuilder = {
  select(columns?: string): MemoryKnowledgeQueryBuilder;
  eq(column: string, value: unknown): MemoryKnowledgeQueryBuilder;
  in(column: string, values: readonly unknown[]): MemoryKnowledgeQueryBuilder;
  order(column: string, options?: { ascending?: boolean }): MemoryKnowledgeQueryBuilder;
  limit(count: number): MemoryKnowledgeQueryBuilder;
};

type MemoryKnowledgeClient = {
  from(table: MemoryKnowledgeTableName): MemoryKnowledgeQueryBuilder;
};

function clampLimit(limit: number | undefined): number {
  if (limit === undefined || Number.isNaN(limit)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT);
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as RepositoryErrorLike).message === "string"
  ) {
    return (error as RepositoryErrorLike).message ?? "Unknown memory/knowledge repository error";
  }

  return "Unknown memory/knowledge repository error";
}

async function getMemoryKnowledgeClient(): Promise<MemoryKnowledgeClient> {
  return (await createSupabaseServerClient()) as unknown as MemoryKnowledgeClient;
}

async function resolveQuery<T>(
  query: MemoryKnowledgeQueryBuilder,
): Promise<RepositoryListResult<T>> {
  try {
    const result = await (query as unknown as Promise<MemoryKnowledgeQueryResult>);

    if (result.error) {
      return { data: null, error: getErrorMessage(result.error) };
    }

    return { data: (result.data ?? []) as T[], error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

async function listRows<T>(
  table: MemoryKnowledgeTableName,
  userId: string,
  options: {
    limit?: number;
    orderBy?: string;
    ascending?: boolean;
    statusColumn?: string;
    statuses?: readonly string[];
  } = {},
): Promise<RepositoryListResult<T>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from(table)
    .select("*")
    .eq("user_id", userId)
    .order(options.orderBy ?? "created_at", { ascending: options.ascending ?? false })
    .limit(limit);

  if (options.statusColumn && options.statuses && options.statuses.length > 0) {
    query = query.in(options.statusColumn, options.statuses);
  }

  return resolveQuery<T>(query);
}

export async function listKnowledgeItems(
  userId: string,
  options: {
    statuses?: KnowledgeItemRow["status"][];
    knowledge_type?: KnowledgeItemRow["knowledge_type"];
    sensitivity?: KnowledgeItemRow["sensitivity"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<KnowledgeItemRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("knowledge_items")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("status", options.statuses);
  }
  if (options.knowledge_type) {
    query = query.eq("knowledge_type", options.knowledge_type);
  }
  if (options.sensitivity) {
    query = query.eq("sensitivity", options.sensitivity);
  }

  return resolveQuery<KnowledgeItemRow>(query);
}

export async function listKnowledgeTags(
  userId: string,
  options: {
    tag_scope?: KnowledgeTagRow["tag_scope"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<KnowledgeTagRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("knowledge_tags")
    .select("*")
    .eq("user_id", userId)
    .order("tag_name", { ascending: true })
    .limit(limit);

  if (options.tag_scope) {
    query = query.eq("tag_scope", options.tag_scope);
  }

  return resolveQuery<KnowledgeTagRow>(query);
}

export async function listKnowledgeLinks(
  userId: string,
  options: {
    knowledge_item_id?: string;
    knowledge_tag_id?: string;
    link_type?: KnowledgeLinkRow["link_type"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<KnowledgeLinkRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("knowledge_links")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.knowledge_item_id) {
    query = query.eq("knowledge_item_id", options.knowledge_item_id);
  }
  if (options.knowledge_tag_id) {
    query = query.eq("knowledge_tag_id", options.knowledge_tag_id);
  }
  if (options.link_type) {
    query = query.eq("link_type", options.link_type);
  }

  return resolveQuery<KnowledgeLinkRow>(query);
}

export async function listProjectMemoryStates(
  userId: string,
  options: {
    statuses?: ProjectMemoryStateRow["status"][];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectMemoryStateRow>> {
  return listRows<ProjectMemoryStateRow>("project_memory_state", userId, {
    limit: options.limit,
    orderBy: "updated_at",
    statusColumn: "status",
    statuses: options.statuses,
  });
}

export async function listSystemMemoryStates(
  userId: string,
  options: {
    statuses?: SystemMemoryStateRow["status"][];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SystemMemoryStateRow>> {
  return listRows<SystemMemoryStateRow>("system_memory_state", userId, {
    limit: options.limit,
    orderBy: "source_of_truth_rank",
    ascending: true,
    statusColumn: "status",
    statuses: options.statuses,
  });
}

export async function listCarnosContextSnapshots(
  userId: string,
  options: {
    statuses?: CarnosContextSnapshotRow["status"][];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<CarnosContextSnapshotRow>> {
  return listRows<CarnosContextSnapshotRow>("carnos_context_snapshots", userId, {
    limit: options.limit,
    orderBy: "created_at",
    statusColumn: "status",
    statuses: options.statuses,
  });
}

export async function listRetrievalLogs(
  userId: string,
  options: {
    retrieval_mode?: RetrievalLogRow["retrieval_mode"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<RetrievalLogRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("retrieval_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.retrieval_mode) {
    query = query.eq("retrieval_mode", options.retrieval_mode);
  }

  return resolveQuery<RetrievalLogRow>(query);
}

export async function listMemoryUsageLogs(
  userId: string,
  options: {
    memory_item_id?: string;
    knowledge_item_id?: string;
    used_in_context_pack?: boolean;
    used_in_carnos_response?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryUsageLogRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("memory_usage_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.memory_item_id) {
    query = query.eq("memory_item_id", options.memory_item_id);
  }
  if (options.knowledge_item_id) {
    query = query.eq("knowledge_item_id", options.knowledge_item_id);
  }
  if (options.used_in_context_pack !== undefined) {
    query = query.eq("used_in_context_pack", options.used_in_context_pack);
  }
  if (options.used_in_carnos_response !== undefined) {
    query = query.eq("used_in_carnos_response", options.used_in_carnos_response);
  }

  return resolveQuery<MemoryUsageLogRow>(query);
}

export async function listMemoryReviewQueueItems(
  userId: string,
  options: {
    review_statuses?: MemoryReviewQueueRow["review_status"][];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryReviewQueueRow>> {
  return listRows<MemoryReviewQueueRow>("memory_review_queue", userId, {
    limit: options.limit,
    orderBy: "created_at",
    statusColumn: "review_status",
    statuses: options.review_statuses,
  });
}

export async function listMemoryRetrievalEvents(
  userId: string,
  options: {
    retrieval_mode?: MemoryRetrievalEventRow["retrieval_mode"];
    provider_status?: MemoryRetrievalEventRow["provider_status"];
    used_by_carnos?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryRetrievalEventRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("memory_retrieval_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.retrieval_mode) {
    query = query.eq("retrieval_mode", options.retrieval_mode);
  }
  if (options.provider_status) {
    query = query.eq("provider_status", options.provider_status);
  }
  if (options.used_by_carnos !== undefined) {
    query = query.eq("used_by_carnos", options.used_by_carnos);
  }

  return resolveQuery<MemoryRetrievalEventRow>(query);
}
/**
 * Phase 20Z-F — Exact memory table read closure.
 *
 * These functions intentionally use literal `.from("table_name")` calls instead
 * of the generic `listRows(table, ...)` helper so the final Phase 0–20 exact
 * chain verifier can prove that every created memory/Carnos state table has a
 * concrete repository read path.
 *
 * Boundary:
 * - Read-only.
 * - No inserts, updates, deletes, approvals, deletions, embeddings, vector
 *   retrieval, provider calls, prompt injection, or background memory actions.
 */

export type MemoryClosureReadRow = Record<string, unknown>;

export async function listCarnosContextSnapshotsForReview(
  userId: string,
  options: {
    statuses?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<CarnosContextSnapshotRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("carnos_context_snapshots")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("status", options.statuses);
  }

  return resolveQuery<CarnosContextSnapshotRow>(query);
}

export async function listCarnosEntityStatesForReview(
  userId: string,
  options: {
    statuses?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryClosureReadRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("carnos_entity_state")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("status", options.statuses);
  }

  return resolveQuery<MemoryClosureReadRow>(query);
}

export async function listMemoryCandidatesForReview(
  userId: string,
  options: {
    statuses?: readonly string[];
    memoryTypes?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryClosureReadRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("memory_candidates")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("status", options.statuses);
  }
  if (options.memoryTypes && options.memoryTypes.length > 0) {
    query = query.in("memory_type", options.memoryTypes);
  }

  return resolveQuery<MemoryClosureReadRow>(query);
}

export async function listMemoryItemsForReview(
  userId: string,
  options: {
    statuses?: readonly string[];
    memoryTypes?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryClosureReadRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("memory_items")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("status", options.statuses);
  }
  if (options.memoryTypes && options.memoryTypes.length > 0) {
    query = query.in("memory_type", options.memoryTypes);
  }

  return resolveQuery<MemoryClosureReadRow>(query);
}

export async function listMemoryEventsForReview(
  userId: string,
  options: {
    eventTypes?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryClosureReadRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("memory_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.eventTypes && options.eventTypes.length > 0) {
    query = query.in("event_type", options.eventTypes);
  }

  return resolveQuery<MemoryClosureReadRow>(query);
}

export async function listMemoryReviewQueueForReview(
  userId: string,
  options: {
    statuses?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MemoryReviewQueueRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("memory_review_queue")
    .select("*")
    .eq("user_id", userId)
    .order("due_at", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("review_status", options.statuses);
  }

  return resolveQuery<MemoryReviewQueueRow>(query);
}

export async function listProjectMemoryStatesForReview(
  userId: string,
  options: {
    statuses?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectMemoryStateRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("project_memory_state")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("status", options.statuses);
  }

  return resolveQuery<ProjectMemoryStateRow>(query);
}

export async function listSystemMemoryStatesForReview(
  userId: string,
  options: {
    statuses?: readonly string[];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SystemMemoryStateRow>> {
  const supabase = await getMemoryKnowledgeClient();
  const limit = clampLimit(options.limit);

  let query = supabase
    .from("system_memory_state")
    .select("*")
    .eq("user_id", userId)
    .order("source_of_truth_rank", { ascending: true })
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (options.statuses && options.statuses.length > 0) {
    query = query.in("status", options.statuses);
  }

  return resolveQuery<SystemMemoryStateRow>(query);
}
