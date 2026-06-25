import {
  DataList,
  EmptyState,
  LearningProjectSummaryPanel,
  MetricTile,
  SectionCard,
  StatusPill,
  type DataListItem,
} from "@/components/dashboard";
import type { LearningProjectDashboardDataResult } from "@/lib/dashboard";
import { ProjectBuildLogDetailPanel } from "@/components/dashboard/learning-project-detail-panels";
import type {
  ProjectBugRow,
  ProjectLinkRow,
  ProjectMilestoneRow,
  ProjectReleaseRow,
  ProjectRow,
  ProjectTestRow,
} from "@/types/database";

interface ProjectBuilderDashboardV1Props {
  data: LearningProjectDashboardDataResult;
  projects: ProjectRow[];
  milestones: ProjectMilestoneRow[];
  bugs: ProjectBugRow[];
  tests: ProjectTestRow[];
  releases: ProjectReleaseRow[];
  links: ProjectLinkRow[];
  readErrors?: string[];
}

type UnknownRecord = Record<string, unknown>;

function readString(row: UnknownRecord, key: string, fallback = "Not set"): string {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readBoolean(row: UnknownRecord, key: string): boolean | null {
  const value = row[key];

  if (typeof value === "boolean") {
    return value;
  }

  return null;
}

function formatDate(value: unknown): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "Not set";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusTone(status: string): "neutral" | "success" | "warning" | "danger" | "info" {
  if (["active", "shipped", "completed", "resolved", "passed", "released", "live"].includes(status)) {
    return "success";
  }

  if (["blocked", "open", "investigating", "failing", "needs_review"].includes(status)) {
    return "warning";
  }

  if (["failed", "critical", "cancelled", "abandoned", "broken"].includes(status)) {
    return "danger";
  }

  if (["planned", "draft", "queued", "in_progress"].includes(status)) {
    return "info";
  }

  return "neutral";
}

function ProjectList({ projects }: { projects: ProjectRow[] }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet."
        description="Projects will appear here after Phase 9 project records exist. This dashboard is read-only."
      />
    );
  }

  const items: DataListItem[] = projects.slice(0, 10).map((item) => {
    const row = item as UnknownRecord;
    const status = readString(row, "status");
    const priority = readString(row, "priority");
    const projectType = readString(row, "project_type");

    return {
      id: item.id,
      title: item.title,
      description:
        readString(row, "description", "") ||
        readString(row, "summary", "") ||
        "No project description yet.",
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>Type: {projectType}</span>
          <span>Priority: {priority}</span>
          <span>Goal: {readString(row, "goal_id")}</span>
          <span>Updated: {formatDate(row.updated_at)}</span>
        </div>
      ),
      trailing: <StatusPill label={status} tone={statusTone(status)} />,
    };
  });

  return (
    <DataList
      items={items}
      emptyState={
        <EmptyState
          title="No projects yet."
          description="Projects will appear here after records exist."
        />
      }
    />
  );
}

