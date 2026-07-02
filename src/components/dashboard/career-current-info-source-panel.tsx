import type { CurrentInfoDashboardDataResult } from "@/lib/dashboard";
import type { WebSourceCandidateRow, WebSourceRow } from "@/lib/repositories";

type CareerCurrentInfoSourcePanelProps = {
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

function isCareerSource(source: WebSourceRow) {
  return [
    "job_posting",
    "company_page",
    "official_resource",
    "general_resource",
  ].includes(source.source_kind);
}

function isCareerCandidate(candidate: WebSourceCandidateRow) {
  return [
    "create_job_application_from_web_source_candidate",
    "create_task_from_web_source_candidate",
    "create_goal_from_web_source_candidate",
    "save_web_source_to_knowledge_candidate",
  ].includes(candidate.candidate_type);
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

function sourceStrengthLabel(sources: WebSourceRow[]) {
  const official = sources.filter((source) => source.reliability_label === "official").length;
  const primary = sources.filter((source) => source.reliability_label === "primary_source").length;
  const jobPostings = sources.filter((source) => source.source_kind === "job_posting").length;

  if (jobPostings > 0) {
    return `${jobPostings} job posting source(s) are visible for career review.`;
  }

  if (official + primary > 0) {
    return `${official + primary} official/primary source(s) are visible for career decisions.`;
  }

  return "No strong career web-source signal is available yet.";
}

export function CareerCurrentInfoSourcePanel({
  data,
  sources,
  candidates,
}: CareerCurrentInfoSourcePanelProps) {
  const summary = data.summary;
  const careerSources = sources.filter(isCareerSource);
  const careerCandidates = candidates.filter(isCareerCandidate);
  const pendingCareerCandidates = careerCandidates.filter(
    (candidate) => candidate.candidate_status === "pending_review",
  );

  return (
    <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/70">Phase 16L</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Career web-source intelligence</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Read-only career integration for job postings, company pages, official sources,
            and review-only candidates. This does not apply, save, approve, reject, or mutate career records.
          </p>
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
          read-only career sources
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Career sources</p>
          <p className="mt-3 text-3xl font-semibold text-white">{careerSources.length}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Job/company/current-info sources.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending review</p>
          <p className="mt-3 text-3xl font-semibold text-white">{pendingCareerCandidates.length}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Career candidates awaiting human review.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Approved</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.approved_candidate_count}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Approved current-info candidates.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Blocked</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {summary.blocked_query_count + summary.blocked_candidate_count}
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Privacy, duplicate, or quality blocked items.</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-emerald-100">Career guidance:</span>{" "}
        {sourceStrengthLabel(careerSources)} Use this as evidence visibility only; application creation
        and task creation remain confirmation-first in later phases.
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Job/company source context</h3>
          <div className="mt-4 grid gap-3">
            {careerSources.slice(0, 5).map((source) => (
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
                  {source.title || source.domain || "Untitled career source"}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                  {source.summary || source.description || source.excerpt || "No source summary captured yet."}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {source.domain || "unknown domain"} · Retrieved {formatDate(source.retrieved_at ?? source.created_at)}
                </p>
              </div>
            ))}
            {careerSources.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
                No career web sources have been captured yet.
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Career review candidates</h3>
          <div className="mt-4 grid gap-3">
            {careerCandidates.slice(0, 5).map((candidate) => (
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
                  Missing fields: {candidate.missing_fields.length} · Duplicate hints captured · Privacy warnings:{" "}
                  {candidate.privacy_warnings.length}
                </p>
                <p className="mt-2 text-xs text-slate-500">Created {formatDate(candidate.created_at)}</p>
              </div>
            ))}
            {careerCandidates.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
                No career current-info candidates are waiting for review.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export const PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_BOUNDARY =
  "Phase 16L gives Career read-only current-info source visibility and cannot browse, fetch, write, apply, approve, reject, execute, or convert web-source candidates.";
