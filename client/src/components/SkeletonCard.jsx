/**
 * SkeletonCard.jsx — Loading placeholder card
 * Used in Hero stat cards and CP section while data is loading.
 */

export default function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`card ${className}`}
      role="status"
      aria-label="Loading..."
      style={{ minHeight: '80px' }}
    >
      <div className="skeleton" style={{ height: '1.5rem', width: '60%', marginBottom: '0.75rem' }} />
      <div className="skeleton" style={{ height: '0.875rem', width: '40%' }} />
    </div>
  );
}
