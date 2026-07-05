import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  exchangeSpotifyCodeForToken,
  getSpotifyExpiresAt,
  getSpotifyProfile,
  isSpotifyConnectorEnabled,
} from "@/lib/connectors/spotify";
import { getDashboardAuthState } from "@/lib/dashboard/auth";
import {
  recordSpotifyEvent,
  upsertSpotifyConnection,
} from "@/lib/repositories/spotify-connector-read-write";

function redirectToPrivacy(params: Record<string, string>) {
  const url = new URL(
    "/privacy",
    process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000",
  );

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  if (!isSpotifyConnectorEnabled()) {
    return redirectToPrivacy({
      spotify: "disabled",
    });
  }

  const authState = await getDashboardAuthState();
  const user = authState.user;

  if (!user) {
    return redirectToPrivacy({
      spotify: "auth_required",
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    await recordSpotifyEvent({
      userId: user.id,
      eventType: "spotify_connect_denied",
      eventSummary: `Spotify authorization denied: ${error}`,
      eventStatus: "failed",
      metadata: { error },
    });

    return redirectToPrivacy({
      spotify: "denied",
    });
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get("ascendos_spotify_oauth_state")?.value;

  cookieStore.delete("ascendos_spotify_oauth_state");

  if (!code || !state || !expectedState || state !== expectedState) {
    await recordSpotifyEvent({
      userId: user.id,
      eventType: "spotify_connect_state_failed",
      eventSummary: "Spotify OAuth state validation failed.",
      eventStatus: "failed",
      metadata: {
        hasCode: Boolean(code),
        hasState: Boolean(state),
        hasExpectedState: Boolean(expectedState),
      },
    });

    return redirectToPrivacy({
      spotify: "state_failed",
    });
  }

  try {
    const token = await exchangeSpotifyCodeForToken(code);
    const profile = await getSpotifyProfile(token.access_token);

    const connection = await upsertSpotifyConnection({
      userId: user.id,
      spotifyUserId: profile.id,
      spotifyDisplayName: profile.display_name ?? null,
      spotifyEmail: profile.email ?? null,
      spotifyProduct: profile.product ?? null,
      spotifyCountry: profile.country ?? null,
      scope: token.scope,
      accessToken: token.access_token,
      refreshToken: token.refresh_token ?? null,
      tokenType: token.token_type,
      expiresAt: getSpotifyExpiresAt(token.expires_in),
      metadata: {
        connectedVia: "spotify_authorization_code_flow",
      },
    });

    if (connection.error || !connection.data) {
      await recordSpotifyEvent({
        userId: user.id,
        eventType: "spotify_connect_store_failed",
        eventSummary: connection.error ?? "Spotify connection could not be saved.",
        eventStatus: "failed",
      });

      return redirectToPrivacy({
        spotify: "store_failed",
      });
    }

    await recordSpotifyEvent({
      userId: user.id,
      spotifyConnectionId: connection.data.id,
      eventType: "spotify_connected",
      eventSummary: "Spotify account connected.",
      eventStatus: "connected",
      metadata: {
        spotifyUserId: profile.id,
        scope: token.scope,
      },
    });

    return redirectToPrivacy({
      spotify: "connected",
    });
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "Unknown Spotify callback error";

    await recordSpotifyEvent({
      userId: user.id,
      eventType: "spotify_connect_failed",
      eventSummary: message,
      eventStatus: "failed",
    });

    return redirectToPrivacy({
      spotify: "failed",
    });
  }
}
