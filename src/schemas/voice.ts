
import {
  VOICE_ACTION_SOURCES,
  VOICE_ALLOWED_PROPOSED_ACTION_TYPES,
  VOICE_MODES,
  VOICE_REVIEW_LEVELS,
  VOICE_SESSION_STATES,
  VOICE_SESSION_STATUSES,
  VOICE_SESSION_TYPES,
  VOICE_TRANSCRIPT_SOURCES,
  VOICE_TRANSCRIPT_SPEAKERS,
  type VoiceActionSource,
  type VoiceAllowedProposedActionType,
  type VoiceDateAmbiguity,
  type VoiceIntentHint,
  type VoiceMode,
  type VoiceReviewLevel,
  type VoiceSafetyBoundary,
  type VoiceSessionDraft,
  type VoiceSessionState,
  type VoiceSessionStatus,
  type VoiceSessionType,
  type VoiceTranscriptDraft,
  type VoiceTranscriptSource,
  type VoiceTranscriptSpeaker
} from "@/types/voice";

export type VoiceValidationResult<T> =
  | { ok: true; value: T; warnings: string[] }
  | { ok: false; errors: string[]; warnings: string[] };

function isOneOf<T extends readonly string[]>(value: string, allowed: T): value is T[number] {
  return (allowed as readonly string[]).includes(value);
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function clampConfidence(value: number | undefined): number | undefined {
  if (value === undefined || Number.isNaN(value)) return undefined;
  return Math.min(1, Math.max(0, value));
}

export function isVoiceSessionType(value: string): value is VoiceSessionType {
  return isOneOf(value, VOICE_SESSION_TYPES);
}

export function isVoiceMode(value: string): value is VoiceMode {
  return isOneOf(value, VOICE_MODES);
}

export function isVoiceSessionStatus(value: string): value is VoiceSessionStatus {
  return isOneOf(value, VOICE_SESSION_STATUSES);
}

export function isVoiceSessionState(value: string): value is VoiceSessionState {
  return isOneOf(value, VOICE_SESSION_STATES);
}

export function isVoiceTranscriptSpeaker(value: string): value is VoiceTranscriptSpeaker {
  return isOneOf(value, VOICE_TRANSCRIPT_SPEAKERS);
}

export function isVoiceTranscriptSource(value: string): value is VoiceTranscriptSource {
  return isOneOf(value, VOICE_TRANSCRIPT_SOURCES);
}

export function isVoiceReviewLevel(value: string): value is VoiceReviewLevel {
  return isOneOf(value, VOICE_REVIEW_LEVELS);
}

export function isVoiceActionSource(value: string): value is VoiceActionSource {
  return isOneOf(value, VOICE_ACTION_SOURCES);
}

export function isVoiceAllowedProposedActionType(value: string): value is VoiceAllowedProposedActionType {
  return isOneOf(value, VOICE_ALLOWED_PROPOSED_ACTION_TYPES);
}

export function createVoiceSafetyBoundary(): VoiceSafetyBoundary {
  return {
    no_silent_writes: true,
    no_audio_retention_by_default: true,
    no_auto_memory: true,
    no_dependency_forming_behavior: true,
    no_medical_or_mental_health_diagnosis: true,
    human_world_anchor_required: true
  };
}

export function createDefaultVoiceSessionDraft(
  input: Partial<Pick<VoiceSessionDraft, "session_type" | "voice_mode" | "metadata">> = {}
): VoiceSessionDraft {
  return {
    session_type: input.session_type ?? "general_chat",
    voice_mode: input.voice_mode ?? "friend_voice",
    state: "idle",
    status: "draft",
    sensitive_default: true,
    audio_saved: false,
    audio_retained: false,
    audio_retention_consent: false,
    metadata: input.metadata
  };
}

export function validateVoiceSessionDraft(input: VoiceSessionDraft): VoiceValidationResult<VoiceSessionDraft> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isVoiceSessionType(input.session_type)) errors.push(`Invalid voice session type: ${input.session_type}`);
  if (!isVoiceMode(input.voice_mode)) errors.push(`Invalid voice mode: ${input.voice_mode}`);
  if (!isVoiceSessionState(input.state)) errors.push(`Invalid voice state: ${input.state}`);
  if (!isVoiceSessionStatus(input.status)) errors.push(`Invalid voice status: ${input.status}`);

  if (input.audio_saved !== false) errors.push("audio_saved must remain false in Phase 14C.");
  if (input.audio_retained !== false) errors.push("audio_retained must remain false in Phase 14C.");
  if (input.audio_retention_consent !== false) errors.push("audio_retention_consent must remain false until explicit audio-retention consent exists.");
  if (!input.sensitive_default) warnings.push("Voice sessions should default to sensitive/private handling.");

  if (errors.length > 0) return { ok: false, errors, warnings };
  return { ok: true, value: input, warnings };
}

