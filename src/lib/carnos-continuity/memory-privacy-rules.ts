import type {
  MemoryDomainScope,
  MemorySensitivityLevel,
  MemoryType,
} from "./memory-enums";

/**
 * Phase 15F — Privacy, Private Mode, Do-Not-Remember Rules.
 *
 * Contract-only privacy rule layer for Carnos memory continuity.
 * This file evaluates privacy settings, private-mode state, and do-not-remember
 * rule previews without approving, persisting, retrieving, embedding, injecting,
 * or executing memory.
 *
 * Audit markers:
 * - private mode blocks memory candidates
 * - do-not-remember rules block memory candidates
 * - ask-every-time memory mode
 * - memory disabled mode
 * - sensitive memory requires review
 * - restricted memory requires explicit allow
 * - redaction preview only
 * - no approval
 * - no persistence
 * - no retrieval
 * - no embeddings
 * - no provider calls
 * - no Supabase calls
 * - no standalone /memory route
 * - no hidden Carnos prompt injection
 * - no automatic transcript-to-memory
 * - Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules
 */

export type MemoryPrivacyMode =
  | "memory_enabled"
  | "ask_every_time"
  | "private_mode"
  | "memory_disabled";

export type MemoryAutoCandidateMode =
  | "manual_only"
  | "suggest_candidates"
  | "blocked";

export type MemoryPrivacyCategory =
  | "profile"
  | "career"
  | "learning"
  | "research"
  | "health_body"
  | "nutrition"
  | "voice"
  | "grimoire"
  | "projects"
  | "source_of_truth"
  | "knowledge"
  | "sensitive"
  | "restricted";

export type MemoryPrivacyDecision =
  | "allowed"
  | "blocked"
  | "restricted_review"
  | "ask_every_time";

export type MemoryPrivacyVisibility =
  | "visible_preview"
  | "redacted_preview"
  | "hidden_preview";

export type MemoryPrivacyRetentionPolicy =
  | "retain_until_review"
  | "session_only"
  | "never_store"
  | "manual_review_required";

export type MemoryPrivacyRulePreview = {
  id: string;
  label: string;
  category: MemoryPrivacyCategory;
  enabled: boolean;
  decision: MemoryPrivacyDecision;
  reason: string;
  redaction_preview?: string;
};

type Phase15FDoNotRememberRulePreview = {
  id: string;
  title: string;
  pattern: string;
  memory_type?: MemoryType;
  domain_scope?: MemoryDomainScope | MemoryPrivacyCategory;
  active: boolean;
  reason: string;
};

export type MemoryPrivacySettingsPreview = {
  mode: MemoryPrivacyMode;
  private_mode_active: boolean;
  auto_candidate_mode: MemoryAutoCandidateMode;
  ask_before_remembering: boolean;
  sensitive_memory_requires_review: boolean;
  restricted_memory_requires_explicit_allow: boolean;
  redaction_enabled: boolean;
  retention_policy: MemoryPrivacyRetentionPolicy;
  blocked_categories: MemoryPrivacyCategory[];
  restricted_categories: MemoryPrivacyCategory[];
};

export type MemoryPrivacyCandidatePreview = {
  id: string;
  title?: string;
  content: string;
  memory_type?: MemoryType;
  domain_scope?: MemoryDomainScope | MemoryPrivacyCategory;
  sensitivity?: MemorySensitivityLevel;
  status?: string;
  private_mode_blocked?: boolean;
  do_not_remember_blocked?: boolean;
};

export type MemoryPrivacyBlockReason =
  | {
      code:
        | "private_mode"
        | "memory_disabled"
        | "do_not_remember_rule"
        | "blocked_category"
        | "restricted_category"
        | "sensitive_review_required";
      message: string;
      rule_id?: string;
    };

export type MemoryPrivacyAuditEventPreview = {
  event_type:
    | "private_mode_enabled"
    | "memory_privacy_evaluated"
    | "do_not_remember_rule_matched"
    | "sensitive_memory_review_required";
  candidate_id: string;
  preview_only: true;
  no_persistence: true;
};

export type MemoryPrivacyEvaluationInput = {
  candidate: MemoryPrivacyCandidatePreview;
  settings?: MemoryPrivacySettingsPreview;
  doNotRememberRules?: Phase15FDoNotRememberRulePreview[];
  privacyRules?: MemoryPrivacyRulePreview[];
};

export type MemoryPrivacyEvaluationResult = {
  candidate_id: string;
  safe_status: MemoryPrivacyDecision;
  visibility: MemoryPrivacyVisibility;
  blocked: boolean;
  requires_review: boolean;
  private_mode_blocks_memory: boolean;
  do_not_remember_blocks_memory: boolean;
  block_reasons: MemoryPrivacyBlockReason[];
  matched_rule_ids: string[];
  redacted_content_preview: string;
  audit_event_preview: MemoryPrivacyAuditEventPreview;
};

