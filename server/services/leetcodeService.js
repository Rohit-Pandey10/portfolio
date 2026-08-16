/**
 * leetcodeService.js — Tier 2b data source
 *
 * IMPORTANT: LeetCode's GraphQL endpoint used here is UNOFFICIAL and undocumented.
 * It is not part of a public API contract and may change or break without any
 * notice from LeetCode. Every call is wrapped in try/catch. If it fails, the
 * aggregator falls through to the next tier — this is expected and handled.
 *
 * Unlike the Codeforces API used in codeforcesService.js (which is official and
 * documented), this endpoint should be treated as a best-effort source.
 *
 * This service owns ONLY LeetCode interaction.
 * It does not know about fallback chains, the database, or other services.
 */

const axios = require('axios');

const LC_GRAPHQL = 'https://leetcode.com/graphql';
const LC_USERNAME = 'Rohit_Pandey10'; // LeetCode username — update if different

/**
 * Fetch number of problems solved across all difficulties.
 */
async function getLeetCodeSolvedCount() {
  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submissionCalendar
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const { data } = await axios.post(
    LC_GRAPHQL,
    { query, variables: { username: LC_USERNAME } },
    {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
    }
  );

  const stats = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  const calendarStr = data?.data?.matchedUser?.submissionCalendar;
  
  if (!stats) throw new Error('LeetCode: unexpected GraphQL response shape');

  // Find the "All" difficulty entry
  const allEntry = stats.find((s) => s.difficulty === 'All');
  const count = allEntry ? allEntry.count : null;

  let leetcodeCalendar = {};
  if (calendarStr) {
    try {
      const parsed = JSON.parse(calendarStr);
      // LeetCode's calendar returns timestamps as keys, we'll map them to YYYY-MM-DD
      for (const [ts, subCount] of Object.entries(parsed)) {
        const date = new Date(parseInt(ts, 10) * 1000);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        leetcodeCalendar[`${yyyy}-${mm}-${dd}`] = subCount;
      }
    } catch (err) {
      console.warn('[LC] Failed to parse submissionCalendar:', err.message);
    }
  }

  return { leetcodeSolved: count, leetcodeCalendar };
}

/**
 * Fetch LeetCode contest rating and latest contest name.
 */
async function getLeetCodeContestData() {
  const query = `
    query userContestRanking($username: String!) {
      userContestRanking(username: $username) {
        rating
        attendedContestsCount
      }
      userContestRankingHistory(username: $username) {
        contest {
          title
        }
        attended
      }
    }
  `;

  const { data } = await axios.post(
    LC_GRAPHQL,
    { query, variables: { username: LC_USERNAME } },
    {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
    }
  );

  const ranking = data?.data?.userContestRanking;
  const history = data?.data?.userContestRankingHistory;

  const rating = ranking?.rating ? Math.round(ranking.rating) : null;

  let latestContest = null;
  if (history?.length) {
    const attended = history.filter((h) => h.attended);
    if (attended.length) {
      latestContest = attended[attended.length - 1]?.contest?.title || null;
    }
  }

  return { leetcodeContestRating: rating, leetcodeLatestContest: latestContest };
}

/**
 * Main export — fetches solved count and contest data in parallel.
 * Returns partial results rather than throwing if one call fails.
 */
async function getLeetCodeStats() {
  const [solvedResult, contestResult] = await Promise.allSettled([
    getLeetCodeSolvedCount(),
    getLeetCodeContestData(),
  ]);

  const leetcodeSolved =
    solvedResult.status === 'fulfilled' ? solvedResult.value.leetcodeSolved : null;
  const leetcodeCalendar =
    solvedResult.status === 'fulfilled' ? solvedResult.value.leetcodeCalendar : {};
  const contestData =
    contestResult.status === 'fulfilled'
      ? contestResult.value
      : { leetcodeContestRating: null, leetcodeLatestContest: null };

  if (solvedResult.status === 'rejected') {
    console.warn('[LC] solved count failed:', solvedResult.reason?.message);
  }
  if (contestResult.status === 'rejected') {
    console.warn('[LC] contest data failed:', contestResult.reason?.message);
  }

  return {
    leetcodeSolved,
    leetcodeContestRating: contestData.leetcodeContestRating,
    leetcodeLatestContest: contestData.leetcodeLatestContest,
    leetcodeCalendar,
  };
}

module.exports = { getLeetCodeStats };
