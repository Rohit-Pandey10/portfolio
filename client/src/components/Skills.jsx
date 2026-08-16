/**
 * Skills.jsx — Grouped skill cards with proficiency labels
 * Data driven by constants.js — edit skills there, not here.
 */

import { SKILLS } from '../data/constants';

const LEVEL_COLORS = {
  Comfortable: { bg: 'rgba(191, 239, 212, 0.12)', text: 'var(--color-mint)',     border: 'rgba(191, 239, 212, 0.25)' },
  Learning:    { bg: 'rgba(217, 207, 242, 0.12)', text: 'var(--color-lavender)', border: 'rgba(217, 207, 242, 0.25)' },
  Exploring:   { bg: 'rgba(246, 201, 214, 0.10)', text: 'var(--color-blush)',    border: 'rgba(246, 201, 214, 0.2)'  },
};

function LevelBadge({ level }) {
  const colors = LEVEL_COLORS[level] || LEVEL_COLORS.Exploring;
  return (
    <span
      title={level}
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: colors.text,
        display: 'inline-block',
        opacity: 0.8,
      }}
    />
  );
}

function SkillGroup({ category, items, index }) {
  return (
    <div
      className="card reveal"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <h3
        className="font-ui"
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginBottom: '1.25rem',
        }}
      >
        {category}
      </h3>
      <ul
        role="list"
        className="skills-list custom-scrollbar"
        style={{ 
          listStyle: 'none', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem',
          maxHeight: '180px',
          overflowY: 'auto',
          paddingRight: '0.25rem'
        }}
      >
        {items.map((skill) => (
          <li
            key={skill.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
            }}
          >
            <span
              className="font-ui"
              style={{ fontSize: '0.9rem', color: 'var(--color-text)', fontWeight: 500 }}
            >
              {skill.name}
            </span>
            <LevelBadge level={skill.level} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section"
      aria-label="Skills"
    >
      <div className="container">
        <p className="section-label reveal" style={{ marginBottom: '1.25rem' }}>
          Skills
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
          WHAT I WORK WITH
        </h2>

        {/* Legend */}
        <div
          className="reveal font-ui"
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
            animationDelay: '0.1s',
          }}
        >
          {Object.entries(LEVEL_COLORS).map(([label, colors]) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.text, display: 'inline-block', opacity: 0.8 }} />
              {label}
            </span>
          ))}
        </div>

        {/* Skill groups grid */}
        <div
          className="skills-grid"
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          <style>{`
            .skills-grid {
              flex-wrap: nowrap;
              /* Hide scrollbar for a cleaner look while keeping functionality */
              scrollbar-width: none;
            }
            .skills-grid::-webkit-scrollbar {
              display: none;
            }
            .skills-grid > * {
              flex: 0 0 calc(100vw - 3rem); /* Full width on mobile minus padding */
              max-width: 320px;
              scroll-snap-align: start;
            }
            @media (min-width: 900px) {
              .skills-grid {
                display: grid !important;
                grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
                overflow-x: visible !important;
              }
              .skills-grid > * {
                max-width: none;
              }
            }
            /* Custom scrollbar for the vertical list */
            .skills-list::-webkit-scrollbar {
              width: 4px;
            }
            .skills-list::-webkit-scrollbar-track {
              background: transparent;
            }
            .skills-list::-webkit-scrollbar-thumb {
              background: var(--color-border);
              border-radius: 4px;
            }
          `}</style>
          {SKILLS.map((group, i) => (
            <SkillGroup key={group.category} {...group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
