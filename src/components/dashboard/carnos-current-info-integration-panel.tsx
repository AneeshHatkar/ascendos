import type { CurrentInfoDashboardDataResult } from "@/lib/dashboard";
import type { WebSourceCandidateRow, WebSourceRow } from "@/lib/repositories";

type CarnosCurrentInfoIntegrationPanelProps = {
  data: CurrentInfoDashboardDataResult;
  sources: WebSourceRow[];
  candidates: WebSourceCandidateRow[];
};

function formatLabel(value: string | null | undefined, fallback = "unknown") {
  if (!value || value.trim().length === 0) {
    return fallback;
  }

  return value.replaceAll("_", " ");
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "No timestamp";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function topSourceSignal(sources: WebSourceRow[]): string {
  const officialCount = sources.filter((source) => source.reliability_label === "official").length;
  const primaryCount = sources.filter((source) => source.reliability_label === "primary_source").length;
  const staleCount = sources.filter((source) => source.freshness_label === "possibly_stale").length;

  if (officialCount + primaryCount > 0) {
    return `${officialCount + primaryCount} source(s) look strong enough for Carnos to cite carefully.`;
  }

  if (staleCount > 0) {
    return `${staleCount} source(s) may need freshness review before Carnos relies on them.`;
  }

  return "Carnos has no strong current-info source signal yet.";
}

export function CarnosCurrentInfoIntegrationPanel({
  data,
  sources,
  candidates,
}: CarnosCurrentInfoIntegrationPanelProps) {
  const summary = data.summary;
  const pendingCandidates = candidates.filter(
    (candidate) => candidate.candidate_status === "pending_review",
  );

  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Phase 16K</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Carnos current-info awareness</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Read-only bridge showing what current-info context Carnos may reference later.
            This panel does not browse, save, approve, reject, or convert sources into memory.
          </p>
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
          read-only bridge
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sources</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.recent_source_count}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Visible source records for Carnos context.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.pending_review_candidate_count}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Needs human review before saving.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Blocked</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {summary.blocked_query_count + summary.blocked_candidate_count}
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Privacy, policy, duplicate, or quality blocks.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Audit</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.audit_event_count}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Traceable current-info events.</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-cyan-100">Carnos guidance:</span>{" "}
        {topSourceSignal(sources)} Pending candidates stay review-only until a later approved save flow.
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Recent source context</h3>
          <div className="mt-4 grid gap-3">
            {sources.slice(0, 4).map((source) => (
              <div key={source.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                    {formatLabel(source.source_kind)}
                  </span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-cyan-100">
                    {formatLabel(source.reliability_label)}
                  </span>
                  <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-amber-100">
                    {formatLabel(source.freshness_label)}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">
                  {source.title || source.domain || "Untitled source"}
                </p>
                <p className="mt-2 text-xs text-slate-500">Retrieved {formatDate(source.retrieved_at ?? source.created_at)}</p>
              </div>
            ))}
            {sources.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
                No current-info source context yet.
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Review-only candidate context</h3>
          <div className="mt-4 grid gap-3">
            {pendingCandidates.slice(0, 4).map((candidate) => (
              <div key={candidate.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-amber-100">
                    {formatLabel(candidate.candidate_status)}
                  </span>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                    {formatLabel(candidate.candidate_type)}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">
                  {candidate.suggested_destination_table || "No destination suggested"}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Missing: {candidate.missing_fields.length} · Privacy warnings: {candidate.privacy_warnings.length}
                </p>
              </div>
            ))}
            {pendingCandidates.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
                No pending current-info candidates for Carnos to mention.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export const PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_BOUNDARY =
  "Phase 16K gives Carnos read-only current-info awareness and cannot browse, fetch, write, approve, reject, execute, or convert current-info candidates to memory.";
