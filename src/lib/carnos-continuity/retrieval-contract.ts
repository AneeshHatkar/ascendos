/**
 * Phase 15M — Retrieval Contract + Provenance + Conflict Handling.
 *
 * Retrieval Contract + Provenance + Conflict Handling.
 * retrieval contract.
 * provenance required.
 * conflict handling.
 * source authority.
 * visible source labels.
 * allowed retrieval surfaces.
 * blocked retrieval reasons.
 * memory retrieval remains preview-only.
 * knowledge retrieval remains preview-only.
 * no SQL reads or writes.
 * no Supabase calls.
 * no embeddings.
 * no vector search.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * no standalone /memory route.
 * Phase 15N — Embedding Boundary / Noop Provider.
 */

import type {
  ApprovedMemoryContract,
  ContextPackMemoryReference,
  KnowledgeVaultItemContract,
  MemoryProvenance,
} from "./memory-contracts";
import {
  compareMemoryAuthority,
  getMemorySensitivityRule,
  getSourceAuthorityRank,
  getStalenessRule,
  isBlockedMemoryStatus,
  isRetrievableMemoryStatus,
} from "./memory-conflict-rules";
import type {
  MemoryConflictSeverity,
  MemoryDomainScope,
  MemoryEntityKind,
  MemorySensitivityLevel,
  MemorySourceAuthority,
  MemorySourceType,
  MemoryStalenessState,
} from "./memory-enums";

export type RetrievalSurface =
  | "command"
  | "carnos"
  | "knowledge"
  | "privacy"
  | "projects"
  | "research"
  | "learning"
  | "career"
  | "health_body"
  | "grimoire"
  | "system_preview";

export type RetrievalEntityKind =
  | "approved_memory"
  | "knowledge_vault_item"
  | "context_pack_reference"
  | "project_state"
  | "system_state"
  | "carnos_entity_state";

export type RetrievalDecision =
  | "allowed_preview"
  | "blocked_private_mode"
  | "blocked_do_not_remember"
  | "blocked_status"
  | "blocked_sensitive"
  | "blocked_conflict"
  | "blocked_stale"
  | "blocked_no_provenance"
  | "blocked_wrong_surface"
  | "blocked_not_personal_memory"
  | "deferred_embeddings"
  | "deferred_runtime_retrieval";

export type RetrievalBlockedReason =
  | "private_mode_active"
  | "do_not_remember_rules_active"
  | "status_not_retrievable"
  | "restricted_sensitivity_without_explicit_allow"
  | "high_conflict_requires_review"
  | "stale_requires_reconfirmation"
  | "missing_provenance"
  | "surface_not_allowed"
  | "knowledge_not_personal_memory"
  | "embedding_boundary_not_ready"
  | "runtime_retrieval_deferred";

export type RetrievalProvenanceRequirement = {
  field:
    | "source_type"
    | "source_table"
    | "source_id"
    | "source_route"
    | "source_phase"
    | "source_commit"
    | "source_label"
    | "captured_at";
  required_for_memory: boolean;
  required_for_knowledge: boolean;
  reason: string;
};

export type RetrievalContractBoundary = {
  phase: "Phase 15M";
  name: "Retrieval Contract + Provenance + Conflict Handling";
  preview_only: true;
  retrieval_contract_only: true;
  no_runtime_retrieval: true;
  no_sql_reads_or_writes: true;
  no_supabase_calls: true;
  no_embeddings: true;
  no_vector_search: true;
  no_provider_calls: true;
  no_hidden_carnos_prompt_injection: true;
  no_standalone_memory_route: true;
  next_phase: "Phase 15N — Embedding Boundary / Noop Provider";
  boundary_rules: string[];
};

export type RetrievalContractOptions = {
  surface?: RetrievalSurface;
  active_route?: MemoryDomainScope;
  active_project?: string;
  private_mode_active?: boolean;
  do_not_remember_rules_active?: boolean;
  include_restricted?: boolean;
  include_stale_with_warning?: boolean;
  allow_knowledge_preview?: boolean;
  max_preview_items?: number;
};

