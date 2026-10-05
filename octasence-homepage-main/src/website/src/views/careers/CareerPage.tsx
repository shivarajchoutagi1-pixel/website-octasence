'use client';

import { isBefore, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import {
  FiArrowRight,
  FiBookOpen,
  FiDollarSign,
  FiHome,
  FiMail,
  FiMonitor,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';

import mainConfig from '@/configs/mainConfigs';
import { useCareers, useDepartments } from '@/hooks/useApiHooks';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatbotWidget from '@/components/ChatbotWidget';

export const metadata = {
  title: 'Jobs at Octasence',
};

// ─── Globe ───────────────────────────────────────────────────────────────────

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Globe: React.FC<{ rotationOffset: number; isDragging: boolean }> = ({
  rotationOffset,
  isDragging,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rotationRef = React.useRef(0);
  const dragOffsetRef = React.useRef(0);

  const dots = React.useMemo(() => {
    const points: {
      x: number;
      y: number;
      z: number;
      type: 'land' | 'ocean';
    }[] = [];
    const count = 3500;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const lat = (phi * 180) / Math.PI - 90;
      const lon = (((theta * 180) / Math.PI) % 360) - 180;
      const isLand =
        (lon > -130 && lon < -35 && lat > -55 && lat < 75) ||
        (lon > -10 && lon < 150 && lat > 15 && lat < 78) ||
        (lon > -20 && lon < 55 && lat > -38 && lat < 38) ||
        (lon > 95 && lon < 155 && lat > -48 && lat < 5) ||
        (lon > -30 && lon < -10 && lat > 60 && lat < 85) ||
        lat > 75 ||
        lat < -80;
      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
        type: isLand ? 'land' : 'ocean',
      });
    }
    return points;
  }, []);

  const locations = [
    { name: 'London', lat: 51.5, lon: -0.11 },
    { name: 'US', lat: 39.0, lon: -98.0 },
    { name: 'India', lat: 28.6, lon: 77.2 },
    { name: 'Australia', lat: -33.8, lon: 151.2 },
    { name: 'Asia', lat: 35.0, lon: 105.0 },
  ];

  React.useEffect(() => {
    dragOffsetRef.current = rotationOffset;
  }, [rotationOffset]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId: number;
    const render = () => {
      ctx.fillStyle = '#060814';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const radius = canvas.width * 0.4;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      if (!isDragging) rotationRef.current += 0.003;
      const rot = rotationRef.current + dragOffsetRef.current;
      const cosY = Math.cos(rot);
      const sinY = Math.sin(rot);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const rz = dot.x * sinY + dot.z * cosY;
        if (rz > -0.05) {
          const rx = dot.x * cosY - dot.z * sinY;
          const scale = (rz + 2) / 2.5;
          const px = centerX + rx * radius * scale;
          const py = centerY + dot.y * radius * scale;
          ctx.beginPath();
          ctx.arc(px, py, 1.2 * scale, 0, 7);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 0.25 + (rz + 0.1) * 0.7;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      locations.forEach((loc) => {
        const phi = (90 - loc.lat) * (Math.PI / 180);
        const theta = (loc.lon + 180) * (Math.PI / 180);
        const dx = Math.sin(phi) * Math.cos(theta);
        const dy = Math.cos(phi);
        const dz = Math.sin(phi) * Math.sin(theta);
        const rz = dx * sinY + dz * cosY;
        if (rz > 0.15) {
          const rx = dx * cosY - dz * sinY;
          const scale = (rz + 2) / 2.5;
          const px = centerX + rx * radius * scale;
          const py = centerY + dy * radius * scale;
          ctx.beginPath();
          ctx.arc(px, py, 8 * scale, 0, 7);
          ctx.strokeStyle = 'rgba(79, 70, 229, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, 4 * scale, 0, 7);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, dots]);

  return (
    <div
      className="w-full flex justify-center"
      style={{
        maskImage: 'radial-gradient(circle, rgb(0,0,0) 65%, rgba(0,0,0,0) 75%)',
        WebkitMaskImage:
          'radial-gradient(circle, rgb(0,0,0) 65%, rgba(0,0,0,0) 75%)',
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full max-w-[600px] aspect-square"
      />
    </div>
  );
};

// ─── Office Photo Collage ─────────────────────────────────────────────────────

const COLLAGE_IMAGES = [
  '/assets/images/office/office-1.jpg',
  '/assets/images/office/office-2.jpg',
  '/assets/images/office/office-3.jpg',
  '/assets/images/office/office-4.jpg',
  '/assets/images/office/office-5.jpg',
  '/assets/images/office/office-7.jpg',
  '/assets/images/office/office-8.jpg',  // NEW  // NEW
  '/assets/images/office/office-10.jpg', // NEW

];

// 4-column grid, 7 cells:
// [ large 2×2 ] [ small 1×1 ] [ small 1×1 ]
// [            ] [ small 1×1 ] [ small 1×1 ]
// [ wide  2×1  ] [ wide  2×1              ]
// New layout optimized for:
// office-1 (horizontal) → wide hero
// others (vertical) → stacked tiles

const COLLAGE_LAYOUT = [
  { colSpan: 'col-span-4', rowSpan: 'row-span-1' }, // HERO (office-1)

  { colSpan: 'col-span-1', rowSpan: 'row-span-2' }, // tall
  { colSpan: 'col-span-1', rowSpan: 'row-span-2' }, // tall
  { colSpan: 'col-span-2', rowSpan: 'row-span-2' }, // BIG focal image

  { colSpan: 'col-span-2', rowSpan: 'row-span-1' }, // wide
  { colSpan: 'col-span-2', rowSpan: 'row-span-1' }, // wide
];

const OfficeCollage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full px-4 md:px-8 lg:px-12 pb-16">
      {/* HEADER */}
      <div
        className="mb-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.6s ease',
        }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Life at Octasense
        </h2>
        <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
      </div>

      {/* HERO IMAGE */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={itemVariants}
        className="w-full h-[240px] md:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden mb-6 group shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        <img
          src={COLLAGE_IMAGES[0]}
          alt="Office hero"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]"
      >
        {COLLAGE_IMAGES.slice(1).map((src, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className={`
              relative overflow-hidden rounded-2xl group
              ${idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            `}
          >
            <img
              src={src}
              alt={`Office ${idx + 2}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition duration-500" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Moving Photo Banner ──────────────────────────────────────────────────────

// ─── Moving Photo Banner ──────────────────────────────────────────────────────

// ─── Moving Photo Banner (FULL WIDTH) ─────────────────────────────────────────

const BANNER_IMAGES = [
  '/assets/images/office/office-2.jpg',
  '/assets/images/office/office-3.jpg',
  '/assets/images/office/office-4.jpg',
  '/assets/images/office/office-5.jpg',
  '/assets/images/office/office-7.jpg',
  '/assets/images/office/office-8.jpg',  // NEW  // NEW
  '/assets/images/office/office-10.jpg', // NEW
];

const PhotoBanner: React.FC = () => {
  const items = [...BANNER_IMAGES, ...BANNER_IMAGES];

  return (
    <div className="hidden md:block w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-10">
      {/* ANIMATION */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* TRACK */}
      <div className="marquee-track gap-4 px-4">
        {items.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 overflow-hidden rounded-2xl group"
            style={{
              width: '18vw', // 🔥 responsive width
              height: '18vw', // 🔥 keeps it square
              minWidth: '140px',
              maxWidth: '260px',
            }}
          >
            <img
              src={src}
              alt={`Office ${(idx % BANNER_IMAGES.length) + 2}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const CareerPage: React.FC = () => {
  const router = useRouter();
  const { data: departmentsPage, isLoading: departmentsLoading } =
    useDepartments();
  const departments = departmentsPage?.results ?? [];

  const { data: careersData, isLoading: careersLoading } = useCareers();
  const careers = careersData?.results ?? [];

  const [selectedDepartmentId, setSelectedDepartmentId] =
    useState<string>('all');

  const allDepartments = [
    { id: 'all', name: 'Open Positions' },
    ...(departments || []),
  ];

  const isJobOpen = (closingDate?: string) => {
    if (!closingDate) return false;
    try {
      return isBefore(new Date(), parseISO(closingDate));
    } catch {
      return false;
    }
  };

  const filteredJobs = (careers ?? []).filter((career: any) => {
    const isOpen = isJobOpen(career.closing_date);
    if (selectedDepartmentId === 'all') return isOpen;
    return isOpen && career.department?.id == selectedDepartmentId;
  });

  const groupedJobsByDepartment = filteredJobs?.reduce((acc: any, job: any) => {
    const departmentName = job.department?.name || 'Open Positions';
    if (!acc[departmentName]) acc[departmentName] = { jobs: [], openCount: 0 };
    acc[departmentName].openCount++;
    acc[departmentName].jobs.push(job);
    return acc;
  }, {});

  const isLoading = departmentsLoading || careersLoading;

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setRotation((prev) => prev + (e.clientX - startX) * 0.5);
    setStartX(e.clientX);
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setRotation((prev) => prev + (e.touches[0].clientX - startX) * 0.5);
    setStartX(e.touches[0].clientX);
  };

  React.useEffect(() => {
    let id: number;
    const animate = () => {
      if (!isDragging) setRotation((prev) => prev - 0.2);
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isDragging]);

  const AtmosphericWaves: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: ['-10%', '10%', '-10%'],
          y: ['-5%', '5%', '-5%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_50%,#4338ca_0%,transparent_50%)] opacity-30 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: ['10%', '-10%', '10%'],
          y: ['5%', '-5%', '5%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_70%_50%,#3b82f6_0%,transparent_50%)] opacity-20 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#6d28d9_0%,transparent_60%)] opacity-20 blur-[100px]"
      />
    </div>
  );

  return (
    <div className="flex flex-col w-full bg-[#060814]">
       <WhatsAppButton/>
      <ChatbotWidget/>
      {/* ── Hero ── */}
     <header className="relative overflow-hidden w-full flex flex-col items-center justify-center gap-6 pt-12 pb-20 md:pt-20 md:pb-32 px-4 text-center">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
          >
            <source src="/videos/career_bg.mp4" type="video/mp4" />
          </video>
          <AtmosphericWaves />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full" />
          <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-4 md:space-y-5">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase animate-fade-in mx-auto">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
            Careers at Octasence
          </div>

          <h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.025em] leading-[1.05] max-w-4xl mx-auto text-white"
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              Engineering Agentic <br />
              <span className="inline-block pb-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-[#4f8cff] via-[#3b6ef5] to-[#1e2fd6] drop-shadow-[0_0_18px_rgba(59,110,245,0.35)]">
                Infrastructure
              </span>
            </h1>

          <p className="text-lg md:text-2xl text-blue-500 font-serif italic font-bold tracking-[0.1em] opacity-95 animate-fade-in-up">
            Seeing the Unseen, Preventing the Unthinkable.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-base md:text-xl text-gray-400 font-medium leading-relaxed italic px-4">
              &quot;Architecting Intelligent Infrastructure for the Agentic AI
              Era. <br className="hidden md:block" />
              Join the{' '}
              <span className="text-white font-bold not-italic">
                Octasence
              </span>{' '}
              engineering team.&quot;
            </p>
            <p className="text-[10px] md:text-base text-gray-500 tracking-widest uppercase">
              Excellence is our standard &bull; Octasence is our mission
            </p>
          </div>

          <div className="pt-4 md:pt-6">
            <button
              data-cta-category="careers"
              data-cta-label="open_positions_linkedin"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/company/octasence/jobs/',
                  '_blank',
                )
              }
              className="group relative px-8 py-4 md:px-10 md:py-5 bg-[#4338ca] hover:bg-[#3d46ab] text-white rounded-full font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_20px_50px_rgba(67,56,202,0.4)] flex items-center gap-4 mx-auto"
            >
              Open Positions
              <FiArrowRight
                size={24}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="open-positions"
        className={`space-y-12 md:space-y-24 w-full py-16 md:py-24 ${mainConfig.containerClass} relative`}
      >
        {/* ── Office Photo Collage ── */}
        <OfficeCollage />

        {/* ── Octasence Statement ── */}
        <div className="w-full px-4 md:px-8 lg:px-12 py-16">
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="
            text-2xl md:text-4xl lg:text-5xl 
            leading-[1.3] md:leading-[1.25] 
            font-medium 
            text-white 
            tracking-tight
          "
            >
              To be one of us is to embrace challenge, embody intelligence, and
              move quickly. It means you see technology as a means, but the end
              is always making an impact in our clients&apos; most pressing
              challenges. We want you to feel empowered, be free to embrace your
              inner-entrepreneur, and drive to deliver solutions that you are
              proud of.
            </p>

            <p
              className="
            mt-8 
            text-lg md:text-xl 
            text-indigo-400 
            font-semibold 
            tracking-wide
          "
            >
              This is what Octasence is all about.
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full flex justify-center py-4 md:py-8 pointer-events-none">
          <div className="relative w-4/5 h-[2px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60px] md:h-[100px] bg-indigo-500/10 blur-[80px] md:blur-[100px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-64 h-[20px] md:h-[30px] bg-indigo-400/20 blur-xl md:blur-2xl rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_20px_rgba(129,140,248,1)]" />
          </div>
        </div>

        {/* ── Benefits ── */}
        <div className="px-4 lg:px-8 pb-10 md:pb-20">
          <div
            className="relative bg-white/[0.02] border border-white/10 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Benefits
              </h2>
              <div className="h-1.5 w-16 md:w-24 bg-indigo-600 rounded-full" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-12 gap-x-16">
              {[
                { icon: <FiDollarSign />, text: 'Competitive salary' },
                { icon: <FiTrendingUp />, text: 'Opportunities for growth' },
                { icon: <FiHome />, text: 'Work from home' },
                { icon: <FiShield />, text: 'Mental well-being' },
                { icon: <FiMonitor />, text: 'Inclusive workplace' },
                { icon: <FiUsers />, text: 'Team-building events' },
                { icon: <FiBookOpen />, text: 'Learning & Development' },
                { icon: <FiStar />, text: 'Great culture' },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 md:gap-8 group animate-fade-in-up"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                    {React.cloneElement(benefit.icon as React.ReactElement, {
                      size: 28,
                    })}
                  </div>
                  <span className="text-lg md:text-2xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full flex justify-center py-4 md:py-8 pointer-events-none">
          <div className="relative w-4/5 h-[2px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60px] md:h-[100px] bg-indigo-500/10 blur-[80px] md:blur-[100px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-64 h-[20px] md:h-[30px] bg-indigo-400/20 blur-xl md:blur-2xl rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_20px_rgba(129,140,248,1)]" />
          </div>
        </div>

        {/* ── Globe ── */}
        <div className="flex flex-col items-center justify-center text-center pt-0 pb-0 px-4 space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Join us <span className="text-indigo-400">across the globe</span>
          </h2>

          <div
            className="relative w-full flex justify-center items-center group cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div className="scale-75 md:scale-100 transition-transform duration-500">
              <Globe rotationOffset={rotation * 0.01} isDragging={isDragging} />
            </div>
          </div>
        </div>

        {/* ── Drop Your CV ── */}
        <div className="px-4 lg:px-8">
          <div
            className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 p-10 md:p-20 text-center"
            style={{
              background:
                'radial-gradient(ellipse at 60% 0%, rgba(99,102,241,0.18) 0%, transparent 70%), #0b0f24',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Decorative glows */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Icon */}
            <div className="relative z-10 mx-auto mb-8 w-20 h-20 flex items-center justify-center rounded-3xl bg-indigo-500/10 border border-indigo-500/30">
              <FiMail size={34} className="text-indigo-400" />
            </div>

            {/* Heading */}
            <div className="relative z-10 space-y-4 mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Don&apos;t see a{' '}
                <span className="text-indigo-400">role that fits?</span>
              </h2>
              <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                We&apos;re always on the lookout for exceptional talent. Send us
                your CV and tell us why you&apos;d be a great addition to the
                Octasence team &mdash; we read every application.
              </p>
            </div>

            {/* CTA */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:admin@octasence.com?subject=CV%20Submission%20-%20Octasence&amp;body=Hi%20Octasence%20team%2C%0A%0APlease%20find%20my%20CV%20attached.%0A%0A"
                data-cta-category="careers"
                data-cta-label="drop_cv_email"
                className="group flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_20px_50px_rgba(99,102,241,0.35)]"
              >
                <FiMail size={22} />
                Drop your CV
                <FiArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <span className="text-sm text-gray-500 font-medium tracking-widest uppercase">
                admin@octasence.com
              </span>
            </div>
          </div>
        </div>

        {/* ── Moving Photo Banner ── */}
        <PhotoBanner />
      </div>
    </div>
  );
};

export default CareerPage;
