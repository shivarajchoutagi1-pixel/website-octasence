'use client';
import React, { useEffect, useState } from 'react';

import { CustomButton } from '@/components/ui';
import mainConfig from '@/configs/mainConfigs';
import { externalService } from '@/services/apiService';

import { trackEvent } from '../GoogleAnalytics';

const inputClassName =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-blue-400/60 focus:bg-white/[0.07]';

const NewsLetter: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>(
    'idle',
  );
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus('idle');

    const formData = {
      email,
      firstName,
      lastName,
    };

    try {
      const response = await externalService.subscribeToNewsletter(formData);
      if (response.success) {
        setFormStatus('success');
        trackEvent({
          action: 'submit_form',
          category: 'newsletter',
          label: 'newsletter_subscription',
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormStatus('idle');
    setEmail('');
    setFirstName('');
    setLastName('');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (formStatus === 'success') {
      timer = setTimeout(() => {
        handleReset();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [formStatus]);

  return (
    <section className="px-4">
      <div
        className={`${mainConfig.containerClass} octa-card relative overflow-hidden px-6 py-12 md:px-10 md:py-16`}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-12">
          {formStatus === 'idle' ? (
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-12 w-full">
              <div className="lg:w-1/2 text-center lg:text-left space-y-5">
                <div className="octa-pill">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Stay Connected
                </div>
                <h2 className="octa-heading text-3xl md:text-5xl">
                  Subscribe to the{' '}
                  <span className="octa-accent-text">OctaSence</span> newsletter
                </h2>
                <p className="octa-lead text-lg">
                  Get product updates, deployment stories, research notes, and
                  practical insights on intelligent infrastructure monitoring.
                </p>
              </div>
              <form
                className="lg:w-1/2 flex flex-col space-y-4 w-full max-w-xl"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col md:flex-row md:space-x-4 w-full gap-4 md:gap-0">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className={inputClassName}
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className={inputClassName}
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-4 md:flex-row w-full">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={inputClassName}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CustomButton
                    type="submit"
                    className="octa-button min-w-[170px]"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Subscribe'}
                  </CustomButton>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-md text-center space-y-4">
              {formStatus === 'success' ? (
                <>
                  <span className="octa-pill mx-auto">Success</span>
                  <p className="text-white/80 text-[20px] leading-relaxed">
                    Thank you for signing up. We will send you an email to
                    confirm your subscription shortly.
                  </p>
                </>
              ) : (
                <>
                  <span className="octa-pill mx-auto">Error</span>
                  <p className="text-red-300 text-[20px]">
                    Oops! Something went wrong. Please try again.
                  </p>
                  <CustomButton onClick={handleReset} className="octa-button">
                    Try Again
                  </CustomButton>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
