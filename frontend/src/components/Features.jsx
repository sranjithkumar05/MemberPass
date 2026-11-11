export default function Features() {
  const featuresList = [
    {
      id: 'smart-management',
      name: 'Smart Membership Management',
      tag: 'Core Platform',
      desc: 'Centralize membership tier definitions, automate renewal notices, and manage lifecycles dynamically with customizable rules.',
      bullets: [
        'Multi-tier membership categories (Standard, VIP, Corporate)',
        'Automated status transitions (Active, Grace, Expired)',
        'Flexible pricing and customized renewal schedules',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      accentColor: 'purple',
    },
    {
      id: 'ai-assistant',
      name: 'AI Assistant',
      tag: 'Intelligence Engine',
      desc: 'Interact with an intelligent assistant to quickly query records, summarize activity, and draft communication automatically.',
      bullets: [
        'Natural language queries for member lookup and stats',
        'Smart anomaly detection for attendance and sign-ups',
        'Automated drafting for personalized member alerts',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
        </svg>
      ),
      accentColor: 'indigo',
    },
    {
      id: 'member-info',
      name: 'Member Information Management',
      tag: 'Secure Directory',
      desc: 'Maintain centralized, secure digital profiles with verified contact details, custom attributes, and digital identification.',
      bullets: [
        'Comprehensive digital member profiles with photo IDs',
        'Custom metadata fields tailored to organizational needs',
        'Privacy-conscious data storage and audit-ready logs',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      accentColor: 'blue',
    },
    {
      id: 'membership-tracking',
      name: 'Membership Tracking',
      tag: 'Real-Time Insights',
      desc: 'Track check-ins, attendance history, validity windows, and renewal statuses in real time through visual metrics.',
      bullets: [
        'Instant digital pass verification & check-in logging',
        'Live expiration monitors with proactive alerts',
        'Engagement frequency analytics and retention metrics',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      accentColor: 'cyan',
    },
  ]

  return (
    <section id="features" className="features-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-sparkle">✦</span>
            <span>Platform Capabilities</span>
          </div>
          <h2 className="section-title">
            Powerful Features for <span className="title-gradient">Effortless Management</span>
          </h2>
          <p className="section-subtitle">
            Explore the core pillars engineered to elevate how your organization manages, tracks, and retains members.
          </p>
        </div>

        {/* Features 2x2 Grid */}
        <div className="features-grid">
          {featuresList.map((feat) => (
            <div key={feat.id} className={`feature-card accent-${feat.accentColor}`}>
              <div className="feature-card-glow" aria-hidden="true" />
              
              <div className="feature-top-bar">
                <div className={`feature-icon-wrapper ${feat.accentColor}`}>
                  {feat.icon}
                </div>
                <span className="feature-tag-badge">{feat.tag}</span>
              </div>

              <h3 className="feature-title">{feat.name}</h3>
              <p className="feature-description">{feat.desc}</p>

              <div className="feature-bullets-list">
                {feat.bullets.map((bullet, idx) => (
                  <div key={idx} className="feature-bullet-item">
                    <span className="bullet-check">✓</span>
                    <span className="bullet-text">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

