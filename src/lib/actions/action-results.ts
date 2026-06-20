import type { ProposedActionType } from "./action-types";

export type ActionResultStatus = "success" | "error";

export type ActionResultErrorCode =
  | "invalid_action_type"
  | "invalid_payload"
  | "unauthorized"
  | "not_found"
  | "not_confirmed"
  | "already_executed"
  | "database_error"
  | "unexpected_error";

export interface ActionResultBase {
  status: ActionResultStatus;
  action_type?: ProposedActionType;
  message: string;
}

export interface ActionSuccessResult<TData = unknown> extends ActionResultBase {
  status: "success";
  data: TData;
  audit_log_id?: string;
  timeline_event_id?: string;
}

export interface ActionErrorResult extends ActionResultBase {
  status: "error";
  code: ActionResultErrorCode;
  issues?: string[];
}

export type ActionResult<TData = unknown> = ActionSuccessResult<TData> | ActionErrorResult;

export function createActionSuccess<TData>(input: {
  action_type?: ProposedActionType;
  message: string;
  data: TData;
  audit_log_id?: string;
  timeline_event_id?: string;
}): ActionSuccessResult<TData> {
  return {
    status: "success",
    action_type: input.action_type,
    message: input.message,
    data: input.data,
    audit_log_id: input.audit_log_id,
    timeline_event_id: input.timeline_event_id,
  };
}

export function createActionError(input: {
  action_type?: ProposedActionType;
  code: ActionResultErrorCode;
  message: string;
  issues?: string[];
}): ActionErrorResult {
  return {
    status: "error",
    action_type: input.action_type,
    code: input.code,
    message: input.message,
    issues: input.issues,
  };
}

export function isActionSuccess<TData>(
  result: ActionResult<TData>,
): result is ActionSuccessResult<TData> {
  return result.status === "success";
}

export function isActionError<TData>(result: ActionResult<TData>): result is ActionErrorResult {
  return result.status === "error";
}
