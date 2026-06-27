import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  GrimoireCorruptionCheckRow,
  GrimoireDailyLogRow,
  GrimoireModeRow,
  GrimoireReversionRow,
  GrimoireSkillRow,
} from "@/types/database";

import type { RepositoryListResult } from "./core-read";

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

  return "Unknown Grimoire repository error";
}

export async function listGrimoireModes(
  userId: string,
  options: {
    missionType?: string;
    intensityLevel?: string;
    privacyLevel?: string;
    active?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<GrimoireModeRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("grimoire_modes")
      .select("*")
      .eq("user_id", userId)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true })
      .limit(limit);

    if (options.missionType) query = query.eq("mission_type", options.missionType as never);
    if (options.intensityLevel) query = query.eq("intensity_level", options.intensityLevel as never);
    if (options.privacyLevel) query = query.eq("privacy_level", options.privacyLevel as never);
    if (options.active !== undefined) query = query.eq("is_active", options.active);

    const { data, error } = await query;
    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as GrimoireModeRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGrimoireDailyLogs(
  userId: string,
  options: {
    modeId?: string;
    missionType?: string;
    reversionRequired?: boolean;
    reversionDone?: boolean;
    fromDate?: string;
    toDate?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<GrimoireDailyLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("grimoire_daily_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.modeId) query = query.eq("mode_id", options.modeId);
    if (options.missionType) query = query.eq("mission_type", options.missionType as never);
    if (options.reversionRequired !== undefined) query = query.eq("reversion_required", options.reversionRequired);
    if (options.reversionDone !== undefined) query = query.eq("reversion_done", options.reversionDone);
    if (options.fromDate) query = query.gte("log_date", options.fromDate as never);
    if (options.toDate) query = query.lte("log_date", options.toDate as never);

    const { data, error } = await query;
    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as GrimoireDailyLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGrimoireSkills(
  userId: string,
  options: {
    tier?: string;
    realm?: string;
    status?: string;
    relatedGoalId?: string;
    relatedTaskId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<GrimoireSkillRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("grimoire_skills")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.tier) query = query.eq("tier", options.tier as never);
    if (options.realm) query = query.eq("realm", options.realm as never);
    if (options.status) query = query.eq("status", options.status as never);
    if (options.relatedGoalId) query = query.eq("related_goal_id", options.relatedGoalId);
    if (options.relatedTaskId) query = query.eq("related_task_id", options.relatedTaskId);

    const { data, error } = await query;
    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as GrimoireSkillRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGrimoireCorruptionChecks(
  userId: string,
  options: {
    dailyLogId?: string;
    modeId?: string;
    riskType?: string;
    severity?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<GrimoireCorruptionCheckRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("grimoire_corruption_checks")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.dailyLogId) query = query.eq("daily_log_id", options.dailyLogId);
    if (options.modeId) query = query.eq("mode_id", options.modeId);
    if (options.riskType) query = query.eq("risk_type", options.riskType as never);
    if (options.severity) query = query.eq("severity", options.severity as never);
    if (options.status) query = query.eq("status", options.status as never);
    if (options.fromDate) query = query.gte("log_date", options.fromDate as never);
    if (options.toDate) query = query.lte("log_date", options.toDate as never);

    const { data, error } = await query;
    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as GrimoireCorruptionCheckRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGrimoireReversions(
  userId: string,
  options: {
    dailyLogId?: string;
    modeId?: string;
    completed?: boolean;
    fromDate?: string;
    toDate?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<GrimoireReversionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("grimoire_reversions")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.dailyLogId) query = query.eq("daily_log_id", options.dailyLogId);
    if (options.modeId) query = query.eq("mode_id", options.modeId);
    if (options.completed !== undefined) query = query.eq("completed", options.completed);
    if (options.fromDate) query = query.gte("log_date", options.fromDate as never);
    if (options.toDate) query = query.lte("log_date", options.toDate as never);

    const { data, error } = await query;
    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as GrimoireReversionRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}
