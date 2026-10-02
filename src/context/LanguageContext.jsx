// src/context/LanguageContext.jsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { translations } from '@/lib/translations';

const DEFAULT_LANG = 'hi';

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: translations[DEFAULT_LANG],
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);
  const [mounted, setMounted] = useState(false);

  /* Load saved language on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ckm-lang');
      if (saved === 'hi' || saved === 'en') {
        setLangState(saved);
      }
    } catch {}
    setMounted(true);
  }, []);

  /* Update lang */
  const setLang = useCallback((nextLang) => {
    if (nextLang !== 'hi' && nextLang !== 'en') return;
    setLangState(nextLang);
    try {
      localStorage.setItem('ckm-lang', nextLang);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLang;
    }
  }, []);

  /* Before hydration, always serve Hindi to avoid mismatch.
     After hydration, use the real lang. */
  const effectiveLang = mounted ? lang : DEFAULT_LANG;

  /* t is DERIVED from effectiveLang, so they're always in sync */
  const t = useMemo(
    () => translations[effectiveLang] || translations[DEFAULT_LANG],
    [effectiveLang]
  );

  /* Memoize the context value so consumers re-render only when lang changes */
  const value = useMemo(
    () => ({ lang: effectiveLang, setLang, t }),
    [effectiveLang, setLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}