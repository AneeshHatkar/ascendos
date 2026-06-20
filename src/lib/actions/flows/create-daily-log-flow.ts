import type { SupabaseClient } from "@supabase/supabase-js";

import { createActionError, createActionSuccess, type ActionResult } from "../action-results";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { writeTimelineEvent } from "@/lib/timeline/write-timeline-event";
import type { Database, DailyLogInsert, Json } from "@/types/database";

type PayloadRecord = { [key: string]: Json | undefined };

export interface ExecuteCreateDailyLogActionInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  ai_action_id: string;
}

export interface ExecuteCreateDailyLogActionData {
  ai_action_id: string;
  daily_log_id: string;
  status: "executed";
}

function isPayloadRecord(payload: Json): payload is PayloadRecord {
  return Boolean(payload) && typeof payload === "object" && !Array.isArray(payload);
}

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function optionalNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function rangedInteger(value: unknown, min: number, max: number): number | null {
  const maybeNumber = optionalNumber(value);

  if (maybeNumber === null) {
    return null;
  }

  if (maybeNumber < min || maybeNumber > max) {
    return null;
  }

  return Math.round(maybeNumber);
}

function rangedNumber(value: unknown, min: number, max: number): number | null {
  const maybeNumber = optionalNumber(value);

  if (maybeNumber === null) {
    return null;
  }

  if (maybeNumber < min || maybeNumber > max) {
    return null;
  }

  return maybeNumber;
}

function optionalJsonArray(value: Json | undefined): Json {
  return Array.isArray(value) ? value : [];
}

export async function executeCreateDailyLogAction(
  input: ExecuteCreateDailyLogActionInput,
): Promise<ActionResult<ExecuteCreateDailyLogActionData>> {
  const { data: action, error: readError } = await input.supabase
    .from("ai_actions")
    .select("id,status,action_type,payload,source_chat_message_id")
    .eq("id", input.ai_action_id)
    .eq("user_id", input.user_id)
    .single();

  if (readError) {
    return createActionError({
      code: "not_found",
      message: readError.message,
    });
  }

  if (action.status !== "approved") {
    return createActionError({
      action_type: "create_daily_log",
      code: "not_confirmed",
      message: "Create daily log action must be approved before execution.",
      issues: [`Current status: ${action.status}`],
    });
  }

  if (action.action_type !== "create_daily_log") {
    return createActionError({
      code: "invalid_action_type",
      message: "AI action is not a create_daily_log action.",
      issues: [action.action_type],
    });
  }

  if (!isPayloadRecord(action.payload)) {
    return createActionError({
      action_type: "create_daily_log",
      code: "invalid_payload",
      message: "Create daily log payload must be an object.",
    });
  }

  const logDate = optionalString(action.payload.log_date);

  if (!logDate) {
    return createActionError({
      action_type: "create_daily_log",
      code: "invalid_payload",
      message: "Create daily log payload requires a log_date.",
      issues: ["log_date"],
    });
  }

  const now = new Date().toISOString();
  const summary = optionalString(action.payload.summary);
  const notes = optionalString(action.payload.notes);

  const dailyLogInsert: DailyLogInsert = {
    user_id: input.user_id,
    log_date: logDate,
    mission: optionalString(action.payload.mission) ?? summary,
    top_actions: optionalJsonArray(action.payload.top_actions),
    wins: optionalJsonArray(action.payload.wins),
    blockers: optionalJsonArray(action.payload.blockers),
    mood_score: rangedInteger(action.payload.mood_score ?? action.payload.mood, 1, 10),
    energy_score: rangedInteger(action.payload.energy_score ?? action.payload.energy, 1, 10),
    sleep_hours: rangedNumber(action.payload.sleep_hours, 0, 24),
    stress_score: rangedInteger(action.payload.stress_score ?? action.payload.stress, 1, 10),
    proof_score: rangedInteger(action.payload.proof_score, 0, 100),
    reality_score: rangedInteger(action.payload.reality_score, 0, 100),
    notes: notes ?? summary,
    metadata: {
      source: "phase_6_safe_write_flow",
      source_action_type: "create_daily_log",
      executed_from_ai_action_id: action.id,
    },
    source_ai_action_id: action.id,
    source_chat_message_id: action.source_chat_message_id,
  };

  const { data: dailyLog, error: dailyLogError } = await input.supabase
    .from("daily_logs")
    .insert(dailyLogInsert)
    .select("id,log_date")
    .single();

  if (dailyLogError) {
    await input.supabase
      .from("ai_actions")
      .update({
        status: "failed",
        failed_at: now,
        failure_reason: dailyLogError.message,
      })
      .eq("id", action.id)
      .eq("user_id", input.user_id);

    return createActionError({
      action_type: "create_daily_log",
      code: "database_error",
      message: dailyLogError.message,
    });
  }

  const { error: actionUpdateError } = await input.supabase
    .from("ai_actions")
    .update({
      status: "executed",
      target_table: "daily_logs",
      target_id: dailyLog.id,
      executed_at: now,
    })
    .eq("id", action.id)
    .eq("user_id", input.user_id);

  if (actionUpdateError) {
    return createActionError({
      action_type: "create_daily_log",
      code: "database_error",
      message: actionUpdateError.message,
    });
  }

  const auditResult = await writeAuditLog({
    supabase: input.supabase,
    user_id: input.user_id,
    action_type: "create_daily_log",
    status: "success",
    source: "server",
    entity_table: "daily_logs",
    entity_id: dailyLog.id,
    summary: "Created daily log from approved proposed action.",
    after_state: {
      daily_log_id: dailyLog.id,
      log_date: dailyLog.log_date,
      source_ai_action_id: action.id,
    },
    metadata: {
      phase: "6.13",
      ai_action_id: action.id,
    },
  });

  const timelineResult = await writeTimelineEvent({
    user_id: input.user_id,
    event_type: "daily_log_created",
    title: "Daily log created",
    description: `Daily log for ${dailyLog.log_date}`,
    source: "server",
    entity_table: "daily_logs",
    entity_id: dailyLog.id,
    metadata: {
      phase: "6.13",
      ai_action_id: action.id,
    },
  });

  return createActionSuccess({
    action_type: "create_daily_log",
    message: "Daily log created from approved proposed action.",
    data: {
      ai_action_id: action.id,
      daily_log_id: dailyLog.id,
      status: "executed",
    },
    audit_log_id: auditResult.status === "success" ? auditResult.audit_log_id : undefined,
    timeline_event_id:
      timelineResult.status === "success" ? timelineResult.timeline_event_id : undefined,
  });
}
