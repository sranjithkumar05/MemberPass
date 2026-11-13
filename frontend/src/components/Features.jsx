export default function Features() {
  const featuresList = [
    {
      id: 'smart-management',
      name: 'Smart Membership Management',
      tag: 'Sanctuary Platform',
      desc: 'Centralize membership tier definitions, automate renewal notices, and manage retreat lifecycles dynamically with customizable rules.',
      bullets: [
        'Multi-tier membership categories (Coastal Drop-in, Unlimited Sanctuary, VIP Retreat)',
        'Automated status transitions (Active, Grace, Renewed)',
        'Flexible pricing and customized renewal schedules',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      accentColor: 'ocean',
    },
    {
      id: 'ai-assistant',
      name: 'AI Wellness Assistant',
      tag: 'Mindful Engine',
      desc: 'Interact with an intelligent assistant to quickly query records, summarize attendance activity, and draft communication effortlessly.',
      bullets: [
        'Natural language queries for member lookup, class capacity and stats',
        'Smart trend detection for class attendance and seasonal peaks',
        'Automated drafting for personalized member notifications and welcome packs',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
        </svg>
      ),
      accentColor: 'coral',
    },
    {
      id: 'member-info',
      name: 'Member Information Management',
      tag: 'Secure Directory',
      desc: 'Maintain centralized, secure digital profiles with verified contact details, wellness preferences, and digital identification.',
      bullets: [
        'Comprehensive digital member profiles with photo verification',
        'Custom wellness attributes (yoga experience, retreat preferences, medical notes)',
        'Privacy-conscious secure data storage and audit-ready logs',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      accentColor: 'sand',
    },
    {
      id: 'membership-tracking',
      name: 'Membership Tracking & Passes',
      tag: 'Real-Time Insights',
      desc: 'Track class check-ins, attendance history, validity windows, and renewal statuses in real time through clear visual metrics.',
      bullets: [
        'Instant digital QR pass verification & check-in logging at coastal studios',
        'Live expiration monitors with serene proactive alerts',
        'Attendance frequency analytics and member retention metrics',
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      accentColor: 'sky',
    },
  ]

  return (
    <section id="features" className="features-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-sparkle">☀️</span>
            <span>Platform Capabilities</span>
          </div>
          <h2 className="section-title">
            Powerful Features for <span className="title-gradient">Effortless Sanctuary Management</span>
          </h2>
          <p className="section-subtitle">
            Explore the core pillars engineered to elevate how your yoga centre and wellness community manages, tracks, and retains members.
          </p>
        </div>

        {/* Features 2x2 Grid */}
        <div className="features-grid">
          {featuresList.map((feat) => (
            <div key={feat.id} className={`feature-card accent-${feat.accentColor}`}>
              <div className="feature-top-bar">
                <div className="feature-icon-box">{feat.icon}</div>
                <span className="feature-tag">{feat.tag}</span>
              </div>

              <h3 className="feature-name">{feat.name}</h3>
              <p className="feature-desc">{feat.desc}</p>

              <ul className="feature-bullets-list">
                {feat.bullets.map((bullet, idx) => (
                  <li key={idx} className="feature-bullet-item">
                    <span className="bullet-check">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