export const DEFAULT_MEMORY_PRIVACY_SETTINGS_PREVIEW: MemoryPrivacySettingsPreview = {
  mode: "ask_every_time",
  private_mode_active: false,
  auto_candidate_mode: "suggest_candidates",
  ask_before_remembering: true,
  sensitive_memory_requires_review: true,
  restricted_memory_requires_explicit_allow: true,
  redaction_enabled: true,
  retention_policy: "retain_until_review",
  blocked_categories: [],
  restricted_categories: ["restricted", "sensitive"],
};

export const PHASE_15F_PRIVACY_RULE_BOUNDARY = {
  phase: "Phase 15F",
  name: "Privacy, Private Mode, Do-Not-Remember Rules",
  preview_only: true,
  no_approval: true,
  no_persistence: true,
  no_retrieval: true,
  no_embeddings: true,
  no_provider_calls: true,
  no_supabase_calls: true,
  no_standalone_memory_route: true,
  no_hidden_carnos_prompt_injection: true,
  no_automatic_transcript_to_memory: true,
  next_phase: "Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules",
  boundary_rules: [
    "Preview only: evaluates privacy and memory-control rules without saving.",
    "No approval: this helper never approves memory candidates.",
    "No persistence: this helper never writes to Supabase or local storage.",
    "No retrieval: this helper never loads approved memories.",
    "No embeddings: this helper never creates vectors or calls embedding providers.",
    "No provider calls: this helper never calls any model provider.",
    "No automatic transcript-to-memory: voice transcript drafts remain manual-review only.",
  ],
} as const;

export function createPrivateModeSettingsPreview(
  overrides: Partial<MemoryPrivacySettingsPreview> = {},
): MemoryPrivacySettingsPreview {
  const mode = overrides.mode ?? "private_mode";

  return {
    ...DEFAULT_MEMORY_PRIVACY_SETTINGS_PREVIEW,
    mode,
    private_mode_active: mode === "private_mode",
    auto_candidate_mode: mode === "private_mode" || mode === "memory_disabled" ? "blocked" : "manual_only",
    ask_before_remembering: true,
    retention_policy: mode === "private_mode" ? "session_only" : "retain_until_review",
    ...overrides,
  };
}

export function createDoNotRememberRulePreview(
  input: Partial<Phase15FDoNotRememberRulePreview> & Pick<Phase15FDoNotRememberRulePreview, "pattern">,
): Phase15FDoNotRememberRulePreview {
  return {
    id: input.id ?? `dnr-${slugify(input.pattern)}`,
    title: input.title ?? `Do not remember: ${input.pattern}`,
    pattern: input.pattern,
    memory_type: input.memory_type,
    domain_scope: input.domain_scope,
    active: input.active ?? true,
    reason: input.reason ?? "User-controlled do-not-remember preview rule.",
  };
}

