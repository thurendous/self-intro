"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-brand-primary">{t.about.title}</h2>
            <p className="text-xl text-brand-muted leading-relaxed">{t.about.content}</p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-border">
              {t.about.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl sm:text-5xl font-black text-brand-primary tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="h-48 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-muted/20 font-black text-4xl">
                Web2
              </div>
              <div className="h-64 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent font-black text-4xl">
                Web3
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="h-64 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-black text-4xl rotate-3">
                東京
              </div>
              <div className="h-48 bg-brand-bg rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
