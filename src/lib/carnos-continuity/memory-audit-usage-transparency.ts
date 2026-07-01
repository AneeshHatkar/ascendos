/**
 * Phase 15P — Memory Audit Events + Memory Usage Transparency.
 *
 * Memory Audit Events + Memory Usage Transparency.
 * memory audit event contract.
 * memory usage transparency.
 * memory_events preview.
 * memory_usage_logs preview.
 * candidate_created.
 * memory_forgotten.
 * memory_used_in_context_pack.
 * memory_used_in_carnos_response.
 * private_mode_enabled.
 * conflict_detected.
 * stale_memory_detected.
 * visible memory usage ledger.
 * hidden memory usage blocked.
 * no SQL reads or writes.
 * no Supabase calls.
 * no persistence.
 * no embeddings.
 * no vector search.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * no standalone /memory route.
 * Phase 15Q — Cross-Domain Integration Preview.
 */

import type {
  MemoryAuditEventType,
  MemoryDomainScope,
  MemoryEntityKind,
  MemorySensitivityLevel,
} from "./memory-enums";

export type MemoryAuditUsageEventSource =
  | "memory_candidate_engine"
  | "memory_inbox"
  | "privacy_rules"
  | "approved_memory_read_layer"
  | "current_context_pack_builder"
  | "carnos_memory_visibility"
  | "forget_delete_derived_records"
  | "retrieval_contract"
  | "knowledge_vault"
  | "phase_15p_preview";

export type MemoryAuditUsageVisibility =
  | "visible_to_user"
  | "redacted_summary"
  | "blocked_hidden_usage"
  | "deferred_persistence";

export type MemoryAuditUsageSurface =
  | "/privacy"
  | "/carnos"
  | "/knowledge"
  | "/command"
  | "/timeline";

export type MemoryAuditUsageEventPreview = {
  id: string;
  event_type: MemoryAuditEventType;
  entity_kind: MemoryEntityKind;
  entity_id: string;
  domain_scope: MemoryDomainScope;
  sensitivity: MemorySensitivityLevel;
  source: MemoryAuditUsageEventSource;
  surface: MemoryAuditUsageSurface;
  visibility: MemoryAuditUsageVisibility;
  summary: string;
  user_visible_explanation: string;
  would_write_memory_events: boolean;
  would_write_memory_usage_logs: boolean;
  persistence_enabled: false;
  preview_only: true;
};

export type MemoryUsageTransparencyReference = {
  id: string;
  memory_ref: string;
  title: string;
  domain_scope: MemoryDomainScope;
  sensitivity: MemorySensitivityLevel;
  used_in_context_pack: boolean;
  used_in_carnos_response: boolean;
  excluded_from_context_pack: boolean;
  blocked_from_hidden_usage: boolean;
  visible_reason: string;
  exclusion_reason?: string;
  last_event_type: MemoryAuditEventType;
};

export type MemoryAuditUsageTransparencyBoundary = {
  phase: "Phase 15P";
  name: "Memory Audit Events + Memory Usage Transparency";
  preview_only: true;
  no_sql_reads_or_writes: true;
  no_supabase_calls: true;
  no_persistence: true;
  no_embeddings: true;
  no_vector_search: true;
  no_provider_calls: true;
  no_hidden_carnos_prompt_injection: true;
  no_standalone_memory_route: true;
  route_surface: "/privacy";
  next_phase: "Phase 15Q — Cross-Domain Integration Preview";
  boundary_rules: string[];
};

export type MemoryAuditUsageTransparencySummary = {
  phase: "Phase 15P";
  label: "Memory Audit Events + Memory Usage Transparency";
  audit_event_preview_count: number;
  usage_reference_count: number;
  context_pack_usage_count: number;
  carnos_response_usage_count: number;
  hidden_usage_blocked_count: number;
  redacted_event_count: number;
  would_write_memory_events_count: number;
  would_write_memory_usage_logs_count: number;
  persistence_enabled: false;
  sql_runtime_enabled: false;
  supabase_runtime_enabled: false;
  embedding_runtime_enabled: false;
  provider_calls_enabled: false;
  hidden_prompt_injection_enabled: false;
  route_surface: "/privacy";
  next_phase: "Phase 15Q — Cross-Domain Integration Preview";
  boundary_markers: string[];
};

