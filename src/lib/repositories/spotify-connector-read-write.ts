import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { RepositoryListResult } from "./core-read";

export type SpotifyConnectionRow = {
  id: string;
  user_id: string;
  spotify_user_id: string;
  spotify_display_name: string | null;
  spotify_email: string | null;
  spotify_product: string | null;
  spotify_country: string | null;
  scope: string;
  access_token: string;
  refresh_token: string | null;
  token_type: string;
  expires_at: string;
  connected_at: string;
  last_refreshed_at: string | null;
  revoked_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type SpotifyEventRow = {
  id: string;
  user_id: string;
  spotify_connection_id: string | null;
  event_type: string;
  event_summary: string;
  event_status: "recorded" | "failed" | "revoked" | "refreshed" | "connected";
  metadata: Record<string, unknown>;
  created_at: string;
};

type RepositoryErrorLike = {
  message?: string;
};

type SpotifyQueryResult<T> = {
  data: T | null;
  error: RepositoryErrorLike | null;
};

type SpotifyListQueryResult<T> = {
  data: T[] | null;
  error: RepositoryErrorLike | null;
};

type SpotifyQueryBuilder = {
  select(columns?: string): SpotifyQueryBuilder;
  eq(column: string, value: unknown): SpotifyQueryBuilder;
  is(column: string, value: unknown): SpotifyQueryBuilder;
  update(payload: Record<string, unknown>): SpotifyQueryBuilder;
  upsert(payload: Record<string, unknown>, options?: Record<string, unknown>): SpotifyQueryBuilder;
  insert(payload: Record<string, unknown>): SpotifyQueryBuilder;
  order(column: string, options?: { ascending?: boolean }): SpotifyQueryBuilder;
  limit(count: number): SpotifyQueryBuilder;
  single(): Promise<SpotifyQueryResult<unknown>>;
  maybeSingle(): Promise<SpotifyQueryResult<unknown>>;
};

type SpotifySupabaseClient = {
  from(table: "spotify_connections" | "spotify_events"): SpotifyQueryBuilder;
};

async function getSpotifySupabaseClient(): Promise<SpotifySupabaseClient> {
  return (await createSupabaseServerClient()) as unknown as SpotifySupabaseClient;
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as RepositoryErrorLike).message === "string"
  ) {
    return (error as RepositoryErrorLike).message ?? "Unknown Spotify connector repository error";
  }

  return "Unknown Spotify connector repository error";
}

async function resolveList<T>(
  query: SpotifyQueryBuilder,
): Promise<RepositoryListResult<T>> {
  try {
    const result = await (query as unknown as Promise<SpotifyListQueryResult<T>>);

    if (result.error) {
      return { data: null, error: getErrorMessage(result.error) };
    }

    return { data: result.data ?? [], error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function getSpotifyConnection(
  userId: string,
): Promise<{ data: SpotifyConnectionRow | null; error: string | null }> {
  try {
    const supabase = await getSpotifySupabaseClient();

    const { data, error } = await supabase
      .from("spotify_connections")
      .select("*")
      .eq("user_id", userId)
      .is("revoked_at", null)
      .maybeSingle();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: (data ?? null) as SpotifyConnectionRow | null, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function upsertSpotifyConnection(input: {
  userId: string;
  spotifyUserId: string;
  spotifyDisplayName?: string | null;
  spotifyEmail?: string | null;
  spotifyProduct?: string | null;
  spotifyCountry?: string | null;
  scope: string;
  accessToken: string;
  refreshToken?: string | null;
  tokenType: string;
  expiresAt: string;
  metadata?: Record<string, unknown>;
}): Promise<{ data: SpotifyConnectionRow | null; error: string | null }> {
  try {
    const supabase = await getSpotifySupabaseClient();

    const { data, error } = await supabase
      .from("spotify_connections")
      .upsert(
        {
          user_id: input.userId,
          spotify_user_id: input.spotifyUserId,
          spotify_display_name: input.spotifyDisplayName ?? null,
          spotify_email: input.spotifyEmail ?? null,
          spotify_product: input.spotifyProduct ?? null,
          spotify_country: input.spotifyCountry ?? null,
          scope: input.scope,
          access_token: input.accessToken,
          refresh_token: input.refreshToken ?? null,
          token_type: input.tokenType,
          expires_at: input.expiresAt,
          revoked_at: null,
          metadata: input.metadata ?? {},
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: data as SpotifyConnectionRow, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function updateSpotifyConnectionTokens(input: {
  userId: string;
  accessToken: string;
  refreshToken?: string | null;
  tokenType: string;
  expiresAt: string;
}): Promise<{ data: SpotifyConnectionRow | null; error: string | null }> {
  try {
    const supabase = await getSpotifySupabaseClient();

    const updatePayload: Record<string, unknown> = {
      access_token: input.accessToken,
      token_type: input.tokenType,
      expires_at: input.expiresAt,
      last_refreshed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (input.refreshToken) {
      updatePayload.refresh_token = input.refreshToken;
    }

    const { data, error } = await supabase
      .from("spotify_connections")
      .update(updatePayload)
      .eq("user_id", input.userId)
      .is("revoked_at", null)
      .select("*")
      .single();

    if (error) {
      return { data: null, error: getErrorMessage(error) };
    }

    return { data: data as SpotifyConnectionRow, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function revokeSpotifyConnection(
  userId: string,
): Promise<{ ok: boolean; error: string | null }> {
  try {
    const supabase = await getSpotifySupabaseClient();

    const { error } = await supabase
      .from("spotify_connections")
      .update({
        revoked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .is("revoked_at", null)
      .select("*")
      .single();

    if (error) {
      return { ok: false, error: getErrorMessage(error) };
    }

    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}

export async function recordSpotifyEvent(input: {
  userId: string;
  spotifyConnectionId?: string | null;
  eventType: string;
  eventSummary: string;
  eventStatus?: SpotifyEventRow["event_status"];
  metadata?: Record<string, unknown>;
}): Promise<{ ok: boolean; error: string | null }> {
  try {
    const supabase = await getSpotifySupabaseClient();

    const { error } = await supabase
      .from("spotify_events")
      .insert({
        user_id: input.userId,
        spotify_connection_id: input.spotifyConnectionId ?? null,
        event_type: input.eventType,
        event_summary: input.eventSummary,
        event_status: input.eventStatus ?? "recorded",
        metadata: input.metadata ?? {},
      })
      .select("*")
      .single();

    if (error) {
      return { ok: false, error: getErrorMessage(error) };
    }

    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}

export async function listSpotifyEvents(
  userId: string,
  limit = 25,
): Promise<RepositoryListResult<SpotifyEventRow>> {
  const supabase = await getSpotifySupabaseClient();

  return resolveList<SpotifyEventRow>(
    supabase
      .from("spotify_events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(Math.min(Math.max(Math.trunc(limit), 1), 100)),
  );
}
