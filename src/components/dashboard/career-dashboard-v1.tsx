import {
  CrossDashboardLinks,
  EmptyState,
  MetricTile,
  OperatingDashboardCard,
  OperatingDashboardGrid,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type { CareerDashboardDataResult } from "@/lib/dashboard";
import { getDashboardCardsForSurface } from "@/lib/dashboard";
import type {
  InterviewRow,
  JobApplicationEventRow,
  JobApplicationRow,
  JobReferralRow,
  NetworkingContactRow,
  ResumeBulletRow,
  ResumeVersionRow,
  GoalRow,
  TaskRow,
  ProofItemRow,
  DailyLogRow,
} from "@/types/database";
import { CareerCrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import { CareerEvidenceLinkagePanel } from "@/components/dashboard/career-evidence-linkage-panel";
import { CareerProposedActionVisibilityPanel } from "@/components/dashboard/career-proposed-action-visibility-panel";
import { CareerStateBoundaryPanel } from "@/components/dashboard/career-state-boundary-panel";

interface CareerDashboardV1Props {
  data: CareerDashboardDataResult;
  applications: JobApplicationRow[];
  applicationEvents: JobApplicationEventRow[];
  interviews: InterviewRow[];
  referrals: JobReferralRow[];
  contacts: NetworkingContactRow[];
  resumes: ResumeVersionRow[];
  resumeBullets: ResumeBulletRow[];
  goals: GoalRow[];
  tasks: TaskRow[];
  proofItems: ProofItemRow[];
  dailyLogs: DailyLogRow[];
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
  if (["offer", "accepted", "active", "scheduled", "completed"].includes(status)) {
    return "success";
  }

  if (["rejected", "failed", "cancelled", "withdrawn"].includes(status)) {
    return "danger";
  }

  if (["follow_up", "pending", "requested", "needed", "interview"].includes(status)) {
    return "warning";
  }

  if (["applied", "oa", "recruiter_response"].includes(status)) {
    return "info";
  }

  return "neutral";
}

function ApplicationList({ applications }: { applications: JobApplicationRow[] }) {
  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications yet."
        description="Applications will appear here after Career System records exist. This dashboard is read-only."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {applications.slice(0, 8).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{item.role_title}</p>
              <p className="mt-1 text-sm text-slate-400">{item.company}</p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Applied: {formatDate(item.applied_at)}</p>
                <p>Follow-up: {formatDate(item.follow_up_at)}</p>
                <p>Deadline: {formatDate(item.deadline_at)}</p>
                <p>Location: {item.location ?? "Not set"}</p>
                <p>Resume version: {item.resume_version_id ?? "Not linked"}</p>
                <p>Networking contact: {item.networking_contact_id ?? "Not linked"}</p>
                <p>Source: {item.source ?? "Not set"}</p>
                <p>Job URL: {item.job_url ? "Available" : "Not linked"}</p>
              </div>
              {item.notes ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {item.notes}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill label={item.status} tone={statusTone(item.status)} />
              <StatusPill label={item.priority} tone="neutral" />
              <StatusPill label={item.work_mode} tone="info" />
              <StatusPill label={item.employment_type} tone="neutral" />
              <StatusPill label={item.sponsorship_status} tone="warning" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


function ApplicationEventList({ events }: { events: JobApplicationEventRow[] }) {
  if (events.length === 0) {
    return (
      <EmptyState
        title="No application events yet."
        description="Status movement, recruiter responses, interviews, rejections, offers, and follow-ups will appear here after event records exist."
      />
    );
  }

  return (
    <div className="mt-4 grid gap-3">
      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
        <p className="text-sm font-semibold text-cyan-100">Recent application movement</p>
        <p className="mt-1 text-xs leading-5 text-cyan-100/70">
          Read-only event timeline from job_application_events. This shows movement but does not execute follow-ups.
        </p>
      </div>

      {events.slice(0, 8).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                Event: {item.event_type} · Occurred: {formatDate(item.occurred_at)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Application: {item.job_application_id}
              </p>
              {item.description ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">
                  {item.description}
                </p>
              ) : null}
            </div>
            <StatusPill label={item.event_type} tone={statusTone(item.event_type)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function InterviewList({ interviews }: { interviews: InterviewRow[] }) {
  if (interviews.length === 0) {
    return (
      <EmptyState
        title="No interviews yet."
        description="Interview rounds will appear here after interview records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {interviews.slice(0, 5).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{item.company}</p>
              <p className="mt-1 text-sm text-slate-400">
                {item.role_title ?? "Unknown role"} · {item.round_type}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Scheduled: {formatDate(item.scheduled_at)} · Follow-up: {formatDate(item.follow_up_at)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill label={item.status} tone={statusTone(item.status)} />
              {item.outcome ? <StatusPill label={item.outcome} tone={statusTone(item.outcome)} /> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReferralAndResumePanel({
  referrals,
  contacts,
  resumes,
}: {
  referrals: JobReferralRow[];
  contacts: NetworkingContactRow[];
  resumes: ResumeVersionRow[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <SectionCard title="Referral pressure" eyebrow="networking" description="Referral records and follow-up pressure.">
        {referrals.length === 0 ? (
          <EmptyState
            title="No referrals yet."
            description="Referral records will appear here after networking/referral data exists."
          />
        ) : (
          <div className="grid gap-3">
            {referrals.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-sm font-semibold text-white">Referral record</p>
                <p className="mt-1 text-xs text-slate-400">Application: {item.job_application_id ?? "Not linked"} · Contact: {item.networking_contact_id ?? "Not linked"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill label={item.status} tone={statusTone(item.status)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Contact base" eyebrow="relationships" description="Networking contacts available to the career system.">
        {contacts.length === 0 ? (
          <EmptyState
            title="No contacts yet."
            description="Networking contacts will appear here after contact records exist."
          />
        ) : (
          <div className="grid gap-3">
            {contacts.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-sm font-semibold text-white">{item.full_name}</p>
                <p className="mt-1 text-xs text-slate-400">{item.company ?? "Unknown company"}</p>
                <p className="mt-2 text-xs text-slate-500">Next follow-up: {formatDate(item.next_follow_up_at)}</p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Resume versions" eyebrow="evidence" description="Resume versions prepared for target roles and companies.">
        {resumes.length === 0 ? (
          <EmptyState
            title="No resume versions yet."
            description="Resume versions will appear here after resume records exist."
          />
        ) : (
          <div className="grid gap-3">
            {resumes.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-xs text-slate-400">{item.target_role ?? "General target"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill label={item.status} tone={statusTone(item.status)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

export function CareerDashboardV1({
  data,
  applications,
  applicationEvents,
  interviews,
  referrals,
  contacts,
  resumes,
  resumeBullets,
  goals,
  tasks,
  proofItems,
  dailyLogs,
  readErrors = [],
}: CareerDashboardV1Props) {
  const cards = getDashboardCardsForSurface("career");
  const summary = data.summary;

  return (
    <div className="grid gap-6">
      <CrossDashboardLinks
        activeRoute="/career"
        title="Career operating loop"
        description="Career execution connects applications, referrals, interviews, resumes, proof, and follow-up pressure."
      />

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
            Phase 8 Career System
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Career Dashboard</h1>
          <p className="max-w-4xl text-sm leading-6 text-slate-400">
            Read-only command surface for job applications, referrals, resume versions, interviews,
            and follow-up pressure. Carnos may surface visibility later, but this screen does not apply,
            email, mutate, scrape, or execute actions.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <MetricTile label="Applications" value={summary.application_count} description="Total tracked applications." />
          <MetricTile label="Active" value={summary.active_application_count} description="Applications still in motion." />
          <MetricTile label="Interviews" value={summary.interview_count} description="Interview records tracked." />
          <MetricTile label="Referrals" value={summary.referral_count} description="Referral records tracked." />
          <MetricTile label="Follow-ups due" value={summary.follow_ups_due_count} description="Due today or earlier." />
        </div>
      </section>

      <CareerCrossDashboardLinks activeRoute="/career" />

      {readErrors.length > 0 ? (
        <EmptyState
          title="Some career records could not be read."
          description={readErrors.join(" · ")}
        />
      ) : null}

      <OperatingDashboardGrid region="primary">
        {cards.map((card) => (
          <OperatingDashboardCard key={card.id} card={card}>
            {card.id === "career-application-pipeline" ? (
              <div className="grid gap-4">
                <ApplicationList applications={applications} />
                <ApplicationEventList events={applicationEvents} />
              </div>
            ) : card.id === "career-interview-readiness" ? (
              <InterviewList interviews={interviews} />
            ) : null}
          </OperatingDashboardCard>
        ))}
      </OperatingDashboardGrid>

      <ReferralAndResumePanel referrals={referrals} contacts={contacts} resumes={resumes} />

      <CareerEvidenceLinkagePanel
        applications={applications}
        resumeBullets={resumeBullets}
        goals={goals}
        tasks={tasks}
        proofItems={proofItems}
        dailyLogs={dailyLogs}
      />

      <CareerProposedActionVisibilityPanel />

      <CareerStateBoundaryPanel surface="career" />

      <SectionCard
        title="Career boundary"
        eyebrow="safety"
        description="Phase 8 remains read-only at the dashboard layer."
      >
        <div className="grid gap-3 text-sm leading-6 text-slate-400">
          <p>Allowed: read career SQL records, show follow-up pressure, surface empty/error states, and link career evidence.</p>
          <p>Forbidden here: autonomous job applications, autonomous emails, scraping, Python/ML execution, background jobs, or direct dashboard mutations.</p>
        </div>
      </SectionCard>
    </div>
  );
}
