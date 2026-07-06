import { NextResponse } from "next/server";

import { updateAthenaMemoryCandidate } from "@/lib/ai";
import { requireCurrentUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ candidateId: string }> },
) {
  try {
    const user = await requireCurrentUser();
    const supabase = await createSupabaseServerClient();
    const { candidateId } = await context.params;
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    const result = await updateAthenaMemoryCandidate({
      supabase,
      user_id: user.id,
      candidate_id: candidateId,
      candidate_text: body.candidate_text,
      memory_type: body.memory_type,
      sensitivity: body.sensitivity,
      priority: body.priority,
    });

    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update memory candidate.",
      },
      { status: 500 },
    );
  }
}
