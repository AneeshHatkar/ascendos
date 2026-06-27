import { z } from "zod";
import {
  isProposedActionType,
  type ProposedActionType,
} from "./action-types";
import { createActionError, createActionSuccess, type ActionResult } from "./action-results";
import {
  PROPOSED_ACTION_FORBIDDEN_PAYLOAD_FIELDS,
  type CreateDailyLogPayload,
  type CreateGoalPayload,
  type CreateProofItemPayload,
  type CreateTaskPayload,
  type ProposedActionContract,
  type ProposedActionDomain,
  type ProposedActionPayloadByType,
  type ProposedActionPriority,
  type ProposedActionSource,
  type ProposedGoalStatus,
  type ProposedProofType,
  type ProposedTaskStatus,
} from "./proposed-action-contracts";

export const ProposedActionZodEnvelope = z.object({
  action_type: z.string(),
  source: z.string(),
  payload: z.record(z.string(), z.unknown()),
  reason: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  priority: z.string().optional(),
  domain: z.string().optional(),
  evidence_refs: z.array(z.string()).optional(),
  source_chat_session_id: z.string().optional(),
  source_chat_message_id: z.string().optional(),
});

const VALID_SOURCES = ["manual", "carnos", "python_ml", "system", "import"] as const;

const VALID_PRIORITIES = ["low", "medium", "high", "urgent"] as const;

const VALID_DOMAINS = [
  "career",
  "learning",
  "health",
  "body",
  "research",
  "projects",
  "life_admin",
  "finance",
  "relationships",
  "creativity",
  "general",
] as const;

const VALID_GOAL_STATUSES = ["not_started", "active", "paused", "completed", "archived"] as const;

const VALID_TASK_STATUSES = ["todo", "in_progress", "blocked", "done", "cancelled"] as const;

const VALID_PROOF_TYPES = ["text", "link", "file", "image", "code", "metric", "note"] as const;

export interface ProposedActionValidationSuccess<TType extends ProposedActionType> {
  action_type: TType;
  payload: ProposedActionPayloadByType[TType];
  source: ProposedActionSource;
  reason?: string;
  confidence?: number;
  evidence_refs?: string[];
}

export type ProposedActionValidationResult<TType extends ProposedActionType = ProposedActionType> =
  ActionResult<ProposedActionValidationSuccess<TType>>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isOptionalNumber(value: unknown): value is number | undefined {
  return value === undefined || (typeof value === "number" && Number.isFinite(value));
}

function isNumberInRange(value: unknown, min: number, max: number): value is number | undefined {
  return value === undefined || (typeof value === "number" && Number.isFinite(value) && value >= min && value <= max);
}

function isIsoDateLike(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value);
}

function isOptionalIsoDateLike(value: unknown): value is string | undefined {
  return value === undefined || isIsoDateLike(value);
}

function isOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || (Array.isArray(value) && value.every((item) => typeof item === "string"));
}

function isOneOf<TValue extends string>(
  value: unknown,
  allowed: readonly TValue[],
): value is TValue {
  return typeof value === "string" && allowed.includes(value as TValue);
}

function validateCommonEnvelope(input: Record<string, unknown>): string[] {
  const issues: string[] = [];

  if (!isProposedActionType(input.action_type)) {
    issues.push("action_type must be one of the supported proposed action types.");
  }

  if (!isRecord(input.payload)) {
    issues.push("payload must be an object.");
  }

  if (!isOneOf(input.source, VALID_SOURCES)) {
    issues.push("source must be one of: manual, carnos, python_ml, system, import.");
  }

  if (!isOptionalString(input.reason)) {
    issues.push("reason must be a string when provided.");
  }

  if (!isNumberInRange(input.confidence, 0, 1)) {
    issues.push("confidence must be a number between 0 and 1 when provided.");
  }

  if (!isOptionalStringArray(input.evidence_refs)) {
    issues.push("evidence_refs must be an array of strings when provided.");
  }

  return issues;
}

function validateForbiddenPayloadFields(payload: Record<string, unknown>): string[] {
  return PROPOSED_ACTION_FORBIDDEN_PAYLOAD_FIELDS
    .filter((field) => Object.prototype.hasOwnProperty.call(payload, field))
    .map((field) => `payload must not include forbidden field: ${field}.`);
}

function validateCreateTaskPayload(payload: Record<string, unknown>): string[] {
  const issues: string[] = [];

  if (!isNonEmptyString(payload.title)) {
    issues.push("payload.title is required for create_task.");
  }

  if (!isOptionalString(payload.description)) {
    issues.push("payload.description must be a string when provided.");
  }

  if (payload.status !== undefined && !isOneOf(payload.status, VALID_TASK_STATUSES)) {
    issues.push("payload.status is invalid for create_task.");
  }

  if (payload.priority !== undefined && !isOneOf(payload.priority, VALID_PRIORITIES)) {
    issues.push("payload.priority is invalid for create_task.");
  }

  if (payload.domain !== undefined && !isOneOf(payload.domain, VALID_DOMAINS)) {
    issues.push("payload.domain is invalid for create_task.");
  }

  if (!isOptionalIsoDateLike(payload.due_date)) {
    issues.push("payload.due_date must start with YYYY-MM-DD when provided.");
  }

  if (!isOptionalString(payload.goal_id)) {
    issues.push("payload.goal_id must be a string when provided.");
  }

  return issues;
}

