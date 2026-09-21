# AGENTS.md — System Specification & Architectural Blueprint: Rohit Pandey Portfolio

> **Single Source of Truth** for autonomous AI coding agents, Pair Programmers, and engineers onboarding onto the `portfolio2_agy` codebase.
> This document specifies system architecture, runtime data pipelines, design system tokens, data contracts, and verification protocols. Adhere strictly to these guidelines to preserve architectural integrity.

---

## 1. Executive Summary & Tech Architecture

### 1.1 Purpose & Scope
The application is a high-performance, dark-editorial developer portfolio and live Competitive Programming (CP) telemetry hub for **Rohit Pandey** (B.Tech in Computer Engineering, Dwarkadas J. Sanghvi College of Engineering, Class of 2025–2029).

Beyond standard biographical information, the platform functions as an automated metrics hub that continuously syncs, aggregates, normalizes, and caches real-time problem-solving and contest telemetry from major competitive programming platforms (**Codeforces**, **LeetCode**, **CodeChef**, and **AtCoder**).

### 1.2 Monorepo Architecture Pattern
The project is architected as a decoupled, two-tier monorepo without cross-package compilation overhead:

```
portfolio2_agy/
├── client/                     # Frontend SPA (React 19, Vite, Tailwind CSS v4)
│   ├── src/
│   │   ├── components/         # Sectional and atomic UI components
│   │   ├── context/            # React Context state layers (CpStatsContext)
│   │   ├── data/               # Master static content & fallback baseline (constants.js)
│   │   ├── hooks/              # Reusable viewport & interaction hooks (useScrollReveal)
│   │   ├── pages/              # Single-page layout assembly (Home.jsx)
│   │   └── styles/             # Tokenized design system (tokens.css, index.css)
│   └── package.json            # Client scripts & dev dependencies
│
├── server/                     # Backend Microservice (Node.js, Express, Mongoose)
│   ├── config/                 # MongoDB Atlas connection manager (db.js)
│   ├── controllers/            # Thin HTTP controllers (statsController.js)
│   ├── models/                 # Mongoose persistent cache schema (CpStats.js)
│   ├── routes/                 # Express route definitions (statsRoutes.js)
│   ├── services/               # Scrapers, API clients & Aggregator (cpAggregator.js)
│   ├── package.json            # Server dependencies (Express, Axios, Cheerio, Mongoose)
│   └── server.js               # Server entry point & serverless export
│
├── vercel.json                 # Monorepo unified serverless & SPA routing rules
├── package.json                # Root orchestration scripts (install, build)
└── AGENTS.md                   # This document
```

### 1.3 Technology Stack

| Layer | Technology | Key Dependencies & Version Notes |
|---|---|---|
| **Frontend** | React 19 + Vite 8 | `react`, `react-dom`, `@vitejs/plugin-react`, `tailwindcss` (v4 with `@tailwindcss/vite`), `axios` |
| **Backend** | Node.js (>=20 LTS) + Express 5 | `express` (v5), `cors`, `dotenv`, `axios`, `cheerio` (web scraping), `mongoose` (v9) |
| **Database** | MongoDB Atlas | Singleton document cache with Mongoose schema validation |
| **Deployment** | Vercel Serverless | Unified deployment using `@vercel/node` for `server/server.js` and `@vercel/static-build` for client |

### 1.4 Unified Deployment Topology (`vercel.json`)
The client SPA and server API share the same origin in production. Vercel serverless functions handle API routes, while all other requests map to the static client bundle:

```json
{
  "version": 2,
  "builds": [
    { "src": "server/server.js", "use": "@vercel/node" },
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/server/server.js" },
    { "source": "/(.*)", "destination": "/$1" }
  ]
}
```

- **Local Development Proxy:** Vite dev server (`client/vite.config.js`) proxies all `/api/*` requests to `http://localhost:5001`.
- **Production Serverless:** `server/server.js` exports the `app` instance (`module.exports = app`), which Vercel wraps as an on-demand serverless function.

