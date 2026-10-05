'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import ChatbotWidget from '@/components/ChatbotWidget';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getSectorSlug } from '../use-cases/data/sectorRoutes';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Sector {
  label: string;
  tag: string;
  desc: string;
  icon: React.ReactNode;
  dot: string;
  cases: { n: string; t: string; id: string }[];
  sectorFilter?: string;
}

interface StrobeConfig {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  freq: number;
  phase: number;
  alpha: number;
}

interface HLineConfig {
  y: number;
  drift: number;
  freq: number;
  phase: number;
  alpha: number;
  width: number;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const Icons: Record<string, React.ReactNode> = {
  bridges: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M2 17h20M6 17V9l6-5 6 5v8" />
      <path d="M10 17v-5h4v5" />
    </svg>
  ),
  buildings: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  dams: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M2 20h20M4 20V10l8-7 8 7v10" />
    </svg>
  ),
  tunnels: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M7 17A5 5 0 0 1 17 17" />
    </svg>
  ),
  transport: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M3 6h18M3 12h18M5 18h14" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  energy: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  mining: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
    </svg>
  ),
  landslides: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M3 17l4-8 4 4 4-6 4 4" />
      <path d="M3 21h18" />
    </svg>
  ),
  pipelines: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M4 12h16M4 6c0 3.3 16 3.3 16 0M4 18c0-3.3 16-3.3 16 0" />
    </svg>
  ),
  environment: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  smartCities: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-7 h-7"
    >
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7 12h10M12 7v10" />
    </svg>
  ),
  platform: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-4 h-4"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </svg>
  ),
};

// ─── Sector Data ──────────────────────────────────────────────────────────────

const sectors: Sector[] = [
  {
    label: 'Dams',
    tag: 'Water',
    desc: 'Seepage, pore pressure, and deformation monitoring for dam safety, maintenance, and regulatory compliance.',
    icon: Icons.dams,
    dot: '#378ADD',
    cases: [
      {
        n: '03',
        t: 'Tailings dam failure risk monitoring',
        id: 'tailings-dam-failure',
      },
      {
        n: '09',
        t: 'Aging dam structural health monitoring',
        id: 'aging-dam-shm',
      },
    ],
    sectorFilter: 'Dams',
  },
  {
    label: 'Tunnels',
    tag: 'Underground',
    desc: 'Deformation and convergence tracking during TBM and drill & blast construction phases — delivering real-time risk alerts.',
    icon: Icons.tunnels,
    dot: '#7F77DD',
    cases: [
      {
        n: '04',
        t: 'Metro tunnel structural health monitoring',
        id: 'metro-tunnel-shm',
      },
      {
        n: '08',
        t: 'TBM tunnel construction risk monitoring',
        id: 'tbm-tunnel-construction',
      },
    ],
    sectorFilter: 'Tunnels',
  },
  {
    label: 'Mining',
    tag: 'Extraction',
    desc: 'Mine and tailings dam geotechnical monitoring with intelligent structural and ground movement data insights.',
    icon: Icons.mining,
    dot: '#EF9F27',
    cases: [
      {
        n: '01',
        t: 'Open-pit mine slope failure prevention',
        id: 'open-pit-mine-slope',
      },
      {
        n: '02',
        t: 'Underground mine roof collapse prediction',
        id: 'underground-mine-roof',
      },
      {
        n: '10',
        t: 'Digital twin for integrated mine-to-port infrastructure',
        id: 'digital-twin-mine-to-port',
      },
    ],
    sectorFilter: 'Mining',
  },
  {
    label: 'Landslides',
    tag: 'Geohazard',
    desc: 'Predictive early warning using GNSS, inclinometers, and piezometers delivering continuous slope stability data for timely action.',
    icon: Icons.landslides,
    dot: '#D85A30',
    cases: [
      {
        n: '06',
        t: 'Landslide risk monitoring for pipeline corridors',
        id: 'landslide-pipeline-corridors',
      },
    ],
    sectorFilter: 'Oil & Gas',
  },
  {
    label: 'Pipelines',
    tag: 'Energy',
    desc: 'Oil, water, and gas transmission monitoring for streamlined pipeline efficiency, leak detection, and safety.',
    icon: Icons.pipelines,
    dot: '#5DCAA5',
    cases: [
      {
        n: '05',
        t: 'Oil & gas pipeline leak detection',
        id: 'pipeline-leak-detection',
      },
      {
        n: '06',
        t: 'Landslide risk monitoring for pipeline corridors',
        id: 'landslide-pipeline-corridors',
      },
    ],
    sectorFilter: 'Oil & Gas',
  },
];

