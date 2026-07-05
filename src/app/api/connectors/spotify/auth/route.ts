import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  buildSpotifyAuthorizeUrl,
  createSpotifyState,
  isSpotifyConnectorEnabled,
} from "@/lib/connectors/spotify";
import { getDashboardAuthState } from "@/lib/dashboard/auth";

export async function GET() {
  if (!isSpotifyConnectorEnabled()) {
    return NextResponse.json(
      { error: "Spotify connector is disabled." },
      { status: 503 },
    );
  }

  const authState = await getDashboardAuthState();
  const user = authState.user;

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required before connecting Spotify." },
      { status: 401 },
    );
  }

  const state = createSpotifyState();
  const cookieStore = await cookies();

  cookieStore.set("ascendos_spotify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  return NextResponse.redirect(buildSpotifyAuthorizeUrl(state));
}
