/**
 * Phase 16C — Current-Info Types, Enums, and Validators
 *
 * Pure TypeScript contracts for current-information source handling.
 */

import type {
  CurrentInfoAuditEventType,
  CurrentInfoBlockedReason,
  CurrentInfoCandidateStatus,
  CurrentInfoDestinationSuggestion,
  CurrentInfoFreshnessLabel,
  CurrentInfoQueryKind,
  CurrentInfoReliabilityLabel,
  CurrentInfoSourceKind,
} from "./current-info-enums";

export interface CurrentInfoCitationContract {
  readonly title: string;
  readonly url: string;
  readonly display_url?: string;
  readonly publisher?: string;
  readonly author?: string;
  readonly published_at?: string;
  readonly retrieved_at?: string;
  readonly quoted_text?: string;
  readonly citation_note?: string;
}

export interface CurrentInfoQueryContract {
  readonly query_text: string;
  readonly query_kind: CurrentInfoQueryKind;
  readonly user_intent?: string;
  readonly private_mode: boolean;
  readonly retain_query: boolean;
  readonly blocked_reasons: CurrentInfoBlockedReason[];
}

export interface CurrentInfoSourceContract {
  readonly source_kind: CurrentInfoSourceKind;
  readonly reliability_label: CurrentInfoReliabilityLabel;
  readonly freshness_label: CurrentInfoFreshnessLabel;
  readonly citation: CurrentInfoCitationContract;
  readonly summary?: string;
  readonly extracted_fields?: Record<string, string | number | boolean | null>;
  readonly duplicate_hints: string[];
  readonly staleness_warnings: string[];
  readonly privacy_warnings: string[];
}

export interface CurrentInfoCandidateContract {
  readonly status: CurrentInfoCandidateStatus;
  readonly source: CurrentInfoSourceContract;
  readonly suggested_destination?: CurrentInfoDestinationSuggestion;
  readonly suggested_title?: string;
  readonly suggested_payload?: Record<string, string | number | boolean | null>;
  readonly blocked_reasons: CurrentInfoBlockedReason[];
  readonly requires_user_review: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
}

export interface CurrentInfoReviewDecisionContract {
  readonly candidate_id?: string;
  readonly decision: "needs_review" | "approved_for_later_save" | "rejected";
  readonly reviewed_by_user: boolean;
  readonly review_note?: string;
}

export interface CurrentInfoAuditEventContract {
  readonly event_type: CurrentInfoAuditEventType;
  readonly source_url?: string;
  readonly candidate_status?: CurrentInfoCandidateStatus;
  readonly blocked_reasons: CurrentInfoBlockedReason[];
  readonly visible_to_user: true;
}

export interface CurrentInfoValidationResult {
  readonly valid: boolean;
  readonly errors: string[];
  readonly warnings: string[];
}

export interface CurrentInfoSafetyGateResult {
  readonly allowed: boolean;
  readonly blocked_reasons: CurrentInfoBlockedReason[];
  readonly warnings: string[];
  readonly requires_primary_or_official_source: boolean;
  readonly requires_user_review: true;
}

export const DEFAULT_CURRENT_INFO_QUERY_CONTRACT: CurrentInfoQueryContract = {
  query_text: "",
  query_kind: "documentation_lookup",
  private_mode: false,
  retain_query: true,
  blocked_reasons: [],
};

export const DEFAULT_CURRENT_INFO_CITATION_CONTRACT: CurrentInfoCitationContract = {
  title: "",
  url: "",
};

export const DEFAULT_CURRENT_INFO_SOURCE_CONTRACT: CurrentInfoSourceContract = {
  source_kind: "unknown",
  reliability_label: "unknown",
  freshness_label: "unknown",
  citation: DEFAULT_CURRENT_INFO_CITATION_CONTRACT,
  duplicate_hints: [],
  staleness_warnings: [],
  privacy_warnings: [],
};

export const DEFAULT_CURRENT_INFO_CANDIDATE_CONTRACT: CurrentInfoCandidateContract = {
  status: "candidate",
  source: DEFAULT_CURRENT_INFO_SOURCE_CONTRACT,
  blocked_reasons: [],
  requires_user_review: true,
  can_autosave: false,
  can_auto_memory_convert: false,
};

export const PHASE_16C_CURRENT_INFO_CONTRACT_BOUNDARY = {
  phase: "Phase 16C",
  summary:
    "Current-info contracts describe reviewable internet source objects without provider calls, persistence, memory conversion, or hidden retrieval.",
  safe_flow:
    "search result → citation → reliability/freshness labels → candidate → review required → later safe save flow",
  can_autosave: false,
  can_auto_memory_convert: false,
  requires_user_review: true,
} as const;
