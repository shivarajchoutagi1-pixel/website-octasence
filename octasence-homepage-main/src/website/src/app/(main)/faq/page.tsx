'use client';

import { motion } from 'framer-motion';
import { Outfit } from 'next/font/google';
import React, { useState } from 'react';

import ChatbotWidget from '@/components/ChatbotWidget';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';

// ============================================================
// FONT (PAGE-LEVEL)
// ============================================================

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

// ============================================================
// FAQ DATA
// ============================================================

const faqs = [
  {
    q: 'What is OctaSence?',
    a: 'OctaSence is an AI-powered infrastructure intelligence platform that combines IoT sensors, edge computing, and agentic AI to monitor, predict, and prevent failures in critical infrastructure.',
  },
  {
    q: 'How does OctaSence prevent infrastructure failures?',
    a: 'It analyzes multimodal sensor data using AI to detect early deviations in structural behavior and predict risks before failure occurs.',
  },
  {
    q: 'What industries does OctaSence support?',
    a: 'Mining, tunnels, dams, oil & gas, and industrial IoT environments where safety and reliability are critical.',
  },
  {
    q: 'What makes OctaSence different?',
    a: 'Unlike traditional systems, OctaSence provides predictive intelligence using AI agents and digital twins.',
  },
  {
    q: 'Does OctaSence work in remote environments?',
    a: 'Yes, it uses edge-first architecture with LoRaWAN, mesh, and satellite connectivity.',
  },
  {
    q: 'What is a digital twin?',
    a: 'A digital twin is a real-time visual model of infrastructure that reflects structural health and system behavior using live AI and sensor data.',
  },
  {
    q: 'How are alerts generated?',
    a: 'AI-driven risk scoring triggers alerts via dashboards, SMS, WhatsApp, and email using predefined escalation workflows.',
  },
];

// ============================================================
// FAQ ITEM
// ============================================================

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg text-white/90 font-medium tracking-tight">
          {q}
        </h3>

        <div className="text-white/40 text-xl">{open ? '−' : '+'}</div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-white/60 text-[15px] leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// PAGE
// ============================================================

export default function FAQPage() {
  return (
    <div className={`min-h-screen bg-[#060814] text-white ${outfit.className}`}>
      <WhatsAppButton />
      <ChatbotWidget />

      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Background glow (matches other pages) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Pill (consistent with your site) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[11px] tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Help Center
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 font-medium text-white">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Questions
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about OctaSence, AI-powered
            infrastructure intelligence, and predictive safety systems.
          </p>

          {/* Accent divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500" />
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <main className="px-6 pb-24 max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} />
        ))}
      </main>

      {/* CTA */}
      <section className="pb-24 text-center px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-white/50 mb-6">Still have questions?</p>

          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition"
          >
            Contact our team
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
