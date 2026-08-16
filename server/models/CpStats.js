/**
 * CpStats.js — Mongoose model for cached CP statistics
 *
 * Acts as a cache layer. The controller writes here after a successful live fetch
 * and reads from here when the cache is still fresh (within CACHE_TTL_MINUTES).
 *
 * Fields:
 *   - totalProblemsSolved: LeetCode solved + Codeforces solved + CodeChef solved
 *   - leetcodeSolved / codeforcesSolved: per-platform breakdown
 *   - activeDays: total active coding days from Codolio
 *   - contestsAttended: total contests across all platforms
 *   - difficultyBreakdown: DSA questions by difficulty (from Codolio's categorization)
 *   - leetcodeContestRating / leetcodeLatestContest
 *   - codechefRating / codechefMaxRating
 *   - codeforcesRating / codeforcesMaxRating / codeforcesTitle
 *   - lastUpdated: timestamp of last successful live fetch
 *   - source: which tier produced this data ('codolio' | 'platform-apis' | 'cache' | 'fallback')
 */

const mongoose = require('mongoose');

const CpStatsSchema = new mongoose.Schema(
  {
    totalProblemsSolved: { type: Number, default: 0 },
    leetcodeSolved: { type: Number, default: 0 },
    codeforcesSolved: { type: Number, default: 0 },
    codechefSolved: { type: Number, default: 0 },
    activeDays: { type: Number, default: 0 },
    contestsAttended: { type: Number, default: 0 },
    difficultyBreakdown: {
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
    leetcodeContestRating: { type: Number, default: null },
    leetcodeLatestContest: { type: String, default: null },
    codechefRating: { type: Number, default: null },
    codechefMaxRating: { type: Number, default: null },
    codeforcesRating: { type: Number, default: null },
    codeforcesMaxRating: { type: Number, default: null },
    codeforcesTitle: { type: String, default: null },
    activityCalendar: { type: mongoose.Schema.Types.Mixed, default: {} },
    lastUpdated: { type: Date, default: Date.now },
    source: {
      type: String,
      enum: ['codolio', 'platform-apis', 'cache', 'fallback'],
      default: 'fallback',
    },
  },
  { timestamps: false }
);

// Singleton pattern — only one document is ever stored (upserted by the controller).
// Using a fixed _id key makes findOneAndUpdate with upsert:true idempotent.
CpStatsSchema.statics.findLatest = function () {
  return this.findOne({}).sort({ lastUpdated: -1 }).lean();
};

module.exports = mongoose.model('CpStats', CpStatsSchema);
