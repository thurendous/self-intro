"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-end mb-20">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-brand-primary">
            {t.projects.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.projects.list.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col bg-brand-bg rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200"
            >
              <div className="mb-8 flex justify-between items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <span className="font-black text-xl">{i + 1}</span>
                </div>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-muted hover:text-brand-accent transition-colors"
                    aria-label={t.projects.viewMore}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
              
              <h3 className="text-2xl font-black text-brand-primary mb-4 tracking-tight">
                {project.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-8 flex-grow">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-bold uppercase tracking-widest bg-white border border-brand-border px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
