import { getDomainForContext } from '@/lib/metadata';

export async function GET() {
  const siteUrl = getDomainForContext('canonical').replace(/\/$/, '');
  const robots = `User-agent: *
Allow: /

# Private and non-indexable routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /contact/form
Disallow: /contact/success

# Crawlable assets
Allow: /assets/
Allow: /favicon.ico
Allow: /icon.png
Allow: /apple-icon.png

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
