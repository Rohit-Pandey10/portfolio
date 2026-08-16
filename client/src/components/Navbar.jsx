/**
 * Navbar.jsx — Site navigation
 * Sticky top bar with section links and a mobile hamburger menu.
 * No Resume button (per AGENTS.md — explicitly removed from this project).
 */

import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/constants';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Add subtle background blur when scrolled and track active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine which section is currently on screen
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is at or above the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      if (window.scrollY < 100) current = ''; // reset near top
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Init on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on nav-link click
  const handleLinkClick = () => setOpen(false);

  return (
    <nav
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backgroundColor: scrolled ? 'rgba(18, 16, 16, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          padding: '0 1.5rem',
        }}
      >
        {/* Logo / wordmark */}
        <a
          href="#"
          className="font-display"
          style={{ fontSize: '1.1rem', letterSpacing: '0.05em', textDecoration: 'none', color: 'var(--color-text)' }}
          aria-label="Rohit Pandey — home"
        >
          Rohit Pandey
        </a>

        {/* Desktop nav links */}
        <ul
          role="list"
          className="font-ui"
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.href} className="nav-item-desktop">
                <a
                  href={link.href}
                  className={isActive ? 'nav-link active' : 'nav-link'}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          id="nav-hamburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-mobile-menu"
          onClick={() => setOpen(!open)}
          className="font-ui"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text)',
            fontSize: '1.5rem',
            lineHeight: 1,
            padding: '0.25rem',
          }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="nav-mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            backgroundColor: 'rgba(18, 16, 16, 0.97)',
            borderTop: '1px solid var(--color-border)',
            padding: '1.5rem',
          }}
        >
          <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-ui"
                    onClick={handleLinkClick}
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--color-text)' : 'var(--color-secondary)',
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.25rem 0',
                      borderLeft: isActive ? '2px solid var(--color-mint)' : '2px solid transparent',
                      paddingLeft: '0.75rem',
                      transition: 'color 0.2s ease, border-color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Styles */}
      <style>{`
        #nav-hamburger { display: none; }
        
        .nav-link {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-secondary);
          transition: color var(--transition-fast), border-color var(--transition-fast);
          text-decoration: none;
          border-bottom: 2px solid transparent;
          padding-bottom: 0.3rem;
        }
        
        .nav-link:hover {
          color: var(--color-text);
        }
        
        .nav-link.active {
          color: var(--color-text);
          border-bottom: 2px solid var(--color-mint);
        }

        @media (max-width: 768px) {
          #nav-hamburger { display: block; }
          ul[aria-label="Main navigation"] { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
