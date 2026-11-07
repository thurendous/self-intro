"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { skillGroups } from "@/lib/siteData";

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="band" aria-labelledby="skills-title">
      <div className="wrap">
        <h2 id="skills-title">{t.skills.title}</h2>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div key={group.id} className="skill-group">
              <h3>{t.skills.groups[group.id]}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
