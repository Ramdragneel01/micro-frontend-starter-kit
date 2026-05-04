import fs from "node:fs/promises";
import path from "node:path";

const targets = [
  "dist/shell",
  "dist/ai-chat-widget",
  "dist/observability-widget",
  "dist/cost-widget"
];

await Promise.all(
  targets.map(async (target) => {
    const full = path.resolve(process.cwd(), target);
    await fs.rm(full, { recursive: true, force: true });
  })
);
