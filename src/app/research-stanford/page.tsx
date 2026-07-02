import {
  AuthenticatedDashboardShell,
  ResearchCrossDashboardLinks,
  ResearchProposedActionVisibilityPanel,
  ResearchStateBoundaryPanel,
  StanfordApplicationDetailPanel,
  StanfordProfessorLabDetailPanel,
  ResearchSummaryPanel,
  SectionCard,
  StanfordProofLinkagePanel,
  ResearchCurrentInfoSourceServerPanel,
} from "@/components/dashboard";
import { getDashboardCardsForSurface, getResearchStanfordDashboardDataSummary } from "@/lib/dashboard";
import {
  listPhdApplicationAssets,
  listPhdReadinessAssessments,
  listRecommendationTargets,
  listSopVersions,
  listTargetLabs,
  listTargetProfessors,
  listTargetUniversities,
} from "@/lib/repositories";

export default function ResearchStanfordPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Research Stanford"
        description="Read-only Stanford and PhD readiness surface for universities, labs, professors, assets, SOPs, recommendations, and application proof."
      >
        {async ({ user }) => {
          const [
            data,
            universities,
            labs,
            professors,
            applicationAssets,
            sopVersions,
            recommendationTargets,
            readinessAssessments,
          ] = await Promise.all([
            getResearchStanfordDashboardDataSummary(user.id),
            listTargetUniversities(user.id, { limit: 100 }),
            listTargetLabs(user.id, { limit: 100 }),
            listTargetProfessors(user.id, { limit: 100 }),
            listPhdApplicationAssets(user.id, { limit: 100 }),
            listSopVersions(user.id, { limit: 100 }),
            listRecommendationTargets(user.id, { limit: 100 }),
            listPhdReadinessAssessments(user.id, { limit: 100 }),
          ]);

          const cards = getDashboardCardsForSurface("research_stanford");
          const readErrors = [
            universities.error,
            labs.error,
            professors.error,
            applicationAssets.error,
            sopVersions.error,
            recommendationTargets.error,
            readinessAssessments.error,
          ].filter((error): error is string => Boolean(error));

          return (
            <>
              <ResearchCurrentInfoSourceServerPanel userId={user.id} surfaceLabel="Stanford research" />

              <ResearchCrossDashboardLinks activeRoute="/research-stanford" />

              <ResearchSummaryPanel
                title="Research Stanford"
                subtitle="A read-only operating surface for mapping PhD targets, professor fit, Stanford readiness, SOP progress, recommendation targets, and application assets."
                boundaryNote="Phase 10 route boundary: this page does not scrape labs, send outreach, generate emails, mutate SQL, or let Carnos act autonomously."
                metrics={[
                  {
                    label: "Universities",
                    value: data.stanford.target_university_count,
                    detail: `${data.stanford.dream_target_count} dream targets`,
                  },
                  {
                    label: "Labs",
                    value: data.stanford.target_lab_count,
                    detail: "Mapped research groups and lab-fit records",
                  },
                  {
                    label: "Professors",
                    value: data.stanford.target_professor_count,
                    detail: `${data.stanford.ready_to_contact_professor_count} ready/contacted/replied/follow-up`,
                  },
                  {
                    label: "Readiness checks",
                    value: data.stanford.readiness_assessment_count,
                    detail: "PhD readiness assessment records",
                  },
                  {
                    label: "Application assets",
                    value: data.stanford.application_asset_count,
                    detail: `${data.stanford.ready_application_asset_count} ready or submitted`,
                  },
                  {
                    label: "Recommendations",
                    value: data.stanford.recommendation_target_count,
                    detail: `${data.stanford.agreed_recommendation_count} agreed or submitted`,
                  },
                ]}
              />

              <SectionCard
                title="Stanford / PhD cards"
                description="Dashboard registry contracts now attached to the Research Stanford surface."
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

              <StanfordProfessorLabDetailPanel
                universities={universities.data ?? []}
                labs={labs.data ?? []}
                professors={professors.data ?? []}
              />

              <StanfordApplicationDetailPanel
                readinessAssessments={readinessAssessments.data ?? []}
                applicationAssets={applicationAssets.data ?? []}
                sopVersions={sopVersions.data ?? []}
                recommendationTargets={recommendationTargets.data ?? []}
              />

              <StanfordProofLinkagePanel
                universities={universities.data ?? []}
                labs={labs.data ?? []}
                professors={professors.data ?? []}
                applicationAssets={applicationAssets.data ?? []}
                sopVersions={sopVersions.data ?? []}
                recommendationTargets={recommendationTargets.data ?? []}
              />

              <ResearchProposedActionVisibilityPanel />

              <ResearchStateBoundaryPanel surface="research_stanford" readErrors={readErrors} />

              <SectionCard
                title="Stanford route boundary"
                description="This route is visibility-only until later safe-write and outreach workflows are explicitly implemented."
                eyebrow="Safe-write law"
              >
                <p className="text-sm text-slate-300">
                  This surface can show target fit and readiness state, but it cannot contact
                  professors, submit applications, or write records without the proposed-action
                  confirmation loop.
                </p>
              </SectionCard>
            </>
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}
