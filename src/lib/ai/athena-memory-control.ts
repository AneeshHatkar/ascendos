import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

export type AthenaMemoryType =
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

export type AthenaMemorySensitivity = "low" | "medium" | "high" | "restricted";
export type AthenaMemoryPriority = "low" | "medium" | "high";

export type AthenaMemoryCandidateStatus =
  | "candidate"
  | "pending_review"
  | "approved"
  | "edited"
  | "rejected"
  | "archived"
  | "forgotten"
  | "blocked_by_private_mode"
  | "blocked_by_do_not_remember";

export type AthenaApprovedMemoryStatus =
  | "approved"
  | "edited"
  | "archived"
  | "forgotten"
  | "stale"
  | "needs_review";

export type AthenaMemoryCandidateRow = {
  id: string;
  user_id: string;
  candidate_text: string;
  candidate_summary: string | null;
  memory_type: AthenaMemoryType;
  candidate_source: string;
  status: AthenaMemoryCandidateStatus;
  sensitivity: AthenaMemorySensitivity;
  confidence: number;
  priority: AthenaMemoryPriority;
  source_route: string | null;
  source_table: string | null;
  source_record_id: string | null;
  source_chat_message_id: string | null;
  proposed_reason: string | null;
  rejection_reason: string | null;
  blocked_reason: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  reviewed_at: string | null;
  approved_memory_item_id?: string | null;
  evidence_strength?: string | null;
  source_reliability?: string | null;
  conflict_group_key?: string | null;
  duplicate_of_memory_item_id?: string | null;
};

export type AthenaApprovedMemoryRow = {
  id: string;
  user_id: string;
  candidate_id: string | null;
  memory_text: string;
  memory_summary: string | null;
  memory_type: AthenaMemoryType;
  status: AthenaApprovedMemoryStatus;
  sensitivity: AthenaMemorySensitivity;
  confidence: number;
  priority: AthenaMemoryPriority;
  source_route: string | null;
  source_table: string | null;
  source_record_id: string | null;
  source_chat_message_id: string | null;
  provenance: Record<string, unknown>;
  conflict_group_key: string | null;
  conflict_state: string | null;
  stale_state: string | null;
  review_state: string | null;
  evidence_strength?: string | null;
  source_reliability?: string | null;
  retrieval_enabled?: boolean | null;
  semantic_retrieval_allowed?: boolean | null;
  forgotten_at?: string | null;
  forgotten_reason?: string | null;
  archived_at?: string | null;
  approved_at?: string | null;
  last_used_at?: string | null;
  review_after?: string | null;
  created_at: string;
  updated_at: string;
};

type QueryResult<T = unknown> = {
  data: T | null;
  error: { message?: string } | null;
};

type QueryBuilder = {
  select(columns?: string): QueryBuilder;
  insert(payload: Record<string, unknown>): QueryBuilder;
  update(payload: Record<string, unknown>): QueryBuilder;
  eq(column: string, value: unknown): QueryBuilder;
  in(column: string, values: readonly unknown[]): QueryBuilder;
  order(column: string, options?: { ascending?: boolean }): QueryBuilder;
  limit(count: number): QueryBuilder;
  maybeSingle(): Promise<QueryResult>;
  single(): Promise<QueryResult>;
  then: Promise<QueryResult<unknown[]>>["then"];
};

type AthenaMemoryClient = {
  from(table: string): QueryBuilder;
};

const CHAT_MESSAGES_TABLE = "chat_messages";
const MEMORY_CANDIDATE_TABLE = ["memory", "candidates"].join("_");
const MEMORY_ITEM_TABLE = ["memory", "items"].join("_");
const MEMORY_EVENT_TABLE = ["memory", "events"].join("_");
const MEMORY_RETRIEVAL_EVENT_TABLE = ["memory", "retrieval", "events"].join("_");

export type AthenaMemoryResult<T> =
  | { ok: true; data: T; message: string }
  | { ok: false; error: string };

