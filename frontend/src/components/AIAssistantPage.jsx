import { useState, useEffect, useRef } from 'react';
import { aiApi } from '../services/api';
import './AIAssistantPage.css';

export default function AIAssistantPage({
  currentUser,
  onNavigateHome,
  onNavigateDashboard,
  onOpenAuthModal
}) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // 5 Specific Suggested Topics as required
  const suggestedPrompts = [
    {
      id: 'status',
      title: 'Check my membership status',
      desc: 'View your active plan and pass status.',
      icon: 'fa-id-card-clip'
    },
    {
      id: 'classes',
      title: 'How many classes have I attended?',
      desc: 'Check completed sessions and remaining balance.',
      icon: 'fa-calendar-check'
    },
    {
      id: 'expiry',
      title: 'When does my membership expire?',
      desc: 'Find your expiration date and remaining days.',
      icon: 'fa-hourglass-half'
    },
    {
      id: 'plans',
      title: 'Explain the membership plans',
      desc: 'Compare Basic, Standard and Premium plans.',
      icon: 'fa-layer-group'
    },
    {
      id: 'pause',
      title: 'How can I pause my membership?',
      desc: 'Learn about membership pause options.',
      icon: 'fa-circle-pause'
    }
  ];

  // Auto scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessageId = 'user-' + Date.now();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMessage = {
      id: userMessageId,
      sender: 'user',
      text: query,
      time: currentTime
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await aiApi.chat(query);

      const aiMessageId = 'ai-' + Date.now();
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (response && response.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMessageId,
            sender: 'assistant',
            text: response.answer || 'I have processed your inquiry.',
            time: replyTime,
            requiresAuth: response.requiresAuth || false
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMessageId,
            sender: 'assistant',
            text: response?.message || 'Unable to retrieve answer. Please try again or verify network connectivity.',
            time: replyTime,
            isError: true
          }
        ]);
      }
    } catch (err) {
      console.error('MemberPass AI chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-err-' + Date.now(),
          sender: 'assistant',
          text: 'Unable to connect to MemberPass AI. Please check whether the backend service is running.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputQuery('');
  };

  const handleCopyMessage = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to render markdown-like formatting (bold text, bullet lines, paragraphs)
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const parsedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={lineIdx} className="chat-bullet-line">
            <span className="bullet-dot">•</span>
            <span>{parsedParts}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="chat-paragraph">
          {parsedParts.length > 0 ? parsedParts : '\u00A0'}
        </p>
      );
    });
  };

  return (
    <div className="ai-page-wrapper">
      <div className="ai-page-container">
        {/* =========================================================================
            1. ASSISTANT HEADER
            ========================================================================= */}
        <header className="ai-page-hero-header">
          <div className="ai-badge-pill">
            <span className="ai-badge-sparkle">✦</span>
            <span>MemberPass AI</span>
          </div>
          <h1 className="ai-hero-title">Your Personal Wellness Assistant</h1>
          <p className="ai-hero-subtitle">
            Your guide to memberships, classes and your wellness journey.
          </p>
        </header>

        {/* =========================================================================
            2. GUEST MODE / AUTHENTICATED USER CONTEXT STRIP
            ========================================================================= */}
        {!currentUser ? (
          <div className="ai-context-banner guest" role="note" aria-label="Guest Mode Notice">
            <div className="context-banner-left">
              <div className="context-icon-circle">
                <i className="fa-solid fa-circle-info" />
              </div>
              <div className="context-text-wrap">
                <div className="context-label-row">
                  <span className="context-chip">Guest Mode Active</span>
                </div>
                <p className="context-desc">
                  General wellness knowledge active. Sign in to your MemberPass account to inspect your personal pass status, remaining classes, and renewal schedule.
                </p>
              </div>
            </div>
            <div className="context-actions-right">
              <button
                type="button"
                className="context-cta-btn"
                onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
              >
                <i className="fa-solid fa-arrow-right-to-bracket" />
                <span>Sign In to MemberPass</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="ai-context-banner authenticated" role="status" aria-label="Member Authentication Status">
            <div className="context-banner-left">
              <div className="context-icon-circle">
                <i className="fa-solid fa-circle-check" />
              </div>
              <div className="context-text-wrap">
                <div className="context-label-row">
                  <span className="context-chip">Verified Sanctuary Member</span>
                </div>
                <p className="context-desc">
                  Connected as <strong>{currentUser.name}</strong> • Real-time pass status and attendance records are active for queries.
                </p>
              </div>
            </div>
            <div className="context-actions-right">
              {messages.length > 0 && (
                <button
                  type="button"
                  className="context-subtle-btn"
                  onClick={handleClearChat}
                  title="Clear conversation and start fresh"
                >
                  <i className="fa-solid fa-rotate-right" />
                  <span>New Chat</span>
                </button>
              )}
              <button
                type="button"
                className="context-cta-btn"
                onClick={onNavigateDashboard}
                title="Return to your Member Dashboard"
              >
                <i className="fa-solid fa-gauge-high" />
                <span>My Dashboard</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. PREMIUM CHAT INTERFACE CARD
            ========================================================================= */}
        <div className="ai-chat-card">
          {/* Card Topbar */}
          <div className="chat-card-topbar">
            <div className="topbar-assistant-identity">
              <div className="identity-avatar">
                <span>M</span>
                <span className="avatar-sparkle-dot">✦</span>
              </div>
              <div className="identity-details">
                <div className="identity-name">
                  <span>MemberPass Wellness Guide</span>
                  <span className="identity-pill">AI</span>
                </div>
                <div className="identity-status">
                  <span className="pulse-indicator" />
                  <span>Online • Ready to assist</span>
                </div>
              </div>
            </div>

            <div className="topbar-actions">
              {messages.length > 0 && (
                <button
                  type="button"
                  className="topbar-action-btn"
                  onClick={handleClearChat}
                  title="Start a fresh conversation"
                >
                  <i className="fa-solid fa-arrows-rotate" />
                  <span>Reset Conversation</span>
                </button>
              )}
              <button
                type="button"
                className="topbar-action-btn"
                onClick={onNavigateHome}
                title="Return to Sanctuary Home"
              >
                <i className="fa-solid fa-house" />
                <span>Sanctuary Home</span>
              </button>
            </div>
          </div>

          {/* Card Body: Welcome State or Conversation Thread */}
          <div className="chat-card-body">
            {messages.length === 0 ? (
              /* -------------------------------------------------------------------
                 WELCOME SCREEN WITH 5 SUGGESTED TOPIC CARDS
                 ------------------------------------------------------------------- */
              <div className="welcome-chat-layout">
                <div className="welcome-intro-block">
                  <div className="welcome-lotus-wrap">
                    <i className="fa-solid fa-spa" />
                  </div>
                  <h2 className="welcome-title">How can I assist your wellness practice today?</h2>
                  <p className="welcome-subtitle">
                    Ask me about your live membership status, attended classes, digital QR pass, or studio policies. Select a topic below to get started instantly:
                  </p>
                </div>

                {/* 5 Suggested Question Cards in 2-Column Responsive Grid */}
                <div className="suggestions-section">
                  <div className="suggestions-label-strip">
                    <span className="suggestions-heading">
                      <i className="fa-solid fa-wand-magic-sparkles" />
                      Suggested Topics
                    </span>
                    <span className="suggestions-tip">Click any card to ask instantly</span>
                  </div>

                  <div className="welcome-prompts-grid">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt.id}
                        type="button"
                        className="suggested-prompt-card"
                        onClick={() => handleSendMessage(prompt.title)}
                        disabled={isLoading}
                        title={`Ask: "${prompt.title}"`}
                      >
                        <div className="prompt-icon-bubble">
                          <i className={`fa-solid ${prompt.icon}`} />
                        </div>
                        <div className="prompt-text-group">
                          <span className="prompt-title">{prompt.title}</span>
                          <span className="prompt-desc">{prompt.desc}</span>
                        </div>
                        <div className="prompt-arrow-cue">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* -------------------------------------------------------------------
                 ACTIVE CONVERSATION THREAD
                 ------------------------------------------------------------------- */
              <div className="chat-thread-container">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-message-row ${msg.sender === 'user' ? 'row-user' : 'row-assistant'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="msg-avatar assistant" title="MemberPass Assistant">
                        <span>✦</span>
                      </div>
                    )}

                    <div className="chat-bubble-wrap">
                      <div className="bubble-meta-header">
                        <span className="bubble-author-name">
                          {msg.sender === 'user' ? (currentUser?.name || 'You') : 'MemberPass Wellness Guide'}
                        </span>
                        <span className="bubble-timestamp">{msg.time}</span>
                      </div>

                      <div className={`chat-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-assistant'} ${msg.isError ? 'bubble-error' : ''}`}>
                        <div className="bubble-body-content">
                          {renderFormattedText(msg.text)}
                        </div>

                        {msg.requiresAuth && !currentUser && (
                          <div className="bubble-auth-block">
                            <button
                              type="button"
                              className="bubble-auth-cta"
                              onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
                            >
                              <i className="fa-solid fa-arrow-right-to-bracket" />
                              <span>Sign In to Access Member Details</span>
                            </button>
                          </div>
                        )}

                        {msg.sender === 'assistant' && !msg.isError && (
                          <div className="bubble-footer-actions">
                            <button
                              type="button"
                              className={`copy-text-btn ${copiedId === msg.id ? 'copied' : ''}`}
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              title="Copy response to clipboard"
                            >
                              <i className={`fa-solid ${copiedId === msg.id ? 'fa-check' : 'fa-copy'}`} />
                              <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="msg-avatar user" title={currentUser?.name || 'You'}>
                        <span>{currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'ME'}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading / Typing Indicator */}
                {isLoading && (
                  <div className="chat-message-row row-assistant">
                    <div className="msg-avatar assistant">
                      <span>✦</span>
                    </div>
                    <div className="chat-bubble-wrap">
                      <div className="bubble-typing-wrap">
                        <div className="typing-dots">
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                        </div>
                        <span className="typing-status-text">Consulting MemberPass sanctuary records...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* =======================================================================
              4. CHAT COMPOSER DOCK
              ======================================================================= */}
          <footer className="chat-composer-dock">
            {messages.length > 0 && (
              <div className="followup-chips-row">
                <span className="chips-lead-label">Quick topics:</span>
                {suggestedPrompts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="followup-chip-btn"
                    onClick={() => handleSendMessage(p.title)}
                    disabled={isLoading}
                  >
                    <i className={`fa-solid ${p.icon}`} />
                    <span>{p.title}</span>
                  </button>
                ))}
              </div>
            )}

            <form
              className="composer-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <div className="composer-input-box">
                <textarea
                  ref={textareaRef}
                  className="composer-textarea"
                  rows={1}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isLoading
                      ? 'MemberPass AI is thinking...'
                      : 'Ask MemberPass anything about your membership...'
                  }
                  disabled={isLoading}
                  aria-label="Ask MemberPass anything about your membership"
                />
                <button
                  type="submit"
                  className={`composer-send-btn ${inputQuery.trim() && !isLoading ? 'active' : ''}`}
                  disabled={!inputQuery.trim() || isLoading}
                  aria-label="Send message"
                  title="Send message"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin" />
                  ) : (
                    <i className="fa-solid fa-paper-plane" />
                  )}
                </button>
              </div>

              <div className="composer-dock-notes">
                <span className="keyboard-shortcut-hint">
                  Press <kbd>Enter ↵</kbd> to send • <kbd>Shift + Enter</kbd> for new line
                </span>
                <span className="privacy-badge">
                  <i className="fa-solid fa-shield-halved" /> Confidential MemberPass Intelligence
                </span>
              </div>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}
