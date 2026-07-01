/**
 * Phase 15J — Current Context Pack Builder + Context Budget Rules.
 *
 * Preview-only current context pack builder for ascendOS + Carnos.
 *
 * Purpose:
 * - Build Current context pack preview objects from already-approved read-layer refs.
 * - Enforce context budget rules before any Carnos response can use memory.
 * - Keep context pack budget, token estimate, section budgets, inclusion reasons,
 *   exclusion reasons, stale warnings, conflict warnings, privacy flags,
 *   source-of-truth hierarchy notes, project/system continuity notes, and Carnos
 *   entity state summary visible.
 *
 * Audit markers:
 * - Current Context Pack Builder + Context Budget Rules
 * - Current context pack
 * - context budget rules
 * - context budget notes
 * - token budget
 * - section budget
 * - included memory refs
 * - excluded memory refs
 * - approved-memory read layer
 * - Carnos entity state
 * - project/system state memory
 * - source-of-truth hierarchy
 * - stale memory warnings
 * - conflict warnings
 * - privacy mode active
 * - do-not-remember rules active
 * - memory_used_in_context_pack
 * - preview only
 * - no approval
 * - no persistence
 * - no Supabase calls
 * - no SQL reads or writes
 * - no embeddings
 * - no provider calls
 * - no hidden Carnos prompt injection
 * - no standalone /memory route
 * - Phase 15K — Carnos Memory Visibility Panel
 */

import type {
  ContextPackMemoryReference,
  CurrentContextPackContract,
} from "./memory-contracts";
import type { ApprovedMemoryReadLayerResult } from "./approved-memory-read-layer";
import type { CarnosEntityStateSummary } from "./carnos-entity-state";
import type { ProjectSystemStateMemorySummary } from "./project-system-state-memory";

export type ContextPackSectionKey =
  | "carnos_entity_state"
  | "project_system_state"
  | "source_of_truth_hierarchy"
  | "approved_memories"
  | "stale_warnings"
  | "conflict_warnings"
  | "budget_notes";

export type ContextPackBudgetRule = {
  id: string;
  label: string;
  section: ContextPackSectionKey;
  max_items: number;
  max_estimated_tokens: number;
  priority: number;
  required: boolean;
  reason: string;
};

export type ContextPackBudgetUsage = {
  section: ContextPackSectionKey;
  used_items: number;
  max_items: number;
  estimated_tokens: number;
  max_estimated_tokens: number;
  over_budget: boolean;
  notes: string[];
};

export type ContextPackBuildOptions = {
  active_route?: string;
  active_project?: string;
  active_phase?: string;
  max_total_estimated_tokens?: number;
  max_memory_refs?: number;
  include_stale_with_warning?: boolean;
  include_excluded_preview?: boolean;
  privacy_mode_active?: boolean;
  do_not_remember_rules_active?: boolean;
  section_rules?: Partial<Record<ContextPackSectionKey, Partial<ContextPackBudgetRule>>>;
};

export type CurrentContextPackBuilderInput = {
  user_id?: string;
  approved_read_layer?: ApprovedMemoryReadLayerResult;
  carnos_entity_state?: CarnosEntityStateSummary;
  project_system_state?: ProjectSystemStateMemorySummary;
  options?: ContextPackBuildOptions;
};

export type CurrentContextPackPreview = CurrentContextPackContract & {
  preview_id: string;
  builder_phase: "Phase 15J";
  title: "Current Context Pack Builder + Context Budget Rules";
  token_budget: {
    max_total_estimated_tokens: number;
    estimated_total_tokens: number;
    over_budget: boolean;
  };
  section_budget_usages: ContextPackBudgetUsage[];
  source_sections: {
    carnos_entity_state_summary?: CarnosEntityStateSummary;
    project_system_state_summary?: ProjectSystemStateMemorySummary;
    source_of_truth_hierarchy_notes: string[];
  };
  memory_usage_event_preview: {
    event_type: "memory_used_in_context_pack";
    would_log_count: number;
    persistence: "disabled_preview_only";
  };
  visibility_notes: string[];
  boundary: typeof PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_BOUNDARY;
};

export type CurrentContextPackBuilderResult = {
  context_pack: CurrentContextPackPreview;
  budget_rules: ContextPackBudgetRule[];
  included_count: number;
  excluded_count: number;
  warning_count: number;
  boundary_notes: string[];
};

