"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ChatMessageRow, ChatSessionRow } from "@/types/database";
import type { AiProviderPublicStatus } from "@/lib/ai";

type AthenaChatPanelProps = {
  readonly initialSessions: ChatSessionRow[];
  readonly initialMessages: ChatMessageRow[];
  readonly initialActiveSessionId: string | null;
  readonly providerStatus: AiProviderPublicStatus;
};

type SaveState =
  | { status: "idle"; message: string }
  | { status: "sending"; message: string }
  | { status: "saved"; message: string }
  | { status: "error"; message: string };

type AthenaMessageResponse = {
  ok?: boolean;
  error?: string;
  session_id?: string;
  user_message?: ChatMessageRow;
  assistant_message?: ChatMessageRow;
  athena?: {
    runtime_mode?: string;
    writes_performed?: boolean;
    automatic_actions_performed?: boolean;
    hidden_memory_injected?: boolean;
    browser_secrets_exposed?: boolean;
  };
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function roleLabel(role: ChatMessageRow["role"]) {
  if (role === "assistant") {
    return "Athena";
  }

  if (role === "user") {
    return "You";
  }

  return role;
}

function runtimeBadge(status: AiProviderPublicStatus["status"]) {
  if (status === "ready") {
    return "Provider ready";
  }

  if (status === "missing_api_key") {
    return "Missing server key";
  }

  if (status === "misconfigured") {
    return "Provider misconfigured";
  }

  return "Provider disabled";
}

export function AthenaChatPanel({
  initialSessions,
  initialMessages,
  initialActiveSessionId,
  providerStatus,
}: AthenaChatPanelProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    initialActiveSessionId,
  );
  const [messages, setMessages] = useState<ChatMessageRow[]>(initialMessages);
  const [state, setState] = useState<SaveState>({
    status: "idle",
    message:
      "Send a message to Athena. Messages persist to chat history. Writes, memory, tools, and actions remain confirmation-gated.",
  });

  const orderedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      ),
    [messages],
  );

  async function sendMessage() {
    const trimmed = content.trim();

    if (!trimmed) {
      setState({
        status: "error",
        message: "Write a message before sending.",
      });
      return;
    }

    setState({
      status: "sending",
      message: "Sending to Athena through the server-owned runtime boundary…",
    });

    try {
      const response = await fetch("/api/carnos/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: trimmed,
          sessionId: activeSessionId ?? undefined,
        }),
      });

      const result = (await response.json()) as AthenaMessageResponse;

      if (!response.ok || !result.ok || !result.user_message || !result.assistant_message) {
        throw new Error(result.error ?? "Athena message failed.");
      }

      setActiveSessionId(result.session_id ?? result.user_message.session_id);
      setMessages((current) => [
        ...current,
        result.user_message as ChatMessageRow,
        result.assistant_message as ChatMessageRow,
      ]);
      setContent("");
      setState({
        status: "saved",
        message: `Athena replied in ${result.athena?.runtime_mode ?? "safe"} mode. No hidden writes, tools, or memory injection occurred.`,
      });
      router.refresh();
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Athena message failed.",
      });
    }
  }

  const disabled = state.status === "sending";

  return (
    <section className="rounded-[2rem] border border-cyan-300/20 bg-slate-950/85 p-5 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/75">
            Athena runtime
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Persistent companion chat
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Athena now saves user and assistant messages in chat history. Provider
            calls run only on the server when configured. Memory, dashboard writes,
            tools, browsing, and voice remain explicit future/confirmation-gated boundaries.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300">
          <p className="font-medium text-white">{runtimeBadge(providerStatus.status)}</p>
          <p className="mt-1 text-xs text-slate-500">
            Model: {providerStatus.model ?? "not active"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Sessions
          </p>
          <div className="mt-4 space-y-2">
            {initialSessions.length > 0 ? (
              initialSessions.slice(0, 8).map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => {
                    setActiveSessionId(session.id);
                    setState({
                      status: "idle",
                      message:
                        "Selected session. Refresh or open full session routing later to load older transcript slices.",
                    });
                  }}
                  className={
                    session.id === activeSessionId
                      ? "w-full rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-left text-sm text-cyan-100"
                      : "w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-slate-300 hover:bg-white/[0.06]"
                  }
                >
                  <span className="line-clamp-2 font-medium">
                    {session.title ?? "Athena session"}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {formatDate(session.updated_at)}
                  </span>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                No sessions yet. Send a message to create one.
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveSessionId(null);
              setMessages([]);
              setContent("");
              setState({
                status: "idle",
                message: "New Athena session draft ready.",
              });
            }}
            className="mt-4 w-full rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
          >
            New session
          </button>
        </aside>

        <div className="flex min-h-[520px] flex-col rounded-3xl border border-white/10 bg-black/20">
          <div className="border-b border-white/10 p-4">
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                persisted chat history
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                no hidden memory injection
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                no automatic writes/actions
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                server-only provider
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {orderedMessages.length > 0 ? (
              orderedMessages.map((message) => (
                <article
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-3xl rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4"
                      : "mr-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.045] p-4"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">
                      {roleLabel(message.role)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {message.content}
                  </p>
                </article>
              ))
            ) : (
              <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 p-8 text-center text-sm leading-6 text-slate-500">
                Start a conversation with Athena. The first message creates a session
                and stores both your message and Athena&apos;s safe reply.
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
              placeholder="Ask Athena what to plan, clarify, convert into a proposal, or think through..."
              maxLength={8000}
            />

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p
                className={
                  state.status === "error"
                    ? "text-sm text-red-300"
                    : state.status === "saved"
                      ? "text-sm text-emerald-300"
                      : "text-sm text-slate-400"
                }
              >
                {state.message}
              </p>

              <button
                type="button"
                onClick={sendMessage}
                disabled={disabled}
                className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {disabled ? "Sending…" : "Send to Athena"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-4 text-sm leading-6 text-amber-100/80">
        Runtime truth: Athena chat persistence is active. Direct dashboard writes,
        approved-memory changes, web browsing, voice capture, and tool execution are
        still blocked unless a later confirmation-gated flow explicitly enables them.
      </div>
    </section>
  );
}
