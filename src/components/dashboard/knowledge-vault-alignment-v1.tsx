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
import {
  LearningProjectCrossLinks,
  LearningProjectStateBoundaryPanel,
} from "@/components/dashboard/learning-project-linkage-panels";
import type {
  ProjectLinkRow,
  ProjectRow,
  SkillPathRow,
  SkillRow,
} from "@/types/database";

interface KnowledgeVaultAlignmentV1Props {
  data: LearningProjectDashboardDataResult;
  skillPaths: SkillPathRow[];
  skills: SkillRow[];
  projects: ProjectRow[];
  projectLinks: ProjectLinkRow[];
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
  if (["active", "mastered", "shipped", "completed", "published", "live"].includes(status)) {
    return "success";
  }

  if (["blocked", "paused", "stale", "needs_review"].includes(status)) {
    return "warning";
  }

  if (["failed", "cancelled", "abandoned", "archived"].includes(status)) {
    return "danger";
  }

  if (["planned", "draft", "not_started", "in_progress"].includes(status)) {
    return "info";
  }

  return "neutral";
}

function SkillKnowledgeSources({
  skillPaths,
  skills,
}: {
  skillPaths: SkillPathRow[];
  skills: SkillRow[];
}) {
  const items: DataListItem[] = [
    ...skillPaths.slice(0, 5).map((item) => {
      const row = item as UnknownRecord;
      const status = readString(row, "status");

      return {
        id: `skill-path-${item.id}`,
        title: item.title,
        description:
          readString(row, "description", "") ||
          "Skill path source for future knowledge retrieval.",
        meta: (
          <div className="flex flex-wrap gap-2">
            <span>Source: skill_paths</span>
            <span>Priority: {readString(row, "priority")}</span>
            <span>Updated: {formatDate(row.updated_at)}</span>
          </div>
        ),
        trailing: <StatusPill label={status} tone={statusTone(status)} />,
      };
    }),
    ...skills.slice(0, 5).map((item) => {
      const row = item as UnknownRecord;
      const status = readString(row, "status");

      return {
        id: `skill-${item.id}`,
        title: item.title,
        description:
          readString(row, "description", "") ||
          "Skill record source for future concept memory and retrieval.",
        meta: (
          <div className="flex flex-wrap gap-2">
            <span>Source: skills</span>
            <span>Category: {readString(row, "category")}</span>
            <span>Mastery: {readString(row, "mastery_score", "Not scored")}</span>
          </div>
        ),
        trailing: <StatusPill label={status} tone={statusTone(status)} />,
      };
    }),
  ];

  return (
    <DataList
      items={items}
      emptyState={
        <EmptyState
          title="No learning knowledge sources yet."
          description="Skill paths and skill records will appear here as future knowledge sources after Phase 9 data exists."
        />
      }
    />
  );
}

function ProjectKnowledgeSources({
  projects,
  projectLinks,
}: {
  projects: ProjectRow[];
  projectLinks: ProjectLinkRow[];
}) {
  const items: DataListItem[] = [
    ...projects.slice(0, 5).map((item) => {
      const row = item as UnknownRecord;
      const status = readString(row, "status");

      return {
        id: `project-${item.id}`,
        title: item.title,
        description:
          readString(row, "description", "") ||
          readString(row, "summary", "") ||
          "Project record source for future proof, build-log, and portfolio retrieval.",
        meta: (
          <div className="flex flex-wrap gap-2">
            <span>Source: projects</span>
            <span>Type: {readString(row, "project_type")}</span>
            <span>Updated: {formatDate(row.updated_at)}</span>
          </div>
        ),
        trailing: <StatusPill label={status} tone={statusTone(status)} />,
      };
    }),
    ...projectLinks.slice(0, 5).map((item) => {
      const row = item as UnknownRecord;

      return {
        id: `project-link-${item.id}`,
        title: item.label,
        description:
          readString(row, "url", "") ||
          "Project link source for future external evidence retrieval.",
        meta: (
          <div className="flex flex-wrap gap-2">
            <span>Source: project_links</span>
            <span>Type: {readString(row, "link_type")}</span>
            <span>Updated: {formatDate(row.updated_at)}</span>
          </div>
        ),
        trailing: <StatusPill label="link" tone="info" />,
      };
    }),
  ];

  return (
    <DataList
      items={items}
      emptyState={
        <EmptyState
          title="No project knowledge sources yet."
          description="Projects, repositories, demos, documents, and evidence links will appear here after Phase 9 project records exist."
        />
      }
    />
  );
}

export function KnowledgeVaultAlignmentV1({
  data,
  skillPaths,
  skills,
  projects,
  projectLinks,
  readErrors = [],
}: KnowledgeVaultAlignmentV1Props) {
  const learning = data.learning;
  const project = data.projects;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 9 Knowledge Alignment
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Knowledge Vault
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Read-only alignment layer showing how learning and project records become future knowledge
          sources. This is not the full Phase 15 memory/RAG system yet. No embeddings, ingestion,
          autonomous memory writes, or retrieval mutation are active here.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricTile
            label="Skill paths"
            value={learning.skill_path_count}
            description="Learning paths available as future knowledge anchors."
          />
          <MetricTile
            label="Skills"
            value={learning.skill_count}
            description="Skill records available as future concept nodes."
          />
          <MetricTile
            label="Projects"
            value={project.project_count}
            description="Projects available as future proof/build sources."
          />
          <MetricTile
            label="Project links"
            value={project.project_link_count}
            description="External evidence links available for later retrieval."
          />
        </div>

        {readErrors.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm font-semibold text-amber-200">Some knowledge alignment reads failed.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-amber-100/80">
              {readErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <LearningProjectSummaryPanel
        title="Future knowledge source summary"
        description="Phase 9 learning and project records are visible here as read-only source candidates for later memory/RAG phases."
        emptyTitle="No knowledge source metrics yet."
        emptyDescription="Learning and project source metrics will appear once Phase 9 records exist."
        metrics={[
          {
            label: "Learning sessions",
            value: learning.learning_session_count,
            description: "Potential future session notes and learning evidence.",
            tone: "info",
          },
          {
            label: "Skill progress",
            value: learning.skill_progress_count,
            description: "Potential future mastery timeline evidence.",
            tone: "success",
          },
          {
            label: "Releases",
            value: project.release_count,
            description: "Potential future shipping milestones and portfolio memory.",
            tone: "neutral",
          },
        ]}
      />

      <SectionCard
        title="Learning knowledge sources"
        eyebrow="learning"
        description="Skill paths and skill records that can later feed memory, concepts, and retrieval once Phase 15 exists."
      >
        <SkillKnowledgeSources skillPaths={skillPaths} skills={skills} />
      </SectionCard>

      <SectionCard
        title="Project knowledge sources"
        eyebrow="projects"
        description="Projects and project links that can later feed build logs, portfolio evidence, and retrieval once Phase 15 exists."
      >
        <ProjectKnowledgeSources projects={projects} projectLinks={projectLinks} />
      </SectionCard>

      <LearningProjectStateBoundaryPanel surface="knowledge" />

      <LearningProjectCrossLinks activeRoute="/knowledge" />

      <SectionCard
        title="Deferred memory/RAG boundary"
        eyebrow="safety"
        description="This route is aligned with Phase 9 only. Full memory, embeddings, retrieval, web indexing, and deletion/export controls stay deferred."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-sm font-semibold text-slate-100">Active now</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Read-only visibility into Phase 9 learning and project source records.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-sm font-semibold text-slate-100">Deferred</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Memory approval, RAG, embeddings, ingestion, retrieval ranking, export, and delete controls.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
