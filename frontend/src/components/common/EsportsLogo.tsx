import React from 'react';

interface EsportsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  animated?: boolean;
}

export const EsportsLogo: React.FC<EsportsLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = true,
  animated = false,
}) => {
  // Dimensions based on size
  const iconDimensions = {
    sm: { width: 32, height: 32, emblem: 32 },
    md: { width: 42, height: 42, emblem: 42 },
    lg: { width: 56, height: 56, emblem: 56 },
    xl: { width: 72, height: 72, emblem: 72 },
  }[size];

  const fontSizeTitle = {
    sm: '1.15rem',
    md: '1.45rem',
    lg: '1.85rem',
    xl: '2.3rem',
  }[size];

  const fontSizeSub = {
    sm: '0.62rem',
    md: '0.68rem',
    lg: '0.78rem',
    xl: '0.88rem',
  }[size];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size === 'sm' ? 10 : 12, userSelect: 'none' }}>
      {/* Precision Vector Emblem */}
      <div
        style={{
          width: iconDimensions.width,
          height: iconDimensions.height,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width={iconDimensions.width}
          height={iconDimensions.height}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 14px rgba(0, 242, 254, 0.45)) drop-shadow(0 0 24px rgba(124, 58, 237, 0.35))',
            transition: 'transform 0.25s ease',
          }}
          shapeRendering="geometricPrecision"
        >
          <defs>
            {/* Cyberpunk Linear Gradients */}
            <linearGradient id="shieldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="85%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <linearGradient id="shieldFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#071529" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#0a0f24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#170d33" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="pulseBoltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            <linearGradient id="coreEnergyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>

            {/* Ambient Glow Filter */}
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagonal Outer Cyber Shield */}
          <path
            d="M32 3 L58 15 L58 39 L32 61 L6 39 L6 15 Z"
            fill="url(#shieldFillGrad)"
            stroke="url(#shieldBorderGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Accent Inset Contour */}
          <path
            d="M32 9 L51 19 L51 37 L32 54 L13 37 L13 19 Z"
            fill="none"
            stroke="rgba(0, 242, 254, 0.25)"
            strokeWidth="1"
            strokeDasharray="4 2"
          />

          {/* High-Energy Electric PULSE Wave + Lightning Apex */}
          <path
            d="M14 33 L23 33 L27 21 L33 46 L39 27 L43 35 L50 35"
            fill="none"
            stroke="url(#pulseBoltGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />

          {/* Stylized Monogram Chevron / Apex Crown */}
          <path
            d="M26 15 L32 9 L38 15"
            fill="none"
            stroke="url(#coreEnergyGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Pulse Beating Beacon (Luminous Dot) */}
          <circle cx="33" cy="46" r="2.8" fill="#ffffff" filter="url(#logoGlow)">
            {animated && (
              <animate
                attributeName="r"
                values="2;3.5;2"
                dur="1.8s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="27" cy="21" r="2.2" fill="#00f2fe" />
          <circle cx="39" cy="27" r="2.2" fill="#ec4899" />
        </svg>
      </div>

      {/* Typography Brand Wordmark */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: fontSizeTitle,
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'baseline',
              gap: 2,
            }}
          >
            <span
              style={{
                background: 'linear-gradient(180deg, #ffffff 20%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7))',
              }}
            >
              ESPORTS
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #00f2fe 0%, #38bdf8 50%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.6))',
              }}
            >
              PULSE
            </span>
            <span
              style={{
                display: 'inline-block',
                width: size === 'sm' ? 4 : 5,
                height: size === 'sm' ? 4 : 5,
                borderRadius: '50%',
                backgroundColor: '#00f2fe',
                boxShadow: '0 0 8px #00f2fe',
                marginLeft: 2,
                transform: 'translateY(-2px)',
              }}
            />
          </div>

          {showSubtitle && (
            <div
              style={{
                fontSize: fontSizeSub,
                color: 'var(--text-secondary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginTop: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>AI ANALYTICS</span>
              <span style={{ color: 'var(--accent-cyan)' }}>•</span>
              <span>REAL-TIME ODDS</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
