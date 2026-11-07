"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="wrap">
        <h1 id="hero-name" className="hero-name">
          {t.hero.name}
        </h1>
        <p className="hero-role">{t.hero.role}</p>
        <span className="hero-line" aria-hidden="true" />
        <p className="hero-intro">{t.hero.intro}</p>
        <p className="hero-actions">
          <a className="btn btn-solid" href="#products">
            {t.hero.ctaProducts}
          </a>
          <a className="btn btn-outline" href="#contact">
            {t.hero.ctaContact}
          </a>
        </p>
      </div>
    </section>
  );
}
