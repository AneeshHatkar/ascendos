/**
 * Phase 15L — Knowledge Vault Foundation
 *
 * Knowledge Vault Foundation.
 * Knowledge vault separation.
 * knowledge_items.
 * knowledge_tags.
 * knowledge_links.
 * non-personal knowledge records.
 * source material metadata.
 * tags and link previews.
 * memory conversion requires review.
 * not personal memory.
 * embedded: false.
 * retrieval deferred.
 * upload parsing deferred.
 * no approval.
 * no persistence.
 * no Supabase calls.
 * no SQL reads or writes.
 * no retrieval.
 * no embeddings.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * no standalone /memory route.
 * standalone `/memory` route.
 * Phase 15M — Retrieval Contract + Provenance + Conflict Handling.
 */

import type {
  KnowledgeVaultItemContract,
  MemoryProvenance,
} from "./memory-contracts";
import type {
  MemoryDomainScope,
  MemorySensitivityLevel,
} from "./memory-enums";

export type KnowledgeVaultItemStatus =
  | "draft"
  | "active"
  | "archived"
  | "needs_review";

export type KnowledgeVaultSourceKind =
  | "manual_note"
  | "uploaded_document_metadata"
  | "research_note"
  | "project_source"
  | "learning_source"
  | "source_of_truth_reference";

export interface KnowledgeVaultTagPreview {
  id: string;
  tag_name: string;
  tag_scope: MemoryDomainScope | "global";
  item_count: number;
}

export interface KnowledgeVaultLinkPreview {
  id: string;
  knowledge_item_id: string;
  linked_table: string;
  linked_record_id: string;
  link_type:
    | "source"
    | "supports"
    | "related_context"
    | "belongs_to_project"
    | "belongs_to_domain";
  link_label: string;
}

export interface KnowledgeVaultFoundationItem
  extends KnowledgeVaultItemContract {
  status: KnowledgeVaultItemStatus;
  source_kind: KnowledgeVaultSourceKind;
  link_count: number;
  conversion_review_required: true;
}

export interface KnowledgeVaultFoundationInput {
  items?: KnowledgeVaultFoundationItem[];
  tags?: KnowledgeVaultTagPreview[];
  links?: KnowledgeVaultLinkPreview[];
  active_domain?: MemoryDomainScope | "all";
  include_archived?: boolean;
}

export interface KnowledgeVaultFoundationSummary {
  phase: "Phase 15L";
  label: "Knowledge Vault Foundation";
  total_items: number;
  active_items: number;
  archived_items: number;
  needs_review_items: number;
  tag_count: number;
  link_count: number;
  domain_count: number;
  personal_memory_count: 0;
  embedded_item_count: 0;
  retrieval_enabled: false;
  provider_calls_enabled: false;
  sql_runtime_enabled: false;
  route_surface: "/knowledge";
  next_phase: "Phase 15M — Retrieval Contract + Provenance + Conflict Handling";
  separation_rules: string[];
  boundary_markers: string[];
  visible_notes: string[];
}

export interface KnowledgeVaultFoundationResult {
  summary: KnowledgeVaultFoundationSummary;
  visible_items: KnowledgeVaultFoundationItem[];
  hidden_items: KnowledgeVaultFoundationItem[];
  tags: KnowledgeVaultTagPreview[];
  links: KnowledgeVaultLinkPreview[];
  domain_scopes: Array<MemoryDomainScope | "global">;
  conversion_review_notes: string[];
  deferred_capabilities: string[];
}

const defaultProvenance: MemoryProvenance = {
  source_type: "source_of_truth",
  source_route: "/knowledge",
  source_phase: "Phase 15L",
  source_label: "Knowledge Vault Foundation preview",
};

export const PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_BOUNDARY = [
  "Knowledge Vault Foundation",
  "Knowledge vault separation",
  "knowledge_items",
  "knowledge_tags",
  "knowledge_links",
  "non-personal knowledge records",
  "not personal memory",
  "embedded: false",
  "memory conversion requires review",
  "retrieval deferred",
  "upload parsing deferred",
  "no approval",
  "no persistence",
  "no Supabase calls",
  "no SQL reads or writes",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no standalone /memory route",
  "Phase 15M — Retrieval Contract + Provenance + Conflict Handling",
] as const;