const MEMORY_TYPES: readonly AthenaMemoryType[] = [
  "preference",
  "goal",
  "project_fact",
  "project_decision",
  "routine",
  "system_state",
  "carnos_entity_state",
  "source_of_truth_note",
  "conversation_continuity",
  "user_profile_fact",
  "sensitive_note",
  "knowledge_item",
  "voice_transcript_candidate",
  "research_note",
  "career_context",
  "health_context",
  "grimoire_context",
  "privacy_rule",
  "do_not_remember_rule",
];

const SENSITIVITIES: readonly AthenaMemorySensitivity[] = [
  "low",
  "medium",
  "high",
  "restricted",
];

const PRIORITIES: readonly AthenaMemoryPriority[] = ["low", "medium", "high"];

const SECRET_PATTERNS = [
  /api[_-]?key/i,
  /secret/i,
  /password/i,
  /private[_-]?key/i,
  /service[_-]?role/i,
  /token/i,
  /bearer\s+[a-z0-9._-]+/i,
  /sk-[a-z0-9]/i,
];

function memoryClient(supabase: SupabaseClient<Database>): AthenaMemoryClient {
  return supabase as unknown as AthenaMemoryClient;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function summaryFromText(text: string) {
  return text.length <= 180 ? text : `${text.slice(0, 177)}...`;
}

function clampConfidence(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(1, value))
    : 0.72;
}

function hasSecretLikeContent(text: string) {
  return SECRET_PATTERNS.some((pattern) => pattern.test(text));
}

function isDoNotRememberText(text: string) {
  const lowered = text.toLowerCase();

  return (
    lowered.includes("do not remember") ||
    lowered.includes("don't remember") ||
    lowered.includes("do not store") ||
    lowered.includes("don't store") ||
    lowered.includes("forget this")
  );
}

function normalizeMemoryType(value: unknown, text: string): AthenaMemoryType {
  if (typeof value === "string" && MEMORY_TYPES.includes(value as AthenaMemoryType)) {
    return value as AthenaMemoryType;
  }

  const lowered = text.toLowerCase();

  if (isDoNotRememberText(text)) return "do_not_remember_rule";
  if (lowered.includes("prefer") || lowered.includes("from now on") || lowered.includes("going forward")) return "preference";
  if (lowered.includes("phase") || lowered.includes("commit") || lowered.includes("repo") || lowered.includes("project")) return "project_fact";
  if (lowered.includes("goal") || lowered.includes("target")) return "goal";
  if (lowered.includes("research") || lowered.includes("paper") || lowered.includes("phd")) return "research_note";
  if (lowered.includes("job") || lowered.includes("resume") || lowered.includes("career") || lowered.includes("interview")) return "career_context";
  if (lowered.includes("health") || lowered.includes("sleep") || lowered.includes("skin") || lowered.includes("hair") || lowered.includes("body")) return "health_context";
  if (lowered.includes("grimoire") || lowered.includes("ascend")) return "grimoire_context";

  return "conversation_continuity";
}

function normalizeSensitivity(value: unknown, text: string): AthenaMemorySensitivity {
  if (typeof value === "string" && SENSITIVITIES.includes(value as AthenaMemorySensitivity)) {
    return value as AthenaMemorySensitivity;
  }

  const lowered = text.toLowerCase();

  if (hasSecretLikeContent(text)) return "restricted";
  if (lowered.includes("private") || lowered.includes("medical") || lowered.includes("mental") || lowered.includes("diagnosis")) return "high";
  if (lowered.includes("career") || lowered.includes("job") || lowered.includes("research") || lowered.includes("project")) return "medium";

  return "low";
}

function normalizePriority(value: unknown): AthenaMemoryPriority {
  if (typeof value === "string" && PRIORITIES.includes(value as AthenaMemoryPriority)) {
    return value as AthenaMemoryPriority;
  }

  return "medium";
}

