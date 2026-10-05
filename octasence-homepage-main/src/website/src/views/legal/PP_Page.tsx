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

const PP_Page = () => {
  const [openSection, setOpenSection] = useState<string | null>('intro');

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
      id: 'intro',
      title: 'Introduction',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            At Octasence, we take your privacy seriously. This Privacy Policy
            describes our policies and procedures on the collection, use, and
            disclosure of your information when you use our services.
          </p>
          <p>
            We use your personal data to provide and improve the Service. By
            using the Service, you agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>
        </div>
      ),
    },
    {
      id: 'collect',
      title: 'Data Collection',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            While using our Service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you. Personally identifiable information may include, but
            is not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Usage Data</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'usage',
      title: 'Usage Data',
      content: (
        <p className="text-justify">
          Usage Data is collected automatically when using the Service. It may
          include information such as Your Device&apos;s Internet Protocol
          address (e.g. IP address), browser type, browser version, the pages of
          our Service that You visit, the time and date of Your visit, the time
          spent on those pages, unique device identifiers and other diagnostic
          data.
        </p>
      ),
    },
    {
      id: 'tracking',
      title: 'Tracking & Cookies',
      content: (
        <p className="text-justify">
          We use Cookies and similar tracking technologies to track the activity
          on Our Service and store certain information. Tracking technologies
          used are beacons, tags, and scripts to collect and track information
          and to improve and analyze Our Service.
        </p>
      ),
    },
    {
      id: 'security',
      title: 'Data Security',
      content: (
        <p className="text-justify">
          The security of Your Personal Data is important to Us, but remember
          that no method of transmission over the Internet, or method of
          electronic storage is 100% secure. While We strive to use commercially
          acceptable means to protect Your Personal Data, We cannot guarantee
          its absolute security.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: (
        <div className="space-y-6">
          <p>
            If you have any questions about this Privacy Policy, you can contact
            us through our official support channels.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Contact Support
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
        <div className="absolute top-[20%] left-[-5%] w-[60%] h-[60%] bg-blue-600/5 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="octa-heading text-4xl md:text-6xl mb-2 leading-tight tracking-tighter">
            Privacy <span className="octa-accent-text">Policy</span>
          </h1>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">
            Protecting your digital sovereignty and data integrity.
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

export default PP_Page;
