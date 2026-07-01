import {
  createCarnosEntityStatePreview,
  summarizeCarnosEntityState,
  PHASE_15H_CARNOS_ENTITY_STATE_BOUNDARY,
  type CarnosEntityStatePreview,
} from "@/lib/carnos-continuity";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatusPill } from "@/components/dashboard/status-pill";

/**
 * Phase 15H Carnos Entity State
 *
 * Approved dashboard preview only.
 * No hidden Carnos injection, no context pack builder, no retrieval,
 * no SQL reads or writes, no provider calls, no embeddings, no standalone /memory route.
 */

interface CarnosEntityStatePanelProps {
  state?: CarnosEntityStatePreview;
}

function toneForPolicy(status: "locked" | "needs_review" | "deferred") {
  if (status === "locked") {
    return "success" as const;
  }

  if (status === "needs_review") {
    return "warning" as const;
  }

  return "info" as const;
}

function toneForHealth(status: CarnosEntityStatePreview["state_health"]) {
  if (status === "ready") {
    return "success" as const;
  }

  if (status === "needs_review") {
    return "warning" as const;
  }

  if (status === "privacy_limited") {
    return "info" as const;
  }

  return "neutral" as const;
}

export function CarnosEntityStatePanel({
  state = createCarnosEntityStatePreview(),
}: CarnosEntityStatePanelProps) {
  const summary = summarizeCarnosEntityState(state);

  return (
    <SectionCard
      eyebrow="Phase 15H Carnos Entity State"
      title="Carnos persistent entity preview"
      description="Preview-only Carnos identity, role, mission, tone, current mode, current phase, policies, and forbidden behaviors. This panel does not inject hidden prompts, retrieve memory, build context packs, persist data, call providers, or create a standalone /memory route."
    >
      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Entity</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {summary.carnos_name}
            </p>
            <p className="mt-1 text-xs text-slate-500">{summary.app_name}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Mode</p>
            <p className="mt-2 text-lg font-semibold text-white">{state.mode_label}</p>
            <p className="mt-1 text-xs text-slate-500">{summary.current_mode}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Health</p>
            <div className="mt-2">
              <StatusPill label={summary.state_health} tone={toneForHealth(summary.state_health)} />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {summary.locked_policy_count}/{summary.policy_check_count} policy checks locked
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Next</p>
            <p className="mt-2 text-sm font-semibold text-white">{state.next_phase}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Role</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{summary.role}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Mission</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{summary.mission}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Current continuity</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Current phase</dt>
                <dd className="text-slate-200">{summary.current_phase}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Latest milestone</dt>
                <dd className="text-slate-200">{summary.latest_milestone}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Next objective</dt>
                <dd className="text-slate-200">{summary.next_objective}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Tone</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{summary.tone}</p>
            <p className="mt-4 text-xs text-slate-500">
              Response preferences are previewed as entity state only; no Carnos prompt is injected here.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Policy checks</p>
            <div className="mt-3 space-y-3">
              {state.policy_checks.map((check) => (
                <div key={check.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{check.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{check.reason}</p>
                    </div>
                    <StatusPill label={check.status} tone={toneForPolicy(check.status)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Forbidden behaviors</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {state.forbidden_behaviors.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Memory policy</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {state.memory_policy.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Source-of-truth policy</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {state.source_of_truth_policy.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Protected boundary</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {state.boundary_notes.map((note) => (
              <StatusPill key={note} label={note} tone="neutral" />
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Boundary object: {PHASE_15H_CARNOS_ENTITY_STATE_BOUNDARY.name}. Preview only; no approval, no persistence, no Supabase calls, no SQL reads or writes, no retrieval, no embeddings, no provider calls, no hidden Carnos prompt injection, no context pack builder.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
