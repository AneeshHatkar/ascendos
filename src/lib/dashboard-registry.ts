import type { CanonicalRoute } from "./routes";

export type DashboardDomain =
  | "command"
  | "ai"
  | "time"
  | "goals"
  | "career"
  | "learning"
  | "research"
  | "health"
  | "life"
  | "finance"
  | "creativity"
  | "intelligence"
  | "privacy"
  | "custom";

export type DashboardRegistryItem = {
  title: string;
  route: CanonicalRoute;
  domain: DashboardDomain;
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
    domain: "ai",
    description: "Text and voice AI companion interface with confirmation-based updates.",
  },
  {
    title: "Calendar",
    route: "/calendar",
    domain: "time",
    description: "Time-aware tasks, routines, reminders, deadlines, and schedule blocks.",
  },
  {
    title: "Timeline",
    route: "/timeline",
    domain: "time",
    description: "Chronological truth of what happened, when it happened, and when it was logged.",
  },
  {
    title: "Goals",
    route: "/goals",
    domain: "goals",
    description: "Dream ladder, milestones, proof requirements, and current reality gaps.",
  },
  {
    title: "World-Class",
    route: "/world-class",
    domain: "goals",
    description: "Long-range excellence path, identity standards, constraints, and compounding proof.",
  },
  {
    title: "Career",
    route: "/career",
    domain: "career",
    description: "Job applications, interviews, referrals, resumes, follow-ups, and outcomes.",
  },
  {
    title: "Networking",
    route: "/networking",
    domain: "career",
    description: "Contacts, referrals, relationship history, follow-ups, and warm-intro strategy.",
  },
  {
    title: "Resume",
    route: "/resume",
    domain: "career",
    description: "Resume versions, role targeting, keyword alignment, and application proof.",
  },
  {
    title: "Interviews",
    route: "/interviews",
    domain: "career",
    description: "Interview practice, question banks, performance notes, and follow-up loops.",
  },
  {
    title: "Learning",
    route: "/learning",
    domain: "learning",
    description: "Skill paths, practice, quizzes, projects, and proof-gated mastery.",
  },
  {
    title: "Projects",
    route: "/projects",
    domain: "learning",
    description: "Portfolio projects, milestones, evidence, demos, and shipping status.",
  },
  {
    title: "Research Stanford",
    route: "/research-stanford",
    domain: "research",
    description: "Research ambitions, professor mapping, lab targets, papers, and outreach proof.",
  },
  {
    title: "Research Lab",
    route: "/research-lab",
    domain: "research",
    description: "Experiments, notes, hypotheses, citations, methods, and paper-building workflows.",
  },
  {
    title: "Body",
    route: "/body",
    domain: "health",
    description: "Training, physique, recovery, measurements, injuries, and consistency proof.",
  },
  {
    title: "Nutrition",
    route: "/nutrition",
    domain: "health",
    description: "Calories, macros, meals, hydration, meal prep, and dietary adherence.",
  },
  {
    title: "Supplements",
    route: "/supplements",
    domain: "health",
    description: "Supplement schedule, dosage notes, safety checks, and adherence.",
  },
  {
    title: "Sleep Energy",
    route: "/sleep-energy",
    domain: "health",
    description: "Sleep, fatigue, energy, routines, focus, and recovery signals.",
  },
  {
    title: "Emotion",
    route: "/emotion",
    domain: "health",
    description: "Mood, emotional patterns, triggers, reflection, and regulation proof.",
  },
  {
    title: "Hair Skincare",
    route: "/hair-skincare",
    domain: "health",
    description: "Hair, skin, product routines, progress notes, and visual evidence.",
  },
  {
    title: "Life Admin",
    route: "/life-admin",
    domain: "life",
    description: "Documents, chores, deadlines, errands, accounts, and personal operations.",
  },
  {
    title: "Finance",
    route: "/finance",
    domain: "finance",
    description: "Budgeting, spending, income, subscriptions, savings, and financial decisions.",
  },
  {
    title: "Housing",
    route: "/housing",
    domain: "life",
    description: "Rent, lease, utilities, maintenance, roommates, and housing documents.",
  },
  {
    title: "Documents",
    route: "/documents",
    domain: "life",
    description: "Personal document vault, files, IDs, records, and source tracking.",
  },
  {
    title: "Creativity",
    route: "/creativity",
    domain: "creativity",
    description: "Music, art, writing, cooking, builds, ideas, and creative proof.",
  },
  {
    title: "Grimoire",
    route: "/grimoire",
    domain: "creativity",
    description: "Symbolic intention translated into practical missions, proof, and reversion rules.",
  },
  {
    title: "Decisions",
    route: "/decisions",
    domain: "intelligence",
    description: "Decision logs, tradeoffs, predictions, reversibility, and outcome review.",
  },
  {
    title: "Future Simulator",
    route: "/future-simulator",
    domain: "intelligence",
    description: "Scenario planning, future paths, risk branches, and preparation loops.",
  },
  {
    title: "Knowledge Vault",
    route: "/knowledge",
    domain: "intelligence",
    description: "Notes, concepts, memories, research, references, and retrieval-ready knowledge.",
  },
  {
    title: "Experiments",
    route: "/experiments",
    domain: "intelligence",
    description: "Personal experiments, hypotheses, variables, observations, and conclusions.",
  },
  {
    title: "Analytics",
    route: "/analytics",
    domain: "intelligence",
    description: "Cross-domain trends, warnings, correlations, and proof intelligence.",
  },
  {
    title: "Privacy",
    route: "/privacy",
    domain: "privacy",
    description: "Data controls, consent, memory approval, export, delete, and safety boundaries.",
  },
  {
    title: "Custom Trackers",
    route: "/custom-trackers",
    domain: "custom",
    description: "User-defined trackers, metrics, templates, and custom proof loops.",
  },
];
