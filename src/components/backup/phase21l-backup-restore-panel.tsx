"use client";

import { useMemo, useRef, useState } from "react";

type BackupCategory =
  | "profile"
  | "settings"
  | "privacy"
  | "memory_metadata"
  | "actions_metadata"
  | "connectors_metadata"
  | "offline_queue_metadata"
  | "audit_metadata";

type BackupDestination = "mac_download" | "drive_manual_upload" | "external_drive_manual_copy";

type BackupState =
  | { status: "idle"; message: string }
  | { status: "working"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type BackupBundle = {
  bundle_version: "phase_21l_preview_v1";
  created_at: string;
  app: "ascendOS";
  assistant_display_name: "Athena";
  source_of_truth: "supabase_postgres";
  backup_kind: "user_controlled_preview_bundle";
  destination: BackupDestination;
  categories: BackupCategory[];
  redaction_enabled: boolean;
  include_restore_preview: boolean;
  contains_actual_records: false;
  contains_provider_keys: false;
  contains_oauth_tokens: false;
  contains_env_values: false;
  contains_service_role_keys: false;
  contains_browser_secrets: false;
  automatic_restore_enabled: false;
  automatic_drive_sync_enabled: false;
  metadata: {
    user_action_required: true;
    suggested_filename: string;
    integrity_algorithm: "SHA-256";
    expires_after_days: number;
    generated_by: "phase_21l_backup_restore_panel";
    notes: string[];
  };
  manifest: Array<{
    category: BackupCategory;
    label: string;
    included: boolean;
    redaction: "required" | "metadata_only" | "not_selected";
    restore_mode: "preview_only";
    conflict_policy: "do_not_overwrite" | "manual_compare_required";
  }>;
  restore_preview: {
    allowed: false;
    mode: "preview_only";
    reasons: string[];
    conflict_checks_required: string[];
  };
};

type RestorePreview = {
  parsed: boolean;
  accepted_format: boolean;
  bundle_version?: string;
  categories?: unknown;
  integrity_present: boolean;
  restore_executed: false;
  destructive_changes_executed: false;
  secrets_detected: boolean;
  warnings: string[];
  next_steps: string[];
};

const CATEGORIES: Array<{
  id: BackupCategory;
  label: string;
  description: string;
  redaction: "required" | "metadata_only";
}> = [
  {
    id: "profile",
    label: "Profile metadata",
    description: "Display profile metadata only. No auth secrets or private provider state.",
    redaction: "required",
  },
  {
    id: "settings",
    label: "Settings metadata",
    description: "App/Athena setting keys and safe preference metadata.",
    redaction: "required",
  },
  {
    id: "privacy",
    label: "Privacy controls",
    description: "Consent, lock, retention, and redaction configuration metadata.",
    redaction: "required",
  },
  {
    id: "memory_metadata",
    label: "Memory metadata",
    description: "Approved-memory IDs/status/source labels only in this preview. No private memory body export.",
    redaction: "required",
  },
  {
    id: "actions_metadata",
    label: "Action metadata",
    description: "Pending/approved/rejected action metadata, not full private payloads.",
    redaction: "required",
  },
  {
    id: "connectors_metadata",
    label: "Connectors metadata",
    description: "Connector status and provider names only. No OAuth tokens, refresh tokens, or client secrets.",
    redaction: "required",
  },
  {
    id: "offline_queue_metadata",
    label: "Offline queue metadata",
    description: "Local queue counts/statuses only. No raw queued private payload export.",
    redaction: "metadata_only",
  },
  {
    id: "audit_metadata",
    label: "Audit metadata",
    description: "Redacted audit event categories and timestamps only.",
    redaction: "required",
  },
];

const SECRET_SIGNALS = [
  "sk-",
  "api_key",
  "apikey",
  "openai_api_key",
  "access_token",
  "refresh_token",
  "client_secret",
  "service_role",
  "authorization",
  "bearer ",
  "spotify_client_secret",
  "supabase_service_role",
  "password",
  "oauth",
];

function stateClass(status: BackupState["status"]) {
  if (status === "error") return "border-red-400/20 bg-red-400/10 text-red-100";
  if (status === "success") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  if (status === "working") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-100";

  return "border-white/10 bg-white/[0.04] text-slate-300";
}

function destinationLabel(destination: BackupDestination) {
  if (destination === "drive_manual_upload") return "Google Drive manual upload";
  if (destination === "external_drive_manual_copy") return "External drive manual copy";

  return "Mac download";
}

function buildFilename() {
  const stamp = new Date().toISOString().replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
  return `ascendOS-backup-preview-${stamp}.json`;
}

function selectedToggle<T extends string>(selected: readonly T[], value: T) {
  if (selected.includes(value)) {
    return selected.filter((item) => item !== value);
  }

  return [...selected, value];
}

async function sha256Hex(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function detectSecretSignals(value: string) {
  const lowered = value.toLowerCase();

  return SECRET_SIGNALS.filter((signal) => lowered.includes(signal));
}

function buildBundle(input: {
  categories: BackupCategory[];
  destination: BackupDestination;
  redactionEnabled: boolean;
  includeRestorePreview: boolean;
}): BackupBundle {
  const filename = buildFilename();

  return {
    bundle_version: "phase_21l_preview_v1",
    created_at: new Date().toISOString(),
    app: "ascendOS",
    assistant_display_name: "Athena",
    source_of_truth: "supabase_postgres",
    backup_kind: "user_controlled_preview_bundle",
    destination: input.destination,
    categories: input.categories,
    redaction_enabled: input.redactionEnabled,
    include_restore_preview: input.includeRestorePreview,
    contains_actual_records: false,
    contains_provider_keys: false,
    contains_oauth_tokens: false,
    contains_env_values: false,
    contains_service_role_keys: false,
    contains_browser_secrets: false,
    automatic_restore_enabled: false,
    automatic_drive_sync_enabled: false,
    metadata: {
      user_action_required: true,
      suggested_filename: filename,
      integrity_algorithm: "SHA-256",
      expires_after_days: 7,
      generated_by: "phase_21l_backup_restore_panel",
      notes: [
        "This is a preview bundle generated in the browser.",
        "It does not read Supabase/Postgres records.",
        "It does not include provider keys, OAuth tokens, env values, service-role keys, or browser secrets.",
        "Mac/Drive backup is user-controlled download/copy only.",
        "Restore is preview-only and cannot overwrite source-of-truth data.",
      ],
    },
    manifest: CATEGORIES.map((category) => ({
      category: category.id,
      label: category.label,
      included: input.categories.includes(category.id),
      redaction: input.categories.includes(category.id)
        ? input.redactionEnabled
          ? category.redaction
          : "metadata_only"
        : "not_selected",
      restore_mode: "preview_only",
      conflict_policy:
        category.id === "connectors_metadata" || category.id === "memory_metadata"
          ? "manual_compare_required"
          : "do_not_overwrite",
    })),
    restore_preview: {
      allowed: false,
      mode: "preview_only",
      reasons: [
        "Phase 21L does not run restore mutations.",
        "Restore must compare against Supabase/Postgres before any future write.",
        "Secrets/tokens/env values are blocked from backup and restore.",
        "User confirmation and conflict review are required before future restore implementation.",
      ],
      conflict_checks_required: [
        "record identity match",
        "owner/user match",
        "source-of-truth freshness",
        "private/sensitive lock check",
        "connector token exclusion check",
        "duplicate/overwrite risk",
        "audit event requirement",
      ],
    },
  };
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.click();

  URL.revokeObjectURL(url);
}

function parseRestorePreview(text: string): RestorePreview {
  const warnings: string[] = [];
  const nextSteps: string[] = [
    "Review bundle metadata.",
    "Confirm no secrets/tokens/env values are present.",
    "Compare categories manually against current Supabase/Postgres state.",
    "Do not overwrite records from this preview.",
  ];

  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      parsed: false,
      accepted_format: false,
      integrity_present: false,
      restore_executed: false,
      destructive_changes_executed: false,
      secrets_detected: detectSecretSignals(text).length > 0,
      warnings: ["File is not valid JSON."],
      next_steps: ["Choose a valid ascendOS backup preview JSON file."],
    };
  }

  const object = parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  const secretSignals = detectSecretSignals(text);
  const acceptedFormat = object.bundle_version === "phase_21l_preview_v1";
  const categories = object.categories;

  if (!acceptedFormat) {
    warnings.push("Bundle version is missing or unsupported.");
  }

  if (secretSignals.length > 0) {
    warnings.push(`Potential secret/token signals detected: ${secretSignals.join(", ")}`);
  }

  if (object.source_of_truth !== "supabase_postgres") {
    warnings.push("Source-of-truth marker is missing or not Supabase/Postgres.");
  }

  if (object.automatic_restore_enabled !== false) {
    warnings.push("automatic_restore_enabled must be false.");
  }

  return {
    parsed: true,
    accepted_format: acceptedFormat,
    bundle_version: typeof object.bundle_version === "string" ? object.bundle_version : undefined,
    categories,
    integrity_present:
      typeof object.integrity_sha256 === "string" ||
      typeof object.integrity === "string",
    restore_executed: false,
    destructive_changes_executed: false,
    secrets_detected: secretSignals.length > 0,
    warnings:
      warnings.length > 0
        ? warnings
        : ["Restore preview is readable. No restore or destructive change was executed."],
    next_steps: acceptedFormat ? nextSteps : ["Use a supported Phase 21L backup preview bundle."],
  };
}

