/**
 * cpAggregator.js — Orchestrates the CP stats fetch chain
 *
 * This is the ONLY service the controller calls for CP data.
 * Fetches all three platforms in parallel.
 *
 * Fallback order per field:
 *   Live Result → Cached Mongo Value → Hardcoded fallback constant
 */

const { getCodeforcesStats } = require('./codeforcesService');
const { getLeetCodeStats } = require('./leetcodeService');
const { getCodeChefStats } = require('./codechefService');

// ─── Tier 4: Hardcoded fallback constants ────────────────────────────────────
const HARDCODED_FALLBACK = {
  totalProblemsSolved: 212,
  leetcodeSolved: null,
  codeforcesSolved: null,
  codechefSolved: null,
  activeDays: 89,
  contestsAttended: 22,
  difficultyBreakdown: { easy: 24, medium: 20, hard: 0 },
  leetcodeContestRating: 1500,
  leetcodeLatestContest: 'Biweekly Contest 187',
  codechefRating: 1376,
  codechefMaxRating: 1409,
  codeforcesRating: 928,
  codeforcesMaxRating: 1199,
  codeforcesTitle: 'Newbie',
  source: 'fallback',
  activityCalendar: {},
};

/**
 * Merge calendars into one object.
 * CodeChef has no daily data, so we note that here.
 */
function mergeCalendars(cfCal = {}, lcCal = {}) {
  const merged = { ...cfCal };
  for (const [date, count] of Object.entries(lcCal)) {
    merged[date] = (merged[date] || 0) + count;
  }
  return merged;
}

/**
 * Merge platform data, filling missing fields from base (cache/fallback).
 */
function mergePlatformData(base, cfStats, lcStats, ccStats) {
  const leetcodeSolved = lcStats.leetcodeSolved ?? base.leetcodeSolved;
  const codeforcesSolved = cfStats.codeforcesSolved ?? base.codeforcesSolved;
  const codechefSolved = ccStats.codechefSolved ?? base.codechefSolved;

  let totalProblemsSolved = base.totalProblemsSolved;
  // If at least one live API responded with solved count, recalculate total from what we have
  if (leetcodeSolved !== null || codeforcesSolved !== null || codechefSolved !== null) {
    totalProblemsSolved = (leetcodeSolved || 0) + (codeforcesSolved || 0) + (codechefSolved || 0);
  }

  // Merge activity calendars
  // If both live APIs failed to return calendars, we fall back to the base calendar
  let activityCalendar = base.activityCalendar;
  let activeDays = base.activeDays;
  if (Object.keys(cfStats.codeforcesCalendar || {}).length > 0 || Object.keys(lcStats.leetcodeCalendar || {}).length > 0) {
    activityCalendar = mergeCalendars(cfStats.codeforcesCalendar, lcStats.leetcodeCalendar);
    activeDays = Object.keys(activityCalendar).length;
  }

  return {
    ...base,
    totalProblemsSolved,
    leetcodeSolved,
    codeforcesSolved,
    codechefSolved,
    activeDays,
    activityCalendar,
    leetcodeContestRating: lcStats.leetcodeContestRating ?? base.leetcodeContestRating,
    leetcodeLatestContest: lcStats.leetcodeLatestContest ?? base.leetcodeLatestContest,
    codeforcesRating: cfStats.codeforcesRating ?? base.codeforcesRating,
    codeforcesMaxRating: cfStats.codeforcesMaxRating ?? base.codeforcesMaxRating,
    codeforcesTitle: cfStats.codeforcesTitle ?? base.codeforcesTitle,
    codechefRating: ccStats.codechefRating ?? base.codechefRating,
    codechefMaxRating: ccStats.codechefMaxRating ?? base.codechefMaxRating,
    source: 'platform-apis',
  };
}

/**
 * Main function. Receives the last cached MongoDB document (may be null).
 * Returns a normalized stats object — never throws.
 */
async function getStats(cachedDoc) {
  try {
    console.log('[Aggregator] Fetching from platform APIs (Codeforces, LeetCode, CodeChef)');
    const [cfResult, lcResult, ccResult] = await Promise.allSettled([
      getCodeforcesStats(),
      getLeetCodeStats(),
      getCodeChefStats()
    ]);

    const cfStats = cfResult.status === 'fulfilled' ? cfResult.value : {};
    const lcStats = lcResult.status === 'fulfilled' ? lcResult.value : {};
    const ccStats = ccResult.status === 'fulfilled' ? ccResult.value : {};

    const hasAnyData =
      cfStats.codeforcesSolved != null ||
      cfStats.codeforcesRating != null ||
      lcStats.leetcodeSolved != null ||
      lcStats.leetcodeContestRating != null ||
      ccStats.codechefSolved != null ||
      ccStats.codechefRating != null;

    if (hasAnyData) {
      console.log('[Aggregator] API fetch success (partial or full)');
      // Base object initialized with hardcoded constants, overridden by cache if available
      const base = cachedDoc ? { ...HARDCODED_FALLBACK, ...cachedDoc } : { ...HARDCODED_FALLBACK };
      return mergePlatformData(base, cfStats, lcStats, ccStats);
    }
    console.warn('[Aggregator] No useful data from any live API');
  } catch (err) {
    console.warn('[Aggregator] Fetch failed completely:', err.message);
  }

  // Fallback to cache if present
  if (cachedDoc) {
    console.log('[Aggregator] Falling back to cached MongoDB document');
    return { ...cachedDoc, source: 'cache' };
  }

  // Ultimate fallback
  console.log('[Aggregator] Falling back to hardcoded constants');
  return { ...HARDCODED_FALLBACK };
}

module.exports = { getStats, HARDCODED_FALLBACK };
