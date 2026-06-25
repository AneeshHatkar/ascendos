import { EmptyState, MetricTile, SectionCard } from "@/components/dashboard";

type UnknownRecord = Record<string, unknown>;

type ResearchBoundarySurface = "research_lab" | "research_stanford";

function readString(row: UnknownRecord, key: string, fallback = ""): string {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function linkedCount(rows: UnknownRecord[], keys: string[]): number {
  return rows.reduce((count, row) => {
    return count + keys.filter((key) => readString(row, key).length > 0).length;
  }, 0);
}

function uniqueIds(rows: UnknownRecord[], key: string): string[] {
  return [
    ...new Set(
      rows
        .map((row) => readString(row, key))
        .filter((value) => value.length > 0),
    ),
  ].slice(0, 6);
}

function IdLine({ label, ids }: { label: string; ids: string[] }) {
  return (
    <p>
      {label}: {ids.length === 0 ? "None linked yet" : ids.join(", ")}
    </p>
  );
}

export function ResearchProofLinkagePanel({
  ideas = [],
  citations = [],
  claims = [],
  experiments = [],
  results = [],
  papers = [],
}: {
  ideas?: UnknownRecord[];
  citations?: UnknownRecord[];
  claims?: UnknownRecord[];
  experiments?: UnknownRecord[];
  results?: UnknownRecord[];
  papers?: UnknownRecord[];
}) {
  const researchRows = [...ideas, ...citations, ...claims, ...experiments, ...results, ...papers];

  const operatingLinks = linkedCount(researchRows, [
    "project_id",
    "goal_id",
    "task_id",
    "proof_item_id",
    "resume_bullet_id",
  ]);
  const citationLinks = linkedCount(citations, [
    "literature_item_id",
    "research_idea_id",
    "research_claim_id",
    "research_paper_id",
    "paper_version_id",
  ]);
  const experimentLinks = linkedCount([...experiments, ...results], [
    "research_idea_id",
    "research_question_id",
    "research_experiment_id",
    "project_id",
    "paper_version_id",
  ]);
  const paperLinks = linkedCount(papers, [
    "primary_research_idea_id",
    "project_id",
    "target_venue_id",
  ]);

  return (
    <SectionCard
      title="Research proof and linkage visibility"
      eyebrow="10.18"
      description="Read-only view of how research records connect to ideas, literature, claims, experiments, results, papers, projects, goals, proof, and resume evidence."
    >
      {researchRows.length === 0 ? (
        <EmptyState
          title="No research linkage records yet."
          description="Research linkage metrics will appear after Phase 10 research records exist."
        />
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-4">
            <MetricTile
              label="Operating links"
              value={operatingLinks}
              description="Links into projects, goals, tasks, proof, or resume evidence."
            />
            <MetricTile
              label="Citation links"
              value={citationLinks}
              description="Citation edges across literature, claims, papers, and versions."
            />
            <MetricTile
              label="Experiment links"
              value={experimentLinks}
              description="Experiment/result links into ideas, questions, projects, and paper versions."
            />
            <MetricTile
              label="Paper links"
              value={paperLinks}
              description="Paper links into ideas, projects, and target venues."
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-slate-500">
            <IdLine label="Project ids" ids={uniqueIds(researchRows, "project_id")} />
            <IdLine label="Goal ids" ids={uniqueIds(researchRows, "goal_id")} />
            <IdLine label="Proof ids" ids={uniqueIds(researchRows, "proof_item_id")} />
            <IdLine label="Paper ids" ids={uniqueIds([...citations, ...claims], "research_paper_id")} />
            <IdLine label="Paper version ids" ids={uniqueIds([...citations, ...claims, ...results], "paper_version_id")} />
          </div>
        </div>
      )}
    </SectionCard>
  );
}

export function StanfordProofLinkagePanel({
  universities = [],
  labs = [],
  professors = [],
  applicationAssets = [],
  sopVersions = [],
  recommendationTargets = [],
}: {
  universities?: UnknownRecord[];
  labs?: UnknownRecord[];
  professors?: UnknownRecord[];
  applicationAssets?: UnknownRecord[];
  sopVersions?: UnknownRecord[];
  recommendationTargets?: UnknownRecord[];
}) {
  const targetRows = [
    ...universities,
    ...labs,
    ...professors,
    ...applicationAssets,
    ...sopVersions,
    ...recommendationTargets,
  ];

  const universityLinks = linkedCount([...labs, ...professors, ...applicationAssets, ...sopVersions, ...recommendationTargets], [
    "target_university_id",
  ]);
  const labLinks = linkedCount(professors, ["target_lab_id"]);
  const researchLinks = linkedCount([...labs, ...professors], [
    "related_research_idea_id",
    "related_project_id",
    "project_id",
    "research_idea_id",
  ]);
  const applicationLinks = linkedCount([...applicationAssets, ...sopVersions, ...recommendationTargets], [
    "target_university_id",
    "target_professor_id",
    "proof_item_id",
  ]);

  return (
    <SectionCard
      title="Stanford proof and target-fit linkage"
      eyebrow="10.18"
      description="Read-only view of how PhD targets connect to universities, labs, professors, research ideas, projects, assets, SOPs, recommendation targets, and proof evidence."
    >
      {targetRows.length === 0 ? (
        <EmptyState
          title="No Stanford/PhD linkage records yet."
          description="Target-fit linkage metrics will appear after university, lab, professor, asset, SOP, or recommendation records exist."
        />
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-4">
            <MetricTile
              label="University links"
              value={universityLinks}
              description="Records attached to target universities."
            />
            <MetricTile
              label="Lab links"
              value={labLinks}
              description="Professor records attached to target labs."
            />
            <MetricTile
              label="Research links"
              value={researchLinks}
              description="Target records linked to research ideas or projects."
            />
            <MetricTile
              label="Application links"
              value={applicationLinks}
              description="Assets, SOPs, recommendations, or proof-linked application records."
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-slate-500">
            <IdLine label="University ids" ids={uniqueIds(targetRows, "target_university_id")} />
            <IdLine label="Lab ids" ids={uniqueIds(professors, "target_lab_id")} />
            <IdLine label="Professor ids" ids={uniqueIds([...applicationAssets, ...recommendationTargets], "target_professor_id")} />
            <IdLine label="Research idea ids" ids={uniqueIds([...labs, ...professors], "related_research_idea_id")} />
            <IdLine label="Project ids" ids={uniqueIds([...labs, ...professors], "related_project_id")} />
          </div>
        </div>
      )}
    </SectionCard>
  );
}

export function ResearchStateBoundaryPanel({
  surface,
  readErrors = [],
}: {
  surface: ResearchBoundarySurface;
  readErrors?: string[];
}) {
  const label = surface === "research_lab" ? "Research Lab" : "Research Stanford";

  return (
    <SectionCard
      title={`${label} privacy and safe-write boundary`}
      eyebrow="10.19"
      description="Read-state and privacy language for Phase 10 research surfaces."
    >
      <div className="grid gap-4 text-sm leading-6 text-slate-400 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Empty state</p>
          <p className="mt-2">
            Empty panels mean no matching records exist yet. They do not mean the system failed,
            and they must not trigger automatic creation of research, professor, or application records.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Loading state</p>
          <p className="mt-2">
            Phase 10 research routes are server-rendered after authenticated reads complete. Loading
            states must stay visibility-only and must not start background jobs.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Error state</p>
          <p className="mt-2">
            Read errors are shown inline. Errors must not trigger automatic retries, SQL writes,
            paper submission, professor outreach, scraping, email, or Python/ML execution.
          </p>
          {readErrors.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-rose-200">
              {readErrors.slice(0, 5).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Privacy boundary</p>
          <p className="mt-2">
            Research, PhD, professor, application, SOP, and recommendation data is private to the
            authenticated user. This dashboard reads existing records only and does not export,
            send, scrape, submit, or modify private data.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
