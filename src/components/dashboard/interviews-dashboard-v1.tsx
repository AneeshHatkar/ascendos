import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type { InterviewRow } from "@/types/database";
import { CareerCrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import { CareerProposedActionVisibilityPanel } from "@/components/dashboard/career-proposed-action-visibility-panel";
import { CareerStateBoundaryPanel } from "@/components/dashboard/career-state-boundary-panel";

interface InterviewsDashboardV1Props {
  interviews: InterviewRow[];
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
  if (["scheduled", "completed", "offer", "passed"].includes(status)) {
    return "success";
  }

  if (["rejected", "failed", "cancelled", "no_show"].includes(status)) {
    return "danger";
  }

  if (["pending", "needs_prep", "follow_up", "awaiting_feedback"].includes(status)) {
    return "warning";
  }

  if (["phone", "technical", "behavioral", "onsite", "final", "oa"].includes(status)) {
    return "info";
  }

  return "neutral";
}

function countDueDates(values: Array<string | null>): number {
  const now = new Date();

  return values.filter((value) => {
    if (!value) {
      return false;
    }

    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date <= now;
  }).length;
}

function countUpcoming(values: Array<string | null>): number {
  const now = new Date();

  return values.filter((value) => {
    if (!value) {
      return false;
    }

    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date >= now;
  }).length;
}

function interviewerSummary(names: string[]): string {
  if (names.length === 0) {
    return "No interviewers listed";
  }

  return names.slice(0, 6).join(", ");
}

function InterviewList({ interviews }: { interviews: InterviewRow[] }) {
  if (interviews.length === 0) {
    return (
      <EmptyState
        title="No interviews yet."
        description="Interview rounds, schedules, preparation notes, performance notes, follow-ups, and outcomes will appear here after interview records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {interviews.slice(0, 10).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                {item.company ?? "Unknown company"} · {item.role_title ?? "Unknown role"}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {item.round_type} interview
              </p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Scheduled: {formatDate(item.scheduled_at)}</p>
                <p>Completed: {formatDate(item.completed_at)}</p>
                <p>Follow-up: {formatDate(item.follow_up_at)}</p>
                <p>Application: {item.job_application_id ?? "Not linked"}</p>
                <p className="md:col-span-2">Interviewers: {interviewerSummary(item.interviewer_names)}</p>
              </div>

              {item.prep_notes ? (
                <p className="mt-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs leading-5 text-cyan-100/80">
                  Prep: {item.prep_notes}
                </p>
              ) : null}

              {item.performance_notes ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  Performance: {item.performance_notes}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill label={item.status} tone={statusTone(item.status)} />
              <StatusPill label={item.outcome} tone={statusTone(item.outcome)} />
              <StatusPill label={item.round_type} tone={statusTone(item.round_type)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function InterviewsDashboardV1({
  interviews,
  readErrors = [],
}: InterviewsDashboardV1Props) {
  const upcomingInterviews = countUpcoming(interviews.map((item) => item.scheduled_at));
  const followUpsDue = countDueDates(interviews.map((item) => item.follow_up_at));
  const completedInterviews = interviews.filter((item) => item.completed_at).length;
  const withPrepNotes = interviews.filter((item) => item.prep_notes).length;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 8 Interview System
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">Interview Dashboard</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Read-only interview command surface for company rounds, scheduling, prep notes, performance notes,
          outcomes, and follow-up pressure. This screen only reads records and does not schedule interviews or send follow-ups.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricTile label="Interviews" value={interviews.length} description="Interview records tracked." />
          <MetricTile label="Upcoming" value={upcomingInterviews} description="Scheduled today or later." />
          <MetricTile label="Completed" value={completedInterviews} description="Rounds with completed dates." />
          <MetricTile label="Follow-ups due" value={followUpsDue} description="Due today or earlier." />
        </div>
      </section>

      <CareerCrossDashboardLinks activeRoute="/interviews" />

      {readErrors.length > 0 ? (
        <EmptyState
          title="Some interview records could not be read."
          description={readErrors.join(" · ")}
        />
      ) : null}

      <SectionCard
        title="Interview command center"
        eyebrow="interviews"
        description="Rounds, schedules, linked applications, interviewers, preparation notes, performance notes, follow-up dates, and outcomes."
      >
        <InterviewList interviews={interviews} />
      </SectionCard>

      <SectionCard
        title="Interview readiness"
        eyebrow="prep"
        description="Read-only readiness indicators from stored interview records."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <MetricTile label="Prep notes" value={withPrepNotes} description="Interviews with preparation notes." />
          <MetricTile label="Outcome records" value={interviews.filter((item) => item.outcome).length} description="Interviews with outcome values." />
          <MetricTile label="Linked applications" value={interviews.filter((item) => item.job_application_id).length} description="Interviews linked to applications." />
        </div>
      </SectionCard>

      <CareerProposedActionVisibilityPanel />

      <CareerStateBoundaryPanel surface="interviews" />

      <SectionCard
        title="Interview boundary"
        eyebrow="safety"
        description="Phase 8 interviews remain read-only at the dashboard layer."
      >
        <div className="grid gap-3 text-sm leading-6 text-slate-400">
          <p>Allowed: read interview rounds, notes, outcomes, linked applications, and follow-up pressure.</p>
          <p>Not allowed here: scheduling interviews, sending follow-ups, generating answers, background jobs, or changing records.</p>
        </div>
      </SectionCard>
    </div>
  );
}
