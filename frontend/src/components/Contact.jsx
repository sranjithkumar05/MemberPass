import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error')
      setFeedbackMsg('Please complete all required fields.')
      return
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error')
      setFeedbackMsg('Please enter a valid email address.')
      return
    }

    setStatus('submitting')

    // Simulate clean frontend submission
    setTimeout(() => {
      setStatus('success')
      setFeedbackMsg('Namaste! Thank you for reaching out. Our sanctuary concierge will contact you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: '',
      })
    }, 700)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-sparkle">🐚</span>
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Connect with Our <span className="title-gradient">Sanctuary Team</span>
          </h2>
          <p className="section-subtitle">
            Interested in implementing MemberPass for your yoga centre, or seeking a personalized retreat membership? Let's connect.
          </p>
        </div>

        <div className="contact-split-grid">
          {/* Left Column: Contact Information Cards */}
          <div className="contact-info-panel">
            <div className="contact-panel-intro">
              <h3 className="panel-title">Let’s Discuss Your Wellness Community</h3>
              <p className="panel-desc">
                Whether you’re managing an intimate yoga shala, coastal retreat resort, or a multi-location wellness studio, our platform brings calm efficiency to your community.
              </p>
            </div>

            <div className="contact-channels-list">
              <div className="channel-card">
                <div className="channel-icon ocean">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="channel-label">Concierge & Membership Inquiries</div>
                  <div className="channel-value">wellness@memberpass.co</div>
                </div>
              </div>

              <div className="channel-card">
                <div className="channel-icon sand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="channel-label">Sanctuary Location</div>
                  <div className="channel-value">Costa Brava Bay &bull; Mediterranean Coast</div>
                </div>
              </div>

              <div className="channel-card">
                <div className="channel-icon coral">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="channel-label">Studio Concierge Hours</div>
                  <div className="channel-value">Mon &ndash; Sat: 07:00 &ndash; 19:00 CET</div>
                </div>
              </div>
            </div>

            {/* Mediterranean Note Card */}
            <div className="sanctuary-note-card">
              <div className="note-card-icon">🌊</div>
              <div className="note-card-text">
                <strong>Mindful Routing Enabled:</strong> Inquiries are automatically routed to the right retreat coordinators for swift, personal assistance.
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Form */}
          <div className="contact-form-panel">
            <div className="form-card">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtitle">Fill in the details below and we will respond promptly.</p>

              {status === 'success' && (
                <div className="alert-box success">
                  <span className="alert-icon">✓</span>
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="alert-box error">
                  <span className="alert-icon">!</span>
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Elena Rossi"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="e.g. elena@wellness.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject / Area of Interest
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="general">Yoga Centre Platform Inquiry</option>
                    <option value="demo">Request Platform Demonstration</option>
                    <option value="features">Membership Tiers & QR Pass Features</option>
                    <option value="collaboration">Studio Partnership & Retreats</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    className="form-textarea"
                    placeholder="Tell us about your studio, retreat or membership inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <span className="loading-spinner-wrap">
                      <span className="spinner" /> Sending Message...
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
