/**
 * Phase 17O — Carnos Memory Integration Panel
 *
 * Preview-only Carnos memory integration panel.
 *
 * Boundary:
 * - UI component only.
 * - No Supabase calls.
 * - No repository implementation.
 * - No SQL reads or writes.
 * - No memory_retrieval_events writes.
 * - No runtime retrieval.
 * - No embedding generation.
 * - No semantic retrieval activation.
 * - No provider calls.
 * - No vector search.
 * - No Carnos prompt/context injection.
 * - No background scanning.
 * - No approve/reject/delete/forget mutations.
 * - No autonomous memory use.
 */

import type { CarnosMemoryContextPackBuilderResult } from "@/lib/carnos-continuity/carnos-memory-context-pack-builder";
import type { RetrievalAuditTrailPreviewResult } from "@/lib/carnos-continuity/retrieval-audit-trail-explanation";
import { MemoryRagPreviewPanel } from "./MemoryRagPreviewPanel";

export type CarnosMemoryIntegrationMode =
  | "preview"
  | "allowed_context"
  | "blocked_actions"
  | "audit"
  | "safety";

export interface CarnosMemoryIntegrationPanelProps {
  title?: string;
  subtitle?: string;
  mode?: CarnosMemoryIntegrationMode;
  contextPack?: CarnosMemoryContextPackBuilderResult | null;
  auditTrail?: RetrievalAuditTrailPreviewResult | null;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export interface CarnosMemoryPermissionRow {
  label: string;
  state: "allowed_preview" | "blocked" | "deferred";
  reason: string;
}

export interface CarnosMemoryIntegrationStatus {
  label: string;
  value: string;
  detail: string;
}

export const PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_BOUNDARY = {
  phase: "Phase 17O",
  name: "Carnos Memory Integration Panel",
  deterministic_only: true,
  ui_only: true,
  preview_only: true,
  carnos_memory_integration_panel: true,
  carnos_allowed_memory_preview: true,
  carnos_blocked_memory_actions: true,
  carnos_memory_boundary_visibility: true,
  carnos_memory_audit_visibility: true,
  carnos_truthfulness_guard_visible: true,
  memory_context_pack_visible_to_user: true,
  no_supabase_calls: true,
  no_repository_implementation: true,
  no_sql_reads_or_writes: true,
  no_memory_retrieval_events_writes: true,
  no_runtime_retrieval: true,
  no_embedding_generation: true,
  no_semantic_retrieval_activation: true,
  no_provider_calls: true,
  no_vector_search: true,
  no_carnos_prompt_injection: true,
  no_background_scanning: true,
  no_approve_reject_delete_forget_mutations: true,
  no_autonomous_memory_use: true,
  runtime_side_effects_enabled: false,
  memory_retrieval_events_write_count: 0,
  semantic_retrieval_active: false,
  carnos_prompt_injection_enabled: false,
  next_phase: "Phase 17P — Privacy, Sensitive Lock, Forget/Delete Readiness",
  rules: [
    "Phase 17O — Carnos Memory Integration Panel",
    "Carnos Memory Integration Panel",
    "carnos memory integration panel",
    "carnos allowed memory preview",
    "carnos blocked memory actions",
    "carnos memory boundary visibility",
    "carnos memory audit visibility",
    "carnos truthfulness guard visible",
    "memory context pack visible to user",
    "No memory_retrieval_events writes",
    "No runtime retrieval",
    "No embedding generation",
    "No semantic retrieval activation",
    "No provider calls",
    "No vector search",
    "No Supabase calls",
    "No SQL reads or writes",
    "No Carnos prompt/context injection",
    "No background scanning",
    "No approve/reject/delete/forget mutations",
    "No autonomous memory use",
  ],
} as const;

export const CARNOS_MEMORY_PERMISSION_ROWS: CarnosMemoryPermissionRow[] = [
  {
    label: "View preview memory context pack",
    state: "allowed_preview",
    reason: "Allowed only as a user-visible preview created by Phase 17L.",
  },
  {
    label: "View retrieval audit explanation",
    state: "allowed_preview",
    reason: "Allowed only as a user-visible explanation created by Phase 17M.",
  },
  {
    label: "Inject memory into Carnos prompt",
    state: "blocked",
    reason: "Blocked in Phase 17O because prompt/context injection remains disabled.",
  },
  {
    label: "Run live memory retrieval",
    state: "blocked",
    reason: "Blocked in Phase 17O because runtime retrieval remains disabled.",
  },
  {
    label: "Write retrieval audit events",
    state: "deferred",
    reason: "Deferred because memory_retrieval_events persistence is not active in this phase.",
  },
  {
    label: "Approve, reject, delete, or forget memory",
    state: "deferred",
    reason: "Deferred to Phase 17P privacy and forget/delete readiness.",
  },
];

function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

function stateLabel(state: CarnosMemoryPermissionRow["state"]): string {
  if (state === "allowed_preview") return "preview allowed";
  if (state === "blocked") return "blocked";
  return "deferred";
}

function stateClass(state: CarnosMemoryPermissionRow["state"]): string {
  if (state === "allowed_preview") return "bg-emerald-950 text-emerald-200";
  if (state === "blocked") return "bg-red-950 text-red-200";
  return "bg-blue-950 text-blue-200";
}

function formatCount(value: number | undefined): string {
  return typeof value === "number" && Number.isFinite(value) ? String(value) : "0";
}

function BoundaryPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300">
      {label}
    </span>
  );
}

