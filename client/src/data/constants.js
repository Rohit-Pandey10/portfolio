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
  codeforces: 'https://codeforces.com/profile/Rohit.Pandey',
};

// ── CP Profile buttons (AtCoder intentionally excluded — see AGENTS.md) ──
export const CP_PROFILE_BUTTONS = [
  { label: 'LeetCode',   href: LINKS.leetcode,   color: 'lavender' },
  { label: 'CodeChef',   href: LINKS.codechef,   color: 'mint' },
  { label: 'Codeforces', href: LINKS.codeforces, color: 'blush' },
  { label: 'Codolio',    href: LINKS.codolio,    color: 'secondary' },
];

// ── Hardcoded fallback CP stats (used only if all fetch tiers fail) ───────
export const CP_FALLBACK = {
  totalProblemsSolved: 325,   // LC 75 + CF 185 + CC 65 = 325
  leetcodeSolved: 75,
  codeforcesSolved: 185,
  codechefSolved: 65,
  activeDays: 109,
  contestsAttended: 34,       // CF 18 + LC 2 + CC 10 + AC 4 = 34
  codeforcesContests: 18,
  leetcodeContests: 2,
  codechefContests: 10,
  atcoderContests: 4,
  difficultyBreakdown: { easy: 48, medium: 26, hard: 1 },
  leetcodeContestRating: 1500,
  leetcodeLatestContest: 'Biweekly Contest 191',
  codechefRating: 1426,
  codechefMaxRating: 1426,
  codeforcesRating: 996,
  codeforcesMaxRating: 1199,
  codeforcesTitle: 'newbie',
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
      { name: 'LaTeX',   level: 'Exploring'   },
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
    id: 'jakeresume',
    title: 'JakeResume — ATS LaTeX Resume Platform',
    category: 'Full Stack / Developer Tooling',
    description:
      'A full-stack resume platform engineered to eliminate manual LaTeX formatting. Features client-side reactive LaTeX generation, bullet-level toggles, an atomic special-character sanitization engine, real-time 1-page visual budget gauges, and a 3-tier compilation architecture.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'LaTeX'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'LaTeX'],
    highlights: [
      "Client-side reactive LaTeX generator converting dynamic profile trees into authentic single-column Jake's Resume markup with zero input delay.",
      '3-tier resilient compilation engine (Express proxy to remote pdflatex via latexonline.cc, client-side .tex download, and direct 1-click Overleaf form dispatch).',
      'Deterministic single-pass regex escaping utility to neutralize reserved LaTeX characters (#, $, &, _, ^, \\) and embed glyphtounicode macros for ATS readability.',
      'Zero-compute AI ingestion pipeline to sanitize unstructured LLM extraction payloads and normalize nested bullet toggles.',
      'Real-time visual page budget estimator (48-line ceiling) preventing multi-page layout spills.',
    ],
    bullets: [
      "Client-side reactive LaTeX generator converting dynamic profile trees into authentic single-column Jake's Resume markup with zero input delay.",
      '3-tier resilient compilation engine (Express proxy to remote pdflatex via latexonline.cc, client-side .tex download, and direct 1-click Overleaf form dispatch).',
      'Deterministic single-pass regex escaping utility to neutralize reserved LaTeX characters (#, $, &, _, ^, \\) and embed glyphtounicode macros for ATS readability.',
      'Zero-compute AI ingestion pipeline to sanitize unstructured LLM extraction payloads and normalize nested bullet toggles.',
      'Real-time visual page budget estimator (48-line ceiling) preventing multi-page layout spills.',
    ],
    liveUrl: 'https://resume-builder-iota-bice.vercel.app/',
    githubUrl: 'https://github.com/Rohit-Pandey10/resume_agy',
    liveLink: 'https://resume-builder-iota-bice.vercel.app/',
    githubLink: 'https://github.com/Rohit-Pandey10/resume_agy',
    featured: true,
  },
  {
    id: 'mern-auth',
    title: 'MERN Authentication System',
    category: 'Backend / Security',
    tech: ['Node.js', 'Express.js', 'MongoDB'],
    tags: ['Node.js', 'Express.js', 'MongoDB'],
    description:
      'Backend authentication system using Node.js, Express.js, and MongoDB.',
    bullets: [
      'Built REST APIs for user authentication',
      'Used JWT and bcrypt for secure login/signup',
      'Followed MVC architecture',
      'Tested APIs using Postman',
    ],
    highlights: [
      'Built REST APIs for user authentication',
      'Used JWT and bcrypt for secure login/signup',
      'Followed MVC architecture',
      'Tested APIs using Postman',
    ],
    // No live link — backend-only project tested via Postman
    githubLink: null,
    liveLink: null,
    githubUrl: null,
    liveUrl: null,
    featured: false,
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
