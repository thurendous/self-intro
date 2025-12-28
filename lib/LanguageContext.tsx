"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language } from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.zh;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "zh" || saved === "en" || saved === "ja")) {
      setLang(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLang(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = translations[language];

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
