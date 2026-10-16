import React from 'react';
import { LeftSection } from './components/LeftSection';
import { RightSection } from './components/RightSection';
import { Footer } from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

interface LoginFormAppProps {
  onBackToHome?: () => void;
  onLoginSuccess?: (user: string) => void;
  onCreateAccount?: () => void;
}

export default function App({ onBackToHome, onLoginSuccess, onCreateAccount }: LoginFormAppProps = {}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#1F1F22] lg:bg-[#070709] text-[#ededed] font-sans antialiased relative selection:bg-rose-500/30 selection:text-white">
        {/* Main Split Screen Area */}
        <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1700px] mx-auto min-h-0">
          {/* Left Section (~65% on desktop): Brand Logo, Headline, Story Collage */}
          <LeftSection />

          {/* Right Section (~35% on desktop): Login Card, Social Login */}
          <RightSection onBack={onBackToHome} onCreateAccount={onCreateAccount} onLoginSuccess={onLoginSuccess} />
        </main>

        {/* Footer Navigation & Legal */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

