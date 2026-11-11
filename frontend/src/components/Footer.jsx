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
            <Logo size="default" />
          </a>
          <p className="footer-brand-desc">
            MemberPass is an intelligent membership platform designed to simplify membership management through smart AI-powered technology.
          </p>
          <div className="footer-ai-status">
            <span className="footer-status-dot" />
            <span>AI Platform Engine Operational</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-column">
          <h4 className="footer-column-heading">Navigation</h4>
          <ul className="footer-nav-list">
            <li>
              <a href="#home" onClick={(e) => handleScrollTo(e, '#home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>
                About MemberPass
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                Key Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" onClick={(e) => handleScrollTo(e, '#how-it-works')}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>
                Contact Us
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
                AI Assistant
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                Member Information Management
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')}>
                Membership Tracking
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="section-container footer-bottom-inner">
          <p className="copyright-text">
            &copy; 2026 MemberPass. All rights reserved. Intelligent Membership Management Platform.
          </p>
          <div className="footer-meta-tags">
            <span className="meta-badge">Built with AI Intelligence</span>
            <span className="meta-divider">&bull;</span>
            <span className="meta-badge">Privacy First</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

