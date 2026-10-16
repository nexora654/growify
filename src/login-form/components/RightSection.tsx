import React from 'react';
import { LoginForm } from './LoginForm';

interface RightSectionProps {
  onBack?: () => void;
  onCreateAccount?: () => void;
  onLoginSuccess?: (user: string) => void;
}

export const RightSection: React.FC<RightSectionProps> = ({ onBack, onCreateAccount, onLoginSuccess }) => {
  return (
    <aside className="w-full flex-1 lg:flex-initial lg:w-[38%] xl:w-[35%] bg-[#1F1F22] border-t-0 lg:border-l border-white/[0.08] flex flex-col justify-center items-center relative z-20 py-8 lg:py-0 px-4 sm:px-6">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Vertically Centered Login Form */}
      <LoginForm onBack={onBack} onCreateAccount={onCreateAccount} onLoginSuccess={onLoginSuccess} />
    </aside>
  );
};
