import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, Json } from "@/types/database";

type AuditLogInsert = Database["public"]["Tables"]["audit_logs"]["Insert"];

export type AuditActionStatus = "success" | "error";

export type AuditActionSource =
  | "manual"
  | "carnos"
  | "python_ml"
  | "system"
  | "import"
  | "server";

export interface WriteAuditLogInput {
  supabase: SupabaseClient<Database>;
  user_id: string;
  action_type: string;
  status: AuditActionStatus;
  source: AuditActionSource;
  entity_table: string;
  entity_id?: string;
  summary: string;
  before_state?: Json;
  after_state?: Json;
  metadata?: Record<string, Json>;
}

export interface WriteAuditLogSuccess {
  status: "success";
  audit_log_id: string;
}

export interface WriteAuditLogError {
  status: "error";
  message: string;
}

export type WriteAuditLogResult = WriteAuditLogSuccess | WriteAuditLogError;

function mapSourceToActorType(source: AuditActionSource): AuditLogInsert["actor_type"] {
  if (source === "carnos") {
    return "carnos";
  }

  if (source === "system" || source === "python_ml" || source === "import" || source === "server") {
    return "system";
  }

  return "user";
}

export async function writeAuditLog(input: WriteAuditLogInput): Promise<WriteAuditLogResult> {
  const payload: AuditLogInsert = {
    user_id: input.user_id,
    actor_type: mapSourceToActorType(input.source),
    action_type: input.action_type,
    entity_table: input.entity_table,
    entity_id: input.entity_id ?? null,
    before_state: input.before_state,
    after_state: input.after_state,
    metadata: {
      ...(input.metadata ?? {}),
      source: input.source,
      status: input.status,
      summary: input.summary,
    },
  };

  const { data, error } = await input.supabase
    .from("audit_logs")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    audit_log_id: data.id,
  };
}
