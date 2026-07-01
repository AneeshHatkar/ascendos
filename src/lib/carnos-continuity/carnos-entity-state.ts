import type { CarnosEntityStateContract } from "./memory-contracts";

/**
 * Phase 15H — Carnos Entity State.
 *
 * Preview-only Carnos entity state layer for ascendOS.
 * This file shapes Carnos role, mission, tone, current operating mode,
 * current phase, latest milestone, next objective, response preferences,
 * memory policy, voice policy, action policy, source-of-truth policy,
 * and forbidden behaviors.
 *
 * Audit markers:
 * - Carnos Entity State
 * - Carnos persistent AI persona/entity inside ascendOS
 * - Carnos name
 * - Carnos role
 * - Carnos mission
 * - Carnos tone
 * - Carnos current mode
 * - Carnos current phase
 * - latest milestone
 * - next objective
 * - forbidden behaviors
 * - response preferences
 * - memory policy
 * - voice policy
 * - action policy
 * - source-of-truth policy
 * - preview only
 * - no approval
 * - no persistence
 * - no Supabase calls
 * - no SQL reads or writes
 * - no retrieval
 * - no embeddings
 * - no provider calls
 * - no hidden Carnos prompt injection
 * - no context pack builder
 * - no standalone /memory route
 * - Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy
 */

export type CarnosEntityModePreview =
  | "architect"
  | "operator"
  | "coach"
  | "research_partner"
  | "execution_guardian"
  | "reflection_companion"
  | "private_mode_limited";

export type CarnosEntityStateHealth =
  | "ready"
  | "needs_review"
  | "privacy_limited"
  | "source_of_truth_required";

export type CarnosEntityPolicyCheck = {
  id: string;
  label: string;
  status: "locked" | "needs_review" | "deferred";
  reason: string;
};

export type CarnosEntityStatePreview = CarnosEntityStateContract & {
  preview_id: string;
  mode_label: string;
  state_health: CarnosEntityStateHealth;
  policy_checks: CarnosEntityPolicyCheck[];
  boundary_notes: string[];
  next_phase: "Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy";
};

export type CarnosEntityStateInput = Partial<
  Omit<
    CarnosEntityStateContract,
    "kind" | "user_id" | "carnos_name" | "app_name"
  >
> & {
  user_id?: string;
};

export type CarnosEntityStateSummary = {
  carnos_name: "Carnos";
  app_name: "ascendOS";
  role: string;
  mission: string;
  tone: string;
  current_mode: string;
  current_phase: string;
  latest_milestone: string;
  next_objective: string;
  state_health: CarnosEntityStateHealth;
  policy_check_count: number;
  locked_policy_count: number;
  needs_review_count: number;
  boundary_count: number;
};

export const DEFAULT_CARNOS_ENTITY_STATE_PREVIEW: CarnosEntityStatePreview = {
  kind: "carnos_entity_state",
  preview_id: "phase-15h-carnos-entity-state-preview",
  user_id: "preview-user",
  carnos_name: "Carnos",
  app_name: "ascendOS",
  role:
    "Persistent AI operating companion for ascendOS, focused on continuity, clarity, planning, and safe execution support.",
  mission:
    "Help the user convert goals, projects, routines, research, health/body context, and life systems into grounded next actions while respecting confirmation-before-write and memory-control boundaries.",
  tone:
    "Direct, grounded, high-agency, protective of user control, and honest about uncertainty.",
  current_mode: "architect",
  mode_label: "Architect mode",
  active_project: "ascendOS + Carnos",
  current_phase: "Phase 15H — Carnos Entity State",
  latest_milestone: "Phase 15G approved memory read layer committed and pushed.",
  next_objective:
    "Lock Carnos entity state preview before project/system state memory and source-of-truth hierarchy.",
  forbidden_behaviors: [
    "No hidden Carnos prompt injection.",
    "No silent memory retrieval.",
    "No autonomous SQL writes.",
    "No direct approval of memory candidates.",
    "No automatic transcript-to-memory conversion.",
    "No provider calls from this preview layer.",
    "No embeddings or vector creation.",
    "No standalone /memory route.",
  ],
  response_preferences: [
    "Explain each implementation step before commands.",
    "Use exact terminal commands.",
    "Keep implementation chunk boundaries small and auditable.",
    "Prefer full repo validation before commit.",
    "Push after each completed chunk.",
  ],
  memory_policy: [
    "Memory remains user-controlled.",
    "Candidate creation, approval, retrieval, forgetting, and context packing stay separated by phase.",
    "Private mode and do-not-remember rules must override convenience.",
    "Approved memory reads must remain transparent and ranked by deterministic rules.",
  ],
  voice_policy: [
    "Voice transcripts are draft-only until explicitly reviewed.",
    "No automatic transcript-to-memory conversion.",
    "No audio persistence or provider calls from memory/entity-state helpers.",
  ],
  action_policy: [
    "Carnos may suggest proposed actions only through confirmation-gated flows.",
    "No direct execution from entity state preview.",
    "No background jobs or autonomous lifecycle callbacks.",
  ],
  source_of_truth_policy: [
    "FINAL_SYNCED DOCX/JSON are source of truth.",
    "Old 15-phase roadmap is outdated.",
    "JSON chunks 0–21 remain active.",
    "Source-of-truth, repo logs, phase reports, and audit reports outrank casual chat memory.",
  ],
  state_health: "ready",
  policy_checks: [
    {
      id: "policy-memory-control",
      label: "Memory control",
      status: "locked",
      reason: "Memory approval, retrieval, forgetting, and context packing remain separated.",
    },
    {
      id: "policy-confirmation-before-write",
      label: "Confirmation before write",
      status: "locked",
      reason: "Entity state preview does not execute or persist actions.",
    },
    {
      id: "policy-source-of-truth",
      label: "Source-of-truth hierarchy",
      status: "locked",
      reason: "FINAL_SYNCED files and repo evidence outrank stale roadmap memory.",
    },
    {
      id: "policy-context-pack",
      label: "Context pack builder",
      status: "deferred",
      reason: "Context pack construction remains deferred to Phase 15J.",
    },
  ],
  boundary_notes: [
    "Carnos entity state preview only.",
    "No approval.",
    "No persistence.",
    "No Supabase calls.",
    "No SQL reads or writes.",
    "No retrieval.",
    "No embeddings.",
    "No provider calls.",
    "No hidden Carnos prompt injection.",
    "No context pack builder.",
    "No standalone /memory route.",
  ],
  next_phase: "Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy",
};

