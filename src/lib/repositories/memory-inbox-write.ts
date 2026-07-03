import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { RepositoryListResult, RepositoryResult } from "./core-read";

/**
 * Phase 17E — Memory Inbox Repository
 *
 * This is the persistence boundary for memory candidates only.
 *
 * Boundary:
 * - Uses public.memory_candidates as the memory inbox table.
 * - Does not write public.memory_items.
 * - Does not approve memory.
 * - Does not create embeddings.
 * - Does not retrieve memory for Carnos context.
 * - Does not call AI/provider/runtime tools.
 * - Does not scan in the background.
 */

export type MemoryInboxCandidateStatus =
  | "candidate"
  | "pending_review"
  | "edited"
  | "rejected"
  | "archived"
  | "blocked_by_private_mode"
  | "blocked_by_do_not_remember"
  | "needs_review";

export type MemoryInboxSensitivity = "low" | "medium" | "high" | "restricted";

export type MemoryInboxSource =
  | "manual_remember"
  | "manual_do_not_remember"
  | "chat_message"
  | "voice_transcript_draft"
  | "source_of_truth"
  | "repo_log"
  | "phase_report"
  | "audit_report"
  | "project_state"
  | "system_state"
  | "domain_record"
  | "knowledge_document";

export type MemoryInboxMemoryType =
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

export interface MemoryCandidateRow {
  id: string;
  user_id: string;
  candidate_text: string;
  memory_type: MemoryInboxMemoryType;
  source: MemoryInboxSource;
  status: MemoryInboxCandidateStatus;
  sensitivity: MemoryInboxSensitivity;
  priority: number;
  confidence: number;
  private_mode_blocked?: boolean | null;
  do_not_remember_blocked?: boolean | null;
  source_chat_message_id?: string | null;
  source_ai_action_id?: string | null;
  source_voice_transcript_id?: string | null;
  approved_memory_item_id?: string | null;
  duplicate_of_memory_item_id?: string | null;
  conflict_group_key?: string | null;
  evidence_strength?: string | null;
  source_reliability?: string | null;
  rejection_reason?: string | null;
  review_after?: string | null;
  last_confirmed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CreateMemoryCandidateInput {
  user_id: string;
  candidate_text: string;
  memory_type: MemoryInboxMemoryType;
  source: MemoryInboxSource;
  status?: Extract<
    MemoryInboxCandidateStatus,
    | "candidate"
    | "pending_review"
    | "blocked_by_private_mode"
    | "blocked_by_do_not_remember"
  >;
  sensitivity?: MemoryInboxSensitivity;
  priority?: number;
  confidence?: number;
  private_mode_blocked?: boolean;
  do_not_remember_blocked?: boolean;
  source_chat_message_id?: string;
  source_ai_action_id?: string;
  source_voice_transcript_id?: string;
  conflict_group_key?: string;
  evidence_strength?: string;
  source_reliability?: string;
  review_after?: string;
  last_confirmed_at?: string;
}

export interface ListMemoryCandidatesOptions {
  statuses?: MemoryInboxCandidateStatus[];
  memory_type?: MemoryInboxMemoryType;
  sensitivity?: MemoryInboxSensitivity;
  source?: MemoryInboxSource;
  include_terminal?: boolean;
  limit?: number;
}

export interface UpdateMemoryCandidateInput {
  user_id: string;
  candidate_id: string;
  candidate_text?: string;
  status?: Exclude<MemoryInboxCandidateStatus, "approved">;
  memory_type?: MemoryInboxMemoryType;
  sensitivity?: MemoryInboxSensitivity;
  priority?: number;
  confidence?: number;
  private_mode_blocked?: boolean;
  do_not_remember_blocked?: boolean;
  duplicate_of_memory_item_id?: string | null;
  conflict_group_key?: string | null;
  evidence_strength?: string | null;
  source_reliability?: string | null;
  rejection_reason?: string | null;
  review_after?: string | null;
  last_confirmed_at?: string | null;
}

export interface RejectMemoryCandidateInput {
  user_id: string;
  candidate_id: string;
  rejection_reason: string;
}

export interface ArchiveMemoryCandidateInput {
  user_id: string;
  candidate_id: string;
  archive_reason?: string;
}

export interface MarkMemoryCandidateSensitivityInput {
  user_id: string;
  candidate_id: string;
  sensitivity: MemoryInboxSensitivity;
}

type RepositoryErrorLike = {
  message?: string;
};

type MemoryInboxQueryResult = {
  data: unknown;
  error: RepositoryErrorLike | null;
};

type MemoryInboxQueryBuilder = {
  select(columns?: string): MemoryInboxQueryBuilder;
  insert(payload: Record<string, unknown>): MemoryInboxQueryBuilder;
  update(payload: Record<string, unknown>): MemoryInboxQueryBuilder;
  eq(column: string, value: unknown): MemoryInboxQueryBuilder;
  in(column: string, value: readonly unknown[]): MemoryInboxQueryBuilder;
  order(column: string, options?: { ascending?: boolean }): MemoryInboxQueryBuilder;
  limit(count: number): MemoryInboxQueryBuilder;
  maybeSingle(): Promise<MemoryInboxQueryResult>;
  single(): Promise<MemoryInboxQueryResult>;
  then: Promise<MemoryInboxQueryResult>["then"];
};

type MemoryInboxClient = {
  from(table: "memory_candidates"): MemoryInboxQueryBuilder;
};

const MEMORY_INBOX_TABLE = "memory_candidates" as const;

const TERMINAL_CANDIDATE_STATUSES: readonly MemoryInboxCandidateStatus[] = [
  "rejected",
  "archived",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
];

const DEFAULT_LIST_STATUSES: readonly MemoryInboxCandidateStatus[] = [
  "candidate",
  "pending_review",
  "edited",
  "needs_review",
];

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as RepositoryErrorLike).message === "string"
  ) {
    return (error as RepositoryErrorLike).message ?? "Unknown memory inbox repository error";
  }

  return "Unknown memory inbox repository error";
}

