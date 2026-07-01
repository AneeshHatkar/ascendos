/**
 * Phase 15Q — Cross-Domain Integration Preview.
 *
 * Preview-only integration map for how Carnos memory, current context packs,
 * memory audit events, memory usage transparency, retrieval boundaries, and
 * source-of-truth hierarchy can appear across ascendOS domains.
 *
 * Boundary:
 * - no SQL reads or writes
 * - no Supabase calls
 * - no persistence
 * - no embeddings
 * - no vector search
 * - no provider calls
 * - no hidden Carnos prompt injection
 * - no standalone /memory route
 * - no action execution
 *
 * Next: Phase 15R — Final Audit, Smoke Checklist, Completion Report.
 */

import type { MemoryDomainScope, MemoryType } from "./memory-enums";

export type CrossDomainIntegrationSurface =
  | "/command"
  | "/carnos"
  | "/calendar"
  | "/timeline"
  | "/goals"
  | "/career"
  | "/learning"
  | "/research-stanford"
  | "/body"
  | "/nutrition"
  | "/grimoire"
  | "/analytics"
  | "/privacy"
  | "/knowledge";

export type CrossDomainIntegrationStatus =
  | "visible_preview"
  | "control_surface"
  | "knowledge_surface"
  | "deferred_runtime"
  | "blocked_hidden_use";

export type CrossDomainIntegrationUsageEvent =
  | "memory_used_in_context_pack"
  | "memory_used_in_carnos_response"
  | "candidate_created"
  | "memory_forgotten"
  | "conflict_detected"
  | "stale_memory_detected"
  | "private_mode_enabled";

export type CrossDomainIntegrationBlockedReason =
  | "hidden_memory_use_blocked"
  | "private_mode_can_block"
  | "do_not_remember_can_block"
  | "requires_user_visible_usage_ledger"
  | "requires_source_label"
  | "requires_conflict_warning"
  | "requires_staleness_warning"
  | "requires_noop_embedding_boundary"
  | "requires_preview_only_contract";

export type CrossDomainIntegrationPreviewRef = {
  id: string;
  surface: CrossDomainIntegrationSurface;
  title: string;
  domain_scope: MemoryDomainScope;
  status: CrossDomainIntegrationStatus;
  allowed_memory_types: MemoryType[];
  visible_panels: string[];
  visible_usage_events: CrossDomainIntegrationUsageEvent[];
  blocked_reasons: CrossDomainIntegrationBlockedReason[];
  source_tables_preview: string[];
  user_visible_summary: string;
  preview_only: true;
  no_persistence: true;
};

export type CrossDomainIntegrationRouteLink = {
  id: string;
  from_surface: CrossDomainIntegrationSurface;
  to_surface: CrossDomainIntegrationSurface;
  label: string;
  purpose: string;
  event_visibility: "visible_ledger_required";
  prompt_injection_policy: "hidden_injection_blocked";
  preview_only: true;
};

export type CrossDomainIntegrationBoundary = {
  phase: "15Q";
  title: "Cross-Domain Integration Preview";
  no_sql_reads_or_writes: true;
  no_supabase_calls: true;
  no_persistence: true;
  no_embeddings: true;
  no_vector_search: true;
  no_provider_calls: true;
  no_hidden_carnos_prompt_injection: true;
  no_standalone_memory_route: true;
  no_action_execution: true;
  next_phase: "15R — Final Audit, Smoke Checklist, Completion Report";
};

export type CrossDomainIntegrationSummary = {
  total_surfaces: number;
  visible_preview_surfaces: number;
  control_surfaces: number;
  knowledge_surfaces: number;
  blocked_hidden_use_surfaces: number;
  usage_event_kinds: CrossDomainIntegrationUsageEvent[];
  domain_scopes: MemoryDomainScope[];
  route_link_count: number;
  boundary: CrossDomainIntegrationBoundary;
};

export type CrossDomainIntegrationPreviewResult = {
  refs: CrossDomainIntegrationPreviewRef[];
  route_links: CrossDomainIntegrationRouteLink[];
  summary: CrossDomainIntegrationSummary;
  boundary_notes: string[];
};