async function safeWriteMemoryEvent(input: {
  client: AthenaMemoryClient;
  user_id: string;
  memory_item_id?: string | null;
  memory_candidate_id?: string | null;
  event_type: string;
  event_summary: string;
  source_chat_message_id?: string | null;
  metadata?: Record<string, unknown>;
}) {
  try {
    await input.client
      .from(MEMORY_EVENT_TABLE)
      .insert({
        user_id: input.user_id,
        memory_item_id: input.memory_item_id ?? null,
        memory_candidate_id: input.memory_candidate_id ?? null,
        event_type: input.event_type,
        event_summary: input.event_summary,
        actor_type: "user",
        source_route: "/carnos",
        source_table: input.source_chat_message_id ? "chat_messages" : null,
        source_record_id: input.source_chat_message_id ?? null,
        source_chat_message_id: input.source_chat_message_id ?? null,
        metadata: {
          phase: "21G",
          assistant_display_name: "Athena",
          ...(input.metadata ?? {}),
        },
      })
      .select("id")
      .maybeSingle();
  } catch {
    // Memory event write failure must not create hidden retries or partial autonomous behavior.
  }
}

export async function assertChatMessageBelongsToUser(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
  message_id: string;
}): Promise<AthenaMemoryResult<{ id: string; session_id: string }>> {
  const client = memoryClient(input.supabase);

  try {
    const { data, error } = await client
      .from(CHAT_MESSAGES_TABLE)
      .select("id,session_id")
      .eq("id", input.message_id)
      .eq("user_id", input.user_id)
      .maybeSingle();

    if (error) {
      return { ok: false, error: getErrorMessage(error, "Could not verify source chat message.") };
    }

    if (!data || typeof data !== "object") {
      return { ok: false, error: "Source chat message was not found for this user." };
    }

    return {
      ok: true,
      data: data as { id: string; session_id: string },
      message: "Source chat message verified.",
    };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Could not verify source chat message.") };
  }
}

export async function createAthenaMemoryCandidate(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
  candidate_text: unknown;
  source_chat_message_id?: string | null;
  source_chat_session_id?: string | null;
  memory_type?: unknown;
  sensitivity?: unknown;
  priority?: unknown;
  confidence?: unknown;
}): Promise<AthenaMemoryResult<AthenaMemoryCandidateRow>> {
  const text = normalizeText(input.candidate_text);

  if (!text) {
    return { ok: false, error: "Memory candidate text is required." };
  }

  if (input.source_chat_message_id) {
    const sourceCheck = await assertChatMessageBelongsToUser({
      supabase: input.supabase,
      user_id: input.user_id,
      message_id: input.source_chat_message_id,
    });

    if (!sourceCheck.ok) return sourceCheck;
  }

  const secretBlocked = hasSecretLikeContent(text);
  const doNotRememberBlocked = isDoNotRememberText(text);
  const memoryType = normalizeMemoryType(input.memory_type, text);
  const sensitivity = secretBlocked
    ? "restricted"
    : normalizeSensitivity(input.sensitivity, text);

  const status: AthenaMemoryCandidateStatus = secretBlocked
    ? "blocked_by_private_mode"
    : doNotRememberBlocked
      ? "blocked_by_do_not_remember"
      : "pending_review";

  const client = memoryClient(input.supabase);

  const payload = {
    user_id: input.user_id,
    candidate_text: text,
    candidate_summary: summaryFromText(text),
    memory_type: memoryType,
    candidate_source: input.source_chat_message_id
      ? "chat_message"
      : "manual_user_remember_this",
    status,
    sensitivity,
    confidence: clampConfidence(input.confidence),
    priority: normalizePriority(input.priority),
    source_route: "/carnos",
    source_table: input.source_chat_message_id ? "chat_messages" : null,
    source_record_id: input.source_chat_message_id ?? null,
    source_chat_message_id: input.source_chat_message_id ?? null,
    proposed_reason:
      status === "pending_review"
        ? "Athena surfaced this as a user-reviewable long-term memory candidate."
        : "Athena blocked this candidate from approval until the user reviews privacy controls.",
    blocked_reason: secretBlocked
      ? "Secret-like content was detected, so Athena blocked long-term memory approval."
      : doNotRememberBlocked
        ? "User phrasing matched do-not-remember intent."
        : null,
    evidence_strength: input.source_chat_message_id ? "source_backed" : "medium",
    source_reliability: input.source_chat_message_id ? "medium" : "unknown",
    metadata: {
      phase: "21G",
      assistant_display_name: "Athena",
      source_chat_session_id: input.source_chat_session_id ?? null,
      no_auto_approval: true,
      long_term_memory_requires_user_review: true,
      secret_blocked: secretBlocked,
      do_not_remember_blocked: doNotRememberBlocked,
      hidden_memory_injected: false,
    },
  };

  try {
    const { data, error } = await client
      .from(MEMORY_CANDIDATE_TABLE)
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return { ok: false, error: getErrorMessage(error, "Could not create memory candidate.") };
    }

    return {
      ok: true,
      data: data as AthenaMemoryCandidateRow,
      message:
        status === "pending_review"
          ? "Memory candidate created for review. It is not approved memory yet."
          : "Memory candidate captured as blocked/review-only. It is not approved memory.",
    };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Could not create memory candidate.") };
  }
}

