import { NextResponse } from "next/server";

import { approveAthenaMemoryCandidate } from "@/lib/ai";
import { requireCurrentUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  context: { params: Promise<{ candidateId: string }> },
) {
  try {
    const user = await requireCurrentUser();
    const supabase = await createSupabaseServerClient();
    const { candidateId } = await context.params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const result = await approveAthenaMemoryCandidate({
      supabase,
      user_id: user.id,
      candidate_id: candidateId,
      memory_text: body.memory_text,
      memory_summary: body.memory_summary,
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
            : "Failed to approve memory candidate.",
      },
      { status: 500 },
    );
  }
}
