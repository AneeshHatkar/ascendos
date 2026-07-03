import type { ProposedActionContract, ProposedActionDomain } from "@/lib/actions/proposed-action-contracts";
import type { WebSourceCandidateRow, WebSourceRow } from "@/lib/repositories";

export type CurrentInfoReviewDecision =
  | "approve_for_save_preview"
  | "reject_candidate_preview"
  | "archive_candidate_preview"
  | "request_edit_preview"
  | "blocked_preview";

export type CurrentInfoSaveTarget =
  | "knowledge_items"
  | "tasks"
  | "goals"
  | "proof_items"
  | "research_literature_items"
  | "research_citations"
  | "target_labs"
  | "target_professors"
  | "unsupported_destination";

export type CurrentInfoReviewToSaveStatus =
  | "ready_for_confirmation"
  | "needs_edit"
  | "blocked_by_reliability"
  | "blocked_by_duplicate"
  | "blocked_by_private_mode"
  | "unsupported"
  | "already_resolved";

export type CurrentInfoKnowledgeSavePreview = {
  title: string;
  content: string;
  knowledge_type: "reference" | "research_note" | "project_note" | "note";
  source_kind: "external_reference" | "research_record" | "project_record" | "manual";
  source_uri: string | null;
  source_table: "web_sources";
  source_record_id: string;
  sensitivity: "low" | "medium" | "high" | "restricted";
  metadata: Record<string, unknown>;
};

export type CurrentInfoReviewToSavePreview = {
  candidateId: string;
  sourceId: string | null;
  title: string;
  destination: CurrentInfoSaveTarget;
  decision: CurrentInfoReviewDecision;
  status: CurrentInfoReviewToSaveStatus;
  candidateStatus: string;
  candidateType: string;
  suggestedActionType: string | null;
  reviewNotes: string | null;
  missingFields: string[];
  warnings: string[];
  duplicateHints: unknown;
  canCreateProposedAction: boolean;
  proposedActionPreview: ProposedActionContract | null;
  knowledgeSavePreview: CurrentInfoKnowledgeSavePreview | null;
  citationPreview: {
    citation_label: string | null;
    citation_url: string | null;
    linked_table: string;
    link_kind: "citation" | "source" | "evidence" | "provenance";
    link_status: "preview";
  };
  auditPreview: {
    event_type:
      | "web_source_candidate_approved"
      | "web_source_candidate_rejected"
      | "web_source_saved"
      | "web_source_linked_to_record"
      | "web_source_blocked_by_private_mode"
      | "web_source_blocked_by_reliability";
    actor_type: "user";
    event_summary: string;
    event_payload: Record<string, unknown>;
  };
};

export type CurrentInfoReviewToSaveFlowResult = {
  totalCandidates: number;
  readyForConfirmationCount: number;
  needsEditCount: number;
  blockedCount: number;
  unsupportedCount: number;
  previews: CurrentInfoReviewToSavePreview[];
};

const CANDIDATE_TYPE_TO_TARGET: Record<string, CurrentInfoSaveTarget> = {
  save_web_source_to_knowledge_candidate: "knowledge_items",
  create_task_from_web_source_candidate: "tasks",
  create_goal_from_web_source_candidate: "goals",
  create_research_literature_item_from_web_source_candidate: "research_literature_items",
  create_research_citation_from_web_source_candidate: "research_citations",
  create_target_lab_from_web_source_candidate: "target_labs",
  create_target_professor_from_web_source_candidate: "target_professors",
};

const SUPPORTED_PROPOSED_ACTION_TARGETS = new Set<CurrentInfoSaveTarget>([
  "tasks",
  "goals",
  "proof_items",
]);

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function asText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const clean = value.trim();
  return clean.length > 0 ? clean : null;
}

function firstText(...values: unknown[]) {
  for (const value of values) {
    const clean = asText(value);

    if (clean) {
      return clean;
    }
  }

  return null;
}

function normalizeDestination(candidate: WebSourceCandidateRow): CurrentInfoSaveTarget {
  const explicitDestination = asText(candidate.suggested_destination_table);

  if (explicitDestination && isSaveTarget(explicitDestination)) {
    return explicitDestination;
  }

  return CANDIDATE_TYPE_TO_TARGET[candidate.candidate_type] ?? "unsupported_destination";
}

function isSaveTarget(value: string): value is CurrentInfoSaveTarget {
  return [
    "knowledge_items",
    "tasks",
    "goals",
    "proof_items",
    "research_literature_items",
    "research_citations",
    "target_labs",
    "target_professors",
    "unsupported_destination",
  ].includes(value);
}

