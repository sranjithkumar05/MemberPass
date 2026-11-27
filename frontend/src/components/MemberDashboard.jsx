import { useState, useEffect } from 'react';
import { memberApi } from '../services/api';

const getCurrentCalendarYear = () => new Date().getFullYear();

export default function MemberDashboard({
  _currentUser,
  _onLogout,
  onNavigateToPlans,
  onOpenQRModal,
  onNavigateAI
}) {
  const [profile, setProfile] = useState(null);
  const [passData, setPassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copyToast, setCopyToast] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState('');

  // M3 Task 9: Membership pause states
  const [pauseDays, setPauseDays] = useState('7');
  const [pauseLoading, setPauseLoading] = useState(false);
  const [pauseMessage, setPauseMessage] = useState('');
  const [pauseError, setPauseError] = useState('');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const [profRes, passRes] = await Promise.all([
        memberApi.getProfile(),
        memberApi.getPass()
      ]);

      if (profRes && profRes.success) {
        setProfile(profRes.member);
      } else {
        setError(profRes?.message || 'Failed to load member profile');
      }

      if (passRes && passRes.success) {
        setPassData(passRes);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Communication error loading membership telemetry');
    } finally {
      setLoading(false);
    }
  };

  const loadAttendanceHistory = async () => {
    try {
      setAttendanceLoading(true);
      setAttendanceError('');

      const result = await memberApi.getAttendanceHistory();

      if (result.success) {
        setAttendanceHistory(result.history || []);
      } else {
        setAttendanceError(result.message || 'Unable to load attendance history');
      }
    } catch (err) {
      console.error('Attendance history error:', err);
      setAttendanceError('Unable to connect to server');
    } finally {
      setAttendanceLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadAttendanceHistory();
  }, []);

  // M3 Task 9: Submit membership pause request
  const handlePauseMembership = async (event) => {
    event.preventDefault();

    const days = Number(pauseDays);

    if (!Number.isInteger(days) || days < 1 || days > 15) {
      setPauseError('Please select a pause duration between 1 and 15 days.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to pause your membership for ${days} day(s)? Your membership expiry date will be extended by ${days} day(s).`
    );

    if (!confirmed) return;

    try {
      setPauseLoading(true);
      setPauseError('');
      setPauseMessage('');

      const result = await memberApi.pauseMembership(days);

      if (!result || !result.success) {
        setPauseError(result?.message || 'Unable to pause membership.');
        return;
      }

      setPauseMessage(
        result.message || `Your membership has been paused for ${days} day(s).`
      );

      // Refresh profile and pass to show the updated membership status.
      await loadDashboardData();
    } catch (err) {
      console.error('Membership pause request error:', err);
      setPauseError('Unable to connect to the server. Please try again.');
    } finally {
      setPauseLoading(false);
    }
  };

  const handleCopyPassCode = () => {
    if (profile?.passCode) {
      navigator.clipboard.writeText(profile.passCode);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2500);
    }
  };

  const handleDownloadQR = () => {
    const qrUrl = passData?.pass?.qrCode;
    if (!qrUrl) return;

    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `MemberPass-${(profile?.name || 'card').replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading-state">
        <div className="crest-spinner"></div>
        <p>Retrieving sovereign membership credentials...</p>
      </div>
    );
  }

  const membership = profile?.membership;
  const status = profile?.membershipStatus || 'none';
  const isActive = status === 'active';
  const isPaused = status === 'paused';
  const isEnded = status === 'ended';

  // Check whether the member has already used the pause option this calendar year.
  const pauseHistory = membership?.pauseHistory || [];
  const hasPausedThisYear = pauseHistory.some((entry) => {
    if (!entry.requestedAt) return false;
    return new Date(entry.requestedAt).getFullYear() === getCurrentCalendarYear();
  });

  const canPauseMembership = isActive && !hasPausedThisYear;

  const formatDate = (date) => {
    if (!date) return 'N/A';

    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="member-dashboard-wrap">
      {/* Toast Notification */}
      {copyToast && (
        <div className="dashboard-toast fade-in" role="status">
          <span>✦ Cryptographic Pass Code Copied to Clipboard</span>
        </div>
      )}

      {error && (
        <div className="dashboard-alert error" role="alert">
          <span>{error}</span>
        </div>
      )}

      {/* 1. Welcome Header */}
      <div className="dashboard-banner">
        <div className="banner-left">
          <div className="member-avatar-lg">
            <span>{(profile?.name || 'M').slice(0, 2).toUpperCase()}</span>
          </div>
          <div className="banner-text">
            <div className="banner-eyebrow">
              <span className="crest-sparkle">✦</span>
              <span>AUTHENTICATED YOGA PRACTITIONER</span>
            </div>
            <h1 className="banner-heading">Welcome back, {profile?.name || 'Practitioner'}</h1>
            <div className="banner-meta-row">
              <span className="banner-email">{profile?.email}</span>
              <span className="dot-sep">•</span>
              <span className="member-id-pill">
                ID: {profile?.id ? profile.id.slice(-8).toUpperCase() : 'PENDING'}
              </span>
              <span className="dot-sep">•</span>
              <span className="banner-studio-tag">Thendral Yoga Loft, Coimbatore</span>
            </div>
          </div>
        </div>

        <div className="banner-actions">
          {onNavigateAI && (
            <button
              className="btn-outline btn-sm banner-ai-btn"
              onClick={onNavigateAI}
              title="Open AI Studio Assistant"
            >
              <span style={{ color: 'var(--coral)' }}>✦</span>
              <span>AI Assistant</span>
            </button>
          )}
          <button
            className="btn-outline btn-sm"
            onClick={() => {
              loadDashboardData();
              loadAttendanceHistory();
            }}
            title="Refresh membership and attendance data"
          >
            <span>↻ Refresh</span>
          </button>
          <button className="btn-primary btn-sm" onClick={onNavigateToPlans}>
            <span>Upgrade / Renew</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>

      {/* 2. Membership Status Banner */}
      <div className={`dashboard-status-banner status-${status}`}>
        <div className="status-banner-content">
          <div className="status-pill-group">
            <span className={`status-indicator-badge badge-${status}`}>
              <span className="status-dot"></span>
              {status.toUpperCase()}
            </span>
            <span className="status-tier-tag">
              {membership?.plan?.name || 'Standard Tier'}
            </span>
          </div>

          <div className="status-banner-text">
            {isActive && (
              <p>
                <strong>Sanctuary Privileges Active</strong> — Authorized for immediate yoga studio &amp; class entry through{' '}
                <strong>{formatDate(membership?.endDate)}</strong>.
                {membership?.classesRemaining !== undefined && membership?.classesRemaining !== null
                  ? ` You have ${membership.classesRemaining} studio session(s) remaining.`
                  : ' Unlimited studio classes included.'}
              </p>
            )}
            {isPaused && (
              <p>
                <strong>Membership On Hold</strong> — Studio check-in gate access is temporarily inactive.
                {membership?.pauseEndDate && (
                  <> Scheduled to resume automatically on <strong>{formatDate(membership.pauseEndDate)}</strong>.</>
                )}{' '}
                Your validity date has been extended to <strong>{formatDate(membership?.endDate)}</strong>.
              </p>
            )}
            {isEnded && (
              <p>
                <strong>Membership Concluded</strong> — Your validity ended on <strong>{formatDate(membership?.endDate)}</strong>.
                Please renew your plan to restore digital entry and access to all sanctuary classes.
              </p>
            )}
            {!isActive && !isPaused && !isEnded && (
              <p>
                <strong>No Active Membership Registered</strong> — Choose a wellness package to activate your digital pass and begin booking studio sessions.
              </p>
            )}
          </div>
        </div>

        {(isEnded || status === 'none') && (
          <button className="btn-primary btn-sm status-banner-cta" onClick={onNavigateToPlans}>
            <span>{isEnded ? 'Renew Plan Now' : 'Select a Plan'}</span>
            <span className="btn-arrow">→</span>
          </button>
        )}
      </div>

      {/* 3. Quick Action Buttons */}
      <div className="dashboard-quick-actions" aria-label="Quick Actions">
        <button
          className="quick-action-btn"
          onClick={onOpenQRModal}
          title="Display full-screen QR pass for gate check-in"
        >
          <span className="quick-action-icon">⊡</span>
          <div className="quick-action-meta">
            <span className="quick-action-title">Present QR Pass</span>
            <span className="quick-action-desc">Full-Screen Scanner View</span>
          </div>
        </button>

        <button
          className="quick-action-btn"
          onClick={() => scrollToSection('membership-pause-card')}
          title="Manage or pause your membership"
        >
          <span className="quick-action-icon">◷</span>
          <div className="quick-action-meta">
            <span className="quick-action-title">Manage Membership</span>
            <span className="quick-action-desc">Pause &amp; Expiry Extension</span>
          </div>
        </button>

        <button
          className="quick-action-btn"
          onClick={() => scrollToSection('attendance-history-card')}
          title="View your verified check-in history"
        >
          <span className="quick-action-icon">✓</span>
          <div className="quick-action-meta">
            <span className="quick-action-title">Attendance Log</span>
            <span className="quick-action-desc">Personal Class Records</span>
          </div>
        </button>

        <button
          className="quick-action-btn"
          onClick={() => scrollToSection('payments-history-card')}
          title="View verified transaction ledger"
        >
          <span className="quick-action-icon">💳</span>
          <div className="quick-action-meta">
            <span className="quick-action-title">Payment Ledger</span>
            <span className="quick-action-desc">Invoices &amp; Receipts</span>
          </div>
        </button>

        {onNavigateAI && (
          <button
            className="quick-action-btn quick-action-highlight"
            onClick={onNavigateAI}
            title="Open AI Sanctuary Assistant"
          >
            <span className="quick-action-icon" style={{ color: 'var(--coral)' }}>✦</span>
            <div className="quick-action-meta">
              <span className="quick-action-title">AI Assistant</span>
              <span className="quick-action-desc">Studio Policies &amp; Help</span>
            </div>
          </button>
        )}
      </div>

      {/* 4. Dashboard Statistics (KPI Cards Grid) */}
      <div className="dashboard-metrics-grid">
        {/* KPI 1: Privilege Tier */}
        <div className="metric-box">
          <div className="metric-header-row">
            <span className="metric-kicker">PRIVILEGE TIER</span>
            <span className="metric-icon-badge">✦</span>
          </div>
          <h3 className="metric-value">
            {membership?.plan?.name || 'No Active Plan'}
          </h3>
          <p className="metric-note">
            {membership?.endDate
              ? `Valid through ${formatDate(membership.endDate)}`
              : 'Select a plan to activate privileges'}
          </p>
        </div>

        {/* KPI 2: Sessions Attended */}
        <div className="metric-box">
          <div className="metric-header-row">
            <span className="metric-kicker">TOTAL ATTENDANCE</span>
            <span className="metric-icon-badge">✓</span>
          </div>
          <h3 className="metric-value">
            {membership?.classesUsed || 0}
            <span className="metric-sub"> Attended</span>
          </h3>
          <p className="metric-note">
            Verified check-ins by studio desk
          </p>
        </div>

        {/* KPI 3: Sessions Remaining */}
        <div className="metric-box">
          <div className="metric-header-row">
            <span className="metric-kicker">CLASSES REMAINING</span>
            <span className="metric-icon-badge">◷</span>
          </div>
          <h3 className="metric-value">
            {membership?.plan?.classLimit !== null && membership?.plan?.classLimit !== undefined
              ? `${membership.classesRemaining ?? Math.max(0, membership.plan.classLimit - (membership.classesUsed || 0))}`
              : 'Unlimited'}
            <span className="metric-sub">
              {membership?.plan?.classLimit
                ? ` / ${membership.plan.classLimit} Cap`
                : ' Access'}
            </span>
          </h3>
          <p className="metric-note">
            {membership?.plan?.classLimit
              ? `${membership.classesUsed || 0} of ${membership.plan.classLimit} quota logged`
              : 'All yoga classes & retreats included'}
          </p>
        </div>

        {/* KPI 4: Cryptographic Pass Security */}
        <div className="metric-box">
          <div className="metric-header-row">
            <span className="metric-kicker">PASS KEY SECURITY</span>
            <span className="metric-icon-badge">🔒</span>
          </div>
          <div
            className="pass-code-display"
            onClick={handleCopyPassCode}
            title="Click to copy cryptographic pass key"
          >
            <code>
              {profile?.passCode
                ? `${profile.passCode.slice(0, 10)}••••${profile.passCode.slice(-6)}`
                : 'GENERATING...'}
            </code>
            <span className="copy-icon" aria-label="Copy pass code">⎘</span>
          </div>
          <p className="metric-note">Click token to copy 256-bit SHA256 key</p>
        </div>
      </div>

      {/* 5. Main Split View: Left (Digital Pass & Pause) | Right (Attendance & Transactions) */}
      <div className="dashboard-content-split">
        {/* Left Column: Digital Membership Pass & Pause Card */}
        <div className="pass-preview-column">
          {/* Digital Membership Pass Card */}
          <div className="dashboard-card-wrap" id="digital-pass-card">
            <div className="section-sub-header">
              <h3>Digital Membership Pass</h3>
              <p>Present this card at the studio check-in desk for optical gate scanning.</p>
            </div>

            <div className="card-stage dashboard-card-stage">
              <div
                className={`digital-pass-card ${isPaused ? 'card-paused' : ''} ${isEnded ? 'card-ended' : ''}`}
              >
                <div className="card-watermark" aria-hidden="true"></div>

                {/* Pass Header */}
                <div className="pass-card-top">
                  <div className="pass-crest">
                    <span className="crest-symbol">M</span>
                    <div className="crest-details">
                      <span className="crest-title">MEMBERPASS</span>
                      <span className="crest-sub">YOGA &amp; WELLNESS SANCTUARY</span>
                    </div>
                  </div>

                  <div className="pass-status-pill">
                    <span
                      className={`status-pulse ${isActive ? 'pulse-active' : 'pulse-inactive'}`}
                    ></span>
                    <span>{status.toUpperCase()}</span>
                  </div>
                </div>

                {/* Pass Tier Ribbon */}
                <div className="pass-tier-ribbon">
                  <span className="ribbon-sparkle">✦</span>
                  <span className="ribbon-text">
                    {membership?.plan?.name
                      ? `${membership.plan.name.toUpperCase()} YOGA PASS`
                      : 'YOGA PRACTITIONER'}
                  </span>
                </div>

                {/* Member Profile Info */}
                <div className="pass-member-profile">
                  <div className="pass-avatar">
                    <span>{(profile?.name || 'M').slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div className="member-meta">
                    <h4 className="member-name">{profile?.name}</h4>
                    <p className="member-role">Verified Yoga Loft Member</p>
                    <code className="pass-code">
                      PASS: {profile?.passCode ? `${profile.passCode.slice(0, 12)}...` : 'N/A'}
                    </code>
                  </div>
                </div>

                {/* Ornament Divider */}
                <div className="card-ornament-divider">
                  <div className="divider-line"></div>
                  <span className="divider-diamond">✦</span>
                  <div className="divider-line"></div>
                </div>

                {/* QR Code Container */}
                <div className="pass-qr-container">
                  {isActive && passData?.pass?.qrCode ? (
                    <div className="qr-wrapper">
                      <img
                        src={passData.pass.qrCode}
                        alt="Digital Membership QR Code"
                        className="qr-image"
                      />
                      <div className="qr-scan-badge">
                        <span className="scan-icon">⊡</span>
                        <span>Scan for Instant Studio Check-In</span>
                      </div>
                    </div>
                  ) : (
                    <div className="qr-disabled-placeholder">
                      <span className="qr-disabled-icon">
                        {isPaused ? '◷' : '✕'}
                      </span>
                      <p>
                        {isPaused
                          ? 'Pass Paused • Studio Check-In Disabled'
                          : isEnded
                            ? 'Pass Expired • Please Renew Plan'
                            : 'No Active Membership'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pass Bottom Details */}
                <div className="pass-card-bottom">
                  <div className="bottom-col">
                    <span className="label">EXPIRY DATE</span>
                    <span className="value">
                      {membership?.endDate
                        ? formatDate(membership.endDate)
                        : 'N/A'}
                    </span>
                  </div>

                  <div className="bottom-col text-right">
                    <span className="label">CLASSES USED</span>
                    <span className="value">
                      {membership?.classesUsed ?? 0}{' '}
                      {membership?.plan?.classLimit
                        ? `/ ${membership.plan.classLimit}`
                        : 'Used'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="pass-actions-row">
              <button
                className="btn-primary btn-sm pass-fullscreen-btn"
                onClick={onOpenQRModal}
                title="Open full-screen QR pass for quick phone scanning"
              >
                <span>Full-Screen Scanner View</span>
                <span className="btn-arrow">↗</span>
              </button>

              {isActive && passData?.pass?.qrCode && (
                <button
                  className="btn-outline btn-sm"
                  onClick={handleDownloadQR}
                  title="Download pass as high-resolution PNG image"
                >
                  <span>Download Pass (PNG)</span>
                  <span className="btn-arrow">↓</span>
                </button>
              )}
            </div>
          </div>

          {/* Membership Management / Pause Card */}
          {membership && (
            <div className="dashboard-card membership-pause-card" id="membership-pause-card">
              <div className="section-sub-header">
                <h3>Membership Management</h3>
                <p>
                  Pause your active membership for 1 to 15 days once per calendar year with automatic expiry extension.
                </p>
              </div>

              {pauseMessage && (
                <div className="staff-message" role="status">
                  {pauseMessage}
                </div>
              )}

              {pauseError && (
                <div className="dashboard-alert alert-danger" role="alert">
                  {pauseError}
                </div>
              )}

              {isPaused && (
                <div className="pause-status-card">
                  <div className="pause-status-badge">
                    <span>◷ CURRENTLY PAUSED</span>
                  </div>
                  <p>
                    Your access will automatically resume on{' '}
                    <strong>{formatDate(membership.pauseEndDate)}</strong>.
                  </p>
                  <p>
                    Your membership expiry date has been extended to{' '}
                    <strong>{formatDate(membership.endDate)}</strong>.
                  </p>
                </div>
              )}

              {isActive && hasPausedThisYear && (
                <div className="pause-status-card">
                  <p>
                    <strong>Pause already utilized this year.</strong>
                  </p>
                  <p className="metric-note">
                    Membership pause is permitted once per calendar year ({getCurrentCalendarYear()}). This feature will become available again next calendar year.
                  </p>
                </div>
              )}

              {canPauseMembership && (
                <form onSubmit={handlePauseMembership} className="pause-form">
                  <p className="pause-instructions">
                    Select the number of days you wish to pause. Studio check-ins will be disabled, and your expiry date will be pushed forward by the exact number of paused days.
                  </p>

                  <div className="pause-select-wrap">
                    <label htmlFor="membership-pause-days">
                      Select Pause Duration:
                    </label>
                    <select
                      id="membership-pause-days"
                      value={pauseDays}
                      onChange={(event) => setPauseDays(event.target.value)}
                      disabled={pauseLoading}
                      className="pause-select-input"
                    >
                      {Array.from({ length: 15 }, (_, index) => index + 1).map((day) => (
                        <option key={day} value={day}>
                          {day} {day === 1 ? 'day' : 'days'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary btn-sm"
                    disabled={pauseLoading}
                  >
                    {pauseLoading ? 'Submitting Request...' : 'Confirm & Pause Membership'}
                  </button>
                </form>
              )}

              {!isActive && !isPaused && (
                <p className="metric-note">
                  Membership pause is available only when your pass status is active.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Attendance Activity & Payment Ledger */}
        <div className="dashboard-records-column">
          {/* Recent Attendance Activity */}
          <div className="dashboard-card member-attendance-card" id="attendance-history-card">
            <div className="section-sub-header section-header-split">
              <div>
                <h3>Recent Attendance Activity</h3>
                <p>Personal log of verified studio class check-ins.</p>
              </div>
              <button
                className="btn-outline btn-sm"
                onClick={loadAttendanceHistory}
                disabled={attendanceLoading}
                title="Refresh personal attendance records"
              >
                {attendanceLoading ? 'Refreshing...' : '↻ Refresh Attendance'}
              </button>
            </div>

            {attendanceError && (
              <div className="staff-message" role="alert">{attendanceError}</div>
            )}

            {attendanceLoading && attendanceHistory.length === 0 ? (
              <div className="no-payments-placeholder">
                <p>Loading your verified attendance records...</p>
              </div>
            ) : attendanceHistory.length === 0 ? (
              <div className="no-payments-placeholder">
                <span className="placeholder-icon">✦</span>
                <p>No class attendance records found yet.</p>
                <p className="placeholder-sub">
                  Present your digital QR pass at the front desk when arriving for a yoga session.
                </p>
              </div>
            ) : (
              <div className="payments-table-wrap">
                <table className="payments-table">
                  <thead>
                    <tr>
                      <th>Plan / Class</th>
                      <th>Verified By</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map((record) => (
                      <tr key={record.id || `${record.checkedInAt}-${record.planName}`}>
                        <td>
                          <strong>{record.planName}</strong>
                        </td>
                        <td>{record.staffName || 'Studio Desk'}</td>
                        <td>
                          {new Date(record.checkedInAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td>
                          {new Date(record.checkedInAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td>
                          <span className="payment-status-badge captured">
                            VERIFIED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Privilege Payment Ledger */}
          <div className="dashboard-card payment-history-card" id="payments-history-card">
            <div className="section-sub-header">
              <h3>Privilege Transactions</h3>
              <p>Verified ledger of subscription and membership payments.</p>
            </div>

            {profile?.recentPayments && profile.recentPayments.length > 0 ? (
              <div className="payments-table-wrap">
                <table className="payments-table">
                  <thead>
                    <tr>
                      <th>Plan Tier</th>
                      <th>Order Reference</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.recentPayments.map((p) => (
                      <tr key={p.id || p.orderId}>
                        <td>
                          <strong>{p.planName}</strong>
                        </td>
                        <td>
                          <code className="order-ref">
                            {p.orderId?.slice(-10) || p.id?.slice(-8)}
                          </code>
                        </td>
                        <td>
                          {new Date(p.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="amount-col">
                          ₹{Number(p.amount).toLocaleString('en-IN')}
                        </td>
                        <td>
                          <span className={`payment-status-badge ${p.status}`}>
                            {p.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-payments-placeholder">
                <span className="placeholder-icon">✦</span>
                <p>No prior payment records located on this account.</p>
                <button
                  className="btn-primary btn-sm"
                  onClick={onNavigateToPlans}
                >
                  Select a Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
