"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-brand-muted text-xs">{t.footer.copy}</div>
        <div className="flex space-x-8">
          <a
            href={t.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-white transition-colors text-xs"
          >
            Twitter
          </a>
          <a
            href={t.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-white transition-colors text-xs"
          >
            LinkedIn
          </a>
          <a
            href={t.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-white transition-colors text-xs"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
