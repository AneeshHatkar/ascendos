import type { ChatMessageRow } from "@/types/database";
import { getAiProviderPublicStatus } from "./provider-boundary";

export type AthenaRuntimeMode =
  | "provider_disabled"
  | "provider_missing_key"
  | "provider_ready"
  | "provider_error"
  | "input_too_large";

export type AthenaRuntimeReply = {
  readonly mode: AthenaRuntimeMode;
  readonly content: string;
  readonly provider: "openai";
  readonly model: string | null;
  readonly writesPerformed: false;
  readonly automaticActionsPerformed: false;
  readonly hiddenMemoryInjected: false;
  readonly browserSecretsExposed: false;
  readonly contextSummary: {
    readonly recentMessageCount: number;
    readonly includedRoles: readonly string[];
    readonly excludedSignals: readonly string[];
    readonly approvedMemoryIds: readonly string[];
    readonly blockedMemoryIds: readonly string[];
    readonly memoryRetrievalExplanation: string;
  };
  readonly usage: {
    readonly estimatedInputTokens: number;
    readonly outputTokens: number | null;
  };
  readonly providerResponseId: string | null;
  readonly providerStatus: ReturnType<typeof getAiProviderPublicStatus>;
};

type OpenAiResponseEnvelope = {
  id?: unknown;
  output_text?: unknown;
  output?: unknown;
  error?: {
    message?: unknown;
  };
};

const ATHENA_SYSTEM_INSTRUCTIONS = [
  "You are Athena, the user-facing companion inside ascendOS.",
  "Be warm, direct, grounded, and action-oriented.",
  "Do not claim to have browsed, used tools, remembered private facts, or written records unless the runtime explicitly provides that capability.",
  "Do not execute actions. If the user wants an action, suggest a confirmation-first proposal path.",
  "Do not invent saved memories or hidden context.",
  "Use the visible conversation only. Mention uncertainty when context is missing.",
  "Keep responses concise unless the user asks for detail.",
].join("\n");

const DISABLED_REPLY =
  "Athena is online as a safe chat surface, but the OpenAI provider is not enabled yet. I saved your message and I can still help in a deterministic mode: summarize what you wrote, turn it into a pending task/goal/proof proposal, or help you decide what to do next. No provider call, hidden memory injection, or automatic write happened.";

const MISSING_KEY_REPLY =
  "Athena cannot call OpenAI yet because the provider is enabled but the server-side API key is missing. I saved your message and kept the runtime safe: no browser key exposure, no localStorage secret, no hidden memory injection, and no automatic action execution.";

const PROVIDER_ERROR_REPLY =
  "Athena tried to use the configured provider boundary, but the provider call failed safely. I saved your message, did not expose secrets, and did not perform any automatic writes or actions. Check the server provider configuration, limits, and logs before trying again.";

const INPUT_TOO_LARGE_REPLY =
  "Athena blocked this request before provider execution because the estimated input size is above the configured request guard. I saved your message, but no provider call or automatic action was performed.";

function estimateTokens(text: string) {
  return Math.ceil(text.length / 4);
}

function messageLabel(role: ChatMessageRow["role"]) {
  if (role === "assistant") {
    return "Athena";
  }

  if (role === "user") {
    return "User";
  }

  return role;
}

function buildVisibleConversation(messages: readonly ChatMessageRow[]) {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .slice(-12)
    .map((message) => `${messageLabel(message.role)}: ${message.content}`)
    .join("\n\n");
}

function extractOpenAiOutputText(payload: OpenAiResponseEnvelope) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  if (Array.isArray(payload.output)) {
    const parts: string[] = [];

    for (const item of payload.output) {
      if (!item || typeof item !== "object") {
        continue;
      }

      const content = "content" in item ? item.content : null;

      if (!Array.isArray(content)) {
        continue;
      }

      for (const contentItem of content) {
        if (!contentItem || typeof contentItem !== "object") {
          continue;
        }

        const text = "text" in contentItem ? contentItem.text : null;

        if (typeof text === "string" && text.trim()) {
          parts.push(text.trim());
        }
      }
    }

    if (parts.length > 0) {
      return parts.join("\n\n");
    }
  }

  return "";
}

async function callOpenAiResponsesApi({
  input,
  model,
  maxOutputTokens,
}: {
  input: string;
  model: string;
  maxOutputTokens: number;
}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is missing.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      instructions: ATHENA_SYSTEM_INSTRUCTIONS,
      input,
      max_output_tokens: maxOutputTokens,
      store: false,
    }),
  });

  const payload = (await response.json()) as OpenAiResponseEnvelope;

  if (!response.ok) {
    const message =
      typeof payload.error?.message === "string"
        ? payload.error.message
        : "OpenAI Responses API request failed.";
    throw new Error(message);
  }

  const outputText = extractOpenAiOutputText(payload);

  if (!outputText) {
    throw new Error("OpenAI response did not include output text.");
  }

  return {
    id: typeof payload.id === "string" ? payload.id : null,
    outputText,
  };
}

