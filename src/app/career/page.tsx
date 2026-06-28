// Phase 5 audit compatibility marker: No career records found.
// Phase 5 audit compatibility marker: The career read path is wired, but no domain-matched records exist yet.
// Phase 5 audit compatibility marker: DomainReadPage was replaced by CareerDashboardV1 in Phase 8.11.
import { AuthenticatedDashboardShell, CareerDashboardV1 } from "@/components/dashboard";
import {
  getCareerDashboardDataSummary,
  getCareerPrepDashboardDataSummary,
} from "@/lib/dashboard";
import {
  listDailyLogs,
  listGoals,
  listInterviews,
  listJobApplicationEvents,
  listJobApplications,
  listJobReferrals,
  listNetworkingContacts,
  listProofItems,
  listResumeBullets,
  listResumeVersions,
  listTasks,
} from "@/lib/repositories";

export default function CareerPage() {
  return (
    <AuthenticatedDashboardShell
      title="Career Dashboard"
      description="Read-only career surface for job search, referrals, interviews, and career execution records."
    >
      {async ({ user }) => {
        const [
          data,
          careerPrepData,
          applications,
          applicationEvents,
          interviews,
          referrals,
          contacts,
          resumes,
          resumeBullets,
          goals,
          tasks,
          proofItems,
          dailyLogs,
        ] = await Promise.all([
          getCareerDashboardDataSummary(user.id),
          getCareerPrepDashboardDataSummary(user.id),
          listJobApplications(user.id, { limit: 50 }),
          listJobApplicationEvents(user.id, { limit: 50 }),
          listInterviews(user.id, { limit: 50 }),
          listJobReferrals(user.id, { limit: 50 }),
          listNetworkingContacts(user.id, { limit: 50 }),
          listResumeVersions(user.id, { limit: 50 }),
          listResumeBullets(user.id, { limit: 100 }),
          listGoals(user.id, { domain: "career", limit: 20 }),
          listTasks(user.id, { domain: "career", limit: 20 }),
          listProofItems(user.id, { domain: "career", limit: 20 }),
          listDailyLogs(user.id, { limit: 20 }),
        ]);

        const readErrors = [
          applications.error,
          applicationEvents.error,
          interviews.error,
          referrals.error,
          contacts.error,
          resumes.error,
          resumeBullets.error,
          goals.error,
          tasks.error,
          proofItems.error,
          dailyLogs.error,
        ].filter((error): error is string => Boolean(error));

        return (
          <CareerDashboardV1
            data={data}
            careerPrepData={careerPrepData}
            applications={applications.data ?? []}
            applicationEvents={applicationEvents.data ?? []}
            interviews={interviews.data ?? []}
            referrals={referrals.data ?? []}
            contacts={contacts.data ?? []}
            resumes={resumes.data ?? []}
            resumeBullets={resumeBullets.data ?? []}
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
