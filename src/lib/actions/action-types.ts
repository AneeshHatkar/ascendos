export const PROPOSED_ACTION_TYPES = [
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
] as const;

export type ProposedActionType = (typeof PROPOSED_ACTION_TYPES)[number];

export const PROPOSED_ACTION_TYPE_LABELS: Record<ProposedActionType, string> = {
  create_task: "Create task",
  create_goal: "Create goal",
  create_daily_log: "Create daily log",
  create_proof_item: "Create proof item",
};

export const PROPOSED_ACTION_TYPE_DESCRIPTIONS: Record<ProposedActionType, string> = {
  create_task: "Create a task after validation and explicit user confirmation.",
  create_goal: "Create a goal after validation and explicit user confirmation.",
  create_daily_log: "Create a daily log after validation and explicit user confirmation.",
  create_proof_item: "Create a proof item after validation and explicit user confirmation.",
};

export function isProposedActionType(value: unknown): value is ProposedActionType {
  return typeof value === "string" && PROPOSED_ACTION_TYPES.includes(value as ProposedActionType);
}
