/**
 * Phase 17M — Retrieval Audit Trail + Retrieval Explanation
 *
 * Deterministic preview-only retrieval audit trail and explanation builder.
 *
 * Boundary:
 * - Pure TypeScript audit/explanation planning only.
 * - No Supabase calls.
 * - No repository implementation.
 * - No SQL reads or writes.
 * - No memory_retrieval_events writes.
 * - No runtime retrieval.
 * - No embedding generation.
 * - No semantic retrieval activation.
 * - No provider calls.
 * - No vector search.
 * - No Carnos prompt/context injection.
 * - No background scanning.
 */

import type {
  MemoryRetrievalRankedCandidate,
  MemoryRetrievalRankingBudgetDedupeResult,
} from "./memory-retrieval-ranking-budget-dedupe";
import type {
  CarnosMemoryContextPackBuilderResult,
  CarnosMemoryContextPackItem,
  CarnosMemoryContextPackSection,
} from "./carnos-memory-context-pack-builder";

export type RetrievalAuditTrailEventKind =
  | "retrieval_plan_received"
  | "candidate_included"
  | "candidate_excluded"
  | "candidate_deduped"
  | "candidate_budget_limited"
  | "candidate_sensitive_blocked"
  | "candidate_conflict_blocked"
  | "context_pack_section_created"
  | "context_pack_item_included"
  | "context_pack_item_excluded"
  | "explanation_generated"
  | "runtime_write_deferred";

export type RetrievalAuditTrailSeverity =
  | "info"
  | "warning"
  | "blocked"
  | "deferred";

export type RetrievalExplanationAudience =
  | "user"
  | "developer"
  | "audit"
  | "carnos_preview";

export interface RetrievalAuditTrailOptions {
  audience?: RetrievalExplanationAudience;
  include_excluded_candidates?: boolean;
  include_context_pack_items?: boolean;
  include_reason_details?: boolean;
  include_warnings?: boolean;
  max_events?: number;
  max_explanation_lines?: number;
}

export interface RetrievalAuditTrailReason {
  code:
    | "retrieval_audit_trail_explanation"
    | "phase_17i_plan_explained"
    | "phase_17l_context_pack_explained"
    | "candidate_inclusion_reason_visible"
    | "candidate_exclusion_reason_visible"
    | "context_pack_reason_visible"
    | "budget_reason_visible"
    | "dedupe_reason_visible"
    | "sensitive_lock_reason_visible"
    | "conflict_reason_visible"
    | "runtime_write_deferred"
    | "preview_only_explanation"
    | "no_persistence_performed"
    | "visible_audit_reason";
  message: string;
}

export interface RetrievalAuditTrailEvent {
  id: string;
  kind: RetrievalAuditTrailEventKind;
  severity: RetrievalAuditTrailSeverity;
  title: string;
  detail: string;
  subject_id?: string;
  subject_title?: string;
  score?: number;
  reasons: RetrievalAuditTrailReason[];
  warnings: string[];
  preview_only: true;
}

export interface RetrievalExplanationSummary {
  audience: RetrievalExplanationAudience;
  plain_language_summary: string[];
  included_summary: string[];
  excluded_summary: string[];
  budget_summary: string[];
  safety_summary: string[];
  limitations: string[];
  preview_only: true;
}

export interface RetrievalAuditTrailPreviewResult {
  phase: "17M";
  builder: "retrieval_audit_trail_explanation";
  runtime_side_effects_enabled: false;
  runtime_retrieval_enabled: false;
  semantic_retrieval_active: false;
  provider_calls_enabled: false;
  vector_search_enabled: false;
  sql_runtime_enabled: false;
  memory_retrieval_events_write_count: 0;
  carnos_prompt_injection_enabled: false;
  total_input_plans: number;
  total_included_candidates: number;
  total_excluded_candidates: number;
  total_context_pack_sections: number;
  total_context_pack_items: number;
  audit_events: RetrievalAuditTrailEvent[];
  explanation: RetrievalExplanationSummary;
  summary: string[];
  warnings: string[];
  boundary: typeof PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_BOUNDARY;
}

