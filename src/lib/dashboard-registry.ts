import type { CanonicalRoute } from "./routes";

export type DashboardRegistryItem = {
  title: string;
  route: CanonicalRoute;
  domain: string;
  description: string;
};

export const DASHBOARD_REGISTRY: DashboardRegistryItem[] = [
  {
    title: "Command",
    route: "/command",
    domain: "command",
    description: "Daily operating center for mission, proof actions, risks, and Carnos correction.",
  },
  {
    title: "Carnos",
    route: "/carnos",
    domain: "carnos",
    description: "Text and voice AI companion interface with confirmation-based updates.",
  },
  {
    title: "Calendar",
    route: "/calendar",
    domain: "calendar",
    description: "Time-aware tasks, routines, reminders, deadlines, and schedule blocks.",
  },
  {
    title: "Timeline",
    route: "/timeline",
    domain: "timeline",
    description: "Chronological truth of what happened, when it happened, and when it was logged.",
  },
  {
    title: "Goals",
    route: "/goals",
    domain: "goals",
    description: "Dream ladder, milestones, proof requirements, and current reality gaps.",
  },
  {
    title: "Career",
    route: "/career",
    domain: "career",
    description: "Job applications, interviews, referrals, resumes, follow-ups, and outcomes.",
  },
  {
    title: "Learning",
    route: "/learning",
    domain: "learning",
    description: "Skill paths, practice, quizzes, projects, and proof-gated mastery.",
  },
  {
    title: "Analytics",
    route: "/analytics",
    domain: "analytics",
    description: "Cross-domain trends, warnings, correlations, and proof intelligence.",
  },
];