export const DEFAULT_KNOWLEDGE_VAULT_ITEMS: KnowledgeVaultFoundationItem[] = [
  {
    kind: "knowledge_vault_item",
    id: "phase-15l-source-truth-vault-item",
    user_id: "preview-user",
    title: "Source-of-truth implementation notes",
    content_summary:
      "FINAL_SYNCED DOCX/JSON and repo phase logs can be represented as knowledge vault metadata without becoming personal memory.",
    source_label: "FINAL_SYNCED source-of-truth",
    tags: ["source-of-truth", "ascendOS", "Carnos"],
    domain_scope: "knowledge",
    provenance: {
      ...defaultProvenance,
      source_label: "FINAL_SYNCED DOCX/JSON",
    },
    sensitivity: "medium",
    is_personal_memory: false,
    embedded: false,
    status: "active",
    source_kind: "source_of_truth_reference",
    link_count: 2,
    conversion_review_required: true,
  },
  {
    kind: "knowledge_vault_item",
    id: "phase-15l-research-vault-item",
    user_id: "preview-user",
    title: "Research and learning source metadata",
    content_summary:
      "Research notes, learning sources, and project references can be organized as knowledge items while retrieval remains deferred.",
    source_label: "Knowledge route preview",
    tags: ["research", "learning", "project-source"],
    domain_scope: "research",
    provenance: {
      ...defaultProvenance,
      source_label: "Phase 15L knowledge preview",
    },
    sensitivity: "low",
    is_personal_memory: false,
    embedded: false,
    status: "active",
    source_kind: "research_note",
    link_count: 1,
    conversion_review_required: true,
  },
  {
    kind: "knowledge_vault_item",
    id: "phase-15l-conversion-review-item",
    user_id: "preview-user",
    title: "Personal-memory conversion boundary",
    content_summary:
      "Knowledge vault records do not become Carnos personal memory unless a future explicit review and approval flow converts them.",
    source_label: "Memory boundary rule",
    tags: ["memory-boundary", "review-required"],
    domain_scope: "knowledge",
    provenance: {
      ...defaultProvenance,
      source_label: "Knowledge vault separation rule",
    },
    sensitivity: "medium",
    is_personal_memory: false,
    embedded: false,
    status: "needs_review",
    source_kind: "manual_note",
    link_count: 0,
    conversion_review_required: true,
  },
];

export const DEFAULT_KNOWLEDGE_VAULT_TAGS: KnowledgeVaultTagPreview[] = [
  {
    id: "phase-15l-tag-source-truth",
    tag_name: "source-of-truth",
    tag_scope: "knowledge",
    item_count: 1,
  },
  {
    id: "phase-15l-tag-research",
    tag_name: "research",
    tag_scope: "research",
    item_count: 1,
  },
  {
    id: "phase-15l-tag-boundary",
    tag_name: "memory-boundary",
    tag_scope: "knowledge",
    item_count: 1,
  },
];

export const DEFAULT_KNOWLEDGE_VAULT_LINKS: KnowledgeVaultLinkPreview[] = [
  {
    id: "phase-15l-link-source-truth-project",
    knowledge_item_id: "phase-15l-source-truth-vault-item",
    linked_table: "project_memory_state",
    linked_record_id: "preview-project-state",
    link_type: "belongs_to_project",
    link_label: "Links source-of-truth notes to project continuity.",
  },
  {
    id: "phase-15l-link-research-domain",
    knowledge_item_id: "phase-15l-research-vault-item",
    linked_table: "research_ideas",
    linked_record_id: "preview-research-idea",
    link_type: "related_context",
    link_label: "Links research source metadata to research planning.",
  },
];

function visibleByDomain(
  item: KnowledgeVaultFoundationItem,
  activeDomain: MemoryDomainScope | "all",
) {
  return activeDomain === "all" || item.domain_scope === activeDomain;
}

function uniqueDomains(
  items: KnowledgeVaultFoundationItem[],
  tags: KnowledgeVaultTagPreview[],
) {
  return [
    ...new Set<MemoryDomainScope | "global">([
      ...items.map((item) => item.domain_scope),
      ...tags.map((tag) => tag.tag_scope),
    ]),
  ];
}

