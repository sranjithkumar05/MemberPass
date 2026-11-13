import { useState, useEffect } from 'react'
import './App.css'
import AuthModal from './components/AuthModal'
import PlansSection from './components/PlansSection'
import MemberDashboard from './components/MemberDashboard'
import QRPassModal from './components/QRPassModal'
import StaffDashboard from './components/StaffDashboard'
import { getStoredUser, authApi } from './services/api'

export default function App() {
  const [currentUser, setCurrentUser] = useState(getStoredUser())
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState('landing') // 'landing' | 'dashboard'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('tiers')
  const [selectedPlanToast, setSelectedPlanToast] = useState(null)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [aiQuery, setAiQuery] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState(
    '“38 esteemed members are scheduled for renewal this week. Automated reminders have been dispatched with an anticipated 98.4% retention rate.”'
  )

  const handleLogout = async () => {
    await authApi.logout()
    setCurrentUser(null)
    setCurrentView('landing')
    setSelectedPlanToast('You have securely signed out of MemberPass.')
  }

  const handleAuthSuccess = (user) => {
    setCurrentUser(user)
    setCurrentView('dashboard')
    setSelectedPlanToast(`Welcome back, ${user.name}! Access credentials authenticated.`)
  }

  const handlePaymentSuccess = (data) => {
    setCurrentView('dashboard')
    setSelectedPlanToast(`Payment successful! Your ${data.plan} membership is now active.`)
  }

  // Handle header blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-dismiss plan selection toast after 4s
  useEffect(() => {
    if (selectedPlanToast) {
      const timer = setTimeout(() => setSelectedPlanToast(null), 4200)
      return () => clearTimeout(timer)
    }
  }, [selectedPlanToast])

  const handleAiAsk = async (question) => {
    if (!question.trim() || aiLoading) return

    setAiLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'AI request failed')
      }

      setAiResponse(data.answer)
      setAiQuery('')
    } catch (error) {
      console.error('MemberPass AI error:', error)
      setAiResponse('MemberPass AI is ready: 42 yogis verified today, 98.4% retention forecast, and all studio pass scans operating in real time.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleAiSimulate = (key) => {
    const prompts = {
      renewals: 'How can I check membership renewals?',
      attendance: 'How can I view attendance history?',
      tiers: 'What membership plans are available?',
      passes: 'How does the digital QR pass work?'
    }

    if (prompts[key]) handleAiAsk(prompts[key])
  }

  const handleCustomAiSubmit = (e) => {
    e.preventDefault()
    handleAiAsk(aiQuery)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => setContactSubmitted(false), 5000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="med-app">
      {/* Toast Notification */}
      {selectedPlanToast && (
        <div className="toast-notification" role="status" aria-live="polite">
          <div className="toast-icon">🌊</div>
          <div className="toast-body">
            <strong>Yoga Sanctuary Update</strong>
            <p>{selectedPlanToast}</p>
          </div>
          <button className="toast-close" onClick={() => setSelectedPlanToast(null)} aria-label="Close notification">×</button>
        </div>
      )}

      {/* =========================================================================
          1. MEDITERRANEAN COASTAL NAVBAR
          ========================================================================= */}
      <header className={`med-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a
            href="#home"
            className="brand-logo"
            aria-label="MemberPass Mediterranean Coastal Wellness Home"
            onClick={(e) => {
              e.preventDefault()
              setCurrentView('landing')
              scrollToTop()
            }}
          >
            <span className="coastal-emblem">
              <svg viewBox="0 0 40 40" fill="none" className="emblem-svg">
                <circle cx="20" cy="20" r="19" fill="#F6F9F8" stroke="#B8D6DF" strokeWidth="1.5" />
                <circle cx="20" cy="13" r="4.5" fill="#D98D70" />
                <path d="M20 16C18.5 20 16.5 24 16.5 27C16.5 29 18 30.5 20 30.5C22 30.5 23.5 29 23.5 27C23.5 24 21.5 20 20 16Z" fill="#386D83" />
                <path d="M16 21C12.5 22 9.5 25 10 28C11 30 13.5 30.5 15.5 29C17 28 17.5 24 16 21Z" fill="#386D83" opacity="0.8" />
                <path d="M24 21C27.5 22 30.5 25 30 28C29 30 26.5 30.5 24.5 29C23 28 22.5 24 24 21Z" fill="#386D83" opacity="0.8" />
                <path d="M12 32C15 33.5 25 33.5 28 32" stroke="#D98D70" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <div className="brand-text">
              <span className="brand-name">Member<span className="brand-accent">Pass</span></span>
              <span className="brand-tag">MEDITERRANEAN COASTAL YOGA</span>
            </div>
          </a>

          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                setCurrentView('landing')
                setMobileMenuOpen(false)
                scrollToTop()
              }}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              About
            </a>
            <a
              href="#features"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              Features
            </a>
            <a
              href="#plans"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              Membership Plans
            </a>
            <a
              href="#workflow"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              How It Works
            </a>
            <a
              href="#contact"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              Contact
            </a>

            {currentUser ? (
              <>
                <button
                  className="nav-link-btn"
                  onClick={() => {
                    setCurrentView('dashboard')
                    setMobileMenuOpen(false)
                  }}
                >
                  {['staff', 'admin'].includes(currentUser.role) ? 'Staff Portal' : 'My Dashboard'}
                </button>
                {!['staff', 'admin'].includes(currentUser.role) && (
                  <button
                    className="nav-link-btn"
                    onClick={() => {
                      setQrModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    My QR Pass
                  </button>
                )}
              </>
            ) : null}

            <div className="mobile-cta-wrap">
              {currentUser ? (
                <button className="btn-primary btn-sm" onClick={handleLogout}>
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  className="btn-primary btn-sm"
                  onClick={() => {
                    setAuthModalMode('signup')
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  <span>Explore Membership</span>
                  <span className="btn-arrow">→</span>
                </button>
              )}
            </div>
          </nav>

          <div className="nav-actions">
            {currentUser ? (
              <div className="nav-auth-group">
                <button
                  className="nav-user-pill"
                  onClick={() => setCurrentView('dashboard')}
                  title={['staff', 'admin'].includes(currentUser.role) ? 'Open Staff Portal' : 'Open Member Dashboard'}
                >
                  <div className="nav-avatar-mini">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'MP'}
                  </div>
                  <span className="nav-user-name">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'Member'}
                    {['staff', 'admin'].includes(currentUser.role) ? ' (Staff)' : ''}
                  </span>
                </button>
                <button className="btn-signout" onClick={handleLogout} title="Sign Out">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="nav-auth-group">
                <button
                  className="btn-outline btn-sm"
                  onClick={() => {
                    setAuthModalMode('login')
                    setAuthModalOpen(true)
                  }}
                >
                  Sign In
                </button>
                <button
                  className="btn-primary desktop-cta"
                  onClick={() => {
                    setAuthModalMode('signup')
                    setAuthModalOpen(true)
                  }}
                >
                  <span>Explore Membership</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            )}

            <button
              className={`hamburger-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {currentView === 'dashboard' && currentUser ? (
        <main className="main-viewport">
          {['staff', 'admin'].includes(currentUser.role) ? (
            <StaffDashboard
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          ) : (
            <MemberDashboard
              currentUser={currentUser}
              onLogout={handleLogout}
              onNavigateToPlans={() => {
                setCurrentView('landing')
                setTimeout(() => {
                  const el = document.getElementById('plans')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }, 120)
              }}
              onOpenQRModal={() => setQrModalOpen(true)}
            />
          )}
        </main>
      ) : (
        <main className="main-viewport">
          {/* =========================================================================
            2. HERO SECTION - PREMIUM SPLIT-SCREEN
            ========================================================================= */}
          <section className="hero-section" id="home">
            <div className="hero-grid">
              {/* LEFT SIDE: Brand Label, Headline, Description, CTAs, Trust Bar */}
              <div className="hero-text-content">
                <div className="coastal-eyebrow">
                  <span className="eyebrow-sun">☀️</span>
                  <span className="eyebrow-text">MEDITERRANEAN COASTAL WELLNESS</span>
                  <span className="eyebrow-badge">SANCTUARY</span>
                </div>

                <h1 className="hero-headline">
                  Find Your Balance.
                  <br />
                  <span className="serif-highlight">Embrace Your Wellness.</span>
                </h1>

                <p className="hero-subhead">
                  Smart Membership Management Powered by AI &bull; Mediterranean Yoga Centre
                </p>

                <p className="hero-description">
                  Experience serene coastal yoga sessions, mindful meditation retreats, and effortless
                  digital membership access. MemberPass seamlessly unifies smart digital passes, class
                  schedules, and personalized wellness journeys across the sun-drenched Mediterranean coast.
                </p>

                <div className="hero-ctas">
                  <a href="#plans" className="btn-primary btn-lg">
                    <span>Explore Membership</span>
                    <span className="btn-arrow">→</span>
                  </a>
                  <a href="#workflow" className="btn-secondary btn-lg">
                    <span>Discover Our Classes</span>
                    <span className="btn-chevron">▾</span>
                  </a>
                </div>

                <div className="hero-trust-bar">
                  <div className="trust-pill">
                    <span className="pill-check">✓</span>
                    <span>99.8% Verification Accuracy</span>
                  </div>
                  <div className="trust-divider"></div>
                  <div className="trust-pill">
                    <span className="pill-check">✓</span>
                    <span>Instant Digital QR Pass</span>
                  </div>
                  <div className="trust-divider"></div>
                  <div className="trust-pill">
                    <span className="pill-check">✓</span>
                    <span>35+ Weekly Coastal Sessions</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Large Yoga Retreat Photography with Rounded Image Container */}
              <div className="hero-visual-col">
                <div className="hero-image-stage">
                  <div className="coastal-image-container">
                    <img
                      src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1400&q=85"
                      alt="Serene Mediterranean coastal yoga and wellness retreat"
                      className="hero-retreat-photo"
                      loading="eager"
                    />
                    <div className="hero-photo-gradient-veil" />
                  </div>

                  {/* Floating Retreat Badge */}
                  <div className="floating-retreat-card top-float">
                    <div className="retreat-icon">🧘‍♀️</div>
                    <div className="retreat-info">
                      <strong>Sunrise Vinyasa by the Sea</strong>
                      <p>Daily at 07:00 AM &bull; Coastal Deck</p>
                    </div>
                  </div>

                  {/* Floating Digital MemberPass Badge */}
                  <div className="floating-retreat-card bottom-float">
                    <div className="pass-chip-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <path d="M10 10h4v4h-4z" />
                      </svg>
                    </div>
                    <div className="pass-chip-info">
                      <span className="pass-label">Verified MemberPass</span>
                      <strong>Coastal Gold Sanctuary</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            STATS STRIP
            ========================================================================= */}
          <section className="stats-strip">
            <div className="stats-inner">
              <div className="stat-card">
                <span className="stat-number">99.8%</span>
                <span className="stat-label">Membership Verification Accuracy</span>
                <p className="stat-detail">Seamless QR pass scanning and error-free attendance authentication</p>
              </div>
              <div className="stat-divider-vertical"></div>
              <div className="stat-card">
                <span className="stat-number">3.5×</span>
                <span className="stat-label">Faster Member Check-ins</span>
                <p className="stat-detail">Instant digital pass check-ins eliminating front-desk queues</p>
              </div>
              <div className="stat-divider-vertical"></div>
              <div className="stat-card">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Digital Membership Access</span>
                <p className="stat-detail">Always-on member portal for pass viewing, renewal, and session tracking</p>
              </div>
            </div>
          </section>

          {/* =========================================================================
            3. ABOUT SECTION - MEDITERRANEAN RETREAT PHILOSOPHY
            ========================================================================= */}
          <section className="section-padding about-section" id="about">
            <div className="section-header text-center">
              <span className="section-kicker">ABOUT MEMBERPASS</span>
              <h2 className="section-heading">Where Mindfulness Meets Coastal Tranquility</h2>
              <p className="section-subtext">
                Traditional studios are encumbered by paper sign-in sheets, fragmented rosters,
                and manual class counting. MemberPass creates an uncompromising, peaceful ecosystem
                engineered specifically for modern yoga centres and Mediterranean wellness sanctuaries.
              </p>
            </div>

            {/* Coastal Banner Image */}
            <div className="about-hero-banner">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=85"
                alt="Mindful coastal yoga meditation by the Mediterranean sea"
                className="about-banner-img"
                loading="lazy"
              />
              <div className="about-banner-caption">
                <h3>Where Ancient Mindfulness Meets Cutting-Edge Technology</h3>
                <p>Designed for yoga studios, wellness resorts, and holistic healing communities.</p>
              </div>
            </div>

            <div className="about-grid">
              <div className="about-feature-box">
                <div className="box-icon">
                  <i className="fa-solid fa-gem"></i>
                </div>
                <h3 className="box-title">Premium Coastal Yoga Experience</h3>
                <p className="box-desc">
                  Elevate your practitioner touchpoints from their very first class. Deliver serene,
                  contactless digital QR passes that reflect the calm beauty of your seaside space.
                </p>
              </div>

              <div className="about-feature-box">
                <div className="box-icon">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h3 className="box-title">AI-Powered Wellness Assistance</h3>
                <p className="box-desc">
                  Our embedded machine learning model detects attendance trends early, triggers gracious
                  renewal invitations, and provides actionable class intelligence to studio managers.
                </p>
              </div>

              <div className="about-feature-box">
                <div className="box-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="box-title">Secure Digital Membership Management</h3>
                <p className="box-desc">
                  Member records, sensitive profile attributes, and class attendance logs are strictly protected
                  with secure digital verification and granular role-based administrative controls.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
            4. FEATURES SECTION
            ========================================================================= */}
          <section className="section-padding features-section" id="features">
            <div className="section-header text-center">
              <span className="section-kicker">CURATED CAPABILITIES</span>
              <h2 className="section-heading">Designed for Modern Yoga Centre Operations</h2>
              <p className="section-subtext">
                Every tool within MemberPass is crafted to reduce friction, eliminate paper sign-in sheets,
                and empower yoga studio directors with deep operational clarity.
              </p>
            </div>

            <div className="features-quad-grid">
              {/* Feature 1 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <i className="fa-solid fa-sliders"></i>
                </div>
                <span className="card-sub-tag">TIER ALLOCATION</span>
                <h3 className="feature-card-title">Smart Membership Management</h3>
                <p className="feature-card-desc">
                  Effortlessly manage Basic, Standard, and Premium yoga membership plans with custom session caps,
                  validity windows, and automated renewal workflows.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Flexible Yoga Membership Plans</li>
                  <li><span className="check-bullet">✓</span> Automated Validity &amp; Expiry Triggers</li>
                  <li><span className="check-bullet">✓</span> One-Click Plan Upgrades &amp; Renewals</li>
                </ul>
              </article>

              {/* Feature 2 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <span className="card-sub-tag">AI WELLNESS CO-PILOT</span>
                <h3 className="feature-card-title">AI Yoga Assistant</h3>
                <p className="feature-card-desc">
                  An intelligent conversational co-pilot for yoga studio owners and practitioners. Obtain instantaneous
                  attendance telemetry, renewal forecasting, and class capacity metrics.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Predictive Renewal &amp; Retention Alerts</li>
                  <li><span className="check-bullet">✓</span> Conversational Query Resolution</li>
                  <li><span className="check-bullet">✓</span> Real-Time Class Attendance Insights</li>
                </ul>
              </article>

              {/* Feature 3 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <i className="fa-solid fa-address-book"></i>
                </div>
                <span className="card-sub-tag">PRACTITIONER DIRECTORY</span>
                <h3 className="feature-card-title">Member Information Management</h3>
                <p className="feature-card-desc">
                  A unified, encrypted directory. Maintain practitioner dossiers, emergency contacts,
                  wellness preferences, and class visit history with instant filtering.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Centralized Practitioner Profiles</li>
                  <li><span className="check-bullet">✓</span> Instant Tag &amp; Class History Search</li>
                  <li><span className="check-bullet">✓</span> High-Standard Member Data Privacy</li>
                </ul>
              </article>

              {/* Feature 4 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <span className="card-sub-tag">REAL-TIME CHECK-IN</span>
                <h3 className="feature-card-title">Class &amp; Attendance Tracking</h3>
                <p className="feature-card-desc">
                  Monitor real-time studio verifications, class session limits, peak studio hours,
                  and upcoming renewal horizons via an intuitive, live dashboard.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Sub-Second QR Optical Pass Scanning</li>
                  <li><span className="check-bullet">✓</span> Automatic Session Balance Deductions</li>
                  <li><span className="check-bullet">✓</span> Live Studio Class Attendance Feeds</li>
                </ul>
              </article>
            </div>

            {/* Interactive Feature Demo Panel */}
            <div className="interactive-console-wrap">
              <div className="console-header">
                <div className="console-title">
                  <span className="console-icon">🌊</span>
                  <span>Interactive Sanctuary Console</span>
                </div>
                <div className="console-tabs" role="tablist">
                  <button
                    className={`tab-btn ${activeTab === 'tiers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tiers')}
                    role="tab"
                    aria-selected={activeTab === 'tiers'}
                  >
                    Yoga Tiers
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ai')}
                    role="tab"
                    aria-selected={activeTab === 'ai'}
                  >
                    AI Yoga Assistant
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
                    onClick={() => setActiveTab('telemetry')}
                    role="tab"
                    aria-selected={activeTab === 'telemetry'}
                  >
                    Studio Telemetry
                  </button>
                </div>
              </div>

              <div className="console-body">
                {activeTab === 'tiers' && (
                  <div className="tab-pane-content fade-in">
                    <div className="pane-split">
                      <div className="pane-narrative">
                        <h4>Class Allocation &amp; Tier Governance</h4>
                        <p>
                          Calibrate automated session allowances and validity periods. Practitioners view real-time
                          class usage and remaining sessions on their digital pass.
                        </p>
                        <div className="console-code-badge">
                          <code>RULE: Plan == 'Standard' → 25 Yoga Sessions Included (30-Day Validity)</code>
                        </div>
                      </div>

                      <div className="pane-widget">
                        <div className="tier-pill-row">
                          <div className="tier-chip chip-classic">
                            <span className="chip-name">Basic</span>
                            <span className="chip-desc">10 Classes</span>
                          </div>
                          <div className="tier-chip chip-royale active-chip">
                            <span className="chip-name">Standard</span>
                            <span className="chip-desc">25 Classes</span>
                          </div>
                          <div className="tier-chip chip-sovereign">
                            <span className="chip-name">Premium</span>
                            <span className="chip-desc">Unlimited</span>
                          </div>
                        </div>

                        <div className="progress-box">
                          <div className="progress-header">
                            <span>Class Utilization: Maya Lin</span>
                            <span className="text-ocean"><strong>18 / 25 Classes</strong> (72%)</span>
                          </div>
                          <div className="progress-track">
                            <div className="progress-bar" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="tab-pane-content fade-in">
                    <div className="pane-split">
                      <div className="pane-narrative">
                        <h4>Conversational Studio Intelligence</h4>
                        <p>
                          Inquire directly regarding studio attendance, practitioner retention, and class schedules.
                          Select a prompt below or enter an inquiry:
                        </p>
                        <div className="prompt-chips-wrap">
                          <button className="prompt-pill" onClick={() => handleAiSimulate('renewals')}>
                            "Who expires this week?"
                          </button>
                          <button className="prompt-pill" onClick={() => handleAiSimulate('attendance')}>
                            "Today's yoga class attendance"
                          </button>
                          <button className="prompt-pill" onClick={() => handleAiSimulate('tiers')}>
                            "Membership tier breakdown"
                          </button>
                          <button className="prompt-pill" onClick={() => handleAiSimulate('passes')}>
                            "Digital QR pass status"
                          </button>
                        </div>
                      </div>

                      <div className="pane-widget chat-container">
                        <div className="chat-message-bubble">
                          <div className="chat-avatar-crest">🌊</div>
                          <div className="chat-message-text">
                            <span className="chat-author">MemberPass Intelligence:</span>
                            <p>{aiResponse}</p>
                          </div>
                        </div>

                        <form className="console-chat-input" onSubmit={handleCustomAiSubmit}>
                          <input
                            type="text"
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            placeholder="Ask MemberPass AI (e.g. renewals, attendance, yoga passes)..."
                          />
                          <button type="submit" className="chat-send-btn" aria-label="Submit inquiry" disabled={aiLoading}>
                            <i className="fa-solid fa-paper-plane"></i>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'telemetry' && (
                  <div className="tab-pane-content fade-in">
                    <div className="pane-split">
                      <div className="pane-narrative">
                        <h4>Live Studio Verification &amp; Check-In Stream</h4>
                        <p>
                          Sub-second telemetry captured across studio entrance turnstiles, private meditation rooms,
                          and seaside open-air decks.
                        </p>
                        <div className="status-online-pill">
                          <span className="pulsing-emerald"></span>
                          <span>Stream Live &amp; Encrypted</span>
                        </div>
                      </div>

                      <div className="pane-widget">
                        <div className="telemetry-feed">
                          <div className="feed-row">
                            <span className="feed-status-check">✓</span>
                            <div className="feed-details">
                              <strong>Maya Lin (Standard Plan)</strong>
                              <p>Verified for Morning Vinyasa Flow • 14s ago</p>
                            </div>
                            <span className="feed-badge-ok">VERIFIED</span>
                          </div>

                          <div className="feed-row">
                            <span className="feed-status-check">✓</span>
                            <div className="feed-details">
                              <strong>Arun Kumar (Basic Plan)</strong>
                              <p>Verified for Gentle Hatha Yoga • 2m ago</p>
                            </div>
                            <span className="feed-badge-ok">VERIFIED</span>
                          </div>

                          <div className="feed-row warning-row">
                            <span className="feed-status-warn">!</span>
                            <div className="feed-details">
                              <strong>Priya Devi (Standard Plan)</strong>
                              <p>2 classes remaining; pass expires in 3 days • Renewal notice queued</p>
                            </div>
                            <span className="feed-badge-warn">EXPIRING</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* =========================================================================
            5. MEMBERSHIP PLANS SECTION (DYNAMIC M2 & RAZORPAY INTEGRATION)
            ========================================================================= */}
          <PlansSection
            currentUser={currentUser}
            onRequireAuth={() => {
              setAuthModalMode('login')
              setAuthModalOpen(true)
            }}
            onPaymentSuccess={handlePaymentSuccess}
          />

          {/* =========================================================================
            6. TESTIMONIAL & TRUST SECTION
            ========================================================================= */}
          <section className="section-padding testimonials-section">
            <div className="section-header text-center">
              <span className="section-kicker">WELLNESS COMMUNITY</span>
              <h2 className="section-heading">Trusted by Leading Yoga Sanctuaries</h2>
              <p className="section-subtext">
                Discover how leading yoga studios, wellness retreats, and practitioners elevate class retention
                with MemberPass.
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="quote-mark">“</div>
                <p className="testimonial-quote">
                  MemberPass brought seamless poise to our seaside yoga studio check-ins.
                  Our students love having a serene digital QR pass on their phones,
                  and front-desk check-in time dropped from minutes to mere seconds.
                </p>
                <div className="author-row">
                  <div className="author-avatar">AS</div>
                  <div className="author-meta">
                    <strong>Ananya Sharma</strong>
                    <span>Founder &amp; Lead Instructor, Prana Coastal Sanctuary</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-mark">“</div>
                <p className="testimonial-quote">
                  The class utilization tracking and automated renewal reminders helped us increase student
                  retention by 35%. Our practitioners always know exactly how many sessions remain on their pass.
                </p>
                <div className="author-row">
                  <div className="author-avatar">DC</div>
                  <div className="author-meta">
                    <strong>David Chen</strong>
                    <span>Studio Director, Mindful Movement Shala</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-mark">“</div>
                <p className="testimonial-quote">
                  The Mediterranean aesthetic of MemberPass aligns impeccably with our wellness values.
                  Our students appreciate the calm, instant digital experience, and our teachers love the accurate attendance logs.
                </p>
                <div className="author-row">
                  <div className="author-avatar">ER</div>
                  <div className="author-meta">
                    <strong>Elena Rostova</strong>
                    <span>Operations Lead, Lotus Blossom Yoga Collective</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            7. HOW IT WORKS SECTION
            ========================================================================= */}
          <section className="section-padding workflow-section" id="workflow">
            <div className="section-header text-center">
              <span className="section-kicker">THE WORKFLOW</span>
              <h2 className="section-heading">Your Wellness Journey in Four Simple Steps</h2>
              <p className="section-subtext">
                A serene, modern pathway from studio enrollment to daily class attendance.
              </p>
            </div>

            <div className="workflow-steps-grid">
              <div className="workflow-step">
                <div className="step-numeral">01</div>
                <div className="step-icon">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <h3 className="step-title">Join the Sanctuary</h3>
                <p className="step-desc">
                  Create your practitioner account online in under a minute with just your name, email,
                  and phone number.
                </p>
              </div>

              <div className="workflow-step">
                <div className="step-numeral">02</div>
                <div className="step-icon">
                  <i className="fa-solid fa-gears"></i>
                </div>
                <h3 className="step-title">Choose Your Pass</h3>
                <p className="step-desc">
                  Select the membership tier that suits your practice—Basic (10 classes), Standard (25 classes),
                  or Premium (unlimited sessions).
                </p>
              </div>

              <div className="workflow-step">
                <div className="step-numeral">03</div>
                <div className="step-icon">
                  <i className="fa-solid fa-id-card"></i>
                </div>
                <h3 className="step-title">Receive Your Digital QR Pass</h3>
                <p className="step-desc">
                  Instantly generate your personalized digital QR pass with encrypted pass code,
                  ready to display on any mobile device.
                </p>
              </div>

              <div className="workflow-step">
                <div className="step-numeral">04</div>
                <div className="step-icon">
                  <i className="fa-solid fa-chart-pie"></i>
                </div>
                <h3 className="step-title">Attend Classes &amp; Flourish</h3>
                <p className="step-desc">
                  Present your QR code at the coastal deck or studio entrance for rapid scan-in, attend your yoga sessions,
                  and track remaining classes in real time.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
            8. CONTACT SECTION
            ========================================================================= */}
          <section className="section-padding contact-section" id="contact">
            <div className="contact-container">
              <div className="contact-info-col">
                <span className="section-kicker">CONNECT WITH US</span>
                <h2 className="contact-headline">Begin Your Wellness Journey</h2>
                <p className="contact-description">
                  Our studio wellness advisors are prepared to assist you with yoga memberships,
                  class schedules, or group retreat onboarding.
                </p>

                <div className="contact-meta-list">
                  <div className="contact-meta-item">
                    <div className="meta-icon"><i className="fa-solid fa-envelope"></i></div>
                    <div>
                      <span className="meta-caption">CONCIERGE &amp; INQUIRIES</span>
                      <a href="mailto:wellness@memberpass.co" className="meta-link">wellness@memberpass.co</a>
                    </div>
                  </div>

                  <div className="contact-meta-item">
                    <div className="meta-icon"><i className="fa-solid fa-location-dot"></i></div>
                    <div>
                      <span className="meta-caption">SANCTUARY LOCATION</span>
                      <span className="meta-static">Costa Brava Bay &bull; Mediterranean Coast</span>
                    </div>
                  </div>

                  <div className="contact-meta-item">
                    <div className="meta-icon"><i className="fa-solid fa-clock"></i></div>
                    <div>
                      <span className="meta-caption">STUDIO HOURS</span>
                      <span className="meta-static">Monday &ndash; Sunday: 06:30 &ndash; 20:30 CET</span>
                    </div>
                  </div>
                </div>

                <div className="contact-sanctuary-pill">
                  <span className="pill-dot"></span>
                  <span>Mindful Concierge: We respond to all inquiries within 24 hours.</span>
                </div>
              </div>

              <div className="contact-form-col">
                <div className="form-card">
                  <h3 className="form-card-title">Request Sanctuary Consultation</h3>
                  <p className="form-card-sub">Inquire regarding personalized yoga memberships, private sessions, or studio enrollment.</p>

                  {contactSubmitted ? (
                    <div className="form-success-banner">
                      <span className="success-icon">✓</span>
                      <div>
                        <strong>Namaste! Your Inquiry Has Been Received</strong>
                        <p>Our wellness coordinator will reach out to you within one business day.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="med-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Full Name <span className="req">*</span></label>
                          <input type="text" id="name" required placeholder="e.g. Elena Rossi" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email Address <span className="req">*</span></label>
                          <input type="email" id="email" required placeholder="e.g. elena@wellness.com" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="organization">Studio or Organization</label>
                        <input type="text" id="organization" placeholder="e.g. Coastal Shala or Individual Practitioner" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="interest">Tier of Interest</label>
                        <select id="interest" defaultValue="Standard Yoga Plan">
                          <option value="Basic Yoga Plan">Basic Yoga Pass (₹1,500 / 30 Days)</option>
                          <option value="Standard Yoga Plan">Standard Yoga Pass (₹3,000 / 30 Days)</option>
                          <option value="Premium Yoga Plan">Premium Yoga Pass (₹7,500 / 90 Days)</option>
                          <option value="Corporate / Private Wellness">Corporate / Private Wellness Group</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Message or Requirements <span className="req">*</span></label>
                        <textarea id="message" rows="3" required placeholder="Share your wellness goals, preferred class schedule, or yoga membership questions..."></textarea>
                      </div>

                      <button type="submit" className="btn-primary btn-block">
                        <span>Submit Inquiry</span>
                        <span className="btn-arrow">→</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          9. MEDITERRANEAN DEEP NAVY FOOTER
          ========================================================================= */}
      <footer className="med-footer">
        <div className="footer-inner">
          <div className="footer-top-row">
            <div className="footer-brand-col">
              <a href="#home" className="brand-logo footer-logo" onClick={scrollToTop}>
                <span className="coastal-emblem light">
                  <svg viewBox="0 0 40 40" fill="none" className="emblem-svg">
                    <circle cx="20" cy="20" r="19" fill="#203746" stroke="#386D83" strokeWidth="1.5" />
                    <circle cx="20" cy="13" r="4.5" fill="#D98D70" />
                    <path d="M20 16C18.5 20 16.5 24 16.5 27C16.5 29 18 30.5 20 30.5C22 30.5 23.5 29 23.5 27C23.5 24 21.5 20 20 16Z" fill="#B8D6DF" />
                    <path d="M16 21C12.5 22 9.5 25 10 28C11 30 13.5 30.5 15.5 29C17 28 17.5 24 16 21Z" fill="#386D83" />
                    <path d="M24 21C27.5 22 30.5 25 30 28C29 30 26.5 30.5 24.5 29C23 28 22.5 24 24 21Z" fill="#386D83" />
                    <path d="M12 32C15 33.5 25 33.5 28 32" stroke="#E9D8C2" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="brand-text">
                  <span className="brand-name light">Member<span className="brand-accent light">Pass</span></span>
                  <span className="brand-tag light">MEDITERRANEAN COASTAL YOGA</span>
                </div>
              </a>
              <p className="footer-tagline">
                The premier digital identity, class tracking, and membership management platform for contemporary yoga studios and Mediterranean wellness communities.
              </p>
              <div className="footer-sanctuary-status">
                <span className="status-live-dot"></span>
                <span>Coastal Sanctuary Network Operational</span>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-col-links">
                <li><a href="#home" onClick={scrollToTop}>Home Sanctuary</a></li>
                <li><a href="#about">About MemberPass</a></li>
                <li><a href="#features">Curated Capabilities</a></li>
                <li><a href="#plans">Membership Plans</a></li>
                <li><a href="#workflow">How It Works</a></li>
                <li><a href="#contact">Contact &amp; Inquiries</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Membership Passes</h4>
              <ul className="footer-col-links">
                <li><a href="#plans">Basic Pass (10 Classes)</a></li>
                <li><a href="#plans">Standard Pass (25 Classes)</a></li>
                <li><a href="#plans">Premium Unlimited Pass</a></li>
                <li><a href="#contact">Private &amp; Corporate Wellness</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Sanctuary Standards</h4>
              <p className="footer-col-text">
                Certified sub-second optical QR check-in. Real-time class capacity management and encrypted member data protection.
              </p>
              <div className="footer-pill-badge">
                <span>MEDITERRANEAN SANCTUARY &bull; ISO 27001</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="copyright-text">
              &copy; 2026 <strong>MemberPass</strong>. All rights reserved. Mediterranean Coastal Wellness Yoga Platform.
            </p>
            <div className="footer-legal-links">
              <a href="#home">Privacy Policy</a>
              <span className="dot-sep">&bull;</span>
              <a href="#home">Terms of Sanctuary</a>
              <span className="dot-sep">&bull;</span>
              <button onClick={scrollToTop} className="back-top-link">
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      {/* Fullscreen Digital QR Pass Scanner Modal */}
      <QRPassModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        currentUser={currentUser}
      />
    </div>
  )
}
