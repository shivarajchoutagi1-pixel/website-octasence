'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const IndiaFlag: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    width="24"
    height="16"
    style={{ borderRadius: 2, flexShrink: 0 }}
  >
    <rect width="900" height="200" y="0" fill="#FF9933" />
    <rect width="900" height="200" y="200" fill="#FFFFFF" />
    <rect width="900" height="200" y="400" fill="#138808" />
    <circle
      cx="450"
      cy="300"
      r="60"
      fill="none"
      stroke="#000080"
      strokeWidth="4"
    />
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={450 + 20 * Math.cos(rad)}
          y1={300 + 20 * Math.sin(rad)}
          x2={450 + 58 * Math.cos(rad)}
          y2={300 + 58 * Math.sin(rad)}
          stroke="#000080"
          strokeWidth="3"
        />
      );
    })}
    <circle cx="450" cy="300" r="10" fill="#000080" />
  </svg>
);

const EstoniaFlag: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    width="24"
    height="16"
    style={{ borderRadius: 2, flexShrink: 0 }}
  >
    <rect width="900" height="200" y="0" fill="#0072CE" />
    <rect width="900" height="200" y="200" fill="#000000" />
    <rect width="900" height="200" y="400" fill="#FFFFFF" />
  </svg>
);

const VideoPanel: React.FC = () => (
  <section className="flex-1 relative flex items-center justify-center p-8 overflow-hidden min-h-[300px] lg:min-h-0">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      src="/videos/career_bg.mp4"
    />
    <div className="absolute inset-0 bg-[#07070f]/80" />
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[100px] opacity-20 bg-blue-600 pointer-events-none" />

    <div className="relative z-10 max-w-sm w-full text-white">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        Contact Us
      </div>

      <h2 className="text-3xl font-bold mb-6 tracking-tight leading-tight">
        Get in touch
      </h2>

      <div className="mb-4 p-4 rounded-xl border border-white/[0.12] bg-white/[0.06]">
        <p className="text-sm font-bold mb-1.5 flex items-center gap-2 text-white">
          <IndiaFlag />
          India Office
        </p>
        <p className="text-white/80 text-sm font-medium leading-relaxed">
          No 589, 14th Main Road,
          <br />
          Kumaraswamy Layout,
          <br />
          Bengaluru, Karnataka - 560078, India
        </p>
      </div>

      <div className="mb-5 p-4 rounded-xl border border-white/[0.12] bg-white/[0.06]">
        <p className="text-sm font-bold mb-1.5 flex items-center gap-2 text-white">
          <EstoniaFlag />
          Estonia Office
        </p>
        <p className="text-white/80 text-sm font-medium leading-relaxed">
          Ahtri 12, Tallinn 15551,
          <br />
          Estonia, European Union
        </p>
      </div>

      <p className="text-white/80 text-sm font-medium">
        You can also contact us by email to:{' '}
        <a
          href="mailto:admin@octasence.com"
          className="text-blue-300 hover:text-blue-200 transition-colors underline font-semibold"
        >
          admin@octasence.com
        </a>
      </p>
    </div>
  </section>
);

const FormPage: React.FC = () => {
  const router = useRouter();

  const mapCategoryToApi = (): string => 'general';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const body = {
      name: formData.fullName, // ✅ FIX HERE
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || 'Failed to submit form');
      }
    } catch (err) {
      setError('Oops! Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (success) {
    return (
      <div
        className="flex w-full flex-col lg:flex-row"
        style={{
          height: 'calc(100vh - 132px)',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <VideoPanel />
        <section
          className="flex-1 w-full flex flex-col justify-center p-8 relative"
          style={{ background: '#0a0a14' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-lg mx-auto w-full p-6 rounded-xl border border-white/[0.07] bg-white/[0.03]"
            style={{ boxShadow: '0 0 32px rgba(37,99,235,0.12)' }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Sent
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Message received!
            </h2>
            <p className="text-white/50 mb-6 text-sm">
              Your message has been sent successfully. We&apos;ll get back to
              you soon.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 rounded-full bg-[#0000FF] text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/30"
            >
              Send another message
            </button>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div
      className="flex w-full flex-col lg:flex-row"
      style={{
        height: 'calc(100vh - 132px)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <VideoPanel />

      {/* ── RIGHT: Form Panel ── */}
      <section
        className="flex-1 w-full flex flex-col justify-start pt-8 p-8 overflow-y-auto relative"
        style={{ background: '#0a0a14' }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <motion.section
          className="relative z-10 max-w-lg w-full mx-auto pt-6"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          {/* Back */}
          <button
            onClick={() => {
              router.back();
              setFormData({ fullName: '', email: '', phone: '', message: '' });
              setError(null);
            }}
            className="mb-6 text-white/75 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-blue-500/40 px-4 py-2 rounded-full"
            aria-label="Go back to contact options"
          >
            <FiArrowLeft size={15} />
            Back
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Send a message
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              We&apos;d love to hear from you
            </h3>
            <div className="w-16 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3" />
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <FormField
              id="fullName"
              label="Full name"
              placeholder="Enter your full name"
            >
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full p-3 rounded-lg border border-white/[0.07] bg-white/[0.03] text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.05] transition-all text-sm"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </FormField>

            {/* Email */}
            <FormField id="email" label="Email address">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded-lg border border-white/[0.07] bg-white/[0.03] text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.05] transition-all text-sm"
                required
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormField>

            {/* Phone */}
            <FormField id="phone" label="Phone number">
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-3 rounded-lg border border-white/[0.07] bg-white/[0.03] text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.05] transition-all text-sm"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormField>

            {/* Message */}
            <FormField id="message" label="Your message *">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-3 rounded-lg border border-white/[0.07] bg-white/[0.03] text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.05] transition-all text-sm resize-none"
                required
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </FormField>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="mt-1 accent-blue-500"
                required
              />
              <label
                htmlFor="terms"
                className="text-white/40 text-xs leading-relaxed"
              >
                I agree to the{' '}
                <a
                  href="/legal/terms-of-service"
                  className="text-blue-400 underline hover:text-blue-300 transition-colors"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/legal/privacy-policy"
                  className="text-blue-400 underline hover:text-blue-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 rounded-full bg-[#0000FF] text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/30 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </motion.section>
      </section>
    </div>
  );
};

// Small helper to keep form fields DRY
const FormField: React.FC<{
  id: string;
  label: string;
  placeholder?: string;
  children: React.ReactNode;
}> = ({ id, label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="text-white/50 text-xs font-medium tracking-wide uppercase"
    >
      {label}
    </label>
    {children}
  </div>
);

export default FormPage;
