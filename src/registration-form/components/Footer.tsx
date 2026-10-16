import { ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { ModalType } from '../types';
import { useRegLanguage } from '../context/LanguageContext';

const FOOTER_LINKS = [
  'Meta',
  'About',
  'Blog',
  'Jobs',
  'Help',
  'API',
  'Privacy',
  'Terms',
  'Locations',
  'Popular',
  'Instagram Lite',
  'Meta AI',
  'Muse',
  'Threads',
  'Contact Uploading & Non-Users',
  'Meta Verified',
];

const LANGUAGES = [
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

export function Footer({ onOpenModal }: { onOpenModal: (type: ModalType) => void }) {
  const { currentLanguage, setLanguage, t } = useRegLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: 'Meta', modal: 'learn-more' as ModalType },
    { label: t.about || 'About', modal: 'learn-more' as ModalType },
    { label: t.blog || 'Blog', modal: 'learn-more' as ModalType },
    { label: t.jobs || 'Jobs', modal: 'learn-more' as ModalType },
    { label: t.help || 'Help', modal: 'learn-more' as ModalType },
    { label: 'API', modal: 'learn-more' as ModalType },
    { label: t.privacy || 'Privacy', modal: 'privacy' as ModalType },
    { label: t.terms || 'Terms', modal: 'terms' as ModalType },
    { label: t.locations || 'Locations', modal: 'learn-more' as ModalType },
    { label: 'Popular', modal: 'learn-more' as ModalType },
    { label: t.instagramLite || 'Instagram Lite', modal: 'learn-more' as ModalType },
    { label: 'Meta AI', modal: 'learn-more' as ModalType },
    { label: 'Muse', modal: 'learn-more' as ModalType },
    { label: t.threads || 'Threads', modal: 'learn-more' as ModalType },
    { label: t.contactUploading || 'Contact Uploading & Non-Users', modal: 'contact-info' as ModalType },
    { label: t.metaVerified || 'Meta Verified', modal: 'learn-more' as ModalType },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    if (showLangMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      // Auto-scroll to selected language if visible
      setTimeout(() => {
        selectedItemRef.current?.scrollIntoView({ block: 'nearest' });
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLangMenu]);

  return (
    <footer className="w-full mt-8 sm:mt-12 mb-6 sm:mb-10 text-center px-2 sm:px-4 max-w-[1700px] mx-auto select-none" id="demo-footer">
      {/* Navigation Links row in a single line on desktop/tablet */}
      <nav
        aria-label="Footer Navigation"
        className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 lg:gap-x-5 gap-y-1.5 sm:gap-y-2 mb-3 text-neutral-400"
      >
        {navLinks.map((link, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onOpenModal(link.modal)}
            className="text-[12px] sm:text-[13px] whitespace-nowrap text-neutral-400 hover:text-neutral-200 hover:underline transition-colors duration-150 focus:outline-none focus:text-white cursor-pointer touch-manipulation py-0.5 px-0.5"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Language & Copyright row */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-[12px] text-neutral-400 mt-1">
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer py-1"
            id="lang-selector-btn"
            aria-expanded={showLangMenu}
          >
            <span>{currentLanguage}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400 stroke-[2]" />
          </button>

          {showLangMenu && (
            <div
              role="listbox"
              aria-label="Select language"
              className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-[160px] sm:w-[170px] max-h-[320px] overflow-y-scroll bg-white border border-[#404040] shadow-2xl z-50 py-0.5 custom-lang-scrollbar"
            >
              {LANGUAGES.map((lang) => {
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
                      setShowLangMenu(false);
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

        <div className="flex items-center gap-1.5 text-neutral-400 py-1">
          <span>© 2026 Instagram from Meta</span>
        </div>
      </div>
    </footer>
  );
}
