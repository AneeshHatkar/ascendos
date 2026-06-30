export type VoiceTranscriptDraftSource =
  | "manual_simulator"
  | "typed_text"
  | "noop_transcription";

export type VoiceTranscriptDraftStatus =
  | "empty"
  | "draft_ready"
  | "needs_review"
  | "blocked";

export type VoiceTranscriptDraftBoundary = {
  persisted: false;
  audioSaved: false;
  audioRetained: false;
  providerCalled: false;
  sqlWritten: false;
  proposedActionCreated: false;
  proposedActionExecuted: false;
  microphoneUsed: false;
  routeCreated: false;
};

export type VoiceTranscriptDraftInput = {
  transcriptText: string;
  source?: VoiceTranscriptDraftSource;
  language?: string;
  confidenceScore?: number | null;
  userCorrectionText?: string | null;
  notes?: string | null;
};

export type VoiceTranscriptDraft = {
  id: string;
  transcriptText: string;
  source: VoiceTranscriptDraftSource;
  language: string;
  confidenceScore: number | null;
  userCorrectionText: string | null;
  notes: string | null;
  status: VoiceTranscriptDraftStatus;
  needsReview: true;
  sensitiveDefault: true;
  createdAtIso: string;
  wordCount: number;
  characterCount: number;
  preview: string;
  boundary: VoiceTranscriptDraftBoundary;
};

export const VOICE_TRANSCRIPT_DRAFT_BOUNDARY_MARKERS = [
  "Manual transcript input only",
  "No microphone capture",
  "No provider calls",
  "No SQL writes",
  "No proposed-action creation",
  "No proposed-action execution",
  "No /voice-companion",
] as const;

const TRANSCRIPT_PREVIEW_LIMIT = 180;

export function normalizeTranscriptText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function countTranscriptWords(value: string): number {
  const normalized = normalizeTranscriptText(value);

  if (!normalized) {
    return 0;
  }

  return normalized.split(" ").length;
}

export function createVoiceTranscriptDraft(
  input: VoiceTranscriptDraftInput,
): VoiceTranscriptDraft {
  const transcriptText = normalizeTranscriptText(input.transcriptText);
  const wordCount = countTranscriptWords(transcriptText);
  const status: VoiceTranscriptDraftStatus = transcriptText
    ? "draft_ready"
    : "empty";

  return {
    id: `manual-transcript-draft-${Date.now()}`,
    transcriptText,
    source: input.source ?? "manual_simulator",
    language: input.language ?? "en",
    confidenceScore: input.confidenceScore ?? null,
    userCorrectionText: input.userCorrectionText
      ? normalizeTranscriptText(input.userCorrectionText)
      : null,
    notes: input.notes ? normalizeTranscriptText(input.notes) : null,
    status,
    needsReview: true,
    sensitiveDefault: true,
    createdAtIso: new Date().toISOString(),
    wordCount,
    characterCount: transcriptText.length,
    preview:
      transcriptText.length > TRANSCRIPT_PREVIEW_LIMIT
        ? `${transcriptText.slice(0, TRANSCRIPT_PREVIEW_LIMIT)}...`
        : transcriptText,
    boundary: {
      persisted: false,
      audioSaved: false,
      audioRetained: false,
      providerCalled: false,
      sqlWritten: false,
      proposedActionCreated: false,
      proposedActionExecuted: false,
      microphoneUsed: false,
      routeCreated: false,
    },
  };
}

export function summarizeTranscriptDraft(draft: VoiceTranscriptDraft): string {
  if (!draft.transcriptText) {
    return "Empty manual transcript draft. Nothing is saved, routed, or executed.";
  }

  return [
    `Manual transcript draft ready with ${draft.wordCount} word(s).`,
    "Needs review before any future save, route, or proposed-action bridge.",
    "No SQL writes, provider calls, microphone capture, or proposed-action execution occurred.",
  ].join(" ");
}
