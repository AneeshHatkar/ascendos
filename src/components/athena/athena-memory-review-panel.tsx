"use client";

import { useMemo, useState } from "react";

import type {
  AthenaApprovedMemoryRow,
  AthenaMemoryCandidateRow,
  AthenaMemoryPriority,
  AthenaMemorySensitivity,
  AthenaMemoryType,
} from "@/lib/ai";

type AthenaMemoryReviewPanelProps = {
  readonly activeSessionId: string | null;
  readonly latestUserMessageId: string | null;
  readonly latestUserMessageText: string;
};

type MemoryApiState =
  | { status: "idle"; message: string }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type MemoryReviewResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
  data?: {
    candidates?: AthenaMemoryCandidateRow[];
    memories?: AthenaApprovedMemoryRow[];
  };
};

const memoryTypes: AthenaMemoryType[] = [
  "preference",
  "goal",
  "project_fact",
  "project_decision",
  "routine",
  "system_state",
  "source_of_truth_note",
  "conversation_continuity",
  "user_profile_fact",
  "research_note",
  "career_context",
  "health_context",
  "grimoire_context",
  "do_not_remember_rule",
];

const sensitivities: AthenaMemorySensitivity[] = ["low", "medium", "high", "restricted"];
const priorities: AthenaMemoryPriority[] = ["low", "medium", "high"];

