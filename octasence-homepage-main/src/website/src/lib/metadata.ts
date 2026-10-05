import { Metadata, Viewport } from 'next';

// Type definitions for better type safety
interface ImageMetadata {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  type?: string;
}

interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  image?: ImageMetadata;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

interface DomainConfig {
  domain: string;
  protocol: 'https';
  www: boolean;
}

// Constants for domain configuration
const DOMAIN_CONFIGS: DomainConfig[] = [
  { domain: 'octasence.com', protocol: 'https', www: false },
  { domain: 'octasence.com', protocol: 'https', www: true },
];

// Generate supported domains from configs
const SUPPORTED_DOMAINS = DOMAIN_CONFIGS.map(
  (config) =>
    `${config.protocol}://${config.www ? 'www.' : ''}${config.domain}`,
);

// Primary domains for fallback (without www)
const PRIMARY_DOMAINS = ['https://octasence.com'];

// Cache for domain detection to avoid repeated calculations
let cachedDomain: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60000; // 1 minute cache

// Default metadata configuration
const DEFAULT_METADATA = {
  siteName: 'Octasence | Agentic AI Infrastructure',
  siteUrl: 'https://octasence.com',
  defaultImage: {
    url: 'https://octasence.com/assets/images/og-image.png',
    alt: 'Octasence — Agentic AI Infrastructure Intelligence',
    width: 1200,
    height: 630,
    type: 'image/png',
  },
  twitterHandle: '@Octasence',
  locale: 'en_US',
  themeColor: '#145DFF',
} as const;

// Utility: remove empty or falsy entries from an object (shallow)
const compact = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== '' && v != null),
  );

// Enhanced logging utilities with environment checks
const isDev = process.env.NODE_ENV === 'development';
const isDebugMode = process.env.NEXT_PUBLIC_DEBUG_METADATA === 'true';

const logDebug = (...args: any[]): void => {
  if (isDev && isDebugMode) {
    console.log('[Octasence Metadata]', ...args);
  }
};

const logWarn = (...args: any[]): void => {
  if (isDev) {
    console.warn('[Octasence Metadata Warning]', ...args);
  }
};

const logError = (...args: any[]): void => {
  console.error('[Octasence Metadata Error]', ...args);
};

/**
 * Validates if a URL is from a supported domain
 * @param url - URL to validate
 * @returns boolean indicating if URL is valid
 */
const isValidDomain = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return SUPPORTED_DOMAINS.some((domain) => {
      const domainObj = new URL(domain);
      return urlObj.hostname === domainObj.hostname;
    });
  } catch {
    return false;
  }
};

/**
 * Sanitizes and normalizes URLs
 * @param url - URL to sanitize
 * @returns Sanitized URL string
 */
const sanitizeUrl = (url: string): string => {
  try {
    const normalized = url.replace(/\/+$/, '');
    if (!isValidDomain(normalized)) {
      logWarn(`URL not from supported domain: ${normalized}`);
      return PRIMARY_DOMAINS[0];
    }
    return normalized;
  } catch (error) {
    logError('URL sanitization failed:', error);
    return PRIMARY_DOMAINS[0];
  }
};

/**
 * Enhanced domain detection with multiple methods and caching
 */
