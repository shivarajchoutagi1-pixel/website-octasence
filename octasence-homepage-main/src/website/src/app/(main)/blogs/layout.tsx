import { Metadata } from 'next';
import React from 'react';

import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | Octasence',
    default: 'Blogs | Infrastructure Intelligence',
  },
  description:
    'Octasence blogs, engineering insights, and structural health monitoring updates.',
  keywords:
    'Octasence blogs, structural health monitoring blog, engineering insights, geotechnical intelligence, infrastructure AI',
};

type BlogsLayoutProps = {
  children: React.ReactNode;
};

export default function BlogsLayout({ children }: BlogsLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
