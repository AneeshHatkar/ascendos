import type {
  TextToSpeechInput,
  TextToSpeechProvider,
  TextToSpeechResult,
} from "./voice-provider-types";

function normalizeSpeechText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

export const noopTextToSpeechProvider: TextToSpeechProvider = {
  name: "noop",
  async speak(input: TextToSpeechInput): Promise<TextToSpeechResult> {
    const spokenText = normalizeSpeechText(input.text);

    if (!spokenText) {
      return {
        ok: false,
        provider: "noop",
        boundary: "text_to_speech",
        status: "rejected",
        spokenText: "",
        audioUrl: null,
        audioSaved: false,
        audioRetained: false,
        persisted: false,
        proposedActionCreated: false,
        error: "Phase 14D TTS boundary requires non-empty text.",
      };
    }

    return {
      ok: true,
      provider: "noop",
      boundary: "text_to_speech",
      status: "draft_ready",
      spokenText,
      audioUrl: null,
      audioSaved: false,
      audioRetained: false,
      persisted: false,
      proposedActionCreated: false,
    };
  },
};
