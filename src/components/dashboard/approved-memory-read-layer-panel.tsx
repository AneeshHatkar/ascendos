import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import {
  PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY,
  createApprovedMemoryReadLayerPreview,
  getApprovedMemoryStalenessSummary,
  type ApprovedMemoryReadLayerResult,
  type ApprovedMemoryReadOptions,
} from "@/lib/carnos-continuity";
import type { ApprovedMemoryContract } from "@/lib/carnos-continuity";

/**
 * Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules.
 *
 * Read-only preview panel for approved-memory ranking and staleness warnings.
 * This panel does not approve, persist, retrieve from Supabase, embed, call
 * providers, build context packs, inject hidden Carnos memory, or create a
 * standalone /memory route.
 */

const SAMPLE_APPROVED_MEMORIES: ApprovedMemoryContract[] = [
  {
    kind: "approved_memory",
    id: "phase-15g-source-truth-memory",
    user_id: "preview-user",
    memory_type: "source_of_truth_note",
    status: "approved",
    title: "FINAL_SYNCED source-of-truth rule",
    content:
      "Use the FINAL_SYNCED DOCX/JSON as source of truth. Old 15-phase roadmap is outdated; JSON chunks 0–21 are active.",
    domain_scope: "global",
    provenance: {
      source_type: "source_of_truth",
      source_phase: "Phase 15A",
      source_label: "FINAL_SYNCED source hierarchy",
      captured_at: "2026-06-30T00:00:00.000Z",
    },
    review: {
      confidence: 1,
      priority: 100,
      sensitivity: "low",
      staleness: "fresh",
      last_confirmed_at: "2026-06-30T00:00:00.000Z",
      conflict_severity: "none",
      visibility: "visible_source",
    },
    supersedes_memory_ids: [],
    conflicts_with_memory_ids: [],
    created_at: "2026-06-30T00:00:00.000Z",
    updated_at: "2026-06-30T00:00:00.000Z",
  },
  {
    kind: "approved_memory",
    id: "phase-15g-project-memory",
    user_id: "preview-user",
    memory_type: "project_fact",
    status: "edited",
    title: "ascendOS current phase",
    content:
      "Phase 15G follows Phase 15F and focuses only on approved memory read-layer ranking and staleness rules.",
    domain_scope: "carnos",
    provenance: {
      source_type: "repo_log",
      source_phase: "Phase 15G",
      source_label: "Project continuity preview",
      captured_at: "2026-06-30T00:00:00.000Z",
    },
    review: {
      confidence: 0.92,
      priority: 88,
      sensitivity: "medium",
      staleness: "fresh",
      last_confirmed_at: "2026-06-30T00:00:00.000Z",
      conflict_severity: "none",
      visibility: "visible_summary",
    },
    source_candidate_id: "phase-15f-complete",
    supersedes_memory_ids: [],
    conflicts_with_memory_ids: [],
    created_at: "2026-06-30T00:00:00.000Z",
    updated_at: "2026-06-30T00:00:00.000Z",
  },
  {
    kind: "approved_memory",
    id: "phase-15g-stale-memory",
    user_id: "preview-user",
    memory_type: "career_context",
    status: "stale",
    title: "Older job-search target",
    content:
      "Older career context should be flagged as stale before it is used for active planning.",
    domain_scope: "career",
    provenance: {
      source_type: "manual_remember",
      source_phase: "Phase 15G",
      source_label: "Staleness preview",
      captured_at: "2026-01-01T00:00:00.000Z",
    },
    review: {
      confidence: 0.7,
      priority: 55,
      sensitivity: "medium",
      staleness: "stale",
      review_after: "2026-03-01T00:00:00.000Z",
      last_confirmed_at: "2026-01-01T00:00:00.000Z",
      conflict_severity: "low",
      visibility: "visible_summary",
    },
    supersedes_memory_ids: [],
    conflicts_with_memory_ids: ["phase-15g-project-memory"],
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
];

interface ApprovedMemoryReadLayerPanelProps {
  memories?: ApprovedMemoryContract[];
  options?: ApprovedMemoryReadOptions;
  result?: ApprovedMemoryReadLayerResult;
  surface?: "carnos" | "privacy" | "knowledge" | "command";
}

function toneForDecision(
  decision: string,
): "neutral" | "success" | "warning" | "danger" | "info" {
  if (decision === "included") return "success";
  if (decision.includes("stale")) return "warning";
  if (decision.includes("excluded")) return "danger";
  return "neutral";
}

function shortText(value: string, limit = 220): string {
  const trimmed = value.trim();
  if (trimmed.length <= limit) return trimmed;
  return `${trimmed.slice(0, limit - 1)}…`;
}

export function ApprovedMemoryReadLayerPanel({
  memories = SAMPLE_APPROVED_MEMORIES,
  options = {
    surface: "carnos",
    active_route: "carnos",
    query_hint: "Phase 15G",
    max_results: 5,
    include_stale_with_warning: false,
    include_restricted: false,
    private_mode_active: false,
    do_not_remember_rules_active: false,
  },
  result,
  surface = "carnos",
}: ApprovedMemoryReadLayerPanelProps) {
  const readResult = result ?? createApprovedMemoryReadLayerPreview(memories, options);
  const stalenessSummary = getApprovedMemoryStalenessSummary(memories);
  const total = readResult.included_refs.length + readResult.excluded_refs.length;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 15G Approved Memory Read Layer
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Approved Memory Ranking / Staleness Preview
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          This panel previews how already-approved memories would be filtered,
          ranked, and flagged for staleness. It does not approve memory, persist
          memory, read from Supabase, create embeddings, call providers, build a
          context pack, inject hidden Carnos context, or create a standalone
          /memory route.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <MetricTile label="Surface" value={surface} description="Preview display only." />
          <MetricTile label="Inputs" value={memories.length} description="Approved-memory contracts." />
          <MetricTile label="Included" value={readResult.included_refs.length} description="Ranked preview refs." />
          <MetricTile label="Excluded" value={readResult.excluded_refs.length} description="Blocked or low relevance." />
          <MetricTile label="Stale" value={stalenessSummary.stale + stalenessSummary.needs_reconfirmation} description="Review warnings." />
          <MetricTile label="Conflicts" value={readResult.conflict_warnings.length} description="User-visible warnings." />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusPill label="read layer preview only" tone="info" />
          <StatusPill label="ranking/staleness rules" tone="success" />
          <StatusPill label="no context pack builder" tone="warning" />
          <StatusPill label="no hidden Carnos injection" tone="danger" />
        </div>
      </section>

      <SectionCard
        title="Included approved-memory refs"
        eyebrow="ranked approved memories"
        description="Only approved or edited memories can appear here. Ranking is deterministic and local."
      >
        {readResult.included_refs.length === 0 ? (
          <EmptyState
            title="No approved memories included."
            description="The preview had no eligible approved or edited memory refs after filters."
          />
        ) : (
          <div className="grid gap-3">
            {readResult.included_refs.map((memory) => (
              <div key={memory.memory_id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{memory.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Score: {memory.ranking_score} · Priority: {memory.priority} · Confidence: {memory.confidence} · Staleness: {memory.staleness}
                    </p>
                  </div>
                  <StatusPill label={memory.read_decision} tone={toneForDecision(memory.read_decision)} />
                </div>

                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                  {shortText(memory.content_preview)}
                </p>

                <div className="mt-3 grid gap-2 text-xs leading-5 text-slate-500">
                  <p>Reason: {memory.reason_included}</p>
                  <p>Sensitivity rule: {memory.sensitivity_rule}</p>
                  <p>Staleness rule: {memory.staleness_rule}</p>
                  {memory.staleness_warning ? (
                    <p className="text-amber-200">Warning: {memory.staleness_warning}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Excluded memory refs"
        eyebrow="blocked / stale / mismatched"
        description="Excluded refs are shown for transparency. They are not injected into Carnos and are not used to build a context pack."
      >
        {readResult.excluded_refs.length === 0 ? (
          <EmptyState
            title="No excluded memory refs."
            description="All preview memories passed the Phase 15G filters."
          />
        ) : (
          <div className="grid gap-3">
            {readResult.excluded_refs.map((memory) => (
              <div key={`${memory.memory_id}-${memory.read_decision}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{memory.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {memory.reason_included}
                    </p>
                  </div>
                  <StatusPill label={memory.read_decision} tone={toneForDecision(memory.read_decision)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Staleness and conflict warnings"
        eyebrow={`${total} preview refs evaluated`}
        description="Warnings are surfaced for transparency. Phase 15G does not resolve conflicts or mutate memory."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white">Staleness summary</p>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-400">
              <p>Fresh: {stalenessSummary.fresh}</p>
              <p>Aging: {stalenessSummary.aging}</p>
              <p>Stale: {stalenessSummary.stale}</p>
              <p>Needs reconfirmation: {stalenessSummary.needs_reconfirmation}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white">Warnings</p>
            <div className="mt-3 grid gap-2 text-xs leading-5 text-slate-400">
              {[...readResult.stale_memory_warnings, ...readResult.conflict_warnings].length === 0 ? (
                <p>No warnings in this preview.</p>
              ) : (
                [...readResult.stale_memory_warnings, ...readResult.conflict_warnings].map((warning) => (
                  <p key={warning}>• {warning}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Protected boundaries"
        eyebrow={PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY.name}
        description="Phase 15G is a local preview layer only. It prepares deterministic ranking/staleness rules without runtime retrieval or injection."
      >
        <div className="grid gap-2 text-sm leading-6 text-slate-400">
          {PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY.boundary_rules.map((rule) => (
            <p key={rule}>• {rule}</p>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
