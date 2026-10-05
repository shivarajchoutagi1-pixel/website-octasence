'use client';

import { useState } from 'react';

/**
 * OctaSence — Investor Deck Download Banner
 *
 * A large, centered, standout download section for the About hero.
 *
 * Usage:
 *   <PitchDeckDownload href="/assets/OctaSence_Investor_Deck_2026.pdf" />
 */
export default function PitchDeckDownload({
  href = '/assets/OctaSence_Investor_Deck_2026.pdf',
  filename = 'OctaSence_Investor_Deck_2026.pdf',
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        .octa-deck-section {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 48px 24px;
          font-family: 'Outfit', sans-serif;
        }

        .octa-deck-card {
          position: relative;
          width: 100%;
          max-width: 720px;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(
            145deg,
            rgba(12, 20, 45, 0.98) 0%,
            rgba(8, 14, 32, 0.98) 100%
          );
          border: 1.5px solid rgba(99, 202, 183, 0.25);
          box-shadow:
            0 0 0 1px rgba(99, 202, 183, 0.06),
            0 24px 64px rgba(0, 0, 0, 0.6),
            0 0 80px rgba(99, 102, 241, 0.08);
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 48px 40px 40px;
          cursor: pointer;
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .octa-deck-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 25px;
          background: linear-gradient(135deg,
            rgba(99, 202, 183, 0) 0%,
            rgba(99, 202, 183, 0.18) 50%,
            rgba(99, 102, 241, 0.12) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }

        .octa-deck-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(99, 202, 183, 0.055) 50%,
            transparent 70%
          );
          transform: translateX(-120%);
          transition: transform 0.7s ease;
          pointer-events: none;
          z-index: 0;
        }

        .octa-deck-card:hover::before { opacity: 1; }
        .octa-deck-card:hover::after  { transform: translateX(120%); }

        .octa-deck-card:hover {
          border-color: rgba(99, 202, 183, 0.55);
          box-shadow:
            0 0 40px rgba(99, 202, 183, 0.15),
            0 32px 80px rgba(0, 0, 0, 0.65),
            0 0 100px rgba(99, 102, 241, 0.1);
          transform: translateY(-3px);
        }

        .octa-deck-card:active {
          transform: translateY(-1px) scale(0.99);
        }

        .octa-deck-card > * { position: relative; z-index: 1; }

        .octa-deck-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(99, 202, 183, 0.3);
          background: rgba(99, 202, 183, 0.08);
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(99, 202, 183, 0.85);
          margin-bottom: 24px;
        }

        .octa-deck-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(99, 202, 183, 0.8);
          animation: octa-pulse 2s ease-in-out infinite;
        }

        @keyframes octa-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }

        .octa-deck-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: linear-gradient(135deg,
            rgba(99, 202, 183, 0.15) 0%,
            rgba(99, 102, 241, 0.1) 100%
          );
          border: 1px solid rgba(99, 202, 183, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition:
            background 0.3s ease,
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .octa-deck-card:hover .octa-deck-icon-wrap {
          background: linear-gradient(135deg,
            rgba(99, 202, 183, 0.25) 0%,
            rgba(99, 102, 241, 0.18) 100%
          );
          transform: translateY(4px);
        }

        .octa-deck-headline {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 800;
          color: #eef2ff;
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin: 0 0 10px;
        }

        .octa-deck-sub {
          font-size: 14px;
          color: rgba(160, 180, 220, 0.6);
          letter-spacing: 0.03em;
          margin: 0 0 36px;
          font-style: italic;
        }

        .octa-deck-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 32px;
          border-radius: 14px;
          background: linear-gradient(135deg,
            rgba(99, 202, 183, 0.18) 0%,
            rgba(99, 102, 241, 0.14) 100%
          );
          border: 1.5px solid rgba(99, 202, 183, 0.4);
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #d4f5ee;
          letter-spacing: 0.04em;
          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            gap 0.25s ease;
        }

        .octa-deck-card:hover .octa-deck-cta {
          background: linear-gradient(135deg,
            rgba(99, 202, 183, 0.28) 0%,
            rgba(99, 102, 241, 0.22) 100%
          );
          border-color: rgba(99, 202, 183, 0.7);
          gap: 16px;
        }

        .octa-deck-cta-arrow {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .octa-deck-card:hover .octa-deck-cta-arrow {
          transform: translateY(3px);
        }

        .octa-deck-confirmed {
          margin-top: 20px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(99, 202, 183, 0.9);
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
          pointer-events: none;
          min-height: 20px;
        }

        .octa-deck-confirmed.show {
          opacity: 1;
          transform: translateY(0);
        }

        .octa-deck-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(99, 202, 183, 0.18) 20%,
            rgba(99, 202, 183, 0.18) 80%,
            transparent
          );
          margin: 32px 0 28px;
        }

        .octa-deck-meta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .octa-deck-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: rgba(140, 160, 200, 0.55);
          letter-spacing: 0.05em;
        }

        .octa-deck-meta-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(99, 202, 183, 0.25);
        }
      `}</style>

      <div className="octa-deck-section">
        <a
          href={href}
          download={filename}
          className="octa-deck-card"
          onClick={handleClick}
          aria-label="Download OctaSence Investor Deck PDF"
        >
          {/* Eyebrow pill */}
          <div className="octa-deck-pill">
            <span className="octa-deck-pill-dot" />
            Investor Deck · Seed Round 2026
          </div>

          {/* Large download icon */}
          <div className="octa-deck-icon-wrap">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 5v16m0 0-5.5-5.5M16 21l5.5-5.5"
                stroke="rgba(99,202,183,0.95)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 23v2.5A2.5 2.5 0 0 0 8.5 28h15a2.5 2.5 0 0 0 2.5-2.5V23"
                stroke="rgba(99,202,183,0.65)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Headline */}
          <h3 className="octa-deck-headline">Download the Pitch Deck</h3>
          <p className="octa-deck-sub">For Investor Review Only</p>

          {/* CTA button */}
          <div className="octa-deck-cta">
            <span>Download PDF</span>
            <svg
              className="octa-deck-cta-arrow"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3.5v11m0 0-4-4m4 4 4-4"
                stroke="rgba(99,202,183,0.9)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Confirmed */}
          <div className={`octa-deck-confirmed${clicked ? ' show' : ''}`}>
            ✓ Download started
          </div>

          {/* Divider + meta */}
          <div className="octa-deck-rule" />
          <div className="octa-deck-meta-row">
            <span className="octa-deck-meta-item">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect
                  x="1.5"
                  y="1"
                  width="9"
                  height="10"
                  rx="1.5"
                  stroke="rgba(99,202,183,0.45)"
                  strokeWidth="1.2"
                />
                <path
                  d="M3.5 4.5h5M3.5 7h3"
                  stroke="rgba(99,202,183,0.45)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              16 Slides
            </span>
            <span className="octa-deck-meta-sep" />
            <span className="octa-deck-meta-item">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
                  stroke="rgba(99,202,183,0.45)"
                  strokeWidth="1.2"
                />
                <path
                  d="M6 4v2.5l1.5 1"
                  stroke="rgba(99,202,183,0.45)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              2026 Edition
            </span>
            <span className="octa-deck-meta-sep" />
            <span className="octa-deck-meta-item">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1.5C4 1.5 2.5 3 2.5 5c0 3 3.5 5.5 3.5 5.5S9.5 8 9.5 5c0-2-1.5-3.5-3.5-3.5Z"
                  stroke="rgba(99,202,183,0.45)"
                  strokeWidth="1.2"
                />
                <circle cx="6" cy="5" r="1" fill="rgba(99,202,183,0.45)" />
              </svg>
              India + EU Markets
            </span>
          </div>
        </a>
      </div>
    </>
  );
}
