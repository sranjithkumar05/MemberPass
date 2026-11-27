import { useState } from 'react';
import { authApi, setAuthToken, setStoredUser } from '../services/api';

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await authApi.login(formData.email, formData.password);
        if (!res.success) {
          setError(res.message || 'Login failed. Please verify your credentials.');
          setLoading(false);
          return;
        }

        setAuthToken(res.token);
        setStoredUser(res.user);
        setSuccessMsg('Welcome back to MemberPass!');
        setTimeout(() => {
          onSuccess(res.user);
          onClose();
        }, 600);
      } else {
        const res = await authApi.signup(
          formData.name,
          formData.email,
          formData.password,
          formData.phone
        );
        if (!res.success) {
          setError(res.message || 'Registration failed. Please check the provided information.');
          setLoading(false);
          return;
        }

        setAuthToken(res.token);
        setStoredUser(res.user);
        setSuccessMsg('Privilege account established successfully!');
        setTimeout(() => {
          onSuccess(res.user);
          onClose();
        }, 600);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('A connection error occurred. Please verify backend service is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (email) => {
    setMode('login');
    setFormData({
      name: '',
      email,
      password: 'MemberPass@123',
      phone: ''
    });
    setError('');
  };

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div
        className="modal-container auth-modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        {/* Modal Header & Branding */}
        <div className="auth-header">
          <div className="auth-brand-badge">
            <span className="coastal-emblem-mini">
              <svg viewBox="0 0 40 40" fill="none" className="emblem-svg-sm">
                <circle cx="20" cy="20" r="19" fill="#F6F9F8" stroke="#B8D6DF" strokeWidth="1.5" />
                <circle cx="20" cy="13" r="4.5" fill="#D98D70" />
                <path d="M20 16C18.5 20 16.5 24 16.5 27C16.5 29 18 30.5 20 30.5C22 30.5 23.5 29 23.5 27C23.5 24 21.5 20 20 16Z" fill="#386D83" />
                <path d="M16 21C12.5 22 9.5 25 10 28C11 30 13.5 30.5 15.5 29C17 28 17.5 24 16 21Z" fill="#386D83" opacity="0.8" />
                <path d="M24 21C27.5 22 30.5 25 30 28C29 30 26.5 30.5 24.5 29C23 28 22.5 24 24 21Z" fill="#386D83" opacity="0.8" />
                <path d="M12 32C15 33.5 25 33.5 28 32" stroke="#D98D70" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="auth-brand-name">Member<span>Pass</span></span>
          </div>

          <h2 className="auth-title">
            {mode === 'login' ? 'Practitioner Access' : 'Join Our Sanctuary'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Sign in to access your digital pass, class attendance, and wellness membership.'
              : 'Create your account to unlock seamless class check-ins and membership passes.'}
          </p>

          <div className="auth-tab-switch" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setError('');
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setMode('signup');
                setError('');
              }}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="auth-alert auth-alert-error" role="alert">
            <span className="alert-icon">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert auth-alert-success" role="status">
            <span className="alert-icon">✦</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="auth-name">
                Full Name <span className="req">*</span>
              </label>
              <input
                id="auth-name"
                name="name"
                type="text"
                required
                placeholder="e.g. Lady Vivienne Montgomery"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">
              Official Email <span className="req">*</span>
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              required
              placeholder="e.g. arun1@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">
              Password <span className="req">*</span>
            </label>
            <input
              id="auth-password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="auth-phone">Phone Contact (Optional)</label>
              <input
                id="auth-phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 00001"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-spinner"></span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Authenticate Entry' : 'Complete Registration'}</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {/* Instant Testing Profiles Section */}
        <div className="auth-demo-section">
          <div className="auth-demo-header">
            <span className="auth-demo-title">Instant Testing Profiles</span>
            <span className="auth-demo-tag">1-Click Login</span>
          </div>

          <div className="demo-profiles-grid">
            <button
              type="button"
              className="demo-profile-chip"
              onClick={() => handleDemoFill('arun1@example.com')}
              title="Active Basic member with 8 classes used"
            >
              <span className="demo-chip-role">Active Member</span>
              <span className="demo-chip-name">Arun • 8 Classes</span>
            </button>
            <button
              type="button"
              className="demo-profile-chip"
              onClick={() => handleDemoFill('naveen.member@test.com')}
              title="Active Member (Naveen Kumar)"
            >
              <span className="demo-chip-role">Active Member</span>
              <span className="demo-chip-name">Naveen Kumar</span>
            </button>
            <button
              type="button"
              className="demo-profile-chip"
              onClick={() => handleDemoFill('janani20@example.com')}
              title="Paused Basic member"
            >
              <span className="demo-chip-role">Paused Member</span>
              <span className="demo-chip-name">Janani • On Hold</span>
            </button>
            <button
              type="button"
              className="demo-profile-chip"
              onClick={() => handleDemoFill('karthik3@example.com')}
              title="Active Premium VIP member"
            >
              <span className="demo-chip-role">VIP Member</span>
              <span className="demo-chip-name">Karthik • Unlimited</span>
            </button>
            <button
              type="button"
              className="demo-profile-chip demo-staff-chip"
              onClick={() => handleDemoFill('m2.staff@example.com')}
              title="Official Staff Portal Account"
            >
              <span className="demo-chip-role">Staff Portal</span>
              <span className="demo-chip-name">m2.staff • Scanner</span>
            </button>
          </div>

          <div className="demo-hint-bar">
            <span className="demo-hint-icon">🔒</span>
            <span className="demo-hint-text">
              Universal Demo Password: <code>MemberPass@123</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
