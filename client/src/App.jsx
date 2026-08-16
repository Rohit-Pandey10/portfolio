/**
 * App.jsx — Root component
 * Wraps the app in CpStatsProvider so the single fetch is shared
 * between Hero stat cards and the Competitive Programming section.
 */

import { CpStatsProvider } from './context/CpStatsContext';
import Home                from './pages/Home';
import './index.css';

export default function App() {
  return (
    <CpStatsProvider>
      <Home />
    </CpStatsProvider>
  );
}
