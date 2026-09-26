/**
 * Projects.jsx — Featured projects with case-study cards
 *
 * Displays:
 *   - BrandLoom AI Brand Strategy & Marketing Platform (Live full-stack app + Landing page screenshot preview)
 *   - JakeResume ATS LaTeX Resume Platform (Live full-stack app + LaTeX compiler mockup)
 *   - MERN Authentication System (Backend architecture + terminal mockup)
 *   - Clean links for liveUrl & githubUrl without text truncation
 */

import { PROJECTS } from '../data/constants';

// ── Terminal mockup (for backend projects) ──────────────────────────────────
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
        width: '100%',
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

// ── LaTeX resume compiler mockup for JakeResume ─────────────────────────────
function LatexResumeMockup({ liveUrl }) {
  const displayUrl = liveUrl ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'jake-resume-builder10.vercel.app';

  return (
    <div
      style={{
        backgroundColor: '#0D0C0B',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        width: '100%',
      }}
      aria-hidden="true"
    >
      {/* Title bar */}
      <div
        style={{
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FEBC2E', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28C840', display: 'inline-block' }} />
        </div>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.2rem 0.85rem',
            fontSize: '0.68rem',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-mono)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            maxWidth: 'calc(100% - 60px)',
          }}
        >
          <span style={{ color: 'var(--color-mint)', fontSize: '0.65rem', flexShrink: 0 }}>🔒</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayUrl}</span>
        </div>
      </div>

      {/* Real-time budget & ATS metrics bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          padding: '0.55rem 0.75rem',
          fontSize: '0.68rem',
          textAlign: 'center',
        }}
      >
        <div>
          <span style={{ color: 'var(--color-muted)' }}>Ceiling: </span>
          <span style={{ color: 'var(--color-mint)', fontWeight: 600 }}>42/48 lines</span>
        </div>
        <div>
          <span style={{ color: 'var(--color-muted)' }}>ATS Score: </span>
          <span style={{ color: 'var(--color-lavender)', fontWeight: 600 }}>100%</span>
        </div>
        <div>
          <span style={{ color: 'var(--color-muted)' }}>Engine: </span>
          <span style={{ color: 'var(--color-blush)', fontWeight: 600 }}>pdflatex</span>
        </div>
      </div>

      {/* Code preview */}
      <div style={{ padding: '1rem 1.25rem', lineHeight: 1.65, fontSize: '0.74rem' }}>
        <p style={{ color: 'var(--color-muted)' }}>% Atomic sanitization + glyphtounicode</p>
        <p>
          <span style={{ color: 'var(--color-blush)' }}>\documentclass</span>
          <span style={{ color: 'var(--color-lavender)' }}>[letterpaper,11pt]</span>
          <span style={{ color: 'var(--color-mint)' }}>&#123;article&#125;</span>
        </p>
        <p>
          <span style={{ color: 'var(--color-blush)' }}>\input</span>
          <span style={{ color: 'var(--color-mint)' }}>&#123;glyphtounicode&#125;</span>
        </p>
        <p>
          <span style={{ color: 'var(--color-blush)' }}>\pdfgentounicode</span>
          <span style={{ color: 'var(--color-muted)' }}>=</span>
          <span style={{ color: 'var(--color-secondary)' }}>1</span>
        </p>
        <br />
        <p>
          <span style={{ color: 'var(--color-blush)' }}>\begin</span>
          <span style={{ color: 'var(--color-mint)' }}>&#123;document&#125;</span>
        </p>
        <p style={{ paddingLeft: '1rem' }}>
          <span style={{ color: 'var(--color-lavender)' }}>\textbf&#123;Rohit Pandey&#125;</span>
          <span style={{ color: 'var(--color-muted)' }}> — Full Stack Engineer</span>
        </p>
        <p style={{ paddingLeft: '1rem' }}>
          <span style={{ color: 'var(--color-mint)' }}>\resumeSubHeadingListStart</span>
        </p>
        <p style={{ paddingLeft: '2rem' }}>
          <span style={{ color: 'var(--color-secondary)' }}>\resumeItem&#123;Reactive LaTeX generator (0ms delay)&#125;</span>
        </p>
        <p style={{ paddingLeft: '2rem' }}>
          <span style={{ color: 'var(--color-secondary)' }}>\resumeItem&#123;3-tier resilient compilation engine&#125;</span>
        </p>
        <p style={{ paddingLeft: '1rem' }}>
          <span style={{ color: 'var(--color-mint)' }}>\resumeSubHeadingListEnd</span>
        </p>
        <p>
          <span style={{ color: 'var(--color-blush)' }}>\end</span>
          <span style={{ color: 'var(--color-mint)' }}>&#123;document&#125;</span>
        </p>
        <br />
        <div
          style={{
            borderTop: '1px dashed var(--color-border)',
            paddingTop: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.68rem',
          }}
        >
          <span style={{ color: 'var(--color-mint)' }}>✓ Express proxy · .tex export · Overleaf</span>
          <span style={{ color: 'var(--color-muted)' }}>480ms</span>
        </div>
      </div>
    </div>
  );
}

