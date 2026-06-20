import type { SupabaseClient } from "@supabase/supabase-js";

import { isProposedActionType } from "./action-types";
import { createActionError, createActionSuccess, type ActionResult } from "./action-results";
import type { AiActionUpdate, Database } from "@/types/database";

export type AiActionLifecycleTransition = "approve" | "reject" | "cancel" | "mark_failed";

export type AiActionLifecycleStatus =
  | "draft"
  | "pending_confirmation"
  | "approved"
  | "rejected"
  | "executed"
  | "failed"
  | "cancelled";

export interface UpdateActionLifecycleInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  ai_action_id: string;
  transition: AiActionLifecycleTransition;
  failure_reason?: string;
}

export interface UpdateActionLifecycleData {
  ai_action_id: string;
  action_type: string;
  previous_status: AiActionLifecycleStatus;
  status: AiActionLifecycleStatus;
}

const ALLOWED_TRANSITIONS: Record<
  AiActionLifecycleTransition,
  AiActionLifecycleStatus[]
> = {
  approve: ["pending_confirmation"],
  reject: ["pending_confirmation"],
  cancel: ["draft", "pending_confirmation", "approved"],
  mark_failed: ["approved"],
};

function statusForTransition(transition: AiActionLifecycleTransition): AiActionLifecycleStatus {
  switch (transition) {
    case "approve":
      return "approved";
    case "reject":
      return "rejected";
    case "cancel":
      return "cancelled";
    case "mark_failed":
      return "failed";
  }
}

function timestampFieldForTransition(transition: AiActionLifecycleTransition): keyof AiActionUpdate {
  switch (transition) {
    case "approve":
      return "approved_at";
    case "reject":
      return "rejected_at";
    case "cancel":
      return "rejected_at";
    case "mark_failed":
      return "failed_at";
  }
}

function actionTypeForResult(value: string) {
  return isProposedActionType(value) ? value : undefined;
}

function isLifecycleStatus(value: string): value is AiActionLifecycleStatus {
  return [
    "draft",
    "pending_confirmation",
    "approved",
    "rejected",
    "executed",
    "failed",
    "cancelled",
  ].includes(value);
}

export async function updateActionLifecycle(
  input: UpdateActionLifecycleInput,
): Promise<ActionResult<UpdateActionLifecycleData>> {
  const { data: existingAction, error: readError } = await input.supabase
    .from("ai_actions")
    .select("id,status,action_type")
    .eq("id", input.ai_action_id)
    .eq("user_id", input.user_id)
    .single();

  if (readError) {
    return createActionError({
      code: "not_found",
      message: readError.message,
    });
  }

  if (!isLifecycleStatus(existingAction.status)) {
    return createActionError({
      action_type: actionTypeForResult(existingAction.action_type),
      code: "invalid_payload",
      message: "AI action has an unknown lifecycle status.",
      issues: [existingAction.status],
    });
  }

  const previousStatus = existingAction.status;
  const allowedStatuses = ALLOWED_TRANSITIONS[input.transition];

  if (!allowedStatuses.includes(previousStatus)) {
    return createActionError({
      action_type: actionTypeForResult(existingAction.action_type),
      code: "invalid_payload",
      message: `Cannot ${input.transition} an AI action with status ${previousStatus}.`,
      issues: [`Allowed previous statuses: ${allowedStatuses.join(", ")}`],
    });
  }

  const nextStatus = statusForTransition(input.transition);
  const timestampField = timestampFieldForTransition(input.transition);

  const updatePayload: AiActionUpdate = {
    status: nextStatus,
    [timestampField]: new Date().toISOString(),
  };

  if (input.transition === "mark_failed") {
    updatePayload.failure_reason = input.failure_reason ?? "Action marked failed.";
  }

  const { data: updatedAction, error: updateError } = await input.supabase
    .from("ai_actions")
    .update(updatePayload)
    .eq("id", input.ai_action_id)
    .eq("user_id", input.user_id)
    .select("id,status,action_type")
    .single();

  if (updateError) {
    return createActionError({
      action_type: actionTypeForResult(existingAction.action_type),
      code: "database_error",
      message: updateError.message,
    });
  }

  if (!isLifecycleStatus(updatedAction.status)) {
    return createActionError({
      action_type: actionTypeForResult(updatedAction.action_type),
      code: "unexpected_error",
      message: "Updated AI action returned an unknown lifecycle status.",
      issues: [updatedAction.status],
    });
  }

  return createActionSuccess({
    action_type: actionTypeForResult(updatedAction.action_type),
    message: `AI action lifecycle updated to ${updatedAction.status}.`,
    data: {
      ai_action_id: updatedAction.id,
      action_type: updatedAction.action_type,
      previous_status: previousStatus,
      status: updatedAction.status,
    },
  });
}
