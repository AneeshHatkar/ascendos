/**
 * Phase 17N — Memory/RAG UI
 *
 * Preview-only Memory/RAG UI surface.
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
 */

import type {
  CarnosMemoryContextPackBuilderResult,
  CarnosMemoryContextPackSection,
} from "@/lib/carnos-continuity/carnos-memory-context-pack-builder";
import type {
  RetrievalAuditTrailPreviewResult,
  RetrievalAuditTrailEvent,
} from "@/lib/carnos-continuity/retrieval-audit-trail-explanation";

export type MemoryRagPreviewPanelMode =
  | "overview"
  | "context_pack"
  | "audit_trail"
  | "safety"
  | "empty";

export interface MemoryRagPreviewPanelActionState {
  label: string;
  enabled: false;
  reason: string;
}

export interface MemoryRagPreviewPanelProps {
  title?: string;
  subtitle?: string;
  mode?: MemoryRagPreviewPanelMode;
  contextPack?: CarnosMemoryContextPackBuilderResult | null;
  auditTrail?: RetrievalAuditTrailPreviewResult | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  emptyMessage?: string | null;
}

export const PHASE_17N_MEMORY_RAG_UI_BOUNDARY = {
  phase: "Phase 17N",
  name: "Memory/RAG UI",
  deterministic_only: true,
  ui_only: true,
  preview_only: true,
  memory_rag_ui: true,
  context_pack_preview_ui: true,
  retrieval_audit_trail_preview_ui: true,
  retrieval_explanation_preview_ui: true,
  visible_memory_boundaries: true,
  visible_retrieval_reasons: true,
  visible_audit_reasons: true,
  visible_no_runtime_state: true,
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
  runtime_side_effects_enabled: false,
  memory_retrieval_events_write_count: 0,
  semantic_retrieval_active: false,
  carnos_prompt_injection_enabled: false,
  next_phase: "Phase 17O — Carnos Memory Integration Panel",
  rules: [
    "Phase 17N — Memory/RAG UI",
    "Memory/RAG UI",
    "memory rag preview panel",
    "context pack preview UI",
    "retrieval audit trail preview UI",
    "retrieval explanation preview UI",
    "visible memory boundaries",
    "visible retrieval reasons",
    "visible audit reasons",
    "visible no-runtime state",
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
  ],
} as const;

export const MEMORY_RAG_PREVIEW_DISABLED_ACTIONS: MemoryRagPreviewPanelActionState[] = [
  {
    label: "Approve memory",
    enabled: false,
    reason: "Disabled in Phase 17N because UI mutations are not part of the preview-only Memory/RAG UI.",
  },
  {
    label: "Reject memory",
    enabled: false,
    reason: "Disabled in Phase 17N because reject persistence is not implemented in this UI step.",
  },
  {
    label: "Forget memory",
    enabled: false,
    reason: "Disabled in Phase 17N because forget/delete readiness is handled in Phase 17P.",
  },
  {
    label: "Run retrieval",
    enabled: false,
    reason: "Disabled in Phase 17N because runtime retrieval remains deferred.",
  },
];

function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
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

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-100">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{detail}</div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 p-6 text-sm text-slate-400">
      {message}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 text-sm text-slate-300">
      Loading Memory/RAG preview state...
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-900/70 bg-red-950/30 p-6 text-sm text-red-200">
      {message}
    </div>
  );
}

function SectionCard({ section }: { section: CarnosMemoryContextPackSection }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100">{section.title}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {section.included_count} included · {section.excluded_count} excluded · {section.estimated_tokens} est. tokens
          </p>
        </div>
        <BoundaryPill label="preview only" />
      </div>

      <div className="mt-4 space-y-3">
        {section.items.slice(0, 4).map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-medium text-slate-100">{item.title}</div>
              <span
                className={cx(
                  "rounded-full px-2 py-1 text-xs",
                  item.included ? "bg-emerald-950 text-emerald-200" : "bg-amber-950 text-amber-200",
                )}
              >
                {item.decision}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.content_preview}</p>
            <div className="mt-2 text-xs text-slate-500">
              score {item.score.toFixed(3)} · {item.estimated_tokens} est. tokens · {item.source_label}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function AuditEventCard({ event }: { event: RetrievalAuditTrailEvent }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">{event.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">{event.detail}</p>
        </div>
        <span
          className={cx(
            "rounded-full px-2 py-1 text-xs",
            event.severity === "info" && "bg-slate-800 text-slate-200",
            event.severity === "warning" && "bg-amber-950 text-amber-200",
            event.severity === "blocked" && "bg-red-950 text-red-200",
            event.severity === "deferred" && "bg-blue-950 text-blue-200",
          )}
        >
          {event.severity}
        </span>
      </div>
      <div className="mt-3 text-xs text-slate-500">{event.kind}</div>
    </article>
  );
}

