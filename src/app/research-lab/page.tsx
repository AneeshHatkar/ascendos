import {
  AuthenticatedDashboardShell,
  ResearchClaimCitationDetailPanel,
  ResearchExperimentResultDetailPanel,
  ResearchIdeaDetailPanel,
  ResearchLiteratureDetailPanel,
  ResearchPaperVenueDetailPanel,
  ResearchProofLinkagePanel,
  ResearchStateBoundaryPanel,
  ResearchSummaryPanel,
  SectionCard,
} from "@/components/dashboard";
import { getDashboardCardsForSurface, getResearchStanfordDashboardDataSummary } from "@/lib/dashboard";
import {
  listResearchCitations,
  listResearchClaims,
  listResearchExperiments,
  listResearchFeedback,
  listResearchIdeas,
  listResearchLiteratureItems,
  listResearchPapers,
  listResearchPaperVersions,
  listResearchQuestions,
  listResearchResults,
  listResearchSubmissions,
  listResearchVenues,
} from "@/lib/repositories";

export default function ResearchLabPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Research Lab"
        description="Read-only research surface for ideas, literature, citations, claims, experiments, results, papers, venues, submissions, and feedback."
      >
        {async ({ user }) => {
          const [
            data,
            ideas,
            questions,
            literatureItems,
            citations,
            claims,
            experiments,
            results,
            papers,
            paperVersions,
            venues,
            submissions,
            feedback,
          ] = await Promise.all([
            getResearchStanfordDashboardDataSummary(user.id),
            listResearchIdeas(user.id, { limit: 100 }),
            listResearchQuestions(user.id, { limit: 100 }),
            listResearchLiteratureItems(user.id, { limit: 100 }),
            listResearchCitations(user.id, { limit: 100 }),
            listResearchClaims(user.id, { limit: 100 }),
            listResearchExperiments(user.id, { limit: 100 }),
            listResearchResults(user.id, { limit: 100 }),
            listResearchPapers(user.id, { limit: 100 }),
            listResearchPaperVersions(user.id, { limit: 100 }),
            listResearchVenues(user.id, { limit: 100 }),
            listResearchSubmissions(user.id, { limit: 100 }),
            listResearchFeedback(user.id, { limit: 100 }),
          ]);

          const cards = getDashboardCardsForSurface("research_lab");
          const readErrors = [
            ideas.error,
            questions.error,
            literatureItems.error,
            citations.error,
            claims.error,
            experiments.error,
            results.error,
            papers.error,
            paperVersions.error,
            venues.error,
            submissions.error,
            feedback.error,
          ].filter((error): error is string => Boolean(error));

          return (
            <>
              <ResearchSummaryPanel
                title="Research Lab"
                subtitle="A read-only operating surface for turning research ideas into cited claims, reproducible experiments, results, and paper-ready proof."
                boundaryNote="Phase 10 route boundary: this page reads research state only. It does not create papers, mutate SQL, submit work, contact professors, or allow Carnos to write."
                metrics={[
                  {
                    label: "Ideas",
                    value: data.research.research_idea_count,
                    detail: `${data.research.active_research_idea_count} active or exploring`,
                  },
                  {
                    label: "Literature",
                    value: data.research.literature_item_count,
                    detail: `${data.research.cited_literature_count} cited`,
                  },
                  {
                    label: "Citations",
                    value: data.research.citation_count,
                    detail: "Evidence links across literature, claims, papers, and versions",
                  },
                  {
                    label: "Claims",
                    value: data.research.claim_count,
                    detail: `${data.research.supported_claim_count} supported`,
                  },
                  {
                    label: "Experiments",
                    value: data.research.experiment_count,
                    detail: `${data.research.completed_experiment_count} completed`,
                  },
                  {
                    label: "Papers",
                    value: data.research.paper_count,
                    detail: `${data.research.submission_ready_paper_count} submission-ready or beyond`,
                  },
                ]}
              />

              <SectionCard
                title="Research cards"
                description="Dashboard registry contracts now attached to the Research Lab surface."
                eyebrow="Registry"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  {cards.map((card) => (
                    <article
                      key={card.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">
                        {card.region} · {card.priority}
                      </p>
                      <h2 className="mt-2 text-base font-semibold text-white">{card.title}</h2>
                      <p className="mt-1 text-sm text-slate-300">{card.description}</p>
                      <p className="mt-3 text-xs text-slate-500">
                        Sources: {card.sourceTables.join(", ")}
                      </p>
                    </article>
                  ))}
                </div>
              </SectionCard>

              <ResearchIdeaDetailPanel ideas={ideas.data ?? []} questions={questions.data ?? []} />

              <ResearchLiteratureDetailPanel literatureItems={literatureItems.data ?? []} />

              <ResearchClaimCitationDetailPanel
                claims={claims.data ?? []}
                citations={citations.data ?? []}
              />

              <ResearchExperimentResultDetailPanel
                experiments={experiments.data ?? []}
                results={results.data ?? []}
              />

              <ResearchPaperVenueDetailPanel
                papers={papers.data ?? []}
                paperVersions={paperVersions.data ?? []}
                venues={venues.data ?? []}
                submissions={submissions.data ?? []}
                feedback={feedback.data ?? []}
              />

              <ResearchProofLinkagePanel
                ideas={ideas.data ?? []}
                citations={citations.data ?? []}
                claims={claims.data ?? []}
                experiments={experiments.data ?? []}
                results={results.data ?? []}
                papers={papers.data ?? []}
              />

              <ResearchStateBoundaryPanel surface="research_lab" readErrors={readErrors} />

              <SectionCard
                title="Research route boundary"
                description="This route intentionally exposes visibility before action."
                eyebrow="Safe-write law"
              >
                <p className="text-sm text-slate-300">
                  Python/ML advises. The app validates. The user confirms. The server writes. SQL
                  records. Audit logs. Phase 10 read routes do not bypass this loop.
                </p>
              </SectionCard>
            </>
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}
