export type TimelineEventSource =
  | "manual"
  | "carnos"
  | "python_ml"
  | "system"
  | "import"
  | "server";

export interface WriteTimelineEventInput {
  user_id: string;
  event_type: string;
  title: string;
  description?: string;
  source: TimelineEventSource;
  entity_table?: string;
  entity_id?: string;
  occurred_at?: string;
  metadata?: Record<string, unknown>;
}

export interface WriteTimelineEventSuccess {
  status: "success";
  timeline_event_id: string;
}

export interface WriteTimelineEventSkipped {
  status: "skipped";
  reason: string;
}

export interface WriteTimelineEventError {
  status: "error";
  message: string;
}

export type WriteTimelineEventResult =
  | WriteTimelineEventSuccess
  | WriteTimelineEventSkipped
  | WriteTimelineEventError;

/**
 * Phase 6.7 timeline helper boundary.
 *
 * The current SQL spine does not yet define a dedicated timeline_events table.
 * This helper intentionally does not write to the database until that schema exists.
 *
 * Future phase rule:
 * - Once a timeline_events table is added to the SQL spine and generated types,
 *   replace this skipped result with a typed Supabase insert.
 */
export async function writeTimelineEvent(
  input: WriteTimelineEventInput,
): Promise<WriteTimelineEventResult> {
  void input;

  return {
    status: "skipped",
    reason: "timeline_events table is not defined in the current SQL spine.",
  };
}
