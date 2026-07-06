"use client";

import { useMemo, useState } from "react";

type PanelSurface = "settings" | "privacy";

type PanelState =
  | { status: "idle"; message: string }
  | { status: "working"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type ExportCategory =
  | "profile"
  | "settings"
  | "privacy"
  | "chat"
  | "memory"
  | "actions"
  | "connectors"
  | "audit";

type DestructiveAction = "forget_memory" | "delete_chat_history" | "revoke_connectors";

type SpotifyStatusResponse = {
  ok?: boolean;
  enabled?: boolean;
  connected?: boolean;
  status?: string;
  connection?: {
    status?: string;
    spotifyUserId?: string | null;
    displayName?: string | null;
    email?: string | null;
    product?: string | null;
    country?: string | null;
    scope?: string | null;
    expiresAt?: string | null;
  } | null;
  error?: string;
};

const EXPORT_CATEGORIES: Array<{
  id: ExportCategory;
  label: string;
  description: string;
  sensitivity: "low" | "medium" | "high";
}> = [
  {
    id: "profile",
    label: "Profile",
    description: "Display identity, timezone, onboarding, and account-safe profile fields.",
    sensitivity: "medium",
  },
  {
    id: "settings",
    label: "Settings",
    description: "App settings and Athena/provider preference metadata.",
    sensitivity: "medium",
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Privacy settings, consent states, locks, redaction preferences, and retention metadata.",
    sensitivity: "high",
  },
  {
    id: "chat",
    label: "Chat history",
    description: "Athena chat sessions/messages. Long-term memory remains separate.",
    sensitivity: "high",
  },
  {
    id: "memory",
    label: "Approved memory",
    description: "Approved memory, review status, source, sensitivity, and usage transparency.",
    sensitivity: "high",
  },
  {
    id: "actions",
    label: "Pending/proposed actions",
    description: "Pending, approved, rejected, and executed action metadata.",
    sensitivity: "medium",
  },
  {
    id: "connectors",
    label: "Connectors",
    description: "Connector status metadata only. Provider secret values are never exported to the browser.",
    sensitivity: "high",
  },
  {
    id: "audit",
    label: "Audit trail",
    description: "Redacted audit events and trust history.",
    sensitivity: "high",
  },
];

const SETTINGS_CARDS = [
  {
    title: "Athena provider",
    status: "server-side only",
    details:
      "OpenAI status is visible, but keys stay in server environment variables and are never shown here.",
  },
  {
    title: "Voice",
    status: "noop / disabled unless configured",
    details:
      "STT/TTS settings disclose whether voice is available. No always-listening or hidden recording.",
  },
  {
    title: "Current-info",
    status: "honest disabled/noop",
    details:
      "Freshness is shown as unavailable unless source-backed provider evidence exists.",
  },
  {
    title: "Storage",
    status: "no browser secrets",
    details:
      "Settings must not store provider keys, OAuth tokens, memory payloads, or private records in localStorage/IndexedDB.",
  },
];

function statusClass(status: PanelState["status"]) {
  if (status === "error") return "border-red-400/20 bg-red-400/10 text-red-100";
  if (status === "success") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  if (status === "working") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-100";

  return "border-white/10 bg-white/[0.04] text-slate-300";
}

function sensitivityClass(sensitivity: "low" | "medium" | "high") {
  if (sensitivity === "high") return "border-rose-300/20 bg-rose-300/10 text-rose-100";
  if (sensitivity === "medium") return "border-amber-300/20 bg-amber-300/10 text-amber-100";

  return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
}

function formatDate(value: string | null | undefined) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function buildExportManifest(input: {
  selected: readonly ExportCategory[];
  redaction: boolean;
  includeHistory: boolean;
}) {
  return {
    manifest_version: "phase_21j_preview_v1",
    generated_at: new Date().toISOString(),
    download_created: false,
    server_export_performed: false,
    browser_secret_exported: false,
    categories: input.selected,
    redaction_enabled: input.redaction,
    include_history: input.includeHistory,
    metadata: {
      purpose:
        "Preview the export scope before a later server-owned export job exists.",
      privacy_boundary:
        "This preview does not read/export records, generate files, expose tokens, or bypass consent.",
      confirmation_required_before_real_export: true,
      expires_after_real_export: "future server export manifests must expire",
    },
    redaction_policy: input.redaction
      ? "Sensitive values, tokens, secrets, private notes, restricted memories, and connector credentials must be redacted."
      : "Redaction disabled in preview only; real exports must still block provider secrets and OAuth tokens.",
  };
}

function selectedToggle(
  selected: readonly ExportCategory[],
  category: ExportCategory,
) {
  if (selected.includes(category)) {
    return selected.filter((item) => item !== category);
  }

  return [...selected, category];
}

export function Phase21JTrustSettingsPanel({
  surface = "privacy",
}: {
  surface?: PanelSurface;
}) {
  const [state, setState] = useState<PanelState>({
    status: "idle",
    message:
      "Trust controls are visible. Export/delete/connector actions remain confirmation-gated and secrets are never exposed.",
  });
  const [selectedExportCategories, setSelectedExportCategories] = useState<ExportCategory[]>([
    "profile",
    "settings",
    "privacy",
    "audit",
  ]);
  const [redactionEnabled, setRedactionEnabled] = useState(true);
  const [includeHistory, setIncludeHistory] = useState(false);
  const [manifestPreview, setManifestPreview] = useState("");
  const [destructiveAction, setDestructiveAction] =
    useState<DestructiveAction>("forget_memory");
  const [confirmationText, setConfirmationText] = useState("");
  const [destructivePreview, setDestructivePreview] = useState("");
  const [spotifyStatus, setSpotifyStatus] = useState<SpotifyStatusResponse | null>(null);

  const exportManifest = useMemo(
    () =>
      buildExportManifest({
        selected: selectedExportCategories,
        redaction: redactionEnabled,
        includeHistory,
      }),
    [selectedExportCategories, redactionEnabled, includeHistory],
  );

  function previewExport() {
    setManifestPreview(JSON.stringify(exportManifest, null, 2));
    setState({
      status: "success",
      message:
        "Export manifest preview created. No file was generated and no records or secrets were exported.",
    });
  }

  function previewDestructiveAction() {
    if (confirmationText !== "I UNDERSTAND") {
      setState({
        status: "error",
        message:
          'Type "I UNDERSTAND" to preview the destructive-action boundary. This still will not delete anything.',
      });
      return;
    }

    const preview = {
      action: destructiveAction,
      confirmation_text_matched: true,
      destructive_action_executed: false,
      cooldown_required_before_real_execution: true,
      second_confirmation_required: true,
      server_action_required: true,
      audit_event_required: true,
      export_recommended_before_delete: true,
      notes:
        "Phase 21J shows the destructive-action trust boundary only. It does not delete, forget, revoke, or mutate data from this preview.",
    };

    setDestructivePreview(JSON.stringify(preview, null, 2));
    setState({
      status: "success",
      message:
        "Destructive-action preview created. No data was changed, deleted, forgotten, or revoked.",
    });
  }

  async function refreshSpotifyStatus() {
    setState({
      status: "working",
      message: "Reading Spotify connector status through the server boundary…",
    });

    try {
      const response = await fetch("/api/connectors/spotify/status", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const payload = (await response.json()) as SpotifyStatusResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? "Spotify status read failed.");
      }

      setSpotifyStatus(payload);
      setState({
        status: "success",
        message:
          "Spotify status refreshed. No token value was exposed to the browser.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Spotify status read failed.",
      });
    }
  }

  async function refreshSpotifyToken() {
    setState({
      status: "working",
      message:
        "Requesting Spotify refresh through the server boundary. Token values will not be returned here…",
    });

    try {
      const response = await fetch("/api/connectors/spotify/refresh", {
        method: "POST",
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Spotify refresh failed.");
      }

      setState({
        status: "success",
        message:
          "Spotify refresh request completed through the server boundary. Token values were not exposed.",
      });
      await refreshSpotifyStatus();
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Spotify refresh failed.",
      });
    }
  }

  async function revokeSpotify() {
    setState({
      status: "working",
      message:
        "Requesting Spotify revoke through the server boundary. This is the only live connector mutation in this panel.",
    });

    try {
      const response = await fetch("/api/connectors/spotify/revoke", {
        method: "POST",
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Spotify revoke failed.");
      }

      setState({
        status: "success",
        message:
          "Spotify connection revoked through the server boundary. No playback or playlist mutation occurred.",
      });
      await refreshSpotifyStatus();
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Spotify revoke failed.",
      });
    }
  }

  const surfaceTitle =
    surface === "settings"
      ? "Phase 21J settings trust center"
      : "Phase 21J privacy/export/connectors trust center";

  return (
    <section className="rounded-[2rem] border border-cyan-300/20 bg-cyan-950/15 p-6 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            Phase 21J
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {surfaceTitle}
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            Settings, privacy, export, delete, connectors, Spotify, and Athena
            access are now collected into one trust surface. Real destructive
            actions remain explicit and confirmation-gated.
          </p>
        </div>

        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-100">
          no browser secrets
        </span>
      </div>

      <div className={`mt-5 rounded-2xl border p-4 text-sm leading-6 ${statusClass(state.status)}`}>
        {state.message}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">Export scope preview</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Choose categories and redaction options. This creates a manifest preview only,
            not a downloadable export.
          </p>

          <div className="mt-4 grid gap-3">
            {EXPORT_CATEGORIES.map((category) => (
              <label
                key={category.id}
                className="flex cursor-pointer gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3"
              >
                <input
                  type="checkbox"
                  checked={selectedExportCategories.includes(category.id)}
                  onChange={() =>
                    setSelectedExportCategories((current) =>
                      selectedToggle(current, category.id),
                    )
                  }
                  className="mt-1"
                />
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{category.label}</span>
                    <span
                      className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.16em] ${sensitivityClass(category.sensitivity)}`}
                    >
                      {category.sensitivity}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-400">
                    {category.description}
                  </span>
                </span>
              </label>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
            <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
              <input
                type="checkbox"
                checked={redactionEnabled}
                onChange={(event) => setRedactionEnabled(event.target.checked)}
              />
              Redaction enabled
            </label>
            <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
              <input
                type="checkbox"
                checked={includeHistory}
                onChange={(event) => setIncludeHistory(event.target.checked)}
              />
              Include history metadata
            </label>
          </div>

          <button
            type="button"
            onClick={previewExport}
            className="mt-4 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/20"
          >
            Preview export manifest
          </button>

          {manifestPreview ? (
            <pre className="mt-4 max-h-80 overflow-auto rounded-2xl border border-white/10 bg-slate-950 p-4 text-xs leading-5 text-slate-300">
              {manifestPreview}
            </pre>
          ) : null}
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">Delete / forget boundary</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Preview the confirmation boundary before any future destructive action.
            This does not execute deletion.
          </p>

          <label className="mt-4 block text-xs text-slate-400">
            Destructive action type
            <select
              value={destructiveAction}
              onChange={(event) => setDestructiveAction(event.target.value as DestructiveAction)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
            >
              <option value="forget_memory">Forget memory topic</option>
              <option value="delete_chat_history">Delete chat history</option>
              <option value="revoke_connectors">Revoke connectors</option>
            </select>
          </label>

          <label className="mt-4 block text-xs text-slate-400">
            Type I UNDERSTAND
            <input
              value={confirmationText}
              onChange={(event) => setConfirmationText(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
              placeholder="I UNDERSTAND"
            />
          </label>

          <button
            type="button"
            onClick={previewDestructiveAction}
            className="mt-4 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-300/20"
          >
            Preview destructive boundary
          </button>

          {destructivePreview ? (
            <pre className="mt-4 max-h-80 overflow-auto rounded-2xl border border-white/10 bg-slate-950 p-4 text-xs leading-5 text-slate-300">
              {destructivePreview}
            </pre>
          ) : null}

          <div className="mt-4 rounded-2xl border border-red-300/15 bg-red-950/15 p-3 text-xs leading-5 text-red-100/80">
            Real deletion must require server execution, second confirmation, audit logging,
            export warning, and a clear cooldown/irreversibility explanation.
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">Spotify connector</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Status, connect, refresh, and revoke are routed through server endpoints.
            Playback and playlist mutation are not enabled.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void refreshSpotifyStatus()}
              className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/20"
            >
              Refresh status
            </button>

            <a
              href="/api/connectors/spotify/auth"
              className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/20"
            >
              Connect Spotify
            </a>

            <button
              type="button"
              onClick={() => void refreshSpotifyToken()}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 hover:bg-white/[0.08]"
            >
              Refresh token
            </button>

            <button
              type="button"
              onClick={() => void revokeSpotify()}
              className="rounded-full border border-red-300/40 bg-red-300/10 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-300/20"
            >
              Revoke
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-5 text-slate-300">
            {spotifyStatus ? (
              <>
                <p>Enabled: {String(spotifyStatus.enabled)}</p>
                <p>Connected: {String(spotifyStatus.connected)}</p>
                <p>Status: {spotifyStatus.status ?? spotifyStatus.connection?.status ?? "unknown"}</p>
                <p>Display: {spotifyStatus.connection?.displayName ?? "Not available"}</p>
                <p>Email visible: {spotifyStatus.connection?.email ? "yes" : "no"}</p>
                <p>Product: {spotifyStatus.connection?.product ?? "Not available"}</p>
                <p>Country: {spotifyStatus.connection?.country ?? "Not available"}</p>
                <p>Scope: {spotifyStatus.connection?.scope ?? "Not available"}</p>
                <p>Expires: {formatDate(spotifyStatus.connection?.expiresAt)}</p>
              </>
            ) : (
              <p>No Spotify status loaded yet. Use Refresh status.</p>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-3 text-xs leading-5 text-amber-100/80">
            Privacy note: this panel never displays access-token or refresh-token values.
            Spotify playback, playlist edits, likes, follows, and recommendations are not enabled.
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">Athena settings summary</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Feature states must be honest. Enabled labels require real configured server boundaries.
          </p>

          <div className="mt-4 grid gap-3">
            {SETTINGS_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{card.details}</p>
                  </div>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {card.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950 p-3 text-xs leading-5 text-slate-400">
            Settings finalization: profile/settings rows remain read-only unless a later
            validated server action explicitly enables editing. Provider and connector
            secrets stay server-side.
          </div>
        </section>
      </div>
    </section>
  );
}
