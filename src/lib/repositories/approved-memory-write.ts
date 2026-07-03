import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateApprovedMemorySchemaAlignment } from "@/lib/carnos-continuity/memory-rag-schema-validators";

import type { RepositoryListResult, RepositoryResult } from "./core-read";

/**
 * Phase 17F — Approved Memory Repository + Approval Flow
 *
 * This is the explicit approval/write boundary for approved memories.
 *
 * Boundary:
 * - Uses public.memory_items as the canonical approved-memory table.
 * - Can approve an existing public.memory_candidates row into public.memory_items.
 * - Can link a candidate to approved_memory_item_id after explicit approval.
 * - Can write public.memory_events lifecycle audit rows.
 * - Does not generate embeddings.
 * - Does not write embedding metadata records.
 * - Does not write retrieval event records.
 * - Does not retrieve memory for Carnos context.
 * - Does not rank memories.
 * - Does not call AI/provider/runtime tools.
 * - Does not scan or approve in the background.
 */

export type ApprovedMemoryStatus =
  | "approved"
  | "edited"
  | "archived"
  | "forgotten"
  | "stale"
  | "needs_review";

export type ApprovedMemoryCandidateStatus =
  | "candidate"
  | "pending_review"
  | "approved"
  | "edited"
  | "rejected"
  | "archived"
  | "forgotten"
  | "blocked_by_private_mode"
  | "blocked_by_do_not_remember"
  | "needs_review";

export type ApprovedMemorySensitivity = "low" | "medium" | "high" | "restricted";

export type ApprovedMemoryPriority = "low" | "medium" | "high";

export type ApprovedMemoryType =
  | "preference"
  | "goal"
  | "project_fact"
  | "project_decision"
  | "routine"
  | "system_state"
  | "carnos_entity_state"
  | "source_of_truth_note"
  | "conversation_continuity"
  | "user_profile_fact"
  | "sensitive_note"
  | "knowledge_item"
  | "voice_transcript_candidate"
  | "research_note"
  | "career_context"
  | "health_context"
  | "grimoire_context"
  | "privacy_rule"
  | "do_not_remember_rule";

export type ApprovedMemoryEvidenceStrength =
  | "weak"
  | "medium"
  | "strong"
  | "source_backed"
  | "user_confirmed";

export type ApprovedMemorySourceReliability =
  | "unknown"
  | "low"
  | "medium"
  | "high"
  | "source_of_truth";

export type MemoryEventActorType = "user" | "carnos" | "system";

export type ApprovedMemoryEventType =
  | "candidate_approved"
  | "memory_created"
  | "memory_updated"
  | "memory_archived"
  | "memory_forgotten"
  | "review_requested";

