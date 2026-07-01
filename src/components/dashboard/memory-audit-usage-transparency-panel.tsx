import {
  createMemoryAuditUsageTransparencyPreview,
  PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_BOUNDARY,
} from "@/lib/carnos-continuity/memory-audit-usage-transparency";
import { DataList, MetricTile, SectionCard, StatusPill } from "@/components/dashboard";

/**
 * Phase 15P Memory Audit Events + Memory Usage Transparency.
 *
 * memory audit event contract.
 * memory usage transparency.
 * memory_events preview.
 * memory_usage_logs preview.
 * candidate_created.
 * memory_forgotten.
 * memory_used_in_context_pack.
 * memory_used_in_carnos_response.
 * private_mode_enabled.
 * conflict_detected.
 * stale_memory_detected.
 * visible memory usage ledger.
 * hidden memory usage blocked.
 * no SQL reads or writes.
 * no Supabase calls.
 * no persistence.
 * no embeddings.
 * no vector search.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * no standalone /memory route.
 * Phase 15Q — Cross-Domain Integration Preview.
 */

function toneForBlocked(count: number): "success" | "warning" | "danger" {
  if (count === 0) return "success";
  if (count < 3) return "warning";
  return "danger";
}

export function MemoryAuditUsageTransparencyPanel() {
  const result = createMemoryAuditUsageTransparencyPreview();
  const summary = result.summary;

  return (
    <SectionCard
      eyebrow="Phase 15P Memory Audit Events + Memory Usage Transparency"
      title="Memory audit and usage transparency preview"
      description="Visible, preview-only ledger for memory audit events and memory usage. This does not persist memory_events, memory_usage_logs, SQL writes, Supabase calls, embeddings, vector search, provider calls, or hidden Carnos prompt injection."
      action={
        <>
          <StatusPill label="memory audit event contract" tone="info" />
          <StatusPill label="memory usage transparency" tone="success" />
          <StatusPill label="no persistence" tone="danger" />
          <StatusPill label="Phase 15Q next" tone="info" />
        </>
      }
    >
      <div className="grid gap-3 md:grid-cols-4">
        <MetricTile
          label="Audit previews"
          value={summary.audit_event_preview_count}
          description="memory_events preview."
        />
        <MetricTile
          label="Usage refs"
          value={summary.usage_reference_count}
          description="memory_usage_logs preview."
        />
        <MetricTile
          label="Context uses"
          value={summary.context_pack_usage_count}
          description="Visible pack usage."
        />
        <MetricTile
          label="Hidden blocked"
          value={summary.hidden_usage_blocked_count}
          description="No ghost memory."
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <SectionCard
          eyebrow="memory_events preview"
          title="Memory audit event previews"
          description="Shows candidate_created, memory_forgotten, private_mode_enabled, conflict_detected, stale_memory_detected, and usage-related audit events without persistence."
          action={<StatusPill label={`${summary.audit_event_preview_count} events`} tone="info" />}
        >
          <DataList
            emptyState="No memory audit event previews."
            items={result.audit_event_previews.map((event) => ({
              id: event.id,
              title: event.event_type,
              description: event.user_visible_explanation,
              meta: [
                event.entity_kind,
                event.domain_scope,
                event.sensitivity,
                event.visibility,
                event.would_write_memory_events ? "would write memory_events later" : "no event write",
                event.persistence_enabled ? "persistence enabled" : "preview only",
              ],
            }))}
          />
        </SectionCard>

        <SectionCard
          eyebrow="memory_usage_logs preview"
          title="Memory usage transparency ledger"
          description="Shows which memory references would be used, excluded, redacted, or blocked from hidden use."
          action={<StatusPill label={`${summary.usage_reference_count} refs`} tone="success" />}
        >
          <DataList
            emptyState="No memory usage references."
            items={result.usage_references.map((reference) => ({
              id: reference.id,
              title: reference.title,
              description: reference.visible_reason,
              meta: [
                reference.domain_scope,
                reference.sensitivity,
                reference.used_in_context_pack ? "memory_used_in_context_pack" : "not in context pack",
                reference.used_in_carnos_response ? "memory_used_in_carnos_response" : "not in Carnos response",
                reference.excluded_from_context_pack ? "excluded" : "included/eligible",
                reference.blocked_from_hidden_usage ? "hidden memory usage blocked" : "visible usage allowed",
              ],
            }))}
          />
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <SectionCard
          eyebrow="visible memory usage ledger"
          title="Transparency counts"
          description="Future persistence would split durable audit rows and usage rows. Phase 15P only previews both ledgers."
          action={<StatusPill label="preview-only ledger" tone="neutral" />}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <MetricTile
              label="Would write memory_events"
              value={summary.would_write_memory_events_count}
              description="Later only."
            />
            <MetricTile
              label="Would write usage logs"
              value={summary.would_write_memory_usage_logs_count}
              description="Later only."
            />
            <MetricTile
              label="Carnos response uses"
              value={summary.carnos_response_usage_count}
              description="Visible only."
            />
            <MetricTile
              label="Redacted events"
              value={summary.redacted_event_count}
              description="Sensitive summaries."
            />
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="hidden memory usage blocked"
          title="No ghost memory rule"
          description="Carnos must not secretly use memory. Any future memory reference used in a context pack or response must be visible, explainable, source-labeled, and auditable."
          action={
            <StatusPill
              label={`${summary.hidden_usage_blocked_count} blocked`}
              tone={toneForBlocked(summary.hidden_usage_blocked_count)}
            />
          }
        >
          <DataList
            emptyState="No transparency notes."
            items={result.transparency_notes.map((note, index) => ({
              id: `phase-15p-transparency-note-${index}`,
              title: "Transparency note",
              description: note,
              meta: ["preview only", "no hidden Carnos prompt injection"],
            }))}
          />
        </SectionCard>
      </div>

      <SectionCard
        className="mt-5"
        eyebrow="protected boundary"
        title="Phase 15P does not persist audit or usage logs"
        description={`Boundary object: ${PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_BOUNDARY.name}. No SQL reads or writes, no Supabase calls, no persistence, no embeddings, no vector search, no provider calls, no hidden Carnos prompt injection, and no standalone /memory route.`}
      >
        <DataList
          emptyState="No boundary rules."
          items={result.boundary.boundary_rules.map((rule, index) => ({
            id: `phase-15p-boundary-rule-${index}`,
            title: "Boundary rule",
            description: rule,
            meta: ["memory audit logs", "memory usage transparency"],
          }))}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Next phase: {summary.next_phase}. Cross-domain memory integration remains preview-only and
          must not create hidden memory usage.
        </p>
      </SectionCard>
    </SectionCard>
  );
}
