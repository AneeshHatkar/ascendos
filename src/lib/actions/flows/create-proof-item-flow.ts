import type { SupabaseClient } from "@supabase/supabase-js";

import { createActionError, createActionSuccess, type ActionResult } from "../action-results";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { writeTimelineEvent } from "@/lib/timeline/write-timeline-event";
import type { Database, Json } from "@/types/database";

type ProofItemInsert = Database["public"]["Tables"]["proof_items"]["Insert"];
type ProofType = NonNullable<ProofItemInsert["proof_type"]>;
type PayloadRecord = { [key: string]: Json | undefined };

export interface ExecuteCreateProofItemActionInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  ai_action_id: string;
}

export interface ExecuteCreateProofItemActionData {
  ai_action_id: string;
  proof_item_id: string;
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

function proofType(value: unknown): ProofType {
  if (
    value === "note" ||
    value === "link" ||
    value === "file" ||
    value === "metric" ||
    value === "completion" ||
    value === "artifact" ||
    value === "reflection" ||
    value === "external_validation"
  ) {
    return value;
  }

  if (value === "text") {
    return "note";
  }

  if (value === "image" || value === "code") {
    return "artifact";
  }

  return "note";
}

function optionalJsonObject(value: Json | undefined): Json {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

async function relatedRecordBelongsToUser(input: {
  supabase: SupabaseClient<Database>;
  table: "daily_logs" | "goals" | "tasks";
  id: string | null;
  user_id: string;
}): Promise<boolean> {
  if (!input.id) {
    return true;
  }

  const { data, error } = await input.supabase
    .from(input.table)
    .select("id")
    .eq("id", input.id)
    .eq("user_id", input.user_id)
    .maybeSingle();

  return !error && Boolean(data?.id);
}

export async function executeCreateProofItemAction(
  input: ExecuteCreateProofItemActionInput,
): Promise<ActionResult<ExecuteCreateProofItemActionData>> {
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
      action_type: "create_proof_item",
      code: "not_confirmed",
      message: "Create proof item action must be approved before execution.",
      issues: [`Current status: ${action.status}`],
    });
  }

  if (action.action_type !== "create_proof_item") {
    return createActionError({
      code: "invalid_action_type",
      message: "AI action is not a create_proof_item action.",
      issues: [action.action_type],
    });
  }

  if (!isPayloadRecord(action.payload)) {
    return createActionError({
      action_type: "create_proof_item",
      code: "invalid_payload",
      message: "Create proof item payload must be an object.",
    });
  }

  const title = optionalString(action.payload.title);

  if (!title) {
    return createActionError({
      action_type: "create_proof_item",
      code: "invalid_payload",
      message: "Create proof item payload requires a title.",
      issues: ["title"],
    });
  }

  const dailyLogId = optionalString(action.payload.daily_log_id);
  const goalId = optionalString(action.payload.goal_id);
  const taskId = optionalString(action.payload.task_id);

  const dailyLogAllowed = await relatedRecordBelongsToUser({
    supabase: input.supabase,
    table: "daily_logs",
    id: dailyLogId,
    user_id: input.user_id,
  });

  const goalAllowed = await relatedRecordBelongsToUser({
    supabase: input.supabase,
    table: "goals",
    id: goalId,
    user_id: input.user_id,
  });

  const taskAllowed = await relatedRecordBelongsToUser({
    supabase: input.supabase,
    table: "tasks",
    id: taskId,
    user_id: input.user_id,
  });

  if (!dailyLogAllowed || !goalAllowed || !taskAllowed) {
    return createActionError({
      action_type: "create_proof_item",
      code: "unauthorized",
      message: "Proof item cannot reference records outside the current user boundary.",
      issues: [
        dailyLogAllowed ? "daily_log_id ok" : "daily_log_id is not owned by user",
        goalAllowed ? "goal_id ok" : "goal_id is not owned by user",
        taskAllowed ? "task_id ok" : "task_id is not owned by user",
      ],
    });
  }

  const now = new Date().toISOString();
  const sourceUrl = optionalString(action.payload.source_url);
  const sourceText = optionalString(action.payload.source_text);
  const url = sourceUrl ?? optionalString(action.payload.url);
  const resolvedProofType = proofType(action.payload.proof_type);

  const proofItemInsert: ProofItemInsert = {
    user_id: input.user_id,
    daily_log_id: dailyLogId,
    goal_id: goalId,
    task_id: taskId,
    title,
    description: optionalString(action.payload.description) ?? sourceText,
    domain: optionalString(action.payload.domain) ?? "general",
    proof_type: resolvedProofType,
    status: "captured",
    quantity: optionalNumber(action.payload.quantity),
    unit: optionalString(action.payload.unit),
    url,
    evidence: optionalJsonObject(action.payload.evidence),
    occurred_at: optionalString(action.payload.occurred_at) ?? now,
    logged_at: now,
    metadata: {
      source: "phase_6_safe_write_flow",
      source_action_type: "create_proof_item",
      executed_from_ai_action_id: action.id,
      source_text: sourceText,
    },
    source_ai_action_id: action.id,
    source_chat_message_id: action.source_chat_message_id,
  };

  const { data: proofItem, error: proofItemError } = await input.supabase
    .from("proof_items")
    .insert(proofItemInsert)
    .select("id,title")
    .single();

  if (proofItemError) {
    await input.supabase
      .from("ai_actions")
      .update({
        status: "failed",
        failed_at: now,
        failure_reason: proofItemError.message,
      })
      .eq("id", action.id)
      .eq("user_id", input.user_id);

    return createActionError({
      action_type: "create_proof_item",
      code: "database_error",
      message: proofItemError.message,
    });
  }

  const { error: actionUpdateError } = await input.supabase
    .from("ai_actions")
    .update({
      status: "executed",
      target_table: "proof_items",
      target_id: proofItem.id,
      executed_at: now,
    })
    .eq("id", action.id)
    .eq("user_id", input.user_id);

  if (actionUpdateError) {
    return createActionError({
      action_type: "create_proof_item",
      code: "database_error",
      message: actionUpdateError.message,
    });
  }

  const auditResult = await writeAuditLog({
    supabase: input.supabase,
    user_id: input.user_id,
    action_type: "create_proof_item",
    status: "success",
    source: "server",
    entity_table: "proof_items",
    entity_id: proofItem.id,
    summary: "Created proof item from approved proposed action.",
    after_state: {
      proof_item_id: proofItem.id,
      title: proofItem.title,
      source_ai_action_id: action.id,
    },
    metadata: {
      phase: "6.14",
      ai_action_id: action.id,
    },
  });

  const timelineResult = await writeTimelineEvent({
    user_id: input.user_id,
    event_type: "proof_item_created",
    title: "Proof item created",
    description: proofItem.title,
    source: "server",
    entity_table: "proof_items",
    entity_id: proofItem.id,
    metadata: {
      phase: "6.14",
      ai_action_id: action.id,
    },
  });

  return createActionSuccess({
    action_type: "create_proof_item",
    message: "Proof item created from approved proposed action.",
    data: {
      ai_action_id: action.id,
      proof_item_id: proofItem.id,
      status: "executed",
    },
    audit_log_id: auditResult.status === "success" ? auditResult.audit_log_id : undefined,
    timeline_event_id:
      timelineResult.status === "success" ? timelineResult.timeline_event_id : undefined,
  });
}