export function Phase21LBackupRestorePanel() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<BackupState>({
    status: "idle",
    message:
      "Backup preview is ready. Downloads are user-controlled and restore remains preview-only.",
  });
  const [selectedCategories, setSelectedCategories] = useState<BackupCategory[]>([
    "profile",
    "settings",
    "privacy",
    "audit_metadata",
  ]);
  const [destination, setDestination] = useState<BackupDestination>("mac_download");
  const [redactionEnabled, setRedactionEnabled] = useState(true);
  const [includeRestorePreview, setIncludeRestorePreview] = useState(true);
  const [bundlePreview, setBundlePreview] = useState("");
  const [integrity, setIntegrity] = useState("");
  const [restorePreview, setRestorePreview] = useState("");

  const bundle = useMemo(
    () =>
      buildBundle({
        categories: selectedCategories,
        destination,
        redactionEnabled,
        includeRestorePreview,
      }),
    [selectedCategories, destination, redactionEnabled, includeRestorePreview],
  );

  async function generateBundlePreview() {
    setState({
      status: "working",
      message: "Generating backup preview bundle and integrity digest…",
    });

    try {
      const text = JSON.stringify(bundle, null, 2);
      const digest = await sha256Hex(text);
      const withIntegrity = {
        ...bundle,
        integrity_sha256: digest,
      };
      const finalText = JSON.stringify(withIntegrity, null, 2);

      setBundlePreview(finalText);
      setIntegrity(digest);
      setState({
        status: "success",
        message:
          "Backup preview generated. It contains metadata only and no secrets/tokens/env values.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Could not generate backup preview.",
      });
    }
  }

  async function downloadBundle() {
    const text = bundlePreview || JSON.stringify(bundle, null, 2);
    const digest = await sha256Hex(text);
    const filename = bundle.metadata.suggested_filename;

    downloadText(filename, text);
    setIntegrity(digest);
    setState({
      status: "success",
      message:
        "Backup preview downloaded. Manually copy it to Mac folder, Google Drive, or external drive if desired.",
    });
  }

  async function handleRestoreFile(file: File | undefined) {
    if (!file) return;

    setState({
      status: "working",
      message: "Reading backup file for restore preview only…",
    });

    const text = await file.text();
    const preview = parseRestorePreview(text);
    const digest = await sha256Hex(text);

    setRestorePreview(JSON.stringify({ ...preview, file_sha256: digest }, null, 2));
    setState({
      status: preview.secrets_detected || !preview.accepted_format ? "error" : "success",
      message: preview.secrets_detected
        ? "Restore preview found possible secret/token signals. Restore remains blocked."
        : "Restore preview complete. No data was restored or overwritten.",
    });
  }

  return (
    <section className="rounded-[2rem] border border-indigo-300/20 bg-indigo-950/15 p-6 shadow-2xl shadow-indigo-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200/70">
            Phase 21L
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Mac / Drive backup and restore preview
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            Create a user-controlled metadata backup preview for Mac download, manual
            Google Drive upload, or external-drive copy. Restore remains preview-only
            and cannot overwrite Supabase/Postgres.
          </p>
        </div>

        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-100">
          secrets excluded
        </span>
      </div>

      <div className={`mt-5 rounded-2xl border p-4 text-sm leading-6 ${stateClass(state.status)}`}>
        {state.message}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">Backup bundle categories</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            This preview exports metadata only. A future real export can use these categories,
            but must still redact secrets and require confirmation.
          </p>

          <div className="mt-4 grid gap-3">
            {CATEGORIES.map((category) => (
              <label
                key={category.id}
                className="flex cursor-pointer gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() =>
                    setSelectedCategories((current) =>
                      selectedToggle(current, category.id),
                    )
                  }
                  className="mt-1"
                />
                <span>
                  <span className="text-sm font-semibold text-white">{category.label}</span>
                  <span className="ml-2 rounded-full border border-indigo-300/20 bg-indigo-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-indigo-100">
                    {category.redaction.replaceAll("_", " ")}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-400">
                    {category.description}
                  </span>
                </span>
              </label>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="block text-xs text-slate-400">
              Backup destination
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value as BackupDestination)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
              >
                <option value="mac_download">Mac download</option>
                <option value="drive_manual_upload">Google Drive manual upload</option>
                <option value="external_drive_manual_copy">External drive manual copy</option>
              </select>
            </label>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-slate-400">
              Destination: {destinationLabel(destination)}. No automatic Drive sync is enabled.
            </div>
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
                checked={includeRestorePreview}
                onChange={(event) => setIncludeRestorePreview(event.target.checked)}
              />
              Include restore-preview manifest
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void generateBundlePreview()}
              className="rounded-full border border-indigo-300/40 bg-indigo-300/10 px-4 py-2 text-sm font-semibold text-indigo-100 hover:bg-indigo-300/20"
            >
              Generate backup preview
            </button>
            <button
              type="button"
              onClick={() => void downloadBundle()}
              className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/20"
            >
              Download preview JSON
            </button>
          </div>

          {integrity ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950 p-3 text-xs leading-5 text-slate-400">
              SHA-256: <span className="break-all text-slate-200">{integrity}</span>
            </div>
          ) : null}

          {bundlePreview ? (
            <pre className="mt-4 max-h-96 overflow-auto rounded-2xl border border-white/10 bg-slate-950 p-4 text-xs leading-5 text-slate-300">
              {bundlePreview}
            </pre>
          ) : null}
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">Restore preview</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Upload a backup JSON to inspect format, integrity, conflicts, and secret risk.
            This cannot restore, overwrite, delete, or mutate records.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(event) => void handleRestoreFile(event.target.files?.[0])}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/20"
          >
            Choose backup JSON
          </button>

          {restorePreview ? (
            <pre className="mt-4 max-h-96 overflow-auto rounded-2xl border border-white/10 bg-slate-950 p-4 text-xs leading-5 text-slate-300">
              {restorePreview}
            </pre>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
              No restore preview loaded yet.
            </p>
          )}

          <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-4 text-xs leading-5 text-amber-100/85">
            Restore boundary: Phase 21L only reads a local JSON file in the browser and
            produces a preview. It does not call Supabase, does not write SQL, does not
            restore connector tokens, and does not overwrite source-of-truth records.
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-red-300/15 bg-red-950/15 p-5">
        <p className="text-sm font-semibold text-red-100">Never included in backup</p>
        <div className="mt-3 grid gap-3 text-xs leading-5 text-red-100/80 md:grid-cols-3">
          {[
            "OpenAI API keys",
            "Spotify access or refresh tokens",
            "OAuth client secrets",
            "Supabase service-role keys",
            ".env / .env.local values",
            "Browser secrets or passwords",
            "Raw private memory bodies in preview mode",
            "Automatic restore permissions",
            "Automatic Google Drive sync",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-red-300/10 bg-black/20 p-3">
              {item}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
