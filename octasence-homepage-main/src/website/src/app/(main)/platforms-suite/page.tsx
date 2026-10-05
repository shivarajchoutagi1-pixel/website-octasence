'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Cpu, Brain, Database, Layers, ArrowRight, Shield, Zap, Activity, Globe } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ProductAdvantage {
  title: string;
  text: string;
}

interface Product {
  id: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  quote: string;
  description: string[];
  advantages: ProductAdvantage[];
  image: string;
  accent: string;
  glowClass: string;
  gradient: string;
}

const ProductSuitePage = () => {
  const products: Product[] = [
    {
      id: 'smart-sensors',
      title: 'Smart Sensors',
      tagline: 'Always-On Monitoring',
      icon: Cpu,
      quote: `"Built for the places other sensors simply give up."`,
      description: [
        'When the network drops, when the dust settles in, when the temperature swings 40 degrees overnight — our sensors keep recording. No excuses, no gaps in the data.',
        "Most monitoring systems weren't built for the places we work in. Underground mines, active dam faces, deep tunnels — these aren't server rooms. They're loud, wet, explosive-rated, and often completely cut off from any network signal. That's exactly where our sensors are designed to live. They don't need a stable connection to keep recording. They don't need a technician on-site to stay calibrated. Once they're in, they just work — through dust, flooding, pressure shifts, and years of continuous operation.",
      ],
      advantages: [
        {
          title: 'Always-On, Even Offline',
          text: "Edge computing built right into the device means your data never stops — even when connectivity does. In remote mines and deep tunnels, that's not a feature. That's the whole point.",
        },
        {
          title: 'A Network That Heals Itself',
          text: 'Over 500 sensor nodes talk to each other over LoRaWAN mesh. If one drops out, the rest reroute automatically. Your monitoring stays intact without a single call to the field.',
        },
        {
          title: 'One Device, Every Signal',
          text: "Strain. Vibration. Pressure. Convergence. Temperature. You're not buying five different sensors. It all comes from one rugged unit with a single unified data stream.",
        },
        {
          title: 'Certified for Where You Work',
          text: 'IP68-rated. ATEX-certified. Cleared for explosive atmospheres and submersion. 95% of our sensors are still active after 5 years in the field — without a single maintenance visit.',
        },
      ],
      accent: '#3b82f6',
      glowClass: 'bg-blue-500/20',
      gradient: 'from-blue-500/20 to-transparent',
      image: '/platform-image/smart-sensors.jpeg',
    },
    {
      id: 'ai-platform',
      title: 'AI Platform',
      tagline: 'Predictive Structural Intelligence',
      icon: Brain,
      quote: `"It doesn't wait for something to go wrong. It sees it coming."`,
      description: [
        "Most systems tell you what happened. Ours tells you what's about to happen — and gives you enough time to do something about it.",
        "OctaSence's agentic AI layer continuously ingests sensor streams, refines its predictive models autonomously, and forecasts high-risk structural events — from pillar collapse to tailing dam seepage — hours or days before they occur, without any manual inspection. It watches everything, all the time. Not just flagging spikes, but actually learning the normal behaviour of your specific site — the way your dam wall moves after rainfall, the vibration signature of your tunnel during blasting, the slow creep of a slope that's been gradually shifting for weeks.",
      ],
      advantages: [
        {
          title: 'It Learns Your Site',
          text: 'Generic thresholds miss context. Our AI builds a behavioural baseline specific to your asset — your dam, your tunnel, your slope — and flags deviations a fixed rule would never catch.',
        },
        {
          title: '48 Hours Ahead of Failure',
          text: 'On average, our early warning system surfaces critical risk signals 48 hours before a structural event. That window has already prevented evacuations, equipment losses, and worse.',
        },
        {
          title: 'No One Has to Be Watching',
          text: '97% anomaly detection accuracy, running 24 hours a day, 7 days a week. The platform monitors continuously so your team can focus on decisions — not dashboards.',
        },
        {
          title: 'Reports That Write Themselves',
          text: "Every alert and reading is automatically formatted into compliance-ready documentation. When the regulator asks, you're ready — without anyone staying late to compile a report.",
        },
      ],
      accent: '#6366f1',
      glowClass: 'bg-indigo-500/20',
      gradient: 'from-indigo-500/20 to-transparent',
      image: '/platform-image/ai-platform.jpeg',
    },
    {
      id: 'data-api',
      title: 'Data API',
      tagline: 'Infinite Integration',
      icon: Database,
      quote: `"Your systems, your workflows — just with live structural intelligence flowing through them."`,
      description: [
        "We built the API for teams who already have tools they trust. You shouldn't have to move into our platform to get value out of your sensor network.",
        'The OctaSence Data API exposes raw sensor streams, processed analytics, and AI-generated risk scores via simple RESTful endpoints and low-latency WebSocket channels. It enables your engineering teams, SCADA systems, or third-party platforms to consume live structural intelligence directly — without changing how your team already works. Pull live readings from any sensor on any site. Get the AI risk scores alongside the raw numbers. Set up webhooks so your own systems get notified the moment an alert fires.',
      ],
      advantages: [
        {
          title: 'Real-Time Streams, No Compromise',
          text: "WebSocket connections deliver live sensor data with sub-100ms latency. Whether you're feeding a SCADA system or a custom dashboard, the data arrives fast enough to actually matter.",
        },
        {
          title: 'Risk Scores Alongside Raw Numbers',
          text: "Every API response includes the AI-generated risk score, not just the raw reading. You're not getting data — you're getting data with a verdict attached.",
        },
        {
          title: 'Instant Alerts, Your Way',
          text: 'Register a webhook and your own systems get notified the moment an alert fires. No polling, no delays — just an immediate signal straight to where your team already works.',
        },
        {
          title: 'Built for Developers, Trusted by Security',
          text: 'OpenAPI 3.0 spec. Python and JavaScript SDKs. OAuth 2.0 authentication. 99.9% uptime SLA. The kind of integration that passes a security review without a fight.',
        },
      ],
      accent: '#06b6d4',
      glowClass: 'bg-cyan-500/20',
      gradient: 'from-cyan-500/20 to-transparent',
      image: '/platform-image/data-api.jpeg',
    },
    {
      id: 'digital-twin',
      title: 'Digital Twin',
      tagline: 'Live 3D Visualization',
      icon: Layers,
      quote: `"Not a model of what your asset looked like when it was built. A model of what it looks like right now."`,
      description: [
        "Numbers in a spreadsheet tell you something changed. The digital twin shows you exactly where, exactly how much, and exactly where it's heading next.",
        "Every asset we monitor gets a live 3D model — geo-referenced, layered with real subsurface data, and updated in real time from the sensor network. You can rotate it, zoom into any section, and see exactly where stress is building, where movement is happening, and how quickly things are changing. The heatmaps update every second. When a zone shifts from stable to amber, you see it immediately — not in a report the next morning. What makes it more than a visualisation is the simulation layer. You can run scenarios directly in the model — test loading conditions, failure progressions, and excavation plans before committing to anything in the real world.",
      ],
      advantages: [
        {
          title: 'A Living 3D Model, Every Second',
          text: 'Your asset geo-referenced, layered with real subsurface data, reflecting live sensor input — refreshing every single second. When a zone shifts to at-risk, you see it before it reaches your inbox.',
        },
        {
          title: 'Run the Scenario Before the Risk',
          text: 'What happens if you advance the tunnel face 20 metres? Test it in the twin first. Unlimited simulations, zero real-world consequences, complete audit trail of every scenario run.',
        },
        {
          title: 'Everyone Sees the Same Picture',
          text: 'A geotechnical engineer on-site and a risk director at head office can look at the same live model simultaneously — in a browser, no software to install, no version conflicts.',
        },
        {
          title: 'Heatmaps That Tell the Whole Story',
          text: 'Deformation zones, stress concentrations, risk layers — all colour-coded on the 3D model. 80% of structural risks our clients acted on were first spotted in the heatmap view.',
        },
      ],
      accent: '#10b981',
      glowClass: 'bg-emerald-500/20',
      gradient: 'from-emerald-500/20 to-transparent',
      image: '/platform-image/digital-twin.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="relative pt-40 pb-20">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-600/5 blur-[120px]" />
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-32 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs px-4 py-1.5 rounded-full mb-8 tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Empowering Infrastructure
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.95]">
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Platforms</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              A comprehensive intelligence ecosystem designed for zero failures in the most demanding environments on Earth.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">
              {products.map((product, pIdx) => (
                <motion.a
                  key={product.id}
                  href={`#${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + pIdx * 0.1 }}
                  className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                      <product.icon 
                        className="w-7 h-7" 
                        style={{ color: product.accent }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-y-[-2px] transition-transform">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                      {product.tagline}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                      Explore Series <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Product Sections */}
        {products.map((product, index) => (
          <section
            key={product.id}
            id={product.id}
            className="relative py-32 border-t border-white/5"
          >
            <div className="container mx-auto px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1 }}
                className="relative p-8 md:p-16 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl overflow-hidden group/supercard"
              >
                {/* Background Dynamic Glow */}
                <div className={`absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br ${product.gradient} opacity-10 blur-[120px] group-hover/supercard:opacity-20 transition-opacity duration-1000`} />
                <div className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr ${product.gradient} opacity-5 blur-[100px]`} />

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Text Content Column */}
                  <div className="relative z-10">
                    <div className="relative mb-12 group/title">
                      <div className="absolute -left-6 top-0 w-1.5 h-full rounded-full" 
                           style={{ backgroundColor: product.accent }} />
                      <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                           <product.icon className="w-5 h-5" style={{ color: product.accent }} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{product.tagline}</span>
                      </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6" style={{ color: product.accent }}>
                      {product.title.split(' ')[0]} <br />
                      <span className="opacity-50 blur-[0.5px]">{product.title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                  </div>

                  <blockquote className="relative mb-12 pl-8 border-l-2 border-white/10">
                    <p className="text-2xl md:text-3xl font-medium text-white/90 leading-snug italic">
                      {product.quote.replace(/"/g, '')}
                    </p>
                  </blockquote>

                  <div className="space-y-8 text-gray-400 leading-relaxed text-lg max-w-xl">
                    {product.description.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>

                  {/* Advantages Grid Column */}
                  <div className="relative z-10 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.advantages.map((adv, aIdx) => (
                        <motion.div
                          key={aIdx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: aIdx * 0.1 }}
                          className="group/adv relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
                        >
                          <div className="mb-8 flex justify-between items-start">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover/adv:bg-white/10 transition-colors">
                              <Shield className="w-5 h-5" style={{ color: product.accent }} />
                            </div>
                            <span className="text-5xl font-black opacity-[0.03] group-hover/adv:opacity-10 transition-opacity italic" style={{ color: product.accent }}>
                              {aIdx + 1}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-3">
                            {adv.title}
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 group-hover/adv:text-gray-400 transition-colors">
                            {adv.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Product Visual Image */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="relative mt-8 group/img"
                    >
                      <div 
                        className="absolute inset-x-0 bottom-0 h-1/2 blur-3xl opacity-20 transition-opacity duration-1000 group-hover/img:opacity-40" 
                        style={{ backgroundColor: product.accent }}
                      />
                      <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform"
                          style={{ transitionDuration: '1500ms' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Glass Overlay on hover */}
                        <div className="absolute inset-0 bg-white/0 group-hover/img:bg-white/[0.02] transition-colors duration-500 pointer-events-none" />
                      </div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Section Divider/Transition */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </section>
        ))}

      </main>

      <Footer />
      <WhatsAppButton />
      <ChatbotWidget />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap');
        
        :root {
          --font-outfit: 'Outfit', sans-serif;
          scroll-behavior: smooth;
        }

        body {
          font-family: var(--font-outfit);
          background-color: #020617;
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4 {
          font-family: var(--font-outfit);
        }

        /* Custom Scrollbar for dark theme */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default ProductSuitePage;
