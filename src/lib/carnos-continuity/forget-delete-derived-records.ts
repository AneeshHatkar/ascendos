/**
 * Phase 15O — Forget/Delete Derived Records.
 *
 * Forget/Delete Derived Records.
 * forget request contract.
 * derived records inventory.
 * delete derived records preview.
 * memory_forgotten audit event preview.
 * derived_records_deleted audit event preview.
 * embedding_removed audit event preview.
 * no destructive delete.
 * no SQL reads or writes.
 * no Supabase calls.
 * no embeddings.
 * no vector search.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * no standalone /memory route.
 * Phase 15P — Memory Audit Events + Memory Usage Transparency.
 */

import type { MemoryAuditEventContract, MemoryId, MemoryProvenance } from "./memory-contracts";
import type { MemoryDomainScope, MemoryEntityKind, MemorySensitivityLevel } from "./memory-enums";

export type ForgetDeleteTargetKind =
  | "memory_item"
  | "memory_candidate"
  | "knowledge_item"
  | "retrieval_log"
  | "memory_usage_log"
  | "memory_review_queue_item"
  | "embedding_artifact"
  | "context_snapshot";

export type ForgetDeleteDecision =
  | "allowed_preview"
  | "blocked_runtime_delete"
  | "blocked_missing_user_confirmation"
  | "blocked_sensitive_target"
  | "blocked_source_of_truth"
  | "blocked_no_target"
  | "deferred_delete_execution";

export type ForgetDeleteBlockedReason =
  | "runtime_delete_not_enabled"
  | "missing_user_confirmation"
  | "sensitive_target_requires_review"
  | "source_of_truth_requires_manual_reconciliation"
  | "target_missing"
  | "sql_runtime_deferred"
  | "supabase_runtime_deferred"
  | "embedding_runtime_deferred"
  | "audit_runtime_deferred";

export type DerivedRecordPreview = {
  id: string;
  target_kind: ForgetDeleteTargetKind;
  target_table: string;
  target_id: string;
  source_memory_id?: MemoryId;
  relationship: "derived_from" | "usage_of" | "retrieval_of" | "review_for" | "embedding_for" | "snapshot_of";
  delete_mode: "soft_forget_preview" | "delete_derived_preview" | "unlink_preview" | "embedding_remove_preview";
  would_delete: boolean;
  would_unlink: boolean;
  would_mark_forgotten: boolean;
  would_remove_embedding: boolean;
  reason: string;
};

export type ForgetDeleteRequestPreview = {
  id: string;
  user_id: string;
  target_memory_id?: MemoryId;
  target_title: string;
  target_kind: ForgetDeleteTargetKind;
  domain_scope: MemoryDomainScope;
  sensitivity: MemorySensitivityLevel;
  provenance: MemoryProvenance;
  user_confirmation_present: boolean;
  source_of_truth_record: boolean;
  requested_action:
    | "forget_memory"
    | "delete_candidate"
    | "delete_derived_records"
    | "remove_embeddings"
    | "forget_and_delete_derived";
  reason: string;
};

export type ForgetDeleteAuditPreview = {
  event_type: "memory_forgotten" | "derived_records_deleted" | "embedding_removed";
  entity_kind: MemoryEntityKind;
  entity_id?: MemoryId;
  source: MemoryProvenance;
  summary: string;
  preview_only: true;
  no_persistence: true;
};

export type ForgetDeleteDerivedRecordsBoundary = {
  phase: "Phase 15O";
  name: "Forget/Delete Derived Records";
  preview_only: true;
  no_destructive_delete: true;
  no_sql_reads_or_writes: true;
  no_supabase_calls: true;
  no_embeddings: true;
  no_vector_search: true;
  no_provider_calls: true;
  no_hidden_carnos_prompt_injection: true;
  no_standalone_memory_route: true;
  next_phase: "Phase 15P — Memory Audit Events + Memory Usage Transparency";
  boundary_rules: string[];
};

export type ForgetDeleteDerivedRecordsSummary = {
  phase: "Phase 15O";
  label: "Forget/Delete Derived Records";
  request_count: number;
  derived_record_count: number;
  would_mark_forgotten_count: number;
  would_delete_derived_count: number;
  would_unlink_count: number;
  would_remove_embedding_count: number;
  blocked_request_count: number;
  audit_event_preview_count: number;
  destructive_delete_enabled: false;
  sql_runtime_enabled: false;
  supabase_runtime_enabled: false;
  embedding_runtime_enabled: false;
  provider_calls_enabled: false;
  hidden_prompt_injection_enabled: false;
  route_surface: "/privacy";
  next_phase: "Phase 15P — Memory Audit Events + Memory Usage Transparency";
  boundary_markers: string[];
};

