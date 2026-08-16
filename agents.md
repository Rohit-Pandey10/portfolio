# AGENTS.md — Rohit Pandey Portfolio

Read this file in full before doing anything else. It anchors every session to the same facts, stack, structure, and design system — don't re-derive or "improve" on these without being asked.

## 1. Project summary

A personal portfolio website for Rohit Pandey, a second-year Computer Engineering student. MERN stack, MVC architecture on the backend, dark editorial visual theme. Full functional spec lives in the master prompt provided at project start — this file is the persistent reference that survives across sessions; the master prompt is the one-time brief.

## 2. Ground-truth facts (do not invent or alter)

- Name: Rohit Pandey
- Program: B.Tech, Computer Engineering, 2025–2029 (second-year as of now)
- College: Dwarkadas J. Sanghvi College of Engineering, Mumbai
- CGPA: 9.45
- Email: rohitpdev@gmail.com
- Codolio profile: https://codolio.com/profile/Rohit_Pandey10 — this is now ONLY an external "view my full profile" link (still shown as a profile button). It is NOT a data source anymore; Codolio scraping was removed because it never reliably returned data.
- GitHub: https://github.com/Rohit-Pandey10
- LinkedIn: https://www.linkedin.com/in/rohit-pandey-964b1036a/
- Do NOT display Rohit's phone number anywhere on the public site, even though it's on the resume PDF
- There is no Resume/Download Resume feature on this site — it was intentionally removed. Don't re-add a resume button, section, or PDF link.
- Only one real project exists: "MERN Authentication System" (Node.js, Express.js, MongoDB, JWT, bcrypt, MVC, tested with Postman). Never invent additional projects, companies, clients, or work history to fill out the page.
- CP fallback values (used only if every fetch tier fails — see §5 fetch chain):
  - Problems Solved: 212+ (legacy approximation — replace with the real sum of LeetCode + Codeforces + CodeChef solved counts once each service has run successfully at least once)
  - Active Days: 89 (legacy static number — replace with the real merged LeetCode + Codeforces activity-calendar count once available; see §5)
  - Contests Attended: 22
  - Difficulty Breakdown: Easy 24, Medium 20, Hard 0 (44 total)
  - LeetCode Contest Rating: 1500 (Biweekly Contest 187)
  - CodeChef: 1376 (max 1409)
  - Codeforces: 928 (max 1199), title Newbie
- **Problems Solved = LeetCode solved + Codeforces solved + CodeChef solved, summed from each platform's own API/scrape.** (This replaced an earlier LC+CF-only rule that existed specifically to work around Codolio's inconsistent categorization — that reasoning no longer applies now that Codolio isn't the data source.)
- **Active Days is derived from real activity-calendar data merged from LeetCode (`submissionCalendar`) and Codeforces (`user.status` submission timestamps).** CodeChef has no accessible daily-activity data, so it does not contribute to this stat — say so in a code comment, don't silently under-represent it as complete.
- Never show AtCoder anywhere (stats or profile buttons).

## 3. Tech stack

MERN: MongoDB, Express.js, React.js, Node.js. Client and server are separate packages in one repo (two-package monorepo, not Next.js).

Before scaffolding, check the currently stable versions of Node (LTS), Express, Mongoose, React, Vite, and Tailwind CSS — don't assume versions from training data, they drift. Record whatever versions you actually install in the table below and keep it updated as the source of truth for this repo.

| Package | Version pinned | Notes |
|---|---|---|
| Node.js | _fill in_ | use LTS |
| Express | _fill in_ | |
| Mongoose | _fill in_ | |
| React | _fill in_ | via Vite |
| Vite | _fill in_ | |
| Tailwind CSS | _fill in_ | |

## 4. Folder structure (MVC monorepo — follow exactly)

```
project-root/
  client/                        React app (Vite + Tailwind CSS)
    src/
      components/
      pages/
      hooks/
      styles/
      assets/
  server/                        Express app (MVC)
    controllers/
      statsController.js         Handles req/res only — stays thin
    models/
      CpStats.js                 Mongoose schema: cached stats + lastUpdated
    routes/
      statsRoutes.js              GET /api/cp-stats
    services/
      codeforcesService.js       Official Codeforces public API — rating + solved count + submission history for activity calendar
      leetcodeService.js         LeetCode's unofficial public GraphQL endpoint — solved count, contest rating, submissionCalendar
      codechefService.js         No official public API — scrapes the public CodeChef profile page (same pattern LeetCode uses: unofficial, wrapped defensively, comment explaining why)
      cpAggregator.js            Fetches all three services in parallel, merges results, and owns the fallback chain — the only service the controller calls
    config/
      db.js                       MongoDB connection setup
    server.js
  AGENTS.md                      This file
  README.md
  .env.example
```

