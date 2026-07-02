import type { KnowledgeVaultSourceBridgeResult } from "@/lib/current-info-capture";

type KnowledgeVaultSourceBridgePanelProps = {
  bridge: KnowledgeVaultSourceBridgeResult;
};

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function KnowledgeVaultSourceBridgePanel({
  bridge,
}: KnowledgeVaultSourceBridgePanelProps) {
  const { summary, records } = bridge;

  return (
    <section className="rounded-3xl border border-fuchsia-400/20 bg-fuchsia-400/[0.04] p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-fuchsia-200/70">Phase 16N</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Knowledge Vault source bridge</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Read-only bridge from current-info sources into Knowledge Vault review previews.
            This does not save, approve, reject, embed, summarize with an LLM, or mutate records.
          </p>
        </div>
        <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold text-fuchsia-100">
          read-only bridge
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sources</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.totalSources}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Candidates</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.totalCandidates}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ready</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.readyForReviewCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Needs evidence</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.needsEvidenceCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Warnings</p>
          <p className="mt-3 text-3xl font-semibold text-white">{summary.warningCount}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-fuchsia-100">Vault guidance:</span>{" "}
        Review bridge records as evidence previews only. Saving into the Knowledge Vault remains a later
        confirmation-first flow.
      </div>

      <div className="mt-5 grid gap-3">
        {records.slice(0, 6).map((record) => (
          <div key={`${record.sourceId}:${record.candidateId ?? "no-candidate"}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                {formatLabel(record.sourceKind)}
              </span>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-cyan-100">
                {formatLabel(record.reliabilityLabel)}
              </span>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-amber-100">
                {formatLabel(record.freshnessLabel)}
              </span>
              <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-2 py-1 text-fuchsia-100">
                {formatLabel(record.bridgeStatus)}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{record.title}</p>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{record.summary}</p>
            <p className="mt-2 text-xs text-slate-500">
              {record.domain} · {record.suggestedDestination} · {formatDate(record.createdAt)}
            </p>
          </div>
        ))}

        {records.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            No Knowledge Vault source bridge records are available yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export const PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_PANEL_BOUNDARY =
  "Phase 16N panel renders a provided Knowledge Vault source bridge result and cannot fetch, save, approve, reject, embed, or mutate records.";
