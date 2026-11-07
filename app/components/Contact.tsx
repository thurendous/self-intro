"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { contactLinks } from "@/lib/siteData";
import ExternalLink from "./ExternalLink";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title">{t.contact.title}</h2>
        <p className="section-intro">{t.contact.desc}</p>
        <ul className="contact-links">
          {contactLinks.map((link) => (
            <li key={link.id}>
              <ExternalLink className="btn btn-contact" href={link.url}>
                {t.contact.links[link.id]}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
