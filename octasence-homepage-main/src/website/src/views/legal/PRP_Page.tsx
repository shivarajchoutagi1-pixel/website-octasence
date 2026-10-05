'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AccordionItem = ({
  id,
  title,
  content,
  index,
  isOpen,
  toggleOpen,
}: any) => {
  return (
    <motion.div
      className="border-b border-white/10 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={() => toggleOpen(id)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-6">
          <span className="text-blue-500 font-bold text-sm bg-blue-500/10 w-10 h-10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-white/30 group-hover:text-blue-500 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2 pl-16 text-white/60 text-lg leading-relaxed font-light">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PRP_Page = () => {
  const [openSection, setOpenSection] = useState<string | null>(
    'refund-policy',
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, []);

  const toggleOpen = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: 'refund-policy',
      title: 'Refund Policy',
      content: (
        <p className="text-justify">
          At Octasence, we are dedicated to providing high-fidelity
          infrastructure intelligence and data analytics services. We maintain a
          high standard of service reliability; however, we recognize that
          billing disputes may occasionally arise. Please review our financial
          protocols below.
        </p>
      ),
    },
    {
      id: 'non-refundable',
      title: 'Subscription Terms',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            Payments for Octasence API clusters and enterprise subscriptions are
            generally non-refundable. Once a subscription period commences, the
            allocated computational resources and data bandwidth are considered
            utilized.
          </p>
          <p>
            If you believe there is a discrepancy in your billing cycle, you
            must initiate a formal inquiry with Octasence Support within 30 days
            of the invoice date. Our audit team will investigate the telemetry
            and logs to ensure the charge reflects your actual usage.
          </p>
        </div>
      ),
    },
    {
      id: 'pricing-changes',
      title: 'Pricing & Rate Adjustments',
      content: (
        <p className="text-justify">
          Octasence reserves the right to adjust its pricing models and API rate
          tiers to reflect infrastructure scalability and operational costs.
          Active subscribers will be notified via our primary communication
          channels at least 30 days prior to any significant rate modifications.
        </p>
      ),
    },
    {
      id: 'customer-satisfaction',
      title: 'Customer Satisfaction',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            We strive to ensure our partners are satisfied with our intelligence
            insights. If your experience with Octasence does not meet your
            operational expectations, we encourage proactive communication to
            resolve technical impediments.
          </p>
          <p>
            Provide our team with a detailed account of the performance gaps
            encountered. Our engineering and support units will work diligently
            to optimize your implementation and ensure service continuity.
          </p>
        </div>
      ),
    },
    {
      id: 'modifications',
      title: 'Policy Modifications',
      content: (
        <p className="text-justify">
          Octasence reserves the right to modify this Payment and Refund Policy
          to align with evolving international financial standards. Continued
          utilization of our data services following these updates constitutes
          an acknowledgement of adjusted terms.
        </p>
      ),
    },
    {
      id: 'contact-info',
      title: 'Billing Inquiry',
      content: (
        <div className="space-y-6">
          <p>
            For any financial inquiries, billing disputes, or enterprise account
            management, please reach out to our administration team.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Contact Billing Support
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen octa-shell pb-20 pt-8 selection:bg-blue-500/30 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-15%] w-[45%] h-[45%] bg-blue-500/5 blur-[100px] rounded-full animate-pulse" />
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 mb-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="octa-heading text-4xl md:text-6xl mb-2 leading-tight tracking-tighter">
            Payment <span className="octa-accent-text">& Refund</span>
          </h1>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">
            Governing your financial interactions and service commitments with
            Octasence.
          </p>
        </motion.div>
      </div>

      {/* Accordion Layout */}
      <motion.main className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="space-y-2">
          {sections.map((section, idx) => (
            <AccordionItem
              key={section.id}
              {...section}
              index={idx}
              isOpen={openSection === section.id}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      </motion.main>
    </div>
  );
};

export default PRP_Page;