export const PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_BOUNDARY = {
  phase: "Phase 17M",
  name: "Retrieval Audit Trail + Retrieval Explanation",
  deterministic_only: true,
  audit_trail_preview_only: true,
  explanation_preview_only: true,
  retrieval_audit_trail_explanation: true,
  uses_phase_17i_retrieval_planning_outputs: true,
  uses_phase_17l_context_pack_outputs: true,
  visible_retrieval_explanations: true,
  visible_inclusion_reasons: true,
  visible_exclusion_reasons: true,
  visible_budget_reasons: true,
  visible_dedupe_reasons: true,
  visible_safety_reasons: true,
  no_supabase_calls: true,
  no_repository_implementation: true,
  no_sql_reads_or_writes: true,
  no_memory_retrieval_events_writes: true,
  no_runtime_retrieval: true,
  no_embedding_generation: true,
  no_semantic_retrieval_activation: true,
  no_provider_calls: true,
  no_vector_search: true,
  no_carnos_prompt_injection: true,
  no_background_scanning: true,
  runtime_side_effects_enabled: false,
  memory_retrieval_events_write_count: 0,
  semantic_retrieval_active: false,
  carnos_prompt_injection_enabled: false,
  next_phase: "Phase 17N — Memory/RAG UI",
  rules: [
    "Phase 17M — Retrieval Audit Trail + Retrieval Explanation",
    "Retrieval Audit Trail + Retrieval Explanation",
    "retrieval audit trail preview",
    "retrieval explanation preview",
    "visible retrieval explanations",
    "visible inclusion reasons",
    "visible exclusion reasons",
    "visible budget reasons",
    "visible dedupe reasons",
    "visible safety reasons",
    "uses Phase 17I retrieval planning outputs",
    "uses Phase 17L context pack outputs",
    "No memory_retrieval_events writes",
    "No runtime retrieval",
    "No embedding generation",
    "No semantic retrieval activation",
    "No provider calls",
    "No vector search",
    "No Supabase calls",
    "No SQL reads or writes",
    "No Carnos prompt/context injection",
    "No background scanning",
  ],
} as const;

export interface RetrievalAuditTrailInput {
  retrieval_plans?: MemoryRetrievalRankingBudgetDedupeResult[];
  context_pack?: CarnosMemoryContextPackBuilderResult | null;
}

function limitText(value: string, maxLength: number): string {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, Math.max(0, maxLength - 3)) + "...";
}

function defaultOptions(options: RetrievalAuditTrailOptions): Required<RetrievalAuditTrailOptions> {
  return {
    audience: options.audience ?? "user",
    include_excluded_candidates: options.include_excluded_candidates ?? true,
    include_context_pack_items: options.include_context_pack_items ?? true,
    include_reason_details: options.include_reason_details ?? true,
    include_warnings: options.include_warnings ?? true,
    max_events: options.max_events ?? 80,
    max_explanation_lines: options.max_explanation_lines ?? 14,
  };
}

function baseReason(message: string): RetrievalAuditTrailReason {
  return {
    code: "retrieval_audit_trail_explanation",
    message,
  };
}

function runtimeDeferredReason(): RetrievalAuditTrailReason {
  return {
    code: "runtime_write_deferred",
    message: "Phase 17M creates audit previews only and does not write memory_retrieval_events.",
  };
}

function noPersistenceReason(): RetrievalAuditTrailReason {
  return {
    code: "no_persistence_performed",
    message: "No persistence, SQL write, Supabase write, provider call, or runtime retrieval was performed.",
  };
}

function candidateWarnings(candidate: MemoryRetrievalRankedCandidate, options: Required<RetrievalAuditTrailOptions>): string[] {
  return options.include_warnings ? [...candidate.warnings] : [];
}

function eventFromIncludedCandidate(
  candidate: MemoryRetrievalRankedCandidate,
  index: number,
  options: Required<RetrievalAuditTrailOptions>,
): RetrievalAuditTrailEvent {
  return {
    id: "retrieval-audit:event:included:" + index + ":" + candidate.id,
    kind: "candidate_included",
    severity: "info",
    title: "Included retrieval candidate",
    detail:
      limitText(candidate.title, 100) +
      " was included with score " +
      candidate.final_score.toFixed(3) +
      " from " +
      candidate.visible_source_label +
      ".",
    subject_id: candidate.id,
    subject_title: candidate.title,
    score: candidate.final_score,
    reasons: [
      baseReason("Candidate was included by Phase 17I ranking, budget, and dedupe rules."),
      {
        code: "candidate_inclusion_reason_visible",
        message: "Included candidate keeps visible retrieval reasons for audit review.",
      },
      noPersistenceReason(),
    ],
    warnings: candidateWarnings(candidate, options),
    preview_only: true,
  };
}

function inferExcludedKind(candidate: MemoryRetrievalRankedCandidate): RetrievalAuditTrailEventKind {
  const reasonText = candidate.reasons.map((reason) => reason.code + " " + reason.message).join(" ").toLowerCase();
  if (reasonText.includes("dedupe") || reasonText.includes("duplicate")) return "candidate_deduped";
  if (reasonText.includes("budget")) return "candidate_budget_limited";
  if (reasonText.includes("sensitive") || reasonText.includes("lock")) return "candidate_sensitive_blocked";
  if (reasonText.includes("conflict")) return "candidate_conflict_blocked";
  return "candidate_excluded";
}

