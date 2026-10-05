'use client';

import { useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type DownloadItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string; // primary href (used for fallback link in success state)
  hrefs?: string[]; // all files to trigger; overrides href when present
  meta: string[];
  image: string;
};

type ContactForm = {
  name: string;
  email: string;
  phone: string;
};

// ─── Catalogue ────────────────────────────────────────────────────────────────

const DOWNLOADS: DownloadItem[] = [
  {
    id: 'pitch-deck',
    label: 'Investor Deck · Seed Round 2026',
    title: 'Pitch Deck 2026',
    description:
      'Market opportunity, product vision, traction & roadmap for investors.',
    href: '/assets/OctaSence_Investor_Deck_2026.pdf',
    meta: ['16 Slides', '2026 Edition', 'India + EU Markets'],
    image: '/assets/images/downloads/pitch_deck.png', // 👈 add
  },
  {
    id: 'whitepaper',
    label: 'Technical White   Paper',
    title: 'Technical White Paper',
    description:
      'Sensor fusion, agentic ML models, SHM architecture & system design.',
    href: '/assets/OctaSence_Technical_Whitepaper.pdf',
    meta: ['41 Pages', 'Peer Reviewed', 'SHM + Geotechnical'],
    image: '/assets/images/downloads/white_paper.png',
  },
  {
    id: 'brochure',
    label: 'Product Brochure · Overview',
    title: 'Product Brochure',
    description:
      'Platform capabilities, deployment scenarios & customer success highlights.',
    href: '/assets/OctaSence_Product_Brochure.pdf',
    meta: ['3 Pages', 'Use Cases', 'Mining · Dams · Metro'],
    image: '/assets/images/downloads/brochure.jpg',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v: string) => /^\+?[\d\s\-().]{7,20}$/.test(v.trim());

// Meta icon SVGs (reused from PitchDeckDownload pattern)
const META_ICONS = [
  // doc
  <svg key="doc" width="12" height="12" viewBox="0 0 12 12" fill="none">
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
  </svg>,
  // clock
  <svg key="clk" width="12" height="12" viewBox="0 0 12 12" fill="none">
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
  </svg>,
  // pin
  <svg key="pin" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M6 1.5C4 1.5 2.5 3 2.5 5c0 3 3.5 5.5 3.5 5.5S9.5 8 9.5 5c0-2-1.5-3.5-3.5-3.5Z"
      stroke="rgba(99,202,183,0.45)"
      strokeWidth="1.2"
    />
    <circle cx="6" cy="5" r="1" fill="rgba(99,202,183,0.45)" />
  </svg>,
];

// ─── Contact Modal ────────────────────────────────────────────────────────────

function ContactModal({
  item,
  onClose,
}: {
  item: DownloadItem;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!isValidEmail(form.email)) e.email = 'Enter a valid email address';
    if (!isValidPhone(form.phone)) e.phone = 'Enter a valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const triggerDownload = () => {
    const files = item.hrefs ?? [item.href];
    files.forEach((href) => {
      const a = document.createElement('a');
      a.href = href;
      a.download = '';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          message: '',
          category: `download:${item.id}`,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error || 'Failed to store download request');
      }

      setSubmitted(true);
      triggerDownload();
    } catch (error) {
      console.error('Download request submission failed:', error);
      setSubmitError(
        'We could not save your request right now. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        .octa-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(7, 11, 26, 0.88);
          backdrop-filter: blur(14px);
          font-family: 'Outfit', sans-serif;
        }

        .octa-modal-panel {
          position: relative;
          width: 100%;
          max-width: 440px;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(12,20,45,0.98) 0%, rgba(8,14,32,0.98) 100%);
          border: 1.5px solid rgba(99,202,183,0.25);
          box-shadow: 0 0 0 1px rgba(99,202,183,0.06), 0 24px 64px rgba(0,0,0,0.65), 0 0 80px rgba(99,102,241,0.08);
          padding: 36px 32px 32px;
        }

        .octa-modal-glow {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top, rgba(59,130,246,0.09), transparent 60%);
        }

        .octa-modal-close {
          position: absolute;
          right: 18px;
          top: 18px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(140,160,200,0.5);
          transition: color 0.2s;
          padding: 4px;
        }
        .octa-modal-close:hover { color: rgba(200,220,255,0.85); }

        .octa-modal-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(99,202,183,0.3);
          background: rgba(99,202,183,0.08);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(99,202,183,0.85);
          margin-bottom: 16px;
        }

        .octa-modal-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(99,202,183,0.8);
          animation: octa-pulse 2s ease-in-out infinite;
        }

        @keyframes octa-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.75); }
        }

        .octa-modal-headline {
          font-size: 22px;
          font-weight: 800;
          color: #eef2ff;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 0 0 6px;
        }

        .octa-modal-sub {
          font-size: 13px;
          color: rgba(160,180,220,0.55);
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .octa-modal-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,202,183,0.15) 20%, rgba(99,202,183,0.15) 80%, transparent);
          margin: 0 0 24px;
        }

        .octa-modal-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(140,165,210,0.7);
          margin-bottom: 8px;
        }

        .octa-modal-input {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid rgba(99,202,183,0.15);
          background: rgba(99,202,183,0.04);
          padding: 12px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #eef2ff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .octa-modal-input::placeholder { color: rgba(140,165,210,0.3); }
        .octa-modal-input:focus {
          border-color: rgba(99,202,183,0.45);
          background: rgba(99,202,183,0.07);
        }
        .octa-modal-input.error { border-color: rgba(239,68,68,0.55); }

        .octa-modal-error {
          font-size: 11px;
          color: rgba(252,165,165,0.9);
          margin: 5px 0 0;
          letter-spacing: 0.02em;
        }

        .octa-modal-field { margin-bottom: 16px; }
        .octa-modal-field:last-of-type { margin-bottom: 0; }

        .octa-modal-submit {
          margin-top: 24px;
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 32px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(99,202,183,0.18) 0%, rgba(99,102,241,0.14) 100%);
          border: 1.5px solid rgba(99,202,183,0.4);
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #d4f5ee;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, gap 0.25s;
        }
        .octa-modal-submit:hover {
          background: linear-gradient(135deg, rgba(99,202,183,0.28) 0%, rgba(99,102,241,0.22) 100%);
          border-color: rgba(99,202,183,0.7);
        }
        .octa-modal-submit:active { transform: scale(0.98); }
        .octa-modal-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .octa-modal-submit:disabled:hover {
          background: linear-gradient(135deg, rgba(99,202,183,0.18) 0%, rgba(99,102,241,0.14) 100%);
          border-color: rgba(99,202,183,0.4);
        }

        .octa-modal-privacy {
          margin-top: 14px;
          text-align: center;
          font-size: 11px;
          color: rgba(140,165,210,0.35);
          letter-spacing: 0.04em;
        }

        .octa-modal-submit-error {
          margin-top: 12px;
          font-size: 12px;
          color: rgba(252,165,165,0.95);
          line-height: 1.5;
        }

        /* Success */
        .octa-modal-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: 16px 0 8px;
          text-align: center;
        }

        .octa-modal-success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(99,202,183,0.15) 0%, rgba(99,102,241,0.1) 100%);
          border: 1px solid rgba(99,202,183,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .octa-modal-success-title {
          font-size: 20px;
          font-weight: 800;
          color: #eef2ff;
          margin: 0;
        }

        .octa-modal-success-body {
          font-size: 13px;
          color: rgba(160,180,220,0.6);
          line-height: 1.6;
          margin: 0;
        }

        .octa-modal-success-body a {
          color: rgba(99,202,183,0.9);
          text-decoration: none;
        }
        .octa-modal-success-body a:hover { text-decoration: underline; }

        .octa-modal-close-btn {
          padding: 11px 28px;
          border-radius: 999px;
          border: 1.5px solid rgba(99,202,183,0.25);
          background: rgba(99,202,183,0.06);
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(99,202,183,0.8);
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .octa-modal-close-btn:hover {
          border-color: rgba(99,202,183,0.5);
          background: rgba(99,202,183,0.1);
        }
      `}</style>

      <div
        className="octa-modal-backdrop"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="octa-modal-panel">
          <div className="octa-modal-glow" />

          <button
            className="octa-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M14 4 4 14M4 4l10 10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {!submitted ? (
            <div style={{ position: 'relative' }}>
              <div className="octa-modal-pill">
                <span className="octa-modal-pill-dot" />
                {item.label}
              </div>
              <h2 className="octa-modal-headline">Download {item.title}</h2>
              <p className="octa-modal-sub">
                Share a few details and your file will begin downloading
                automatically.
              </p>
              <div className="octa-modal-rule" />

              <div className="octa-modal-field">
                <label className="octa-modal-label">Full name</label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className={`octa-modal-input${errors.name ? ' error' : ''}`}
                />
                {errors.name && (
                  <p className="octa-modal-error">{errors.name}</p>
                )}
              </div>

              <div className="octa-modal-field">
                <label className="octa-modal-label">Work email</label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className={`octa-modal-input${errors.email ? ' error' : ''}`}
                />
                {errors.email && (
                  <p className="octa-modal-error">{errors.email}</p>
                )}
              </div>

              <div className="octa-modal-field">
                <label className="octa-modal-label">Phone number</label>
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className={`octa-modal-input${errors.phone ? ' error' : ''}`}
                />
                {errors.phone && (
                  <p className="octa-modal-error">{errors.phone}</p>
                )}
              </div>

              <button
                className="octa-modal-submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 3.5v11m0 0-4-4m4 4 4-4"
                    stroke="rgba(99,202,183,0.9)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isSubmitting ? 'Saving details...' : 'Download PDF'}
              </button>

              {submitError && (
                <p className="octa-modal-submit-error">{submitError}</p>
              )}

              <p className="octa-modal-privacy">
                We respect your privacy and will never share your details.
              </p>
            </div>
          ) : (
            <div className="octa-modal-success">
              <div className="octa-modal-success-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path
                    d="M5 13.5 10.5 19 21 8"
                    stroke="rgba(99,202,183,0.95)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="octa-modal-success-title">Download started</h3>
              <p className="octa-modal-success-body">
                Your <strong style={{ color: '#eef2ff' }}>{item.title}</strong>{' '}
                {(item.hrefs?.length ?? 1) > 1
                  ? `(${item.hrefs!.length} files) should be downloading now.`
                  : 'should be downloading now.'}
                <br />
                If not,{' '}
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  click here
                </a>
                .
              </p>
              <button className="octa-modal-close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Download Card ────────────────────────────────────────────────────────────

function DownloadCard({
  item,
  onOpen,
}: {
  item: DownloadItem;
  onOpen: () => void;
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        .octa-dl-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(12,20,45,0.98) 0%, rgba(8,14,32,0.98) 100%);
          border: 1.5px solid rgba(99,202,183,0.25);
          box-shadow:
            0 0 0 1px rgba(99,202,183,0.06),
            0 24px 64px rgba(0,0,0,0.6),
            0 0 80px rgba(99,102,241,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 28px 32px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          -webkit-tap-highlight-color: transparent;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }

        .octa-dl-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 25px;
          background: linear-gradient(135deg,
            rgba(99,202,183,0) 0%,
            rgba(99,202,183,0.18) 50%,
            rgba(99,102,241,0.12) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }

        .octa-dl-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(99,202,183,0.055) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
          pointer-events: none;
          z-index: 0;
        }

        .octa-dl-card:hover::before { opacity: 1; }
        .octa-dl-card:hover::after  { transform: translateX(120%); }

        .octa-dl-card:hover {
          border-color: rgba(99,202,183,0.55);
          box-shadow:
            0 0 40px rgba(99,202,183,0.15),
            0 32px 80px rgba(0,0,0,0.65),
            0 0 100px rgba(99,102,241,0.1);
          transform: translateY(-3px);
        }

        .octa-dl-card:active { transform: translateY(-1px) scale(0.99); }
        .octa-dl-card > * { position: relative; z-index: 1; }

        .octa-dl-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(99,202,183,0.3);
          background: rgba(99,202,183,0.08);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(99,202,183,0.85);
          margin-bottom: 22px;
        }

        .octa-dl-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(99,202,183,0.8);
          animation: octa-pulse 2s ease-in-out infinite;
        }

        .octa-dl-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(99,202,183,0.15) 0%, rgba(99,102,241,0.1) 100%);
          border: 1px solid rgba(99,202,183,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .octa-dl-card:hover .octa-dl-icon-wrap {
          background: linear-gradient(135deg, rgba(99,202,183,0.25) 0%, rgba(99,102,241,0.18) 100%);
          transform: translateY(4px);
        }

        .octa-dl-headline {
          font-size: clamp(18px, 3vw, 22px);
          font-weight: 800;
          color: #eef2ff;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 0 0 8px;
        }

        .octa-dl-desc {
          font-size: 13px;
          color: rgba(160,180,220,0.55);
          line-height: 1.55;
          margin: 0 0 28px;
        }

        .octa-dl-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(99,202,183,0.18) 0%, rgba(99,102,241,0.14) 100%);
          border: 1.5px solid rgba(99,202,183,0.4);
          font-size: 14px;
          font-weight: 700;
          color: #d4f5ee;
          letter-spacing: 0.04em;
          transition: background 0.25s, border-color 0.25s, gap 0.25s;
        }

        .octa-dl-card:hover .octa-dl-cta {
          background: linear-gradient(135deg, rgba(99,202,183,0.28) 0%, rgba(99,102,241,0.22) 100%);
          border-color: rgba(99,202,183,0.7);
          gap: 16px;
        }

        .octa-dl-cta-arrow {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .octa-dl-card:hover .octa-dl-cta-arrow { transform: translateY(3px); }

        .octa-dl-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,202,183,0.18) 20%, rgba(99,202,183,0.18) 80%, transparent);
          margin: 24px 0 20px;
        }

        .octa-dl-meta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .octa-dl-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: rgba(140,160,200,0.5);
          letter-spacing: 0.04em;
        }

        .octa-dl-meta-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(99,202,183,0.25);
        }
      `}</style>

      <button
        className="octa-dl-card"
        onClick={onOpen}
        aria-label={`Download ${item.title}`}
      >
        {/* Pill */}
        <div className="octa-dl-pill">
          <span className="octa-dl-pill-dot" />
          {item.label}
        </div>

        {/* Image */}
        <div className="octa-dl-image-wrap">
          <img src={item.image} alt={item.title} className="octa-dl-image" />
        </div>

        {/* Text */}
        <h3 className="octa-dl-headline">{item.title}</h3>
        <p className="octa-dl-desc">{item.description}</p>

        {/* CTA */}
        <div className="octa-dl-cta">
          <span>Download PDF</span>
          <svg
            className="octa-dl-cta-arrow"
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
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

        {/* Divider + meta */}
        <div className="octa-dl-rule" />
        <div className="octa-dl-meta-row">
          {item.meta.map((label, i) => (
            <span key={label} style={{ display: 'contents' }}>
              {i > 0 && <span className="octa-dl-meta-sep" />}
              <span className="octa-dl-meta-item">
                {META_ICONS[i]}
                {label}
              </span>
            </span>
          ))}
        </div>
      </button>
    </>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

export default function DownloadsRow() {
  const [active, setActive] = useState<DownloadItem | null>(null);
  const open = useCallback((item: DownloadItem) => setActive(item), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <style>{`
        .octa-dl-section {
          width: 100%;
          padding: 64px 24px;
          font-family: 'Outfit', sans-serif;
        }

        .octa-dl-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .octa-dl-header {
          margin-bottom: 40px;
        }

        .octa-dl-section-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(99,202,183,0.3);
          background: rgba(99,202,183,0.08);
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(99,202,183,0.85);
          margin-bottom: 16px;
        }

        .octa-dl-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 800;
          color: #eef2ff;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }

        .octa-dl-section-sub {
          font-size: 15px;
          color: rgba(160,180,220,0.55);
          max-width: 480px;
          line-height: 1.6;
          margin: 0;
        }

        .octa-dl-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
        }

        @media (min-width: 640px) {
          .octa-dl-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .octa-dl-image-wrap {
            width: 100%;
            height: 180px; /* slightly bigger for better visibility */
            border-radius: 0; /* ❌ no rounded corners */
            overflow: hidden;
            margin-bottom: 20px;
            border: 1px solid rgba(99,202,183,0.15);
            background: rgba(10,15,30,0.6); /* darker background for letterboxing */
            display: flex;
            align-items: center;
            justify-content: center;
          }

        .octa-dl-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.6s ease;
        }

        .octa-dl-card:hover .octa-dl-image {
          transform: scale(1.06);
        }
      `}</style>

      <div className="octa-dl-section">
        <div className="octa-dl-inner">
          <div className="octa-dl-header"></div>

          <div className="octa-dl-grid">
            {DOWNLOADS.map((item) => (
              <DownloadCard
                key={item.id}
                item={item}
                onOpen={() => open(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {active && <ContactModal item={active} onClose={close} />}
    </>
  );
}
