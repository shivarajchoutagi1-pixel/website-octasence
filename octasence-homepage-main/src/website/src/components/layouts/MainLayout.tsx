'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { cn } from '@/lib/utils';

import ActionButtons from './ActionButtons';
import Footer from './Footer';

import Navbar from './Navbar';
import NewsLetter from './NewsLetter';

interface MainLayoutProps {
  children: React.ReactNode;
  // Optional full-width element rendered above the centered container (e.g., full-width hero)
  topFullWidth?: React.ReactNode;
  noPaddingTop?: boolean;
}

const MainLayout = ({
  children,
  topFullWidth,
  noPaddingTop,
}: MainLayoutProps) => {
  const pathname = usePathname();
  const showHighlight = pathname !== '/' && pathname !== '/home';

  return (
    <div className="octa-shell min-h-screen w-full flex flex-col overflow-x-hidden">
      <div className="octa-grid absolute inset-0 opacity-[0.08] pointer-events-none" />
      <div className="absolute top-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[120px] pointer-events-none" />
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        className={cn('relative z-10 flex-1 pb-8', !noPaddingTop && 'pt-28')}
      >
        <PageTransitionWrapper>
          {/* Optional full-width area inserted before the centered container */}
          {topFullWidth}

          <div className="w-full text-white/88">{children}</div>

          

          {/* Action Buttons Section */}
          {pathname !== '/careers' && (
            <section className="my-8">
              <ActionButtons />
            </section>
          )}
        </PageTransitionWrapper>
      </main>

      <footer>
        {/* Newsletter Section */}
        <section className="my-16">
          <NewsLetter />
        </section>

        {/* Footer Section */}
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
