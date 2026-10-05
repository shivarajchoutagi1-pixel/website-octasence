'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import type { CaseStudy } from './data/caseStudies';
import { SECTOR_LABELS, getSectorSlug } from './data/sectorRoutes';

function CaseCard({
  cs,
  index,
  href,
}: {
  cs: CaseStudy;
  index: number;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const outcomePreview = cs.outcomes.slice(0, 2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        animationDelay: `${(index % 3) * 0.08}s`,
        opacity: visible ? undefined : 0,
      }}
      className={visible ? 'animate-fiu' : ''}
    >
      <Link href={href} style={{ textDecoration: 'none' }}>
        <div
          className="case-card"
          style={{ borderRadius: 6, cursor: 'pointer' }}
        >
          <div
            className="img-block relative"
            style={{
              position: 'relative',
              height: 200,
              borderRadius: '5px 5px 0 0',
              backgroundImage: `linear-gradient(to bottom, ${cs.heroColor}40 0%, rgba(15,23,42,0.8) 100%), url(${cs.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
              <span className="sector-tag">{cs.tag}</span>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                right: 20,
                fontFamily: 'var(--font-display)',
                fontSize: 56,
                fontWeight: 800,
                color: 'rgba(59,130,246,0.08)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {String(cs.number).padStart(2, '0')}
            </div>
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.15,
              }}
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="200"
                x2="400"
                y2="0"
                stroke="#3b82f6"
                strokeWidth="0.5"
              />
              <line
                x1="-50"
                y1="200"
                x2="350"
                y2="0"
                stroke="#3b82f6"
                strokeWidth="0.3"
              />
              <line
                x1="50"
                y1="200"
                x2="450"
                y2="0"
                stroke="#3b82f6"
                strokeWidth="0.3"
              />
            </svg>
          </div>

          <div style={{ padding: '24px 28px 28px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: 12,
              }}
            >
              {cs.sector}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--accent-blue)',
                lineHeight: 1.35,
                marginBottom: 12,
              }}
            >
              {cs.title}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: '#ffffff',
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {cs.summary.slice(0, 120)}...
            </p>
            {outcomePreview.length > 0 && (
              <div
                style={{
                  borderTop: '1px solid rgba(59,130,246,0.08)',
                  paddingTop: 16,
                }}
              >
                {outcomePreview.map((outcome, outcomeIndex) => (
                  <div
                    key={`${cs.id}-outcome-${outcomeIndex}`}
                    className="outcome-item"
                    style={{
                      fontSize: 12,
                      marginBottom:
                        outcomeIndex < outcomePreview.length - 1 ? 6 : 0,
                    }}
                  >
                    {outcome.split(':')[0]}
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--accent-blue)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Read Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function UseCasesPageInner({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const router = useRouter();
  const initialSector = 'All';
  const isSectorLocked = false;
  const [filter, setFilter] = useState(initialSector);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setFilter(initialSector);
  }, [initialSector]);

  const filtered =
    filter === 'All'
      ? caseStudies
      : caseStudies.filter(
          (cs) => cs.tag === filter || cs.sector.includes(filter),
        );

  const detailHref = (id: string) => {
    const params = new URLSearchParams();
    const sectorSlug = getSectorSlug(filter);

    if (isSectorLocked && filter !== 'All' && sectorSlug) {
      params.set('fromSector', sectorSlug);
    } else if (filter !== 'All') {
      params.set('from', 'use-cases');
      params.set('sector', filter);
    }

    const query = params.toString();
    return query ? `/use-cases/${id}?${query}` : `/use-cases/${id}`;
  };

  return (
    <main
      style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}
      className="grid-bg"
    >
      <section
        className="hero-gradient"
        style={{
          padding: '100px 0 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '10%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'none' : 'translateY(12px)',
              transition: 'all 0.6s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: 'var(--accent-blue)',
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-blue)',
                }}
              >
                Case Studies
              </span>
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              maxWidth: '100%',
              marginBottom: 24,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'none' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
              textAlign: 'center',
            }}
          >
            Real-World Intelligence Across{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #93c5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Critical Infrastructure
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: '#ffffff',
              lineHeight: 1.8,
              maxWidth: 800,
              marginBottom: 48,
              opacity: headerVisible ? 1 : 0,
              transition: 'all 0.7s ease 0.2s',
              textAlign: 'center',
              margin: '0 auto 48px auto',
            }}
          >
            Ten detailed deployments spanning mining, tunnels, dams, oil and
            gas, and integrated infrastructure. Each case study demonstrates how
            OctaSense transforms reactive inspection into predictive
            intelligence.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              flexWrap: 'wrap',
              opacity: headerVisible ? 1 : 0,
              transition: 'all 0.7s ease 0.3s',
            }}
          >
            {[
              { value: '10', label: 'Case Studies' },
              { value: '5', label: 'Sectors Covered' },
              { value: '$50M+', label: 'Losses Prevented' },
              { value: '94%', label: 'Detection Accuracy' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div
                  className="number-display"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 28,
                    marginBottom: 4,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: '#ffffff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ margin: 0 }} />

      {!isSectorLocked && (
        <div
          style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 0' }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SECTOR_LABELS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 3,
                  border:
                    filter === s
                      ? '1px solid var(--accent-blue)'
                      : '1px solid rgba(59,130,246,0.12)',
                  background:
                    filter === s ? 'rgba(59,130,246,0.1)' : 'transparent',
                  color:
                    filter === s ? 'var(--accent-blue)' : 'var(--text-muted)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.2s ease',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {isSectorLocked && (
        <div
          style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 0' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => router.push('/applications-infrastructure-intelligence')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'transparent',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: 3,
                color: 'var(--text-muted)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-blue)';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: 3,
                color: 'var(--accent-blue)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent-blue)',
                  boxShadow: '0 0 6px rgba(59,130,246,0.6)',
                }}
              />
              {filter}
            </div>
            <span
              style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {filtered.length} case{' '}
              {filtered.length === 1 ? 'study' : 'studies'}
            </span>
          </div>
        </div>
      )}

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '40px 40px 100px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}
      >
        {filtered.map((cs, i) => (
          <CaseCard key={cs.id} cs={cs} index={i} href={detailHref(cs.id)} />
        ))}
      </div>
    </main>
  );
}

export default function UseCasesPageClient({
  caseStudies,
  lockedSector = null,
  backHref,
}: {
  caseStudies: CaseStudy[];
  lockedSector?: string | null;
  backHref?: string;
}) {
  function LockedUseCasesPageInner({
    caseStudies: lockedCaseStudies,
  }: {
    caseStudies: CaseStudy[];
  }) {
    const [filter, setFilter] = useState(lockedSector ?? 'All');
    const [headerVisible, setHeaderVisible] = useState(false);
    const isSectorLocked = !!(lockedSector && lockedSector !== 'All');

    useEffect(() => {
      const t = setTimeout(() => setHeaderVisible(true), 100);
      return () => clearTimeout(t);
    }, []);

    useEffect(() => {
      setFilter(lockedSector ?? 'All');
    }, [lockedSector]);

    const filtered =
      filter === 'All'
        ? lockedCaseStudies
        : lockedCaseStudies.filter(
            (cs) => cs.tag === filter || cs.sector.includes(filter),
          );

    const detailHref = (id: string) => {
      const sectorSlug = getSectorSlug(filter);
      return sectorSlug
        ? `/use-cases/${id}?fromSector=${sectorSlug}`
        : `/use-cases/${id}`;
    };

    return (
      <main
        style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}
        className="grid-bg"
      >
        <section
          className="hero-gradient"
          style={{
            padding: '100px 0 80px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '10%',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
            <div
              style={{
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? 'none' : 'translateY(12px)',
                transition: 'all 0.6s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: 'var(--accent-blue)',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-blue)',
                  }}
                >
                  Case Studies
                </span>
              </div>
            </div>

            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                maxWidth: '100%',
                marginBottom: 24,
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? 'none' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
                textAlign: 'center',
              }}
            >
              Real-World Intelligence Across{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #93c5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Critical Infrastructure
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: '#ffffff',
                lineHeight: 1.8,
                maxWidth: 800,
                marginBottom: 48,
                opacity: headerVisible ? 1 : 0,
                transition: 'all 0.7s ease 0.2s',
                textAlign: 'center',
                margin: '0 auto 48px auto',
              }}
            >
              Ten detailed deployments spanning mining, tunnels, dams, oil and
              gas, and integrated infrastructure. Each case study demonstrates
              how OctaSense transforms reactive inspection into predictive
              intelligence.
            </p>
          </div>
        </section>

        <div className="section-divider" style={{ margin: 0 }} />

        {isSectorLocked && (
          <div
            style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <a
                href={backHref ?? '/applications-infrastructure-intelligence'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: 3,
                  color: 'var(--text-muted)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M11 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </a>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  borderRadius: 3,
                  color: 'var(--accent-blue)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--accent-blue)',
                    boxShadow: '0 0 6px rgba(59,130,246,0.6)',
                  }}
                />
                {filter}
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {filtered.length} case{' '}
                {filtered.length === 1 ? 'study' : 'studies'}
              </span>
            </div>
          </div>
        )}

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '40px 40px 100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} href={detailHref(cs.id)} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <Suspense
      fallback={<div style={{ minHeight: '100vh', background: '#020617' }} />}
    >
      {lockedSector ? (
        <LockedUseCasesPageInner caseStudies={caseStudies} />
      ) : (
        <UseCasesPageInner caseStudies={caseStudies} />
      )}
    </Suspense>
  );
}
