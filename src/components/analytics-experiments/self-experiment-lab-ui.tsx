import type {
  SelfExperimentLabPanelViewModel,
  SelfExperimentLabViewModel,
} from "../../lib/analytics-experiments/self-experiment-lab-view-model";

import { buildEmptySelfExperimentLabViewModel } from "../../lib/analytics-experiments/self-experiment-lab-view-model";

interface SelfExperimentLabUiProps {
  readonly viewModel?: SelfExperimentLabViewModel;
}

function readableLabel(value: string): string {
  return value.split("_").join(" ");
}

function SelfExperimentLabPanel({ panel }: { readonly panel: SelfExperimentLabPanelViewModel }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{readableLabel(panel.sectionId)}</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-100">{panel.title}</h2>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {readableLabel(panel.readinessState)}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{panel.description}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Primary</p>
          <p className="mt-2 text-sm font-medium text-slate-100">{panel.primaryLabel}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Secondary</p>
          <p className="mt-2 text-sm font-medium text-slate-100">{panel.secondaryLabel}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Boundary</p>
        <p className="mt-2 text-sm text-slate-300">
          {readableLabel(panel.actionBoundary)} · {readableLabel(panel.sourceState)} · {readableLabel(panel.qualityLevel)}
        </p>
      </div>

      {panel.uiState === "empty" ? <p className="mt-4 text-sm text-slate-400">{panel.emptyStateMessage}</p> : null}
      {panel.uiState === "privacy_restricted" ? <p className="mt-4 text-sm text-slate-400">{panel.privacyMessage}</p> : null}
      {panel.uiState === "review_required" ? <p className="mt-4 text-sm text-slate-400">{panel.reviewMessage}</p> : null}

      <p className="mt-4 text-xs leading-5 text-slate-500">{panel.carnosExplanationLimit}</p>
    </article>
  );
}

export function SelfExperimentLabUi({ viewModel = buildEmptySelfExperimentLabViewModel() }: SelfExperimentLabUiProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">ascendOS experiments</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">{viewModel.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{viewModel.subtitle}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
              {readableLabel(viewModel.uiState)} · {readableLabel(viewModel.sourceState)}
            </div>
          </div>
        </header>

        {viewModel.uiState === "loading" ? (
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-300">
            {viewModel.loadingMessage}
          </section>
        ) : null}

        {viewModel.uiState === "error" ? (
          <section className="rounded-3xl border border-red-400/20 bg-red-950/20 p-6 text-sm text-red-100">
            {viewModel.errorMessage}
          </section>
        ) : null}

        {viewModel.uiState === "privacy_restricted" ? (
          <section className="rounded-3xl border border-amber-400/20 bg-amber-950/20 p-6 text-sm text-amber-100">
            {viewModel.privacyMessage}
          </section>
        ) : null}

        {viewModel.panels.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Empty self-experiment state</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">No self-experiments available yet</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{viewModel.emptyStateMessage}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                "Template library waits for approved experiment templates.",
                "Draft review waits for a real user-scoped experiment draft.",
                "Baseline and active windows wait for real measurements.",
                "Confounder review waits for user-provided context.",
                "Lesson candidates require review before memory writes.",
                "Actions remain disabled until a later approved execution path.",
              ].map((message) => (
                <div key={message} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                  {message}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="grid gap-5 xl:grid-cols-2">
            {viewModel.panels.map((panel) => (
              <SelfExperimentLabPanel key={panel.id} panel={panel} />
            ))}
          </section>
        )}

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Review-before-memory-write boundary</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{viewModel.reviewMessage}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {viewModel.disclosures.map((disclosure) => (
              <span key={disclosure} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                {readableLabel(disclosure)}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