function inferExcludedReasonCode(candidate: MemoryRetrievalRankedCandidate): RetrievalAuditTrailReason["code"] {
  const kind = inferExcludedKind(candidate);
  if (kind === "candidate_deduped") return "dedupe_reason_visible";
  if (kind === "candidate_budget_limited") return "budget_reason_visible";
  if (kind === "candidate_sensitive_blocked") return "sensitive_lock_reason_visible";
  if (kind === "candidate_conflict_blocked") return "conflict_reason_visible";
  return "candidate_exclusion_reason_visible";
}

function eventFromExcludedCandidate(
  candidate: MemoryRetrievalRankedCandidate,
  index: number,
  options: Required<RetrievalAuditTrailOptions>,
): RetrievalAuditTrailEvent {
  const kind = inferExcludedKind(candidate);
  const reasonCode = inferExcludedReasonCode(candidate);

  return {
    id: "retrieval-audit:event:excluded:" + index + ":" + candidate.id,
    kind,
    severity: kind === "candidate_excluded" ? "warning" : "blocked",
    title: "Excluded retrieval candidate",
    detail:
      limitText(candidate.title, 100) +
      " was excluded by " +
      kind.replace(/_/g, " ") +
      ".",
    subject_id: candidate.id,
    subject_title: candidate.title,
    score: candidate.final_score,
    reasons: [
      baseReason("Candidate was excluded by deterministic retrieval planning rules."),
      {
        code: reasonCode,
        message: "Excluded candidate keeps visible exclusion reasons for audit review.",
      },
      noPersistenceReason(),
    ],
    warnings: candidateWarnings(candidate, options),
    preview_only: true,
  };
}

function eventFromSection(section: CarnosMemoryContextPackSection, index: number): RetrievalAuditTrailEvent {
  return {
    id: "retrieval-audit:event:section:" + index + ":" + section.id,
    kind: "context_pack_section_created",
    severity: "info",
    title: "Context pack section created",
    detail:
      section.title +
      " contains " +
      section.included_count +
      " included items and " +
      section.excluded_count +
      " excluded items.",
    subject_id: section.id,
    subject_title: section.title,
    reasons: [
      {
        code: "phase_17l_context_pack_explained",
        message: "Context pack section was produced by Phase 17L preview builder.",
      },
      {
        code: "context_pack_reason_visible",
        message: "Section-level counts are visible for explanation and audit review.",
      },
      noPersistenceReason(),
    ],
    warnings: [...section.warnings],
    preview_only: true,
  };
}

function eventFromContextItem(item: CarnosMemoryContextPackItem, index: number): RetrievalAuditTrailEvent {
  return {
    id: "retrieval-audit:event:context-item:" + index + ":" + item.id,
    kind: item.included ? "context_pack_item_included" : "context_pack_item_excluded",
    severity: item.included ? "info" : "warning",
    title: item.included ? "Context pack item included" : "Context pack item excluded",
    detail:
      limitText(item.title, 100) +
      " has decision " +
      item.decision +
      " and estimated tokens " +
      item.estimated_tokens +
      ".",
    subject_id: item.id,
    subject_title: item.title,
    score: item.score,
    reasons: [
      {
        code: "context_pack_reason_visible",
        message: "Context-pack item reason is visible for audit review.",
      },
      noPersistenceReason(),
    ],
    warnings: [...item.warnings],
    preview_only: true,
  };
}

function createPlanReceivedEvent(plan: MemoryRetrievalRankingBudgetDedupeResult, index: number): RetrievalAuditTrailEvent {
  return {
    id: "retrieval-audit:event:plan:" + index,
    kind: "retrieval_plan_received",
    severity: "info",
    title: "Retrieval plan received",
    detail:
      "Plan " +
      index +
      " contains " +
      plan.included_candidates.length +
      " included candidates and " +
      plan.excluded_candidates.length +
      " excluded candidates.",
    reasons: [
      {
        code: "phase_17i_plan_explained",
        message: "Retrieval plan was generated by Phase 17I ranking, budget, and dedupe rules.",
      },
      noPersistenceReason(),
    ],
    warnings: [...plan.warnings],
    preview_only: true,
  };
}

