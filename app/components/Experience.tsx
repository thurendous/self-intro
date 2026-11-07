"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { experience } from "@/lib/siteData";
import ExternalLink from "./ExternalLink";

export default function Experience() {
  const { t } = useLanguage();
  return (
    <section id="experience" className="band" aria-labelledby="experience-title">
      <div className="wrap">
        <h2 id="experience-title">{t.experience.title}</h2>
        <p className="section-intro">{t.experience.intro}</p>
        <ul className="rows">
          {experience.map((item) => {
            const copy = t.experience.items[item.id];
            return (
              <li key={item.id} className="row">
                <h3>{copy.title}</h3>
                <div>
                  <p>{copy.desc}</p>
                  <p className="tags">{item.tags.join(", ")}</p>
                  {"link" in item && (
                    <ExternalLink className="text-link" href={item.link}>
                      {t.experience.view} {copy.title}
                    </ExternalLink>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
