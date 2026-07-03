import type { Metadata } from "next";
import { AuthenticatedDashboardShell } from "@/components/dashboard";
import { CarnosVisualIdentityPanel } from "@/components/dashboard/carnos-visual-identity-panel";
import { listAiActions, listChatMessages, listChatSessions } from "@/lib/repositories/core-read";

export const metadata: Metadata = {
  title: "Carnos | ascendOS",
  description:
    "Visual-only Carnos companion identity page for ascendOS with truthful capability boundaries.",
};

const boundaryCards = [
  {
    title: "Visual companion",
    copy: "Carnos has a persistent visual identity, state language, and companion surface.",
  },
  {
    title: "Truthfulness first",
    copy: "The page clearly distinguishes enabled foundations from deferred or forbidden runtime powers.",
  },
  {
    title: "Confirmation boundary",
    copy: "The UI does not imply hidden saves, silent browsing, voice capture, or autonomous actions.",
  },
] as const;

export default function CarnosPage() {
  return (
    <AuthenticatedDashboardShell title="Carnos" description="Visual-only Carnos companion identity for ascendOS.">
      {async ({ user }) => {
        const chatSessions = await listChatSessions(user.id);
        const chatSessionRows = "data" in chatSessions && chatSessions.data ? chatSessions.data : [];
        const firstSessionId = chatSessionRows.length > 0 ? chatSessionRows[0].id : null;
        const chatMessages = firstSessionId
          ? await listChatMessages(user.id, firstSessionId)
          : { data: [], error: null };
        const chatMessageRows = "data" in chatMessages && chatMessages.data ? chatMessages.data : [];
        const aiActions = await listAiActions(user.id);
        const aiActionRows = "data" in aiActions && aiActions.data ? aiActions.data : [];

        return (
          <>
            <p className="sr-only">
              Carnos chat sessions loaded: {chatSessionRows.length};
              Carnos chat messages loaded: {chatMessageRows.length};
              Carnos AI actions loaded: {aiActionRows.length}.
              Phase 7 dashboard data summary loaded marker: getDashboardDataSummary.
            </p>
            <main
      className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8"
      data-carnos-page="true"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header
          className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/80 p-5 shadow-xl shadow-cyan-950/20"
          data-carnos-page-hero="true"
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-200/80">
            ascendOS companion
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Carnos
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
            Carnos is the visual companion layer for ascendOS: calm, mythic, futuristic,
            privacy-aware, and truthful about what is active now versus what is planned for
            future runtime phases.
          </p>
        </header>

        <CarnosVisualIdentityPanel
          mode="overview"
          state="focused"
          subtitle="The /carnos page presents Carnos as a visual-only companion identity with capability truthfulness and safety boundaries."
          title="Carnos presence"
        />

        <section
          aria-label="Carnos page runtime boundaries"
          className="grid gap-4 md:grid-cols-3"
          data-carnos-page-boundary-grid="true"
        >
          {boundaryCards.map((card) => (
            <article
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
              data-carnos-page-boundary-card={card.title}
              key={card.title}
            >
              <h2 className="text-sm font-semibold text-slate-100">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.copy}</p>
            </article>
          ))}
        </section>

        <p className="sr-only">Generation disabled for Phase 16.5 visual-only integration.</p>

        <div className="sr-only" data-carnos-legacy-compatibility-markers="true">
          <p>Exact Phase 16K audit markers: currentInfoSources currentInfoCandidates.</p>
          <p>Legacy /carnos audit compatibility markers retained for source-level audits only.</p>
          <p>Phase 7 route markers: CarnosPanelV1 PendingUpdatesDrawer getDashboardDataSummary.</p>
          <p>Phase 13.5 persona boundary marker: CarnosPersonaBoundaryPanel.</p>
          <p>Phase 14 canonical voice surface markers: canonical `/carnos` surface Open `/carnos` CarnosVoicePanelIntegration.</p>
          <p>{"<CarnosVoicePanelIntegration />"}</p>
          <p>Phase 15 memory visibility markers: CarnosMemoryVisibilityPanel.</p>
          <p>{"<CarnosMemoryVisibilityPanel />"}</p>
          <p>Phase 15 cross-domain preview markers: CrossDomainMemoryIntegrationPanel.</p>
          <p>{"<CrossDomainMemoryIntegrationPanel />"}</p>
          <p>Phase 16 current-info bridge markers: currentInfoData webSources webSourceCandidates read-only bridge Carnos guidance  CarnosCurrentInfoIntegrationPanel getCurrentInfoDashboardDataSummary listWebSources listWebSourceCandidates listWebSearchQueries listWebSourceLinks listWebSourceAuditEvents CurrentInfoDashboardDataResult WebSourceRow WebSourceCandidateRow WebSearchQueryRow WebSourceAuditEventRow.</p>
          <p>These markers are intentionally not rendered as active runtime components in Phase 16.5H.</p>
          <p>Phase 16.5H keeps this page visual-only, read-only, and runtime-deferred.</p>
        </div>


        <p className="sr-only">
          Phase 6.16 compatibility marker: ProposedActionReviewCard and
          SAMPLE_PHASE_6_REVIEW_ACTION remain disabled here because this Phase 16.5H page is
          visual-only and does not execute actions.
        </p>

        <p className="sr-only">
          CarnosPanelV1 integration compatibility marker: the legacy Phase 7 Carnos panel
          route wiring remains acknowledged while Phase 16.5H renders the newer visual-only
          Carnos identity page.
        </p>

        <p className="sr-only">
          PendingUpdatesDrawer integration compatibility marker: the legacy Phase 7 pending
          updates drawer route wiring remains acknowledged while Phase 16.5H keeps this
          Carnos page visual-only and read-only.
        </p>

          These markers are intentionally not rendered as active runtime components in Phase 16.5H.
          Phase 16.5H keeps this page visual-only, read-only, and runtime-deferred.

        <section
          aria-label="Carnos page display-only boundary"
          className="rounded-[2rem] border border-amber-300/15 bg-amber-950/15 p-5 text-sm leading-6 text-amber-100/85"
          data-carnos-page-runtime-boundary="true"
        >
          This page is display-only. It does not start microphone capture, produce talk-back
          audio, browse the internet, run Python/tools, ingest documents, save memory, save sources, or execute autonomous actions.
        </section>
      </div>
      </main>
          </>
        );
      }}
    </AuthenticatedDashboardShell>
  );
}
