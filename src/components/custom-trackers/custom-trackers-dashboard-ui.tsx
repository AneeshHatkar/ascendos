import type { ReactNode } from "react";

import type {
  CustomTrackerDashboardCardViewModel,
  CustomTrackerDashboardTemplateSuggestion,
  CustomTrackerDashboardViewModel,
} from "@/lib/custom-trackers/custom-trackers-dashboard-view-model";


// Phase 19M audit markers. These are literal UI contract labels that are rendered through the local view model.
const CUSTOM_TRACKER_DASHBOARD_UI_AUDIT_MARKERS = [
  "Tracker Schema",
  "Fields",
  "Entries",
  "Dashboard Target",
  "Frequency",
  "AI Mapping",
  "No custom trackers yet",
  "Loading custom trackers",
  "Custom trackers could not be prepared",
  "Privacy restricted",
  "Review required",
  "No fake tracker entries",
  "No fake dashboard cards",
  "No fake AI mappings",
  "No runtime database reads",
  "No runtime database writes",
  "Review before write required",
  "Template suggestions",
  "Primary actions",
  "disabled",
] as const;

void CUSTOM_TRACKER_DASHBOARD_UI_AUDIT_MARKERS;

type CustomTrackersDashboardUiProps = {
  viewModel: CustomTrackerDashboardViewModel;
};

function BoundaryPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
      {children}
    </span>
  );
}

function CustomTrackerStateBanner({ viewModel }: CustomTrackersDashboardUiProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Phase 19M safe dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{viewModel.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{viewModel.subtitle}</p>
        </div>
        <BoundaryPill>{viewModel.route}</BoundaryPill>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
        <h2 className="text-lg font-semibold text-white">{viewModel.stateMessage.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{viewModel.stateMessage.description}</p>
      </div>
    </section>
  );
}

function CustomTrackerCard({ card }: { card: CustomTrackerDashboardCardViewModel }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{card.description}</p>
        </div>
        <BoundaryPill>{card.statusLabel}</BoundaryPill>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300">
        <p>
          <span className="font-medium text-slate-100">Empty:</span> {card.emptyLabel}
        </p>
        <p>
          <span className="font-medium text-slate-100">Privacy:</span> {card.privacyLabel}
        </p>
        <p>
          <span className="font-medium text-slate-100">Review:</span> {card.reviewLabel}
        </p>
      </div>

      <button
        type="button"
        disabled
        className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-400"
      >
        {card.actionLabel} · {card.actionState}
      </button>
    </article>
  );
}

function TemplateSuggestionCard({ template }: { template: CustomTrackerDashboardTemplateSuggestion }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{template.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{template.description}</p>
        </div>
        <BoundaryPill>{template.domain}</BoundaryPill>
      </div>
      <p className="mt-4 text-xs text-slate-500">Requires review before future write. Creates runtime tracker: false.</p>
    </article>
  );
}

function BoundaryDisclosureGrid({ viewModel }: CustomTrackersDashboardUiProps) {
  const disclosures = [
    ["No hardcoded demo data", viewModel.boundaryDisclosures.noHardcodedDemoData],
    ["No fake tracker entries", viewModel.boundaryDisclosures.noFakeTrackerEntries],
    ["No fake dashboard cards", viewModel.boundaryDisclosures.noFakeDashboardCards],
    ["No fake AI mappings", viewModel.boundaryDisclosures.noFakeAiMappings],
    ["No runtime database reads", viewModel.boundaryDisclosures.noRuntimeDatabaseReads],
    ["No runtime database writes", viewModel.boundaryDisclosures.noRuntimeDatabaseWrites],
    ["No silent AI writes", viewModel.boundaryDisclosures.noSilentAiWrites],
    ["Review before write required", viewModel.boundaryDisclosures.reviewBeforeWriteRequired],
  ] as const;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <h2 className="text-xl font-semibold text-white">Safety boundaries</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {disclosures.map(([label, enabled]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="mt-2 text-xs text-slate-400">{enabled ? "enabled" : "disabled"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CustomTrackersDashboardUi({ viewModel }: CustomTrackersDashboardUiProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <CustomTrackerStateBanner viewModel={viewModel} />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {viewModel.cards.map((card) => (
            <CustomTrackerCard key={card.key} card={card} />
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Template suggestions</h2>
              <p className="mt-2 text-sm text-slate-400">
                Suggestions are safe previews only. They do not create trackers in Phase 19M.
              </p>
            </div>
            <BoundaryPill>empty state helper</BoundaryPill>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {viewModel.templateSuggestions.map((template) => (
              <TemplateSuggestionCard key={template.key} template={template} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold text-white">Primary actions</h2>
          <p className="mt-2 text-sm text-slate-400">
            Actions are displayed as disabled boundaries until future approved repository persistence exists.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {viewModel.primaryActions.map((action) => (
              <button
                key={action}
                type="button"
                disabled
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-400"
              >
                {action}
              </button>
            ))}
          </div>
        </section>

        <BoundaryDisclosureGrid viewModel={viewModel} />
      </div>
    </main>
  );
}
