/**
 * CpStatsContext.jsx — Shared CP stats state
 *
 * Fetches /api/cp-stats ONCE on mount and makes the result available
 * to all components via context. Both the Hero stat cards and the
 * Competitive Programming section read from this context — there is no
 * duplicate fetch anywhere in the app.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CP_FALLBACK } from '../data/constants';

const CpStatsContext = createContext(null);

export function CpStatsProvider({ children }) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/cp-stats', { timeout: 20000 });
        if (!cancelled && res.data?.success) {
          setData(res.data.data);
        } else if (!cancelled) {
          // API responded but indicated failure — use client-side fallback
          setData(CP_FALLBACK);
          setError('api-error');
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[CpStats] Fetch failed, using client fallback:', err.message);
          setData(CP_FALLBACK);
          setError('network-error');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return (
    <CpStatsContext.Provider value={{ data, loading, error }}>
      {children}
    </CpStatsContext.Provider>
  );
}

/**
 * Hook — consume CP stats in any component.
 * Returns { data, loading, error }
 *   data    — the stats object (always set after loading; falls back to CP_FALLBACK)
 *   loading — true while the request is in-flight
 *   error   — 'network-error' | 'api-error' | null
 */
export function useCpStats() {
  const ctx = useContext(CpStatsContext);
  if (!ctx) throw new Error('useCpStats must be used inside <CpStatsProvider>');
  return ctx;
}
