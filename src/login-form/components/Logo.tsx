import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  return (
    <div className="inline-flex items-center select-none group" title="Instagram">
      <img
        src="/R0fBIMurK8v.png"
        alt="Instagram"
        className={`${iconSizes[size] || iconSizes.md} object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

