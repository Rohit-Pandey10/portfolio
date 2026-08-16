/**
 * Footer.jsx — Simple footer
 */

import { LINKS } from '../data/constants';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'rgba(18, 16, 16, 0.4)',
        marginTop: '2rem',
      }}
      aria-label="Site footer"
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <a
          href="#"
          className="font-display"
          style={{ fontSize: '1.25rem', letterSpacing: '0.05em', textDecoration: 'none', color: 'var(--color-text)' }}
        >
          Rohit Pandey
        </a>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-mint)'} onMouseLeave={e => e.target.style.color = 'var(--color-secondary)'}>GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-lavender)'} onMouseLeave={e => e.target.style.color = 'var(--color-secondary)'}>LinkedIn</a>
          <a href={LINKS.codolio} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-blush)'} onMouseLeave={e => e.target.style.color = 'var(--color-secondary)'}>Codolio</a>
        </div>
        
        <p
          className="font-ui"
          style={{ fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.05em', marginTop: '1rem' }}
        >
          Designed & Built in 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
