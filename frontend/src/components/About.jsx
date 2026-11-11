export default function About() {
  const pillars = [
    {
      title: 'Automated Lifecycle Workflows',
      desc: 'AI handles registration validation, status updates, grace periods, and renewal notifications autonomously without human bottlenecks.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      tag: 'Automation',
    },
    {
      title: 'Predictive Member Insights',
      desc: 'Smart algorithms analyze member attendance and engagement trends to forecast churn risk and recommend timely retention initiatives.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      tag: 'Machine Learning',
    },
    {
      title: 'Error-Free Data Organization',
      desc: 'Eliminate duplicate member entries, normalize messy contact data, and maintain audit-ready records with automated verification.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      tag: 'Data Integrity',
    },
    {
      title: 'Adaptive Rule Engine',
      desc: 'Tailor custom tier configurations, member privileges, guest allowances, and validation criteria that evolve with your organization.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      tag: 'Flexibility',
    },
  ]

  const metrics = [
    { value: '10x', label: 'Faster Onboarding Process' },
    { value: '99.9%', label: 'Verification Data Accuracy' },
    { value: '24/7', label: 'AI Monitoring & Support' },
    { value: '0', label: 'Manual Spreadsheet Overhead' },
  ]

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-sparkle">✦</span>
            <span>About MemberPass</span>
          </div>
          <h2 className="section-title">
            Transforming Membership with <span className="title-gradient">Intelligent AI</span>
          </h2>
          <p className="section-subtitle">
            MemberPass was created to eliminate the friction, complexity, and manual overhead of traditional membership systems.
          </p>
        </div>

        {/* Vision & Purpose Narrative */}
        <div className="about-overview-grid">
          <div className="about-card about-vision-card">
            <div className="card-badge">Our Purpose & Vision</div>
            <h3 className="about-card-title">A Modern Platform Built for Growing Communities</h3>
            <p className="about-card-text">
              Managing members should never be slowed down by disjointed spreadsheets, forgotten renewals, or manual check-in logs. MemberPass unifies every stage of membership lifecycle management into an intelligent, centralized platform.
            </p>
            <p className="about-card-text">
              Our vision is to empower fitness clubs, co-working spaces, enterprise organizations, and professional associations with seamless digital passes, real-time activity intelligence, and friction-free interactions.
            </p>
          </div>

          <div className="about-card about-ai-card">
            <div className="card-badge">How AI Simplifies Everything</div>
            <h3 className="about-card-title">Intelligent Automation at Every Touchpoint</h3>
            <p className="about-card-text">
              Instead of administrators manually checking expiration dates and sending repetitive reminders, MemberPass’s built-in AI models monitor memberships in real time.
            </p>
            <p className="about-card-text">
              From auto-classifying member status to detecting renewal trends and answering questions via the intelligent assistant, AI turns tedious administrative burden into automated clarity.
            </p>
          </div>
        </div>

        {/* AI Pillars Grid */}
        <div className="about-pillars-grid">
          {pillars.map((pillar, index) => (
            <div key={index} className="pillar-card">
              <div className="pillar-header">
                <div className="pillar-icon">{pillar.icon}</div>
                <span className="pillar-tag">{pillar.tag}</span>
              </div>
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Impact Stats */}
        <div className="about-metrics-bar">
          {metrics.map((metric, i) => (
            <div key={i} className="metric-item">
              <div className="metric-val">{metric.value}</div>
              <div className="metric-lbl">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