function statusForCandidate(candidate: WebSourceCandidateRow): CurrentInfoReviewToSaveStatus {
  if (candidate.candidate_status === "blocked_by_private_mode") {
    return "blocked_by_private_mode";
  }

  if (candidate.candidate_status === "blocked_by_reliability") {
    return "blocked_by_reliability";
  }

  if (candidate.candidate_status === "blocked_by_duplicate") {
    return "blocked_by_duplicate";
  }

  if (["approved", "rejected", "archived"].includes(candidate.candidate_status)) {
    return "already_resolved";
  }

  if (candidate.missing_fields.length > 0) {
    return "needs_edit";
  }

  return "ready_for_confirmation";
}

function decisionForStatus(status: CurrentInfoReviewToSaveStatus): CurrentInfoReviewDecision {
  if (status === "ready_for_confirmation") {
    return "approve_for_save_preview";
  }

  if (status === "needs_edit") {
    return "request_edit_preview";
  }

  if (status === "already_resolved") {
    return "archive_candidate_preview";
  }

  if (status === "unsupported") {
    return "blocked_preview";
  }

  return "blocked_preview";
}

function collectWarnings(candidate: WebSourceCandidateRow) {
  return [
    ...new Set([
      ...candidate.reliability_warnings,
      ...candidate.freshness_warnings,
      ...candidate.privacy_warnings,
    ]),
  ];
}

function sourceForCandidate(
  candidate: WebSourceCandidateRow,
  sourcesById: Map<string, WebSourceRow>,
) {
  return candidate.source_id ? sourcesById.get(candidate.source_id) ?? null : null;
}

function titleForCandidate(candidate: WebSourceCandidateRow, source: WebSourceRow | null) {
  const payload = asRecord(candidate.extracted_payload);

  return firstText(
    payload.title,
    payload.name,
    source?.title,
    source?.domain,
    candidate.suggested_destination_table,
    candidate.candidate_type,
  ) ?? "Review current-info candidate";
}

function contentForCandidate(candidate: WebSourceCandidateRow, source: WebSourceRow | null) {
  const payload = asRecord(candidate.extracted_payload);

  return firstText(
    payload.content,
    payload.summary,
    payload.description,
    source?.summary,
    source?.description,
    source?.excerpt,
    source?.citation_label,
    source?.source_url,
  ) ?? "Current-info source preview requires review before saving.";
}

function domainForCandidate(candidate: WebSourceCandidateRow): ProposedActionDomain {
  if (candidate.candidate_type.includes("research")) {
    return "research";
  }

  if (candidate.candidate_type.includes("job")) {
    return "career";
  }

  return "general";
}

function proposedActionForCandidate(
  candidate: WebSourceCandidateRow,
  source: WebSourceRow | null,
  destination: CurrentInfoSaveTarget,
): ProposedActionContract | null {
  const payload = asRecord(candidate.extracted_payload);
  const title = titleForCandidate(candidate, source);
  const description = contentForCandidate(candidate, source);
  const evidence = source?.citation_url ?? source?.source_url ?? undefined;

  if (destination === "tasks") {
    return {
      action_type: "create_task",
      payload: {
        title,
        description,
        status: "todo",
        priority: "medium",
        domain: domainForCandidate(candidate),
      },
      source: "system",
      reason: "Current-info candidate is eligible for task proposal confirmation.",
      confidence: 0.7,
      evidence_refs: evidence ? [evidence] : [],
    };
  }

  if (destination === "goals") {
    return {
      action_type: "create_goal",
      payload: {
        title,
        description,
        domain: domainForCandidate(candidate),
        status: "not_started",
        priority: "medium",
      },
      source: "system",
      reason: "Current-info candidate is eligible for goal proposal confirmation.",
      confidence: 0.7,
      evidence_refs: evidence ? [evidence] : [],
    };
  }

  if (destination === "proof_items") {
    return {
      action_type: "create_proof_item",
      payload: {
        title,
        proof_type: "link",
        description,
        source_url: source?.citation_url ?? source?.source_url ?? undefined,
      },
      source: "system",
      reason: "Current-info candidate is eligible for proof proposal confirmation.",
      confidence: 0.7,
      evidence_refs: evidence ? [evidence] : [],
    };
  }

  void payload;
  return null;
}

