import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: 'Meta', href: '#meta' },
    { label: t.about, href: '#about' },
    { label: t.blog, href: '#blog' },
    { label: t.jobs, href: '#jobs' },
    { label: t.help, href: '#help' },
    { label: 'API', href: '#api' },
    { label: t.privacy, href: '#privacy' },
    { label: t.terms, href: '#terms' },
    { label: t.locations, href: '#locations' },
    { label: t.popular, href: '#popular' },
    { label: t.instagramLite, href: '#instagram-lite' },
    { label: t.metaAi, href: '#meta-ai' },
    { label: 'Muse', href: '#muse' },
    { label: t.threads, href: '#threads' },
    { label: t.contactUploading, href: '#contact-uploading' },
    { label: t.metaVerified, href: '#meta-verified' },
  ];

  const languages = [
    'Afrikaans',
    'العربية',
    'Čeština',
    'Dansk',
    'Deutsch',
    'Ελληνικά',
    'English',
    'English (UK)',
    'Español (España)',
    'Español',
    'فارسی',
    'Suomi',
    'Français',
    'עברית',
    'Bahasa Indonesia',
    'Italiano',
    '日本語',
    '한국어',
    'Bahasa Melayu',
    'Norsk',
    'Nederlands',
    'Polski',
    'Português (Brasil)',
    'Português (Portugal)',
    'Русский',
    'Svenska',
    'ภาษาไทย',
    'Filipino',
    'Türkçe',
    '中文(简体)',
    '中文(台灣)',
    'বাংলা',
    'हिन्दी',
    'Tiếng Việt',
    'Magyar',
    'Română',
    'Українська',
    'اردو',
    'தமிழ்',
    'తెలుగు',
    'ಕನ್ನಡ',
    'മലയാളം',
    'मराठी',
    'ગુજરાતી',
    'ਪੰਜਾਬੀ',
    'Hrvatski',
    'Slovenčina',
    'Lietuvių',
    'Bosanski',
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Auto-scroll to selected language if visible
      setTimeout(() => {
        selectedItemRef.current?.scrollIntoView({ block: 'nearest' });
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full bg-[#1F1F22] border-t border-white/[0.06] py-5 px-4 sm:px-8 text-neutral-400 text-xs relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
        {/* Navigation links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-neutral-400"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-neutral-200 transition-colors duration-150 text-[12px] sm:text-[13px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Secondary Row: Language Selector & Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-[12px] text-neutral-400 mt-1">
          {/* Language dropdown */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer py-1"
              aria-expanded={isLangOpen}
            >
              <span>{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {/* Language menu popping up exactly as in screenshot */}
            {isLangOpen && (
              <div
                role="listbox"
                aria-label="Select language"
                className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-[160px] sm:w-[170px] max-h-[320px] overflow-y-scroll bg-white border border-[#404040] shadow-2xl z-50 py-0.5 custom-lang-scrollbar"
              >
                {languages.map((lang) => {
                  const isSelected = currentLanguage === lang;
                  return (
                    <button
                      key={lang}
                      ref={isSelected ? selectedItemRef : undefined}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1 text-[12px] leading-tight font-normal transition-none cursor-pointer block select-none truncate ${
                        isSelected
                          ? 'bg-[#a5cdff] text-black'
                          : 'bg-white text-black hover:bg-[#a5cdff] hover:text-black'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span>© 2026 Instagram from Meta</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
