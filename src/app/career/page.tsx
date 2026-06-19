import { DomainReadPage } from "@/components/dashboard";

export default function CareerPage() {
  return (
    <DomainReadPage
      config={{
        routeTitle: "Career Dashboard",
        eyebrow: "career system",
        description:
          "Read-only career surface for job search, referrals, interviews, and career execution records.",
        domainKey: "career",
        domainAliases: ["career", "job", "jobs", "referral", "interview", "resume", "networking"],
        emptyTitle: "No career records found",
        emptyDescription:
          "The career read path is wired, but no domain-matched records exist yet. Career creation and mutation flows remain disabled until the safe write phase.",
      }}
    />
  );
}
