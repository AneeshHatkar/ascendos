import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";

import type { VoiceTranscriptDraft } from "./transcript-draft";

export type VoiceActionBridgeDecision =
  | "create_task_candidate"
  | "no_candidate"
  | "blocked_empty_transcript";

export type VoiceActionBridgeBoundary = {
  localOnly: true;
  persisted: false;
  sqlWritten: false;
  aiCalled: false;
  providerCalled: false;
  proposedActionPersisted: false;
  proposedActionExecuted: false;
  requiresHumanConfirmation: true;
  allowedActionTypesOnly: true;
};

export type VoiceActionBridgeCandidate = {
  id: string;
  decision: VoiceActionBridgeDecision;
  reason: string;
  source: "voice_transcript_draft" | "typed_text_draft";
  transcriptPreview: string;
  confidence: number;
  contract: ProposedActionContract | null;
  boundary: VoiceActionBridgeBoundary;
};

const ACTION_KEYWORDS = [
  "task",
  "todo",
  "remind",
  "review",
  "finish",
  "build",
  "fix",
  "prepare",
  "study",
  "apply",
  "email",
  "follow up",
  "work on",
] as const;

export const VOICE_ACTION_BRIDGE_ALLOWED_ACTION_TYPES = [
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
] as const;

export const VOICE_ACTION_BRIDGE_BOUNDARY_MARKERS = [
  "Local bridge preview only",
  "Human confirmation required",
  "Allowed action types only",
  "No SQL writes",
  "No AI calls",
  "No provider calls",
  "No persisted action rows",
  "No action execution",
  "No /voice-companion",
] as const;

function hasActionIntent(text: string): boolean {
  const normalized = text.toLowerCase();

  return ACTION_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function toTaskTitle(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "Review voice transcript draft";
  }

  if (normalized.length <= 72) {
    return normalized;
  }

  return `${normalized.slice(0, 69)}...`;
}

function bridgeBoundary(): VoiceActionBridgeBoundary {
  return {
    localOnly: true,
    persisted: false,
    sqlWritten: false,
    aiCalled: false,
    providerCalled: false,
    proposedActionPersisted: false,
    proposedActionExecuted: false,
    requiresHumanConfirmation: true,
    allowedActionTypesOnly: true,
  };
}

export function deriveVoiceActionBridgeCandidate(
  draft: VoiceTranscriptDraft,
): VoiceActionBridgeCandidate {
  if (!draft.transcriptText) {
    return {
      id: `${draft.id}-bridge-empty`,
      decision: "blocked_empty_transcript",
      reason:
        "Transcript draft is empty, so the bridge cannot form a safe review candidate.",
      source:
        draft.source === "typed_text" ? "typed_text_draft" : "voice_transcript_draft",
      transcriptPreview: draft.preview,
      confidence: 0,
      contract: null,
      boundary: bridgeBoundary(),
    };
  }

  if (!hasActionIntent(draft.transcriptText)) {
    return {
      id: `${draft.id}-bridge-no-candidate`,
      decision: "no_candidate",
      reason:
        "Transcript draft is readable, but no clear task-like intent was detected by the local bridge preview.",
      source:
        draft.source === "typed_text" ? "typed_text_draft" : "voice_transcript_draft",
      transcriptPreview: draft.preview,
      confidence: 0.35,
      contract: null,
      boundary: bridgeBoundary(),
    };
  }

  return {
    id: `${draft.id}-bridge-create-task`,
    decision: "create_task_candidate",
    reason:
      "Local deterministic bridge detected task-like intent. Candidate remains review-only until a human confirms it in a later confirmation flow.",
    source:
      draft.source === "typed_text" ? "typed_text_draft" : "voice_transcript_draft",
    transcriptPreview: draft.preview,
    confidence: 0.72,
    contract: {
      action_type: "create_task",
      source: "carnos",
      confidence: 0.72,
      reason:
        "Derived from a reviewed transcript draft by the Phase 14H local bridge preview.",
      evidence_refs: [draft.id],
      payload: {
        title: toTaskTitle(draft.transcriptText),
        description: draft.transcriptText,
        status: "todo",
        priority: "medium",
      },
    },
    boundary: bridgeBoundary(),
  };
}

export function summarizeVoiceActionBridgeCandidate(
  candidate: VoiceActionBridgeCandidate,
): string {
  if (!candidate.contract) {
    return `${candidate.decision}: ${candidate.reason}`;
  }

  return [
    `${candidate.decision}: ${candidate.contract.action_type}`,
    "Candidate is preview-only.",
    "Human confirmation remains required before any save or execution.",
  ].join(" ");
}