export const PHASE_15H_CARNOS_ENTITY_STATE_BOUNDARY = {
  phase: "Phase 15H",
  name: "Carnos Entity State",
  preview_only: true,
  no_approval: true,
  no_persistence: true,
  no_supabase_calls: true,
  no_sql_reads_or_writes: true,
  no_retrieval: true,
  no_embeddings: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_context_pack_builder: true,
  no_standalone_memory_route: true,
  next_phase: "Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy",
} as const;

function normalizeMode(mode: string | undefined): CarnosEntityModePreview {
  const value = (mode ?? "").trim();

  if (
    value === "architect" ||
    value === "operator" ||
    value === "coach" ||
    value === "research_partner" ||
    value === "execution_guardian" ||
    value === "reflection_companion" ||
    value === "private_mode_limited"
  ) {
    return value;
  }

  return "architect";
}

function labelForMode(mode: CarnosEntityModePreview): string {
  switch (mode) {
    case "architect":
      return "Architect mode";
    case "operator":
      return "Operator mode";
    case "coach":
      return "Coach mode";
    case "research_partner":
      return "Research partner mode";
    case "execution_guardian":
      return "Execution guardian mode";
    case "reflection_companion":
      return "Reflection companion mode";
    case "private_mode_limited":
      return "Private-mode limited";
  }
}

function uniqueList(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const cleaned = value.trim();

    if (cleaned.length === 0 || seen.has(cleaned)) {
      continue;
    }

    seen.add(cleaned);
    output.push(cleaned);
  }

  return output;
}

export function createCarnosEntityStatePreview(
  input: CarnosEntityStateInput = {},
): CarnosEntityStatePreview {
  const currentMode = normalizeMode(input.current_mode);
  const base = DEFAULT_CARNOS_ENTITY_STATE_PREVIEW;

  const forbiddenBehaviors = uniqueList([
    ...(input.forbidden_behaviors ?? []),
    ...base.forbidden_behaviors,
  ]);

  const responsePreferences = uniqueList([
    ...(input.response_preferences ?? []),
    ...base.response_preferences,
  ]);

  const memoryPolicy = uniqueList([...(input.memory_policy ?? []), ...base.memory_policy]);
  const voicePolicy = uniqueList([...(input.voice_policy ?? []), ...base.voice_policy]);
  const actionPolicy = uniqueList([...(input.action_policy ?? []), ...base.action_policy]);
  const sourceOfTruthPolicy = uniqueList([
    ...(input.source_of_truth_policy ?? []),
    ...base.source_of_truth_policy,
  ]);

  const policyChecks = evaluateCarnosEntityStatePolicies({
    ...base,
    ...input,
    kind: "carnos_entity_state",
    user_id: input.user_id ?? base.user_id,
    carnos_name: "Carnos",
    app_name: "ascendOS",
    current_mode: currentMode,
    forbidden_behaviors: forbiddenBehaviors,
    response_preferences: responsePreferences,
    memory_policy: memoryPolicy,
    voice_policy: voicePolicy,
    action_policy: actionPolicy,
    source_of_truth_policy: sourceOfTruthPolicy,
  });

  const needsReview = policyChecks.some((check) => check.status === "needs_review");
  const deferredOnly = policyChecks.some((check) => check.status === "deferred");

  return {
    ...base,
    ...input,
    kind: "carnos_entity_state",
    preview_id: base.preview_id,
    user_id: input.user_id ?? base.user_id,
    carnos_name: "Carnos",
    app_name: "ascendOS",
    current_mode: currentMode,
    mode_label: labelForMode(currentMode),
    current_phase: input.current_phase ?? base.current_phase,
    latest_milestone: input.latest_milestone ?? base.latest_milestone,
    next_objective: input.next_objective ?? base.next_objective,
    forbidden_behaviors: forbiddenBehaviors,
    response_preferences: responsePreferences,
    memory_policy: memoryPolicy,
    voice_policy: voicePolicy,
    action_policy: actionPolicy,
    source_of_truth_policy: sourceOfTruthPolicy,
    policy_checks: policyChecks,
    state_health: needsReview
      ? "needs_review"
      : currentMode === "private_mode_limited"
        ? "privacy_limited"
        : deferredOnly
          ? "source_of_truth_required"
          : "ready",
    boundary_notes: base.boundary_notes,
    next_phase: "Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy",
  };
}

