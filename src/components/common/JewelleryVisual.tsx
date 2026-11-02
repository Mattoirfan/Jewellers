import React from 'react';

interface JewelleryVisualProps {
  type: 'necklace-gold' | 'ring-diamond' | 'earrings-gold' | 'bangle-emerald' | 'bridal-polki' | 'pendant-ruby' | 'ring-gemstone' | 'silver-bracelet' | 'mens-chain' | 'pearl-necklace' | 'hero-campaign' | 'atelier-craft';
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:4';
  className?: string;
  alt?: string;
}

export const JewelleryVisual: React.FC<JewelleryVisualProps> = ({
  type,
  aspectRatio = '4:3',
  className = '',
  alt = 'Aurelia Fine Jewels Masterpiece',
}) => {
  const aspectClass = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '3:4': 'aspect-[3/4]',
  }[aspectRatio];

  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center select-none bg-gradient-to-br from-[#FAF7F0] via-[#FFFFFF] to-[#F3EFE6] border border-[#E7E2D9]/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] ${aspectClass} ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Subtle Luxury Travertine / Marble Ambient Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#245B4A_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Ambient Lighting Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#C5A46D]/5 to-[#245B4A]/5 pointer-events-none" />

      {/* Dynamic Jewellery Artwork Vectors */}
      {type === 'necklace-gold' && (
        <svg viewBox="0 0 300 300" className="w-[82%] h-[82%] drop-shadow-[0_12px_20px_rgba(197,164,109,0.25)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="goldLuster" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E8C7" />
              <stop offset="35%" stopColor="#D9B777" />
              <stop offset="70%" stopColor="#BA9248" />
              <stop offset="100%" stopColor="#876426" />
            </linearGradient>
            <linearGradient id="rubyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E23E57" />
              <stop offset="100%" stopColor="#880e4f" />
            </linearGradient>
          </defs>
          {/* Main Choker Arc */}
          <path d="M50,80 Q150,190 250,80" fill="none" stroke="url(#goldLuster)" strokeWidth="8" strokeLinecap="round" />
          <path d="M60,95 Q150,210 240,95" fill="none" stroke="url(#goldLuster)" strokeWidth="4" strokeLinecap="round" />
          {/* Filigree Petals */}
          {[...Array(13)].map((_, i) => {
            const angle = (i - 6) * 11;
            const rad = (angle * Math.PI) / 180;
            const cx = 150 + Math.sin(rad) * 125;
            const cy = 60 + Math.cos(rad) * 125;
            return (
              <g key={i} transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
                <ellipse rx="7" ry="16" fill="url(#goldLuster)" />
                <circle cy="18" r="4" fill="url(#rubyGlow)" />
                <circle cy="26" r="2.5" fill="url(#goldLuster)" />
              </g>
            );
          })}
          {/* Centerpiece Royal Medallion */}
          <circle cx="150" cy="185" r="18" fill="url(#goldLuster)" />
          <polygon points="150,172 162,185 150,198 138,185" fill="url(#rubyGlow)" />
          <circle cx="150" cy="185" r="4" fill="#FFFFFF" opacity="0.8" />
          {/* Hanging Gold Beads */}
          <line x1="150" y1="203" x2="150" y2="235" stroke="url(#goldLuster)" strokeWidth="2.5" />
          <circle cx="150" cy="238" r="6" fill="url(#goldLuster)" />
          <circle cx="150" cy="248" r="3" fill="url(#goldLuster)" />
        </svg>
      )}

      {type === 'ring-diamond' && (
        <svg viewBox="0 0 300 300" className="w-[80%] h-[80%] drop-shadow-[0_16px_28px_rgba(40,52,71,0.2)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="platinumShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E2E8F0" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="diamondSpark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#BAE6FD" />
              <stop offset="75%" stopColor="#FDF4FF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          {/* Platinum Ring Band */}
          <ellipse cx="150" cy="190" rx="80" ry="42" fill="none" stroke="url(#platinumShine)" strokeWidth="14" />
          {/* Micro-pavé Diamonds along shoulders */}
          {[-45, -30, -15, 15, 30, 45].map((offset, idx) => (
            <circle key={idx} cx={150 + offset} cy={155 + Math.abs(offset) * 0.4} r="2.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
          ))}
          {/* Cathedral Basket Mount */}
          <path d="M125,160 L138,100 L162,100 L175,160" fill="none" stroke="url(#platinumShine)" strokeWidth="5" />
          {/* Prongs */}
          <line x1="124" y1="108" x2="132" y2="78" stroke="url(#platinumShine)" strokeWidth="4" strokeLinecap="round" />
          <line x1="176" y1="108" x2="168" y2="78" stroke="url(#platinumShine)" strokeWidth="4" strokeLinecap="round" />
          <line x1="150" y1="112" x2="150" y2="74" stroke="url(#platinumShine)" strokeWidth="3" strokeLinecap="round" />
          {/* Solitaire Brilliant Cut Diamond */}
          <polygon points="110,80 190,80 170,118 130,118" fill="url(#diamondSpark)" stroke="#7DD3FC" strokeWidth="1" />
          <polygon points="120,62 180,62 190,80 110,80" fill="url(#diamondSpark)" stroke="#BAE6FD" strokeWidth="1" />
          <polygon points="135,52 165,52 180,62 120,62" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="0.8" />
          <polygon points="130,118 170,118 150,135" fill="url(#diamondSpark)" stroke="#0284C7" strokeWidth="0.8" />
          {/* Star Fire Optical Glint */}
          <path d="M150,40 L153,52 L165,55 L153,58 L150,70 L147,58 L135,55 L147,52 Z" fill="#FFFFFF" opacity="0.9" />
        </svg>
      )}

      {type === 'bridal-polki' && (
        <svg viewBox="0 0 300 300" className="w-[85%] h-[85%] drop-shadow-[0_16px_28px_rgba(36,91,74,0.3)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="jadauGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEEAA3" />
              <stop offset="50%" stopColor="#D4A745" />
              <stop offset="100%" stopColor="#966D1B" />
            </linearGradient>
            <linearGradient id="colombianEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="45%" stopColor="#059669" />
              <stop offset="85%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>
            <linearGradient id="polkiLuster" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#F5E6B8" />
            </linearGradient>
          </defs>
          {/* Kundan Choker Band */}
          <path d="M40,70 Q150,170 260,70" fill="none" stroke="url(#jadauGold)" strokeWidth="18" strokeLinecap="round" />
          {/* Polki Diamond Insets in Kundan foil */}
          {[...Array(11)].map((_, i) => {
            const t = (i + 1) / 12;
            const x = 40 + (260 - 40) * t;
            const y = 70 + Math.sin(t * Math.PI) * 58;
            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <polygon points="-7,-7 7,-6 8,8 -6,7" fill="url(#polkiLuster)" stroke="#B45309" strokeWidth="1" />
                <circle r="1.5" fill="#FFFFFF" />
              </g>
            );
          })}
          {/* Lower Emerald Drops with Seed Pearls */}
          {[...Array(9)].map((_, i) => {
            const t = (i + 1) / 10;
            const x = 55 + (245 - 55) * t;
            const y = 82 + Math.sin(t * Math.PI) * 64;
            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                {/* Seed pearls cluster */}
                <circle cx="-3" cy="8" r="2.5" fill="#FFFBEB" stroke="#D97706" strokeWidth="0.5" />
                <circle cx="3" cy="8" r="2.5" fill="#FFFBEB" stroke="#D97706" strokeWidth="0.5" />
                <circle cx="0" cy="12" r="3" fill="#FFFBEB" stroke="#D97706" strokeWidth="0.5" />
                {/* Fluted Zambian Emerald Drop */}
                <path d="M0,15 C-8,22 -8,38 0,44 C8,38 8,22 0,15 Z" fill="url(#colombianEmerald)" stroke="#064E3B" strokeWidth="0.8" />
                <ellipse cx="-2" cy="28" rx="1.5" ry="5" fill="#6EE7B7" opacity="0.6" />
                {/* Gold bead terminal */}
                <circle cx="0" cy="46" r="2.5" fill="url(#jadauGold)" />
              </g>
            );
          })}
        </svg>
      )}

      {type === 'earrings-gold' && (
        <svg viewBox="0 0 300 300" className="w-[80%] h-[80%] drop-shadow-[0_14px_24px_rgba(197,164,109,0.3)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="goldEarring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="40%" stopColor="#E5BE6B" />
              <stop offset="100%" stopColor="#9C7728" />
            </linearGradient>
            <linearGradient id="rubyCab" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
          </defs>
          {/* Pair of Noor Jhumkas */}
          {[-55, 55].map((xOffset, pairIdx) => (
            <g key={pairIdx} transform={`translate(${150 + xOffset}, 50)`}>
              {/* Stud Flower */}
              <circle cx="0" cy="20" r="14" fill="url(#goldEarring)" />
              <circle cx="0" cy="20" r="7" fill="url(#rubyCab)" />
              {/* Connecting Loop */}
              <line x1="0" y1="34" x2="0" y2="52" stroke="url(#goldEarring)" strokeWidth="3" />
              {/* Peacock motif */}
              <ellipse cx="0" cy="45" rx="10" ry="6" fill="url(#goldEarring)" />
              {/* Jhumka Bell Dome */}
              <path d="M-28,95 C-28,60 28,60 28,95 Z" fill="url(#goldEarring)" stroke="#854D0E" strokeWidth="1" />
              {/* Dome Lattice Chasing */}
              <path d="M-20,82 Q0,66 20,82" fill="none" stroke="#FEF08A" strokeWidth="1.5" />
              <path d="M-24,90 Q0,76 24,90" fill="none" stroke="#FEF08A" strokeWidth="1.5" />
              {/* Hanging Ghungroo Fringe */}
              {[-22, -14, -7, 0, 7, 14, 22].map((gx, gi) => (
                <g key={gi} transform={`translate(${gx}, 96)`}>
                  <line y1="0" y2="10" stroke="url(#goldEarring)" strokeWidth="1.5" />
                  <circle cy="12" r="3" fill="url(#goldEarring)" />
                </g>
              ))}
            </g>
          ))}
        </svg>
      )}

      {type === 'bangle-emerald' && (
        <svg viewBox="0 0 300 300" className="w-[82%] h-[82%] drop-shadow-[0_16px_28px_rgba(36,91,74,0.25)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="kadaGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3C4" />
              <stop offset="35%" stopColor="#E2B755" />
              <stop offset="70%" stopColor="#B3862A" />
              <stop offset="100%" stopColor="#785311" />
            </linearGradient>
            <linearGradient id="emeraldSquare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>
          </defs>
          {/* Antique Solid Kada Oval */}
          <ellipse cx="150" cy="150" rx="98" ry="68" fill="none" stroke="url(#kadaGold)" strokeWidth="22" />
          <ellipse cx="150" cy="150" rx="98" ry="68" fill="none" stroke="#713F12" strokeWidth="1" strokeDasharray="3 3" />
          {/* Bezel-set Zambian Emeralds along outer ridge */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const bx = 150 + Math.cos(rad) * 98;
            const by = 150 + Math.sin(rad) * 68;
            return (
              <g key={i} transform={`translate(${bx}, ${by}) rotate(${deg})`}>
                <rect x="-6" y="-6" width="12" height="12" fill="url(#emeraldSquare)" stroke="#D97706" strokeWidth="1.5" />
                <rect x="-4" y="-4" width="8" height="8" fill="none" stroke="#A7F3D0" strokeWidth="0.5" />
              </g>
            );
          })}
          {/* Ornate Elephant Head / Makara Clasp Screw */}
          <circle cx="248" cy="150" r="12" fill="url(#kadaGold)" stroke="#785311" strokeWidth="2" />
          <circle cx="248" cy="150" r="4" fill="#059669" />
        </svg>
      )}

      {type === 'pendant-ruby' && (
        <svg viewBox="0 0 300 300" className="w-[80%] h-[80%] drop-shadow-[0_14px_24px_rgba(184,120,120,0.3)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="vividRuby" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="40%" stopColor="#E11D48" />
              <stop offset="85%" stopColor="#881337" />
              <stop offset="100%" stopColor="#4C0519" />
            </linearGradient>
          </defs>
          {/* Fine Rose Gold Chain */}
          <path d="M70,40 Q150,130 230,40" fill="none" stroke="url(#roseGold)" strokeWidth="3" strokeDasharray="4 2" />
          {/* Pendant Bail */}
          <polygon points="144,115 156,115 153,135 147,135" fill="url(#roseGold)" />
          {/* Outer Halo with 28 Diamonds */}
          <ellipse cx="150" cy="175" rx="42" ry="52" fill="url(#roseGold)" />
          {[...Array(24)].map((_, i) => {
            const rad = (i * 2 * Math.PI) / 24;
            const hx = 150 + Math.cos(rad) * 36;
            const hy = 175 + Math.sin(rad) * 46;
            return <circle key={i} cx={hx} cy={hy} r="3" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="0.5" />;
          })}
          {/* Central Oval Mozambique Ruby */}
          <ellipse cx="150" cy="175" rx="26" ry="34" fill="url(#vividRuby)" stroke="#FB7185" strokeWidth="1" />
          {/* Facet Refraction lines */}
          <polygon points="150,148 168,175 150,202 132,175" fill="none" stroke="#FDA4AF" strokeWidth="1" opacity="0.8" />
          <ellipse cx="145" cy="165" rx="5" ry="12" fill="#FFFFFF" opacity="0.4" />
        </svg>
      )}

      {type === 'ring-gemstone' && (
        <svg viewBox="0 0 300 300" className="w-[80%] h-[80%] drop-shadow-[0_16px_28px_rgba(40,52,71,0.3)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="ceylonBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="80%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="platinumShine2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="195" rx="82" ry="40" fill="none" stroke="url(#platinumShine2)" strokeWidth="14" />
          {/* Tapered Baguette Diamonds flanking sides */}
          <polygon points="105,145 125,142 122,165 102,160" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <polygon points="175,142 195,145 198,160 178,165" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          {/* Cushion Emerald Cut Royal Sapphire */}
          <rect x="120" y="110" width="60" height="70" rx="8" fill="url(#ceylonBlue)" stroke="#60A5FA" strokeWidth="1.5" />
          {/* Step Cut facets */}
          <rect x="128" y="118" width="44" height="54" rx="5" fill="none" stroke="#BFDBFE" strokeWidth="1" opacity="0.8" />
          <polygon points="120,110 128,118 172,118 180,110" fill="#3B82F6" opacity="0.5" />
          <polygon points="120,180 128,172 172,172 180,180" fill="#1D4ED8" opacity="0.7" />
          <circle cx="138" cy="130" r="3" fill="#FFFFFF" opacity="0.85" />
        </svg>
      )}

      {type === 'silver-bracelet' && (
        <svg viewBox="0 0 300 300" className="w-[82%] h-[82%] drop-shadow-[0_12px_22px_rgba(130,121,110,0.25)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="silverGleam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          {/* Articulated Tennis Bracelet Ellipse */}
          <ellipse cx="150" cy="150" rx="90" ry="58" fill="none" stroke="url(#silverGleam)" strokeWidth="6" />
          {[...Array(26)].map((_, i) => {
            const rad = (i * 2 * Math.PI) / 26;
            const tx = 150 + Math.cos(rad) * 90;
            const ty = 150 + Math.sin(rad) * 58;
            return (
              <g key={i} transform={`translate(${tx}, ${ty})`}>
                <rect x="-5" y="-5" width="10" height="10" rx="2" fill="url(#silverGleam)" stroke="#475569" strokeWidth="0.5" />
                <circle r="3.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
                <circle r="1" fill="#38BDF8" opacity="0.8" />
              </g>
            );
          })}
          {/* Box Clasp with Dual Safety Latches */}
          <rect x="236" y="142" width="12" height="16" rx="2" fill="url(#silverGleam)" stroke="#334155" strokeWidth="1" />
        </svg>
      )}

      {type === 'mens-chain' && (
        <svg viewBox="0 0 300 300" className="w-[84%] h-[84%] drop-shadow-[0_16px_28px_rgba(197,164,109,0.3)] transition-transform duration-500 hover:scale-105">
          <defs>
            <linearGradient id="cubanGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>
          {/* Heavy Cuban Curb Links */}
          <path d="M50,70 C50,220 250,220 250,70" fill="none" stroke="url(#cubanGold)" strokeWidth="16" strokeLinecap="round" />
          {[...Array(17)].map((_, i) => {
            const t = (i + 1) / 18;
            const rad = Math.PI * t;
            const lx = 150 - Math.cos(rad) * 100;
            const ly = 70 + Math.sin(rad) * 105;
            return (
              <ellipse
                key={i}
                cx={lx}
                cy={ly}
                rx="14"
                ry="8"
                transform={`rotate(${(t - 0.5) * 80}, ${lx}, ${ly})`}
                fill="none"
                stroke="#FEF3C7"
                strokeWidth="3.5"
              />
            );
          })}
          {/* Heavy Box Clasp */}
          <rect x="42" y="60" width="18" height="24" rx="3" fill="url(#cubanGold)" stroke="#78350F" strokeWidth="1.5" />
        </svg>
      )}

      {type === 'pearl-necklace' && (
        <svg viewBox="0 0 300 300" className="w-[82%] h-[82%] drop-shadow-[0_12px_22px_rgba(241,226,220,0.5)] transition-transform duration-500 hover:scale-105">
          <defs>
            <radialGradient id="akoyaPearl" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#FFF1F2" />
              <stop offset="80%" stopColor="#FDE2E4" />
              <stop offset="100%" stopColor="#E2C9CC" />
            </radialGradient>
          </defs>
          {/* Outer Strand */}
          {[...Array(24)].map((_, i) => {
            const rad = ((i + 1) / 26) * Math.PI;
            const px = 150 - Math.cos(rad) * 115;
            const py = 75 + Math.sin(rad) * 110;
            const size = 6.5 + Math.sin(rad) * 2;
            return <circle key={`out-${i}`} cx={px} cy={py} r={size} fill="url(#akoyaPearl)" stroke="#FBCFE8" strokeWidth="0.5" />;
          })}
          {/* Inner Strand */}
          {[...Array(20)].map((_, i) => {
            const rad = ((i + 1) / 22) * Math.PI;
            const px = 150 - Math.cos(rad) * 90;
            const py = 75 + Math.sin(rad) * 85;
            const size = 5.5 + Math.sin(rad) * 1.5;
            return <circle key={`in-${i}`} cx={px} cy={py} r={size} fill="url(#akoyaPearl)" stroke="#FBCFE8" strokeWidth="0.5" />;
          })}
          {/* Diamond Floral Centerpiece Clasp */}
          <circle cx="150" cy="180" r="12" fill="#E2E8F0" stroke="#C5A46D" strokeWidth="1.5" />
          <circle cx="150" cy="180" r="5" fill="#38BDF8" />
        </svg>
      )}

      {/* Campaign / Atelier Backdrops */}
      {type === 'hero-campaign' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-r from-[#245B4A]/90 via-[#283447]/85 to-[#1C3E33]/90 text-[#FAF7F0]">
          <div className="w-16 h-16 mb-4 rounded-full border border-[#C5A46D]/60 flex items-center justify-center">
            <span className="font-serif text-2xl text-[#C5A46D]">A</span>
          </div>
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#C5A46D] mb-2">High Jewellery 2026</span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-balance max-w-xl">
            Where Heritage Reaches Sublime Modernity
          </h2>
        </div>
      )}

      {type === 'atelier-craft' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#283447] to-[#1C2534] text-[#FAF7F0] text-center">
          <div className="border border-[#C5A46D]/40 p-6 max-w-md">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] block mb-2">The Aurelia Atelier</span>
            <p className="font-serif text-xl italic font-light">"Every millimeter of gold is annealed, chased, and hallmarked with generational reverence."</p>
          </div>
        </div>
      )}

      {/* Subtle corner hallmark symbol */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[8px] tracking-widest font-mono text-[#82796E] uppercase">AURELIA · BIS 916</span>
      </div>
    </div>
  );
};
