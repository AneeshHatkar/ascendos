import type { CurrentInfoAuditTrailResult } from "@/lib/current-info-capture";

type CurrentInfoWebSourceAuditTrailPanelProps = {
  trail: CurrentInfoAuditTrailResult;
};

function label(value: string) {
  return value.replaceAll("_", " ");
}

function tone(severity: string) {
  if (severity === "success") {
    return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  }

  if (severity === "warning") {
    return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  }

  if (severity === "blocked") {
    return "border-rose-300/20 bg-rose-300/10 text-rose-100";
  }

  return "border-cyan-300/20 bg-cyan-300/10 text-cyan-100";
}

export function CurrentInfoWebSourceAuditTrailPanel({
  trail,
}: CurrentInfoWebSourceAuditTrailPanelProps) {
  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Phase 16Q</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Web source audit trail</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Read-only trace of current-info search, source, candidate, save, link, stale,
            privacy, and reliability audit events.
          </p>
        </div>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          read-only ledger
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Events</p>
          <p className="mt-3 text-3xl font-semibold text-white">{trail.summary.totalEvents}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">System</p>
          <p className="mt-3 text-3xl font-semibold text-white">{trail.summary.systemEventCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">User/Carnos</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {trail.summary.userEventCount + trail.summary.carnosEventCount}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Saved/linked</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {trail.summary.saveEventCount + trail.summary.linkEventCount}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Blocked/stale</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {trail.summary.blockedEventCount + trail.summary.staleEventCount}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-cyan-100">Audit boundary:</span>{" "}
        This panel reads and summarizes audit rows only. It does not insert audit events,
        write generic audit logs, approve, reject, save, link, browse, fetch, or call providers.
      </div>

      {trail.sourceCoverageWarnings.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
          {trail.sourceCoverageWarnings.slice(0, 4).map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-3">
        {trail.records.slice(0, 8).map((record) => (
          <div key={record.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`rounded-full border px-2 py-1 ${tone(record.severity)}`}>
                {label(record.eventType)}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                {label(record.actorType)}
              </span>
              {record.linkedRecordTable ? (
                <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                  {record.linkedRecordTable}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{record.summary}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              {record.linkedSourceTitle ?? "No linked source title"} · {record.createdAt}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{record.payloadPreview}</p>
          </div>
        ))}

        {trail.records.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            No web source audit events are available yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export const PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_PANEL_BOUNDARY =
  "Phase 16Q panel displays existing web source audit events only and cannot insert audit events, write audit logs, update source links, approve, reject, save, browse, fetch, or call providers.";