function collectAuditEvents(
  input: RetrievalAuditTrailInput,
  options: Required<RetrievalAuditTrailOptions>,
): RetrievalAuditTrailEvent[] {
  const events: RetrievalAuditTrailEvent[] = [];
  const plans = input.retrieval_plans ?? [];

  plans.forEach((plan, planIndex) => {
    events.push(createPlanReceivedEvent(plan, planIndex + 1));

    plan.included_candidates.forEach((candidate, candidateIndex) => {
      events.push(eventFromIncludedCandidate(candidate, candidateIndex + 1, options));
    });

    if (options.include_excluded_candidates) {
      plan.excluded_candidates.forEach((candidate, candidateIndex) => {
        events.push(eventFromExcludedCandidate(candidate, candidateIndex + 1, options));
      });
    }
  });

  if (input.context_pack) {
    input.context_pack.sections.forEach((section, sectionIndex) => {
      events.push(eventFromSection(section, sectionIndex + 1));

      if (options.include_context_pack_items) {
        section.items.forEach((item, itemIndex) => {
          events.push(eventFromContextItem(item, itemIndex + 1));
        });
      }
    });
  }

  events.push({
    id: "retrieval-audit:event:runtime-write-deferred",
    kind: "runtime_write_deferred",
    severity: "deferred",
    title: "Runtime audit write deferred",
    detail: "Phase 17M produces an audit trail preview only; it does not write memory_retrieval_events.",
    reasons: [
      runtimeDeferredReason(),
      noPersistenceReason(),
      {
        code: "preview_only_explanation",
        message: "Audit trail and explanation are preview-only.",
      },
    ],
    warnings: ["memory_retrieval_events persistence remains deferred to a later persistence-enabled phase."],
    preview_only: true,
  });

  return events.slice(0, options.max_events);
}

function buildIncludedSummary(plans: MemoryRetrievalRankingBudgetDedupeResult[]): string[] {
  const lines: string[] = [];
  const candidates = plans.reduce<MemoryRetrievalRankedCandidate[]>(
    (all, plan) => all.concat(plan.included_candidates),
    [],
  );

  candidates.slice(0, 8).forEach((candidate, index) => {
    lines.push(
      String(index + 1) +
        ". Included " +
        limitText(candidate.title, 80) +
        " with score " +
        candidate.final_score.toFixed(3) +
        ".",
    );
  });

  if (candidates.length === 0) lines.push("No retrieval candidates were included.");
  return lines;
}

function buildExcludedSummary(plans: MemoryRetrievalRankingBudgetDedupeResult[]): string[] {
  const candidates = plans.reduce<MemoryRetrievalRankedCandidate[]>(
    (all, plan) => all.concat(plan.excluded_candidates),
    [],
  );

  if (candidates.length === 0) return ["No retrieval candidates were excluded."];

  return [
    String(candidates.length) + " retrieval candidates were excluded by approval, sensitivity, conflict, stale, dedupe, or budget rules.",
  ];
}

function buildBudgetSummary(
  plans: MemoryRetrievalRankingBudgetDedupeResult[],
  contextPack?: CarnosMemoryContextPackBuilderResult | null,
): string[] {
  const lines: string[] = [];

  plans.forEach((plan, index) => {
    lines.push(
      "Retrieval plan " +
        String(index + 1) +
        " used " +
        plan.budget_usage.used_items +
        "/" +
        plan.budget_usage.max_items +
        " items and " +
        plan.budget_usage.used_estimated_tokens +
        "/" +
        plan.budget_usage.max_estimated_tokens +
        " estimated tokens.",
    );
  });

  if (contextPack) {
    lines.push(
      "Context pack used " +
        contextPack.usage.used_items +
        "/" +
        contextPack.usage.max_items +
        " items, " +
        contextPack.usage.used_sections +
        "/" +
        contextPack.usage.max_sections +
        " sections, and " +
        contextPack.usage.used_estimated_tokens +
        "/" +
        contextPack.usage.max_estimated_tokens +
        " estimated tokens.",
    );
  }

  if (lines.length === 0) lines.push("No retrieval or context-pack budget was applied because no input plans were provided.");
  return lines;
}

function buildSafetySummary(): string[] {
  return [
    "Phase 17M explains retrieval decisions without performing runtime retrieval.",
    "No memory_retrieval_events writes occur in this phase.",
    "No embeddings, providers, vector search, Supabase calls, SQL reads/writes, or Carnos prompt/context injection occur.",
    "Sensitive, conflict, stale, dedupe, and budget decisions are represented as visible audit reasons when present in the input plan.",
  ];
}