// ── Project image / browser mockup ──────────────────────────────────────────
function ProjectImageMockup({ image, title, liveUrl }) {
  const displayUrl = liveUrl ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'brand-loom.vercel.app';

  return (
    <div
      style={{
        backgroundColor: '#0D0C0B',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        width: '100%',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Browser mockup title bar */}
      <div
        style={{
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FEBC2E', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28C840', display: 'inline-block' }} />
        </div>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.2rem 0.85rem',
            fontSize: '0.68rem',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-mono)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            maxWidth: 'calc(100% - 60px)',
          }}
        >
          <span style={{ color: 'var(--color-mint)', fontSize: '0.65rem', flexShrink: 0 }}>🔒</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayUrl}</span>
        </div>
      </div>

      {/* Landing page screenshot */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '16 / 10',
          backgroundColor: '#0a0a0c',
        }}
      >
        <img
          src={image}
          alt={title ? `${title} Preview` : 'Project Preview'}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </div>
    </div>
  );
}

// ── Case study card ───────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const tags = project.tags || project.tech || [];
  const highlights = project.highlights || project.bullets || [];
  const liveUrl = project.liveUrl || project.liveLink;
  const githubUrl = project.githubUrl || project.githubLink;

  return (
    <article
      className="reveal"
      aria-label={`Project: ${project.title}`}
      style={{
        backgroundColor: 'var(--color-charcoal)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="project-card-layout">
        {/* Left — text side */}
        <div className="project-card-info">
          {/* Category & Featured pill */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
            {project.category && (
              <span
                className="font-ui"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  fontWeight: 600,
                }}
              >
                {project.category}
              </span>
            )}
            {project.featured && (
              <span
                className="font-mono"
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--color-mint)',
                  backgroundColor: 'rgba(191, 239, 212, 0.1)',
                  border: '1px solid rgba(191, 239, 212, 0.25)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.2rem 0.65rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-mint)' }} />
                Featured Project
              </span>
            )}
          </div>

          <h3
            className="headline-display"
            style={{
              fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)',
              color: 'var(--color-lavender)',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h3>

          {/* Tech stack badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {tags.map((t) => (
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

          {/* Highlights */}
          <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {highlights.map((bullet, idx) => (
              <li
                key={idx}
                className="font-body"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-secondary)',
                  paddingLeft: '1.25rem',
                  position: 'relative',
                  lineHeight: 1.65,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.05rem',
                    color: 'var(--color-mint)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                >
                  →
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* Links / Action buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem', alignItems: 'center' }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id={`project-${project.id || index}-live`}
                style={{ fontSize: '0.84rem', padding: '0.55rem 1.25rem' }}
              >
                <span>Live App</span>
                <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>↗</span>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                id={`project-${project.id || index}-github`}
                style={{ fontSize: '0.84rem', padding: '0.55rem 1.25rem' }}
              >
                <span>GitHub Repo</span>
                <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>↗</span>
              </a>
            )}
            {!liveUrl && !githubUrl && (
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                Internal Architecture · Postman Tested
              </span>
            )}
          </div>
        </div>

        {/* Right — mockup frame */}
        <div className="project-card-mockup">
          {project.image ? (
            <ProjectImageMockup image={project.image} title={project.title} liveUrl={liveUrl} />
          ) : project.id === 'brandloom' ? (
            <ProjectImageMockup image="/brandloom-preview.png" title={project.title} liveUrl={liveUrl} />
          ) : project.id === 'jakeresume' ? (
            <LatexResumeMockup liveUrl={liveUrl} />
          ) : (
            <TerminalMockup />
          )}
        </div>
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
        <style>{`
          .project-card-layout {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 960px) {
            .project-card-layout {
              grid-template-columns: 1.18fr 0.82fr;
            }
          }
          .project-card-info {
            padding: 2.25rem 2.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.15rem;
            justify-content: center;
          }
          .project-card-mockup {
            padding: 2rem;
            border-top: 1px solid var(--color-border);
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.18);
          }
          @media (min-width: 960px) {
            .project-card-mockup {
              border-top: none;
              border-left: 1px solid var(--color-border);
              padding: 2.5rem;
            }
          }
          @media (max-width: 640px) {
            .project-card-info {
              padding: 1.5rem 1.25rem;
            }
            .project-card-mockup {
              padding: 1.25rem 1rem;
            }
          }
        `}</style>

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <EmptyStateCard />
        </div>
      </div>
    </section>
  );
}
