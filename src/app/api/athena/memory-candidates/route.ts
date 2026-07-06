import { NextResponse } from "next/server";

import {
  createAthenaMemoryCandidate,
  listAthenaMemoryReviewState,
} from "@/lib/ai";
import { requireCurrentUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const supabase = await createSupabaseServerClient();
    const result = await listAthenaMemoryReviewState({
      supabase,
      user_id: user.id,
    });

    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load Athena memory review state.",
      },
      { status: 401 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const supabase = await createSupabaseServerClient();
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    const result = await createAthenaMemoryCandidate({
      supabase,
      user_id: user.id,
      candidate_text: body.candidate_text,
      source_chat_message_id:
        typeof body.source_chat_message_id === "string"
          ? body.source_chat_message_id
          : null,
      source_chat_session_id:
        typeof body.source_chat_session_id === "string"
          ? body.source_chat_session_id
          : null,
      memory_type: body.memory_type,
      sensitivity: body.sensitivity,
      priority: body.priority,
      confidence: body.confidence,
    });

    return NextResponse.json(result, { status: result.ok ? 201 : 400 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create memory candidate.",
      },
      { status: 500 },
    );
  }
}
