import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  showText = true,
  size = 'md',
  theme = 'light'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`} id="growify-brand-logo">
      {/* Growify Standard Growth Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-xl sm:rounded-2xl p-0.5 bg-gradient-to-tr from-[#ff4500] via-[#ff1d56] to-[#9333ea] shadow-md shadow-orange-500/20 flex items-center justify-center group`}>
        <div className="w-full h-full bg-[#0d1117] rounded-[10px] sm:rounded-[14px] flex items-center justify-center p-1.5 overflow-hidden relative">
          {/* Ambient inner illumination */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 via-pink-500/15 to-purple-600/10 pointer-events-none" />
          
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="growify-grad-primary" x1="4" y1="32" x2="32" y2="4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF5500" />
                <stop offset="0.5" stopColor="#FF1D56" />
                <stop offset="1" stopColor="#FFB300" />
              </linearGradient>
              <linearGradient id="growify-bar-grad" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Stylized 'G' arc wrapping the growth momentum */}
            <path 
              d="M19 7C12.3726 7 7 12.3726 7 19C7 25.6274 12.3726 31 19 31C24.3 31 28.78 27.56 30.3 22.8" 
              stroke="url(#growify-grad-primary)" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
            />

            {/* Exponential Growth Chart Vector forming upward surge */}
            <path 
              d="M12 23L17 17L22 20L29 10" 
              stroke="#ffffff" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Upward Growth Arrow Head */}
            <path 
              d="M23 10H29V16" 
              stroke="#ffffff" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Pinnacle Glow Point */}
            <circle cx="29" cy="10" r="2.2" fill="#FF5500" />
            <circle cx="29" cy="10" r="1.2" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Growify Wordmark */}
      {showText && (
        <div className={`flex items-baseline tracking-tight font-display font-black leading-none ${textSizes[size]}`}>
          <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
            Grow
          </span>
          <span className="bg-gradient-to-r from-[#ff4500] via-[#ff1d56] to-[#e61e50] bg-clip-text text-transparent ml-0.5 font-black">
            ify
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#ff4500] to-[#ff1d56] ml-1 inline-block animate-pulse" />
        </div>
      )}
    </div>
  );
};