export type ForgetDeleteDerivedRecordsResult = {
  summary: ForgetDeleteDerivedRecordsSummary;
  requests: ForgetDeleteRequestPreview[];
  derived_records: DerivedRecordPreview[];
  decisions: {
    request_id: string;
    decision: ForgetDeleteDecision;
    blocked_reasons: ForgetDeleteBlockedReason[];
    preview_note: string;
  }[];
  audit_event_previews: ForgetDeleteAuditPreview[];
  deletion_plan_notes: string[];
  boundary: ForgetDeleteDerivedRecordsBoundary;
};

export const PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_BOUNDARY: ForgetDeleteDerivedRecordsBoundary = {
  phase: "Phase 15O",
  name: "Forget/Delete Derived Records",
  preview_only: true,
  no_destructive_delete: true,
  no_sql_reads_or_writes: true,
  no_supabase_calls: true,
  no_embeddings: true,
  no_vector_search: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_standalone_memory_route: true,
  next_phase: "Phase 15P — Memory Audit Events + Memory Usage Transparency",
  boundary_rules: [
    "Forget/delete handling is preview-only in Phase 15O.",
    "No destructive delete runs from this helper or panel.",
    "A forget request must show target, derived records, audit previews, and blocked runtime execution.",
    "Source-of-truth memories require manual reconciliation before any future deletion.",
    "Derived records include memory links, retrieval logs, memory usage logs, review queue entries, context snapshots, and future embedding artifacts.",
    "Embedding artifacts are represented as embedding_removed audit previews only because Phase 15N uses a noop provider.",
    "No SQL reads or writes, no Supabase calls, no embeddings, no vector search, no provider calls, and no hidden Carnos prompt injection.",
  ],
} as const;

export const PHASE_15O_FORGET_DELETE_MARKERS = [
  "Forget/Delete Derived Records",
  "forget request contract",
  "derived records inventory",
  "delete derived records preview",
  "memory_forgotten audit event preview",
  "derived_records_deleted audit event preview",
  "embedding_removed audit event preview",
  "no destructive delete",
  "no SQL reads or writes",
  "no Supabase calls",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no standalone /memory route",
  "Phase 15P — Memory Audit Events + Memory Usage Transparency",
] as const;

const DEFAULT_FORGET_PROVENANCE: MemoryProvenance = {
  source_type: "phase_report",
  source_route: "/privacy",
  source_phase: "Phase 15O",
  source_label: "Phase 15O forget/delete derived records preview",
};

export const DEFAULT_FORGET_DELETE_REQUESTS: ForgetDeleteRequestPreview[] = [
  {
    id: "phase-15o-forget-approved-memory-preview",
    user_id: "preview-user",
    target_memory_id: "memory-phase-15-approved-preview",
    target_title: "Approved memory forget preview",
    target_kind: "memory_item",
    domain_scope: "carnos",
    sensitivity: "medium",
    provenance: DEFAULT_FORGET_PROVENANCE,
    user_confirmation_present: true,
    source_of_truth_record: false,
    requested_action: "forget_and_delete_derived",
    reason: "User wants a governed preview of forgetting an approved memory and deleting derived records.",
  },
  {
    id: "phase-15o-source-of-truth-blocked-preview",
    user_id: "preview-user",
    target_memory_id: "memory-phase-15-sot-preview",
    target_title: "Source-of-truth memory blocked preview",
    target_kind: "memory_item",
    domain_scope: "knowledge",
    sensitivity: "low",
    provenance: {
      source_type: "source_of_truth",
      source_route: "/knowledge",
      source_phase: "Phase 15O",
      source_label: "FINAL_SYNCED source-of-truth memory",
    },
    user_confirmation_present: true,
    source_of_truth_record: true,
    requested_action: "forget_memory",
    reason: "Source-of-truth record cannot be silently forgotten without manual reconciliation.",
  },
  {
    id: "phase-15o-missing-confirmation-preview",
    user_id: "preview-user",
    target_memory_id: "memory-phase-15-sensitive-preview",
    target_title: "Sensitive memory missing confirmation preview",
    target_kind: "memory_item",
    domain_scope: "body",
    sensitivity: "restricted",
    provenance: DEFAULT_FORGET_PROVENANCE,
    user_confirmation_present: false,
    source_of_truth_record: false,
    requested_action: "forget_memory",
    reason: "Restricted memory requires explicit user confirmation before any future forget execution.",
  },
];

