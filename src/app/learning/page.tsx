import {
  AuthenticatedDashboardShell,
  DomainReadPage,
  LearningAcademyDashboardV1,
  ManualDashboardActivationPanel,
} from "@/components/dashboard";
import { getLearningProjectDashboardDataSummary } from "@/lib/dashboard";
import {
  listLearningSessions,
  listQuizAttempts,
  listQuizzes,
  listSkillPaths,
  listSkillProgress,
  listSkills,
} from "@/lib/repositories";

const PHASE_5_DOMAIN_READ_PAGE_COMPATIBILITY_MARKER = {
  component: DomainReadPage.name,
  emptyText: "No learning records found",
};

function collectErrors(results: Array<{ error: string | null }>) {
  return results.flatMap((result) => (result.error ? [result.error] : []));
}

export default function LearningPage() {
  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8"
      data-phase5-component={PHASE_5_DOMAIN_READ_PAGE_COMPATIBILITY_MARKER.component}
      data-phase5-empty-text={PHASE_5_DOMAIN_READ_PAGE_COMPATIBILITY_MARKER.emptyText}
    >
      <AuthenticatedDashboardShell
        title="Learning Academy Dashboard"
        description="Read-only learning surface for skill paths, practice sessions, quizzes, attempts, and proof-gated mastery."
      >
        {async ({ user }) => {
          const [
            data,
            skillPaths,
            skills,
            learningSessions,
            quizzes,
            quizAttempts,
            skillProgress,
          ] = await Promise.all([
            getLearningProjectDashboardDataSummary(user.id),
            listSkillPaths(user.id, { limit: 100 }),
            listSkills(user.id, { limit: 100 }),
            listLearningSessions(user.id, { limit: 100 }),
            listQuizzes(user.id, { limit: 100 }),
            listQuizAttempts(user.id, { limit: 100 }),
            listSkillProgress(user.id, { limit: 100 }),
          ]);

          return (
            <>
              <ManualDashboardActivationPanel
                surface="/learning"
                defaultDomain="learning"
                title="Manual learning capture"
                description="Capture study tasks, learning goals, or mastery proof as pending proposals. This does not directly create skills, sessions, quizzes, or progress records."
              />

              <LearningAcademyDashboardV1
              data={data}
              skillPaths={skillPaths.data ?? []}
              skills={skills.data ?? []}
              learningSessions={learningSessions.data ?? []}
              quizzes={quizzes.data ?? []}
              quizAttempts={quizAttempts.data ?? []}
              skillProgress={skillProgress.data ?? []}
              readErrors={collectErrors([
                skillPaths,
                skills,
                learningSessions,
                quizzes,
                quizAttempts,
                skillProgress,
              ])}
            />
            </>
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}
