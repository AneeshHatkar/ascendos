import {
  listAppSettings,
  listPrivacySettings,
  type AppSettingRow,
  type PrivacySettingRow,
} from "@/lib/repositories";

export interface SettingsPrivacyDashboardSummary {
  app_setting_count: number;
  privacy_setting_count: number;
  locked_privacy_count: number;
  sensitive_privacy_count: number;
  denied_or_revoked_consent_count: number;
  redaction_enabled_count: number;
}

export interface SettingsPrivacyDashboardDataResult {
  summary: SettingsPrivacyDashboardSummary;
  source_tables: string[];
  read_only_boundary: true;
  deferred_scope: string[];
  generated_at: string;
}

function countPrivacyLevel(rows: PrivacySettingRow[], level: string): number {
  return rows.filter((row) => row.privacy_level === level).length;
}

function countDeniedOrRevoked(rows: PrivacySettingRow[]): number {
  return rows.filter((row) =>
    ["denied", "revoked"].includes(row.consent_state),
  ).length;
}

export function summarizeSettingsPrivacyRows(
  appSettings: AppSettingRow[],
  privacySettings: PrivacySettingRow[],
): SettingsPrivacyDashboardDataResult {
  return {
    generated_at: new Date().toISOString(),
    source_tables: ["app_settings", "privacy_settings"],
    read_only_boundary: true,
    deferred_scope: [
      "export/delete flows remain Phase 19",
      "private mode remains Phase 19",
      "memory/RAG controls remain Phase 15",
      "voice controls remain Phase 14",
      "web-search controls remain Phase 16",
      "analytics controls remain Phase 17",
      "Carnos display-name rename remains final polish",
    ],
    summary: {
      app_setting_count: appSettings.length,
      privacy_setting_count: privacySettings.length,
      locked_privacy_count: countPrivacyLevel(privacySettings, "locked"),
      sensitive_privacy_count: countPrivacyLevel(privacySettings, "sensitive"),
      denied_or_revoked_consent_count: countDeniedOrRevoked(privacySettings),
      redaction_enabled_count: privacySettings.filter((row) => row.redaction_enabled).length,
    },
  };
}

export async function getSettingsPrivacyDashboardDataSummary(
  userId: string,
): Promise<SettingsPrivacyDashboardDataResult> {
  const [appSettings, privacySettings] = await Promise.all([
    listAppSettings(userId, { limit: 100 }),
    listPrivacySettings(userId, { limit: 100 }),
  ]);

  return summarizeSettingsPrivacyRows(
    appSettings.data ?? [],
    privacySettings.data ?? [],
  );
}
