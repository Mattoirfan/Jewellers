import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'gold';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showTagline = false,
}) => {
  const isLight = variant === 'light';
  const isGold = variant === 'gold';

  const textColor = isLight ? '#FAF7F0' : isGold ? '#C5A46D' : '#283447';
  const accentColor = '#C5A46D';
  const emeraldColor = isLight ? '#FAF7F0' : '#245B4A';

  const dimensions = {
    sm: { icon: 28, text: 'text-base', subtext: 'text-[9px]' },
    md: { icon: 38, text: 'text-xl', subtext: 'text-[10px]' },
    lg: { icon: 52, text: 'text-2xl', subtext: 'text-xs' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Geometric Gemstone Monogram SVG */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:rotate-6"
      >
        <defs>
          <linearGradient id="aureliaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D9B8" />
            <stop offset="50%" stopColor="#C5A46D" />
            <stop offset="100%" stopColor="#8F7241" />
          </linearGradient>
          <linearGradient id="aureliaEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E6F5B" />
            <stop offset="100%" stopColor="#1B4538" />
          </linearGradient>
        </defs>

        {/* Outer Fine Diamond Halo */}
        <polygon
          points="50,6 94,50 50,94 6,50"
          stroke="url(#aureliaGoldGrad)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner Facet Lines */}
        <polygon
          points="50,18 82,50 50,82 18,50"
          stroke="#C5A46D"
          strokeWidth="1"
          strokeDasharray="2 1"
          fill={isLight ? 'rgba(255,255,255,0.05)' : 'rgba(36,91,74,0.06)'}
        />
        {/* Central Crown Facets */}
        <path
          d="M50 24 L68 50 L50 76 L32 50 Z"
          fill="url(#aureliaGoldGrad)"
          opacity="0.85"
        />
        {/* Monogram 'A' cut into gemstone */}
        <path
          d="M50 33 L41 62 H46 L48 55 H52 L54 62 H59 L50 33 Z M49 46 L51 51 H48 L49 46 Z"
          fill="#FAF7F0"
        />
        {/* Cardinal Solitaire Accents */}
        <circle cx="50" cy="10" r="2" fill="#C5A46D" />
        <circle cx="90" cy="50" r="2" fill="#C5A46D" />
        <circle cx="50" cy="90" r="2" fill="#C5A46D" />
        <circle cx="10" cy="50" r="2" fill="#C5A46D" />
      </svg>

      <div className="flex flex-col tracking-wider">
        <span
          className={`font-serif font-semibold tracking-[0.2em] uppercase leading-none whitespace-nowrap ${dimensions.text}`}
          style={{ color: textColor }}
        >
          Aurelia
        </span>
        <span
          className={`font-sans tracking-[0.35em] uppercase font-light text-muted-taupe leading-tight mt-1 whitespace-nowrap ${dimensions.subtext}`}
          style={{ color: isLight ? '#E9D9B8' : accentColor }}
        >
          Fine Jewels
        </span>
        {showTagline && (
          <span className="text-[9px] italic font-serif text-taupe mt-0.5 tracking-normal whitespace-nowrap">
            Timeless Elegance. Crafted for Your Story.
          </span>
        )}
      </div>
    </div>
  );
};