function IntegrationMetric({ label, value, detail }: CarnosMemoryIntegrationStatus) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-100">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{detail}</div>
    </div>
  );
}

function PermissionRows() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <h3 className="text-sm font-semibold text-slate-100">Carnos memory permissions</h3>
      <div className="mt-3 space-y-3">
        {CARNOS_MEMORY_PERMISSION_ROWS.map((row) => (
          <div key={row.label} className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="text-sm font-medium text-slate-100">{row.label}</div>
              <span className={cx("rounded-full px-2 py-1 text-xs", stateClass(row.state))}>
                {stateLabel(row.state)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{row.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TruthfulnessGuard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <h3 className="text-sm font-semibold text-slate-100">Carnos truthfulness guard</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Carnos can only use memory that is surfaced in a visible preview pack. Hidden memory, rejected memory,
        sensitive locked memory, stale memory, and unresolved conflicts must not be silently used.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <BoundaryPill label="no hidden memory use" />
        <BoundaryPill label="visible preview only" />
        <BoundaryPill label="no prompt injection" />
        <BoundaryPill label="no autonomous memory use" />
      </div>
    </div>
  );
}

function IntegrationBoundary() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <h3 className="text-sm font-semibold text-slate-100">Integration boundary</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <BoundaryPill label="No runtime retrieval" />
        <BoundaryPill label="No memory_retrieval_events writes" />
        <BoundaryPill label="No SQL reads/writes" />
        <BoundaryPill label="No Supabase calls" />
        <BoundaryPill label="No embeddings" />
        <BoundaryPill label="No vector search" />
        <BoundaryPill label="No Carnos prompt/context injection" />
      </div>
    </div>
  );
}

function EmptyIntegrationState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 p-6 text-sm text-slate-400">
      No Carnos memory integration preview is available yet. Phase 17O only displays preview data passed into this panel.
    </div>
  );
}

function LoadingState() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 text-sm text-slate-300">
      Loading Carnos memory integration preview...
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-red-900/70 bg-red-950/30 p-6 text-sm text-red-200">
      {message}
    </div>
  );
}

export function CarnosMemoryIntegrationPanel({
  title = "Carnos Memory Integration",
  subtitle = "Preview-only panel showing what Carnos may see, what remains blocked, and why memory use is still not injected.",
  mode = "preview",
  contextPack = null,
  auditTrail = null,
  isLoading = false,
  errorMessage = null,
}: CarnosMemoryIntegrationPanelProps) {
  if (isLoading) return <LoadingState />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  const hasPreviewData = Boolean(contextPack || auditTrail);

  return (
    <section className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Phase 17O — Carnos Memory Integration Panel</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>
        <BoundaryPill label="preview only" />
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <IntegrationMetric
          label="Context sections"
          value={formatCount(contextPack?.sections.length)}
          detail="Visible to user only"
        />
        <IntegrationMetric
          label="Context items"
          value={formatCount(contextPack?.included_item_count)}
          detail="Preview pack items"
        />
        <IntegrationMetric
          label="Audit events"
          value={formatCount(auditTrail?.audit_events.length)}
          detail="Explanation preview"
        />
        <IntegrationMetric
          label="Prompt injections"
          value="0"
          detail="Still blocked"
        />
      </div>

      {!hasPreviewData ? <EmptyIntegrationState /> : null}

      {(mode === "preview" || mode === "allowed_context") && hasPreviewData ? (
        <MemoryRagPreviewPanel
          title="Allowed memory preview for Carnos"
          subtitle="This is the visible preview pack and audit trail. It is not injected into a prompt in Phase 17O."
          mode="overview"
          contextPack={contextPack}
          auditTrail={auditTrail}
          emptyMessage="No Carnos-visible preview memory is available."
        />
      ) : null}

      {(mode === "preview" || mode === "blocked_actions") ? <PermissionRows /> : null}

      {(mode === "preview" || mode === "safety") ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <TruthfulnessGuard />
          <IntegrationBoundary />
        </div>
      ) : null}

      {mode === "audit" && auditTrail ? (
        <MemoryRagPreviewPanel
          title="Carnos memory audit preview"
          subtitle="Retrieval explanation is visible to the user and not persisted by this panel."
          mode="audit_trail"
          contextPack={contextPack}
          auditTrail={auditTrail}
          emptyMessage="No audit preview is available."
        />
      ) : null}
    </section>
  );
}

export function getCarnosMemoryIntegrationPanelBoundary(): typeof PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_BOUNDARY {
  return PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_BOUNDARY;
}

export const PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_AUDIT_MARKERS = [
  "Phase 17O — Carnos Memory Integration Panel",
  "Carnos Memory Integration Panel",
  "carnos memory integration panel",
  "carnos allowed memory preview",
  "carnos blocked memory actions",
  "carnos memory boundary visibility",
  "carnos memory audit visibility",
  "carnos truthfulness guard visible",
  "memory context pack visible to user",
  "No memory_retrieval_events writes",
  "No runtime retrieval",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
  "No approve/reject/delete/forget mutations",
  "No autonomous memory use",
] as const;
