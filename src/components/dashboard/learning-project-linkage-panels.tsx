import { ProposedActionReviewCard } from "@/components/actions";
import {
  CrossDashboardLinks,
  EmptyState,
  MetricTile,
  SectionCard,
} from "@/components/dashboard";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";
import type { CanonicalRoute } from "@/lib/routes";
import type {
  LearningSessionRow,
  ProjectLinkRow,
  ProjectReleaseRow,
  ProjectRow,
  QuizAttemptRow,
  SkillProgressRow,
} from "@/types/database";

type UnknownRecord = Record<string, unknown>;

const LEARNING_PROJECT_LINKS = [
  {
    label: "Learning",
    route: "/learning" as CanonicalRoute,
    description: "Skill paths, sessions, quizzes, attempts, and mastery progress.",
  },
  {
    label: "Projects",
    route: "/projects" as CanonicalRoute,
    description: "Portfolio projects, milestones, bugs, tests, releases, and proof links.",
  },
  {
    label: "Knowledge",
    route: "/knowledge" as CanonicalRoute,
    description: "Learning/project source records aligned for future memory and retrieval.",
  },
  {
    label: "Proof",
    route: "/proof" as CanonicalRoute,
    description: "Evidence records that can support skills, projects, resume bullets, and claims.",
  },
  {
    label: "Goals",
    route: "/goals" as CanonicalRoute,
    description: "Execution goals that learning and projects can support.",
  },
  {
    label: "Timeline",
    route: "/timeline" as CanonicalRoute,
    description: "Dated operating history and proof timeline.",
  },
  {
    label: "Resume",
    route: "/resume" as CanonicalRoute,
    description: "Resume bullets and proof-backed career packaging.",
  },
  {
    label: "Carnos",
    route: "/carnos" as CanonicalRoute,
    description: "Companion review surface and proposed-action visibility.",
  },
];

const LEARNING_PROJECT_PROPOSALS: ProposedActionContract[] = [
  {
    action_type: "create_task",
    source: "carnos",
    confidence: 0.74,
    reason:
      "Learning and project context may suggest a next execution task, but this dashboard only previews the confirmation shape.",
    payload: {
      title: "Review the next learning/project execution step",
      description:
        "Check learning progress, project build state, proof gaps, and career relevance before deciding whether to save a task.",
      domain: "learning",
      priority: "medium",
      status: "todo",
    },
    evidence_refs: ["skill_paths", "projects", "skill_progress"],
  },
  {
    action_type: "create_goal",
    source: "carnos",
    confidence: 0.69,
    reason:
      "A learning or project milestone could become a goal only after user review and server-owned persistence.",
    payload: {
      title: "Ship a proof-backed learning project milestone",
      description:
        "Connect a skill path, project milestone, and proof record into a concrete execution goal.",
      domain: "projects",
      priority: "high",
      status: "active",
    },
    evidence_refs: ["projects", "project_milestones", "proof_items"],
  },
  {
    action_type: "create_proof_item",
    source: "carnos",
    confidence: 0.71,
    reason:
      "A completed session, quiz, release, or project link may deserve proof capture, but this panel does not persist anything.",
    payload: {
      title: "Capture proof for a learning/project achievement",
      proof_type: "metric",
      description:
        "Attach evidence before using this learning or project achievement in a resume, portfolio, or research claim.",
      goal_id: "review-required",
      task_id: "review-required",
    },
    evidence_refs: ["learning_sessions", "quiz_attempts", "project_releases", "project_links"],
  },
];

