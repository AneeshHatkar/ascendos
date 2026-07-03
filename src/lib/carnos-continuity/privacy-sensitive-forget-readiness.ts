/**
 * Phase 17P — Privacy, Sensitive Lock, Forget/Delete Readiness
 *
 * Deterministic readiness and policy evaluation for privacy, sensitive lock,
 * and forget/delete workflows.
 *
 * Boundary:
 * - Policy/readiness contracts only.
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
 * - No actual approve/reject/archive/forget/delete mutation execution.
 */

export type MemoryPrivacySensitivity =
  | "none"
  | "low"
  | "medium"
  | "high"
  | "restricted";

export type MemoryPrivacyLifecycleState =
  | "candidate"
  | "needs_review"
  | "approved"
  | "archived"
  | "locked"
  | "superseded"
  | "rejected"
  | "forgotten"
  | "deletion_requested"
  | "deleted_preview";

export type MemoryPrivacyReadinessAction =
  | "view"
  | "retrieve"
  | "include_in_context_pack"
  | "lock_sensitive"
  | "unlock_sensitive"
  | "archive"
  | "forget"
  | "delete"
  | "export"
  | "review_required";

export type MemoryPrivacyReadinessDecision =
  | "allowed_preview"
  | "blocked_sensitive"
  | "blocked_locked"
  | "blocked_rejected"
  | "blocked_forgotten"
  | "blocked_deleted_preview"
  | "blocked_conflict"
  | "blocked_missing_confirmation"
  | "deferred_requires_repository"
  | "deferred_requires_schema_check"
  | "deferred_requires_policy_review"
  | "review_required";

export interface MemoryPrivacyRecordPreview {
  id: string;
  user_id: string;
  title: string;
  lifecycle_state: MemoryPrivacyLifecycleState;
  sensitivity: MemoryPrivacySensitivity;
  sensitive_locked: boolean;
  conflict_open?: boolean;
  has_forget_request?: boolean;
  has_delete_request?: boolean;
  source_label?: string | null;
  last_confirmed_at?: string | null;
}

export interface MemoryPrivacyReadinessOptions {
  action: MemoryPrivacyReadinessAction;
  user_confirmed?: boolean;
  admin_override?: false;
  allow_sensitive_preview?: boolean;
  allow_locked_preview?: boolean;
  require_schema_check_for_write_actions?: boolean;
}

export interface MemoryPrivacyReadinessReason {
  code:
    | "privacy_readiness_preview"
    | "sensitive_lock_enforced"
    | "sensitive_lock_preview_allowed"
    | "locked_memory_blocked"
    | "rejected_memory_blocked"
    | "forgotten_memory_blocked"
    | "deleted_preview_blocked"
    | "open_conflict_blocked"
    | "confirmation_required"
    | "repository_required"
    | "schema_check_required"
    | "policy_review_required"
    | "write_execution_deferred"
    | "retrieval_blocked"
    | "context_pack_blocked"
    | "visible_privacy_reason"
    | "visible_sensitive_lock_reasons"
    | "visible_forget_delete_reasons";
  message: string;
}

export interface MemoryPrivacyReadinessResult {
  phase: "17P";
  record_id: string;
  action: MemoryPrivacyReadinessAction;
  decision: MemoryPrivacyReadinessDecision;
  allowed: boolean;
  preview_only: true;
  requires_confirmation: boolean;
  requires_schema_check: boolean;
  requires_repository: boolean;
  reasons: MemoryPrivacyReadinessReason[];
  warnings: string[];
  boundary: typeof PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY;
}

export interface MemoryPrivacyReadinessBatchResult {
  phase: "17P";
  checker: "privacy_sensitive_forget_delete_readiness";
  runtime_side_effects_enabled: false;
  runtime_retrieval_enabled: false;
  semantic_retrieval_active: false;
  provider_calls_enabled: false;
  vector_search_enabled: false;
  sql_runtime_enabled: false;
  memory_retrieval_events_write_count: 0;
  carnos_prompt_injection_enabled: false;
  mutation_execution_enabled: false;
  total_records: number;
  allowed_preview_count: number;
  blocked_count: number;
  deferred_count: number;
  review_required_count: number;
  results: MemoryPrivacyReadinessResult[];
  summary: string[];
  warnings: string[];
  boundary: typeof PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY;
}

