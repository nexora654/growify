import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RegTranslationStrings,
  baseEnglish,
  getRegistrationTranslation,
  RTL_LANGUAGES,
} from '../i18n/translations';

interface RegLanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: RegTranslationStrings;
  isRTL: boolean;
}

const RegLanguageContext = createContext<RegLanguageContextType>({
  currentLanguage: 'English',
  setLanguage: () => {},
  t: baseEnglish,
  isRTL: false,
});

export const RegLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('instagram_pref_lang');
      if (saved) {
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

  const t = getRegistrationTranslation(currentLanguage);

  return (
    <RegLanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </RegLanguageContext.Provider>
  );
};

export const useRegLanguage = (): RegLanguageContextType => {
  return useContext(RegLanguageContext);
};
