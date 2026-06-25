import { EmptyState, SectionCard, StatusPill } from "@/components/dashboard";

type DetailRecord = Record<string, unknown>;

function asRecord(value: object | undefined): DetailRecord | undefined {
  return value as DetailRecord | undefined;
}

function readString(row: object | undefined, key: string, fallback = "Not set"): string {
  const record = asRecord(row);

  if (!record) {
    return fallback;
  }

  const value = record[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function formatDate(row: object | undefined, key: string): string {
  const value = asRecord(row)?.[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    return "Not set";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toneForStatus(status: string): "neutral" | "success" | "warning" | "danger" | "info" {
  const normalized = status.toLowerCase();

  if (["active", "supported", "completed", "accepted", "ready", "submitted", "read", "cited", "agreed"].includes(normalized)) {
    return "success";
  }

  if (["blocked", "needs_review", "partially_supported", "under_review", "follow_up_needed", "draft_needed"].includes(normalized)) {
    return "warning";
  }

  if (["failed", "rejected", "contradicted", "unsupported", "not_fit", "unavailable"].includes(normalized)) {
    return "danger";
  }

  if (["planned", "draft", "outline", "exploring", "investigating", "researching", "preparing", "running"].includes(normalized)) {
    return "info";
  }

  return "neutral";
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm leading-6 text-slate-200">{value}</p>
    </div>
  );
}

function DetailCard({
  row,
  titleKeys,
  descriptionKeys,
  statusKey,
  rows,
}: {
  row: object | undefined;
  titleKeys: string[];
  descriptionKeys: string[];
  statusKey?: string;
  rows: Array<{ label: string; key: string; date?: boolean }>;
}) {
  if (!row) {
    return null;
  }

  const title =
    titleKeys.map((key) => readString(row, key, "")).find((value) => value.length > 0) ??
    "Untitled record";
  const description =
    descriptionKeys.map((key) => readString(row, key, "")).find((value) => value.length > 0) ??
    "No description yet.";
  const status = statusKey ? readString(row, statusKey, "") : "";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {status ? <StatusPill label={status} tone={toneForStatus(status)} /> : null}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {rows.map((item) => (
          <DetailRow
            key={`${item.label}-${item.key}`}
            label={item.label}
            value={item.date ? formatDate(row, item.key) : readString(row, item.key)}
          />
        ))}
      </div>
    </div>
  );
}

function DetailPanel({
  title,
  eyebrow,
  description,
  emptyTitle,
  emptyDescription,
  children,
  hasData,
}: {
  title: string;
  eyebrow: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  children: React.ReactNode;
  hasData: boolean;
}) {
  return (
    <SectionCard title={title} eyebrow={eyebrow} description={description}>
      {hasData ? <div className="grid gap-4">{children}</div> : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </SectionCard>
  );
}

export function ResearchIdeaDetailPanel({
  ideas = [],
  questions = [],
}: {
  ideas?: object[];
  questions?: object[];
}) {
  return (
    <DetailPanel
      title="Research idea and question detail"
      eyebrow="10.20"
      description="Focused read-only detail for the first available research idea and question."
      emptyTitle="No research idea detail yet."
      emptyDescription="Research idea and question detail will appear after records exist."
      hasData={ideas.length > 0 || questions.length > 0}
    >
      <DetailCard
        row={ideas[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["description", "summary", "notes"]}
        statusKey="status"
        rows={[
          { label: "Priority", key: "priority" },
          { label: "Project", key: "project_id" },
          { label: "Goal", key: "goal_id" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
      <DetailCard
        row={questions[0]}
        titleKeys={["question", "title"]}
        descriptionKeys={["hypothesis", "description", "notes"]}
        statusKey="status"
        rows={[
          { label: "Idea", key: "research_idea_id" },
          { label: "Method", key: "method" },
          { label: "Expected signal", key: "expected_signal" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
    </DetailPanel>
  );
}

export function ResearchLiteratureDetailPanel({ literatureItems = [] }: { literatureItems?: object[] }) {
  return (
    <DetailPanel
      title="Literature detail"
      eyebrow="10.21"
      description="Focused read-only detail for the first available literature, benchmark, dataset, paper, or source record."
      emptyTitle="No literature detail yet."
      emptyDescription="Literature detail will appear after reading/source records exist."
      hasData={literatureItems.length > 0}
    >
      <DetailCard
        row={literatureItems[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["summary", "key_takeaways", "notes"]}
        statusKey="reading_status"
        rows={[
          { label: "Type", key: "item_type" },
          { label: "Authors", key: "authors" },
          { label: "Year", key: "publication_year" },
          { label: "Venue", key: "venue" },
          { label: "Research idea", key: "related_research_idea_id" },
          { label: "Project", key: "related_project_id" },
          { label: "URL", key: "url" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
    </DetailPanel>
  );
}

export function ResearchClaimCitationDetailPanel({
  claims = [],
  citations = [],
}: {
  claims?: object[];
  citations?: object[];
}) {
  return (
    <DetailPanel
      title="Claim and citation detail"
      eyebrow="10.22"
      description="Focused read-only detail for claim support status, citation purpose, and evidence linkage."
      emptyTitle="No claim or citation detail yet."
      emptyDescription="Claims and citations will appear after research evidence records exist."
      hasData={claims.length > 0 || citations.length > 0}
    >
      <DetailCard
        row={claims[0]}
        titleKeys={["claim", "title"]}
        descriptionKeys={["notes", "summary", "description"]}
        statusKey="support_status"
        rows={[
          { label: "Idea", key: "research_idea_id" },
          { label: "Paper", key: "research_paper_id" },
          { label: "Version", key: "paper_version_id" },
          { label: "Confidence", key: "confidence_score" },
        ]}
      />
      <DetailCard
        row={citations[0]}
        titleKeys={["citation_label", "title"]}
        descriptionKeys={["citation_purpose", "quote", "notes"]}
        statusKey="status"
        rows={[
          { label: "Literature", key: "literature_item_id" },
          { label: "Idea", key: "research_idea_id" },
          { label: "Claim", key: "research_claim_id" },
          { label: "Paper", key: "research_paper_id" },
          { label: "Version", key: "paper_version_id" },
          { label: "Location", key: "location" },
          { label: "Quote", key: "quote" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
    </DetailPanel>
  );
}

export function ResearchExperimentResultDetailPanel({
  experiments = [],
  results = [],
}: {
  experiments?: object[];
  results?: object[];
}) {
  return (
    <DetailPanel
      title="Experiment and result detail"
      eyebrow="10.23"
      description="Focused read-only detail for reproducibility, experiment state, result records, and project/paper links."
      emptyTitle="No experiment or result detail yet."
      emptyDescription="Experiment and result detail will appear after reproducibility records exist."
      hasData={experiments.length > 0 || results.length > 0}
    >
      <DetailCard
        row={experiments[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["description", "methodology", "notes"]}
        statusKey="status"
        rows={[
          { label: "Idea", key: "research_idea_id" },
          { label: "Question", key: "research_question_id" },
          { label: "Project", key: "project_id" },
          { label: "Reproducibility", key: "reproducibility_status" },
          { label: "Started", key: "started_at", date: true },
          { label: "Completed", key: "completed_at", date: true },
          { label: "Metric", key: "primary_metric" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
      <DetailCard
        row={results[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["summary", "interpretation", "notes"]}
        statusKey="status"
        rows={[
          { label: "Experiment", key: "research_experiment_id" },
          { label: "Idea", key: "research_idea_id" },
          { label: "Project", key: "project_id" },
          { label: "Paper version", key: "paper_version_id" },
          { label: "Metric", key: "metric_name" },
          { label: "Value", key: "metric_value" },
          { label: "Recorded", key: "recorded_at", date: true },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
    </DetailPanel>
  );
}

export function ResearchPaperVenueDetailPanel({
  papers = [],
  paperVersions = [],
  venues = [],
  submissions = [],
  feedback = [],
}: {
  papers?: object[];
  paperVersions?: object[];
  venues?: object[];
  submissions?: object[];
  feedback?: object[];
}) {
  return (
    <DetailPanel
      title="Paper, version, venue, submission, and feedback detail"
      eyebrow="10.24 · 10.25"
      description="Focused read-only detail for paper readiness, versioning, target venues, submissions, and review feedback."
      emptyTitle="No paper detail records yet."
      emptyDescription="Paper, version, venue, submission, and feedback detail will appear after records exist."
      hasData={papers.length > 0 || paperVersions.length > 0 || venues.length > 0 || submissions.length > 0 || feedback.length > 0}
    >
      <DetailCard
        row={papers[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["abstract", "summary", "notes"]}
        statusKey="status"
        rows={[
          { label: "Idea", key: "primary_research_idea_id" },
          { label: "Project", key: "project_id" },
          { label: "Venue", key: "target_venue_id" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
      <DetailCard
        row={paperVersions[0]}
        titleKeys={["version_label", "title"]}
        descriptionKeys={["change_summary", "summary", "notes"]}
        statusKey="status"
        rows={[
          { label: "Paper", key: "research_paper_id" },
          { label: "Page count", key: "page_count" },
          { label: "Readiness", key: "readiness_score" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
      <DetailCard
        row={venues[0]}
        titleKeys={["name", "title"]}
        descriptionKeys={["notes", "description"]}
        statusKey="status"
        rows={[
          { label: "Type", key: "venue_type" },
          { label: "Deadline", key: "deadline", date: true },
          { label: "URL", key: "url" },
          { label: "Fit score", key: "fit_score" },
        ]}
      />
      <DetailCard
        row={submissions[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["notes", "summary"]}
        statusKey="status"
        rows={[
          { label: "Paper", key: "research_paper_id" },
          { label: "Venue", key: "research_venue_id" },
          { label: "Submitted", key: "submitted_at", date: true },
          { label: "Decision", key: "decision" },
        ]}
      />
      <DetailCard
        row={feedback[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["summary", "notes"]}
        statusKey="status"
        rows={[
          { label: "Paper", key: "research_paper_id" },
          { label: "Version", key: "paper_version_id" },
          { label: "Source", key: "source" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
    </DetailPanel>
  );
}

export function StanfordProfessorLabDetailPanel({
  universities = [],
  labs = [],
  professors = [],
}: {
  universities?: object[];
  labs?: object[];
  professors?: object[];
}) {
  return (
    <DetailPanel
      title="University, lab, and professor detail"
      eyebrow="10.26"
      description="Focused read-only detail for PhD target fit, lab alignment, professor mapping, and outreach state."
      emptyTitle="No professor or lab detail yet."
      emptyDescription="Target university, lab, and professor detail will appear after PhD target records exist."
      hasData={universities.length > 0 || labs.length > 0 || professors.length > 0}
    >
      <DetailCard
        row={universities[0]}
        titleKeys={["name", "title"]}
        descriptionKeys={["fit_reason", "notes", "description"]}
        statusKey="target_level"
        rows={[
          { label: "Program", key: "program_name" },
          { label: "Fit score", key: "fit_score" },
          { label: "Deadline", key: "deadline", date: true },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
      <DetailCard
        row={labs[0]}
        titleKeys={["name", "title"]}
        descriptionKeys={["fit_reason", "notes", "description"]}
        statusKey="status"
        rows={[
          { label: "University", key: "target_university_id" },
          { label: "Research idea", key: "related_research_idea_id" },
          { label: "Project", key: "related_project_id" },
          { label: "Fit score", key: "fit_score" },
        ]}
      />
      <DetailCard
        row={professors[0]}
        titleKeys={["name", "title"]}
        descriptionKeys={["fit_reason", "notes", "description"]}
        statusKey="outreach_status"
        rows={[
          { label: "University", key: "target_university_id" },
          { label: "Lab", key: "target_lab_id" },
          { label: "Research area", key: "research_area" },
          { label: "Fit score", key: "fit_score" },
          { label: "Email", key: "email" },
          { label: "Last contact", key: "last_contact_at", date: true },
          { label: "Next follow-up", key: "next_follow_up_at", date: true },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
    </DetailPanel>
  );
}

export function StanfordApplicationDetailPanel({
  readinessAssessments = [],
  applicationAssets = [],
  sopVersions = [],
  recommendationTargets = [],
}: {
  readinessAssessments?: object[];
  applicationAssets?: object[];
  sopVersions?: object[];
  recommendationTargets?: object[];
}) {
  return (
    <DetailPanel
      title="SOP, application, recommendation, and readiness detail"
      eyebrow="10.27"
      description="Focused read-only detail for PhD readiness checks, application assets, SOP versions, and recommendation targets."
      emptyTitle="No PhD application detail yet."
      emptyDescription="Readiness, application asset, SOP, and recommendation detail will appear after records exist."
      hasData={readinessAssessments.length > 0 || applicationAssets.length > 0 || sopVersions.length > 0 || recommendationTargets.length > 0}
    >
      <DetailCard
        row={readinessAssessments[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["summary", "notes"]}
        statusKey="status"
        rows={[
          { label: "Assessment date", key: "assessment_date", date: true },
          { label: "Research score", key: "research_score" },
          { label: "SOP score", key: "sop_score" },
          { label: "Overall score", key: "overall_score" },
        ]}
      />
      <DetailCard
        row={applicationAssets[0]}
        titleKeys={["title", "name"]}
        descriptionKeys={["notes", "summary"]}
        statusKey="status"
        rows={[
          { label: "University", key: "target_university_id" },
          { label: "Type", key: "asset_type" },
          { label: "Due date", key: "due_date", date: true },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
      <DetailCard
        row={sopVersions[0]}
        titleKeys={["version_label", "title"]}
        descriptionKeys={["summary", "notes"]}
        statusKey="status"
        rows={[
          { label: "University", key: "target_university_id" },
          { label: "Word count", key: "word_count" },
          { label: "Readiness", key: "readiness_score" },
          { label: "Updated", key: "updated_at", date: true },
        ]}
      />
      <DetailCard
        row={recommendationTargets[0]}
        titleKeys={["recommender_name", "title"]}
        descriptionKeys={["notes", "summary"]}
        statusKey="request_status"
        rows={[
          { label: "University", key: "target_university_id" },
          { label: "Professor", key: "target_professor_id" },
          { label: "Due date", key: "due_date", date: true },
          { label: "Requested", key: "requested_at", date: true },
        ]}
      />
    </DetailPanel>
  );
}