function buildExplanation(
  input: RetrievalAuditTrailInput,
  events: RetrievalAuditTrailEvent[],
  options: Required<RetrievalAuditTrailOptions>,
): RetrievalExplanationSummary {
  const plans = input.retrieval_plans ?? [];
  const totalIncluded = plans.reduce((total, plan) => total + plan.included_candidates.length, 0);
  const totalExcluded = plans.reduce((total, plan) => total + plan.excluded_candidates.length, 0);

  const plain = [
    "Retrieval explanation preview was generated for " + options.audience + ".",
    "Input retrieval plans: " + plans.length + ".",
    "Included retrieval candidates: " + totalIncluded + ".",
    "Excluded retrieval candidates: " + totalExcluded + ".",
    "Audit preview events: " + events.length + ".",
  ].slice(0, options.max_explanation_lines);

  return {
    audience: options.audience,
    plain_language_summary: plain,
    included_summary: buildIncludedSummary(plans).slice(0, options.max_explanation_lines),
    excluded_summary: buildExcludedSummary(plans).slice(0, options.max_explanation_lines),
    budget_summary: buildBudgetSummary(plans, input.context_pack).slice(0, options.max_explanation_lines),
    safety_summary: buildSafetySummary().slice(0, options.max_explanation_lines),
    limitations: [
      "This is a preview-only explanation layer.",
      "It does not persist audit events.",
      "It does not retrieve memory at runtime.",
      "It does not inject memory into Carnos prompts.",
    ],
    preview_only: true,
  };
}

export function buildRetrievalAuditTrailExplanation(
  input: RetrievalAuditTrailInput,
  options: RetrievalAuditTrailOptions = {},
): RetrievalAuditTrailPreviewResult {
  const resolvedOptions = defaultOptions(options);
  const plans = input.retrieval_plans ?? [];
  const events = collectAuditEvents(input, resolvedOptions);
  const explanation = buildExplanation(input, events, resolvedOptions);

  const totalIncluded = plans.reduce((total, plan) => total + plan.included_candidates.length, 0);
  const totalExcluded = plans.reduce((total, plan) => total + plan.excluded_candidates.length, 0);
  const contextSections = input.context_pack?.sections.length ?? 0;
  const contextItems =
    input.context_pack?.sections.reduce((total, section) => total + section.items.length, 0) ?? 0;

  const summary = [
    "Phase 17M built a preview-only retrieval audit trail and explanation.",
    "Input retrieval plans: " + plans.length + ".",
    "Included retrieval candidates explained: " + totalIncluded + ".",
    "Excluded retrieval candidates explained: " + totalExcluded + ".",
    "Context-pack sections explained: " + contextSections + ".",
    "Context-pack items explained: " + contextItems + ".",
    "Audit events generated in preview: " + events.length + ".",
    "No memory_retrieval_events writes, runtime retrieval, embedding generation, semantic retrieval activation, provider calls, vector search, Supabase calls, SQL reads/writes, Carnos prompt/context injection, or background scanning occurred.",
  ];

  return {
    phase: "17M",
    builder: "retrieval_audit_trail_explanation",
    runtime_side_effects_enabled: false,
    runtime_retrieval_enabled: false,
    semantic_retrieval_active: false,
    provider_calls_enabled: false,
    vector_search_enabled: false,
    sql_runtime_enabled: false,
    memory_retrieval_events_write_count: 0,
    carnos_prompt_injection_enabled: false,
    total_input_plans: plans.length,
    total_included_candidates: totalIncluded,
    total_excluded_candidates: totalExcluded,
    total_context_pack_sections: contextSections,
    total_context_pack_items: contextItems,
    audit_events: events,
    explanation,
    summary,
    warnings: [
      "Retrieval audit trail is preview-only.",
      "Retrieval explanation is preview-only.",
      "memory_retrieval_events writes remain deferred.",
      "Runtime retrieval remains disabled.",
      "Carnos prompt/context injection remains disabled.",
    ],
    boundary: PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_BOUNDARY,
  };
}

export function summarizeRetrievalAuditTrailExplanation(result: RetrievalAuditTrailPreviewResult): string[] {
  return result.summary;
}

export function getRetrievalAuditTrailExplanationSummary(): typeof PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_BOUNDARY {
  return PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_BOUNDARY;
}

export const PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_AUDIT_MARKERS = [
  "Phase 17M — Retrieval Audit Trail + Retrieval Explanation",
  "Retrieval Audit Trail + Retrieval Explanation",
  "retrieval audit trail preview",
  "retrieval explanation preview",
  "visible retrieval explanations",
  "visible inclusion reasons",
  "visible exclusion reasons",
  "visible budget reasons",
  "visible dedupe reasons",
  "visible safety reasons",
  "uses Phase 17I retrieval planning outputs",
  "uses Phase 17L context pack outputs",
  "No memory_retrieval_events writes",
  "No runtime retrieval",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
] as const;
