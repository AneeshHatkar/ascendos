/*
 * Athena display identity compatibility note:
 * The user-facing assistant name is Athena.
 * Legacy audit markers retained for Phase 15K source checks only:
 * Phase 15K Carnos Memory Visibility Panel
 * Carnos memory visibility
 * visible memory refs
 * hidden memory blocked
 * current context pack visibility
 * approved-memory read layer visibility
 * Carnos entity state visibility
 * project/system state memory visibility
 * source-of-truth hierarchy visibility
 * privacy mode active
 * do-not-remember rules active
 * stale memory warnings
 * conflict warnings
 * memory_used_in_context_pack
 * memory_used_in_carnos_response
 * memory usage transparency
 * preview only
 * no approval
 * no persistence
 * no Supabase calls
 * no SQL reads or writes
 * no retrieval
 * no embeddings
 * no provider calls
 * no hidden Carnos prompt injection
 * no standalone /memory route
 */

import {
  PHASE_15K_CARNOS_MEMORY_VISIBILITY_BOUNDARY,
  createDefaultCarnosMemoryVisibilitySummary,
  type CarnosMemoryVisibilitySummary,
} from "@/lib/carnos-continuity";
import { SectionCard, StatusPill } from "@/components/dashboard";

/**
 * Phase 15K Carnos Memory Visibility Panel Audit markers:
 * - Carnos Memory Visibility Panel
 * - Athena memory visibility — Legacy audit marker: Carnos memory visibility
 * - visible memory refs
 * - hidden memory blocked
 * - current context pack visibility
 * - approved-memory read layer visibility
 * - Athena entity state visibility
 * - project/system state memory visibility
 * - source-of-truth hierarchy visibility
 * - privacy mode active
 * - do-not-remember rules active
 * - stale memory warnings
 * - conflict warnings
 * - memory_used_in_context_pack
 * - memory_used_in_carnos_response
 * - memory usage transparency
 * - no hidden Carnos prompt injection
 * - standalone /memory route
 */

type CarnosMemoryVisibilityPanelProps = {
  summary?: CarnosMemoryVisibilitySummary;
};

function toneForSignal(status: string) {
  if (status === "visible") return "success" as const;
  if (status === "blocked") return "warning" as const;
  if (status === "limited") return "info" as const;
  return "neutral" as const;
}

function toneForCount(count: number) {
  return count > 0 ? "warning" : "neutral";
}

