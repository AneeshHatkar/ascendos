import { readFileSync } from "node:fs";

const routesSource = readFileSync("src/lib/routes.ts", "utf8");
const registrySource = readFileSync("src/lib/dashboard-registry.ts", "utf8");

const routeMatches = [...routesSource.matchAll(/"\/[^"]+"/g)].map((match) =>
  match[0].replaceAll('"', ""),
);

const canonicalRoutes = routeMatches.filter(
  (route) => !route.includes("-dashboard"),
);

const registryRoutes = [
  ...registrySource.matchAll(/route:\s*"([^"]+)"/g),
].map((match) => match[1]);

const missingFromRegistry = canonicalRoutes.filter(
  (route) => !registryRoutes.includes(route),
);

const extraInRegistry = registryRoutes.filter(
  (route) => !canonicalRoutes.includes(route),
);

const duplicateRegistryRoutes = registryRoutes.filter(
  (route, index) => registryRoutes.indexOf(route) !== index,
);

if (missingFromRegistry.length > 0) {
  console.error("Routes missing from dashboard registry:");
  for (const route of missingFromRegistry) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

if (extraInRegistry.length > 0) {
  console.error("Registry routes not found in canonical routes:");
  for (const route of extraInRegistry) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

if (duplicateRegistryRoutes.length > 0) {
  console.error("Duplicate registry routes found:");
  for (const route of duplicateRegistryRoutes) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

console.log(`Registry coverage valid: ${registryRoutes.length} registry routes match canonical routes.`);
