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
import type {
  LearningSessionRow,
  QuizAttemptRow,
  QuizRow,
  SkillPathRow,
  SkillProgressRow,
  SkillRow,
} from "@/types/database";

interface LearningAcademyDashboardV1Props {
  data: LearningProjectDashboardDataResult;
  skillPaths: SkillPathRow[];
  skills: SkillRow[];
  learningSessions: LearningSessionRow[];
  quizzes: QuizRow[];
  quizAttempts: QuizAttemptRow[];
  skillProgress: SkillProgressRow[];
  readErrors?: string[];
}

function formatDate(value: string | null): string {
  if (!value) {
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
  if (["active", "learning", "practicing", "proving", "mastered", "completed", "passed"].includes(status)) {
    return "success";
  }

  if (["blocked", "paused", "stale", "needs_review"].includes(status)) {
    return "warning";
  }

  if (["failed", "cancelled", "abandoned", "archived"].includes(status)) {
    return "danger";
  }

  if (["planned", "draft", "not_started"].includes(status)) {
    return "info";
  }

  return "neutral";
}

function SkillPathList({ skillPaths }: { skillPaths: SkillPathRow[] }) {
  if (skillPaths.length === 0) {
    return (
      <EmptyState
        title="No skill paths yet."
        description="Skill paths will appear here after Phase 9 learning records exist. This dashboard is read-only."
      />
    );
  }

  const items: DataListItem[] = skillPaths.slice(0, 8).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? "No description yet.",
    meta: (
      <div className="flex flex-wrap gap-2">
        <span>Status: {item.status}</span>
        <span>Priority: {item.priority}</span>
        <span>Target: {item.target_level ?? "Not set"}</span>
        <span>Due: {formatDate(item.target_date)}</span>
      </div>
    ),
    trailing: <StatusPill label={item.status} tone={statusTone(item.status)} />,
  }));

  return (
    <DataList
      items={items}
      emptyState={
        <EmptyState
          title="No skill paths yet."
          description="Skill paths will appear here after learning records exist."
        />
      }
    />
  );
}