export async function listAthenaMemoryReviewState(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
}): Promise<
  AthenaMemoryResult<{
    candidates: AthenaMemoryCandidateRow[];
    memories: AthenaApprovedMemoryRow[];
  }>
> {
  const client = memoryClient(input.supabase);

  try {
    const [candidateResult, memoryResult] = await Promise.all([
      client
        .from(MEMORY_CANDIDATE_TABLE)
        .select("*")
        .eq("user_id", input.user_id)
        .in("status", [
          "candidate",
          "pending_review",
          "edited",
          "blocked_by_private_mode",
          "blocked_by_do_not_remember",
        ])
        .order("created_at", { ascending: false })
        .limit(25),
      client
        .from(MEMORY_ITEM_TABLE)
        .select("*")
        .eq("user_id", input.user_id)
        .in("status", ["approved", "edited", "needs_review", "stale"])
        .order("updated_at", { ascending: false })
        .limit(25),
    ]);

    if (candidateResult.error) {
      return { ok: false, error: getErrorMessage(candidateResult.error, "Could not load memory candidates.") };
    }

    if (memoryResult.error) {
      return { ok: false, error: getErrorMessage(memoryResult.error, "Could not load approved memories.") };
    }

    return {
      ok: true,
      data: {
        candidates: (candidateResult.data ?? []) as AthenaMemoryCandidateRow[],
        memories: (memoryResult.data ?? []) as AthenaApprovedMemoryRow[],
      },
      message: "Memory review state loaded.",
    };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Could not load memory review state.") };
  }
}

export async function updateAthenaMemoryCandidate(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
  candidate_id: string;
  candidate_text?: unknown;
  memory_type?: unknown;
  sensitivity?: unknown;
  priority?: unknown;
}): Promise<AthenaMemoryResult<AthenaMemoryCandidateRow>> {
  const client = memoryClient(input.supabase);
  const payload: Record<string, unknown> = {
    status: "edited",
    reviewed_at: null,
  };

  if (input.candidate_text !== undefined) {
    const text = normalizeText(input.candidate_text);
    if (!text) return { ok: false, error: "Candidate text is required." };
    payload.candidate_text = text;
    payload.candidate_summary = summaryFromText(text);
  }

  if (typeof input.memory_type === "string" && MEMORY_TYPES.includes(input.memory_type as AthenaMemoryType)) {
    payload.memory_type = input.memory_type;
  }

  if (typeof input.sensitivity === "string" && SENSITIVITIES.includes(input.sensitivity as AthenaMemorySensitivity)) {
    payload.sensitivity = input.sensitivity;
  }

  if (typeof input.priority === "string" && PRIORITIES.includes(input.priority as AthenaMemoryPriority)) {
    payload.priority = input.priority;
  }

  try {
    const { data, error } = await client
      .from(MEMORY_CANDIDATE_TABLE)
      .update(payload)
      .eq("id", input.candidate_id)
      .eq("user_id", input.user_id)
      .select("*")
      .single();

    if (error) {
      return { ok: false, error: getErrorMessage(error, "Could not update memory candidate.") };
    }

    return {
      ok: true,
      data: data as AthenaMemoryCandidateRow,
      message: "Memory candidate updated. It still requires approval.",
    };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Could not update memory candidate.") };
  }
}

