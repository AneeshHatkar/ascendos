import { getCurrentInfoDashboardDataSummary, type CurrentInfoDashboardDataResult } from "@/lib/dashboard";
import {
  listWebSourceCandidates,
  listWebSources,
  type WebSourceCandidateRow,
  type WebSourceRow,
} from "@/lib/repositories";

type ResearchCurrentInfoSourcePanelProps = {
  data: CurrentInfoDashboardDataResult;
  sources: WebSourceRow[];
  candidates: WebSourceCandidateRow[];
  surfaceLabel?: string;
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

function isResearchSource(source: WebSourceRow) {
  return [
    "paper",
    "lab_page",
    "professor_page",
    "academic",
    "official_resource",
    "documentation",
    "learning_resource",
    "general_resource",
  ].includes(source.source_kind);
}

function isResearchCandidate(candidate: WebSourceCandidateRow) {
  return [
    "create_research_literature_item_from_web_source_candidate",
    "create_research_citation_from_web_source_candidate",
    "create_target_lab_from_web_source_candidate",
    "create_target_professor_from_web_source_candidate",
    "save_web_source_to_knowledge_candidate",
    "create_task_from_web_source_candidate",
    "create_goal_from_web_source_candidate",
  ].includes(candidate.candidate_type);
}

function researchSignalLabel(sources: WebSourceRow[]) {
  const papers = sources.filter((source) => source.source_kind === "paper").length;
  const labs = sources.filter((source) => source.source_kind === "lab_page").length;
  const professors = sources.filter((source) => source.source_kind === "professor_page").length;
  const academic = sources.filter((source) => source.reliability_label === "academic").length;

  if (papers > 0) {
    return `${papers} paper source(s) are visible for literature review.`;
  }

  if (labs + professors > 0) {
    return `${labs + professors} lab/professor source(s) are visible for target research planning.`;
  }

  if (academic > 0) {
    return `${academic} academic source(s) are visible for careful citation review.`;
  }

  return "No strong research current-info source signal is available yet.";
}

export function ResearchCurrentInfoSourcePanel({
  data,
  sources,
  candidates,
  surfaceLabel = "Research",
}: ResearchCurrentInfoSourcePanelProps) {
  const summary = data.summary;
  const researchSources = sources.filter(isResearchSource);
  const researchCandidates = candidates.filter(isResearchCandidate);
  const pendingResearchCandidates = researchCandidates.filter(
    (candidate) => candidate.candidate_status === "pending_review",
  );

  return (
    <section className="rounded-3xl border border-violet-400/20 bg-violet-400/[0.04] p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-violet-200/70">Phase 16M</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {surfaceLabel} current-info intelligence
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Read-only visibility for papers, labs, professors, Stanford targets, citations,
            and research review candidates. This does not save, cite, approve, reject, browse,
            or mutate research records.
          </p>
        </div>
        <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
          read-only research sources
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Research sources</p>
          <p className="mt-3 text-3xl font-semibold text-white">{researchSources.length}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Paper/lab/professor source visibility.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending review</p>
          <p className="mt-3 text-3xl font-semibold text-white">{pendingResearchCandidates.length}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Research candidates awaiting review.</p>
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
        <span className="font-semibold text-violet-100">Research guidance:</span>{" "}
        {researchSignalLabel(researchSources)} Treat all sources as evidence previews until a later
        human-approved save/citation flow.
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Paper / lab / professor context</h3>
          <div className="mt-4 grid gap-3">
            {researchSources.slice(0, 5).map((source) => (
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
                  {source.title || source.domain || "Untitled research source"}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                  {source.summary || source.description || source.excerpt || "No source summary captured yet."}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {source.domain || "unknown domain"} · Retrieved {formatDate(source.retrieved_at ?? source.created_at)}
                </p>
              </div>
            ))}
            {researchSources.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
                No research web sources have been captured yet.
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Research review candidates</h3>
          <div className="mt-4 grid gap-3">
            {researchCandidates.slice(0, 5).map((candidate) => (
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
                  Missing fields: {candidate.missing_fields.length} · Reliability warnings:{" "}
                  {candidate.reliability_warnings.length} · Freshness warnings: {candidate.freshness_warnings.length}
                </p>
                <p className="mt-2 text-xs text-slate-500">Created {formatDate(candidate.created_at)}</p>
              </div>
            ))}
            {researchCandidates.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
                No research current-info candidates are waiting for review.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export const PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_BOUNDARY =
  "Phase 16M gives Research and Stanford surfaces read-only current-info source visibility and cannot browse, fetch, write, cite, approve, reject, execute, or convert web-source candidates.";

type ResearchCurrentInfoSourceServerPanelProps = {
  userId: string;
  surfaceLabel?: string;
};

export async function ResearchCurrentInfoSourceServerPanel({
  userId,
  surfaceLabel = "Research",
}: ResearchCurrentInfoSourceServerPanelProps) {
  const [
    data,
    paperSources,
    labSources,
    professorSources,
    candidates,
  ] = await Promise.all([
    getCurrentInfoDashboardDataSummary(userId),
    listWebSources(userId, { sourceKind: "paper", limit: 30 }),
    listWebSources(userId, { sourceKind: "lab_page", limit: 30 }),
    listWebSources(userId, { sourceKind: "professor_page", limit: 30 }),
    listWebSourceCandidates(userId, { limit: 50 }),
  ]);

  const sources = [
    ...paperSources.data,
    ...labSources.data,
    ...professorSources.data,
  ];

  return (
    <ResearchCurrentInfoSourcePanel
      data={data}
      sources={sources}
      candidates={candidates.data}
      surfaceLabel={surfaceLabel}
    />
  );
}
