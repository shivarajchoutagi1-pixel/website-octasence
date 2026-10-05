'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
}

interface SectorPageProps {
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string }[];
  caseStudies: CaseStudy[];
}

export default function SectorPage({
  title,
  subtitle,
  description,
  stats,
  caseStudies,
}: SectorPageProps) {
  return (
    <div className="min-h-screen bg-[#0c1018] text-white font-[Outfit]">
      {/* HERO */}
      <section className="pt-32 pb-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-blue-400 uppercase tracking-widest text-sm mb-4">
            {subtitle}
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>

          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {description}
          </p>

          <Link
            href="/#sectors"
            className="inline-block mt-8 px-6 py-3 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-white/40 transition"
          >
            ← Back
          </Link>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white/[0.05] border border-white/10 p-6 rounded-xl text-center"
            >
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-white/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-semibold mb-10">Case Studies</h2>

        <div className="space-y-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-white/[0.05] border border-white/10 p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-2">
                {cs.id} — {cs.title}
              </h3>

              <p className="text-white/60 mb-4">{cs.description}</p>

              <ul className="list-disc pl-5 text-white/70 space-y-1">
                {cs.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
