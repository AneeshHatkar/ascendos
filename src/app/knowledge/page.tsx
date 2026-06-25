import {
  AuthenticatedDashboardShell,
  KnowledgeVaultAlignmentV1,
} from "@/components/dashboard";
import { getLearningProjectDashboardDataSummary } from "@/lib/dashboard";
import {
  listProjectLinks,
  listProjects,
  listSkillPaths,
  listSkills,
} from "@/lib/repositories";

function collectErrors(results: Array<{ error: string | null }>) {
  return results.flatMap((result) => (result.error ? [result.error] : []));
}

export default function KnowledgePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Knowledge Vault"
        description="Read-only knowledge alignment surface for learning and project source records. Full memory/RAG remains deferred."
      >
        {async ({ user }) => {
          const [data, skillPaths, skills, projects, projectLinks] = await Promise.all([
            getLearningProjectDashboardDataSummary(user.id),
            listSkillPaths(user.id, { limit: 100 }),
            listSkills(user.id, { limit: 100 }),
            listProjects(user.id, { limit: 100 }),
            listProjectLinks(user.id, { limit: 100 }),
          ]);

          return (
            <KnowledgeVaultAlignmentV1
              data={data}
              skillPaths={skillPaths.data ?? []}
              skills={skills.data ?? []}
              projects={projects.data ?? []}
              projectLinks={projectLinks.data ?? []}
              readErrors={collectErrors([skillPaths, skills, projects, projectLinks])}
            />
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}
