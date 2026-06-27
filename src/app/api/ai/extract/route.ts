import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { requireCurrentUser } from "@/lib/auth/session";
import { validateProposedAction } from "@/lib/actions/validate-proposed-action";

const JsonObjectSchema = z.record(z.string(), z.unknown());

const AiExtractionRequestSchema = z
  .object({
    text: z.string().min(1).max(12000).optional(),
    proposed_action: JsonObjectSchema.optional(),
    context: JsonObjectSchema.optional(),
  })
  .refine((value) => value.text || value.proposed_action, {
    message: "Request must include text or proposed_action.",
  });

export async function POST(request: NextRequest) {
  await requireCurrentUser();

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

  const parsed = AiExtractionRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid extraction request.",
        issues: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 },
    );
  }

  if (!parsed.data.proposed_action) {
    return NextResponse.json(
      {
        status: "needs_review",
        message:
          "Text extraction is intentionally deterministic in this phase. Provide a proposed_action payload to validate it before confirmation.",
        extracted_action: null,
        requires_confirmation: true,
        writes_performed: false,
      },
      { status: 202 },
    );
  }

  const validation = validateProposedAction(parsed.data.proposed_action);

  if (validation.status !== "success") {
    return NextResponse.json(
      {
        status: "error",
        message: validation.message,
        issues: validation.issues,
        requires_confirmation: true,
        writes_performed: false,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    status: "success",
    message:
      "Proposed action validated. Persisting it still requires the confirmation-first pending update flow.",
    extracted_action: validation.data,
    requires_confirmation: true,
    writes_performed: false,
  });
}
