
import { VOICE_SESSION_STATES, type VoiceSessionState } from "@/types/voice";

export type VoiceTransitionReason =
  | "request_permission"
  | "permission_granted"
  | "permission_denied"
  | "start_listening"
  | "start_recording"
  | "stop_recording"
  | "transcription_started"
  | "transcription_complete"
  | "thinking_started"
  | "speaking_started"
  | "speaking_complete"
  | "proposal_detected"
  | "confirmation_resolved"
  | "session_ended"
  | "session_cancelled"
  | "error_raised"
  | "reset";

export type VoiceStateTransition = {
  from: VoiceSessionState;
  to: VoiceSessionState;
  reason: VoiceTransitionReason;
};

export const VOICE_STATE_TRANSITIONS: readonly VoiceStateTransition[] = [
  { from: "idle", to: "permission_needed", reason: "request_permission" },
  { from: "idle", to: "listening", reason: "start_listening" },
  { from: "permission_needed", to: "listening", reason: "permission_granted" },
  { from: "permission_needed", to: "error", reason: "permission_denied" },
  { from: "listening", to: "recording", reason: "start_recording" },
  { from: "recording", to: "transcribing", reason: "stop_recording" },
  { from: "recording", to: "transcribing", reason: "transcription_started" },
  { from: "transcribing", to: "thinking", reason: "transcription_complete" },
  { from: "thinking", to: "speaking", reason: "speaking_started" },
  { from: "thinking", to: "confirmation_needed", reason: "proposal_detected" },
  { from: "thinking", to: "ended", reason: "session_ended" },
  { from: "speaking", to: "listening", reason: "speaking_complete" },
  { from: "speaking", to: "confirmation_needed", reason: "proposal_detected" },
  { from: "confirmation_needed", to: "listening", reason: "confirmation_resolved" },
  { from: "confirmation_needed", to: "ended", reason: "session_ended" },
  { from: "listening", to: "ended", reason: "session_ended" },
  { from: "recording", to: "ended", reason: "session_cancelled" },
  { from: "transcribing", to: "ended", reason: "session_cancelled" },
  { from: "thinking", to: "ended", reason: "session_cancelled" },
  { from: "speaking", to: "ended", reason: "session_cancelled" },
  { from: "idle", to: "error", reason: "error_raised" },
  { from: "permission_needed", to: "error", reason: "error_raised" },
  { from: "listening", to: "error", reason: "error_raised" },
  { from: "recording", to: "error", reason: "error_raised" },
  { from: "transcribing", to: "error", reason: "error_raised" },
  { from: "thinking", to: "error", reason: "error_raised" },
  { from: "speaking", to: "error", reason: "error_raised" },
  { from: "confirmation_needed", to: "error", reason: "error_raised" },
  { from: "ended", to: "idle", reason: "reset" },
  { from: "error", to: "idle", reason: "reset" }
] as const;

export const VOICE_STATE_LABELS: Record<VoiceSessionState, string> = {
  idle: "Idle",
  permission_needed: "Microphone permission needed",
  listening: "Listening ready",
  recording: "Recording",
  transcribing: "Transcribing",
  thinking: "Carnos is thinking",
  speaking: "Carnos is speaking",
  confirmation_needed: "Confirmation needed",
  ended: "Session ended",
  error: "Voice error"
};

export const VOICE_STATE_HELP_TEXT: Record<VoiceSessionState, string> = {
  idle: "No voice session is active.",
  permission_needed: "The browser must ask for microphone permission before recording.",
  listening: "The session is ready for user input.",
  recording: "Audio capture is active, but audio is not retained by default.",
  transcribing: "A transcript draft is being prepared for review.",
  thinking: "Carnos may classify intent but cannot silently write data.",
  speaking: "A spoken response may be played only if a TTS provider is available.",
  confirmation_needed: "The user must Save, Edit, or Cancel before any write.",
  ended: "The session has ended.",
  error: "The session hit a safe failure state."
};

export function isVoiceSessionState(value: string): value is VoiceSessionState {
  return (VOICE_SESSION_STATES as readonly string[]).includes(value);
}

export function canTransitionVoiceSessionState(
  from: VoiceSessionState,
  to: VoiceSessionState,
  reason?: VoiceTransitionReason
): boolean {
  return VOICE_STATE_TRANSITIONS.some((transition) => {
    const sameStates = transition.from === from && transition.to === to;
    return sameStates && (reason === undefined || transition.reason === reason);
  });
}

export function getNextVoiceSessionStates(from: VoiceSessionState): VoiceSessionState[] {
  return Array.from(
    new Set(
      VOICE_STATE_TRANSITIONS
        .filter((transition) => transition.from === from)
        .map((transition) => transition.to)
    )
  );
}

export function assertVoiceStateTransition(
  from: VoiceSessionState,
  to: VoiceSessionState,
  reason: VoiceTransitionReason
): VoiceStateTransition {
  if (!canTransitionVoiceSessionState(from, to, reason)) {
    throw new Error(`Invalid voice state transition: ${from} -> ${to} by ${reason}`);
  }
  return { from, to, reason };
}

export function isTerminalVoiceSessionState(state: VoiceSessionState): boolean {
  return state === "ended" || state === "error";
}

export function requiresUserConfirmation(state: VoiceSessionState): boolean {
  return state === "confirmation_needed";
}
