import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

type SaveCarnosMessageBody = {
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
    return compact || "Carnos session";
  }

  return `${compact.slice(0, 72)}…`;
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Authentication is required to save a Carnos message." },
      { status: 401 },
    );
  }

  let body: SaveCarnosMessageBody;

  try {
    body = (await request.json()) as SaveCarnosMessageBody;
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
      { error: "Message content is too long for the current persistence boundary." },
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
      .maybeSingle();

    if (sessionReadError) {
      return NextResponse.json(
        { error: "Could not verify the requested Carnos session." },
        { status: 500 },
      );
    }

    if (!existingSession) {
      return NextResponse.json(
        { error: "Requested Carnos session was not found for this user." },
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
        summary: "User-created Carnos persistence session. No AI response was generated.",
        metadata: {
          source: "carnos_message_persistence",
          phase: "12.9D",
          generation_enabled: false,
        },
      })
      .select("id")
      .single();

    if (sessionCreateError || !newSession) {
      return NextResponse.json(
        { error: "Could not create a Carnos chat session." },
        { status: 500 },
      );
    }

    sessionId = newSession.id;
  }

  const { data: message, error: messageCreateError } = await supabase
    .from("chat_messages")
    .insert({
      user_id: user.id,
      session_id: sessionId,
      role: "user",
      content,
      content_format: "text",
      metadata: {
        source: "carnos_message_persistence",
        phase: "12.9D",
        generation_enabled: false,
      },
    })
    .select("id, session_id, role, created_at")
    .single();

  if (messageCreateError || !message) {
    return NextResponse.json(
      { error: "Could not save the Carnos message." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    session_id: message.session_id,
    message_id: message.id,
    role: message.role,
    created_at: message.created_at,
    generation_enabled: false,
  });
}
