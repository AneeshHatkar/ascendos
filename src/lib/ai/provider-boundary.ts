export type AiProviderKind = "openai";
export type AiProviderRuntimeStatus =
  | "disabled"
  | "missing_api_key"
  | "ready"
  | "misconfigured";

export type AiProviderCapability =
  | "chat"
  | "structured_extraction"
  | "tool_planning"
  | "voice_transcript_review";

export type AiProviderCostGuard = {
  readonly requestTokenLimit: number;
  readonly dailyTokenBudget: number;
  readonly monthlySpendLimitUsd: number | null;
  readonly hardStopOnBudgetExceeded: boolean;
};

export type AiProviderSafetyBoundary = {
  readonly serverSideOnly: true;
  readonly browserSideSecretsAllowed: false;
  readonly localStorageSecretsAllowed: false;
  readonly indexedDbSecretsAllowed: false;
  readonly logSecretsAllowed: false;
  readonly directWritesAllowed: false;
  readonly confirmationRequiredForWrites: true;
  readonly automaticToolExecutionAllowed: false;
};

export type AiProviderPublicStatus = {
  readonly provider: AiProviderKind;
  readonly enabled: boolean;
  readonly status: AiProviderRuntimeStatus;
  readonly model: string | null;
  readonly capabilities: readonly AiProviderCapability[];
  readonly disabledReason: string | null;
  readonly configuredEnv: {
    readonly enabledFlagPresent: boolean;
    readonly apiKeyPresent: boolean;
    readonly modelPresent: boolean;
    readonly requestTokenLimitPresent: boolean;
    readonly dailyTokenBudgetPresent: boolean;
    readonly monthlySpendLimitPresent: boolean;
  };
  readonly costGuard: AiProviderCostGuard;
  readonly safetyBoundary: AiProviderSafetyBoundary;
  readonly writesPerformed: false;
  readonly secretValuesExposed: false;
};

const DEFAULT_OPENAI_MODEL = "gpt-4.1-mini";
const DEFAULT_REQUEST_TOKEN_LIMIT = 4_000;
const DEFAULT_DAILY_TOKEN_BUDGET = 50_000;

const SAFETY_BOUNDARY: AiProviderSafetyBoundary = {
  serverSideOnly: true,
  browserSideSecretsAllowed: false,
  localStorageSecretsAllowed: false,
  indexedDbSecretsAllowed: false,
  logSecretsAllowed: false,
  directWritesAllowed: false,
  confirmationRequiredForWrites: true,
  automaticToolExecutionAllowed: false,
};

function readBooleanEnv(value: string | undefined) {
  return value === "true" || value === "1";
}

function readPositiveIntegerEnv(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function readOptionalPositiveNumberEnv(value: string | undefined) {
  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function hasNonEmptyEnv(value: string | undefined) {
  return Boolean(value && value.trim().length > 0);
}

export function getAiProviderPublicStatus(): AiProviderPublicStatus {
  const enabled = readBooleanEnv(process.env.OPENAI_PROVIDER_ENABLED);
  const apiKeyPresent = hasNonEmptyEnv(process.env.OPENAI_API_KEY);
  const configuredModel = process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;

  const requestTokenLimit = readPositiveIntegerEnv(
    process.env.ATHENA_REQUEST_TOKEN_LIMIT,
    DEFAULT_REQUEST_TOKEN_LIMIT,
  );
  const dailyTokenBudget = readPositiveIntegerEnv(
    process.env.ATHENA_DAILY_TOKEN_BUDGET,
    DEFAULT_DAILY_TOKEN_BUDGET,
  );
  const monthlySpendLimitUsd = readOptionalPositiveNumberEnv(
    process.env.ATHENA_MONTHLY_SPEND_LIMIT_USD,
  );

  let status: AiProviderRuntimeStatus = "disabled";
  let disabledReason: string | null =
    "OpenAI provider is disabled until OPENAI_PROVIDER_ENABLED=true is set on the server.";

  if (enabled && !apiKeyPresent) {
    status = "missing_api_key";
    disabledReason =
      "OpenAI provider is enabled but OPENAI_API_KEY is missing on the server.";
  }

  if (enabled && apiKeyPresent) {
    status = "ready";
    disabledReason = null;
  }

  if (enabled && (!configuredModel || requestTokenLimit <= 0 || dailyTokenBudget <= 0)) {
    status = "misconfigured";
    disabledReason =
      "OpenAI provider configuration is invalid. Check model and cost guard environment variables.";
  }

  return {
    provider: "openai",
    enabled,
    status,
    model: enabled ? configuredModel : null,
    capabilities:
      status === "ready"
        ? ["chat", "structured_extraction", "tool_planning", "voice_transcript_review"]
        : [],
    disabledReason,
    configuredEnv: {
      enabledFlagPresent: hasNonEmptyEnv(process.env.OPENAI_PROVIDER_ENABLED),
      apiKeyPresent,
      modelPresent: hasNonEmptyEnv(process.env.OPENAI_MODEL),
      requestTokenLimitPresent: hasNonEmptyEnv(process.env.ATHENA_REQUEST_TOKEN_LIMIT),
      dailyTokenBudgetPresent: hasNonEmptyEnv(process.env.ATHENA_DAILY_TOKEN_BUDGET),
      monthlySpendLimitPresent: hasNonEmptyEnv(process.env.ATHENA_MONTHLY_SPEND_LIMIT_USD),
    },
    costGuard: {
      requestTokenLimit,
      dailyTokenBudget,
      monthlySpendLimitUsd,
      hardStopOnBudgetExceeded: true,
    },
    safetyBoundary: SAFETY_BOUNDARY,
    writesPerformed: false,
    secretValuesExposed: false,
  };
}

export function assertAiProviderReady() {
  const status = getAiProviderPublicStatus();

  if (status.status !== "ready") {
    throw new Error(status.disabledReason ?? "AI provider is not ready.");
  }

  return status;
}