// ─── Background Strobe Canvas ─────────────────────────────────────────────────

const StrobeCanvas: React.FC<{
  containerRef: React.RefObject<HTMLDivElement>;
}> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const strobes = useRef<StrobeConfig[]>(
    Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      angle: -80 + Math.random() * 160,
      length: 0.3 + Math.random() * 0.7,
      width: 0.3 + Math.random() * 2.0,
      freq: 0.15 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.04 + Math.random() * 0.11,
    })),
  );

  const hLines = useRef<HLineConfig[]>(
    Array.from({ length: 12 }, () => ({
      y: Math.random(),
      drift: 0.00006 + Math.random() * 0.0002,
      freq: 0.1 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.03 + Math.random() * 0.07,
      width: 0.2 + Math.random() * 1.2,
    })),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = (ts: number) => {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const t = ts * 0.001;

      strobes.current.forEach((s) => {
        const a = (Math.sin(t * s.freq + s.phase) * 0.5 + 0.5) * s.alpha;
        if (a < 0.004) return;
        const sx = s.x * W,
          sy = s.y * H;
        const rad = (s.angle * Math.PI) / 180;
        const len = s.length * Math.sqrt(W * W + H * H);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.strokeStyle = '#4f7fff';
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(rad) * len, sy + Math.sin(rad) * len);
        ctx.stroke();
        ctx.restore();
      });

      hLines.current.forEach((h) => {
        const a = (Math.sin(t * h.freq + h.phase) * 0.5 + 0.5) * h.alpha;
        if (a < 0.003) return;
        const y = ((h.y + t * h.drift) % 1) * H;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.strokeStyle = '#7b9fff';
        ctx.lineWidth = h.width;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
        ctx.restore();
      });

      // Floating particles
      const particleCount = 40;
      for (let p = 0; p < particleCount; p++) {
        const px = (Math.sin(t * 0.3 + p * 2.4) * 0.5 + 0.5) * W;
        const py = (Math.cos(t * 0.2 + p * 1.7) * 0.5 + 0.5) * H;
        const pa = (Math.sin(t * 0.5 + p) * 0.5 + 0.5) * 0.18;
        const pr = 1 + Math.sin(t * 0.4 + p * 0.9) * 0.8;
        ctx.save();
        ctx.globalAlpha = pa;
        ctx.fillStyle = p % 3 === 0 ? '#7b9fff' : '#4f7fff';
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Radial glow rings from center
      const cx2 = W / 2,
        cy2 = H / 2;
      for (let r = 0; r < 3; r++) {
        const radius = 80 + r * 120 + ((t * 30 * (r + 1)) % 300);
        const ra = Math.max(0, 0.06 - radius / 2000);
        if (ra < 0.002) continue;
        ctx.save();
        ctx.globalAlpha = ra;
        ctx.strokeStyle = '#4f7fff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx2, cy2, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// ─── Orbit Wheel ──────────────────────────────────────────────────────────────

interface OrbitWheelProps {
  activeIdx: number | null;
  hoveredIdx: number | null;
  onHover: (i: number | null) => void;
  onClick: (i: number) => void;
  onNavigate: (i: number) => void;
}

const OrbitWheel: React.FC<OrbitWheelProps> = ({
  activeIdx,
  hoveredIdx,
  onHover,
  onClick,
  onNavigate,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const lastTRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const spokesRef = useRef<(HTMLDivElement | null)[]>([]);

  const N = sectors.length;
  const SW = 580;
  const CX = SW / 2;
  const CY = SW / 2;
  const R = 230;

  const positionNodes = useCallback(
    (angle: number) => {
      sectors.forEach((_, i) => {
        const theta = (2 * Math.PI * i) / N + angle;
        const nx = CX + R * Math.cos(theta);
        const ny = CY + R * Math.sin(theta);
        const nd = nodesRef.current[i];
        const sp = spokesRef.current[i];
        if (nd) {
          nd.style.left = `${nx}px`;
          nd.style.top = `${ny}px`;
          nd.style.transform = 'translate(-50%,-50%)';
        }
        if (sp) {
          const dx = nx - CX,
            dy = ny - CY;
          const len = Math.sqrt(dx * dx + dy * dy) - 39;
          const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
          sp.style.width = `${len}px`;
          sp.style.transform = `rotate(${deg}deg)`;
        }
      });
    },
    [N],
  );

  useEffect(() => {
    const tick = (ts: number) => {
      const dt = lastTRef.current ? ts - lastTRef.current : 16;
      lastTRef.current = ts;
      angleRef.current += 0.08 * (dt / 1000);
      positionNodes(angleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    positionNodes(angleRef.current);
    return () => cancelAnimationFrame(rafRef.current);
  }, [positionNodes]);

  const highlightIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  return (
    <div
      ref={stageRef}
      className="relative mx-auto"
      style={{ width: SW, height: SW }}
    >
      {/* Pulse rings */}
      <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[pulse-ring_3.5s_ease-out_infinite]" />
      <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[pulse-ring_3.5s_ease-out_infinite_1.75s]" />
      <div className="absolute inset-0 rounded-full border border-blue-500/[0.05] animate-[pulse-ring_5s_ease-out_infinite_0.9s]" />

      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-blue-500/20 shadow-[0_0_30px_rgba(79,127,255,0.15)]" />
      <div
        className="absolute rounded-full border border-blue-500/20 shadow-[0_0_30px_rgba(79,127,255,0.15)]"
        style={{
          width: 340,
          height: 340,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
      <div
        className="absolute rounded-full border border-blue-500/20 shadow-[0_0_30px_rgba(79,127,255,0.15)]"
        style={{
          width: 170,
          height: 170,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />

      {/* Hub */}
      <div
        className={`absolute z-20 rounded-full flex flex-col items-center justify-center text-center p-3 transition-colors duration-300 ${
          highlightIdx !== null
            ? 'border-blue-500/50 bg-[#1a2130]'
            : 'border-white/13 bg-[#1a2130]'
        } border`}
        style={{
          width: 135,
          height: 135,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/12 border border-blue-500/28 flex items-center justify-center mb-2 text-blue-400 flex-shrink-0">
          {highlightIdx !== null ? sectors[highlightIdx].icon : Icons.platform}
        </div>
        <p className="text-[13px] font-medium text-white leading-tight">
          {highlightIdx !== null ? sectors[highlightIdx].label : 'SHM Platform'}
        </p>
        <p className="text-[11px] text-white/50 mt-1">
          {highlightIdx !== null ? sectors[highlightIdx].tag : '5 sectors'}
        </p>
      </div>

      {/* Spokes + Nodes */}
      {sectors.map((s, i) => {
        const isHighlighted = i === highlightIdx;
        return (
          <React.Fragment key={i}>
            {/* Spoke */}
            <div
              ref={(el) => {
                spokesRef.current[i] = el;
              }}
              className={`absolute top-1/2 left-1/2 h-px origin-left transition-colors duration-300 pointer-events-none z-[1] ${
                isHighlighted ? 'bg-blue-500/40' : 'bg-white/[0.07]'
              }`}
            />
            {/* Node */}
            <div
              ref={(el) => {
                nodesRef.current[i] = el;
              }}
              className={`absolute z-10 rounded-full flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all duration-250 ${
                isHighlighted
                  ? 'border-blue-500/55 bg-[#1a2130] scale-110'
                  : 'border-white/[0.07] bg-[#131922] shadow-[0_0_20px_rgba(79,127,255,0.08)] hover:border-blue-500/55 hover:bg-[#1a2130]'
              } border`}
              style={{ width: 78, height: 78 }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              onClick={() => {
                onClick(i);
                if (sectors[i].cases.length > 0) onNavigate(i);
              }}
            >
              <span
                className={`transition-colors scale-125 ${isHighlighted ? 'text-blue-400' : 'text-blue-400/70'}`}
              >
                {s.icon}
              </span>
              <span
                className={`text-[9px] font-medium mt-1.5 leading-tight transition-colors ${
                  isHighlighted ? 'text-white' : 'text-white/50'
                }`}
              >
                {s.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── Preview Panel ────────────────────────────────────────────────────────────

interface PreviewPanelProps {
  sector: Sector | null;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ sector }) => (
  <div className="max-w-2xl mx-auto mt-8 min-h-[60px]">
    <AnimatePresence mode="wait">
      {sector ? (
        <motion.div
          key={sector.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="bg-white/[0.06] border border-white/13 rounded-2xl overflow-hidden"
        >
          {/* top accent bar */}
          <motion.div
            className="h-0.5 bg-blue-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* body */}
          <div className="p-6 flex gap-5 items-start">
            <div className="w-11 h-11 rounded-xl bg-blue-500/12 border border-blue-500/28 flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-400">
              {sector.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium tracking-widest uppercase text-white/40 mb-1">
                {sector.tag}
              </p>
              <h3
                className="font-semibold text-xl text-white leading-tight mb-2"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {sector.label}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {sector.desc}
              </p>
            </div>
          </div>

          {/* case studies */}
          {sector.cases.length > 0 && (
            <div className="border-t border-white/[0.07] px-6 py-4">
              <p className="text-[10px] font-medium tracking-widest uppercase text-white/30 mb-3">
                Related case studies
              </p>
              <div className="space-y-0.5">
                {sector.cases.map((c) => (
                  <Link
                    key={c.n}
                    href={`/use-cases/${c.id}?fromSector=${encodeURIComponent(getSectorSlug(sector.sectorFilter ?? sector.label) ?? '')}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: sector.dot }}
                    />
                    <span className="text-[13px] text-white/80 flex-1 leading-tight group-hover:text-white transition-colors">
                      {c.t}
                    </span>
                    <span className="text-[10px] text-white/30 font-medium tracking-wider flex-shrink-0">
                      {c.n}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="border border-dashed border-white/10 rounded-2xl py-5 text-center text-[13px] text-white/20"
        >
          Hover or click a sector to see details
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Hero Sparks ──────────────────────────────────────────────────────────────

const HeroSparks: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 8 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        style={{ top: `${20 + i * 10}%`, width: '20%', opacity: 0 }}
        animate={{ left: ['-20%', '120%'], opacity: [0, 0.35, 0.35, 0] }}
        transition={{
          duration: 5 + (i % 3) * 2,
          repeat: Infinity,
          ease: 'linear',
          delay: i * 1.8,
        }}
      />
    ))}
  </div>
);

// ─── Flowing Wave ─────────────────────────────────────────────────────────────

const FlowingWave: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 -z-10">
    <svg className="w-full h-full">
      {[
        {
          d1: 'M-100 100 Q 50 150 200 100 T 500 150 T 800 100',
          d2: 'M-100 130 Q 50 80 200 130 T 500 80 T 800 130',
          stroke: '#4f7fff',
          sw: '2',
          dur: 10,
        },
        {
          d1: 'M-50 150 Q 80 200 250 150 T 550 200 T 850 150',
          d2: 'M-50 180 Q 80 130 250 180 T 550 130 T 850 180',
          stroke: '#7b9fff',
          sw: '1.5',
          dur: 14,
        },
        {
          d1: 'M-150 120 Q 30 170 180 120 T 480 170 T 780 120',
          d2: 'M-150 150 Q 30 100 180 150 T 480 100 T 780 150',
          stroke: '#4f7fff',
          sw: '1',
          dur: 18,
        },
      ].map((w, i) => (
        <motion.path
          key={i}
          animate={{ d: [w.d1, w.d2, w.d1] }}
          transition={{
            duration: w.dur,
            repeat: Infinity,
            ease: 'linear',
            delay: i,
          }}
          stroke={w.stroke}
          strokeWidth={w.sw}
          fill="transparent"
          opacity={0.6 - i * 0.15}
        />
      ))}
    </svg>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SectorsPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const orbitWrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const displayIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const displaySector = displayIdx !== null ? sectors[displayIdx] : null;

  const handleHover = useCallback((i: number | null) => {
    setHoveredIdx(i);
  }, []);

  const handleClick = useCallback((i: number) => {
    setActiveIdx((prev) => (prev === i ? null : i));
  }, []);

  const handleNavigate = useCallback(
    (i: number) => {
      const sector = sectors[i];
      const sectorSlug = getSectorSlug(sector.sectorFilter ?? sector.label);
      if (sector.sectorFilter && sector.sectorFilter !== 'All') {
        if (sectorSlug) {
          router.push(`/use-cases/sector/${sectorSlug}`);
          return;
        }
      } else {
        router.push('/use-cases');
        return;
      }

      router.push('/use-cases');
    },
    [router],
  );

  return (
    <div
      className="min-h-screen bg-[#0c1018] overflow-x-hidden selection:bg-blue-500 selection:text-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}
    >
      <WhatsAppButton />
      <ChatbotWidget />
      <Navbar />

      <main className="relative">
        {/* ── Hero ── */}
        <section className="relative pt-28 pb-24 md:pt-36 md:pb-40 text-center overflow-hidden">
          <FlowingWave />
          <HeroSparks />

          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-blue-400 border border-blue-500/28 bg-blue-500/12 rounded-full px-4 py-1.5 mb-7">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Structural Health Monitoring
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-[-0.01em] mb-10"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <span className="text-white">Zero-Failure </span>

                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  Infrastructure Intelligence
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                Real-time sensor networks, predictive analytics, and data-driven
                insights for infrastructure that never sleeps.
              </p>

              <div className="flex items-center justify-center gap-4 flex-wrap">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(79,127,255,0.2)',
                      '0 0 35px rgba(79,127,255,0.5)',
                      '0 0 20px rgba(79,127,255,0.2)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-full overflow-hidden"
                >
                  <Link
                    href="#sectors"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition-colors"
                  >
                    Explore sectors
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
                <Link
                  href="#case-studies"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/13 text-white/60 rounded-full text-sm hover:text-white hover:border-white/20 transition-colors"
                >
                  View case studies
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center justify-center gap-10 mt-16 flex-wrap"
              >
                {[
                  { num: '5', label: 'Sectors covered' },
                  { num: '10', label: 'Case studies' },
                  { num: '24/7', label: 'Live monitoring' },
                  { num: '<1s', label: 'Alert latency' },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <div className="w-px h-9 bg-white/13 hidden sm:block" />
                    )}
                    <div className="text-center">
                      <div
                        className="text-3xl font-bold text-white tracking-tight"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {s.num}
                      </div>
                      <div className="text-xs text-white/40 mt-1">
                        {s.label}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        {/* ── Sectors ── full-width dark band */}
        <section
          id="sectors"
          className="relative z-10 py-24"
          ref={orbitWrapRef}
          style={{
            background: `
    radial-gradient(circle at 50% 50%, rgba(79,127,255,0.08), transparent 60%),
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.08), transparent 50%),
    #0d1520
  `,
          }}
        >
          {/* Strobe canvas spans the full section */}
          <StrobeCanvas containerRef={orbitWrapRef} />
          {/* 🔥 Background FX Layer */}
          {/* 🔥 Background FX Layer */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />

            {/* Center glow */}
            <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 blur-[120px]" />

            {/* Left glow */}
            <div className="absolute left-[10%] top-[30%] w-[300px] h-[300px] bg-indigo-500/10 blur-[100px]" />

            {/* Right glow */}
            <div className="absolute right-[10%] top-[60%] w-[300px] h-[300px] bg-cyan-500/10 blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-[1100px] mx-auto px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              {/* Heading */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-white/40 mb-4">
                  <div className="w-5 h-px bg-white/20" />
                  Sectors
                </div>
                <h2
                  className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-3 text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Tailored for every sector
                </h2>
                <p className="text-white/50 text-base font-light max-w-xl leading-relaxed">
                  Beyond monitoring — explore how our SHM platform adapts across
                  industries and infrastructure types.
                </p>
              </div>

              {/* Orbit wheel + Preview panel side by side */}
              <div className="flex items-center gap-12 min-h-[580px]">
                <div className="flex-shrink-0">
                  <OrbitWheel
                    activeIdx={activeIdx}
                    hoveredIdx={hoveredIdx}
                    onHover={handleHover}
                    onClick={handleClick}
                    onNavigate={handleNavigate}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <PreviewPanel sector={displaySector} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        body {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
        }

        h1,
        h2,
        h3 {
          font-weight: 500; /* slight emphasis, not bold */
        }

        body {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
        }

        h1,
        h2,
        h3 {
          font-weight: 600;
        }

        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.88);
            opacity: 0.35;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.06);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
