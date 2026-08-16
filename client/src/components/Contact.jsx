/**
 * Contact.jsx — Contact section
 * Phone number intentionally excluded for privacy — email, GitHub, LinkedIn only.
 */

import { LINKS } from '../data/constants';

const CONTACT_LINKS = [
  {
    id: 'contact-email',
    label: 'Email',
    display: 'rohitpdev@gmail.com',
    href: 'mailto:rohitpdev@gmail.com',
    accent: 'var(--color-mint)',
  },
  {
    id: 'contact-github',
    label: 'GitHub',
    display: 'Rohit-Pandey10',
    href: LINKS.github,
    accent: 'var(--color-lavender)',
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    display: 'rohit-pandey-964b1036a',
    href: LINKS.linkedin,
    accent: 'var(--color-blush)',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <p className="section-label reveal" style={{ marginBottom: '1.25rem' }}>
          Contact
        </p>

        <h2
          className="headline-display reveal"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
            color: 'var(--color-blush)',
            marginBottom: '1.5rem',
            animationDelay: '0.05s',
          }}
        >
          LET'S CONNECT
        </h2>

        <p
          className="font-body reveal"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            color: 'var(--color-secondary)',
            maxWidth: '520px',
            lineHeight: 1.8,
            marginBottom: '3rem',
            animationDelay: '0.1s',
          }}
        >
          I'm open to connecting with other developers, discussing projects, and
          exploring learning or internship opportunities.
        </p>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}
        >
          {CONTACT_LINKS.map((link, i) => (
            <a
              key={link.id}
              id={link.id}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="card reveal"
              aria-label={`${link.label}: ${link.display}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color var(--transition-base)',
                animationDelay: `${0.12 + i * 0.05}s`,
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = link.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <div>
                <p
                  className="font-ui"
                  style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '0.25rem' }}
                >
                  {link.label}
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}
                >
                  {link.display}
                </p>
              </div>
              <span
                style={{ fontSize: '1.1rem', color: link.accent }}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
