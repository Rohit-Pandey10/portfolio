/**
 * atcoderService.js
 *
 * Fetches rated contest count from AtCoder for Rohit Pandey.
 * Note: Per project rules in AGENTS.md, AtCoder is NOT displayed as a rating card
 * or profile button on the UI, but its contest count contributes to the aggregate
 * total contests attended.
 */

const { requestWithTimeout } = require('./httpClient');

const ATCODER_HANDLE = 'rohitpandey10';
const ATCODER_HISTORY_URL = `https://atcoder.jp/users/${ATCODER_HANDLE}/history/json`;

/**
 * Fetch number of rated contests attended on AtCoder.
 */
async function getAtCoderContests(signal) {
  try {
    const { data } = await requestWithTimeout({
      method: 'get',
      url: ATCODER_HISTORY_URL,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }, { signal, label: 'AtCoder history request' });

    if (Array.isArray(data)) {
      const ratedContests = data.filter((c) => c.IsRated);
      return {
        atcoderContests: ratedContests.length || data.length,
      };
    }
  } catch (err) {
    console.warn('[AtCoder] contest fetch failed:', err.message);
  }

  return { atcoderContests: null };
}

module.exports = { getAtCoderContests };
