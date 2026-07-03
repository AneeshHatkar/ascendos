/**
 * Phase 17L — Carnos Memory Context Pack Builder
 *
 * Deterministic builder for preview-only Carnos memory context packs.
 *
 * Boundary:
 * - Pure TypeScript context-pack planning only.
 * - No Supabase calls.
 * - No repository implementation.
 * - No SQL reads or writes.
 * - No runtime retrieval.
 * - No memory_retrieval_events writes.
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
import type { KnowledgeVaultRetrievalBridgeResult } from "./knowledge-vault-retrieval-bridge";
import type { SourceBridgeRetrievalPreviewResult } from "./source-bridge-retrieval-preview";

export type CarnosMemoryContextPackSurface =
  | "command"
  | "timeline"
  | "calendar"
  | "goals"
  | "proof"
  | "carnos"
  | "career"
  | "learning"
  | "research"
  | "health_body"
  | "life_admin"
  | "grimoire"
  | "project"
  | "system_preview";

export type CarnosMemoryContextPackSectionKind =
  | "approved_memory"
  | "knowledge_vault"
  | "current_info"
  | "document"
  | "career"
  | "research"
  | "source_bridge"
  | "safety_notice"
  | "exclusion_summary";

export type CarnosMemoryContextPackDecision =
  | "included"
  | "excluded_empty"
  | "excluded_budget"
  | "excluded_sensitive"
  | "excluded_conflict"
  | "excluded_stale"
  | "excluded_preview_only"
  | "excluded_not_retrieved";

export interface CarnosMemoryContextPackBudget {
  max_sections: number;
  max_items: number;
  max_estimated_tokens: number;
  max_chars_per_item: number;
}

export interface CarnosMemoryContextPackOptions {
  surface?: CarnosMemoryContextPackSurface;
  max_sections?: number;
  max_items?: number;
  max_estimated_tokens?: number;
  max_chars_per_item?: number;
  include_excluded_summary?: boolean;
  include_bridge_summaries?: boolean;
  include_retrieval_reasons?: boolean;
  include_warnings?: boolean;
}

export interface CarnosMemoryContextPackInput {
  primary_retrieval_plan?: MemoryRetrievalRankingBudgetDedupeResult | null;
  knowledge_vault_bridge?: KnowledgeVaultRetrievalBridgeResult | null;
  source_bridge_preview?: SourceBridgeRetrievalPreviewResult | null;
  supplemental_retrieval_plans?: MemoryRetrievalRankingBudgetDedupeResult[];
}

export interface CarnosMemoryContextPackReason {
  code:
    | "carnos_memory_context_pack_builder"
    | "approved_memory_context_section"
    | "knowledge_vault_context_section"
    | "source_bridge_context_section"
    | "budget_applied"
    | "item_trimmed"
    | "retrieval_reason_preserved"
    | "warning_preserved"
    | "preview_only_pack"
    | "no_prompt_injection"
    | "visible_pack_reason";
  message: string;
}

export interface CarnosMemoryContextPackItem {
  id: string;
  source_kind: CarnosMemoryContextPackSectionKind;
  title: string;
  content_preview: string;
  source_label: string;
  score: number;
  estimated_tokens: number;
  included: boolean;
  decision: CarnosMemoryContextPackDecision;
  reasons: CarnosMemoryContextPackReason[];
  warnings: string[];
  retrieval_candidate_id?: string;
  preview_only: true;
}

export interface CarnosMemoryContextPackSection {
  id: string;
  kind: CarnosMemoryContextPackSectionKind;
  title: string;
  items: CarnosMemoryContextPackItem[];
  included_count: number;
  excluded_count: number;
  estimated_tokens: number;
  reasons: CarnosMemoryContextPackReason[];
  warnings: string[];
  preview_only: true;
}

export interface CarnosMemoryContextPackUsage {
  max_sections: number;
  used_sections: number;
  max_items: number;
  used_items: number;
  max_estimated_tokens: number;
  used_estimated_tokens: number;
  max_chars_per_item: number;
  budget_notes: string[];
}

export interface CarnosMemoryContextPackBuilderResult {
  phase: "17L";
  builder: "carnos_memory_context_pack_builder";
  runtime_side_effects_enabled: false;
  runtime_retrieval_enabled: false;
  semantic_retrieval_active: false;
  provider_calls_enabled: false;
  vector_search_enabled: false;
  sql_runtime_enabled: false;
  memory_retrieval_events_write_count: 0;
  carnos_prompt_injection_enabled: false;
  total_input_plans: number;
  total_input_candidates: number;
  included_item_count: number;
  excluded_item_count: number;
  sections: CarnosMemoryContextPackSection[];
  usage: CarnosMemoryContextPackUsage;
  summary: string[];
  warnings: string[];
  boundary: typeof PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_BOUNDARY;
}

export const DEFAULT_CARNOS_MEMORY_CONTEXT_PACK_BUDGET: CarnosMemoryContextPackBudget = {
  max_sections: 8,
  max_items: 12,
  max_estimated_tokens: 1400,
  max_chars_per_item: 320,
};

export const PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_BOUNDARY = {
  phase: "Phase 17L",
  name: "Carnos Memory Context Pack Builder",
  deterministic_only: true,
  context_pack_planning_only: true,
  preview_only: true,
  carnos_memory_context_pack_builder: true,
  uses_phase_17i_retrieval_planning_outputs: true,
  uses_phase_17j_knowledge_bridge_outputs: true,
  uses_phase_17k_source_bridge_outputs: true,
  preserves_visible_retrieval_reasons: true,
  preserves_visible_bridge_reasons: true,
  budget_bounded_context_pack: true,
  no_supabase_calls: true,
  no_repository_implementation: true,
  no_sql_reads_or_writes: true,
  no_runtime_retrieval: true,
  no_memory_retrieval_events_writes: true,
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
  next_phase: "Phase 17M — Retrieval Audit Trail + Retrieval Explanation",
  rules: [
    "Phase 17L — Carnos Memory Context Pack Builder",
    "Carnos Memory Context Pack Builder",
    "carnos memory context pack",
    "context pack planning only",
    "preview-only context pack",
    "uses Phase 17I retrieval planning outputs",
    "uses Phase 17J knowledge bridge outputs",
    "uses Phase 17K source bridge outputs",
    "preserves visible retrieval reasons",
    "preserves visible bridge reasons",
    "budget-bounded context pack",
    "No runtime retrieval",
    "No memory_retrieval_events writes",
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

function estimateTokens(value: string): number {
  const text = value.trim();
  if (!text) return 0;
  const words = text.split(/\s+/).filter(Boolean).length;
  const charEstimate = Math.ceil(text.length / 4);
  return Math.max(words, charEstimate);
}

function trimToChars(value: string, maxChars: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxChars) return trimmed;
  return trimmed.slice(0, Math.max(0, maxChars - 3)) + "...";
}

function mergeBudget(options: CarnosMemoryContextPackOptions): CarnosMemoryContextPackBudget {
  return {
    max_sections: options.max_sections ?? DEFAULT_CARNOS_MEMORY_CONTEXT_PACK_BUDGET.max_sections,
    max_items: options.max_items ?? DEFAULT_CARNOS_MEMORY_CONTEXT_PACK_BUDGET.max_items,
    max_estimated_tokens:
      options.max_estimated_tokens ?? DEFAULT_CARNOS_MEMORY_CONTEXT_PACK_BUDGET.max_estimated_tokens,
    max_chars_per_item:
      options.max_chars_per_item ?? DEFAULT_CARNOS_MEMORY_CONTEXT_PACK_BUDGET.max_chars_per_item,
  };
}

function baseReason(message: string): CarnosMemoryContextPackReason {
  return {
    code: "carnos_memory_context_pack_builder",
    message,
  };
}

function packWarnings(): string[] {
  return [
    "Carnos Memory Context Pack Builder is preview-only.",
    "Runtime retrieval remains disabled.",
    "Semantic retrieval remains deferred.",
    "No memory_retrieval_events writes occur in Phase 17L.",
    "No Carnos prompt/context injection occurs in Phase 17L.",
  ];
}

function classifyCandidate(candidate: MemoryRetrievalRankedCandidate): CarnosMemoryContextPackSectionKind {
  if (candidate.kind === "knowledge_item") return "knowledge_vault";
  if (candidate.kind === "source_bridge_preview") return "source_bridge";
  if (candidate.kind === "approved_memory") return "approved_memory";
  return "approved_memory";
}

function sectionTitle(kind: CarnosMemoryContextPackSectionKind): string {
  if (kind === "approved_memory") return "Approved Memory";
  if (kind === "knowledge_vault") return "Knowledge Vault";
  if (kind === "current_info") return "Current Info";
  if (kind === "document") return "Documents";
  if (kind === "career") return "Career";
  if (kind === "research") return "Research";
  if (kind === "source_bridge") return "Source Bridges";
  if (kind === "safety_notice") return "Safety Notices";
  return "Exclusion Summary";
}

function candidateToPackItem(
  candidate: MemoryRetrievalRankedCandidate,
  budget: CarnosMemoryContextPackBudget,
  options: CarnosMemoryContextPackOptions,
): CarnosMemoryContextPackItem {
  const preview = trimToChars(candidate.content_preview, budget.max_chars_per_item);
  const warnings = options.include_warnings === false ? [] : [...candidate.warnings];

  const reasons: CarnosMemoryContextPackReason[] = [
    baseReason("Candidate was converted into a Carnos memory context pack item."),
    {
      code: "preview_only_pack",
      message: "Pack item is preview-only and is not injected into a Carnos prompt.",
    },
    {
      code: "no_prompt_injection",
      message: "Phase 17L does not perform Carnos prompt/context injection.",
    },
  ];

  if (preview.length < candidate.content_preview.length) {
    reasons.push({
      code: "item_trimmed",
      message: "Candidate preview was trimmed to the context-pack item character budget.",
    });
  }

  if (options.include_retrieval_reasons !== false) {
    reasons.push({
      code: "retrieval_reason_preserved",
      message: "Retrieval inclusion/exclusion reasons are preserved in the source candidate.",
    });
  }

  if (warnings.length > 0) {
    reasons.push({
      code: "warning_preserved",
      message: "Candidate warnings are preserved in the context pack item.",
    });
  }

  return {
    id: "context-item:" + candidate.id,
    source_kind: classifyCandidate(candidate),
    title: candidate.title,
    content_preview: preview,
    source_label: candidate.visible_source_label,
    score: candidate.final_score,
    estimated_tokens: estimateTokens(candidate.title + " " + preview),
    included: candidate.included,
    decision: candidate.included ? "included" : "excluded_not_retrieved",
    reasons,
    warnings,
    retrieval_candidate_id: candidate.id,
    preview_only: true,
  };
}

function collectRetrievalPlans(input: CarnosMemoryContextPackInput): MemoryRetrievalRankingBudgetDedupeResult[] {
  const plans: MemoryRetrievalRankingBudgetDedupeResult[] = [];

  if (input.primary_retrieval_plan) plans.push(input.primary_retrieval_plan);
  if (input.knowledge_vault_bridge) plans.push(input.knowledge_vault_bridge.retrieval_plan);
  if (input.source_bridge_preview) plans.push(input.source_bridge_preview.retrieval_plan);

  for (const plan of input.supplemental_retrieval_plans ?? []) {
    plans.push(plan);
  }

  return plans;
}

function buildRawItems(
  plans: MemoryRetrievalRankingBudgetDedupeResult[],
  budget: CarnosMemoryContextPackBudget,
  options: CarnosMemoryContextPackOptions,
): CarnosMemoryContextPackItem[] {
  const items: CarnosMemoryContextPackItem[] = [];

  for (const plan of plans) {
    for (const candidate of plan.included_candidates) {
      items.push(candidateToPackItem(candidate, budget, options));
    }

    if (options.include_excluded_summary) {
      const excludedCount = plan.excluded_candidates.length;
      if (excludedCount > 0) {
        items.push({
          id: "context-item:excluded-summary:" + items.length,
          source_kind: "exclusion_summary",
          title: "Excluded retrieval candidates",
          content_preview: excludedCount + " retrieval candidates were excluded by ranking, budget, dedupe, sensitivity, stale, conflict, or approval rules.",
          source_label: "Phase 17L exclusion summary",
          score: 0,
          estimated_tokens: 24,
          included: false,
          decision: "excluded_not_retrieved",
          reasons: [
            {
              code: "visible_pack_reason",
              message: "Excluded candidate counts are summarized without exposing hidden context.",
            },
          ],
          warnings: [],
          preview_only: true,
        });
      }
    }
  }

  return items.sort((left, right) => {
    if (right.included !== left.included) return Number(right.included) - Number(left.included);
    if (right.score !== left.score) return right.score - left.score;
    return left.estimated_tokens - right.estimated_tokens;
  });
}

function applyContextPackBudget(
  items: CarnosMemoryContextPackItem[],
  budget: CarnosMemoryContextPackBudget,
): {
  items: CarnosMemoryContextPackItem[];
  usage: CarnosMemoryContextPackUsage;
} {
  let usedItems = 0;
  let usedTokens = 0;
  const notes: string[] = [];
  const output: CarnosMemoryContextPackItem[] = [];

  for (const item of items) {
    if (!item.included) {
      output.push(item);
      continue;
    }

    if (usedItems >= budget.max_items) {
      notes.push("Excluded " + item.id + " because context-pack item budget was reached.");
      output.push({
        ...item,
        included: false,
        decision: "excluded_budget",
        score: 0,
        reasons: [
          ...item.reasons,
          {
            code: "budget_applied",
            message: "Context-pack item budget excluded this item.",
          },
        ],
      });
      continue;
    }

    if (usedTokens + item.estimated_tokens > budget.max_estimated_tokens) {
      notes.push("Excluded " + item.id + " because context-pack token budget was reached.");
      output.push({
        ...item,
        included: false,
        decision: "excluded_budget",
        score: 0,
        reasons: [
          ...item.reasons,
          {
            code: "budget_applied",
            message: "Context-pack token budget excluded this item.",
          },
        ],
      });
      continue;
    }

    usedItems += 1;
    usedTokens += item.estimated_tokens;
    output.push(item);
  }

  return {
    items: output,
    usage: {
      max_sections: budget.max_sections,
      used_sections: 0,
      max_items: budget.max_items,
      used_items: usedItems,
      max_estimated_tokens: budget.max_estimated_tokens,
      used_estimated_tokens: usedTokens,
      max_chars_per_item: budget.max_chars_per_item,
      budget_notes: notes.length > 0 ? notes : ["Carnos memory context pack fits within deterministic budget."],
    },
  };
}

function groupItemsIntoSections(
  items: CarnosMemoryContextPackItem[],
  budget: CarnosMemoryContextPackBudget,
): CarnosMemoryContextPackSection[] {
  const order: CarnosMemoryContextPackSectionKind[] = [
    "approved_memory",
    "knowledge_vault",
    "source_bridge",
    "current_info",
    "document",
    "career",
    "research",
    "safety_notice",
    "exclusion_summary",
  ];

  const sections: CarnosMemoryContextPackSection[] = [];

  for (const kind of order) {
    const sectionItems = items.filter((item) => item.source_kind === kind);
    if (sectionItems.length === 0) continue;

    sections.push({
      id: "context-section:" + kind,
      kind,
      title: sectionTitle(kind),
      items: sectionItems,
      included_count: sectionItems.filter((item) => item.included).length,
      excluded_count: sectionItems.filter((item) => !item.included).length,
      estimated_tokens: sectionItems.reduce((total, item) => total + item.estimated_tokens, 0),
      reasons: [
        {
          code: kind === "approved_memory" ? "approved_memory_context_section" : "visible_pack_reason",
          message: "Section groups context-pack items by source kind.",
        },
      ],
      warnings: [],
      preview_only: true,
    });
  }

  return sections.slice(0, budget.max_sections);
}

export function buildCarnosMemoryContextPack(
  input: CarnosMemoryContextPackInput,
  options: CarnosMemoryContextPackOptions = {},
): CarnosMemoryContextPackBuilderResult {
  const budget = mergeBudget(options);
  const plans = collectRetrievalPlans(input);
  const totalCandidates = plans.reduce((total, plan) => total + plan.total_candidates, 0);
  const rawItems = buildRawItems(plans, budget, options);
  const budgeted = applyContextPackBudget(rawItems, budget);
  const sections = groupItemsIntoSections(budgeted.items, budget);

  const usedSections = sections.length;
  const includedCount = sections.reduce((total, section) => total + section.included_count, 0);
  const excludedCount = sections.reduce((total, section) => total + section.excluded_count, 0);

  const usage: CarnosMemoryContextPackUsage = {
    ...budgeted.usage,
    used_sections: usedSections,
  };

  const summary = [
    "Phase 17L built a preview-only Carnos memory context pack.",
    "Input retrieval plans: " + plans.length + ".",
    "Input retrieval candidates: " + totalCandidates + ".",
    "Included context items: " + includedCount + ".",
    "Excluded context items: " + excludedCount + ".",
    "Used sections: " + usedSections + "/" + budget.max_sections + ".",
    "Used estimated tokens: " + usage.used_estimated_tokens + "/" + usage.max_estimated_tokens + ".",
    "No runtime retrieval, memory_retrieval_events writes, embedding generation, semantic retrieval activation, provider calls, vector search, Supabase calls, SQL reads/writes, Carnos prompt/context injection, or background scanning occurred.",
  ];

  return {
    phase: "17L",
    builder: "carnos_memory_context_pack_builder",
    runtime_side_effects_enabled: false,
    runtime_retrieval_enabled: false,
    semantic_retrieval_active: false,
    provider_calls_enabled: false,
    vector_search_enabled: false,
    sql_runtime_enabled: false,
    memory_retrieval_events_write_count: 0,
    carnos_prompt_injection_enabled: false,
    total_input_plans: plans.length,
    total_input_candidates: totalCandidates,
    included_item_count: includedCount,
    excluded_item_count: excludedCount,
    sections,
    usage,
    summary,
    warnings: packWarnings(),
    boundary: PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_BOUNDARY,
  };
}

export function summarizeCarnosMemoryContextPack(result: CarnosMemoryContextPackBuilderResult): string[] {
  return result.summary;
}

export function getCarnosMemoryContextPackBuilderSummary(): typeof PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_BOUNDARY {
  return PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_BOUNDARY;
}

export const PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_AUDIT_MARKERS = [
  "Phase 17L — Carnos Memory Context Pack Builder",
  "Carnos Memory Context Pack Builder",
  "carnos memory context pack",
  "context pack planning only",
  "preview-only context pack",
  "uses Phase 17I retrieval planning outputs",
  "uses Phase 17J knowledge bridge outputs",
  "uses Phase 17K source bridge outputs",
  "preserves visible retrieval reasons",
  "preserves visible bridge reasons",
  "budget-bounded context pack",
  "No runtime retrieval",
  "No memory_retrieval_events writes",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
] as const;