const getCurrentDomain = (): string => {
  const now = Date.now();
  if (cachedDomain && now - cacheTimestamp < CACHE_DURATION) {
    return cachedDomain;
  }

  let detectedDomain: string | null = null;

  // Method 1: Client-side detection (browser environment)
  if (typeof window !== 'undefined' && window.location) {
    try {
      const origin = window.location.origin;
      if (origin && isValidDomain(origin)) {
        detectedDomain = sanitizeUrl(origin);
        logDebug('Client-side domain detected:', detectedDomain);
      }
    } catch (error) {
      logWarn('Client-side domain detection failed:', error);
    }
  }

  // Method 2: Environment variable detection
  if (!detectedDomain) {
    const envUrls = [
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.NEXT_PUBLIC_DOMAIN,
      process.env.SITE_URL,
      process.env.DOMAIN,
    ].filter(Boolean);

    for (const envUrl of envUrls) {
      if (envUrl) {
        try {
          const normalizedUrl = envUrl.replace(/\/$/, '');
          if (isValidDomain(normalizedUrl)) {
            detectedDomain = sanitizeUrl(normalizedUrl);
            logDebug('Environment domain detected:', detectedDomain);
            break;
          }
        } catch (error) {
          logWarn(`Environment URL parsing failed for ${envUrl}:`, error);
        }
      }
    }
  }

  // Method 3: Platform-specific detection (Vercel, Railway, Render, etc.)
  if (!detectedDomain && typeof process !== 'undefined') {
    const platformVars = [
      process.env.VERCEL_URL,
      process.env.RAILWAY_PUBLIC_DOMAIN,
      process.env.RENDER_EXTERNAL_URL,
      process.env.NEXT_PUBLIC_VERCEL_URL,
    ].filter(Boolean);

    for (const host of platformVars) {
      if (host) {
        try {
          const fullUrl = host.startsWith('http') ? host : `https://${host}`;
          const normalizedUrl = fullUrl.replace(/\/$/, '');
          const hostname = new URL(normalizedUrl).hostname;
          const matchedDomain = SUPPORTED_DOMAINS.find(
            (domain) => new URL(domain).hostname === hostname,
          );
          if (matchedDomain) {
            detectedDomain = sanitizeUrl(matchedDomain);
            logDebug('Platform domain detected:', detectedDomain);
            break;
          }
        } catch (error) {
          logWarn(`Platform URL parsing failed for ${host}:`, error);
        }
      }
    }
  }

  // Method 4: Headers detection (for server-side rendering)
  if (!detectedDomain && typeof Headers !== 'undefined') {
    try {
      const headerHost = process.env.HOST || process.env.HOSTNAME;
      if (headerHost) {
        const fullUrl = headerHost.startsWith('http')
          ? headerHost
          : `https://${headerHost}`;
        if (isValidDomain(fullUrl)) {
          detectedDomain = sanitizeUrl(fullUrl);
          logDebug('Header-based domain detected:', detectedDomain);
        }
      }
    } catch (error) {
      logWarn('Header-based domain detection failed:', error);
    }
  }

  // Fallback to primary domain
  if (!detectedDomain) {
    detectedDomain = PRIMARY_DOMAINS[0];
    logDebug('Using fallback domain:', detectedDomain);
  }

  cachedDomain = detectedDomain;
  cacheTimestamp = now;
  return detectedDomain;
};

/**
 * Get domain for specific contexts with optimization
 */
export const getDomainForContext = (
  context?: 'social' | 'canonical' | 'api' | 'cdn',
): string => {
  const detectedDomain = getCurrentDomain();

  if (context === 'social') {
    try {
      const hostname = new URL(detectedDomain).hostname;
      if (hostname.includes('octasence.com')) return 'https://octasence.com';
    } catch (error) {
      logError('Social domain context failed:', error);
    }
  }

  if (context === 'api') {
    return detectedDomain;
  }

  return detectedDomain;
};

/**
 * Generate viewport configuration (Next.js 14.2+ requirement)
 */
export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  };
}

/**
 * Enhanced metadata generation with SEO optimization
 */
