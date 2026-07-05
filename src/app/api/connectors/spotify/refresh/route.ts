import { NextResponse } from "next/server";

import {
  getSpotifyExpiresAt,
  refreshSpotifyAccessToken,
} from "@/lib/connectors/spotify";
import { getDashboardAuthState } from "@/lib/dashboard/auth";
import {
  getSpotifyConnection,
  recordSpotifyEvent,
  updateSpotifyConnectionTokens,
} from "@/lib/repositories/spotify-connector-read-write";

export async function POST() {
  const authState = await getDashboardAuthState();
  const user = authState.user;

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const connection = await getSpotifyConnection(user.id);

  if (connection.error) {
    return NextResponse.json({ error: connection.error }, { status: 500 });
  }

  if (!connection.data?.refresh_token) {
    return NextResponse.json(
      { error: "No active Spotify refresh token is available." },
      { status: 400 },
    );
  }

  try {
    const token = await refreshSpotifyAccessToken(connection.data.refresh_token);

    const updated = await updateSpotifyConnectionTokens({
      userId: user.id,
      accessToken: token.access_token,
      refreshToken: token.refresh_token ?? null,
      tokenType: token.token_type,
      expiresAt: getSpotifyExpiresAt(token.expires_in),
    });

    if (updated.error || !updated.data) {
      return NextResponse.json(
        { error: updated.error ?? "Spotify token refresh could not be stored." },
        { status: 500 },
      );
    }

    await recordSpotifyEvent({
      userId: user.id,
      spotifyConnectionId: updated.data.id,
      eventType: "spotify_token_refreshed",
      eventSummary: "Spotify access token refreshed.",
      eventStatus: "refreshed",
    });

    return NextResponse.json({
      ok: true,
      expiresAt: updated.data.expires_at,
    });
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "Unknown Spotify refresh error";

    await recordSpotifyEvent({
      userId: user.id,
      spotifyConnectionId: connection.data.id,
      eventType: "spotify_token_refresh_failed",
      eventSummary: message,
      eventStatus: "failed",
    });

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
