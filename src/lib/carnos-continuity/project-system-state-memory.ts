/**
 * Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy
 *
 * Preview-only helper for project continuity, system continuity, and source-of-truth hierarchy.
 *
 * Purpose:
 * - Represent project/system memory state previews without persistence.
 * Audit markers:
 * - Project memory state
 * - System state memory
 * - latest commit
 * - Keep FINAL_SYNCED DOCX/JSON source hierarchy visible.
 * - Keep old 15-phase roadmap marked as outdated.
 * - Keep JSON chunks 0-21 as the active chunk model.
 * - Surface active boundaries, deferred scope, known errors, verification gates, and next objectives.
 *
 * Boundary:
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
 * - Phase 15J — Current Context Pack Builder + Context Budget Rules remains next
 */

import type {
  ProjectMemoryStateContract,
  SystemStateMemoryContract,
} from "./memory-contracts";

export type ProjectSystemStateSourceLevel =
  | "final_synced_docx"
  | "final_synced_json"
  | "repo_log"
  | "phase_report"
  | "audit_report"
  | "runtime_preview"
  | "outdated_memory";

export type ProjectSystemStatePreviewStatus =
  | "active"
  | "paused"
  | "archived"
  | "forgotten"
  | "outdated";

export interface SourceOfTruthHierarchyEntry {
  level: ProjectSystemStateSourceLevel;
  label: string;
  rank: number;
  status: "authoritative" | "supporting" | "derived" | "outdated";
  reason: string;
}

export interface ProjectStateMemoryPreview
  extends Omit<ProjectMemoryStateContract, "kind" | "user_id"> {
  kind: "project_memory_state_preview";
  project_key: string;
  state_summary: string;
  latest_milestone?: string;
  next_step?: string;
  status: ProjectSystemStatePreviewStatus;
  source_of_truth_ref?: string;
  source_hierarchy_preview: SourceOfTruthHierarchyEntry[];
}

export interface SystemStateMemoryPreview
  extends Omit<SystemStateMemoryContract, "kind" | "user_id"> {
  kind: "system_state_memory_preview";
  system_key: string;
  system_name: string;
  source_of_truth_rank: number;
  state_summary: string;
  status: ProjectSystemStatePreviewStatus;
  source_hierarchy_preview: SourceOfTruthHierarchyEntry[];
}

export interface ProjectSystemStateMemoryInput {
  project?: Partial<ProjectStateMemoryPreview>;
  system?: Partial<SystemStateMemoryPreview>;
  completed_phases?: string[];
  known_errors?: string[];
  active_boundaries?: string[];
  deferred_scope?: string[];
  verification_gates?: string[];
  source_hierarchy?: SourceOfTruthHierarchyEntry[];
}

export interface ProjectSystemStateHierarchyEvaluation {
  authoritative_source: string;
  active_chunk_model: "JSON chunks 0-21";
  outdated_models: string[];
  source_hierarchy_valid: boolean;
  source_hierarchy_notes: string[];
  blocked_outdated_models: string[];
}

export interface ProjectSystemStateMemorySummary {
  phase: "Phase 15I";
  title: "Project/System State Memory + Source-of-Truth Hierarchy";
  project_preview: ProjectStateMemoryPreview;
  system_preview: SystemStateMemoryPreview;
  hierarchy_evaluation: ProjectSystemStateHierarchyEvaluation;
  active_boundary_count: number;
  deferred_scope_count: number;
  verification_gate_count: number;
  known_error_count: number;
  next_phase: "Phase 15J — Current Context Pack Builder + Context Budget Rules";
  boundary: typeof PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_BOUNDARY;
}