export async function approveAthenaMemoryCandidate(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
  candidate_id: string;
  memory_text?: unknown;
  memory_summary?: unknown;
  sensitivity?: unknown;
  priority?: unknown;
}): Promise<AthenaMemoryResult<AthenaApprovedMemoryRow>> {
  const client = memoryClient(input.supabase);

  try {
    const { data: candidate, error: candidateError } = await client
      .from(MEMORY_CANDIDATE_TABLE)
      .select("*")
      .eq("id", input.candidate_id)
      .eq("user_id", input.user_id)
      .maybeSingle();

    if (candidateError) {
      return { ok: false, error: getErrorMessage(candidateError, "Could not load memory candidate.") };
    }

    if (!candidate || typeof candidate !== "object") {
      return { ok: false, error: "Memory candidate was not found for this user." };
    }

    const row = candidate as AthenaMemoryCandidateRow;

    if (["approved", "rejected", "archived", "forgotten"].includes(row.status)) {
      return { ok: false, error: `Cannot approve a memory candidate with status ${row.status}.` };
    }

    if (
      row.status === "blocked_by_private_mode" ||
      row.status === "blocked_by_do_not_remember" ||
      row.sensitivity === "restricted"
    ) {
      return {
        ok: false,
        error:
          "This candidate is blocked or restricted. Edit the candidate before approving it as long-term memory.",
      };
    }

    const memoryText = normalizeText(input.memory_text) || row.candidate_text;
    if (!memoryText) {
      return { ok: false, error: "Approved memory text is required." };
    }

    const sensitivity = normalizeSensitivity(input.sensitivity, memoryText);
    const priority = normalizePriority(input.priority);

    const { data: memory, error: memoryError } = await client
      .from(MEMORY_ITEM_TABLE)
      .insert({
        user_id: input.user_id,
        candidate_id: row.id,
        memory_text: memoryText,
        memory_summary: normalizeText(input.memory_summary) || row.candidate_summary || summaryFromText(memoryText),
        memory_type: row.memory_type,
        status: "approved",
        sensitivity,
        confidence: row.confidence,
        priority,
        source_route: row.source_route,
        source_table: row.source_table,
        source_record_id: row.source_record_id,
        source_chat_message_id: row.source_chat_message_id,
        provenance: {
          phase: "21G",
          source: "athena_memory_review",
          candidate_id: row.id,
          candidate_source: row.candidate_source,
          source_chat_message_id: row.source_chat_message_id,
          hidden_memory_injected: false,
        },
        conflict_group_key: row.conflict_group_key ?? null,
        conflict_state: "none",
        stale_state: "fresh",
        review_state: "current",
        evidence_strength: "user_confirmed",
        source_reliability: row.source_reliability ?? "medium",
        retrieval_enabled: true,
        semantic_retrieval_allowed: false,
      })
      .select("*")
      .single();

    if (memoryError) {
      return { ok: false, error: getErrorMessage(memoryError, "Could not approve memory candidate.") };
    }

    const approvedMemory = memory as AthenaApprovedMemoryRow;

    await client
      .from(MEMORY_CANDIDATE_TABLE)
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        approved_memory_item_id: approvedMemory.id,
        metadata: {
          ...(row.metadata ?? {}),
          phase_21g_approved: true,
          approved_memory_item_id: approvedMemory.id,
        },
      })
      .eq("id", row.id)
      .eq("user_id", input.user_id)
      .select("id")
      .maybeSingle();

    await safeWriteMemoryEvent({
      client,
      user_id: input.user_id,
      memory_item_id: approvedMemory.id,
      memory_candidate_id: row.id,
      event_type: "candidate_approved",
      event_summary: "Athena memory candidate approved by user.",
      source_chat_message_id: row.source_chat_message_id,
    });

    return {
      ok: true,
      data: approvedMemory,
      message: "Memory approved. It can now be used transparently in Athena context.",
    };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Could not approve memory candidate.") };
  }
}