---

## 2. Competitive Programming Sync Pipeline (`server/`)

### 2.1 Multi-Tier Fault-Tolerant Architecture
External competitive programming platforms lack unified APIs and frequently rate-limit or fail. The backend implements a 4-tier fallback pipeline guaranteeing **zero-downtime** and consistent response latencies:

```
[Client Request: GET /api/cp-stats]
                │
                ▼
      ┌──────────────────┐
      │  statsController │
      └─────────┬────────┘
                │
         Is Mongo cache fresh? (<15 min)
         ├── YES ──► Return Cached Document (source: 'cache')
         └── NO
                │
                ▼
      ┌───────────────────────────────┐
      │  cpAggregator.js              │
      │  (Promise.allSettled)         │
      └───────┬───────┬───────┬───────┘
              │       │       │       │
              ▼       ▼       ▼       ▼
         Codeforces LeetCode CodeChef AtCoder
          (REST)   (GraphQL) (Scrape) (JSON)
              │       │       │       │
              └───────┴───────┴───────┘
                          │
          Did any platform succeed?
          ├── YES ──► Merge with Base, Upsert Mongo, Return (source: 'platform-apis')
          └── NO  ──► Check Mongo Cache Document
                        ├── Exists ──► Return Stale Cache (source: 'cache')
                        └── Empty  ──► Return HARDCODED_FALLBACK (source: 'fallback')
```

### 2.2 Platform Micro-Services

1. **Codeforces Service (`server/services/codeforcesService.js`):**
   - **Handle:** `Rohit.Pandey` *(Warning: Never use `Rohit_Pandey10` for Codeforces API calls; that is an inactive alt account).*
   - **Endpoints:**
     - `https://codeforces.com/api/user.info?handles=Rohit.Pandey` &rarr; Retrieves `rating`, `maxRating`, and `rank`/`title` (`newbie`, etc.).
     - `https://codeforces.com/api/user.status?handle=Rohit.Pandey` &rarr; Parses unique accepted problem IDs (`${problem.contestId}-${problem.index}`) and extracts timestamp dates for the daily contribution activity calendar.
     - `https://codeforces.com/api/user.rating?handle=Rohit.Pandey` &rarr; Derives exact rated contest participation count.

2. **LeetCode Service (`server/services/leetcodeService.js`):**
   - **Handle:** `Rohit_Pandey10`
   - **Endpoint:** `https://leetcode.com/graphql` (Unofficial GraphQL query).
   - **Data Extracted:**
     - Solved counts total and broken down by difficulty (`easy`, `medium`, `hard`).
     - Contest rating and latest contest title (`userContestRanking`, `userContestRankingHistory`).
     - `submissionCalendar` JSON string (Unix epoch &rarr; count mapping) merged into the active days heatmap.

3. **CodeChef Service (`server/services/codechefService.js`):**
   - **Handle:** `rohit_pandey10`
   - **Endpoint:** `https://www.codechef.com/users/rohit_pandey10` (HTTP scrape via Cheerio).
   - **Extraction Logic:**
     - Current rating extracted from `.rating-number`.
     - Peak rating extracted from `.rating-header small` (first instance representing contest rating).
     - Solved problem count extracted by finding `.rating-data-section.problems-solved h3` containing text `"Solved"`.
     - Contests count extracted from contest history table or `.contest-participated-count`.

4. **AtCoder Service (`server/services/atcoderService.js`):**
   - **Handle:** `rohitpandey10`
   - **Endpoint:** `https://atcoder.jp/users/rohitpandey10/history/json`
   - **Data Extracted:** Rated contest count (`data.filter(c => c.IsRated).length`).
   - **Cardinal Rule:** Per design requirements, **never display AtCoder as a rating card or profile button in the UI**. Its participation count only aggregates into the `contestsAttended` global metric.

