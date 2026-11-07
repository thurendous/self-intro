"use client";

import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultLanguage, isLanguage, type Language, type Translation, translations } from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
};

const STORAGE_KEY = "language";
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function applyDocumentLanguage(lang: Language) {
  document.documentElement.lang = lang;
  document.title = translations[lang].meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", translations[lang].meta.description);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>(defaultLanguage);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    if (isLanguage(saved) && saved !== defaultLanguage) {
      setLang(saved);
      applyDocumentLanguage(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    applyDocumentLanguage(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
