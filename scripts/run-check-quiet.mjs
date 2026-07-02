import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const command = process.argv.slice(2).join(" ").trim();

if (!command) {
  console.error("Missing verification command.");
  process.exit(1);
}

const logDir = ".verify-logs";
const logPath = path.join(logDir, "last-check-output.log");

fs.mkdirSync(logDir, { recursive: true });

console.log("=== ascendOS quiet verification ===");
console.log("Running full verification with compact terminal output.");
console.log(`Full log will be saved to ${logPath}.`);

let output = "";

const child = spawn(command, {
  shell: true,
  stdio: ["ignore", "pipe", "pipe"],
  env: {
    ...process.env,
    FORCE_COLOR: "0",
  },
});

child.stdout.on("data", (chunk) => {
  output += chunk.toString();
});

child.stderr.on("data", (chunk) => {
  output += chunk.toString();
});

child.on("close", (code) => {
  fs.writeFileSync(logPath, output);

  if (code === 0) {
    console.log("");
    console.log("✓ Full verification passed.");
    console.log(`✓ Full verification log saved to ${logPath}.`);
    process.exit(0);
  }

  const lines = output.trimEnd().split("\n");
  const tail = lines.slice(-180).join("\n");

  console.error("");
  console.error(`✗ Full verification failed with exit code ${code}.`);
  console.error(`Full log saved to ${logPath}.`);
  console.error("");
  console.error("=== Last 180 lines of verification output ===");
  console.error(tail || "(No output captured.)");

  process.exit(code ?? 1);
});
