import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationStrings, getTranslation, RTL_LANGUAGES } from '../i18n/translations';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: TranslationStrings;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'English',
  setLanguage: () => {},
  t: translations['English'],
  isRTL: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('instagram_pref_lang');
      if (saved && (saved in translations)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'English';
  });

  const isRTL = RTL_LANGUAGES.includes(currentLanguage);

  const setLanguage = (lang: string) => {
    setCurrentLanguageState(lang);
    try {
      localStorage.setItem('instagram_pref_lang', lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isRTL) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [isRTL]);

  const t = getTranslation(currentLanguage);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext);
};
