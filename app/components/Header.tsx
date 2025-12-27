"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Menu, X, Globe, Link } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        isScrolled ? "bg-white/80 backdrop-blur-md border-brand-border py-4" : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter text-brand-primary">{t.nav.brand}</div>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-brand-bg border border-brand-border rounded-full p-1">
            <Globe size={14} className="ml-2 mr-1 text-brand-muted" />
            {(["en", "ja", "zh"] as const).map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded-full transition-all duration-300",
                  language === lang
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-brand-muted hover:text-brand-primary"
                )}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="md:hidden text-brand-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white border-b border-brand-border px-6 py-8 space-y-6 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {navLinks.map((link, _) => (
          <a
            key={link.href}
            href={link.href}
            className="block text-2xl font-bold tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