function SkillList({ skills }: { skills: SkillRow[] }) {
  if (skills.length === 0) {
    return (
      <EmptyState
        title="No skills yet."
        description="Skills, mastery scores, and proof requirements will appear here after records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {skills.slice(0, 10).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {item.description ?? "No description yet."}
              </p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Category: {item.category ?? "Not set"}</p>
                <p>Difficulty: {item.difficulty}</p>
                <p>Current level: {item.current_level ?? "Not set"}</p>
                <p>Target level: {item.target_level ?? "Not set"}</p>
                <p>Mastery score: {item.mastery_score ?? "Not scored"}</p>
                <p>Confidence score: {item.confidence_score ?? "Not scored"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill label={item.status} tone={statusTone(item.status)} />
              <StatusPill label={item.priority} tone="neutral" />
              {item.proof_required ? <StatusPill label="proof required" tone="warning" /> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LearningSessionList({ sessions }: { sessions: LearningSessionRow[] }) {
  if (sessions.length === 0) {
    return (
      <EmptyState
        title="No learning sessions yet."
        description="Study sessions, practice blocks, reviews, and quiz sessions will appear here after records exist."
      />
    );
  }

  const items: DataListItem[] = sessions.slice(0, 8).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.summary ?? item.notes ?? "No session summary yet.",
    meta: (
      <div className="flex flex-wrap gap-2">
        <span>Type: {item.session_type}</span>
        <span>Started: {formatDate(item.started_at)}</span>
        <span>Duration: {item.duration_minutes ?? "Not tracked"} min</span>
        <span>Focus: {item.focus_score ?? "Not scored"}</span>
      </div>
    ),
    trailing: <StatusPill label={item.status} tone={statusTone(item.status)} />,
  }));

  return (
    <DataList
      items={items}
      emptyState={
        <EmptyState
          title="No sessions yet."
          description="Learning sessions will appear here after records exist."
        />
      }
    />
  );
}

function QuizPanel({
  quizzes,
  quizAttempts,
}: {
  quizzes: QuizRow[];
  quizAttempts: QuizAttemptRow[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Quiz bank" eyebrow="checks" description="Read-only quiz inventory for skill validation.">
        {quizzes.length === 0 ? (
          <EmptyState
            title="No quizzes yet."
            description="Concept checks, coding quizzes, and interview reviews will appear here after records exist."
          />
        ) : (
          <div className="grid gap-3">
            {quizzes.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.quiz_type} · {item.difficulty} · Passing: {item.passing_score ?? "Not set"}
                    </p>
                  </div>
                  <StatusPill label={item.status} tone={statusTone(item.status)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Quiz attempts" eyebrow="results" description="Recent proof of recall, mistake patterns, and passing state.">
        {quizAttempts.length === 0 ? (
          <EmptyState
            title="No quiz attempts yet."
            description="Attempts and scores will appear here after quiz activity exists."
          />
        ) : (
          <div className="grid gap-3">
            {quizAttempts.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Score: {item.score ?? "Not scored"} / {item.max_score ?? "?"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Attempted: {formatDate(item.attempted_at)} · Duration: {item.duration_minutes ?? "Not tracked"} min
                    </p>
                    {item.mistake_summary ? (
                      <p className="mt-2 text-xs leading-5 text-slate-400">{item.mistake_summary}</p>
                    ) : null}
                  </div>
                  <StatusPill
                    label={item.passed === true ? "passed" : item.status}
                    tone={item.passed === true ? "success" : statusTone(item.status)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function ProgressPanel({ progress }: { progress: SkillProgressRow[] }) {
  if (progress.length === 0) {
    return (
      <EmptyState
        title="No skill progress history yet."
        description="Progress changes will appear here after sessions, projects, quizzes, or proof items update skill state."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {progress.slice(0, 8).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {item.previous_status ?? "none"} → {item.status}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Recorded: {formatDate(item.recorded_at)} · Mastery: {item.mastery_score ?? "Not scored"} · Confidence: {item.confidence_score ?? "Not scored"}
              </p>
              {item.delta_summary ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {item.delta_summary}
                </p>
              ) : null}
            </div>
            <StatusPill label={item.status} tone={statusTone(item.status)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LearningAcademyDashboardV1({
  data,
  skillPaths,
  skills,
  learningSessions,
  quizzes,
  quizAttempts,
  skillProgress,
  readErrors = [],
}: LearningAcademyDashboardV1Props) {
  const summary = data.learning;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 9 Learning Academy
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Learning Academy Dashboard
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Read-only skill-building command surface for skill paths, mastery progress, study sessions,
          quizzes, attempts, and proof-gated learning. This screen only reads records.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricTile
            label="Skill paths"
            value={summary.skill_path_count}
            description={`${summary.active_skill_path_count} active paths.`}
          />
          <MetricTile
            label="Skills"
            value={summary.skill_count}
            description={`${summary.mastered_skill_count} mastered skills.`}
          />
          <MetricTile
            label="Sessions"
            value={summary.learning_session_count}
            description={`${summary.completed_learning_session_count} completed sessions.`}
          />
          <MetricTile
            label="Quiz attempts"
            value={summary.quiz_attempt_count}
            description={`${summary.passed_quiz_attempt_count} passed attempts.`}
          />
        </div>

        {readErrors.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm font-semibold text-amber-200">Some learning reads failed.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-amber-100/80">
              {readErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <LearningProjectSummaryPanel
        title="Learning summary"
        description="Aggregated read-only metrics from Phase 9 learning tables."
        emptyTitle="No learning metrics yet."
        emptyDescription="Learning metrics will appear once Phase 9 records exist."
        metrics={[
          {
            label: "Skill progress records",
            value: summary.skill_progress_count,
            description: "Progress entries tied to skills, sessions, projects, quizzes, proof, tasks, or goals.",
            tone: "info",
          },
          {
            label: "Quiz bank",
            value: summary.quiz_count,
            description: "Quizzes available for skill validation.",
            tone: "neutral",
          },
          {
            label: "Completed sessions",
            value: summary.completed_learning_session_count,
            description: "Learning sessions marked complete.",
            tone: "success",
          },
        ]}
      />

      <SectionCard
        title="Skill paths"
        eyebrow="path"
        description="High-level learning tracks and mastery targets."
      >
        <SkillPathList skillPaths={skillPaths} />
      </SectionCard>

      <SectionCard
        title="Skills"
        eyebrow="mastery"
        description="Individual skills, mastery state, confidence, difficulty, and proof requirement."
      >
        <SkillList skills={skills} />
      </SectionCard>

      <SectionCard
        title="Learning sessions"
        eyebrow="practice"
        description="Study, practice, review, quiz, project, and research sessions."
      >
        <LearningSessionList sessions={learningSessions} />
      </SectionCard>

      <QuizPanel quizzes={quizzes} quizAttempts={quizAttempts} />

      <SectionCard
        title="Skill progress"
        eyebrow="history"
        description="Recorded changes in mastery, confidence, and evidence."
      >
        <ProgressPanel progress={skillProgress} />
      </SectionCard>
    </div>
  );
}
