import { NextResponse } from "next/server";
import { z } from "zod";

import { requireCurrentUser } from "@/lib/auth/session";
import { createProposedAction } from "@/lib/actions/create-proposed-action";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const proposalSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(160),
  description: z.string().trim().max(2000).optional(),
  due_date: z.string().trim().max(80).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  domain: z
    .enum([
      "career",
      "learning",
      "health",
      "body",
      "research",
      "projects",
      "life_admin",
      "finance",
      "relationships",
      "creativity",
      "general",
    ])
    .default("general"),
  source_surface: z.enum(["calendar", "timeline"]).default("calendar"),
});

export async function POST(request: Request) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Request body must be valid JSON.",
      },
      { status: 400 },
    );
  }

  const parsed = proposalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Calendar proposal payload is invalid.",
        issues: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  const proposedAction = {
    action_type: "create_task",
    source: "manual",
    reason:
      payload.source_surface === "timeline"
        ? "User submitted a timeline-safe task proposal from the Timeline surface."
        : "User submitted a calendar-safe task proposal from the Calendar surface.",
    confidence: 1,
    evidence_refs: [],
    payload: {
      title: payload.title,
      description: payload.description,
      due_date: payload.due_date,
      priority: payload.priority,
      domain: payload.domain,
      status: "todo",
    },
  };

  const result = await createProposedAction({
    supabase,
    user_id: user.id,
    proposed_action: proposedAction,
    source_context: {
      source_surface: payload.source_surface,
      route: "/api/calendar/proposals",
      confirmation_required: true,
      direct_calendar_write: false,
      direct_timeline_write: false,
    },
  });

  if (result.status === "error") {
    return NextResponse.json(
      {
        status: "error",
        message: result.message,
        issues: result.issues ?? [],
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    status: "success",
    message:
      "Task proposal created. Review it in Pending Updates before anything is written to tasks.",
    data: result.data,
  });
}