export const PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY = {
  phase: "Phase 17P",
  name: "Privacy, Sensitive Lock, Forget/Delete Readiness",
  deterministic_only: true,
  policy_readiness_only: true,
  preview_only: true,
  privacy_sensitive_forget_delete_readiness: true,
  sensitive_lock_enforcement_preview: true,
  forget_delete_readiness_preview: true,
  delete_execution_deferred: true,
  forget_execution_deferred: true,
  schema_check_required_before_write_enabled: true,
  repository_required_before_write_enabled: true,
  visible_privacy_reasons: true,
  visible_sensitive_lock_reasons: true,
  visible_forget_delete_reasons: true,
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
  no_actual_approve_reject_archive_forget_delete_mutations: true,
  runtime_side_effects_enabled: false,
  mutation_execution_enabled: false,
  memory_retrieval_events_write_count: 0,
  semantic_retrieval_active: false,
  carnos_prompt_injection_enabled: false,
  next_phase: "Phase 17Q — Final Phase 17 Audit + Fixtures + Completion Report",
  rules: [
    "Phase 17P — Privacy, Sensitive Lock, Forget/Delete Readiness",
    "Privacy, Sensitive Lock, Forget/Delete Readiness",
    "privacy sensitive forget delete readiness",
    "sensitive lock enforcement preview",
    "forget/delete readiness preview",
    "delete execution deferred",
    "forget execution deferred",
    "schema check required before write-enabled implementation",
    "repository required before write-enabled implementation",
    "visible privacy reasons",
    "visible sensitive lock reasons",
    "visible forget/delete reasons",
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
    "No actual approve/reject/archive/forget/delete mutations",
  ],
} as const;

function baseWarning(): string[] {
  return [
    "Phase 17P is readiness-only.",
    "Forget/delete execution remains deferred.",
    "Schema checks are required before any write-enabled forget/delete implementation.",
    "Repository implementation is required before any write-enabled forget/delete implementation.",
  ];
}

function reason(
  code: MemoryPrivacyReadinessReason["code"],
  message: string,
): MemoryPrivacyReadinessReason {
  return { code, message };
}

function isWriteLikeAction(action: MemoryPrivacyReadinessAction): boolean {
  return (
    action === "lock_sensitive" ||
    action === "unlock_sensitive" ||
    action === "archive" ||
    action === "forget" ||
    action === "delete" ||
    action === "export"
  );
}

function isRetrievalLikeAction(action: MemoryPrivacyReadinessAction): boolean {
  return action === "retrieve" || action === "include_in_context_pack";
}

function deferredWriteDecision(action: MemoryPrivacyReadinessAction): MemoryPrivacyReadinessDecision {
  if (action === "forget" || action === "delete" || action === "archive" || action === "lock_sensitive" || action === "unlock_sensitive") {
    return "deferred_requires_repository";
  }
  return "deferred_requires_policy_review";
}

export function evaluateMemoryPrivacyReadiness(
  record: MemoryPrivacyRecordPreview,
  options: MemoryPrivacyReadinessOptions,
): MemoryPrivacyReadinessResult {
  const reasons: MemoryPrivacyReadinessReason[] = [
    reason("privacy_readiness_preview", "Phase 17P evaluates privacy readiness without executing writes."),
    reason("visible_privacy_reason", "Privacy decision reasons are visible in the readiness result."),
  ];

  const warnings = baseWarning();

  if (record.lifecycle_state === "rejected") {
    return {
      phase: "17P",
      record_id: record.id,
      action: options.action,
      decision: "blocked_rejected",
      allowed: false,
      preview_only: true,
      requires_confirmation: false,
      requires_schema_check: false,
      requires_repository: false,
      reasons: [
        ...reasons,
        reason("rejected_memory_blocked", "Rejected memory is blocked from retrieval, context packing, and write actions."),
      ],
      warnings,
      boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
    };
  }

  if (record.lifecycle_state === "forgotten") {
    return {
      phase: "17P",
      record_id: record.id,
      action: options.action,
      decision: "blocked_forgotten",
      allowed: false,
      preview_only: true,
      requires_confirmation: false,
      requires_schema_check: false,
      requires_repository: false,
      reasons: [
        ...reasons,
        reason("forgotten_memory_blocked", "Forgotten memory is blocked from retrieval and context packing."),
      ],
      warnings,
      boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
    };
  }

  if (record.lifecycle_state === "deleted_preview") {
    return {
      phase: "17P",
      record_id: record.id,
      action: options.action,
      decision: "blocked_deleted_preview",
      allowed: false,
      preview_only: true,
      requires_confirmation: false,
      requires_schema_check: false,
      requires_repository: false,
      reasons: [
        ...reasons,
        reason("deleted_preview_blocked", "Deleted-preview memory is blocked from use in this readiness layer."),
      ],
      warnings,
      boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
    };
  }

  if (record.conflict_open && isRetrievalLikeAction(options.action)) {
    return {
      phase: "17P",
      record_id: record.id,
      action: options.action,
      decision: "blocked_conflict",
      allowed: false,
      preview_only: true,
      requires_confirmation: false,
      requires_schema_check: false,
      requires_repository: false,
      reasons: [
        ...reasons,
        reason("open_conflict_blocked", "Open memory conflict blocks retrieval-like use until resolved or superseded."),
        reason("retrieval_blocked", "Retrieval-like action is blocked for conflicted memory."),
      ],
      warnings,
      boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
    };
  }

  if ((record.sensitivity === "high" || record.sensitivity === "restricted") && !options.allow_sensitive_preview) {
    return {
      phase: "17P",
      record_id: record.id,
      action: options.action,
      decision: "blocked_sensitive",
      allowed: false,
      preview_only: true,
      requires_confirmation: false,
      requires_schema_check: false,
      requires_repository: false,
      reasons: [
        ...reasons,
        reason("sensitive_lock_enforced", "High or restricted sensitivity memory is blocked unless explicitly allowed for preview."),
        reason("visible_sensitive_lock_reasons", "Sensitive lock reason is visible to the user."),
      ],
      warnings,
      boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
    };
  }

  if (record.sensitive_locked && !options.allow_locked_preview) {
    return {
      phase: "17P",
      record_id: record.id,
      action: options.action,
      decision: "blocked_locked",
      allowed: false,
      preview_only: true,
      requires_confirmation: false,
      requires_schema_check: false,
      requires_repository: false,
      reasons: [
        ...reasons,
        reason("locked_memory_blocked", "Sensitive-locked memory is blocked unless explicit preview allowance is provided."),
      ],
      warnings,
      boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
    };
  }

  if (isWriteLikeAction(options.action)) {
    const needsConfirmation = !options.user_confirmed;
    const needsSchema = options.require_schema_check_for_write_actions !== false;
    const needsRepository = true;

    return {
      phase: "17P",
      record_id: record.id,
      action: options.action,
      decision: needsConfirmation ? "blocked_missing_confirmation" : deferredWriteDecision(options.action),
      allowed: false,
      preview_only: true,
      requires_confirmation: needsConfirmation,
      requires_schema_check: needsSchema,
      requires_repository: needsRepository,
      reasons: [
        ...reasons,
        needsConfirmation
          ? reason("confirmation_required", "Write-like privacy action requires explicit user confirmation.")
          : reason("write_execution_deferred", "Write-like privacy action remains deferred in Phase 17P."),
        needsSchema
          ? reason("schema_check_required", "Schema check is required before write-enabled forget/delete implementation.")
          : reason("policy_review_required", "Policy review remains required before write-enabled implementation."),
        reason("repository_required", "Repository implementation is required before executing privacy mutations."),
        reason("visible_forget_delete_reasons", "Forget/delete readiness reasons are visible to the user."),
      ],
      warnings,
      boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
    };
  }

  if (record.sensitive_locked || record.sensitivity === "high" || record.sensitivity === "restricted") {
    reasons.push(
      reason("sensitive_lock_preview_allowed", "Sensitive memory preview was explicitly allowed for this readiness check."),
    );
  }

  return {
    phase: "17P",
    record_id: record.id,
    action: options.action,
    decision: "allowed_preview",
    allowed: true,
    preview_only: true,
    requires_confirmation: false,
    requires_schema_check: false,
    requires_repository: false,
    reasons,
    warnings,
    boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
  };
}

