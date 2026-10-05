'use client';

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import ChatbotWidget from '@/components/ChatbotWidget';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';

import screenshot413 from './images/Screenshot (413).png';
import screenshot414 from './images/Screenshot (414).png';
import screenshot415 from './images/Screenshot (415).png';
import screenshot416 from './images/Screenshot (416).png';
import screenshot417 from './images/Screenshot (417).png';
import screenshot418 from './images/Screenshot (418).png';
import screenshot419 from './images/Screenshot (419).png';
import screenshot420 from './images/Screenshot (420).png';
import screenshot421 from './images/Screenshot (421).png';
import screenshot422 from './images/Screenshot (422).png';
import ss from './images/ss.png';
import miningImage from './images1/c90a154e-72b5-4e13-a9c1-6ae53cf3a38d-2048x1143.jpg';
import blastingImage from './images1/Drill-Blast.jpg';
import environmentalImage from './images1/envi.jpg';
import geotechnicalImage from './images1/Geotechnical-Hero-scaled.jpg';
import connectivityImage from './images1/iot.jpg';
import trackingImage from './images1/mpls.jpg';
import structuralImage from './images1/OIP.jpg';
import dustSuppressionImage from './images1/open air.jpg';
import personalHealthImage from './images1/p health.jpg';
import visionImage from './images1/vision.jpg';

// ============================================================
// DATA
// ============================================================

const softwareProducts = [
  {
    title: 'PIIIE — Core Intelligence Engine',
    description: `The physics-informed AI engine underlying every product. Risk indexing, anomaly detection, and forecasting across all connected sensor data — the layer every other product plugs into.`,
    accent: '#2563EB',
    image: screenshot413,
  },
  {
    title: 'GeoIQ — Geotechnical Structures Monitoring',
    description: `For dams, tailings facilities, and retaining/D-walls. Seepage and settlement dashboards, stability risk scoring, and breach early-warning — built to keep pace with regulator-grade reporting.`,
    accent: '#0000FF',
    image: screenshot414,
  },
  {
    title: 'StructIQ — Structural Health Monitoring',
    description: `For civil structures, tunnels, bridges, and metro systems. Real-time deformation dashboards, convergence tracking, and fatigue-trend analytics that catch progressive damage before it becomes failure.`,
    accent: '#0EA5E9',
    image: screenshot415,
  },
  {
    title: 'HseIQ — OSHM Monitoring',
    description: `AI-powered Structural Health Monitoring system that continuously analyzes sensor data to detect anomalies, predict structural failures, and ensure the safety of bridges and tunnels.`,
    accent: '#6366F1',
    image: screenshot416,
  },
  {
    title: 'BlastIQ — Drill & Blast Intelligence',
    description: `Blast design optimization, fragmentation analysis, and vibration-compliance dashboards fed directly by BlastSense hardware.`,
    accent: '#2563EB',
    image: screenshot417,
  },
  {
    title: 'EnvIQ — Environmental & Climate Intelligence',
    description: `Weather, air quality, fire-risk, and dust-dispersion monitoring in one early-warning dashboard — built for sites where climate and environmental exposure carry compliance risk.`,
    accent: '#0000FF',
    image: screenshot418,
  },
  {
    title: 'VisionIQ — Multimodal Vision AI',
    description: `The software layer for VisionEdge cameras and dash-cams. PPE compliance analytics, restricted-zone alerts, and machinery/fleet safety monitoring — vision AI that flags risk instead of just recording it.`,
    accent: '#0EA5E9',
    image: ss,
  },
  {
    title: 'MPLS Console — Missing Person & Lone Worker Tracking',
    description: `Real-time location dashboards for SafeTag and VitalTag wearables, with automated escalation for missed check-ins or health anomalies.`,
    accent: '#6366F1',
    image: screenshot420,
  },
  {
    title: 'BIM-Connect — BIM Intelligence',
    description: `Links OctaSence sensor and risk data directly into your Building Information Models — design-stage and as-built structural intelligence in one place.`,
    accent: '#2563EB',
    image: screenshot419,
  },
  {
    title: 'TwinCore — Digital Twin Platform',
    description: `Live 2D/3D digital twins with AI-driven risk overlays, predictive "what-if" simulations, and full incident replay.`,
    accent: '#0000FF',
    image: screenshot421,
  },
  {
    title: 'ComplianceHub — Regulatory & Audit Software',
    description: `Automated DGMS/BIS/ISO/MoEF/CMR-OSR-aligned reporting, inspection logs, audit trails, and incident documentation — audit-ready, always.`,
    accent: '#0EA5E9',
    image: screenshot422,
  },
];

