/**
 * Phase 15D — Memory Candidate Engine.
 *
 * This module creates local memory-candidate previews only.
 *
 * It can:
 * - normalize user/manual/chat/voice/project/system/source inputs
 * - classify memory type
 * - classify sensitivity
 * - assign confidence and priority
 * - attach provenance
 * - block candidates when private mode or do-not-remember rules apply
 * - detect lightweight duplicate/conflict hints
 *
 * It cannot:
 * - approve memory
 * - persist memory
 * - retrieve memory
 * - embed memory
 * - inject Carnos context
 * - call AI/providers
 * - create background jobs
 */

import {
  MEMORY_DOMAIN_SCOPES,
  MEMORY_SOURCE_TYPES,
  MEMORY_TYPES,
  type MemoryDomainScope,
  type MemorySensitivityLevel,
  type MemorySourceType,
  type MemoryStatus,
  type MemoryType,
} from "./memory-enums";
import type {
  MemoryCandidateContract,
  MemoryId,
  MemoryProvenance,
  MemoryReviewMetadata,
  UserId,
} from "./memory-contracts";

export interface MemoryCandidateEngineInput {
  user_id: UserId;
  raw_text: string;
  source_type: MemorySourceType;
  source_table?: string;
  source_id?: string;
  source_route?: string;
  source_phase?: string;
  source_commit?: string;
  source_label?: string;
  requested_memory_type?: MemoryType;
  requested_domain_scope?: MemoryDomainScope;
  requested_sensitivity?: MemorySensitivityLevel;
  private_mode_active?: boolean;
  do_not_remember_rules?: MemoryDoNotRememberRulePreview[];
  existing_memory_previews?: ExistingMemoryPreview[];
}

export interface MemoryDoNotRememberRulePreview {
  id?: string;
  rule_label: string;
  rule_scope: MemoryDomainScope | "all";
  blocked_memory_types?: MemoryType[];
  blocked_source_types?: MemorySourceType[];
  blocked_keywords?: string[];
  is_active: boolean;
}

export interface ExistingMemoryPreview {
  id: MemoryId;
  memory_type: MemoryType;
  title: string;
  content: string;
  domain_scope: MemoryDomainScope;
  sensitivity: MemorySensitivityLevel;
}

export interface MemoryCandidateEngineResult {
  candidate: MemoryCandidateContract;
  duplicate_hints: MemoryDuplicateHint[];
  conflict_hints: MemoryConflictHint[];
  blocked_reasons: MemoryCandidateBlockedReason[];
  warnings: string[];
}

export interface MemoryDuplicateHint {
  memory_id: MemoryId;
  reason: string;
  score: number;
}

export interface MemoryConflictHint {
  memory_id: MemoryId;
  reason: string;
  severity: "low" | "medium" | "high";
}

export interface MemoryCandidateBlockedReason {
  code: "private_mode" | "do_not_remember_rule" | "empty_content";
  message: string;
  rule_id?: string;
  rule_label?: string;
}

const HEALTH_KEYWORDS = [
  "health",
  "medical",
  "doctor",
  "diagnosis",
  "medicine",
  "supplement",
  "dosage",
  "weight",
  "skin",
  "hair",
  "mental",
  "emotion",
  "sleep",
  "energy",
  "body",
];

const CAREER_KEYWORDS = [
  "job",
  "career",
  "resume",
  "interview",
  "application",
  "referral",
  "recruiter",
  "company",
  "offer",
];

const RESEARCH_KEYWORDS = [
  "research",
  "paper",
  "professor",
  "publication",
  "stanford",
  "phd",
  "experiment",
  "citation",
];

const GRIMOIRE_KEYWORDS = [
  "grimoire",
  "mode",
  "throne",
  "mission",
  "corruption",
  "symbol",
  "ascend",
];

const PREFERENCE_KEYWORDS = [
  "prefer",
  "from now on",
  "going forward",
  "always",
  "usually",
  "i like",
  "i want you to",
];

const DO_NOT_REMEMBER_KEYWORDS = [
  "do not remember",
  "don't remember",
  "forget this",
  "do not store",
  "don't store",
  "private",
];

