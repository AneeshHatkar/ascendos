import { AuthenticatedDashboardShell, ResumeDashboardV1 } from "@/components/dashboard";
import {
  listResumeBullets,
  listResumeVersions,
} from "@/lib/repositories";

export default function ResumePage() {
  return (
    <AuthenticatedDashboardShell
      title="Resume"
      description="Read-only resume surface for versions, role targeting, keyword alignment, and application proof."
    >
      {async ({ user }) => {
        const [versions, bullets] = await Promise.all([
          listResumeVersions(user.id, { limit: 50 }),
          listResumeBullets(user.id, { limit: 100 }),
        ]);

        const readErrors = [
          versions.error,
          bullets.error,
        ].filter((error): error is string => Boolean(error));

        return (
          <ResumeDashboardV1
            versions={versions.data ?? []}
            bullets={bullets.data ?? []}
            readErrors={readErrors}
          />
        );
      }}
    </AuthenticatedDashboardShell>
  );
}
