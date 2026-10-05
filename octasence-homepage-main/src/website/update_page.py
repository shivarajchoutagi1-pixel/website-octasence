import re

file_path = r"c:\Users\Hovarthanvishnu\Downloads\octasence-homepage\octasence-homepage-main\octasence-homepage-main\src\website\src\app\(main)\products-infrastructure-intelligence\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace modules array
modules_pattern = re.compile(r"const modules = \[.*?\];", re.DOTALL)

new_data = """const softwareProducts = [
  {
    title: 'PIIIE — Core Intelligence Engine',
    description: 'The physics-informed AI engine underlying every product. Risk indexing, anomaly detection, and forecasting across all connected sensor data — the layer every other product plugs into.',
    accent: '#2563EB'
  },
  {
    title: 'GeoIQ — Geotechnical Structures Monitoring',
    description: 'For dams, tailings facilities, and retaining/D-walls. Seepage and settlement dashboards, stability risk scoring, and breach early-warning — built to keep pace with regulator-grade reporting.',
    accent: '#0000FF'
  },
  {
    title: 'StructIQ — Structural Health Monitoring',
    description: 'For civil structures, tunnels, bridges, and metro systems. Real-time deformation dashboards, convergence tracking, and fatigue-trend analytics that catch progressive damage before it becomes failure.',
    accent: '#0EA5E9'
  },
  {
    title: 'HseIQ — OSHM Mining Monitoring',
    description: 'For open-cast and underground mining. Slope and pillar stability dashboards with evacuation-grade early-warning — designed for sites where minutes matter.',
    accent: '#6366F1'
  },
  {
    title: 'BlastIQ — Drill & Blast Intelligence',
    description: 'Blast design optimization, fragmentation analysis, and vibration-compliance dashboards fed directly by BlastSense hardware.',
    accent: '#2563EB'
  },
  {
    title: 'EnvIQ — Environmental & Climate Intelligence',
    description: 'Weather, air quality, fire-risk, and dust-dispersion monitoring in one early-warning dashboard — built for sites where climate and environmental exposure carry compliance risk.',
    accent: '#0000FF'
  },
  {
    title: 'VisionIQ — Multimodal Vision AI',
    description: 'The software layer for VisionEdge cameras and dash-cams. PPE compliance analytics, restricted-zone alerts, and machinery/fleet safety monitoring — vision AI that flags risk instead of just recording it.',
    accent: '#0EA5E9'
  },
  {
    title: 'MPLS Console — Missing Person & Lone Worker Tracking',
    description: 'Real-time location dashboards for SafeTag and VitalTag wearables, with automated escalation for missed check-ins or health anomalies.',
    accent: '#6366F1'
  },
  {
    title: 'BIM-Connect — BIM Intelligence',
    description: 'Links OctaSence sensor and risk data directly into your Building Information Models — design-stage and as-built structural intelligence in one place.',
    accent: '#2563EB'
  },
  {
    title: 'TwinCore — Digital Twin Platform',
    description: 'Live 2D/3D digital twins with AI-driven risk overlays, predictive "what-if" simulations, and full incident replay.',
    accent: '#0000FF'
  },
  {
    title: 'ComplianceHub — Regulatory & Audit Software',
    description: 'Automated DGMS/BIS/ISO/MoEF/CMR-OSR-aligned reporting, inspection logs, audit trails, and incident documentation — audit-ready, always.',
    accent: '#0EA5E9'
  }
];

const hardwareProducts = [
  {
    title: 'GeoSense — Geotechnical Monitoring Sensors',
    description: 'For dams, embankments, tailings facilities, and retaining/diaphragm walls:\\n- Piezometers (pore-pressure/seepage)\\n- Inclinometers / IPI (In-Place Inclinometers)\\n- Extensometers\\n- Crackmeters\\n- Tiltmeters\\n- Settlement sensors / settlement plates\\n- Total pressure cells\\n- Load cells',
    accent: '#2563EB'
  },
  {
    title: 'StructSense — SHM Sensor Suite',
    description: 'For civil structures, tunnels, bridges, and metro systems:\\n- Strain gauges\\n- Accelerometers\\n- Vibration sensors\\n- Tiltmeters\\n- Crack/displacement sensors\\n- LVDTs (linear displacement)\\n- Structural temperature sensors',
    accent: '#0000FF'
  },
  {
    title: 'PitSense — OSHM Mining Sensors',
    description: 'For open-cast and underground mining:\\n- Convergence sensors\\n- Stress cells\\n- Slope-movement sensors / slope radar targets\\n- Seismic sensors\\n- Ground-motion/microseismic nodes',
    accent: '#0EA5E9'
  },
  {
    title: 'BlastSense — Drill & Blast Monitoring Hardware',
    description: 'For drilling and blasting operations:\\n- Blast vibration monitors / seismographs\\n- Airblast (overpressure) sensors\\n- Fly-rock monitoring cameras',
    accent: '#6366F1'
  },
  {
    title: 'EnviroSense — Environmental Monitoring Sensors',
    description: 'For site-wide climate and hazard monitoring:\\n- Weather stations (wind, rainfall, humidity, temperature)\\n- Fire detection sensors\\n- Air-quality / dust concentration sensors\\n- Rain gauges',
    accent: '#2563EB'
  },
  {
    title: 'VisionEdge — Multimodal Vision AI Cameras',
    description: 'For industrial visual monitoring:\\n- Fixed AI vision cameras\\n- PTZ cameras\\n- Dash-cams (vehicle/fleet-mounted)\\n- Thermal/IR cameras\\n- Drone-mounted cameras',
    accent: '#0000FF'
  },
  {
    title: 'SafeTag — MPLS Tracking Tags',
    description: 'Wearable RFID/UWB/GPS tags for Missing Person & Lone Worker Tracking — real-time location and check-in status across underground and open-pit sites.',
    accent: '#0EA5E9'
  },
  {
    title: 'VitalTag — Personal OSHM Health Device',
    description: 'Wearable personal health and safety device — vitals, fatigue, and gas-exposure monitoring for individual workers, integrated with lone-worker alerting.',
    accent: '#6366F1'
  },
  {
    title: 'OADS Unit — Open-Air Acoustic Dust Settling System',
    description: 'Acoustic-based dust suppression hardware for open-cast mining and industrial sites — reduces airborne particulate without water-intensive suppression.',
    accent: '#2563EB'
  },
  {
    title: 'EdgeLink — IoT Connectivity Gateways',
    description: 'Edge gateways supporting LoRaWAN, mesh, and satellite backhaul — reliable data flow from remote and underground deployments back to the platform.',
    accent: '#0000FF'
  }
];"""

