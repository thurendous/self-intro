"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 border-t border-brand-border bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-7xl font-black tracking-tighter mb-8 leading-tight text-brand-primary"
          dangerouslySetInnerHTML={{ __html: t.contact.title }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-muted text-xl mb-12 font-medium"
        >
          {t.contact.desc}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <a
            href={`mailto:${t.links.email}`}
            className="group flex items-center gap-4 text-2xl sm:text-5xl font-black transition-all hover:text-brand-accent text-brand-primary"
          >
            {t.links.email}
            <span className="w-12 h-12 sm:w-20 sm:h-20 border-2 border-brand-primary rounded-full flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:rotate-12">
              <ArrowUpRight size={40} className="sm:scale-125" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
