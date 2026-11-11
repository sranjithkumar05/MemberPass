export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero-section">
      <div className="section-container hero-container">
        {/* Top AI Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Next-Gen AI Platform</span>
          <span className="hero-badge-tag">v2.0</span>
        </div>

        {/* Hero Heading & Subtitle */}
        <h1 className="hero-title">
          Welcome to <span className="title-gradient">MemberPass</span>
        </h1>

        <p className="hero-subtitle">
          Smart Membership Management Powered by AI
        </p>

        {/* Project Introduction */}
        <p className="hero-description">
          MemberPass is an intelligent membership platform designed to simplify membership
          management through smart AI-powered technology. Automate onboarding, track memberships
          in real-time, and empower your organization with predictive insights.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a
            href="#how-it-works"
            className="btn btn-primary"
            onClick={(e) => handleScrollTo(e, '#how-it-works')}
          >
            <span>Get Started</span>
            <svg
              className="btn-arrow-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="#features"
            className="btn btn-secondary"
            onClick={(e) => handleScrollTo(e, '#features')}
          >
            <span>Explore Features</span>
          </a>
        </div>

        {/* Hero Interactive Showcase Mockup */}
        <div className="hero-showcase">
          <div className="showcase-card">
            {/* Showcase Header Bar */}
            <div className="showcase-header">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="showcase-title-chip">
                <span className="chip-indicator" />
                <span>memberpass.ai // Platform Engine</span>
              </div>
              <div className="showcase-badge-pill">AI Active</div>
            </div>

            {/* Showcase Inner Grid */}
            <div className="showcase-content">
              {/* Metric Item 1 */}
              <div className="showcase-stat-box">
                <div className="stat-icon-wrapper purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className="stat-label">Active Members</div>
                  <div className="stat-val">3,842 <span className="stat-growth">+14%</span></div>
                </div>
              </div>

              {/* Metric Item 2 */}
              <div className="showcase-stat-box">
                <div className="stat-icon-wrapper blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <div className="stat-label">AI Automation Rate</div>
                  <div className="stat-val">99.4% <span className="stat-growth">Instant</span></div>
                </div>
              </div>

              {/* Metric Item 3 */}
              <div className="showcase-stat-box">
                <div className="stat-icon-wrapper cyan">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <div className="stat-label">Verification Time</div>
                  <div className="stat-val">0.3s <span className="stat-growth">Real-time</span></div>
                </div>
              </div>
            </div>

            {/* Live AI Status Stream Bar */}
            <div className="showcase-status-bar">
              <div className="status-stream-left">
                <span className="live-pulse" />
                <span className="status-stream-text">
                  <strong>AI Assistant:</strong> Verified 42 new memberships &bull; Scheduled 18 automated renewal alerts &bull; 0 manual errors
                </span>
              </div>
              <span className="status-stream-tag">Neural Sync OK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

