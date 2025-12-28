"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      title: t.skills.categories.blockchain,
      skills: ["Solidity", "EVM", "Foundry", "Hardhat", "OpenZeppelin", "Smart Contract Audit"],
    },
    {
      title: t.skills.categories.frontend,
      skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Ethers.js"],
    },
    {
      title: t.skills.categories.backend,
      skills: ["Node.js", "Go", "PostgreSQL", "Supabase", "Docker", "Restfull API"],
    },
    {
      title: t.skills.categories.tools,
      skills: ["Git", "CI/CD", "AWS", "Web3.js", "Security Research", "Vercel"],
    },
  ];

  return (
    <section id="skills" className="py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-brand-primary mb-20 text-center">
          {t.skills.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-accent">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, _) => (
                  <span key={skill} className="tech-pill">
                    {skill}
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
