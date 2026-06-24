import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type {
  JobReferralRow,
  NetworkingContactRow,
  NetworkingInteractionRow,
} from "@/types/database";
import { CareerCrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import { CareerProposedActionVisibilityPanel } from "@/components/dashboard/career-proposed-action-visibility-panel";
import { CareerStateBoundaryPanel } from "@/components/dashboard/career-state-boundary-panel";

interface NetworkingDashboardV1Props {
  contacts: NetworkingContactRow[];
  interactions: NetworkingInteractionRow[];
  referrals: JobReferralRow[];
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
  if (["active", "confirmed", "warm", "strong", "completed"].includes(status)) {
    return "success";
  }

  if (["rejected", "stale", "lost", "cancelled"].includes(status)) {
    return "danger";
  }

  if (["pending", "requested", "follow_up", "medium"].includes(status)) {
    return "warning";
  }

  if (["new", "cold", "weak"].includes(status)) {
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

function ContactList({ contacts }: { contacts: NetworkingContactRow[] }) {
  if (contacts.length === 0) {
    return (
      <EmptyState
        title="No networking contacts yet."
        description="Contacts, relationship strength, company context, and follow-up timing will appear here after networking records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {contacts.slice(0, 8).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{item.full_name}</p>
              <p className="mt-1 text-sm text-slate-400">
                {item.company ?? "Unknown company"} · {item.role_title ?? "Unknown role"}
              </p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Relationship: {item.relationship_type}</p>
                <p>Strength: {item.relationship_strength}</p>
                <p>Last contacted: {formatDate(item.last_contacted_at)}</p>
                <p>Next follow-up: {formatDate(item.next_follow_up_at)}</p>
                <p>Email: {item.email ? "Available" : "Not set"}</p>
                <p>LinkedIn: {item.linkedin_url ? "Available" : "Not set"}</p>
              </div>
              {item.notes ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {item.notes}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill label={item.status} tone={statusTone(item.status)} />
              <StatusPill label={item.relationship_strength} tone={statusTone(item.relationship_strength)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InteractionList({ interactions }: { interactions: NetworkingInteractionRow[] }) {
  if (interactions.length === 0) {
    return (
      <EmptyState
        title="No networking interactions yet."
        description="Messages, calls, meetings, follow-ups, and warm-intro history will appear here after interaction records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {interactions.slice(0, 8).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                Type: {item.interaction_type} · Occurred: {formatDate(item.occurred_at)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Contact: {item.networking_contact_id} · Application: {item.job_application_id ?? "Not linked"}
              </p>
              <p className="mt-1 text-xs text-slate-500">Follow-up: {formatDate(item.follow_up_at)}</p>
              {item.description ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">
                  {item.description}
                </p>
              ) : null}
            </div>
            <StatusPill label={item.interaction_type} tone="info" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReferralList({ referrals }: { referrals: JobReferralRow[] }) {
  if (referrals.length === 0) {
    return (
      <EmptyState
        title="No referral records yet."
        description="Referral requests, confirmations, linked contacts, and linked applications will appear here after referral records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {referrals.slice(0, 8).map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Referral record</p>
              <p className="mt-1 text-xs text-slate-500">
                Contact: {item.networking_contact_id ?? "Not linked"} · Application: {item.job_application_id ?? "Not linked"}
              </p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-3">
                <p>Requested: {formatDate(item.requested_at)}</p>
                <p>Confirmed: {formatDate(item.confirmed_at)}</p>
                <p>Follow-up: {formatDate(item.follow_up_at)}</p>
              </div>
              {item.notes ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">
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

export function NetworkingDashboardV1({
  contacts,
  interactions,
  referrals,
  readErrors = [],
}: NetworkingDashboardV1Props) {
  const followUpsDue =
    countDueDates(contacts.map((item) => item.next_follow_up_at)) +
    countDueDates(interactions.map((item) => item.follow_up_at)) +
    countDueDates(referrals.map((item) => item.follow_up_at));

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 8 Networking System
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">Networking Dashboard</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Read-only relationship command surface for contacts, interactions, referrals, and follow-up pressure.
          This screen only reads records. It does not send messages, request referrals, scrape profiles, or change records.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricTile label="Contacts" value={contacts.length} description="Networking contacts tracked." />
          <MetricTile label="Interactions" value={interactions.length} description="Relationship touchpoints tracked." />
          <MetricTile label="Referrals" value={referrals.length} description="Referral records tracked." />
          <MetricTile label="Follow-ups due" value={followUpsDue} description="Due today or earlier." />
        </div>
      </section>

      <CareerCrossDashboardLinks activeRoute="/networking" />

      {readErrors.length > 0 ? (
        <EmptyState
          title="Some networking records could not be read."
          description={readErrors.join(" · ")}
        />
      ) : null}

      <SectionCard
        title="Contact base"
        eyebrow="networking_contacts"
        description="Relationship targets, company context, strength, and follow-up timing."
      >
        <ContactList contacts={contacts} />
      </SectionCard>

      <SectionCard
        title="Interaction history"
        eyebrow="networking_interactions"
        description="Messages, meetings, calls, follow-ups, and application-linked relationship history."
      >
        <InteractionList interactions={interactions} />
      </SectionCard>

      <SectionCard
        title="Referral pipeline"
        eyebrow="job_referrals"
        description="Referral requests, confirmations, linked contacts, linked applications, and next follow-up dates."
      >
        <ReferralList referrals={referrals} />
      </SectionCard>

      <CareerProposedActionVisibilityPanel />

      <CareerStateBoundaryPanel surface="networking" />

      <SectionCard
        title="Networking boundary"
        eyebrow="safety"
        description="Phase 8 networking remains read-only at the dashboard layer."
      >
        <div className="grid gap-3 text-sm leading-6 text-slate-400">
          <p>Allowed: read networking contacts, interactions, referrals, and follow-up pressure.</p>
          <p>Not allowed here: sending messages, requesting referrals, scraping profiles, background jobs, or changing records.</p>
        </div>
      </SectionCard>
    </div>
  );
}
