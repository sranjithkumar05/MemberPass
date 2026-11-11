import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedbackMsg('Please fill in all required fields.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setFeedbackMsg('Please provide a valid email address.');
      return;
    }
    setStatus('submitting');
    // Simulated async submission
    setTimeout(() => {
      setStatus('success');
      setFeedbackMsg('Thank you! Your message has been received.');
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="contact-split">
      {/* Left side – compact contact info */}
      <div className="contact-info">
        <h2 className="contact-title">Get in Touch</h2>
        <div className="info-card">
          <div className="info-icon">📧</div>
          <div className="info-content">
            <div className="info-label">Email</div>
            <div className="info-value">contact@memberpass.ai</div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon">📍</div>
          <div className="info-content">
            <div className="info-label">Location</div>
            <div className="info-value">Tech Park, Cyber City</div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon">⏰</div>
          <div className="info-content">
            <div className="info-label">Hours</div>
            <div className="info-value">Mon‑Fri 9am‑5pm</div>
          </div>
        </div>
      </div>

      {/* Right side – compact form */}
      <div className="contact-form">
        <h2 className="form-title">Send a Message</h2>
        {status === 'success' && (
          <div className="alert success">
            <span className="alert-icon">✓</span> {feedbackMsg}
          </div>
        )}
        {status === 'error' && (
          <div className="alert error">
            <span className="alert-icon">!</span> {feedbackMsg}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">
              Name <span className="req">*</span>
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
              Email <span className="req">*</span>
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
              Subject
            </label>
            <select
              id="contact-subject"
              name="subject"
              className="form-select"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="general">General Inquiry</option>
              <option value="demo">Request Demo</option>
              <option value="features">Feature Question</option>
              <option value="partnership">Partnership</option>
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
              placeholder="Briefly tell us about your request…"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