export const DEFAULT_SOURCE_OF_TRUTH_HIERARCHY: SourceOfTruthHierarchyEntry[] = [
  {
    level: "final_synced_json",
    label: "ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
    rank: 1,
    status: "authoritative",
    reason:
      "FINAL_SYNCED JSON is the active implementation source for chunks 0-21.",
  },
  {
    level: "final_synced_docx",
    label: "ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
    rank: 2,
    status: "authoritative",
    reason:
      "FINAL_SYNCED DOCX is the high-level source-of-truth bible and roadmap reference.",
  },
  {
    level: "repo_log",
    label: "PROJECT_EXECUTION_LOG.md / CODE_LEDGER.md / PHASE_STATUS.md",
    rank: 3,
    status: "supporting",
    reason:
      "Repo logs record completed implementation state and commit continuity.",
  },
  {
    level: "phase_report",
    label: "docs/phase-reports",
    rank: 4,
    status: "supporting",
    reason:
      "Phase reports provide scoped completion evidence and deferred boundaries.",
  },
  {
    level: "audit_report",
    label: "scripts/audit-phase-* and docs/audits",
    rank: 5,
    status: "supporting",
    reason:
      "Audit gates verify structural presence, boundaries, and source alignment.",
  },
  {
    level: "outdated_memory",
    label: "Old 15-phase roadmap",
    rank: 99,
    status: "outdated",
    reason:
      "Old 15-phase roadmap is outdated; JSON chunks 0-21 are active.",
  },
];

export const DEFAULT_PROJECT_STATE_MEMORY_PREVIEW: ProjectStateMemoryPreview = {
  kind: "project_memory_state_preview",
  project_key: "ascendos-carnos",
  project_name: "ascendOS + Carnos",
  repo_path: "~/Desktop/ascendos",
  remote_url: "https://github.com/AneeshHatkar/ascendos.git",
  branch: "main",
  latest_commit: "1b19c70",
  last_pushed_commit: "1b19c70",
  current_phase:
    "Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy",
  completed_phases: [
    "15A",
    "15B",
    "15C",
    "15D",
    "15E",
    "15F",
    "15G",
    "15H",
  ],
  next_phase: "Phase 15J — Current Context Pack Builder + Context Budget Rules",
  source_of_truth_files: [
    "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
    "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
  ],
  active_boundaries: [
    "No silent memory.",
    "No automatic transcript-to-memory.",
    "No direct autonomous memory writes.",
    "No embeddings before approval.",
    "No hidden memory retrieval.",
    "No standalone /memory route yet.",
  ],
  deferred_scope: [
    "Current context pack builder remains Phase 15J.",
    "Carnos memory visibility panel remains Phase 15K.",
    "Knowledge vault foundation remains Phase 15L.",
    "Retrieval contract remains Phase 15M.",
    "Embedding boundary/noop provider remains Phase 15N.",
    "Forget/delete derived records remains Phase 15O.",
  ],
  known_errors: [],
  verification_gates: [
    "npm run audit:phase15i",
    "npm run build",
    "npm run check",
  ],
  source_of_truth_ref: "FINAL_SYNCED DOCX/JSON",
  state_summary:
    "ascendOS + Carnos is in Phase 15I with persistent memory foundations completed through Carnos entity state preview. Source-of-truth hierarchy remains FINAL_SYNCED JSON/DOCX first, repo logs second, phase/audit reports third, and old 15-phase roadmap blocked as outdated.",
  status: "active",
  source_hierarchy_preview: DEFAULT_SOURCE_OF_TRUTH_HIERARCHY,
};

export const DEFAULT_SYSTEM_STATE_MEMORY_PREVIEW: SystemStateMemoryPreview = {
  kind: "system_state_memory_preview",
  app_name: "ascendOS",
  ai_persona: "Carnos",
  system_key: "ascendos-source-hierarchy",
  system_name: "ascendOS Source-of-Truth Hierarchy",
  source_of_truth_rank: 1,
  state_summary:
    "FINAL_SYNCED JSON/DOCX define the active implementation source hierarchy. JSON chunks 0-21 are active; the old 15-phase roadmap is outdated and must not drive implementation.",
  status: "active",
  source_hierarchy: [
    "FINAL_SYNCED JSON",
    "FINAL_SYNCED DOCX",
    "Repo logs",
    "Phase reports",
    "Audit reports",
    "Runtime previews",
  ],
  active_chunk_model: "JSON chunks 0-21",
  outdated_models: ["Old 15-phase roadmap"],
  current_major_chunk: "Phase 15 — Carnos Persistent Memory + Continuity Foundation",
  current_internal_step:
    "Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy",
  source_hierarchy_preview: DEFAULT_SOURCE_OF_TRUTH_HIERARCHY,
};

