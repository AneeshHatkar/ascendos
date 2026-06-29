import { NextRequest, NextResponse } from "next/server";

import { noopSpeechToTextProvider } from "@/lib/voice/providers";

export const runtime = "nodejs";

type TranscribeRequestBody = {
  provider?: "noop";
  transcript_text?: string;
  transcriptText?: string;
  audio_reference?: string;
  audioReference?: string;
  metadata?: Record<string, unknown>;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function readJsonBody(request: NextRequest): Promise<TranscribeRequestBody> {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Phase 14D voice transcribe boundary accepts JSON only.");
  }

  const body = (await request.json()) as unknown;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Invalid JSON body for Phase 14D voice transcribe boundary.");
  }

  return body as TranscribeRequestBody;
}

export async function POST(request: NextRequest) {
  try {
    const body = await readJsonBody(request);

    if (body.provider && body.provider !== "noop") {
      return jsonResponse(
        {
          ok: false,
          boundary: "speech_to_text",
          status: "provider_unconfigured",
          error:
            "Only the noop STT provider boundary is enabled in Phase 14D. Real providers are deferred.",
          audio_saved: false,
          audio_retained: false,
          persisted: false,
          proposed_action_created: false,
        },
        400,
      );
    }

    const result = await noopSpeechToTextProvider.transcribe({
      provider: "noop",
      transcriptText: body.transcriptText ?? body.transcript_text,
      audioReference: body.audioReference ?? body.audio_reference,
      metadata: body.metadata,
    });

    return jsonResponse(
      {
        ok: result.ok,
        provider: result.provider,
        boundary: result.boundary,
        status: result.status,
        transcript_text: result.transcriptText,
        confidence_score: result.confidenceScore,
        needs_review: result.needsReview,
        audio_saved: result.audioSaved,
        audio_retained: result.audioRetained,
        persisted: result.persisted,
        proposed_action_created: result.proposedActionCreated,
        error: result.error,
      },
      result.ok ? 200 : 400,
    );
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        boundary: "speech_to_text",
        status: "error",
        error: error instanceof Error ? error.message : "Unknown transcribe boundary error.",
        audio_saved: false,
        audio_retained: false,
        persisted: false,
        proposed_action_created: false,
      },
      400,
    );
  }
}
