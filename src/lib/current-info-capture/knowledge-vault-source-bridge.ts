import type { WebSourceCandidateRow, WebSourceRow } from "@/lib/repositories";

export type KnowledgeVaultSourceBridgeStatus =
  | "ready_for_review"
  | "needs_evidence"
  | "blocked"
  | "archived"
  | "unknown";

export type KnowledgeVaultSourceBridgeRecord = {
  sourceId: string;
  candidateId: string | null;
  title: string;
  domain: string;
  sourceKind: string;
  reliabilityLabel: string;
  freshnessLabel: string;
  suggestedDestination: string;
  suggestedActionType: string;
  bridgeStatus: KnowledgeVaultSourceBridgeStatus;
  summary: string;
  citationLabel: string;
  citationUrl: string | null;
  warnings: string[];
  missingFields: string[];
  createdAt: string;
};

export type KnowledgeVaultSourceBridgeSummary = {
  totalSources: number;
  totalCandidates: number;
  readyForReviewCount: number;
  needsEvidenceCount: number;
  blockedCount: number;
  archivedCount: number;
  warningCount: number;
};

export type KnowledgeVaultSourceBridgeResult = {
  summary: KnowledgeVaultSourceBridgeSummary;
  records: KnowledgeVaultSourceBridgeRecord[];
};

const KNOWLEDGE_DESTINATIONS = new Set([
  "knowledge_items",
  "knowledge_vault_items",
  "research_literature_items",
  "research_citations",
  "learning_resources",
  "career_notes",
  "goals",
  "tasks",
]);

const KNOWLEDGE_CANDIDATE_TYPES = new Set([
  "save_web_source_to_knowledge_candidate",
  "create_knowledge_item_from_web_source_candidate",
  "create_research_literature_item_from_web_source_candidate",
  "create_research_citation_from_web_source_candidate",
  "create_task_from_web_source_candidate",
  "create_goal_from_web_source_candidate",
]);

function normalizeText(value: string | null | undefined, fallback: string) {
  const clean = value?.trim();

  if (!clean) {
    return fallback;
  }

  return clean;
}

function uniqueWarnings(candidate: WebSourceCandidateRow | null) {
  if (!candidate) {
    return [];
  }

  return [
    ...new Set([
      ...candidate.reliability_warnings,
      ...candidate.freshness_warnings,
      ...candidate.privacy_warnings,
    ]),
  ];
}

function classifyBridgeStatus(
  source: WebSourceRow,
  candidate: WebSourceCandidateRow | null,
): KnowledgeVaultSourceBridgeStatus {
  if (candidate?.candidate_status === "blocked" || candidate?.candidate_status === "rejected") {
    return "blocked";
  }

  if (candidate?.candidate_status === "archived") {
    return "archived";
  }

  if (source.reliability_label === "low_reliability" || source.freshness_label === "stale") {
    return "needs_evidence";
  }

  if (candidate && candidate.missing_fields.length > 0) {
    return "needs_evidence";
  }

  if (candidate?.candidate_status === "pending_review" || candidate?.candidate_status === "approved") {
    return "ready_for_review";
  }

  return "unknown";
}

function isKnowledgeCandidate(candidate: WebSourceCandidateRow) {
  if (candidate.suggested_destination_table && KNOWLEDGE_DESTINATIONS.has(candidate.suggested_destination_table)) {
    return true;
  }

  return KNOWLEDGE_CANDIDATE_TYPES.has(candidate.candidate_type);
}

export function buildKnowledgeVaultSourceBridge(
  sources: WebSourceRow[],
  candidates: WebSourceCandidateRow[],
): KnowledgeVaultSourceBridgeResult {
  const knowledgeCandidates = candidates.filter(isKnowledgeCandidate);
  const candidateBySourceId = new Map<string, WebSourceCandidateRow>();

  for (const candidate of knowledgeCandidates) {
    if (candidate.source_id && !candidateBySourceId.has(candidate.source_id)) {
      candidateBySourceId.set(candidate.source_id, candidate);
    }
  }

  const records = sources.map((source) => {
    const candidate = candidateBySourceId.get(source.id) ?? null;
    const warnings = uniqueWarnings(candidate);
    const bridgeStatus = classifyBridgeStatus(source, candidate);

    return {
      sourceId: source.id,
      candidateId: candidate?.id ?? null,
      title: normalizeText(source.title, normalizeText(source.domain, "Untitled source")),
      domain: normalizeText(source.domain, "unknown domain"),
      sourceKind: source.source_kind,
      reliabilityLabel: source.reliability_label,
      freshnessLabel: source.freshness_label,
      suggestedDestination: normalizeText(candidate?.suggested_destination_table, "review_required"),
      suggestedActionType: normalizeText(candidate?.suggested_action_type, "no_action_suggested"),
      bridgeStatus,
      summary: normalizeText(source.summary ?? source.description ?? source.excerpt, "No summary captured yet."),
      citationLabel: normalizeText(source.citation_label, "source citation"),
      citationUrl: source.citation_url,
      warnings,
      missingFields: candidate?.missing_fields ?? [],
      createdAt: candidate?.created_at ?? source.created_at,
    } satisfies KnowledgeVaultSourceBridgeRecord;
  });

  const summary = records.reduce<KnowledgeVaultSourceBridgeSummary>(
    (acc, record) => {
      acc.warningCount += record.warnings.length;

      if (record.bridgeStatus === "ready_for_review") {
        acc.readyForReviewCount += 1;
      }

      if (record.bridgeStatus === "needs_evidence") {
        acc.needsEvidenceCount += 1;
      }

      if (record.bridgeStatus === "blocked") {
        acc.blockedCount += 1;
      }

      if (record.bridgeStatus === "archived") {
        acc.archivedCount += 1;
      }

      return acc;
    },
    {
      totalSources: sources.length,
      totalCandidates: knowledgeCandidates.length,
      readyForReviewCount: 0,
      needsEvidenceCount: 0,
      blockedCount: 0,
      archivedCount: 0,
      warningCount: 0,
    },
  );

  return {
    summary,
    records,
  };
}

export const PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_BOUNDARY =
  "Phase 16N creates a read-only bridge from current-info sources to Knowledge Vault review previews and cannot save, write, approve, reject, embed, summarize with an LLM, or mutate records.";
