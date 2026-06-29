
import type {
  VoiceSessionSummary,
  VoiceTranscriptDraft,
  VoiceTranscriptSpeaker,
  VoiceTranscriptSource
} from "@/types/voice";

export function sortVoiceTranscriptDrafts<T extends Pick<VoiceTranscriptDraft, "segment_index" | "occurred_at">>(
  transcripts: T[]
): T[] {
  return [...transcripts].sort((a, b) => {
    if (a.segment_index !== b.segment_index) return a.segment_index - b.segment_index;
    return String(a.occurred_at ?? "").localeCompare(String(b.occurred_at ?? ""));
  });
}

export function groupVoiceTranscriptDraftsBySpeaker(
  transcripts: VoiceTranscriptDraft[]
): Record<VoiceTranscriptSpeaker, VoiceTranscriptDraft[]> {
  return {
    user: transcripts.filter((transcript) => transcript.speaker === "user"),
    carnos: transcripts.filter((transcript) => transcript.speaker === "carnos"),
    system: transcripts.filter((transcript) => transcript.speaker === "system")
  };
}

export function groupVoiceTranscriptDraftsBySource(
  transcripts: VoiceTranscriptDraft[]
): Record<VoiceTranscriptSource, VoiceTranscriptDraft[]> {
  return {
    voice: transcripts.filter((transcript) => transcript.transcript_source === "voice"),
    manual: transcripts.filter((transcript) => transcript.transcript_source === "manual"),
    simulated: transcripts.filter((transcript) => transcript.transcript_source === "simulated"),
    text: transcripts.filter((transcript) => transcript.transcript_source === "text")
  };
}

export function summarizeVoiceTranscriptDrafts(transcripts: VoiceTranscriptDraft[]): VoiceSessionSummary {
  const sorted = sortVoiceTranscriptDrafts(transcripts);
  const confidenceScores = sorted
    .map((transcript) => transcript.confidence_score)
    .filter((score): score is number => typeof score === "number");

  const averageConfidenceScore =
    confidenceScores.length === 0
      ? null
      : confidenceScores.reduce((total, score) => total + score, 0) / confidenceScores.length;

  return {
    total_segments: sorted.length,
    user_segments: sorted.filter((transcript) => transcript.speaker === "user").length,
    carnos_segments: sorted.filter((transcript) => transcript.speaker === "carnos").length,
    system_segments: sorted.filter((transcript) => transcript.speaker === "system").length,
    needs_review_count: sorted.filter((transcript) => transcript.needs_review).length,
    sensitive_segment_count: sorted.filter((transcript) => transcript.is_sensitive).length,
    average_confidence_score: averageConfidenceScore,
    first_occurred_at: sorted[0]?.occurred_at ?? null,
    last_occurred_at: sorted.at(-1)?.occurred_at ?? null
  };
}

export function buildVoiceTranscriptPreview(transcripts: VoiceTranscriptDraft[], maxCharacters = 700): string {
  const joined = sortVoiceTranscriptDrafts(transcripts)
    .map((transcript) => `${transcript.speaker}: ${transcript.transcript_text}`)
    .join("\n");

  if (joined.length <= maxCharacters) return joined;
  return `${joined.slice(0, Math.max(0, maxCharacters - 1)).trimEnd()}…`;
}

export function transcriptDraftsNeedReview(transcripts: VoiceTranscriptDraft[]): boolean {
  return transcripts.some((transcript) => transcript.needs_review || transcript.review_level !== "none");
}

export function voiceTranscriptHasUserContent(transcripts: VoiceTranscriptDraft[]): boolean {
  return transcripts.some((transcript) => transcript.speaker === "user" && transcript.transcript_text.trim().length > 0);
}

export function createVoiceSourceMetadata(input: {
  source: VoiceTranscriptSource;
  browser?: string;
  provider?: string;
  simulated?: boolean;
  manual_entry?: boolean;
}): Record<string, unknown> {
  return {
    source: input.source,
    browser: input.browser,
    provider: input.provider ?? "not_configured",
    simulated: input.simulated ?? false,
    manual_entry: input.manual_entry ?? input.source === "manual",
    audio_saved: false,
    audio_retained: false,
    phase: "14C"
  };
}
