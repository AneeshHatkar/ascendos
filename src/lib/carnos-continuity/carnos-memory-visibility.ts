/**
 * Phase 15K — Carnos Memory Visibility Panel.
 *
 * Preview-only visibility composition for Carnos memory/context state.
 *
 * Purpose:
 * - Show what memory/context signals Carnos can see before any response.
 * - Compose approved-memory read layer visibility, current context pack visibility,
 *   Carnos entity state, project/system state memory, source-of-truth hierarchy,
 *   privacy mode, do-not-remember state, stale warnings, conflict warnings, and
 *   memory usage transparency into one visible summary.
 *
 * Audit markers:
 * - Phase 15K
 * - Carnos Memory Visibility Panel
 * - Carnos memory visibility
 * - visible memory refs
 * - hidden memory blocked
 * - current context pack visibility
 * - approved-memory read layer visibility
 * - Carnos entity state visibility
 * - project/system state memory visibility
 * - source-of-truth hierarchy visibility
 * - privacy mode active
 * - do-not-remember rules active
 * - stale memory warnings
 * - conflict warnings
 * - memory_used_in_context_pack
 * - memory_used_in_carnos_response
 * - memory usage transparency
 * - preview only
 * - no approval
 * - no persistence
 * - no Supabase calls
 * - no SQL reads or writes
 * - no retrieval
 * - no embeddings
 * - no provider calls
 * - no hidden Carnos prompt injection
 * - no standalone /memory route
 * - Phase 15L — Knowledge Vault Foundation
 */

import type {
  ApprovedMemoryReadLayerResult,
  ApprovedMemoryRankedReference,
} from "./approved-memory-read-layer";
import {
  createDefaultCarnosEntityStateSummary,
  type CarnosEntityStateSummary,
} from "./carnos-entity-state";
import {
  createDefaultCurrentContextPackBuilderResult,
  type CurrentContextPackBuilderResult,
} from "./current-context-pack-builder";
import {
  createDefaultProjectSystemStateMemorySummary,
  type ProjectSystemStateMemorySummary,
} from "./project-system-state-memory";

export type CarnosMemoryVisibilitySignalKey =
  | "approved_memory_read_layer"
  | "current_context_pack"
  | "carnos_entity_state"
  | "project_system_state"
  | "source_of_truth_hierarchy"
  | "privacy_controls"
  | "usage_transparency"
  | "blocked_hidden_memory";

export type CarnosMemoryVisibilitySignal = {
  key: CarnosMemoryVisibilitySignalKey;
  label: string;
  status: "visible" | "limited" | "blocked" | "deferred";
  count: number;
  reason: string;
};

export type CarnosMemoryVisibleReference = {
  memory_id: string;
  title: string;
  content_preview: string;
  reason_visible: string;
  source_label: string;
  sensitivity: string;
  staleness: string;
  conflict_severity: string;
  ranking_score?: number;
  allowed_for_context: boolean;
};

export type CarnosMemoryVisibilityInput = {
  user_id?: string;
  approved_read_layer?: ApprovedMemoryReadLayerResult;
  current_context_pack?: CurrentContextPackBuilderResult;
  carnos_entity_state?: CarnosEntityStateSummary;
  project_system_state?: ProjectSystemStateMemorySummary;
  active_surface?: "carnos" | "command" | "privacy" | "knowledge" | "project" | "system";
};

export type CarnosMemoryVisibilitySummary = {
  phase: "Phase 15K";
  title: "Carnos Memory Visibility Panel";
  user_id: string;
  active_surface: string;
  visible_memory_refs: CarnosMemoryVisibleReference[];
  excluded_memory_refs: CarnosMemoryVisibleReference[];
  visibility_signals: CarnosMemoryVisibilitySignal[];
  context_pack_summary: {
    included_count: number;
    excluded_count: number;
    warning_count: number;
    estimated_total_tokens: number;
    max_total_estimated_tokens: number;
    over_budget: boolean;
  };
  carnos_entity_summary: CarnosEntityStateSummary;
  project_system_summary: ProjectSystemStateMemorySummary;
  source_of_truth_notes: string[];
  stale_memory_warnings: string[];
  conflict_warnings: string[];
  privacy_mode_active: boolean;
  do_not_remember_rules_active: boolean;
  memory_usage_transparency: {
    context_pack_event_type: "memory_used_in_context_pack";
    carnos_response_event_type: "memory_used_in_carnos_response";
    would_log_context_count: number;
    would_log_response_count: number;
    persistence: "disabled_preview_only";
  };
  boundary_notes: string[];
  boundary: typeof PHASE_15K_CARNOS_MEMORY_VISIBILITY_BOUNDARY;
};

