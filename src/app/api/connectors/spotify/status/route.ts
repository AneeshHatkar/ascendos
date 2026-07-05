import { NextResponse } from "next/server";

import { isSpotifyConnectorEnabled } from "@/lib/connectors/spotify";
import { getDashboardAuthState } from "@/lib/dashboard/auth";
import {
  getSpotifyConnection,
  listSpotifyEvents,
} from "@/lib/repositories/spotify-connector-read-write";

export async function GET() {
  const authState = await getDashboardAuthState();
  const user = authState.user;

  if (!user) {
    return NextResponse.json(
      { connected: false, error: "Authentication required." },
      { status: 401 },
    );
  }

  const connection = await getSpotifyConnection(user.id);
  const events = await listSpotifyEvents(user.id, 10);

  if (connection.error) {
    return NextResponse.json(
      {
        enabled: isSpotifyConnectorEnabled(),
        connected: false,
        error: connection.error,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    enabled: isSpotifyConnectorEnabled(),
    connected: Boolean(connection.data),
    connection: connection.data
      ? {
          spotifyUserId: connection.data.spotify_user_id,
          displayName: connection.data.spotify_display_name,
          email: connection.data.spotify_email,
          product: connection.data.spotify_product,
          country: connection.data.spotify_country,
          scope: connection.data.scope,
          expiresAt: connection.data.expires_at,
          connectedAt: connection.data.connected_at,
          lastRefreshedAt: connection.data.last_refreshed_at,
        }
      : null,
    events: events.data ?? [],
    eventsError: events.error,
  });
}
