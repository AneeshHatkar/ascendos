import {
  PHASE_15N_EMBEDDING_BOUNDARY,
  createEmbeddingBoundaryPreview,
} from "@/lib/carnos-continuity/embedding-boundary";

import { MetricTile } from "./metric-tile";
import { SectionCard } from "./section-card";
import { StatusPill } from "./status-pill";

/**
 * Phase 15N Embedding Boundary / Noop Provider.
 * embedding boundary.
 * noop provider.
 * disabled by design.
 * no embeddings generated.
 * no provider calls.
 * no vector search.
 * no pgvector.
 * no SQL reads or writes.
 * no Supabase calls.
 * no hidden Carnos prompt injection.
 * standalone /memory route remains absent.
 * Phase 15O — Forget/Delete Derived Records.
 */

function toneForBlockedCount(count: number) {
  return count > 0 ? "warning" : "success";
}

function formatReasons(reasons: string[]) {
  return reasons.map((reason) => reason.replaceAll("_", " ")).join(" · ");
}

export function EmbeddingBoundaryPanel() {
  const result = createEmbeddingBoundaryPreview();
  const summary = result.summary;

  return (
    <SectionCard
      eyebrow="Phase 15N Embedding Boundary"
      title="Embedding Boundary / Noop Provider"
      description="Disabled-by-design boundary for future memory and knowledge embeddings. This panel uses a local noop provider only and does not generate embeddings, call providers, write SQL, use vector search, or inject hidden Carnos context."
    >
      <div className="flex flex-wrap gap-2">
        <StatusPill label="embedding boundary" tone="info" />
        <StatusPill label="noop provider" tone="neutral" />
        <StatusPill label="disabled by design" tone="warning" />
        <StatusPill label="no embeddings generated" tone="danger" />
        <StatusPill label="no provider calls" tone="danger" />
        <StatusPill label="no vector search" tone="danger" />
        <StatusPill label="Phase 15O next" tone="info" />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricTile
          label="Inputs"
          value={summary.total_inputs}
          description="Preview refs checked against the boundary."
        />
        <MetricTile
          label="Blocked"
          value={summary.blocked_count}
          description="Blocked by noop/provider/runtime rules."
        />
        <MetricTile
          label="Generated"
          value={summary.provider.generated_embedding_count}
          description="Always zero in Phase 15N."
        />
        <MetricTile
          label="Provider calls"
          value={summary.provider.provider_call_count}
          description="Always zero in Phase 15N."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          eyebrow="NoopEmbeddingProvider"
          title="Provider boundary"
          description="Noop provider confirms that future embedding infrastructure is blocked until an explicit later implementation phase."
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Status: <span className="text-foreground">{summary.provider.status}</span>
            </p>
            <p>
              SQL writes: {summary.provider.sql_write_count} · Vector search:{" "}
              {summary.provider.vector_search_count}
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {summary.provider.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Boundary rules"
          title="Blocked capabilities"
          description="These rules must remain visible before any future embedding or retrieval runtime is unlocked."
        >
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {summary.boundary_markers.map((marker) => (
              <li key={marker} className="rounded-xl border border-border/60 p-3">
                {marker}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        eyebrow="Preview refs"
        title="Future embedding candidates remain blocked"
        description="Phase 15N shows what would be checked later, but does not embed memory, knowledge, retrieval refs, context packs, or Carnos responses."
      >
        <div className="space-y-3">
          {summary.preview_refs.map((ref) => (
            <div key={ref.id} className="rounded-2xl border border-border/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{ref.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Surface: {ref.surface} · Source: {ref.source_phase} · {ref.source_label}
                  </p>
                </div>
                <StatusPill
                  label={ref.decision}
                  tone={toneForBlockedCount(ref.blocked_reasons.length)}
                />
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{ref.content_preview}</p>

              <div className="mt-3 grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
                <p>Reasons: {formatReasons(ref.blocked_reasons)}</p>
                <p>
                  Generated: {String(ref.would_generate_embedding)} · Provider call:{" "}
                  {String(ref.would_call_provider)}
                </p>
                <p>
                  SQL write: {String(ref.would_write_sql)} · Vector search:{" "}
                  {String(ref.would_use_vector_search)}
                </p>
                <p>Hidden Carnos injection: {String(ref.hidden_carnos_injection)}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Protected boundary"
        title="Phase 15N does not implement embedding runtime"
        description={`Boundary object: ${PHASE_15N_EMBEDDING_BOUNDARY.name}. This phase adds only a visible noop provider contract. No embeddings generated, no provider calls, no SQL reads or writes, no Supabase calls, no vector search, no pgvector, no hidden Carnos prompt injection, and no standalone /memory route.`}
      >
        <p className="text-sm text-muted-foreground">
          Next phase: {summary.next_phase}. Forget/delete derived record handling must be
          implemented before any future derived-memory or derived-knowledge artifacts are
          allowed to exist.
        </p>
      </SectionCard>
    </SectionCard>
  );
}