function validateCreateGoalPayload(payload: Record<string, unknown>): string[] {
  const issues: string[] = [];

  if (!isNonEmptyString(payload.title)) {
    issues.push("payload.title is required for create_goal.");
  }

  if (!isOptionalString(payload.description)) {
    issues.push("payload.description must be a string when provided.");
  }

  if (!isOneOf(payload.domain, VALID_DOMAINS)) {
    issues.push("payload.domain is required and must be valid for create_goal.");
  }

  if (payload.status !== undefined && !isOneOf(payload.status, VALID_GOAL_STATUSES)) {
    issues.push("payload.status is invalid for create_goal.");
  }

  if (payload.priority !== undefined && !isOneOf(payload.priority, VALID_PRIORITIES)) {
    issues.push("payload.priority is invalid for create_goal.");
  }

  if (!isOptionalIsoDateLike(payload.target_date)) {
    issues.push("payload.target_date must start with YYYY-MM-DD when provided.");
  }

  return issues;
}

function validateCreateDailyLogPayload(payload: Record<string, unknown>): string[] {
  const issues: string[] = [];

  if (!isIsoDateLike(payload.log_date)) {
    issues.push("payload.log_date is required and must start with YYYY-MM-DD for create_daily_log.");
  }

  if (!isOptionalString(payload.summary)) {
    issues.push("payload.summary must be a string when provided.");
  }

  if (!isNumberInRange(payload.mood, 1, 10)) {
    issues.push("payload.mood must be a number from 1 to 10 when provided.");
  }

  if (!isNumberInRange(payload.energy, 1, 10)) {
    issues.push("payload.energy must be a number from 1 to 10 when provided.");
  }

  if (!isNumberInRange(payload.stress, 1, 10)) {
    issues.push("payload.stress must be a number from 1 to 10 when provided.");
  }

  if (!isOptionalNumber(payload.sleep_hours)) {
    issues.push("payload.sleep_hours must be a finite number when provided.");
  }

  if (!isOptionalString(payload.notes)) {
    issues.push("payload.notes must be a string when provided.");
  }

  return issues;
}

function validateCreateProofItemPayload(payload: Record<string, unknown>): string[] {
  const issues: string[] = [];

  if (!isNonEmptyString(payload.title)) {
    issues.push("payload.title is required for create_proof_item.");
  }

  if (!isOneOf(payload.proof_type, VALID_PROOF_TYPES)) {
    issues.push("payload.proof_type is required and must be valid for create_proof_item.");
  }

  if (!isOptionalString(payload.description)) {
    issues.push("payload.description must be a string when provided.");
  }

  if (!isOptionalString(payload.source_url)) {
    issues.push("payload.source_url must be a string when provided.");
  }

  if (!isOptionalString(payload.source_text)) {
    issues.push("payload.source_text must be a string when provided.");
  }

  if (!isOptionalString(payload.task_id)) {
    issues.push("payload.task_id must be a string when provided.");
  }

  if (!isOptionalString(payload.goal_id)) {
    issues.push("payload.goal_id must be a string when provided.");
  }

  if (!isOptionalIsoDateLike(payload.occurred_at)) {
    issues.push("payload.occurred_at must start with YYYY-MM-DD when provided.");
  }

  return issues;
}

function validatePayloadForActionType(
  actionType: ProposedActionType,
  payload: Record<string, unknown>,
): string[] {
  const forbiddenIssues = validateForbiddenPayloadFields(payload);

  if (actionType === "create_task") {
    return [...forbiddenIssues, ...validateCreateTaskPayload(payload)];
  }

  if (actionType === "create_goal") {
    return [...forbiddenIssues, ...validateCreateGoalPayload(payload)];
  }

  if (actionType === "create_daily_log") {
    return [...forbiddenIssues, ...validateCreateDailyLogPayload(payload)];
  }

  return [...forbiddenIssues, ...validateCreateProofItemPayload(payload)];
}

export function validateProposedAction(
  input: unknown,
): ProposedActionValidationResult {
  if (!isRecord(input)) {
    return createActionError({
      code: "invalid_payload",
      message: "Proposed action must be an object.",
      issues: ["input must be an object."],
    });
  }

  const envelopeIssues = validateCommonEnvelope(input);

  if (envelopeIssues.length > 0) {
    return createActionError({
      action_type: isProposedActionType(input.action_type) ? input.action_type : undefined,
      code: "invalid_payload",
      message: "Proposed action envelope is invalid.",
      issues: envelopeIssues,
    });
  }

  const actionType = input.action_type as ProposedActionType;
  const payload = input.payload as Record<string, unknown>;
  const payloadIssues = validatePayloadForActionType(actionType, payload);

  if (payloadIssues.length > 0) {
    return createActionError({
      action_type: actionType,
      code: "invalid_payload",
      message: "Proposed action payload is invalid.",
      issues: payloadIssues,
    });
  }

  return createActionSuccess({
    action_type: actionType,
    message: "Proposed action is valid.",
    data: {
      action_type: actionType,
      payload: payload as unknown as ProposedActionContract["payload"],
      source: input.source as ProposedActionSource,
      reason: input.reason as string | undefined,
      confidence: input.confidence as number | undefined,
      evidence_refs: input.evidence_refs as string[] | undefined,
    },
  });
}

export type {
  CreateDailyLogPayload,
  CreateGoalPayload,
  CreateProofItemPayload,
  CreateTaskPayload,
  ProposedActionDomain,
  ProposedActionPriority,
  ProposedActionSource,
  ProposedGoalStatus,
  ProposedProofType,
  ProposedTaskStatus,
};
