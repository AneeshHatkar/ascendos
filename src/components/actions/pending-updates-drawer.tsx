"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ProposedActionReviewCard } from "@/components/actions";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";

export interface PendingUpdatesDrawerProps {
  initialAction: ProposedActionContract;
  pendingCount: number;
  actionId?: string;
  disabled?: boolean;
  confirmationEnabled?: boolean;
  validationIssues?: string[];
}

export function PendingUpdatesDrawer({
  initialAction,
  pendingCount,
  actionId,
  disabled = false,
  confirmationEnabled = false,
  validationIssues = [],
}: PendingUpdatesDrawerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const canSubmit = Boolean(actionId) && confirmationEnabled && !disabled;

  async function submitTransition(transition: "approve" | "reject") {
    if (!actionId) {
      setSubmissionError("No persisted AI action id is available for this pending update.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionMessage(null);

    try {
      const response = await fetch(`/api/actions/${actionId}/${transition}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as { message?: string; status?: string };

      if (!response.ok) {
        throw new Error(result.message ?? `Failed to ${transition} pending update.`);
      }

      setSubmissionMessage(result.message ?? `Pending update ${transition}d.`);
      router.refresh();
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : `Failed to ${transition} pending update.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Pending updates drawer
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">
              Confirmation queue
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Shows pending Carnos/system proposals as a review drawer. Approval
              and rejection are server-owned API transitions, preserving the
              confirmation-first boundary.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
            Pending: <span className="font-semibold text-slate-100">{pendingCount}</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-left text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? "Hide confirmation drawer" : "Open confirmation drawer"}
        </button>

        {submissionMessage ? (
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            {submissionMessage}
          </div>
        ) : null}

        {submissionError ? (
          <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            {submissionError}
          </div>
        ) : null}

        {!canSubmit ? (
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            No persisted pending AI action is available yet. The drawer can still
            preview the review UI, but confirmation buttons require a real
            `ai_actions.id`.
          </div>
        ) : null}

        {isOpen ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <ProposedActionReviewCard
              initialAction={initialAction}
              disabled={disabled || isSubmitting}
              saveLabel={canSubmit ? "Approve pending update" : "Save / Confirm preview"}
              cancelLabel={canSubmit ? "Reject pending update" : "Cancel preview"}
              reviewTitle="Pending update review"
              validationIssues={validationIssues}
              onSave={canSubmit ? async () => submitTransition("approve") : undefined}
              onCancel={canSubmit ? async () => submitTransition("reject") : undefined}
            />
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">
            Drawer closed. Pending update details stay hidden until the user opens the review surface.
          </div>
        )}
      </div>
    </section>
  );
}