export interface ApprovedMemoryCandidateRow {
  id: string;
  user_id: string;
  candidate_text: string;
  candidate_summary?: string | null;
  memory_type: ApprovedMemoryType;
  candidate_source?: string | null;
  source?: string | null;
  status: ApprovedMemoryCandidateStatus;
  sensitivity: ApprovedMemorySensitivity;
  confidence: number;
  priority: ApprovedMemoryPriority | number | string;
  source_route?: string | null;
  source_table?: string | null;
  source_record_id?: string | null;
  source_chat_message_id?: string | null;
  source_ai_action_id?: string | null;
  source_voice_transcript_id?: string | null;
  proposed_reason?: string | null;
  rejection_reason?: string | null;
  blocked_reason?: string | null;
  metadata?: Record<string, unknown> | null;
  reviewed_at?: string | null;
  expires_at?: string | null;
  approved_memory_item_id?: string | null;
  evidence_strength?: ApprovedMemoryEvidenceStrength | null;
  source_reliability?: ApprovedMemorySourceReliability | null;
  conflict_group_key?: string | null;
  duplicate_of_memory_item_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ApprovedMemoryRow {
  id: string;
  user_id: string;
  candidate_id?: string | null;
  memory_text: string;
  memory_summary?: string | null;
  memory_type: ApprovedMemoryType;
  status: ApprovedMemoryStatus;
  sensitivity: ApprovedMemorySensitivity;
  confidence: number;
  priority: ApprovedMemoryPriority;
  source_route?: string | null;
  source_table?: string | null;
  source_record_id?: string | null;
  source_chat_message_id?: string | null;
  source_ai_action_id?: string | null;
  source_voice_transcript_id?: string | null;
  provenance?: Record<string, unknown> | null;
  conflict_group_key?: string | null;
  conflict_state?: string | null;
  stale_state?: string | null;
  review_state?: string | null;
  evidence_strength?: ApprovedMemoryEvidenceStrength | null;
  source_reliability?: ApprovedMemorySourceReliability | null;
  retrieval_enabled?: boolean | null;
  semantic_retrieval_allowed?: boolean | null;
  locked_at?: string | null;
  locked_reason?: string | null;
  forgotten_at?: string | null;
  forgotten_reason?: string | null;
  archived_at?: string | null;
  approved_at?: string | null;
  last_used_at?: string | null;
  review_after?: string | null;
  superseded_by_memory_item_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MemoryEventRow {
  id: string;
  user_id: string;
  memory_item_id?: string | null;
  memory_candidate_id?: string | null;
  event_type: ApprovedMemoryEventType;
  event_summary: string;
  actor_type: MemoryEventActorType;
  source_route?: string | null;
  source_table?: string | null;
  source_record_id?: string | null;
  source_chat_message_id?: string | null;
  source_ai_action_id?: string | null;
  source_voice_transcript_id?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string | null;
}

export interface CreateApprovedMemoryInput {
  user_id: string;
  memory_text: string;
  memory_summary?: string;
  memory_type: ApprovedMemoryType;
  candidate_id?: string;
  sensitivity?: ApprovedMemorySensitivity;
  confidence?: number;
  priority?: ApprovedMemoryPriority;
  source_route?: string;
  source_table?: string;
  source_record_id?: string;
  source_chat_message_id?: string;
  source_ai_action_id?: string;
  source_voice_transcript_id?: string;
  provenance?: Record<string, unknown>;
  conflict_group_key?: string;
  evidence_strength?: ApprovedMemoryEvidenceStrength;
  source_reliability?: ApprovedMemorySourceReliability;
  retrieval_enabled?: boolean;
  semantic_retrieval_allowed?: boolean;
  review_after?: string;
  actor_type?: MemoryEventActorType;
}

export interface ApproveMemoryCandidateInput {
  user_id: string;
  candidate_id: string;
  memory_text?: string;
  memory_summary?: string;
  sensitivity?: ApprovedMemorySensitivity;
  confidence?: number;
  priority?: ApprovedMemoryPriority;
  evidence_strength?: ApprovedMemoryEvidenceStrength;
  source_reliability?: ApprovedMemorySourceReliability;
  retrieval_enabled?: boolean;
  semantic_retrieval_allowed?: boolean;
  review_after?: string;
  actor_type?: MemoryEventActorType;
}

export interface UpdateApprovedMemoryInput {
  user_id: string;
  memory_item_id: string;
  memory_text?: string;
  memory_summary?: string | null;
  status?: Extract<ApprovedMemoryStatus, "approved" | "edited" | "stale" | "needs_review">;
  sensitivity?: ApprovedMemorySensitivity;
  confidence?: number;
  priority?: ApprovedMemoryPriority;
  conflict_group_key?: string | null;
  evidence_strength?: ApprovedMemoryEvidenceStrength;
  source_reliability?: ApprovedMemorySourceReliability;
  retrieval_enabled?: boolean;
  semantic_retrieval_allowed?: boolean;
  review_after?: string | null;
  actor_type?: MemoryEventActorType;
}

export interface ListApprovedMemoriesOptions {
  statuses?: ApprovedMemoryStatus[];
  memory_type?: ApprovedMemoryType;
  sensitivity?: ApprovedMemorySensitivity;
  include_terminal?: boolean;
  retrieval_enabled?: boolean;
  semantic_retrieval_allowed?: boolean;
  limit?: number;
}

export interface ArchiveApprovedMemoryInput {
  user_id: string;
  memory_item_id: string;
  archive_reason?: string;
  actor_type?: MemoryEventActorType;
}

export interface ForgetApprovedMemoryInput {
  user_id: string;
  memory_item_id: string;
  forgotten_reason: string;
  actor_type?: MemoryEventActorType;
}

export interface LockApprovedMemoryInput {
  user_id: string;
  memory_item_id: string;
  locked_reason: string;
  actor_type?: MemoryEventActorType;
}

type RepositoryErrorLike = {
  message?: string;
};

type ApprovedMemoryQueryResult = {
  data: unknown;
  error: RepositoryErrorLike | null;
};

type ApprovedMemoryTable = "memory_candidates" | "memory_items" | "memory_events";

type ApprovedMemoryQueryBuilder = {
  select(columns?: string): ApprovedMemoryQueryBuilder;
  insert(payload: Record<string, unknown>): ApprovedMemoryQueryBuilder;
  update(payload: Record<string, unknown>): ApprovedMemoryQueryBuilder;
  eq(column: string, value: unknown): ApprovedMemoryQueryBuilder;
  in(column: string, value: readonly unknown[]): ApprovedMemoryQueryBuilder;
  order(column: string, options?: { ascending?: boolean }): ApprovedMemoryQueryBuilder;
  limit(count: number): ApprovedMemoryQueryBuilder;
  maybeSingle(): Promise<ApprovedMemoryQueryResult>;
  single(): Promise<ApprovedMemoryQueryResult>;
  then: Promise<ApprovedMemoryQueryResult>["then"];
};

type ApprovedMemoryClient = {
  from(table: ApprovedMemoryTable): ApprovedMemoryQueryBuilder;
};

const MEMORY_CANDIDATES_TABLE = "memory_candidates" as const;
const MEMORY_ITEMS_TABLE = "memory_items" as const;
const MEMORY_EVENTS_TABLE = "memory_events" as const;

const DEFAULT_APPROVED_MEMORY_STATUSES: readonly ApprovedMemoryStatus[] = [
  "approved",
  "edited",
  "needs_review",
];

const TERMINAL_APPROVED_MEMORY_STATUSES: readonly ApprovedMemoryStatus[] = [
  "archived",
  "forgotten",
];

const BLOCKED_CANDIDATE_STATUSES: readonly ApprovedMemoryCandidateStatus[] = [
  "approved",
  "rejected",
  "archived",
  "forgotten",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
];

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as RepositoryErrorLike).message === "string"
  ) {
    return (error as RepositoryErrorLike).message ?? "Unknown approved memory repository error";
  }

  return "Unknown approved memory repository error";
}

