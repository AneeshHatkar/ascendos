"use client";

import { useState } from "react";

import { ProposedActionReviewCard } from "@/components/actions";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";

export interface PendingUpdatesDrawerProps {
  initialAction: ProposedActionContract;
  pendingCount: number;
  disabled?: boolean;
  validationIssues?: string[];
}

export function PendingUpdatesDrawer({
  initialAction,
  pendingCount,
  disabled = false,
  validationIssues = [],
}: PendingUpdatesDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Pending updates drawer
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">
              Confirmation queue preview
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Shows pending Carnos/system proposals as a review drawer. The drawer is read-only at this stage and keeps Save/Edit/Cancel review separate from persistence.
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

        {isOpen ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <ProposedActionReviewCard
              initialAction={initialAction}
              disabled={disabled}
              saveLabel="Save / Confirm preview"
              cancelLabel="Cancel preview"
              reviewTitle="Pending update review"
              validationIssues={validationIssues}
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
