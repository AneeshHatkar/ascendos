import type { SupabaseClient } from "@supabase/supabase-js";

import { getDefaultCarnosPersonaContract } from "@/lib/carnos/persona-contract";

export type PersonaPromptVersionRow = {
  id: string;
  user_id: string;
  carnos_profile_id: string | null;
  version_name: string;
  persona_name: string;
  persona_layer: string;
  status: "draft" | "active" | "archived";
  system_prompt: string;
  tone_rules: unknown[];
  safety_rules: unknown[];
  routing_rules: Record<string, unknown>;
  generation_boundary: string;
  memory_boundary: string;
  voice_boundary: string;
  web_boundary: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function listPersonaPromptVersions(
  supabase: SupabaseClient,
  userId: string,
): Promise<PersonaPromptVersionRow[]> {
  const { data, error } = await supabase
    .from("persona_prompt_versions")
    .select(
      [
        "id",
        "user_id",
        "carnos_profile_id",
        "version_name",
        "persona_name",
        "persona_layer",
        "status",
        "system_prompt",
        "tone_rules",
        "safety_rules",
        "routing_rules",
        "generation_boundary",
        "memory_boundary",
        "voice_boundary",
        "web_boundary",
        "is_active",
        "created_at",
        "updated_at",
      ].join(", "),
    )
    .eq("user_id", userId)
    .order("is_active", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load persona_prompt_versions", error);
    return [];
  }

  return (data ?? []) as PersonaPromptVersionRow[];
}

export async function getActiveCarnosPersonaPromptVersion(
  supabase: SupabaseClient,
  userId: string,
): Promise<PersonaPromptVersionRow | null> {
  const { data, error } = await supabase
    .from("persona_prompt_versions")
    .select(
      [
        "id",
        "user_id",
        "carnos_profile_id",
        "version_name",
        "persona_name",
        "persona_layer",
        "status",
        "system_prompt",
        "tone_rules",
        "safety_rules",
        "routing_rules",
        "generation_boundary",
        "memory_boundary",
        "voice_boundary",
        "web_boundary",
        "is_active",
        "created_at",
        "updated_at",
      ].join(", "),
    )
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to load active Carnos persona prompt version", error);
    return null;
  }

  return data as PersonaPromptVersionRow | null;
}

export async function getCarnosPersonaRuntimeSummary(
  supabase: SupabaseClient,
  userId: string,
) {
  const activePrompt = await getActiveCarnosPersonaPromptVersion(supabase, userId);
  const defaultContract = getDefaultCarnosPersonaContract();

  return {
    active_prompt: activePrompt,
    default_contract: defaultContract,
    has_active_database_prompt: Boolean(activePrompt),
    generation_enabled: false,
    memory_enabled: false,
    voice_enabled: false,
    web_enabled: false,
    write_boundary: "confirmation_required",
    source_tables: ["persona_prompt_versions", "chat_sessions", "chat_messages"],
  };
}