export function evaluateMemoryPrivacyRules(
  input: MemoryPrivacyEvaluationInput,
): MemoryPrivacyEvaluationResult {
  const settings = input.settings ?? DEFAULT_MEMORY_PRIVACY_SETTINGS_PREVIEW;
  const candidate = input.candidate;
  const blockReasons: MemoryPrivacyBlockReason[] = [];
  const matchedRuleIds: string[] = [];

  if (settings.mode === "private_mode" || settings.private_mode_active) {
    blockReasons.push({
      code: "private_mode",
      message: "Private mode blocks memory candidates.",
    });
  }

  if (settings.mode === "memory_disabled") {
    blockReasons.push({
      code: "memory_disabled",
      message: "Memory disabled mode blocks memory candidates.",
    });
  }

  const doNotRememberRules = input.doNotRememberRules ?? [];
  for (const rule of doNotRememberRules) {
    if (!rule.active) {
      continue;
    }

    const patternMatches = normalize(candidate.content).includes(normalize(rule.pattern));
    const typeMatches = !rule.memory_type || rule.memory_type === candidate.memory_type;
    const domainMatches = !rule.domain_scope || rule.domain_scope === candidate.domain_scope;

    if (patternMatches || (typeMatches && domainMatches && Boolean(rule.memory_type || rule.domain_scope))) {
      matchedRuleIds.push(rule.id);
      blockReasons.push({
        code: "do_not_remember_rule",
        rule_id: rule.id,
        message: `Do-not-remember rule matched: ${rule.title}`,
      });
    }
  }

  const privacyRules = input.privacyRules ?? [];
  for (const rule of privacyRules) {
    if (!rule.enabled) {
      continue;
    }

    const category = deriveCandidatePrivacyCategory(candidate);
    if (rule.category !== category && rule.category !== "sensitive" && rule.category !== "restricted") {
      continue;
    }

    if (rule.decision === "blocked") {
      matchedRuleIds.push(rule.id);
      blockReasons.push({
        code: "blocked_category",
        rule_id: rule.id,
        message: rule.reason,
      });
    }

    if (rule.decision === "restricted_review") {
      matchedRuleIds.push(rule.id);
      blockReasons.push({
        code: "restricted_category",
        rule_id: rule.id,
        message: rule.reason,
      });
    }
  }

  const category = deriveCandidatePrivacyCategory(candidate);

  if (settings.blocked_categories.includes(category)) {
    blockReasons.push({
      code: "blocked_category",
      message: `Blocked category: ${category}`,
    });
  }

  if (settings.restricted_categories.includes(category)) {
    blockReasons.push({
      code: "restricted_category",
      message: `Restricted category requires explicit allow: ${category}`,
    });
  }

  if (candidate.sensitivity === "high" && settings.sensitive_memory_requires_review) {
    blockReasons.push({
      code: "sensitive_review_required",
      message: "Sensitive memory requires review.",
    });
  }

  if (candidate.sensitivity === "restricted" && settings.restricted_memory_requires_explicit_allow) {
    blockReasons.push({
      code: "restricted_category",
      message: "Restricted memory requires explicit allow.",
    });
  }

  const blocked = blockReasons.some((reason) =>
    ["private_mode", "memory_disabled", "do_not_remember_rule", "blocked_category"].includes(reason.code),
  );

  const requiresReview =
    settings.mode === "ask_every_time" ||
    blockReasons.some((reason) =>
      ["restricted_category", "sensitive_review_required"].includes(reason.code),
    );

  const safeStatus: MemoryPrivacyDecision = blocked
    ? "blocked"
    : requiresReview
      ? settings.mode === "ask_every_time"
        ? "ask_every_time"
        : "restricted_review"
      : "allowed";

  const visibility: MemoryPrivacyVisibility =
    blocked || candidate.sensitivity === "restricted"
      ? "hidden_preview"
      : settings.redaction_enabled && candidate.sensitivity === "high"
        ? "redacted_preview"
        : "visible_preview";

  return {
    candidate_id: candidate.id,
    safe_status: safeStatus,
    visibility,
    blocked,
    requires_review: requiresReview,
    private_mode_blocks_memory: blockReasons.some((reason) => reason.code === "private_mode"),
    do_not_remember_blocks_memory: blockReasons.some((reason) => reason.code === "do_not_remember_rule"),
    block_reasons: blockReasons,
    matched_rule_ids: matchedRuleIds,
    redacted_content_preview:
      visibility === "visible_preview" ? candidate.content : redactContentPreview(candidate.content),
    audit_event_preview: {
      event_type: blockReasons.some((reason) => reason.code === "do_not_remember_rule")
        ? "do_not_remember_rule_matched"
        : blockReasons.some((reason) => reason.code === "private_mode")
          ? "private_mode_enabled"
          : requiresReview
            ? "sensitive_memory_review_required"
            : "memory_privacy_evaluated",
      candidate_id: candidate.id,
      preview_only: true,
      no_persistence: true,
    },
  };
}

function deriveCandidatePrivacyCategory(candidate: MemoryPrivacyCandidatePreview): MemoryPrivacyCategory {
  if (candidate.sensitivity === "restricted") {
    return "restricted";
  }

  if (candidate.sensitivity === "high") {
    return "sensitive";
  }

  const domain = String(candidate.domain_scope ?? "");

  if (domain === "body" || domain === "health_body" || domain === "supplements" || domain === "sleep_energy" || domain === "emotion" || domain === "hair_skincare") {
    return "health_body";
  }

  if (domain === "career" || domain === "resume" || domain === "interviews" || domain === "networking") {
    return "career";
  }

  if (domain === "research" || domain === "research_lab" || domain === "research_stanford") {
    return "research";
  }

  if (domain === "voice") {
    return "voice";
  }

  if (domain === "source_of_truth") {
    return "source_of_truth";
  }

  if (domain === "project" || domain === "projects") {
    return "projects";
  }

  if (domain === "nutrition") {
    return "nutrition";
  }

  if (domain === "learning") {
    return "learning";
  }

  if (domain === "grimoire") {
    return "grimoire";
  }

  if (domain === "knowledge") {
    return "knowledge";
  }

  return "profile";
}

function redactContentPreview(content: string): string {
  const trimmed = content.trim();

  if (!trimmed) {
    return "[redacted empty preview]";
  }

  const visiblePrefix = trimmed.slice(0, 24);
  return `${visiblePrefix}${trimmed.length > 24 ? "…" : ""} [redacted preview only]`;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function slugify(value: string): string {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "rule";
}
