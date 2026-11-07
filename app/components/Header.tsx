"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { sectionIds } from "@/lib/siteData";
import { languages } from "@/lib/translations";

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {t.ui.skip}
      </a>
      <div className="header-bar">
        <a className="brand" href="#top">
          Mark Wu
        </a>

        <fieldset className="lang-fieldset">
          <legend className="sr-only">{t.ui.language}</legend>
          <div className="lang-switch">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.ui.menuClose : t.ui.menuOpen}
        </button>

        <nav id="site-nav" className="site-nav" aria-label={t.ui.mainNav} data-open={open}>
          <ul>
            {sectionIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
