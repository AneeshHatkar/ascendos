import { NextResponse } from "next/server";

import { getDashboardAuthState } from "@/lib/dashboard/auth";
import {
  getSpotifyConnection,
  recordSpotifyEvent,
  revokeSpotifyConnection,
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
  const revoked = await revokeSpotifyConnection(user.id);

  if (!revoked.ok) {
    return NextResponse.json(
      { error: revoked.error ?? "Spotify connection could not be revoked." },
      { status: 500 },
    );
  }

  await recordSpotifyEvent({
    userId: user.id,
    spotifyConnectionId: connection.data?.id ?? null,
    eventType: "spotify_connection_revoked",
    eventSummary: "Spotify connection revoked inside ascendOS.",
    eventStatus: "revoked",
  });

  return NextResponse.json({ ok: true });
}