export type MemoryAuditUsageTransparencyResult = {
  summary: MemoryAuditUsageTransparencySummary;
  audit_event_previews: MemoryAuditUsageEventPreview[];
  usage_references: MemoryUsageTransparencyReference[];
  transparency_notes: string[];
  boundary: MemoryAuditUsageTransparencyBoundary;
};

export const PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_BOUNDARY: MemoryAuditUsageTransparencyBoundary = {
  phase: "Phase 15P",
  name: "Memory Audit Events + Memory Usage Transparency",
  preview_only: true,
  no_sql_reads_or_writes: true,
  no_supabase_calls: true,
  no_persistence: true,
  no_embeddings: true,
  no_vector_search: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_standalone_memory_route: true,
  route_surface: "/privacy",
  next_phase: "Phase 15Q — Cross-Domain Integration Preview",
  boundary_rules: [
    "Phase 15P creates preview-only memory audit events and usage transparency summaries.",
    "Audit events show what would later be recorded in memory_events.",
    "Usage references show what would later be recorded in memory_usage_logs.",
    "Every memory used in a context pack or Carnos response must have a user-visible explanation.",
    "Hidden memory usage is blocked and represented as blocked_hidden_usage.",
    "Sensitive or restricted usage must be redacted or explicitly explained before future persistence.",
    "No SQL reads or writes, no Supabase calls, no persistence, no embeddings, no vector search, no provider calls, and no hidden Carnos prompt injection.",
  ],
} as const;

export const PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_MARKERS = [
  "Memory Audit Events + Memory Usage Transparency",
  "memory audit event contract",
  "memory usage transparency",
  "memory_events preview",
  "memory_usage_logs preview",
  "candidate_created",
  "memory_forgotten",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "private_mode_enabled",
  "conflict_detected",
  "stale_memory_detected",
  "visible memory usage ledger",
  "hidden memory usage blocked",
  "no SQL reads or writes",
  "no Supabase calls",
  "no persistence",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no standalone /memory route",
  "Phase 15Q — Cross-Domain Integration Preview",
] as const;

export const DEFAULT_MEMORY_AUDIT_EVENT_PREVIEWS: MemoryAuditUsageEventPreview[] = [
  {
    id: "phase-15p-candidate-created-preview",
    event_type: "candidate_created",
    entity_kind: "user_memory",
    entity_id: "candidate-phase-15p-preview",
    domain_scope: "carnos",
    sensitivity: "medium",
    source: "memory_candidate_engine",
    surface: "/privacy",
    visibility: "visible_to_user",
    summary: "A memory candidate was created for review, but not approved or persisted by this phase.",
    user_visible_explanation:
      "Carnos may show that a candidate exists only as a reviewable preview; it cannot silently become long-term memory.",
    would_write_memory_events: true,
    would_write_memory_usage_logs: false,
    persistence_enabled: false,
    preview_only: true,
  },
  {
    id: "phase-15p-context-pack-usage-preview",
    event_type: "memory_used_in_context_pack",
    entity_kind: "project_memory",
    entity_id: "memory-context-pack-preview",
    domain_scope: "goals",
    sensitivity: "low",
    source: "current_context_pack_builder",
    surface: "/carnos",
    visibility: "visible_to_user",
    summary: "An approved project memory was included in a current context pack preview.",
    user_visible_explanation:
      "The context pack must show the memory reference, why it was included, and what source supported it.",
    would_write_memory_events: true,
    would_write_memory_usage_logs: true,
    persistence_enabled: false,
    preview_only: true,
  },
  {
    id: "phase-15p-carnos-response-usage-preview",
    event_type: "memory_used_in_carnos_response",
    entity_kind: "user_memory",
    entity_id: "memory-carnos-response-preview",
    domain_scope: "carnos",
    sensitivity: "medium",
    source: "carnos_memory_visibility",
    surface: "/carnos",
    visibility: "visible_to_user",
    summary: "A visible memory reference was available for a Carnos response preview.",
    user_visible_explanation:
      "If Carnos uses memory in a response later, the UI must explain which memory helped shape the answer.",
    would_write_memory_events: true,
    would_write_memory_usage_logs: true,
    persistence_enabled: false,
    preview_only: true,
  },
  {
    id: "phase-15p-private-mode-preview",
    event_type: "private_mode_enabled",
    entity_kind: "privacy_rule",
    entity_id: "privacy-private-mode-preview",
    domain_scope: "privacy",
    sensitivity: "restricted",
    source: "privacy_rules",
    surface: "/privacy",
    visibility: "redacted_summary",
    summary: "Private mode blocks memory capture and memory usage.",
    user_visible_explanation:
      "Private mode activity should produce a redacted transparency event without storing sensitive content.",
    would_write_memory_events: true,
    would_write_memory_usage_logs: false,
    persistence_enabled: false,
    preview_only: true,
  },
  {
    id: "phase-15p-forgotten-memory-preview",
    event_type: "memory_forgotten",
    entity_kind: "user_memory",
    entity_id: "memory-forgotten-preview",
    domain_scope: "privacy",
    sensitivity: "medium",
    source: "forget_delete_derived_records",
    surface: "/privacy",
    visibility: "visible_to_user",
    summary: "A forget request would later create a memory_forgotten audit event.",
    user_visible_explanation:
      "Forget/delete actions must remain visible so the user can verify that future memory cleanup happened.",
    would_write_memory_events: true,
    would_write_memory_usage_logs: false,
    persistence_enabled: false,
    preview_only: true,
  },
  {
    id: "phase-15p-conflict-preview",
    event_type: "conflict_detected",
    entity_kind: "user_memory",
    entity_id: "memory-conflict-preview",
    domain_scope: "goals",
    sensitivity: "low",
    source: "retrieval_contract",
    surface: "/knowledge",
    visibility: "visible_to_user",
    summary: "A conflicting memory/source relationship was detected in preview.",
    user_visible_explanation:
      "Conflicting memories must expose source authority and visible conflict notes instead of being silently used.",
    would_write_memory_events: true,
    would_write_memory_usage_logs: false,
    persistence_enabled: false,
    preview_only: true,
  },
  {
    id: "phase-15p-stale-memory-preview",
    event_type: "stale_memory_detected",
    entity_kind: "user_memory",
    entity_id: "memory-stale-preview",
    domain_scope: "career",
    sensitivity: "low",
    source: "approved_memory_read_layer",
    surface: "/carnos",
    visibility: "visible_to_user",
    summary: "A stale memory warning was detected before usage.",
    user_visible_explanation:
      "Stale memory must be marked clearly so Carnos does not treat outdated context as fresh.",
    would_write_memory_events: true,
    would_write_memory_usage_logs: false,
    persistence_enabled: false,
    preview_only: true,
  },
];

