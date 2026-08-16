# Rohit Pandey — Personal Portfolio

A personal portfolio website for Rohit Pandey, a second-year B.Tech Computer Engineering student at D. J. Sanghvi College of Engineering, Mumbai.

**Stack:** MongoDB · Express.js · React.js · Node.js (MERN) | Vite + Tailwind CSS (client) | MVC architecture (server)

---

## Project Structure

```
portfolio2_agy/
  client/          React app (Vite + Tailwind CSS)
  server/          Express MVC backend
  AGENTS.md        Stack anchor for AI-assisted sessions
  .env.example     Required environment variables
  README.md        This file
```

## Getting Started

### Prerequisites

- Node.js ≥ 20 (v24 LTS recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone & install

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env and set MONGO_URI to your MongoDB connection string
```

### 3. Run in development

```bash
# Terminal 1 — server (port 5000)
cd server && npm run dev

# Terminal 2 — client (port 5173)
cd client && npm run dev
```

### 4. Smoke test (server)

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/codolio-stats
```

### 5. Production build (client)

```bash
cd client && npm run build
```

---

## Environment Variables

See `.env.example` for all required variables.

| Variable | Description | Default |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/portfolio` |
| `PORT` | Express server port | `5000` |
| `CACHE_TTL_MINUTES` | How long CP stats cache is valid | `15` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:5173` |

---

## CP Stats — Fetch Strategy

The `/api/codolio-stats` endpoint uses a 4-tier fallback chain:

1. **Tier 1 — Codolio scrape** (`services/codolioScraper.js`)
2. **Tier 2 — Individual platform APIs** (`codeforcesService.js` + `leetcodeService.js`)
3. **Tier 3 — Cached MongoDB document** (last successful fetch)
4. **Tier 4 — Hardcoded fallback constants**

`cpAggregator.js` orchestrates this chain. The controller calls only the aggregator.

**Problems Solved = LeetCode solved + Codeforces solved only** (CodeChef excluded from this total).

---

## Sections

- **Hero** — Poster-style name treatment, stat cards (dynamic CP data)
- **About** — Personal summary
- **Skills** — Grouped by category with honest proficiency labels
- **Competitive Programming** — Live stats dashboard with heatmap
- **Projects** — MERN Auth System case-study card
- **Education** — D. J. Sanghvi College, B.Tech CE 2025–2029
- **Contact** — Email, GitHub, LinkedIn

---

## Tech Versions (pinned — see AGENTS.md)

| Package | Version |
|---|---|
| Node.js | v24.14.0 (LTS) |
| Express | 5.2.1 |
| Mongoose | 9.9.2 |
| React | 19.2.8 |
| Vite | 8.2.1 |
| Tailwind CSS | 4.3.3 |
| Axios | 1.9.0 |
| Cheerio | 1.2.0 |
