/**
 * statsController.js — Thin controller for /api/cp-stats
 *
 * Responsibilities:
 *   1. Check if the cached MongoDB document is still fresh (within TTL).
 *   2. If fresh → return cached data immediately.
 *   3. If stale → call cpAggregator.getStats() to refresh, upsert the DB, return new data.
 *   4. If cpAggregator throws (should not happen since it never throws) → return last cache or fallback.
 *
 * This controller calls ONLY cpAggregator — never individual platform services directly.
 * All business logic (fallback chains, scraping, API calls) lives in the services layer.
 */

const CpStats = require('../models/CpStats');
const { getStats, HARDCODED_FALLBACK } = require('../services/cpAggregator');

const TTL_MINUTES = parseInt(process.env.CACHE_TTL_MINUTES, 10) || 15;

/**
 * GET /api/cp-stats
 */
exports.getCpStats = async (req, res) => {
  try {
    // Fetch the most recent cached document (may be null if DB is empty)
    const cachedDoc = await CpStats.findLatest().catch((dbErr) => {
      console.warn('[Controller] DB read failed:', dbErr.message);
      return null;
    });

    // Check cache freshness
    if (cachedDoc?.lastUpdated) {
      const ageMs = Date.now() - new Date(cachedDoc.lastUpdated).getTime();
      const ageMins = ageMs / 1000 / 60;

      if (ageMins < TTL_MINUTES) {
        console.log(`[Controller] Serving cached data (${ageMins.toFixed(1)}min old)`);
        return res.json({ success: true, data: { ...cachedDoc, source: 'cache' } });
      }
    }

    // Cache is stale or absent — ask the aggregator to refresh
    console.log('[Controller] Cache stale/absent — refreshing via aggregator');
    const freshData = await getStats(cachedDoc);

    // Upsert the document in MongoDB (best-effort — don't fail the response if DB is down)
    try {
      await CpStats.findOneAndUpdate(
        {}, // match any document (singleton)
        { ...freshData, lastUpdated: new Date() },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );
    } catch (dbErr) {
      console.warn('[Controller] DB write failed (data still returned):', dbErr.message);
    }

    return res.json({ success: true, data: { ...freshData, lastUpdated: new Date() } });
  } catch (err) {
    // Belt-and-suspenders — aggregator shouldn't throw, but handle it anyway
    console.error('[Controller] Unexpected error:', err.message);
    return res.json({
      success: true,
      data: { ...HARDCODED_FALLBACK, lastUpdated: new Date() },
    });
  }
};
