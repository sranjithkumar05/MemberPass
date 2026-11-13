export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Configure Tiers & Passes',
      desc: 'Define custom membership levels, retreat access privileges, yoga class pricing, and automated renewal timelines tailored to your studio.',
      badge: 'Step 1: Setup',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Mindful Member Onboarding',
      desc: 'Seamlessly capture yogi profiles and preferences. The AI engine checks records, cleans duplicate data, and issues unique digital passes.',
      badge: 'Step 2: Onboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Real-Time Class Check-in',
      desc: 'Validate memberships instantly upon entry at coastal decks or studios. The platform updates attendance in real time and logs class capacity.',
      badge: 'Step 3: Check-in',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Serene Insights & Retention',
      desc: 'AI detects expiring memberships ahead of time, sends peaceful personalized renewal invites, and provides actionable community retention insights.',
      badge: 'Step 4: Nurture',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-sparkle">🧘</span>
            <span>Platform Workflow</span>
          </div>
          <h2 className="section-title">
            How <span className="title-gradient">MemberPass Works</span>
          </h2>
          <p className="section-subtitle">
            A frictionless, elegant four-step journey designed to handle retreat & yoga memberships with peaceful simplicity.
          </p>
        </div>

        {/* Workflow Steps Grid with Pipeline Connector */}
        <div className="workflow-steps-wrapper">
          <div className="steps-timeline-bar" aria-hidden="true" />
          
          <div className="workflow-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="workflow-card">
                <div className="step-number-container">
                  <span className="step-number">{step.number}</span>
                  <div className="step-icon-bubble">{step.icon}</div>
                </div>

                <span className="step-badge">{step.badge}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
