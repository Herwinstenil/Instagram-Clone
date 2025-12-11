import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Start json-server as a child process
const jsonServerProcess = spawn("npx", [
  "json-server",
  "--watch",
  "db/db.json",
  "--port",
  "3001",
]);

jsonServerProcess.stdout.on("data", (data) => {
  console.log(`json-server: ${data}`);
});
jsonServerProcess.stderr.on("data", (data) => {
  console.error(`json-server error: ${data}`);
});

app.use("/api", (req, res) => {
  const url = `http://localhost:3001${req.url}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ error: "API error" }));
});

// Serve frontend build
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