export const PHASE_15K_CARNOS_MEMORY_VISIBILITY_BOUNDARY = {
  phase: "Phase 15K",
  name: "Carnos Memory Visibility Panel",
  preview_only: true,
  visibility_panel_only: true,
  no_approval: true,
  no_persistence: true,
  no_supabase_calls: true,
  no_sql_reads_or_writes: true,
  no_retrieval: true,
  no_embeddings: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_standalone_memory_route: true,
  next_phase: "Phase 15L — Knowledge Vault Foundation",
  boundary_rules: [
    "Only already-built local previews are composed.",
    "No memory is fetched, retrieved, approved, written, embedded, or injected.",
    "Carnos memory visibility must show included and excluded refs visibly.",
    "Privacy mode and do-not-remember state must remain visible.",
    "Source-of-truth hierarchy remains visible before lower-authority memory.",
    "Memory usage events are previews only and are not persisted.",
    "No standalone /memory route is added.",
  ],
} as const;

function toVisibleReference(
  ref: ApprovedMemoryRankedReference,
  fallbackReason: string,
): CarnosMemoryVisibleReference {
  return {
    memory_id: ref.memory_id,
    title: ref.title,
    content_preview: ref.content_preview,
    reason_visible: ref.reason_included || fallbackReason,
    source_label: ref.provenance.source_label ?? "unknown source",
    sensitivity: ref.sensitivity,
    staleness: ref.staleness,
    conflict_severity: ref.conflict_severity,
    ranking_score: ref.ranking_score,
    allowed_for_context: ref.allowed_for_context,
  };
}

function toContextPackReference(
  ref: {
    memory_id: string;
    title: string;
    content_preview: string;
    reason_included: string;
    provenance: { source_label?: string };
    sensitivity: string;
    staleness: string;
    conflict_severity: string;
    allowed_for_context: boolean;
  },
  fallbackReason: string,
): CarnosMemoryVisibleReference {
  return {
    memory_id: ref.memory_id,
    title: ref.title,
    content_preview: ref.content_preview,
    reason_visible: ref.reason_included || fallbackReason,
    source_label: ref.provenance.source_label ?? "unknown source",
    sensitivity: ref.sensitivity,
    staleness: ref.staleness,
    conflict_severity: ref.conflict_severity,
    allowed_for_context: ref.allowed_for_context,
  };
}

function uniqueByMemoryId(
  refs: CarnosMemoryVisibleReference[],
): CarnosMemoryVisibleReference[] {
  const seen = new Set<string>();
  const output: CarnosMemoryVisibleReference[] = [];

  for (const ref of refs) {
    if (seen.has(ref.memory_id)) continue;
    seen.add(ref.memory_id);
    output.push(ref);
  }

  return output;
}

function sourceOfTruthNotes(projectSystemState: ProjectSystemStateMemorySummary): string[] {
  return projectSystemState.project_preview.source_hierarchy_preview
    .slice()
    .sort((left, right) => left.rank - right.rank)
    .map(
      (entry) =>
        `${entry.rank}. ${entry.label} — ${entry.status}: ${entry.reason}`,
    );
}

function buildVisibilitySignals(
  summary: {
    visibleCount: number;
    excludedCount: number;
    contextIncludedCount: number;
    privacyModeActive: boolean;
    doNotRememberRulesActive: boolean;
    staleWarningCount: number;
    conflictWarningCount: number;
  },
): CarnosMemoryVisibilitySignal[] {
  return [
    {
      key: "approved_memory_read_layer",
      label: "Approved-memory read layer visibility",
      status: summary.visibleCount > 0 ? "visible" : "limited",
      count: summary.visibleCount,
      reason:
        summary.visibleCount > 0
          ? "Approved-memory refs are visible after ranking and safety filtering."
          : "No approved-memory refs are visible in the default preview.",
    },
    {
      key: "current_context_pack",
      label: "Current context pack visibility",
      status: summary.contextIncludedCount > 0 ? "visible" : "limited",
      count: summary.contextIncludedCount,
      reason:
        "Current context pack refs are shown visibly before any Carnos response.",
    },
    {
      key: "carnos_entity_state",
      label: "Carnos entity state visibility",
      status: "visible",
      count: 1,
      reason:
        "Carnos role, mission, mode, phase, policy, and response boundaries are visible.",
    },
    {
      key: "project_system_state",
      label: "Project/system state memory visibility",
      status: "visible",
      count: 1,
      reason:
        "Project/system phase, source hierarchy, active boundaries, and next objective are visible.",
    },
    {
      key: "source_of_truth_hierarchy",
      label: "Source-of-truth hierarchy visibility",
      status: "visible",
      count: 1,
      reason:
        "FINAL_SYNCED JSON/DOCX remain visible as the highest source-of-truth authority.",
    },
    {
      key: "privacy_controls",
      label: "Privacy and do-not-remember visibility",
      status:
        summary.privacyModeActive || summary.doNotRememberRulesActive
          ? "blocked"
          : "visible",
      count:
        Number(summary.privacyModeActive) + Number(summary.doNotRememberRulesActive),
      reason:
        summary.privacyModeActive || summary.doNotRememberRulesActive
          ? "Privacy mode or do-not-remember rules are active and block memory use preview."
          : "Privacy mode and do-not-remember rules are inactive in this preview.",
    },
    {
      key: "usage_transparency",
      label: "Memory usage transparency",
      status: "visible",
      count: summary.contextIncludedCount,
      reason:
        "memory_used_in_context_pack and memory_used_in_carnos_response are shown as preview-only usage events.",
    },
    {
      key: "blocked_hidden_memory",
      label: "Hidden memory blocked",
      status: "blocked",
      count: summary.excludedCount + summary.staleWarningCount + summary.conflictWarningCount,
      reason:
        "Hidden retrieval and hidden Carnos prompt injection remain blocked; excluded refs and warnings stay visible.",
    },
  ];
}

