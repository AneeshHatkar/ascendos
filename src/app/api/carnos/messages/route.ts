import { NextResponse } from "next/server";

import { buildAthenaApprovedMemoryContext, generateAthenaRuntimeReply } from "@/lib/ai";
import { requireCurrentUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SaveAthenaMessageBody = {
  content?: unknown;
  sessionId?: unknown;
};

function normalizeContent(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normalizeSessionId(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function titleFromContent(content: string) {
  const compact = content.replace(/\s+/g, " ").trim();

  if (compact.length <= 72) {
    return compact || "Athena session";
  }

  return `${compact.slice(0, 72)}…`;
}

export async function POST(request: Request) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();

  let body: SaveAthenaMessageBody;

  try {
    body = (await request.json()) as SaveAthenaMessageBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const content = normalizeContent(body.content);
  const providedSessionId = normalizeSessionId(body.sessionId);

  if (content.length === 0) {
    return NextResponse.json(
      { error: "Message content is required." },
      { status: 400 },
    );
  }

  if (content.length > 8000) {
    return NextResponse.json(
      { error: "Message content is too long for the Athena runtime boundary." },
      { status: 400 },
    );
  }

  let sessionId = providedSessionId;

  if (sessionId) {
    const { data: existingSession, error: sessionReadError } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .neq("status", "deleted")
      .maybeSingle();

    if (sessionReadError) {
      return NextResponse.json(
        { error: "Could not verify the requested Athena session." },
        { status: 500 },
      );
    }

    if (!existingSession) {
      return NextResponse.json(
        { error: "Requested Athena session was not found for this user." },
        { status: 404 },
      );
    }
  } else {
    const { data: newSession, error: sessionCreateError } = await supabase
      .from("chat_sessions")
      .insert({
        user_id: user.id,
        title: titleFromContent(content),
        status: "active",
        summary:
          "Athena chat session. User and assistant messages are persisted separately from approved memory and dashboard records.",
        metadata: {
          source: "athena_chat_runtime",
          legacy_route: "/api/carnos/messages",
          phase: "21E",
          generation_enabled: true,
          writes_require_confirmation: true,
        },
      })
      .select("id")
      .single();

    if (sessionCreateError || !newSession) {
      return NextResponse.json(
        { error: "Could not create an Athena chat session." },
        { status: 500 },
      );
    }

    sessionId = newSession.id;
  }

  const { data: userMessage, error: userMessageCreateError } = await supabase
    .from("chat_messages")
    .insert({
      user_id: user.id,
      session_id: sessionId,
      role: "user",
      content,
      content_format: "text",
      metadata: {
        source: "athena_chat_runtime",
        phase: "21E",
        assistant_display_name: "Athena",
        writes_performed: false,
      },
    })
    .select("*")
    .single();

  if (userMessageCreateError || !userMessage) {
    return NextResponse.json(
      { error: "Could not save the Athena user message." },
      { status: 500 },
    );
  }

  const { data: recentMessages, error: recentMessagesError } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("user_id", user.id)
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(16);

  if (recentMessagesError) {
    return NextResponse.json(
      { error: "Could not load Athena conversation context." },
      { status: 500 },
    );
  }

  const memoryContext = await buildAthenaApprovedMemoryContext({
    supabase,
    user_id: user.id,
    query: content,
    source_chat_session_id: sessionId,
  });

  const athenaReply = await generateAthenaRuntimeReply({
    latestUserMessage: content,
    recentMessages: recentMessages ?? [userMessage],
    approvedMemoryContextText: memoryContext.contextText,
    approvedMemoryIds: memoryContext.retrievedMemoryIds,
    blockedMemoryIds: memoryContext.blockedMemoryIds,
    memoryRetrievalExplanation: memoryContext.explanation,
  });

  const assistantMetadata = {
    source: "athena_chat_runtime",
    phase: "21E",
    assistant_display_name: "Athena",
    runtime_mode: athenaReply.mode,
    provider: athenaReply.provider,
    model: athenaReply.model,
    provider_response_id: athenaReply.providerResponseId,
    provider_status: athenaReply.providerStatus.status,
    writes_performed: athenaReply.writesPerformed,
    automatic_actions_performed: athenaReply.automaticActionsPerformed,
    hidden_memory_injected: athenaReply.hiddenMemoryInjected,
    browser_secrets_exposed: athenaReply.browserSecretsExposed,
    context_summary: {
      recentMessageCount: athenaReply.contextSummary.recentMessageCount,
      includedRoles: [...athenaReply.contextSummary.includedRoles],
      excludedSignals: [...athenaReply.contextSummary.excludedSignals],
      approvedMemoryIds: [...athenaReply.contextSummary.approvedMemoryIds],
      blockedMemoryIds: [...athenaReply.contextSummary.blockedMemoryIds],
      memoryRetrievalExplanation: athenaReply.contextSummary.memoryRetrievalExplanation,
    },
    usage: {
      estimatedInputTokens: athenaReply.usage.estimatedInputTokens,
      outputTokens: athenaReply.usage.outputTokens,
    },
  };

  const { data: assistantMessage, error: assistantMessageCreateError } =
    await supabase
      .from("chat_messages")
      .insert({
        user_id: user.id,
        session_id: sessionId,
        role: "assistant",
        content: athenaReply.content,
        content_format: "markdown",
        token_count: athenaReply.usage.outputTokens,
        metadata: assistantMetadata,
      })
      .select("*")
      .single();

  if (assistantMessageCreateError || !assistantMessage) {
    return NextResponse.json(
      { error: "Could not save the Athena assistant message." },
      { status: 500 },
    );
  }

  await supabase
    .from("chat_sessions")
    .update({
      summary:
        "Athena chat session. Messages are persisted; memory, dashboard writes, tools, and actions remain confirmation-gated.",
      metadata: {
        source: "athena_chat_runtime",
        legacy_route: "/api/carnos/messages",
        phase: "21E",
        last_runtime_mode: athenaReply.mode,
        last_provider_status: athenaReply.providerStatus.status,
        writes_require_confirmation: true,
        hidden_memory_injected: false,
        automatic_actions_performed: false,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", sessionId)
    .eq("user_id", user.id);

  return NextResponse.json({
    ok: true,
    session_id: sessionId,
    user_message: userMessage,
    assistant_message: assistantMessage,
    athena: {
      runtime_mode: athenaReply.mode,
      provider_status: athenaReply.providerStatus,
      context_summary: athenaReply.contextSummary,
      memory_context: {
        retrieved_memory_ids: memoryContext.retrievedMemoryIds,
        blocked_memory_ids: memoryContext.blockedMemoryIds,
        retrieval_explanation: memoryContext.explanation,
        result_count: memoryContext.resultCount,
      },
      writes_performed: athenaReply.writesPerformed,
      automatic_actions_performed: athenaReply.automaticActionsPerformed,
      hidden_memory_injected: athenaReply.hiddenMemoryInjected,
      browser_secrets_exposed: athenaReply.browserSecretsExposed,
    },
    generation_enabled: athenaReply.mode === "provider_ready",
  });
}
