'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { hasAnalyticsConsent } from '@/utils/cookieConsent';

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
    gtag?: (...args: any[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

type TrackEventArgs = {
  action: string;
  category: string;
  label: string;
  value?: number;
  metadata?: Record<string, string | number | boolean | undefined>;
};

const CTA_CLICK_SELECTOR = 'a, button, [role="button"]';

function normalizeLabel(value: string) {
  return value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}

function getPageCategory(pathname: string) {
  if (pathname === '/') return 'home';

  return pathname
    .split('/')
    .filter(Boolean)
    .slice(0, 2)
    .join('_');
}

function getElementLabel(element: HTMLElement, pathname: string) {
  const explicitLabel = element.dataset.ctaLabel?.trim();
  if (explicitLabel) return normalizeLabel(explicitLabel);

  const ariaLabel = element.getAttribute('aria-label')?.trim();
  if (ariaLabel) return normalizeLabel(ariaLabel);

  const title = element.getAttribute('title')?.trim();
  if (title) return normalizeLabel(title);

  const text = element.textContent?.replace(/\s+/g, ' ').trim();
  if (text) return normalizeLabel(text);

  if (element instanceof HTMLAnchorElement) {
    const href = element.getAttribute('href')?.trim();
    if (href) return normalizeLabel(href);
  }

  return normalizeLabel(`${pathname}_cta`);
}

function getTrackingElement(target: HTMLElement | null) {
  if (!target) return null;

  const anchor = target.closest('a');
  const button = target.closest('button, [role="button"]');

  if (anchor && button && anchor.contains(button)) {
    return anchor as HTMLElement;
  }

  return (button ?? anchor) as HTMLElement | null;
}

/**
 * Single component to initialize Google Analytics and
 * track page views on route changes using the Next.js App Router.
 * Only loads after user consent is granted.
 */
export default function GoogleAnalytics({
  measurementId,
}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);
  const search = searchParams.toString();

  // Check for consent on mount and when consent changes
  useEffect(() => {
    const checkConsent = () => {
      setHasConsent(hasAnalyticsConsent());
    };

    checkConsent();

    // Listen for consent changes
    window.addEventListener('cookieConsentChanged', checkConsent);
    return () => {
      window.removeEventListener('cookieConsentChanged', checkConsent);
    };
  }, []);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !measurementId ||
      !hasConsent ||
      typeof window.gtag === 'undefined'
    ) {
      return;
    }

    // Construct page path with query strings (if any)
    const pagePath = search ? `${pathname}?${search}` : pathname;

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_path: pagePath,
      page_location: window.location.href,
    });
  }, [measurementId, pathname, search, hasConsent]);

  useEffect(() => {
    if (typeof document === 'undefined' || !hasConsent) {
      return;
    }

    const handleCtaClick = (event: MouseEvent) => {
      const trackingElement = getTrackingElement(event.target as HTMLElement);

      if (
        !trackingElement ||
        !trackingElement.matches(CTA_CLICK_SELECTOR) ||
        trackingElement.hasAttribute('disabled') ||
        trackingElement.getAttribute('aria-disabled') === 'true' ||
        trackingElement.dataset.noTrack === 'true'
      ) {
        return;
      }

      const action =
        trackingElement.dataset.ctaAction?.trim() ||
        (trackingElement instanceof HTMLAnchorElement ? 'link_click' : 'button_click');
      const category =
        trackingElement.dataset.ctaCategory?.trim() || getPageCategory(pathname);
      const label = getElementLabel(trackingElement, pathname);
      const destination =
        trackingElement instanceof HTMLAnchorElement
          ? trackingElement.href
          : undefined;

      trackEvent({
        action,
        category,
        label,
        metadata: {
          click_type:
            trackingElement instanceof HTMLAnchorElement ? 'link' : 'button',
          page_path: pathname,
          destination,
        },
      });
    };

    document.addEventListener('click', handleCtaClick, true);

    return () => {
      document.removeEventListener('click', handleCtaClick, true);
    };
  }, [hasConsent, pathname]);

  if (!measurementId || !hasConsent) {
    return null;
  }

  return (
    <>
      {/* Load the gtag script AFTER the page is interactive */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false,
          });
        `}
      </Script>
    </>
  );
}

/**
 * helper function to track custom GA events.
 */
export function trackEvent({
  action,
  category,
  label,
  value,
  metadata,
}: TrackEventArgs) {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...metadata,
    });
  }
}
