/**
 * Education.jsx — Education section
 */

import { EDUCATION } from '../data/constants';

export default function Education() {
  return (
    <section id="education" className="section" aria-label="Education">
      <div className="container">
        <p className="section-label reveal" style={{ marginBottom: '1.25rem' }}>
          Education
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
          WHERE I STUDY
        </h2>

        {EDUCATION.map((edu) => (
          <article
            key={edu.institution}
            className="card reveal"
            aria-label={`${edu.institution} — ${edu.degree}`}
            style={{ maxWidth: '680px', animationDelay: '0.1s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <h3
                  className="font-ui"
                  style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}
                >
                  {edu.institution}
                </h3>
                <p className="font-body" style={{ fontSize: '0.95rem', color: 'var(--color-secondary)', fontStyle: 'italic' }}>
                  {edu.degree}
                </p>
              </div>
              <span
                className="font-mono"
                style={{ fontSize: '0.8rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}
              >
                {edu.years}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span
                className="font-mono"
                style={{ fontSize: '0.85rem', color: 'var(--color-mint)' }}
              >
                CGPA {edu.cgpa}
              </span>
              <span
                className="font-ui"
                style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}
              >
                {edu.location}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
