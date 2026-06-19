import { DomainReadPage } from "@/components/dashboard";

export default function BodyPage() {
  return (
    <DomainReadPage
      config={{
        routeTitle: "Body Dashboard",
        eyebrow: "body system",
        description:
          "Read-only body surface for fitness, nutrition, sleep, energy, and physical progress records.",
        domainKey: "body",
        domainAliases: ["body", "fitness", "gym", "nutrition", "sleep", "energy", "health", "skin", "hair"],
        emptyTitle: "No body records found",
        emptyDescription:
          "The body read path is wired, but no domain-matched records exist yet. Body tracking and mutation flows remain disabled until the safe write phase.",
      }}
    />
  );
}
