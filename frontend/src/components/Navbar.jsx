import { useState, useEffect } from 'react'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Track active section
      const sections = ['home', 'about', 'features', 'how-it-works', 'contact']
      const scrollPosition = window.scrollY + 180

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a
          href="#home"
          className="navbar-brand-link"
          onClick={(e) => handleLinkClick(e, '#home')}
          aria-label="MemberPass Home"
        >
          <Logo size="default" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                  {activeSection === link.id && <span className="active-pill" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

