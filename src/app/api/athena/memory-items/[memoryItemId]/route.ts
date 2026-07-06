import { NextResponse } from "next/server";

import { updateAthenaApprovedMemory } from "@/lib/ai";
import { requireCurrentUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ memoryItemId: string }> },
) {
  try {
    const user = await requireCurrentUser();
    const supabase = await createSupabaseServerClient();
    const { memoryItemId } = await context.params;
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    const action =
      body.action === "forget" ||
      body.action === "archive" ||
      body.action === "mark_sensitive" ||
      body.action === "toggle_retrieval" ||
      body.action === "update"
        ? body.action
        : "update";

    const result = await updateAthenaApprovedMemory({
      supabase,
      user_id: user.id,
      memory_item_id: memoryItemId,
      action,
      memory_text: body.memory_text,
      memory_summary: body.memory_summary,
      sensitivity: body.sensitivity,
      retrieval_enabled: body.retrieval_enabled,
      reason: body.reason,
    });

    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update approved memory.",
      },
      { status: 500 },
    );
  }
}
