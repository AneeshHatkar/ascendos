import {
  createRetrievalContractPreview,
  type RetrievalContractResult,
} from "@/lib/carnos-continuity/retrieval-contract";
import { DataList } from "./data-list";
import { MetricTile } from "./metric-tile";
import { SectionCard } from "./section-card";
import { StatusPill } from "./status-pill";

/**
 * Phase 15M Retrieval Contract + Provenance + Conflict Handling.
 *
 * retrieval contract.
 * provenance required.
 * conflict handling.
 * source authority.
 * visible source labels.
 * allowed retrieval surfaces.
 * blocked retrieval reasons.
 * memory retrieval remains preview-only.
 * knowledge retrieval remains preview-only.
 * no SQL reads or writes.
 * no Supabase calls.
 * no embeddings.
 * no vector search.
 * no provider calls.
 * no hidden Carnos prompt injection.
 * standalone /memory route remains absent.
 * Phase 15N — Embedding Boundary / Noop Provider.
 */

type RetrievalContractPanelProps = {
  result?: RetrievalContractResult;
};

function toneForBlocked(count: number) {
  return count > 0 ? "warning" : "success";
}

export function RetrievalContractPanel({
  result = createRetrievalContractPreview(),
}: RetrievalContractPanelProps) {
  const { summary } = result;

  return (
    <SectionCard
      eyebrow="Phase 15M Retrieval Contract"
      title="Retrieval contract, provenance, and conflict handling"
      description="Preview-only retrieval boundary for Carnos memory and knowledge references. It defines what would be allowed, blocked, source-visible, or conflict-reviewed before any real retrieval, embeddings, SQL runtime, or provider calls exist."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <MetricTile
          label="Candidates"
          value={summary.total_candidates}
          description="Local preview refs."
        />
        <MetricTile
          label="Blocked/deferred"
          value={summary.blocked_preview_count}
          description="Boundary-protected refs."
        />
        <MetricTile
          label="Conflicts"
          value={summary.conflict_warning_count}
          description="Review warnings."
        />
        <MetricTile
          label="Missing provenance"
          value={summary.missing_provenance_count}
          description="Source visibility gaps."
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatusPill label="retrieval contract" tone="info" />
        <StatusPill label="provenance required" tone="success" />
        <StatusPill label="conflict handling" tone="warning" />
        <StatusPill label="visible source labels" tone="success" />
        <StatusPill label="no SQL reads or writes" tone="neutral" />
        <StatusPill label="no embeddings" tone="neutral" />
        <StatusPill label="no provider calls" tone="neutral" />
        <StatusPill label="no hidden Carnos prompt injection" tone="neutral" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <SectionCard
          eyebrow="Allowed preview refs"
          title="Would-be visible retrieval refs"
          description="Phase 15M does not actually retrieve. This list only shows refs that pass the local contract checks."
        >
          {result.allowed_refs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No refs are fully retrieval-allowed because runtime retrieval and embedding boundaries remain deferred.
            </p>
          ) : (
            <DataList
              emptyState="No allowed retrieval refs in this preview."
              items={result.allowed_refs.map((ref) => ({
                id: ref.id,
                title: ref.title,
                description: `${ref.source_label} · ${ref.visibility_note}`,
                meta: [
                  ref.retrieval_decision,
                  ref.domain_scope,
                  ref.conflict_summary.conflict_severity,
                ],
              }))}
            />
          )}
        </SectionCard>

        <SectionCard
          eyebrow="Blocked retrieval reasons"
          title="Blocked/deferred preview refs"
          description="Blocked refs explain why hidden or unsafe retrieval cannot happen."
        >
          <div className="mb-3">
            <StatusPill
              label={`${result.blocked_refs.length} blocked/deferred`}
              tone={toneForBlocked(result.blocked_refs.length)}
            />
          </div>
          <DataList
            emptyState="No blocked retrieval refs in this preview."
            items={result.blocked_refs.map((ref) => ({
              id: ref.id,
              title: ref.title,
              description: `${ref.visibility_note} Source: ${ref.source_label}`,
              meta: [
                ref.retrieval_decision,
                ...ref.blocked_reasons.slice(0, 3),
              ],
            }))}
          />
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <SectionCard
          eyebrow="Provenance"
          title="Required visible source contract"
          description="Every retrieval preview must keep provenance visible, especially source type, source label, route, and phase."
        >
          <DataList
            emptyState="No provenance requirements configured."
            items={summary.provenance_requirements.map((requirement) => ({
              id: requirement.field,
              title: requirement.field,
              description: requirement.reason,
              meta: [
                requirement.required_for_memory ? "memory required" : "memory optional",
                requirement.required_for_knowledge ? "knowledge required" : "knowledge optional",
              ],
            }))}
          />
        </SectionCard>

        <SectionCard
          eyebrow="Conflict handling"
          title="Warnings and review requirements"
          description="Conflicts are surfaced for the user. Phase 15M does not silently resolve or mutate memory."
        >
          {[...result.conflict_warnings, ...result.provenance_warnings].length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No conflict or provenance warnings in this preview.
            </p>
          ) : (
            <DataList
              emptyState="No retrieval transparency warnings."
              items={[...result.conflict_warnings, ...result.provenance_warnings].map((warning) => ({
                id: warning,
                title: "Retrieval transparency warning",
                description: warning,
                meta: ["visible warning", "requires review if blocking"],
              }))}
            />
          )}
        </SectionCard>
      </div>

      <SectionCard
        className="mt-5"
        eyebrow="Protected boundary"
        title="Phase 15M does not perform retrieval"
        description="This panel documents the retrieval contract before implementation of embeddings, runtime retrieval, vector search, or provider-backed memory use."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {result.boundary.boundary_rules.map((rule) => (
            <div
              key={rule}
              className="rounded-xl border border-border/60 bg-background/40 p-3 text-sm text-muted-foreground"
            >
              {rule}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-background/40 p-3 text-sm text-muted-foreground">
          Next: {summary.next_phase}. Runtime retrieval remains disabled until later phases.
        </div>
      </SectionCard>
    </SectionCard>
  );
}