export function createCarnosMemoryVisibilitySummary(
  input: CarnosMemoryVisibilityInput = {},
): CarnosMemoryVisibilitySummary {
  const currentContextPack =
    input.current_context_pack ?? createDefaultCurrentContextPackBuilderResult();
  const contextPack = currentContextPack.context_pack;
  const carnosEntityState =
    input.carnos_entity_state ?? createDefaultCarnosEntityStateSummary();
  const projectSystemState =
    input.project_system_state ?? createDefaultProjectSystemStateMemorySummary();

  const readLayerIncluded =
    input.approved_read_layer?.included_refs.map((ref) =>
      toVisibleReference(ref, "Visible through approved-memory read layer."),
    ) ?? [];

  const readLayerExcluded =
    input.approved_read_layer?.excluded_refs.map((ref) =>
      toVisibleReference(ref, "Excluded by approved-memory read layer."),
    ) ?? [];

  const contextIncluded = contextPack.included_memory_refs.map((ref) =>
    toContextPackReference(ref, "Visible through current context pack."),
  );

  const contextExcluded = contextPack.excluded_memory_refs.map((ref) =>
    toContextPackReference(ref, "Excluded from current context pack."),
  );

  const visibleMemoryRefs = uniqueByMemoryId([
    ...contextIncluded,
    ...readLayerIncluded,
  ]);

  const excludedMemoryRefs = uniqueByMemoryId([
    ...contextExcluded,
    ...readLayerExcluded,
  ]);

  const staleMemoryWarnings = [
    ...new Set([
      ...(input.approved_read_layer?.stale_memory_warnings ?? []),
      ...contextPack.stale_memory_warnings,
    ]),
  ];

  const conflictWarnings = [
    ...new Set([
      ...(input.approved_read_layer?.conflict_warnings ?? []),
      ...contextPack.conflict_warnings,
    ]),
  ];

  const visibilitySignals = buildVisibilitySignals({
    visibleCount: visibleMemoryRefs.length,
    excludedCount: excludedMemoryRefs.length,
    contextIncludedCount: contextPack.included_memory_refs.length,
    privacyModeActive: contextPack.privacy_mode_active,
    doNotRememberRulesActive: contextPack.do_not_remember_rules_active,
    staleWarningCount: staleMemoryWarnings.length,
    conflictWarningCount: conflictWarnings.length,
  });

  return {
    phase: "Phase 15K",
    title: "Carnos Memory Visibility Panel",
    user_id: input.user_id ?? "preview-user",
    active_surface: input.active_surface ?? "carnos",
    visible_memory_refs: visibleMemoryRefs,
    excluded_memory_refs: excludedMemoryRefs,
    visibility_signals: visibilitySignals,
    context_pack_summary: {
      included_count: currentContextPack.included_count,
      excluded_count: currentContextPack.excluded_count,
      warning_count: currentContextPack.warning_count,
      estimated_total_tokens: contextPack.token_budget.estimated_total_tokens,
      max_total_estimated_tokens: contextPack.token_budget.max_total_estimated_tokens,
      over_budget: contextPack.token_budget.over_budget,
    },
    carnos_entity_summary: carnosEntityState,
    project_system_summary: projectSystemState,
    source_of_truth_notes: sourceOfTruthNotes(projectSystemState),
    stale_memory_warnings: staleMemoryWarnings,
    conflict_warnings: conflictWarnings,
    privacy_mode_active: contextPack.privacy_mode_active,
    do_not_remember_rules_active: contextPack.do_not_remember_rules_active,
    memory_usage_transparency: {
      context_pack_event_type: "memory_used_in_context_pack",
      carnos_response_event_type: "memory_used_in_carnos_response",
      would_log_context_count:
        contextPack.memory_usage_event_preview.would_log_count,
      would_log_response_count: visibleMemoryRefs.length,
      persistence: "disabled_preview_only",
    },
    boundary_notes: [
      "Carnos memory visibility panel is preview only.",
      "No approval.",
      "No persistence.",
      "No Supabase calls.",
      "No SQL reads or writes.",
      "No retrieval.",
      "No embeddings.",
      "No provider calls.",
      "No hidden Carnos prompt injection.",
      "No standalone /memory route.",
      "Phase 15L Knowledge Vault Foundation remains next.",
    ],
    boundary: PHASE_15K_CARNOS_MEMORY_VISIBILITY_BOUNDARY,
  };
}

export function summarizeCarnosMemoryVisibility(
  input: CarnosMemoryVisibilityInput = {},
): CarnosMemoryVisibilitySummary {
  return createCarnosMemoryVisibilitySummary(input);
}

export function createDefaultCarnosMemoryVisibilitySummary(): CarnosMemoryVisibilitySummary {
  return createCarnosMemoryVisibilitySummary();
}