export type RetrievalCandidateInput = {
  id: string;
  entity_kind: RetrievalEntityKind;
  title: string;
  content_preview: string;
  domain_scope: MemoryDomainScope;
  provenance?: MemoryProvenance;
  sensitivity: MemorySensitivityLevel;
  staleness: MemoryStalenessState;
  conflict_severity: MemoryConflictSeverity;
  source_type?: MemorySourceType;
  is_personal_memory: boolean;
  embedded: boolean;
  status?: string;
  confidence?: number;
  priority?: number;
  conflicts_with_ids?: string[];
};

export type RetrievalProvenanceSummary = {
  has_required_provenance: boolean;
  missing_fields: string[];
  visible_source_label: string;
  source_authority_rank: number;
  authority_note: string;
};

export type RetrievalConflictSummary = {
  conflict_severity: MemoryConflictSeverity;
  requires_review: boolean;
  conflict_note: string;
  compared_with_ids: string[];
};

export type RetrievalContractPreviewRef = {
  id: string;
  entity_kind: RetrievalEntityKind;
  memory_entity_kind: MemoryEntityKind;
  title: string;
  content_preview: string;
  domain_scope: MemoryDomainScope;
  retrieval_decision: RetrievalDecision;
  blocked_reasons: RetrievalBlockedReason[];
  allowed_for_context_preview: boolean;
  allowed_for_carnos_response_preview: boolean;
  provenance_summary: RetrievalProvenanceSummary;
  conflict_summary: RetrievalConflictSummary;
  sensitivity_rule: string;
  staleness_rule: string;
  visibility_note: string;
  source_label: string;
  preview_only: true;
};

export type RetrievalContractSummary = {
  phase: "Phase 15M";
  label: "Retrieval Contract + Provenance + Conflict Handling";
  total_candidates: number;
  allowed_preview_count: number;
  blocked_preview_count: number;
  memory_candidate_count: number;
  knowledge_candidate_count: number;
  conflict_warning_count: number;
  missing_provenance_count: number;
  runtime_retrieval_enabled: false;
  sql_runtime_enabled: false;
  embeddings_enabled: false;
  provider_calls_enabled: false;
  hidden_prompt_injection_enabled: false;
  route_surface: "/knowledge";
  next_phase: "Phase 15N — Embedding Boundary / Noop Provider";
  boundary_markers: string[];
  provenance_requirements: RetrievalProvenanceRequirement[];
};

export type RetrievalContractResult = {
  summary: RetrievalContractSummary;
  allowed_refs: RetrievalContractPreviewRef[];
  blocked_refs: RetrievalContractPreviewRef[];
  conflict_warnings: string[];
  provenance_warnings: string[];
  visibility_notes: string[];
  boundary: RetrievalContractBoundary;
};

export const PHASE_15M_RETRIEVAL_CONTRACT_BOUNDARY: RetrievalContractBoundary = {
  phase: "Phase 15M",
  name: "Retrieval Contract + Provenance + Conflict Handling",
  preview_only: true,
  retrieval_contract_only: true,
  no_runtime_retrieval: true,
  no_sql_reads_or_writes: true,
  no_supabase_calls: true,
  no_embeddings: true,
  no_vector_search: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_standalone_memory_route: true,
  next_phase: "Phase 15N — Embedding Boundary / Noop Provider",
  boundary_rules: [
    "Retrieval Contract is a deterministic local preview only.",
    "Every retrievable ref must expose provenance and visible source labels.",
    "Private mode and do-not-remember state block retrieval previews.",
    "Knowledge vault items remain not personal memory and cannot be silently injected.",
    "Restricted sensitivity requires explicit include_restricted=true.",
    "High or blocking conflicts require review instead of silent retrieval.",
    "Stale or needs-reconfirmation refs require warnings or review.",
    "No SQL reads or writes, no Supabase calls, no embeddings, no vector search, no provider calls, and no hidden Carnos prompt injection.",
  ],
} as const;

