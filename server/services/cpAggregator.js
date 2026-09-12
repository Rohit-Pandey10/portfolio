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
const { getAtCoderContests } = require('./atcoderService');

// ─── Tier 4: Hardcoded fallback constants ────────────────────────────────────
const HARDCODED_FALLBACK = {
  totalProblemsSolved: 290,   // LC 68 + CF 164 + CC 58 = 290
  leetcodeSolved: 68,
  codeforcesSolved: 164,
  codechefSolved: 58,
  activeDays: 100,
  contestsAttended: 29,       // CF 17 + LC 1 + CC 9 + AC 2 = 29
  codeforcesContests: 17,
  leetcodeContests: 1,
  codechefContests: 9,
  atcoderContests: 2,
  difficultyBreakdown: { easy: 42, medium: 25, hard: 1 },
  leetcodeContestRating: 1500,
  leetcodeLatestContest: 'Biweekly Contest 187',
  codechefRating: 1425,
  codechefMaxRating: 1425,
  codeforcesRating: 1033,
  codeforcesMaxRating: 1199,
  codeforcesTitle: 'newbie',
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
function mergePlatformData(base, cfStats, lcStats, ccStats, acStats = {}) {
  const leetcodeSolved = lcStats.leetcodeSolved ?? base.leetcodeSolved;
  const codeforcesSolved = cfStats.codeforcesSolved ?? base.codeforcesSolved;
  const codechefSolved = ccStats.codechefSolved ?? base.codechefSolved;

  let totalProblemsSolved = base.totalProblemsSolved;
  // If at least one live API responded with solved count, recalculate total from what we have
  if (leetcodeSolved !== null || codeforcesSolved !== null || codechefSolved !== null) {
    totalProblemsSolved = (leetcodeSolved || 0) + (codeforcesSolved || 0) + (codechefSolved || 0);
  }

  // Contests attended: calculate dynamically from each platform's live count, with fallback to base
  const codeforcesContests = cfStats.codeforcesContests ?? base.codeforcesContests ?? 17;
  const leetcodeContests = lcStats.leetcodeContests ?? base.leetcodeContests ?? 1;
  const codechefContests = ccStats.codechefContests ?? base.codechefContests ?? 9;
  const atcoderContests = acStats.atcoderContests ?? base.atcoderContests ?? 2;
  const contestsAttended = codeforcesContests + leetcodeContests + codechefContests + atcoderContests;

  // Difficulty breakdown from LeetCode
  const difficultyBreakdown = lcStats.difficultyBreakdown ?? base.difficultyBreakdown;

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
    contestsAttended,
    codeforcesContests,
    leetcodeContests,
    codechefContests,
    atcoderContests,
    difficultyBreakdown,
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
    console.log('[Aggregator] Fetching from platform APIs (Codeforces, LeetCode, CodeChef, AtCoder)');
    const [cfResult, lcResult, ccResult, acResult] = await Promise.allSettled([
      getCodeforcesStats(),
      getLeetCodeStats(),
      getCodeChefStats(),
      getAtCoderContests(),
    ]);

    const cfStats = cfResult.status === 'fulfilled' ? cfResult.value : {};
    const lcStats = lcResult.status === 'fulfilled' ? lcResult.value : {};
    const ccStats = ccResult.status === 'fulfilled' ? ccResult.value : {};
    const acStats = acResult.status === 'fulfilled' ? acResult.value : {};

    const hasAnyData =
      cfStats.codeforcesSolved != null ||
      cfStats.codeforcesRating != null ||
      cfStats.codeforcesContests != null ||
      lcStats.leetcodeSolved != null ||
      lcStats.leetcodeContestRating != null ||
      lcStats.leetcodeContests != null ||
      ccStats.codechefSolved != null ||
      ccStats.codechefRating != null ||
      ccStats.codechefContests != null ||
      acStats.atcoderContests != null;

    if (hasAnyData) {
      console.log('[Aggregator] API fetch success (partial or full)');
      // Base object initialized with hardcoded constants, overridden by cache if available
      const base = cachedDoc ? { ...HARDCODED_FALLBACK, ...cachedDoc } : { ...HARDCODED_FALLBACK };
      return mergePlatformData(base, cfStats, lcStats, ccStats, acStats);
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
