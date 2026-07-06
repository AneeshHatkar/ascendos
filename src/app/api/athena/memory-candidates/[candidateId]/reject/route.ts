import { NextResponse } from "next/server";

import { rejectAthenaMemoryCandidate } from "@/lib/ai";
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

    const result = await rejectAthenaMemoryCandidate({
      supabase,
      user_id: user.id,
      candidate_id: candidateId,
      rejection_reason: body.rejection_reason,
    });

    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to reject memory candidate.",
      },
      { status: 500 },
    );
  }
}
