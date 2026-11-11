export default function Logo({ size = 'default', showText = true }) {
  const isSmall = size === 'small'

  return (
    <div className={`brand-logo-group ${isSmall ? 'logo-sm' : ''}`}>
      <div className="logo-badge-wrapper">
        <svg
          className="logo-icon-svg"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mpLogoBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="mpLogoPass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e9d5ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="mpLogoStem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>

          {/* Digital Pass Shield Silhouette */}
          <path
            d="M14 18C14 13.5817 17.5817 10 22 10H42C46.4183 10 50 13.5817 50 18V46C50 50.4183 46.4183 54 42 54H22C17.5817 54 14 50.4183 14 46V18Z"
            fill="#0b1028"
            stroke="url(#mpLogoBorder)"
            strokeWidth="2.5"
          />

          {/* Stylized 'M' Pass Lines */}
          <path
            d="M23 44V27.5L32 34.5L41 27.5V44"
            stroke="url(#mpLogoPass)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central AI Node Stem */}
          <path
            d="M32 35.5V44"
            stroke="url(#mpLogoStem)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Intelligent AI Glow Spark */}
          <circle cx="32" cy="20" r="3" fill="#c084fc" />
          <circle cx="32" cy="20" r="6" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {showText && (
        <span className="brand-title-text">
          <span className="text-white">Member</span>
          <span className="text-gradient-purple">Pass</span>
        </span>
      )}
    </div>
  )
}