function normalizeText(rawText: string): string {
  return rawText.replace(/\s+/g, " ").trim();
}

function includesAny(text: string, keywords: readonly string[]): boolean {
  const lowered = text.toLowerCase();
  return keywords.some((keyword) => lowered.includes(keyword));
}

function clamp(input: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, input));
}

export function deriveMemoryTypeFromText(
  text: string,
  requested?: MemoryType,
): MemoryType {
  if (requested && MEMORY_TYPES.includes(requested)) {
    return requested;
  }

  const lowered = text.toLowerCase();

  if (includesAny(lowered, DO_NOT_REMEMBER_KEYWORDS)) {
    return "do_not_remember_rule";
  }

  if (includesAny(lowered, PREFERENCE_KEYWORDS)) {
    return "preference";
  }

  if (includesAny(lowered, CAREER_KEYWORDS)) {
    return "career_context";
  }

  if (includesAny(lowered, HEALTH_KEYWORDS)) {
    return "health_context";
  }

  if (includesAny(lowered, RESEARCH_KEYWORDS)) {
    return "research_note";
  }

  if (includesAny(lowered, GRIMOIRE_KEYWORDS)) {
    return "grimoire_context";
  }

  if (
    lowered.includes("phase") ||
    lowered.includes("commit") ||
    lowered.includes("source of truth") ||
    lowered.includes("source-of-truth")
  ) {
    return "project_fact";
  }

  if (
    lowered.includes("goal") ||
    lowered.includes("target") ||
    lowered.includes("objective")
  ) {
    return "goal";
  }

  return "conversation_continuity";
}

export function deriveDomainScopeFromInput(
  text: string,
  sourceRoute?: string,
  requested?: MemoryDomainScope,
): MemoryDomainScope {
  if (requested && MEMORY_DOMAIN_SCOPES.includes(requested)) {
    return requested;
  }

  const route = sourceRoute?.replace("/", "") ?? "";
  if (MEMORY_DOMAIN_SCOPES.includes(route as MemoryDomainScope)) {
    return route as MemoryDomainScope;
  }

  const lowered = text.toLowerCase();

  if (includesAny(lowered, CAREER_KEYWORDS)) {
    return "career";
  }

  if (includesAny(lowered, HEALTH_KEYWORDS)) {
    return "body";
  }

  if (includesAny(lowered, RESEARCH_KEYWORDS)) {
    return "research";
  }

  if (includesAny(lowered, GRIMOIRE_KEYWORDS)) {
    return "grimoire";
  }

  if (lowered.includes("privacy") || lowered.includes("do not remember")) {
    return "privacy";
  }

  if (lowered.includes("knowledge") || lowered.includes("document")) {
    return "knowledge";
  }

  return "global";
}

export function deriveSensitivityFromText(
  text: string,
  memoryType: MemoryType,
  requested?: MemorySensitivityLevel,
): MemorySensitivityLevel {
  if (requested) {
    return requested;
  }

  const lowered = text.toLowerCase();

  if (
    memoryType === "do_not_remember_rule" ||
    memoryType === "privacy_rule" ||
    lowered.includes("password") ||
    lowered.includes("secret") ||
    lowered.includes("private key") ||
    lowered.includes("ssn") ||
    lowered.includes("social security")
  ) {
    return "restricted";
  }

  if (
    memoryType === "health_context" ||
    memoryType === "sensitive_note" ||
    memoryType === "voice_transcript_candidate" ||
    includesAny(lowered, HEALTH_KEYWORDS)
  ) {
    return "high";
  }

  if (
    memoryType === "career_context" ||
    memoryType === "research_note" ||
    memoryType === "user_profile_fact" ||
    memoryType === "grimoire_context"
  ) {
    return "medium";
  }

  return "low";
}

export function deriveCandidateTitle(text: string, memoryType: MemoryType): string {
  const compact = normalizeText(text);
  const preview = compact.length > 72 ? `${compact.slice(0, 69)}...` : compact;

  if (!preview) {
    return `Empty ${memoryType} candidate`;
  }

  return `${memoryType}: ${preview}`;
}

