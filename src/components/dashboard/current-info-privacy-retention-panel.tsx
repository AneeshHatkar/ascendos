import type { CurrentInfoPrivacyRetentionEvaluation } from "@/lib/current-info-capture";

type CurrentInfoPrivacyRetentionPanelProps = {
  evaluation: CurrentInfoPrivacyRetentionEvaluation;
};

function label(value: string) {
  return value.replaceAll("_", " ");
}

function tone(decision: string) {
  if (decision === "allow_preview") {
    return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  }

  if (decision === "manual_review_required") {
    return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  }

  if (decision === "redact_preview") {
    return "border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100";
  }

  return "border-rose-300/20 bg-rose-300/10 text-rose-100";
}

export function CurrentInfoPrivacyRetentionPanel({
  evaluation,
}: CurrentInfoPrivacyRetentionPanelProps) {
  const rows = [
    ...evaluation.queryResults,
    ...evaluation.sourceResults,
    ...evaluation.candidateResults,
  ];

  return (
    <section className="rounded-3xl border border-rose-400/20 bg-rose-400/[0.04] p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-rose-200/70">Phase 16P</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Current-info privacy and retention</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Preview privacy, sensitive-search, raw-content, private-mode, and retention rules
            before any current-info result can be saved or converted.
          </p>
        </div>
        <span className="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-xs font-semibold text-rose-100">
          preview only
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Records</p>
          <p className="mt-3 text-3xl font-semibold text-white">{evaluation.summary.totalRecords}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Private mode</p>
          <p className="mt-3 text-3xl font-semibold text-white">{evaluation.summary.privateModeCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sensitive</p>
          <p className="mt-3 text-3xl font-semibold text-white">{evaluation.summary.sensitiveCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Blocked/redacted</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {evaluation.summary.blockedCount + evaluation.summary.redactedCount}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-rose-100">Privacy boundary:</span>{" "}
        This panel previews decisions only. It does not delete, redact, update, save,
        approve, reject, create audit events, or activate private mode.
      </div>

      <div className="mt-5 grid gap-3">
        {rows.slice(0, 8).map((row) => (
          <div key={`${row.recordKind}:${row.recordId}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`rounded-full border px-2 py-1 ${tone(row.decision)}`}>
                {label(row.decision)}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                {label(row.recordKind)}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                {label(row.retentionPolicy)}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                {label(row.sensitiveCategory)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">{row.redactionPreview}</p>
            {row.warnings.length > 0 ? (
              <p className="mt-2 text-xs text-amber-100">
                Warnings: {row.warnings.join("; ")}
              </p>
            ) : null}
            {row.retentionExpiresAt ? (
              <p className="mt-2 text-xs text-slate-500">
                Retention expires: {row.retentionExpiresAt}
              </p>
            ) : null}
          </div>
        ))}

        {rows.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            No current-info privacy or retention records are available yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export const PHASE_16P_PRIVACY_RETENTION_PANEL_BOUNDARY =
  "Phase 16P panel displays privacy and retention previews only and cannot delete, redact, update, save, approve, reject, create audit events, browse, fetch, or activate private mode.";
