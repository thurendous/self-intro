"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EthereumLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 784.37 1277.39"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
    role="img"
    aria-label="Ethereum Logo"
  >
    <title>Ethereum Logo</title>
    <path d="m392.07 0-3.57 12.16v846.18l3.57 3.55 392.06-231.75z" fill="#343434" fillOpacity=".8" />
    <path d="m392.07 0-392.07 629.98 392.07 231.91v-861.89z" fill="#3c3c3b" fillOpacity=".7" />
    <path d="m392.07 896.33-2.15 2.63v371.13l2.15 7.3 392.3-552.03z" fill="#343434" fillOpacity=".8" />
    <path d="m392.07 1277.39v-381.06l-392.07-170.97z" fill="#3c3c3b" fillOpacity=".7" />
    <path d="m392.07 849.73 392.06-231.75-392.06-178.5z" fill="#141414" fillOpacity=".5" />
    <path d="m0 617.98 392.07 231.75v-410.25z" fill="#393939" fillOpacity=".4" />
  </svg>
);

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4"
            >
              {t.hero.greeting}
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                className="text-5xl sm:text-7xl font-black tracking-tighter text-brand-primary leading-none"
              >
                {t.hero.name}
              </motion.h1>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8"
            >
              {t.hero.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-brand-muted mb-10 max-w-xl leading-relaxed"
            >
              {t.hero.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-8"
            >
              <div className="text-sm font-bold text-brand-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {t.hero.location}
              </div>
              <a
                href="#contact"
                className="group flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-accent transition-all hover:scale-105 shadow-xl shadow-blue-500/10"
              >
                {t.hero.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="w-80 h-80 bg-white shadow-2xl rounded-3xl flex items-center justify-center p-12 border border-brand-border animate-float">
              <EthereumLogo className="w-40 h-40 text-brand-accent" />
              {/* Floating decor */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-accent/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-accent/5 to-transparent"></div>
    </section>
  );
}
