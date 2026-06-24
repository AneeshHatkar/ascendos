import { AuthenticatedDashboardShell, NetworkingDashboardV1 } from "@/components/dashboard";
import {
  listJobReferrals,
  listNetworkingContacts,
  listNetworkingInteractions,
} from "@/lib/repositories";

export default function NetworkingPage() {
  return (
    <AuthenticatedDashboardShell
      title="Networking"
      description="Read-only networking surface for contacts, referrals, relationship history, follow-ups, and warm-intro strategy."
    >
      {async ({ user }) => {
        const [contacts, interactions, referrals] = await Promise.all([
          listNetworkingContacts(user.id, { limit: 50 }),
          listNetworkingInteractions(user.id, { limit: 50 }),
          listJobReferrals(user.id, { limit: 50 }),
        ]);

        const readErrors = [
          contacts.error,
          interactions.error,
          referrals.error,
        ].filter((error): error is string => Boolean(error));

        return (
          <NetworkingDashboardV1
            contacts={contacts.data ?? []}
            interactions={interactions.data ?? []}
            referrals={referrals.data ?? []}
            readErrors={readErrors}
          />
        );
      }}
    </AuthenticatedDashboardShell>
  );
}
