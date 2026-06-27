"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ProposalMode = "create_goal" | "create_proof_item";

interface GoalProofProposalComposerProps {
  goals: Array<{
    id: string;
    title: string;
  }>;
}

const domains = [
  "general",
  "career",
  "learning",
  "health",
  "body",
  "research",
  "projects",
  "life_admin",
  "finance",
  "relationships",
  "creativity",
] as const;

const proofTypes = ["note", "text", "link", "file", "image", "code", "metric"] as const;

export function GoalProofProposalComposer({ goals }: GoalProofProposalComposerProps) {
  const router = useRouter();
  const [mode, setMode] = useState<ProposalMode>("create_goal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState<(typeof domains)[number]>("general");
  const [targetDate, setTargetDate] = useState("");
  const [proofType, setProofType] = useState<(typeof proofTypes)[number]>("note");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [goalId, setGoalId] = useState("");
  const [occurredAt, setOccurredAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submitProposal() {
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const body =
      mode === "create_goal"
        ? {
            kind: "create_goal",
            title,
            description,
            domain,
            target_date: targetDate,
          }
        : {
            kind: "create_proof_item",
            title,
            description,
            proof_type: proofType,
            source_url: sourceUrl,
            source_text: sourceText,
            goal_id: goalId,
            occurred_at: occurredAt,
          };

    try {
      const response = await fetch("/api/goals/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const payload = (await response.json().catch(() => null)) as {
        status?: string;
        message?: string;
        data?: {
          ai_action_id?: string;
        };
      } | null;

      if (!response.ok || payload?.status === "error") {
        throw new Error(payload?.message ?? "Proposal creation failed.");
      }

      setTitle("");
      setDescription("");
      setTargetDate("");
      setSourceUrl("");
      setSourceText("");
      setGoalId("");
      setOccurredAt("");
      setMessage(
        payload?.data?.ai_action_id
          ? `Proposal created and sent to pending confirmation: ${payload.data.ai_action_id}`
          : "Proposal created and sent to pending confirmation.",
      );
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Proposal creation failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const submitLabel =
    mode === "create_goal" ? "Create goal proposal" : "Create proof proposal";

  return (
    <div className="rounded-3xl border border-cyan-900/50 bg-cyan-950/20 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
            confirmation-first creation
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-50">
            Propose a goal or proof item
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            This form creates an ai_actions pending-confirmation record. It does not
            directly insert into goals or proof_items. Confirm from the pending
            updates drawer before execution.
          </p>
        </div>

        <select
          className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
          value={mode}
          onChange={(event) => setMode(event.target.value as ProposalMode)}
        >
          <option value="create_goal">Goal proposal</option>
          <option value="create_proof_item">Proof proposal</option>
        </select>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm text-slate-300">
          Title
          <input
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={mode === "create_goal" ? "Build the Grimoire system" : "Completed today's implementation proof"}
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-300">
          Description
          <textarea
            className="min-h-24 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add useful context for the proposal review."
          />
        </label>

        {mode === "create_goal" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Domain
              <select
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                value={domain}
                onChange={(event) => setDomain(event.target.value as typeof domain)}
              >
                {domains.map((domainOption) => (
                  <option key={domainOption} value={domainOption}>
                    {domainOption}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Target date
              <input
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
                type="date"
                value={targetDate}
                onChange={(event) => setTargetDate(event.target.value)}
              />
            </label>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Proof type
                <select
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={proofType}
                  onChange={(event) => setProofType(event.target.value as typeof proofType)}
                >
                  {proofTypes.map((proofTypeOption) => (
                    <option key={proofTypeOption} value={proofTypeOption}>
                      {proofTypeOption}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Link to goal
                <select
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                  value={goalId}
                  onChange={(event) => setGoalId(event.target.value)}
                >
                  <option value="">No linked goal</option>
                  {goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Source URL
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
                  value={sourceUrl}
                  onChange={(event) => setSourceUrl(event.target.value)}
                  placeholder="https://..."
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Occurred at
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
                  type="datetime-local"
                  value={occurredAt}
                  onChange={(event) => setOccurredAt(event.target.value)}
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-slate-300">
              Source text
              <textarea
                className="min-h-20 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
                value={sourceText}
                onChange={(event) => setSourceText(event.target.value)}
                placeholder="Paste proof text, receipt, note, or evidence summary."
              />
            </label>
          </div>
        )}

        {message ? (
          <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-3 text-sm text-emerald-200">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-red-800 bg-red-950/30 p-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <button
          className="rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          disabled={isSubmitting || title.trim().length === 0}
          onClick={submitProposal}
        >
          {isSubmitting ? "Creating proposal..." : submitLabel}
        </button>
      </div>
    </div>
  );
}
