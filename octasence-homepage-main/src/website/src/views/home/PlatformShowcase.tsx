'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import {
  TbActivity,
  TbAlertTriangle,
  TbBrain,
  TbCheck,
  TbMap2,
  TbShieldCheck,
} from 'react-icons/tb';

const sensorNodes = [
  { id: 1, x: 22, y: 38, label: 'Bridge A', status: 'ok', value: '98%' },
  { id: 2, x: 45, y: 55, label: 'Tunnel B', status: 'warn', value: '74%' },
  { id: 3, x: 68, y: 32, label: 'Dam C', status: 'ok', value: '95%' },
  { id: 4, x: 78, y: 65, label: 'Mine D', status: 'ok', value: '91%' },
  { id: 5, x: 35, y: 72, label: 'Tower E', status: 'ok', value: '88%' },
];

const alerts = [
  {
    time: '09:41',
    msg: 'Vibration threshold exceeded - Bridge A, Span 3',
    level: 'warn',
  },
  {
    time: '09:12',
    msg: 'AI model: Settlement trend detected - Tunnel B',
    level: 'info',
  },
  { time: '08:55', msg: 'All sensors nominal - Dam C', level: 'ok' },
];

const HeroSparks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(34,211,238,0.8)]"
        initial={{
          left: '-20%',
          top: `${18 + i * 10}%`,
          width: '20%',
          opacity: 0,
        }}
        animate={{
          left: '120%',
          opacity: [0, 0.4, 0.4, 0],
        }}
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

const FlowingWave = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 -z-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        initial={{ d: 'M-100 100 Q 50 150 200 100 T 500 150 T 800 100' }}
        animate={{
          d: [
            'M-100 100 Q 50 150 200 100 T 500 150 T 800 100',
            'M-100 130 Q 50 80 200 130 T 500 80 T 800 130',
            'M-100 100 Q 50 150 200 100 T 500 150 T 800 100',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        stroke="#22d3ee"
        strokeWidth="3"
        fill="transparent"
      />
      <motion.path
        initial={{ d: 'M-50 150 Q 80 200 250 150 T 550 200 T 850 150' }}
        animate={{
          d: [
            'M-50 150 Q 80 200 250 150 T 550 200 T 850 150',
            'M-50 180 Q 80 130 250 180 T 550 130 T 850 180',
            'M-50 150 Q 80 200 250 150 T 550 200 T 850 150',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        stroke="#0ea5e9"
        strokeWidth="2"
        fill="transparent"
        opacity="0.6"
      />
      <motion.path
        initial={{ d: 'M-150 120 Q 30 170 180 120 T 480 170 T 780 120' }}
        animate={{
          d: [
            'M-150 120 Q 30 170 180 120 T 480 170 T 780 120',
            'M-150 150 Q 30 100 180 150 T 480 100 T 780 150',
            'M-150 120 Q 30 170 180 120 T 480 170 T 780 120',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
          delay: 1,
        }}
        stroke="#67e8f9"
        strokeWidth="1.5"
        fill="transparent"
        opacity="0.4"
      />
    </svg>
  </div>
);

export default function PlatformShowcase() {
  return (
    <section
      className="relative overflow-hidden bg-transparent px-4 py-24"
      id="platform"
      aria-label="Platform showcase"
    >
      <FlowingWave />
      <HeroSparks />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs uppercase tracking-widest text-cyan-300">
            AI Monitoring Platform
          </span>
          <h2 className="text-3xl leading-tight text-white md:text-4xl">
            An intelligent infrastructure{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              monitoring platform
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Access and visualise real-time and historical structural health data
            across your infrastructure portfolio.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[28px] border border-cyan-400/10 bg-slate-950/60 shadow-[0_0_60px_rgba(8,47,73,0.35)] backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs tracking-wide text-slate-400">
              OctaSence - Infrastructure Health Dashboard
            </span>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
            <div className="border-r border-white/5 p-6 lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <TbMap2 className="h-5 w-5 text-cyan-400" />
                <span className="text-sm text-white">Sensor Network Map</span>
              </div>
              <div className="relative h-48 w-full overflow-hidden rounded-xl border border-cyan-400/10 bg-slate-950/80 md:h-64">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full border-t border-cyan-400/10"
                    style={{ top: `${(i + 1) * 16.66}%` }}
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full border-l border-cyan-400/10"
                    style={{ left: `${(i + 1) * 12.5}%` }}
                  />
                ))}

                <svg
                  className="absolute inset-0 h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {sensorNodes.map((n, i) =>
                    sensorNodes
                      .slice(i + 1, i + 2)
                      .map((m) => (
                        <line
                          key={`${n.id}-${m.id}`}
                          x1={`${n.x}%`}
                          y1={`${n.y}%`}
                          x2={`${m.x}%`}
                          y2={`${m.y}%`}
                          stroke="rgba(34,211,238,0.28)"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      )),
                  )}
                </svg>

                {sensorNodes.map((node) => (
                  <motion.div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div
                      className={`relative h-4 w-4 rounded-full border-2 ${
                        node.status === 'warn'
                          ? 'border-amber-300 bg-amber-400'
                          : 'border-emerald-300 bg-emerald-400'
                      }`}
                    >
                      {node.status === 'warn' && (
                        <div className="absolute inset-0 rounded-full bg-amber-400 opacity-40 animate-ping" />
                      )}
                    </div>
                    <div className="absolute -top-1 left-5 whitespace-nowrap rounded border border-cyan-400/10 bg-slate-900/90 px-1.5 py-0.5 text-[10px] text-white">
                      {node.label}: {node.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-cyan-400/10 bg-slate-950/70 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <TbBrain className="h-4 w-4 text-cyan-300" />
                    AI Confidence Score
                  </div>
                  <span className="text-sm text-emerald-400">94.7%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: '94.7%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <TbActivity className="h-5 w-5 text-cyan-400" />
                <span className="text-sm text-white">Alert Timeline</span>
              </div>
              <div className="space-y-3">
                {alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="flex gap-3 rounded-lg border border-cyan-400/10 bg-white/5 p-3"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {alert.level === 'warn' ? (
                        <TbAlertTriangle className="h-4 w-4 text-amber-400" />
                      ) : alert.level === 'ok' ? (
                        <TbCheck className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <TbShieldCheck className="h-4 w-4 text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {alert.msg}
                      </p>
                      <span className="text-[10px] text-slate-500">
                        {alert.time} AM
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: 'Sensors Online', value: '1,247' },
                  { label: 'Data Points/s', value: '84K' },
                  { label: 'Alerts Today', value: '3' },
                  { label: 'Uptime', value: '99.9%' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-cyan-400/10 bg-white/5 p-3"
                  >
                    <div className="text-lg text-cyan-300">{stat.value}</div>
                    <div className="mt-0.5 text-[10px] leading-tight text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-slate-500">
          From sensor streams {'->'}{' '}
          <span className="text-cyan-300">AI inference</span> {'->'}{' '}
          <span className="text-emerald-400">actionable insights</span>
        </p>

        <div className="mt-8 text-center">
          <Link href="/products-infrastructure-intelligence">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-cyan-400/20 bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-3 text-sm text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              Explore the Platform
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
