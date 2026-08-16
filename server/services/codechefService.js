/**
 * codechefService.js — Tier 2 data source
 *
 * CodeChef has no confirmed public API, so its rating and solved count are scraped
 * from the public profile page. Replace with an official API if CodeChef provides one later.
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
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  const $ = cheerio.load(data);

  // Extract Rating (usually in a div with class rating-number)
  const ratingText = $('.rating-number').first().text().trim();
  const codechefRating = ratingText ? parseInt(ratingText, 10) : null;

  // Extract Max Rating (usually in a small tag inside the rating header)
  let codechefMaxRating = null;
  const maxRatingText = $('.rating-header small').text().trim(); // e.g. "(Highest Rating 1409)"
  const maxRatingMatch = maxRatingText.match(/\d+/);
  if (maxRatingMatch) {
    codechefMaxRating = parseInt(maxRatingMatch[0], 10);
  }

  // Extract Fully Solved count
  let codechefSolved = null;
  const solvedText = $('.rating-data-section.problems-solved h3').first().text(); // e.g. "Fully Solved (234)"
  const solvedMatch = solvedText.match(/\d+/);
  if (solvedMatch) {
    codechefSolved = parseInt(solvedMatch[0], 10);
  }

  return {
    codechefSolved,
    codechefRating,
    codechefMaxRating
  };
}

module.exports = { getCodeChefStats };
