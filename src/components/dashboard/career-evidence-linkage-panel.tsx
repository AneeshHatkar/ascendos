import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type {
  DailyLogRow,
  GoalRow,
  JobApplicationRow,
  ProofItemRow,
  ResumeBulletRow,
  TaskRow,
} from "@/types/database";

interface CareerEvidenceLinkagePanelProps {
  applications?: JobApplicationRow[];
  resumeBullets?: ResumeBulletRow[];
  goals?: GoalRow[];
  tasks?: TaskRow[];
  proofItems?: ProofItemRow[];
  dailyLogs?: DailyLogRow[];
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
  if (["active", "done", "completed", "verified", "captured"].includes(status)) {
    return "success";
  }

  if (["blocked", "rejected", "cancelled", "archived"].includes(status)) {
    return "danger";
  }

  if (["todo", "in_progress", "draft", "paused"].includes(status)) {
    return "warning";
  }

  return "neutral";
}

function linkedCount<T>(items: T[], selector: (item: T) => string | null): number {
  return items.filter((item) => Boolean(selector(item))).length;
}

function idList(values: Array<string | null>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function EvidenceSummary({
  applications,
  resumeBullets,
  proofItems,
}: {
  applications: JobApplicationRow[];
  resumeBullets: ResumeBulletRow[];
  proofItems: ProofItemRow[];
}) {
  const applicationGoalLinks = linkedCount(applications, (item) => item.goal_id);
  const applicationTaskLinks = linkedCount(applications, (item) => item.task_id);
  const bulletProofLinks = linkedCount(resumeBullets, (item) => item.proof_item_id);
  const bulletGoalLinks = linkedCount(resumeBullets, (item) => item.goal_id);
  const bulletTaskLinks = linkedCount(resumeBullets, (item) => item.task_id);
  const proofGoalLinks = linkedCount(proofItems, (item) => item.goal_id);
  const proofTaskLinks = linkedCount(proofItems, (item) => item.task_id);
  const proofDailyLogLinks = linkedCount(proofItems, (item) => item.daily_log_id);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <MetricTile
        label="Application links"
        value={applicationGoalLinks + applicationTaskLinks}
        description="Job applications linked to goals or tasks."
      />
      <MetricTile
        label="Bullet proof links"
        value={bulletProofLinks}
        description="Resume bullets linked to proof items."
      />
      <MetricTile
        label="Bullet execution links"
        value={bulletGoalLinks + bulletTaskLinks}
        description="Resume bullets linked to goals or tasks."
      />
      <MetricTile
        label="Proof chain links"
        value={proofGoalLinks + proofTaskLinks + proofDailyLogLinks}
        description="Proof items linked to goals, tasks, or daily logs."
      />
    </div>
  );
}

function GoalTaskProofLists({
  goals,
  tasks,
  proofItems,
  dailyLogs,
}: {
  goals: GoalRow[];
  tasks: TaskRow[];
  proofItems: ProofItemRow[];
  dailyLogs: DailyLogRow[];
}) {
  if (
    goals.length === 0 &&
    tasks.length === 0 &&
    proofItems.length === 0 &&
    dailyLogs.length === 0
  ) {
    return (
      <EmptyState
        title="No supporting proof context yet."
        description="Career-linked goals, tasks, proof items, and daily logs will appear here after records exist."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold text-white">Goals</h3>
        <div className="mt-3 grid gap-3">
          {goals.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.domain} · target {formatDate(item.target_date)}
                  </p>
                </div>
                <StatusPill label={item.status} tone={statusTone(item.status)} />
              </div>
            </div>
          ))}
          {goals.length === 0 ? <p className="text-sm text-slate-500">No goals loaded.</p> : null}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold text-white">Tasks</h3>
        <div className="mt-3 grid gap-3">
          {tasks.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.domain} · due {formatDate(item.due_date)}
                  </p>
                </div>
                <StatusPill label={item.status} tone={statusTone(item.status)} />
              </div>
            </div>
          ))}
          {tasks.length === 0 ? <p className="text-sm text-slate-500">No tasks loaded.</p> : null}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold text-white">Proof items</h3>
        <div className="mt-3 grid gap-3">
          {proofItems.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.domain} · {item.proof_type} · occurred {formatDate(item.occurred_at)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Goal: {item.goal_id ?? "Not linked"} · Task: {item.task_id ?? "Not linked"} · Daily log: {item.daily_log_id ?? "Not linked"}
                  </p>
                </div>
                <StatusPill label={item.status} tone={statusTone(item.status)} />
              </div>
            </div>
          ))}
          {proofItems.length === 0 ? <p className="text-sm text-slate-500">No proof items loaded.</p> : null}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold text-white">Daily logs</h3>
        <div className="mt-3 grid gap-3">
          {dailyLogs.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-sm font-medium text-white">{formatDate(item.log_date)}</p>
              <p className="mt-1 text-xs text-slate-500">
                Proof score: {item.proof_score ?? "Not set"} · Reality score: {item.reality_score ?? "Not set"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Mission: {item.mission ?? "Not set"}
              </p>
            </div>
          ))}
          {dailyLogs.length === 0 ? <p className="text-sm text-slate-500">No daily logs loaded.</p> : null}
        </div>
      </div>
    </div>
  );
}

function LinkIdSummary({
  applications,
  resumeBullets,
}: {
  applications: JobApplicationRow[];
  resumeBullets: ResumeBulletRow[];
}) {
  const goalIds = idList([
    ...applications.map((item) => item.goal_id),
    ...resumeBullets.map((item) => item.goal_id),
  ]);

  const taskIds = idList([
    ...applications.map((item) => item.task_id),
    ...resumeBullets.map((item) => item.task_id),
  ]);

  const proofIds = idList(resumeBullets.map((item) => item.proof_item_id));

  return (
    <div className="grid gap-3 text-xs leading-5 text-slate-500 md:grid-cols-3">
      <p>Linked goal ids: {goalIds.length === 0 ? "None" : goalIds.slice(0, 5).join(", ")}</p>
      <p>Linked task ids: {taskIds.length === 0 ? "None" : taskIds.slice(0, 5).join(", ")}</p>
      <p>Linked proof ids: {proofIds.length === 0 ? "None" : proofIds.slice(0, 5).join(", ")}</p>
    </div>
  );
}

export function CareerEvidenceLinkagePanel({
  applications = [],
  resumeBullets = [],
  goals = [],
  tasks = [],
  proofItems = [],
  dailyLogs = [],
}: CareerEvidenceLinkagePanelProps) {
  return (
    <SectionCard
      title="Career proof and evidence linkage"
      eyebrow="proof_items · goals · tasks · daily_logs"
      description="Read-only linkage between career records and the operating proof system."
    >
      <div className="grid gap-5">
        <EvidenceSummary
          applications={applications}
          resumeBullets={resumeBullets}
          proofItems={proofItems}
        />

        <LinkIdSummary applications={applications} resumeBullets={resumeBullets} />

        <GoalTaskProofLists
          goals={goals}
          tasks={tasks}
          proofItems={proofItems}
          dailyLogs={dailyLogs}
        />

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
          This panel only reads career linkage context. It does not create proof, edit goals, modify tasks, or change daily logs.
        </div>
      </div>
    </SectionCard>
  );
}
