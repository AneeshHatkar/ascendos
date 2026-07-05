type RecordLike = Record<string, unknown>;

export type PrivacyDashboardTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type PrivacyDashboardTile = {
  id: string;
  label: string;
  value: string | number;
  description: string;
  tone: PrivacyDashboardTone;
};

export type PrivacyDashboardCard = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  status: string;
  tone: PrivacyDashboardTone;
  bullets: string[];
  badges: string[];
};

export type PrivacyDashboardViewModel = {
  phase: "20Y";
  route: "/privacy";
  mode: "read_only";
  title: string;
  subtitle: string;
  appSettingsCount: number;
  privacySettingsCount: number;
  readErrors: string[];
  tiles: PrivacyDashboardTile[];
  memoryCards: PrivacyDashboardCard[];
  privacyControlCards: PrivacyDashboardCard[];
  connectorCards: PrivacyDashboardCard[];
  auditCards: PrivacyDashboardCard[];
  sourceMap: {
    appSettings: string;
    privacySettings: string;
    dashboardSummary: string;
  };
  runtimeGuards: string[];
};

function countRows(rows: unknown[]) {
  return rows.filter((row) => row && typeof row === "object" && !Array.isArray(row)).length;
}

function safeErrors(errors: string[]) {
  return errors.filter((error) => error.trim().length > 0);
}

function hasTextField(row: RecordLike, fields: string[]) {
  return fields.some((field) => {
    const value = row[field];
    return typeof value === "string" && value.trim().length > 0;
  });
}

function countMatching(rows: unknown[], fields: string[], terms: string[]) {
  return rows.filter((row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      return false;
    }

    const record = row as RecordLike;

    if (!hasTextField(record, fields)) {
      return false;
    }

    const haystack = fields
      .map((field) => record[field])
      .filter((value): value is string => typeof value === "string")
      .join(" ")
      .toLowerCase();

    return terms.some((term) => haystack.includes(term));
  }).length;
}

