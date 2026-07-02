import type {
  CurrentInfoCitationContract,
  CurrentInfoQueryContract,
  CurrentInfoSourceContract,
  CurrentInfoValidationResult,
} from "../current-info-contracts";

/**
 * Phase 16D — Search Provider Boundary + Noop Provider
 *
 * Contract-only provider surface for current information.
 *
 * Boundary:
 * - No real provider activation.
 * - No network calls.
 * - No browser-side secrets.
 * - No background browsing.
 * - No source persistence.
 * - No automatic memory conversion.
 */

export type CurrentInfoProviderKind = "noop";

export type CurrentInfoProviderStatus =
  | "disabled"
  | "blocked_by_boundary"
  | "ready_for_future_activation";

export type CurrentInfoProviderBlockedReason =
  | "provider_boundary_not_active"
  | "browser_side_secrets_forbidden"
  | "background_browsing_forbidden"
  | "private_mode_blocks_query_retention"
  | "high_stakes_topic_requires_extra_review"
  | "raw_full_page_storage_deferred";

export type CurrentInfoProviderRequest = {
  readonly query: CurrentInfoQueryContract;
  readonly requested_at_iso: string;
  readonly provider_kind: CurrentInfoProviderKind;
  readonly retain_query: boolean;
  readonly private_mode_active: boolean;
  readonly allow_network_provider: false;
  readonly allow_browser_side_secret: false;
  readonly allow_background_browsing: false;
};

export type CurrentInfoProviderSourcePreview = {
  readonly source: CurrentInfoSourceContract;
  readonly citations: readonly CurrentInfoCitationContract[];
  readonly validation: CurrentInfoValidationResult;
  readonly extraction_preview: string;
  readonly requires_user_review: true;
  readonly can_autosave: false;
  readonly can_auto_memory_convert: false;
};

export type CurrentInfoProviderResult = {
  readonly provider_kind: CurrentInfoProviderKind;
  readonly status: CurrentInfoProviderStatus;
  readonly query: CurrentInfoQueryContract;
  readonly sources: readonly CurrentInfoProviderSourcePreview[];
  readonly blocked_reasons: readonly CurrentInfoProviderBlockedReason[];
  readonly provider_notes: readonly string[];
  readonly boundary: CurrentInfoProviderBoundary;
};

export type CurrentInfoProviderBoundary = {
  readonly label: "PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER";
  readonly real_provider_active: false;
  readonly network_calls_allowed: false;
  readonly browser_side_secrets_allowed: false;
  readonly background_browsing_allowed: false;
  readonly search_on_page_load_allowed: false;
  readonly source_persistence_allowed: false;
  readonly automatic_memory_conversion_allowed: false;
  readonly automatic_record_write_allowed: false;
};

export const PHASE_16D_CURRENT_INFO_PROVIDER_BOUNDARY: CurrentInfoProviderBoundary = {
  label: "PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER",
  real_provider_active: false,
  network_calls_allowed: false,
  browser_side_secrets_allowed: false,
  background_browsing_allowed: false,
  search_on_page_load_allowed: false,
  source_persistence_allowed: false,
  automatic_memory_conversion_allowed: false,
  automatic_record_write_allowed: false,
};
