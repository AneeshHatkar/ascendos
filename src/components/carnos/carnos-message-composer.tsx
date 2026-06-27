"use client";

import { useState } from "react";

type SaveState =
  | { status: "idle"; message: string }
  | { status: "saving"; message: string }
  | { status: "saved"; message: string }
  | { status: "error"; message: string };

export function CarnosMessageComposer() {
  const [content, setContent] = useState("");
  const [state, setState] = useState<SaveState>({
    status: "idle",
    message: "Save a user message into Carnos chat history. This does not generate an AI reply.",
  });

  async function saveMessage() {
    const trimmed = content.trim();

    if (!trimmed) {
      setState({
        status: "error",
        message: "Write a message before saving.",
      });
      return;
    }

    setState({
      status: "saving",
      message: "Saving message through the server-owned Carnos persistence route…",
    });

    try {
      const response = await fetch("/api/carnos/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: trimmed,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        session_id?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Message save failed.");
      }

      setContent("");
      setState({
        status: "saved",
        message:
          "Saved to Carnos chat history. Refresh the page to see it in the read-only transcript list.",
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Message save failed.",
      });
    }
  }

  const disabled = state.status === "saving";

  return (
    <div className="space-y-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03] p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
          Phase 12.9D persistence boundary
        </p>
        <h3 className="mt-2 text-lg font-semibold text-white">
          Save a Carnos message
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          This form persists your user message into chat_sessions and chat_messages through a server route.
          It does not call an LLM, stream a reply, remember facts, or execute actions.
        </p>
      </div>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="min-h-32 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
        placeholder="Write a Carnos note, reflection, instruction, or context message to persist..."
        maxLength={8000}
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
          onClick={saveMessage}
          disabled={disabled}
          className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {disabled ? "Saving…" : "Save message"}
        </button>
      </div>
    </div>
  );
}
