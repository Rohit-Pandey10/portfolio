/**
 * server.js — Express entry point
 *
 * Responsibilities:
 *   - Load environment variables
 *   - Connect to MongoDB
 *   - Configure middleware (CORS, JSON parsing)
 *   - Mount routes
 *   - Start listening
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Database ─────────────────────────────────────────────────────────────
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────
app.use(
  cors({
    origin: '*', // Allow all origins for this public portfolio API (Vercel preview domains, etc.)
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────

// Health check — used in smoke tests after each build phase
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// CP stats endpoint
app.use('/api/cp-stats', statsRoutes);
app.use('/api/stats', statsRoutes);

// LaTeX compiler proxy used by the client's dynamic resume download.
app.post('/api/compile-latex', async (req, res, next) => {
  const tex = req.body?.tex;
  if (typeof tex !== 'string' || tex.length === 0 || tex.length > 100000) {
    return res.status(400).json({ error: 'A valid LaTeX document is required.' });
  }

  try {
    const compilerResponse = await axios.get('https://latexonline.cc/compile', {
      params: { text: tex },
      responseType: 'arraybuffer',
      timeout: 30000,
      validateStatus: () => true,
    });

    const contentType = compilerResponse.headers['content-type'] || '';
    if (compilerResponse.status < 200 || compilerResponse.status >= 300 || !contentType.includes('application/pdf')) {
      const diagnostic = Buffer.from(compilerResponse.data || '').toString('utf8').slice(0, 2000);
      console.error('[Resume] Remote LaTeX compiler rejected the document:', {
        status: compilerResponse.status,
        contentType,
        diagnostic,
      });
      return res.status(502).json({ error: 'Remote LaTeX compilation failed.', detail: diagnostic });
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Rohit_Pandey_Resume.pdf"',
      'Cache-Control': 'no-store',
    });
    return res.send(Buffer.from(compilerResponse.data));
  } catch (error) {
    return next(error);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Server] Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`[Server] Listening on http://localhost:${PORT}`);
    console.log(`[Server] Health: http://localhost:${PORT}/api/health`);
    console.log(`[Server] CP Stats: http://localhost:${PORT}/api/cp-stats`);
  });
}

// Export the Express API for Vercel serverless functions
module.exports = app;
