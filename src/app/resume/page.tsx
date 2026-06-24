import { AuthenticatedDashboardShell, ResumeDashboardV1 } from "@/components/dashboard";
import {
  listDailyLogs,
  listGoals,
  listProofItems,
  listResumeBullets,
  listResumeVersions,
  listTasks,
} from "@/lib/repositories";

export default function ResumePage() {
  return (
    <AuthenticatedDashboardShell
      title="Resume"
      description="Read-only resume surface for versions, role targeting, keyword alignment, and application proof."
    >
      {async ({ user }) => {
        const [versions, bullets, goals, tasks, proofItems, dailyLogs] = await Promise.all([
          listResumeVersions(user.id, { limit: 50 }),
          listResumeBullets(user.id, { limit: 100 }),
          listGoals(user.id, { domain: "career", limit: 20 }),
          listTasks(user.id, { domain: "career", limit: 20 }),
          listProofItems(user.id, { domain: "career", limit: 20 }),
          listDailyLogs(user.id, { limit: 20 }),
        ]);

        const readErrors = [
          versions.error,
          bullets.error,
          goals.error,
          tasks.error,
          proofItems.error,
          dailyLogs.error,
        ].filter((error): error is string => Boolean(error));

        return (
          <ResumeDashboardV1
            versions={versions.data ?? []}
            bullets={bullets.data ?? []}
            goals={goals.data ?? []}
            tasks={tasks.data ?? []}
            proofItems={proofItems.data ?? []}
            dailyLogs={dailyLogs.data ?? []}
            readErrors={readErrors}
          />
        );
      }}
    </AuthenticatedDashboardShell>
  );
}
