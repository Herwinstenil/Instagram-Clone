import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

// Required for ES Modules path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// All API routes will start with /api
server.use("/api", router);

// Port provided by Cyclic or local testing
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`🚀 JSON Server running on port ${port}`);
});
