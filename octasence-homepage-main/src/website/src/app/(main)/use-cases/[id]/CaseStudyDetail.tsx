'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';

import { CaseStudy } from '../data/caseStudies';

function SectionBlock({ title, content }: { title: string; content: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 3,
            height: 20,
            background: 'var(--accent-blue)',
            borderRadius: 2,
          }}
        />
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--accent-blue)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          fontSize: 14.5,
          color: '#ffffff',
          lineHeight: 1.85,
          whiteSpace: 'pre-line',
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromSector = searchParams.get('fromSector');
  const from = searchParams.get('from');
  const sector = searchParams.get('sector');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const navigateTo = (href: string) => {
    window.location.assign(href);
  };

  const handleBack = () => {
    if (fromSector) {
      navigateTo(`/use-cases/sector/${encodeURIComponent(fromSector)}`);
      return;
    }

    if (from === 'applications') {
      if (sector && sector !== 'All') {
        navigateTo(`/use-cases?sector=${encodeURIComponent(sector)}&from=applications`);
        return;
      }

      navigateTo('/applications-infrastructure-intelligence');
      return;
    }

    if (from === 'use-cases') {
      if (sector && sector !== 'All') {
        navigateTo(`/use-cases?sector=${encodeURIComponent(sector)}`);
        return;
      }

      navigateTo('/use-cases');
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    navigateTo('/use-cases');
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(160deg, ${cs.heroColor} 0%, #020617 55%)`,
          padding: '60px 0 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative SVG lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1,
            pointerEvents: 'none',
          }}
          viewBox="0 0 1200 500"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="500"
            x2="1200"
            y2="0"
            stroke="#3b82f6"
            strokeWidth="1"
          />
          <line
            x1="-100"
            y1="500"
            x2="1100"
            y2="0"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          <line
            x1="100"
            y1="500"
            x2="1300"
            y2="0"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          <circle
            cx="900"
            cy="100"
            r="200"
            stroke="#3b82f6"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          {/* Back */}
          <div
            style={{
              marginBottom: 40,
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            <button
              onClick={handleBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--text-muted)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--accent-blue)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--text-muted)')
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M11 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
          </div>

          {/* Tag + number */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(12px)',
              transition: 'all 0.5s ease 0.05s',
            }}
          >
            <span className="sector-tag">{cs.tag}</span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Case Study {String(cs.number).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800,
              color: 'var(--accent-blue)',
              lineHeight: 1.15,
              maxWidth: 720,
              marginBottom: 16,
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            {cs.title}
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 60,
              opacity: visible ? 1 : 0,
              transition: 'all 0.6s ease 0.15s',
            }}
          >
            {cs.subtitle}
          </p>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            height: 80,
            background:
              'linear-gradient(to bottom, transparent, var(--bg-primary))',
          }}
        />
      </section>

      {/* Body */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 40px 100px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}
      >
        {/* Summary box */}
        <div
          style={{
            background: 'rgba(59,130,246,0.04)',
            border: '1px solid rgba(59,130,246,0.15)',
            borderRadius: 6,
            padding: '28px 32px',
            marginBottom: 56,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginBottom: 12,
            }}
          >
            Summary
          </div>
          <p style={{ fontSize: 15, color: '#ffffff', lineHeight: 1.8 }}>
            {cs.summary}
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: 60,
            alignItems: 'start',
          }}
        >
          {/* Left — main content */}
          <div>
            <SectionBlock
              title="Background & Context"
              content={cs.background}
            />

            {cs.technicalProblem && (
              <SectionBlock
                title="Technical Problem Statement"
                content={cs.technicalProblem}
              />
            )}
            {cs.geotechnicalChallenge && (
              <SectionBlock
                title="Geotechnical Challenge"
                content={cs.geotechnicalChallenge}
              />
            )}
            {cs.failureMechanisms && (
              <SectionBlock
                title="Failure Mechanisms & Risk Factors"
                content={cs.failureMechanisms}
              />
            )}
            {cs.monitoringStrategy && (
              <SectionBlock
                title="Monitoring Strategy"
                content={cs.monitoringStrategy}
              />
            )}
            {cs.monitoringDesign && (
              <SectionBlock
                title="Monitoring System Design"
                content={cs.monitoringDesign}
              />
            )}
            {cs.leakPhysics && (
              <SectionBlock
                title="Leak Physics & Detection Principles"
                content={cs.leakPhysics}
              />
            )}

            {/* Sensor Deployment Table */}
            <div style={{ marginBottom: 40 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 20,
                    background: 'var(--accent-blue)',
                    borderRadius: 2,
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--accent-blue)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Sensor Deployment
                </h3>
              </div>
              <div
                style={{
                  border: '1px solid rgba(59,130,246,0.1)',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                {cs.sensorDeployment.map((s, i) => (
                  <div
                    key={i}
                    className="sensor-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr',
                      gap: 0,
                    }}
                  >
                    <div
                      style={{
                        padding: '16px 20px',
                        borderRight: '1px solid rgba(59,130,246,0.08)',
                        background: 'rgba(59,130,246,0.02)',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        padding: '16px 20px',
                        fontSize: 13,
                        color: 'var(--text-muted)',
                        lineHeight: 1.65,
                      }}
                    >
                      {s.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {cs.aiModel && (
              <SectionBlock
                title="AI Model Architecture"
                content={cs.aiModel}
              />
            )}
            {cs.aiDetection && (
              <SectionBlock
                title="AI Detection Model"
                content={cs.aiDetection}
              />
            )}
            {cs.predictiveMaintenance && (
              <SectionBlock
                title="Predictive Maintenance AI"
                content={cs.predictiveMaintenance}
              />
            )}
            {cs.operationalIntegration && (
              <SectionBlock
                title="Operational Integration"
                content={cs.operationalIntegration}
              />
            )}
            {cs.digitalTwin && (
              <SectionBlock
                title="Digital Twin & Risk Modelling"
                content={cs.digitalTwin}
              />
            )}
            {cs.digitalTwinArchitecture && (
              <SectionBlock
                title="Digital Twin Architecture"
                content={cs.digitalTwinArchitecture}
              />
            )}
            {cs.crossDomainIntegration && (
              <SectionBlock
                title="Cross-Domain Integration"
                content={cs.crossDomainIntegration}
              />
            )}
            {cs.decisionSupport && (
              <SectionBlock
                title="Decision Support Capability"
                content={cs.decisionSupport}
              />
            )}
            {cs.realTimeRisk && (
              <SectionBlock
                title="Real-Time Risk Assessment"
                content={cs.realTimeRisk}
              />
            )}
            {cs.anomalyDetection && (
              <SectionBlock
                title="Anomaly Detection & Pattern Recognition"
                content={cs.anomalyDetection}
              />
            )}
            {cs.workerAlert && (
              <SectionBlock
                title="Worker Alert & Evacuation Protocol"
                content={cs.workerAlert}
              />
            )}

            {cs.technicalInnovation && (
              <div
                style={{
                  background: 'rgba(59,130,246,0.04)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: 6,
                  padding: '24px 28px',
                  marginBottom: 40,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-blue)',
                    marginBottom: 12,
                  }}
                >
                  Key Technical Innovation: Vibration Baseline Filtering
                </div>
                <p
                  style={{ fontSize: 13.5, color: '#ffffff', lineHeight: 1.8 }}
                >
                  {cs.technicalInnovation}
                </p>
              </div>
            )}

            {cs.lessonsLearned && (
              <SectionBlock
                title="Lessons Learned"
                content={cs.lessonsLearned}
              />
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ position: 'sticky', top: 40 }}>
            {/* Outcomes */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(59,130,246,0.12)',
                borderRadius: 6,
                padding: '28px',
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-blue)',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent-blue)',
                    boxShadow: '0 0 8px rgba(59,130,246,0.5)',
                  }}
                />
                Key Outcomes & Results
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                {cs.outcomes.map((o, i) => {
                  const [label, value] = o.includes(':')
                    ? [o.split(':')[0], o.split(':').slice(1).join(':')]
                    : [o, ''];
                  return (
                    <div
                      key={i}
                      style={{
                        borderBottom:
                          i < cs.outcomes.length - 1
                            ? '1px solid rgba(59,130,246,0.06)'
                            : 'none',
                        paddingBottom: i < cs.outcomes.length - 1 ? 12 : 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#ffffff',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </div>
                      {value && (
                        <div
                          style={{
                            fontSize: 13,
                            color: 'var(--text-muted)',
                            lineHeight: 1.5,
                          }}
                        >
                          {value.trim()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats if available */}
            {cs.stats && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {cs.stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: 'rgba(59,130,246,0.04)',
                      border: '1px solid rgba(59,130,246,0.12)',
                      borderRadius: 5,
                      padding: '18px 16px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      className="number-display"
                      style={{ fontSize: 24, marginBottom: 6 }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Deployment snapshot */}
            {cs.deploymentSnapshot && (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(59,130,246,0.12)',
                  borderRadius: 6,
                  padding: '24px 28px',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-blue)',
                    marginBottom: 16,
                  }}
                >
                  Deployment Snapshot
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  {cs.deploymentSnapshot.map((d) => (
                    <div key={d.label}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--text-muted)',
                          marginBottom: 3,
                        }}
                      >
                        {d.label}
                      </div>
                      <div style={{ fontSize: 13, color: '#ffffff' }}>
                        {d.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div
              style={{
                marginTop: 24,
                background:
                  'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(59,130,246,0.04))',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 6,
                padding: '24px 28px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--accent-blue)',
                  marginBottom: 8,
                }}
              >
                Ready to Deploy?
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginBottom: 18,
                  lineHeight: 1.6,
                }}
              >
                Contact OctaSense for a pilot programme at your site.
              </p>
              <a
                href="mailto:hello@octasense.ai"
                style={{
                  display: 'block',
                  background: 'var(--accent-blue)',
                  color: '#020617',
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '12px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry FAB */}
      <div
        style={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid var(--accent-blue)',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--accent-blue)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-display)',
                position: 'absolute',
                bottom: '100%',
                marginBottom: 16,
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            >
              For Enquiry
            </motion.div>
          )}
        </AnimatePresence>

        <Link href="/contact" style={{ display: 'block' }}>
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
            }}
          >
            {/* Waves */}
            <div className="sonar-wave sonar-wave-1" />
            <div className="sonar-wave sonar-wave-2" />

            <FiMessageSquare
              size={28}
              color="#020617"
              style={{ position: 'relative', zIndex: 2 }}
            />
          </motion.div>
        </Link>
      </div>
    </main>
  );
}