## 5. Backend architecture rules

- **Controllers stay thin.** Request/response handling only — no API calls, no scraping, no business logic. The controller calls `cpAggregator.getStats()` and nothing else for CP data.
- **Each service owns exactly one platform.** `codeforcesService.js` (official API), `leetcodeService.js` (unofficial GraphQL), `codechefService.js` (unofficial profile scrape). None of them know about each other or about fallback logic. Codolio is no longer a data source anywhere in this codebase — it was removed because it never reliably returned data. The public Codolio profile link still exists as an external "view full profile" button elsewhere on the site; that's just a link, not a fetch.
- **`cpAggregator.js` fetches all three services in parallel** (e.g. `Promise.allSettled`) rather than a sequential primary/secondary chain — one platform failing shouldn't block the other two from returning real data. Fallback order per field: live result → last cached MongoDB value for that field → hardcoded constant (§2). This is the only orchestration logic in the codebase; don't duplicate fallback branching inside the controller or a service.
- **Active Days heatmap uses real data, not a fixed pattern.** `cpAggregator.js` merges LeetCode's `submissionCalendar` (date → count) with unique active days derived from Codeforces `user.status` submission timestamps into one calendar. CodeChef doesn't expose this, so it's excluded from the calendar (still counted in Problems Solved, just not in the daily heatmap) — note this in a code comment near the merge logic.
- **Models are the cache.** `CpStats.js` stores the last successfully fetched stats (including the merged activity calendar) plus a `lastUpdated` timestamp. The controller checks freshness (e.g. under 15 minutes old) before deciding to call the aggregator again.
- Config (Mongo connection string, etc.) lives in `.env`, never hardcoded. Keep `.env.example` in sync with whatever variables you add.

## 6. Design system (do not substitute a different palette or type pairing)

**Colors**
- Background (Ink): `#121010`
- Surface/Card (Charcoal): `#1C1A18`
- Primary Text (Off-White): `#F5F3EF`
- Secondary Text (Warm Grey): `#A39C92`
- Muted Text: `#6E675E`
- Accent Blush (pink — headline statements): `#F6C9D6`
- Accent Mint (green — name treatment, "solved"/success states): `#BFEFD4`
- Accent Lavender (primary CTA fill, links): `#D9CFF2`
- Border: `#2C2A27`

**Typography**
- Display/Headline: bold condensed grotesk (Anton, Archivo Black, or Bebas Neue) — ALL CAPS, tight tracking, poster-scale, short phrases only (2–5 words per line)
- Body/Narrative: Fraunces or Lora — serif, used for descriptions and paragraph copy
- UI/Nav/Buttons: Manrope
- Numbers/Stats/Code/Ratings: JetBrains Mono

**Signature patterns**
- Hero: giant name treatment ("ROHIT PANDEY") in Accent Mint, condensed display type, on the Ink background
- Buttons: pill-shaped. Primary = solid Accent Lavender fill + dark text. Secondary = outlined/ghost.
- CP section: dark cards, real Accent Mint contribution heatmap for Active Days (see §5 — merged LeetCode + Codeforces calendar, not a fixed pattern), Accent Lavender for contest/rating numbers
- Projects section: case-study card pattern — pastel headline + serif description + colorful stylized mockup frame, scaled honestly to one real project (see §2)
- Skills section: each skill shows a small colored dot (Mint = Comfortable, Lavender = Learning, Blush = Exploring) instead of a text pill, matching the legend already shown above the grid — no separate text label per skill
- Education + Contact: sit side by side as a 1×2 grid on desktop/tablet ("Where I Study" left, "Let's Connect" right), stacking to a single column on mobile

If a task requires a UI decision this file doesn't cover, default to the pattern already established elsewhere on the page rather than introducing a new one.

## 7. Session workflow (Antigravity-specific)

- **Plan before building.** Propose folder structure and data flow, wait for approval, then implement in phases: (1) scaffold, (2) backend MVC + CP endpoint, (3) static sections, (4) frontend wiring + loading/fallback states, (5) verify.
- **Verify locally after each phase.** `npm run build` in `client/`, and a smoke check against `GET /api/health` and `GET /api/codolio-stats` in `server/`. Fix failures before moving to the next phase.
- **If a change introduces build errors across several steps,** use `/rewind` to return to the last stable checkpoint rather than patching forward blindly.
- **If uncertain about scope or a missing fact** (e.g. a real GitHub URL, a new project to add), stop and ask rather than inventing a placeholder that looks like a real fact — placeholders must be obviously marked as such in code comments.
- Don't reintroduce Next.js, a light theme, a blue/slate SaaS palette, a Resume/Download Resume feature, or Codolio as a data source (it's link-only now) — all were explicitly rejected earlier in this project.