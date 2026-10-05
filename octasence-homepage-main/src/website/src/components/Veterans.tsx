'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import mainConfig from '@/configs/mainConfigs';

const INSPIRATION_CARDS = [
  {
    name: 'Anil Agarwal',
    role: 'Founder of Vedanta Resources',
    imageSrc: '/assets/images/partners/anil_agarwal.jpeg',
    quote: '“Success in business is not just about profits; it is about building a better future for everyone.”',
  },
  {
    name: 'Jamsetji Tata',
    role: 'Tata Group',
    imageSrc: '/assets/images/partners/tata.jpeg',
    quote: '“In a free enterprise, the community is not just another stakeholder, but the purpose of its existence.”',
  },
  {
    name: 'Lukas Lundin',
    role: 'Built a global mining empire',
    imageSrc: '/assets/images/partners/lucas.jpeg',
    quote: '“To build a global empire, you must lead with vision, integrity, and a commitment to excellence.”',
  },
];

const Veterans = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % INSPIRATION_CARDS.length);
    }, 4000); // 4 seconds cycle for better readability
    return () => clearInterval(timer);
  }, []);

  const card = INSPIRATION_CARDS[index];

  return (
    <div
      className={'relative overflow-hidden flex flex-col items-center justify-center py-16 md:py-24 ${mainConfig.containerClass}'}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      
      <div className="w-full relative z-10 max-w-6xl mx-auto px-4 min-h-[480px] md:min-h-[420px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.article
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full flex flex-col md:flex-row items-center gap-10 lg:gap-16 rounded-[3rem] p-10 lg:p-16 bg-[#0a1024]/40 border border-white/5 backdrop-blur-md shadow-2xl shadow-blue-900/10"
          >
            {/* Left: Image Container */}
            <div className="relative aspect-[16/11] md:aspect-[4/5] w-full md:w-[42%] overflow-hidden rounded-3xl bg-white/5 border border-white/5 shrink-0">
               {card.imageSrc ? (
                 <Image
                   src={card.imageSrc}
                   alt={card.name}
                   fill
                   className="object-cover object-top"
                   sizes="(max-width: 768px) 100vw, 400px"
                 />
               ) : (
                 <div className="flex flex-col items-center gap-2 h-full justify-center">
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                   </div>
                   <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
                     No Portrait
                   </span>
                 </div>
               )}
            </div>
            
            {/* Right: Content */}
            <div className="flex flex-col text-left space-y-8 flex-1">
              <div className="space-y-3">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4"
                >
                   <div className="h-px w-8 bg-blue-500/50" />
                   <p className="text-xs font-black uppercase tracking-widest text-[#4d94ff]">
                    Legacy Leader
                  </p>
                </motion.div>
                <h3 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {card.name}
                </h3>
                <p className="text-base font-semibold text-slate-400 capitalize">
                  {card.role}
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 -top-4 text-6xl text-blue-500/10 font-serif leading-none">“</span>
                <p className="text-xl lg:text-2xl font-medium leading-relaxed text-slate-200 italic">
                  {card.quote}
                </p>
              </div>

              {/* Loop Progress Indicator */}
              <div className="flex gap-2 pt-4">
                {INSPIRATION_CARDS.map((_, i) => (
                  <div 
                    key={i} 
                    className="h-1.5 transition-all duration-300 rounded-full ${i === index ? 'w-8 bg-blue-500' : 'w-1.5 bg-white/10"
                  />
                ))}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Veterans;