export const DEFAULT_CONTEXT_PACK_BUDGET_RULES: ContextPackBudgetRule[] = [
  {
    id: "budget-carnos-entity-state",
    label: "Carnos entity state",
    section: "carnos_entity_state",
    max_items: 1,
    max_estimated_tokens: 380,
    priority: 1,
    required: true,
    reason:
      "Carnos identity, role, tone, boundaries, and current mode should remain compact and visible.",
  },
  {
    id: "budget-project-system-state",
    label: "Project/system state memory",
    section: "project_system_state",
    max_items: 1,
    max_estimated_tokens: 520,
    priority: 2,
    required: true,
    reason:
      "Project/system continuity should include current phase, latest commit, next phase, and active boundaries.",
  },
  {
    id: "budget-source-hierarchy",
    label: "Source-of-truth hierarchy",
    section: "source_of_truth_hierarchy",
    max_items: 6,
    max_estimated_tokens: 420,
    priority: 3,
    required: true,
    reason:
      "FINAL_SYNCED JSON/DOCX, repo logs, phase reports, and audit reports must stay ordered.",
  },
  {
    id: "budget-approved-memories",
    label: "Approved memory refs",
    section: "approved_memories",
    max_items: 8,
    max_estimated_tokens: 1_200,
    priority: 4,
    required: false,
    reason:
      "Only ranked approved-memory read layer refs can enter the context pack preview.",
  },
  {
    id: "budget-stale-warnings",
    label: "Stale memory warnings",
    section: "stale_warnings",
    max_items: 5,
    max_estimated_tokens: 260,
    priority: 5,
    required: false,
    reason:
      "Stale memory warnings should be visible but should not dominate context.",
  },
  {
    id: "budget-conflict-warnings",
    label: "Conflict warnings",
    section: "conflict_warnings",
    max_items: 5,
    max_estimated_tokens: 260,
    priority: 6,
    required: false,
    reason:
      "Conflict warnings should be visible for transparency and source arbitration.",
  },
  {
    id: "budget-notes",
    label: "Context budget notes",
    section: "budget_notes",
    max_items: 8,
    max_estimated_tokens: 360,
    priority: 7,
    required: false,
    reason:
      "Budget notes explain why refs were included, trimmed, or excluded.",
  },
];

export const PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_BOUNDARY = {
  phase: "Phase 15J",
  name: "Current Context Pack Builder + Context Budget Rules",
  preview_only: true,
  context_pack_builder_preview_only: true,
  no_approval: true,
  no_persistence: true,
  no_supabase_calls: true,
  no_sql_reads_or_writes: true,
  no_embeddings: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_standalone_memory_route: true,
  next_phase: "Phase 15K — Carnos Memory Visibility Panel",
  boundary_rules: [
    "Context pack preview can only use already-approved read-layer refs.",
    "Context pack preview does not perform retrieval.",
    "Context pack preview does not persist memory usage logs.",
    "Context pack preview only shows a memory_used_in_context_pack event preview.",
    "Privacy mode and do-not-remember state must remain visible.",
    "Budget trimming must produce context budget notes.",
    "No SQL reads or writes, no embeddings, no provider calls, no hidden Carnos prompt injection.",
  ],
} as const;

function normalizeText(value: string | undefined): string {
  return (value ?? "").trim();
}

function estimateTokens(text: string): number {
  const normalized = normalizeText(text);
  if (!normalized) return 0;

  const words = normalized.split(/\s+/).filter(Boolean).length;
  const charEstimate = Math.ceil(normalized.length / 4);
  return Math.max(words, charEstimate);
}

function estimateMemoryRefTokens(ref: ContextPackMemoryReference): number {
  return estimateTokens(
    [
      ref.title,
      ref.content_preview,
      ref.reason_included,
      ref.provenance.source_label,
      ref.sensitivity,
      ref.staleness,
      ref.conflict_severity,
    ].join(" "),
  );
}

function trimList<T>(items: T[], maxItems: number): T[] {
  return items.slice(0, Math.max(0, maxItems));
}

function getRule(
  section: ContextPackSectionKey,
  options?: ContextPackBuildOptions,
): ContextPackBudgetRule {
  const base =
    DEFAULT_CONTEXT_PACK_BUDGET_RULES.find((rule) => rule.section === section) ??
    DEFAULT_CONTEXT_PACK_BUDGET_RULES[DEFAULT_CONTEXT_PACK_BUDGET_RULES.length - 1];

  return {
    ...base,
    ...(options?.section_rules?.[section] ?? {}),
    section,
  };
}

