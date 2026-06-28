import type { VoiceSessionRow, VoiceTranscriptRow } from "@/types/database";

export type VoiceReadError = {
  message: string;
};

export type VoiceReadResult<T> = {
  data: T[];
  error: string | null;
};

type VoiceQueryResponse<T> = {
  data: T[] | null;
  error: VoiceReadError | null;
};

interface VoiceQueryBuilder<T> extends PromiseLike<VoiceQueryResponse<T>> {
  select(columns?: string): VoiceQueryBuilder<T>;
  eq(column: string, value: string): VoiceQueryBuilder<T>;
  order(column: string, options?: { ascending?: boolean }): VoiceQueryBuilder<T>;
  limit(count: number): VoiceQueryBuilder<T>;
}

export type VoiceReadClient = {
  from(table: "voice_sessions"): VoiceQueryBuilder<VoiceSessionRow>;
  from(table: "voice_transcripts"): VoiceQueryBuilder<VoiceTranscriptRow>;
};

function normalizeVoiceReadResult<T>(
  response: VoiceQueryResponse<T>,
): VoiceReadResult<T> {
  return {
    data: response.data ?? [],
    error: response.error?.message ?? null,
  };
}

export async function listVoiceSessions(
  client: VoiceReadClient,
  userId: string,
  limit = 20,
): Promise<VoiceReadResult<VoiceSessionRow>> {
  const response = await client
    .from("voice_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("started_at", { ascending: false })
    .limit(limit);

  return normalizeVoiceReadResult(response);
}

export async function listVoiceTranscripts(
  client: VoiceReadClient,
  userId: string,
  voiceSessionId: string,
  limit = 200,
): Promise<VoiceReadResult<VoiceTranscriptRow>> {
  const response = await client
    .from("voice_transcripts")
    .select("*")
    .eq("user_id", userId)
    .eq("voice_session_id", voiceSessionId)
    .order("segment_index", { ascending: true })
    .limit(limit);

  return normalizeVoiceReadResult(response);
}
