'use client';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiDatabase, FiMessageCircle, FiStar, FiTablet } from 'react-icons/fi';

const IndiaFlag: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    width="24"
    height="16"
    style={{ borderRadius: 2, flexShrink: 0 }}
  >
    <rect width="900" height="200" y="0" fill="#FF9933" />
    <rect width="900" height="200" y="200" fill="#FFFFFF" />
    <rect width="900" height="200" y="400" fill="#138808" />
    <circle
      cx="450"
      cy="300"
      r="60"
      fill="none"
      stroke="#000080"
      strokeWidth="4"
    />
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={450 + 20 * Math.cos(rad)}
          y1={300 + 20 * Math.sin(rad)}
          x2={450 + 58 * Math.cos(rad)}
          y2={300 + 58 * Math.sin(rad)}
          stroke="#000080"
          strokeWidth="3"
        />
      );
    })}
    <circle cx="450" cy="300" r="10" fill="#000080" />
  </svg>
);

const EstoniaFlag: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    width="24"
    height="16"
    style={{ borderRadius: 2, flexShrink: 0 }}
  >
    <rect width="900" height="200" y="0" fill="#0072CE" />
    <rect width="900" height="200" y="200" fill="#000000" />
    <rect width="900" height="200" y="400" fill="#FFFFFF" />
  </svg>
);

const ContactPage: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = (detail: string) => {
    router.push(
      `/contact/form?category=${detail.toLowerCase().replace(/ /g, '-')}`,
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const cards = [
    {
      icon: <FiTablet size={20} />,
      question: 'I have a question about',
      detail: 'SHM Sensors',
      accent: '#2563EB',
    },
    {
      icon: <FiDatabase size={20} />,
      question: 'I have a question about',
      detail: 'SHM Data & Analytics',
      accent: '#0EA5E9',
    },
    {
      icon: <FiStar size={20} />,
      question: 'I have some',
      detail: 'Feedback',
      accent: '#6366F1',
    },
    {
      icon: <FiMessageCircle size={20} />,
      question: 'I have a',
      detail: 'General Inquiry',
      accent: '#0000FF',
    },
  ];

  return (
    <div
      className="flex w-full flex-col lg:flex-row"
      style={{
        height: 'calc(100vh - 132px)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ── LEFT: Video Panel ── */}
      <section className="flex-1 relative flex items-center justify-center p-8 overflow-hidden min-h-[300px] lg:min-h-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/career_bg.mp4"
        />
        <div className="absolute inset-0 bg-[#07070f]/80" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[100px] opacity-20 bg-blue-600 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-sm w-full text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Contact Us
          </div>

          <h2 className="text-3xl font-bold mb-6 tracking-tight leading-tight">
            Get in touch
          </h2>

          <div className="mb-4 p-4 rounded-xl border border-white/[0.12] bg-white/[0.06]">
            <p className="text-sm font-bold mb-1.5 flex items-center gap-2 text-white">
              <IndiaFlag />
              India Office
            </p>
            <p className="text-white/80 text-sm font-medium leading-relaxed">
              No 589, 14th Main Road,
              <br />
              Kumaraswamy Layout,
              <br />
              Bengaluru, Karnataka - 560078, India
            </p>
          </div>

          <div className="mb-5 p-4 rounded-xl border border-white/[0.12] bg-white/[0.06]">
            <p className="text-sm font-bold mb-1.5 flex items-center gap-2 text-white">
              <EstoniaFlag />
              Estonia Office
            </p>
            <p className="text-white/80 text-sm font-medium leading-relaxed">
              Parda 8, Tallinn 10151, Estonia
              <br />
              European Union
            </p>
          </div>

          <p className="text-white/80 text-sm font-medium">
            You can also contact us by email to:{' '}
            <a
              href="mailto:admin@octasence.com"
              className="text-blue-300 hover:text-blue-200 transition-colors underline font-semibold"
            >
              admin@octasence.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* ── RIGHT: Options Panel ── */}
      <motion.section
        className="flex-1 w-full flex flex-col justify-center p-8 overflow-y-auto relative"
        style={{ background: '#0a0a14' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 max-w-lg w-full mx-auto">
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              How can we help?
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              What brings you here?
            </h3>
            <div className="w-16 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3" />
          </motion.div>

          <div className="space-y-3">
            {cards.map((item, index) => (
              <CardButton
                key={index}
                item={item}
                onClick={() => handleButtonClick(item.detail)}
                variants={itemVariants}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// Extracted to avoid inline ref handlers
const CardButton: React.FC<{
  item: {
    icon: React.ReactNode;
    question: string;
    detail: string;
    accent: string;
  };
  onClick: () => void;
  variants: Variants;
}> = ({ item, onClick, variants }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      variants={variants}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex w-full cursor-pointer items-center p-5 rounded-xl border text-left transition-all duration-300"
      style={{
        borderColor: hovered ? item.accent + '55' : 'rgba(255,255,255,0.07)',
        background: hovered
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.02)',
        boxShadow: hovered ? `0 0 28px ${item.accent}18` : 'none',
      }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-all duration-300"
        style={{
          background: hovered ? item.accent + '22' : 'rgba(255,255,255,0.05)',
          color: hovered ? item.accent : 'rgba(255,255,255,0.3)',
          boxShadow: hovered ? `0 0 14px ${item.accent}44` : 'none',
        }}
      >
        {item.icon}
      </div>

      <div className="flex-1">
        <p className="text-white/40 text-xs mb-0.5">{item.question}</p>
        <p className="text-white font-semibold text-sm tracking-tight">
          {item.detail}
        </p>
      </div>

      <span
        className="text-base ml-3 transition-all duration-300"
        style={{
          color: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)',
        }}
      >
        →
      </span>
    </motion.div>
  );
};

export default ContactPage;
