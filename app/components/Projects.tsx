"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-brand-primary mb-6">
            {t.projects.title}
          </h2>
          <div className="h-1.5 w-20 bg-brand-accent rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.projects.list.map((project, _index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: _index * 0.1 }}
              className="group bg-brand-surface border border-brand-border rounded-3xl p-8 hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-brand-bg rounded-full hover:bg-brand-accent hover:text-white transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      role="img"
                      aria-label="Link Icon"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                </div>
                <p className="text-brand-muted mb-8 leading-relaxed">{project.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, _) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-brand-bg text-brand-muted text-xs font-bold rounded-full uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.a
            href={t.links.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-full font-bold hover:bg-brand-muted transition-all"
          >
            <span>{t.projects.viewMore}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              role="img"
              aria-label="View More"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