export function evaluateMemoryPrivacyReadinessBatch(
  records: MemoryPrivacyRecordPreview[],
  options: MemoryPrivacyReadinessOptions,
): MemoryPrivacyReadinessBatchResult {
  const results = records.map((record) => evaluateMemoryPrivacyReadiness(record, options));
  const allowedCount = results.filter((result) => result.decision === "allowed_preview").length;
  const deferredCount = results.filter((result) => result.decision.startsWith("deferred")).length;
  const reviewCount = results.filter((result) => result.decision === "review_required").length;
  const blockedCount = results.length - allowedCount - deferredCount - reviewCount;

  return {
    phase: "17P",
    checker: "privacy_sensitive_forget_delete_readiness",
    runtime_side_effects_enabled: false,
    runtime_retrieval_enabled: false,
    semantic_retrieval_active: false,
    provider_calls_enabled: false,
    vector_search_enabled: false,
    sql_runtime_enabled: false,
    memory_retrieval_events_write_count: 0,
    carnos_prompt_injection_enabled: false,
    mutation_execution_enabled: false,
    total_records: records.length,
    allowed_preview_count: allowedCount,
    blocked_count: blockedCount,
    deferred_count: deferredCount,
    review_required_count: reviewCount,
    results,
    summary: [
      "Phase 17P evaluated privacy, sensitive lock, and forget/delete readiness.",
      "Allowed preview decisions: " + allowedCount + ".",
      "Blocked decisions: " + blockedCount + ".",
      "Deferred decisions: " + deferredCount + ".",
      "Review-required decisions: " + reviewCount + ".",
      "No actual approve/reject/archive/forget/delete mutations were executed.",
      "No memory_retrieval_events writes, runtime retrieval, embedding generation, semantic retrieval activation, provider calls, vector search, Supabase calls, SQL reads/writes, Carnos prompt/context injection, or background scanning occurred.",
    ],
    warnings: baseWarning(),
    boundary: PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY,
  };
}

export function getPrivacySensitiveForgetDeleteReadinessSummary(): typeof PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY {
  return PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY;
}

export const PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_AUDIT_MARKERS = [
  "Phase 17P — Privacy, Sensitive Lock, Forget/Delete Readiness",
  "Privacy, Sensitive Lock, Forget/Delete Readiness",
  "privacy sensitive forget delete readiness",
  "sensitive lock enforcement preview",
  "forget/delete readiness preview",
  "delete execution deferred",
  "forget execution deferred",
  "schema check required before write-enabled implementation",
  "repository required before write-enabled implementation",
  "visible privacy reasons",
  "visible sensitive lock reasons",
  "visible forget/delete reasons",
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
  "No actual approve/reject/archive/forget/delete mutations",
] as const;
