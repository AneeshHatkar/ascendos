/*
 * Phase 15Q locked UI markers:
 * - whole-project connectivity
 * - visible memory usage ledger
 * - source-of-truth hierarchy visible
 * - do-not-remember can block
 * - no SQL reads or writes
 */

import {
  createCrossDomainIntegrationPreview,
  type CrossDomainIntegrationPreviewResult,
} from "@/lib/carnos-continuity/cross-domain-integration-preview";

import { DataList, MetricTile, SectionCard, StatusPill } from "@/components/dashboard";

type CrossDomainMemoryIntegrationPanelProps = {
  result?: CrossDomainIntegrationPreviewResult;
};

export function CrossDomainMemoryIntegrationPanel({
  result = createCrossDomainIntegrationPreview(),
}: CrossDomainMemoryIntegrationPanelProps) {
  const { summary, refs, route_links: routeLinks, boundary_notes: boundaryNotes } = result;

  return (
    <section className="space-y-4">
      <SectionCard
        eyebrow="Phase 15Q"
        title="Cross-Domain Integration Preview"
        description="Preview-only map for how Carnos memory, context packs, memory usage transparency, retrieval boundaries, privacy controls, and knowledge-vault separation connect across ascendOS."
        action={<StatusPill label="Preview only · no runtime memory" tone="warning" />}
      >
        <div className="grid gap-3 md:grid-cols-4">
          <MetricTile label="Surfaces" value={summary.total_surfaces} description="Cross-domain memory visibility surfaces." />
          <MetricTile label="Visible previews" value={summary.visible_preview_surfaces} description="Surfaces showing memory context previews." />
          <MetricTile label="Usage events" value={summary.usage_event_kinds.length} description="Preview event kinds shown to the user." />
          <MetricTile label="Route links" value={summary.route_link_count} description="Preview-only cross-domain links." />
        </div>

        <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          <p className="font-semibold">Protected Phase 15Q boundary</p>
          <p className="mt-1">
            No SQL reads or writes, no Supabase calls, no persistence, no embeddings, no vector search,
            no provider calls, no hidden Carnos prompt injection, no action execution, and no standalone /memory route.
          </p>
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Whole-project connectivity"
        title="Cross-domain memory surfaces"
        description="Each surface shows where memory may become visible later, which event labels must be transparent, and which hidden behaviors remain blocked."
        action={<StatusPill label="cross-domain memory visibility" tone="info" />}
      >
        <DataList
          emptyState="No cross-domain memory surfaces are available in this preview."
          items={refs.map((ref) => ({
            id: ref.id,
            title: `${ref.surface} · ${ref.title}`,
            description: ref.user_visible_summary,
            meta: [
              ref.domain_scope,
              ref.status,
              `${ref.allowed_memory_types.length} memory types`,
              `${ref.visible_usage_events.length} visible usage events`,
              ref.no_persistence ? "no persistence" : "persistence enabled",
            ],
          }))}
        />
      </SectionCard>

      <SectionCard
        eyebrow="Visible memory usage ledger"
        title="Usage events that must remain user-visible"
        description="Phase 15Q keeps memory_used_in_context_pack and memory_used_in_carnos_response as preview-only event labels until runtime usage is implemented safely."
        action={<StatusPill label="hidden memory usage blocked" tone="success" />}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <MetricTile
            label="Context-pack usage"
            value={refs.filter((ref) => ref.visible_usage_events.includes("memory_used_in_context_pack")).length}
            description="Surfaces that preview memory_used_in_context_pack."
          />
          <MetricTile
            label="Carnos response usage"
            value={refs.filter((ref) => ref.visible_usage_events.includes("memory_used_in_carnos_response")).length}
            description="Surfaces that preview memory_used_in_carnos_response."
          />
          <MetricTile
            label="Conflict warnings"
            value={refs.filter((ref) => ref.visible_usage_events.includes("conflict_detected")).length}
            description="Surfaces requiring conflict visibility."
          />
          <MetricTile
            label="Private mode"
            value={refs.filter((ref) => ref.visible_usage_events.includes("private_mode_enabled")).length}
            description="Surfaces where private mode can block memory."
          />
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Route wiring preview"
        title="Cross-domain route links"
        description="These links document how memory visibility should move between Carnos, Command, Privacy, Knowledge, Goals, Career, and Body without hidden prompt injection."
        action={<StatusPill label="visible ledger required" tone="info" />}
      >
        <DataList
          emptyState="No cross-domain route links are available in this preview."
          items={routeLinks.map((link) => ({
            id: link.id,
            title: link.label,
            description: link.purpose,
            meta: [
              `${link.from_surface} → ${link.to_surface}`,
              link.event_visibility,
              link.prompt_injection_policy,
              link.preview_only ? "preview only" : "runtime",
            ],
          }))}
        />
      </SectionCard>

      <SectionCard
        eyebrow="Source-of-truth hierarchy visible"
        title="Protected boundary notes"
        description="Phase 15Q records the final cross-domain integration constraints before Phase 15R closeout."
        action={<StatusPill label="Phase 15R next" tone="neutral" />}
      >
        <DataList
          emptyState="No Phase 15Q boundary notes are available in this preview."
          items={boundaryNotes.map((note, index) => ({
            id: `phase-15q-boundary-${index}`,
            title: "Boundary note",
            description: note,
            meta: [
              summary.boundary.phase,
              summary.boundary.no_hidden_carnos_prompt_injection ? "no hidden Carnos prompt injection" : "hidden injection allowed",
              summary.boundary.no_standalone_memory_route ? "no standalone /memory route" : "standalone memory route enabled",
            ],
          }))}
        />
      </SectionCard>
    </section>
  );
}