function createBaseReply({
  mode,
  content,
  recentMessages,
  outputTokens = null,
  providerResponseId = null,
  approvedMemoryIds = [],
  blockedMemoryIds = [],
  memoryRetrievalExplanation = "No approved long-term memory was included.",
}: {
  mode: AthenaRuntimeMode;
  content: string;
  recentMessages: readonly ChatMessageRow[];
  outputTokens?: number | null;
  providerResponseId?: string | null;
  approvedMemoryIds?: readonly string[];
  blockedMemoryIds?: readonly string[];
  memoryRetrievalExplanation?: string;
}): AthenaRuntimeReply {
  const providerStatus = getAiProviderPublicStatus();

  return {
    mode,
    content,
    provider: "openai",
    model: providerStatus.model,
    writesPerformed: false,
    automaticActionsPerformed: false,
    hiddenMemoryInjected: false,
    browserSecretsExposed: false,
    contextSummary: {
      recentMessageCount: recentMessages.length,
      includedRoles: [...new Set(recentMessages.map((message) => message.role))],
      excludedSignals: [
        "web/current-info browsing",
        "connector secrets",
        "voice audio",
        "private blocked data",
        "automatic tools",
        "unapproved memory candidates",
        "forgotten/restricted memory",
      ],
      approvedMemoryIds: [...approvedMemoryIds],
      blockedMemoryIds: [...blockedMemoryIds],
      memoryRetrievalExplanation,
    },
    usage: {
      estimatedInputTokens: estimateTokens(buildVisibleConversation(recentMessages)),
      outputTokens,
    },
    providerResponseId,
    providerStatus,
  };
}

export async function generateAthenaRuntimeReply({
  latestUserMessage,
  recentMessages,
  approvedMemoryContextText = "",
  approvedMemoryIds = [],
  blockedMemoryIds = [],
  memoryRetrievalExplanation = "No approved long-term memory was included.",
}: {
  latestUserMessage: string;
  recentMessages: readonly ChatMessageRow[];
  approvedMemoryContextText?: string;
  approvedMemoryIds?: readonly string[];
  blockedMemoryIds?: readonly string[];
  memoryRetrievalExplanation?: string;
}): Promise<AthenaRuntimeReply> {
  const providerStatus = getAiProviderPublicStatus();
  const visibleConversation = buildVisibleConversation(recentMessages);
  const input = [
    "Visible ascendOS conversation context:",
    visibleConversation || "No previous visible messages.",
    "",
    "Approved long-term memory context visible to the user:",
    approvedMemoryContextText || "No approved long-term memory included.",
    "",
    "Memory retrieval transparency:",
    memoryRetrievalExplanation,
    "",
    "Latest user message:",
    latestUserMessage,
  ].join("\n");

  const estimatedInputTokens = estimateTokens(input);

  if (estimatedInputTokens > providerStatus.costGuard.requestTokenLimit) {
    return {
      ...createBaseReply({
        mode: "input_too_large",
        content: INPUT_TOO_LARGE_REPLY,
        recentMessages,
      }),
      usage: {
        estimatedInputTokens,
        outputTokens: estimateTokens(INPUT_TOO_LARGE_REPLY),
      },
    };
  }

  if (providerStatus.status === "disabled") {
    return createBaseReply({
      mode: "provider_disabled",
      content: DISABLED_REPLY,
      recentMessages,
      outputTokens: estimateTokens(DISABLED_REPLY),
      approvedMemoryIds,
      blockedMemoryIds,
      memoryRetrievalExplanation,
    });
  }

  if (providerStatus.status === "missing_api_key") {
    return createBaseReply({
      mode: "provider_missing_key",
      content: MISSING_KEY_REPLY,
      recentMessages,
      outputTokens: estimateTokens(MISSING_KEY_REPLY),
      approvedMemoryIds,
      blockedMemoryIds,
      memoryRetrievalExplanation,
    });
  }

  if (providerStatus.status !== "ready" || !providerStatus.model) {
    return createBaseReply({
      mode: "provider_error",
      content: PROVIDER_ERROR_REPLY,
      recentMessages,
      outputTokens: estimateTokens(PROVIDER_ERROR_REPLY),
      approvedMemoryIds,
      blockedMemoryIds,
      memoryRetrievalExplanation,
    });
  }

  try {
    const result = await callOpenAiResponsesApi({
      input,
      model: providerStatus.model,
      maxOutputTokens: Math.min(900, providerStatus.costGuard.requestTokenLimit),
    });

    return createBaseReply({
      mode: "provider_ready",
      content: result.outputText,
      recentMessages,
      outputTokens: estimateTokens(result.outputText),
      providerResponseId: result.id,
      approvedMemoryIds,
      blockedMemoryIds,
      memoryRetrievalExplanation,
    });
  } catch {
    return createBaseReply({
      mode: "provider_error",
      content: PROVIDER_ERROR_REPLY,
      recentMessages,
      outputTokens: estimateTokens(PROVIDER_ERROR_REPLY),
      approvedMemoryIds,
      blockedMemoryIds,
      memoryRetrievalExplanation,
    });
  }
}
