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
      setFeedbackMsg('Please fill in all required fields.')
      return
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error')
      setFeedbackMsg('Please provide a valid email address.')
      return
    }

    setStatus('submitting')

    // Simulate clean frontend submission
    setTimeout(() => {
      setStatus('success')
      setFeedbackMsg('Thank you for contacting MemberPass! Your message has been received. Our team will get back to you shortly.')
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: '',
      })
    }, 900)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-sparkle">✦</span>
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Connect with the <span className="title-gradient">MemberPass Team</span>
          </h2>
          <p className="section-subtitle">
            Interested in learning more or discussing an implementation? Reach out to us directly through the form below.
          </p>
        </div>

        <div className="contact-content-grid">
          {/* Left Column: Contact Information Cards */}
          <div className="contact-info-panel">
            <div className="contact-panel-intro">
              <h3 className="panel-title">Let’s Discuss Your Membership Goals</h3>
              <p className="panel-desc">
                Whether you’re managing an athletic club, co-working community, or corporate association, our AI platform is designed to scale with your needs.
              </p>
            </div>

            <div className="contact-channels-list">
              <div className="channel-card">
                <div className="channel-icon purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="channel-label">Email Inquiries</div>
                  <div className="channel-value">contact@memberpass.ai</div>
                </div>
              </div>

              <div className="channel-card">
                <div className="channel-icon blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="channel-label">Innovation Hub</div>
                  <div className="channel-value">Tech Park, Cyber City</div>
                </div>
              </div>

              <div className="channel-card">
                <div className="channel-icon cyan">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="channel-label">Response Time</div>
                  <div className="channel-value">Within 24 Hours &bull; Mon - Fri</div>
                </div>
              </div>
            </div>

            {/* AI Assistant Quick Note Card */}
            <div className="ai-note-card">
              <div className="ai-note-icon">🤖</div>
              <div className="ai-note-text">
                <strong>Smart Routing Enabled:</strong> Messages are prioritized and routed automatically to ensure swift inquiry resolution.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-panel">
            <div className="form-card">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtitle">Fill out the form below and we will respond promptly.</p>

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
                    placeholder="e.g. Alex Morgan"
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
                    placeholder="e.g. alex@example.com"
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
                    <option value="general">General Platform Inquiry</option>
                    <option value="demo">Request Platform Demonstration</option>
                    <option value="features">Feature & AI Integration Details</option>
                    <option value="collaboration">Partnership & Collaboration</option>
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
                    placeholder="Tell us about your organization or inquiry..."
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

