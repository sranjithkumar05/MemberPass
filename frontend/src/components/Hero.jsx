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
        {/* Left Column: Content */}
        <div className="hero-content">
          <div className="hero-brand-badge">
            <span className="hero-badge-sun">☀️</span>
            <span className="hero-badge-text">Mediterranean Coastal Wellness</span>
            <span className="hero-badge-tag">Sanctuary</span>
          </div>

          <h1 className="hero-title">
            Find Your Balance. <br />
            <span className="hero-title-highlight">Embrace Your Wellness.</span>
          </h1>

          <p className="hero-subtitle">
            Smart Membership Management Powered by AI &bull; Mediterranean Yoga Centre
          </p>

          <p className="hero-description">
            Experience serene coastal yoga sessions, mindful meditation retreats, and effortless
            digital membership access. MemberPass seamlessly unifies smart digital passes, class
            schedules, and personalized wellness journeys across the sun-drenched Mediterranean coast.
          </p>

          <div className="hero-actions">
            <a
              href="#features"
              className="btn btn-primary"
              onClick={(e) => handleScrollTo(e, '#features')}
            >
              <span>Explore Membership</span>
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
              href="#how-it-works"
              className="btn btn-secondary"
              onClick={(e) => handleScrollTo(e, '#how-it-works')}
            >
              <span>Discover Our Classes</span>
            </a>
          </div>

          {/* Quick wellness highlights */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-num">98%</span>
              <span className="trust-text">Member Harmony</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-num">35+</span>
              <span className="trust-text">Weekly Coastal Sessions</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-num">Instant</span>
              <span className="trust-text">Digital QR Check-in</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Composition with Coastal Yoga Image */}
        <div className="hero-visual-wrapper">
          <div className="hero-card-frame">
            <div className="hero-image-container">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
                alt="Serene Mediterranean coastal wellness and yoga retreat"
                className="hero-main-img"
                loading="eager"
              />
              <div className="hero-img-overlay" />
            </div>

            {/* Floating Mediterranean Yoga Pass Card */}
            <div className="floating-wellness-card retreat-card">
              <div className="card-top-icon">🧘‍♀️</div>
              <div>
                <div className="retreat-title">Sunrise Vinyasa by the Sea</div>
                <div className="retreat-meta">Daily at 07:00 AM &bull; Coastal Deck</div>
              </div>
            </div>

            {/* Floating Pass Badge */}
            <div className="floating-wellness-card member-pass-chip">
              <div className="chip-qr-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <line x1="10" y1="10" x2="14" y2="10" />
                </svg>
              </div>
              <div>
                <div className="pass-status">Verified MemberPass</div>
                <div className="pass-tier">Coastal Gold Sanctuary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
