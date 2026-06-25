import {
  AuthenticatedDashboardShell,
  ProjectBuilderDashboardV1,
} from "@/components/dashboard";
import { getLearningProjectDashboardDataSummary } from "@/lib/dashboard";
import {
  listProjectBugs,
  listProjectLinks,
  listProjectMilestones,
  listProjectReleases,
  listProjects,
  listProjectTests,
} from "@/lib/repositories";

function collectErrors(results: Array<{ error: string | null }>) {
  return results.flatMap((result) => (result.error ? [result.error] : []));
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Project Builder Dashboard"
        description="Read-only project surface for projects, milestones, releases, bugs, tests, links, demos, and proof."
      >
        {async ({ user }) => {
          const [
            data,
            projects,
            milestones,
            bugs,
            tests,
            releases,
            links,
          ] = await Promise.all([
            getLearningProjectDashboardDataSummary(user.id),
            listProjects(user.id, { limit: 100 }),
            listProjectMilestones(user.id, { limit: 100 }),
            listProjectBugs(user.id, { limit: 100 }),
            listProjectTests(user.id, { limit: 100 }),
            listProjectReleases(user.id, { limit: 100 }),
            listProjectLinks(user.id, { limit: 100 }),
          ]);

          return (
            <ProjectBuilderDashboardV1
              data={data}
              projects={projects.data ?? []}
              milestones={milestones.data ?? []}
              bugs={bugs.data ?? []}
              tests={tests.data ?? []}
              releases={releases.data ?? []}
              links={links.data ?? []}
              readErrors={collectErrors([
                projects,
                milestones,
                bugs,
                tests,
                releases,
                links,
              ])}
            />
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}
