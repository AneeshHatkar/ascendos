import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  AiActionRow,
  AuditLogRow,
  ChatMessageRow,
  ChatSessionRow,
  DailyLogRow,
  EventRow,
  GoalMilestoneRow,
  GoalRow,
  ProofItemRow,
  TaskRow,
} from "@/types/database";

export type RepositoryResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export type RepositoryListResult<T> = RepositoryResult<T[]>;

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

function clampLimit(limit: number | undefined): number {
  if (limit === undefined || Number.isNaN(limit)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT);
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown repository error";
}

export async function listAuditLogs(
  userId: string,
  options: {
    limit?: number;
  } = {},
): Promise<RepositoryListResult<AuditLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listAiActions(
  userId: string,
  options: {
    status?: AiActionRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<AiActionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("ai_actions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listChatSessions(
  userId: string,
  options: {
    status?: ChatSessionRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ChatSessionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("chat_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listChatMessages(
  userId: string,
  sessionId: string,
  options: {
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ChatMessageRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGoals(
  userId: string,
  options: {
    status?: GoalRow["status"];
    domain?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<GoalRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGoalMilestones(
  userId: string,
  goalId: string,
): Promise<RepositoryListResult<GoalMilestoneRow>> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("goal_milestones")
      .select("*")
      .eq("user_id", userId)
      .eq("goal_id", goalId)
      .order("sort_order", { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listDailyLogs(
  userId: string,
  options: {
    limit?: number;
  } = {},
): Promise<RepositoryListResult<DailyLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    const { data, error } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProofItems(
  userId: string,
  options: {
    domain?: string;
    status?: ProofItemRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProofItemRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("proof_items")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listTasks(
  userId: string,
  options: {
    status?: TaskRow["status"];
    domain?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<TaskRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listEvents(
  userId: string,
  options: {
    status?: EventRow["status"];
    domain?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<EventRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("events")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}
