import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type {
  DailyLogRow,
  GoalRow,
  ProofItemRow,
  ResumeBulletRow,
  ResumeVersionRow,
  TaskRow,
} from "@/types/database";
import { CareerCrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import { CareerEvidenceLinkagePanel } from "@/components/dashboard/career-evidence-linkage-panel";
import { CareerProposedActionVisibilityPanel } from "@/components/dashboard/career-proposed-action-visibility-panel";
import { CareerStateBoundaryPanel } from "@/components/dashboard/career-state-boundary-panel";

interface ResumeDashboardV1Props {
  versions: ResumeVersionRow[];
  bullets: ResumeBulletRow[];
  goals: GoalRow[];
  tasks: TaskRow[];
  proofItems: ProofItemRow[];
  dailyLogs: DailyLogRow[];
  readErrors?: string[];
}

function statusTone(status: string): "neutral" | "success" | "warning" | "danger" | "info" {
  if (["active", "ready", "submitted", "approved", "complete"].includes(status)) {
    return "success";
  }

  if (["archived", "rejected", "deprecated"].includes(status)) {
    return "danger";
  }

  if (["draft", "review", "needs_update", "pending"].includes(status)) {
    return "warning";
  }

  return "neutral";
}

function keywordSummary(keywords: string[]): string {
  if (keywords.length === 0) {
    return "No keywords yet";
  }

  return keywords.slice(0, 8).join(", ");
}

function skillSummary(skillTags: string[]): string {
  if (skillTags.length === 0) {
    return "No skill tags";
  }

  return skillTags.slice(0, 6).join(", ");
}

function ResumeVersionList({ versions }: { versions: ResumeVersionRow[] }) {
  if (versions.length === 0) {
    return (
      <EmptyState
        title="No resume versions yet."
        description="Resume versions, target roles, target companies, domains, keywords, and file links will appear here after resume records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {versions.slice(0, 8).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="mt-1 text-sm text-slate-400">
                {item.target_role ?? "General role"} · {item.target_company ?? "No target company"}
              </p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Target domain: {item.target_domain ?? "Not set"}</p>
                <p>File: {item.file_url ? "Linked" : "Not linked"}</p>
                <p className="md:col-span-2">Keywords: {keywordSummary(item.keywords)}</p>
              </div>
              {item.notes ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {item.notes}
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

function ResumeBulletList({ bullets }: { bullets: ResumeBulletRow[] }) {
  if (bullets.length === 0) {
    return (
      <EmptyState
        title="No resume bullets yet."
        description="Resume bullet evidence, skill tags, metrics, proof links, goal links, and task links will appear here after bullet records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {bullets.slice(0, 10).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-6 text-white">{item.bullet_text}</p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Section: {item.section}</p>
                <p>Resume version: {item.resume_version_id}</p>
                <p>Metric claim: {item.metric_claim ?? "Not set"}</p>
                <p>Proof item: {item.proof_item_id ?? "Not linked"}</p>
                <p>Goal: {item.goal_id ?? "Not linked"}</p>
                <p>Task: {item.task_id ?? "Not linked"}</p>
                <p className="md:col-span-2">Skills: {skillSummary(item.skill_tags)}</p>
              </div>
            </div>
            <StatusPill label={item.section} tone="info" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResumeDashboardV1({
  versions,
  bullets,
  goals,
  tasks,
  proofItems,
  dailyLogs,
  readErrors = [],
}: ResumeDashboardV1Props) {
  const activeVersions = versions.filter((item) => item.status === "active" || item.status === "ready").length;
  const proofLinkedBullets = bullets.filter((item) => item.proof_item_id).length;
  const metricBullets = bullets.filter((item) => item.metric_claim).length;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 8 Resume System
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">Resume Dashboard</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Read-only resume control surface for versions, target roles, target companies, keywords, bullets,
          metrics, and evidence links. This screen only reads records and does not edit or generate resumes.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricTile label="Versions" value={versions.length} description="Resume versions tracked." />
          <MetricTile label="Active/ready" value={activeVersions} description="Versions ready for use or currently active." />
          <MetricTile label="Bullets" value={bullets.length} description="Evidence-backed bullet records." />
          <MetricTile label="Proof-linked" value={proofLinkedBullets} description="Bullets linked to proof items." />
        </div>
      </section>

      <CareerCrossDashboardLinks activeRoute="/resume" />

      {readErrors.length > 0 ? (
        <EmptyState
          title="Some resume records could not be read."
          description={readErrors.join(" · ")}
        />
      ) : null}

      <SectionCard
        title="Resume versions"
        eyebrow="resume_versions"
        description="Version names, target roles, target companies, target domains, file links, keywords, and status."
      >
        <ResumeVersionList versions={versions} />
      </SectionCard>

      <SectionCard
        title="Resume bullet evidence"
        eyebrow="resume_bullets"
        description="Bullet text, sections, skill tags, metric claims, and links to proof/goals/tasks."
      >
        <ResumeBulletList bullets={bullets} />
      </SectionCard>

      <CareerEvidenceLinkagePanel
        resumeBullets={bullets}
        goals={goals}
        tasks={tasks}
        proofItems={proofItems}
        dailyLogs={dailyLogs}
      />

      <CareerProposedActionVisibilityPanel />

      <CareerStateBoundaryPanel surface="resume" />

      <SectionCard
        title="Resume boundary"
        eyebrow="safety"
        description="Phase 8 resume remains read-only at the dashboard layer."
      >
        <div className="grid gap-3 text-sm leading-6 text-slate-400">
          <p>Allowed: read resume versions, bullets, keywords, metrics, and evidence links.</p>
          <p>Not allowed here: editing resumes, generating bullets, uploading files, background jobs, or changing records.</p>
          <p>Metric bullets currently tracked: {metricBullets}.</p>
        </div>
      </SectionCard>
    </div>
  );
}
