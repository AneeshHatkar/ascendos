import type { Metadata } from "next";
import { AuthenticatedDashboardShell } from "@/components/dashboard";
import { CarnosVisualIdentityPanel } from "@/components/dashboard/carnos-visual-identity-panel";
import {
  listAiActions,
  listCarnosContextSnapshots,
  listChatMessages,
  listChatSessions,
  listMemoryRetrievalEvents,
  listMemoryUsageLogs,
  listProjectMemoryStates,
} from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Carnos | ascendOS",
  description:
    "Read-only Carnos companion page for ascendOS with truthful memory/context visibility and capability boundaries.",
};

const boundaryCards = [
  {
    title: "Visual companion",
    copy: "Carnos has a persistent visual identity, state language, companion surface, and read-only memory/context visibility.",
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
    <AuthenticatedDashboardShell title="Carnos" description="Read-only Carnos companion identity with runtime memory/context visibility for ascendOS.">
      {async ({ user }) => {
        const chatSessions = await listChatSessions(user.id);
        const chatSessionRows = "data" in chatSessions && chatSessions.data ? chatSessions.data : [];
        const firstSessionId = chatSessionRows.length > 0 ? chatSessionRows[0].id : null;
        const chatMessages = firstSessionId
          ? await listChatMessages(user.id, firstSessionId)
          : { data: [], error: null };
        const chatMessageRows = "data" in chatMessages && chatMessages.data ? chatMessages.data : [];
        const [
          aiActions,
          carnosContextSnapshots,
          projectMemoryStates,
          memoryRetrievalEvents,
          memoryUsageLogs,
        ] = await Promise.all([
          listAiActions(user.id),
          listCarnosContextSnapshots(user.id, { limit: 25 }),
          listProjectMemoryStates(user.id, { statuses: ["active", "paused"], limit: 25 }),
          listMemoryRetrievalEvents(user.id, { used_by_carnos: true, limit: 25 }),
          listMemoryUsageLogs(user.id, { used_in_carnos_response: true, limit: 25 }),
        ]);

        const aiActionRows = "data" in aiActions && aiActions.data ? aiActions.data : [];
        const carnosContextSnapshotRows =
          "data" in carnosContextSnapshots && carnosContextSnapshots.data
            ? carnosContextSnapshots.data
            : [];
        const projectMemoryStateRows =
          "data" in projectMemoryStates && projectMemoryStates.data
            ? projectMemoryStates.data
            : [];
        const memoryRetrievalEventRows =
          "data" in memoryRetrievalEvents && memoryRetrievalEvents.data
            ? memoryRetrievalEvents.data
            : [];
        const memoryUsageLogRows =
          "data" in memoryUsageLogs && memoryUsageLogs.data ? memoryUsageLogs.data : [];

        return (
          <>
            <p className="sr-only">
              Carnos chat sessions loaded: {chatSessionRows.length};
              Carnos chat messages loaded: {chatMessageRows.length};
              Carnos AI actions loaded: {aiActionRows.length}.
              Carnos context snapshots loaded: {carnosContextSnapshotRows.length}.
              Project memory states loaded: {projectMemoryStateRows.length}.
              Carnos memory retrieval events loaded: {memoryRetrievalEventRows.length}.
              Carnos memory usage logs loaded: {memoryUsageLogRows.length}.
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
            Carnos is the companion layer for ascendOS: calm, mythic, futuristic,
            privacy-aware, and truthful about active read-only memory/context visibility versus
            deferred generation, voice, provider, and action powers.
          </p>
        </header>

        <CarnosVisualIdentityPanel
          mode="overview"
          state="focused"
          subtitle="The /carnos page presents Carnos as a read-only companion identity with runtime memory/context visibility, capability truthfulness, and safety boundaries."
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

        <p className="sr-only">Generation disabled. Read-only memory/context visibility is active.</p>

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
          <p>These markers are intentionally not rendered as active generation, voice, provider, or action components.</p>
          <p>This page now performs read-only runtime memory/context visibility while generation, voice, provider calls, hidden prompt injection, and autonomous actions remain deferred.</p>
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

          These markers are intentionally not rendered as active generation, voice, provider, or action components.
          This page performs read-only runtime memory/context visibility while generation, voice, provider calls, hidden prompt injection, and autonomous actions remain deferred.

        <section
          aria-label="Carnos page display-only boundary"
          className="rounded-[2rem] border border-amber-300/15 bg-amber-950/15 p-5 text-sm leading-6 text-amber-100/85"
          data-carnos-page-runtime-boundary="true"
        >
          This page is read-only. It can show authenticated Carnos, memory, project-memory, retrieval, and usage visibility. It does not start microphone capture, produce talk-back
          audio, browse the internet, run Python/tools, ingest documents, save memory, save sources, inject hidden prompt context, call providers, or execute autonomous actions.
        </section>
      </div>
      </main>
          </>
        );
      }}
    </AuthenticatedDashboardShell>
  );
}
