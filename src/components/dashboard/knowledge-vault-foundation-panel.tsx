import {
  createKnowledgeVaultFoundationPreview,
  type KnowledgeVaultFoundationResult,
} from "@/lib/carnos-continuity";
import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";

/**
 * Phase 15L Knowledge Vault Foundation.
 *
 * Carnos Memory Visibility Panel handoff to Knowledge Vault Foundation.
 * Knowledge vault separation.
 * knowledge_items.
 * knowledge_tags.
 * knowledge_links.
 * non-personal knowledge records.
 * source material metadata.
 * tags and link previews.
 * memory conversion requires review.
 * not personal memory.
 * embedded: false.
 * retrieval deferred.
 * upload parsing deferred.
 * no approval.
 * no persistence.
 * no Supabase calls.
 * no SQL reads or writes.
 * no retrieval.
 * no embeddings.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * no standalone /memory route.
 * standalone `/memory` route.
 * Phase 15M — Retrieval Contract + Provenance + Conflict Handling.
 */

interface KnowledgeVaultFoundationPanelProps {
  result?: KnowledgeVaultFoundationResult;
}

function toneForStatus(status: string) {
  if (status === "active") return "success";
  if (status === "needs_review") return "warning";
  if (status === "archived") return "neutral";
  return "info";
}

function shortText(value: string, maxLength = 180) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value;
}

export function KnowledgeVaultFoundationPanel({
  result,
}: KnowledgeVaultFoundationPanelProps) {
  const preview = result ?? createKnowledgeVaultFoundationPreview();

  return (
    <section className="flex flex-col gap-6">
      <SectionCard
        eyebrow="Phase 15L Knowledge Vault Foundation"
        title="Knowledge vault separation"
        description="Read-only foundation for non-personal knowledge records, source metadata, tags, and links. Runtime knowledge-vault reads are active, while memory approval, writes, embeddings, provider calls, hidden Carnos context injection, and standalone /memory routing remain deferred."
      >
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <MetricTile
            label="Items"
            value={preview.summary.total_items}
            description="Knowledge vault item previews."
          />
          <MetricTile
            label="Tags"
            value={preview.summary.tag_count}
            description="Tag metadata previews."
          />
          <MetricTile
            label="Links"
            value={preview.summary.link_count}
            description="Knowledge link previews."
          />
          <MetricTile
            label="Memory"
            value={preview.summary.personal_memory_count}
            description="Always zero in Phase 15L."
          />
          <MetricTile
            label="Embedded"
            value={preview.summary.embedded_item_count}
            description="Always zero in Phase 15L."
          />
          <MetricTile
            label="Next"
            value="15M"
            description="Retrieval contract only."
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusPill label="knowledge_items" tone="info" />
          <StatusPill label="knowledge_tags" tone="info" />
          <StatusPill label="knowledge_links" tone="info" />
          <StatusPill label="not personal memory" tone="success" />
          <StatusPill label="embedded: false" tone="success" />
          <StatusPill label="no retrieval" tone="danger" />
          <StatusPill label="no embeddings" tone="danger" />
          <StatusPill label="no provider calls" tone="danger" />
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="vault items"
        title="Visible knowledge records"
        description="These records represent source/reference knowledge metadata with runtime read visibility. Conversion into personal memory remains deferred and requires explicit future review."
      >
        {preview.visible_items.length === 0 ? (
          <EmptyState
            title="No visible knowledge vault items."
            description="The current filter has no item previews."
          />
        ) : (
          <div className="grid gap-3 lg:grid-cols-3">
            {preview.visible_items.map((item) => (
              <div
                key={item.id ?? item.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                      {item.source_kind} · {item.domain_scope}
                    </p>
                  </div>
                  <StatusPill label={item.status} tone={toneForStatus(item.status)} />
                </div>

                <p className="mt-3 text-sm text-white/70">
                  {shortText(item.content_summary)}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <StatusPill key={tag} label={tag} tone="neutral" />
                  ))}
                </div>

                <div className="mt-4 space-y-1 text-xs text-white/50">
                  <p>Source: {item.source_label}</p>
                  <p>Sensitivity: {item.sensitivity}</p>
                  <p>Links: {item.link_count}</p>
                  <p>Personal memory: {String(item.is_personal_memory)}</p>
                  <p>Embedded: {String(item.embedded)}</p>
                  <p>Conversion review required: {String(item.conversion_review_required)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          eyebrow="tags"
          title="Knowledge tags"
          description="Tag previews organize knowledge items without retrieval, embeddings, or provider calls."
        >
          <div className="space-y-3">
            {preview.tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{tag.tag_name}</p>
                  <p className="text-xs text-white/45">Scope: {tag.tag_scope}</p>
                </div>
                <StatusPill label={`${tag.item_count} item(s)`} tone="info" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="links"
          title="Knowledge links"
          description="Link previews show possible source relationships only; they do not write, retrieve, or execute anything."
        >
          <div className="space-y-3">
            {preview.links.map((link) => (
              <div
                key={link.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{link.link_label}</p>
                  <StatusPill label={link.link_type} tone="neutral" />
                </div>
                <p className="mt-2 text-xs text-white/45">
                  {link.linked_table} · {link.linked_record_id}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        eyebrow="protected boundary"
        title="Knowledge Vault Foundation boundary"
        description="Phase 15L keeps knowledge vault metadata visible while preventing hidden memory behavior."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Separation rules
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
              {preview.summary.separation_rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Deferred capabilities
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
              {preview.deferred_capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Conversion review notes
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
              {preview.conversion_review_notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {preview.summary.boundary_markers.map((marker) => (
            <StatusPill key={marker} label={marker} tone="neutral" />
          ))}
        </div>
      </SectionCard>
    </section>
  );
}
