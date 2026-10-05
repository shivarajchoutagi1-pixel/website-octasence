import { Metadata } from 'next';
import React from 'react';

import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | Octasence',
    default: 'About Octasence | Infrastructure Intelligence',
  },
  description:
    'Learn about Octasence—our mission, founders, and team building agentic AI for structural health monitoring and geotechnical intelligence.',
  keywords:
    'Octasence, about Octasence, infrastructure AI, structural monitoring, geotechnical intelligence, founders',
};

type AboutLayoutProps = {
  children: React.ReactNode;
};

const AboutLayout: React.FC<AboutLayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default AboutLayout;
