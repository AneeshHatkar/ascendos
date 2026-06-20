import type { SupabaseClient } from "@supabase/supabase-js";

import { createActionError, createActionSuccess, type ActionResult } from "./action-results";
import { PROPOSED_ACTION_CONTRACT_VERSION } from "./proposed-action-contracts";
import { validateProposedAction } from "./validate-proposed-action";
import type { Database, Json, AiActionInsert } from "@/types/database";

export interface CreateProposedActionInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  proposed_action: unknown;
  source_chat_session_id?: string;
  source_chat_message_id?: string;
  source_context?: Json;
}

export interface CreateProposedActionData {
  ai_action_id: string;
  status: "pending_confirmation";
  action_type: string;
  target_table: string;
}

function targetTableForAction(actionType: string): string {
  switch (actionType) {
    case "create_task":
      return "tasks";
    case "create_goal":
      return "goals";
    case "create_daily_log":
      return "daily_logs";
    case "create_proof_item":
      return "proof_items";
    default:
      return "unknown";
  }
}

function titleFromPayload(payload: Json): string | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const maybeTitle = payload.title;

  return typeof maybeTitle === "string" && maybeTitle.trim().length > 0
    ? maybeTitle.trim()
    : null;
}

function descriptionFromPayload(payload: Json): string | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const maybeDescription = payload.description;

  return typeof maybeDescription === "string" && maybeDescription.trim().length > 0
    ? maybeDescription.trim()
    : null;
}

export async function createProposedAction(
  input: CreateProposedActionInput,
): Promise<ActionResult<CreateProposedActionData>> {
  const validation = validateProposedAction(input.proposed_action);

  if (validation.status === "error") {
    return validation;
  }

  const actionType = validation.data.action_type;
  const payload = validation.data.payload as unknown as Json;
  const targetTable = targetTableForAction(actionType);

  const insertPayload: AiActionInsert = {
    user_id: input.user_id,
    status: "pending_confirmation",
    action_type: actionType,
    target_table: targetTable,
    title: titleFromPayload(payload),
    description: descriptionFromPayload(payload),
    payload,
    validation_result: {
      contract_version: PROPOSED_ACTION_CONTRACT_VERSION,
      status: "valid",
      action_type: actionType,
      source: validation.data.source,
      reason: validation.data.reason ?? null,
      confidence: validation.data.confidence ?? null,
      evidence_refs: validation.data.evidence_refs ?? [],
    },
    source_chat_session_id: input.source_chat_session_id ?? null,
    source_chat_message_id: input.source_chat_message_id ?? null,
    source_context: input.source_context ?? {},
  };

  const { data, error } = await input.supabase
    .from("ai_actions")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) {
    return createActionError({
      action_type: actionType,
      code: "database_error",
      message: error.message,
    });
  }

  return createActionSuccess({
    action_type: actionType,
    message: "Proposed action created and is pending confirmation.",
    data: {
      ai_action_id: data.id,
      status: "pending_confirmation",
      action_type: actionType,
      target_table: targetTable,
    },
  });
}
