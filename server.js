import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';

const app = express();
const PORT = process.env.PORT || 10000;

// Serve React build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

// JSON server
const router = jsonServer.router(path.join(__dirname, 'db/db.json'));
app.use('/api', router); // all JSON endpoints will be /api/...

// Fallback to index.html for React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
