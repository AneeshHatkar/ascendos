import {
  EmptyState,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type {
  LearningSessionRow,
  ProjectBugRow,
  ProjectMilestoneRow,
  ProjectReleaseRow,
  ProjectRow,
  ProjectTestRow,
  QuizAttemptRow,
  QuizRow,
  SkillPathRow,
  SkillProgressRow,
  SkillRow,
} from "@/types/database";

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

function toneForStatus(status: string): "neutral" | "success" | "warning" | "danger" | "info" {
  if (["active", "completed", "mastered", "passed", "shipped", "resolved", "released"].includes(status)) {
    return "success";
  }

  if (["blocked", "open", "investigating", "failing", "needs_review"].includes(status)) {
    return "warning";
  }

  if (["failed", "critical", "cancelled", "abandoned", "archived"].includes(status)) {
    return "danger";
  }

  if (["planned", "draft", "queued", "in_progress", "learning", "practicing"].includes(status)) {
    return "info";
  }

  return "neutral";
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-200">
        {value === null || value === undefined || value === "" ? "Not set" : String(value)}
      </p>
    </div>
  );
}

function DetailNote({
  title,
  text,
}: {
  title: string;
  text: string | null | undefined;
}) {
  if (!text) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

export function SkillPathProgressDetailPanel({
  skillPaths,
  skills,
  progress,
}: {
  skillPaths: SkillPathRow[];
  skills: SkillRow[];
  progress: SkillProgressRow[];
}) {
  const selectedPath = skillPaths[0];
  const selectedSkill = skills[0];
  const recentProgress = progress[0];

  return (
    <SectionCard
      title="Skill path and progress detail"
      eyebrow="9.18 detail"
      description="Read-only focused view for the first available skill path, skill, and progress record."
    >
      {!selectedPath && !selectedSkill && !recentProgress ? (
        <EmptyState
          title="No skill detail records yet."
          description="Skill path, skill, and progress details will appear after learning records exist."
        />
      ) : (
        <div className="grid gap-4">
          {selectedPath ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{selectedPath.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {selectedPath.description ?? "No skill path description yet."}
                  </p>
                </div>
                <StatusPill label={selectedPath.status} tone={toneForStatus(selectedPath.status)} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <DetailRow label="Priority" value={selectedPath.priority} />
                <DetailRow label="Target level" value={selectedPath.target_level} />
                <DetailRow label="Target date" value={formatDate(selectedPath.target_date)} />
                <DetailRow label="Updated" value={formatDate(selectedPath.updated_at)} />
              </div>
            </div>
          ) : null}

          {selectedSkill ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{selectedSkill.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {selectedSkill.description ?? "No skill description yet."}
                  </p>
                </div>
                <StatusPill label={selectedSkill.status} tone={toneForStatus(selectedSkill.status)} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <DetailRow label="Category" value={selectedSkill.category} />
                <DetailRow label="Difficulty" value={selectedSkill.difficulty} />
                <DetailRow label="Mastery" value={selectedSkill.mastery_score} />
                <DetailRow label="Confidence" value={selectedSkill.confidence_score} />
              </div>
            </div>
          ) : null}

          {recentProgress ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {recentProgress.previous_status ?? "none"} → {recentProgress.status}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Recorded: {formatDate(recentProgress.recorded_at)}
                  </p>
                </div>
                <StatusPill label={recentProgress.status} tone={toneForStatus(recentProgress.status)} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <DetailRow label="Skill" value={recentProgress.skill_id} />
                <DetailRow label="Mastery" value={recentProgress.mastery_score} />
                <DetailRow label="Confidence" value={recentProgress.confidence_score} />
                <DetailRow label="Source" value={readString(recentProgress as UnknownRecord, "source_type")} />
              </div>
              <DetailNote title="Progress summary" text={recentProgress.delta_summary} />
            </div>
          ) : null}
        </div>
      )}
    </SectionCard>
  );
}