export function evaluateCarnosEntityStatePolicies(
  state: CarnosEntityStateContract,
): CarnosEntityPolicyCheck[] {
  const checks: CarnosEntityPolicyCheck[] = [];

  checks.push({
    id: "carnos-identity",
    label: "Carnos identity",
    status:
      state.carnos_name === "Carnos" && state.app_name === "ascendOS"
        ? "locked"
        : "needs_review",
    reason:
      state.carnos_name === "Carnos" && state.app_name === "ascendOS"
        ? "Carnos identity is locked to the ascendOS entity contract."
        : "Carnos identity must remain Carnos inside ascendOS.",
  });

  checks.push({
    id: "memory-policy",
    label: "Memory policy",
    status:
      state.memory_policy.some((item) => item.toLowerCase().includes("user-controlled")) ||
      state.memory_policy.some((item) => item.toLowerCase().includes("private mode"))
        ? "locked"
        : "needs_review",
    reason: "Memory policy must preserve user control, privacy, and phase separation.",
  });

  checks.push({
    id: "voice-policy",
    label: "Voice policy",
    status:
      state.voice_policy.some((item) =>
        item.toLowerCase().includes("no automatic transcript-to-memory"),
      )
        ? "locked"
        : "needs_review",
    reason: "Voice policy must prevent automatic transcript-to-memory conversion.",
  });

  checks.push({
    id: "action-policy",
    label: "Action policy",
    status:
      state.action_policy.some((item) => item.toLowerCase().includes("confirmation"))
        ? "locked"
        : "needs_review",
    reason: "Action policy must preserve confirmation-before-write.",
  });

  checks.push({
    id: "source-of-truth-policy",
    label: "Source-of-truth policy",
    status:
      state.source_of_truth_policy.some((item) => item.includes("FINAL_SYNCED")) &&
      state.source_of_truth_policy.some((item) => item.includes("JSON chunks 0–21"))
        ? "locked"
        : "needs_review",
    reason: "Source-of-truth policy must lock FINAL_SYNCED files and JSON chunks 0–21.",
  });

  checks.push({
    id: "context-pack-deferred",
    label: "Context pack builder",
    status: "deferred",
    reason: "Current context pack builder remains deferred to Phase 15J.",
  });

  return checks;
}

export function summarizeCarnosEntityState(
  state: CarnosEntityStatePreview,
): CarnosEntityStateSummary {
  const lockedPolicyCount = state.policy_checks.filter(
    (check) => check.status === "locked",
  ).length;
  const needsReviewCount = state.policy_checks.filter(
    (check) => check.status === "needs_review",
  ).length;

  return {
    carnos_name: state.carnos_name,
    app_name: state.app_name,
    role: state.role,
    mission: state.mission,
    tone: state.tone,
    current_mode: state.current_mode,
    current_phase: state.current_phase ?? "Not set",
    latest_milestone: state.latest_milestone ?? "Not set",
    next_objective: state.next_objective ?? "Not set",
    state_health: state.state_health,
    policy_check_count: state.policy_checks.length,
    locked_policy_count: lockedPolicyCount,
    needs_review_count: needsReviewCount,
    boundary_count: state.boundary_notes.length,
  };
}

export function createDefaultCarnosEntityStateSummary(): CarnosEntityStateSummary {
  return summarizeCarnosEntityState(DEFAULT_CARNOS_ENTITY_STATE_PREVIEW);
}