export function generateMetadata(config: MetadataConfig): Metadata {
  if (!config.title || !config.description || !config.url) {
    logError('Invalid metadata config: missing required fields', config);
    throw new Error('Metadata config must include title, description, and url');
  }

  const image = config.image || DEFAULT_METADATA.defaultImage;
  const canonicalDomain = getDomainForContext('canonical');
  const socialDomain = getDomainForContext('social');

  const fullUrl = config.url.startsWith('http')
    ? sanitizeUrl(config.url)
    : `${canonicalDomain}${config.url}`;

  const socialUrl = config.url.startsWith('http')
    ? sanitizeUrl(config.url)
    : `${socialDomain}${config.url}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'Octasence' }],
    creator: 'Octasence',
    publisher: 'Octasence',

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': fullUrl,
        'en-GB': fullUrl,
        'x-default': fullUrl,
      },
    },

    openGraph: {
      type: config.type || 'website',
      url: socialUrl,
      title: config.title,
      description: config.description,
      siteName: DEFAULT_METADATA.siteName,
      locale: DEFAULT_METADATA.locale,
      images: [
        {
          url: image.url,
          width: image.width || DEFAULT_METADATA.defaultImage.width,
          height: image.height || DEFAULT_METADATA.defaultImage.height,
          alt: image.alt,
          type: image.type || DEFAULT_METADATA.defaultImage.type,
          secureUrl: image.url,
        },
      ],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
      ...(config.author && { authors: [config.author] }),
      ...(config.section && { section: config.section }),
    },

    twitter: {
      card: 'summary_large_image',
      site: DEFAULT_METADATA.twitterHandle,
      creator: DEFAULT_METADATA.twitterHandle,
      title: config.title,
      description: config.description,
      images: [{ url: image.url, alt: image.alt }],
    },

    other: compact({
      'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
      'fb:pages': process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '',
      'article:publisher': 'https://www.linkedin.com/company/octasence/',
      'p:domain_verify': process.env.NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY || '',
      'twitter:domain': socialDomain.replace('https://', ''),
      'twitter:url': socialUrl,
      'apple-mobile-web-app-title': 'Octasence',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-touch-icon': '/apple-touch-icon.png',
      'msapplication-TileColor': DEFAULT_METADATA.themeColor,
      'msapplication-TileImage': '/mstile-144x144.png',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': DEFAULT_METADATA.themeColor,
      'mobile-web-app-capable': 'yes',
      'application-name': 'Octasence',
      'google-site-verification':
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
      'bing-verification': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      referrer: 'origin-when-cross-origin',
      'format-detection': 'telephone=no',
    }),

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      me: process.env.NEXT_PUBLIC_WEBMASTER_VERIFICATION,
    },

    appLinks: {
      ios: {
        url: fullUrl,
        app_store_id: process.env.NEXT_PUBLIC_IOS_APP_ID || '',
        app_name: 'Octasence',
      },
      android: {
        package:
          process.env.NEXT_PUBLIC_ANDROID_PACKAGE || 'com.octasence.app',
        app_name: 'Octasence',
        url: fullUrl,
      },
      web: {
        url: fullUrl,
        should_fallback: true,
      },
    },

    metadataBase: new URL(canonicalDomain),
    category: 'Technology',
    classification: 'Agentic AI Infrastructure',
  };
}

// Shared OG image used across all pages.
// Must be absolute URL + PNG/JPEG — avif is unsupported by most OG crawlers.
// To convert your avif: `npx sharp-cli logo.avif -o public/assets/images/og-image.png`
const OG_IMAGE = {
  url: 'https://octasence.com/assets/images/og-image.png',
  alt: 'Octasence — Agentic AI Infrastructure Intelligence',
  width: 1200,
  height: 630,
  type: 'image/png',
} as const;

// Page-specific metadata configurations
// All keys from the original file are preserved to avoid breaking existing page imports.
export const METADATA_CONFIGS = {
  home: {
    title: 'Octasence | Agentic AI Infrastructure',
    description:
      'Octasence builds agentic AI infrastructure for structural health monitoring and geotechnical intelligence. Real-time insights for mining, dams, tunnels, and critical infrastructure worldwide.',
    keywords:
      'agentic AI infrastructure, structural health monitoring, geotechnical intelligence, SHM platform, mining monitoring, dam safety AI, tunnel monitoring, infrastructure intelligence, real-time sensing, AI-driven monitoring',
    url: '/',
    image: OG_IMAGE,
  },
  about: {
    title: 'About Octasence | Agentic AI for Infrastructure Intelligence',
    description:
      'Meet the Octasence team: founders and operators building AI-driven structural health monitoring and geotechnical intelligence for mining, dams, tunnels, and critical infrastructure worldwide.',
    keywords:
      'Octasence about, infrastructure AI, structural health monitoring, geotechnical intelligence, agentic AI infrastructure, Octasence founders, SHM platform, mining monitoring, dam safety AI',
    url: '/about-us',
    image: OG_IMAGE,
  },
  monitor: {
    title: 'Octasence Monitor | Real-time Structural Health Monitoring Sensors',
    description:
      'Deploy Octasence monitoring hardware across mining sites, dams, tunnels, and critical infrastructure. Built for harsh industrial environments with real-time data streaming, edge computing, and ruggedized sensor arrays.',
    keywords:
      'structural health monitoring sensors, SHM hardware, geotechnical sensors, mining monitoring hardware, dam safety sensors, tunnel monitoring devices, industrial IoT sensors, ruggedized sensors, edge computing sensors',
    url: '/products/monitor',
    image: OG_IMAGE,
  },
  analytics: {
    title: 'Octasence Analytics | Infrastructure Intelligence Dashboard',
    description:
      'Track structural integrity, deformation, and geotechnical conditions in real time. Octasence analytics delivers live sensor data, historical trend analysis, anomaly detection, and risk alerts across your entire infrastructure portfolio.',
    keywords:
      'infrastructure analytics dashboard, structural health analytics, geotechnical data platform, SHM analytics, real-time deformation tracking, anomaly detection infrastructure, risk alerts mining, dam monitoring analytics',
    url: '/products/analytics',
    image: OG_IMAGE,
  },
  api: {
    title: 'Octasence API | Infrastructure Data Access for Developers',
    description:
      'Integrate Octasence structural and geotechnical data into your applications. Access real-time and historical sensor readings via a RESTful API with full documentation, SDKs, and a free developer tier.',
    keywords:
      'infrastructure API, structural health monitoring API, geotechnical data API, SHM developer API, real-time sensor API, historical data API, RESTful API infrastructure, developer SDK',
    url: '/products/api',
    image: OG_IMAGE,
  },
  mobileApp: {
    title: 'Octasence App | Infrastructure Monitoring in Your Pocket',
    description:
      'Monitor your infrastructure anywhere with the Octasence mobile app. Get live alerts, sensor readings, and risk summaries for your mining, dam, or tunnel assets. Available on iOS and Android.',
    keywords:
      'infrastructure monitoring app, SHM mobile app, structural health app, mining monitoring app, dam safety app, tunnel monitoring mobile, real-time alerts infrastructure',
    url: '/products/mobile-app',
    image: OG_IMAGE,
  },
  calibrate: {
    title: 'Octasence Calibrate | Sensor Calibration & Data Quality Assurance',
    description:
      'Ensure data accuracy with Octasence Calibrate — our advanced calibration platform for structural and geotechnical sensors. ML-based drift correction, quality assurance, and validation for reliable infrastructure monitoring.',
    keywords:
      'sensor calibration platform, infrastructure sensor calibration, ML calibration, drift correction SHM, data quality assurance, geotechnical sensor validation, structural monitoring QA',
    url: '/products/calibrate',
    image: OG_IMAGE,
  },
  contact: {
    title: 'Contact Octasence | Infrastructure AI Experts',
    description:
      'Get in touch with the Octasence team for partnership inquiries, technical support, or to discuss your infrastructure monitoring needs. We work with mining operators, dam owners, governments, and engineering firms worldwide.',
    keywords:
      'contact Octasence, infrastructure AI support, SHM partnership, geotechnical AI inquiry, mining monitoring contact, dam safety partnership',
    url: '/contact',
    image: OG_IMAGE,
  },
  exploreData: {
    title: 'Explore Infrastructure Data | Octasence Live Monitoring Map',
    description:
      'Interactive map of Octasence-monitored infrastructure assets worldwide. Explore real-time structural health, geotechnical conditions, and deformation data from mining, dam, and tunnel deployments.',
    keywords:
      'infrastructure monitoring map, SHM data explorer, geotechnical data map, live monitoring dashboard, mining data map, dam safety data, tunnel monitoring map',
    url: '/explore-data',
    image: OG_IMAGE,
  },
  // Solutions pages
  solutionsAfricanCities: {
    title: 'Octasence for Smart Cities | Urban Infrastructure Intelligence',
    description:
      'AI-driven infrastructure monitoring solutions for smart cities. Octasence helps city governments monitor bridges, tunnels, roads, and urban structures in real time to prevent failures and optimise maintenance.',
    keywords:
      'smart city infrastructure monitoring, urban SHM, bridge monitoring cities, tunnel monitoring urban, city infrastructure AI, smart city sensors',
    url: '/solutions/smart-cities',
    image: OG_IMAGE,
  },
  solutionsCommunities: {
    title: 'Octasence for Communities | Local Infrastructure Safety',
    description:
      'Empower communities with hyperlocal infrastructure monitoring. Octasence provides accessible tools for local governments, NGOs, and community organisations to track structural safety and geotechnical risk.',
    keywords:
      'community infrastructure monitoring, local SHM, grassroots infrastructure safety, NGO monitoring tools, community structural health',
    url: '/solutions/communities',
    image: OG_IMAGE,
  },
  solutionsResearch: {
    title: 'Octasence for Research | Academic & Scientific Data Access',
    description:
      'Free research data and API access for academic institutions and scientists. Octasence supports infrastructure research with validated sensor datasets, collaborative tools, and publication support.',
    keywords:
      'infrastructure research data, SHM academic API, geotechnical research datasets, structural monitoring research, academic data access',
    url: '/solutions/research',
    image: OG_IMAGE,
  },
  solutionsKampalaStudy: {
    title: 'Octasence Case Study | Urban Infrastructure Monitoring Pilot',
    description:
      'Explore how Octasence deployed real-time infrastructure monitoring in a high-density urban environment. Learn about sensor placement, data collection, and community outcomes from this pilot study.',
    keywords:
      'infrastructure monitoring case study, urban SHM pilot, structural health monitoring study, real-time monitoring deployment',
    url: '/solutions/case-study',
    image: OG_IMAGE,
  },
  careers: {
    title: 'Careers at Octasence | Join the Infrastructure AI Team',
    description:
      'Join Octasence and help build the future of AI-driven infrastructure intelligence. Open roles in data science, embedded engineering, geotechnical research, and product. Competitive compensation, remote-friendly, global impact.',
    keywords:
      'Octasence careers, infrastructure AI jobs, SHM engineering jobs, geotechnical AI careers, data science infrastructure, remote tech jobs, AI startup careers',
    url: '/careers',
    image: OG_IMAGE,
  },
  events: {
    title: 'Events & Conferences | Octasence Infrastructure AI',
    description:
      'Stay updated with Octasence events including industry conferences, technical workshops, webinars, and hackathons focused on AI-driven infrastructure monitoring and geotechnical intelligence.',
    keywords:
      'Octasence events, infrastructure AI conferences, SHM workshops, geotechnical webinars, mining monitoring events',
    url: '/events',
    image: OG_IMAGE,
  },
  press: {
    title: 'Press & Media | Octasence in the News',
    description:
      'Access Octasence press releases, media coverage, and journalist resources. Download press kits, high-resolution assets, and expert commentary on AI-powered infrastructure intelligence.',
    keywords:
      'Octasence press, media coverage, press releases, infrastructure AI news, SHM news, journalist resources, media kit',
    url: '/press',
    image: OG_IMAGE,
  },
  resources: {
    title: 'Resources & Publications | Octasence Research & Technical Guides',
    description:
      "Access Octasence's library of technical white papers, research publications, implementation guides, and case studies from our infrastructure monitoring deployments worldwide.",
    keywords:
      'Octasence resources, SHM white papers, infrastructure AI research, geotechnical publications, technical guides, case studies',
    url: '/resources',
    image: OG_IMAGE,
  },
  faqs: {
    title: 'FAQs | Octasence Infrastructure Monitoring Platform',
    description:
      'Find answers to common questions about Octasence sensors, data access, mobile app, API usage, partnerships, and infrastructure monitoring basics.',
    keywords:
      'Octasence FAQ, infrastructure monitoring questions, SHM help, geotechnical AI FAQ, sensor questions, data access FAQ, API documentation',
    url: '/faqs',
    image: OG_IMAGE,
  },
  partners: {
    title: 'Partners & Collaborators | Octasence Global Network',
    description:
      "Meet Octasence's strategic partners including mining operators, dam authorities, engineering firms, and research institutions advancing AI-driven infrastructure safety worldwide.",
    keywords:
      'Octasence partners, infrastructure AI partners, SHM collaborators, mining partners, dam safety partners, engineering firm partnerships',
    url: '/partners',
    image: OG_IMAGE,
  },
  // Legal pages
  privacyPolicy: {
    title: 'Privacy Policy | Octasence Data Protection',
    description:
      'Octasence privacy policy outlines how we collect, use, and protect your personal information. Learn about data security, user rights, GDPR compliance, and our commitment to protecting your privacy.',
    keywords:
      'Octasence privacy policy, data protection, GDPR compliance, user privacy, personal data security, privacy rights',
    url: '/legal/privacy-policy',
    image: OG_IMAGE,
  },
  termsOfService: {
    title: 'Terms of Service | Octasence Platform Usage Agreement',
    description:
      "Read Octasence's terms of service for using our infrastructure monitoring platform, mobile app, and API. Understand usage rights, limitations, and responsibilities.",
    keywords:
      'Octasence terms of service, usage agreement, platform terms, API terms, data usage rights, legal terms',
    url: '/legal/terms-of-service',
    image: OG_IMAGE,
  },
  paymentRefundPolicy: {
    title: 'Payment & Refund Policy | Octasence Services Billing Terms',
    description:
      "Understand Octasence's payment processing, billing cycles, and refund policies for platform subscriptions, API access, and monitoring solutions.",
    keywords:
      'Octasence payment policy, refund terms, billing policy, payment processing, subscription billing',
    url: '/legal/payment-refund-policy',
    image: OG_IMAGE,
  },
  // Retained as `airqoDataPolicy` to avoid breaking existing page imports.
  // Migrate call sites to `dataPolicy` when convenient.
  airqoDataPolicy: {
    title: 'Data Policy | Octasence Open Data & Usage Guidelines',
    description:
      "Access Octasence's data usage policy. Learn about data ownership, sharing rights, API licensing, and how researchers and engineers can leverage our infrastructure monitoring data.",
    keywords:
      'Octasence data policy, data usage rights, API licensing, infrastructure data sharing, research data access',
    url: '/legal/data-policy',
    image: OG_IMAGE,
  },
  dataPolicy: {
    title: 'Data Policy | Octasence Open Data & Usage Guidelines',
    description:
      "Access Octasence's data usage policy. Learn about data ownership, sharing rights, API licensing, and how researchers and engineers can leverage our infrastructure monitoring data.",
    keywords:
      'Octasence data policy, data usage rights, API licensing, infrastructure data sharing, research data access',
    url: '/legal/data-policy',
    image: OG_IMAGE,
  },
  // Summit/forum keys retained to avoid breaking existing page imports.
  // These routes should be updated or removed from the route tree separately.
  cleanAirForum: {
    title: 'Octasence | Infrastructure Intelligence Summit',
    description:
      'The Octasence Infrastructure Intelligence Summit brings together engineers, operators, and policymakers to advance AI-driven structural health monitoring and geotechnical safety.',
    keywords:
      'infrastructure intelligence summit, SHM conference, geotechnical AI event, structural monitoring forum',
    url: '/summit/about',
    image: OG_IMAGE,
  },
  cleanAirForumSessions: {
    title: 'Sessions & Agenda | Octasence Infrastructure Intelligence Summit',
    description:
      'Explore sessions covering AI monitoring, geotechnical safety, structural health, and policy frameworks at the Octasence Infrastructure Intelligence Summit.',
    keywords:
      'infrastructure summit sessions, SHM conference agenda, geotechnical AI workshops, structural monitoring panels',
    url: '/summit/sessions',
    image: OG_IMAGE,
  },
  cleanAirForumSpeakers: {
    title: 'Speakers | Octasence Infrastructure Intelligence Summit',
    description:
      'Meet the distinguished speakers at the Octasence Infrastructure Intelligence Summit — engineers, researchers, and policymakers advancing AI-driven infrastructure safety.',
    keywords:
      'infrastructure summit speakers, SHM experts, geotechnical AI speakers, structural monitoring leaders',
    url: '/summit/speakers',
    image: OG_IMAGE,
  },
  cleanAirForumResources: {
    title: 'Resources | Octasence Infrastructure Intelligence Summit',
    description:
      'Download presentations, research papers, and implementation guides from the Octasence Infrastructure Intelligence Summit.',
    keywords:
      'infrastructure summit resources, SHM downloads, geotechnical papers, structural monitoring guides',
    url: '/summit/resources',
    image: OG_IMAGE,
  },
  cleanAirForumSponsorships: {
    title: 'Sponsorship | Octasence Infrastructure Intelligence Summit',
    description:
      'Partner with the Octasence Infrastructure Intelligence Summit. Packages include exhibition space, speaking slots, and branding exposure to infrastructure decision-makers worldwide.',
    keywords:
      'infrastructure summit sponsorship, SHM conference partner, geotechnical event sponsor',
    url: '/summit/sponsorships',
    image: OG_IMAGE,
  },
  cleanAirForumLogistics: {
    title: 'Venue & Travel | Octasence Infrastructure Intelligence Summit',
    description:
      'Plan your visit to the Octasence Infrastructure Intelligence Summit. Find venue details, recommended hotels, and travel information.',
    keywords:
      'infrastructure summit venue, conference logistics, travel information, summit accommodation',
    url: '/summit/logistics',
    image: OG_IMAGE,
  },
  cleanAirForumProgramCommittee: {
    title: 'Program Committee | Octasence Infrastructure Intelligence Summit',
    description:
      'Meet the program committee organising the Octasence Infrastructure Intelligence Summit, composed of leading engineers, researchers, and industry practitioners.',
    keywords:
      'infrastructure summit committee, conference organisers, program committee, advisory board',
    url: '/summit/program-committee',
    image: OG_IMAGE,
  },
  cleanAirForumGlossary: {
    title: 'Glossary | Octasence Infrastructure Intelligence Summit',
    description:
      'Key terms and definitions in structural health monitoring, geotechnical engineering, and AI-driven infrastructure intelligence.',
    keywords:
      'SHM glossary, geotechnical terms, infrastructure monitoring definitions, structural health terminology',
    url: '/summit/glossary',
    image: OG_IMAGE,
  },
  cleanAirForumPartners: {
    title: 'Partners | Octasence Infrastructure Intelligence Summit',
    description:
      'The Octasence Infrastructure Intelligence Summit is supported by leading engineering firms, research institutions, and technology partners worldwide.',
    keywords:
      'infrastructure summit partners, SHM conference collaborators, geotechnical partners',
    url: '/summit/partners',
    image: OG_IMAGE,
  },
  // Regional keys retained to avoid breaking existing page imports.
  ugandaAirQuality: {
    title: 'Octasence | Infrastructure Monitoring — East Africa',
    description:
      'Octasence infrastructure intelligence solutions for East Africa. Real-time structural health monitoring and geotechnical data for mining, dams, and critical infrastructure.',
    keywords:
      'infrastructure monitoring East Africa, SHM Uganda, geotechnical AI Africa, structural health monitoring Kenya',
    url: '/regions/east-africa',
    image: OG_IMAGE,
  },
  kenyaAirQuality: {
    title: 'Octasence | Infrastructure Monitoring — Kenya',
    description:
      'Real-time structural health monitoring and geotechnical intelligence for critical infrastructure in Kenya. Octasence supports mining operators, dam authorities, and engineering firms nationwide.',
    keywords:
      'infrastructure monitoring Kenya, SHM Kenya, geotechnical AI Kenya, structural health Nairobi',
    url: '/regions/kenya',
    image: OG_IMAGE,
  },
  nigeriaAirQuality: {
    title: 'Octasence | Infrastructure Monitoring — Nigeria',
    description:
      'AI-driven structural health monitoring and geotechnical intelligence for Nigeria. Octasence serves mining, oil and gas, dam, and urban infrastructure operators across the country.',
    keywords:
      'infrastructure monitoring Nigeria, SHM Nigeria, geotechnical AI Lagos, structural health monitoring Nigeria',
    url: '/regions/nigeria',
    image: OG_IMAGE,
  },
  ghanaAirQuality: {
    title: 'Octasence | Infrastructure Monitoring — Ghana',
    description:
      'Real-time infrastructure intelligence for Ghana. Octasence provides structural health monitoring and geotechnical data for mining, dams, and critical infrastructure.',
    keywords:
      'infrastructure monitoring Ghana, SHM Ghana, geotechnical AI Accra, structural health monitoring Ghana',
    url: '/regions/ghana',
    image: OG_IMAGE,
  },
  rwandaAirQuality: {
    title: 'Octasence | Infrastructure Monitoring — Rwanda',
    description:
      'Octasence delivers AI-driven structural health monitoring and geotechnical intelligence for infrastructure operators in Rwanda.',
    keywords:
      'infrastructure monitoring Rwanda, SHM Rwanda, geotechnical AI Kigali, structural health monitoring Rwanda',
    url: '/regions/rwanda',
    image: OG_IMAGE,
  },
  tanzaniaAirQuality: {
    title: 'Octasence | Infrastructure Monitoring — Tanzania',
    description:
      'Real-time structural health monitoring and geotechnical intelligence for Tanzania. Octasence supports mining, dam, and urban infrastructure operators across the country.',
    keywords:
      'infrastructure monitoring Tanzania, SHM Tanzania, geotechnical AI Dar es Salaam, structural health monitoring Tanzania',
    url: '/regions/tanzania',
    image: OG_IMAGE,
  },
} as const;

// Type guard for metadata configs
export type MetadataConfigKey = keyof typeof METADATA_CONFIGS;

/**
 * Helper function to get metadata config with validation
 */
export function getMetadataConfig(
  key: MetadataConfigKey,
): MetadataConfig | null {
  if (key in METADATA_CONFIGS) {
    return METADATA_CONFIGS[key];
  }
  logWarn(`Metadata config not found for key: ${key}`);
  return null;
}

/**
 * Generate metadata for a specific page
 */
export function getPageMetadata(page: MetadataConfigKey): Metadata {
  const config = getMetadataConfig(page);
  if (!config) {
    logError(`No metadata config found for page: ${page}`);
    return generateMetadata(METADATA_CONFIGS.home);
  }
  return generateMetadata(config);
}

// Export utility functions for external use
export const metadataUtils = {
  getCurrentDomain,
  getDomainForContext,
  sanitizeUrl,
  isValidDomain,
  generateMetadata,
  generateViewport,
  getMetadataConfig,
  getPageMetadata,
} as const;

// Export types for TypeScript support
export type { DomainConfig, ImageMetadata, MetadataConfig };