### 2.3 Persistent Cache Model (`server/models/CpStats.js`)
MongoDB acts strictly as a cache. The controller reads from and upserts a singleton document (`findLatest`):

```javascript
const CpStatsSchema = new mongoose.Schema({
  totalProblemsSolved:   { type: Number, default: 0 },
  leetcodeSolved:        { type: Number, default: 0 },
  codeforcesSolved:      { type: Number, default: 0 },
  codechefSolved:        { type: Number, default: 0 },
  activeDays:            { type: Number, default: 0 },
  contestsAttended:      { type: Number, default: 0 },
  codeforcesContests:    { type: Number, default: null },
  codechefContests:      { type: Number, default: null },
  leetcodeContests:      { type: Number, default: null },
  atcoderContests:       { type: Number, default: null },
  difficultyBreakdown: {
    easy:   { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard:   { type: Number, default: 0 },
  },
  leetcodeContestRating: { type: Number, default: null },
  leetcodeLatestContest: { type: String, default: null },
  codechefRating:        { type: Number, default: null },
  codechefMaxRating:     { type: Number, default: null },
  codeforcesRating:      { type: Number, default: null },
  codeforcesMaxRating:   { type: Number, default: null },
  codeforcesTitle:       { type: String, default: null },
  activityCalendar:      { type: mongoose.Schema.Types.Mixed, default: {} },
  lastUpdated:           { type: Date, default: Date.now },
  source: {
    type: String,
    enum: ['codolio', 'platform-apis', 'cache', 'fallback'],
    default: 'fallback'
  }
});
```

### 2.4 Aggregated Metrics Formulas
- **`totalProblemsSolved`** = `leetcodeSolved` + `codeforcesSolved` + `codechefSolved`.
- **`contestsAttended`** = `codeforcesContests` + `leetcodeContests` + `codechefContests` + `atcoderContests`.
- **`activeDays`** = Total unique dates derived from merging LeetCode's `submissionCalendar` with Codeforces submission timestamps. *(Note: CodeChef does not expose daily telemetry).*

---

## 3. Frontend Component & State Hierarchy (`client/src/`)

### 3.1 Architecture Overview

```
                      App.jsx
                         │
                <CpStatsProvider>
                         │
                     Home.jsx
                         │
     ┌───────────┬───────┴───────┬────────────┬───────────┐
     ▼           ▼               ▼            ▼           ▼
 Navbar.jsx   Hero.jsx      Skills.jsx    Competitive  Projects.jsx
     │           │                            Programming      │
     │      HeroDevGrid.jsx                       │      ProjectCard
     │           │                                │           │
     │     useCpStats()                     useCpStats()  LatexResumeMockup
     │                                           │        TerminalMockup
     ▼                                           ▼
[External Links]                           [Rating Cards,
                                            Heatmap & Stats]
```

### 3.2 State Management (`CpStatsContext.jsx`)
- **Single Fetch Lifecycle:** Fetches `/api/cp-stats` **once** when `<CpStatsProvider>` mounts. Both `HeroDevGrid.jsx` and `CompetitiveProgramming.jsx` consume from this context with zero redundant network requests.
- **Formatting Protocol (`formatSolved`):**
  - Live data (`source === 'platform-apis'`) renders exact integer (e.g. `325`).
  - Cached or fallback data renders with a plus indicator (e.g. `325+`).
  - Unset or loading renders em-dash (`—`).

### 3.3 Static Master Data (`constants.js`)
All immutable portfolio data lives in `client/src/data/constants.js`:
- **`PROJECTS` Array:** Master array of portfolio works.
  - Project 1: **JakeResume — ATS LaTeX Resume Platform** (Top featured, live full-stack application with interactive LaTeX generator and compiler mockup).
  - Project 2: **MERN Authentication System** (Backend MVC security architecture with JWT, bcrypt, and Postman terminal mockup).