function knowledgePreviewForCandidate(
  candidate: WebSourceCandidateRow,
  source: WebSourceRow | null,
  destination: CurrentInfoSaveTarget,
): CurrentInfoKnowledgeSavePreview | null {
  if (destination !== "knowledge_items" || !source) {
    return null;
  }

  const payload = asRecord(candidate.extracted_payload);

  return {
    title: titleForCandidate(candidate, source),
    content: contentForCandidate(candidate, source),
    knowledge_type: candidate.candidate_type.includes("research") ? "research_note" : "reference",
    source_kind: source.source_kind.includes("research") ? "research_record" : "external_reference",
    source_uri: source.citation_url ?? source.source_url,
    source_table: "web_sources",
    source_record_id: source.id,
    sensitivity: source.sensitive_category ? "high" : "medium",
    metadata: {
      candidate_id: candidate.id,
      source_kind: source.source_kind,
      reliability_label: source.reliability_label,
      freshness_label: source.freshness_label,
      duplicate_hints: candidate.duplicate_hints,
      extracted_payload: payload,
    },
  };
}

function eventTypeForStatus(
  status: CurrentInfoReviewToSaveStatus,
  destination: CurrentInfoSaveTarget,
): CurrentInfoReviewToSavePreview["auditPreview"]["event_type"] {
  if (status === "blocked_by_private_mode") {
    return "web_source_blocked_by_private_mode";
  }

  if (status === "blocked_by_reliability") {
    return "web_source_blocked_by_reliability";
  }

  if (status === "ready_for_confirmation" && destination !== "unsupported_destination") {
    return "web_source_candidate_approved";
  }

  return "web_source_candidate_rejected";
}

export function buildCurrentInfoReviewToSaveFlow(
  candidates: WebSourceCandidateRow[],
  sources: WebSourceRow[],
): CurrentInfoReviewToSaveFlowResult {
  const sourcesById = new Map(sources.map((source) => [source.id, source]));
  const previews = candidates.map((candidate) => {
    const source = sourceForCandidate(candidate, sourcesById);
    const destination = normalizeDestination(candidate);
    const baseStatus = statusForCandidate(candidate);
    const status =
      destination === "unsupported_destination" && baseStatus === "ready_for_confirmation"
        ? "unsupported"
        : baseStatus;
    const decision = decisionForStatus(status);
    const warnings = collectWarnings(candidate);
    const proposedActionPreview = proposedActionForCandidate(candidate, source, destination);
    const knowledgeSavePreview = knowledgePreviewForCandidate(candidate, source, destination);
    const canCreateProposedAction =
      status === "ready_for_confirmation" &&
      SUPPORTED_PROPOSED_ACTION_TARGETS.has(destination) &&
      proposedActionPreview !== null;

    return {
      candidateId: candidate.id,
      sourceId: candidate.source_id,
      title: titleForCandidate(candidate, source),
      destination,
      decision,
      status,
      candidateStatus: candidate.candidate_status,
      candidateType: candidate.candidate_type,
      suggestedActionType: candidate.suggested_action_type,
      reviewNotes: candidate.review_notes,
      missingFields: candidate.missing_fields,
      warnings,
      duplicateHints: candidate.duplicate_hints,
      canCreateProposedAction,
      proposedActionPreview,
      knowledgeSavePreview,
      citationPreview: {
        citation_label: source?.citation_label ?? source?.title ?? null,
        citation_url: source?.citation_url ?? source?.source_url ?? null,
        linked_table: destination,
        link_kind: "citation",
        link_status: "preview",
      },
      auditPreview: {
        event_type: eventTypeForStatus(status, destination),
        actor_type: "user",
        event_summary: `Review-to-save preview for ${titleForCandidate(candidate, source)}.`,
        event_payload: {
          candidate_id: candidate.id,
          source_id: candidate.source_id,
          destination,
          decision,
          status,
          can_create_proposed_action: canCreateProposedAction,
        },
      },
    } satisfies CurrentInfoReviewToSavePreview;
  });

  return {
    totalCandidates: previews.length,
    readyForConfirmationCount: previews.filter((preview) => preview.status === "ready_for_confirmation").length,
    needsEditCount: previews.filter((preview) => preview.status === "needs_edit").length,
    blockedCount: previews.filter((preview) => preview.status.startsWith("blocked_by")).length,
    unsupportedCount: previews.filter((preview) => preview.status === "unsupported").length,
    previews,
  };
}

export const PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_BOUNDARY =
  "Phase 16O creates review-to-save previews only. It does not update candidate_status, insert knowledge records, create ai_actions, link web sources, create audit events, or execute saves.";
