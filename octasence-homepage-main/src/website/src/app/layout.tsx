/* eslint-disable simple-import-sort/imports */
import './globals.css';

import { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ReactNode, Suspense, lazy } from 'react';

import CookieConsent from '@/components/CookieConsent';
import ExternalLinkDecorator from '@/components/ExternalLinkDecorator';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ChatbotWidget from '@/components/ChatbotWidget';
import GoogleTranslate from '@/components/GoogleTranslate';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ErrorBoundary } from '@/components/ui';
import { ReduxDataProvider } from '@/context/ReduxDataProvider';
import { AuthProvider } from '@/context/AuthProvider';
import { SwrProvider } from '@/services/providers/SwrProvider';
import { generateViewport } from '@/lib/metadata';

// Lazy load non-critical components
const EngagementDialog = lazy(
  () => import('@/components/dialogs/EngagementDialog'),
);
const FloatingMiniBillboardWrapper = lazy(
  () => import('@/components/FloatingMiniBillboardWrapper'),
);

const interFont = localFont({
  src: [
    {
      path: '../fonts/Inter-VariableFont_opsz,wght.ttf',
      style: 'normal',
      weight: '100 900',
    },
    {
      path: '../fonts/Inter-Italic-VariableFont_opsz,wght.ttf',
      style: 'italic',
      weight: '100 900',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif',
  ],
  adjustFontFallback: 'Arial',
});

// Default metadata - will be overridden by page-specific metadata
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
      'https://octasense.com',
  ),
  title: {
    default:
      'Octasense | Agentic AI Infrastructure for Structural Health Monitoring',
    template: '%s | Octasense | Agentic AI Infrastructure',
  },
  description:
    'Octasense delivers AI-powered structural health monitoring solutions that predict, detect, and prevent infrastructure failures. Real-time sensor data, anomaly detection, and predictive analytics for bridges, buildings, dams, and critical civil infrastructure.',
  keywords: [
    'Octasense',
    'structural health monitoring',
    'SHM system',
    'infrastructure monitoring',
    'AI structural monitoring',
    'predictive structural analysis',
    'agentic AI infrastructure',
    'bridge health monitoring',
    'building structural monitoring',
    'dam safety monitoring',
    'tunnel monitoring system',
    'pipeline integrity monitoring',
    'tower monitoring AI',
    'civil infrastructure monitoring',
    'structural anomaly detection',
    'vibration monitoring system',
    'real-time structural data',
    'predictive maintenance infrastructure',
    'IoT structural sensors',
    'digital twin infrastructure',
    'structural failure prediction',
    'machine learning civil engineering',
    'deep learning structural analysis',
    'AI predictive maintenance',
    'sensor fusion structural',
    'continuous structural monitoring',
    'civil engineering AI',
    'structural engineering software',
    'geotechnical monitoring',
    'seismic monitoring AI',
    'fatigue analysis structures',
    'load monitoring bridges',
    'displacement monitoring',
    'strain gauge monitoring',
    'infrastructure asset management',
    'structural risk assessment',
    'bridge safety AI',
    'early warning structural failure',
    'infrastructure lifecycle management',
    'smart infrastructure monitoring',
    'condition-based maintenance',
    'structural integrity assessment',
    'construction technology AI',
    'smart cities infrastructure',
    'critical infrastructure protection',
    'infrastructure resilience',
  ],
  authors: [{ name: 'Octasense' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
      'https://octasense.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url:
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
      'https://octasense.com',
    siteName: 'Octasense',
    title:
      'Octasense | AI-Powered Structural Health Monitoring & Predictive Infrastructure Analytics',
    description:
      'Octasense uses agentic AI to monitor structural health in real time — detecting anomalies, predicting failures, and extending the life of bridges, buildings, dams, and critical infrastructure before problems occur.',
    images: [
      {
        url: '/assets/images/logo.avif',
        width: 1200,
        height: 630,
        alt: 'Octasense - Agentic AI Infrastructure for Structural Health Monitoring',
        type: 'image/avif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Octasense',
    creator: '@Octasense',
    title: 'Octasense | AI Structural Health Monitoring',
    description:
      'Real-time AI-powered structural health monitoring for bridges, buildings, dams, and critical infrastructure. Predict failures before they happen with Octasense.',
    images: [
      {
        url: '/assets/images/logo.avif',
        alt: 'Octasense - AI-Powered Structural Health Monitoring',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/assets/images/logo.avif',
    shortcut: '/assets/images/logo.avif',
    apple: '/assets/images/logo.avif',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'apple-mobile-web-app-title': 'Octasense',
    'theme-color': '#145DFF',
    'msapplication-TileColor': '#145DFF',
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://octasense.com/';
  const siteUrl = rawSiteUrl.replace(/\/$/, '') + '/';
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: siteUrl,
    name: 'Octasense',
    alternateName: 'Octasense Agentic AI Infrastructure',
    description:
      'Octasense delivers AI-powered structural health monitoring solutions that predict, detect, and prevent infrastructure failures. We provide real-time sensor data, anomaly detection, and predictive analytics for bridges, buildings, dams, tunnels, and critical civil infrastructure.',
    logo: `${siteUrl}assets/images/logo.avif`,
    sameAs: [
      'https://www.linkedin.com/company/octasense',
      'https://x.com/Octasense',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${siteUrl}contact`,
      availableLanguage: ['English'],
    },
    knowsAbout: [
      'Structural Health Monitoring',
      'Agentic AI',
      'Predictive Maintenance',
      'Infrastructure Analytics',
      'Anomaly Detection',
      'Civil Engineering AI',
      'IoT Sensor Systems',
      'Digital Twins',
      'Bridge Monitoring',
      'Dam Safety Monitoring',
      'Real-time Structural Data',
      'Machine Learning for Infrastructure',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Structural Health Monitoring Solutions',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI-Powered Structural Monitoring',
            description:
              'Real-time structural health monitoring using agentic AI to detect anomalies and predict failures across bridges, buildings, dams, and tunnels.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Predictive Infrastructure Analytics',
            description:
              'Advanced machine learning models that forecast structural degradation and maintenance needs before failures occur.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'IoT Sensor Integration',
            description:
              'End-to-end deployment of smart sensor networks for continuous, real-time structural data acquisition.',
          },
        },
      ],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}explore?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={interFont.variable}>
      <head>
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="//www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/logo.avif"
          type="image/avif"
        />
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ExternalLinkDecorator />
        <Suspense fallback={null}>
          <GoogleAnalytics measurementId={gaMeasurementId} />
        </Suspense>
        <ErrorBoundary>
          <ReduxDataProvider>
            <AuthProvider>
              <SwrProvider>
                {children}
                <Suspense fallback={null}>
                  <EngagementDialog />
                </Suspense>
              </SwrProvider>
            </AuthProvider>
          </ReduxDataProvider>
        </ErrorBoundary>
        <CookieConsent />
        <Suspense fallback={null}>
          <FloatingMiniBillboardWrapper />
        </Suspense>
        <GoogleTranslate />
        <ChatbotWidget />
        <WhatsAppButton />
      </body>
    </html>
  );
}

export const viewport = generateViewport();