export function createKnowledgeVaultFoundationPreview(
  input: KnowledgeVaultFoundationInput = {},
): KnowledgeVaultFoundationResult {
  const items = input.items ?? DEFAULT_KNOWLEDGE_VAULT_ITEMS;
  const tags = input.tags ?? DEFAULT_KNOWLEDGE_VAULT_TAGS;
  const links = input.links ?? DEFAULT_KNOWLEDGE_VAULT_LINKS;
  const activeDomain = input.active_domain ?? "all";
  const includeArchived = input.include_archived ?? false;

  const visible_items = items.filter((item) => {
    const archiveAllowed = includeArchived || item.status !== "archived";
    return archiveAllowed && visibleByDomain(item, activeDomain);
  });

  const hidden_items = items.filter(
    (item) => !visible_items.some((visibleItem) => visibleItem.id === item.id),
  );

  const active_items = items.filter((item) => item.status === "active").length;
  const archived_items = items.filter((item) => item.status === "archived").length;
  const needs_review_items = items.filter(
    (item) => item.status === "needs_review",
  ).length;

  const conversion_review_notes = visible_items.map(
    (item) =>
      `${item.title}: memory conversion requires explicit future review; item remains not personal memory.`,
  );

  const deferred_capabilities = [
    "retrieval deferred",
    "embedding deferred",
    "upload parsing deferred",
    "provider calls deferred",
    "knowledge-to-memory conversion deferred",
    "autonomous Carnos usage deferred",
  ];

  const summary: KnowledgeVaultFoundationSummary = {
    phase: "Phase 15L",
    label: "Knowledge Vault Foundation",
    total_items: items.length,
    active_items,
    archived_items,
    needs_review_items,
    tag_count: tags.length,
    link_count: links.length,
    domain_count: uniqueDomains(items, tags).length,
    personal_memory_count: 0,
    embedded_item_count: 0,
    retrieval_enabled: false,
    provider_calls_enabled: false,
    sql_runtime_enabled: false,
    route_surface: "/knowledge",
    next_phase: "Phase 15M — Retrieval Contract + Provenance + Conflict Handling",
    separation_rules: [
      "Knowledge vault records are source/reference metadata, not personal memory.",
      "Knowledge vault records keep is_personal_memory false.",
      "Knowledge vault records keep embedded false in Phase 15L.",
      "Conversion into approved memory requires explicit future review.",
      "Retrieval, RAG, embeddings, provider calls, and hidden Carnos usage remain deferred.",
    ],
    boundary_markers: [...PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_BOUNDARY],
    visible_notes: [
      "Knowledge Vault Foundation is visible on /knowledge.",
      "Phase 15L does not create a standalone /memory route.",
      "Phase 15L does not read or write SQL at runtime.",
      "Phase 15M will define retrieval contract boundaries before any retrieval behavior exists.",
    ],
  };

  return {
    summary,
    visible_items,
    hidden_items,
    tags,
    links,
    domain_scopes: uniqueDomains(items, tags),
    conversion_review_notes,
    deferred_capabilities,
  };
}

export function summarizeKnowledgeVaultFoundation(
  result: KnowledgeVaultFoundationResult,
): string {
  return [
    `${result.summary.phase} ${result.summary.label}`,
    `${result.summary.total_items} knowledge vault items`,
    `${result.summary.tag_count} tags`,
    `${result.summary.link_count} links`,
    "not personal memory",
    "embedded: false",
    "no retrieval",
    "no embeddings",
    "no provider calls",
  ].join(" · ");
}

export function createDefaultKnowledgeVaultFoundationSummary() {
  return createKnowledgeVaultFoundationPreview().summary;
}

export function createKnowledgeVaultItemPreview(input: {
  id?: string;
  user_id?: string;
  title: string;
  content_summary: string;
  source_label: string;
  tags?: string[];
  domain_scope?: MemoryDomainScope;
  sensitivity?: MemorySensitivityLevel;
  source_kind?: KnowledgeVaultSourceKind;
}): KnowledgeVaultFoundationItem {
  return {
    kind: "knowledge_vault_item",
    id: input.id,
    user_id: input.user_id ?? "preview-user",
    title: input.title,
    content_summary: input.content_summary,
    source_label: input.source_label,
    tags: input.tags ?? [],
    domain_scope: input.domain_scope ?? "knowledge",
    provenance: {
      ...defaultProvenance,
      source_label: input.source_label,
    },
    sensitivity: input.sensitivity ?? "medium",
    is_personal_memory: false,
    embedded: false,
    status: "draft",
    source_kind: input.source_kind ?? "manual_note",
    link_count: 0,
    conversion_review_required: true,
  };
}
