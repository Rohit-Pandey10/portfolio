/**
 * Home.jsx — Single-page assembly
 * Renders all sections in order. The CpStatsProvider is set in App.jsx
 * so useCpStats context is available everywhere on this page.
 */

import { useEffect }             from 'react';
import { useScrollReveal }        from '../hooks/useScrollReveal';
import Navbar                     from '../components/Navbar';
import Hero                       from '../components/Hero';
import About                      from '../components/About';
import Skills                     from '../components/Skills';
import CompetitiveProgramming     from '../components/CompetitiveProgramming';
import Projects                   from '../components/Projects';
import Education                  from '../components/Education';
import Contact                    from '../components/Contact';
import Footer                     from '../components/Footer';

export default function Home() {
  // Initialise scroll reveal — re-runs on each render so newly mounted
  // elements (after route changes or data loads) get observed.
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <CompetitiveProgramming />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