function formatDate(value: string | null | undefined) {
  if (!value) return "unknown";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function defaultDraftText(text: string) {
  return text.trim().slice(0, 1200);
}

export function AthenaMemoryReviewPanel({
  activeSessionId,
  latestUserMessageId,
  latestUserMessageText,
}: AthenaMemoryReviewPanelProps) {
  const [candidateText, setCandidateText] = useState(defaultDraftText(latestUserMessageText));
  const [memoryType, setMemoryType] = useState<AthenaMemoryType>("conversation_continuity");
  const [sensitivity, setSensitivity] = useState<AthenaMemorySensitivity>("medium");
  const [priority, setPriority] = useState<AthenaMemoryPriority>("medium");
  const [candidates, setCandidates] = useState<AthenaMemoryCandidateRow[]>([]);
  const [memories, setMemories] = useState<AthenaApprovedMemoryRow[]>([]);
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [state, setState] = useState<MemoryApiState>({
    status: "idle",
    message:
      "Memory is approval-only. Athena can draft candidates, but only you can approve long-term memory.",
  });

  const latestMessagePreview = useMemo(
    () => defaultDraftText(latestUserMessageText),
    [latestUserMessageText],
  );

  async function refreshMemoryState() {
    setState({ status: "loading", message: "Loading Athena memory review inbox…" });

    try {
      const response = await fetch("/api/athena/memory-candidates", {
        method: "GET",
      });

      const payload = (await response.json()) as MemoryReviewResponse;

      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error ?? "Could not load memory review state.");
      }

      setCandidates(payload.data.candidates ?? []);
      setMemories(payload.data.memories ?? []);
      setState({
        status: "success",
        message:
          "Memory review loaded. Approved memory may be used transparently in Athena context.",
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Could not load memory review state.",
      });
    }
  }

  async function createCandidate() {
    const text = candidateText.trim();

    if (!text) {
      setState({ status: "error", message: "Write memory text before creating a candidate." });
      return;
    }

    setState({ status: "loading", message: "Creating review-only memory candidate…" });

    try {
      const response = await fetch("/api/athena/memory-candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_text: text,
          memory_type: memoryType,
          sensitivity,
          priority,
          source_chat_message_id: latestUserMessageId,
          source_chat_session_id: activeSessionId,
          confidence: 0.82,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not create memory candidate.");
      }

      setCandidateText("");
      setState({
        status: "success",
        message: payload.message ?? "Memory candidate created for review.",
      });
      await refreshMemoryState();
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Could not create memory candidate.",
      });
    }
  }

  async function patchCandidate(candidateId: string) {
    const text = editedText.trim();

    if (!text) {
      setState({ status: "error", message: "Edited candidate text cannot be empty." });
      return;
    }

    const response = await fetch(`/api/athena/memory-candidates/${candidateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate_text: text,
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };

    if (!response.ok || !payload.ok) {
      setState({
        status: "error",
        message: payload.error ?? "Could not edit memory candidate.",
      });
      return;
    }

    setEditingCandidateId(null);
    setEditedText("");
    setState({
      status: "success",
      message: payload.message ?? "Memory candidate edited.",
    });
    await refreshMemoryState();
  }

  async function approveCandidate(candidate: AthenaMemoryCandidateRow) {
    const response = await fetch(`/api/athena/memory-candidates/${candidate.id}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memory_text: candidate.candidate_text,
        memory_summary: candidate.candidate_summary,
        sensitivity: candidate.sensitivity,
        priority: candidate.priority,
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };

    if (!response.ok || !payload.ok) {
      setState({
        status: "error",
        message: payload.error ?? "Could not approve memory candidate.",
      });
      return;
    }

    setState({
      status: "success",
      message: payload.message ?? "Memory approved.",
    });
    await refreshMemoryState();
  }

  async function rejectCandidate(candidateId: string) {
    const response = await fetch(`/api/athena/memory-candidates/${candidateId}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rejection_reason: "Rejected from Athena memory review panel.",
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };

    if (!response.ok || !payload.ok) {
      setState({
        status: "error",
        message: payload.error ?? "Could not reject memory candidate.",
      });
      return;
    }

    setState({
      status: "success",
      message: payload.message ?? "Memory candidate rejected.",
    });
    await refreshMemoryState();
  }

  async function updateMemory(memoryId: string, action: "forget" | "archive" | "toggle_retrieval") {
    const memory = memories.find((item) => item.id === memoryId);

    const response = await fetch(`/api/athena/memory-items/${memoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        retrieval_enabled:
          action === "toggle_retrieval" ? !Boolean(memory?.retrieval_enabled) : undefined,
        reason: "User requested this from Athena memory review panel.",
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };

    if (!response.ok || !payload.ok) {
      setState({
        status: "error",
        message: payload.error ?? "Could not update approved memory.",
      });
      return;
    }

    setState({
      status: "success",
      message: payload.message ?? "Approved memory updated.",
    });
    await refreshMemoryState();
  }

  const statusClass =
    state.status === "error"
      ? "border-red-400/20 bg-red-400/10 text-red-100"
      : state.status === "success"
        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
        : "border-white/10 bg-white/[0.04] text-slate-300";

  return (
    <section className="rounded-[2rem] border border-violet-300/20 bg-violet-950/20 p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-violet-200/75">
            Athena memory review
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Long-term memory requires approval
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-violet-100/75">
            Create memory candidates from chat, approve/edit/reject them, and
            forget approved memories. Chat history remains separate from long-term memory.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCandidateText(latestMessagePreview)}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
          >
            Use latest chat
          </button>

          <button
            type="button"
            onClick={() => void refreshMemoryState()}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
          >
            Refresh memory
          </button>
        </div>
      </div>

      <div className={`mt-4 rounded-2xl border p-4 text-sm leading-6 ${statusClass}`}>
        {state.message}
        <span className="mt-1 block text-xs opacity-75">
          Use Refresh memory to load the latest inbox. No memory loads or writes happen invisibly.
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Draft memory candidate</p>
          <textarea
            value={candidateText}
            onChange={(event) => setCandidateText(event.target.value)}
            className="mt-3 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-300/60"
            placeholder="Write exactly what Athena should remember. It will still require approval."
            maxLength={4000}
          />

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <select
              value={memoryType}
              onChange={(event) => setMemoryType(event.target.value as AthenaMemoryType)}
              className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
            >
              {memoryTypes.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              value={sensitivity}
              onChange={(event) => setSensitivity(event.target.value as AthenaMemorySensitivity)}
              className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
            >
              {sensitivities.map((value) => (
                <option key={value} value={value}>
                  sensitivity: {value}
                </option>
              ))}
            </select>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as AthenaMemoryPriority)}
              className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
            >
              {priorities.map((value) => (
                <option key={value} value={value}>
                  priority: {value}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-5 text-violet-100/65">
              This writes only to the <code>memory candidate inbox</code>. It never silently
              creates approved memory.
            </p>

            <button
              type="button"
              onClick={() => void createCandidate()}
              className="rounded-full border border-violet-300/40 bg-violet-300/10 px-5 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/20"
            >
              Create memory candidate
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Latest chat source</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            {latestUserMessageId
              ? `Source message: ${latestUserMessageId}`
              : "No chat source selected yet."}
          </p>
          <p className="mt-3 max-h-40 overflow-auto rounded-2xl border border-white/10 bg-slate-950 p-3 text-xs leading-5 text-slate-300">
            {latestMessagePreview || "Send a message to Athena to use it as a memory source."}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">
            Review inbox · {candidates.length}
          </p>

          <div className="mt-4 space-y-3">
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <article
                  key={candidate.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    <span>{candidate.memory_type}</span>
                    <span>{candidate.sensitivity}</span>
                    <span>{candidate.priority}</span>
                    <span>{candidate.status}</span>
                  </div>

                  {editingCandidateId === candidate.id ? (
                    <textarea
                      value={editedText}
                      onChange={(event) => setEditedText(event.target.value)}
                      className="mt-3 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 p-3 text-sm text-white"
                    />
                  ) : (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {candidate.candidate_text}
                    </p>
                  )}

                  {candidate.blocked_reason ? (
                    <p className="mt-3 rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-100">
                      Blocked reason: {candidate.blocked_reason}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {editingCandidateId === candidate.id ? (
                      <button
                        type="button"
                        onClick={() => void patchCandidate(candidate.id)}
                        className="rounded-full border border-cyan-300/40 px-3 py-1 text-xs font-semibold text-cyan-100"
                      >
                        Save edit
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCandidateId(candidate.id);
                          setEditedText(candidate.candidate_text);
                        }}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => void approveCandidate(candidate)}
                      className="rounded-full border border-emerald-300/40 px-3 py-1 text-xs font-semibold text-emerald-100"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => void rejectCandidate(candidate.id)}
                      className="rounded-full border border-red-300/40 px-3 py-1 text-xs font-semibold text-red-100"
                    >
                      Reject
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                No pending memory candidates.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">
            Approved memory · {memories.length}
          </p>

          <div className="mt-4 space-y-3">
            {memories.length > 0 ? (
              memories.map((memory) => (
                <article
                  key={memory.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    <span>{memory.memory_type}</span>
                    <span>{memory.sensitivity}</span>
                    <span>{memory.status}</span>
                    <span>retrieval: {memory.retrieval_enabled ? "on" : "off"}</span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {memory.memory_summary ?? memory.memory_text}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Updated {formatDate(memory.updated_at)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void updateMemory(memory.id, "toggle_retrieval")}
                      className="rounded-full border border-cyan-300/40 px-3 py-1 text-xs font-semibold text-cyan-100"
                    >
                      {memory.retrieval_enabled ? "Disable retrieval" : "Enable retrieval"}
                    </button>

                    <button
                      type="button"
                      onClick={() => void updateMemory(memory.id, "archive")}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      Archive
                    </button>

                    <button
                      type="button"
                      onClick={() => void updateMemory(memory.id, "forget")}
                      className="rounded-full border border-red-300/40 px-3 py-1 text-xs font-semibold text-red-100"
                    >
                      Forget
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                No approved memories yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-violet-300/15 bg-violet-950/20 p-4 text-sm leading-6 text-violet-100/80">
        Memory truth: candidates are separate from chat history and approved memory.
        Athena may use only approved/edited, retrieval-enabled, non-restricted memory
        in visible context. Forgotten, rejected, archived, restricted, and unapproved
        candidates are blocked.
      </div>
    </section>
  );
}
