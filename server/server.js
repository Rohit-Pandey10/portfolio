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
    methods: ['GET'],
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
