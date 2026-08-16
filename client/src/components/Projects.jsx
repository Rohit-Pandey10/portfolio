/**
 * Projects.jsx — Case-study card for MERN Authentication System
 *
 * Layout per spec:
 *   - Blush display headline ("SELECT WORK") in poster style
 *   - One real case-study card: pastel headline + serif description + styled terminal mockup
 *   - One empty-state card (no mockup, no invented projects)
 */

import { PROJECTS } from '../data/constants';

// ── Terminal mockup ──────────────────────────────────────────────────────────
function TerminalMockup() {
  return (
    <div
      style={{
        backgroundColor: '#0D0C0B',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        minHeight: '220px',
      }}
      aria-hidden="true"
    >
      {/* Terminal title bar */}
      <div
        style={{
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FEBC2E', display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28C840', display: 'inline-block' }} />
        <span style={{ marginLeft: '0.5rem', fontSize: '0.68rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>
          POST /api/auth/login
        </span>
      </div>

      {/* Terminal body — API response */}
      <div style={{ padding: '1rem 1.25rem', lineHeight: 1.7 }}>
        <p style={{ color: 'var(--color-muted)' }}>$ curl -X POST /api/auth/login \</p>
        <p style={{ color: 'var(--color-muted)', paddingLeft: '1rem' }}>-d '&#123; "email": "user@example.com" &#125;'</p>
        <br />
        <p style={{ color: 'var(--color-lavender)' }}>&#123;</p>
        <p style={{ paddingLeft: '1.25rem' }}>
          <span style={{ color: 'var(--color-blush)' }}>"success"</span>
          <span style={{ color: 'var(--color-muted)' }}>: </span>
          <span style={{ color: 'var(--color-mint)' }}>true</span>
          <span style={{ color: 'var(--color-muted)' }}>,</span>
        </p>
        <p style={{ paddingLeft: '1.25rem' }}>
          <span style={{ color: 'var(--color-blush)' }}>"token"</span>
          <span style={{ color: 'var(--color-muted)' }}>: </span>
          <span style={{ color: 'var(--color-secondary)' }}>"eyJhbGciOiJIUzI1..."</span>
          <span style={{ color: 'var(--color-muted)' }}>,</span>
        </p>
        <p style={{ paddingLeft: '1.25rem' }}>
          <span style={{ color: 'var(--color-blush)' }}>"user"</span>
          <span style={{ color: 'var(--color-muted)' }}>: &#123; </span>
          <span style={{ color: 'var(--color-secondary)' }}>"id"</span>
          <span style={{ color: 'var(--color-muted)' }}>, </span>
          <span style={{ color: 'var(--color-secondary)' }}>"email"</span>
          <span style={{ color: 'var(--color-muted)' }}> &#125;</span>
        </p>
        <p style={{ color: 'var(--color-lavender)' }}>&#125;</p>
        <br />
        <p style={{ color: 'var(--color-mint)' }}>✓ 200 OK · JWT issued · bcrypt validated</p>
      </div>
    </div>
  );
}

// ── Case study card ───────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <article
      className="reveal"
      aria-label={`Project: ${project.title}`}
      style={{
        backgroundColor: 'var(--color-charcoal)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 0,
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Left — text side */}
      <div style={{ padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
        <h3
          className="headline-display"
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--color-lavender)',
            lineHeight: 1,
          }}
        >
          {project.title}
        </h3>

        {/* Tech stack badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono"
              style={{
                fontSize: '0.68rem',
                color: 'var(--color-mint)',
                backgroundColor: 'rgba(191, 239, 212, 0.1)',
                border: '1px solid rgba(191, 239, 212, 0.2)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.2rem 0.6rem',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-body" style={{ fontSize: '0.95rem', color: 'var(--color-secondary)', lineHeight: 1.75 }}>
          {project.description}
        </p>

        {/* Bullets */}
        <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {project.bullets.map((bullet) => (
            <li
              key={bullet}
              className="font-body"
              style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', paddingLeft: '1rem', position: 'relative' }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--color-mint)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                →
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Right — terminal mockup */}
      <div
        style={{
          padding: '2rem',
          borderLeft: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TerminalMockup />
      </div>
    </article>
  );
}

// ── Empty state card ────────────────────────────────────────────────────────
function EmptyStateCard() {
  return (
    <div
      className="card reveal"
      style={{
        padding: '2rem 2.5rem',
        borderStyle: 'dashed',
        animationDelay: '0.1s',
      }}
    >
      <p
        className="font-body"
        style={{ fontSize: '1rem', color: 'var(--color-muted)', fontStyle: 'italic', lineHeight: 1.8 }}
      >
        More projects coming soon. Currently building and learning full-stack applications with React and Node.js.
      </p>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container">
        <p className="section-label reveal" style={{ marginBottom: '1.25rem' }}>
          Projects
        </p>

        <h2
          className="headline-display reveal"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
            color: 'var(--color-blush)',
            marginBottom: '3rem',
            animationDelay: '0.05s',
          }}
        >
          SELECT WORK
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <EmptyStateCard />
        </div>
      </div>
    </section>
  );
}
