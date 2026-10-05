import { MetadataRoute } from 'next';

import { getDomainForContext } from '@/lib/metadata';

import { getBlogPostSlugs } from './(main)/blogs/data/sanityBlogPosts';
import { getCaseStudyIds } from './(main)/use-cases/data/sanityCaseStudies';

type SitemapEntry = MetadataRoute.Sitemap[number];
type SitemapChangeFrequency = NonNullable<SitemapEntry['changeFrequency']>;

interface RouteDefinition {
  path: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
}

export const revalidate = 86400;

const STATIC_ROUTES: RouteDefinition[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  {
    path: '/products-infrastructure-intelligence',
    changeFrequency: 'weekly',
    priority: 0.95,
  },
  {
    path: '/solutions-infrastructure-intelligence',
    changeFrequency: 'weekly',
    priority: 0.95,
  },
  {
    path: '/applications-infrastructure-intelligence',
    changeFrequency: 'weekly',
    priority: 0.92,
  },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blogs', changeFrequency: 'weekly', priority: 0.78 },
  { path: '/use-cases', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.82 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/resources', changeFrequency: 'weekly', priority: 0.72 },
  { path: '/press', changeFrequency: 'monthly', priority: 0.68 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/explore-data', changeFrequency: 'weekly', priority: 0.88 },
  {
    path: '/explore-data/mobile-app',
    changeFrequency: 'monthly',
    priority: 0.74,
  },
  {
    path: '/billboard/interactive',
    changeFrequency: 'weekly',
    priority: 0.65,
  },
  {
    path: '/solutions/african-cities',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/solutions/communities',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  { path: '/solutions/research', changeFrequency: 'monthly', priority: 0.76 },
  {
    path: '/solutions/kampala-study',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/solutions/network-coverage',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  { path: '/products/monitor', changeFrequency: 'monthly', priority: 0.84 },
  { path: '/products/analytics', changeFrequency: 'monthly', priority: 0.84 },
  { path: '/products/api', changeFrequency: 'monthly', priority: 0.82 },
  { path: '/products/mobile-app', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/calibrate', changeFrequency: 'monthly', priority: 0.78 },
  {
    path: '/africa-clean-air-forum',
    changeFrequency: 'monthly',
    priority: 0.55,
  },
  { path: '/packages', changeFrequency: 'weekly', priority: 0.62 },
  { path: '/packages/icons', changeFrequency: 'weekly', priority: 0.58 },
  { path: '/packages/icons/docs', changeFrequency: 'monthly', priority: 0.54 },
  {
    path: '/legal/terms-of-service',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/legal/privacy-policy',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  { path: '/legal/airqo-data', changeFrequency: 'yearly', priority: 0.28 },
  {
    path: '/legal/payment-refund-policy',
    changeFrequency: 'yearly',
    priority: 0.22,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getDomainForContext('canonical').replace(/\/$/, '');
  const lastModified = new Date();
  const [caseStudyIds, blogSlugs] = await Promise.all([
    getCaseStudyIds(),
    getBlogPostSlugs(),
  ]);
  const dynamicUseCaseRoutes: RouteDefinition[] = caseStudyIds.map((id) => ({
    path: `/use-cases/${id}`,
    changeFrequency: 'monthly',
    priority: 0.64,
  }));
  const dynamicBlogRoutes: RouteDefinition[] = blogSlugs.map((slug) => ({
    path: `/blogs/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.66,
  }));

  return [...STATIC_ROUTES, ...dynamicUseCaseRoutes, ...dynamicBlogRoutes].map(
    (route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );
}
