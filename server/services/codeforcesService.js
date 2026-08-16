/**
 * codeforcesService.js — Tier 2a data source
 *
 * Uses the official, documented Codeforces public API.
 * Docs: https://codeforces.com/apiHelp
 *
 * Endpoints used:
 *   - user.info   → rating, maxRating, rank
 *   - user.status → accepted submissions (for unique solved-problem count)
 *
 * This service owns ONLY Codeforces API interaction.
 * It does not know about fallback chains, the database, or other services.
 */

const axios = require('axios');

const CF_HANDLE = 'Rohit_Pandey10'; // Codeforces username
const CF_BASE = 'https://codeforces.com/api';

/**
 * Fetch Codeforces user info (rating, maxRating, rank/title).
 * Returns null fields on failure rather than throwing, so the aggregator
 * can still use partial data.
 */
async function getCodeforcesUserInfo() {
  const url = `${CF_BASE}/user.info?handles=${CF_HANDLE}`;
  const { data } = await axios.get(url, { timeout: 8000 });

  if (data.status !== 'OK' || !data.result?.length) {
    throw new Error(`Codeforces user.info returned status: ${data.status}`);
  }

  const user = data.result[0];
  return {
    codeforcesRating: user.rating ?? null,
    codeforcesMaxRating: user.maxRating ?? null,
    codeforcesTitle: user.rank ?? null,
  };
}

/**
 * Count unique problems solved on Codeforces by finding accepted submissions
 * and deduplicating by problem ID (contestId + index).
 */
async function getCodeforcesSolvedCount() {
  const url = `${CF_BASE}/user.status?handle=${CF_HANDLE}&from=1&count=10000`;
  const { data } = await axios.get(url, { timeout: 12000 });

  if (data.status !== 'OK') {
    throw new Error(`Codeforces user.status returned status: ${data.status}`);
  }

  const solved = new Set();
  const activeDaysMap = {}; // Map of YYYY-MM-DD -> 1
  for (const sub of data.result) {
    if (sub.verdict === 'OK') {
      const key = `${sub.problem.contestId}-${sub.problem.index}`;
      solved.add(key);
    }
    // Record submission timestamp for activity calendar
    if (sub.creationTimeSeconds) {
      // Codeforces timestamps are in seconds
      const date = new Date(sub.creationTimeSeconds * 1000);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      activeDaysMap[`${yyyy}-${mm}-${dd}`] = 1;
    }
  }

  return { codeforcesSolved: solved.size, codeforcesCalendar: activeDaysMap };
}

/**
 * Main export — fetches both info and solved count.
 * Returns a partial result if one of the two calls fails.
 */
async function getCodeforcesStats() {
  const [infoResult, solvedResult] = await Promise.allSettled([
    getCodeforcesUserInfo(),
    getCodeforcesSolvedCount(),
  ]);

  const info = infoResult.status === 'fulfilled' ? infoResult.value : {};
  const codeforcesSolved =
    solvedResult.status === 'fulfilled' ? solvedResult.value.codeforcesSolved : null;
  const codeforcesCalendar =
    solvedResult.status === 'fulfilled' ? solvedResult.value.codeforcesCalendar : {};

  if (infoResult.status === 'rejected') {
    console.warn('[CF] user.info failed:', infoResult.reason?.message);
  }
  if (solvedResult.status === 'rejected') {
    console.warn('[CF] user.status failed:', solvedResult.reason?.message);
  }

  return {
    codeforcesSolved,
    codeforcesRating: info.codeforcesRating ?? null,
    codeforcesMaxRating: info.codeforcesMaxRating ?? null,
    codeforcesTitle: info.codeforcesTitle ?? null,
    codeforcesCalendar,
  };
}

module.exports = { getCodeforcesStats };
