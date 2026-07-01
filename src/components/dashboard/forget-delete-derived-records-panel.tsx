import {
  createForgetDeleteDerivedRecordsPreview,
  PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_BOUNDARY,
} from "@/lib/carnos-continuity/forget-delete-derived-records";
import { DataList, MetricTile, SectionCard, StatusPill } from "@/components/dashboard";

/**
 * Phase 15O Forget/Delete Derived Records.
 *
 * forget request contract.
 * derived records inventory.
 * delete derived records preview.
 * memory_forgotten audit event preview.
 * derived_records_deleted audit event preview.
 * embedding_removed audit event preview.
 * no destructive delete.
 * no SQL reads or writes.
 * no Supabase calls.
 * no embeddings.
 * no vector search.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * no standalone /memory route.
 * Phase 15P — Memory Audit Events + Memory Usage Transparency.
 */

function toneForBlocked(count: number): "success" | "warning" | "danger" {
  if (count === 0) return "success";
  if (count < 3) return "warning";
  return "danger";
}

export function ForgetDeleteDerivedRecordsPanel() {
  const result = createForgetDeleteDerivedRecordsPreview();
  const summary = result.summary;

  return (
    <SectionCard
      eyebrow="Phase 15O Forget/Delete Derived Records"
      title="Forget/delete derived records preview"
      description="Visible, preview-only plan for forgetting memory and cleaning derived records. This does not execute destructive deletes, SQL writes, Supabase calls, embedding removal, vector search, provider calls, or hidden Carnos prompt injection."
      action={
        <>
          <StatusPill label="forget request contract" tone="info" />
          <StatusPill label="derived records inventory" tone="success" />
          <StatusPill label="no destructive delete" tone="danger" />
          <StatusPill label="Phase 15P next" tone="info" />
        </>
      }
    >
      <div className="grid gap-3 md:grid-cols-4">
        <MetricTile
          label="Forget requests"
          value={summary.request_count}
          description="Preview requests."
        />
        <MetricTile
          label="Derived records"
          value={summary.derived_record_count}
          description="Inventoried only."
        />
        <MetricTile
          label="Audit previews"
          value={summary.audit_event_preview_count}
          description="Not persisted."
        />
        <MetricTile
          label="Blocked/deferred"
          value={summary.blocked_request_count}
          description="Runtime delete disabled."
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <SectionCard
          eyebrow="forget request contract"
          title="Forget/delete requests"
          description="Each request shows confirmation, sensitivity, source-of-truth status, and requested action before any future execution."
          action={<StatusPill label={`${summary.request_count} requests`} tone="info" />}
        >
          <DataList
            emptyState="No forget/delete request previews."
            items={result.requests.map((request) => ({
              id: request.id,
              title: request.target_title,
              description: `${request.requested_action} · ${request.domain_scope} · ${request.reason}`,
              meta: [
                request.sensitivity,
                request.user_confirmation_present ? "confirmation present" : "missing confirmation",
                request.source_of_truth_record ? "source-of-truth" : "normal memory",
              ],
            }))}
          />
        </SectionCard>

        <SectionCard
          eyebrow="derived records inventory"
          title="Derived cleanup plan"
          description="Derived records are shown as a future cleanup plan only. Phase 15O never deletes or unlinks records."
          action={<StatusPill label={`${summary.derived_record_count} derived`} tone="success" />}
        >
          <DataList
            emptyState="No derived records inventoried."
            items={result.derived_records.map((record) => ({
              id: record.id,
              title: `${record.target_table} · ${record.target_id}`,
              description: record.reason,
              meta: [
                record.relationship,
                record.delete_mode,
                record.would_delete ? "would delete" : "no delete",
                record.would_unlink ? "would unlink" : "no unlink",
                record.would_remove_embedding ? "embedding_removed preview" : "no embedding removal",
              ],
            }))}
          />
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <SectionCard
          eyebrow="blocked runtime delete"
          title="Decisions and blocked reasons"
          description="All runtime execution stays blocked/deferred because destructive delete, SQL runtime, Supabase runtime, and audit persistence are not enabled here."
          action={
            <StatusPill
              label={`${summary.blocked_request_count} blocked/deferred`}
              tone={toneForBlocked(summary.blocked_request_count)}
            />
          }
        >
          <DataList
            emptyState="No blocked forget/delete decisions."
            items={result.decisions.map((decision, index) => ({
              id: `decision-${decision.request_id}-${index}`,
              title: decision.decision,
              description: decision.preview_note,
              meta: decision.blocked_reasons,
            }))}
          />
        </SectionCard>

        <SectionCard
          eyebrow="audit event preview"
          title="Audit events that would be created later"
          description="Phase 15O only previews memory_forgotten, derived_records_deleted, and embedding_removed audit events."
          action={<StatusPill label="preview only" tone="neutral" />}
        >
          <DataList
            emptyState="No audit event previews."
            items={result.audit_event_previews.map((event, index) => ({
              id: `audit-${event.event_type}-${event.entity_id ?? "no-entity"}-${index}`,
              title: event.event_type,
              description: event.summary,
              meta: [
                event.entity_kind,
                event.entity_id ?? "no entity id",
                event.no_persistence ? "no persistence" : "persistence enabled",
              ],
            }))}
          />
        </SectionCard>
      </div>

      <SectionCard
        className="mt-5"
        eyebrow="protected boundary"
        title="Phase 15O does not execute deletion"
        description={`Boundary object: ${PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_BOUNDARY.name}. No destructive delete, no SQL reads or writes, no Supabase calls, no embeddings, no vector search, no provider calls, no hidden Carnos prompt injection, and no standalone /memory route.`}
      >
        <DataList
          emptyState="No deletion plan notes."
          items={result.deletion_plan_notes.map((note, index) => ({
            id: `deletion-plan-note-${index}`,
            title: "Deletion plan note",
            description: note,
            meta: ["preview only", "no destructive delete"],
          }))}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Next phase: {summary.next_phase}. Memory usage transparency and audit-event persistence remain
          governed future work.
        </p>
      </SectionCard>
    </SectionCard>
  );
}
