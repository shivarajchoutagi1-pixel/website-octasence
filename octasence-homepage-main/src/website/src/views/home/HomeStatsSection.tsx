'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { useRef, useState } from 'react';

import mainConfig from '@/configs/mainConfigs';

import { Accordion } from './Accordion';
import { accordionItems, statItems } from './data';

type TabKey = 'infrastructure' | 'analytics';

const imageContent: Record<
  TabKey,
  {
    src: string;
    alt: string;
    eyebrow: string;
    title: string;
    blurb: string;
    stats: string[];
  }
> = {
  infrastructure: {
    src: '/assets/images/shm.jpg',
    alt: 'Structural Health Monitoring',
    eyebrow: 'Live Infrastructure View',
    title: 'Sensor-rich field intelligence',
    blurb:
      'Continuous streams from mines, tunnels, and dams turned into one command-ready visual layer.',
    stats: ['24/7 sensing', 'Remote sites', 'Early-warning ready'],
  },
  analytics: {
    src: '/assets/images/predictive.avif',
    alt: 'AI Predictive Analytics',
    eyebrow: 'AI Risk Forecasting',
    title: 'Prediction before disruption',
    blurb:
      'Machine learning surfaces hidden structural patterns before they escalate into operational risk.',
    stats: ['Trend detection', 'Risk scoring', 'Actionable alerts'],
  },
};

const HomeStatsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('infrastructure');

  return (
    <section className="relative w-full overflow-hidden bg-[#ECF2FF] px-4 py-10 md:py-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-8%] top-20 h-44 w-44 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute right-[-4%] top-1/3 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className={`${mainConfig.containerClass} relative z-10 space-y-14`}>
        <HeadingSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <AccordionAndImageSection activeTab={activeTab} />
        <StatisticsSection />
      </div>
    </section>
  );
};

const HeadingSection: React.FC<{
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}> = ({ activeTab, setActiveTab }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(240,246,255,0.96)_100%)] px-6 py-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-12"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#45638E]">
        <motion.span
          className="h-2 w-2 rounded-full bg-[#0F47D7]"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.95, 1.15, 0.95] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        Real-time Command Layer
      </div>

      <h2 className="text-3xl leading-tight tracking-[-0.02em] text-[#08162C] md:text-5xl">
        Real-Time Infrastructure Intelligence
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#45638E] md:text-lg">
        OctaSence blends industrial IoT sensing, AI-led interpretation, and
        digital twin context into one responsive monitoring experience built for
        high-risk infrastructure.
      </p>

      <div className="mt-8 flex justify-center">
        <div className="relative inline-grid w-full max-w-2xl grid-cols-2 border-b border-[#C9D9F2]">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className={`absolute bottom-0 h-[3px] bg-[#0F47D7] ${
              activeTab === 'infrastructure' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
            }`}
          />
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`relative px-4 py-4 text-sm transition-colors md:px-6 md:text-base ${
              activeTab === 'infrastructure'
                ? 'text-[#08162C]'
                : 'text-[#587193]'
            }`}
            style={{ fontFamily: 'Outfit, sans-serif' }}
            type="button"
          >
            Infrastructure Monitoring
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`relative px-4 py-4 text-sm transition-colors md:px-6 md:text-base ${
              activeTab === 'analytics' ? 'text-[#08162C]' : 'text-[#587193]'
            }`}
            style={{ fontFamily: 'Outfit, sans-serif' }}
            type="button"
          >
            Predictive Analytics
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AccordionAndImageSection: React.FC<{
  activeTab: TabKey;
}> = ({ activeTab }) => {
  const content = imageContent[activeTab];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
      <motion.div
        key={`accordion-${activeTab}`}
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[1.75rem] border border-white/75 bg-white/85 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.07)] backdrop-blur-sm md:p-5"
      >
        <Accordion items={accordionItems[activeTab]} />
      </motion.div>

      <motion.div
        layout
        className="relative min-h-[340px] overflow-hidden border border-[#B8C8E8] bg-[#0F1C33] shadow-[0_28px_55px_rgba(15,23,42,0.2)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={content.src}
              alt={content.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,24,0.08)_0%,rgba(3,11,24,0.28)_42%,rgba(3,11,24,0.8)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <div className="max-w-xl space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {content.eyebrow}
                </div>
                <h3 className="text-2xl leading-tight tracking-[-0.02em] text-white md:text-[2rem]">
                  {content.title}
                </h3>
                <p className="max-w-lg text-sm leading-relaxed text-white/78 md:text-base">
                  {content.blurb}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {content.stats.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-white/82 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const StatisticsSection: React.FC = () => {
  const formatStatValue = (value: number, key: string): string => {
    if (key === 'ai_analyses') return `${(value / 1000).toFixed(0)}K+`;
    return `${value}+`;
  };

  const scrollingStats = [...statItems, ...statItems];

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-4 md:px-6">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {scrollingStats.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <motion.div
              key={`${stat.key}-${index}`}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex min-h-[200px] w-[220px] flex-shrink-0 flex-col justify-between rounded-xl border border-white/10 bg-[#031629] p-5 shadow-[0_18px_40px_rgba(2,6,23,0.5)] transition-all duration-300 hover:border-blue-400/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] sm:w-[240px] lg:w-[260px]"
            >
              <div className="space-y-3">
                {/* Colored Accent */}
                <div
                  className="h-1.5 w-14 rounded-full"
                  style={{
                    backgroundColor: stat.color,
                    boxShadow: `0 0 20px ${stat.color}40`,
                  }}
                />

                {/* Text */}
                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-[-0.03em] text-white">
                    {formatStatValue(stat.value, stat.key)}
                  </p>

                  <p className="text-sm md:text-base leading-snug text-white/70 font-">
                    {stat.label}
                  </p>
                </div>
              </div>

              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                style={{ color: stat.color }}
              >
                <IconComponent size={20} color={stat.color} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HomeStatsSection;
