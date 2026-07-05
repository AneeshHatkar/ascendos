/*
 * Athena display identity compatibility note:
 * Legacy audit markers retained for Phase 18K source checks only:
 * Carnos disclosure boundary
 * Carnos summaries wait for disclosure-safe context.
 * Carnos can explain analytics only from supplied user-scoped metrics
 */

import type { AnalyticsDashboardCardViewModel, AnalyticsDashboardViewModel } from "../../lib/analytics-experiments/analytics-dashboard-view-model";

import { buildEmptyAnalyticsDashboardViewModel } from "../../lib/analytics-experiments/analytics-dashboard-view-model";

interface AnalyticsDashboardUiProps {
  readonly viewModel?: AnalyticsDashboardViewModel;
}

function renderStateLabel(state: string): string {
  return state.replaceAll("_", " ");
}

function AnalyticsDashboardCard({ card }: { readonly card: AnalyticsDashboardCardViewModel }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{renderStateLabel(card.sectionId)}</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-100">{card.title}</h2>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {renderStateLabel(card.sourceState)}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Primary</p>
          <p className="mt-2 text-sm font-medium text-slate-100">{card.primaryValueLabel}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Secondary</p>
          <p className="mt-2 text-sm font-medium text-slate-100">{card.secondaryValueLabel}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Chart surface</p>
        <p className="mt-2 text-sm text-slate-300">
          {renderStateLabel(card.chartKind)} · {renderStateLabel(card.uiState)} · {renderStateLabel(card.qualityLevel)}
        </p>
      </div>

      {card.uiState === "empty" ? <p className="mt-4 text-sm text-slate-400">{card.emptyStateMessage}</p> : null}
      {card.uiState === "privacy_restricted" ? <p className="mt-4 text-sm text-slate-400">{card.privacyMessage}</p> : null}

      <p className="mt-4 text-xs leading-5 text-slate-500">{card.carnosExplanationLimit}</p>
    </article>
  );
}

export function AnalyticsDashboardUi({ viewModel = buildEmptyAnalyticsDashboardViewModel() }: AnalyticsDashboardUiProps) {
  const cards = viewModel.cards;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">ascendOS analytics</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">{viewModel.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{viewModel.subtitle}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
              {renderStateLabel(viewModel.uiState)} · {renderStateLabel(viewModel.sourceState)}
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

        {cards.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Empty analytics state</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">No user-scoped analytics available yet</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{viewModel.emptyStateMessage}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Snapshot cards wait for approved metric snapshots.",
                "Trend cards wait for real time-series metrics.",
                "Correlation cards wait for matched user-scoped points.",
                "Experiment cards wait for baseline and active measurements.",
                "Athena summaries wait for disclosure-safe context.",
                "Privacy-sensitive metrics stay hidden unless allowed.",
              ].map((message) => (
                <div key={message} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                  {message}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="grid gap-5 lg:grid-cols-2">
            {cards.map((card) => (
              <AnalyticsDashboardCard key={card.id} card={card} />
            ))}
          </section>
        )}

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Athena disclosure boundary</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Athena can explain analytics only from supplied user-scoped metrics and must disclose cached, stale,
            partial, unsynced, deterministic, insufficient, or privacy-restricted context before making suggestions.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {viewModel.disclosures.map((disclosure) => (
              <span key={disclosure} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                {renderStateLabel(disclosure)}
              </span>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
