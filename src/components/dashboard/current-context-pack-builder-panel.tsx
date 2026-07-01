import {
  PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_BOUNDARY,
  createDefaultCurrentContextPackBuilderResult,
  type CurrentContextPackBuilderResult,
} from "@/lib/carnos-continuity";
import { SectionCard, StatusPill } from "@/components/dashboard";

/**
 * Phase 15J Project Panel Audit markers:
 * - Current Context Pack Builder + Context Budget Rules
 * - Current context pack
 * - context budget rules
 * - token budget
 * - section budget
 * - included memory refs
 * - excluded memory refs
 * - approved-memory read layer
 * - Carnos entity state
 * - project/system state memory
 * - source-of-truth hierarchy
 * - stale memory warnings
 * - conflict warnings
 * - privacy mode active
 * - do-not-remember rules active
 * - memory_used_in_context_pack
 * - no hidden Carnos prompt injection
 * - standalone /memory route
 */

type CurrentContextPackBuilderPanelProps = {
  result?: CurrentContextPackBuilderResult;
};

function toneForOverBudget(overBudget: boolean) {
  return overBudget ? "warning" : "success";
}

function toneForCount(count: number) {
  return count > 0 ? "warning" : "neutral";
}

export function CurrentContextPackBuilderPanel({
  result = createDefaultCurrentContextPackBuilderResult(),
}: CurrentContextPackBuilderPanelProps) {
  const contextPack = result.context_pack;

  return (
    <SectionCard
      title="Phase 15J Current Context Pack Builder"
      description="Preview-only current context pack builder with context budget rules, section budgets, visible included/excluded memory refs, and no hidden Carnos prompt injection."
      action={
        <StatusPill
          label={
            contextPack.token_budget.over_budget
              ? "Budget review"
              : "Preview only"
          }
          tone={toneForOverBudget(contextPack.token_budget.over_budget)}
        />
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Included memory refs
            </p>
            <p className="mt-2 text-2xl font-semibold">{result.included_count}</p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Excluded memory refs
            </p>
            <p className="mt-2 text-2xl font-semibold">{result.excluded_count}</p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Token budget
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {contextPack.token_budget.estimated_total_tokens}/
              {contextPack.token_budget.max_total_estimated_tokens}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Warnings
            </p>
            <p className="mt-2 text-2xl font-semibold">{result.warning_count}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold">Current context pack</h3>
              <p className="text-sm text-muted-foreground">
                Active route: {contextPack.active_route ?? "not set"} · Active
                project: {contextPack.active_project ?? "not set"} · Active
                phase: {contextPack.active_phase ?? "not set"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusPill
                label={
                  contextPack.privacy_mode_active
                    ? "privacy mode active"
                    : "privacy mode inactive"
                }
                tone={contextPack.privacy_mode_active ? "warning" : "success"}
              />
              <StatusPill
                label={
                  contextPack.do_not_remember_rules_active
                    ? "do-not-remember rules active"
                    : "do-not-remember rules inactive"
                }
                tone={
                  contextPack.do_not_remember_rules_active
                    ? "warning"
                    : "success"
                }
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Source sections
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Carnos entity state: visible summary only.</li>
                <li>Project/system state memory: visible summary only.</li>
                <li>Source-of-truth hierarchy: FINAL_SYNCED-first ordering.</li>
                <li>Approved-memory read layer: already-ranked refs only.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Usage event preview
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Event type:{" "}
                <span className="font-medium text-foreground">
                  {contextPack.memory_usage_event_preview.event_type}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Would log: {contextPack.memory_usage_event_preview.would_log_count}{" "}
                refs · Persistence:{" "}
                {contextPack.memory_usage_event_preview.persistence}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <h3 className="font-semibold">Section budget</h3>
          <div className="mt-3 grid gap-2">
            {contextPack.section_budget_usages.map((usage) => (
              <div
                key={usage.section}
                className="rounded-xl border border-border/60 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{usage.section}</p>
                  <StatusPill
                    label={usage.over_budget ? "over budget" : "within budget"}
                    tone={toneForOverBudget(usage.over_budget)}
                  />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Items: {usage.used_items}/{usage.max_items} · Estimated tokens:{" "}
                  {usage.estimated_tokens}/{usage.max_estimated_tokens}
                </p>
                {usage.notes.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                    {usage.notes.slice(0, 3).map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="font-semibold">Included memory refs</h3>
              <StatusPill
                label={`${contextPack.included_memory_refs.length} included`}
                tone={contextPack.included_memory_refs.length > 0 ? "success" : "neutral"}
              />
            </div>
            {contextPack.included_memory_refs.length > 0 ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {contextPack.included_memory_refs.slice(0, 5).map((ref) => (
                  <li key={ref.memory_id} className="rounded-xl border border-border/60 p-3">
                    <p className="font-medium text-foreground">{ref.title}</p>
                    <p>{ref.reason_included}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No memory refs are included in this default preview.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="font-semibold">Excluded memory refs</h3>
              <StatusPill
                label={`${contextPack.excluded_memory_refs.length} excluded`}
                tone={toneForCount(contextPack.excluded_memory_refs.length)}
              />
            </div>
            {contextPack.excluded_memory_refs.length > 0 ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {contextPack.excluded_memory_refs.slice(0, 5).map((ref) => (
                  <li key={ref.memory_id} className="rounded-xl border border-border/60 p-3">
                    <p className="font-medium text-foreground">{ref.title}</p>
                    <p>{ref.reason_included}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No excluded memory refs are present in this default preview.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <h3 className="font-semibold">Context budget notes</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {contextPack.context_budget_notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <h3 className="font-semibold">Stale memory warnings</h3>
            {contextPack.stale_memory_warnings.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {contextPack.stale_memory_warnings.map((warning) => (
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
            {contextPack.conflict_warnings.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {contextPack.conflict_warnings.map((warning) => (
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
            Boundary object: {PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_BOUNDARY.name}.
            Preview only; no approval, no persistence, no Supabase calls, no SQL
            reads or writes, no embeddings, no provider calls, no hidden Carnos
            prompt injection, and no standalone /memory route.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