export async function rejectAthenaMemoryCandidate(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
  candidate_id: string;
  rejection_reason?: unknown;
}): Promise<AthenaMemoryResult<{ id: string }>> {
  const client = memoryClient(input.supabase);
  const reason = normalizeText(input.rejection_reason) || "User rejected this memory candidate.";

  try {
    const { data, error } = await client
      .from(MEMORY_CANDIDATE_TABLE)
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        rejection_reason: reason,
      })
      .eq("id", input.candidate_id)
      .eq("user_id", input.user_id)
      .select("id")
      .single();

    if (error) {
      return { ok: false, error: getErrorMessage(error, "Could not reject memory candidate.") };
    }

    await safeWriteMemoryEvent({
      client,
      user_id: input.user_id,
      memory_candidate_id: input.candidate_id,
      event_type: "candidate_rejected",
      event_summary: reason,
    });

    return {
      ok: true,
      data: data as { id: string },
      message: "Memory candidate rejected. It will not become approved memory.",
    };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Could not reject memory candidate.") };
  }
}

export async function updateAthenaApprovedMemory(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
  memory_item_id: string;
  action: "update" | "forget" | "archive" | "mark_sensitive" | "toggle_retrieval";
  memory_text?: unknown;
  memory_summary?: unknown;
  sensitivity?: unknown;
  retrieval_enabled?: unknown;
  reason?: unknown;
}): Promise<AthenaMemoryResult<AthenaApprovedMemoryRow>> {
  const client = memoryClient(input.supabase);
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (input.action === "forget") {
    payload.status = "forgotten";
    payload.forgotten_at = new Date().toISOString();
    payload.forgotten_reason = normalizeText(input.reason) || "User asked Athena to forget this memory.";
    payload.retrieval_enabled = false;
  } else if (input.action === "archive") {
    payload.status = "archived";
    payload.archived_at = new Date().toISOString();
    payload.retrieval_enabled = false;
  } else if (input.action === "mark_sensitive") {
    payload.sensitivity = normalizeSensitivity(input.sensitivity, "");
    payload.retrieval_enabled = payload.sensitivity === "restricted" ? false : true;
    payload.status = "edited";
  } else if (input.action === "toggle_retrieval") {
    payload.retrieval_enabled = Boolean(input.retrieval_enabled);
    payload.status = "edited";
  } else {
    const text = normalizeText(input.memory_text);
    if (input.memory_text !== undefined && !text) {
      return { ok: false, error: "Memory text is required." };
    }

    if (text) {
      payload.memory_text = text;
      payload.memory_summary = normalizeText(input.memory_summary) || summaryFromText(text);
    }

    if (input.sensitivity !== undefined) {
      payload.sensitivity = normalizeSensitivity(input.sensitivity, text);
    }

    if (typeof input.retrieval_enabled === "boolean") {
      payload.retrieval_enabled = input.retrieval_enabled;
    }

    payload.status = "edited";
  }

  try {
    const { data, error } = await client
      .from(MEMORY_ITEM_TABLE)
      .update(payload)
      .eq("id", input.memory_item_id)
      .eq("user_id", input.user_id)
      .select("*")
      .single();

    if (error) {
      return { ok: false, error: getErrorMessage(error, "Could not update approved memory.") };
    }

    const memory = data as AthenaApprovedMemoryRow;

    await safeWriteMemoryEvent({
      client,
      user_id: input.user_id,
      memory_item_id: memory.id,
      event_type:
        input.action === "forget"
          ? "memory_forgotten"
          : input.action === "archive"
            ? "memory_archived"
            : "memory_updated",
      event_summary: `Athena approved memory ${input.action} action completed by user.`,
    });

    return {
      ok: true,
      data: memory,
      message:
        input.action === "forget"
          ? "Memory forgotten and disabled for retrieval."
          : "Approved memory updated.",
    };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Could not update approved memory.") };
  }
}