const hardwareProducts = [
  {
    title: 'GeoSense — Geotechnical Monitoring Sensors',
    description: `For Geo surface and retaining/diaphragm walls:
- Piezometers (pore-pressure/seepage)
- Inclinometers / IPI (In-Place Inclinometers)
- Extensometers
- Crackmeters
- Tiltmeters
- Settlement sensors / settlement plates
- Total pressure cells
- Load cells`,
    accent: '#2563EB',
    image: geotechnicalImage,
  },
  {
    title: 'StructSense — SHM Sensor Suite',
    description: `For civil structures, tunnels, bridges, and metro systems:
- Strain gauges
- Accelerometers
- Vibration sensors
- Tiltmeters
- Crack/displacement sensors
- LVDTs (linear displacement)
- Structural temperature sensors`,
    accent: '#0000FF',
    image: structuralImage,
  },
  {
    title: 'PitSense — OSHM Mining Sensors',
    description: `For open-cast and underground mining:
- Convergence sensors
- Stress cells
- Slope-movement sensors / slope radar targets
- Seismic sensors
- Ground-motion/microseismic nodes`,
    accent: '#0EA5E9',
    image: miningImage,
  },
  {
    title: 'BlastSense — Drill & Blast Monitoring Hardware',
    description: `For drilling and blasting operations:
- Blast vibration monitors / seismographs
- Airblast (overpressure) sensors
- Fly-rock monitoring cameras`,
    accent: '#6366F1',
    image: blastingImage,
  },
  {
    title: 'EnviroSense — Environmental Monitoring Sensors',
    description: `For site-wide climate and hazard monitoring:
- Weather stations (wind, rainfall, humidity, temperature)
- Fire detection sensors
- Air-quality / dust concentration sensors
- Rain gauges`,
    accent: '#2563EB',
    image: environmentalImage,
  },
  {
    title: 'VisionEdge — Multimodal Vision AI Cameras',
    description: `For industrial visual monitoring:
- Fixed AI vision cameras
- PTZ cameras
- Dash-cams (vehicle/fleet-mounted)
- Thermal/IR cameras
- Drone-mounted cameras`,
    accent: '#0000FF',
    image: visionImage,
  },
  {
    title: 'SafeTag — MPLS Tracking Tags',
    description: `Wearable RFID/UWB/GPS tags for Missing Person & Lone Worker Tracking — real-time location and check-in status across underground and open-pit sites.`,
    accent: '#0EA5E9',
    image: trackingImage,
  },
  {
    title: 'VitalTag — Personal OSHM Health Device',
    description: `Wearable personal health and safety device — vitals, fatigue, and gas-exposure monitoring for individual workers, integrated with lone-worker alerting.`,
    accent: '#6366F1',
    image: personalHealthImage,
  },
  {
    title: 'OADS Unit — Open-Air Acoustic Dust Settling System',
    description: `Acoustic-based dust suppression hardware for open-cast mining and industrial sites — reduces airborne particulate without water-intensive suppression.`,
    accent: '#2563EB',
    image: dustSuppressionImage,
  },
  {
    title: 'EdgeLink — IoT Connectivity Gateways',
    description: `Edge gateways supporting LoRaWAN, mesh, and satellite backhaul — reliable data flow from remote and underground deployments back to the platform.`,
    accent: '#0000FF',
    image: connectivityImage,
  },
];

const howSteps = [
  {
    number: '1',
    title: 'Sensors Capture Field Data',
    description:
      'Multimodal sensors continuously capture deformation, vibration, groundwater, pressure, temperature, and displacement across critical structures.',
    icon: '📡',
  },
  {
    number: '2',
    title: 'Data Processing Layer',
    description:
      'Edge devices clean, validate, and preprocess data locally, ensuring reliability and continuity even in low-connectivity environments.',
    icon: '⚡',
  },
  {
    number: '3',
    title: 'AI Prediction Layer',
    description:
      'Autonomous AI agents analyze patterns, forecast risk progression, and compute real-time structural stability scores.',
    icon: '🧠',
  },
  {
    number: '4',
    title: 'Digital Twin & Dashboards',
    description:
      'Live 2D and 3D dashboards translate AI insights into intuitive views of structural health and risk zones.',
    icon: '🖥️',
  },
  {
    number: '5',
    title: 'Act with Intelligent Alerts',
    description:
      'Context-aware alerts automatically notify teams and command centers through predefined escalation workflows.',
    icon: '🔔',
  },
  {
    number: '6',
    title: 'Reports & Continuous Learning',
    description:
      'AI models retrain using historical trends and new incidents, improving accuracy and prediction lead time over time.',
    icon: '📊',
  },
];

