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

const TOSPage = () => {
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
            Welcome to Octasence. These terms and conditions outline the rules
            and regulations for the use of Octasence&apos;s Website and Platform
            services.
          </p>
          <p>
            By accessing this platform, we assume you accept these terms and
            conditions. Do not continue to use Octasence if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>
          <p>
            The following terminology applies to these Terms and Conditions:
            &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to
            you, the person log on this website and compliant to the
            Company&apos;s terms and conditions. &quot;The Company&quot;,
            &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and
            &quot;Us&quot;, refers to our Company.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies',
      content: (
        <p className="text-justify">
          We employ the use of cookies. By accessing Octasence, you agreed to
          use cookies in agreement with the Octasence&apos;s Privacy Policy.
          Most interactive websites use cookies to let us retrieve the
          user&apos;s details for each visit. Cookies are used by our website to
          enable the functionality of certain areas to make it easier for people
          visiting our website.
        </p>
      ),
    },
    {
      id: 'license',
      title: 'License',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            Unless otherwise stated, Octasence and/or its licensors own the
            intellectual property rights for all material on Octasence. All
            intellectual property rights are reserved. You may access this from
            Octasence for your own personal use subjected to restrictions set in
            these terms and conditions.
          </p>
          <p className="font-semibold text-blue-400">You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Republish material from Octasence</li>
            <li>Sell, rent or sub-license material from Octasence</li>
            <li>Reproduce, duplicate or copy material from Octasence</li>
            <li>Redistribute content from Octasence</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'user-content',
      title: 'User Content',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            Octasence does not filter, edit, publish or review Comments prior to
            their presence on the website.
          </p>
          <p>
            Octasence reserves the right to monitor all Comments and to remove
            any Comments which can be considered inappropriate, offensive or
            causes breach of these Terms and Conditions.
          </p>
        </div>
      ),
    },
    {
      id: 'hyperlinking',
      title: 'Hyperlinking',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            The following organizations may link to our Website without prior
            written approval:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors may link to our Website.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: (
        <div className="space-y-4 text-justify">
          <p>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              limit or exclude our or your liability for death or personal
              injury;
            </li>
            <li>limit or exclude our or your liability for fraud;</li>
            <li>
              limit any of our or your liabilities in any way not permitted
              under law.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: (
        <div className="space-y-6">
          <p>
            For any questions, concerns, or requests for account deletion,
            please contact our support team.
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
        <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="octa-heading text-4xl md:text-6xl mb-2 leading-tight tracking-tighter">
            Terms of <span className="octa-accent-text">Service</span>
          </h1>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">
            Ethical governance framework and service protocols of Octasence.
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

export default TOSPage;