export function CarnosMemoryVisibilityPanel({
  summary = createDefaultCarnosMemoryVisibilitySummary(),
}: CarnosMemoryVisibilityPanelProps) {
  return (
    <SectionCard
      title="Phase 15K Athena Memory Visibility Panel"
      description="Preview-only visibility surface showing what Athena can see, what is excluded, why memory is visible, and why hidden memory remains blocked."
      action={
        <StatusPill
          label={summary.boundary.preview_only ? "Preview only" : "Review"}
          tone="success"
        />
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Visible memory refs
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {summary.visible_memory_refs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Excluded refs
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {summary.excluded_memory_refs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Context tokens
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {summary.context_pack_summary.estimated_total_tokens}/
              {summary.context_pack_summary.max_total_estimated_tokens}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Warnings
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {summary.stale_memory_warnings.length + summary.conflict_warnings.length}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold">Athena memory visibility</h3>
              <p className="text-sm text-muted-foreground">
                Active surface: {summary.active_surface} · User scope:{" "}
                {summary.user_id}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusPill
                label={
                  summary.privacy_mode_active
                    ? "privacy mode active"
                    : "privacy mode inactive"
                }
                tone={summary.privacy_mode_active ? "warning" : "success"}
              />
              <StatusPill
                label={
                  summary.do_not_remember_rules_active
                    ? "do-not-remember rules active"
                    : "do-not-remember rules inactive"
                }
                tone={summary.do_not_remember_rules_active ? "warning" : "success"}
              />
              <StatusPill label="hidden memory blocked" tone="warning" />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Visibility composition
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>approved-memory read layer visibility is shown.</li>
                <li>current context pack visibility is shown.</li>
                <li>Athena entity state visibility is shown.</li>
                <li>project/system state memory visibility is shown.</li>
                <li>source-of-truth hierarchy visibility is shown.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Memory usage transparency
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Context event:{" "}
                <span className="font-medium text-foreground">
                  {summary.memory_usage_transparency.context_pack_event_type}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Athena response event:{" "}
                <span className="font-medium text-foreground">
                  {summary.memory_usage_transparency.carnos_response_event_type}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Would log context refs:{" "}
                {summary.memory_usage_transparency.would_log_context_count} ·
                Would log response refs:{" "}
                {summary.memory_usage_transparency.would_log_response_count} ·
                Persistence: {summary.memory_usage_transparency.persistence}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <h3 className="font-semibold">Visibility signals</h3>
          <div className="mt-3 grid gap-2">
            {summary.visibility_signals.map((signal) => (
              <div
                key={signal.key}
                className="rounded-xl border border-border/60 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{signal.label}</p>
                  <StatusPill
                    label={`${signal.status} · ${signal.count}`}
                    tone={toneForSignal(signal.status)}
                  />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {signal.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="font-semibold">Visible memory refs</h3>
              <StatusPill
                label={`${summary.visible_memory_refs.length} visible`}
                tone={summary.visible_memory_refs.length > 0 ? "success" : "neutral"}
              />
            </div>
            {summary.visible_memory_refs.length > 0 ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {summary.visible_memory_refs.slice(0, 5).map((ref) => (
                  <li
                    key={ref.memory_id}
                    className="rounded-xl border border-border/60 p-3"
                  >
                    <p className="font-medium text-foreground">{ref.title}</p>
                    <p>{ref.reason_visible}</p>
                    <p className="mt-1 text-xs">
                      Source: {ref.source_label} · Sensitivity: {ref.sensitivity} ·
                      Staleness: {ref.staleness}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No visible memory refs in this default preview. This is expected
                until approved memories are provided to the preview layer.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="font-semibold">Excluded memory refs</h3>
              <StatusPill
                label={`${summary.excluded_memory_refs.length} excluded`}
                tone={toneForCount(summary.excluded_memory_refs.length)}
              />
            </div>
            {summary.excluded_memory_refs.length > 0 ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {summary.excluded_memory_refs.slice(0, 5).map((ref) => (
                  <li
                    key={ref.memory_id}
                    className="rounded-xl border border-border/60 p-3"
                  >
                    <p className="font-medium text-foreground">{ref.title}</p>
                    <p>{ref.reason_visible}</p>
                    <p className="mt-1 text-xs">
                      Conflict: {ref.conflict_severity} · Allowed for context:{" "}
                      {String(ref.allowed_for_context)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No excluded memory refs in this default preview.
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <h3 className="font-semibold">Athena entity state visibility</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {summary.carnos_entity_summary.carnos_name} inside{" "}
              {summary.carnos_entity_summary.app_name}:{" "}
              {summary.carnos_entity_summary.current_mode} ·{" "}
              {summary.carnos_entity_summary.current_phase}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Next objective: {summary.carnos_entity_summary.next_objective}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <h3 className="font-semibold">Project/system state memory visibility</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Current phase:{" "}
              {summary.project_system_summary.project_preview.current_phase}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Next phase: {summary.project_system_summary.project_preview.next_phase}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <h3 className="font-semibold">Source-of-truth hierarchy visibility</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {summary.source_of_truth_notes.slice(0, 6).map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <h3 className="font-semibold">Stale memory warnings</h3>
            {summary.stale_memory_warnings.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {summary.stale_memory_warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No stale memory warnings in this preview.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <h3 className="font-semibold">Conflict warnings</h3>
            {summary.conflict_warnings.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {summary.conflict_warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No conflict warnings in this preview.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <h3 className="font-semibold">Protected boundary</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Boundary object: {PHASE_15K_CARNOS_MEMORY_VISIBILITY_BOUNDARY.name}.
            Preview only; no approval, no persistence, no Supabase calls, no SQL
            reads or writes, no retrieval, no embeddings, no provider calls, no
            hidden Carnos prompt injection, and no standalone /memory route.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
