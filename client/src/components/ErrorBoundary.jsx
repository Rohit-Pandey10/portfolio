import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Competitive Programming section failed:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="section" aria-label="Competitive Programming unavailable">
        <div className="container">
          <div className="card" role="alert" style={{ padding: '1.5rem' }}>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>
              Competitive Programming
            </p>
            <p className="font-ui" style={{ color: 'var(--color-secondary)' }}>
              CP telemetry is temporarily unavailable. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

