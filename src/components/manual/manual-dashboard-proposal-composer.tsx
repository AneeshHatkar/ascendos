"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ManualProposalMode = "task" | "goal" | "proof";

type ManualDashboardProposalComposerProps = {
  surface: string;
  defaultDomain?: ManualDomain;
  title?: string;
  description?: string;
};

type ManualDomain =
  | "general"
  | "career"
  | "learning"
  | "health"
  | "body"
  | "research"
  | "projects"
  | "life_admin"
  | "finance"
  | "relationships"
  | "creativity";

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
] as const satisfies readonly ManualDomain[];

const priorities = ["low", "medium", "high", "urgent"] as const;
const proofTypes = ["note", "text", "link", "file", "image", "code", "metric"] as const;

function normalizeDomain(domain: ManualDashboardProposalComposerProps["defaultDomain"]): ManualDomain {
  return domain && domains.includes(domain) ? domain : "general";
}

function proposalSurfaceLabel(surface: string): string {
  return surface
    .replace(/^\/+/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (value) => value.toUpperCase());
}

export function ManualDashboardProposalComposer({
  surface,
  defaultDomain = "general",
  title = "Manual quick capture",
  description = "Create a safe pending proposal from this dashboard. Nothing writes directly to final domain tables until it is reviewed and confirmed.",
}: ManualDashboardProposalComposerProps) {
  const router = useRouter();

  const [mode, setMode] = useState<ManualProposalMode>("task");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [domain, setDomain] = useState<ManualDomain>(normalizeDomain(defaultDomain));
  const [priority, setPriority] = useState<(typeof priorities)[number]>("medium");
  const [dateValue, setDateValue] = useState("");
  const [proofType, setProofType] = useState<(typeof proofTypes)[number]>("note");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submitProposal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const trimmedTitle = itemTitle.trim();
    const trimmedDescription = itemDescription.trim();

    try {
      const response =
        mode === "task"
          ? await fetch("/api/calendar/proposals", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: trimmedTitle,
                description: trimmedDescription || undefined,
                due_date: dateValue || undefined,
                priority,
                domain,
                source_surface: "calendar",
              }),
            })
          : await fetch("/api/goals/proposals", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                mode === "goal"
                  ? {
                      kind: "create_goal",
                      title: trimmedTitle,
                      description: trimmedDescription || undefined,
                      domain,
                      target_date: dateValue || undefined,
                      reason: `Manual goal proposal from ${surface}.`,
                    }
                  : {
                      kind: "create_proof_item",
                      title: trimmedTitle,
                      description: trimmedDescription || undefined,
                      proof_type: proofType,
                      source_url: sourceUrl.trim() || undefined,
                      source_text: sourceText.trim() || undefined,
                      occurred_at: dateValue || undefined,
                      reason: `Manual proof proposal from ${surface}.`,
                    },
              ),
            });

      const payload = (await response.json().catch(() => null)) as {
        status?: string;
        message?: string;
        issues?: string[];
        data?: {
          ai_action_id?: string;
        };
      } | null;

      if (!response.ok || payload?.status === "error") {
        throw new Error(
          payload?.issues?.length
            ? payload.issues.join("; ")
            : payload?.message ?? "Manual proposal creation failed.",
        );
      }

      setItemTitle("");
      setItemDescription("");
      setDateValue("");
      setSourceUrl("");
      setSourceText("");
      setMessage(
        payload?.data?.ai_action_id
          ? `Proposal created and sent to Pending Updates: ${payload.data.ai_action_id}`
          : payload?.message ?? "Proposal created and sent to Pending Updates.",
      );
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Manual proposal creation failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const dateLabel =
    mode === "task" ? "Due date" : mode === "goal" ? "Target date" : "Occurred at";

  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
            manual-first proposal
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-cyan-100/80">
            {description}
          </p>
          <p className="mt-2 text-xs leading-5 text-cyan-100/60">
            Surface: {proposalSurfaceLabel(surface)}. Safe-write boundary:
            pending proposal only, no hidden direct write.
          </p>
        </div>

        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as ManualProposalMode)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
        >
          <option value="task">Task proposal</option>
          <option value="goal">Goal proposal</option>
          <option value="proof">Proof proposal</option>
        </select>
      </div>

      <form className="mt-5 grid gap-4" onSubmit={submitProposal}>
        <label className="grid gap-2 text-sm text-slate-200">
          <span className="font-medium">Title</span>
          <input
            required
            value={itemTitle}
            onChange={(event) => setItemTitle(event.target.value)}
            placeholder={
              mode === "task"
                ? "Example: Apply to 5 jobs before Friday"
                : mode === "goal"
                  ? "Example: Ship Phase 21C manual dashboard activation"
                  : "Example: Completed browser smoke test"
            }
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-200">
          <span className="font-medium">Description</span>
          <textarea
            value={itemDescription}
            onChange={(event) => setItemDescription(event.target.value)}
            placeholder="Add context, constraints, or evidence for review."
            rows={4}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm text-slate-200">
            <span className="font-medium">Domain</span>
            <select
              value={domain}
              onChange={(event) => setDomain(event.target.value as ManualDomain)}
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
            >
              {domains.map((value) => (
                <option key={value} value={value}>
                  {value.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm text-slate-200">
            <span className="font-medium">{dateLabel}</span>
            <input
              type={mode === "goal" ? "date" : "datetime-local"}
              value={dateValue}
              onChange={(event) => setDateValue(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
            />
          </label>

          {mode === "task" ? (
            <label className="grid gap-2 text-sm text-slate-200">
              <span className="font-medium">Priority</span>
              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as (typeof priorities)[number])
                }
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
              >
                {priorities.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ) : mode === "proof" ? (
            <label className="grid gap-2 text-sm text-slate-200">
              <span className="font-medium">Proof type</span>
              <select
                value={proofType}
                onChange={(event) =>
                  setProofType(event.target.value as (typeof proofTypes)[number])
                }
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
              >
                {proofTypes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-5 text-cyan-100/70">
              Goal proposals default to active / medium priority inside the
              existing server route.
            </div>
          )}
        </div>

        {mode === "proof" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-200">
              <span className="font-medium">Source URL</span>
              <input
                value={sourceUrl}
                onChange={(event) => setSourceUrl(event.target.value)}
                placeholder="https://..."
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-200">
              <span className="font-medium">Source text</span>
              <textarea
                value={sourceText}
                onChange={(event) => setSourceText(event.target.value)}
                placeholder="Paste proof text, note, result, receipt, or summary."
                rows={3}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
              />
            </label>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-5 text-cyan-100/70">
            This creates an <code>ai_actions</code> pending-confirmation record.
            It does not insert directly into tasks, goals, proof, calendar, or
            timeline tables.
          </p>

          <button
            type="submit"
            disabled={isSubmitting || itemTitle.trim().length === 0}
            className="rounded-2xl border border-cyan-300/40 bg-cyan-300/15 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Creating proposal..."
              : mode === "task"
                ? "Create task proposal"
                : mode === "goal"
                  ? "Create goal proposal"
                  : "Create proof proposal"}
          </button>
        </div>
      </form>

      {message ? (
        <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      ) : null}
    </section>
  );
}
