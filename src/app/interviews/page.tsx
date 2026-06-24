import { AuthenticatedDashboardShell, InterviewsDashboardV1 } from "@/components/dashboard";
import { listInterviews } from "@/lib/repositories";

export default function InterviewsPage() {
  return (
    <AuthenticatedDashboardShell
      title="Interviews"
      description="Read-only interview surface for interview practice, question banks, performance notes, and follow-up loops."
    >
      {async ({ user }) => {
        const interviews = await listInterviews(user.id, { limit: 100 });

        const readErrors = [
          interviews.error,
        ].filter((error): error is string => Boolean(error));

        return (
          <InterviewsDashboardV1
            interviews={interviews.data ?? []}
            readErrors={readErrors}
          />
        );
      }}
    </AuthenticatedDashboardShell>
  );
}
