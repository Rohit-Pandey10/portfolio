/**
 * About.jsx — Personal summary section
 */

export default function About() {
  return (
    <section
      id="about"
      className="section"
      aria-label="About Rohit Pandey"
    >
      <div className="container">
        <div style={{ maxWidth: '780px' }}>
          {/* Section label */}
          <p className="section-label reveal" style={{ marginBottom: '1.25rem' }}>
            About
          </p>

          {/* Section headline */}
          <h2
            className="headline-display reveal"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              color: 'var(--color-blush)',
              marginBottom: '2.5rem',
              animationDelay: '0.05s',
            }}
          >
            WHO I AM
          </h2>

          {/* Body copy — serif */}
          <div
            className="font-body reveal"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--color-secondary)',
              lineHeight: 1.85,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              animationDelay: '0.1s',
            }}
          >
            <p>
              I am a Computer Engineering student at Dwarkadas J. Sanghvi College of Engineering,
              Mumbai. I am currently learning full-stack web development with the MERN stack and
              strengthening my problem-solving skills through competitive programming.
            </p>
            <p>
              I have worked with backend concepts like REST APIs, MVC architecture, JWT authentication,
              MongoDB, and CRUD operations. I am currently learning React.js to build complete
              full-stack applications, and I leverage AI-assisted development tools for rapid
              prototyping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