function DisabledActionList() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <h3 className="text-sm font-semibold text-slate-100">Disabled write actions</h3>
      <div className="mt-3 space-y-3">
        {MEMORY_RAG_PREVIEW_DISABLED_ACTIONS.map((action) => (
          <div key={action.label} className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
            <div className="text-sm font-medium text-slate-200">{action.label}</div>
            <p className="mt-1 text-sm leading-6 text-slate-400">{action.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoundarySummary() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <h3 className="text-sm font-semibold text-slate-100">Memory/RAG UI boundary</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <BoundaryPill label="No runtime retrieval" />
        <BoundaryPill label="No SQL reads/writes" />
        <BoundaryPill label="No Supabase calls" />
        <BoundaryPill label="No embeddings" />
        <BoundaryPill label="No vector search" />
        <BoundaryPill label="No Athena injection" />
        <BoundaryPill label="No approve/reject/delete/forget mutations" />
      </div>
    </div>
  );
}

export function MemoryRagPreviewPanel({
  title = "Memory/RAG Preview",
  subtitle = "Preview-only memory context, retrieval audit trail, and safety boundaries.",
  mode = "overview",
  contextPack = null,
  auditTrail = null,
  isLoading = false,
  errorMessage = null,
  emptyMessage = "No Memory/RAG preview data is available yet.",
}: MemoryRagPreviewPanelProps) {
  if (isLoading) return <LoadingState />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  const hasContextPack = Boolean(contextPack);
  const hasAuditTrail = Boolean(auditTrail);

  if (!hasContextPack && !hasAuditTrail && mode !== "safety") {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        <div className="mt-5">
          <EmptyState message={emptyMessage ?? "No Memory/RAG preview data is available yet."} />
        </div>
        <div className="mt-5">
          <BoundarySummary />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Phase 17N — Memory/RAG UI</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>
        <BoundaryPill label="preview only" />
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard
          label="Context sections"
          value={formatCount(contextPack?.sections.length)}
          detail="Preview sections only"
        />
        <MetricCard
          label="Context items"
          value={formatCount(contextPack?.included_item_count)}
          detail="Included preview items"
        />
        <MetricCard
          label="Audit events"
          value={formatCount(auditTrail?.audit_events.length)}
          detail="Preview audit trail"
        />
        <MetricCard
          label="Runtime writes"
          value="0"
          detail="No persistence in 17N"
        />
      </div>

      {(mode === "overview" || mode === "context_pack") && contextPack ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Context pack preview</h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {contextPack.sections.slice(0, 6).map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      ) : null}

      {(mode === "overview" || mode === "audit_trail") && auditTrail ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Retrieval audit trail preview</h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {auditTrail.audit_events.slice(0, 8).map((event) => (
              <AuditEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : null}

      {(mode === "overview" || mode === "safety") ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <BoundarySummary />
          <DisabledActionList />
        </div>
      ) : null}
    </section>
  );
}

export function getMemoryRagPreviewPanelBoundary(): typeof PHASE_17N_MEMORY_RAG_UI_BOUNDARY {
  return PHASE_17N_MEMORY_RAG_UI_BOUNDARY;
}

export const PHASE_17N_MEMORY_RAG_UI_AUDIT_MARKERS = [
  "Phase 17N — Memory/RAG UI",
  "Memory/RAG UI",
  "memory rag preview panel",
  "context pack preview UI",
  "retrieval audit trail preview UI",
  "retrieval explanation preview UI",
  "visible memory boundaries",
  "visible retrieval reasons",
  "visible audit reasons",
  "visible no-runtime state",
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
] as const;