export const DEFAULT_MEMORY_USAGE_TRANSPARENCY_REFERENCES: MemoryUsageTransparencyReference[] = [
  {
    id: "phase-15p-visible-context-pack-ref",
    memory_ref: "memory-context-pack-preview",
    title: "Project state memory included in context pack",
    domain_scope: "goals",
    sensitivity: "low",
    used_in_context_pack: true,
    used_in_carnos_response: false,
    excluded_from_context_pack: false,
    blocked_from_hidden_usage: false,
    visible_reason:
      "Included because it matches the active project phase and source-of-truth hierarchy.",
    last_event_type: "memory_used_in_context_pack",
  },
  {
    id: "phase-15p-visible-response-ref",
    memory_ref: "memory-carnos-response-preview",
    title: "Carnos response memory visibility",
    domain_scope: "carnos",
    sensitivity: "medium",
    used_in_context_pack: true,
    used_in_carnos_response: true,
    excluded_from_context_pack: false,
    blocked_from_hidden_usage: false,
    visible_reason:
      "Visible because response-shaping memory must be shown to the user before future usage logging.",
    last_event_type: "memory_used_in_carnos_response",
  },
  {
    id: "phase-15p-redacted-private-ref",
    memory_ref: "privacy-private-mode-preview",
    title: "Private mode blocked memory use",
    domain_scope: "privacy",
    sensitivity: "restricted",
    used_in_context_pack: false,
    used_in_carnos_response: false,
    excluded_from_context_pack: true,
    blocked_from_hidden_usage: true,
    visible_reason:
      "Private mode blocks capture and response usage.",
    exclusion_reason:
      "Restricted/private content must not be included in context packs or Carnos responses.",
    last_event_type: "private_mode_enabled",
  },
  {
    id: "phase-15p-stale-excluded-ref",
    memory_ref: "memory-stale-preview",
    title: "Stale career memory excluded",
    domain_scope: "career",
    sensitivity: "low",
    used_in_context_pack: false,
    used_in_carnos_response: false,
    excluded_from_context_pack: true,
    blocked_from_hidden_usage: true,
    visible_reason:
      "Stale memory is shown as excluded, not silently ignored.",
    exclusion_reason:
      "Memory requires review before it can be trusted for future context pack usage.",
    last_event_type: "stale_memory_detected",
  },
];