export const DEFAULT_DERIVED_RECORD_PREVIEWS: DerivedRecordPreview[] = [
  {
    id: "derived-link-preview",
    target_kind: "memory_item",
    target_table: "memory_links",
    target_id: "memory-link-preview",
    source_memory_id: "memory-phase-15-approved-preview",
    relationship: "derived_from",
    delete_mode: "unlink_preview",
    would_delete: false,
    would_unlink: true,
    would_mark_forgotten: false,
    would_remove_embedding: false,
    reason: "Memory links would be unlinked from the forgotten memory.",
  },
  {
    id: "derived-retrieval-log-preview",
    target_kind: "retrieval_log",
    target_table: "retrieval_logs",
    target_id: "retrieval-log-preview",
    source_memory_id: "memory-phase-15-approved-preview",
    relationship: "retrieval_of",
    delete_mode: "delete_derived_preview",
    would_delete: true,
    would_unlink: false,
    would_mark_forgotten: false,
    would_remove_embedding: false,
    reason: "Retrieval logs derived from the forgotten memory would be removed or redacted later.",
  },
  {
    id: "derived-usage-log-preview",
    target_kind: "memory_usage_log",
    target_table: "memory_usage_logs",
    target_id: "memory-usage-preview",
    source_memory_id: "memory-phase-15-approved-preview",
    relationship: "usage_of",
    delete_mode: "delete_derived_preview",
    would_delete: true,
    would_unlink: false,
    would_mark_forgotten: false,
    would_remove_embedding: false,
    reason: "Memory usage logs would be removed or redacted so forgotten memory cannot appear in transparency history as active context.",
  },
  {
    id: "derived-review-queue-preview",
    target_kind: "memory_review_queue_item",
    target_table: "memory_review_queue",
    target_id: "review-queue-preview",
    source_memory_id: "memory-phase-15-approved-preview",
    relationship: "review_for",
    delete_mode: "delete_derived_preview",
    would_delete: true,
    would_unlink: false,
    would_mark_forgotten: false,
    would_remove_embedding: false,
    reason: "Pending review queue rows derived from the forgotten memory would be closed or deleted later.",
  },
  {
    id: "derived-embedding-preview",
    target_kind: "embedding_artifact",
    target_table: "noop_embedding_artifacts_preview",
    target_id: "noop-embedding-preview",
    source_memory_id: "memory-phase-15-approved-preview",
    relationship: "embedding_for",
    delete_mode: "embedding_remove_preview",
    would_delete: false,
    would_unlink: false,
    would_mark_forgotten: false,
    would_remove_embedding: true,
    reason: "Future embedding artifacts would be removed; Phase 15N currently guarantees noop provider and no embeddings generated.",
  },
];

function decideForgetDeleteRequest(
  request: ForgetDeleteRequestPreview,
): {
  decision: ForgetDeleteDecision;
  blocked_reasons: ForgetDeleteBlockedReason[];
  preview_note: string;
} {
  const blocked: ForgetDeleteBlockedReason[] = [
    "runtime_delete_not_enabled",
    "sql_runtime_deferred",
    "supabase_runtime_deferred",
    "audit_runtime_deferred",
  ];

  if (!request.user_confirmation_present) {
    blocked.push("missing_user_confirmation");
  }

  if (request.sensitivity === "restricted" || request.sensitivity === "high") {
    blocked.push("sensitive_target_requires_review");
  }

  if (request.source_of_truth_record || request.provenance.source_type === "source_of_truth") {
    blocked.push("source_of_truth_requires_manual_reconciliation");
  }

  if (!request.target_memory_id && request.target_kind !== "memory_candidate") {
    blocked.push("target_missing");
  }

  if (request.requested_action === "remove_embeddings") {
    blocked.push("embedding_runtime_deferred");
  }

  if (blocked.includes("missing_user_confirmation")) {
    return {
      decision: "blocked_missing_user_confirmation",
      blocked_reasons: blocked,
      preview_note: "Explicit user confirmation is required before any future forget/delete execution.",
    };
  }

  if (blocked.includes("source_of_truth_requires_manual_reconciliation")) {
    return {
      decision: "blocked_source_of_truth",
      blocked_reasons: blocked,
      preview_note: "Source-of-truth memories require manual reconciliation instead of silent deletion.",
    };
  }

  if (blocked.includes("sensitive_target_requires_review")) {
    return {
      decision: "blocked_sensitive_target",
      blocked_reasons: blocked,
      preview_note: "Sensitive or restricted memory requires explicit review before deletion.",
    };
  }

  if (blocked.includes("target_missing")) {
    return {
      decision: "blocked_no_target",
      blocked_reasons: blocked,
      preview_note: "No target memory was provided.",
    };
  }

  return {
    decision: "deferred_delete_execution",
    blocked_reasons: blocked,
    preview_note: "Delete execution is intentionally deferred; this is a visible plan only.",
  };
}

function createAuditPreview(
  event_type: ForgetDeleteAuditPreview["event_type"],
  request: ForgetDeleteRequestPreview,
  summary: string,
): ForgetDeleteAuditPreview {
  return {
    event_type,
    entity_kind:
      request.target_kind === "knowledge_item"
        ? "knowledge_vault_item"
        : request.target_kind === "memory_candidate"
          ? "user_memory"
          : "user_memory",
    entity_id: request.target_memory_id,
    source: request.provenance,
    summary,
    preview_only: true,
    no_persistence: true,
  };
}