function readString(row: UnknownRecord, key: string, fallback = "Not linked"): string {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function linkedCount(rows: UnknownRecord[], keys: string[]) {
  return rows.reduce((count, row) => {
    return count + keys.filter((key) => readString(row, key, "") !== "").length;
  }, 0);
}

function sampleLinkedIds(rows: UnknownRecord[], key: string) {
  const ids = rows
    .map((row) => readString(row, key, ""))
    .filter((value) => value.length > 0);

  return [...new Set(ids)].slice(0, 5);
}

function IdLine({ label, ids }: { label: string; ids: string[] }) {
  return (
    <p>
      {label}: {ids.length === 0 ? "None linked yet" : ids.join(", ")}
    </p>
  );
}

export function LearningProjectEvidenceLinkagePanel({
  learningSessions = [],
  quizAttempts = [],
  skillProgress = [],
  projects = [],
  releases = [],
  projectLinks = [],
}: {
  learningSessions?: LearningSessionRow[];
  quizAttempts?: QuizAttemptRow[];
  skillProgress?: SkillProgressRow[];
  projects?: ProjectRow[];
  releases?: ProjectReleaseRow[];
  projectLinks?: ProjectLinkRow[];
}) {
  const learningRows = [
    ...learningSessions,
    ...quizAttempts,
    ...skillProgress,
  ] as UnknownRecord[];
  const projectRows = [
    ...projects,
    ...releases,
    ...projectLinks,
  ] as UnknownRecord[];

  const proofLinks = linkedCount([...learningRows, ...projectRows], [
    "proof_item_id",
    "proof_id",
  ]);
  const goalLinks = linkedCount([...learningRows, ...projectRows], ["goal_id"]);
  const taskLinks = linkedCount([...learningRows, ...projectRows], ["task_id"]);
  const resumeLinks = linkedCount([...learningRows, ...projectRows], [
    "resume_bullet_id",
    "resume_version_id",
  ]);

  return (
    <SectionCard
      title="Learning/project proof and career linkage"
      eyebrow="9.21"
      description="Read-only linkage surface showing how learning and project records can support proof, README, resume, and career evidence."
    >
      <div className="grid gap-4 md:grid-cols-4">
        <MetricTile
          label="Proof links"
          value={proofLinks}
          description="Records linked to proof-style evidence ids."
        />
        <MetricTile
          label="Goal links"
          value={goalLinks}
          description="Records linked to execution goals."
        />
        <MetricTile
          label="Task links"
          value={taskLinks}
          description="Records linked to concrete tasks."
        />
        <MetricTile
          label="Resume links"
          value={resumeLinks}
          description="Records linked to resume or bullet packaging."
        />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-slate-500">
        <IdLine label="Proof ids" ids={sampleLinkedIds([...learningRows, ...projectRows], "proof_item_id")} />
        <IdLine label="Goal ids" ids={sampleLinkedIds([...learningRows, ...projectRows], "goal_id")} />
        <IdLine label="Task ids" ids={sampleLinkedIds([...learningRows, ...projectRows], "task_id")} />
        <IdLine label="Resume ids" ids={sampleLinkedIds([...learningRows, ...projectRows], "resume_bullet_id")} />
      </div>
    </SectionCard>
  );
}

export function LearningProjectOperatingLinkagePanel({
  projects = [],
  skillProgress = [],
  releases = [],
}: {
  projects?: ProjectRow[];
  skillProgress?: SkillProgressRow[];
  releases?: ProjectReleaseRow[];
}) {
  const rows = [...projects, ...skillProgress, ...releases] as UnknownRecord[];

  if (rows.length === 0) {
    return (
      <SectionCard
        title="Goal, task, and timeline linkage"
        eyebrow="9.22"
        description="Read-only operating linkage for Phase 9 records."
      >
        <EmptyState
          title="No operating links yet."
          description="Goal, task, and timeline references will appear after Phase 9 records contain those links."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Goal, task, and timeline linkage"
      eyebrow="9.22"
      description="Shows how learning/project records connect to goals, tasks, and timeline evidence without mutating them."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Goal chain</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Goal references identify which dream-to-proof track a skill or project belongs to.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            {sampleLinkedIds(rows, "goal_id").join(", ") || "No goal ids linked yet."}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Task chain</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Task references identify next actions or execution steps already recorded elsewhere.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            {sampleLinkedIds(rows, "task_id").join(", ") || "No task ids linked yet."}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Timeline chain</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Timeline references remain read-only and should only be created through safe server-owned flows.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            {sampleLinkedIds(rows, "timeline_event_id").join(", ") || "No timeline ids linked yet."}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export function LearningProjectProposedActionVisibilityPanel() {
  return (
    <SectionCard
      title="Learning/project proposed-action visibility"
      eyebrow="9.23 confirmation preview"
      description="Preview-only Carnos proposal cards for learning/project suggestions. No save, cancel, execute, or persistence callbacks are wired here."
    >
      <div className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">
          This panel is visibility only. Python/ML may advise later, but the app must validate,
          the user must confirm, the server must write, SQL must record, and audit logs must exist.
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {LEARNING_PROJECT_PROPOSALS.map((action) => (
            <ProposedActionReviewCard
              key={action.action_type}
              initialAction={action}
              disabled
              saveLabel="Save / Confirm unavailable in Phase 9 dashboard preview"
              cancelLabel="Cancel unavailable in Phase 9 dashboard preview"
              editLabel="Edit payload unavailable in Phase 9 dashboard preview"
              reviewTitle="Learning/project proposal preview"
              validationIssues={[
                "Preview only: this dashboard does not persist proposals.",
                "User confirmation and server-owned execution must remain separate from read dashboards.",
              ]}
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export function LearningProjectStateBoundaryPanel({
  surface,
}: {
  surface: "learning" | "projects" | "knowledge";
}) {
  const label =
    surface === "learning"
      ? "Learning Academy"
      : surface === "projects"
        ? "Project Builder"
        : "Knowledge Vault";

  return (
    <SectionCard
      title={`${label} state and privacy boundary`}
      eyebrow="9.24 empty · loading · error · privacy"
      description="Consistent read-state language for Phase 9 learning/project surfaces."
    >
      <div className="grid gap-4 text-sm leading-6 text-slate-400 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Empty state</p>
          <p className="mt-2">
            Empty panels mean no matching records exist yet, not that the system failed.
            New learning/project records must appear only after safe write flows exist.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Loading state</p>
          <p className="mt-2">
            This surface is server-rendered after authenticated reads complete. Future loading
            skeletons must stay read-only and must not start background jobs.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Error state</p>
          <p className="mt-2">
            Read errors must be shown inline. Errors must not trigger automatic writes,
            scraping, emails, Python/ML execution, or hidden retries.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Privacy boundary</p>
          <p className="mt-2">
            Learning/project data is private to the authenticated user. This dashboard only reads
            existing records and does not expose, export, send, or modify private data.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export function LearningProjectCrossLinks({
  activeRoute,
}: {
  activeRoute: CanonicalRoute;
}) {
  return (
    <CrossDashboardLinks
      activeRoute={activeRoute}
      title="Learning/project system links"
      description="Move between learning, projects, knowledge, proof, goals, timeline, resume, and Carnos review surfaces."
      links={LEARNING_PROJECT_LINKS}
    />
  );
}