// ============================================================
// HERO SPARKS
// ============================================================
const HeroSparks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)',
          top: `${15 + i * 14}%`,
          width: '15%',
        }}
        initial={{ left: '-20%', opacity: 0 }}
        animate={{ left: '120%', opacity: [0, 0.5, 0.5, 0] }}
        transition={{
          duration: 5 + (i % 3) * 2,
          repeat: Infinity,
          ease: 'linear',
          delay: i * 1.6,
        }}
      />
    ))}
  </div>
);

// ============================================================
// HERO
// ============================================================
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Parallax BG */}
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          backgroundImage: "url('/assets/images/products-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      <HeroSparks />

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Next-Gen AI Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-[-0.01em] mb-10">
            Agentic AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0000FF]">
              Infrastructure
            </span>{' '}
            Intelligence
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/75 max-w-3xl mx-auto mb-10 leading-relaxed">
            From sensing to prediction to action.
          </p>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-[#0000FF] text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-900/40 text-base"
            >
              Request Demo
            </Link>
            <Link
              href="/solutions-infrastructure-intelligence"
              className="flex items-center gap-2 text-white/80 hover:text-white text-base transition-colors duration-200 group"
            >
              Explore Solutions
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Deep multi-stop fade into the dark modules section */}
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #07070f 0%, #07070fcc 40%, #07070f66 65%, transparent 100%)',
        }}
      />
    </section>
  );
}