export function buildPrivacyDashboardViewModel(input: {
  appSettings: unknown[];
  privacySettings: unknown[];
  readErrors: string[];
}): PrivacyDashboardViewModel {
  const appSettingsCount = countRows(input.appSettings);
  const privacySettingsCount = countRows(input.privacySettings);
  const readErrors = safeErrors(input.readErrors);

  const privateModeMatches = countMatching(
    input.privacySettings,
    ["key", "setting_key", "name", "label", "description", "category"],
    ["private", "do_not_remember", "do not remember"],
  );

  const exportMatches = countMatching(
    input.privacySettings,
    ["key", "setting_key", "name", "label", "description", "category"],
    ["export", "scope"],
  );

  const retentionMatches = countMatching(
    input.privacySettings,
    ["key", "setting_key", "name", "label", "description", "category"],
    ["retention", "expire", "expiration"],
  );

  return {
    phase: "20Y",
    route: "/privacy",
    mode: "read_only",
    title: "Privacy Command Center",
    subtitle:
      "Read-only control surface for memory, private mode, sensitive locks, export scope, destructive action boundaries, audit visibility, Spotify connector trust, and deferred connectors.",
    appSettingsCount,
    privacySettingsCount,
    readErrors,
    sourceMap: {
      appSettings: "listAppSettings",
      privacySettings: "listPrivacySettings",
      dashboardSummary: "getSettingsPrivacyDashboardDataSummary",
    },
    tiles: [
      {
        id: "privacy-settings",
        label: "Privacy settings",
        value: privacySettingsCount,
        description: "SQL-backed privacy setting records returned for the current user.",
        tone: readErrors.length > 0 ? "warning" : "success",
      },
      {
        id: "app-settings",
        label: "App settings",
        value: appSettingsCount,
        description: "SQL-backed app setting records returned for the current user.",
        tone: readErrors.length > 0 ? "warning" : "info",
      },
      {
        id: "private-mode",
        label: "Private mode signals",
        value: privateModeMatches,
        description: "Detected private-mode or do-not-remember setting rows in the current read batch.",
        tone: privateModeMatches > 0 ? "success" : "neutral",
      },
      {
        id: "export-retention",
        label: "Export or retention signals",
        value: exportMatches + retentionMatches,
        description: "Detected export, scope, retention, or expiration setting rows in the current read batch.",
        tone: exportMatches + retentionMatches > 0 ? "info" : "neutral",
      },
    ],
    memoryCards: [
      {
        id: "memory-inbox",
        title: "Memory Inbox",
        eyebrow: "Memory control",
        description: "Memory candidates remain review-first. Nothing becomes approved memory from this page.",
        status: "Review required",
        tone: "warning",
        bullets: [
          "Candidate approval is not performed here.",
          "Do-not-remember and Private Mode boundaries stay active.",
          "Spotify and health/body data cannot become memory by default.",
        ],
        badges: ["Memory Review Required", "Read Only", "Carnos Restricted"],
      },
      {
        id: "saved-memories",
        title: "Saved Memories",
        eyebrow: "Memory visibility",
        description: "Approved memory visibility remains controlled by memory read-layer and privacy rules.",
        status: "Read boundary",
        tone: "info",
        bullets: [
          "The dashboard does not expose hidden memory payloads.",
          "Forget and destructive action flows remain review-first.",
          "Retention and audit boundaries remain separate from display.",
        ],
        badges: ["Visibility Boundary", "Token Hidden", "Audit Linked"],
      },
      {
        id: "forget",
        title: "Forget",
        eyebrow: "Memory removal",
        description: "Forget actions remain proposal/review-first and do not run from this read-only dashboard.",
        status: "Deferred action",
        tone: "warning",
        bullets: [
          "Forget requests require explicit confirmation.",
          "Derived records and manifests require separate safety checks.",
          "Carnos cannot forget data silently.",
        ],
        badges: ["Two Step Required", "Cooldown Boundary", "No Silent Carnos"],
      },
    ],
    privacyControlCards: [
      {
        id: "private-mode",
        title: "Private Mode",
        eyebrow: "Session privacy",
        description: "Private Mode is represented as a boundary status. Runtime toggles remain outside this read-only integration.",
        status: "Boundary visible",
        tone: "success",
        bullets: [
          "Blocks memory creation by default.",
          "Blocks connector data entering Carnos context by default.",
          "Blocks Spotify media summaries when active.",
        ],
        badges: ["Private Mode", "Do Not Remember", "Read Only"],
      },
      {
        id: "emergency-lockdown",
        title: "Emergency Lockdown",
        eyebrow: "Maximum privacy",
        description: "Emergency Lockdown blocks connector actions, broad summaries, and sensitive data exposure.",
        status: "Boundary visible",
        tone: "danger",
        bullets: [
          "Blocks Spotify actions.",
          "Blocks scope expansion.",
          "Blocks broad health/body summaries.",
        ],
        badges: ["Emergency Lockdown", "Connector Blocked", "Carnos Restricted"],
      },
      {
        id: "export",
        title: "Export",
        eyebrow: "Data portability",
        description: "Exports require explicit data scope selection and expiration boundaries.",
        status: "Explicit scope required",
        tone: "info",
        bullets: [
          "Spotify token values are never exportable.",
          "Listening history is explicit-scope-only.",
          "Deferred connector data is not exportable because it does not exist.",
        ],
        badges: ["Explicit Export Scope", "Expiration Boundary", "Token Hidden"],
      },
      {
        id: "destructive-action",
        title: "Destructive Action",
        eyebrow: "High-risk control",
        description: "Destructive actions remain manifest-based, confirmation-first, and cooldown-protected.",
        status: "Manifest required",
        tone: "danger",
        bullets: [
          "No destructive action runs from this page.",
          "Two-step confirmation and cooldown boundaries remain required.",
          "Audit trail must remain append-only.",
        ],
        badges: ["Manifest Required", "Two Step Required", "Audit Required"],
      },
      {
        id: "sensitive-locks",
        title: "Sensitive Locks",
        eyebrow: "Domain privacy",
        description: "Sensitive domains such as health, body, finance, documents, and appearance-related records stay protected.",
        status: "Domain locks active",
        tone: "warning",
        bullets: [
          "Health/body records stay private by default.",
          "Manual workout records remain manual-source records.",
          "Carnos cannot infer medical conditions from workout logs.",
        ],
        badges: ["Health Sensitive", "Manual Source", "Carnos Restricted"],
      },
    ],
    connectorCards: [
      {
        id: "spotify-connector",
        title: "Spotify Connector",
        eyebrow: "Connector trust",
        description: "Spotify is the active Phase 20 connector boundary. Real account connection, OAuth/token storage, provider calls, media reads, and Spotify actions are explicitly runtime-enabled runtime work.",
        status: "Boundary only",
        tone: "info",
        bullets: [
          "OAuth/PKCE callback rules are locked.",
          "Access and refresh token values stay hidden.",
          "Playback and playlist actions require review before future execution.",
        ],
        badges: ["Spotify Boundary", "Token Hidden", "Action Review Required", "Runtime Available"],
      },
      {
        id: "media-permissions",
        title: "Media Permissions",
        eyebrow: "Spotify media",
        description: "Playback, playlist, device, recently played, and top-item data are separated by sensitivity.",
        status: "Permission groups locked",
        tone: "warning",
        bullets: [
          "Listening history is high sensitivity.",
          "Playback control requires user approval.",
          "Carnos cannot control playback silently.",
        ],
        badges: ["High Sensitivity", "No Silent Carnos", "Explicit Scope"],
      },
      {
        id: "manual-workout",
        title: "Manual Workout Logging",
        eyebrow: "Health/body stance",
        description: "Manual workout logging remains the active health/body stance. Automatic wearable import is not assumed.",
        status: "Manual-first",
        tone: "success",
        bullets: [
          "Manual entries are user-entered records.",
          "Garmin and health/wearable connectors are deferred.",
          "Imported workout data is not available yet.",
        ],
        badges: ["Manual Logging Active", "Connector Deferred", "Imported Data Not Available"],
      },
      {
        id: "deferred-connectors",
        title: "Deferred Connectors",
        eyebrow: "Future integrations",
        description: "Garmin, Apple Health, Google Fit, Fitbit, Oura, Whoop, and Strava are deferred. Echo/Alexa is excluded from Phase 20.",
        status: "Deferred or excluded",
        tone: "neutral",
        bullets: [
          "Future connectors require source-of-truth update.",
          "Future connectors require provider and schema review.",
          "Echo/Alexa requires separate voice/home privacy planning.",
        ],
        badges: ["Garmin Deferred", "Echo Alexa Excluded", "Schema Required For Runtime"],
      },
    ],
    auditCards: [
      {
        id: "audit-viewer",
        title: "Audit Viewer",
        eyebrow: "Transparency",
        description: "Audit viewing remains redacted, append-only, and token-safe.",
        status: "Redacted view",
        tone: "info",
        bullets: [
          "Audit cards must not show token values.",
          "Raw OAuth payloads stay hidden.",
          "Connector audit cards show safe summaries only.",
        ],
        badges: ["Audit Redacted", "Append Only", "Token Hidden"],
      },
      {
        id: "carnos-access",
        title: "Carnos Access Matrix",
        eyebrow: "AI boundary",
        description: "Carnos receives only allowed, redacted privacy summaries from this dashboard.",
        status: "Restricted",
        tone: "warning",
        bullets: [
          "Carnos cannot approve actions.",
          "Carnos cannot bypass Private Mode.",
          "Carnos cannot treat connection as blanket consent.",
        ],
        badges: ["Carnos Restricted", "No Silent Action", "Consent Boundary"],
      },
    ],
    runtimeGuards: [
      "No database writes from /privacy.",
      "No Spotify provider calls from /privacy.",
      "No OAuth start or callback is added by 20Y.",
      "No token value is displayed.",
      "No destructive action executes from /privacy.",
      "No export manifest is generated from /privacy.",
      "No Carnos runtime action executes from /privacy.",
      "No deferred connector is represented as connected.",
    ],
  };
}


export const spotifyConnectorRuntime = {
  provider: "Spotify",
  status: "runtime-enabled",
  connectPath: "/api/connectors/spotify/auth",
  callbackPath: "/api/connectors/spotify/callback",
  statusPath: "/api/connectors/spotify/status",
  refreshPath: "/api/connectors/spotify/refresh",
  revokePath: "/api/connectors/spotify/revoke",
  boundary:
    "Spotify account connection is user-triggered OAuth. No background sync, playlist mutation, playback control, or autonomous Carnos write is enabled in v1.",
} as const;
