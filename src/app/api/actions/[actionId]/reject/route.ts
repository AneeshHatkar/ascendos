import { NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/auth/session";
import { updateActionLifecycle } from "@/lib/actions/action-lifecycle";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(
  _request: Request,
  context: { params: Promise<{ actionId: string }> },
) {
  try {
    const user = await requireCurrentUser();
    const { actionId } = await context.params;
    const supabase = await createSupabaseServerClient();

    if (!actionId) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing AI action id.",
        },
        { status: 400 },
      );
    }

    const result = await updateActionLifecycle({
      supabase,
      user_id: user.id,
      ai_action_id: actionId,
      transition: "reject",
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to reject action.",
      },
      { status: 401 },
    );
  }
}