// ============================================================
// TIMELINE NODE COMPONENT
// ============================================================
function TimelineNode({
  mod,
  index,
  isActive,
  onClick,
  withImages = false,
}: {
  mod: {
    title: string;
    description: string;
    accent: string;
    image?: StaticImageData | string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
  withImages?: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex w-full items-start justify-center mb-10 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {withImages ? (
        <div className="w-1/2 hidden md:flex justify-center items-center">
          <div className="w-full max-w-[520px] p-2 md:p-3">
            <div className="overflow-hidden rounded-2xl border border-blue-500/70 bg-[#0a0a14] shadow-[0_0_30px_rgba(37,99,235,0.35)]">
              <Image
                src={mod.image ?? ss}
                alt={`${mod.title} preview`}
                width={900}
                height={600}
                className="block h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-1/2 hidden md:block" />
      )}

      {/* Central Line & Dot */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 flex justify-center">
        <motion.div
          className="absolute top-6 w-4 h-4 rounded-full border-2 border-[#0a0a14] z-10 cursor-pointer"
          style={{
            backgroundColor: isActive ? mod.accent : '#555',
            boxShadow: isActive ? `0 0 20px ${mod.accent}` : 'none',
          }}
          onClick={onClick}
          whileHover={{ scale: 1.3 }}
        />
      </div>

      {/* Content Card */}
      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
      >
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0a0a14] cursor-pointer group p-6"
          style={{
            boxShadow: isActive ? `0 0 40px ${mod.accent}33` : 'none',
            borderColor: isActive ? mod.accent : 'rgba(255,255,255,0.07)',
          }}
          onClick={onClick}
          whileHover={{ scale: 1.02 }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-500"
            style={{
              boxShadow: isActive ? `inset 0 0 0 1px ${mod.accent}` : 'none',
            }}
          />
          <h3
            className="text-xl md:text-2xl leading-tight tracking-tight transition-colors duration-300 relative z-20 font-bold"
            style={{ color: isActive ? mod.accent : '#fff' }}
          >
            {mod.title}
          </h3>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <p className="text-white/70 text-base leading-relaxed relative z-20 whitespace-pre-line text-left">
                  {mod.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================
// SNAKE TIMELINE CONTAINER
// ============================================================
function SnakeTimeline({
  items,
  withImages = false,
}: {
  items: any[];
  withImages?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="relative py-10 max-w-5xl mx-auto">
      {/* Central faded line for mobile and desktop */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

      {items.map((mod, index) => (
        <TimelineNode
          key={mod.title}
          mod={mod}
          index={index}
          isActive={activeIndex === index}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          withImages={withImages}
        />
      ))}
    </div>
  );
}

// ============================================================
// PRODUCT MODULES SECTION
// ============================================================
function TabbedModules() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section
      className="py-32 bg-[#07070f] relative overflow-hidden"
      style={{ marginTop: '-1px' }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full blur-[100px] opacity-10 bg-blue-600 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#07070f]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-[11px] px-4 py-1.5 rounded-full mb-6 tracking-[0.22em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            The Platform Behind Every OctaSence Deployment
          </div>
          <h2 className="text-3xl md:text-5xl text-white mb-6 tracking-[-0.02em] leading-[1.18]">
            One physics-informed AI engine.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#6366F1] mt-4 inline-block">
              Deployed as a single system, sold as standalone modules.
            </span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Every OctaSence product runs on PIIIE — the Physics-Informed
            Infrastructure Intelligence Engine — combining a 12-index
            proprietary risk suite with an 8-module AI suite for anomaly
            detection, forecasting, and autonomous alerting. Products come in
            two layers — SaaS software for intelligence and decision-making, and
            IoT hardware for sensing — sold standalone or bundled as a turnkey
            system.
          </p>
          <div className="w-24 h-[3px] bg-gradient-to-r from-blue-500 to-[#6366F1] mx-auto rounded-full mt-12" />
        </motion.div>

        {/* Software Suite */}
        <div className="mb-32">
          <div className="mb-16 text-center">
            <h3 className="text-4xl md:text-6xl text-blue-500 font-black mb-6">
              Software — The IQ Suite
            </h3>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
              Intelligence software that turns raw sensor data into risk scores,
              forecasts, and early warnings — for every asset class you monitor.
            </p>
          </div>
          <SnakeTimeline items={softwareProducts} withImages />
        </div>

        {/* Hardware Suite */}
        <div>
          <div className="mb-16 text-center">
            <h3 className="text-4xl md:text-6xl text-blue-500 font-black mb-6">
              Hardware — The Sense Suite
            </h3>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
              Multimodal IoT sensing built for the field conditions our software
              has to make sense of — high vibration, high dust, low
              connectivity, underground and open-air alike.
            </p>
          </div>
          <SnakeTimeline items={hardwareProducts} withImages />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}

// ============================================================
// HOW IT WORKS — STEP
// ============================================================
function HowStep({
  step,
  index,
}: {
  step: (typeof howSteps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-400 group cursor-default"
    >
      {/* Number circle */}
      <div className="relative flex-shrink-0">
        <motion.div
          animate={
            hovered
              ? { scale: 1.15, backgroundColor: '#0000FF' }
              : { scale: 1, backgroundColor: '#EEF2FF' }
          }
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl"
          style={{ color: hovered ? '#fff' : '#0000FF' }}
        >
          {step.number}
        </motion.div>
        {/* Connector line — not on last */}
        {index < howSteps.length - 1 && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-blue-200 to-transparent" />
        )}
      </div>

      <div className="pt-1">
        <h4 className="text-lg text-white mb-2 tracking-tight">{step.title}</h4>
        <p className="text-white/70 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================
// REUSABLE IMAGE PANEL
// ============================================================
function HowImage({
  src,
  alt,
  gradientFrom,
  gradientTo,
  delay = 0,
}: {
  src: string;
  alt: string;
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl group h-fit"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />
      <Image
        src={src}
        alt={alt}
        width={900}
        height={600}
        className="relative block w-full h-auto opacity-100 transition-transform duration-700 group-hover:scale-[1.01]"
      />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  );
}

// ============================================================
// HOW OCTASENCE WORKS SECTION
// ============================================================
function HowItWorks() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  const stepsTop = howSteps.slice(0, 3); // 1–3
  const stepsBottom = howSteps.slice(3, 6); // 4–6

  return (
    <section className="py-32 bg-gray-950 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 bg-blue-600" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Workflow
          </div>
          <h2 className="text-4xl md:text-6xl text-white mb-6 tracking-tight leading-[1.1]">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#6366F1]">
              OctaSence
            </span>{' '}
            Works
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From sensing to prediction to action — continuously.
          </p>
          <div className="w-24 h-2.5 bg-gradient-to-r from-blue-500 to-[#6366F1] mx-auto rounded-full mt-10" />
        </motion.div>

        {/* ── ROW 1: Image left | Steps 1–3 right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-10">
          <HowImage
            src="/assets/images/new.avif"
            alt="OctaSence Sensing Architecture"
            gradientFrom="#0a0a1a"
            gradientTo="#0d1b4b"
            delay={0}
          />
          <div className="flex flex-col gap-1 justify-center">
            {stepsTop.map((step, i) => (
              <HowStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* ── ROW 2: Steps 4–6 left | Image right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="flex flex-col gap-1 justify-center">
            {stepsBottom.map((step, i) => (
              <HowStep key={step.number} step={step} index={i + 3} />
            ))}
          </div>
          <HowImage
            src="/assets/images/new2.avif"
            alt="OctaSence Digital Twin Dashboard"
            gradientFrom="#0d1033"
            gradientTo="#1a0a3b"
            delay={0.1}
          />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <Link
            href="/contact"
            className="inline-block px-14 py-5 bg-[#0000FF] text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/40"
          >
            Request a Live Demo
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================
export default function HomePage() {
  return (
    <div className="products-page min-h-screen bg-white selection:bg-[#0000FF] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        <Hero />
        <TabbedModules />
        <HowItWorks />
      </main>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap');
        .products-page,
        .products-page * {
          font-family: 'Outfit', sans-serif;
        }
        body {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>
      <WhatsAppButton />
      <ChatbotWidget />
    </div>
  );
}