export const PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_BOUNDARY = {
  phase: "Phase 15I",
  name: "Project/System State Memory + Source-of-Truth Hierarchy",
  description:
    "Preview-only project/system continuity state and source-of-truth hierarchy helper for ascendOS + Carnos.",
  allowed: [
    "Create project memory state previews.",
    "Create system state memory previews.",
    "Evaluate source-of-truth hierarchy ordering.",
    "Mark old 15-phase roadmap as outdated.",
    "Represent JSON chunks 0-21 as active.",
    "Summarize active boundaries, deferred scope, known errors, and verification gates.",
  ],
  forbidden: [
    "no approval",
    "no persistence",
    "no Supabase calls",
    "no SQL reads or writes",
    "no retrieval",
    "no embeddings",
    "no provider calls",
    "no hidden Carnos prompt injection",
    "no context pack builder",
    "no standalone /memory route",
  ],
  next_phase: "Phase 15J — Current Context Pack Builder + Context Budget Rules",
} as const;

function uniqueStrings(values: readonly string[] | undefined) {
  return [...new Set((values ?? []).map((value) => value.trim()).filter(Boolean))];
}

function normalizeHierarchy(
  hierarchy: SourceOfTruthHierarchyEntry[] | undefined,
) {
  const source = hierarchy && hierarchy.length > 0
    ? hierarchy
    : DEFAULT_SOURCE_OF_TRUTH_HIERARCHY;

  return [...source].sort((first, second) => first.rank - second.rank);
}

export function createProjectStateMemoryPreview(
  input: Partial<ProjectStateMemoryPreview> = {},
): ProjectStateMemoryPreview {
  const sourceHierarchy = normalizeHierarchy(input.source_hierarchy_preview);

  return {
    ...DEFAULT_PROJECT_STATE_MEMORY_PREVIEW,
    ...input,
    kind: "project_memory_state_preview",
    project_key:
      input.project_key ?? DEFAULT_PROJECT_STATE_MEMORY_PREVIEW.project_key,
    project_name:
      input.project_name ?? DEFAULT_PROJECT_STATE_MEMORY_PREVIEW.project_name,
    completed_phases: uniqueStrings([
      ...DEFAULT_PROJECT_STATE_MEMORY_PREVIEW.completed_phases,
      ...(input.completed_phases ?? []),
    ]),
    source_of_truth_files: uniqueStrings([
      ...DEFAULT_PROJECT_STATE_MEMORY_PREVIEW.source_of_truth_files,
      ...(input.source_of_truth_files ?? []),
    ]),
    active_boundaries: uniqueStrings([
      ...DEFAULT_PROJECT_STATE_MEMORY_PREVIEW.active_boundaries,
      ...(input.active_boundaries ?? []),
    ]),
    deferred_scope: uniqueStrings([
      ...DEFAULT_PROJECT_STATE_MEMORY_PREVIEW.deferred_scope,
      ...(input.deferred_scope ?? []),
    ]),
    known_errors: uniqueStrings(input.known_errors),
    verification_gates: uniqueStrings([
      ...DEFAULT_PROJECT_STATE_MEMORY_PREVIEW.verification_gates,
      ...(input.verification_gates ?? []),
    ]),
    source_hierarchy_preview: sourceHierarchy,
  };
}

export function createSystemStateMemoryPreview(
  input: Partial<SystemStateMemoryPreview> = {},
): SystemStateMemoryPreview {
  const sourceHierarchy = normalizeHierarchy(input.source_hierarchy_preview);

  return {
    ...DEFAULT_SYSTEM_STATE_MEMORY_PREVIEW,
    ...input,
    kind: "system_state_memory_preview",
    app_name: "ascendOS",
    ai_persona: "Carnos",
    active_chunk_model: "JSON chunks 0-21",
    outdated_models: uniqueStrings([
      ...DEFAULT_SYSTEM_STATE_MEMORY_PREVIEW.outdated_models,
      ...(input.outdated_models ?? []),
    ]),
    source_hierarchy: uniqueStrings([
      ...DEFAULT_SYSTEM_STATE_MEMORY_PREVIEW.source_hierarchy,
      ...(input.source_hierarchy ?? []),
    ]),
    source_hierarchy_preview: sourceHierarchy,
  };
}

