import type {
  SpeechToTextInput,
  SpeechToTextProvider,
  SpeechToTextResult,
} from "./voice-provider-types";

function normalizeTranscriptText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

export const noopSpeechToTextProvider: SpeechToTextProvider = {
  name: "noop",
  async transcribe(input: SpeechToTextInput): Promise<SpeechToTextResult> {
    const transcriptText = normalizeTranscriptText(input.transcriptText);

    if (!transcriptText && !input.audioReference) {
      return {
        ok: false,
        provider: "noop",
        boundary: "speech_to_text",
        status: "rejected",
        transcriptText: "",
        confidenceScore: null,
        needsReview: true,
        audioSaved: false,
        audioRetained: false,
        persisted: false,
        proposedActionCreated: false,
        error:
          "Phase 14D STT boundary requires transcriptText or an audioReference placeholder. Real audio transcription is deferred.",
      };
    }

    return {
      ok: true,
      provider: "noop",
      boundary: "speech_to_text",
      status: "draft_ready",
      transcriptText:
        transcriptText ||
        "[Phase 14D placeholder transcript: real speech-to-text provider is not configured.]",
      confidenceScore: null,
      needsReview: true,
      audioSaved: false,
      audioRetained: false,
      persisted: false,
      proposedActionCreated: false,
    };
  },
};