export function buildMemoryProvenance(
  input: MemoryCandidateEngineInput,
): MemoryProvenance {
  return {
    source_type: input.source_type,
    source_table: input.source_table,
    source_id: input.source_id,
    source_route: input.source_route,
    source_phase: input.source_phase,
    source_commit: input.source_commit,
    source_label: input.source_label,
    captured_at: new Date().toISOString(),
  };
}

export function buildMemoryReviewMetadata(
  text: string,
  memoryType: MemoryType,
  sensitivity: MemorySensitivityLevel,
  blocked: boolean,
): MemoryReviewMetadata {
  const lengthBoost = clamp(text.length / 240, 0, 0.2);
  const confidence = blocked ? 0 : clamp(0.62 + lengthBoost, 0, 0.82);

  const basePriority =
    memoryType === "do_not_remember_rule" || memoryType === "privacy_rule"
      ? 100
      : memoryType === "project_decision" || memoryType === "source_of_truth_note"
        ? 90
        : memoryType === "goal" || memoryType === "project_fact"
          ? 75
          : sensitivity === "high" || sensitivity === "restricted"
            ? 70
            : 55;

  return {
    confidence,
    priority: basePriority,
    sensitivity,
    staleness: "fresh",
    conflict_severity: "none",
    visibility: sensitivity === "restricted" ? "visible_source" : "visible_summary",
  };
}

export function detectCandidateBlockedReasons(
  text: string,
  memoryType: MemoryType,
  sourceType: MemorySourceType,
  domainScope: MemoryDomainScope,
  privateModeActive: boolean,
  rules: readonly MemoryDoNotRememberRulePreview[],
): MemoryCandidateBlockedReason[] {
  const reasons: MemoryCandidateBlockedReason[] = [];

  if (!normalizeText(text)) {
    reasons.push({
      code: "empty_content",
      message: "Empty memory content cannot become a candidate.",
    });
  }

  if (privateModeActive) {
    reasons.push({
      code: "private_mode",
      message: "Private mode is active, so memory candidate creation is blocked.",
    });
  }

  for (const rule of rules) {
    if (!rule.is_active) {
      continue;
    }

    const scopeMatches = rule.rule_scope === "all" || rule.rule_scope === domainScope;
    const typeMatches =
      !rule.blocked_memory_types?.length ||
      rule.blocked_memory_types.includes(memoryType);
    const sourceMatches =
      !rule.blocked_source_types?.length ||
      rule.blocked_source_types.includes(sourceType);
    const keywordMatches =
      !rule.blocked_keywords?.length ||
      includesAny(text, rule.blocked_keywords);

    if (scopeMatches && typeMatches && sourceMatches && keywordMatches) {
      reasons.push({
        code: "do_not_remember_rule",
        message: "A do-not-remember rule blocks this candidate.",
        rule_id: rule.id,
        rule_label: rule.rule_label,
      });
    }
  }

  return reasons;
}

export function detectDuplicateHints(
  text: string,
  memoryType: MemoryType,
  existing: readonly ExistingMemoryPreview[],
): MemoryDuplicateHint[] {
  const normalized = normalizeText(text).toLowerCase();

  if (!normalized) {
    return [];
  }

  return existing
    .map((memory) => {
      const existingText = normalizeText(`${memory.title} ${memory.content}`).toLowerCase();
      const sameType = memory.memory_type === memoryType;
      const exact = existingText.includes(normalized) || normalized.includes(existingText);
      const sharedWords = normalized
        .split(" ")
        .filter((word) => word.length > 4 && existingText.includes(word)).length;

      const score = exact ? 1 : clamp(sharedWords / 8 + (sameType ? 0.2 : 0), 0, 0.95);

      return {
        memory_id: memory.id,
        reason: exact
          ? "Candidate appears to duplicate an existing memory."
          : "Candidate shares important terms with an existing memory.",
        score,
      };
    })
    .filter((hint) => hint.score >= 0.45)
    .sort((left, right) => right.score - left.score);
}

