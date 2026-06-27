"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ProposalSurface = "calendar" | "timeline";

interface CalendarTimelineProposalComposerProps {
  surface: ProposalSurface;
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

const priorities = ["low", "medium", "high", "urgent"] as const;

function surfaceCopy(surface: ProposalSurface) {
  if (surface === "timeline") {
    return {
      eyebrow: "timeline proposal",
      title: "Propose a timeline task",
      description:
        "Capture a task proposal from the timeline surface. This creates a pending confirmation only; it does not write directly to tasks, events, reminders, or timeline records.",
      button: "Create timeline proposal",
    };
  }

  return {
    eyebrow: "calendar proposal",
    title: "Propose a calendar task",
    description:
      "Capture a task proposal with an optional due date. This creates a pending confirmation only; it does not write directly to tasks, events, reminders, or calendar sync.",
    button: "Create calendar proposal",
  };
}

export function CalendarTimelineProposalComposer({
  surface,
}: CalendarTimelineProposalComposerProps) {
  const router = useRouter();
  const copy = surfaceCopy(surface);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [domain, setDomain] = useState<(typeof domains)[number]>("general");
  const [priority, setPriority] = useState<(typeof priorities)[number]>("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submitProposal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/calendar/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: description.trim().length > 0 ? description : undefined,
          due_date: dueDate.trim().length > 0 ? dueDate : undefined,
          domain,
          priority,
          source_surface: surface,
        }),
      });

      const payload = (await response.json()) as {
        status?: string;
        message?: string;
        issues?: string[];
      };

      if (!response.ok || payload.status === "error") {
        throw new Error(
          payload.issues?.length
            ? payload.issues.join("; ")
            : payload.message ?? "Proposal creation failed.",
        );
      }

      setTitle("");
      setDescription("");
      setDueDate("");
      setDomain("general");
      setPriority("medium");
      setMessage(
        payload.message ??
          "Proposal created. Review it in Pending Updates before confirmation.",
      );
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Proposal creation failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
          {copy.eyebrow}
        </p>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            {copy.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-cyan-100/80">
            {copy.description}
          </p>
        </div>
      </div>

      <form className="mt-5 grid gap-4" onSubmit={submitProposal}>
        <label className="grid gap-2 text-sm text-slate-200">
          <span className="font-medium">Title</span>
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Apply to 5 AI/ML roles before Friday"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-200">
          <span className="font-medium">Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add context, constraints, or why this belongs on the calendar/timeline."
            rows={4}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm text-slate-200">
            <span className="font-medium">Due date</span>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-200">
            <span className="font-medium">Domain</span>
            <select
              value={domain}
              onChange={(event) =>
                setDomain(event.target.value as (typeof domains)[number])
              }
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
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-5 text-cyan-100/70">
            Safe-write boundary: this only creates an ai_actions row with
            pending_confirmation. Final writes still require explicit approval.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl border border-cyan-300/40 bg-cyan-300/15 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating proposal..." : copy.button}
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
