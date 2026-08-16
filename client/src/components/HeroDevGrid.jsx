/**
 * HeroDevGrid.jsx — Secondary supporting card grid for the Hero section right column
 *
 * Scope: ONLY used by Hero.jsx. Do not import elsewhere without reviewing the
 * layout implications — these cards are sized/spaced for the Hero side column.
 *
 * Three cards:
 *   1. Terminal mockup — generic dev-flavoured output, not a personal claim
 *   2. Tech stack chips — pulled from the SKILLS data source (read-only)
 *      NOTE: The chip list below is a manually curated subset (Node.js, Express.js,
 *      React.js, MongoDB, Tailwind CSS) sourced from the SKILLS constant in
 *      constants.js. It's intentionally small for the Hero card and is not a
 *      second full copy of the Skills section data.
 *   3. CP teaser — reads from the shared useCpStats context (same instance already
 *      powering Hero stat cards + the CP section). No second fetch.
 */

import { useCpStats } from '../context/CpStatsContext';
import { SKILLS }     from '../data/constants';

// ── Card 2: derive chip list from SKILLS (read-only, no mutation) ───────────
// Pull one item per relevant category for the compact hero card.
// If a name ever changes in constants.js it will flow through automatically.
const CORE_STACK_NAMES = new Set(['Node.js', 'Express.js', 'React.js', 'MongoDB', 'Tailwind CSS']);
const STACK_CHIPS = SKILLS
  .flatMap((group) => group.items)
  .filter((item) => CORE_STACK_NAMES.has(item.name))
  .map((item) => item.name);

// Accent colors per chip — stable mapping, no new colors introduced
const CHIP_ACCENT = {
  'Node.js':      'var(--color-mint)',
  'Express.js':   'var(--color-mint)',
  'React.js':     'var(--color-lavender)',
  'MongoDB':      'var(--color-mint)',
  'Tailwind CSS': 'var(--color-lavender)',
};

// ── Shared card chrome ────────────────────────────────────────────────────────
const CARD_STYLE = {
  backgroundColor: 'var(--color-charcoal)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  padding: '1.1rem 1.25rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
};

const LABEL_STYLE = {
  fontFamily: 'var(--font-ui)',
  fontSize: '0.62rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  marginBottom: '0.85rem',
};

// ── Card 1: Terminal mockup ───────────────────────────────────────────────────
function TerminalCard() {
  return (
    <div style={CARD_STYLE} aria-hidden="true">
      {/* Traffic-light dots — same style as Projects terminal mockup */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '0.85rem' }}>
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FEBC2E', display: 'inline-block' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#28C840', display: 'inline-block' }} />
      </div>

      <div style={{ lineHeight: 1.75, color: 'var(--color-muted)' }}>
        <p>
          <span style={{ color: 'var(--color-mint)', opacity: 0.7 }}>$</span>
          {' '}npm run dev
        </p>
        <p style={{ color: 'var(--color-lavender)', opacity: 0.85 }}>
          ➜{'  '}Local:{'  '}
          <span style={{ color: 'var(--color-secondary)' }}>http://localhost:5175</span>
        </p>
        <p style={{ color: 'var(--color-mint)' }}>
          ✓ ready in 340ms
        </p>
      </div>
    </div>
  );
}

// ── Card 2: Tech stack chips ──────────────────────────────────────────────────
function StackCard() {
  return (
    <div style={{ ...CARD_STYLE, fontFamily: 'var(--font-ui)' }}>
      <p style={LABEL_STYLE}>Stack</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {STACK_CHIPS.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: CHIP_ACCENT[name] || 'var(--color-secondary)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: `1px solid var(--color-border)`,
              borderRadius: 'var(--radius-pill)',
              padding: '0.2rem 0.55rem',
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Card 3: Live CP teaser ────────────────────────────────────────────────────
// Reads from the SAME useCpStats context instance already used by Hero stat cards
// and the CP section. No second fetch is triggered here.
function CpTeaserCard() {
  const { data, loading } = useCpStats();

  return (
    <a
      href="#cp"
      aria-label="Jump to Competitive Programming section"
      style={{
        display: 'block',
        textDecoration: 'none',
        ...CARD_STYLE,
        transition: 'border-color 200ms ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-mint)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
    >
      <p style={LABEL_STYLE}>
        Competitive Programming
        <span style={{ float: 'right', opacity: 0.5, fontSize: '0.65rem' }}>↓</span>
      </p>

      {loading ? (
        // Same skeleton style used elsewhere on the site
        <div>
          <div
            className="skeleton"
            style={{ height: '1.4rem', width: '50%', marginBottom: '0.5rem', borderRadius: 'var(--radius-sm)' }}
          />
          <div
            className="skeleton"
            style={{ height: '1.4rem', width: '40%', borderRadius: 'var(--radius-sm)' }}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-mint)', lineHeight: 1 }}>
              250+
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: 'var(--color-muted)', marginTop: '0.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Solved
            </p>
          </div>
          <div>
            <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-lavender)', lineHeight: 1 }}>
              {data?.contestsAttended ?? 22}
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: 'var(--color-muted)', marginTop: '0.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Contests
            </p>
          </div>
        </div>
      )}
    </a>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function HeroDevGrid() {
  return (
    <div
      aria-label="Dev workspace snapshot"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        maxWidth: '380px',
      }}
    >
      <TerminalCard />
      <StackCard />
      <CpTeaserCard />
    </div>
  );
}
