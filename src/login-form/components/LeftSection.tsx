import React from 'react';
import { Logo } from './Logo';
import { Collage } from './Collage';
import { useLanguage } from '../context/LanguageContext';

export const LeftSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="hidden lg:flex relative flex-1 flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 min-h-[580px] lg:min-h-screen bg-[#070709] overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-[450px] h-[450px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar: Brand Logo */}
      <div className="relative z-20 flex items-center w-full max-w-2xl mx-auto lg:mx-0">
        <Logo size="md" />
      </div>

      {/* Center Content: Headline & Collage */}
      <div className="relative z-10 my-auto py-8 lg:py-4 flex flex-col items-center text-center">
        {/* Headline */}
        <div className="max-w-2xl px-2 mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-semibold text-white tracking-tight leading-[1.18]">
            {t.headlinePrefix}
            <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent inline-block font-semibold">
              {t.headlineHighlight}
            </span>
          </h1>
        </div>

        {/* Collage Container */}
        <div className="w-full max-w-xl">
          <Collage />
        </div>
      </div>
    </section>
  );
};
