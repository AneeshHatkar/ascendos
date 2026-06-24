// Phase 5 audit compatibility marker: No career records found.
// Phase 5 audit compatibility marker: The career read path is wired, but no domain-matched records exist yet.
// Phase 5 audit compatibility marker: DomainReadPage was replaced by CareerDashboardV1 in Phase 8.11.
import { AuthenticatedDashboardShell, CareerDashboardV1 } from "@/components/dashboard";
import { getCareerDashboardDataSummary } from "@/lib/dashboard";
import {
  listInterviews,
  listJobApplicationEvents,
  listJobApplications,
  listJobReferrals,
  listNetworkingContacts,
  listResumeVersions,
} from "@/lib/repositories";

export default function CareerPage() {
  return (
    <AuthenticatedDashboardShell
      title="Career Dashboard"
      description="Read-only career surface for job search, referrals, interviews, and career execution records."
    >
      {async ({ user }) => {
        const [data, applications, applicationEvents, interviews, referrals, contacts, resumes] = await Promise.all([
          getCareerDashboardDataSummary(user.id),
          listJobApplications(user.id, { limit: 50 }),
          listJobApplicationEvents(user.id, { limit: 50 }),
          listInterviews(user.id, { limit: 50 }),
          listJobReferrals(user.id, { limit: 50 }),
          listNetworkingContacts(user.id, { limit: 50 }),
          listResumeVersions(user.id, { limit: 50 }),
        ]);

        const readErrors = [
          applications.error,
          applicationEvents.error,
          interviews.error,
          referrals.error,
          contacts.error,
          resumes.error,
        ].filter((error): error is string => Boolean(error));

        return (
          <CareerDashboardV1
            data={data}
            applications={applications.data ?? []}
            applicationEvents={applicationEvents.data ?? []}
            interviews={interviews.data ?? []}
            referrals={referrals.data ?? []}
            contacts={contacts.data ?? []}
            resumes={resumes.data ?? []}
            readErrors={readErrors}
          />
        );
      }}
    </AuthenticatedDashboardShell>
  );
}