export function createForgetDeleteDerivedRecordsPreview(
  requests: ForgetDeleteRequestPreview[] = DEFAULT_FORGET_DELETE_REQUESTS,
  derivedRecords: DerivedRecordPreview[] = DEFAULT_DERIVED_RECORD_PREVIEWS,
): ForgetDeleteDerivedRecordsResult {
  const decisions = requests.map((request) => ({
    request_id: request.id,
    ...decideForgetDeleteRequest(request),
  }));

  const auditEventPreviews = requests.flatMap((request) => {
    const previews: ForgetDeleteAuditPreview[] = [
      createAuditPreview(
        "memory_forgotten",
        request,
        `Would mark memory as forgotten for target: ${request.target_title}.`,
      ),
    ];

    if (
      request.requested_action === "delete_derived_records" ||
      request.requested_action === "forget_and_delete_derived"
    ) {
      previews.push(
        createAuditPreview(
          "derived_records_deleted",
          request,
          `Would delete or unlink derived records for target: ${request.target_title}.`,
        ),
      );
    }

    previews.push(
      createAuditPreview(
        "embedding_removed",
        request,
        `Would remove future embedding artifacts for target: ${request.target_title}; noop provider means none exist now.`,
      ),
    );

    return previews;
  });

  const wouldMarkForgottenCount = requests.filter(
    (request) =>
      request.requested_action === "forget_memory" ||
      request.requested_action === "forget_and_delete_derived",
  ).length;

  const summary: ForgetDeleteDerivedRecordsSummary = {
    phase: "Phase 15O",
    label: "Forget/Delete Derived Records",
    request_count: requests.length,
    derived_record_count: derivedRecords.length,
    would_mark_forgotten_count: wouldMarkForgottenCount,
    would_delete_derived_count: derivedRecords.filter((record) => record.would_delete).length,
    would_unlink_count: derivedRecords.filter((record) => record.would_unlink).length,
    would_remove_embedding_count: derivedRecords.filter((record) => record.would_remove_embedding).length,
    blocked_request_count: decisions.filter((decision) => decision.decision !== "allowed_preview").length,
    audit_event_preview_count: auditEventPreviews.length,
    destructive_delete_enabled: false,
    sql_runtime_enabled: false,
    supabase_runtime_enabled: false,
    embedding_runtime_enabled: false,
    provider_calls_enabled: false,
    hidden_prompt_injection_enabled: false,
    route_surface: "/privacy",
    next_phase: "Phase 15P — Memory Audit Events + Memory Usage Transparency",
    boundary_markers: [...PHASE_15O_FORGET_DELETE_MARKERS],
  };

  return {
    summary,
    requests,
    derived_records: derivedRecords,
    decisions,
    audit_event_previews: auditEventPreviews,
    deletion_plan_notes: [
      "No destructive delete is executed in Phase 15O.",
      "Future forget execution must first mark memory forgotten, then handle derived records, then log memory_forgotten and derived_records_deleted.",
      "Future embedding removal must emit embedding_removed and remain impossible while Phase 15N noop provider is active.",
      "Source-of-truth records require manual reconciliation and cannot be silently deleted.",
      "All forget/delete behavior must be visible to /privacy and never hidden inside Carnos prompts.",
    ],
    boundary: PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_BOUNDARY,
  };
}

export function createMemoryForgottenAuditEventPreview(
  request: ForgetDeleteRequestPreview,
): MemoryAuditEventContract {
  return {
    kind: "memory_audit_event",
    user_id: request.user_id,
    event_type: "memory_forgotten",
    entity_kind: "user_memory",
    entity_id: request.target_memory_id,
    source: request.provenance,
    summary: `Preview only: would forget memory target ${request.target_title}.`,
  };
}

export function summarizeForgetDeleteDerivedRecords(
  result: ForgetDeleteDerivedRecordsResult = createForgetDeleteDerivedRecordsPreview(),
): string {
  return [
    result.summary.label,
    `${result.summary.request_count} forget/delete request previews`,
    `${result.summary.derived_record_count} derived records inventoried`,
    `${result.summary.audit_event_preview_count} audit event previews`,
    `${result.summary.blocked_request_count} blocked/deferred requests`,
    "no destructive delete",
    "no SQL reads or writes",
    "no Supabase calls",
    result.summary.next_phase,
  ].join(" · ");
}

export function createDefaultForgetDeleteDerivedRecordsSummary(): ForgetDeleteDerivedRecordsSummary {
  return createForgetDeleteDerivedRecordsPreview().summary;
}
