export const CANONICAL_ROUTES = [
  "/command",
  "/carnos",
  "/calendar",
  "/timeline",
  "/goals",
  "/world-class",
  "/career",
  "/networking",
  "/resume",
  "/interviews",
  "/learning",
  "/projects",
  "/research-stanford",
  "/research-lab",
  "/body",
  "/nutrition",
  "/supplements",
  "/sleep-energy",
  "/emotion",
  "/hair-skincare",
  "/life-admin",
  "/finance",
  "/housing",
  "/documents",
  "/creativity",
  "/grimoire",
  "/decisions",
  "/future-simulator",
  "/knowledge",
  "/experiments",
  "/analytics",
  "/privacy",
  "/custom-trackers",
] as const;

export type CanonicalRoute = (typeof CANONICAL_ROUTES)[number];

export const BANNED_LEGACY_ROUTES = [
  "/command-dashboard",
  "/carnos-companion-dashboard",
  "/calendar-dashboard",
  "/timeline-dashboard",
  "/goals-dream-ladder-dashboard",
  "/world-class-path-dashboard",
  "/networking-referral-dashboard",
  "/resume-versioning-dashboard",
  "/learning-academy-dashboard",
] as const;

export const ROUTE_GROUPS = [
  {
    id: "core",
    label: "Core",
    description: "Daily command, Athena, time, goals, and proof.",
    routes: [
      "/command",
      "/carnos",
      "/calendar",
      "/timeline",
      "/goals",
      "/world-class",
    ],
  },
  {
    id: "career",
    label: "Career",
    description: "Job search, networking, resumes, and interview preparation.",
    routes: ["/career", "/networking", "/resume", "/interviews"],
  },
  {
    id: "learning-research",
    label: "Learning / Research",
    description: "Skills, projects, research, labs, and knowledge.",
    routes: [
      "/learning",
      "/projects",
      "/research-stanford",
      "/research-lab",
      "/knowledge",
    ],
  },
  {
    id: "health-body",
    label: "Health / Body",
    description: "Training, nutrition, supplements, recovery, mood, hair, and skin.",
    routes: [
      "/body",
      "/nutrition",
      "/supplements",
      "/sleep-energy",
      "/emotion",
      "/hair-skincare",
    ],
  },
  {
    id: "life",
    label: "Life",
    description: "Admin, finance, housing, documents, creativity, Grimoire, decisions, and future planning.",
    routes: [
      "/life-admin",
      "/finance",
      "/housing",
      "/documents",
      "/creativity",
      "/grimoire",
      "/decisions",
      "/future-simulator",
    ],
  },
  {
    id: "system",
    label: "System",
    description: "Analytics, experiments, custom trackers, privacy, export, connectors, and settings.",
    routes: ["/experiments", "/analytics", "/privacy", "/custom-trackers"],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  routes: ReadonlyArray<CanonicalRoute>;
}>;

export type RouteGroup = (typeof ROUTE_GROUPS)[number];