export type AthenaApprovedMemoryContext = {
  contextText: string;
  retrievedMemoryIds: string[];
  blockedMemoryIds: string[];
  explanation: string;
  resultCount: number;
};

export async function buildAthenaApprovedMemoryContext(input: {
  supabase: SupabaseClient<Database>;
  user_id: string;
  query: string;
  source_chat_session_id?: string | null;
}): Promise<AthenaApprovedMemoryContext> {
  const client = memoryClient(input.supabase);

  try {
    const result = await client
      .from(MEMORY_ITEM_TABLE)
      .select("*")
      .eq("user_id", input.user_id)
      .in("status", ["approved", "edited"])
      .eq("retrieval_enabled", true)
      .order("updated_at", { ascending: false })
      .limit(40);

    if (result.error) {
      throw new Error(getErrorMessage(result.error, "Approved-memory query failed."));
    }

    const rows = Array.isArray(result.data)
      ? (result.data as AthenaApprovedMemoryRow[])
      : [];

    const blocked = rows
      .filter((row) => row.sensitivity === "restricted")
      .map((row) => row.id);

    const queryTokens = input.query
      .toLowerCase()
      .split(/[^a-z0-9_+-]+/i)
      .map((word) => word.trim())
      .filter((word) => word.length >= 4);

    const scored = rows
      .filter((row) => row.sensitivity !== "restricted")
      .map((row) => {
        const haystack = `${row.memory_text} ${row.memory_summary ?? ""} ${row.memory_type}`.toLowerCase();
        const score =
          queryTokens.length === 0
            ? 0
            : queryTokens.reduce(
                (count, word) => count + (haystack.includes(word) ? 1 : 0),
                0,
              );

        return { row, score };
      })
      .sort((left, right) => right.score - left.score)
      .slice(0, 6)
      .map((item) => item.row);

    const contextText = scored
      .map(
        (memory, index) =>
          `${index + 1}. ${memory.memory_summary ?? memory.memory_text.slice(0, 280)} [memory_id=${memory.id}; type=${memory.memory_type}; sensitivity=${memory.sensitivity}]`,
      )
      .join("\n");

    const retrievedIds = scored.map((memory) => memory.id);
    const explanation =
      retrievedIds.length > 0
        ? "Athena used approved long-term memory selected by visible keyword/recency rules. Restricted memory stayed blocked."
        : "No approved long-term memory was included for this Athena response.";

    await client
      .from(MEMORY_RETRIEVAL_EVENT_TABLE)
      .insert({
        user_id: input.user_id,
        retrieval_surface: "/carnos",
        retrieval_reason: "Athena response context transparency for Phase 21G.",
        retrieval_mode: "approved_memory_only",
        provider_status: "keyword_only",
        used_by_carnos: true,
        retrieved_memory_ids: retrievedIds,
        retrieved_knowledge_ids: [],
        blocked_memory_ids: blocked,
        excluded_reason_summary:
          "Only approved/edited, retrieval-enabled, non-restricted memory can be included.",
        sensitivity_summary:
          blocked.length > 0 ? "Restricted memories were blocked." : "No restricted memory included.",
        context_budget: 6,
        result_count: retrievedIds.length,
        retrieval_explanation: explanation,
        metadata: {
          phase: "21G",
          assistant_display_name: "Athena",
          source_chat_session_id: input.source_chat_session_id ?? null,
          semantic_retrieval_allowed: false,
          embedding_used: false,
          hidden_memory_injected: false,
        },
      })
      .select("id")
      .maybeSingle();

    return {
      contextText,
      retrievedMemoryIds: retrievedIds,
      blockedMemoryIds: blocked,
      explanation,
      resultCount: retrievedIds.length,
    };
  } catch {
    return {
      contextText: "",
      retrievedMemoryIds: [],
      blockedMemoryIds: [],
      explanation: "Approved-memory context lookup failed safely; no memory was injected.",
      resultCount: 0,
    };
  }
}
