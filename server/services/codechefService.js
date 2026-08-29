/**
 * codechefService.js — Tier 2 data source
 *
 * CodeChef has no confirmed public API, so its rating and solved count are scraped
 * from the public profile page. Replace with an official API if CodeChef provides one later.
 *
 * DOM notes (as of Aug 2026 — CodeChef redesigned their profile page):
 *   - Rating lives in .rating-number (unchanged)
 *   - Max rating is in `.rating-header small` but now emits two "Highest Rating" spans
 *     (one for contests, one for DSA). We take the FIRST match (contest rating).
 *   - Solved count: `.rating-data-section.problems-solved` contains MULTIPLE h3 elements
 *     (Learning Paths, Practice Paths, Contests, Total Problems Solved…). We find the
 *     one whose text contains "Solved" instead of blindly using .first().
 *
 * This service owns ONLY CodeChef interaction.
 */

const axios = require('axios');
const cheerio = require('cheerio');

const CC_USERNAME = 'rohit_pandey10';
const CC_URL = `https://www.codechef.com/users/${CC_USERNAME}`;

/**
 * Fetch CodeChef stats by scraping the public profile.
 */
async function getCodeChefStats() {
  const { data } = await axios.get(CC_URL, {
    timeout: 18000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  const $ = cheerio.load(data);

  // ── Rating ─────────────────────────────────────────────────────────────
  const ratingText = $('.rating-number').first().text().trim();
  const codechefRating = ratingText ? parseInt(ratingText, 10) : null;

  // ── Max Rating ─────────────────────────────────────────────────────────
  // .rating-header small now contains both contest and DSA max ratings
  // concatenated (e.g. "(Highest Rating 1409)(Highest Rating 1451)").
  // Take only the FIRST number, which is the contest rating.
  let codechefMaxRating = null;
  const maxRatingText = $('.rating-header small').first().text().trim();
  const maxRatingMatch = maxRatingText.match(/\d+/);
  if (maxRatingMatch) {
    codechefMaxRating = parseInt(maxRatingMatch[0], 10);
  }

  // ── Solved Count ────────────────────────────────────────────────────────
  // The .problems-solved section contains multiple h3 elements.
  // Find the one whose text contains "Solved" (e.g. "Total Problems Solved: 54").
  let codechefSolved = null;
  $('.rating-data-section.problems-solved h3').each((_i, el) => {
    const text = $(el).text().trim();
    if (/solved/i.test(text)) {
      const match = text.match(/\d+/);
      if (match) {
        codechefSolved = parseInt(match[0], 10);
        return false; // stop iterating once found
      }
    }
  });

  return {
    codechefSolved,
    codechefRating,
    codechefMaxRating
  };
}

module.exports = { getCodeChefStats };