export function createVoiceTranscriptDraft(input: {
  transcript_text: string;
  speaker?: VoiceTranscriptSpeaker;
  transcript_source?: VoiceTranscriptSource;
  segment_index?: number;
  confidence_score?: number;
  occurred_at?: string;
  detected_emotion_label?: string;
  is_sensitive?: boolean;
  metadata?: Record<string, unknown>;
}): VoiceValidationResult<VoiceTranscriptDraft> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const transcriptText = cleanText(input.transcript_text);

  if (transcriptText.length === 0) errors.push("Transcript text is required.");
  if (transcriptText.length > 12000) errors.push("Transcript text is too long for a single Phase 14C draft segment.");

  const speaker = input.speaker ?? "user";
  const transcriptSource = input.transcript_source ?? "manual";
  const segmentIndex = input.segment_index ?? 0;
  const confidenceScore = clampConfidence(input.confidence_score);

  if (!isVoiceTranscriptSpeaker(speaker)) errors.push(`Invalid transcript speaker: ${speaker}`);
  if (!isVoiceTranscriptSource(transcriptSource)) errors.push(`Invalid transcript source: ${transcriptSource}`);
  if (!Number.isInteger(segmentIndex) || segmentIndex < 0) errors.push("segment_index must be a non-negative integer.");

  const reviewLevel = inferVoiceReviewLevel({
    transcript_text: transcriptText,
    confidence_score: confidenceScore,
    is_sensitive: input.is_sensitive ?? true
  });

  if (confidenceScore !== undefined && confidenceScore < 0.7) warnings.push("Transcript confidence is low and needs user review.");
  if (transcriptSource === "voice") warnings.push("Voice transcript must remain editable before saving.");

  if (errors.length > 0) return { ok: false, errors, warnings };

  return {
    ok: true,
    value: {
      speaker,
      transcript_text: transcriptText,
      transcript_source: transcriptSource,
      segment_index: segmentIndex,
      occurred_at: input.occurred_at,
      confidence_score: confidenceScore,
      needs_review: reviewLevel !== "none",
      review_level: reviewLevel,
      detected_emotion_label: input.detected_emotion_label,
      is_sensitive: input.is_sensitive ?? true,
      metadata: input.metadata
    },
    warnings
  };
}

export function inferVoiceReviewLevel(input: {
  transcript_text: string;
  confidence_score?: number;
  is_sensitive?: boolean;
}): VoiceReviewLevel {
  const text = input.transcript_text.toLowerCase();
  const sensitiveMarkers = ["diagnose", "suicide", "self harm", "overdose", "prescription", "panic attack", "depressed"];
  if (input.is_sensitive && sensitiveMarkers.some((marker) => text.includes(marker))) return "unsafe_or_sensitive";
  if (input.confidence_score !== undefined && input.confidence_score < 0.55) return "needs_user_review";
  if (input.confidence_score !== undefined && input.confidence_score < 0.75) return "low_confidence";
  return "none";
}

export function detectVoiceDateAmbiguity(transcriptText: string): VoiceDateAmbiguity {
  const text = transcriptText.toLowerCase();
  if (/(tomorrow|today|tonight|next week|next month|later|soon)\b/.test(text)) return "relative_date";
  if (/(at \d{1,2}|by \d{1,2}|on monday|on tuesday|on wednesday|on thursday|on friday|on saturday|on sunday)/.test(text)) {
    return "timezone_ambiguous";
  }
  if (/(remind me|schedule|deadline|due|plan)/.test(text) && !/(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{4}-\d{2}-\d{2})/.test(text)) {
    return "missing_date";
  }
  return "none";
}

export function createVoiceIntentHint(input: {
  source: VoiceActionSource;
  transcript_text: string;
  allowed_action_type?: VoiceAllowedProposedActionType;
  confidence_score?: number;
  reason?: string;
}): VoiceValidationResult<VoiceIntentHint> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const source = input.source;
  const actionType = input.allowed_action_type;
  const confidenceScore = clampConfidence(input.confidence_score) ?? 0.5;

  if (!isVoiceActionSource(source)) errors.push(`Invalid voice action source: ${source}`);
  if (actionType && !isVoiceAllowedProposedActionType(actionType)) {
    errors.push(`Voice can only hint safe proposed actions, not ${actionType}.`);
  }

  const dateAmbiguity = detectVoiceDateAmbiguity(input.transcript_text);
  if (dateAmbiguity !== "none") warnings.push(`Date/time ambiguity detected: ${dateAmbiguity}`);

  if (errors.length > 0) return { ok: false, errors, warnings };

  return {
    ok: true,
    value: {
      source,
      allowed_action_type: actionType,
      confidence_score: confidenceScore,
      date_ambiguity: dateAmbiguity,
      requires_confirmation: true,
      reason: input.reason ?? "Voice/text input can only create a proposed action after user confirmation."
    },
    warnings
  };
}