export function QuizSessionDetailPanel({
  sessions,
  quizzes,
  attempts,
}: {
  sessions: LearningSessionRow[];
  quizzes: QuizRow[];
  attempts: QuizAttemptRow[];
}) {
  const session = sessions[0];
  const quiz = quizzes[0];
  const attempt = attempts[0];

  return (
    <SectionCard
      title="Quiz and session detail"
      eyebrow="9.19 detail"
      description="Read-only focused view for session execution, quiz configuration, and recent attempt outcome."
    >
      {!session && !quiz && !attempt ? (
        <EmptyState
          title="No quiz or session detail yet."
          description="Session, quiz, and attempt detail will appear after learning activity records exist."
        />
      ) : (
        <div className="grid gap-4">
          {session ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{session.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {session.summary ?? session.notes ?? "No session summary yet."}
                  </p>
                </div>
                <StatusPill label={session.status} tone={toneForStatus(session.status)} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <DetailRow label="Type" value={session.session_type} />
                <DetailRow label="Started" value={formatDate(session.started_at)} />
                <DetailRow label="Duration" value={session.duration_minutes} />
                <DetailRow label="Focus" value={session.focus_score} />
              </div>
            </div>
          ) : null}

          {quiz ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{quiz.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {quiz.description ?? "No quiz description yet."}
                  </p>
                </div>
                <StatusPill label={quiz.status} tone={toneForStatus(quiz.status)} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <DetailRow label="Type" value={quiz.quiz_type} />
                <DetailRow label="Difficulty" value={quiz.difficulty} />
                <DetailRow label="Passing score" value={quiz.passing_score} />
                <DetailRow label="Skill" value={quiz.skill_id} />
              </div>
            </div>
          ) : null}

          {attempt ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Score: {attempt.score ?? "Not scored"} / {attempt.max_score ?? "?"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Attempted: {formatDate(attempt.attempted_at)}
                  </p>
                </div>
                <StatusPill
                  label={attempt.passed ? "passed" : attempt.status}
                  tone={attempt.passed ? "success" : toneForStatus(attempt.status)}
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <DetailRow label="Quiz" value={attempt.quiz_id} />
                <DetailRow label="Duration" value={attempt.duration_minutes} />
                <DetailRow label="Passed" value={attempt.passed} />
                <DetailRow label="Status" value={attempt.status} />
              </div>
              <DetailNote title="Mistake summary" text={attempt.mistake_summary} />
            </div>
          ) : null}
        </div>
      )}
    </SectionCard>
  );
}

export function ProjectBuildLogDetailPanel({
  projects,
  milestones,
  bugs,
  tests,
  releases,
}: {
  projects: ProjectRow[];
  milestones: ProjectMilestoneRow[];
  bugs: ProjectBugRow[];
  tests: ProjectTestRow[];
  releases: ProjectReleaseRow[];
}) {
  const project = projects[0];
  const milestone = milestones[0];
  const bug = bugs[0];
  const test = tests[0];
  const release = releases[0];

  return (
    <SectionCard
      title="Project build-log detail"
      eyebrow="9.20 detail"
      description="Read-only focused view for project execution, milestone pressure, quality signals, tests, and release state."
    >
      {!project && !milestone && !bug && !test && !release ? (
        <EmptyState
          title="No project build-log detail yet."
          description="Project build details will appear after project, milestone, bug, test, or release records exist."
        />
      ) : (
        <div className="grid gap-4">
          {project ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{project.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {readString(project as UnknownRecord, "description", "") ||
                      readString(project as UnknownRecord, "summary", "") ||
                      "No project summary yet."}
                  </p>
                </div>
                <StatusPill
                  label={readString(project as UnknownRecord, "status")}
                  tone={toneForStatus(readString(project as UnknownRecord, "status"))}
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <DetailRow label="Type" value={readString(project as UnknownRecord, "project_type")} />
                <DetailRow label="Priority" value={readString(project as UnknownRecord, "priority")} />
                <DetailRow label="Goal" value={readString(project as UnknownRecord, "goal_id")} />
                <DetailRow label="Updated" value={formatDate((project as UnknownRecord).updated_at)} />
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            {milestone ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{milestone.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Milestone · Due: {formatDate((milestone as UnknownRecord).due_date)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill
                    label={readString(milestone as UnknownRecord, "status")}
                    tone={toneForStatus(readString(milestone as UnknownRecord, "status"))}
                  />
                  <StatusPill
                    label={readString(milestone as UnknownRecord, "priority")}
                    tone="neutral"
                  />
                </div>
              </div>
            ) : null}

            {bug ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{bug.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Bug · Severity: {readString(bug as UnknownRecord, "severity")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill
                    label={readString(bug as UnknownRecord, "status")}
                    tone={toneForStatus(readString(bug as UnknownRecord, "status"))}
                  />
                </div>
              </div>
            ) : null}

            {test ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{test.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Test · Type: {readString(test as UnknownRecord, "test_type")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill
                    label={readBoolean(test as UnknownRecord, "passed") ? "passed" : readString(test as UnknownRecord, "status")}
                    tone={readBoolean(test as UnknownRecord, "passed") ? "success" : toneForStatus(readString(test as UnknownRecord, "status"))}
                  />
                </div>
              </div>
            ) : null}

            {release ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{release.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Release · Version: {readString(release as UnknownRecord, "version")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill
                    label={readString(release as UnknownRecord, "status")}
                    tone={toneForStatus(readString(release as UnknownRecord, "status"))}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </SectionCard>
  );
}
