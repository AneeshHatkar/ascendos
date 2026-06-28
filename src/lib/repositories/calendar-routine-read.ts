import type { SupabaseClient } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "@/lib/supabase/server";

type UntypedSupabaseClient = SupabaseClient<Record<string, never>, "public", Record<string, never>>;

export type CalendarBlockRow = {
  id: string;
  user_id: string;
  event_id: string | null;
  task_id: string | null;
  goal_id: string | null;
  title: string;
  description: string | null;
  domain: string;
  block_type: string;
  status: string;
  start_at: string;
  end_at: string | null;
  timezone: string | null;
  location: string | null;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

export type RoutineRow = {
  id: string;
  user_id: string;
  goal_id: string | null;
  title: string;
  description: string | null;
  domain: string;
  routine_type: string;
  status: string;
  cadence_rule: string | null;
  anchor_time: string | null;
  start_date: string | null;
  end_date: string | null;
  timezone: string | null;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

export type RoutineStepRow = {
  id: string;
  user_id: string;
  routine_id: string;
  task_id: string | null;
  title: string;
  description: string | null;
  step_order: number;
  duration_minutes: number | null;
  status: string;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ReminderRow = {
  id: string;
  user_id: string;
  event_id: string | null;
  task_id: string | null;
  goal_id: string | null;
  routine_id: string | null;
  title: string;
  message: string | null;
  reminder_type: string;
  status: string;
  remind_at: string;
  delivered_at: string | null;
  dismissed_at: string | null;
  snoozed_until: string | null;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

type ReadOptions = {
  limit?: number;
  status?: string;
  domain?: string;
};

function limitFor(options?: ReadOptions) {
  return Math.min(Math.max(options?.limit ?? 25, 1), 100);
}

function normalizeError(error: unknown) {
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

  return "Unknown read error.";
}

async function getClient(supabase?: UntypedSupabaseClient) {
  return (supabase ?? (await createSupabaseServerClient())) as UntypedSupabaseClient;
}

export async function listCalendarBlocks(
  userId: string,
  options?: ReadOptions & { supabase?: UntypedSupabaseClient },
): Promise<{ data: CalendarBlockRow[]; error: string | null }> {
  const supabase = await getClient(options?.supabase);

  let query = supabase
    .from("calendar_blocks")
    .select("*")
    .eq("user_id", userId)
    .order("start_at", { ascending: true })
    .limit(limitFor(options));

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.domain) {
    query = query.eq("domain", options.domain);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as CalendarBlockRow[],
    error: normalizeError(error),
  };
}

export async function listRoutines(
  userId: string,
  options?: ReadOptions & { supabase?: UntypedSupabaseClient },
): Promise<{ data: RoutineRow[]; error: string | null }> {
  const supabase = await getClient(options?.supabase);

  let query = supabase
    .from("routines")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limitFor(options));

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.domain) {
    query = query.eq("domain", options.domain);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as RoutineRow[],
    error: normalizeError(error),
  };
}

export async function listRoutineSteps(
  userId: string,
  options?: ReadOptions & { supabase?: UntypedSupabaseClient; routineId?: string },
): Promise<{ data: RoutineStepRow[]; error: string | null }> {
  const supabase = await getClient(options?.supabase);

  let query = supabase
    .from("routine_steps")
    .select("*")
    .eq("user_id", userId)
    .order("step_order", { ascending: true })
    .limit(limitFor(options));

  if (options?.routineId) {
    query = query.eq("routine_id", options.routineId);
  }

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as RoutineStepRow[],
    error: normalizeError(error),
  };
}

export async function listReminders(
  userId: string,
  options?: ReadOptions & { supabase?: UntypedSupabaseClient },
): Promise<{ data: ReminderRow[]; error: string | null }> {
  const supabase = await getClient(options?.supabase);

  let query = supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .order("remind_at", { ascending: true })
    .limit(limitFor(options));

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as ReminderRow[],
    error: normalizeError(error),
  };
}