export const PHASE_15M_RETRIEVAL_BOUNDARY_MARKERS = [
  "Retrieval Contract + Provenance + Conflict Handling",
  "retrieval contract",
  "provenance required",
  "conflict handling",
  "source authority",
  "visible source labels",
  "allowed retrieval surfaces",
  "blocked retrieval reasons",
  "memory retrieval remains preview-only",
  "knowledge retrieval remains preview-only",
  "no SQL reads or writes",
  "no Supabase calls",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no standalone /memory route",
  "Phase 15N — Embedding Boundary / Noop Provider",
] as const;

export const RETRIEVAL_PROVENANCE_REQUIREMENTS: RetrievalProvenanceRequirement[] = [
  {
    field: "source_type",
    required_for_memory: true,
    required_for_knowledge: true,
    reason: "Source type determines authority rank and conflict arbitration.",
  },
  {
    field: "source_label",
    required_for_memory: true,
    required_for_knowledge: true,
    reason: "Visible source labels prevent hidden memory usage.",
  },
  {
    field: "source_route",
    required_for_memory: true,
    required_for_knowledge: true,
    reason: "Route provenance tells the user where the record surfaced.",
  },
  {
    field: "source_phase",
    required_for_memory: true,
    required_for_knowledge: true,
    reason: "Phase provenance keeps implementation continuity auditable.",
  },
  {
    field: "source_table",
    required_for_memory: false,
    required_for_knowledge: false,
    reason: "Table provenance is required only once SQL runtime retrieval is enabled.",
  },
  {
    field: "source_id",
    required_for_memory: false,
    required_for_knowledge: false,
    reason: "Source record IDs remain optional in preview-only local contracts.",
  },
  {
    field: "source_commit",
    required_for_memory: false,
    required_for_knowledge: false,
    reason: "Commit provenance is useful for project/system memory but not mandatory for every preview.",
  },
  {
    field: "captured_at",
    required_for_memory: false,
    required_for_knowledge: false,
    reason: "Captured timestamp supports future freshness scoring.",
  },
];

const DEFAULT_RETRIEVAL_PROVENANCE: MemoryProvenance = {
  source_type: "phase_report",
  source_route: "/knowledge",
  source_phase: "Phase 15M",
  source_label: "Phase 15M retrieval contract preview",
};

function normalizeSurface(surface?: RetrievalSurface): RetrievalSurface {
  return surface ?? "knowledge";
}

