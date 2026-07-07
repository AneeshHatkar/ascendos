import { existsSync } from "node:fs";
import { join } from "node:path";

const canonicalRoutes = [
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
  "/settings",
  "/custom-trackers",
];

const bannedLegacyRoutes = [
  "/command-dashboard",
  "/carnos-companion-dashboard",
  "/calendar-dashboard",
  "/timeline-dashboard",
  "/goals-dream-ladder-dashboard",
  "/world-class-path-dashboard",
  "/networking-referral-dashboard",
  "/resume-versioning-dashboard",
  "/learning-academy-dashboard",
];

const missingRoutes = canonicalRoutes.filter((route) => {
  const relativePath = route.replace(/^\//, "");
  return !existsSync(join("src", "app", relativePath, "page.tsx"));
});

const presentBannedRoutes = bannedLegacyRoutes.filter((route) => {
  const relativePath = route.replace(/^\//, "");
  return existsSync(join("src", "app", relativePath));
});

if (missingRoutes.length > 0) {
  console.error("Missing canonical routes:");
  for (const route of missingRoutes) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

if (presentBannedRoutes.length > 0) {
  console.error("Banned legacy routes found:");
  for (const route of presentBannedRoutes) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

console.log(`Route coverage valid: ${canonicalRoutes.length} canonical routes present.`);
console.log("Banned legacy route check passed.");
