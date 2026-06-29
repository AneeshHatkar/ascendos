export type VoiceProviderName = "noop";

export type VoiceProviderBoundaryKind = "speech_to_text" | "text_to_speech";

export type VoiceProviderBoundaryStatus =
  | "provider_unconfigured"
  | "draft_ready"
  | "rejected"
  | "error";

export type SpeechToTextInput = {
  provider?: VoiceProviderName;
  transcriptText?: string;
  audioReference?: string;
  metadata?: Record<string, unknown>;
};

export type SpeechToTextResult = {
  ok: boolean;
  provider: VoiceProviderName;
  boundary: "speech_to_text";
  status: VoiceProviderBoundaryStatus;
  transcriptText: string;
  confidenceScore: number | null;
  needsReview: boolean;
  audioSaved: false;
  audioRetained: false;
  persisted: false;
  proposedActionCreated: false;
  error?: string;
};

export type TextToSpeechInput = {
  provider?: VoiceProviderName;
  text: string;
  voiceName?: string;
  metadata?: Record<string, unknown>;
};

export type TextToSpeechResult = {
  ok: boolean;
  provider: VoiceProviderName;
  boundary: "text_to_speech";
  status: VoiceProviderBoundaryStatus;
  spokenText: string;
  audioUrl: null;
  audioSaved: false;
  audioRetained: false;
  persisted: false;
  proposedActionCreated: false;
  error?: string;
};

export type SpeechToTextProvider = {
  name: VoiceProviderName;
  transcribe: (input: SpeechToTextInput) => Promise<SpeechToTextResult>;
};

export type TextToSpeechProvider = {
  name: VoiceProviderName;
  speak: (input: TextToSpeechInput) => Promise<TextToSpeechResult>;
};
