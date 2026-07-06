import { NextResponse } from "next/server";

import { buildAthenaCurrentInfoReview, getAthenaCurrentInfoProviderStatus } from "@/lib/ai";
import { requireCurrentUser } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireCurrentUser();

    return NextResponse.json(
      {
        ok: true,
        current_info: getAthenaCurrentInfoProviderStatus(),
        live_search_performed: false,
        writes_performed: false,
        hidden_browsing_performed: false,
        browser_secrets_exposed: false,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not read Athena current-info status.",
      },
      { status: 401 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireCurrentUser();

    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    const review = buildAthenaCurrentInfoReview({
      query: body.query,
    });

    return NextResponse.json(review, {
      status: review.ok ? 200 : 400,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not review Athena current-info request.",
      },
      { status: 500 },
    );
  }
}