content = modules_pattern.sub(new_data, content)

# Replace GridModuleCard and TabbedModules
old_components_pattern = re.compile(r"// ============================================================\n// GRID MODULE CARD\n// ============================================================.*?// ============================================================\n// HOW IT WORKS — STEP\n// ============================================================", re.DOTALL)

new_components = """// ============================================================
// GRID MODULE CARD
// ============================================================
function GridModuleCard({
  mod,
  index,
}: {
  mod: { title: string; description: string; accent: string };
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0a0a14] group p-6 h-full"
      style={{
        boxShadow: hovered ? `0 0 40px ${mod.accent}22` : 'none',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-500"
        style={{
          boxShadow: hovered
            ? `inset 0 0 0 1.5px ${mod.accent}55`
            : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      />
      
      <h3
        className="text-lg text-white leading-tight mb-3 tracking-tight transition-colors duration-300 relative z-20 font-bold"
        style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.9)' }}
      >
        {mod.title}
      </h3>

      <p className="text-white/45 text-sm leading-relaxed relative z-20 whitespace-pre-line">
        {mod.description}
      </p>
    </motion.div>
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-[11px] px-4 py-1.5 rounded-full mb-6 tracking-[0.22em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            The Platform Behind Every OctaSence Deployment
          </div>
          <h2 className="text-3xl md:text-5xl text-white mb-6 tracking-[-0.02em] leading-[1.18]">
            One physics-informed AI engine. A full stack of iot sensing and intelligence software.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#6366F1]">
              Deployed as a single system, sold as standalone modules.
            </span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Every OctaSence product runs on PIIIE — the Physics-Informed Infrastructure Intelligence Engine — combining a 12-index proprietary risk suite with an 8-module AI suite for anomaly detection, forecasting, and autonomous alerting. Products come in two layers — SaaS software for intelligence and decision-making, and IoT hardware for sensing — sold standalone or bundled as a turnkey system.
          </p>
          <div className="w-24 h-[3px] bg-gradient-to-r from-blue-500 to-[#6366F1] mx-auto rounded-full mt-10" />
        </motion.div>

        {/* Software Suite */}
        <div className="mb-24">
          <div className="mb-10 text-center">
            <h3 className="text-2xl md:text-3xl text-white mb-4">Software — The IQ Suite</h3>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              Intelligence software that turns raw sensor data into risk scores, forecasts, and early warnings — for every asset class you monitor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {softwareProducts.map((mod, index) => (
              <GridModuleCard key={mod.title} mod={mod} index={index} />
            ))}
          </div>
        </div>

        {/* Hardware Suite */}
        <div>
          <div className="mb-10 text-center">
            <h3 className="text-2xl md:text-3xl text-white mb-4">Hardware — The Sense Suite</h3>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              Multimodal IoT sensing built for the field conditions our software has to make sense of — high vibration, high dust, low connectivity, underground and open-air alike.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hardwareProducts.map((mod, index) => (
              <GridModuleCard key={mod.title} mod={mod} index={index} />
            ))}
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}

// ============================================================
// HOW IT WORKS — STEP
// ============================================================"""

content = old_components_pattern.sub(new_components, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated successfully")
