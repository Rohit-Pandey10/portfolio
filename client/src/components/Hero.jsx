/**
 * Hero.jsx — Full-bleed poster-style hero section
 *
 * Layout (desktop ≥ 900px):
 *   Left column — giant name treatment, tagline, buttons, stat cards
 *   Right column — HeroDevGrid (terminal card, stack chips, CP teaser)
 * Layout (mobile < 900px):
 *   Single column — left content, then HeroDevGrid stacked below
 *
 * The right column is purely decorative/supporting — the name is still
 * the primary visual focus. HeroDevGrid reads from the SAME useCpStats
 * context instance; no second fetch occurs.
 */

import { useCpStats, formatSolved } from '../context/CpStatsContext';
import SkeletonCard   from './SkeletonCard';
import { LINKS }      from '../data/constants';
import HeroDevGrid    from './HeroDevGrid';

function StatCard({ label, value, accent, loading }) {
  if (loading) return <SkeletonCard />;

  const accentColor = {
    mint:     'var(--color-mint)',
    lavender: 'var(--color-lavender)',
    blush:    'var(--color-blush)',
    secondary: 'var(--color-secondary)',
  }[accent] || 'var(--color-mint)';

  return (
    <div className="card" style={{ textAlign: 'center', padding: '1.25rem 1rem' }}>
      <p
        className="font-mono"
        style={{ fontSize: '1.75rem', fontWeight: 600, color: accentColor, lineHeight: 1 }}
      >
        {value}
      </p>
      <p
        className="font-ui"
        style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}
      >
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const { data, loading, error } = useCpStats();

  // formatSolved appends '+' for cache/fallback data to signal approximation;
  // shows bare number for live platform-apis data; '\u2014' if absent.
  const problemsSolved   = loading ? null : formatSolved(data);
  const contestsAttended = data?.contestsAttended ?? 22;

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '7rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Responsive two-column layout: side-by-side on desktop, stacked on mobile */}
      <style>{`
        .hero-inner {
          display: flex;
          align-items: center;
          gap: 4rem;
        }
        .hero-left  { flex: 1 1 0; min-width: 0; }
        .hero-right {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        @media (max-width: 900px) {
          .hero-inner  { flex-direction: column; align-items: flex-start; gap: 2.5rem; }
          .hero-right  { justify-content: flex-start; width: 100%; max-width: 100%; }
          .hero-right > * { max-width: 100% !important; }
        }
      `}</style>

      <div className="container">
        <div className="hero-inner">

        {/* ── Left column ── */}
        <div className="hero-left">
        {/* Small eyebrow label */}
        <p
          className="section-label reveal"
          style={{ marginBottom: '1.5rem', color: 'var(--color-muted)' }}
        >
          Portfolio · 2026
        </p>

        {/* Giant name — core visual signature */}
        <h1
          className="headline-display reveal"
          style={{
            fontSize: 'clamp(4rem, 15vw, 11rem)',
            color: 'var(--color-mint)',
            marginBottom: '0.25rem',
            animationDelay: '0.05s',
          }}
        >
          ROHIT
          <br />
          PANDEY
        </h1>

        {/* Short statement — Accent Blush, display scale */}
        <p
          className="headline-display reveal"
          style={{
            fontSize: 'clamp(1.5rem, 4.5vw, 3.25rem)',
            color: 'var(--color-blush)',
            marginBottom: '2rem',
            animationDelay: '0.1s',
          }}
        >
          LET'S BUILD SOMETHING
        </p>

        {/* Serif subtitle */}
        <p
          className="font-body reveal"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--color-text)',
            marginBottom: '0.75rem',
            maxWidth: '600px',
            animationDelay: '0.15s',
          }}
        >
          Computer Engineering Student · MERN Stack Developer · Competitive Programmer
        </p>

        {/* Description */}
        <p
          className="font-body reveal"
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            color: 'var(--color-secondary)',
            maxWidth: '560px',
            marginBottom: '2.5rem',
            lineHeight: 1.8,
            animationDelay: '0.2s',
          }}
        >
          I'm a second-year Computer Engineering student at D. J. Sanghvi College of Engineering,
          interested in web development, backend systems, and problem solving.
        </p>

        {/* Buttons */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3.5rem',
            animationDelay: '0.25s',
          }}
        >
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="hero-github-btn">
            GitHub ↗
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" id="hero-linkedin-btn">
            LinkedIn
          </a>
          <a href={LINKS.codolio} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" id="hero-codolio-btn">
            Coding Profiles
          </a>
        </div>

        {/* Stat cards */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            maxWidth: '640px',
            animationDelay: '0.3s',
          }}
        >
          <StatCard
            label="Problems Solved"
            value={problemsSolved ?? '—'}
            accent="mint"
            loading={loading}
          />
          <StatCard
            label="Contests"
            value={loading ? null : contestsAttended}
            accent="lavender"
            loading={loading}
          />
        </div>

        {/* Subtle fallback notice — only shown when API failed */}
        {!loading && error && (
          <p
            className="font-ui reveal"
            style={{
              fontSize: '0.7rem',
              color: 'var(--color-muted)',
              marginTop: '0.75rem',
              animationDelay: '0.35s',
            }}
          >
            ⚠ Showing approximate figures — live API unavailable
          </p>
        )}

        </div>{/* /hero-left */}

        {/* ── Right column — HeroDevGrid ── */}
        <div className="hero-right">
          <HeroDevGrid />
        </div>

        </div>{/* /hero-inner */}
      </div>
    </section>
  );
}