function buildUsage(
  section: ContextPackSectionKey,
  usedItems: number,
  estimatedTokens: number,
  options?: ContextPackBuildOptions,
  notes: string[] = [],
): ContextPackBudgetUsage {
  const rule = getRule(section, options);
  return {
    section,
    used_items: usedItems,
    max_items: rule.max_items,
    estimated_tokens: estimatedTokens,
    max_estimated_tokens: rule.max_estimated_tokens,
    over_budget:
      usedItems > rule.max_items || estimatedTokens > rule.max_estimated_tokens,
    notes,
  };
}

function applyTokenBudgetToRefs(
  refs: ContextPackMemoryReference[],
  maxRefs: number,
  maxTokens: number,
): {
  included: ContextPackMemoryReference[];
  excluded: ContextPackMemoryReference[];
  estimatedTokens: number;
  notes: string[];
} {
  const included: ContextPackMemoryReference[] = [];
  const excluded: ContextPackMemoryReference[] = [];
  const notes: string[] = [];
  let estimatedTokens = 0;

  for (const ref of refs) {
    const refTokens = estimateMemoryRefTokens(ref);
    const wouldExceedItemLimit = included.length >= maxRefs;
    const wouldExceedTokenLimit = estimatedTokens + refTokens > maxTokens;

    if (wouldExceedItemLimit || wouldExceedTokenLimit) {
      excluded.push({
        ...ref,
        allowed_for_context: false,
        reason_included: wouldExceedItemLimit
          ? "Excluded from current context pack preview because the memory ref item budget was reached."
          : "Excluded from current context pack preview because the memory ref token budget was reached.",
      });

      if (wouldExceedItemLimit) {
        notes.push(`Excluded "${ref.title}" because max memory refs was reached.`);
      } else {
        notes.push(`Excluded "${ref.title}" because approved-memory token budget was reached.`);
      }

      continue;
    }

    included.push({
      ...ref,
      allowed_for_context: true,
      reason_included:
        ref.reason_included ||
        "Included by approved-memory read layer and context budget rules.",
    });
    estimatedTokens += refTokens;
  }

  return { included, excluded, estimatedTokens, notes };
}

function sourceHierarchyNotes(
  projectSystemState?: ProjectSystemStateMemorySummary,
): string[] {
  const hierarchy =
    projectSystemState?.project_preview.source_hierarchy_preview ??
    projectSystemState?.system_preview.source_hierarchy_preview ??
    [];

  if (hierarchy.length === 0) {
    return [
      "Source-of-truth hierarchy unavailable in preview; FINAL_SYNCED JSON/DOCX should remain authoritative.",
    ];
  }

  return hierarchy
    .slice()
    .sort((left, right) => left.rank - right.rank)
    .map(
      (entry) =>
        `${entry.rank}. ${entry.label} — ${entry.status}: ${entry.reason}`,
    );
}

function buildRequiredSectionText(input: CurrentContextPackBuilderInput): {
  carnosText: string;
  projectSystemText: string;
  hierarchyText: string;
} {
  const carnos = input.carnos_entity_state;
  const projectSystem = input.project_system_state;
  const hierarchy = sourceHierarchyNotes(projectSystem);

  return {
    carnosText: carnos
      ? [
          carnos.carnos_name,
          carnos.app_name,
          carnos.role,
          carnos.mission,
          carnos.tone,
          carnos.current_mode,
          carnos.current_phase,
          carnos.latest_milestone,
          carnos.next_objective,
          carnos.state_health,
        ].join(" ")
      : "Carnos entity state summary unavailable in preview.",
    projectSystemText: projectSystem
      ? [
          projectSystem.project_preview.project_name,
          projectSystem.project_preview.current_phase,
          projectSystem.project_preview.latest_commit,
          projectSystem.project_preview.last_pushed_commit,
          projectSystem.project_preview.next_phase,
          projectSystem.project_preview.state_summary,
          projectSystem.system_preview.state_summary,
          projectSystem.hierarchy_evaluation.authoritative_source,
          projectSystem.hierarchy_evaluation.active_chunk_model,
        ].join(" ")
      : "Project/system state memory summary unavailable in preview.",
    hierarchyText: hierarchy.join(" "),
  };
}