async function getMemoryInboxClient(): Promise<MemoryInboxClient> {
  return (await createSupabaseServerClient()) as unknown as MemoryInboxClient;
}

function isNonBlankString(value: string): boolean {
  return value.trim().length > 0;
}

function assertMemoryCandidateText(value: string): RepositoryResult<never> | null {
  if (!isNonBlankString(value)) {
    return {
      data: null,
      error: "Memory candidate text is required.",
    };
  }

  return null;
}

function assertReason(value: string): RepositoryResult<never> | null {
  if (!isNonBlankString(value)) {
    return {
      data: null,
      error: "A review reason is required.",
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
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );
}

function normalizeLimit(limit: number | undefined): number {
  if (!limit || !Number.isFinite(limit)) return 50;
  return Math.max(1, Math.min(Math.trunc(limit), 100));
}

function normalizeCandidate(row: unknown): MemoryCandidateRow {
  return row as MemoryCandidateRow;
}

function normalizeCandidates(rows: unknown): MemoryCandidateRow[] {
  if (!Array.isArray(rows)) return [];
  return rows.map(normalizeCandidate);
}

function assertCandidateWriteAllowed(
  input: CreateMemoryCandidateInput | UpdateMemoryCandidateInput,
): RepositoryResult<never> | null {
  const priorityResult = assertRange("priority", input.priority, 0, 100);
  if (priorityResult) return priorityResult;

  const confidenceResult = assertRange("confidence", input.confidence, 0, 1);
  if (confidenceResult) return confidenceResult;

  if ("candidate_text" in input && input.candidate_text !== undefined) {
    const textResult = assertMemoryCandidateText(input.candidate_text);
    if (textResult) return textResult;
  }

  return null;
}

export async function createMemoryCandidate(
  input: CreateMemoryCandidateInput,
): Promise<RepositoryResult<MemoryCandidateRow>> {
  const validation = assertCandidateWriteAllowed(input);
  if (validation) return validation;

  const privateModeBlocked = input.private_mode_blocked ?? false;
  const doNotRememberBlocked = input.do_not_remember_blocked ?? false;

  const status =
    input.status ??
    (privateModeBlocked
      ? "blocked_by_private_mode"
      : doNotRememberBlocked
        ? "blocked_by_do_not_remember"
        : "pending_review");

  const payload = omitUndefined({
    user_id: input.user_id,
    candidate_text: input.candidate_text.trim(),
    memory_type: input.memory_type,
    source: input.source,
    status,
    sensitivity: input.sensitivity ?? "low",
    priority: input.priority ?? 50,
    confidence: input.confidence ?? 0.5,
    private_mode_blocked: privateModeBlocked,
    do_not_remember_blocked: doNotRememberBlocked,
    source_chat_message_id: input.source_chat_message_id,
    source_ai_action_id: input.source_ai_action_id,
    source_voice_transcript_id: input.source_voice_transcript_id,
    conflict_group_key: input.conflict_group_key,
    evidence_strength: input.evidence_strength,
    source_reliability: input.source_reliability,
    review_after: input.review_after,
    last_confirmed_at: input.last_confirmed_at,
  });

  try {
    const supabase = await getMemoryInboxClient();
    const { data, error } = await supabase
      .from(MEMORY_INBOX_TABLE)
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: normalizeCandidate(data), error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function listMemoryCandidates(
  userId: string,
  options: ListMemoryCandidatesOptions = {},
): Promise<RepositoryListResult<MemoryCandidateRow>> {
  try {
    const supabase = await getMemoryInboxClient();
    let query = supabase
      .from(MEMORY_INBOX_TABLE)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(normalizeLimit(options.limit));

    const statuses =
      options.statuses ??
      (options.include_terminal ? undefined : DEFAULT_LIST_STATUSES);

    if (statuses && statuses.length > 0) {
      query = query.in("status", statuses);
    }

    if (options.memory_type) {
      query = query.eq("memory_type", options.memory_type);
    }

    if (options.sensitivity) {
      query = query.eq("sensitivity", options.sensitivity);
    }

    if (options.source) {
      query = query.eq("source", options.source);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: normalizeCandidates(data), error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function getMemoryCandidate(
  userId: string,
  candidateId: string,
): Promise<RepositoryResult<MemoryCandidateRow | null>> {
  try {
    const supabase = await getMemoryInboxClient();
    const { data, error } = await supabase
      .from(MEMORY_INBOX_TABLE)
      .select("*")
      .eq("user_id", userId)
      .eq("id", candidateId)
      .maybeSingle();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: data ? normalizeCandidate(data) : null, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function updateMemoryCandidate(
  input: UpdateMemoryCandidateInput,
): Promise<RepositoryResult<MemoryCandidateRow>> {
  const validation = assertCandidateWriteAllowed(input);
  if (validation) return validation;

  const payload = omitUndefined({
    candidate_text: input.candidate_text?.trim(),
    status: input.status,
    memory_type: input.memory_type,
    sensitivity: input.sensitivity,
    priority: input.priority,
    confidence: input.confidence,
    private_mode_blocked: input.private_mode_blocked,
    do_not_remember_blocked: input.do_not_remember_blocked,
    duplicate_of_memory_item_id: input.duplicate_of_memory_item_id,
    conflict_group_key: input.conflict_group_key,
    evidence_strength: input.evidence_strength,
    source_reliability: input.source_reliability,
    rejection_reason: input.rejection_reason,
    review_after: input.review_after,
    last_confirmed_at: input.last_confirmed_at,
  });

  if (Object.keys(payload).length === 0) {
    return { data: null, error: "No memory candidate updates were provided." };
  }

  try {
    const supabase = await getMemoryInboxClient();
    const { data, error } = await supabase
      .from(MEMORY_INBOX_TABLE)
      .update(payload)
      .eq("user_id", input.user_id)
      .eq("id", input.candidate_id)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: normalizeCandidate(data), error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function rejectMemoryCandidate(
  input: RejectMemoryCandidateInput,
): Promise<RepositoryResult<MemoryCandidateRow>> {
  const reasonResult = assertReason(input.rejection_reason);
  if (reasonResult) return reasonResult;

  return updateMemoryCandidate({
    user_id: input.user_id,
    candidate_id: input.candidate_id,
    status: "rejected",
    rejection_reason: input.rejection_reason.trim(),
  });
}

export async function archiveMemoryCandidate(
  input: ArchiveMemoryCandidateInput,
): Promise<RepositoryResult<MemoryCandidateRow>> {
  return updateMemoryCandidate({
    user_id: input.user_id,
    candidate_id: input.candidate_id,
    status: "archived",
    rejection_reason: input.archive_reason?.trim() || null,
  });
}

export async function markMemoryCandidateSensitivity(
  input: MarkMemoryCandidateSensitivityInput,
): Promise<RepositoryResult<MemoryCandidateRow>> {
  return updateMemoryCandidate({
    user_id: input.user_id,
    candidate_id: input.candidate_id,
    sensitivity: input.sensitivity,
  });
}

export function getMemoryInboxRepositoryBoundarySummary(): readonly string[] {
  return [
    "public.memory_candidates is the only table written by the memory inbox repository.",
    "public.memory_items is not written here; approval belongs to the later approved-memory flow.",
    "memory candidates can be created, listed, read, edited, rejected, archived, or marked sensitive.",
    "rejected and archived candidates remain terminal review records and are not approved memory.",
    "the repository does not embed, retrieve, rank, browse, call providers, inject Carnos context, or scan in the background.",
    `terminal statuses: ${TERMINAL_CANDIDATE_STATUSES.join(", ")}`,
  ];
}
