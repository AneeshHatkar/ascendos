import { NextRequest, NextResponse } from "next/server";

import { noopTextToSpeechProvider } from "@/lib/voice/providers";

export const runtime = "nodejs";

type SpeakRequestBody = {
  provider?: "noop";
  text?: string;
  voice_name?: string;
  voiceName?: string;
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

async function readJsonBody(request: NextRequest): Promise<SpeakRequestBody> {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Phase 14D voice speak boundary accepts JSON only.");
  }

  const body = (await request.json()) as unknown;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Invalid JSON body for Phase 14D voice speak boundary.");
  }

  return body as SpeakRequestBody;
}

export async function POST(request: NextRequest) {
  try {
    const body = await readJsonBody(request);

    if (body.provider && body.provider !== "noop") {
      return jsonResponse(
        {
          ok: false,
          boundary: "text_to_speech",
          status: "provider_unconfigured",
          error:
            "Only the noop TTS provider boundary is enabled in Phase 14D. Real providers are deferred.",
          audio_url: null,
          audio_saved: false,
          audio_retained: false,
          persisted: false,
          proposed_action_created: false,
        },
        400,
      );
    }

    const result = await noopTextToSpeechProvider.speak({
      provider: "noop",
      text: body.text ?? "",
      voiceName: body.voiceName ?? body.voice_name,
      metadata: body.metadata,
    });

    return jsonResponse(
      {
        ok: result.ok,
        provider: result.provider,
        boundary: result.boundary,
        status: result.status,
        spoken_text: result.spokenText,
        audio_url: result.audioUrl,
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
        boundary: "text_to_speech",
        status: "error",
        error: error instanceof Error ? error.message : "Unknown speak boundary error.",
        audio_url: null,
        audio_saved: false,
        audio_retained: false,
        persisted: false,
        proposed_action_created: false,
      },
      400,
    );
  }
}
