import type { ProposedActionType } from "./action-types";

export type ProposedActionSource =
  | "manual"
  | "carnos"
  | "python_ml"
  | "system"
  | "import";

export type ProposedActionPriority = "low" | "medium" | "high" | "urgent";

export type ProposedActionDomain =
  | "career"
  | "learning"
  | "health"
  | "body"
  | "research"
  | "projects"
  | "life_admin"
  | "finance"
  | "relationships"
  | "creativity"
  | "general";

export type ProposedGoalStatus = "not_started" | "active" | "paused" | "completed" | "archived";

export type ProposedTaskStatus = "todo" | "in_progress" | "blocked" | "done" | "cancelled";

export type ProposedProofType =
  | "text"
  | "link"
  | "file"
  | "image"
  | "code"
  | "metric"
  | "note";

export interface ProposedActionBase<TType extends ProposedActionType, TPayload> {
  action_type: TType;
  payload: TPayload;
  source: ProposedActionSource;
  reason?: string;
  confidence?: number;
  evidence_refs?: string[];
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: ProposedTaskStatus;
  priority?: ProposedActionPriority;
  domain?: ProposedActionDomain;
  due_date?: string;
  goal_id?: string;
}

export interface CreateGoalPayload {
  title: string;
  description?: string;
  domain: ProposedActionDomain;
  status?: ProposedGoalStatus;
  priority?: ProposedActionPriority;
  target_date?: string;
}

export interface CreateDailyLogPayload {
  log_date: string;
  summary?: string;
  mood?: number;
  energy?: number;
  stress?: number;
  sleep_hours?: number;
  notes?: string;
}

export interface CreateProofItemPayload {
  title: string;
  proof_type: ProposedProofType;
  description?: string;
  source_url?: string;
  source_text?: string;
  task_id?: string;
  goal_id?: string;
  occurred_at?: string;
}

export type CreateTaskProposedAction = ProposedActionBase<"create_task", CreateTaskPayload>;

export type CreateGoalProposedAction = ProposedActionBase<"create_goal", CreateGoalPayload>;

export type CreateDailyLogProposedAction = ProposedActionBase<
  "create_daily_log",
  CreateDailyLogPayload
>;

export type CreateProofItemProposedAction = ProposedActionBase<
  "create_proof_item",
  CreateProofItemPayload
>;

export type ProposedActionContract =
  | CreateTaskProposedAction
  | CreateGoalProposedAction
  | CreateDailyLogProposedAction
  | CreateProofItemProposedAction;

export type ProposedActionPayloadByType = {
  create_task: CreateTaskPayload;
  create_goal: CreateGoalPayload;
  create_daily_log: CreateDailyLogPayload;
  create_proof_item: CreateProofItemPayload;
};

export type ProposedActionPayload<TType extends ProposedActionType> =
  ProposedActionPayloadByType[TType];

export const PROPOSED_ACTION_REQUIRED_FIELDS: Record<ProposedActionType, string[]> = {
  create_task: ["title"],
  create_goal: ["title", "domain"],
  create_daily_log: ["log_date"],
  create_proof_item: ["title", "proof_type"],
};

export const PROPOSED_ACTION_FORBIDDEN_PAYLOAD_FIELDS = [
  "user_id",
  "owner_id",
  "created_by",
  "updated_by",
  "deleted_at",
  "service_role",
  "service_role_key",
] as const;

export const PROPOSED_ACTION_CONTRACT_VERSION = "proposed_action_contract_v1";