export function evaluateSourceOfTruthHierarchy(
  hierarchy: SourceOfTruthHierarchyEntry[] = DEFAULT_SOURCE_OF_TRUTH_HIERARCHY,
): ProjectSystemStateHierarchyEvaluation {
  const normalized = normalizeHierarchy(hierarchy);
  const topSource = normalized[0];
  const outdatedSources = normalized.filter((entry) => entry.status === "outdated");
  const hasFinalSyncedJson = normalized.some(
    (entry) => entry.level === "final_synced_json" && entry.rank === 1,
  );
  const hasFinalSyncedDocx = normalized.some(
    (entry) => entry.level === "final_synced_docx" && entry.rank <= 2,
  );
  const hasOutdatedRoadmapBlock = outdatedSources.some((entry) =>
    entry.label.toLowerCase().includes("15-phase"),
  );

  const notes = [
    hasFinalSyncedJson
      ? "FINAL_SYNCED JSON is ranked first."
      : "FINAL_SYNCED JSON is not ranked first.",
    hasFinalSyncedDocx
      ? "FINAL_SYNCED DOCX is ranked as authoritative support."
      : "FINAL_SYNCED DOCX is missing from the authoritative tier.",
    hasOutdatedRoadmapBlock
      ? "Old 15-phase roadmap is explicitly blocked as outdated."
      : "Old 15-phase roadmap is not explicitly blocked.",
    "JSON chunks 0-21 are active.",
  ];

  return {
    authoritative_source: topSource?.label ?? "Unknown",
    active_chunk_model: "JSON chunks 0-21",
    outdated_models: outdatedSources.map((entry) => entry.label),
    source_hierarchy_valid:
      hasFinalSyncedJson && hasFinalSyncedDocx && hasOutdatedRoadmapBlock,
    source_hierarchy_notes: notes,
    blocked_outdated_models: outdatedSources.map((entry) => entry.reason),
  };
}

export function createProjectSystemStateMemoryPreview(
  input: ProjectSystemStateMemoryInput = {},
): ProjectSystemStateMemorySummary {
  const sourceHierarchy = normalizeHierarchy(input.source_hierarchy);
  const project = createProjectStateMemoryPreview({
    ...input.project,
    completed_phases: input.completed_phases ?? input.project?.completed_phases,
    known_errors: input.known_errors ?? input.project?.known_errors,
    active_boundaries:
      input.active_boundaries ?? input.project?.active_boundaries,
    deferred_scope: input.deferred_scope ?? input.project?.deferred_scope,
    verification_gates:
      input.verification_gates ?? input.project?.verification_gates,
    source_hierarchy_preview: sourceHierarchy,
  });
  const system = createSystemStateMemoryPreview({
    ...input.system,
    source_hierarchy_preview: sourceHierarchy,
  });
  const hierarchyEvaluation = evaluateSourceOfTruthHierarchy(sourceHierarchy);

  return {
    phase: "Phase 15I",
    title: "Project/System State Memory + Source-of-Truth Hierarchy",
    project_preview: project,
    system_preview: system,
    hierarchy_evaluation: hierarchyEvaluation,
    active_boundary_count: project.active_boundaries.length,
    deferred_scope_count: project.deferred_scope.length,
    verification_gate_count: project.verification_gates.length,
    known_error_count: project.known_errors.length,
    next_phase: "Phase 15J — Current Context Pack Builder + Context Budget Rules",
    boundary: PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_BOUNDARY,
  };
}

export function summarizeProjectSystemStateMemory(
  summary: ProjectSystemStateMemorySummary,
): string {
  const validity = summary.hierarchy_evaluation.source_hierarchy_valid
    ? "valid"
    : "needs review";

  return `${summary.project_preview.project_name} is in ${summary.project_preview.current_phase}. Source hierarchy is ${validity}; active model is ${summary.hierarchy_evaluation.active_chunk_model}; next phase is ${summary.next_phase}.`;
}

export function createDefaultProjectSystemStateMemorySummary() {
  return createProjectSystemStateMemoryPreview();
}