- **`SKILLS` Array:** Grouped by category (`Languages`, `Frontend`, `Backend & DB`, `Tools & Concepts`). Each item has `{ name, level }` where `level` maps to `'Comfortable'` (Mint), `'Learning'` (Lavender), or `'Exploring'` (Blush).
- **`CP_PROFILE_BUTTONS`:** Outbound links to external profiles (`LeetCode`, `CodeChef`, `Codeforces`, `Codolio`). *(AtCoder is omitted).*
- **`CP_FALLBACK`:** Client-side fail-safe values used if the backend is unreachable.

### 3.4 Key Component Specifications
- **`Projects.jsx`:**
  - Case-study cards with responsive dual-pane layout (`1.18fr 0.82fr` desktop, stacking on tablet/mobile).
  - Renders category pill, title, tech tags, narrative paragraph, discrete accomplishment bullets (`→`), and CTA action buttons (`Live App ↗` and `GitHub Repo ↗`).
  - **Dynamic Mockup Frames:**
    - For `jakeresume`: Renders `LatexResumeMockup` showing real-time line ceiling (`42/48 lines`), ATS Score gauge (`100%`), syntax-highlighted LaTeX AST, and compilation status.
    - For `mern-auth`: Renders `TerminalMockup` showing curl commands and JSON API response payloads.
- **`CompetitiveProgramming.jsx`:**
  - Platform rating cards (Codeforces rating & rank title, LeetCode rating & contest name, CodeChef stars & division rating).
  - Solved problems difficulty breakdown (Easy, Medium, Hard).
  - Live contribution heatmap rendering merged active dates.
- **`useScrollReveal.js`:**
  - Native `IntersectionObserver` observing all `.reveal` DOM elements and toggling the `.visible` animation class on viewport entry.

---

## 4. Design System & Styling Tokens

### 4.1 Color Palette (`styles/tokens.css`)

```css
:root {
  /* Surface & Base */
  --color-ink:        #121010;   /* Master background */
  --color-charcoal:   #1C1A18;   /* Card surface */
  --color-border:     #2C2A27;   /* Structural dividers & borders */

  /* Typography */
  --color-text:       #F5F3EF;   /* Primary off-white */
  --color-secondary:  #A39C92;   /* Secondary warm grey */
  --color-muted:      #6E675E;   /* Muted captions & subtitles */

  /* Accents */
  --color-mint:       #BFEFD4;   /* Success, solved problems, name highlights */
  --color-blush:      #F6C9D6;   /* Display headlines, warnings */
  --color-lavender:   #D9CFF2;   /* Primary buttons, links, ratings */
}
```

### 4.2 Typography Hierarchy
- **Display Headlines:** Bold condensed sans-serif (`Anton`, `Archivo Black`) — UPPERCASE, poster-scale, negative tracking (`.headline-display`).
- **Body & Narrative:** Serif (`Lora`, `Georgia`) — used for project descriptions and story paragraphs (`.font-body`).
- **UI, Nav & Buttons:** Clean sans-serif (`Manrope`) (`.font-ui`).
- **Telemetry, Code & Ratings:** Monospaced (`JetBrains Mono`) (`.font-mono`).

---

## 5. Key Data Contracts & Schemas

### 5.1 Project Data Contract (`constants.js`)

```typescript
interface Project {
  id: string;                     // Unique identifier (e.g., 'jakeresume', 'mern-auth')
  title: string;                  // Display title with descriptor
  category: string;               // e.g., 'Full Stack / Developer Tooling'
  description: string;            // Narrative overview (serif font)
  tags: string[];                 // Technology pills (e.g., ['React', 'Node.js', 'LaTeX'])
  tech?: string[];                // Legacy alias for tags
  highlights: string[];           // Detailed accomplishments with bullet arrows
  bullets?: string[];             // Legacy alias for highlights
  liveUrl?: string | null;        // Deployed application URL (or null for backend-only)
  githubUrl?: string | null;      // Source repository URL (or null)
  liveLink?: string | null;       // Alias for liveUrl
  githubLink?: string | null;     // Alias for githubUrl
  featured: boolean;              // Indicates top showcase status
}
```

