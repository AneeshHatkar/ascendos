import type { SupabaseClient } from "@supabase/supabase-js";

import { isProposedActionType, type ProposedActionType } from "./action-types";
import { createActionError, createActionSuccess, type ActionResult } from "./action-results";
import {
  executeCreateTaskAction,
  type ExecuteCreateTaskActionData,
} from "./flows/create-task-flow";
import type { Database } from "@/types/database";

export interface ExecuteApprovedActionInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  ai_action_id: string;
}

export interface ExecuteApprovedActionReadyData {
  ai_action_id: string;
  action_type: ProposedActionType;
  status: "ready_for_execution";
  message: string;
}

export type ExecuteApprovedActionData =
  | ExecuteApprovedActionReadyData
  | ExecuteCreateTaskActionData;

interface LoadedAction {
  id: string;
  status: string;
  action_type: string;
}

function actionTypeForResult(value: string) {
  return isProposedActionType(value) ? value : undefined;
}

function notImplementedYet(
  action: LoadedAction,
): ActionResult<ExecuteApprovedActionData> {
  return createActionError({
    action_type: actionTypeForResult(action.action_type),
    code: "unexpected_error",
    message:
      "Execution dispatcher reached a valid approved action, but target-table execution is intentionally not implemented until Phase 6.11–6.14.",
    issues: [
      `ai_action_id: ${action.id}`,
      `action_type: ${action.action_type}`,
      "Phase 6.10 only establishes the dispatcher boundary.",
    ],
  });
}

function dispatchApprovedAction(
  action: LoadedAction,
): ActionResult<ExecuteApprovedActionData> {
  if (!isProposedActionType(action.action_type)) {
    return createActionError({
      code: "invalid_action_type",
      message: "AI action has an unsupported proposed action type.",
      issues: [action.action_type],
    });
  }

  switch (action.action_type) {
    case "create_task":
    case "create_goal":
    case "create_daily_log":
    case "create_proof_item":
      return notImplementedYet(action);
  }
}

export async function executeApprovedAction(
  input: ExecuteApprovedActionInput,
): Promise<ActionResult<ExecuteApprovedActionData>> {
  const { data: action, error } = await input.supabase
    .from("ai_actions")
    .select("id,status,action_type")
    .eq("id", input.ai_action_id)
    .eq("user_id", input.user_id)
    .single();

  if (error) {
    return createActionError({
      code: "not_found",
      message: error.message,
    });
  }

  if (action.status !== "approved") {
    return createActionError({
      action_type: actionTypeForResult(action.action_type),
      code: "not_confirmed",
      message: "AI action must be approved before execution dispatch.",
      issues: [`Current status: ${action.status}`],
    });
  }

  if (action.action_type === "create_task") {
    return executeCreateTaskAction(input);
  }

  return dispatchApprovedAction(action);
}

export function markDispatcherReadyForActionType(
  actionType: ProposedActionType,
  aiActionId: string,
): ActionResult<ExecuteApprovedActionData> {
  return createActionSuccess({
    action_type: actionType,
    message: "Execution dispatcher boundary is ready for this action type.",
    data: {
      ai_action_id: aiActionId,
      action_type: actionType,
      status: "ready_for_execution",
      message:
        "Target-table execution must be implemented by the specific Phase 6.11–6.14 action flow.",
    },
  });
}
