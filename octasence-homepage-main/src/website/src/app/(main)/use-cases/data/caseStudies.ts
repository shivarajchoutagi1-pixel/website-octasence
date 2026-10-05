export interface CaseStudy {
  id: string;
  number: number;
  tag: string;
  sector: string;
  title: string;
  subtitle: string;
  summary: string;
  heroColor: string;
  image: string;

  background: string;
  technicalProblem?: string;
  geotechnicalChallenge?: string;
  failureMechanisms?: string;
  monitoringStrategy?: string;
  monitoringDesign?: string;
  leakPhysics?: string;

  sensorDeployment: { name: string; detail: string }[];

  aiModel?: string;
  aiDetection?: string;
  predictiveMaintenance?: string;
  operationalIntegration?: string;
  digitalTwin?: string;
  digitalTwinArchitecture?: string;
  crossDomainIntegration?: string;
  decisionSupport?: string;
  realTimeRisk?: string;
  anomalyDetection?: string;
  workerAlert?: string;
  technicalInnovation?: string;
  lessonsLearned?: string;

  outcomes: string[];
  stats?: { value: string; label: string }[];
  deploymentSnapshot?: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'open-pit-mine-slope',
    number: 1,
    tag: 'Mining',
    sector: 'Mining',
    title: 'Open-Pit Mine Slope Failure Prevention',
    subtitle:
      'Predictive geotechnical monitoring for a 420-metre open-pit copper mine in sub-Saharan Africa.',
    heroColor: '#1a2f1a',
    image: '/assets/images/case-studies/cs1.jpeg',
    summary:
      'A major copper mining operation in Zambia faced chronic slope instability challenges across a 420 m deep open-pit mine. OctaSense deployed a dense geotechnical sensor network combined with a multi-variate AI model to provide continuous slope stability assessment and early warning — reducing unplanned downtime and preventing two imminent slope failures.',
    background:
      'The Nchanga open-pit mine, operated by a Tier-1 copper producer, processes over 6 million tonnes of ore annually. The pit walls — composed of alternating schist, quartzite, and shale — had experienced three significant bench failures in the preceding five years, each requiring month-long recovery operations costing an estimated $4–12M per event.\n\nThe existing manual slope monitoring regime relied on fortnightly surveying with a single robotic total station and periodic piezometer readings. This approach provided insufficient temporal resolution to detect the rapid onset of failure precursors, particularly during the wet season when pore pressure fluctuations are most pronounced.',
    geotechnicalChallenge:
      'The pit operates in a complex hydrogeological environment where pit-wall de-watering is impeded by inter-bedded low-permeability shale layers. Pore pressures can spike by 40–60 kPa within 24 hours of heavy rainfall events, which dramatically reduces effective stress on the failure planes.\n\nThe primary failure mode is bi-planar wedge failure controlled by two conjugate joint sets dipping at 35° and 58°. Secondary rotational slumps are also possible in the weathered upper benches. The challenge was to differentiate normal elastic deformation from irreversible plastic creep — the latter being the reliable precursor to collapse.',
    failureMechanisms:
      'Three interconnected failure mechanisms were identified:\n\n1. Pore Pressure Surge: Rapid rainfall infiltration through tension cracks raises phreatic surface, reducing effective normal stress on joint planes.\n2. Progressive Creep: Sustained shear displacement accumulates along the critical joint set until residual friction angle is reached.\n3. Blast Vibration Fatigue: Repeated production blasting degrades intact rock bridges between discontinuities, reducing the Factor of Safety (FoS) over time.\n\nThe OctaSense model integrates all three drivers into a unified risk score.',
    sensorDeployment: [
      {
        name: 'MEMS Inclinometers',
        detail:
          '32 units installed at 15 m depth intervals across 8 monitoring arrays — providing mm-resolution tilt data every 15 minutes.',
      },
      {
        name: 'Piezometers',
        detail:
          '18 vibrating-wire piezometers installed in 6 boreholes to track pore pressure changes in real time.',
      },
      {
        name: 'Robotic Total Stations',
        detail:
          '4 motor-driven total stations scanning 240 prism targets on the pit wall at 2-hour intervals.',
      },
      {
        name: 'Ground-Based InSAR',
        detail:
          '1 IBIS-FM radar unit providing area-wide displacement maps at 1 mm precision every 15 minutes.',
      },
      {
        name: 'Seismographs',
        detail:
          '6 geophones capturing blast vibration peak particle velocity and ambient microseismicity.',
      },
      {
        name: 'Weather Station',
        detail:
          'On-site AWS recording rainfall intensity, temperature, and barometric pressure at 1-minute intervals.',
      },
    ],
    aiModel:
      "OctaSense deployed a physics-augmented LSTM network trained on 18 months of historical sensor data correlated with three documented precursor events. The model output is a continuous Slope Stability Risk Index (SSRI) on a 0–100 scale, updated every 30 minutes.\n\nThe model learns the characteristic 'acceleration signature' that precedes failure: a pattern where displacement rate transitions from linear to exponential growth — the so-called Fukuzono inverse-velocity trend. Three alert thresholds are defined: Advisory (SSRI > 60), Warning (SSRI > 78), and Critical (SSRI > 90), each triggering defined operational responses.",
    operationalIntegration:
      "The SSRI feeds directly into the mine's operational dashboard used by geotechnical engineers and shift supervisors. Integration with the mine's ERP system allows automatic generation of work order restrictions in exclusion zones when the Warning threshold is crossed. Push alerts are delivered via SMS and the OctaSense mobile app to 14 designated personnel.",
    outcomes: [
      'Failure Events Prevented: 2 imminent slope failures detected and managed — est. $18M in avoided losses',
      'Warning Lead Time: Average of 72 hours of advance warning before critical threshold breach',
      'Downtime Reduction: Unplanned operational disruptions reduced by 64% year-on-year',
      'False Positive Rate: < 3% — preventing unnecessary production halts',
      'Safety: Zero LTIs associated with slope movement during the deployment period',
    ],
    stats: [
      { value: '72h', label: 'Avg warning lead time' },
      { value: '64%', label: 'Downtime reduction' },
      { value: '$18M', label: 'Losses prevented' },
      { value: '<3%', label: 'False positive rate' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'Zambia, Sub-Saharan Africa' },
      { label: 'Pit Depth', value: '420 m' },
      { label: 'Sensor Count', value: '61 instruments' },
      { label: 'Monitoring Period', value: '28 months ongoing' },
      { label: 'Alert Response', value: '< 5 minutes' },
    ],
  },

  {
    id: 'underground-mine-roof',
    number: 2,
    tag: 'Mining',
    sector: 'Mining',
    title: 'Underground Mine Roof Collapse Prediction',
    subtitle:
      'Real-time stope stability monitoring in a deep hard-rock gold mine.',
    heroColor: '#1f1a0f',
    image: '/assets/images/case-studies/cs2.jpeg',
    summary:
      'A deep-level gold mine in South Africa operating at 2,800 m depth required a step-change improvement in stope ground control. OctaSense integrated microseismic monitoring, extensometers, and stress cells into an AI-driven hazard classification system that reduced rockfall incidents by 79% and enabled dynamic exclusion zone management.',
    background:
      'Underground mining at extreme depths exposes workers to severe seismic hazard. Stress redistribution around excavations creates complex failure environments where conventional observation-based risk assessment is inadequate. The mine had experienced 14 rockfall incidents in the previous 12 months, two of which resulted in lost-time injuries.',
    technicalProblem:
      'At 2,800 m depth, the in-situ stress field exceeds 70 MPa. Seismic events triggered by distant stope blasts can destabilise hangingwall over areas of several thousand square metres within seconds. The challenge was to distinguish harmless routine seismicity from escalating damage sequences that precede major collapses.',
    sensorDeployment: [
      {
        name: 'Microseismic Network',
        detail:
          '24 triaxial geophones forming a volumetric array with < 5 m source location accuracy.',
      },
      {
        name: 'Crown Pillar Extensometers',
        detail:
          '18 wire extensometers measuring hangingwall convergence to 0.01 mm resolution.',
      },
      {
        name: 'Stress Cells',
        detail:
          '8 hollow inclusion stress cells monitoring principal stress changes.',
      },
      {
        name: 'In-stope Cameras',
        detail:
          '6 IP cameras providing visual confirmation of conditions in high-risk areas.',
      },
    ],
    aiModel:
      'A gradient-boosted seismic hazard classifier analyses rolling 4-hour windows of microseismic activity, extracting 23 features including b-value, energy index, apparent stress, and inter-event clustering. The model assigns each production block a hazard class (Low / Elevated / High / Imminent) that drives re-entry decisions after blasts.',
    workerAlert:
      'When a block is classified Imminent, an automatic PA announcement initiates re-entry lockout for the affected section. The mine captain receives a real-time map update on a ruggedised tablet. Re-entry is only permitted after two consecutive Low classifications separated by at least 4 hours, verified by a qualified person and the OctaSense dashboard.',
    outcomes: [
      'Rockfall Incidents: Reduced by 79% in the 18 months post-deployment',
      'LTI Frequency Rate: Dropped from 2.3 to 0.4 per million man-hours',
      'Re-entry Efficiency: Average re-entry delay reduced by 35% through evidence-based clearance',
      'Seismic Events Detected: >12,000 events classified — 94% classification accuracy verified',
    ],
    stats: [
      { value: '79%', label: 'Rockfall reduction' },
      { value: '94%', label: 'Classification accuracy' },
      { value: '2.8km', label: 'Mine depth' },
      { value: '24', label: 'Geophone array' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'South Africa, Witwatersrand Basin' },
      { label: 'Mine Depth', value: '2,800 m' },
      { label: 'Sensor Count', value: '56 instruments' },
      { label: 'Deployment Phase', value: '18 months' },
    ],
  },

  {
    id: 'tailings-dam-failure',
    number: 3,
    tag: 'Dams',
    sector: 'Dams / Mining',
    title: 'Tailings Dam Failure Risk Monitoring',
    subtitle:
      'Continuous stability monitoring of a 45 Mm³ tailings storage facility.',
    heroColor: '#0f1f2f',
    image: '/assets/images/case-studies/cs3.jpeg',
    summary:
      'Following the Brumadinho dam disaster, a Brazilian iron ore producer urgently required a credible, independent monitoring system for its 45 Mm³ tailings storage facility. OctaSense implemented a comprehensive instrumentation and AI platform that achieved Certifiable Stability Status within 6 months and now generates continuous Factor of Safety estimates validated by independent geotechnical engineers.',
    background:
      'Tailings storage facilities (TSFs) represent the single largest source of catastrophic risk in the mining industry. The host company faced regulatory pressure to demonstrate enhanced monitoring capability or face operational suspension. Existing instrumentation was largely manual read-point piezometers with monthly download cycles — wholly inadequate for a structure of this consequence.',
    geotechnicalChallenge:
      'The TSF is constructed using the upstream raise method, which is the highest-risk embankment type. Liquefaction of the tailings beach during seismic events or rapid drawdown is the primary failure mode. Phreatic surface control is critical — the free-draining zone must extend at least 100 m from the crest.\n\nThe structure spans 3.2 km and its heterogeneous internal structure, deposited over 22 years, creates highly variable hydraulic conductivity zones that are difficult to characterise.',
    sensorDeployment: [
      {
        name: 'Automated Piezometers',
        detail:
          '64 vibrating-wire piezometers converted to automated data loggers — readings every 30 minutes.',
      },
      {
        name: 'Settlement Plates',
        detail:
          '28 automated settlement monitoring points on the embankment crest and downstream slope.',
      },
      {
        name: 'Inclinometers',
        detail: '12 automated inclinometer probes in existing boreholes.',
      },
      {
        name: 'GNSS Prisms',
        detail:
          '42 GNSS reflectors providing ±2 mm plan and vertical displacement accuracy.',
      },
      {
        name: 'Rainfall Telemetry',
        detail: '3 tipping-bucket rain gauges with 15-minute telemetry.',
      },
      {
        name: 'Drone Photogrammetry',
        detail:
          'Monthly photogrammetric surveys generating sub-5 cm accuracy DEMs.',
      },
    ],
    digitalTwin:
      'A dynamic seepage model (SEEP/W) is updated nightly with the latest piezometer readings, generating a continuously revised phreatic surface. The AI layer predicts phreatic surface position 72 hours ahead based on rainfall forecasts and historical hydrological responses. When the predicted surface rises within 40 m of the crest, an automated advisory is issued.\n\nSlope stability analysis (SLOPE/W) is run automatically against the updated seepage model, generating FoS estimates for three critical cross-sections. Results are reported to the Responsible Engineer and the regulatory authority via a shared dashboard.',
    outcomes: [
      'Regulatory Status: Achieved Certifiable Stability Status in 6 months — avoided $85M production suspension',
      'FoS Reporting: Continuous automated FoS reporting replacing 4-weekly manual reports',
      'Alert Lead Time: 72-hour advance warning on phreatic surface rise events',
      'Piezometer Data Availability: >99.2% uptime across 64 automated instruments',
      'Audit Readiness: Full data trail available for regulatory audit at all times',
    ],
    stats: [
      { value: '64', label: 'Auto piezometers' },
      { value: '72h', label: 'Seepage prediction horizon' },
      { value: '99.2%', label: 'Data uptime' },
      { value: '$85M', label: 'Suspension avoided' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'Minas Gerais, Brazil' },
      { label: 'TSF Volume', value: '45 million m³' },
      { label: 'Crest Length', value: '3.2 km' },
      { label: 'Embankment Type', value: 'Upstream raise' },
      { label: 'Sensor Count', value: '149 instruments' },
    ],
  },

  {
    id: 'metro-tunnel-shm',
    number: 4,
    tag: 'Tunnels',
    sector: 'Tunnels',
    title: 'Metro Tunnel Structural Health Monitoring',
    subtitle:
      'Long-term SHM for a 42 km urban metro network across 68 tunnel segments.',
    heroColor: '#101828',
    image: '/assets/images/case-studies/cs4.jpeg',
    summary:
      'A major metropolitan transit authority engaged OctaSense to deliver a permanent SHM system across its ageing 42 km underground metro network. Covering 68 tunnel segments spanning 40 years of construction techniques, the platform provides continuous structural assessment, automated anomaly reports, and maintenance prioritisation — enabling a shift from time-based to condition-based maintenance.',
    background:
      "The metro network serves 1.2 million daily commuters. Its tunnels were constructed using three different methods — cut-and-cover reinforced concrete, NATM sprayed concrete, and cast-iron segment bored tunnels — each with distinct structural behaviours and deterioration modes. The authority's infrastructure renewal budget requires careful prioritisation across a complex asset portfolio.",
    monitoringDesign:
      'The SHM system design was segmented by tunnel type:\n\n• Cast-Iron Segments (28 km): Focus on bolt hole cracking, segment joint opening, and corrosion-driven section loss. Eddy-current sensors and crack gauges at 120 m intervals.\n• NATM Sprayed Concrete (9 km): Convergence monitoring using automated laser scanning and vibrating-wire strain gauges embedded in the lining.\n• Cut-and-Cover RC (5 km): Surface crack monitors, rebar corrosion probes, and load cells at prop locations.\n\nAll data streams feed into a unified OctaSense dashboard with GIS-linked asset condition maps.',
    sensorDeployment: [
      {
        name: 'Convergence Targets',
        detail:
          '1,840 reflective targets scanned by 22 automated total stations — daily displacement surveys to 0.3 mm precision.',
      },
      {
        name: 'Crack Gauges',
        detail:
          '312 vibrating-wire crack gauges monitoring joint and lining crack widths.',
      },
      {
        name: 'Strain Gauges',
        detail: '180 long-gauge FBG optical strain sensors in NATM sections.',
      },
      {
        name: 'Corrosion Probes',
        detail:
          '96 linear polarisation resistance corrosion rate sensors on reinforcement in cut-and-cover sections.',
      },
      {
        name: 'Accelerometers',
        detail:
          '64 triaxial MEMS accelerometers capturing train-induced vibration profiles.',
      },
      {
        name: 'Humidity & Temperature',
        detail:
          '180 combined sensors tracking micro-climate changes that drive freeze-thaw and carbonation.',
      },
    ],
    anomalyDetection:
      "A spatial-temporal anomaly detector compares each sensor's reading against its 90-day rolling baseline and flags deviations exceeding 2.5 standard deviations. Cross-referencing adjacent sensors distinguishes genuine structural events from sensor faults.\n\nModal analysis of accelerometer data tracks natural frequency drift — a reliable indicator of stiffness loss in the concrete lining. A 5% frequency drop triggers an engineering inspection request.",
    lessonsLearned:
      'The complexity of a heterogeneous tunnel portfolio demanded a highly configurable platform architecture. Key lesson: standardising data formats and alert escalation protocols before deployment saves significant integration effort. Also critical: the value of embedding structural engineers in the data interpretation workflow — automated anomaly detection without expert validation creates alert fatigue.',
    outcomes: [
      'Structural Events Detected: 14 genuine anomalies captured in Year 1 — all confirmed by inspection',
      'Maintenance Savings: Condition-based prioritisation delivered 28% reduction in routine inspection costs',
      'Alert Accuracy: 96% precision on anomaly classification — significantly reducing engineer call-outs',
      "Coverage: 42 km of tunnel monitored continuously — first time in the authority's history",
      'Passenger Safety: Zero service disruptions due to undetected structural deterioration',
    ],
    stats: [
      { value: '42km', label: 'Tunnel network' },
      { value: '2,672', label: 'Sensor channels' },
      { value: '96%', label: 'Alert precision' },
      { value: '28%', label: 'Inspection savings' },
    ],
    deploymentSnapshot: [
      { label: 'Network Length', value: '42 km' },
      { label: 'Tunnel Segments', value: '68' },
      { label: 'Sensor Count', value: '2,672 channels' },
      { label: 'Monitoring Mode', value: 'Permanent / real-time' },
    ],
  },

  {
    id: 'pipeline-leak-detection',
    number: 5,
    tag: 'Oil & Gas',
    sector: 'Oil & Gas',
    title: 'Oil & Gas Pipeline Leak Detection',
    subtitle:
      'Acoustic and pressure-based leak detection across a 680 km sub-Saharan pipeline corridor.',
    heroColor: '#1f150a',
    image: '/assets/images/case-studies/cs5.jpeg',
    summary:
      'An East African pipeline operator required a cost-effective leak detection system for a 680 km crude oil export pipeline crossing remote terrain with variable elevations. OctaSense deployed a hybrid acoustic-pressure system with AI-driven signal classification, achieving < 0.5% volume leak detection and a < 6-minute alert-to-location response.',
    background:
      'The pipeline traverses three national parks, two river crossings, and a mountainous section with 1,200 m elevation change. Manual patrol is conducted bi-monthly. The previous system — a basic SCADA mass-balance algorithm — had a minimum detectable leak size of 5% throughput and a detection lag of 6–24 hours. Three significant spill events had occurred in 4 years, resulting in $22M in environmental remediation costs.',
    leakPhysics:
      'Hydrocarbon leaks generate three detectable physical signatures:\n\n1. Negative Pressure Wave (NPW): A leak event initiates a pressure drop that propagates in both directions from the leak point at the speed of sound in the fluid (~1,200 m/s). Cross-correlating arrival times at two sensor stations localises the leak to within ±150 m.\n\n2. Sustained Pressure Imbalance: A steady-state leak creates a persistent differential between the expected and measured pressure profile — detectable by the hydraulic gradient deviation algorithm.\n\n3. Acoustic Emission: Fluid escaping through a defect generates broadband acoustic energy (2–20 kHz) propagating along the pipe wall and through the soil.',
    sensorDeployment: [
      {
        name: 'Pressure Transducers',
        detail:
          '48 high-precision pressure transmitters (±0.05% FS) at 15 km intervals with SCADA integration.',
      },
      {
        name: 'Acoustic Sensors',
        detail:
          '32 accelerometer-based acoustic emission sensors clamped to the pipe at 22 km intervals.',
      },
      {
        name: 'Fibre Optic Cable',
        detail:
          '680 km of distributed acoustic sensing (DAS) fibre in conduit alongside the pipe — detecting third-party interference events concurrently.',
      },
      {
        name: 'GNSS Monitoring Points',
        detail:
          '18 automated GNSS stations at high-risk geological zones for ground movement detection.',
      },
      {
        name: 'Flow Meters',
        detail:
          '6 ultrasonic flow meters at pump stations and major offtake points.',
      },
    ],
    aiDetection:
      'A convolutional neural network processes DAS acoustic spectrograms in rolling 30-second windows. The network is trained to distinguish leak signatures from noise classes including: pump vibration harmonics, vehicle crossings, animal activity, and rain impingement. The NPW algorithm runs in parallel, with the AI layer filtering out false positives from pressure transients caused by valve operations.\n\nLeak location is computed by the time-difference-of-arrival (TDOA) algorithm when at least two acoustic sensors register a common event within the theoretical propagation window.',
    outcomes: [
      'Minimum Detectable Leak: 0.3% throughput — 16× improvement over SCADA mass-balance',
      'Alert-to-Location Time: Average 5.8 minutes from event to crew dispatch with GPS coordinates',
      'False Positive Rate: 1.2 per week — reduced to 0.3/week after model fine-tuning in month 4',
      'Third-Party Interference: 47 unauthorised excavation events detected in 24 months',
      'Environmental Savings: Zero reportable spill events in 30 months since deployment',
    ],
    stats: [
      { value: '0.3%', label: 'Min detectable leak' },
      { value: '5.8min', label: 'Alert-to-locate time' },
      { value: '680km', label: 'Pipeline covered' },
      { value: '47', label: 'Intrusions detected' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'East Africa' },
      { label: 'Pipeline Length', value: '680 km' },
      { label: 'Product', value: 'Crude oil' },
      { label: 'Operating Pressure', value: '82 bar' },
      { label: 'Sensor Count', value: '680 km DAS + 104 discrete' },
    ],
  },

  {
    id: 'landslide-pipeline-corridors',
    number: 6,
    tag: 'Oil & Gas',
    sector: 'Oil & Gas / Multi-Domain',
    title: 'Landslide Risk Monitoring for Pipeline Corridors',
    subtitle:
      'Geohazard early warning across 340 km of pipeline in mountainous terrain.',
    heroColor: '#1a1f0a',
    image: '/assets/images/case-studies/cs6.jpeg',
    summary:
      'A gas transmission company operating a 340 km pipeline across the Rwenzori mountain range required a geohazard monitoring system to manage landslide risk at 23 identified high-risk crossings. OctaSense deployed a satellite-ground hybrid monitoring approach with AI-powered slope stability modelling, providing 48-hour predictive warnings that enabled pre-emptive pipeline isolation.',
    background:
      'Annual rainfall exceeding 2,400 mm on the western slopes of the Rwenzori range creates persistent landslide hazard that threatens buried pipeline crossings. Historical records show 7 pipeline exposures and 2 ruptures due to slope movements in the preceding 15 years. Repair operations in remote terrain typically require 3–6 weeks and cost $2–8M each.',
    sensorDeployment: [
      {
        name: 'GNSS Stations',
        detail:
          '46 continuously operating GNSS reference stations at monitored slope locations — ±3 mm precision.',
      },
      {
        name: 'Inclinometers',
        detail:
          '64 shaped acceleration arrays measuring subsurface deformation profiles.',
      },
      {
        name: 'Piezometers',
        detail: '38 automated piezometers tracking groundwater levels.',
      },
      {
        name: 'InSAR Processing',
        detail:
          'Sentinel-1 SAR data processed at 6-day intervals — area-wide deformation mapping at 5 mm sensitivity.',
      },
      {
        name: 'Rainfall Gauges',
        detail:
          '23 tipping bucket gauges at monitored crossings with real-time telemetry.',
      },
      {
        name: 'Soil Moisture Sensors',
        detail: '46 capacitive soil moisture sensors at 30 cm and 90 cm depth.',
      },
    ],
    realTimeRisk:
      "OctaSense's Slope Risk Engine combines traditional infinite slope stability analysis with a machine learning rainfall-response model tuned to each crossing's specific hydrogeological characteristics. The engine generates a Landslide Probability Index (LPI) on a 0–1 scale for each of the 23 crossings, updated hourly.\n\nFour cumulative rainfall thresholds — calibrated against documented instability events — define the four alert levels. When an alert is triggered, the system automatically notifies pipeline controllers to initiate isolation valve procedures.",
    outcomes: [
      'Slope Failures Predicted: 3 damaging slope movements accurately predicted — pipelines isolated pre-failure',
      'Pipeline Isolations: 8 pre-emptive isolations executed — 3 subsequently confirmed as necessary',
      'Cost Avoided: Estimated $14M in repair and remediation costs avoided',
      'Warning Lead Time: Average 52 hours before slope movement threshold breach',
      'Environmental Impact: Zero hydrocarbon releases from geohazard events since deployment',
    ],
    stats: [
      { value: '23', label: 'High-risk crossings' },
      { value: '52h', label: 'Landslide warning lead' },
      { value: '$14M', label: 'Costs avoided' },
      { value: '340km', label: 'Corridor monitored' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'Rwenzori Mountains, Uganda' },
      { label: 'Annual Rainfall', value: '> 2,400 mm' },
      { label: 'Risk Crossings', value: '23 locations' },
      { label: 'Sensor Count', value: '217 instruments' },
    ],
  },

  {
    id: 'dam-seismic-monitoring',
    number: 7,
    tag: 'Dams',
    sector: 'Dams',
    title: 'Hydropower Dam Seismic & Structural Monitoring',
    subtitle:
      'Integrated SHM for a 187 m arch dam in a seismically active zone.',
    heroColor: '#0a1020',
    image: '/assets/images/case-studies/cs7.jpeg',
    summary:
      'A 187 m high concrete arch dam in a seismically active region of Turkey required continuous structural monitoring to comply with post-earthquake inspection protocols and to demonstrate structural integrity to its regulators. OctaSense implemented an integrated seismic and structural monitoring system that provides automated post-event safety assessments within 15 minutes of any significant earthquake.',
    background:
      'The dam is located 38 km from an active fault capable of generating M6.5+ events. Following a M5.2 event that caused visible cracking in the dam gallery in 2019, regulators mandated permanent instrumentation with automated post-earthquake assessment capability.',
    sensorDeployment: [
      {
        name: 'Strong-Motion Accelerometers',
        detail:
          '18 triaxial accelerometers at foundation, mid-height, crest, and abutments — capturing dam response during seismic events.',
      },
      {
        name: 'Joint Meters',
        detail:
          '42 vibrating-wire joint meters monitoring contraction joint movements between dam blocks.',
      },
      {
        name: 'Pendulums',
        detail:
          '6 direct and inverted pendulums measuring crest displacement relative to foundation.',
      },
      {
        name: 'Uplift Pressure Cells',
        detail:
          '24 piezometers monitoring seepage and uplift pressure at the dam-foundation interface.',
      },
      {
        name: 'Thermometers',
        detail:
          '120 embedded thermometers tracking concrete temperature distribution.',
      },
      {
        name: 'Seismographs',
        detail:
          '3 broadband seismometers (with telemetry to national seismic network) detecting regional seismicity.',
      },
    ],
    digitalTwinArchitecture:
      'A validated finite element model of the dam (calibrated against 3 years of response data) is updated automatically following each seismic event. The OctaSense platform compares measured structural response (crest displacements, joint openings) against the FEM-predicted response for the actual recorded ground motion.\n\nDeviation from expected behaviour triggers an Anomaly Report automatically delivered to the Responsible Engineer within 15 minutes. The report includes: (a) a damage probability estimate, (b) comparison plots for all critical monitoring points, and (c) recommendations for gate operations and downstream emergency management.',
    outcomes: [
      'Post-Earthquake Assessments: 7 significant events (M > 3.5) processed — automated reports in < 15 minutes in all cases',
      'Baseline FEM Calibration: R² > 0.97 for predicted vs. measured response across 3 years of ambient monitoring',
      'Regulatory Compliance: Continuous, auditable monitoring record satisfying national dam safety regulations',
      'Operational Continuity: Avoided 3 precautionary shutdowns through evidence-based post-event assessments',
      'Data Availability: 99.7% uptime across all instruments over 36 months',
    ],
    stats: [
      { value: '187m', label: 'Dam height' },
      { value: '15min', label: 'Post-quake assessment' },
      { value: '99.7%', label: 'Data uptime' },
      { value: '0.97', label: 'FEM R² calibration' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'Turkey' },
      { label: 'Dam Type', value: 'Double-curvature arch' },
      { label: 'Dam Height', value: '187 m' },
      { label: 'Sensor Count', value: '213 instruments' },
      { label: 'Monitoring Mode', value: 'Permanent, continuous' },
    ],
  },

  {
    id: 'tbm-tunnel-construction',
    number: 8,
    tag: 'Tunnels',
    sector: 'Tunnels',
    title: 'TBM Tunnel Construction Risk Monitoring',
    subtitle:
      'Real-time surface settlement monitoring during twin-bore metro construction under a live city.',
    heroColor: '#0d1628',
    image: '/assets/images/case-studies/cs8.jpeg',
    summary:
      'During construction of twin metro bores beneath a densely built historic city centre in India, OctaSense provided a real-time ground settlement monitoring system that protected 340 buildings, 12 utility corridors, and 4 heritage structures from TBM-induced subsidence. The platform triggered 9 TBM operational adjustments that prevented settlement from exceeding consent limits.',
    background:
      'The project involved driving two 6.2 m diameter EPB TBMs through variable ground conditions including soft alluvial clay, decomposed granite, and the foundations of buildings constructed as early as 1890. Settlement limits ranged from 5 mm (heritage structures) to 25 mm (modern commercial buildings), with tight monitoring zones requiring action before limits were breached.',
    technicalProblem:
      'TBM-induced settlement is a function of TBM face pressure, grout injection volume, penetration rate, and soil conditioning. Predicting settlement 24–48 hours before the TBM arrives under a building is essential for pre-emptive operational adjustment — but requires real-time integration of TBM operational data with ground response measurements.',
    sensorDeployment: [
      {
        name: 'Precise Levelling Prisms',
        detail:
          '1,240 monitoring points on buildings, road surfaces, and utility covers — auto-monitored by 8 total stations daily.',
      },
      {
        name: 'Tiltmeters',
        detail:
          '186 biaxial tiltmeters on heritage facade columns and load-bearing walls.',
      },
      {
        name: 'Crackmeters',
        detail:
          '264 vibrating-wire crackmeters on existing visible cracks in at-risk buildings.',
      },
      {
        name: 'Settlement Cells',
        detail: '48 hydraulic settlement cells along the tunnel alignment.',
      },
      {
        name: 'TBM SCADA Integration',
        detail:
          'Real-time feed of 34 TBM operational parameters including face pressure, thrust force, and tail grouting pressure.',
      },
    ],
    technicalInnovation:
      'OctaSense developed a predictive settlement model that combines TBM operational parameters with a Gaussian distribution ground loss model. The model predicts surface settlement 36 hours in advance for all buildings within 20 m of the alignment. When predicted settlement exceeds 70% of the consent limit, an automatic advisory is issued to the TBM operator and site geotechnician:\n\nRecommended face pressure adjustments are generated by the model, with the primary objective of staying within consent limits while maximising advance rate. The system proved especially effective in the transition between soft clay and decomposed granite — a zone where conventional empirical prediction methods significantly underestimated settlement.',
    outcomes: [
      'Consent Limit Exceedances: Zero — all 340 buildings remained within approved settlement limits',
      'TBM Adjustments: 9 proactive operational interventions triggered by predictive alerts',
      'Heritage Structure Protection: All 4 heritage structures maintained within 4 mm settlement limit',
      'Alert Lead Time: Average 31-hour advance warning before predicted consent limit approach',
      'Data Volume: >380,000 sensor readings per day during active TBM drive',
    ],
    stats: [
      { value: '0', label: 'Consent exceedances' },
      { value: '340', label: 'Buildings monitored' },
      { value: '31h', label: 'Alert lead time' },
      { value: '1,240', label: 'Monitoring points' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'India, historic city centre' },
      { label: 'TBM Diameter', value: '6.2 m' },
      { label: 'Bore Length', value: '2 × 4.8 km' },
      { label: 'Buildings Monitored', value: '340' },
      { label: 'Heritage Structures', value: '4' },
    ],
  },

  {
    id: 'aging-dam-shm',
    number: 9,
    tag: 'Dams',
    sector: 'Dams',
    title: 'Aging Dam Structural Health Monitoring',
    subtitle:
      'Comprehensive SHM for a 91-year-old gravity dam approaching design life.',
    heroColor: '#0f1830',
    image: '/assets/images/case-studies/cs9.jpeg',
    summary:
      'A 91-year-old concrete gravity dam in the Scottish Highlands, approaching the end of its design life, required a comprehensive condition assessment and ongoing monitoring programme to support a life extension decision. OctaSense deployed a full-spectrum SHM system that identified three previously unknown defects and provided the quantitative basis for a successful 25-year licence renewal.',
    background:
      'The dam was constructed in 1934 to an early design code. No continuous monitoring had ever been installed. The dam owner needed to demonstrate fitness for purpose to regulators under the UK Reservoirs Act 1975 (updated 2020). Manual CIRIA monitoring reports had identified increasing seepage flows but could not determine the cause.',
    sensorDeployment: [
      {
        name: 'Seepage V-Notch Weirs',
        detail:
          '8 automated V-notch weirs monitoring flow from 12 gallery drainage points — readings every 10 minutes.',
      },
      {
        name: 'Piezometers',
        detail:
          '36 vibrating-wire piezometers installed in 14 new boreholes through the dam body and foundation.',
      },
      {
        name: 'Crack Monitors',
        detail:
          '52 precision crack displacement meters on gallery cracks and horizontal construction joints.',
      },
      {
        name: 'Pendulums',
        detail: '4 inverted pendulums measuring crest displacement.',
      },
      {
        name: 'Ground-Penetrating Radar',
        detail:
          'Full GPR survey of dam body identifying voids and anomalous moisture zones (baseline survey + annual repeat).',
      },
      {
        name: 'Thermometers',
        detail:
          '48 embedded and surface thermometers for thermal deformation analysis.',
      },
    ],
    digitalTwin:
      'Annual GPR surveys, combined with piezometer data, identified three previously unknown features: a 1.2 m void at the dam-foundation contact, a zone of increased permeability at the right abutment, and a horizontal crack at elevation +24 m consistent with an historic foundation settlement event.\n\nThe OctaSense platform correlates seepage flow with reservoir level, temperature, and seasonal groundwater levels to separate normal thermo-elastic seepage patterns from trends indicative of internal erosion. For the right abutment anomaly, a dedicated alert threshold was established based on hydraulic gradient analysis.',
    outcomes: [
      'Defects Identified: 3 previously unknown structural defects located and characterised',
      'Licence Renewal: Quantitative monitoring data supported successful 25-year life extension',
      'Seepage Source: Cause of increasing seepage trend identified — attributed to right abutment drainage deterioration (corrective grouting undertaken)',
      'Baseline Established: First-ever continuous monitoring baseline for a 91-year-old structure',
      'Regulatory Acceptance: Full CIRIA 164 / ICE reporting compliance achieved',
    ],
    stats: [
      { value: '91yrs', label: 'Structure age' },
      { value: '3', label: 'Defects found' },
      { value: '25yr', label: 'Licence renewed' },
      { value: '148', label: 'Sensor channels' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'Scottish Highlands, UK' },
      { label: 'Dam Age', value: '91 years' },
      { label: 'Dam Type', value: 'Concrete gravity' },
      { label: 'Regulatory Framework', value: 'UK Reservoirs Act 1975' },
      { label: 'Sensor Count', value: '148 channels' },
    ],
  },

  {
    id: 'digital-twin-mine-to-port',
    number: 10,
    tag: 'Multi-Domain',
    sector: 'Multi-Domain',
    title: 'Digital Twin for Integrated Mine-to-Port Infrastructure',
    subtitle:
      'End-to-end structural and operational monitoring across a 780 km bulk export corridor.',
    heroColor: '#1a1025',
    image: '/assets/images/case-studies/cs10.jpeg',
    summary:
      'A Tier-1 iron ore producer in Western Australia required a unified monitoring platform spanning an entire mine-to-port export corridor: an open-pit mine, 780 km of heavy-haul railway, a port facility, and a product stockpile. OctaSense delivered a federated digital twin that integrates structural health data from all infrastructure domains into a single operational risk dashboard — enabling dynamic maintenance scheduling and corporate-level risk reporting.',
    background:
      'The export corridor handles 85 Mtpa of iron ore. Structural integrity failures at any node — slope collapse, rail track failure, port jetty damage — create downstream production losses of $1.5–4M per day. Senior management required a single metric that could quantify infrastructure risk across the entire asset portfolio, enabling board-level reporting and insurance negotiations.',
    crossDomainIntegration:
      "OctaSense's federated data platform integrates 14 disparate existing monitoring systems (including 3 different SCADA platforms, legacy safety control systems, and a rail track geometry measurement system) via custom API connectors and IoT edge gateways. Data is normalised and ingested into a unified time-series database at a central cloud processing node.\n\nA custom ontology maps all sensor streams to a shared asset model, enabling cross-domain correlation analysis that was previously impossible. For example: the platform identifies the statistical relationship between mine blast vibration events, induced railway track displacement, and downstream stockpile settlement — a multi-domain causal chain that no single domain operator had previously quantified.",
    decisionSupport:
      'The OctaSense Corridor Risk Index (CRI) aggregates 2,400+ sensor channels into a daily infrastructure health score reported to the executive team. Maintenance scheduling AI uses the CRI to optimise the sequence and duration of track maintenance windows, reducing interference with production scheduling.\n\nAn insurance risk module generates quarterly structural condition reports in the format required by Lloyds of London underwriters — demonstrating real-time condition evidence that underpinned a 12% premium reduction.',
    sensorDeployment: [
      {
        name: 'Mine Pit Instrumentation',
        detail:
          'Integration of 61 existing inclinometers, piezometers, and radar instruments from Case Study 01.',
      },
      {
        name: 'Railway Track Sensors',
        detail:
          '228 axle box accelerometers on 12 instrumented wagons and 340 trackside geometry sensors.',
      },
      {
        name: 'Bridge & Culvert Monitors',
        detail:
          'Strain gauges, tiltmeters, and settlement sensors on 14 structures along the rail corridor.',
      },
      {
        name: 'Port Jetty Instruments',
        detail:
          '42 load cells, accelerometers, and scour monitors on the 2.1 km product export jetty.',
      },
      {
        name: 'Stockpile Sensors',
        detail:
          '18 settlement plates and 6 inclinometers monitoring 85 Mt live stockpile stability.',
      },
      {
        name: 'Satellite InSAR',
        detail:
          'Monthly Sentinel-1 processing over the full corridor for area-wide deformation surveillance.',
      },
    ],
    outcomes: [
      'Corridor Risk Reporting: First unified infrastructure risk metric across a 780 km export corridor',
      'Maintenance Efficiency: AI scheduling reduced maintenance-related production delays by 31%',
      'Insurance Premium: 12% reduction based on demonstrated real-time condition monitoring',
      'Cross-Domain Insights: 4 previously unknown blast-vibration/track-damage correlations identified',
      'Platform Integration: 14 legacy systems unified into a single operational dashboard',
      'Executive Reporting: Automated weekly board-level infrastructure risk summary — zero manual compilation',
    ],
    stats: [
      { value: '780km', label: 'Corridor length' },
      { value: '2,400+', label: 'Sensor channels' },
      { value: '31%', label: 'Maintenance delay reduction' },
      { value: '85Mtpa', label: 'Throughput protected' },
    ],
    deploymentSnapshot: [
      { label: 'Location', value: 'Pilbara, Western Australia' },
      { label: 'Throughput', value: '85 Mtpa iron ore' },
      { label: 'Corridor Length', value: '780 km' },
      {
        label: 'Infrastructure Nodes',
        value: '4 (mine, rail, stockpile, port)',
      },
      { label: 'Sensor Channels', value: '2,400+' },
    ],
  },
];
