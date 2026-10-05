'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ScrollToTopButton from './ScrollToTopButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="WebsiteFooter"
      className="relative py-14 px-6 w-full text-[15px]"
    >
      <ScrollToTopButton />

      <div className="octa-card relative w-full overflow-hidden rounded-[2rem] px-8 py-12 md:px-14">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* GRID */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-16 items-start">
          {/* LEFT */}
          <div className="flex flex-col items-start text-left space-y-5 max-w-[340px]">
            <Image
              src="/assets/images/logo.avif"
              alt="OctaSence logo"
              width={320}
              height={240}
              className="h-40 w-auto object-contain"
            />

            <p className="text-white/70 text-sm leading-[1.5]">
              In an era where infrastructure failures strike without warning,
              OctaSence revolutionizes safety with Agentic AI-powered
              Geotechnical Intelligence and Structural Health Monitoring (SHM).
            </p>

            <p className="text-white/70 text-sm leading-[1.5]">
              We fuse multimodal IoT sensors, real-time digital twins, and
              predictive analytics to deliver autonomous early warnings for
              mines, dams, tunnels, and civil assets—turning raw signals into
              actionable insights that prevent disasters.
            </p>

            <p className="text-white/70 text-sm leading-[1.5]">
              Empowering mining and engineering teams worldwide, our platform
              ensures zero catastrophic failures, making critical infrastructure
              resilient and lives secure.
            </p>

            <div className="flex space-x-4 pt-2">
              <Link href="https://www.linkedin.com/company/octasence" target="_blank" data-cta-category="footer" data-cta-label="social_linkedin" className="bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7"><path fill="#0A66C2" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </Link>
              <Link href="https://www.youtube.com/@octasence" target="_blank" data-cta-category="footer" data-cta-label="social_youtube" className="bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7"><path fill="#FF0000" d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81z"/><path fill="#FFF" d="m10 15l5-3l-5-3v6z"/></svg>
              </Link>
              <Link href="https://x.com/octasence" target="_blank" data-cta-category="footer" data-cta-label="social_x" className="bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7"><path fill="#FFF" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Link>
              <Link href="https://www.instagram.com/octasence" target="_blank" data-cta-category="footer" data-cta-label="social_instagram" className="bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7"><radialGradient id="instagram-gradient" r="150%" cx="30%" cy="107%"><stop stopColor="#fdf497" offset="0%" /><stop stopColor="#fdf497" offset="5%" /><stop stopColor="#fd5949" offset="45%" /><stop stopColor="#d6249f" offset="60%" /><stop stopColor="#285AEB" offset="90%" /></radialGradient><path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0"/><path fill="#FFF" d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881"/></svg>
              </Link>
            </div>
          </div>

          {/* PLATFORM */}
          <div className="flex flex-col items-start pt-10">
            <h3 className="font-semibold text-white text-xl mb-5">Platform</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/platforms-suite#smart-sensors" data-cta-category="footer" data-cta-label="platform_smart_sensors" className="text-white/85 hover:text-white">Smart Sensors</Link></li>
              <li><Link href="/platforms-suite#ai-platform" data-cta-category="footer" data-cta-label="platform_ai_platform" className="text-white/85 hover:text-white">AI Platform</Link></li>
              <li><Link href="/platforms-suite#data-api" data-cta-category="footer" data-cta-label="platform_data_apis" className="text-white/85 hover:text-white">Data APIs</Link></li>
              <li><Link href="/platforms-suite#digital-twin" data-cta-category="footer" data-cta-label="platform_digital_twin" className="text-white/85 hover:text-white">Digital Twin</Link></li>
            </ul>
          </div>

          {/* SOLUTIONS */}
          <div className="flex flex-col items-start pt-10">
            <h3 className="font-semibold text-white text-xl mb-5">Solutions</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/solutions-infrastructure-intelligence" data-cta-category="footer" data-cta-label="solutions_infrastructure_intelligence" className="text-white/85 hover:text-white">Infrastructure Intelligence</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" data-cta-category="footer" data-cta-label="solutions_mining" className="text-white/85 hover:text-white">Mining</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" data-cta-category="footer" data-cta-label="solutions_tunnels_bridges" className="text-white/85 hover:text-white">Tunnels & Bridges</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" data-cta-category="footer" data-cta-label="solutions_dams_reservoirs" className="text-white/85 hover:text-white">Dams & Reservoirs</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" data-cta-category="footer" data-cta-label="solutions_industrial_iot" className="text-white/85 hover:text-white">Industrial IoT</Link></li>
            </ul>
          </div>

          {/* ABOUT */}
          <div className="flex flex-col items-start pt-10">
            <h3 className="font-semibold text-white text-xl mb-5">About</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/about-us" data-cta-category="footer" data-cta-label="about_about_octasence" className="text-white/85 hover:text-white">About OctaSence</Link></li>
              <li><Link href="/careers" data-cta-category="footer" data-cta-label="about_careers" className="text-white/85 hover:text-white">Careers</Link></li>
              <li><Link href="/contact" data-cta-category="footer" data-cta-label="about_contact_us" className="text-white/85 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative z-10 border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center text-[14px] md:text-[15px]">
          <p className="max-w-3xl text-white/50 text-sm leading-relaxed">
            <span className="font-semibold text-white/70">Disclaimer:</span> OctaSence strives to provide accurate and up-to-date information; however, we are not liable for discrepancies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-white/60">
            <span>© {currentYear} OctaSence. All rights reserved.</span>
            <span className="text-white/30">|</span>
            <Link href="/legal/terms-of-service" data-cta-category="footer" data-cta-label="legal_terms" className="hover:text-white">Terms</Link>
            <span className="text-white/30">|</span>
            <Link href="/legal/privacy-policy" data-cta-category="footer" data-cta-label="legal_privacy" className="hover:text-white">Privacy</Link>
          </div>

          <div className="text-white/40 text-xs tracking-[0.25em] uppercase pt-2">
            AI-Powered Infrastructure Intelligence
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
