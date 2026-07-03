import type { CanonicalRoute } from "@/lib/routes";

export type PlaceholderRouteDecisionKey =
  | "creativity"
  | "decisions"
  | "future_simulator"
  | "experiments"
  | "custom_trackers";

export type PlaceholderRouteDecision = {
  key: PlaceholderRouteDecisionKey;
  route: CanonicalRoute;
  title: string;
  subtitle: string;
  decision: "intentional_deferred_route";
  reason: string;
  laterPhase: string;
  allowedNow: string[];
  forbiddenNow: string[];
};

export const PLACEHOLDER_ROUTE_DECISIONS: Record<
  PlaceholderRouteDecisionKey,
  PlaceholderRouteDecision
> = {
  creativity: {
    key: "creativity",
    route: "/creativity",
    title: "Creativity",
    subtitle: "Music, art, writing, cooking, builds, ideas, and creative proof.",
    decision: "intentional_deferred_route",
    reason:
      "Creativity remains a canonical route, but the dedicated creativity data model is deferred because Phase 13 already implemented Grimoire as the v1 creativity-adjacent proof surface.",
    laterPhase: "Post-v1 creativity expansion after Phase 20/Chunk 21 polish.",
    allowedNow: [
      "Show canonical route presence.",
      "Explain deferred scope clearly.",
      "Preserve navigation and registry coverage.",
    ],
    forbiddenNow: [
      "Do not add creativity SQL tables.",
      "Do not create AI generation tools.",
      "Do not build autonomous creative action flows.",
    ],
  },
  decisions: {
    key: "decisions",
    route: "/decisions",
    title: "Decisions",
    subtitle: "Decision logs, tradeoffs, predictions, reversibility, and outcome review.",
    decision: "intentional_deferred_route",
    reason:
      "Decision intelligence requires a durable prediction/outcome schema and review loop, which belongs after the v1 operating surfaces are fully locked.",
    laterPhase: "Post-v1 decision intelligence expansion.",
    allowedNow: [
      "Show canonical route presence.",
      "Explain that decision logging is deferred.",
      "Preserve registry coverage.",
    ],
    forbiddenNow: [
      "Do not add decision SQL tables.",
      "Do not create prediction scoring.",
      "Do not generate recommendations or execute decisions.",
    ],
  },
  future_simulator: {
    key: "future_simulator",
    route: "/future-simulator",
    title: "Future Simulator",
    subtitle: "Scenario planning, future paths, risk branches, and preparation loops.",
    decision: "intentional_deferred_route",
    reason:
      "Future simulation needs model-backed scenario logic, risk branches, and analytics support, which are not part of Phase 13.5 completed-scope repair.",
    laterPhase: "Post-v1 future simulator expansion after analytics and memory foundations.",
    allowedNow: [
      "Show canonical route presence.",
      "Explain scenario simulation is deferred.",
      "Preserve route coverage.",
    ],
    forbiddenNow: [
      "Do not add future scenario SQL tables.",
      "Do not add simulation engines.",
      "Do not build speculative AI generation.",
    ],
  },
  experiments: {
    key: "experiments",
    route: "/experiments",
    title: "Experiments",
    subtitle: "Personal experiments, hypotheses, variables, observations, and conclusions.",
    decision: "intentional_deferred_route",
    reason:
      "Experiment tracking overlaps with future analytics/correlation work and should remain deferred until Phase 17 analytics foundations are implemented.",
    laterPhase: "Phase 17 analytics/experiments or post-v1 expansion.",
    allowedNow: [
      "Show canonical route presence.",
      "Explain experiment tracking is deferred.",
      "Preserve route coverage.",
    ],
    forbiddenNow: [
      "Do not add experiment SQL tables in Phase 13.5F.",
      "Do not calculate correlations.",
      "Do not schedule background analysis.",
    ],
  },
  custom_trackers: {
    key: "custom_trackers",
    route: "/custom-trackers",
    title: "Custom Trackers",
    subtitle: "User-defined trackers, metrics, templates, and custom proof loops.",
    decision: "intentional_deferred_route",
    reason:
      "Custom tracker creation is explicitly a later builder system and must not be partially implemented during completed-scope repair.",
    laterPhase: "Phase 19 custom tracker dashboard graduated.",
    allowedNow: [
      "Show canonical route presence.",
      "Explain custom tracker builder is deferred.",
      "Preserve route coverage.",
    ],
    forbiddenNow: [
      "Do not add custom tracker SQL tables.",
      "Do not create tracker builder UI.",
      "Do not allow user-defined write paths.",
    ],
  },
};

export const INTENTIONAL_PLACEHOLDER_ROUTES = Object.values(
  PLACEHOLDER_ROUTE_DECISIONS,
).map((item) => item.route);

// Historical Phase 13.5F audit marker preserved after /custom-trackers graduated in Phase 19M: Phase 18 custom tracker builder
