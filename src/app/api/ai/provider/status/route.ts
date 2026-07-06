import { NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/auth/session";
import { getAiProviderPublicStatus } from "@/lib/ai";

export const runtime = "nodejs";

export async function GET() {
  await requireCurrentUser();

  return NextResponse.json(
    {
      ok: true,
      provider_status: getAiProviderPublicStatus(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
