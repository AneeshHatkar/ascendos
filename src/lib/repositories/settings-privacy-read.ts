import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SettingJson = Record<string, unknown>;

export interface AppSettingRow {
  id: string;
  user_id: string;
  setting_key: string;
  category: string;
  setting_value: SettingJson;
  visibility: string;
  status: string;
  description: string | null;
  metadata: SettingJson;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PrivacySettingRow {
  id: string;
  user_id: string;
  privacy_key: string;
  surface: string;
  privacy_level: string;
  consent_state: string;
  data_scope: string;
  redaction_enabled: boolean;
  retention_policy: string;
  description: string | null;
  metadata: SettingJson;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SettingsPrivacyReadResult<T> {
  data: T[];
  error: string | null;
}

type QueryResult = {
  data: unknown;
  error: { message?: string } | null;
};

type QueryBuilder = {
  select: (columns?: string) => QueryBuilder;
  eq: (column: string, value: string) => QueryBuilder;
  order: (
    column: string,
    options?: { ascending?: boolean; nullsFirst?: boolean },
  ) => QueryBuilder;
  limit: (count: number) => Promise<QueryResult>;
};

type ReadClient = {
  from: (table: string) => QueryBuilder;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readString(row: Record<string, unknown>, key: string): string {
  const value = row[key];
  return typeof value === "string" ? value : "";
}

function readNullableString(row: Record<string, unknown>, key: string): string | null {
  const value = row[key];
  return typeof value === "string" ? value : null;
}

function readBoolean(row: Record<string, unknown>, key: string, fallback: boolean): boolean {
  const value = row[key];
  return typeof value === "boolean" ? value : fallback;
}

function readJson(row: Record<string, unknown>, key: string): SettingJson {
  const value = row[key];
  return isRecord(value) ? value : {};
}

function toAppSettingRow(row: Record<string, unknown>): AppSettingRow {
  return {
    id: readString(row, "id"),
    user_id: readString(row, "user_id"),
    setting_key: readString(row, "setting_key"),
    category: readString(row, "category"),
    setting_value: readJson(row, "setting_value"),
    visibility: readString(row, "visibility"),
    status: readString(row, "status"),
    description: readNullableString(row, "description"),
    metadata: readJson(row, "metadata"),
    source_ai_action_id: readNullableString(row, "source_ai_action_id"),
    source_chat_message_id: readNullableString(row, "source_chat_message_id"),
    created_at: readString(row, "created_at"),
    updated_at: readString(row, "updated_at"),
  };
}

function toPrivacySettingRow(row: Record<string, unknown>): PrivacySettingRow {
  return {
    id: readString(row, "id"),
    user_id: readString(row, "user_id"),
    privacy_key: readString(row, "privacy_key"),
    surface: readString(row, "surface"),
    privacy_level: readString(row, "privacy_level"),
    consent_state: readString(row, "consent_state"),
    data_scope: readString(row, "data_scope"),
    redaction_enabled: readBoolean(row, "redaction_enabled", true),
    retention_policy: readString(row, "retention_policy"),
    description: readNullableString(row, "description"),
    metadata: readJson(row, "metadata"),
    source_ai_action_id: readNullableString(row, "source_ai_action_id"),
    source_chat_message_id: readNullableString(row, "source_chat_message_id"),
    created_at: readString(row, "created_at"),
    updated_at: readString(row, "updated_at"),
  };
}

function normalizeRows<T>(
  data: unknown,
  mapRow: (row: Record<string, unknown>) => T,
): T[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(isRecord).map(mapRow);
}

export async function listAppSettings(
  userId: string,
  options: { limit?: number } = {},
): Promise<SettingsPrivacyReadResult<AppSettingRow>> {
  const supabase = (await createSupabaseServerClient()) as unknown as ReadClient;
  const limit = options.limit ?? 100;

  const { data, error } = await supabase
    .from("app_settings")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  return {
    data: normalizeRows(data, toAppSettingRow),
    error: error?.message ?? null,
  };
}

export async function listPrivacySettings(
  userId: string,
  options: { limit?: number } = {},
): Promise<SettingsPrivacyReadResult<PrivacySettingRow>> {
  const supabase = (await createSupabaseServerClient()) as unknown as ReadClient;
  const limit = options.limit ?? 100;

  const { data, error } = await supabase
    .from("privacy_settings")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  return {
    data: normalizeRows(data, toPrivacySettingRow),
    error: error?.message ?? null,
  };
}
