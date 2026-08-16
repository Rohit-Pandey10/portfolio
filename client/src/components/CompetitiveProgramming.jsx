/**
 * CompetitiveProgramming.jsx — Live CP stats dashboard
 *
 * Reads from useCpStats context (single shared fetch — no duplicate API call).
 * Shows:
 *   - Problems Solved (LeetCode + Codeforces only)
 *   - Active Days heatmap
 *   - Contest/Rating cards for LeetCode, CodeChef, Codeforces
 *     (AtCoder intentionally excluded — see AGENTS.md)
 *   - Difficulty breakdown donut-style visual
 *   - Profile buttons and Codolio link
 *
 * Loading: skeleton cards
 * Error/fallback: shows data with a subtle "using cached data" note
 */

import { useCpStats }         from '../context/CpStatsContext';
import SkeletonCard           from './SkeletonCard';
import { CP_PROFILE_BUTTONS, LINKS } from '../data/constants';

// ── Sub-components ──────────────────────────────────────────────────────────

function StatBlock({ label, value, accent, sublabel, loading }) {
  if (loading) return <SkeletonCard />;
  const color = {
    mint: 'var(--color-mint)', lavender: 'var(--color-lavender)', blush: 'var(--color-blush)'
  }[accent] || 'var(--color-mint)';

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <p className="font-mono" style={{ fontSize: '2.25rem', fontWeight: 600, color, lineHeight: 1, marginBottom: '0.4rem' }}>
        {value ?? '—'}
      </p>
      <p className="font-ui" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)' }}>
        {label}
      </p>
      {sublabel && (
        <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.35rem' }}>
          {sublabel}
        </p>
      )}
    </div>
  );
}

function RatingCard({ platform, rating, maxRating, title, accent, loading }) {
  if (loading) return <SkeletonCard />;
  const color = {
    lavender: 'var(--color-lavender)', mint: 'var(--color-mint)', blush: 'var(--color-blush)'
  }[accent] || 'var(--color-lavender)';

  return (
    <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
      <p className="font-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
        {platform}
      </p>
      <p className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 600, color, lineHeight: 1, marginBottom: '0.25rem' }}>
        {rating ?? '—'}
      </p>
      {maxRating && (
        <p className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>
          max {maxRating}
        </p>
      )}
      {title && (
        <p className="font-ui" style={{ fontSize: '0.72rem', color: 'var(--color-secondary)', marginTop: '0.35rem', fontStyle: 'italic' }}>
          {title}
        </p>
      )}
    </div>
  );
}

function DifficultyBar({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span className="font-ui" style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>{label}</span>
        <span className="font-mono" style={{ fontSize: '0.8rem', color }}>{count}</span>
      </div>
      <div style={{ height: '4px', borderRadius: '2px', backgroundColor: 'var(--color-border)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: color, borderRadius: '2px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function CompetitiveProgramming() {
  const { data, loading, error } = useCpStats();

  const diff = data?.difficultyBreakdown || { easy: 0, medium: 0, hard: 0 };
  const diffTotal = (diff.easy || 0) + (diff.medium || 0) + (diff.hard || 0);

  return (
    <section
      id="cp"
      className="section"
      aria-label="Competitive Programming"
    >
      <div className="container">
        {/* Header */}
        <p className="section-label reveal" style={{ marginBottom: '1.25rem' }}>
          Competitive Programming
        </p>

        <h2
          className="headline-display reveal"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
            color: 'var(--color-blush)',
            marginBottom: '0.75rem',
            animationDelay: '0.05s',
          }}
        >
          PROBLEMS &amp; RATINGS
        </h2>

        {/* Fallback notice */}
        {!loading && error && (
          <p
            className="font-ui reveal"
            style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '1.5rem', animationDelay: '0.08s' }}
          >
            ⚠ Showing cached / fallback data — could not reach live API
          </p>
        )}

        {/* Data source note */}
        {!loading && !error && data?.source && data.source !== 'client-fallback' && (
          <p
            className="font-ui reveal"
            style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginBottom: '1.75rem', animationDelay: '0.08s' }}
          >
            Source: {data.source} · Updated {data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : 'recently'}
          </p>
        )}

        {/* ── Row 1: Key stats ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <StatBlock
            label="Problems Solved"
            value="250+"
            accent="mint"
            loading={false}
          />
          <StatBlock label="Contests Attended" value={data?.contestsAttended} accent="lavender" loading={loading} />
        </div>

        {/* ── Row 2: Heatmap + Difficulty breakdown ── */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
            animationDelay: '0.1s',
          }}
        >
          {/* CP Focus / Training */}
          <div className="card">
            <p className="font-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
              Current Focus
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-mint)', marginTop: '-0.1rem' }}>✦</span>
                <div>
                  <p className="font-ui" style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: 500 }}>TLE Eliminators</p>
                  <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>Active in structured CP training</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-lavender)', marginTop: '-0.1rem' }}>✦</span>
                <div>
                  <p className="font-ui" style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: 500 }}>Advanced DSA</p>
                  <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>Graphs, Trees & Dynamic Programming</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-blush)', marginTop: '-0.1rem' }}>✦</span>
                <div>
                  <p className="font-ui" style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: 500 }}>Consistent Upsolving</p>
                  <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>Analyzing past Codeforces & LeetCode contests</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Difficulty Breakdown */}
          <div className="card">
            <p className="font-ui" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
              DSA Difficulty Breakdown
            </p>
            {loading ? (
              <>
                <div className="skeleton" style={{ height: '16px', marginBottom: '0.75rem' }} />
                <div className="skeleton" style={{ height: '16px', marginBottom: '0.75rem' }} />
                <div className="skeleton" style={{ height: '16px' }} />
              </>
            ) : (
              <>
                <DifficultyBar label="Easy"   count={diff.easy   || 0} total={diffTotal} color="var(--color-mint)" />
                <DifficultyBar label="Medium" count={diff.medium || 0} total={diffTotal} color="var(--color-lavender)" />
                <DifficultyBar label="Hard"   count={diff.hard   || 0} total={diffTotal} color="var(--color-blush)" />
                <p className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: '0.75rem' }}>
                  {diffTotal} total DSA questions
                </p>
              </>
            )}
          </div>
        </div>

        {/* ── Row 3: Platform rating cards ── */}
        {/* AtCoder intentionally excluded — see AGENTS.md §2 */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
            animationDelay: '0.15s',
          }}
        >
          <RatingCard
            platform="LeetCode"
            rating={data?.leetcodeContestRating}
            sublabel={data?.leetcodeLatestContest}
            accent="lavender"
            loading={loading}
          />
          <RatingCard
            platform="CodeChef"
            rating={data?.codechefRating}
            maxRating={data?.codechefMaxRating}
            accent="mint"
            loading={loading}
          />
          <RatingCard
            platform="Codeforces"
            rating={data?.codeforcesRating}
            maxRating={data?.codeforcesMaxRating}
            title={data?.codeforcesTitle}
            accent="blush"
            loading={loading}
          />
        </div>

        {/* ── Profile buttons ── */}
        <div
          className="reveal"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', animationDelay: '0.2s' }}
        >
          {CP_PROFILE_BUTTONS.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              id={`cp-profile-${btn.label.toLowerCase()}`}
            >
              {btn.label} ↗
            </a>
          ))}
        </div>

        {/* Codolio link */}
        <a
          href={LINKS.codolio}
          target="_blank"
          rel="noopener noreferrer"
          className="font-ui reveal"
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            animationDelay: '0.22s',
          }}
        >
          View live Codolio profile ↗
        </a>
      </div>
    </section>
  );
}
