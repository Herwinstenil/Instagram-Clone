import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';

const app = express();
const PORT = process.env.PORT || 10000;

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON Server
const router = jsonServer.router(path.join(__dirname, 'db/db.json'));
app.use('/api', router); // all JSON endpoints will be /api/...

// Serve React build
const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

// Catch-all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
