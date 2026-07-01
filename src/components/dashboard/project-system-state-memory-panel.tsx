import {
  createDefaultProjectSystemStateMemorySummary,
  PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_BOUNDARY,
  type ProjectSystemStateMemorySummary,
} from "@/lib/carnos-continuity";

/**
 * Phase 15I Project/System State Memory panel.
 *
 * Carnos Project/System State Memory preview for source-of-truth hierarchy,
 * project continuity, system continuity, active boundaries, deferred scope,
 * verification gates, and outdated roadmap blocking.
 *
 * No hidden Carnos prompt injection, no context pack builder, no retrieval,
 * no embeddings, no provider calls, no Supabase calls, no SQL reads or writes,
 * no persistence, no approval, and no standalone /memory route.
 *
 * Audit markers:
 * - Old 15-phase roadmap
 * - known errors
 * - no hidden Carnos prompt injection
 */

interface ProjectSystemStateMemoryPanelProps {
  summary?: ProjectSystemStateMemorySummary;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65">
      {children}
    </span>
  );
}

function ListBlock({
  title,
  items,
  empty = "None recorded.",
}: {
  title: string;
  items: readonly string[];
  empty?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/40">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm text-white/65">
        {items.length > 0 ? (
          items.map((item) => <li key={item}>• {item}</li>)
        ) : (
          <li>{empty}</li>
        )}
      </ul>
    </div>
  );
}

export function ProjectSystemStateMemoryPanel({
  summary = createDefaultProjectSystemStateMemorySummary(),
}: ProjectSystemStateMemoryPanelProps) {
  const project = summary.project_preview;
  const system = summary.system_preview;
  const hierarchy = summary.hierarchy_evaluation;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Phase 15I Project/System State Memory
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Project/System State Memory + Source-of-Truth Hierarchy
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
              Preview-only continuity surface for ascendOS + Carnos. It shows
              project state, system state, FINAL_SYNCED source hierarchy, active
              boundaries, deferred scope, verification gates, and outdated
              roadmap blocking without reading or writing memory records.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            Hierarchy:{" "}
            {hierarchy.source_hierarchy_valid ? "valid" : "needs review"}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Pill>Project: {project.project_name}</Pill>
        <Pill>App: {system.app_name}</Pill>
        <Pill>AI persona: {system.ai_persona}</Pill>
        <Pill>Active model: {system.active_chunk_model}</Pill>
        <Pill>Next: {summary.next_phase}</Pill>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Project continuity
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {project.current_phase}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            {project.state_summary}
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/60 md:grid-cols-2">
            <p>Latest commit: {project.latest_commit ?? "Not set"}</p>
            <p>Last pushed: {project.last_pushed_commit ?? "Not set"}</p>
            <p>Branch: {project.branch ?? "Not set"}</p>
            <p>Status: {project.status}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            System continuity
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {system.system_name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            {system.state_summary}
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/60 md:grid-cols-2">
            <p>System key: {system.system_key}</p>
            <p>Source rank: {system.source_of_truth_rank}</p>
            <p>Major chunk: {system.current_major_chunk ?? "Not set"}</p>
            <p>Internal step: {system.current_internal_step ?? "Not set"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
          Source-of-truth hierarchy
        </p>
        <div className="mt-4 space-y-3">
          {project.source_hierarchy_preview.map((entry) => (
            <div
              key={`${entry.rank}-${entry.label}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="font-medium text-white">
                  #{entry.rank} · {entry.label}
                </p>
                <Pill>{entry.status}</Pill>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                {entry.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ListBlock title="Active boundaries" items={project.active_boundaries} />
        <ListBlock title="Deferred scope" items={project.deferred_scope} />
        <ListBlock title="Verification gates" items={project.verification_gates} />
        <ListBlock title="Known errors" items={project.known_errors} />
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
          Hierarchy evaluation notes
        </p>
        <ul className="mt-3 space-y-2 text-sm text-white/65">
          {hierarchy.source_hierarchy_notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
        Boundary object: {PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_BOUNDARY.name}.
        Preview only; no approval, no persistence, no Supabase calls, no SQL
        reads or writes, no retrieval, no embeddings, no provider calls, no
        hidden Carnos prompt injection, no context pack builder, and no
        standalone /memory route.
      </div>
    </section>
  );
}
