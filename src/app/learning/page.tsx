import { DomainReadPage } from "@/components/dashboard";

export default function LearningPage() {
  return (
    <DomainReadPage
      config={{
        routeTitle: "Learning Academy Dashboard",
        eyebrow: "study system",
        description:
          "Read-only learning surface for study goals, skill-building tasks, and academic execution records.",
        domainKey: "learning",
        domainAliases: ["learning", "study", "skill", "course", "academy", "research", "school"],
        emptyTitle: "No learning records found",
        emptyDescription:
          "The learning read path is wired, but no domain-matched records exist yet. Study creation and mutation flows remain disabled until the safe write phase.",
      }}
    />
  );
}
