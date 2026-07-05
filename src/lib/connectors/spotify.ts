import crypto from "node:crypto";

const SPOTIFY_ACCOUNTS_BASE_URL = "https://accounts.spotify.com";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
};

export type SpotifyProfile = {
  id: string;
  display_name?: string | null;
  email?: string | null;
  product?: string | null;
  country?: string | null;
};

export type SpotifyConnectionConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export const SPOTIFY_SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-read-recently-played",
  "user-top-read",
] as const;

export function getSpotifyConfig(): SpotifyConnectionConfig {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId) {
    throw new Error("Missing SPOTIFY_CLIENT_ID");
  }

  if (!clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_SECRET");
  }

  if (!redirectUri) {
    throw new Error("Missing SPOTIFY_REDIRECT_URI");
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
  };
}

export function isSpotifyConnectorEnabled(): boolean {
  return process.env.SPOTIFY_CONNECTOR_ENABLED === "true";
}

export function createSpotifyState(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function buildSpotifyAuthorizeUrl(state: string): string {
  const config = getSpotifyConfig();

  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.clientId,
    scope: SPOTIFY_SCOPES.join(" "),
    redirect_uri: config.redirectUri,
    state,
    show_dialog: "true",
  });

  return `${SPOTIFY_ACCOUNTS_BASE_URL}/authorize?${params.toString()}`;
}

function getBasicAuthHeader(config: SpotifyConnectionConfig): string {
  const raw = `${config.clientId}:${config.clientSecret}`;
  return `Basic ${Buffer.from(raw).toString("base64")}`;
}

export async function exchangeSpotifyCodeForToken(code: string): Promise<SpotifyTokenResponse> {
  const config = getSpotifyConfig();

  const response = await fetch(`${SPOTIFY_ACCOUNTS_BASE_URL}/api/token`, {
    method: "POST",
    headers: {
      Authorization: getBasicAuthHeader(config),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: config.redirectUri,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify token exchange failed: ${response.status} ${text}`);
  }

  return (await response.json()) as SpotifyTokenResponse;
}

export async function refreshSpotifyAccessToken(
  refreshToken: string,
): Promise<SpotifyTokenResponse> {
  const config = getSpotifyConfig();

  const response = await fetch(`${SPOTIFY_ACCOUNTS_BASE_URL}/api/token`, {
    method: "POST",
    headers: {
      Authorization: getBasicAuthHeader(config),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify token refresh failed: ${response.status} ${text}`);
  }

  return (await response.json()) as SpotifyTokenResponse;
}

export async function getSpotifyProfile(accessToken: string): Promise<SpotifyProfile> {
  const response = await fetch(`${SPOTIFY_API_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify profile fetch failed: ${response.status} ${text}`);
  }

  return (await response.json()) as SpotifyProfile;
}

export function getSpotifyExpiresAt(expiresInSeconds: number): string {
  return new Date(Date.now() + expiresInSeconds * 1000).toISOString();
}
