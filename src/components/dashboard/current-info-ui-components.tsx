import type {
  CurrentInfoBreakdownItem,
  CurrentInfoDashboardDataResult,
} from "@/lib/dashboard";
import type {
  WebSearchQueryRow,
  WebSourceAuditEventRow,
  WebSourceCandidateRow,
  WebSourceRow,
} from "@/lib/repositories";

type Tone = "neutral" | "info" | "success" | "warning" | "danger";

type CurrentInfoMetric = {
  label: string;
  value: number;
  description: string;
  tone?: Tone;
};

export type CurrentInfoDashboardPanelProps = {
  data: CurrentInfoDashboardDataResult;
  queries?: WebSearchQueryRow[];
  sources?: WebSourceRow[];
  candidates?: WebSourceCandidateRow[];
  auditEvents?: WebSourceAuditEventRow[];
};

function toneClasses(tone: Tone = "neutral") {
  const classes: Record<Tone, string> = {
    neutral: "border-white/10 bg-white/[0.03] text-slate-200",
    info: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-100",
    success: "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100",
    warning: "border-amber-300/20 bg-amber-300/[0.08] text-amber-100",
    danger: "border-rose-300/20 bg-rose-300/[0.08] text-rose-100",
  };

  return classes[tone];
}

function statusTone(status: string): Tone {
  if (["executed", "approved", "active"].includes(status)) {
    return "success";
  }

  if (["pending_review", "draft", "queued", "edited", "preview"].includes(status)) {
    return "warning";
  }

  if (
    [
      "failed",
      "rejected",
      "blocked_by_private_mode",
      "blocked_by_policy",
      "blocked_by_reliability",
      "blocked_by_duplicate",
    ].includes(status)
  ) {
    return "danger";
  }

  return "neutral";
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "No timestamp";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function displayText(value: string | null | undefined, fallback: string) {
  if (value && value.trim().length > 0) {
    return value;
  }

  return fallback;
}

export function CurrentInfoStatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses(
        tone,
      )}`}
    >
      {label.replaceAll("_", " ")}
    </span>
  );
}

export function CurrentInfoMetricGrid({ metrics }: { metrics: CurrentInfoMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className={`rounded-2xl border p-4 shadow-sm shadow-black/20 ${toneClasses(metric.tone)}`}
        >
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{metric.description}</p>
        </article>
      ))}
    </div>
  );
}

export function CurrentInfoBreakdownList({
  title,
  items,
}: {
  title: string;
  items: CurrentInfoBreakdownItem[];
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <CurrentInfoStatusBadge label={`${items.length} labels`} tone="info" />
      </div>

      {items.length > 0 ? (
        <div className="mt-4 grid gap-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
            >
              <span className="text-slate-300">{item.label.replaceAll("_", " ")}</span>
              <span className="font-semibold text-white">{item.count}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
          No breakdown data yet.
        </p>
      )}
    </section>
  );
}

export function CurrentInfoSourcePreviewList({ sources }: { sources: WebSourceRow[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Recent sources</h3>
        <CurrentInfoStatusBadge label={`${sources.length} sources`} tone="info" />
      </div>

      {sources.length > 0 ? (
        <div className="mt-4 grid gap-3">
          {sources.slice(0, 5).map((source) => (
            <article key={source.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex flex-wrap items-center gap-2">
                <CurrentInfoStatusBadge label={source.source_kind} tone="neutral" />
                <CurrentInfoStatusBadge
                  label={source.reliability_label}
                  tone={source.reliability_label === "official" ? "success" : "info"}
                />
                <CurrentInfoStatusBadge label={source.freshness_label} tone="warning" />
              </div>
              <h4 className="mt-3 text-sm font-semibold text-white">
                {displayText(source.title, source.domain ?? "Untitled source")}
              </h4>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                {displayText(source.summary ?? source.description ?? source.excerpt, "No source summary captured yet.")}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {displayText(source.domain, "unknown domain")} · Retrieved {formatDate(source.retrieved_at ?? source.created_at)}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
          No current-info sources have been captured yet.
        </p>
      )}
    </section>
  );
}

export function CurrentInfoCandidateReviewPreview({
  candidates,
}: {
  candidates: WebSourceCandidateRow[];
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Review candidates</h3>
        <CurrentInfoStatusBadge label={`${candidates.length} candidates`} tone="warning" />
      </div>

      {candidates.length > 0 ? (
        <div className="mt-4 grid gap-3">
          {candidates.slice(0, 5).map((candidate) => (
            <article key={candidate.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex flex-wrap items-center gap-2">
                <CurrentInfoStatusBadge
                  label={candidate.candidate_status}
                  tone={statusTone(candidate.candidate_status)}
                />
                <CurrentInfoStatusBadge label={candidate.candidate_type} tone="neutral" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">
                {displayText(candidate.suggested_destination_table, "No destination suggested")}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Missing fields: {candidate.missing_fields.length} · Reliability warnings:{" "}
                {candidate.reliability_warnings.length} · Freshness warnings:{" "}
                {candidate.freshness_warnings.length} · Privacy warnings:{" "}
                {candidate.privacy_warnings.length}
              </p>
              <p className="mt-2 text-xs text-slate-500">Created {formatDate(candidate.created_at)}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">
          No current-info candidates are waiting for review.
        </p>
      )}
    </section>
  );
}

export function CurrentInfoQueryAuditPreview({
  queries,
  auditEvents,
}: {
  queries: WebSearchQueryRow[];
  auditEvents: WebSourceAuditEventRow[];
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Queries and audit trail</h3>
        <CurrentInfoStatusBadge label="read only" tone="success" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recent queries</p>
          <div className="mt-3 grid gap-2">
            {queries.slice(0, 4).map((query) => (
              <div key={query.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <CurrentInfoStatusBadge label={query.status} tone={statusTone(query.status)} />
                  <CurrentInfoStatusBadge label={query.query_kind} tone="neutral" />
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">{query.query_text}</p>
                <p className="mt-2 text-xs text-slate-500">{formatDate(query.created_at)}</p>
              </div>
            ))}
            {queries.length === 0 ? <p className="text-sm text-slate-400">No queries yet.</p> : null}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Audit events</p>
          <div className="mt-3 grid gap-2">
            {auditEvents.slice(0, 4).map((event) => (
              <div key={event.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <CurrentInfoStatusBadge label={event.event_type} tone="info" />
                  <CurrentInfoStatusBadge label={event.actor_type} tone="neutral" />
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">{event.event_summary}</p>
                <p className="mt-2 text-xs text-slate-500">{formatDate(event.created_at)}</p>
              </div>
            ))}
            {auditEvents.length === 0 ? <p className="text-sm text-slate-400">No audit events yet.</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CurrentInfoDashboardPanelV1({
  data,
  queries = [],
  sources = [],
  candidates = [],
  auditEvents = [],
}: CurrentInfoDashboardPanelProps) {
  const summary = data.summary;

  const metrics: CurrentInfoMetric[] = [
    {
      label: "Queries",
      value: summary.recent_query_count,
      description: "Recent current-info query records.",
      tone: "info",
    },
    {
      label: "Sources",
      value: summary.recent_source_count,
      description: "Captured web source records.",
      tone: "neutral",
    },
    {
      label: "Pending",
      value: summary.pending_review_candidate_count,
      description: "Candidates waiting for review.",
      tone: "warning",
    },
    {
      label: "Approved",
      value: summary.approved_candidate_count,
      description: "Candidates approved after review.",
      tone: "success",
    },
    {
      label: "Blocked",
      value: summary.blocked_query_count + summary.blocked_candidate_count,
      description: "Policy, privacy, reliability, or duplicate blocks.",
      tone: "danger",
    },
    {
      label: "Audit",
      value: summary.audit_event_count,
      description: "Recorded current-info audit events.",
      tone: "info",
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Phase 16J</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Current-info source cockpit</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Read-only UI for current-info queries, sources, review candidates, evidence quality,
              and audit visibility. Saving, approval, provider calls, and Carnos integration stay out
              of this phase.
            </p>
          </div>
          <CurrentInfoStatusBadge label="read-only UI" tone="success" />
        </div>

        {summary.has_errors ? (
          <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">
            {summary.errors.join(" · ")}
          </div>
        ) : null}

        <div className="mt-6">
          <CurrentInfoMetricGrid metrics={metrics} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <CurrentInfoBreakdownList title="Source kinds" items={summary.source_kind_breakdown} />
        <CurrentInfoBreakdownList title="Reliability" items={summary.reliability_breakdown} />
        <CurrentInfoBreakdownList title="Freshness" items={summary.freshness_breakdown} />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <CurrentInfoSourcePreviewList sources={sources} />
        <CurrentInfoCandidateReviewPreview candidates={candidates} />
      </section>

      <CurrentInfoQueryAuditPreview queries={queries} auditEvents={auditEvents} />
    </div>
  );
}

export const PHASE_16J_CURRENT_INFO_UI_BOUNDARY =
  "Phase 16J current-info UI components are read-only presentation components and cannot browse, fetch, write, approve, reject, execute, or convert candidates to memory.";