### 5.2 API Stats Response Contract (`GET /api/cp-stats`)

```typescript
interface ApiResponse {
  success: boolean;
  data: {
    totalProblemsSolved: number;
    leetcodeSolved: number;
    codeforcesSolved: number;
    codechefSolved: number;
    activeDays: number;
    contestsAttended: number;
    codeforcesContests: number | null;
    codechefContests: number | null;
    leetcodeContests: number | null;
    atcoderContests: number | null;
    difficultyBreakdown: {
      easy: number;
      medium: number;
      hard: number;
    };
    leetcodeContestRating: number | null;
    leetcodeLatestContest: string | null;
    codechefRating: number | null;
    codechefMaxRating: number | null;
    codeforcesRating: number | null;
    codeforcesMaxRating: number | null;
    codeforcesTitle: string | null;
    activityCalendar: Record<string, number>; // "YYYY-MM-DD": submissionCount
    lastUpdated: string;                     // ISO Timestamp
    source: 'platform-apis' | 'cache' | 'fallback';
  };
}
```

---

## 6. Ground-Truth Facts & Invariant Rules

Any coding agent working on this codebase **must strictly observe the following rules**:

1. **Identity & Education:**
   - Name: Rohit Pandey
   - Degree: B.Tech in Computer Engineering (2025–2029)
   - Institution: Dwarkadas J. Sanghvi College of Engineering, Mumbai
   - CGPA: 9.45
   - Contact Email: `rohitpdev@gmail.com`
   - **Do NOT publish Rohit's phone number** on the website under any circumstance.
2. **Resume Feature Removal:**
   - There is **no Resume / Download Resume button** on this portfolio. It was intentionally omitted. Do not re-introduce resume download buttons.
3. **Project Authenticity:**
   - Only real projects created by Rohit may be listed. Never invent hypothetical projects, corporate case studies, or mock clients. Current authentic projects:
     1. **JakeResume — ATS LaTeX Resume Platform**
     2. **MERN Authentication System**
4. **Competitive Programming Constraints:**
   - **Codeforces handle is `Rohit.Pandey`** (do not use `Rohit_Pandey10`).
   - **AtCoder rule:** AtCoder rated contests count toward `contestsAttended`, but **never render an AtCoder rating card or button in the UI**.
   - **Codolio rule:** Codolio is treated exclusively as an outbound profile link. Codolio scraping was deprecated and removed due to instability.

---

## 7. Development Runbook & Verification Protocol

### 7.1 Local Development Setup

1. **Install Dependencies:**
   ```bash
   # From root
   npm run install
   ```

2. **Run Backend Microservice:**
   ```bash
   cd server
   npm run dev
   # Runs on http://localhost:5001 with nodemon
   # Health check: http://localhost:5001/api/health
   # Stats check:  http://localhost:5001/api/cp-stats
   ```

3. **Run Frontend Client:**
   ```bash
   cd client
   npm run dev
   # Runs on http://localhost:5173
   # Proxies /api requests to localhost:5001
   ```

### 7.2 Pre-Commit Verification Checklist

Before pushing changes or opening a pull request, execute the following commands in sequence:

```bash
# 1. Verify Client TypeScript & Vite Production Bundle
cd client && npm run build
# Must exit with code 0 and zero bundle/syntax errors.

# 2. Verify Backend Endpoints
curl -s http://localhost:5001/api/health
# Expected: {"status":"ok","timestamp":"..."}

curl -s http://localhost:5001/api/cp-stats
# Expected: {"success":true,"data":{...}}

# 3. Verify Vercel Routing Configuration
cat vercel.json
# Ensure rewrites map /api/(.*) -> /server/server.js and catch-all to SPA.
```