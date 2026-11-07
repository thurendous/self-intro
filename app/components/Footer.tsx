"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>{t.footer.copy}</p>
      </div>
    </footer>
  );
}