export function createContextPackBudgetRules(
  options?: ContextPackBuildOptions,
): ContextPackBudgetRule[] {
  return DEFAULT_CONTEXT_PACK_BUDGET_RULES.map((rule) => ({
    ...rule,
    ...(options?.section_rules?.[rule.section] ?? {}),
  })).sort((left, right) => left.priority - right.priority);
}

export function createCurrentContextPackPreview(
  input: CurrentContextPackBuilderInput = {},
): CurrentContextPackPreview {
  const options = input.options ?? {};
  const budgetRules = createContextPackBudgetRules(options);
  const maxMemoryRefs =
    options.max_memory_refs ??
    getRule("approved_memories", options).max_items;
  const maxApprovedMemoryTokens = getRule(
    "approved_memories",
    options,
  ).max_estimated_tokens;
  const maxTotalEstimatedTokens = options.max_total_estimated_tokens ?? 2_800;

  const approvedReadLayer = input.approved_read_layer;
  const readLayerIncluded = approvedReadLayer?.included_refs ?? [];
  const readLayerExcluded = approvedReadLayer?.excluded_refs ?? [];

  const budgetedMemoryRefs = applyTokenBudgetToRefs(
    readLayerIncluded,
    maxMemoryRefs,
    maxApprovedMemoryTokens,
  );

  const includeExcludedPreview = options.include_excluded_preview ?? true;
  const excludedMemoryRefs = includeExcludedPreview
    ? [...readLayerExcluded, ...budgetedMemoryRefs.excluded]
    : budgetedMemoryRefs.excluded;

  const staleWarnings = trimList(
    approvedReadLayer?.stale_memory_warnings ?? [],
    getRule("stale_warnings", options).max_items,
  );
  const conflictWarnings = trimList(
    approvedReadLayer?.conflict_warnings ?? [],
    getRule("conflict_warnings", options).max_items,
  );

  const sourceNotes = sourceHierarchyNotes(input.project_system_state);
  const requiredText = buildRequiredSectionText(input);

  const sectionBudgetUsages: ContextPackBudgetUsage[] = [
    buildUsage(
      "carnos_entity_state",
      input.carnos_entity_state ? 1 : 0,
      estimateTokens(requiredText.carnosText),
      options,
      input.carnos_entity_state
        ? ["Carnos entity state summary included in current context pack preview."]
        : ["Carnos entity state summary missing from current context pack preview."],
    ),
    buildUsage(
      "project_system_state",
      input.project_system_state ? 1 : 0,
      estimateTokens(requiredText.projectSystemText),
      options,
      input.project_system_state
        ? ["Project/system state memory summary included in current context pack preview."]
        : ["Project/system state memory summary missing from current context pack preview."],
    ),
    buildUsage(
      "source_of_truth_hierarchy",
      sourceNotes.length,
      estimateTokens(requiredText.hierarchyText),
      options,
      ["Source-of-truth hierarchy notes included for source arbitration."],
    ),
    buildUsage(
      "approved_memories",
      budgetedMemoryRefs.included.length,
      budgetedMemoryRefs.estimatedTokens,
      options,
      budgetedMemoryRefs.notes.length > 0
        ? budgetedMemoryRefs.notes
        : ["Approved memory refs fit within context budget rules."],
    ),
    buildUsage(
      "stale_warnings",
      staleWarnings.length,
      estimateTokens(staleWarnings.join(" ")),
      options,
      staleWarnings.length > 0
        ? ["Stale memory warnings included visibly."]
        : ["No stale memory warnings included."],
    ),
    buildUsage(
      "conflict_warnings",
      conflictWarnings.length,
      estimateTokens(conflictWarnings.join(" ")),
      options,
      conflictWarnings.length > 0
        ? ["Conflict warnings included visibly."]
        : ["No conflict warnings included."],
    ),
  ];

  const budgetNotes = [
    "Current context pack preview uses approved-memory read layer refs only.",
    "Context budget rules trim by item count and estimated token budget.",
    "Source-of-truth hierarchy remains visible before lower-authority memory.",
    options.privacy_mode_active
      ? "Privacy mode active: memory refs are blocked from context use preview."
      : "Privacy mode inactive in this preview.",
    options.do_not_remember_rules_active
      ? "Do-not-remember rules active: matching refs remain excluded."
      : "Do-not-remember rules inactive in this preview.",
    ...budgetedMemoryRefs.notes,
  ];

  const budgetNotesUsage = buildUsage(
    "budget_notes",
    budgetNotes.length,
    estimateTokens(budgetNotes.join(" ")),
    options,
    ["Context budget notes explain current pack decisions."],
  );

  sectionBudgetUsages.push(budgetNotesUsage);

  const estimatedTotalTokens = sectionBudgetUsages.reduce(
    (sum, usage) => sum + usage.estimated_tokens,
    0,
  );

  const privacyModeActive = Boolean(options.privacy_mode_active);
  const doNotRememberRulesActive = Boolean(options.do_not_remember_rules_active);

  const includedRefs = privacyModeActive
    ? []
    : budgetedMemoryRefs.included.map((ref) => ({
        ...ref,
        allowed_for_context: !doNotRememberRulesActive && ref.allowed_for_context,
      }));

  const excludedRefs = privacyModeActive
    ? [
        ...budgetedMemoryRefs.included.map((ref) => ({
          ...ref,
          allowed_for_context: false,
          reason_included:
            "Excluded from current context pack preview because privacy mode is active.",
        })),
        ...excludedMemoryRefs,
      ]
    : excludedMemoryRefs;

  return {
    kind: "current_context_pack",
    preview_id: "phase-15j-current-context-pack-preview",
    builder_phase: "Phase 15J",
    title: "Current Context Pack Builder + Context Budget Rules",
    user_id: input.user_id ?? "preview-user",
    active_route: options.active_route ?? "carnos",
    active_project:
      options.active_project ??
      input.project_system_state?.project_preview.project_name ??
      "ascendOS + Carnos",
    active_phase:
      options.active_phase ??
      input.project_system_state?.project_preview.next_phase ??
      "Phase 15J — Current Context Pack Builder + Context Budget Rules",
    included_memory_refs: includedRefs,
    excluded_memory_refs: excludedRefs,
    privacy_mode_active: privacyModeActive,
    do_not_remember_rules_active: doNotRememberRulesActive,
    context_budget_notes: budgetNotes,
    conflict_warnings: conflictWarnings,
    stale_memory_warnings: staleWarnings,
    generated_at: "preview-only",
    token_budget: {
      max_total_estimated_tokens: maxTotalEstimatedTokens,
      estimated_total_tokens: estimatedTotalTokens,
      over_budget: estimatedTotalTokens > maxTotalEstimatedTokens,
    },
    section_budget_usages: sectionBudgetUsages,
    source_sections: {
      carnos_entity_state_summary: input.carnos_entity_state,
      project_system_state_summary: input.project_system_state,
      source_of_truth_hierarchy_notes: sourceNotes,
    },
    memory_usage_event_preview: {
      event_type: "memory_used_in_context_pack",
      would_log_count: includedRefs.length,
      persistence: "disabled_preview_only",
    },
    visibility_notes: [
      "Included memory refs are visible in preview.",
      "Excluded memory refs are visible when include_excluded_preview is enabled.",
      "Stale and conflict warnings are visible before response use.",
      "This builder creates no hidden Carnos prompt injection.",
      "Phase 15K will expose Carnos memory visibility panel details.",
    ],
    boundary: PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_BOUNDARY,
  };
}

export function summarizeCurrentContextPack(
  contextPack: CurrentContextPackPreview,
): CurrentContextPackBuilderResult {
  const warningCount =
    contextPack.stale_memory_warnings.length +
    contextPack.conflict_warnings.length +
    contextPack.section_budget_usages.filter((usage) => usage.over_budget).length;

  return {
    context_pack: contextPack,
    budget_rules: createContextPackBudgetRules(),
    included_count: contextPack.included_memory_refs.length,
    excluded_count: contextPack.excluded_memory_refs.length,
    warning_count: warningCount,
    boundary_notes: [
      "Current context pack preview only.",
      "No approval.",
      "No persistence.",
      "No Supabase calls.",
      "No SQL reads or writes.",
      "No embeddings.",
      "No provider calls.",
      "No hidden Carnos prompt injection.",
      "No standalone /memory route.",
    ],
  };
}

export function createDefaultCurrentContextPackBuilderResult(): CurrentContextPackBuilderResult {
  return summarizeCurrentContextPack(createCurrentContextPackPreview());
}
