import type { CurrentInfoReviewToSaveFlowResult } from "@/lib/current-info-capture";

type CurrentInfoReviewToSavePanelProps = {
  flow: CurrentInfoReviewToSaveFlowResult;
};

function label(value: string) {
  return value.replaceAll("_", " ");
}

function badgeClass(status: string) {
  if (status === "ready_for_confirmation") {
    return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  }

  if (status === "needs_edit") {
    return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  }

  if (status.startsWith("blocked")) {
    return "border-rose-300/20 bg-rose-300/10 text-rose-100";
  }

  return "border-white/10 bg-white/[0.04] text-slate-300";
}

export function CurrentInfoReviewToSavePanel({
  flow,
}: CurrentInfoReviewToSavePanelProps) {
  return (
    <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/70">Phase 16O</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Review-to-save candidate flow</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Preview how current-info candidates can become save proposals after explicit review.
            This panel does not approve, reject, insert, link, audit, or execute records.
          </p>
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
          confirmation preview
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Candidates</p>
          <p className="mt-3 text-3xl font-semibold text-white">{flow.totalCandidates}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ready</p>
          <p className="mt-3 text-3xl font-semibold text-white">{flow.readyForConfirmationCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Needs edit</p>
          <p className="mt-3 text-3xl font-semibold text-white">{flow.needsEditCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Blocked</p>
          <p className="mt-3 text-3xl font-semibold text-white">{flow.blockedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Unsupported</p>
          <p className="mt-3 text-3xl font-semibold text-white">{flow.unsupportedCount}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-emerald-100">Review boundary:</span>{" "}
        Approve/reject/save execution remains deferred. Existing proposed-action contracts only support
        tasks, goals, daily logs, and proof items; Knowledge Vault saves stay as preview payloads here.
      </div>

      <div className="mt-5 grid gap-3">
        {flow.previews.slice(0, 6).map((preview) => (
          <div key={preview.candidateId} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`rounded-full border px-2 py-1 ${badgeClass(preview.status)}`}>
                {label(preview.status)}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                {label(preview.destination)}
              </span>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-cyan-100">
                {preview.canCreateProposedAction ? "proposed action ready" : "preview only"}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{preview.title}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Decision: {label(preview.decision)} · Candidate: {label(preview.candidateStatus)}
            </p>
            {preview.missingFields.length > 0 ? (
              <p className="mt-2 text-xs text-amber-100">
                Missing: {preview.missingFields.join(", ")}
              </p>
            ) : null}
            {preview.warnings.length > 0 ? (
              <p className="mt-2 text-xs text-rose-100">
                Warnings: {preview.warnings.join("; ")}
              </p>
            ) : null}
          </div>
        ))}

        {flow.previews.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            No current-info candidates are available for review-to-save preview yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export const PHASE_16O_REVIEW_TO_SAVE_PANEL_BOUNDARY =
  "Phase 16O panel displays review-to-save previews only and cannot approve, reject, insert, update, link, audit, or execute records.";