export function createMemoryAuditUsageEventPreview(
  event: MemoryAuditUsageEventPreview,
): MemoryAuditUsageEventPreview {
  return {
    ...event,
    persistence_enabled: false,
    preview_only: true,
  };
}

export function createMemoryUsageTransparencyReference(
  reference: MemoryUsageTransparencyReference,
): MemoryUsageTransparencyReference {
  return {
    ...reference,
    blocked_from_hidden_usage:
      reference.blocked_from_hidden_usage || reference.excluded_from_context_pack,
  };
}

export function summarizeMemoryAuditUsageTransparency(
  auditEventPreviews: MemoryAuditUsageEventPreview[],
  usageReferences: MemoryUsageTransparencyReference[],
): MemoryAuditUsageTransparencySummary {
  const contextPackUsageCount = usageReferences.filter((reference) => reference.used_in_context_pack).length;
  const carnosResponseUsageCount = usageReferences.filter((reference) => reference.used_in_carnos_response).length;
  const hiddenUsageBlockedCount = usageReferences.filter((reference) => reference.blocked_from_hidden_usage).length;
  const redactedEventCount = auditEventPreviews.filter((event) => event.visibility === "redacted_summary").length;
  const wouldWriteMemoryEventsCount = auditEventPreviews.filter((event) => event.would_write_memory_events).length;
  const wouldWriteMemoryUsageLogsCount = auditEventPreviews.filter((event) => event.would_write_memory_usage_logs).length;

  return {
    phase: "Phase 15P",
    label: "Memory Audit Events + Memory Usage Transparency",
    audit_event_preview_count: auditEventPreviews.length,
    usage_reference_count: usageReferences.length,
    context_pack_usage_count: contextPackUsageCount,
    carnos_response_usage_count: carnosResponseUsageCount,
    hidden_usage_blocked_count: hiddenUsageBlockedCount,
    redacted_event_count: redactedEventCount,
    would_write_memory_events_count: wouldWriteMemoryEventsCount,
    would_write_memory_usage_logs_count: wouldWriteMemoryUsageLogsCount,
    persistence_enabled: false,
    sql_runtime_enabled: false,
    supabase_runtime_enabled: false,
    embedding_runtime_enabled: false,
    provider_calls_enabled: false,
    hidden_prompt_injection_enabled: false,
    route_surface: "/privacy",
    next_phase: "Phase 15Q — Cross-Domain Integration Preview",
    boundary_markers: [...PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_MARKERS],
  };
}

export function createMemoryAuditUsageTransparencyPreview(
  auditEventPreviews: MemoryAuditUsageEventPreview[] = DEFAULT_MEMORY_AUDIT_EVENT_PREVIEWS,
  usageReferences: MemoryUsageTransparencyReference[] = DEFAULT_MEMORY_USAGE_TRANSPARENCY_REFERENCES,
): MemoryAuditUsageTransparencyResult {
  const normalizedEvents = auditEventPreviews.map(createMemoryAuditUsageEventPreview);
  const normalizedReferences = usageReferences.map(createMemoryUsageTransparencyReference);
  const summary = summarizeMemoryAuditUsageTransparency(normalizedEvents, normalizedReferences);

  return {
    summary,
    audit_event_previews: normalizedEvents,
    usage_references: normalizedReferences,
    transparency_notes: [
      "memory_events preview rows explain what would be audited later without writing anything now.",
      "memory_usage_logs preview rows explain context-pack and Carnos-response usage without persistence.",
      "Every future memory use must be user-visible, source-labeled, and explainable.",
      "Hidden memory usage is blocked; excluded memories still appear as transparency explanations.",
      "Sensitive or restricted memory usage must be redacted or require explicit review before future persistence.",
      "Phase 15P does not read SQL, write SQL, call Supabase, generate embeddings, run vector search, call providers, or inject hidden Carnos prompt context.",
    ],
    boundary: PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_BOUNDARY,
  };
}

export function createDefaultMemoryAuditUsageTransparencySummary(): MemoryAuditUsageTransparencySummary {
  return createMemoryAuditUsageTransparencyPreview().summary;
}
