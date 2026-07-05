import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type {
  AppSettingRow,
  PrivacySettingRow,
} from "@/lib/repositories/settings-privacy-read";
import type { SettingsPrivacyDashboardDataResult } from "@/lib/dashboard";

interface SettingsPrivacyFoundationPanelProps {
  surface: "settings" | "privacy";
  data: SettingsPrivacyDashboardDataResult;
  appSettings: AppSettingRow[];
  privacySettings: PrivacySettingRow[];
  readErrors?: string[];
}

function toneForPrivacyLevel(
  value: string,
): "neutral" | "success" | "warning" | "danger" | "info" {
  if (value === "locked") return "danger";
  if (value === "sensitive") return "warning";
  if (value === "private") return "info";
  if (value === "normal") return "success";
  return "neutral";
}

function toneForStatus(
  value: string,
): "neutral" | "success" | "warning" | "danger" | "info" {
  if (["active", "granted"].includes(value)) return "success";
  if (["required", "not_requested"].includes(value)) return "warning";
  if (["denied", "revoked", "disabled"].includes(value)) return "danger";
  return "neutral";
}

function formatJsonSummary(value: Record<string, unknown>): string {
  const keys = Object.keys(value);
  if (keys.length === 0) {
    return "No structured value";
  }

  return keys.slice(0, 6).join(", ");
}

function AppSettingsList({ rows }: { rows: AppSettingRow[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title="No app settings yet."
        description="SQL-backed app setting records will appear here after confirmed settings exist. This surface is read-only."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {rows.slice(0, 10).map((row) => (
        <div key={row.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{row.setting_key}</p>
              <p className="mt-1 text-xs text-slate-500">
                Category: {row.category} · Value keys: {formatJsonSummary(row.setting_value)}
              </p>
              {row.description ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {row.description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill label={row.status} tone={toneForStatus(row.status)} />
              <StatusPill label={row.visibility} tone={toneForPrivacyLevel(row.visibility)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PrivacySettingsList({ rows }: { rows: PrivacySettingRow[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title="No privacy settings yet."
        description="SQL-backed privacy setting records will appear here after confirmed privacy preferences exist. Export/delete/private-mode flows remain deferred."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {rows.slice(0, 10).map((row) => (
        <div key={row.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{row.privacy_key}</p>
              <p className="mt-1 text-xs text-slate-500">
                Surface: {row.surface} · Scope: {row.data_scope} · Retention: {row.retention_policy}
              </p>
              {row.description ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {row.description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill label={row.privacy_level} tone={toneForPrivacyLevel(row.privacy_level)} />
              <StatusPill label={row.consent_state} tone={toneForStatus(row.consent_state)} />
              <StatusPill
                label={row.redaction_enabled ? "redaction on" : "redaction off"}
                tone={row.redaction_enabled ? "success" : "warning"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SettingsPrivacyFoundationPanel({
  surface,
  data,
  appSettings,
  privacySettings,
  readErrors = [],
}: SettingsPrivacyFoundationPanelProps) {
  const summary = data.summary;
  const isPrivacy = surface === "privacy";

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 13.5E Settings / Privacy Foundation
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          {isPrivacy ? "Privacy Control Foundation" : "Settings Control Foundation"}
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Read-only foundation for app settings and privacy settings. This layer
          displays confirmed SQL records only; it does not mutate preferences,
          export data, delete data, enable private mode, activate memory, rename
          Athena, start voice, search the web, or run analytics.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <MetricTile label="App settings" value={summary.app_setting_count} description="Records in app_settings." />
          <MetricTile label="Privacy settings" value={summary.privacy_setting_count} description="Records in privacy_settings." />
          <MetricTile label="Locked" value={summary.locked_privacy_count} description="Locked privacy records." />
          <MetricTile label="Sensitive" value={summary.sensitive_privacy_count} description="Sensitive privacy records." />
          <MetricTile label="Consent blocked" value={summary.denied_or_revoked_consent_count} description="Denied or revoked consent records." />
          <MetricTile label="Redaction on" value={summary.redaction_enabled_count} description="Records with redaction enabled." />
        </div>
      </section>

      {readErrors.length > 0 ? (
        <EmptyState
          title="Some settings or privacy records could not be read."
          description={readErrors.join(" · ")}
        />
      ) : null}

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="App settings"
          eyebrow="app_settings"
          description="Confirmed app preference records, categories, visibility, and status. Read-only in Phase 13.5E."
        >
          <AppSettingsList rows={appSettings} />
        </SectionCard>

        <SectionCard
          title="Privacy settings"
          eyebrow="privacy_settings"
          description="Confirmed privacy level, consent, data scope, redaction, and retention preferences. Read-only in Phase 13.5E."
        >
          <PrivacySettingsList rows={privacySettings} />
        </SectionCard>
      </section>

      <SectionCard
        title="Protected boundaries"
        eyebrow="deferred scope"
        description="This repair adds foundations only. High-risk controls remain intentionally unwired."
      >
        <div className="grid gap-3 text-sm leading-6 text-slate-400">
          {data.deferred_scope.map((item) => (
            <p key={item}>• {item}</p>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Source tables: {data.source_tables.join(", ")}
        </p>
      </SectionCard>
    </div>
  );
}
