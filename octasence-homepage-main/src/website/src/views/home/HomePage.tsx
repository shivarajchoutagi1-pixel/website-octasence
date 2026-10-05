'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

import FloatingVideoPlayer from '@/components/Floatingvideoplayer';
import ReversibleContentSection from '@/components/sections/ReversibleContentSection';

import AnalyticsContentSection from './AnalyticsContentSection';
import HomePlayerSection from './HomePlayerSection';
import StatisticsSection from './HomeStatsSection';
import PlatformShowcase from './PlatformShowcase';
import CityZoomHero from '@/components/CityZoomHero';
import ConeScene from '@/components/ConeScene';

// Optimized animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const HomePage = () => {
  const MotionSection = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: '0px 0px -100px 0px',
      amount: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={sectionVariants}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="w-full home-page">
      {/* Floating Elements (Handled in RootLayout) */}
      <FloatingVideoPlayer />

      {/* Hero Section */}
      <HomePlayerSection />

      {/* Subsequent Sections */}
      <div className="space-y-20 mt-20">
        {/* Statistics / Value Section */}
        <MotionSection>
          <StatisticsSection />
        </MotionSection>
        <ConeScene/>


        <PlatformShowcase />
        
        {/* AI Monitoring Platform */}
        <MotionSection>
          <AnalyticsContentSection
            title="An intelligent infrastructure monitoring platform"
            subtitle="AI Monitoring Platform"
            description="Access and visualize real-time and historical structural health data across your infrastructure portfolio through our AI-powered analytics dashboard. Detect anomalies, forecast risks, and act before failures happen."
            buttonText="Learn more"
            buttonLink="/products-infrastructure-intelligence"
            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
            backgroundColor="bg-[#EDF3FF]"
            subtitleColor="text-black"
            subtitleBgColor="bg-white"
            titleClassName="text-[#08162C]"
            descriptionClassName="text-[#31456F]"
            linkClassName="text-[#0F47D7]"
          />
        </MotionSection>

        {/* Developer Data APIs */}
        <MotionSection>
          <ReversibleContentSection
            title="Build with OctaSence infrastructure data"
            subtitle="Developer Data APIs"
            description="Are you a developer or systems integrator? Leverage our open infrastructure monitoring APIs to embed real-time structural health data into your own applications and workflows."
            buttonText="Get started"
            buttonLink="/products-infrastructure-intelligence"
            imageUrl="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
            reverse={false}
            backgroundColor="bg-transparent"
            subtitleColor="text-blue-100"
            subtitleBgColor="bg-white/10"
            titleClassName="text-white"
            descriptionClassName="text-white/80"
            linkClassName="text-blue-300"
            leftWidth="lg:w-1/3"
            rightWidth="lg:w-2/3"
          />
        </MotionSection>

        {/* Smart Infrastructure Sensors */}
        <MotionSection>
          <ReversibleContentSection
            title="Smart Infrastructure Sensors"
            subtitle="IoT Sensor Hardware"
            description="OctaSence deploys rugged industrial IoT sensors that capture strain, displacement, vibration, groundwater pressure, and environmental conditions. Built to withstand extreme environments across mines, tunnels, dams, and bridges — delivering continuous, reliable data streams."
            buttonText="Learn more"
            buttonLink="/products-infrastructure-intelligence"
            imageUrl="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
            reverse={false}
            backgroundColor="bg-[#EDF3FF]"
            subtitleColor="text-black"
            subtitleBgColor="bg-white"
            titleClassName="text-[#08162C]"
            descriptionClassName="text-[#31456F]"
            linkClassName="text-[#0F47D7]"
          />
        </MotionSection>

        {/* Network Coverage / Deployment Map */}
        <MotionSection>
          <ReversibleContentSection
            title="Discover Our Deployment Coverage"
            subtitle="Deployment Map"
            description={
              <div>
                Explore the locations of our structural health monitoring
                systems deployed across industrial sites, mining operations, and
                critical infrastructure in Africa and beyond.
              </div>
            }
            buttonText="View Deployments"
            buttonLink="/products-infrastructure-intelligence"
            imageUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
            backgroundColor="bg-transparent"
            reverse={true}
            subtitleColor="text-blue-100"
            subtitleBgColor="bg-white/10"
            titleClassName="text-white"
            descriptionClassName="text-white/80"
            linkClassName="text-blue-300"
            imageClassName="object-cover rounded-xl"
          />
        </MotionSection>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .home-page,
        .home-page * {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
