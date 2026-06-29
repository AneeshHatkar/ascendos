
export const VOICE_SESSION_TYPES = [
  "quick_log",
  "daily_command",
  "night_reflection",
  "interview_practice",
  "learning_tutor",
  "gym_checkin",
  "research_mentor",
  "general_chat",
  "crisis_soft"
] as const;

export type VoiceSessionType = (typeof VOICE_SESSION_TYPES)[number];

export const VOICE_MODES = [
  "friend_voice",
  "strict_coach_voice",
  "calm_mentor_voice",
  "morning_command_voice",
  "night_reflection_voice",
  "teacher_voice",
  "research_mentor_voice",
  "gym_coach_voice",
  "crisis_soft_voice"
] as const;

export type VoiceMode = (typeof VOICE_MODES)[number];

export const VOICE_SESSION_STATUSES = [
  "draft",
  "active",
  "ended",
  "discarded",
  "pending_confirmation",
  "saved",
  "error"
] as const;

export type VoiceSessionStatus = (typeof VOICE_SESSION_STATUSES)[number];

export const VOICE_TRANSCRIPT_SPEAKERS = ["user", "carnos", "system"] as const;
export type VoiceTranscriptSpeaker = (typeof VOICE_TRANSCRIPT_SPEAKERS)[number];

export const VOICE_TRANSCRIPT_SOURCES = ["voice", "manual", "simulated", "text"] as const;
export type VoiceTranscriptSource = (typeof VOICE_TRANSCRIPT_SOURCES)[number];

export const VOICE_SESSION_STATES = [
  "idle",
  "permission_needed",
  "listening",
  "recording",
  "transcribing",
  "thinking",
  "speaking",
  "confirmation_needed",
  "ended",
  "error"
] as const;

export type VoiceSessionState = (typeof VOICE_SESSION_STATES)[number];

export const VOICE_REVIEW_LEVELS = ["none", "low_confidence", "needs_user_review", "unsafe_or_sensitive"] as const;
export type VoiceReviewLevel = (typeof VOICE_REVIEW_LEVELS)[number];

export const VOICE_ACTION_SOURCES = ["voice", "manual", "simulated", "text"] as const;
export type VoiceActionSource = (typeof VOICE_ACTION_SOURCES)[number];

export const VOICE_ALLOWED_PROPOSED_ACTION_TYPES = [
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item"
] as const;

export type VoiceAllowedProposedActionType = (typeof VOICE_ALLOWED_PROPOSED_ACTION_TYPES)[number];

export type VoiceProviderAvailability =
  | "not_configured"
  | "browser_available"
  | "provider_available"
  | "provider_unavailable";

export type VoiceDateAmbiguity =
  | "none"
  | "missing_date"
  | "relative_date"
  | "timezone_ambiguous"
  | "needs_user_confirmation";

export type VoiceTranscriptCorrection = {
  original_text: string;
  corrected_text: string;
  corrected_at: string;
  correction_reason?: string;
};

export type VoiceTranscriptDraft = {
  speaker: VoiceTranscriptSpeaker;
  transcript_text: string;
  transcript_source: VoiceTranscriptSource;
  segment_index: number;
  occurred_at?: string;
  confidence_score?: number;
  needs_review: boolean;
  review_level: VoiceReviewLevel;
  correction?: VoiceTranscriptCorrection;
  detected_emotion_label?: string;
  is_sensitive: boolean;
  metadata?: Record<string, unknown>;
};

export type VoiceSessionDraft = {
  session_type: VoiceSessionType;
  voice_mode: VoiceMode;
  state: VoiceSessionState;
  status: VoiceSessionStatus;
  sensitive_default: boolean;
  audio_saved: false;
  audio_retained: false;
  audio_retention_consent: false;
  transcript_summary?: string;
  detected_emotion_label?: string;
  metadata?: Record<string, unknown>;
};

export type VoiceSessionSummary = {
  total_segments: number;
  user_segments: number;
  carnos_segments: number;
  system_segments: number;
  needs_review_count: number;
  sensitive_segment_count: number;
  average_confidence_score: number | null;
  first_occurred_at: string | null;
  last_occurred_at: string | null;
};

export type VoiceIntentHint = {
  source: VoiceActionSource;
  allowed_action_type?: VoiceAllowedProposedActionType;
  confidence_score: number;
  date_ambiguity: VoiceDateAmbiguity;
  requires_confirmation: true;
  reason: string;
};

export type VoiceSafetyBoundary = {
  no_silent_writes: true;
  no_audio_retention_by_default: true;
  no_auto_memory: true;
  no_dependency_forming_behavior: true;
  no_medical_or_mental_health_diagnosis: true;
  human_world_anchor_required: true;
};
