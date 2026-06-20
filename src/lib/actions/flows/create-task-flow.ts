import type { SupabaseClient } from "@supabase/supabase-js";

import { createActionError, createActionSuccess, type ActionResult } from "../action-results";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { writeTimelineEvent } from "@/lib/timeline/write-timeline-event";
import type { Database, Json, TaskInsert } from "@/types/database";

type TaskStatus = NonNullable<TaskInsert["status"]>;
type TaskPriority = NonNullable<TaskInsert["priority"]>;

export interface ExecuteCreateTaskActionInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  ai_action_id: string;
}

export interface ExecuteCreateTaskActionData {
  ai_action_id: string;
  task_id: string;
  status: "executed";
}

type PayloadRecord = { [key: string]: Json | undefined };

function isPayloadRecord(payload: Json): payload is PayloadRecord {
  return Boolean(payload) && typeof payload === "object" && !Array.isArray(payload);
}

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function taskStatus(value: unknown): TaskStatus {
  if (
    value === "todo" ||
    value === "in_progress" ||
    value === "blocked" ||
    value === "done" ||
    value === "cancelled"
  ) {
    return value;
  }

  return "todo";
}

function taskPriority(value: unknown): TaskPriority {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }

  if (value === "urgent") {
    return "critical";
  }

  return "medium";
}

export async function executeCreateTaskAction(
  input: ExecuteCreateTaskActionInput,
): Promise<ActionResult<ExecuteCreateTaskActionData>> {
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
      action_type: "create_task",
      code: "not_confirmed",
      message: "Create task action must be approved before execution.",
      issues: [`Current status: ${action.status}`],
    });
  }

  if (action.action_type !== "create_task") {
    return createActionError({
      code: "invalid_action_type",
      message: "AI action is not a create_task action.",
      issues: [action.action_type],
    });
  }

  if (!isPayloadRecord(action.payload)) {
    return createActionError({
      action_type: "create_task",
      code: "invalid_payload",
      message: "Create task payload must be an object.",
    });
  }

  const title = optionalString(action.payload.title);

  if (!title) {
    return createActionError({
      action_type: "create_task",
      code: "invalid_payload",
      message: "Create task payload requires a title.",
      issues: ["title"],
    });
  }

  const now = new Date().toISOString();

  const taskInsert: TaskInsert = {
    user_id: input.user_id,
    title,
    description: optionalString(action.payload.description),
    status: taskStatus(action.payload.status),
    priority: taskPriority(action.payload.priority),
    domain: optionalString(action.payload.domain) ?? "general",
    due_date: optionalString(action.payload.due_date),
    goal_id: optionalString(action.payload.goal_id),
    metadata: {
      source: "phase_6_safe_write_flow",
      source_action_type: "create_task",
      executed_from_ai_action_id: action.id,
    },
    source_ai_action_id: action.id,
    source_chat_message_id: action.source_chat_message_id,
  };

  const { data: task, error: taskError } = await input.supabase
    .from("tasks")
    .insert(taskInsert)
    .select("id,title")
    .single();

  if (taskError) {
    await input.supabase
      .from("ai_actions")
      .update({
        status: "failed",
        failed_at: now,
        failure_reason: taskError.message,
      })
      .eq("id", action.id)
      .eq("user_id", input.user_id);

    return createActionError({
      action_type: "create_task",
      code: "database_error",
      message: taskError.message,
    });
  }

  const { error: actionUpdateError } = await input.supabase
    .from("ai_actions")
    .update({
      status: "executed",
      target_table: "tasks",
      target_id: task.id,
      executed_at: now,
    })
    .eq("id", action.id)
    .eq("user_id", input.user_id);

  if (actionUpdateError) {
    return createActionError({
      action_type: "create_task",
      code: "database_error",
      message: actionUpdateError.message,
    });
  }

  const auditResult = await writeAuditLog({
    supabase: input.supabase,
    user_id: input.user_id,
    action_type: "create_task",
    status: "success",
    source: "server",
    entity_table: "tasks",
    entity_id: task.id,
    summary: "Created task from approved proposed action.",
    after_state: {
      task_id: task.id,
      title: task.title,
      source_ai_action_id: action.id,
    },
    metadata: {
      phase: "6.11",
      ai_action_id: action.id,
    },
  });

  const timelineResult = await writeTimelineEvent({
    user_id: input.user_id,
    event_type: "task_created",
    title: "Task created",
    description: task.title,
    source: "server",
    entity_table: "tasks",
    entity_id: task.id,
    metadata: {
      phase: "6.11",
      ai_action_id: action.id,
    },
  });

  return createActionSuccess({
    action_type: "create_task",
    message: "Task created from approved proposed action.",
    data: {
      ai_action_id: action.id,
      task_id: task.id,
      status: "executed",
    },
    audit_log_id: auditResult.status === "success" ? auditResult.audit_log_id : undefined,
    timeline_event_id:
      timelineResult.status === "success" ? timelineResult.timeline_event_id : undefined,
  });
}
