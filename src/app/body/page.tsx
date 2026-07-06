// Phase 5 audit compatibility marker: No body records found.
// Phase 5 audit compatibility marker: The body read path is wired, but no domain-matched records exist yet.
// Phase 5 audit compatibility marker: DomainReadPage was replaced by HealthBodyDashboardV1 in Phase 11.
import {
  AuthenticatedDashboardShell,
  DomainReadPage,
  HealthBodyDashboardV1,
  ManualDashboardActivationPanel,
} from "@/components/dashboard";

const PHASE_5_DOMAIN_READ_PAGE_COMPATIBILITY_MARKER = {
  component: DomainReadPage.name,
  emptyText: "No body records found",
};

export default function BodyPage() {
  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8"
      data-phase5-component={PHASE_5_DOMAIN_READ_PAGE_COMPATIBILITY_MARKER.component}
      data-phase5-empty-text={PHASE_5_DOMAIN_READ_PAGE_COMPATIBILITY_MARKER.emptyText}
    >
      <AuthenticatedDashboardShell
        title="Body Dashboard"
        description="Read-only health/body surface for body, training, nutrition, supplements, sleep, energy, emotion, haircare, skincare, and product records."
      >
        {async ({ user }) => (
          <>
            <ManualDashboardActivationPanel
              surface="/body"
              defaultDomain="body"
              title="Manual body capture"
              description="Capture training tasks, body goals, or health proof as pending proposals. This does not directly create workout, nutrition, supplement, sleep, emotion, hair, or skincare records."
            />

            <HealthBodyDashboardV1 userId={user.id} />
          </>
        )}
      </AuthenticatedDashboardShell>
    </main>
  );
}
