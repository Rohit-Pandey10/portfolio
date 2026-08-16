/**
 * constants.js — Static site content
 * All text, links, skills, and project data lives here.
 * Update this file to change content without touching component logic.
 */

// ── Navigation ────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',                  href: '#about' },
  { label: 'Skills',                 href: '#skills' },
  { label: 'Competitive Programming', href: '#cp' },
  { label: 'Projects',               href: '#projects' },
  { label: 'Education',              href: '#education' },
  { label: 'Contact',                href: '#contact' },
];

// ── Personal links ────────────────────────────────────────────────────────
export const LINKS = {
  github:   'https://github.com/Rohit-Pandey10',
  linkedin: 'https://www.linkedin.com/in/rohit-pandey-964b1036a/',
  codolio:  'https://codolio.com/profile/Rohit_Pandey10',
  leetcode: 'https://leetcode.com/u/Rohit_Pandey10/',
  codechef: 'https://www.codechef.com/users/rohit_pandey10',
  codeforces: 'https://codeforces.com/profile/Rohit_Pandey10',
};

// ── CP Profile buttons (AtCoder intentionally excluded — see AGENTS.md) ──
export const CP_PROFILE_BUTTONS = [
  { label: 'LeetCode',   href: LINKS.leetcode,   color: 'lavender' },
  { label: 'CodeChef',   href: LINKS.codechef,   color: 'mint' },
  { label: 'Codeforces', href: LINKS.codeforces, color: 'blush' },
  { label: 'Codolio',    href: LINKS.codolio,    color: 'secondary' },
];

// ── Hardcoded fallback CP stats (used only if all fetch tiers fail) ───────
// NOTE: totalProblemsSolved (212) is a legacy combined approximation predating
// the LeetCode+Codeforces-only definition. It is used only as an absolute last
// resort when every other tier fails. Replace with real per-platform fallback
// numbers once confirmed.
export const CP_FALLBACK = {
  totalProblemsSolved: 212,
  leetcodeSolved: null,
  codeforcesSolved: null,
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
  source: 'client-fallback',
};

// ── Skills ─────────────────────────────────────────────────────────────────
// Proficiency labels: 'Comfortable' | 'Learning' | 'Exploring'
export const SKILLS = [
  {
    category: 'Languages',
    items: [
      { name: 'C',          level: 'Comfortable' },
      { name: 'C++',        level: 'Comfortable' },
      { name: 'JavaScript', level: 'Comfortable' },
      { name: 'Java',       level: 'Comfortable' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'HTML5',       level: 'Comfortable' },
      { name: 'CSS3',        level: 'Comfortable' },
      { name: 'Tailwind CSS', level: 'Comfortable' },
      { name: 'React.js',    level: 'Learning'    },
      { name: 'Next.js',     level: 'Learning'    },
    ],
  },
  {
    category: 'Backend & DB',
    items: [
      { name: 'Node.js',    level: 'Comfortable' },
      { name: 'Express.js', level: 'Comfortable' },
      { name: 'MongoDB',    level: 'Comfortable' },
    ],
  },
  {
    category: 'Tools & Concepts',
    items: [
      { name: 'Git',     level: 'Comfortable' },
      { name: 'GitHub',  level: 'Comfortable' },
      { name: 'Postman', level: 'Comfortable' },
      { name: 'VS Code', level: 'Comfortable' },
      { name: 'REST APIs',         level: 'Comfortable' },
      { name: 'MVC Architecture',  level: 'Comfortable' },
      { name: 'JWT Auth',          level: 'Comfortable' },
      { name: 'CRUD Operations',   level: 'Comfortable' },
      { name: 'Cookies/Sessions',  level: 'Learning'   },
    ],
  },
];

// ── Projects ──────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'mern-auth',
    title: 'MERN Authentication System',
    tech: ['Node.js', 'Express.js', 'MongoDB'],
    description:
      'Backend authentication system using Node.js, Express.js, and MongoDB.',
    bullets: [
      'Built REST APIs for user authentication',
      'Used JWT and bcrypt for secure login/signup',
      'Followed MVC architecture',
      'Tested APIs using Postman',
    ],
    // No live link — backend-only project tested via Postman
    githubLink: null,
    liveLink: null,
  },
];

// ── Education ──────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    institution: 'Dwarkadas J. Sanghvi College of Engineering',
    degree: 'B.Tech in Computer Engineering',
    years: '2025 – 2029',
    cgpa: '9.45',
    location: 'Mumbai, India',
  },
];