async function getApprovedMemoryClient(): Promise<ApprovedMemoryClient> {
  return (await createSupabaseServerClient()) as unknown as ApprovedMemoryClient;
}

function isNonBlankString(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function assertNonBlank(label: string, value: string | null | undefined): RepositoryResult<never> | null {
  if (!isNonBlankString(value)) {
    return {
      data: null,
      error: `${label} is required.`,
    };
  }

  return null;
}

function assertRange(
  label: string,
  value: number | undefined,
  min: number,
  max: number,
): RepositoryResult<never> | null {
  if (value === undefined) return null;

  if (!Number.isFinite(value) || value < min || value > max) {
    return {
      data: null,
      error: `${label} must be between ${min} and ${max}.`,
    };
  }

  return null;
}

function omitUndefined(payload: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

function normalizeLimit(limit: number | undefined): number {
  if (!limit || !Number.isFinite(limit)) return 50;
  return Math.max(1, Math.min(Math.trunc(limit), 100));
}

function normalizePriority(value: ApprovedMemoryPriority | number | string | undefined): ApprovedMemoryPriority {
  if (value === "low" || value === "medium" || value === "high") return value;

  if (typeof value === "number") {
    if (value >= 67) return "high";
    if (value <= 33) return "low";
    return "medium";
  }

  if (typeof value === "string") {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return normalizePriority(numeric);
  }

  return "medium";
}

function normalizeConfidence(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0.5;
  return Math.max(0, Math.min(value, 1));
}

function normalizeRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function normalizeCandidate(row: unknown): ApprovedMemoryCandidateRow {
  return row as ApprovedMemoryCandidateRow;
}

function normalizeMemory(row: unknown): ApprovedMemoryRow {
  return row as ApprovedMemoryRow;
}

function normalizeMemories(rows: unknown): ApprovedMemoryRow[] {
  if (!Array.isArray(rows)) return [];
  return rows.map(normalizeMemory);
}

function assertApprovedMemoryWriteAllowed(
  input: CreateApprovedMemoryInput | UpdateApprovedMemoryInput,
): RepositoryResult<never> | null {
  if ("memory_text" in input && input.memory_text !== undefined) {
    const textResult = assertNonBlank("Approved memory text", input.memory_text);
    if (textResult) return textResult;
  }

  const confidenceResult = assertRange("confidence", input.confidence, 0, 1);
  if (confidenceResult) return confidenceResult;

  if (
    "semantic_retrieval_allowed" in input &&
    input.semantic_retrieval_allowed === true &&
    "status" in input &&
    input.status !== undefined &&
    input.status !== "approved" &&
    input.status !== "edited"
  ) {
    return {
      data: null,
      error: "Semantic retrieval can only be enabled for approved or edited memory.",
    };
  }

  return null;
}

function validateApprovedMemoryPayloadForBoundary(
  payload: {
    id?: string;
    user_id: string;
    memory_text: string;
    memory_summary?: string | null;
    memory_type: ApprovedMemoryType;
    status: ApprovedMemoryStatus;
    sensitivity: ApprovedMemorySensitivity;
    confidence: number;
    evidence_strength: ApprovedMemoryEvidenceStrength;
    source_reliability: ApprovedMemorySourceReliability;
    retrieval_enabled: boolean;
    semantic_retrieval_allowed: boolean;
    candidate_id?: string | null;
    conflict_group_key?: string | null;
    locked_at?: string | null;
    locked_reason?: string | null;
    forgotten_at?: string | null;
    forgotten_reason?: string | null;
  },
): RepositoryResult<never> | null {
  const validation = validateApprovedMemorySchemaAlignment({
    kind: "approved_memory_schema_alignment",
    id: payload.id ?? "pending-db-generated-memory-item",
    user_id: payload.user_id,
    candidate_id: payload.candidate_id ?? undefined,
    memory_text: payload.memory_text,
    memory_summary: payload.memory_summary ?? undefined,
    memory_type: payload.memory_type,
    status: payload.status,
    sensitivity: payload.sensitivity,
    confidence: payload.confidence,
    evidence_strength: payload.evidence_strength,
    source_reliability: payload.source_reliability,
    retrieval_enabled: payload.retrieval_enabled,
    semantic_retrieval_allowed: payload.semantic_retrieval_allowed,
    locked_at: payload.locked_at ?? undefined,
    locked_reason: payload.locked_reason ?? undefined,
    forgotten_at: payload.forgotten_at ?? undefined,
    forgotten_reason: payload.forgotten_reason ?? undefined,
    conflict_group_key: payload.conflict_group_key ?? undefined,
  });

  if (!validation.ok) {
    return {
      data: null,
      error: validation.errors.join(" "),
    };
  }

  return null;
}

async function writeMemoryLifecycleEvent(input: {
  user_id: string;
  memory_item_id?: string | null;
  memory_candidate_id?: string | null;
  event_type: ApprovedMemoryEventType;
  event_summary: string;
  actor_type?: MemoryEventActorType;
  source_route?: string | null;
  source_table?: string | null;
  source_record_id?: string | null;
  source_chat_message_id?: string | null;
  source_ai_action_id?: string | null;
  source_voice_transcript_id?: string | null;
  metadata?: Record<string, unknown>;
}): Promise<RepositoryResult<MemoryEventRow>> {
  const summaryResult = assertNonBlank("Memory event summary", input.event_summary);
  if (summaryResult) return summaryResult;

  const payload = omitUndefined({
    user_id: input.user_id,
    memory_item_id: input.memory_item_id,
    memory_candidate_id: input.memory_candidate_id,
    event_type: input.event_type,
    event_summary: input.event_summary.trim(),
    actor_type: input.actor_type ?? "user",
    source_route: input.source_route,
    source_table: input.source_table,
    source_record_id: input.source_record_id,
    source_chat_message_id: input.source_chat_message_id,
    source_ai_action_id: input.source_ai_action_id,
    source_voice_transcript_id: input.source_voice_transcript_id,
    metadata: input.metadata ?? {},
  });

  try {
    const supabase = await getApprovedMemoryClient();
    const { data, error } = await supabase
      .from(MEMORY_EVENTS_TABLE)
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: data as MemoryEventRow, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function createApprovedMemory(
  input: CreateApprovedMemoryInput,
): Promise<RepositoryResult<ApprovedMemoryRow>> {
  const validation = assertApprovedMemoryWriteAllowed(input);
  if (validation) return validation;

  const textResult = assertNonBlank("Approved memory text", input.memory_text);
  if (textResult) return textResult;

  const confidence = normalizeConfidence(input.confidence);
  const sensitivity = input.sensitivity ?? "medium";
  const evidenceStrength = input.evidence_strength ?? "user_confirmed";
  const sourceReliability = input.source_reliability ?? "unknown";
  const retrievalEnabled = input.retrieval_enabled ?? sensitivity !== "restricted";
  const semanticRetrievalAllowed = input.semantic_retrieval_allowed ?? false;

  const boundaryValidation = validateApprovedMemoryPayloadForBoundary({
    user_id: input.user_id,
    candidate_id: input.candidate_id,
    memory_text: input.memory_text.trim(),
    memory_summary: input.memory_summary?.trim() || undefined,
    memory_type: input.memory_type,
    status: "approved",
    sensitivity,
    confidence,
    evidence_strength: evidenceStrength,
    source_reliability: sourceReliability,
    retrieval_enabled: retrievalEnabled,
    semantic_retrieval_allowed: semanticRetrievalAllowed,
    conflict_group_key: input.conflict_group_key,
  });
  if (boundaryValidation) return boundaryValidation;

  const payload = omitUndefined({
    user_id: input.user_id,
    candidate_id: input.candidate_id,
    memory_text: input.memory_text.trim(),
    memory_summary: input.memory_summary?.trim() || null,
    memory_type: input.memory_type,
    status: "approved",
    sensitivity,
    confidence,
    priority: input.priority ?? "medium",
    source_route: input.source_route,
    source_table: input.source_table,
    source_record_id: input.source_record_id,
    source_chat_message_id: input.source_chat_message_id,
    source_ai_action_id: input.source_ai_action_id,
    source_voice_transcript_id: input.source_voice_transcript_id,
    provenance: input.provenance ?? {},
    conflict_group_key: input.conflict_group_key,
    evidence_strength: evidenceStrength,
    source_reliability: sourceReliability,
    retrieval_enabled: retrievalEnabled,
    semantic_retrieval_allowed: semanticRetrievalAllowed,
    review_after: input.review_after,
  });

  try {
    const supabase = await getApprovedMemoryClient();
    const { data, error } = await supabase
      .from(MEMORY_ITEMS_TABLE)
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    const memory = normalizeMemory(data);

    const eventResult = await writeMemoryLifecycleEvent({
      user_id: input.user_id,
      memory_item_id: memory.id,
      memory_candidate_id: input.candidate_id,
      event_type: "memory_created",
      event_summary: "Approved memory created.",
      actor_type: input.actor_type ?? "user",
      source_route: input.source_route,
      source_table: input.source_table,
      source_record_id: input.source_record_id,
      source_chat_message_id: input.source_chat_message_id,
      source_ai_action_id: input.source_ai_action_id,
      source_voice_transcript_id: input.source_voice_transcript_id,
      metadata: {
        phase: "17F",
        approval_flow: Boolean(input.candidate_id),
      },
    });

    if (eventResult.error) {
      return { data: null, error: eventResult.error };
    }

    return { data: memory, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function approveMemoryCandidate(
  input: ApproveMemoryCandidateInput,
): Promise<RepositoryResult<ApprovedMemoryRow>> {
  try {
    const supabase = await getApprovedMemoryClient();

    const { data: candidateData, error: candidateError } = await supabase
      .from(MEMORY_CANDIDATES_TABLE)
      .select("*")
      .eq("user_id", input.user_id)
      .eq("id", input.candidate_id)
      .maybeSingle();

    if (candidateError) {
      return { data: null, error: getErrorMessage(candidateError) };
    }

    if (!candidateData) {
      return { data: null, error: "Memory candidate was not found." };
    }

    const candidate = normalizeCandidate(candidateData);

    if (BLOCKED_CANDIDATE_STATUSES.includes(candidate.status)) {
      return {
        data: null,
        error: `Memory candidate cannot be approved from status ${candidate.status}.`,
      };
    }

    if (candidate.approved_memory_item_id) {
      return {
        data: null,
        error: "Memory candidate is already linked to an approved memory item.",
      };
    }

    const memoryText = input.memory_text?.trim() || candidate.candidate_text.trim();
    const memorySummary =
      input.memory_summary?.trim() || candidate.candidate_summary?.trim() || undefined;

    const approved = await createApprovedMemory({
      user_id: input.user_id,
      candidate_id: candidate.id,
      memory_text: memoryText,
      memory_summary: memorySummary,
      memory_type: candidate.memory_type,
      sensitivity: input.sensitivity ?? candidate.sensitivity,
      confidence: input.confidence ?? normalizeConfidence(candidate.confidence),
      priority: input.priority ?? normalizePriority(candidate.priority),
      source_route: candidate.source_route ?? undefined,
      source_table: candidate.source_table ?? undefined,
      source_record_id: candidate.source_record_id ?? undefined,
      source_chat_message_id: candidate.source_chat_message_id ?? undefined,
      source_ai_action_id: candidate.source_ai_action_id ?? undefined,
      source_voice_transcript_id: candidate.source_voice_transcript_id ?? undefined,
      provenance: {
        candidate_id: candidate.id,
        candidate_source: candidate.candidate_source ?? candidate.source ?? "unknown",
        proposed_reason: candidate.proposed_reason ?? null,
        candidate_metadata: normalizeRecord(candidate.metadata),
      },
      conflict_group_key: candidate.conflict_group_key ?? undefined,
      evidence_strength: input.evidence_strength ?? candidate.evidence_strength ?? "user_confirmed",
      source_reliability: input.source_reliability ?? candidate.source_reliability ?? "unknown",
      retrieval_enabled: input.retrieval_enabled,
      semantic_retrieval_allowed: input.semantic_retrieval_allowed,
      review_after: input.review_after,
      actor_type: input.actor_type ?? "user",
    });

    if (approved.error || !approved.data) {
      return approved;
    }

    const { error: updateCandidateError } = await supabase
      .from(MEMORY_CANDIDATES_TABLE)
      .update({
        status: "approved",
        approved_memory_item_id: approved.data.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("user_id", input.user_id)
      .eq("id", input.candidate_id)
      .select("id")
      .single();

    if (updateCandidateError) {
      return { data: null, error: getErrorMessage(updateCandidateError) };
    }

    const eventResult = await writeMemoryLifecycleEvent({
      user_id: input.user_id,
      memory_item_id: approved.data.id,
      memory_candidate_id: candidate.id,
      event_type: "candidate_approved",
      event_summary: "Memory candidate approved into memory_items.",
      actor_type: input.actor_type ?? "user",
      source_route: candidate.source_route ?? undefined,
      source_table: candidate.source_table ?? undefined,
      source_record_id: candidate.source_record_id ?? undefined,
      source_chat_message_id: candidate.source_chat_message_id ?? undefined,
      source_ai_action_id: candidate.source_ai_action_id ?? undefined,
      source_voice_transcript_id: candidate.source_voice_transcript_id ?? undefined,
      metadata: {
        phase: "17F",
        approved_memory_item_id: approved.data.id,
      },
    });

    if (eventResult.error) {
      return { data: null, error: eventResult.error };
    }

    return approved;
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function listApprovedMemories(
  userId: string,
  options: ListApprovedMemoriesOptions = {},
): Promise<RepositoryListResult<ApprovedMemoryRow>> {
  try {
    const supabase = await getApprovedMemoryClient();
    let query = supabase
      .from(MEMORY_ITEMS_TABLE)
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(normalizeLimit(options.limit));

    const statuses =
      options.statuses ??
      (options.include_terminal ? undefined : DEFAULT_APPROVED_MEMORY_STATUSES);

    if (statuses && statuses.length > 0) {
      query = query.in("status", statuses);
    }

    if (options.memory_type) {
      query = query.eq("memory_type", options.memory_type);
    }

    if (options.sensitivity) {
      query = query.eq("sensitivity", options.sensitivity);
    }

    if (options.retrieval_enabled !== undefined) {
      query = query.eq("retrieval_enabled", options.retrieval_enabled);
    }

    if (options.semantic_retrieval_allowed !== undefined) {
      query = query.eq("semantic_retrieval_allowed", options.semantic_retrieval_allowed);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: normalizeMemories(data), error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function getApprovedMemory(
  userId: string,
  memoryItemId: string,
): Promise<RepositoryResult<ApprovedMemoryRow | null>> {
  try {
    const supabase = await getApprovedMemoryClient();
    const { data, error } = await supabase
      .from(MEMORY_ITEMS_TABLE)
      .select("*")
      .eq("user_id", userId)
      .eq("id", memoryItemId)
      .maybeSingle();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: data ? normalizeMemory(data) : null, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function updateApprovedMemory(
  input: UpdateApprovedMemoryInput,
): Promise<RepositoryResult<ApprovedMemoryRow>> {
  const validation = assertApprovedMemoryWriteAllowed(input);
  if (validation) return validation;

  const payload = omitUndefined({
    memory_text: input.memory_text?.trim(),
    memory_summary:
      input.memory_summary === null ? null : input.memory_summary?.trim() || undefined,
    status: input.status,
    sensitivity: input.sensitivity,
    confidence: input.confidence,
    priority: input.priority,
    conflict_group_key: input.conflict_group_key,
    evidence_strength: input.evidence_strength,
    source_reliability: input.source_reliability,
    retrieval_enabled: input.retrieval_enabled,
    semantic_retrieval_allowed: input.semantic_retrieval_allowed,
    review_after: input.review_after,
  });

  if (Object.keys(payload).length === 0) {
    return { data: null, error: "No approved memory updates were provided." };
  }

  try {
    const supabase = await getApprovedMemoryClient();
    const { data, error } = await supabase
      .from(MEMORY_ITEMS_TABLE)
      .update(payload)
      .eq("user_id", input.user_id)
      .eq("id", input.memory_item_id)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    const memory = normalizeMemory(data);

    const eventResult = await writeMemoryLifecycleEvent({
      user_id: input.user_id,
      memory_item_id: input.memory_item_id,
      event_type: "memory_updated",
      event_summary: "Approved memory updated.",
      actor_type: input.actor_type ?? "user",
      metadata: {
        phase: "17F",
        updated_fields: Object.keys(payload),
      },
    });

    if (eventResult.error) {
      return { data: null, error: eventResult.error };
    }

    return { data: memory, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function archiveApprovedMemory(
  input: ArchiveApprovedMemoryInput,
): Promise<RepositoryResult<ApprovedMemoryRow>> {
  try {
    const supabase = await getApprovedMemoryClient();
    const { data, error } = await supabase
      .from(MEMORY_ITEMS_TABLE)
      .update({
        status: "archived",
        archived_at: new Date().toISOString(),
        retrieval_enabled: false,
        semantic_retrieval_allowed: false,
      })
      .eq("user_id", input.user_id)
      .eq("id", input.memory_item_id)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    const memory = normalizeMemory(data);

    const eventResult = await writeMemoryLifecycleEvent({
      user_id: input.user_id,
      memory_item_id: input.memory_item_id,
      event_type: "memory_archived",
      event_summary: input.archive_reason?.trim() || "Approved memory archived.",
      actor_type: input.actor_type ?? "user",
      metadata: {
        phase: "17F",
        archive_reason: input.archive_reason ?? null,
      },
    });

    if (eventResult.error) {
      return { data: null, error: eventResult.error };
    }

    return { data: memory, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function forgetApprovedMemory(
  input: ForgetApprovedMemoryInput,
): Promise<RepositoryResult<ApprovedMemoryRow>> {
  const reasonResult = assertNonBlank("Forgotten reason", input.forgotten_reason);
  if (reasonResult) return reasonResult;

  try {
    const supabase = await getApprovedMemoryClient();
    const { data, error } = await supabase
      .from(MEMORY_ITEMS_TABLE)
      .update({
        status: "forgotten",
        forgotten_at: new Date().toISOString(),
        forgotten_reason: input.forgotten_reason.trim(),
        retrieval_enabled: false,
        semantic_retrieval_allowed: false,
      })
      .eq("user_id", input.user_id)
      .eq("id", input.memory_item_id)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    const memory = normalizeMemory(data);

    const eventResult = await writeMemoryLifecycleEvent({
      user_id: input.user_id,
      memory_item_id: input.memory_item_id,
      event_type: "memory_forgotten",
      event_summary: input.forgotten_reason.trim(),
      actor_type: input.actor_type ?? "user",
      metadata: {
        phase: "17F",
        forgotten_reason: input.forgotten_reason.trim(),
      },
    });

    if (eventResult.error) {
      return { data: null, error: eventResult.error };
    }

    return { data: memory, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function lockApprovedMemory(
  input: LockApprovedMemoryInput,
): Promise<RepositoryResult<ApprovedMemoryRow>> {
  const reasonResult = assertNonBlank("Locked reason", input.locked_reason);
  if (reasonResult) return reasonResult;

  try {
    const supabase = await getApprovedMemoryClient();
    const { data, error } = await supabase
      .from(MEMORY_ITEMS_TABLE)
      .update({
        locked_at: new Date().toISOString(),
        locked_reason: input.locked_reason.trim(),
      })
      .eq("user_id", input.user_id)
      .eq("id", input.memory_item_id)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    const memory = normalizeMemory(data);

    const eventResult = await writeMemoryLifecycleEvent({
      user_id: input.user_id,
      memory_item_id: input.memory_item_id,
      event_type: "review_requested",
      event_summary: `Approved memory locked: ${input.locked_reason.trim()}`,
      actor_type: input.actor_type ?? "user",
      metadata: {
        phase: "17F",
        locked_reason: input.locked_reason.trim(),
      },
    });

    if (eventResult.error) {
      return { data: null, error: eventResult.error };
    }

    return { data: memory, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export function getApprovedMemoryRepositoryBoundarySummary(): readonly string[] {
  return [
    "public.memory_items is the canonical approved-memory table.",
    "public.memory_candidates can be linked through approved_memory_item_id only after explicit approval.",
    "public.memory_events records candidate_approved, memory_created, memory_updated, memory_archived, memory_forgotten, and review_requested lifecycle events.",
    "approval is explicit and user-scoped; rejected, archived, forgotten, private-mode-blocked, and do-not-remember-blocked candidates are not approvable.",
    "forgotten and archived memories disable retrieval flags.",
    "this repository does not embed, retrieve, rank, browse, call providers, inject Carnos context, or scan in the background.",
    `terminal approved-memory statuses: ${TERMINAL_APPROVED_MEMORY_STATUSES.join(", ")}`,
  ];
}
