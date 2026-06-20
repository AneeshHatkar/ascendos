import type { SupabaseClient } from "@supabase/supabase-js";

import { createActionError, createActionSuccess, type ActionResult } from "../action-results";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { writeTimelineEvent } from "@/lib/timeline/write-timeline-event";
import type { Database, GoalInsert, Json } from "@/types/database";

type GoalStatus = NonNullable<GoalInsert["status"]>;
type GoalPriority = NonNullable<GoalInsert["priority"]>;
type GoalHorizon = NonNullable<GoalInsert["horizon"]>;
type PayloadRecord = { [key: string]: Json | undefined };

export interface ExecuteCreateGoalActionInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  ai_action_id: string;
}

export interface ExecuteCreateGoalActionData {
  ai_action_id: string;
  goal_id: string;
  status: "executed";
}

function isPayloadRecord(payload: Json): payload is PayloadRecord {
  return Boolean(payload) && typeof payload === "object" && !Array.isArray(payload);
}

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function goalStatus(value: unknown): GoalStatus {
  if (
    value === "draft" ||
    value === "active" ||
    value === "paused" ||
    value === "completed" ||
    value === "archived" ||
    value === "cancelled"
  ) {
    return value;
  }

  if (value === "not_started") {
    return "draft";
  }

  return "active";
}

function goalPriority(value: unknown): GoalPriority {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }

  if (value === "urgent") {
    return "critical";
  }

  return "medium";
}

function goalHorizon(value: unknown): GoalHorizon {
  if (
    value === "daily" ||
    value === "weekly" ||
    value === "monthly" ||
    value === "quarterly" ||
    value === "yearly" ||
    value === "medium_term" ||
    value === "long_term"
  ) {
    return value;
  }

  return "medium_term";
}

function optionalJsonObject(value: Json | undefined): Json {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

export async function executeCreateGoalAction(
  input: ExecuteCreateGoalActionInput,
): Promise<ActionResult<ExecuteCreateGoalActionData>> {
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
      action_type: "create_goal",
      code: "not_confirmed",
      message: "Create goal action must be approved before execution.",
      issues: [`Current status: ${action.status}`],
    });
  }

  if (action.action_type !== "create_goal") {
    return createActionError({
      code: "invalid_action_type",
      message: "AI action is not a create_goal action.",
      issues: [action.action_type],
    });
  }

  if (!isPayloadRecord(action.payload)) {
    return createActionError({
      action_type: "create_goal",
      code: "invalid_payload",
      message: "Create goal payload must be an object.",
    });
  }

  const title = optionalString(action.payload.title);
  const domain = optionalString(action.payload.domain);

  if (!title) {
    return createActionError({
      action_type: "create_goal",
      code: "invalid_payload",
      message: "Create goal payload requires a title.",
      issues: ["title"],
    });
  }

  if (!domain) {
    return createActionError({
      action_type: "create_goal",
      code: "invalid_payload",
      message: "Create goal payload requires a domain.",
      issues: ["domain"],
    });
  }

  const now = new Date().toISOString();

  const goalInsert: GoalInsert = {
    user_id: input.user_id,
    title,
    description: optionalString(action.payload.description),
    domain,
    status: goalStatus(action.payload.status),
    priority: goalPriority(action.payload.priority),
    horizon: goalHorizon(action.payload.horizon),
    target_date: optionalString(action.payload.target_date),
    proof_requirement: optionalString(action.payload.proof_requirement),
    reality_snapshot: optionalJsonObject(action.payload.reality_snapshot),
    target_snapshot: optionalJsonObject(action.payload.target_snapshot),
    metadata: {
      source: "phase_6_safe_write_flow",
      source_action_type: "create_goal",
      executed_from_ai_action_id: action.id,
    },
    source_ai_action_id: action.id,
    source_chat_message_id: action.source_chat_message_id,
  };

  const { data: goal, error: goalError } = await input.supabase
    .from("goals")
    .insert(goalInsert)
    .select("id,title")
    .single();

  if (goalError) {
    await input.supabase
      .from("ai_actions")
      .update({
        status: "failed",
        failed_at: now,
        failure_reason: goalError.message,
      })
      .eq("id", action.id)
      .eq("user_id", input.user_id);

    return createActionError({
      action_type: "create_goal",
      code: "database_error",
      message: goalError.message,
    });
  }

  const { error: actionUpdateError } = await input.supabase
    .from("ai_actions")
    .update({
      status: "executed",
      target_table: "goals",
      target_id: goal.id,
      executed_at: now,
    })
    .eq("id", action.id)
    .eq("user_id", input.user_id);

  if (actionUpdateError) {
    return createActionError({
      action_type: "create_goal",
      code: "database_error",
      message: actionUpdateError.message,
    });
  }

  const auditResult = await writeAuditLog({
    supabase: input.supabase,
    user_id: input.user_id,
    action_type: "create_goal",
    status: "success",
    source: "server",
    entity_table: "goals",
    entity_id: goal.id,
    summary: "Created goal from approved proposed action.",
    after_state: {
      goal_id: goal.id,
      title: goal.title,
      source_ai_action_id: action.id,
    },
    metadata: {
      phase: "6.12",
      ai_action_id: action.id,
    },
  });

  const timelineResult = await writeTimelineEvent({
    user_id: input.user_id,
    event_type: "goal_created",
    title: "Goal created",
    description: goal.title,
    source: "server",
    entity_table: "goals",
    entity_id: goal.id,
    metadata: {
      phase: "6.12",
      ai_action_id: action.id,
    },
  });

  return createActionSuccess({
    action_type: "create_goal",
    message: "Goal created from approved proposed action.",
    data: {
      ai_action_id: action.id,
      goal_id: goal.id,
      status: "executed",
    },
    audit_log_id: auditResult.status === "success" ? auditResult.audit_log_id : undefined,
    timeline_event_id:
      timelineResult.status === "success" ? timelineResult.timeline_event_id : undefined,
  });
}
