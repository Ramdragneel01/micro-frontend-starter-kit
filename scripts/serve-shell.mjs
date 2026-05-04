import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const shellDist = path.join(root, "dist", "shell");
const port = Number(process.env.MFE_SHELL_PORT || process.env.PORT || 3000);

const app = express();

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "micro-frontend-shell" });
});

app.get("/ready", (_req, res) => {
  res.json({ status: "ready" });
});

app.use(express.static(shellDist));
app.get("*", (_req, res) => {
  res.sendFile(path.join(shellDist, "index.html"));
});

app.listen(port, () => {
  process.stdout.write(`shell running on http://localhost:${port}\n`);
});