function hasText(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

function provenanceRequiredFieldsForKind(
  kind: RetrievalEntityKind,
): RetrievalProvenanceRequirement[] {
  return RETRIEVAL_PROVENANCE_REQUIREMENTS.filter((requirement) =>
    kind === "knowledge_vault_item"
      ? requirement.required_for_knowledge
      : requirement.required_for_memory,
  );
}

function summarizeProvenance(
  kind: RetrievalEntityKind,
  provenance?: MemoryProvenance,
): RetrievalProvenanceSummary {
  const safeProvenance = provenance ?? DEFAULT_RETRIEVAL_PROVENANCE;
  const required = provenanceRequiredFieldsForKind(kind);
  const missingFields = required
    .filter((requirement) => !hasText(String(safeProvenance[requirement.field] ?? "")))
    .map((requirement) => requirement.field);

  const sourceType = safeProvenance.source_type as MemorySourceAuthority;
  const rank = getSourceAuthorityRank(sourceType);
  const safeRank = rank === Number.MAX_SAFE_INTEGER ? 999 : rank;

  return {
    has_required_provenance: missingFields.length === 0,
    missing_fields: missingFields,
    visible_source_label:
      safeProvenance.source_label ??
      safeProvenance.source_phase ??
      safeProvenance.source_route ??
      "Unknown source",
    source_authority_rank: safeRank,
    authority_note:
      safeRank === 999
        ? "Source authority is unknown and should be reviewed."
        : `Source authority rank ${safeRank} from ${safeProvenance.source_type}.`,
  };
}

function summarizeConflict(candidate: RetrievalCandidateInput): RetrievalConflictSummary {
  const comparedIds = candidate.conflicts_with_ids ?? [];
  const severity = candidate.conflict_severity;

  if (severity === "none") {
    return {
      conflict_severity: severity,
      requires_review: false,
      conflict_note: "No conflict declared.",
      compared_with_ids: comparedIds,
    };
  }

  if (severity === "high" || severity === "blocking") {
    return {
      conflict_severity: severity,
      requires_review: true,
      conflict_note:
        "High or blocking conflict requires user review before retrieval can be trusted.",
      compared_with_ids: comparedIds,
    };
  }

  return {
    conflict_severity: severity,
    requires_review: true,
    conflict_note:
      "Conflict warning should be shown in retrieval visibility before use.",
    compared_with_ids: comparedIds,
  };
}

function domainAllowed(
  candidate: RetrievalCandidateInput,
  options: RetrievalContractOptions,
): boolean {
  if (!options.active_route) return true;
  return candidate.domain_scope === "global" || candidate.domain_scope === options.active_route;
}

function decideRetrieval(
  candidate: RetrievalCandidateInput,
  options: RetrievalContractOptions,
  provenanceSummary: RetrievalProvenanceSummary,
  conflictSummary: RetrievalConflictSummary,
): {
  decision: RetrievalDecision;
  blocked_reasons: RetrievalBlockedReason[];
} {
  const blocked: RetrievalBlockedReason[] = [];

  if (options.private_mode_active) blocked.push("private_mode_active");
  if (options.do_not_remember_rules_active) blocked.push("do_not_remember_rules_active");

  if (!provenanceSummary.has_required_provenance) {
    blocked.push("missing_provenance");
  }

  if (!domainAllowed(candidate, options)) {
    blocked.push("surface_not_allowed");
  }

  if (candidate.entity_kind === "knowledge_vault_item" && !options.allow_knowledge_preview) {
    blocked.push("knowledge_not_personal_memory");
  }

  if (
    candidate.entity_kind !== "knowledge_vault_item" &&
    candidate.status &&
    !isRetrievableMemoryStatus(candidate.status as never)
  ) {
    blocked.push("status_not_retrievable");
  }

  if (candidate.status && isBlockedMemoryStatus(candidate.status as never)) {
    blocked.push("status_not_retrievable");
  }

  if (candidate.sensitivity === "restricted" && !options.include_restricted) {
    blocked.push("restricted_sensitivity_without_explicit_allow");
  }

  if (candidate.conflict_severity === "high" || candidate.conflict_severity === "blocking") {
    blocked.push("high_conflict_requires_review");
  }

  if (
    (candidate.staleness === "stale" || candidate.staleness === "needs_reconfirmation") &&
    !options.include_stale_with_warning
  ) {
    blocked.push("stale_requires_reconfirmation");
  }

  blocked.push("embedding_boundary_not_ready");
  blocked.push("runtime_retrieval_deferred");

  if (blocked.includes("private_mode_active")) {
    return { decision: "blocked_private_mode", blocked_reasons: blocked };
  }

  if (blocked.includes("do_not_remember_rules_active")) {
    return { decision: "blocked_do_not_remember", blocked_reasons: blocked };
  }

  if (blocked.includes("missing_provenance")) {
    return { decision: "blocked_no_provenance", blocked_reasons: blocked };
  }

  if (blocked.includes("surface_not_allowed")) {
    return { decision: "blocked_wrong_surface", blocked_reasons: blocked };
  }

  if (blocked.includes("knowledge_not_personal_memory")) {
    return { decision: "blocked_not_personal_memory", blocked_reasons: blocked };
  }

  if (blocked.includes("status_not_retrievable")) {
    return { decision: "blocked_status", blocked_reasons: blocked };
  }

  if (blocked.includes("restricted_sensitivity_without_explicit_allow")) {
    return { decision: "blocked_sensitive", blocked_reasons: blocked };
  }

  if (blocked.includes("high_conflict_requires_review")) {
    return { decision: "blocked_conflict", blocked_reasons: blocked };
  }

  if (blocked.includes("stale_requires_reconfirmation")) {
    return { decision: "blocked_stale", blocked_reasons: blocked };
  }

  return {
    decision: "deferred_runtime_retrieval",
    blocked_reasons: blocked,
  };
}

function toMemoryEntityKind(kind: RetrievalEntityKind): MemoryEntityKind {
  if (kind === "knowledge_vault_item") return "knowledge_vault_item";
  if (kind === "project_state") return "project_memory";
  if (kind === "system_state") return "system_state_memory";
  if (kind === "carnos_entity_state") return "carnos_entity_state";
  return "user_memory";
}

function createPreviewRef(
  candidate: RetrievalCandidateInput,
  options: RetrievalContractOptions,
): RetrievalContractPreviewRef {
  const provenanceSummary = summarizeProvenance(candidate.entity_kind, candidate.provenance);
  const conflictSummary = summarizeConflict(candidate);
  const decision = decideRetrieval(candidate, options, provenanceSummary, conflictSummary);
  const sourceLabel = provenanceSummary.visible_source_label;

  return {
    id: candidate.id,
    entity_kind: candidate.entity_kind,
    memory_entity_kind: toMemoryEntityKind(candidate.entity_kind),
    title: candidate.title,
    content_preview: candidate.content_preview.slice(0, 260),
    domain_scope: candidate.domain_scope,
    retrieval_decision: decision.decision,
    blocked_reasons: decision.blocked_reasons,
    allowed_for_context_preview: decision.decision === "allowed_preview",
    allowed_for_carnos_response_preview: false,
    provenance_summary: provenanceSummary,
    conflict_summary: conflictSummary,
    sensitivity_rule: getMemorySensitivityRule(
      candidate.entity_kind === "knowledge_vault_item" ? "knowledge_item" : "source_of_truth_note",
      candidate.sensitivity,
    ),
    staleness_rule: getStalenessRule(
      candidate.entity_kind === "knowledge_vault_item" ? "knowledge_item" : "source_of_truth_note",
    ),
    visibility_note:
      decision.decision === "allowed_preview"
        ? `Would show source label before use: ${sourceLabel}.`
        : `Retrieval preview blocked/deferred: ${decision.blocked_reasons.join(", ")}.`,
    source_label: sourceLabel,
    preview_only: true,
  };
}

export function createRetrievalCandidateFromApprovedMemory(
  memory: ApprovedMemoryContract,
): RetrievalCandidateInput {
  return {
    id: memory.id,
    entity_kind: "approved_memory",
    title: memory.title,
    content_preview: memory.content,
    domain_scope: memory.domain_scope,
    provenance: memory.provenance,
    sensitivity: memory.review.sensitivity,
    staleness: memory.review.staleness,
    conflict_severity: memory.review.conflict_severity,
    source_type: memory.provenance.source_type,
    is_personal_memory: true,
    embedded: false,
    status: memory.status,
    confidence: memory.review.confidence,
    priority: memory.review.priority,
    conflicts_with_ids: memory.conflicts_with_memory_ids,
  };
}

export function createRetrievalCandidateFromKnowledgeItem(
  item: KnowledgeVaultItemContract,
): RetrievalCandidateInput {
  return {
    id: item.id ?? item.title,
    entity_kind: "knowledge_vault_item",
    title: item.title,
    content_preview: item.content_summary,
    domain_scope: item.domain_scope,
    provenance: item.provenance,
    sensitivity: item.sensitivity,
    staleness: "fresh",
    conflict_severity: "none",
    source_type: item.provenance.source_type,
    is_personal_memory: item.is_personal_memory,
    embedded: item.embedded,
    status: "active",
    confidence: 0.75,
    priority: 50,
    conflicts_with_ids: [],
  };
}

export function createRetrievalCandidateFromContextRef(
  ref: ContextPackMemoryReference,
): RetrievalCandidateInput {
  return {
    id: ref.memory_id,
    entity_kind: "context_pack_reference",
    title: ref.title,
    content_preview: ref.content_preview,
    domain_scope: "knowledge",
    provenance: ref.provenance,
    sensitivity: ref.sensitivity,
    staleness: ref.staleness,
    conflict_severity: ref.conflict_severity,
    source_type: ref.provenance.source_type,
    is_personal_memory: ref.entity_kind === "user_memory",
    embedded: false,
    status: ref.allowed_for_context ? "approved" : "needs_review",
    confidence: ref.confidence,
    priority: ref.priority,
    conflicts_with_ids: [],
  };
}

export const DEFAULT_RETRIEVAL_CONTRACT_CANDIDATES: RetrievalCandidateInput[] = [
  {
    id: "phase-15m-approved-source-truth-memory",
    entity_kind: "approved_memory",
    title: "Source-of-truth hierarchy memory",
    content_preview:
      "FINAL_SYNCED DOCX/JSON outrank outdated roadmap memory and must expose visible provenance.",
    domain_scope: "knowledge",
    provenance: {
      source_type: "source_of_truth",
      source_route: "/knowledge",
      source_phase: "Phase 15M",
      source_label: "FINAL_SYNCED retrieval contract preview",
    },
    sensitivity: "medium",
    staleness: "fresh",
    conflict_severity: "none",
    is_personal_memory: true,
    embedded: false,
    status: "approved",
    confidence: 0.96,
    priority: 92,
    conflicts_with_ids: [],
  },
  {
    id: "phase-15m-knowledge-vault-preview",
    entity_kind: "knowledge_vault_item",
    title: "Knowledge vault item remains non-personal",
    content_preview:
      "Knowledge vault items can be previewed as references but cannot become hidden Carnos memory without review.",
    domain_scope: "knowledge",
    provenance: {
      source_type: "knowledge_document",
      source_route: "/knowledge",
      source_phase: "Phase 15M",
      source_label: "Knowledge Vault Foundation",
    },
    sensitivity: "low",
    staleness: "fresh",
    conflict_severity: "none",
    is_personal_memory: false,
    embedded: false,
    status: "active",
    confidence: 0.8,
    priority: 55,
    conflicts_with_ids: [],
  },
  {
    id: "phase-15m-conflict-preview",
    entity_kind: "approved_memory",
    title: "Conflict requires visible review",
    content_preview:
      "Equal-authority memory conflicts must be surfaced instead of silently resolved.",
    domain_scope: "carnos",
    provenance: {
      source_type: "phase_report",
      source_route: "/carnos",
      source_phase: "Phase 15M",
      source_label: "Phase 15M conflict preview",
    },
    sensitivity: "medium",
    staleness: "aging",
    conflict_severity: "high",
    is_personal_memory: true,
    embedded: false,
    status: "approved",
    confidence: 0.72,
    priority: 70,
    conflicts_with_ids: ["phase-15m-competing-memory"],
  },
];

export function createRetrievalContractPreview(
  candidates: RetrievalCandidateInput[] = DEFAULT_RETRIEVAL_CONTRACT_CANDIDATES,
  options: RetrievalContractOptions = {},
): RetrievalContractResult {
  const safeOptions: RetrievalContractOptions = {
    surface: normalizeSurface(options.surface),
    active_route: options.active_route ?? "knowledge",
    private_mode_active: options.private_mode_active ?? false,
    do_not_remember_rules_active: options.do_not_remember_rules_active ?? false,
    include_restricted: options.include_restricted ?? false,
    include_stale_with_warning: options.include_stale_with_warning ?? false,
    allow_knowledge_preview: options.allow_knowledge_preview ?? true,
    max_preview_items: options.max_preview_items ?? 8,
    ...options,
  };

  const previewRefs = candidates
    .slice(0, safeOptions.max_preview_items)
    .map((candidate) => createPreviewRef(candidate, safeOptions));

  const allowedRefs = previewRefs.filter(
    (ref) => ref.retrieval_decision === "allowed_preview",
  );
  const blockedRefs = previewRefs.filter(
    (ref) => ref.retrieval_decision !== "allowed_preview",
  );

  const conflictWarnings = previewRefs
    .filter((ref) => ref.conflict_summary.requires_review)
    .map(
      (ref) =>
        `${ref.title}: ${ref.conflict_summary.conflict_note} (${ref.conflict_summary.conflict_severity}).`,
    );

  const provenanceWarnings = previewRefs
    .filter((ref) => !ref.provenance_summary.has_required_provenance)
    .map(
      (ref) =>
        `${ref.title}: missing provenance fields ${ref.provenance_summary.missing_fields.join(", ")}.`,
    );

  const memoryCandidateCount = candidates.filter(
    (candidate) => candidate.entity_kind !== "knowledge_vault_item",
  ).length;
  const knowledgeCandidateCount = candidates.filter(
    (candidate) => candidate.entity_kind === "knowledge_vault_item",
  ).length;

  return {
    summary: {
      phase: "Phase 15M",
      label: "Retrieval Contract + Provenance + Conflict Handling",
      total_candidates: candidates.length,
      allowed_preview_count: allowedRefs.length,
      blocked_preview_count: blockedRefs.length,
      memory_candidate_count: memoryCandidateCount,
      knowledge_candidate_count: knowledgeCandidateCount,
      conflict_warning_count: conflictWarnings.length,
      missing_provenance_count: provenanceWarnings.length,
      runtime_retrieval_enabled: false,
      sql_runtime_enabled: false,
      embeddings_enabled: false,
      provider_calls_enabled: false,
      hidden_prompt_injection_enabled: false,
      route_surface: "/knowledge",
      next_phase: "Phase 15N — Embedding Boundary / Noop Provider",
      boundary_markers: [...PHASE_15M_RETRIEVAL_BOUNDARY_MARKERS],
      provenance_requirements: RETRIEVAL_PROVENANCE_REQUIREMENTS,
    },
    allowed_refs: allowedRefs,
    blocked_refs: blockedRefs,
    conflict_warnings: conflictWarnings,
    provenance_warnings: provenanceWarnings,
    visibility_notes: [
      "Retrieval Contract is preview-only in Phase 15M.",
      "Every retrieval preview must show visible source labels.",
      "Knowledge vault records remain not personal memory.",
      "Conflict handling produces visible warnings and review requirements.",
      "Phase 15N will add embedding boundary/noop provider rules before real embeddings exist.",
    ],
    boundary: PHASE_15M_RETRIEVAL_CONTRACT_BOUNDARY,
  };
}

export function compareRetrievalPreviewAuthority(
  left: RetrievalCandidateInput,
  right: RetrievalCandidateInput,
) {
  return compareMemoryAuthority(
    {
      memory_type: left.entity_kind === "knowledge_vault_item" ? "knowledge_item" : "source_of_truth_note",
      status: left.status === "active" ? "approved" : ((left.status ?? "needs_review") as never),
      sensitivity: left.sensitivity,
      source_type: (left.source_type ?? left.provenance?.source_type ?? "phase_report") as MemorySourceAuthority,
      confidence: left.confidence ?? 0.5,
      priority: left.priority ?? 50,
    },
    {
      memory_type: right.entity_kind === "knowledge_vault_item" ? "knowledge_item" : "source_of_truth_note",
      status: right.status === "active" ? "approved" : ((right.status ?? "needs_review") as never),
      sensitivity: right.sensitivity,
      source_type: (right.source_type ?? right.provenance?.source_type ?? "phase_report") as MemorySourceAuthority,
      confidence: right.confidence ?? 0.5,
      priority: right.priority ?? 50,
    },
  );
}

export function summarizeRetrievalContract(
  result: RetrievalContractResult,
): string {
  return [
    `${result.summary.phase} ${result.summary.label}`,
    `${result.summary.total_candidates} candidates`,
    `${result.summary.blocked_preview_count} blocked/deferred`,
    `${result.summary.conflict_warning_count} conflict warnings`,
    "preview-only",
    "no retrieval",
    "no embeddings",
    "no provider calls",
  ].join(" · ");
}

export function createDefaultRetrievalContractSummary(): RetrievalContractSummary {
  return createRetrievalContractPreview().summary;
}
