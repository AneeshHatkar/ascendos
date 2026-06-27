import { ProposedActionReviewCard } from "@/components/actions";
import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import { getAdminFinanceDashboardDataSummary } from "@/lib/dashboard/admin-finance-dashboard-data-helpers";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";
import type {
  FinancialLogRow,
  HousingContactRow,
  HousingOptionRow,
  LifeAdminDocumentRow,
  SubscriptionRow,
} from "@/types/database";

interface AdminFinanceDashboardProps {
  userId: string;
}

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

function formatDate(value: string | null): string {
  if (!value) {
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

function formatMoney(
  value: number | null | undefined,
  currency = "USD",
): string {
  const amount = Number(value ?? 0);

  if (!Number.isFinite(amount)) {
    return "Not set";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function toneForStatus(status: string): StatusTone {
  const normalized = status.toLowerCase();

  if (["active", "paid", "recorded", "current"].includes(normalized)) {
    return "success";
  }

  if (
    [
      "planned",
      "pending",
      "trial",
      "renewal_needed",
      "future",
      "backup",
    ].includes(normalized)
  ) {
    return "warning";
  }

  if (["overdue", "expired", "missing", "cancelled"].includes(normalized)) {
    return "danger";
  }

  if (
    ["private", "sensitive", "locked", "research_only"].includes(normalized)
  ) {
    return "info";
  }

  return "neutral";
}

function ReadOnlyBoundaryNotice({
  title = "Read-only admin boundary",
  description = "This dashboard reads existing admin and finance records only. It does not create, edit, delete, sync, upload, pay, email, or execute records.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-cyan-100">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 leading-6 text-cyan-100/80">{description}</p>
    </div>
  );
}

function WarningPanel({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
      <p className="font-semibold">
        Some admin or finance reads returned warnings.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </div>
  );
}

function AdminPrivacyNotice() {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
      <p className="font-semibold text-white">Private admin and finance data</p>
      <p className="mt-2 leading-6">
        Finance, document, housing, and life-admin records are treated as
        private operational data. This surface shows metadata and summaries
        only. It does not provide legal, tax, immigration, banking, payment, or
        document-storage advice.
      </p>
    </div>
  );
}

function AdminStateBoundaryPanel({
  surface,
  warnings,
}: {
  surface: string;
  warnings: string[];
}) {
  return (
    <SectionCard
      title={`${surface} state and safety boundary`}
      eyebrow="empty · loading · error · privacy"
      description="Consistent read-state language for admin, finance, document, and housing surfaces."
    >
      <div className="grid gap-4 text-sm leading-6 text-slate-400 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Empty state</p>
          <p className="mt-2">
            Empty panels mean no matching records exist yet. The dashboard does
            not create records from empty state.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Loading state</p>
          <p className="mt-2">
            These pages are server-rendered after authenticated reads complete.
            No background job, bank sync, file upload, or payment action starts
            here.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Error state</p>
          <p className="mt-2">
            Read errors appear as warnings only. Errors must not trigger
            automatic retries, writes, uploads, payments, emails, or Carnos
            execution.
          </p>
          {warnings.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-rose-200">
              {warnings.slice(0, 5).map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Privacy boundary</p>
          <p className="mt-2">
            Sensitive records remain scoped to the authenticated user. This UI
            does not expose, export, transmit, upload, OCR, or mutate private
            admin data.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

const ADMIN_FINANCE_PROPOSED_ACTION_PREVIEWS: ProposedActionContract[] = [
  {
    action_type: "create_task",
    source: "carnos",
    confidence: 0.71,
    reason:
      "Admin and finance context may suggest a follow-up task, but Phase 12 only previews the confirmation shape.",
    payload: {
      title: "Review an admin or finance follow-up",
      description:
        "Check overdue finance records, upcoming subscriptions, document renewals, and housing follow-ups before deciding whether to save a task.",
      domain: "life_admin",
      priority: "medium",
      status: "todo",
    },
    evidence_refs: [
      "financial_logs",
      "subscriptions",
      "documents",
      "housing_contacts",
    ],
  },
  {
    action_type: "create_goal",
    source: "carnos",
    confidence: 0.66,
    reason:
      "A recurring admin or finance pressure pattern could become a goal only after user review and server-owned persistence.",
    payload: {
      title: "Stabilize the admin and finance operating loop",
      description:
        "Reduce overdue records, keep subscriptions visible, review documents before expiration, and keep housing admin follow-ups under control.",
      domain: "life_admin",
      priority: "high",
      status: "active",
    },
    evidence_refs: [
      "financial_logs",
      "subscriptions",
      "documents",
      "housing_options",
    ],
  },
  {
    action_type: "create_proof_item",
    source: "carnos",
    confidence: 0.63,
    reason:
      "Completed admin work may deserve proof capture, but this panel does not persist anything.",
    payload: {
      title: "Capture proof for an admin or finance milestone",
      proof_type: "note",
      description:
        "Review the completed bill, document renewal, subscription cleanup, or housing admin milestone before saving proof.",
      goal_id: "review-required",
      task_id: "review-required",
    },
    evidence_refs: [
      "financial_logs",
      "subscriptions",
      "documents",
      "housing_contacts",
    ],
  },
];

function ProposalPreviewBoundaryPanel() {
  return (
    <SectionCard
      title="Admin proposed-action preview visibility"
      eyebrow="Phase 12 confirmation preview"
      description="Preview-only Carnos proposal cards for future life-admin and finance suggestions. This dashboard does not save, cancel, execute, or persist proposals."
    >
      <div className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">
          This panel is visibility only. It uses disabled proposal cards to show
          the review shape. Admin and finance suggestions must remain separate
          from persistence until validation, user confirmation, server-owned
          writes, SQL records, and audit logging exist. It must not pay bills,
          sync banks, upload documents, renew documents, email anyone, contact
          housing providers, or execute Carnos actions.
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {ADMIN_FINANCE_PROPOSED_ACTION_PREVIEWS.map((action) => (
            <ProposedActionReviewCard
              key={action.action_type}
              initialAction={action}
              disabled
              saveLabel="Save / Confirm unavailable in Phase 12 dashboard preview"
              cancelLabel="Cancel unavailable in Phase 12 dashboard preview"
              editLabel="Edit payload unavailable in Phase 12 dashboard preview"
              reviewTitle="Admin proposal preview"
              validationIssues={[
                "Preview only: this dashboard does not persist proposals.",
                "User confirmation and server-owned execution must remain separate from read dashboards.",
                "No payment, bank sync, document upload, document renewal, email, housing contact, or Carnos execution is wired here.",
              ]}
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function FinanceLogList({ logs }: { logs: FinancialLogRow[] }) {
  if (logs.length === 0) {
    return (
      <EmptyState
        title="No finance logs yet."
        description="Income, expenses, rent, utilities, bills, and subscription logs will appear here after records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {logs.slice(0, 8).map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-400">
                {formatMoney(item.amount, item.currency)} · {item.log_type} ·{" "}
                {formatDate(item.occurred_on)}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Category: {item.budget_category_id ?? "Not linked"} · Account:{" "}
                {item.account_id ?? "Not linked"}
              </p>
              {item.notes ? (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {item.notes}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill
                label={item.payment_status}
                tone={toneForStatus(item.payment_status)}
              />
              <StatusPill label={item.log_type} tone="info" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SubscriptionList({
  subscriptions,
}: {
  subscriptions: SubscriptionRow[];
}) {
  if (subscriptions.length === 0) {
    return (
      <EmptyState
        title="No subscriptions yet."
        description="Recurring payments, renewals, cancel-by dates, and subscription status will appear here after records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {subscriptions.slice(0, 8).map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="mt-1 text-sm text-slate-400">
                {formatMoney(item.amount, item.currency)} · {item.billing_cycle}
              </p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Provider: {item.provider ?? "Not set"}</p>
                <p>Next due: {formatDate(item.next_due_date)}</p>
                <p>Cancel by: {formatDate(item.cancel_by_date)}</p>
                <p>Auto-renew: {item.auto_renew ? "Yes" : "No"}</p>
              </div>
            </div>
            <StatusPill
              label={item.payment_status}
              tone={toneForStatus(item.payment_status)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentList({ documents }: { documents: LifeAdminDocumentRow[] }) {
  if (documents.length === 0) {
    return (
      <EmptyState
        title="No documents yet."
        description="Document metadata, renewal dates, review dates, and sensitivity markers will appear here after records exist."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {documents.slice(0, 8).map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-400">
                {item.document_type} · {item.issuing_body ?? "No issuing body"}
              </p>
              <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                <p>Issued: {formatDate(item.issued_on)}</p>
                <p>Expires: {formatDate(item.expires_on)}</p>
                <p>Renewal due: {formatDate(item.renewal_due_on)}</p>
                <p>Review: {formatDate(item.review_on)}</p>
                <p>Stored location: {item.stored_location ?? "Not set"}</p>
                <p>Related task: {item.related_task_id ?? "Not linked"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <StatusPill
                label={item.status}
                tone={toneForStatus(item.status)}
              />
              <StatusPill
                label={item.sensitivity}
                tone={toneForStatus(item.sensitivity)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HousingList({
  housingOptions,
  contacts,
}: {
  housingOptions: HousingOptionRow[];
  contacts: HousingContactRow[];
}) {
  if (housingOptions.length === 0 && contacts.length === 0) {
    return (
      <EmptyState
        title="No housing admin records yet."
        description="Rent, lease, utilities, maintenance, roommate notes, and housing contacts will appear here after records exist."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard
        title="Housing records"
        eyebrow="housing_options"
        description="Current housing, lease, rent, utilities, and maintenance metadata."
      >
        {housingOptions.length === 0 ? (
          <EmptyState
            title="No housing records yet."
            description="Current lease, rent, utility, and maintenance records will appear here after records exist."
          />
        ) : (
          <div className="grid gap-3">
            {housingOptions.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Rent: {formatMoney(item.rent_amount, item.currency)} · Due
                      day: {item.rent_due_day ?? "Not set"}
                    </p>
                    <div className="mt-3 grid gap-1 text-xs leading-5 text-slate-500 md:grid-cols-2">
                      <p>Lease start: {formatDate(item.lease_start_date)}</p>
                      <p>Lease end: {formatDate(item.lease_end_date)}</p>
                      <p>
                        Deposit:{" "}
                        {formatMoney(item.deposit_amount, item.currency)}
                      </p>
                      <p>
                        Document: {item.related_document_id ?? "Not linked"}
                      </p>
                    </div>
                  </div>
                  <StatusPill
                    label={item.housing_status}
                    tone={toneForStatus(item.housing_status)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Housing contacts"
        eyebrow="housing_contacts"
        description="Landlord, property manager, roommate, maintenance, and utility contact follow-ups."
      >
        {contacts.length === 0 ? (
          <EmptyState
            title="No housing contacts yet."
            description="Housing contacts and follow-up dates will appear here after records exist."
          />
        ) : (
          <div className="grid gap-3">
            {contacts.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">{item.role}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Last contacted: {formatDate(item.last_contacted_on)} ·
                      Next follow-up: {formatDate(item.next_follow_up_on)}
                    </p>
                    {item.contact_notes ? (
                      <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                        {item.contact_notes}
                      </p>
                    ) : null}
                  </div>
                  <StatusPill
                    label={item.preferred_contact_method ?? "contact"}
                    tone="neutral"
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

async function getDashboardData(userId: string) {
  return getAdminFinanceDashboardDataSummary(userId);
}

export async function LifeAdminDashboardV1({
  userId,
}: AdminFinanceDashboardProps) {
  const data = await getDashboardData(userId);
  const { summary } = data;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          life admin
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Life Admin Dashboard
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
          Read-only operating surface for document deadlines, subscriptions,
          finance reminders, housing follow-ups, and daily admin pressure. It
          summarizes confirmed records only.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <MetricTile
            label="Admin attention"
            value={summary.admin_attention_count}
            description="Due, overdue, expiring, or pending admin items."
          />
          <MetricTile
            label="Documents"
            value={summary.document_count}
            description="Tracked document metadata records."
          />
          <MetricTile
            label="Subscriptions"
            value={summary.subscription_count}
            description="Tracked recurring payments."
          />
          <MetricTile
            label="Finance logs"
            value={summary.financial_log_count}
            description="Income, expense, bill, rent, or utility records."
          />
          <MetricTile
            label="Housing"
            value={summary.current_housing_option_count}
            description="Current housing records."
          />
          <MetricTile
            label="Warnings"
            value={data.warnings.length}
            description="Read warnings returned by repositories."
          />
        </div>
      </div>

      <ReadOnlyBoundaryNotice />
      <AdminPrivacyNotice />
      <WarningPanel warnings={data.warnings} />
      <AdminStateBoundaryPanel surface="Life Admin" warnings={data.warnings} />
      <ProposalPreviewBoundaryPanel />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Admin queue"
          eyebrow="attention"
          description="Pending or overdue finance records, upcoming subscriptions, expiring documents, and housing follow-ups."
        >
          <div className="grid gap-4">
            <FinanceLogList
              logs={[
                ...data.detail_rows.planned_or_pending_financial_logs,
                ...data.detail_rows.overdue_financial_logs,
              ]}
            />
            <SubscriptionList
              subscriptions={[
                ...data.detail_rows.upcoming_subscriptions,
                ...data.detail_rows.overdue_subscriptions,
              ]}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Document pressure"
          eyebrow="documents"
          description="Documents due for review, renewal, or expiration attention."
        >
          <DocumentList
            documents={[
              ...data.detail_rows.expiring_documents,
              ...data.detail_rows.overdue_documents,
            ]}
          />
        </SectionCard>
      </div>

      <HousingList
        housingOptions={data.detail_rows.current_housing_options}
        contacts={data.detail_rows.housing_follow_ups_due}
      />
    </section>
  );
}

export async function FinanceDashboardV1({
  userId,
}: AdminFinanceDashboardProps) {
  const data = await getDashboardData(userId);
  const { summary } = data;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          finance
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Finance Dashboard
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
          Read-only overview for manual accounts, budget categories, income,
          expenses, rent, utilities, bills, and subscriptions. No bank sync,
          autopay, or money movement is wired.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <MetricTile
            label="Accounts"
            value={summary.active_financial_account_count}
            description="Active manual financial accounts."
          />
          <MetricTile
            label="Categories"
            value={summary.active_budget_category_count}
            description="Active budget categories."
          />
          <MetricTile
            label="Logged total"
            value={formatMoney(summary.recorded_finance_total)}
            description="Recorded and paid finance logs in current read window."
          />
          <MetricTile
            label="Pending"
            value={summary.planned_or_pending_finance_count}
            description="Planned or pending finance records."
          />
          <MetricTile
            label="Overdue"
            value={summary.overdue_finance_count}
            description="Overdue finance records."
          />
          <MetricTile
            label="Subscriptions"
            value={summary.active_subscription_count}
            description="Active subscription records."
          />
        </div>
      </div>

      <ReadOnlyBoundaryNotice
        title="Read-only finance boundary"
        description="This dashboard summarizes manual finance records only. It does not sync banks, move money, pay bills, change subscriptions, or provide tax advice."
      />
      <WarningPanel warnings={data.warnings} />
      <AdminStateBoundaryPanel surface="Finance" warnings={data.warnings} />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Recent finance logs"
          eyebrow="financial_logs"
          description="Income, expenses, rent, utilities, bills, subscriptions, savings, debt payments, refunds, transfers, and adjustments."
        >
          <FinanceLogList logs={data.detail_rows.financial_logs} />
        </SectionCard>

        <SectionCard
          title="Subscriptions and recurring payments"
          eyebrow="subscriptions"
          description="Recurring services, due dates, billing cycles, cancel-by dates, and payment states."
        >
          <SubscriptionList subscriptions={data.detail_rows.subscriptions} />
        </SectionCard>
      </div>
    </section>
  );
}

export async function DocumentsDashboardV1({
  userId,
}: AdminFinanceDashboardProps) {
  const data = await getDashboardData(userId);
  const { summary } = data;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          documents
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Documents Dashboard
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
          Read-only metadata surface for IDs, work authorization, school,
          career, housing, finance, insurance, and other document records.
          Files, OCR, upload, legal, tax, and immigration advice remain
          deferred.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <MetricTile
            label="Documents"
            value={summary.document_count}
            description="Tracked document metadata records."
          />
          <MetricTile
            label="Active"
            value={summary.active_document_count}
            description="Active document records."
          />
          <MetricTile
            label="Expiring soon"
            value={summary.expiring_document_count}
            description="Expires or renewal due within the review window."
          />
          <MetricTile
            label="Overdue"
            value={summary.overdue_document_count}
            description="Expired or renewal due today or earlier."
          />
          <MetricTile
            label="Warnings"
            value={data.warnings.length}
            description="Read warnings returned by repositories."
          />
        </div>
      </div>

      <ReadOnlyBoundaryNotice
        title="Read-only document boundary"
        description="This dashboard shows metadata only. It does not upload, store, OCR, share, renew, submit, or interpret documents."
      />
      <AdminPrivacyNotice />
      <WarningPanel warnings={data.warnings} />
      <AdminStateBoundaryPanel surface="Documents" warnings={data.warnings} />

      <SectionCard
        title="Document records"
        eyebrow="documents"
        description="Document type, status, sensitivity, issue dates, expiration dates, renewal dates, review dates, and linked tasks/events."
      >
        <DocumentList documents={data.detail_rows.documents} />
      </SectionCard>
    </section>
  );
}

export async function HousingDashboardV1({
  userId,
}: AdminFinanceDashboardProps) {
  const data = await getDashboardData(userId);
  const { summary } = data;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          housing
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Housing Dashboard
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
          Read-only housing admin surface for rent, lease dates, utilities,
          maintenance, roommate notes, housing documents, and contacts. This is
          not an apartment-search-first dashboard.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <MetricTile
            label="Housing records"
            value={summary.housing_option_count}
            description="Current, past, future, backup, or archived housing records."
          />
          <MetricTile
            label="Current housing"
            value={summary.current_housing_option_count}
            description="Current housing admin records."
          />
          <MetricTile
            label="Contacts"
            value={summary.housing_contact_count}
            description="Landlord, roommate, utilities, maintenance, and property contacts."
          />
          <MetricTile
            label="Follow-ups due"
            value={summary.housing_follow_up_due_count}
            description="Housing contact follow-ups due today or earlier."
          />
          <MetricTile
            label="Warnings"
            value={data.warnings.length}
            description="Read warnings returned by repositories."
          />
        </div>
      </div>

      <ReadOnlyBoundaryNotice
        title="Read-only housing boundary"
        description="This dashboard summarizes housing admin records only. It does not search listings, contact landlords, send messages, compare apartments, or modify lease data."
      />
      <WarningPanel warnings={data.warnings} />
      <AdminStateBoundaryPanel surface="Housing" warnings={data.warnings} />

      <HousingList
        housingOptions={data.detail_rows.housing_options}
        contacts={data.detail_rows.housing_contacts}
      />
    </section>
  );
}
