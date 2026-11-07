"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="band" aria-labelledby="about-title">
      <div className="wrap split">
        <h2 id="about-title">{t.about.title}</h2>
        <div className="prose">
          {t.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
