import Logo from './Logo'

export default function Footer() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer-wrapper">
      <div className="section-container footer-content-grid">
        {/* Brand Column */}
        <div className="footer-brand-column">
          <a
            href="#home"
            className="footer-logo-link"
            onClick={(e) => handleScrollTo(e, '#home')}
          >
            <Logo size="default" light={true} />
          </a>
          <p className="footer-brand-desc">
            MemberPass is an intelligent Mediterranean coastal wellness & yoga membership platform designed to harmonize member journeys through smart technology.
          </p>
          <div className="footer-wellness-status">
            <span className="footer-status-dot" />
            <span>Coastal Sanctuary Network Active</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="footer-links-column">
          <h4 className="footer-column-heading">Navigation</h4>
          <ul className="footer-nav-list">
            <li>
              <a href="#home" onClick={(e) => handleScrollTo(e, '#home')}>
                Home Sanctuary
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>
                About MemberPass
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                Sanctuary Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" onClick={(e) => handleScrollTo(e, '#how-it-works')}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>
                Contact & Inquiries
              </a>
            </li>
          </ul>
        </div>

        {/* Capabilities Column */}
        <div className="footer-links-column">
          <h4 className="footer-column-heading">Core Capabilities</h4>
          <ul className="footer-nav-list">
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                Smart Membership Management
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                AI Wellness Assistant
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                Member Profile Management
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                Digital QR Pass Tracking
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="section-container footer-bottom-inner">
          <p className="copyright-text">
            &copy; 2026 MemberPass. All rights reserved. Mediterranean Coastal Wellness Yoga Platform.
          </p>
          <div className="footer-meta-tags">
            <span className="meta-badge">Mediterranean Sanctuary</span>
            <span className="meta-badge">AI Powered</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