function MilestoneList({ milestones }: { milestones: ProjectMilestoneRow[] }) {
  if (milestones.length === 0) {
    return (
      <EmptyState
        title="No milestones yet."
        description="Milestones, deadlines, and completion state will appear here after project planning records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {milestones.slice(0, 8).map((item) => {
        const row = item as UnknownRecord;
        const status = readString(row, "status");
        const priority = readString(row, "priority");

        return (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {readString(row, "description", "") || "No milestone description yet."}
                </p>
                <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                  <p>Project: {readString(row, "project_id")}</p>
                  <p>Priority: {priority}</p>
                  <p>Due: {formatDate(row.due_date)}</p>
                  <p>Completed: {formatDate(row.completed_at)}</p>
                </div>
              </div>
              <StatusPill label={status} tone={statusTone(status)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QualityPanel({
  bugs,
  tests,
}: {
  bugs: ProjectBugRow[];
  tests: ProjectTestRow[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Bug queue" eyebrow="quality" description="Open project issues and severity pressure.">
        {bugs.length === 0 ? (
          <EmptyState
            title="No project bugs yet."
            description="Bugs and issue records will appear here after project quality records exist."
          />
        ) : (
          <div className="grid gap-3">
            {bugs.slice(0, 8).map((item) => {
              const row = item as UnknownRecord;
              const status = readString(row, "status");
              const severity = readString(row, "severity");

              return (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Project: {readString(row, "project_id")} · Opened: {formatDate(row.opened_at)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Severity: {severity}
                      </p>
                    </div>
                    <StatusPill label={status} tone={statusTone(status)} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Test runs" eyebrow="evidence" description="Read-only quality checks and pass/fail evidence.">
        {tests.length === 0 ? (
          <EmptyState
            title="No project tests yet."
            description="Test runs, QA checks, and validation records will appear here after records exist."
          />
        ) : (
          <div className="grid gap-3">
            {tests.slice(0, 8).map((item) => {
              const row = item as UnknownRecord;
              const status = readString(row, "status");
              const passed = readBoolean(row, "passed");

              return (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Type: {readString(row, "test_type")} · Run: {formatDate(row.run_at)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Project: {readString(row, "project_id")}
                      </p>
                    </div>
                    <StatusPill
                      label={passed === true ? "passed" : status}
                      tone={passed === true ? "success" : statusTone(status)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function ReleaseAndLinksPanel({
  releases,
  links,
}: {
  releases: ProjectReleaseRow[];
  links: ProjectLinkRow[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Releases" eyebrow="ship" description="Project release history and shipping state.">
        {releases.length === 0 ? (
          <EmptyState
            title="No releases yet."
            description="Release records will appear here after projects ship or versioned milestones are recorded."
          />
        ) : (
          <div className="grid gap-3">
            {releases.slice(0, 8).map((item) => {
              const row = item as UnknownRecord;
              const status = readString(row, "status");

              return (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Version: {readString(row, "version")} · Released: {formatDate(row.released_at)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Project: {readString(row, "project_id")}
                      </p>
                    </div>
                    <StatusPill label={status} tone={statusTone(status)} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Project links" eyebrow="proof" description="GitHub, demo, docs, portfolio, paper, and evidence links.">
        {links.length === 0 ? (
          <EmptyState
            title="No project links yet."
            description="Repositories, demos, docs, and portfolio links will appear here after link records exist."
          />
        ) : (
          <div className="grid gap-3">
            {links.slice(0, 8).map((item) => {
              const row = item as UnknownRecord;
              const url = readString(row, "url", "");

              return (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Type: {readString(row, "link_type")} · Project: {readString(row, "project_id")}
                      </p>
                      <p className="mt-1 truncate text-xs text-cyan-200/80">
                        {url || "No URL"}
                      </p>
                    </div>
                    <StatusPill label="link" tone="info" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

export function ProjectBuilderDashboardV1({
  data,
  projects,
  milestones,
  bugs,
  tests,
  releases,
  links,
  readErrors = [],
}: ProjectBuilderDashboardV1Props) {
  const summary = data.projects;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 9 Project Builder
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Project Builder Dashboard
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Read-only project shipping surface for portfolio projects, milestones, releases, bugs,
          tests, links, demos, and evidence. This screen only reads records.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricTile
            label="Projects"
            value={summary.project_count}
            description={`${summary.active_project_count} active projects.`}
          />
          <MetricTile
            label="Shipped"
            value={summary.shipped_project_count}
            description="Projects marked shipped."
          />
          <MetricTile
            label="Milestones"
            value={summary.milestone_count}
            description={`${summary.completed_milestone_count} completed milestones.`}
          />
          <MetricTile
            label="Open bugs"
            value={summary.open_bug_count}
            description={`${summary.critical_bug_count} critical bugs.`}
          />
        </div>

        {readErrors.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm font-semibold text-amber-200">Some project reads failed.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-amber-100/80">
              {readErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <LearningProjectSummaryPanel
        title="Project shipping summary"
        description="Aggregated read-only metrics from Phase 9 project tables."
        emptyTitle="No project metrics yet."
        emptyDescription="Project metrics will appear once Phase 9 project records exist."
        metrics={[
          {
            label: "Tests",
            value: summary.test_count,
            description: `${summary.passing_test_count} passing tests.`,
            tone: "success",
          },
          {
            label: "Releases",
            value: summary.release_count,
            description: "Versioned project releases.",
            tone: "info",
          },
          {
            label: "Links",
            value: summary.project_link_count,
            description: "Project proof, demo, documentation, and repository links.",
            tone: "neutral",
          },
        ]}
      />

      <SectionCard
        title="Projects"
        eyebrow="portfolio"
        description="Project records, goal linkage, status, priority, and updated state."
      >
        <ProjectList projects={projects} />
      </SectionCard>

      <SectionCard
        title="Milestones"
        eyebrow="execution"
        description="Project milestones, deadlines, completion state, and priority."
      >
        <MilestoneList milestones={milestones} />
      </SectionCard>

      <QualityPanel bugs={bugs} tests={tests} />

      <ReleaseAndLinksPanel releases={releases} links={links} />

      <ProjectBuildLogDetailPanel
        projects={projects}
        milestones={milestones}
        bugs={bugs}
        tests={tests}
        releases={releases}
      />
    </div>
  );
}
