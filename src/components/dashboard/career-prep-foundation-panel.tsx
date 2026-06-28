import { MetricTile, SectionCard, StatusPill } from "@/components/dashboard";
import type { CareerPrepDashboardDataResult } from "@/lib/dashboard";

interface CareerPrepFoundationPanelProps {
  data?: CareerPrepDashboardDataResult;
}

function formatCount(value: number | undefined) {
  return typeof value === "number" ? value.toLocaleString() : "0";
}

export function CareerPrepFoundationPanel({ data }: CareerPrepFoundationPanelProps) {
  const summary = data?.summary;
  const warnings = data?.warnings ?? [];
  const sourceTables = data?.source_tables ?? [
    "behavioral_stories",
    "question_bank",
    "mock_interviews",
    "resume_usage",
  ];
  const deferredBehavior = data?.deferred_behavior ?? [
    "No AI answer generation",
    "No autonomous interview feedback",
    "No resume rewriting",
    "No job applications",
    "No outreach emails",
    "No scraping",
  ];

  return (
    <SectionCard
      title="Career prep foundation"
      eyebrow="Phase 13.5D repair"
      description="Read-only foundation for behavioral stories, question bank, mock interview records, and resume usage tracking. This closes the missing career-prep layer without generating answers or taking career actions."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile
          label="Behavioral stories"
          value={formatCount(summary?.behavioral_story_count)}
          description="STAR-style story records connected to proof, goals, tasks, or resume bullets."
        />
        <MetricTile
          label="Questions"
          value={formatCount(summary?.question_count)}
          description="Question bank records for behavioral, technical, coding, system design, ML, and role-specific prep."
        />
        <MetricTile
          label="Mock interviews"
          value={formatCount(summary?.mock_interview_count)}
          description="Mock interview records and review metadata."
        />
        <MetricTile
          label="Resume usage"
          value={formatCount(summary?.resume_usage_count)}
          description="Records showing where resume versions were used."
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <MetricTile
          label="Ready stories"
          value={formatCount(summary?.ready_behavioral_story_count)}
          description="Stories marked ready."
        />
        <MetricTile
          label="Needs practice"
          value={formatCount(summary?.needs_practice_question_count)}
          description="Questions marked for practice."
        />
        <MetricTile
          label="Completed mocks"
          value={formatCount(summary?.completed_mock_interview_count)}
          description="Mock interviews marked completed."
        />
        <MetricTile
          label="Warnings"
          value={formatCount(summary?.read_warning_count)}
          description="Read warnings from the career-prep layer."
        />
      </div>

      <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
        Phase 13.5D boundary: this panel reads career-prep records only. It
        does not generate interview answers, rewrite resumes, apply to jobs,
        send outreach, scrape job posts, schedule interviews, or execute Carnos
        actions.
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {deferredBehavior.map((item) => (
          <StatusPill key={item} label={item} tone="neutral" />
        ))}
      </div>

      {warnings.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
          <p className="font-semibold">
            Some career-prep reads returned warnings.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {warnings.slice(0, 6).map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Source tables: {sourceTables.join(", ")}
      </p>
    </SectionCard>
  );
}
