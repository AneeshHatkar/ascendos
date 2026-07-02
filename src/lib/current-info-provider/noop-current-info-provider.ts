import type { CurrentInfoProviderBoundaryInput } from "./provider-boundary";
import { evaluateCurrentInfoProviderBoundary } from "./provider-boundary";
import type { CurrentInfoProviderResult } from "./current-info-provider-types";

/**
 * Phase 16D noop current-info provider.
 *
 * This provider intentionally returns a blocked boundary result.
 * It exists so future real providers can plug into a safe interface later.
 */

export type NoopCurrentInfoProvider = {
  readonly provider_kind: "noop";
  readonly search: (
    input: CurrentInfoProviderBoundaryInput,
  ) => Promise<CurrentInfoProviderResult>;
};

export const noopCurrentInfoProvider: NoopCurrentInfoProvider = {
  provider_kind: "noop",
  async search(input) {
    return evaluateCurrentInfoProviderBoundary(input);
  },
};

export async function searchWithNoopCurrentInfoProvider(
  input: CurrentInfoProviderBoundaryInput,
): Promise<CurrentInfoProviderResult> {
  return noopCurrentInfoProvider.search(input);
}