export function detectConflictHints(
  text: string,
  memoryType: MemoryType,
  existing: readonly ExistingMemoryPreview[],
): MemoryConflictHint[] {
  const lowered = text.toLowerCase();

  const conflictWords = ["instead", "no longer", "changed", "not anymore", "replace", "actually"];
  const likelyConflict = includesAny(lowered, conflictWords);

  if (!likelyConflict) {
    return [];
  }

  return existing
    .filter((memory) => memory.memory_type === memoryType)
    .map((memory) => ({
      memory_id: memory.id,
      reason:
        "Candidate uses replacement/change language and may conflict with an existing memory of the same type.",
      severity: "medium" as const,
    }));
}

export function createMemoryCandidatePreview(
  input: MemoryCandidateEngineInput,
): MemoryCandidateEngineResult {
  if (!MEMORY_SOURCE_TYPES.includes(input.source_type)) {
    throw new Error("Invalid memory candidate source_type.");
  }

  const content = normalizeText(input.raw_text);
  const memoryType = deriveMemoryTypeFromText(content, input.requested_memory_type);
  const domainScope = deriveDomainScopeFromInput(
    content,
    input.source_route,
    input.requested_domain_scope,
  );
  const sensitivity = deriveSensitivityFromText(
    content,
    memoryType,
    input.requested_sensitivity,
  );

  const blockedReasons = detectCandidateBlockedReasons(
    content,
    memoryType,
    input.source_type,
    domainScope,
    input.private_mode_active ?? false,
    input.do_not_remember_rules ?? [],
  );

  const privateModeBlocked = blockedReasons.some((reason) => reason.code === "private_mode");
  const doNotRememberBlocked = blockedReasons.some(
    (reason) => reason.code === "do_not_remember_rule",
  );
  const blocked = blockedReasons.length > 0;

  const status: MemoryStatus = privateModeBlocked
    ? "blocked_by_private_mode"
    : doNotRememberBlocked
      ? "blocked_by_do_not_remember"
      : "candidate";

  const duplicateHints = detectDuplicateHints(
    content,
    memoryType,
    input.existing_memory_previews ?? [],
  );
  const conflictHints = detectConflictHints(
    content,
    memoryType,
    input.existing_memory_previews ?? [],
  );

  const candidate: MemoryCandidateContract = {
    kind: "memory_candidate",
    user_id: input.user_id,
    memory_type: memoryType,
    status,
    title: deriveCandidateTitle(content, memoryType),
    content,
    domain_scope: domainScope,
    provenance: buildMemoryProvenance(input),
    review: buildMemoryReviewMetadata(content, memoryType, sensitivity, blocked),
    private_mode_blocked: privateModeBlocked,
    do_not_remember_blocked: doNotRememberBlocked,
    duplicate_of_memory_id: duplicateHints[0]?.memory_id,
    conflicts_with_memory_ids: conflictHints.map((hint) => hint.memory_id),
  };

  const warnings = [
    ...blockedReasons.map((reason) => reason.message),
    ...(duplicateHints.length > 0
      ? ["Potential duplicate memory should be reviewed before approval."]
      : []),
    ...(conflictHints.length > 0
      ? ["Potential memory conflict should be resolved before approval."]
      : []),
    ...(sensitivity === "high" || sensitivity === "restricted"
      ? ["Sensitive candidate requires careful review before approval."]
      : []),
  ];

  return {
    candidate,
    duplicate_hints: duplicateHints,
    conflict_hints: conflictHints,
    blocked_reasons: blockedReasons,
    warnings,
  };
}

export const PHASE_15D_MEMORY_CANDIDATE_SOURCE_MARKERS = [
  "voice_transcript_draft",
  "manual_remember",
  "manual_do_not_remember",
  "source_of_truth",
] as const;

export const PHASE_15D_MEMORY_CANDIDATE_ENGINE_BOUNDARY = [
  "candidate preview only",
  "no approval",
  "no persistence",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no automatic transcript-to-memory",
  "no hidden Carnos prompt injection",
] as const;
