import { NextResponse } from "next/server";

import { createProposedAction } from "@/lib/actions/create-proposed-action";
import { validateProposedAction } from "@/lib/actions/validate-proposed-action";
import { requireCurrentUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

type AthenaSaveCardBody = {
  proposed_action?: unknown;
  source_chat_session_id?: unknown;
  source_chat_message_id?: unknown;
  source_text?: unknown;
};

function textOrUndefined(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

async function verifyChatSession(input: {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  userId: string;
  sessionId?: string;
}) {
  if (!input.sessionId) {
    return true;
  }

  const { data, error } = await input.supabase
    .from("chat_sessions")
    .select("id")
    .eq("id", input.sessionId)
    .eq("user_id", input.userId)
    .neq("status", "deleted")
    .maybeSingle();

  return !error && Boolean(data?.id);
}

async function verifyChatMessage(input: {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  userId: string;
  sessionId?: string;
  messageId?: string;
}) {
  if (!input.messageId) {
    return true;
  }

  let query = input.supabase
    .from("chat_messages")
    .select("id")
    .eq("id", input.messageId)
    .eq("user_id", input.userId);

  if (input.sessionId) {
    query = query.eq("session_id", input.sessionId);
  }

  const { data, error } = await query.maybeSingle();

  return !error && Boolean(data?.id);
}

export async function POST(request: Request) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();

  let body: AthenaSaveCardBody;

  try {
    body = (await request.json()) as AthenaSaveCardBody;
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Request body must be valid JSON.",
      },
      { status: 400 },
    );
  }

  const sourceChatSessionId = textOrUndefined(body.source_chat_session_id);
  const sourceChatMessageId = textOrUndefined(body.source_chat_message_id);
  const sourceText = textOrUndefined(body.source_text);

  const validation = validateProposedAction(body.proposed_action);

  if (validation.status === "error") {
    return NextResponse.json(
      {
        status: "error",
        message: validation.message,
        issues: validation.issues ?? [],
        requires_confirmation: true,
        writes_performed: false,
      },
      { status: 400 },
    );
  }

  const sessionAllowed = await verifyChatSession({
    supabase,
    userId: user.id,
    sessionId: sourceChatSessionId,
  });

  if (!sessionAllowed) {
    return NextResponse.json(
      {
        status: "error",
        message: "Source Athena chat session was not found for this user.",
        requires_confirmation: true,
        writes_performed: false,
      },
      { status: 404 },
    );
  }

  const messageAllowed = await verifyChatMessage({
    supabase,
    userId: user.id,
    sessionId: sourceChatSessionId,
    messageId: sourceChatMessageId,
  });

  if (!messageAllowed) {
    return NextResponse.json(
      {
        status: "error",
        message: "Source Athena chat message was not found for this user.",
        requires_confirmation: true,
        writes_performed: false,
      },
      { status: 404 },
    );
  }

  const result = await createProposedAction({
    supabase,
    user_id: user.id,
    proposed_action: validation.data,
    source_chat_session_id: sourceChatSessionId,
    source_chat_message_id: sourceChatMessageId,
    source_context: {
      phase: "21F",
      surface: "athena_chat",
      source: "athena_safe_card",
      source_text: sourceText ?? null,
      route: "/api/athena/save-cards",
      requires_confirmation: true,
      direct_write: false,
      edit_before_confirm: true,
      cancel_supported: true,
      assistant_display_name: "Athena",
    } satisfies Json,
  });

  if (result.status === "error") {
    return NextResponse.json(
      {
        ...result,
        requires_confirmation: true,
        writes_performed: false,
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      status: "success",
      message:
        "Athena safe card created as a pending update. Review/approve it before any dashboard record is written.",
      data: result.data,
      requires_confirmation: true,
      writes_performed: false,
      direct_write: false,
    },
    { status: 201 },
  );
}