export const PHASE_15Q_CROSS_DOMAIN_INTEGRATION_BOUNDARY: CrossDomainIntegrationBoundary = {
  phase: "15Q",
  title: "Cross-Domain Integration Preview",
  no_sql_reads_or_writes: true,
  no_supabase_calls: true,
  no_persistence: true,
  no_embeddings: true,
  no_vector_search: true,
  no_provider_calls: true,
  no_hidden_carnos_prompt_injection: true,
  no_standalone_memory_route: true,
  no_action_execution: true,
  next_phase: "15R — Final Audit, Smoke Checklist, Completion Report",
};

export const PHASE_15Q_CROSS_DOMAIN_INTEGRATION_MARKERS = [
  "Phase 15Q",
  "Cross-Domain Integration Preview",
  "cross-domain memory visibility",
  "whole-project connectivity",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "visible memory usage ledger",
  "hidden memory usage blocked",
  "source-of-truth hierarchy visible",
  "private mode can block",
  "do-not-remember can block",
  "no SQL reads or writes",
  "no Supabase calls",
  "no persistence",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "standalone /memory route",
  "Phase 15R",
] as const;

export const DEFAULT_CROSS_DOMAIN_INTEGRATION_REFS: CrossDomainIntegrationPreviewRef[] = [
  {
    id: "cross-domain-command",
    surface: "/command",
    title: "Command dashboard memory context preview",
    domain_scope: "global",
    status: "visible_preview",
    allowed_memory_types: ["goal", "routine", "system_state", "project_decision"],
    visible_panels: ["Current context pack preview", "Carnos memory visibility", "Memory usage transparency"],
    visible_usage_events: ["memory_used_in_context_pack", "stale_memory_detected", "conflict_detected"],
    blocked_reasons: [
      "hidden_memory_use_blocked",
      "requires_user_visible_usage_ledger",
      "requires_source_label",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["approved_memory_preview_refs", "carnos_context_snapshots", "memory_usage_preview_refs", "retrieval_preview_refs"],
    user_visible_summary:
      "Command may preview which approved memories would influence daily execution, but hidden injection and runtime retrieval remain blocked.",
    preview_only: true,
    no_persistence: true,
  },
  {
    id: "cross-domain-carnos",
    surface: "/carnos",
    title: "Carnos response memory visibility preview",
    domain_scope: "carnos",
    status: "visible_preview",
    allowed_memory_types: ["carnos_entity_state", "conversation_continuity", "project_fact", "system_state"],
    visible_panels: ["Carnos entity state", "Carnos memory visibility", "Memory audit usage transparency"],
    visible_usage_events: ["memory_used_in_context_pack", "memory_used_in_carnos_response", "conflict_detected"],
    blocked_reasons: [
      "hidden_memory_use_blocked",
      "requires_user_visible_usage_ledger",
      "requires_source_label",
      "requires_conflict_warning",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["carnos_entity_state", "approved_memory_preview_refs", "memory_event_preview_refs", "memory_usage_preview_refs"],
    user_visible_summary:
      "Carnos must show what memory would be used in a context pack or response before runtime memory is enabled.",
    preview_only: true,
    no_persistence: true,
  },
  {
    id: "cross-domain-goals",
    surface: "/goals",
    title: "Goals memory grounding preview",
    domain_scope: "goals",
    status: "visible_preview",
    allowed_memory_types: ["goal", "routine", "project_decision"],
    visible_panels: ["Approved memory read layer", "Current context pack preview"],
    visible_usage_events: ["memory_used_in_context_pack", "stale_memory_detected"],
    blocked_reasons: [
      "requires_source_label",
      "requires_staleness_warning",
      "requires_user_visible_usage_ledger",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["approved_memory_preview_refs", "memory_relationship_preview_refs", "goals", "tasks"],
    user_visible_summary:
      "Goals can preview relevant approved memories and stale goal context without creating or changing records.",
    preview_only: true,
    no_persistence: true,
  },
  {
    id: "cross-domain-career",
    surface: "/career",
    title: "Career continuity memory preview",
    domain_scope: "career",
    status: "visible_preview",
    allowed_memory_types: ["career_context", "project_fact", "project_decision", "goal"],
    visible_panels: ["Approved memory read layer", "Retrieval contract preview"],
    visible_usage_events: ["memory_used_in_context_pack", "conflict_detected"],
    blocked_reasons: [
      "requires_source_label",
      "requires_conflict_warning",
      "hidden_memory_use_blocked",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["approved_memory_preview_refs", "memory_relationship_preview_refs", "job_applications", "resume_versions", "interviews"],
    user_visible_summary:
      "Career surfaces can preview resume/job-search continuity, but cannot silently inject memory into Carnos advice.",
    preview_only: true,
    no_persistence: true,
  },
  {
    id: "cross-domain-body",
    surface: "/body",
    title: "Health/body restricted memory preview",
    domain_scope: "body",
    status: "visible_preview",
    allowed_memory_types: ["health_context", "routine", "sensitive_note"],
    visible_panels: ["Memory privacy rules", "Approved memory read layer", "Memory usage transparency"],
    visible_usage_events: ["memory_used_in_context_pack", "private_mode_enabled"],
    blocked_reasons: [
      "private_mode_can_block",
      "do_not_remember_can_block",
      "requires_user_visible_usage_ledger",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["approved_memory_preview_refs", "memory_do_not_remember_rules", "body_logs", "workouts"],
    user_visible_summary:
      "Health/body memory must remain user-visible, privacy-aware, and review-gated before any future runtime use.",
    preview_only: true,
    no_persistence: true,
  },
  {
    id: "cross-domain-knowledge",
    surface: "/knowledge",
    title: "Knowledge vault integration preview",
    domain_scope: "knowledge",
    status: "knowledge_surface",
    allowed_memory_types: ["knowledge_item", "research_note", "project_fact"],
    visible_panels: ["Knowledge vault foundation", "Retrieval contract preview", "Embedding boundary"],
    visible_usage_events: ["memory_used_in_context_pack"],
    blocked_reasons: [
      "requires_noop_embedding_boundary",
      "requires_source_label",
      "hidden_memory_use_blocked",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["knowledge_items", "knowledge_tags", "knowledge_links", "retrieval_preview_refs"],
    user_visible_summary:
      "Knowledge records remain separate from personal memory unless explicitly converted through review.",
    preview_only: true,
    no_persistence: true,
  },
  {
    id: "cross-domain-privacy",
    surface: "/privacy",
    title: "Privacy and memory controls preview",
    domain_scope: "privacy",
    status: "control_surface",
    allowed_memory_types: ["privacy_rule", "do_not_remember_rule", "sensitive_note"],
    visible_panels: ["Privacy rules", "Forget/delete derived records", "Memory audit usage transparency"],
    visible_usage_events: ["private_mode_enabled", "memory_forgotten"],
    blocked_reasons: [
      "private_mode_can_block",
      "do_not_remember_can_block",
      "requires_user_visible_usage_ledger",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["memory_preferences", "memory_do_not_remember_rules", "memory_event_preview_refs", "memory_usage_preview_refs"],
    user_visible_summary:
      "Privacy remains the control surface for private mode, do-not-remember, forget/delete previews, and usage transparency.",
    preview_only: true,
    no_persistence: true,
  },
  {
    id: "cross-domain-grimoire",
    surface: "/grimoire",
    title: "Grimoire symbolic-to-action memory preview",
    domain_scope: "grimoire",
    status: "visible_preview",
    allowed_memory_types: ["grimoire_context", "routine", "project_decision"],
    visible_panels: ["Source-of-truth hierarchy", "Carnos memory visibility"],
    visible_usage_events: ["memory_used_in_context_pack", "conflict_detected"],
    blocked_reasons: [
      "requires_source_label",
      "requires_conflict_warning",
      "hidden_memory_use_blocked",
      "requires_preview_only_contract",
    ],
    source_tables_preview: ["approved_memory_preview_refs", "project_memory_state", "grimoire_modes", "grimoire_skills"],
    user_visible_summary:
      "Grimoire memory can preview grounding rules so symbolic modes do not override evidence or source-of-truth hierarchy.",
    preview_only: true,
    no_persistence: true,
  },
];

export const DEFAULT_CROSS_DOMAIN_ROUTE_LINKS: CrossDomainIntegrationRouteLink[] = [
  {
    id: "route-carnos-command",
    from_surface: "/carnos",
    to_surface: "/command",
    label: "Carnos → Command",
    purpose: "Show which memory refs would shape command-center execution context.",
    event_visibility: "visible_ledger_required",
    prompt_injection_policy: "hidden_injection_blocked",
    preview_only: true,
  },
  {
    id: "route-carnos-privacy",
    from_surface: "/carnos",
    to_surface: "/privacy",
    label: "Carnos → Privacy",
    purpose: "Route memory controls, private mode, do-not-remember, and forget/delete visibility to privacy.",
    event_visibility: "visible_ledger_required",
    prompt_injection_policy: "hidden_injection_blocked",
    preview_only: true,
  },
  {
    id: "route-carnos-knowledge",
    from_surface: "/carnos",
    to_surface: "/knowledge",
    label: "Carnos → Knowledge",
    purpose: "Keep knowledge vault records separate from personal memory and behind retrieval boundaries.",
    event_visibility: "visible_ledger_required",
    prompt_injection_policy: "hidden_injection_blocked",
    preview_only: true,
  },
  {
    id: "route-goals-career",
    from_surface: "/goals",
    to_surface: "/career",
    label: "Goals → Career",
    purpose: "Preview how approved goals/project decisions can ground career planning without hidden memory use.",
    event_visibility: "visible_ledger_required",
    prompt_injection_policy: "hidden_injection_blocked",
    preview_only: true,
  },
  {
    id: "route-body-privacy",
    from_surface: "/body",
    to_surface: "/privacy",
    label: "Body → Privacy",
    purpose: "Keep health/body memory privacy-aware and blocked when private mode or do-not-remember rules apply.",
    event_visibility: "visible_ledger_required",
    prompt_injection_policy: "hidden_injection_blocked",
    preview_only: true,
  },
];

function uniqueValues<T extends string>(values: T[]): T[] {
  return [...new Set(values)];
}

export function summarizeCrossDomainIntegrationPreview(
  refs: CrossDomainIntegrationPreviewRef[] = DEFAULT_CROSS_DOMAIN_INTEGRATION_REFS,
  routeLinks: CrossDomainIntegrationRouteLink[] = DEFAULT_CROSS_DOMAIN_ROUTE_LINKS,
): CrossDomainIntegrationSummary {
  return {
    total_surfaces: refs.length,
    visible_preview_surfaces: refs.filter((ref) => ref.status === "visible_preview").length,
    control_surfaces: refs.filter((ref) => ref.status === "control_surface").length,
    knowledge_surfaces: refs.filter((ref) => ref.status === "knowledge_surface").length,
    blocked_hidden_use_surfaces: refs.filter((ref) => ref.blocked_reasons.includes("hidden_memory_use_blocked")).length,
    usage_event_kinds: uniqueValues(refs.flatMap((ref) => ref.visible_usage_events)),
    domain_scopes: uniqueValues(refs.map((ref) => ref.domain_scope)),
    route_link_count: routeLinks.length,
    boundary: PHASE_15Q_CROSS_DOMAIN_INTEGRATION_BOUNDARY,
  };
}

export function createCrossDomainIntegrationPreview(
  refs: CrossDomainIntegrationPreviewRef[] = DEFAULT_CROSS_DOMAIN_INTEGRATION_REFS,
  routeLinks: CrossDomainIntegrationRouteLink[] = DEFAULT_CROSS_DOMAIN_ROUTE_LINKS,
): CrossDomainIntegrationPreviewResult {
  return {
    refs,
    route_links: routeLinks,
    summary: summarizeCrossDomainIntegrationPreview(refs, routeLinks),
    boundary_notes: [
      "Phase 15Q is preview-only and does not read or write SQL.",
      "Cross-domain memory usage must be visible through memory_usage_preview_refs preview language before runtime use.",
      "memory_used_in_context_pack and memory_used_in_carnos_response remain preview-only event labels.",
      "Private mode and do-not-remember rules can block cross-domain memory use.",
      "Knowledge vault records are not personal memory unless explicitly converted through review.",
      "Hidden Carnos prompt injection remains blocked.",
      "Embedding and vector search remain disabled by the Phase 15N noop boundary.",
      "No standalone /memory route is added in Phase 15Q.",
      "Phase 15R closes Phase 15 with final audit, smoke checklist, and completion report.",
    ],
  };
}

export function createDefaultCrossDomainIntegrationSummary(): CrossDomainIntegrationSummary {
  return summarizeCrossDomainIntegrationPreview();
}
